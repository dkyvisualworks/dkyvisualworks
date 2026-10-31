/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Dky Visualworks - cPanel Node.js Selector Entry Point (app.js)
 * Standar Produksi Enterprise Satelitweb
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { APP_CONFIG } from './appConfig.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Port dinamis yang diatur oleh cPanel Node.js Selector atau default 3000
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Inisialisasi SDK Resmi Google Gen AI
let geminiClient = null;
if (process.env.GEMINI_API_KEY) {
  try {
    geminiClient = new GoogleGenAI();
  } catch (err) {
    console.warn('[Gemini AI] Initialization notice:', err.message);
  }
}

// Endpoint Rekomendasi Konsultan AI Desain
app.post('/api/recommendation', async (req, res) => {
  try {
    const {
      clientName = 'Sahabat Bisnis',
      businessName = '',
      businessType = '',
      designNeed = 'Logo & Branding',
      stylePreference = 'Elegan & Mewah',
      budget = '',
      notes = ''
    } = req.body;

    const productsList = APP_CONFIG.products
      .map((p) => `- ${p.name} (${p.price}): ${p.description}`)
      .join('\n');

    const systemInstruction = `Anda adalah "Senior Creative Brand Director & Consultant" resmi dari "${APP_CONFIG.brandName}" (${APP_CONFIG.businessType}), studio desain dengan tagline "${APP_CONFIG.tagline}".

Prinsip Utama:
1. Bersikap ramah, sopan, antusias, komunikatif, dan persuasif.
2. Bantu pemilik bisnis mendapatkan identitas visual mewah dengan harga murah ramah kantong.
3. Rekomendasikan 1 atau 2 paket terbaik dari daftar paket resmi Dky Visualworks berikut:
${productsList}
4. Berikan saran konsep visual kreatif (palet warna, gaya tipografi, dan persona brand).
5. Format output WAJIB JSON murni tanpa pembungkus markdown.

Struktur JSON:
{
  "greeting": "Salam hangat personal",
  "analysis": "Analisa pentingnya visual brand untuk bisnis mereka",
  "suggestedPackageId": "ID paket",
  "suggestedPackageName": "Nama paket resmi",
  "estimatedPrice": "Harga paket resmi",
  "creativeConcept": "Deskripsi konsep visual & rekomendasi warna",
  "actionableTips": [
    "Tip visual 1",
    "Tip visual 2",
    "Tip visual 3"
  ],
  "whatsappDraft": "Draft pesan WhatsApp sopan dan lengkap untuk dikirim ke ${APP_CONFIG.contact.whatsapp}"
}`;

    const userPrompt = `Halo Dky Visualworks, saya ingin konsultasi kebutuhan desain:
- Nama: ${clientName}
- Nama Usaha: ${businessName || 'Belum ada nama'}
- Bidang Usaha: ${businessType || 'General UMKM / Bisnis'}
- Kebutuhan Utama: ${designNeed}
- Gaya Desain: ${stylePreference}
- Budget: ${budget || 'Menyesuaikan paket terbaik'}
- Catatan: ${notes || 'Ingin tampilan berkelas dan meningkatkan penjualan'}`;

    if (geminiClient && process.env.GEMINI_API_KEY) {
      try {
        const generatePromise = geminiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            systemInstruction,
            temperature: 0.7,
            responseMimeType: 'application/json'
          }
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('timeout')), 20000)
        );

        const response = await Promise.race([generatePromise, timeoutPromise]);
        const rawText = response.text || '';
        const cleanedJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanedJson);
        return res.json({ success: true, data: parsed });
      } catch {
        // Fallback to intelligent local recommendation engine seamlessly
      }
    }

    // Fallback Cerdas jika API Key belum dipasang di cPanel
    let matchedPackage = APP_CONFIG.products[0];
    const needLower = designNeed.toLowerCase();
    if (needLower.includes('sosial') || needLower.includes('feed')) {
      matchedPackage = APP_CONFIG.products[1];
    } else if (needLower.includes('kemasan') || needLower.includes('produk')) {
      matchedPackage = APP_CONFIG.products[2];
    } else if (needLower.includes('stationery') || needLower.includes('kantor')) {
      matchedPackage = APP_CONFIG.products[3];
    } else if (needLower.includes('banner') || needLower.includes('spanduk')) {
      matchedPackage = APP_CONFIG.products[4];
    } else if (needLower.includes('semua') || needLower.includes('rebrand')) {
      matchedPackage = APP_CONFIG.products[5];
    }

    const fallbackData = {
      greeting: `Halo Kak ${clientName || 'Partner Bisnis'}! Selamat datang di ${APP_CONFIG.brandName}.`,
      analysis: `Untuk bisnis "${businessName || businessType || 'Anda'}", identitas visual yang profesional adalah kunci membangun daya tarik dan kepercayaan pembeli. Dengan gaya "${stylePreference}", brand Anda akan tampil jauh lebih kredibel.`,
      suggestedPackageId: matchedPackage.id,
      suggestedPackageName: matchedPackage.name,
      estimatedPrice: matchedPackage.price,
      creativeConcept: `Kami merekomendasikan konsep visual bernuansa High-Contrast Luxury dengan aksen emas elegan, tipografi modern proporsional, serta hierarki visual yang mengarahkan pembeli langsung ke penawaran utama Anda.`,
      actionableTips: [
        `Gunakan palet warna maksimal 3 warna harmonis agar brand mudah dikenali dan diingat.`,
        `Pastikan kontras teks dan latar belakang tajam agar mudah terbaca di smartphone pengguna.`,
        `Gunakan selalu file master vektor (AI/EPS/SVG) beresolusi 300 DPI untuk hasil cetak yang tajam tanpa pecah.`
      ],
      whatsappDraft: `Halo Admin ${APP_CONFIG.brandName}, saya ${clientName} dari "${businessName || 'Brand Baru'}". Saya tertarik untuk konsultasi dan memesan "${matchedPackage.name}" (${matchedPackage.price}) dengan konsep gaya ${stylePreference}. Mohon informasi ketersediaan slot pengerjaannya. Terima kasih!`
    };

    return res.json({ success: true, data: fallbackData });
  } catch (err) {
    console.error('[cPanel Server Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Gagal memproses rekomendasi.',
      error: err.message
    });
  }
});

// Endpoint Konfigurasi Dinamis
app.get('/api/config', (_req, res) => {
  res.json({ success: true, config: APP_CONFIG });
});

// Penanganan Static Asset untuk cPanel Shared Hosting (Mendukung dist maupun client/dist)
let staticDir = path.join(__dirname, 'dist');
if (!fs.existsSync(staticDir) && fs.existsSync(path.join(__dirname, 'client/dist'))) {
  staticDir = path.join(__dirname, 'client/dist');
}

app.use(express.static(staticDir));

// Catch-all route untuk React Single Page Application (Mencegah 404 saat refresh di cPanel)
app.get('*', (_req, res) => {
  const indexFile = path.join(staticDir, 'index.html');
  if (fs.existsSync(indexFile)) {
    res.sendFile(indexFile);
  } else {
    res.send(`
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <meta charset="UTF-8">
          <title>${APP_CONFIG.brandName} - Menyiapkan Website</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #FAF8F5; color: #1A1615; text-align: center; padding: 50px 20px; }
            .box { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; border: 1px solid #D4AF37; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
            h1 { color: #1A1615; margin-bottom: 8px; }
            p { color: #6B6560; line-height: 1.6; }
            .btn { display: inline-block; background: #D4AF37; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="box">
            <h1>${APP_CONFIG.brandName}</h1>
            <p><strong>${APP_CONFIG.tagline}</strong></p>
            <p>Aplikasi backend Node.js berhasil berjalan di cPanel Satelitweb. Untuk memuat antarmuka React, pastikan Anda telah menjalankan perintah <code>npm run build</code> agar folder <code>dist</code> terbuat.</p>
            <a class="btn" href="https://wa.me/${APP_CONFIG.contact.whatsapp}" target="_blank">Hubungi WhatsApp Resmi</a>
          </div>
        </body>
      </html>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`[cPanel Node.js Selector] Server aktif pada port: ${PORT}`);
});

export default app;

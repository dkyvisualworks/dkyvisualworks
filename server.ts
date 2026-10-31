/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { APP_CONFIG } from './appConfig.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

const app = express();
app.use(express.json());

// Initialize Gemini Client
let geminiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    geminiClient = new GoogleGenAI();
  } catch (err) {
    console.warn('Gemini client initialization notice:', err);
  }
}

// Creative Consultant AI Endpoint
app.post('/api/recommendation', async (req: Request, res: Response) => {
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

    const systemInstruction = `Anda adalah "Senior Creative Brand Director & Consultant" resmi dari "${APP_CONFIG.brandName}" (${APP_CONFIG.businessType}), sebuah studio desain kelas atas dengan tagline "${APP_CONFIG.tagline}".

Prinsip Anda:
1. Ramah, sopan, antusias, komunikatif, dan sangat persuasif.
2. Membantu pemilik bisnis mendapatkan identitas visual mewah berstandar internasional dengan harga yang terjangkau.
3. Selalu rekomendasikan 1 atau 2 paket paling relevan dari daftar paket resmi Dky Visualworks:
${productsList}
4. Berikan saran konsep visual kreatif (warna, gaya tipografi, dan persona brand) sesuai jenis usaha klien.
5. Format respons harus dalam format JSON murni tanpa markdown triple backticks.

Format JSON yang wajib dihasilkan:
{
  "greeting": "Salam hangat personal",
  "analysis": "Analisa singkat mengapa visual brand penting untuk jenis usaha mereka",
  "suggestedPackageId": "ID paket yang paling cocok",
  "suggestedPackageName": "Nama paket resmi dari daftar",
  "estimatedPrice": "Harga paket resmi",
  "creativeConcept": "Deskripsi konsep visual, rekomendasi warna (hex/nama), moodboard singkat",
  "actionableTips": [
    "Tip visual 1",
    "Tip visual 2",
    "Tip visual 3"
  ],
  "whatsappDraft": "Draft pesan WhatsApp sopan dan lengkap yang siap dikirimkan oleh klien ke nomor admin Dky Visualworks (${APP_CONFIG.contact.whatsapp}) untuk langsung mulai pengerjaan"
}`;

    const userPrompt = `Halo Dky Visualworks, saya ingin konsultasi kebutuhan desain grafis:
- Nama Klien: ${clientName}
- Nama Usaha / Brand: ${businessName || 'Belum ada nama'}
- Bidang Usaha: ${businessType || 'General UMKM / Bisnis'}
- Kebutuhan Desain Utama: ${designNeed}
- Preferensi Gaya: ${stylePreference}
- Estimasi Budget: ${budget || 'Menyesuaikan paket terbaik'}
- Catatan Tambahan: ${notes || 'Ingin tampilan berkelas dan meningkatkan penjualan'}`;

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

        const response: any = await Promise.race([generatePromise, timeoutPromise]);
        const rawText = response.text || '';
        const cleanedJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanedJson);
        return res.json({ success: true, data: parsed });
      } catch {
        // Fallback to intelligent local recommendation engine seamlessly
      }
    }

    // Intelligent Fallback when API key is pending or network is limited
    let matchedPackage = APP_CONFIG.products[0];
    if (designNeed.toLowerCase().includes('sosial') || designNeed.toLowerCase().includes('feed')) {
      matchedPackage = APP_CONFIG.products[1];
    } else if (designNeed.toLowerCase().includes('kemasan') || designNeed.toLowerCase().includes('produk')) {
      matchedPackage = APP_CONFIG.products[2];
    } else if (designNeed.toLowerCase().includes('stationery') || designNeed.toLowerCase().includes('kantor')) {
      matchedPackage = APP_CONFIG.products[3];
    } else if (designNeed.toLowerCase().includes('banner') || designNeed.toLowerCase().includes('spanduk')) {
      matchedPackage = APP_CONFIG.products[4];
    } else if (designNeed.toLowerCase().includes('semua') || designNeed.toLowerCase().includes('rebrand')) {
      matchedPackage = APP_CONFIG.products[5];
    }

    const fallbackData = {
      greeting: `Halo Kak ${clientName || 'Partner Kreatif'}! Selamat datang di ${APP_CONFIG.brandName}.`,
      analysis: `Untuk bisnis "${businessName || businessType || 'Anda'}", identitas visual yang profesional adalah kunci membangun kepercayaan instan pembeli. Dengan estetika "${stylePreference}", brand Anda akan tampil jauh lebih kredibel dan berdaya saing tinggi.`,
      suggestedPackageId: matchedPackage.id,
      suggestedPackageName: matchedPackage.name,
      estimatedPrice: matchedPackage.price,
      creativeConcept: `Konsep visual yang kami sarankan mengusung perpaduan harmoni warna kontras berkelas (seperti Rich Charcoal & Warm Gold Accent), tipografi modern clean tanpa cela, serta tata visual hierarki yang memikat calon pelanggan.`,
      actionableTips: [
        `Gunakan palet warna konsisten maksimal 3 warna utama untuk menjaga daya ingat (brand recall) pelanggan.`,
        `Pastikan logo dan aset visual memiliki kontras tinggi agar terlihat tajam di layar handphone maupun media cetak.`,
        `Terapkan file master berstandar 300 DPI siap cetak agar packaging dan stationery tidak pecah saat diproduksi.`
      ],
      whatsappDraft: `Halo Admin ${APP_CONFIG.brandName}, saya ${clientName} dari "${businessName || 'Brand Baru'}". Saya tertarik untuk memesan "${matchedPackage.name}" (${matchedPackage.price}) dengan konsep gaya ${stylePreference}. Mohon info slot pengerjaan dan detail konsultasinya. Terima kasih!`
    };

    return res.json({ success: true, data: fallbackData });
  } catch (err: any) {
    console.error('API Error:', err);
    return res.status(500).json({
      success: false,
      message: 'Gagal memproses rekomendasi desain. Silakan coba kembali atau hubungi WhatsApp langsung.',
      error: err.message
    });
  }
});

// App Config Endpoint
app.get('/api/config', (_req: Request, res: Response) => {
  res.json({ success: true, config: APP_CONFIG });
});

// ==========================================
// REAL-TIME INTERACTIVE WHATSAPP LIVE CHAT
// ==========================================

interface ChatMessage {
  id: string;
  sessionId: string;
  sender: 'user' | 'admin';
  senderName: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatSession {
  id: string;
  userName: string;
  userPhone?: string;
  createdAt: string;
  lastActive: string;
  lastMessage?: string;
  unreadForAdmin: number;
  unreadForUser: number;
}

const chatSessions = new Map<string, ChatSession>();
const chatMessages = new Map<string, ChatMessage[]>();
const sseClients = new Set<{ res: Response; sessionId?: string }>();

function broadcastChatEvent(type: string, data: any) {
  const payload = `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try {
      client.res.write(payload);
    } catch {
      sseClients.delete(client);
    }
  }
}

// Initial sample session so admin sees immediate demo data if desired
const defaultSessionId = 'session-guest-sample';
chatSessions.set(defaultSessionId, {
  id: defaultSessionId,
  userName: 'Calon Klien UMKM (Budi)',
  userPhone: '081234567890',
  createdAt: new Date(Date.now() - 3600000).toISOString(),
  lastActive: new Date().toISOString(),
  lastMessage: 'Halo Admin, untuk paket logo UMKM apa sudah dapat file master siap cetak?',
  unreadForAdmin: 1,
  unreadForUser: 0
});

chatMessages.set(defaultSessionId, [
  {
    id: 'msg-init-sample-1',
    sessionId: defaultSessionId,
    sender: 'admin',
    senderName: 'Admin Dky Visualworks',
    text: `Halo! Selamat datang di ${APP_CONFIG.brandName}. Ada yang bisa kami bantu seputar kebutuhan desain logo, branding UMKM, kemasan, atau feed sosial media Anda?`,
    timestamp: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'read'
  },
  {
    id: 'msg-init-sample-2',
    sessionId: defaultSessionId,
    sender: 'user',
    senderName: 'Budi',
    text: 'Halo Admin, untuk paket logo UMKM apa sudah dapat file master siap cetak?',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'delivered'
  }
]);

// 1. Get all chat sessions (Admin)
app.get('/api/chat/sessions', (_req: Request, res: Response) => {
  const sessions = Array.from(chatSessions.values()).sort(
    (a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
  );
  res.json({ success: true, sessions });
});

// 2. Get messages for a session (auto-initializes welcome message if new)
app.get('/api/chat/messages', (req: Request, res: Response) => {
  const sessionId = (req.query.sessionId as string) || 'default-guest';
  const userName = (req.query.userName as string) || 'Pengunjung Web';
  const userPhone = (req.query.userPhone as string) || '';

  if (!chatSessions.has(sessionId)) {
    const newSession: ChatSession = {
      id: sessionId,
      userName,
      userPhone,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      unreadForAdmin: 0,
      unreadForUser: 0,
      lastMessage: 'Halo! Selamat datang di Dky Visualworks...'
    };
    chatSessions.set(sessionId, newSession);

    const welcomeMsg: ChatMessage = {
      id: `welcome-${Date.now()}`,
      sessionId,
      sender: 'admin',
      senderName: `${APP_CONFIG.brandName} Admin`,
      text: `Halo Kak! Selamat datang di ${APP_CONFIG.brandName} (${APP_CONFIG.tagline}). Kami siap membantu mewujudkan identitas brand & desain impian Anda. Ada yang bisa kami bantu hari ini? 😊`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'read'
    };
    chatMessages.set(sessionId, [welcomeMsg]);

    broadcastChatEvent('session:new', newSession);
  }

  const messages = chatMessages.get(sessionId) || [];
  res.json({
    success: true,
    session: chatSessions.get(sessionId),
    messages
  });
});

// 3. Send message (by User or Admin)
app.post('/api/chat/send', (req: Request, res: Response) => {
  const { sessionId, sender = 'user', senderName = 'Pengunjung', text, userPhone } = req.body;

  if (!sessionId || !text || !text.trim()) {
    return res.status(400).json({ success: false, message: 'sessionId dan text diperlukan' });
  }

  let session = chatSessions.get(sessionId);
  if (!session) {
    session = {
      id: sessionId,
      userName: senderName,
      userPhone: userPhone || '',
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      unreadForAdmin: 0,
      unreadForUser: 0,
      lastMessage: text.trim()
    };
    chatSessions.set(sessionId, session);
  }

  const now = new Date();
  const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newMessage: ChatMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    sessionId,
    sender: sender === 'admin' ? 'admin' : 'user',
    senderName,
    text: text.trim(),
    timestamp: timeFormatted,
    status: 'delivered'
  };

  const list = chatMessages.get(sessionId) || [];
  list.push(newMessage);
  chatMessages.set(sessionId, list);

  // Update session
  session.lastActive = now.toISOString();
  session.lastMessage = text.trim();
  if (userPhone && !session.userPhone) {
    session.userPhone = userPhone;
  }
  if (sender === 'user') {
    session.unreadForAdmin = (session.unreadForAdmin || 0) + 1;
    if (senderName && senderName !== 'Pengunjung') {
      session.userName = senderName;
    }
  } else {
    session.unreadForUser = (session.unreadForUser || 0) + 1;
  }

  // Real-time broadcast to all connected web clients
  broadcastChatEvent('message:new', {
    message: newMessage,
    session
  });

  return res.json({ success: true, message: newMessage, session });
});

// 4. Mark session as read
app.post('/api/chat/mark-read', (req: Request, res: Response) => {
  const { sessionId, role = 'admin' } = req.body;
  const session = chatSessions.get(sessionId);
  if (session) {
    if (role === 'admin') {
      session.unreadForAdmin = 0;
    } else {
      session.unreadForUser = 0;
    }
    const msgs = chatMessages.get(sessionId);
    if (msgs) {
      for (const m of msgs) {
        if (role === 'admin' && m.sender === 'user') {
          m.status = 'read';
        } else if (role === 'user' && m.sender === 'admin') {
          m.status = 'read';
        }
      }
    }
    broadcastChatEvent('session:updated', session);
  }
  res.json({ success: true });
});

// 5. Broadcast typing status
app.post('/api/chat/typing', (req: Request, res: Response) => {
  const { sessionId, sender, isTyping } = req.body;
  broadcastChatEvent('chat:typing', { sessionId, sender, isTyping });
  res.json({ success: true });
});

// 6. Server-Sent Events (SSE) Stream for Instant Real-Time Sync
app.get('/api/chat/events', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  const client = { res, sessionId: req.query.sessionId as string };
  sseClients.add(client);

  res.write(`:connected\n\n`);

  const keepAliveInterval = setInterval(() => {
    try {
      res.write(':keepalive\n\n');
    } catch {
      clearInterval(keepAliveInterval);
      sseClients.delete(client);
    }
  }, 25000);

  req.on('close', () => {
    clearInterval(keepAliveInterval);
    sseClients.delete(client);
  });
});

// Vite Middleware for Development / Static file serving for Production
if (!isProd) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  // Support both root dist and client/dist for cPanel / production flexibility
  const staticPath = path.join(__dirname, 'dist');
  app.use(express.static(staticPath));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[${APP_CONFIG.brandName}] Server running on http://0.0.0.0:${PORT}`);
});

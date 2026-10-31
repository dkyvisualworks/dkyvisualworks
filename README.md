# Dky Visualworks - Luxury Business Website & cPanel Ready Architecture

> **Slogan / Tagline:** *Harga Murah Kualitas Mewah*  
> **Bidang Usaha:** Desain Visualworks (Jasa Desain Grafis & Branding Logo, Sosial Media, Visual Brand)  
> **Author & Standard:** Satelitweb Enterprise Zero-Slop Architecture  

---

## 💎 Ringkasan Proyek

**Dky Visualworks** adalah aplikasi web bisnis kelas atas (*Luxury & Enterprise Grade*) yang dibangun dengan pendekatan **Mobile First** dan siap pakai (*Production-Ready*) untuk deployment di **cPanel Shared Hosting (Node.js Selector)** maupun cloud platforms.

Dilengkapi dengan:
- 👑 **Branding Logo & Typography Eksklusif**: Monogram presisi geometris DKY dengan aksen emas berdaya kontras tinggi (*High Contrast Gold Accent #D4AF37*) dan font Google **Plus Jakarta Sans**.
- 🛡️ **Zero Broken Image Architecture**: Menggunakan komponen `SmartImage` dengan sistem failover otomatis ke asset Unsplash resolusi tinggi berlisensi bebas royalti.
- 🤖 **Konsultan Desain AI (Gemini Flash)**: Terintegrasi dengan SDK resmi Google Gen AI (`@google/genai`) pada endpoint backend `/api/recommendation` yang menganalisis kebutuhan klien dan meracik rekomendasi paket serta draft WhatsApp instan.
- ⚙️ **Configuration-Driven Whitelabel (`appConfig.js`)**: Seluruh nama brand, tagline, produk, harga, nomor WhatsApp, galeri visual, dan FAQ diatur dari satu berkas konfigurasi terpusat.
- 🚀 **cPanel Node.js Selector Native**: Entry point `app.js` dengan deteksi port dinamis `process.env.PORT` dan penanganan SPA catch-all route untuk mencegah error 404 saat refresh halaman.

---

## 🛠️ Tech Stack

- **Frontend**: React 18+ / React 19, Vite, Tailwind CSS, Google Font "Plus Jakarta Sans", Lucide React Icons
- **Backend**: Express.js (Node.js ESM)
- **AI Engine**: SDK Resmi Google Gen AI (`@google/genai`) dengan model `gemini-3.8-flash`
- **Hosting Target**: cPanel Shared Hosting (Satelitweb Node.js Selector) / Cloud Run / VPS

---

## 📁 Struktur Monorepo & Berkas

```
├── appConfig.js           # Single Source of Truth konfigurasi bisnis & produk
├── app.js                 # Entry point resmi untuk cPanel Node.js Selector
├── server.ts              # Full-stack dev & production server (Vite middleware)
├── metadata.json          # Metadata aplikasi AI Studio
├── package.json           # Dependensi root & scripts (build, dev, start)
├── index.html             # Entry point web dengan Google Font Plus Jakarta Sans
├── src/
│   ├── App.tsx            # Komposisi utama aplikasi React
│   ├── main.tsx           # Mounting React DOM
│   ├── index.css          # Tailwind CSS layer & custom luxury gradients
│   └── components/
│       ├── BrandLogo.tsx           # Monogram DKY emas presisi tinggi
│       ├── SmartImage.tsx          # Komponen proteksi gambar zero broken
│       ├── Navbar.tsx              # Sticky header dengan drawer mobile
│       ├── HeroSection.tsx         # Hero banner mewah & trust badges
│       ├── ServicesSection.tsx     # Katalog paket desain & filter kategori
│       ├── GallerySection.tsx      # Portofolio karya visual & lightbox
│       ├── WhyChooseUs.tsx         # 6 keunggulan utama & 4-step workflow
│       ├── TestimonialsSection.tsx # Review klien terverifikasi & statistik
│       ├── FAQSection.tsx          # Accordion tanya jawab bisnis
│       ├── AIConsultantModal.tsx   # Modal interaktif konsultan AI
│       ├── Footer.tsx              # Footer eksekutif & info operasional
│       └── FloatingWhatsApp.tsx    # Floating quick action WhatsApp & AI
├── client/                # Folder mandiri untuk arsitektur monorepo terpisah
│   ├── package.json
│   ├── index.html
│   ├── tailwind.config.js
│   └── src/
│       ├── main.jsx
│       ├── index.css
│       └── App.jsx
└── README.md              # Dokumentasi lengkap
```

---

## 🚀 Panduan Pengujian & Menjalankan di Lokal

### 1. Prasyarat
- Node.js versi 18, 20, atau 22 (LTS disarankan)
- NPM versi 9+

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment (`.env`)
Salin file `.env.example` menjadi `.env` lalu sesuaikan isinya:
```env
PORT=3000
GEMINI_API_KEY="AIzaSy...MASUKKAN_API_KEY_GEMINI_ANDA"
NODE_ENV=development
```
*(Catatan: Jika `GEMINI_API_KEY` belum diisi, backend Dky Visualworks secara otomatis menggunakan mesin rekomendasi cerdas lokal tanpa error).*

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser pada alamat: `http://localhost:3000`

### 5. Melakukan Build Aplikasi
```bash
npm run build
```
Perintah ini akan mengompilasi asset frontend React ke folder `/dist` dengan optimasi bundle produksi.

---

## 🌐 Panduan Deployment ke cPanel Hosting Satelitweb

Ikuti langkah-langkah mudah berikut untuk mengunggah dan mengaktifkan website di cPanel Satelitweb:

### Langkah 1: Build Frontend di Lokal / CI
Sebelum mengunggah, lakukan build terlebih dahulu di komputer lokal Anda:
```bash
npm run build
```
Pastikan folder `dist` sudah berhasil terbuat.

### Langkah 2: Unggah Berkas ke cPanel
1. Masuk ke **cPanel Satelitweb** Anda.
2. Buka menu **File Manager**.
3. Buat folder untuk aplikasi Node.js (misalnya: `/home/username/dky-app` atau di dalam `subdomain/public_html`).
4. Unggah berkas-berkas berikut ke folder tersebut:
   - `package.json`
   - `appConfig.js`
   - `app.js`
   - Folder `dist/` (beserta seluruh isinya)
   - File `.env`

### Langkah 3: Konfigurasi "Setup Node.js App" di cPanel
1. Di cPanel, cari dan klik menu **Setup Node.js App** (Node.js Selector).
2. Klik tombol **Create Application**.
3. Isi parameter konfigurasi berikut:
   - **Node.js version**: Pilih versi **18.x**, **20.x**, atau **22.x**.
   - **Application mode**: Pilih **Production**.
   - **Application root**: Masukkan path folder aplikasi (contoh: `dky-app`).
   - **Application URL**: Pilih domain atau subdomain Anda.
   - **Application startup file**: Ketik `app.js` *(Sesuai standar Satelitweb)*.
4. Klik **Create**.

### Langkah 4: Pasang Dependensi di cPanel
1. Setelah aplikasi terbuat, klik tombol **Run NPM Install** pada panel Node.js Selector, atau masuk melalui SSH/Terminal cPanel dan jalankan:
   ```bash
   cd ~/dky-app
   npm install --omit=dev
   ```

### Langkah 5: Atur Environment Variables
Pada bagian **Environment variables** di halaman Node.js Selector, tambahkan variabel berikut:
- `NODE_ENV` = `production`
- `GEMINI_API_KEY` = `[API_KEY_GEMINI_ANDA]`

### Langkah 6: Restart & Uji Website
1. Klik tombol **Restart** pada panel Node.js Selector.
2. Buka domain/subdomain Anda melalui peramban.
3. Website **Dky Visualworks** kini online 100% responsif, tanpa broken image, dan fitur Konsultan AI siap melayani calon pembeli!

---

## 📱 Fitur Unggulan Mobile-First
- **Touch Target $\ge 44\text{px}$**: Seluruh tombol, link navigasi, dan filter kategori mudah diakses melalui satu jari.
- **Fast WhatsApp Conversion**: Tombol *"Pesan via WhatsApp"* langsung memuat teks pesanan spesifik paket yang dipilih (contoh: Nama Paket, Harga, dan catatan format master 300 DPI).
- **Interactive Lightbox**: Pengunjung dapat memperbesar dan melihat detail karya di galeri tanpa berpindah halaman.

---

## 📞 Informasi Kontak & Dukungan
- **Brand:** Dky Visualworks
- **WhatsApp:** +62 821-3138-2110
- **Email:** dkyvisualworks@gmail.com
- **Infrastruktur:** Satelitweb Enterprise Hosting Architecture

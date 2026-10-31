/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const APP_CONFIG = {
  brandName: "Dky Visualworks",
  businessType: "Desain Visualworks",
  tagline: "Harga Murah Kualitas Mewah",
  description: "Jasa design grafis & Branding Logo, Sosial media, visual brand profesional dengan sentuhan modern, fresh & berkarakter.",
  establishedYear: "2024",
  founder: "Dky & Creative Team",
  stats: {
    projectsCompleted: "650+",
    happyClients: "480+",
    clientSatisfaction: "99.4%",
    turnaroundTime: "24-48 Jam"
  },
  themeColor: {
    primary: "#18191B",     // Deep Nimbus Charcoal/Black
    secondary: "#2D2E32",   // Slate Dark
    accent: "#FFB800",      // Nimbus Vibrant Golden Yellow
    accentHover: "#E5A500", // Warm Amber
    accentLight: "#FFF4D2", // Soft Cream Yellow
    bgLight: "#F8F9FA",     // Clean Nimbus Off-White / Canvas
    bgCard: "#FFFFFF",      // Pure White Card
    bgMuted: "#EEF1F4",     // Subtle Grey for Tabs
    textDark: "#18191B",
    textMuted: "#6C7278"
  },
  contact: {
    whatsapp: "6282131382110",
    displayPhone: "+62 821-3138-2110",
    email: "dkyvisualworks@gmail.com",
    address: "Jl. Perum Sapphire Residence Blok 6F-26 Prasung,Buduran,Sidoarjo,Jawa Timur",
    workingHours: "Senin - Sabtu: 08:30 - 21:00 WIB",
    behance: "behance.net/dkyvisualworks",
    dribbble: "dribbble.com/dkyvisualworks",
    instagram: "@dkyvisualworks"
  },
  // High quality creative designer images matching the warm yellow & creative persona in the reference
  heroImage: "/assets/aistudio/Potret_Profesional_Desainer_Digital_Kreatif_888ffc02.png",
  creativePersonImage: "/assets/aistudio/Potret_Profesional_Pria_Berkacamata_ca288836.png",
  heroFallback: "/assets/aistudio/Potret_Profesional_Desainer_Digital_Kreatif_888ffc02.png",
  skills: [
    { name: "Adobe Photoshop", percentage: 95 },
    { name: "Adobe Illustrator", percentage: 92 },
    { name: "Figma & UI/UX", percentage: 88 },
    { name: "CorelDraw & Vector Print", percentage: 90 },
    { name: "3D Mockup & Packaging", percentage: 85 }
  ],
  skillCards: [
    { title: "UI/UX & Web Design", desc: "Desain web & app modern dengan konversi tinggi.", icon: "ui" },
    { title: "Graphic & Logo Branding", desc: "Filosofi logo eksklusif dan identitas merk.", icon: "graphic" },
    { title: "Social Media & Feed", desc: "Konten visual Instagram, TikTok & carousel rapi.", icon: "motion" },
    { title: "Packaging & Photo Retouch", desc: "Desain box kemasan, label stiker & olah foto HD.", icon: "retouch" }
  ],
  products: [
    {
      id: "pkg-logo",
      name: "Paket Logo Branding Eksklusif",
      category: "Logo & Identitas",
      tag: "Best Seller",
      badge: "Kualitas Mewah",
      price: "Rp 299.000",
      originalPrice: "Rp 650.000",
      description: "Identitas visual berfilosofi kuat untuk UMKM, startup, hingga corporate yang ingin tampil menonjol dan kredibel.",
      image: "/assets/aistudio/Paket_Logo_Branding_Eksklusif_Minimalis_f7981e61.png",
      features: [
        "3 Pilihan Konsep Desain Awal Unik",
        "Revisi Fleksibel hingga Puas",
        "Format Lengkap: AI, EPS, SVG, PDF, PNG Transparan (300 DPI)",
        "3D Mockup Premium (Stempel, Signage, Kertas Mewah)",
        "Panduan Mini Warna & Font Brand",
        "Hak Cipta Komersial Penuh 100%"
      ]
    },
    {
      id: "pkg-social-media",
      name: "Paket Feed & Story Sosial Media",
      category: "Sosial Media",
      tag: "Terlaris",
      badge: "Paling Hemat",
      price: "Rp 499.000",
      originalPrice: "Rp 850.000",
      description: "Desain feed Instagram & TikTok visual konsisten nan estetik yang meningkatkan engagement dan konversi penjualan.",
      image: "/assets/aistudio/Poster_Paket_Feed___Story_Sosial_Media_37a296f7.png",
      features: [
        "24 Desain Feed Siap Upload (Square & Carousel)",
        "6 Template Highlight & Story Instagram",
        "Copywriting Caption & Riset Hashtag Bertarget",
        "Layout Grid Harmonis & Elegan",
        "File Mentah Canva / Photoshop Mudah Diedit",
        "Waktu Pengerjaan Terjadwal Rapi"
      ]
    },
    {
      id: "pkg-packaging",
      name: "Paket Kemasan & Label Produk",
      category: "Packaging & Cetak",
      tag: "Pilihan UMKM",
      badge: "Siap Cetak",
      price: "Rp 299.000",
      originalPrice: "Rp 750.000",
      description: "Desain kemasan box, pouch makanan, standing bag, atau stiker botol yang menarik mata pembeli di etalase toko.",
      image: "/assets/aistudio/Kemasan___Label_Produk_Nusantara_328daa26.png",
      features: [
        "Desain Pola Die-Cut Presisi Siap Cetak",
        "Visualisasi 3D Realistis Sebelum Dicetak",
        "Color Profile CMYK Standard Percetakan",
        "Format Vector Siap Kirim ke Pabrik / Vendor",
        "Konsultasi Pemilihan Bahan Cetak Terbaik",
        "Bebas Revisi Minor Format Text & Barcode"
      ]
    },
    {
      id: "pkg-stationery",
      name: "Paket Stationery & Corporate Kit",
      category: "Corporate Identity",
      tag: "Enterprise",
      badge: "Citra Profesional",
      price: "Rp 249.000",
      originalPrice: "Rp 800.000",
      description: "Peralatan bisnis resmi yang meningkatkan gengsi dan kepercayaan klien saat negosiasi maupun presentasi.",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Desain Kartu Nama Eksekutif Double-Sided",
        "Kop Surat Resmi (Format Word & PDF Siap Pakai)",
        "Desain Amplop Bisnis & Map Dokumen Kantor",
        "Desain ID Card Karyawan & Lanyard",
        "Template Nota Invoice & Kwitansi Resmi",
        "Export Resolusi Ultra High-Definition"
      ]
    },
    {
      id: "pkg-marketing",
      name: "Paket Banner Promosi & Marketing",
      category: "Promosi Visual",
      tag: "Promo",
      badge: "Konversi Tinggi",
      price: "Rp 489.000",
      originalPrice: "Rp 850.000",
      description: "Media promosi visual offline & online untuk event, bazar, launching produk, spanduk toko, dan roll-up banner.",
      image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Desain Roll Up Banner / X-Banner Modern",
        "Desain Brosur Lipat Tiga / Flyer A5",
        "Spanduk Outdoor Tahan Cuaca High Contrast",
        "Banner Digital Website & Ads Tokopedia/Shopee",
        "Format AI/TIFF/PDF Khusus Mesin Cetak Luar Ruang",
        "Pengerjaan Kilat 24 Jam Selesai"
      ]
    },
    {
      id: "pkg-full-rebrand",
      name: "Paket All-In-One Visual Brand Rebrand",
      category: "Full Brand Solution",
      tag: "VIP Sultan",
      badge: "Nilai Tertinggi",
      price: "Rp 999.000",
      originalPrice: "Rp 2.500.000",
      description: "Transformasi visual total mencakup semua kebutuhan desain bisnis Anda dari nol hingga siap mendominasi pasar.",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Paket Logo Eksklusif + Brand Guidelines Book (30+ Halaman)",
        "Paket 30 Konten Sosial Media & Carousel",
        "Desain Kemasan / Label Produk Lengkap",
        "Paket Stationery & Corporate Kit Lengkap",
        "Sesi Konsultasi Desain 1-on-1 via Video Call",
        "Prioritas Pengerjaan VIP & Dukungan Desain 3 Bulan"
      ]
    }
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Desain Logo Kreatif SUKA",
      category: "Logo & Branding",
      image: "/assets/aistudio/Konsep_7_9d885d4d.jpg",
      description: "Desain identitas brand logo SUKA dengan tipografi playful, kurva senyum dinamis, dan latar merah kontras tinggi."
    },
    {
      id: "gal-2",
      title: "Desain Kemasan & Branding Bebek Nggacor",
      category: "Packaging",
      image: "/assets/aistudio/BEBEK_NGGACOR_MOCKUP_a928b93c.jpg",
      description: "Desain kemasan paper food box, cup minuman, dan logo maskot Bebek Nggacor spesial sambel ijo siap cetak."
    },
    {
      id: "gal-3",
      title: "Desain Logo Musisi Musta Adnan",
      category: "Logo & Branding",
      image: "/assets/aistudio/Musta_Adnan_3_56285624.jpg",
      description: "Desain logo & tipografi ekspresif Musta Adnan 'The Sound of Soul in Every String' berlatar oranye dengan siluet gitar dinamis."
    },
    {
      id: "gal-4",
      title: "Desain Kemasan & Branding Mie Ayam 26",
      category: "Packaging",
      image: "/assets/aistudio/Mie_Ayam_26_Mockup_d19c2ca9.jpg",
      description: "Desain identitas brand, bowl kemasan take-away, dan paper cup Mie Ayam 26 bernuansa merah berani yang menggugah selera."
    },
    {
      id: "gal-5",
      title: "Desain Feed & Carousel Instagram Pro",
      category: "Sosial Media",
      image: "/assets/aistudio/feed_ea6c4e07.jpg",
      description: "Layout feed Instagram edukasi & promosi bernuansa royal blue elegan, dilengkapi mockup smartphone 3D dan micro-copywriting berdaya pikat tinggi untuk melipatgandakan engagement brand."
    },
    {
      id: "gal-6",
      title: "Desain Poster Promosi Tiramisu Treats",
      category: "Promosi Visual",
      image: "/assets/aistudio/Gemini_Generated_Image_jcuyonjcuyonjcuy_382c7783.jfif",
      description: "Desain poster promosi kuliner dessert Tiramisu Treats bernuansa oranye hangat dengan komposisi produk menggoda dan tipografi modern."
    },
    {
      id: "gal-video-1",
      title: "Video Animasi 2D Explainer - Satu Menit Selamat (Self CPR)",
      category: "Video & Motion",
      image: "/assets/aistudio/ILM SATU MENIT SELAMAT EDISI SELF CPR.jpg",
      videoUrl: "https://www.youtube.com/watch?v=VbhkQXoDx68",
      description: "Video animasi 2D explainer Iklan Layanan Masyarakat (ILM) 'Satu Menit Selamat: Self CPR' dengan visual kartun edukatif dan narasi profesional."
    },
    {
      id: "gal-video-2",
      title: "Video Iklan Komersial Produk Nescafe",
      category: "Video & Motion",
      image: "/assets/aistudio/nescafe.jpg",
      videoUrl: "https://www.youtube.com/watch?v=RGMWYlcLf7o",
      description: "Motion video komersial produk minuman kopi Nescafe untuk promosi kampanye digital di media sosial."
    },
    {
      id: "gal-video-3",
      title: "Video Konten UGC Iklan & Affiliate Marketing",
      category: "Video & Motion",
      image: "/assets/aistudio/Layanan Konten UGC untuk Affiliate.png",
      videoUrl: "https://www.youtube.com/watch?v=0eO_ZEGjvl4",
      description: "Produksi video konten UGC (User Generated Content) kreatif untuk promosi produk TikTok Shop, Reels, dan kampanye affiliate berkonversi tinggi."
    }
  ],
  testimonials: [
    {
      id: "testi-1",
      name: "Bambang Sudirman",
      role: "Owner, Kopi Selaras Nusantara",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      content: "Sumpah ini beneran sesuai taglinenya: Harga Murah Kualitas Mewah! Desain logo dan kemasan kopi saya dipuji semua pelanggan. Penjualan naik drastis karena kemasannya terlihat seperti produk impor berkelas.",
      rating: 5,
      project: "Paket Logo & Kemasan Kopi"
    },
    {
      id: "testi-2",
      name: "Clarissa Maharani",
      role: "Founder, GlowSecret Botanical",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
      content: "Tim Dky Visualworks sangat sabar dan mengerti betul apa yang saya inginkan. Pengerjaan cepat, revisinya gak ribet, dan file master yang dikasih sangat lengkap sampai vendor cetak saya gak bingung sama sekali.",
      rating: 5,
      project: "Branding Skincare & Packaging"
    },
    {
      id: "testi-3",
      name: "Reza Pratama",
      role: "Marketing Director, Veloce Logistics",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
      content: "Awalnya ragu dengan harganya yang sangat terjangkau, tapi hasilnya di luar ekspektasi! Stationery kantor dan feed LinkedIn kami sekarang terlihat sangat kredibel di depan investor. Highly recommended!",
      rating: 5,
      project: "Corporate Identity & Stationery"
    },
    {
      id: "testi-4",
      name: "Nadya Pramesti",
      role: "Head of Brand, Kulo Pastry",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
      content: "Konsultan AI dan tim desain Dky Visualworks sangat responsif. Dalam 24 jam desain box hampers kami sudah beres dan langsung masuk antrean cetak. Kualitas visualnya bener-bener bintang lima!",
      rating: 5,
      project: "Desain Box Hampers & Stiker"
    }
  ],
  faq: [
    {
      question: "Mengapa Dky Visualworks berani pasang slogan 'Harga Murah Kualitas Mewah'?",
      answer: "Kami percaya setiap pelaku usaha berhak memiliki identitas brand yang memukau tanpa harus terbebani biaya agensi yang puluhan juta rupiah. Melalui alur kerja digital yang efisien, standar desain ketat, dan aset premium terkurasi, kami menghadirkan hasil karya level agensi multinasional dengan harga ramah kantong."
    },
    {
      question: "Berapa lama estimasi pengerjaan desain?",
      answer: "Untuk paket logo dan desain marketing, konsep awal biasanya kami kirimkan dalam 24 hingga 48 jam kerja. Untuk paket skala besar seperti All-In-One Rebranding atau Feed 30 Hari, pengerjaan berkisar 3-5 hari kerja dengan komunikasi progres harian yang transparan."
    },
    {
      question: "Format file apa saja yang akan saya terima?",
      answer: "Anda akan mendapatkan file master vektor yang dapat diperbesar tanpa pecah (AI, EPS, SVG, PDF siap cetak high resolution 300 DPI) serta format siap pakai untuk digital (PNG transparan, JPG kualitas tinggi, dan preview mockup 3D)."
    },
    {
      question: "Bagaimana jika hasil desain belum sesuai dengan keinginan saya?",
      answer: "Kepuasan Anda adalah prioritas utama kami. Kami menyediakan garansi revisi fleksibel. Anda dapat memberikan masukan mengenai warna, font, maupun elemen grafis hingga hasil akhir benar-benar memuaskan visi bisnis Anda."
    },
    {
      question: "Bagaimana cara melakukan pemesanan dan pembayaran?",
      answer: "Sangat mudah! Anda bisa memilih paket di website ini dan klik 'Pesan via WhatsApp', atau gunakan fitur Konsultan AI kami untuk mendapatkan rekomendasi paket terbaik beserta draft brief otomatis yang bisa langsung dikirimkan ke WhatsApp tim kami."
    }
  ]
};

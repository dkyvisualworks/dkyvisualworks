/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Dky Visualworks - Nimbus Portfolio & Creative Studio Theme
 * Slogan: Harga Murah Kualitas Mewah
 * Architecture: Zero-Slop, Mobile First, cPanel Ready by Satelitweb
 */

import React, { useState } from 'react';
import {
  Menu,
  X,
  Sparkles,
  PhoneCall,
  Clock,
  ChevronRight,
  ShieldCheck,
  Check,
  ArrowRight,
  Layers,
  Star,
  Quote,
  CheckCircle,
  MessageCircleQuestion,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Server,
  Maximize2,
  Tag,
  ExternalLink,
  MessageCircle,
  Send,
  Copy,
  RefreshCw,
  Lightbulb,
  Palette,
  Globe,
  Instagram,
  Laptop,
  PenTool,
  Film
} from 'lucide-react';
import { APP_CONFIG } from '../../appConfig.js';

/* 1. Smart Image with Fallback */
function SmartImage({
  src,
  fallbackSrc = 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1200&auto=format&fit=crop',
  alt = 'Visual Asset',
  className = '',
  containerClassName = '',
  ...props
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasFailedOnce, setHasFailedOnce] = useState(false);
  const [hasTotalFailure, setHasTotalFailure] = useState(false);

  const handleError = () => {
    if (!hasFailedOnce && fallbackSrc && currentSrc !== fallbackSrc) {
      setHasFailedOnce(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setHasTotalFailure(true);
    }
  };

  if (hasTotalFailure || !currentSrc) {
    return (
      <div className={`flex flex-col items-center justify-center bg-stone-100 text-[#18191B] p-4 ${containerClassName}`}>
        <span className="text-xs uppercase tracking-widest font-bold">{APP_CONFIG.brandName}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <img
        src={currentSrc}
        alt={alt}
        onError={handleError}
        loading="lazy"
        className={`transition-opacity duration-300 ${className}`}
        {...props}
      />
    </div>
  );
}

/* 2. Nimbus Circular Logo */
function BrandLogo({ theme = 'light', size = 'md' }) {
  const isDark = theme === 'dark';
  return (
    <div className="flex items-center gap-2.5 select-none cursor-pointer">
      <div className="w-9 h-9 rounded-full flex items-center justify-center relative">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="42" stroke={isDark ? '#3A3C42' : '#E5E7EB'} strokeWidth="8" />
          <path d="M50 8C73.196 8 92 26.804 92 50C92 73.196 73.196 92 50 92" stroke="#FFB800" strokeWidth="8" strokeLinecap="round" />
          <circle cx="50" cy="50" r="16" fill={isDark ? '#FFFFFF' : '#18191B'} />
          <circle cx="50" cy="50" r="8" fill="#FFB800" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`font-black tracking-tight text-base uppercase ${isDark ? 'text-white' : 'text-[#18191B]'}`}>
          DKY <span className="text-[#FFB800]">VISUALWORKS</span>
        </span>
        <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
          {APP_CONFIG.tagline}
        </span>
      </div>
    </div>
  );
}

/* 3. Main Client App */
export default function App() {
  const [isAIConsultantOpen, setIsAIConsultantOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [activeGalleryCat, setActiveGalleryCat] = useState('Semua');
  const [galleryModalItem, setGalleryModalItem] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // AI Modal
  const [clientName, setClientName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Kuliner & Kafe (F&B)');
  const [designNeed, setDesignNeed] = useState('Logo & Branding Eksklusif');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const openAIConsultant = (need = '') => {
    if (need) setDesignNeed(need);
    setIsAIConsultantOpen(true);
  };

  const handleWhatsApp = (customText = '') => {
    const text = encodeURIComponent(
      customText || `Halo ${APP_CONFIG.brandName}, saya ingin konsultasi kebutuhan desain grafis (${APP_CONFIG.tagline}).`
    );
    const isMobile =
      typeof navigator !== 'undefined' &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const url = isMobile
      ? `https://api.whatsapp.com/send?phone=${APP_CONFIG.contact.whatsapp}&text=${text}`
      : `https://web.whatsapp.com/send?phone=${APP_CONFIG.contact.whatsapp}&text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAiConsult = async (e) => {
    e.preventDefault();
    setAiLoading(true);
    try {
      const res = await fetch('/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName, businessName, businessType, designNeed }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAiResult(data.data);
      } else {
        throw new Error('Fallback');
      }
    } catch {
      setAiResult({
        greeting: `Halo Kak ${clientName || 'Partner'}! Selamat datang di ${APP_CONFIG.brandName}.`,
        analysis: `Untuk bisnis "${businessName || 'Anda'}", identitas visual yang profesional ala Nimbus style memikat konsumen secara instan.`,
        suggestedPackageName: 'Paket Logo Branding Eksklusif',
        estimatedPrice: 'Rp 249.000',
        creativeConcept: 'Kombinasi warna Vibrant Yellow (#FFB800) dan Deep Charcoal dengan tipografi bersih.',
        actionableTips: ['Pastikan kontras teks tajam', 'Gunakan file master 300 DPI', 'Konsistensi feed sosial media'],
        whatsappDraft: `Halo Admin ${APP_CONFIG.brandName}, saya ${clientName} dari "${businessName}". Saya tertarik memesan desain grafis. Mohon infonya!`
      });
    } finally {
      setAiLoading(false);
    }
  };

  const filteredProducts =
    activeCategory === 'Semua'
      ? APP_CONFIG.products
      : APP_CONFIG.products.filter((p) => p.category.includes(activeCategory) || activeCategory.includes(p.category));

  const filteredGallery =
    activeGalleryCat === 'Semua'
      ? APP_CONFIG.gallery
      : APP_CONFIG.gallery.filter((g) => g.category.includes(activeGalleryCat) || activeGalleryCat.includes(g.category));

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#18191B] flex flex-col font-sans">
      {/* Navbar matching Nimbus */}
      <header className="sticky top-0 z-40 bg-white border-b border-stone-200/80 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#beranda">
            <BrandLogo />
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold tracking-wide text-[#6C7278]">
            <a href="#beranda" className="text-[#18191B] font-extrabold border-b-2 border-[#FFB800] pb-0.5">Home</a>
            
            <div className="relative group/pkg py-2">
              <a href="#layanan" className="hover:text-[#18191B] flex items-center gap-1">
                <span>Paket Desain</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover/pkg:rotate-180 transition-transform" />
              </a>

              <div className="absolute top-full left-0 pt-1 w-72 hidden group-hover/pkg:block z-50 animate-fadeIn">
                <div className="bg-white rounded-2xl border border-stone-200 shadow-xl p-2 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-[#FFB800] px-3 py-1 border-b border-stone-100">
                    Daftar Paket Desain
                  </div>
                  {[
                    'Paket Logo Branding Eksklusif',
                    'Paket Feed & Story Sosial Media',
                    'Paket Kemasan & Label Produk',
                    'Paket Stationery & Corporate Kit',
                    'Paket Banner Promosi & Marketing',
                    'Paket All-In-One Visual Brand Rebrand',
                  ].map((pkgName) => (
                    <a
                      key={pkgName}
                      href="#layanan"
                      className="block px-3 py-1.5 rounded-lg text-xs font-medium text-[#18191B] hover:bg-stone-50 hover:text-[#FFB800] transition-colors"
                    >
                      {pkgName}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a href="#portofolio" className="hover:text-[#18191B]">Portfolio</a>
            <a href="#tentang" className="hover:text-[#18191B]">About Us</a>
            <a href="#skills" className="hover:text-[#18191B]">Skills</a>
            <a href="#faq" className="hover:text-[#18191B]">Contacts</a>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => openAIConsultant()}
              className="p-2 text-stone-600 hover:text-[#18191B]"
              title="Konsultan AI"
            >
              <Sparkles className="w-4 h-4 text-[#FFB800]" />
            </button>
            <button
              onClick={() => handleWhatsApp()}
              className="bg-[#18191B] hover:bg-stone-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 shadow"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>Contact Me</span>
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-[#18191B]">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="beranda" className="bg-white pt-10 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="font-handwriting text-5xl text-stone-300 block -mb-4">Creative</span>
              <h1 className="text-4xl sm:text-5xl font-black text-[#18191B] tracking-tight leading-tight">
                Dky <span className="text-[#FFB800]">Visualworks</span>
              </h1>
              <p className="text-sm sm:text-base text-[#6C7278] leading-relaxed">
                {APP_CONFIG.description}. Spesialis logo eksklusif, feed Instagram, dan kemasan dengan motto: <strong className="text-[#18191B]">"{APP_CONFIG.tagline}"</strong>.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => openAIConsultant()}
                  className="bg-[#FFB800] hover:bg-[#F2AC00] text-[#18191B] font-extrabold px-6 py-3.5 rounded-lg text-xs flex items-center gap-2 shadow"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Konsultasi AI</span>
                </button>
                <button
                  onClick={() => handleWhatsApp()}
                  className="bg-[#18191B] text-white font-extrabold px-6 py-3.5 rounded-lg text-xs flex items-center gap-2 shadow"
                >
                  <PhoneCall className="w-4 h-4 text-[#FFB800]" />
                  <span>Pesan Desain</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-sm aspect-[2/3]">
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <SmartImage src={APP_CONFIG.heroImage} alt="Hero Portrait" className="w-full h-full object-contain drop-shadow-2xl" />
                </div>
              </div>
            </div>

          </div>

          {/* 3 Quick Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#18191B] text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#18191B]">UI/UX & Logo Designer</div>
                <div className="text-xs text-stone-500">Creative branding for you</div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FFB800] text-[#18191B] flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#18191B]">Social Media & Packaging</div>
                <div className="text-xs text-stone-500">Feed rapi & siap cetak</div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-stone-100 text-[#18191B] flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#18191B]">Visual Brand Consultant</div>
                <div className="text-xs text-stone-500">Harga Murah Kualitas Mewah</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hi There & Skills */}
      <section id="tentang" className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm aspect-square">
                <div className="relative z-10 w-full h-full flex items-end justify-center">
                  <SmartImage src={APP_CONFIG.creativePersonImage} alt="Potret Profesional Pria Berkacamata" className="w-full h-full object-contain object-bottom drop-shadow-2xl" />
                </div>
                <span className="font-handwriting text-5xl font-black text-[#18191B] absolute -top-4 -left-4">Hi There!</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-[#18191B]">
                Need Creative Design? <br /><span className="text-[#FFB800]">We Can Help You!</span>
              </h2>
              <p className="text-sm text-[#6C7278] leading-relaxed">
                Kami siap membantu identitas merk Anda memiliki daya pikat tinggi dan kredibilitas maksimal di hadapan pembeli.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#0057FF] text-white text-xs font-bold rounded">BEHANCE</span>
                <span className="px-3 py-1 bg-[#EA4C89] text-white text-xs font-bold rounded">DRIBBBLE</span>
                <span className="px-3 py-1 bg-[#F56040] text-white text-xs font-bold rounded">INSTAGRAM</span>
                <span className="px-3 py-1 bg-[#25D366] text-white text-xs font-bold rounded">WHATSAPP</span>
              </div>
            </div>
          </div>

          {/* Skills Grid */}
          <div id="skills" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8">
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-black text-[#18191B]">
                What My Design <span className="text-[#FFB800]">Skills Included</span>
              </h3>
              <div className="space-y-3 pt-2">
                {APP_CONFIG.skills.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>{s.name}</span>
                      <span>{s.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-200 rounded-full">
                      <div className="h-full bg-[#FFB800] rounded-full" style={{ width: `${s.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {['UI/UX Design', 'Graphic Design', 'Motion & Feed', 'Photo Retouch'].map((item) => (
                <div key={item} className="bg-white p-5 rounded-2xl border border-stone-200 text-center shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#18191B] text-[#FFB800] flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-sm">{item}</h4>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Services */}
      <section id="layanan" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#18191B]">
              Paket Desain <span className="text-[#FFB800]">Harga Murah</span> Kualitas Mewah
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-44 bg-stone-100 relative">
                    <SmartImage src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-[#18191B] text-[#FFB800] text-[10px] font-bold px-2 py-0.5 rounded">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-base">{p.name}</h3>
                    <p className="text-xs text-stone-500 mt-1">{p.description}</p>
                    <div className="mt-3 text-xl font-black text-[#18191B]">{p.price}</div>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleWhatsApp(`Pesan ${p.name}`)}
                    className="w-full bg-[#18191B] text-[#FFB800] font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Pesan via WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#18191B] text-white py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-400">
          <BrandLogo theme="dark" />
          <span>&copy; {new Date().getFullYear()} {APP_CONFIG.brandName}. Tagline: {APP_CONFIG.tagline}.</span>
          <span className="text-[#FFB800] font-bold">Engineered by Satelitweb</span>
        </div>
      </footer>
    </div>
  );
}

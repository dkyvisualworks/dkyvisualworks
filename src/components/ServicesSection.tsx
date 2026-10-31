/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Check,
  Sparkles,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { SmartImage } from './SmartImage.tsx';
import { APP_CONFIG } from '../../appConfig.js';
import { openWhatsApp } from '../utils/whatsapp.ts';

interface ServicesSectionProps {
  onOpenAIConsultant: (need?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenAIConsultant }) => {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = [
    'Semua',
    'Logo & Identitas',
    'Sosial Media',
    'Packaging & Cetak',
    'Corporate Identity',
    'Promosi Visual',
  ];

  const filteredProducts =
    activeCategory === 'Semua'
      ? APP_CONFIG.products
      : APP_CONFIG.products.filter(
          (p) =>
            p.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
            activeCategory.toLowerCase().includes(p.category.toLowerCase())
        );

  const handleOrderWhatsApp = (productName: string, price: string) => {
    openWhatsApp(
      APP_CONFIG.contact.whatsapp,
      `Halo ${APP_CONFIG.brandName}, saya ingin memesan "${productName}" (${price}) seperti yang tertera di website. Mohon info langkah pengerjaan dan detail rekeningnya. Terima kasih!`
    );
  };

  return (
    <section id="layanan" className="py-20 lg:py-28 bg-white text-[#18191B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18191B] text-[#FFB800] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Koleksi Paket Desain</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18191B] tracking-tight">
            Pilihan Paket <span className="text-[#FFB800]">Harga Murah</span> Kualitas Mewah
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6C7278] leading-relaxed">
            Transparansi harga tanpa biaya tersembunyi. Setiap paket mencakup file master resolusi tinggi 300 DPI dan garansi revisi sampai puas.
          </p>

          {/* Interactive Filter Controls */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 p-1.5 bg-[#F8F9FA] rounded-2xl border border-stone-200/80 max-w-2xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  activeCategory === cat
                    ? 'bg-[#18191B] text-[#FFB800] shadow-sm'
                    : 'text-[#6C7278] hover:text-[#18191B] hover:bg-stone-200/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isFeatured = product.id === 'pkg-logo' || product.id === 'pkg-full-rebrand';

            return (
              <div
                key={product.id}
                className={`relative flex flex-col rounded-3xl overflow-hidden bg-white border transition-all duration-300 nimbus-card-shadow hover:-translate-y-1.5 ${
                  isFeatured
                    ? 'border-[#FFB800] ring-2 ring-[#FFB800]/40'
                    : 'border-stone-100'
                }`}
              >
                {/* Header Tag / Badge */}
                {product.tag && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider rounded-lg bg-[#18191B] text-[#FFB800] shadow-md">
                      {product.tag}
                    </span>
                  </div>
                )}

                {/* Badge Top Right */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-white/90 backdrop-blur-sm text-[#18191B] shadow border border-stone-200">
                    {product.badge}
                  </span>
                </div>

                {/* Image Showcase */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <SmartImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs font-bold text-white/95 uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#18191B] leading-snug">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#6C7278] leading-relaxed">
                      {product.description}
                    </p>

                    {/* Price Tag Block */}
                    <div className="mt-5 p-3.5 rounded-2xl bg-[#F8F9FA] border border-stone-200/80">
                      <div className="text-[11px] text-[#6C7278] line-through font-medium">
                        Harga Normal: {product.originalPrice}
                      </div>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-2xl sm:text-3xl font-black text-[#18191B]">
                          {product.price}
                        </span>
                        <span className="text-xs font-bold text-[#FFB800] uppercase tracking-wide">
                          / Paket Lengkap
                        </span>
                      </div>
                    </div>

                    {/* Features Checklist */}
                    <div className="mt-5 space-y-2.5">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#18191B] flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#FFB800]" />
                        <span>Fasilitas yang Didapat:</span>
                      </div>
                      <ul className="space-y-2">
                        {product.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#4A4540]">
                            <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={() => handleOrderWhatsApp(product.name, product.price)}
                      className="w-full bg-[#18191B] hover:bg-[#2D2E32] text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition-all group"
                    >
                      <PhoneCall className="w-4 h-4 text-[#FFB800]" />
                      <span>Pesan via WhatsApp</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => onOpenAIConsultant(product.name)}
                      className="w-full py-2.5 px-3 rounded-xl bg-transparent hover:bg-stone-100 text-[#6C7278] hover:text-[#18191B] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span>Konsultasikan Paket Ini via AI</span>
                    </button>
                  </div>
                </div>

                {/* Footer guarantee bar */}
                <div className="px-6 py-2.5 bg-[#F8F9FA] border-t border-stone-100 flex items-center justify-between text-[11px] text-[#6C7278]">
                  <span className="flex items-center gap-1 font-semibold text-[#18191B]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FFB800]" />
                    Revisi Fleksibel
                  </span>
                  <span>Master File 300 DPI</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Project Box */}
        <div className="mt-16 rounded-3xl bg-[#18191B] text-white p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-[#FFB800]" />
              Butuh Desain Kustom Spesifik Sesuai Visi Bisnis Anda?
            </h3>
            <p className="text-sm text-stone-300 max-w-xl">
              Kami siap melayani kebutuhan desain custom lainnya seperti menu restoran, katalog produk, desain booth pameran, hingga company profile format majalah.
            </p>
          </div>
          <button
            onClick={() => onOpenAIConsultant('Desain Kustom Spesifik')}
            className="shrink-0 nimbus-btn-yellow text-[#18191B] font-extrabold px-6 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-lg"
          >
            <span>Konsultasi Proyek Kustom</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

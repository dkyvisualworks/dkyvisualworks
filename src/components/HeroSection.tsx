/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Sparkles,
  PhoneCall,
  Check,
  ChevronRight,
  Mail,
  Phone,
  Layers,
  Palette,
  Package,
} from 'lucide-react';
import { SmartImage } from './SmartImage.tsx';
import { APP_CONFIG } from '../../appConfig.js';
import { openWhatsApp } from '../utils/whatsapp.ts';

interface HeroSectionProps {
  onOpenAIConsultant: (need?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAIConsultant }) => {
  const handleWhatsAppOrder = () => {
    openWhatsApp(
      APP_CONFIG.contact.whatsapp,
      `Halo ${APP_CONFIG.brandName}, saya melihat portofolio Anda dan tertarik untuk pesan desain grafis (Harga Murah Kualitas Mewah).`
    );
  };

  return (
    <section id="beranda" className="relative bg-white pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      
      {/* Topo lines & dot pattern container on the left (mimicking Nimbus reference) */}
      <div className="absolute top-12 -left-20 w-64 h-80 pointer-events-none hidden md:block">
        {/* Dark organic shape with topo lines */}
        <svg viewBox="0 0 200 240" className="w-full h-full text-[#18191B]" fill="currentColor">
          <path d="M40,20 C110,-10 180,30 190,90 C200,160 140,210 80,230 C20,250 -10,190 5,120 C15,70 0,40 40,20 Z" />
        </svg>
        {/* Golden Dot Matrix Scatter */}
        <div className="absolute top-28 left-20 w-24 h-24 opacity-80 bg-[radial-gradient(#FFB800_2px,transparent_2px)] [background-size:10px_10px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline & Bio Info */}
          <div className="lg:col-span-6 space-y-6 pt-4 lg:pt-0">
            
            {/* Watermark Script Text behind headline */}
            <div className="relative">
              <span className="font-handwriting absolute -top-10 -left-2 text-6xl sm:text-7xl text-stone-200/70 select-none pointer-events-none">
                Creative
              </span>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#18191B] tracking-tight leading-tight">
                Dky <span className="text-[#FFB800]">Visualworks</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#6C7278] leading-relaxed max-w-xl">
              Studio kreatif dan konsultan identitas visual dengan standar internasional. Kami menghadirkan karya berkelas dengan prinsip: <strong className="text-[#18191B] font-bold">"{APP_CONFIG.tagline}"</strong> untuk logo UMKM, branding produk, feed sosial media, dan kemasan.
            </p>

            {/* Quick Contact Specs matching reference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 text-xs border-y border-stone-100">
              <div className="space-y-0.5">
                <span className="font-extrabold text-[#18191B] uppercase tracking-wider text-[11px]">
                  Email:
                </span>
                <p className="text-[#6C7278] font-medium flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>{APP_CONFIG.contact.email}</span>
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="font-extrabold text-[#18191B] uppercase tracking-wider text-[11px]">
                  WhatsApp / Konsultasi:
                </span>
                <p className="text-[#6C7278] font-medium flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>{APP_CONFIG.contact.displayPhone}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons matching Nimbus: Yellow primary + Black secondary */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onOpenAIConsultant()}
                className="nimbus-btn-yellow font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-lg flex items-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Konsultasi AI Cerdas</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="nimbus-btn-black font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-lg flex items-center gap-2 shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-[#FFB800]" />
                <span>Pesan Desain via WA</span>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Portrait Visual */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[2/3] flex items-center justify-center">
              
              {/* Portrait Visual Image without yellow background */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <SmartImage
                  src={APP_CONFIG.heroImage}
                  fallbackSrc={APP_CONFIG.heroFallback}
                  alt="Dky Visualworks Creative Designer"
                  className="w-full h-full object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

            </div>
          </div>

        </div>

        {/* Overlapping 3 Quick Service Cards (Exact Nimbus Pattern) */}
        <div className="mt-14 lg:-mb-12 relative z-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Card 1 */}
          <div
            onClick={() => onOpenAIConsultant('Logo & Branding Eksklusif')}
            className="bg-white p-5 rounded-2xl border border-stone-100 nimbus-card-shadow hover:-translate-y-1 transition-all duration-300 flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#18191B] text-white flex items-center justify-center shrink-0 shadow">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#18191B] group-hover:text-[#FFB800] transition-colors">
                  UI/UX & Logo Designer
                </h4>
                <p className="text-xs text-[#6C7278]">
                  Identitas visual berfilosofi kuat
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-[#18191B] group-hover:translate-x-1 transition-all" />
          </div>

          {/* Card 2 */}
          <div
            onClick={() => onOpenAIConsultant('Feed & Story Sosial Media')}
            className="bg-white p-5 rounded-2xl border border-stone-100 nimbus-card-shadow hover:-translate-y-1 transition-all duration-300 flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#FFB800] text-[#18191B] flex items-center justify-center shrink-0 shadow">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#18191B] group-hover:text-[#FFB800] transition-colors">
                  Social Media & Packaging
                </h4>
                <p className="text-xs text-[#6C7278]">
                  Feed Instagram & kemasan siap cetak
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-[#18191B] group-hover:translate-x-1 transition-all" />
          </div>

          {/* Card 3 */}
          <div
            onClick={() => onOpenAIConsultant('All-In-One Visual Brand Rebrand')}
            className="bg-white p-5 rounded-2xl border border-stone-100 nimbus-card-shadow hover:-translate-y-1 transition-all duration-300 flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-stone-100 text-[#18191B] flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#18191B] group-hover:text-[#FFB800] transition-colors">
                  Visual Brand Consultant
                </h4>
                <p className="text-xs text-[#6C7278]">
                  Harga Murah Kualitas Mewah
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-[#18191B] group-hover:translate-x-1 transition-all" />
          </div>

        </div>

      </div>
    </section>
  );
};

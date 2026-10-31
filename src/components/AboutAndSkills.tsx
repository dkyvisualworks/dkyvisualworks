/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Globe,
  Instagram,
  MessageCircle,
  ExternalLink,
  Laptop,
  PenTool,
  Film,
  Sparkles,
  Palette,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { SmartImage } from './SmartImage.tsx';
import { APP_CONFIG } from '../../appConfig.js';
import { getWhatsAppUrl } from '../utils/whatsapp.ts';

interface AboutAndSkillsProps {
  onOpenAIConsultant: (need?: string) => void;
}

export const AboutAndSkills: React.FC<AboutAndSkillsProps> = ({ onOpenAIConsultant }) => {
  return (
    <div id="tentang" className="bg-[#F8F9FA] pt-24 pb-20 space-y-24 overflow-hidden">
      
      {/* -------------------------------------------------------------
          Section 1: "Hi There! Need Creative Design? I can Help You!"
          ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Yellow Organic Blob with Creative Person & "Hi There!" */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square">
              
              {/* Designer Image (Clean background, transparent cutout) */}
              <div className="relative z-10 w-full h-full flex items-end justify-center">
                <SmartImage
                  src={APP_CONFIG.creativePersonImage}
                  fallbackSrc={APP_CONFIG.heroImage}
                  alt="Potret Profesional Pria Berkacamata"
                  className="w-full h-full object-contain object-bottom drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Playful "Hi There!" Bold Handwriting Banner (Exact Nimbus Match) */}
              <div className="absolute -top-4 -left-4 sm:-left-8 z-20">
                <span className="font-handwriting font-bold text-5xl sm:text-6xl text-[#18191B] drop-shadow-sm select-none leading-none rotate-[-6deg] block">
                  Hi<br />There!
                </span>
              </div>

              {/* Dark pebble accent on right */}
              <div className="absolute top-1/2 -right-8 w-14 h-20 bg-[#18191B] blob-organic hidden sm:block opacity-90" />
            </div>
          </div>

          {/* Right: "Need Creative Design? I can Help You!" */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-start gap-3">
              {/* Vertical "about us" label */}
              <div className="hidden sm:flex flex-col items-center pt-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#9AA0A6] [writing-mode:vertical-lr] rotate-180">
                  about us
                </span>
                <div className="w-px h-8 bg-stone-300 mt-2" />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18191B] tracking-tight">
                  Need Creative Design? <br />
                  <span className="text-[#FFB800]">We Can Help You!</span>
                </h2>

                <p className="text-sm sm:text-base text-[#6C7278] leading-relaxed max-w-xl">
                  {APP_CONFIG.description}. Kami memadukan riset persona brand, psikologi warna modern, dan keahlian teknis grafis untuk menciptakan logo, packaging, dan feed sosial media yang berdaya pikat tinggi.
                </p>

                <p className="text-sm text-[#6C7278] leading-relaxed max-w-xl">
                  Bagi kami, setiap pelaku usaha dan UMKM berhak atas standar visual kelas agensi global tanpa harus membayar harga yang mahal. Itulah komitmen sejati dari slogan <strong className="text-[#18191B]">"{APP_CONFIG.tagline}"</strong>.
                </p>

                {/* Social Follow Pill Buttons (Exact Nimbus Reference) */}
                <div className="pt-4 space-y-2">
                  <div className="text-xs font-bold text-[#18191B] uppercase tracking-wider">
                    You Can Follow Us Also Here:
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    {/* Behance Button */}
                    <a
                      href="https://behance.net"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0057FF] text-white text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>BEHANCE</span>
                    </a>

                    {/* Dribbble Button */}
                    <a
                      href="https://dribbble.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#EA4C89] text-white text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
                    >
                      <Palette className="w-3.5 h-3.5" />
                      <span>DRIBBBLE</span>
                    </a>

                    {/* Instagram Button */}
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#F56040] text-white text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>INSTA</span>
                    </a>

                    {/* WhatsApp Button */}
                    <a
                      href={getWhatsAppUrl(APP_CONFIG.contact.whatsapp, `Halo ${APP_CONFIG.brandName}, saya ingin konsultasi kebutuhan desain grafis.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#25D366] text-white text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WHATSAPP CS</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          Section 2: "What My Design Skills Included" (Exact Nimbus Match)
          ------------------------------------------------------------- */}
      <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Skills Progress Bars & Headline */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-start gap-3">
              {/* Vertical "my skills" label */}
              <div className="hidden sm:flex flex-col items-center pt-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#9AA0A6] [writing-mode:vertical-lr] rotate-180">
                  my skills
                </span>
                <div className="w-px h-8 bg-stone-300 mt-2" />
              </div>

              <div className="space-y-4 flex-1">
                <h2 className="text-3xl sm:text-4xl font-black text-[#18191B] tracking-tight">
                  What My Design <br />
                  <span className="text-[#FFB800]">Skills Included</span>
                </h2>

                <p className="text-xs sm:text-sm text-[#6C7278] leading-relaxed max-w-md">
                  Inilah perangkat lunak dan keahlian teknis harian yang kami kuasai penuh. Setiap proyek dieksekusi dengan standar master vektor 300 DPI siap cetak maupun display digital.
                </p>

                {/* Progress Bars (Nimbus Style) */}
                <div className="space-y-4 pt-3">
                  {APP_CONFIG.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-[#18191B] uppercase tracking-wider">{skill.name}</span>
                        <span className="text-[#6C7278]">{skill.percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FFB800] rounded-full transition-all duration-1000"
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenAIConsultant()}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#18191B] hover:text-[#FFB800] transition-colors"
                  >
                    <span>Konsultasikan Kebutuhan Software & Format Master</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 4 Square Floating Cards (Exact Nimbus 2x2 Grid) */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              
              {/* Card 1: UI/UX Design */}
              <div
                onClick={() => onOpenAIConsultant('UI/UX & Web Design')}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-100 nimbus-card-shadow flex flex-col items-center text-center space-y-3 cursor-pointer hover:-translate-y-1.5 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#18191B] text-white flex items-center justify-center shadow group-hover:bg-[#FFB800] group-hover:text-[#18191B] transition-colors">
                  <Laptop className="w-7 h-7" />
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-[#18191B]">
                  UI/UX Design
                </h4>
                <p className="text-[11px] text-[#6C7278] leading-relaxed">
                  Prototipe Figma & tampilan web interaktif
                </p>
              </div>

              {/* Card 2: Graphic Design */}
              <div
                onClick={() => onOpenAIConsultant('Paket Logo Branding Eksklusif')}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-100 nimbus-card-shadow flex flex-col items-center text-center space-y-3 cursor-pointer hover:-translate-y-1.5 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#18191B] text-white flex items-center justify-center shadow group-hover:bg-[#FFB800] group-hover:text-[#18191B] transition-colors">
                  <PenTool className="w-7 h-7" />
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-[#18191B]">
                  Graphic Design
                </h4>
                <p className="text-[11px] text-[#6C7278] leading-relaxed">
                  Logo eksklusif berfilosofi & master vektor
                </p>
              </div>

              {/* Card 3: Motion & Social Feed */}
              <div
                onClick={() => onOpenAIConsultant('Paket Feed & Story Sosial Media')}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-100 nimbus-card-shadow flex flex-col items-center text-center space-y-3 cursor-pointer hover:-translate-y-1.5 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#18191B] text-white flex items-center justify-center shadow group-hover:bg-[#FFB800] group-hover:text-[#18191B] transition-colors">
                  <Film className="w-7 h-7" />
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-[#18191B]">
                  Social Media Feed
                </h4>
                <p className="text-[11px] text-[#6C7278] leading-relaxed">
                  Feed Instagram, carousel & banner promo
                </p>
              </div>

              {/* Card 4: Photo Retouch & Packaging */}
              <div
                onClick={() => onOpenAIConsultant('Paket Kemasan & Label Produk')}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-100 nimbus-card-shadow flex flex-col items-center text-center space-y-3 cursor-pointer hover:-translate-y-1.5 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#18191B] text-white flex items-center justify-center shadow group-hover:bg-[#FFB800] group-hover:text-[#18191B] transition-colors">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-[#18191B]">
                  Photo & Packaging
                </h4>
                <p className="text-[11px] text-[#6C7278] leading-relaxed">
                  Kemasan produk, die-cut & olah gambar HD
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

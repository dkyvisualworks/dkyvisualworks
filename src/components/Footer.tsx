/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Server,
  Instagram,
  Globe,
  MessageCircle,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';
import { APP_CONFIG } from '../../appConfig.js';
import { openWhatsApp, getWhatsAppUrl } from '../utils/whatsapp.ts';

interface FooterProps {
  onOpenAIConsultant: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAIConsultant }) => {
  const currentYear = new Date().getFullYear();

  const handleWhatsApp = () => {
    openWhatsApp(
      APP_CONFIG.contact.whatsapp,
      `Halo ${APP_CONFIG.brandName}, saya ingin konsultasi mengenai layanan desain visual (Harga Murah Kualitas Mewah).`
    );
  };

  return (
    <footer className="bg-[#18191B] text-white pt-16 pb-12 select-none border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info (Cols 5) */}
          <div className="lg:col-span-5 space-y-5">
            <BrandLogo theme="dark" size="lg" showTagline={true} />
            <p className="text-sm text-stone-300 max-w-md leading-relaxed">
              {APP_CONFIG.brandName} adalah studio kreatif terpercaya untuk jasa desain grafis, branding logo berfilosofi tinggi, manajemen visual sosial media, serta kemasan produk. Kami menghadirkan standar mutu agensi global dengan semboyan: <strong className="text-[#FFB800]">"{APP_CONFIG.tagline}"</strong>.
            </p>
            
            {/* Social Icons matching Nimbus */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FFB800] hover:text-[#18191B] flex items-center justify-center transition-colors"
                title="Behance"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FFB800] hover:text-[#18191B] flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppUrl(APP_CONFIG.contact.whatsapp, `Halo ${APP_CONFIG.brandName}, saya ingin konsultasi mengenai layanan desain visual.`)}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FFB800] hover:text-[#18191B] flex items-center justify-center transition-colors"
                title="Chat WhatsApp Resmi"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (Cols 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-black tracking-widest text-[#FFB800]">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300">
              <li>
                <a href="#beranda" className="hover:text-[#FFB800] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-[#FFB800] transition-colors">
                  Paket & Harga
                </a>
              </li>
              <li>
                <a href="#portofolio" className="hover:text-[#FFB800] transition-colors">
                  Portfolio Galeri
                </a>
              </li>
              <li>
                <a href="#tentang" className="hover:text-[#FFB800] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#FFB800] transition-colors">
                  My Skills
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#FFB800] transition-colors">
                  Contacts & FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Layanan Populer (Cols 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-black tracking-widest text-[#FFB800]">
              Layanan Utama
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300">
              <li>
                <a href="#layanan" className="hover:text-[#FFB800] transition-colors">
                  UI/UX & Logo Design
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-[#FFB800] transition-colors">
                  Feed & Story Instagram
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-[#FFB800] transition-colors">
                  Desain Kemasan Box
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-[#FFB800] transition-colors">
                  Stationery & Corporate
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAIConsultant}
                  className="text-[#FFB800] hover:underline flex items-center gap-1 font-bold pt-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Konsultasi AI Gratis</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (Cols 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-black tracking-widest text-[#FFB800]">
              Kontak Kami
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-stone-300">
              <div
                onClick={handleWhatsApp}
                className="flex items-start gap-2.5 cursor-pointer hover:text-[#FFB800] transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bold text-white">{APP_CONFIG.contact.displayPhone}</div>
                  <div className="text-[11px] text-stone-400">WhatsApp CS 24 Jam</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">{APP_CONFIG.contact.email}</div>
                  <div className="text-[11px] text-stone-400">Respon Resmi & Penawaran</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-white">{APP_CONFIG.contact.workingHours}</div>
                  <div className="text-[11px] text-stone-400">Pengerjaan & Konsultasi</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                <div className="text-xs text-stone-300">
                  {APP_CONFIG.contact.address}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            &copy; {currentYear} {APP_CONFIG.brandName}. All rights reserved. Slogan: {APP_CONFIG.tagline}.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-stone-400">
              <Server className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>cPanel Ready Architecture</span>
            </span>
            <span>·</span>
            <span className="text-[#FFB800] font-bold">
              Engineered for Satelitweb
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

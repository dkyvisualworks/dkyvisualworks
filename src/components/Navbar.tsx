/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Sparkles,
  PhoneCall,
  ChevronDown,
  Instagram,
  Globe,
  MessageCircle,
  Layers,
  ArrowRight,
  Check,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';
import { APP_CONFIG } from '../../appConfig.js';
import { openWhatsApp, getWhatsAppUrl } from '../utils/whatsapp.ts';

interface NavbarProps {
  onOpenAIConsultant: (need?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAIConsultant }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const packagesList = [
    {
      id: 'pkg-logo',
      name: 'Paket Logo Branding Eksklusif',
      price: APP_CONFIG.products[0]?.price || 'Rp 299.000',
      category: 'Logo & Identitas',
    },
    {
      id: 'pkg-social-media',
      name: 'Paket Feed & Story Sosial Media',
      price: APP_CONFIG.products[1]?.price || 'Rp 499.000',
      category: 'Sosial Media',
    },
    {
      id: 'pkg-packaging',
      name: 'Paket Kemasan & Label Produk',
      price: APP_CONFIG.products[2]?.price || 'Rp 299.000',
      category: 'Packaging & Cetak',
    },
    {
      id: 'pkg-stationery',
      name: 'Paket Stationery & Corporate Kit',
      price: APP_CONFIG.products[3]?.price || 'Rp 249.000',
      category: 'Corporate Identity',
    },
    {
      id: 'pkg-marketing',
      name: 'Paket Banner Promosi & Marketing',
      price: APP_CONFIG.products[4]?.price || 'Rp 489.000',
      category: 'Promosi Visual',
    },
    {
      id: 'pkg-full-rebrand',
      name: 'Paket All-In-One Visual Brand Rebrand',
      price: APP_CONFIG.products[5]?.price || 'Rp 999.000',
      category: 'Full Solution VIP',
    },
  ];

  const handleWhatsAppClick = () => {
    openWhatsApp(
      APP_CONFIG.contact.whatsapp,
      `Halo ${APP_CONFIG.brandName}, saya ingin konsultasi kebutuhan desain grafis (Harga Murah Kualitas Mewah).`
    );
  };

  const handleSelectPackage = (packageName: string) => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    // Smooth scroll to services section
    const el = document.getElementById('layanan');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.05)] py-3 border-b border-stone-200/60'
          : 'bg-white py-4 border-b border-stone-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo (Nimbus-inspired) */}
        <a href="#beranda" className="flex items-center">
          <BrandLogo theme="light" size="md" showTagline={false} />
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <a
            href="#beranda"
            className="text-xs font-bold tracking-wide flex items-center gap-1 transition-colors relative py-1 text-[#18191B] font-extrabold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#FFB800]"
          >
            <span>Home</span>
          </a>

          {/* Combo Box Menu: Paket Desain */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <a
              href="#layanan"
              onClick={(e) => {
                // allow toggle on click
                setDropdownOpen(!dropdownOpen);
              }}
              className="text-xs font-bold tracking-wide flex items-center gap-1 transition-colors relative py-1 text-[#6C7278] hover:text-[#18191B] cursor-pointer group"
            >
              <span className="group-hover:text-[#18191B]">Paket Desain</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180 text-[#FFB800]' : 'group-hover:text-[#18191B]'
                }`}
              />
            </a>

            {/* Desktop Combo Box Dropdown List */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 pt-2 w-80 z-50 animate-fadeIn">
                <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xl p-2.5 overflow-hidden">
                  <div className="px-3 py-2 border-b border-stone-100 mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FFB800]">
                      Daftar Paket Desain
                    </span>
                    <span className="text-[10px] text-stone-400 font-semibold">6 Pilihan</span>
                  </div>

                  <div className="space-y-1">
                    {packagesList.map((pkg, idx) => (
                      <button
                        key={pkg.id}
                        onClick={() => handleSelectPackage(pkg.name)}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F8F9FA] transition-all flex items-center justify-between group/item"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <div className="w-6 h-6 rounded-lg bg-stone-100 group-hover/item:bg-[#18191B] group-hover/item:text-[#FFB800] text-stone-600 flex items-center justify-center shrink-0 transition-colors text-[10px] font-bold">
                            {idx + 1}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#18191B] group-hover/item:text-[#FFB800] transition-colors truncate">
                              {pkg.name}
                            </div>
                            <div className="text-[10px] text-[#6C7278]">
                              {pkg.category}
                            </div>
                          </div>
                        </div>

                        <span className="text-[11px] font-extrabold text-[#18191B] bg-stone-50 group-hover/item:bg-[#FFB800] group-hover/item:text-[#18191B] px-2 py-0.5 rounded-md shrink-0 transition-colors">
                          {pkg.price}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Dropdown footer action */}
                  <div className="mt-2 pt-2 border-t border-stone-100 px-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenAIConsultant();
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-[#F8F9FA] hover:bg-[#18191B] text-[#18191B] hover:text-[#FFB800] text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span>Bingung Pilih? Tanya Konsultan AI</span>
                      <ArrowRight className="w-3 h-3 ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a
            href="#portofolio"
            className="text-xs font-bold tracking-wide flex items-center gap-1 transition-colors relative py-1 text-[#6C7278] hover:text-[#18191B]"
          >
            <span>Portfolio</span>
          </a>

          <a
            href="#tentang"
            className="text-xs font-bold tracking-wide flex items-center gap-1 transition-colors relative py-1 text-[#6C7278] hover:text-[#18191B]"
          >
            <span>About Us</span>
          </a>

          <a
            href="#skills"
            className="text-xs font-bold tracking-wide flex items-center gap-1 transition-colors relative py-1 text-[#6C7278] hover:text-[#18191B]"
          >
            <span>Skills</span>
          </a>

          <a
            href="#faq"
            className="text-xs font-bold tracking-wide flex items-center gap-1 transition-colors relative py-1 text-[#6C7278] hover:text-[#18191B]"
          >
            <span>Contacts</span>
          </a>
        </nav>

        {/* Right Action Cluster */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Mini Social Icons matching Nimbus reference */}
          <div className="flex items-center gap-2.5 text-stone-400 pr-2 border-r border-stone-200">
            <a
              href={getWhatsAppUrl(APP_CONFIG.contact.whatsapp, `Halo ${APP_CONFIG.brandName}, saya ingin konsultasi kebutuhan desain grafis.`)}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#18191B] transition-colors"
              title="Chat WhatsApp Resmi"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#18191B] transition-colors"
              title="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#18191B] transition-colors"
              title="Behance"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* AI Consultant Trigger */}
          <button
            onClick={() => onOpenAIConsultant()}
            className="p-2 text-stone-600 hover:text-[#18191B] rounded-lg hover:bg-stone-100 transition-colors"
            title="Konsultan AI Desain"
          >
            <Sparkles className="w-4 h-4 text-[#FFB800]" />
          </button>

          {/* Solid Black Button: Contact Me */}
          <button
            onClick={handleWhatsAppClick}
            className="nimbus-btn-black text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>Contact Me</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => onOpenAIConsultant()}
            className="p-2 text-[#18191B] bg-stone-100 rounded-lg sm:hidden"
            aria-label="Konsultan AI"
          >
            <Sparkles className="w-4 h-4 text-[#FFB800]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg text-[#18191B] hover:bg-stone-100 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-5 pt-3 pb-6 space-y-3 shadow-lg">
          <a
            href="#beranda"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm font-bold text-[#18191B] py-2 border-b border-stone-100"
          >
            <span>Home</span>
            <span className="w-2 h-2 rounded-full bg-[#FFB800]" />
          </a>

          {/* Mobile Accordion for Paket Desain Combo Box */}
          <div className="border-b border-stone-100 py-1">
            <button
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              className="w-full flex items-center justify-between text-sm font-bold text-[#18191B] py-2"
            >
              <span>Paket Desain</span>
              <ChevronDown
                className={`w-4 h-4 text-[#FFB800] transition-transform ${
                  mobileDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {mobileDropdownOpen && (
              <div className="pl-2 pr-1 pb-2 space-y-1.5 animate-fadeIn">
                {packagesList.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => handleSelectPackage(pkg.name)}
                    className="w-full text-left p-2 rounded-lg bg-[#F8F9FA] hover:bg-stone-100 flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-[#18191B] truncate pr-2">
                      {pkg.name}
                    </span>
                    <span className="text-[11px] font-bold text-[#FFB800] shrink-0">
                      {pkg.price}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="#portofolio"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm font-bold text-[#18191B] py-2 border-b border-stone-100"
          >
            <span>Portfolio</span>
          </a>

          <a
            href="#tentang"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm font-bold text-[#18191B] py-2 border-b border-stone-100"
          >
            <span>About Us</span>
          </a>

          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm font-bold text-[#18191B] py-2 border-b border-stone-100"
          >
            <span>Skills</span>
          </a>

          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm font-bold text-[#18191B] py-2 border-b border-stone-100"
          >
            <span>Contacts</span>
          </a>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAIConsultant();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-[#FFB800] text-[#18191B] font-bold text-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Konsultasi AI Cerdas</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppClick();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-[#18191B] text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#FFB800]" />
              <span>Hubungi via WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

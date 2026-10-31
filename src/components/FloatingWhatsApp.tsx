/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, Sparkles, X, PhoneCall } from 'lucide-react';
import { APP_CONFIG } from '../../appConfig.js';
import { openWhatsApp } from '../utils/whatsapp.ts';

interface FloatingWhatsAppProps {
  onOpenAIConsultant: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenAIConsultant }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleWhatsApp = () => {
    openWhatsApp(
      APP_CONFIG.contact.whatsapp,
      `Halo ${APP_CONFIG.brandName}, saya ingin konsultasi kebutuhan desain grafis (Harga Murah Kualitas Mewah).`
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      {/* Speech Bubble Prompt */}
      {showTooltip && (
        <div className="relative bg-white text-[#18191B] p-3.5 rounded-2xl shadow-xl border border-stone-200 max-w-xs text-xs animate-bounce">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -left-2 bg-[#18191B] rounded-full p-1 text-white hover:bg-stone-800"
            aria-label="Tutup"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-extrabold text-[#18191B]">Dky Visualworks Online!</span>
          </div>
          <p className="text-[11px] text-[#6C7278]">
            Konsultasi konsep desain & promo diskon paket sekarang.
          </p>
          <div className="mt-2.5 flex items-center gap-1.5">
            <button
              onClick={() => onOpenAIConsultant()}
              className="text-[10px] font-extrabold text-[#18191B] bg-[#FFB800] hover:bg-[#F2AC00] px-2.5 py-1 rounded-lg flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Coba AI</span>
            </button>
            <button
              onClick={handleWhatsApp}
              className="text-[10px] font-extrabold text-white bg-[#18191B] hover:bg-[#2D2E32] px-2.5 py-1 rounded-lg flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3 text-[#FFB800]" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Buttons Group */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenAIConsultant}
          className="w-12 h-12 rounded-full bg-white text-[#18191B] border-2 border-stone-200 shadow-xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group"
          title="Tanya Konsultan AI"
          aria-label="Tanya Konsultan AI"
        >
          <Sparkles className="w-5 h-5 text-[#FFB800] group-hover:rotate-12 transition-transform" />
        </button>

        <button
          onClick={handleWhatsApp}
          className="relative w-14 h-14 rounded-full bg-[#FFB800] text-[#18191B] shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group"
          title="Chat WhatsApp Resmi"
          aria-label="Chat WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-[#18191B] stroke-[#FFB800]" />
        </button>
      </div>
    </div>
  );
};

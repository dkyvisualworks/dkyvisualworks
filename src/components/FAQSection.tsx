/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, Sparkles, MessageCircleQuestion, PhoneCall } from 'lucide-react';
import { APP_CONFIG } from '../../appConfig.js';
import { openWhatsApp } from '../utils/whatsapp.ts';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleWhatsAppHelp = () => {
    openWhatsApp(
      APP_CONFIG.contact.whatsapp,
      `Halo ${APP_CONFIG.brandName}, saya ada pertanyaan seputar proses pemesanan dan layanan desain yang ingin saya tanyakan. Mohon bantuannya.`
    );
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F8F9FA] text-[#18191B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#18191B] text-xs font-bold uppercase tracking-wider mb-3 border border-stone-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>Tanya Jawab Populer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#18191B] tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6C7278]">
            Segala hal yang perlu Anda ketahui sebelum memulai kolaborasi desain dengan kami.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {APP_CONFIG.faq.map((faqItem, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
                  isOpen
                    ? 'border-[#FFB800] ring-1 ring-[#FFB800]/40 shadow-md'
                    : 'border-stone-200/80 hover:border-stone-300 shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-[#18191B] text-base sm:text-lg focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <MessageCircleQuestion className={`w-5 h-5 shrink-0 ${isOpen ? 'text-[#FFB800]' : 'text-stone-400'}`} />
                    <span>{faqItem.question}</span>
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#18191B] text-[#FFB800] rotate-180'
                        : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#6C7278] leading-relaxed border-t border-stone-100 bg-[#F8F9FA]/50 animate-fadeIn">
                    <p className="pl-8">{faqItem.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 text-center p-8 bg-white rounded-3xl border border-stone-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="text-lg font-bold text-[#18191B]">Punya pertanyaan lain yang belum terjawab?</h3>
            <p className="text-xs sm:text-sm text-[#6C7278]">Tim representatif kami siap merespons pertanyaan Anda dalam hitungan menit.</p>
          </div>
          <button
            onClick={handleWhatsAppHelp}
            className="shrink-0 bg-[#18191B] hover:bg-[#2D2E32] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl flex items-center gap-2 shadow transition-all"
          >
            <PhoneCall className="w-4 h-4 text-[#FFB800]" />
            <span>Tanya via WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, Sparkles, Quote, CheckCircle } from 'lucide-react';
import { SmartImage } from './SmartImage.tsx';
import { APP_CONFIG } from '../../appConfig.js';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimoni" className="py-20 lg:py-28 bg-white text-[#18191B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18191B] text-[#FFB800] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kisah Sukses Klien Kami</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18191B] tracking-tight">
            Kepuasan Nyata dari <span className="text-[#FFB800]">Ratusan Bisnis</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#6C7278] leading-relaxed">
            Dari kedai kopi artisanal, brand kecantikan, hingga korporat logistik—inilah alasan mereka mempercayakan identitas brand pada Dky Visualworks.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {APP_CONFIG.testimonials.map((testi) => (
            <div
              key={testi.id}
              className="relative bg-white p-6 sm:p-8 rounded-3xl border border-stone-100 nimbus-card-shadow flex flex-col justify-between"
            >
              <div>
                {/* Header: Stars & Project Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg bg-stone-100 text-[#18191B]">
                    {testi.project}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-[#18191B] leading-relaxed italic relative">
                  "{testi.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SmartImage
                    src={testi.avatar}
                    alt={testi.name}
                    containerClassName="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FFB800] shrink-0"
                    className="w-full h-full object-cover"
                  />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#18191B] flex items-center gap-1.5">
                      {testi.name}
                      <CheckCircle className="w-3.5 h-3.5 text-[#FFB800]" />
                    </h3>
                    <p className="text-xs text-[#6C7278]">{testi.role}</p>
                  </div>
                </div>

                <Quote className="w-8 h-8 text-stone-200 hidden sm:block" />
              </div>
            </div>
          ))}
        </div>

        {/* Proof Statistics Ribbon */}
        <div className="mt-16 bg-[#18191B] p-6 sm:p-8 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white shadow-xl">
          <div>
            <div className="text-2xl sm:text-4xl font-black text-white">{APP_CONFIG.stats.projectsCompleted}</div>
            <div className="text-xs text-[#FFB800] font-bold uppercase tracking-wider mt-1">Desain Selesai</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-black text-white">{APP_CONFIG.stats.happyClients}</div>
            <div className="text-xs text-[#FFB800] font-bold uppercase tracking-wider mt-1">Klien Puas</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-black text-white">{APP_CONFIG.stats.clientSatisfaction}</div>
            <div className="text-xs text-[#FFB800] font-bold uppercase tracking-wider mt-1">Rating Kepuasan</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-black text-[#FFB800]">{APP_CONFIG.stats.turnaroundTime}</div>
            <div className="text-xs text-stone-400 font-bold uppercase tracking-wider mt-1">Kecepatan Respon</div>
          </div>
        </div>

      </div>
    </section>
  );
};

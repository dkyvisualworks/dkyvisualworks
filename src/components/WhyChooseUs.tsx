/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Coins,
  Layers,
  FileCheck2,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { APP_CONFIG } from '../../appConfig.js';

export const WhyChooseUs: React.FC = () => {
  const advantages = [
    {
      icon: Coins,
      title: 'Harga Murah Kualitas Mewah',
      description:
        'Biaya ramah UMKM namun dengan output estetika setara agensi tier-1 internasional. ROI maksimal untuk bisnis Anda.',
    },
    {
      icon: FileCheck2,
      title: 'Format Master Vektor 300 DPI',
      description:
        'Menerima file AI, EPS, SVG, PDF dan PNG transparan resolusi tinggi. Siap kirim langsung ke percetakan tanpa risiko pecah.',
    },
    {
      icon: Zap,
      title: 'Pengerjaan Cepat 24-48 Jam',
      description:
        'Konsep awal siap dipresentasikan dalam 24 hingga 48 jam. Tidak ada proyek molor tanpa kabar berita.',
    },
    {
      icon: ShieldCheck,
      title: 'Garansi Revisi Fleksibel',
      description:
        'Kenyamanan dan kepuasan Anda adalah prioritas. Kami menyempurnakan detail warna, font, dan elemen hingga selaras dengan visi Anda.',
    },
    {
      icon: Lock,
      title: '100% Hak Cipta Komersial Penuh',
      description:
        'Semua karya desain bebas digunakan untuk keperluan branding komersial, paten merk, kemasan, hingga media promosi seumur hidup.',
    },
    {
      icon: Layers,
      title: 'Riset Konsep & Persona Brand',
      description:
        'Bukan sekadar menggambar; kami membedah target audiens, psikologi warna, dan identitas kompetitor agar brand Anda lebih unggul.',
    },
  ];

  return (
    <section id="keunggulan" className="py-20 lg:py-28 bg-[#FAF8F5] text-[#1A1615]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1615] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Standar Kualitas Dky Visualworks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1615] tracking-tight">
            Mengapa Ratusan Brand Memilih Kami?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B6560] leading-relaxed">
            Kombinasi presisi seni visual, kecepatan eksekusi modern, dan komitmen harga terjangkau untuk menaikkan gengsi usaha Anda.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((adv, idx) => {
            const IconComponent = adv.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1A1615] text-[#D4AF37] flex items-center justify-center mb-6 border border-[#D4AF37]/30 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1A1615] group-hover:text-[#8A6D14] transition-colors">
                    {adv.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#6B6560] leading-relaxed">
                    {adv.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-semibold text-[#8A6D14]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Standar Jaminan Mutu Satelitweb</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workflow Steps Preview */}
        <div className="mt-20 pt-16 border-t border-stone-200">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1615]">
              Alur Kerja Simpel, Cepat & Bebas Ribet
            </h3>
            <p className="text-sm text-[#6B6560] mt-2">
              Hanya butuh 4 langkah mudah untuk memiliki desain brand impian
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Konsultasi & Briefing',
                desc: 'Pilih paket di web atau gunakan Konsultan AI untuk menentukan konsep visual & warna.',
              },
              {
                step: '02',
                title: 'Pengerjaan Desain',
                desc: 'Tim desainer senior kami merancang opsi konsep awal dalam 24-48 jam kerja.',
              },
              {
                step: '03',
                title: 'Review & Revisi',
                desc: 'Diskusikan hasil konsep awal dan lakukan penyempurnaan sampai 100% puas.',
              },
              {
                step: '04',
                title: 'Pengiriman Master File',
                desc: 'Terima seluruh file master (AI, EPS, SVG, PNG 300 DPI) siap pakai selamanya.',
              },
            ].map((stepItem) => (
              <div
                key={stepItem.step}
                className="relative bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm"
              >
                <div className="text-3xl font-black text-[#D4AF37] mb-3">
                  {stepItem.step}
                </div>
                <h4 className="text-base font-bold text-[#1A1615] mb-2">
                  {stepItem.title}
                </h4>
                <p className="text-xs text-[#6B6560] leading-relaxed">
                  {stepItem.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

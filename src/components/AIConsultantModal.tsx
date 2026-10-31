/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Send,
  CheckCircle2,
  Copy,
  ExternalLink,
  RefreshCw,
  Lightbulb,
  Palette,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { APP_CONFIG } from '../../appConfig.js';
import { openWhatsApp } from '../utils/whatsapp.ts';

interface AIConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedNeed?: string;
}

interface RecommendationResult {
  greeting: string;
  analysis: string;
  suggestedPackageId: string;
  suggestedPackageName: string;
  estimatedPrice: string;
  creativeConcept: string;
  actionableTips: string[];
  whatsappDraft: string;
}

export const AIConsultantModal: React.FC<AIConsultantModalProps> = ({
  isOpen,
  onClose,
  preselectedNeed,
}) => {
  const [clientName, setClientName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Kuliner & Kafe');
  const [designNeed, setDesignNeed] = useState(preselectedNeed || 'Logo & Branding Eksklusif');
  const [stylePreference, setStylePreference] = useState('Minimalis Fresh & Modern (Nimbus Style)');
  const [budget, setBudget] = useState('Paket Hemat (Di bawah Rp 500rb)');
  const [notes, setNotes] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: clientName.trim() || 'Sahabat Bisnis',
          businessName: businessName.trim() || 'Bisnis Klien',
          businessType,
          designNeed,
          stylePreference,
          budget,
          notes,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        setResult(resData.data);
      } else {
        throw new Error(resData.message || 'Gagal memproses rekomendasi');
      }
    } catch (err: any) {
      console.error('Consultant Error:', err);
      // Fallback
      setResult({
        greeting: `Halo Kak ${clientName || 'Partner'}! Selamat datang di ${APP_CONFIG.brandName}.`,
        analysis: `Untuk bisnis "${businessName || 'Anda'}", identitas visual yang profesional adalah kunci membangun daya tarik dan kepercayaan pembeli. Dengan gaya "${stylePreference}", brand Anda akan tampil jauh lebih kredibel.`,
        suggestedPackageId: 'pkg-logo',
        suggestedPackageName: 'Paket Logo Branding Eksklusif',
        estimatedPrice: 'Rp 249.000',
        creativeConcept: 'Konsep visual modern berkarakter segar ala Nimbus aesthetic (Vibrant Yellow #FFB800 & Bold Charcoal), tipografi tegas proporsional, serta tata visual hierarki yang memikat.',
        actionableTips: [
          'Gunakan kombinasi warna kontras tinggi agar langsung memikat mata di layar smartphone.',
          'Sertakan logo vektor 300 DPI untuk keperluan cetak spanduk, kemasan, dan seragam.',
          'Jaga konsistensi tone visual di seluruh media sosial untuk menaikkan brand equity.'
        ],
        whatsappDraft: `Halo Admin ${APP_CONFIG.brandName}, saya ${clientName || 'Calon Klien'} dari "${businessName || 'Usaha Baru'}". Saya ingin konsultasi dan pesan paket desain dengan gaya ${stylePreference}. Mohon infonya. Terima kasih!`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.whatsappDraft) return;
    navigator.clipboard.writeText(result.whatsappDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    if (!result?.whatsappDraft) return;
    openWhatsApp(APP_CONFIG.contact.whatsapp, result.whatsappDraft);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white text-[#18191B] border border-stone-200 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Ribbon */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#F8F9FA]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FFB800] flex items-center justify-center text-[#18191B] font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#18191B] text-base sm:text-lg flex items-center gap-2">
                Konsultan Desain AI <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#18191B] text-[#FFB800]">Dky Visualworks</span>
              </h3>
              <p className="text-xs text-[#6C7278]">Rekomendasi paket & konsep visual dalam 5 detik</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-[#18191B] rounded-lg hover:bg-stone-200 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full border-4 border-[#FFB800] border-t-transparent animate-spin mb-4" />
              <h4 className="text-lg font-bold text-[#18191B]">Meracik Rekomendasi Desain Terbaik...</h4>
              <p className="text-xs text-[#6C7278] max-w-md mt-1">
                AI menganalisis profil bisnis Anda untuk mencocokkan paket paling ekonomis dengan kualitas mewah.
              </p>
            </div>
          ) : result ? (
            <div className="space-y-5">
              {/* Personal Greeting */}
              <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-stone-200">
                <h4 className="text-sm font-bold text-[#18191B]">{result.greeting}</h4>
                <p className="text-xs text-[#6C7278] mt-1 leading-relaxed">{result.analysis}</p>
              </div>

              {/* Recommended Package */}
              <div className="bg-[#18191B] text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="text-[10px] uppercase tracking-widest text-[#FFB800] font-black mb-1">
                  Paket Paling Sesuai Kebutuhan
                </div>
                <h4 className="text-xl font-black text-white">{result.suggestedPackageName}</h4>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-black text-[#FFB800]">{result.estimatedPrice}</span>
                  <span className="text-xs text-stone-300">· Harga Murah Kualitas Mewah</span>
                </div>
                <div className="text-xs text-stone-300 mt-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
                  Termasuk File Master AI/EPS/SVG 300 DPI + Garansi Revisi
                </div>
              </div>

              {/* Concept Guidance */}
              <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-stone-200 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#18191B]">
                  <Palette className="w-4 h-4 text-[#FFB800]" />
                  <span>Saran Konsep Visual & Aksen:</span>
                </div>
                <p className="text-xs text-[#6C7278] leading-relaxed">{result.creativeConcept}</p>
              </div>

              {/* Tips */}
              {result.actionableTips && (
                <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#18191B]">
                    <Lightbulb className="w-4 h-4 text-[#FFB800]" />
                    <span>3 Tips Visual Meningkatkan Konversi:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#6C7278]">
                    {result.actionableTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB800] shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* WhatsApp Draft */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#18191B]">
                    Draft Pesan WhatsApp Siap Kirim
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-xs text-stone-600 hover:text-[#18191B] bg-white border border-stone-200 px-2.5 py-1 rounded-lg"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs font-mono text-[#18191B] bg-white p-3 rounded-xl border border-stone-200 whitespace-pre-wrap leading-relaxed">
                  {result.whatsappDraft}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleOpenWhatsApp}
                  className="flex-1 bg-[#FFB800] hover:bg-[#F2AC00] text-[#18191B] font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim ke WhatsApp Sekarang</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-[#18191B] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Ulangi</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#18191B] mb-1">
                    Nama Anda / Kontak
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-[#18191B] focus:outline-none focus:border-[#FFB800]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#18191B] mb-1">
                    Nama Brand / Usaha
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Artisan Roastery"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-[#18191B] focus:outline-none focus:border-[#FFB800]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#18191B] mb-1">
                    Bidang Usaha
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-[#18191B] focus:outline-none focus:border-[#FFB800]"
                  >
                    <option value="Kuliner & Kafe (F&B)">Kuliner & Kafe (F&B)</option>
                    <option value="Skincare, Kosmetik & Beauty">Skincare, Kosmetik & Beauty</option>
                    <option value="Fashion, Apparel & Hijab">Fashion, Apparel & Hijab</option>
                    <option value="Corporate, Legal & Konsultan">Corporate, Legal & Konsultan</option>
                    <option value="Retail & UMKM">Retail & UMKM</option>
                    <option value="Teknologi & Kreatif">Teknologi & Kreatif</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#18191B] mb-1">
                    Kebutuhan Desain Utama
                  </label>
                  <select
                    value={designNeed}
                    onChange={(e) => setDesignNeed(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-[#18191B] focus:outline-none focus:border-[#FFB800]"
                  >
                    <option value="Logo & Branding Eksklusif">Paket Logo Branding Eksklusif</option>
                    <option value="Feed & Story Sosial Media">Paket Feed & Story Sosial Media</option>
                    <option value="Kemasan & Label Produk">Paket Kemasan & Label Produk</option>
                    <option value="Stationery & Corporate Kit">Paket Stationery & Corporate Kit</option>
                    <option value="Banner Promosi & Marketing">Paket Banner Promosi & Marketing</option>
                    <option value="All-In-One Visual Brand Rebrand">Paket All-In-One Brand Rebrand</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#18191B] mb-1">
                  Gaya Desain yang Disukai
                </label>
                <select
                  value={stylePreference}
                  onChange={(e) => setStylePreference(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-[#18191B] focus:outline-none focus:border-[#FFB800]"
                >
                  <option value="Fresh Modern & Vibrant Yellow (Nimbus Style)">Fresh Modern & Vibrant Yellow (Nimbus Style)</option>
                  <option value="Minimalis Mewah & Clean Executive">Minimalis Mewah & Clean Executive</option>
                  <option value="Bold Kontras & Eye-Catching">Bold Kontras & Eye-Catching</option>
                  <option value="Vintage Retro & Heritage">Vintage Retro & Heritage</option>
                  <option value="Pastel Warm & Aesthetic">Pastel Warm & Aesthetic</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#18191B] mb-1">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Ingin logo huruf monogram D yang tegas dan modern..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-stone-200 rounded-xl p-3 text-xs text-[#18191B] focus:outline-none focus:border-[#FFB800] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#FFB800] hover:bg-[#F2AC00] text-[#18191B] font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Dapatkan Rekomendasi Desain AI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

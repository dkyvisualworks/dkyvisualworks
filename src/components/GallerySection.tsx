/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  Maximize2,
  X,
  ExternalLink,
  Tag,
  ArrowRight,
  Play,
  Film,
} from 'lucide-react';
import { SmartImage } from './SmartImage.tsx';
import { APP_CONFIG } from '../../appConfig.js';

interface GallerySectionProps {
  onOpenAIConsultant: (need?: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenAIConsultant }) => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activeItem, setActiveItem] = useState<(typeof APP_CONFIG.gallery)[0] | null>(null);

  const galleryCategories = [
    'Semua',
    'Logo & Branding',
    'Packaging',
    'Sosial Media',
    'Video & Motion',
    'Promosi Visual',
  ];

  const filteredItems =
    selectedCategory === 'Semua'
      ? APP_CONFIG.gallery
      : APP_CONFIG.gallery.filter(
          (item: any) =>
            (item.category && item.category.toLowerCase().includes(selectedCategory.toLowerCase())) ||
            (selectedCategory.toLowerCase().includes(item.category?.toLowerCase() || '')) ||
            (selectedCategory === 'Video & Motion' && (item.videoUrl || item.category?.toLowerCase().includes('video')))
        );

  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`
      : null;
  };

  const isDirectVideo = (url?: string) => {
    if (!url) return false;
    return (
      url.endsWith('.mp4') ||
      url.endsWith('.webm') ||
      url.endsWith('.ogg') ||
      url.includes('.mp4?') ||
      url.includes('/videos/')
    );
  };

  return (
    <section id="portofolio" className="py-20 lg:py-28 bg-[#F8F9FA] text-[#18191B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#18191B] text-xs font-bold uppercase tracking-wider mb-3 border border-stone-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>Karya Visual Terpilih</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18191B] tracking-tight">
              Galeri Portofolio <span className="text-[#FFB800]">Dky Visualworks</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6C7278]">
              Dedikasi kami menyajikan estetika modern berkelas dunia dengan sentuhan presisi untuk beragam lini bisnis.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border border-stone-200 self-start md:self-auto shadow-sm">
            {galleryCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  selectedCategory === category
                    ? 'bg-[#18191B] text-[#FFB800] shadow-sm'
                    : 'text-[#6C7278] hover:text-[#18191B] hover:bg-stone-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item: any) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-stone-100 nimbus-card-shadow transition-all duration-300 cursor-pointer hover:-translate-y-1.5"
            >
              {/* Image Frame */}
              <div className="relative h-72 w-full overflow-hidden bg-stone-900">
                <SmartImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#18191B] via-[#18191B]/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md bg-[#18191B] text-[#FFB800] shadow">
                    {item.category}
                  </span>
                  {item.videoUrl && (
                    <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md bg-red-600 text-white flex items-center gap-1 shadow">
                      <Film className="w-2.5 h-2.5" />
                      <span>Video</span>
                    </span>
                  )}
                </div>

                {/* Center Play Button for Video Items */}
                {item.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-[#18191B]/80 backdrop-blur-md border border-[#FFB800]/50 flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-[#FFB800] transition-all duration-300">
                      <Play className="w-6 h-6 text-[#FFB800] group-hover:text-[#18191B] fill-current ml-1 transition-colors" />
                    </div>
                  </div>
                )}

                {/* Hover Expand Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow">
                  <Maximize2 className="w-4 h-4 text-[#FFB800]" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FFB800] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 text-center">
          <p className="text-sm text-[#6C7278] mb-4">
            Ingin melihat portofolio khusus sesuai industri bisnis Anda?
          </p>
          <button
            onClick={() => onOpenAIConsultant()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-stone-100 text-[#18191B] border border-stone-200 font-bold text-xs sm:text-sm shadow-sm transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#FFB800]" />
            <span>Minta Kurasi Portofolio Spesifik via AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Lightbox Modal (Supports Image & Video) */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-[#F8F9FA]">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#FFB800]" />
                <span className="text-xs uppercase tracking-wider font-bold text-[#18191B]">
                  {activeItem.category}
                </span>
                {(activeItem as any).videoUrl && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-red-600 text-white flex items-center gap-1">
                    <Film className="w-3 h-3" />
                    <span>Video Showcase</span>
                  </span>
                )}
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-[#18191B] hover:bg-stone-200 transition-colors"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Player Container */}
            <div className="max-h-[65vh] min-h-[280px] sm:min-h-[380px] bg-black flex items-center justify-center overflow-hidden">
              {(activeItem as any).videoUrl ? (
                getYouTubeEmbedUrl((activeItem as any).videoUrl) ? (
                  <iframe
                    src={getYouTubeEmbedUrl((activeItem as any).videoUrl)!}
                    title={activeItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-80 sm:h-96 md:h-[450px] border-0"
                  />
                ) : (
                  <video
                    controls
                    autoPlay
                    playsInline
                    poster={activeItem.image}
                    src={(activeItem as any).videoUrl}
                    className="max-h-[65vh] w-full object-contain"
                  >
                    Peramban Anda tidak mendukung pemutar video HTML5.
                  </video>
                )
              ) : (
                <SmartImage
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="max-h-[65vh] w-full object-contain"
                />
              )}
            </div>

            {/* Modal Footer Description */}
            <div className="p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#18191B]">{activeItem.title}</h3>
                <p className="text-sm text-[#6C7278] mt-1 max-w-xl leading-relaxed">{activeItem.description}</p>
              </div>
              <button
                onClick={() => {
                  setActiveItem(null);
                  onOpenAIConsultant(activeItem.category);
                }}
                className="shrink-0 px-5 py-2.5 rounded-xl bg-[#FFB800] hover:bg-[#F2AC00] text-[#18191B] font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow transition-colors"
              >
                <span>Bikin Karya Serupa</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

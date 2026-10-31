/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { AboutAndSkills } from './components/AboutAndSkills.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { GallerySection } from './components/GallerySection.tsx';
import { TestimonialsSection } from './components/TestimonialsSection.tsx';
import { FAQSection } from './components/FAQSection.tsx';
import { Footer } from './components/Footer.tsx';
import { AIConsultantModal } from './components/AIConsultantModal.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';

export default function App() {
  const [isAIConsultantOpen, setIsAIConsultantOpen] = useState(false);
  const [preselectedNeed, setPreselectedNeed] = useState<string | undefined>(undefined);

  const handleOpenAIConsultant = (need?: string) => {
    setPreselectedNeed(need);
    setIsAIConsultantOpen(true);
  };

  const handleCloseAIConsultant = () => {
    setIsAIConsultantOpen(false);
    setPreselectedNeed(undefined);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#18191B] flex flex-col font-sans selection:bg-[#FFB800] selection:text-[#18191B]">
      {/* Sticky Clean Navbar */}
      <Navbar onOpenAIConsultant={handleOpenAIConsultant} />

      {/* Main Content Sections matching Nimbus Aesthetic */}
      <main className="flex-1">
        {/* Hero Section with Yellow Organic Blob and 3 Quick Service Cards */}
        <HeroSection onOpenAIConsultant={handleOpenAIConsultant} />

        {/* Nimbus Signature: "Hi There!" & "What My Design Skills Included" */}
        <AboutAndSkills onOpenAIConsultant={handleOpenAIConsultant} />

        {/* Product Packages Collection */}
        <ServicesSection onOpenAIConsultant={handleOpenAIConsultant} />

        {/* Portfolio Gallery with Lightbox */}
        <GallerySection onOpenAIConsultant={handleOpenAIConsultant} />

        {/* Customer Testimonials & Stats */}
        <TestimonialsSection />

        {/* FAQ Accordion */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onOpenAIConsultant={() => handleOpenAIConsultant()} />

      {/* Floating Action Button */}
      <FloatingWhatsApp onOpenAIConsultant={() => handleOpenAIConsultant()} />

      {/* Interactive AI Consultant Modal */}
      <AIConsultantModal
        isOpen={isAIConsultantOpen}
        onClose={handleCloseAIConsultant}
        preselectedNeed={preselectedNeed}
      />
    </div>
  );
}

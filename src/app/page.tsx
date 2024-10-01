"use client";

import React from 'react';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import HeroSection from '@/components/sections/HeroSection';
import PricingSection from '@/components/sections/PricingSection';
import { ToastProvider } from '@/components/providers/Toast';

function App() {
  return (
    <div className="min-h-screen bg-[#F0F4F8]"> {/* Use a div as the main container */}
      <ToastProvider>
        <header>
          <HeroSection />
        </header>

        <main>
          <FeaturesSection />
          <PricingSection />
          <AboutSection />
        </main>

        <footer>
          <ContactSection />
        </footer>
      </ToastProvider>
    </div>
  );
}

export default App;
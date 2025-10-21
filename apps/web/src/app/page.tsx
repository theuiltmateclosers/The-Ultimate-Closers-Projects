'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Services from '@/components/Services';
import AISection from '@/components/AISection';
import Results from '@/components/Results';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen font-inter">
        <Header />
        <main>
          <Hero />
          <Mission />
          <Services />
          <AISection />
          <Results />
          <Testimonials />
          <CTA />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

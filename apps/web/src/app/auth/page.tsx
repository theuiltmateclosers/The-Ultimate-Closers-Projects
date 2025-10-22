'use client';

import { useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthForm from '@/components/AuthForm';

export default function AuthPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen font-inter">
        <Header />
        <main>
          <AuthForm />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen font-inter">
        <Header />
        <main>
          <AdminDashboard />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

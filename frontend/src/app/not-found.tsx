'use client';

import { useTranslation } from '@/context/LanguageContext';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function NotFound() {
  const t = useTranslation();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1020] to-[#151A2E]">
      <Header />
      <main className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-2xl text-muted mb-8">{t.pageNotFound}</p>
        <p className="text-lg text-gray-400 mb-8">{t.pageNotExist}</p>
        <a href="/" className="px-8 py-3 bg-primary text-background font-bold rounded-lg hover:bg-primary/80 transition">
          {t.goHome}
        </a>
      </main>
      <Footer />
    </div>
  );
}

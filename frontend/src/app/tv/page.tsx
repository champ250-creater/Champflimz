'use client';

import { useTranslation } from '@/context/LanguageContext';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';

export default function TVPage() {
  const t = useTranslation();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1020] to-[#151A2E]">
      <Header />
      <main className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-white mb-4">📺 {t.tvComingSoon}</h1>
          <p className="text-2xl text-muted mb-8">{t.comingSoon}</p>
          <p className="text-lg text-gray-400 mb-8">{t.workingOn}</p>
          <button className="px-8 py-3 bg-primary text-background font-bold rounded-lg hover:bg-primary/80 transition">
            {t.notifyMe}
          </button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

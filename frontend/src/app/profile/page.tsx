'use client';

import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth();
  const t = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B1020]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00D4FF]"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1020] to-[#151A2E]">
      <Header />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-lg p-8"
          >
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl shadow-lg shadow-primary/20">
                {user.username[0].toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{user.username}</h1>
                <p className="text-primary font-medium uppercase tracking-wider text-sm">{user.role}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass bg-white/5 p-4 rounded-lg">
                  <p className="text-muted text-sm mb-1">{t.username}</p>
                  <p className="text-white font-semibold">{user.username}</p>
                </div>
                <div className="glass bg-white/5 p-4 rounded-lg">
                  <p className="text-muted text-sm mb-1">{t.email}</p>
                  <p className="text-white font-semibold">{user.email}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent/80 transition shadow-lg shadow-accent/20"
                >
                  {t.logout}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

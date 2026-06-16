'use client';

import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, isLoading, register, error } = useAuth();
  const t = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await register(username, email, password);
      router.push('/');
    } catch (err) {
      // Error is handled by AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1020] to-[#151A2E]">
      <Header />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="glass rounded-lg p-8">
            <h1 className="text-3xl font-bold text-white mb-2 text-center">{t.joinUs}</h1>
            <p className="text-muted text-center mb-6">{t.createAccount}</p>
            
            {(error || localError) && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">
                {error || localError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">{t.username}</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
                  className="w-full px-4 py-2 bg-card border border-primary/30 rounded-lg text-text focus:border-primary outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">{t.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 bg-card border border-primary/30 rounded-lg text-text focus:border-primary outline-none transition"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text mb-2">{t.password}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-card border border-primary/30 rounded-lg text-text focus:border-primary outline-none transition"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">{t.confirmPassword}</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-card border border-primary/30 rounded-lg text-text focus:border-primary outline-none transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-primary text-background font-bold rounded-lg hover:bg-primary/80 transition mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '...' : t.createAccount}
              </button>
            </form>

            <p className="text-center text-muted text-sm mt-6">
              {t.haveAccount} <a href="/login" className="text-primary hover:text-secondary">{t.signInHere}</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 bg-accent/20 border border-accent text-accent rounded-lg text-sm"
        >
          {error}
        </motion.div>
      )}

      <div>
        <label className="block text-sm font-medium text-text mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-card border border-primary/30 rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary transition-colors"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-card border border-primary/30 rounded-lg text-text placeholder-muted focus:outline-none focus:border-primary transition-colors"
          placeholder="••••••••"
          required
        />
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 bg-gradient-to-r from-primary via-secondary to-accent text-background rounded-lg font-bold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </motion.button>

      <p className="text-center text-muted text-sm">
        Don't have an account?{' '}
        <Link href="/register" className="text-primary hover:text-primary/80 font-semibold">
          Sign up
        </Link>
      </p>
    </motion.form>
  );
};

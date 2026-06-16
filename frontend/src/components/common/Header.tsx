'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage, type Language } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/context/LanguageContext';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} className="relative group py-2">
        <span className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-primary' : 'text-text-muted group-hover:text-text'}`}>
          {children}
        </span>
        {isActive && (
          <motion.div
            layoutId="nav-underline"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary shadow-glow-primary"
          />
        )}
      </Link>
    );
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-6'}`}>
      <nav className="container mx-auto">
        <div className={`glass mx-4 rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'shadow-glass' : 'bg-transparent border-transparent'}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow-primary group-hover:scale-110 transition-transform duration-300">
              <span className="text-xl">🎬</span>
            </div>
            <span className="text-2xl font-black tracking-tighter gradient-text hidden sm:block">
              CHAMPFLIMZ
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 ml-12">
            <NavLink href="/">{t.home}</NavLink>
            <NavLink href="/movies">{t.movies}</NavLink>
            <NavLink href="/tv">{t.tvSeries}</NavLink>
            <NavLink href="/genres">{t.genres}</NavLink>
            {user && <NavLink href="/my-list">{t.myList}</NavLink>}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 flex-1 justify-end max-w-2xl">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative group w-full max-w-xs">
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface/50 border border-white/10 rounded-full px-5 py-2 pl-10 text-sm focus:outline-none focus:border-primary focus:bg-surface/80 transition-all duration-300"
              />
              <span className="absolute left-4 text-text-muted group-focus-within:text-primary transition-colors">🔍</span>
            </form>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center glass hover:bg-white/10 transition-colors"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-1.5 glass rounded-full hover:bg-white/10 transition-colors text-xs font-bold uppercase tracking-widest"
              >
                🌐 {language}
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-3 w-40 glass rounded-xl overflow-hidden shadow-glass"
                  >
                    {['en', 'rw', 'fr'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setLanguage(lang as Language); setIsLangOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-white/10 transition-colors uppercase ${language === lang ? 'text-primary font-bold' : 'text-text-muted'}`}
                      >
                        {lang === 'en' ? '🇬🇧 English' : lang === 'rw' ? '🇷🇼 Kinyarwanda' : '🇫🇷 Français'}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                   {user.role === 'admin' && (
                    <Link href="/admin" className="hidden sm:block text-xs font-bold uppercase tracking-widest text-text-muted hover:text-primary transition-colors">
                      {t.admin}
                    </Link>
                  )}
                  <Link href="/profile" className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-black border-2 border-transparent hover:border-primary transition-all">
                    {user.username[0].toUpperCase()}
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="px-5 py-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
                    {t.login}
                  </Link>
                  <Link href="/signup" className="btn-primary py-2 px-6 text-xs">
                    {t.signup}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center glass rounded-full"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mx-4 mt-2 glass rounded-2xl overflow-hidden"
            >
              <div className="p-6 flex flex-col gap-4">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold uppercase tracking-widest">{t.home}</Link>
                <Link href="/movies" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold uppercase tracking-widest">{t.movies}</Link>
                <Link href="/tv" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold uppercase tracking-widest">{t.tvSeries}</Link>
                <Link href="/genres" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold uppercase tracking-widest">{t.genres}</Link>
                {user && <Link href="/my-list" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold uppercase tracking-widest">{t.myList}</Link>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

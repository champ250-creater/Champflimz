'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export default function Footer() {
  const t = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 pb-12 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-16 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow-primary">
                <span className="text-xl">🎬</span>
              </div>
              <span className="text-2xl font-black tracking-tighter gradient-text">
                CHAMPFLIMZ
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs font-medium">
              {t.premiumStreaming}
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'Discord'].map((social) => (
                <button key={social} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary hover:text-black transition-all duration-300">
                  <span className="text-xs font-black uppercase">{social[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">{t.quickLinks}</h4>
            <ul className="space-y-4">
              {[t.home, t.movies, t.tvSeries, t.genres, t.myList].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-text-muted hover:text-primary transition-colors text-sm font-medium">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">{t.legal}</h4>
            <ul className="space-y-4">
              {[t.privacyPolicy, t.termsOfService, t.cookiePolicy].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-text-muted hover:text-primary transition-colors text-sm font-medium">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">{t.connect}</h4>
            <div className="space-y-4">
              <p className="text-text-muted text-sm font-medium">Stay updated with the latest releases.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-surface/50 border border-white/10 rounded-xl px-4 py-2 text-sm flex-1 focus:outline-none focus:border-primary transition-all"
                />
                <button className="px-4 py-2 bg-primary text-black font-bold rounded-xl text-xs uppercase tracking-widest shadow-glow-primary">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-muted text-xs font-medium">
            © {currentYear} CHAMPFLIMZ. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-black tracking-widest text-text-muted uppercase">Designed for Excellence</span>
            <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
               <div className="w-2 h-2 rounded-full bg-secondary animate-pulse [animation-delay:0.2s]" />
               <div className="w-2 h-2 rounded-full bg-accent animate-pulse [animation-delay:0.4s]" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

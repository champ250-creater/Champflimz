"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            ChampFlimz
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/movies" className="hover:text-white transition-colors">Movies</Link>
            <Link href="/series" className="hover:text-white transition-colors">Series</Link>
            <Link href="/my-list" className="hover:text-white transition-colors">My List</Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button className="text-muted hover:text-white transition-colors"><Search size={20} /></button>
          <button className="text-muted hover:text-white transition-colors"><Bell size={20} /></button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent cursor-pointer border border-white/20"></div>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass-panel py-4 flex flex-col items-center gap-4 md:hidden border-b border-white/5"
          >
            <Link href="/" className="text-white hover:text-primary transition-colors">Home</Link>
            <Link href="/movies" className="text-white hover:text-primary transition-colors">Movies</Link>
            <Link href="/series" className="text-white hover:text-primary transition-colors">Series</Link>
            <Link href="/my-list" className="text-white hover:text-primary transition-colors">My List</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

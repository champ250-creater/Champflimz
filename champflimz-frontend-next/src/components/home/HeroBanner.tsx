"use client";

import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <div className="relative h-[85vh] w-full flex items-center justify-start overflow-hidden">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0 w-full h-full">
        {/* We use a placeholder gradient/image for now, representing a cinematic backdrop */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-cinema" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <div className="inline-block px-3 py-1 mb-6 rounded-full glass-panel text-xs font-semibold tracking-wider text-primary border-primary/30 uppercase">
            #1 Trending Movie
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white leading-tight">
            Interstellar <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Odyssey</span>
          </h1>
          <p className="text-lg md:text-xl text-muted mb-8 line-clamp-3 leading-relaxed">
            When humanity&apos;s time on Earth is coming to an end, a group of explorers must travel beyond our solar system to discover a new home for mankind. An epic journey through space and time.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/watch/1" className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-all hover:scale-105 active:scale-95">
              <Play size={20} className="fill-black" />
              Watch Now
            </Link>
            <button className="flex items-center gap-2 px-8 py-4 glass-panel rounded-full font-semibold hover:bg-white/10 transition-all">
              <Info size={20} />
              More Info
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

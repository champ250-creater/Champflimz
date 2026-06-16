'use client';

import { useState, useEffect, useCallback } from 'react';
import { Movie } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';

interface HeroSliderProps {
  movies: Movie[];
}

export const HeroSlider = ({ movies }: HeroSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const t = useTranslation();

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  }, [movies.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  }, [movies.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const currentMovie = movies[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div className="relative h-[85vh] w-full overflow-hidden rounded-[2.5rem] shadow-glass mt-28">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.8 }
          }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={currentMovie?.backdropUrl || 'https://via.placeholder.com/1920x1080'}
              alt={currentMovie?.title || 'Hero'}
              fill
              className="object-cover transform scale-105 animate-[ken-burns_20s_infinite_alternate]"
              priority
            />
            {/* Immersive Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content Section */}
      <div className="absolute inset-0 flex items-center px-8 md:px-20 z-10">
        <div className="max-w-3xl">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-primary text-black text-xs font-black uppercase tracking-widest rounded-full shadow-glow-primary">
                Trending
              </span>
              <span className="text-primary font-bold">★ {currentMovie?.rating.toFixed(1)}</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none">
              {currentMovie?.title.toUpperCase()}
            </h1>

            <p className="text-lg md:text-xl text-text-muted mb-10 line-clamp-3 max-w-xl font-medium leading-relaxed">
              {currentMovie?.description}
            </p>

            <div className="flex items-center gap-6">
              <Link
                href={`/movie/${currentMovie?.id}`}
                className="btn-primary flex items-center gap-3 text-lg px-10 py-4"
              >
                <span className="text-2xl">▶</span> {t.watchNow}
              </Link>
              <Link
                href={`/movie/${currentMovie?.id}`}
                className="px-10 py-4 glass rounded-xl font-bold text-white hover:bg-white/10 transition-all flex items-center gap-3"
              >
                <span className="text-xl">ℹ</span> {t.moreInfo}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-12 flex items-center gap-4 z-20">
        <button
          onClick={prevSlide}
          className="w-14 h-14 rounded-full glass flex items-center justify-center text-2xl hover:bg-primary hover:text-black transition-all duration-500 shadow-glass"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="w-14 h-14 rounded-full glass flex items-center justify-center text-2xl hover:bg-primary hover:text-black transition-all duration-500 shadow-glass"
        >
          →
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-12 left-12 flex gap-3 z-20">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex ? 'w-12 bg-primary shadow-glow-primary' : 'w-4 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes ken-burns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-1%, -1%); }
        }
      `}</style>
    </div>
  );
};

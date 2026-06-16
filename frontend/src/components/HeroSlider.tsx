'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const ChevronLeft = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = useTranslation();

  const slides = [
    {
      title: 'Inception',
      description: 'A skilled thief who steals corporate secrets through dream-sharing technology.',
      poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1000&h=600&fit=crop',
      rating: '8.8',
    },
    {
      title: 'The Matrix',
      description: 'A computer programmer discovers that reality as he knows it is a simulation.',
      poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1000&h=600&fit=crop',
      rating: '8.7',
    },
    {
      title: 'Interstellar',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      poster: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1000&h=600&fit=crop',
      rating: '8.6',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].poster}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1020] via-transparent to-[#0B1020]" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-start container mx-auto px-4">
        <motion.div
          key={`content-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg text-gray-300 mb-8 line-clamp-3">
            {slides[currentSlide].description}
          </p>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-2xl font-bold text-[#00D4FF]">
              ⭐ {slides[currentSlide].rating}
            </span>
            <span className="px-3 py-1 bg-[#FF4D6D] text-white rounded-full text-sm font-semibold">
              HD
            </span>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-[#00D4FF] text-black font-bold rounded-lg hover:bg-[#00B8D4] transition flex items-center gap-2">
              <span className="text-lg">▶</span> {t.watchNow}
            </button>
            <button className="px-8 py-3 bg-white/20 backdrop-blur text-white font-bold rounded-lg hover:bg-white/30 transition flex items-center gap-2">
              <span className="text-lg">i</span> {t.moreInfo}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 hover:bg-white/40 rounded-full transition"
      >
        <ChevronLeft size={28} className="text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 hover:bg-white/40 rounded-full transition"
      >
        <ChevronRight size={28} className="text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 rounded-full transition ${
              i === currentSlide ? 'w-8 bg-[#00D4FF]' : 'w-2 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
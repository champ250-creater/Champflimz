'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Movie } from '@/types';
import { HeroSlider } from '@/components/home/HeroSlider';
import { MovieGrid } from '@/components/movie/MovieGrid';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/context/LanguageContext';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';

export default function Home() {
  const { isLoading: isAuthLoading } = useAuth();
  const t = useTranslation();
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trending, popular, all] = await Promise.all([
          api.get('/movies/trending').then((res) => res.data),
          api.get('/movies/popular').then((res) => res.data),
          api.get('/movies').then((res) => res.data.data),
        ]);

        setTrendingMovies(trending);
        setPopularMovies(popular);
        setAllMovies(all);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isAuthLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B1020]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00D4FF]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1020] via-[#0B1020] to-[#151A2E]">
      <Header />
      
      {/* Hero Slider */}
      {trendingMovies.length > 0 && <HeroSlider movies={trendingMovies.slice(0, 5)} />}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Trending Section */}
        {trendingMovies.length > 0 && (
          <section className="mb-16">
            <MovieGrid movies={trendingMovies} title={`🔥 ${t.trendingNow}`} />
          </section>
        )}

        {/* Popular Section */}
        {popularMovies.length > 0 && (
          <section className="mb-16">
            <MovieGrid movies={popularMovies} title={`⭐ ${t.popular}`} />
          </section>
        )}

        {/* Latest Releases */}
        {allMovies.length > 0 && (
          <section className="mb-16">
            <MovieGrid movies={allMovies.slice(0, 10)} title={`🎬 ${t.topRated}`} />
          </section>
        )}

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-20 mb-12 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border border-primary/30 rounded-lg text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">{t.welcomeBack}</h2>
          <p className="text-muted mb-8 max-w-2xl mx-auto">
            {t.premiumStreaming}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 bg-primary text-background rounded-lg font-bold hover:bg-primary/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50">
              {t.watchNow}
            </button>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}

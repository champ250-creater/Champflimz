'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Movie } from '@/types';
import { MovieGrid } from '@/components/movie/MovieGrid';
import { useTranslation } from '@/context/LanguageContext';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/movies');
        setMovies(response.data.data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1020] to-[#151A2E]">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">{t.allMovies}</h1>
        <p className="text-muted mb-8">{t.browseCollection}</p>
        
        <MovieGrid movies={movies} isLoading={isLoading} />
      </main>
      <Footer />
    </div>
  );
}

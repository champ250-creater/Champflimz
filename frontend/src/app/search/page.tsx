'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { Movie } from '@/types';
import { MovieGrid } from '@/components/movie/MovieGrid';
import { useTranslation } from '@/context/LanguageContext';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslation();

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setMovies([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await api.get(`/search?q=${encodeURIComponent(query)}`);
        setMovies(response.data);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1020] to-[#151A2E]">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">
          {t.searchResults} <span className="gradient-text">"{query}"</span>
        </h1>
        <p className="text-muted mb-8">
          {movies.length} {t.foundResults}
        </p>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <MovieGrid movies={movies} />
        )}

        {!isLoading && movies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted">No movies found matching your search.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

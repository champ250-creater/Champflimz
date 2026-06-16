'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Movie } from '@/types';
import { MovieGrid } from '@/components/movie/MovieGrid';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function MyListPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const t = useTranslation();
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
  }, [user, isAuthLoading, router]);

  useEffect(() => {
    const fetchMyList = async () => {
      if (!user) return;
      try {
        const response = await api.get('/users/my-list');
        // Assuming the response returns an array of movies or objects containing movies
        setMovies(response.data);
      } catch (error) {
        console.error('Failed to fetch my list:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchMyList();
    }
  }, [user]);

  if (isAuthLoading || (isLoading && user)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B1020]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00D4FF]"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1020] to-[#151A2E]">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">{t.myWatchList}</h1>
        <p className="text-muted mb-8">{t.yourSavedMovies}</p>
        
        {movies.length > 0 ? (
          <MovieGrid movies={movies} />
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted">Your list is empty. Start adding some movies!</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

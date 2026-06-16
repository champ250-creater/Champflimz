'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Movie } from '@/types';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';

interface AnalyticsData {
  totalMovies: number;
  totalUsers: number;
  totalWatches: number;
  averageRating: number;
}

export default function AdminPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const t = useTranslation();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    releaseYear: new Date().getFullYear(),
    rating: 0,
    description: '',
    posterUrl: '',
    backdropUrl: '',
    trailerUrl: '',
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [analyticsRes, moviesRes] = await Promise.all([
        api.get('/admin/analytics'),
        api.get('/movies'),
      ]);
      setAnalytics(analyticsRes.data);
      setMovies(moviesRes.data.data);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/');
      return;
    }

    if (user?.role === 'admin') {
      fetchData();
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admin/movies', {
        ...newMovie,
        releaseYear: Number(newMovie.releaseYear),
        rating: Number(newMovie.rating),
      });
      setShowAddMovie(false);
      setNewMovie({
        title: '',
        genre: '',
        releaseYear: new Date().getFullYear(),
        rating: 0,
        description: '',
        posterUrl: '',
        backdropUrl: '',
        trailerUrl: '',
      });
      fetchData();
      alert('Movie added successfully!');
    } catch (error) {
      console.error('Failed to add movie:', error);
      alert('Failed to add movie.');
    }
  };

  const handleDelete = async (movieId: number) => {
    if (!confirm('Are you sure you want to delete this movie?')) return;
    try {
      await api.delete(`/admin/movies/${movieId}`);
      fetchData();
      alert('Movie deleted successfully!');
    } catch (error) {
      console.error('Failed to delete movie:', error);
      alert('Failed to delete movie.');
    }
  };

  if (authLoading || (isLoading && user?.role === 'admin')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B1020]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00D4FF]"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1020] to-[#151A2E]">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">{t.adminDash}</h1>
          <button
            onClick={() => setShowAddMovie(!showAddMovie)}
            className="px-6 py-3 bg-primary text-background font-bold rounded-lg hover:bg-primary/80 transition"
          >
            {showAddMovie ? 'Cancel' : `+ ${t.addNewMovie}`}
          </button>
        </div>
        
        {analytics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { title: t.totalMovies, value: analytics.totalMovies, icon: '🎬' },
              { title: t.totalUsers, value: analytics.totalUsers, icon: '👥' },
              { title: t.totalWatches, value: analytics.totalWatches, icon: '👁️' },
              { title: t.avgRating, value: analytics.averageRating.toFixed(1), icon: '⭐' },
            ].map((card, i) => (
              <div key={i} className="glass rounded-lg p-6">
                <p className="text-4xl mb-2">{card.icon}</p>
                <p className="text-muted text-sm mb-2">{card.title}</p>
                <p className="text-3xl font-bold text-primary">{card.value}</p>
              </div>
            ))}
          </motion.div>
        )}

        {showAddMovie && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">{t.addNewMovie}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t.movieTitle}
                  value={newMovie.title}
                  onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                  className="px-4 py-2 bg-card border border-primary/30 rounded-lg text-text focus:border-primary outline-none transition"
                  required
                />
                <input
                  type="text"
                  placeholder={t.genre}
                  value={newMovie.genre}
                  onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
                  className="px-4 py-2 bg-card border border-primary/30 rounded-lg text-text focus:border-primary outline-none transition"
                  required
                />
                <input
                  type="number"
                  placeholder={t.releaseYear}
                  value={newMovie.releaseYear}
                  onChange={(e) => setNewMovie({ ...newMovie, releaseYear: parseInt(e.target.value) })}
                  className="px-4 py-2 bg-card border border-primary/30 rounded-lg text-text focus:border-primary outline-none transition"
                  required
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder={t.rating}
                  value={newMovie.rating}
                  onChange={(e) => setNewMovie({ ...newMovie, rating: parseFloat(e.target.value) })}
                  className="px-4 py-2 bg-card border border-primary/30 rounded-lg text-text focus:border-primary outline-none transition"
                  required
                />
                <input
                  type="url"
                  placeholder="Poster URL"
                  value={newMovie.posterUrl}
                  onChange={(e) => setNewMovie({ ...newMovie, posterUrl: e.target.value })}
                  className="px-4 py-2 bg-card border border-primary/30 rounded-lg text-text focus:border-primary outline-none transition"
                  required
                />
                <input
                  type="url"
                  placeholder="Backdrop URL"
                  value={newMovie.backdropUrl}
                  onChange={(e) => setNewMovie({ ...newMovie, backdropUrl: e.target.value })}
                  className="px-4 py-2 bg-card border border-primary/30 rounded-lg text-text focus:border-primary outline-none transition"
                />
                <input
                  type="url"
                  placeholder="Trailer URL"
                  value={newMovie.trailerUrl}
                  onChange={(e) => setNewMovie({ ...newMovie, trailerUrl: e.target.value })}
                  className="px-4 py-2 bg-card border border-primary/30 rounded-lg text-text focus:border-primary outline-none transition col-span-full"
                />
              </div>
              <textarea
                placeholder={t.description}
                value={newMovie.description}
                onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                className="w-full px-4 py-2 bg-card border border-primary/30 rounded-lg text-text focus:border-primary outline-none transition"
                rows={4}
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-background font-bold rounded-lg hover:bg-primary/80 transition"
              >
                {t.addMovie}
              </button>
            </form>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Recent Movies</h2>
          <div className="space-y-3">
            {movies.slice(0, 10).map((movie) => (
              <div
                key={movie.id}
                className="glass rounded-lg p-4 flex justify-between items-center hover:border-primary/50 transition-all duration-300"
              >
                <div>
                  <p className="font-semibold text-white">{movie.title}</p>
                  <p className="text-sm text-muted">{movie.releaseYear} • {movie.genre}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-accent font-bold">★ {movie.rating.toFixed(1)}</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-secondary/20 text-secondary rounded hover:bg-secondary/40 transition-colors">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="px-3 py-1 text-sm bg-accent/20 text-accent rounded hover:bg-accent/40 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { Movie } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MovieGrid } from '@/components/movie/MovieGrid';
import { useTranslation } from '@/context/LanguageContext';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function MovieDetailsPage() {
  const params = useParams();
  const movieId = params.id as string;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inMyList, setInMyList] = useState(false);
  const t = useTranslation();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/movies/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  const handleAddToList = async () => {
    if (!movie) return;
    try {
      await api.post('/users/my-list', { movieId: movie.id });
      setInMyList(true);
    } catch (error) {
      console.error('Failed to add to list:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B1020]">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-card rounded-lg" />
            <div className="h-8 bg-card rounded w-1/2" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#0B1020]">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-text">Movie not found</h1>
          <Link href="/" className="text-primary hover:text-primary/80 mt-4 inline-block">
            {t.goHome}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1020]">
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pb-12"
      >
        {/* Backdrop */}
        <div className="relative h-64 md:h-96 lg:h-screen w-full overflow-hidden">
          {movie.backdropUrl && (
            <Image
              src={movie.backdropUrl}
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

          {/* Main Content */}
          <div className="absolute inset-0 flex items-end md:items-center container mx-auto px-4 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-full"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
                {/* Poster */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-32 md:w-48 flex-shrink-0"
                >
                  <Image
                    src={movie.posterUrl}
                    alt={movie.title}
                    width={200}
                    height={300}
                    className="rounded-lg shadow-2xl w-full"
                  />
                </motion.div>

                {/* Info */}
                <div className="flex-1">
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-5xl font-bold text-text mb-4"
                  >
                    {movie.title}
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-4 mb-6 text-sm md:text-base"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-accent font-bold">★ {movie.rating.toFixed(1)}</span>
                    </div>
                    <div className="text-muted">{movie.releaseYear}</div>
                    <div className="text-muted">{movie.genre}</div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-4 flex-wrap"
                  >
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-lg font-bold hover:bg-primary/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50">
                      <span>▶</span>
                      {t.watchNow}
                    </button>
                    <button
                      onClick={handleAddToList}
                      className={`px-6 py-3 border-2 rounded-lg font-bold transition-all duration-300 ${
                        inMyList
                          ? 'border-accent bg-accent/20 text-accent'
                          : 'border-primary text-primary hover:bg-primary/10'
                      }`}
                    >
                      {inMyList ? `✓ ${t.myList}` : `+ ${t.myList}`}
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold text-text mb-4">{t.description}</h2>
                <p className="text-muted leading-relaxed">{movie.description}</p>
              </motion.div>

              {/* Cast */}
              {movie.cast && movie.cast.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold text-text mb-4">Cast</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {movie.cast.map((member) => (
                      <motion.div
                        key={member.id}
                        whileHover={{ scale: 1.05 }}
                        className="bg-card p-4 rounded-lg border border-primary/20"
                      >
                        <p className="font-semibold text-text">{member.name}</p>
                        <p className="text-sm text-muted">{member.character}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Trailer */}
              {movie.trailerUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold text-text mb-4">Trailer</h2>
                  <div className="relative aspect-video bg-card rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={movie.trailerUrl}
                      title={`${movie.title} Trailer`}
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Details Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-card border border-primary/20 rounded-lg p-6 space-y-4"
              >
                <div>
                  <p className="text-sm text-muted mb-1">{t.releaseYear}</p>
                  <p className="text-lg font-semibold text-primary">{movie.releaseYear}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">{t.genre}</p>
                  <p className="text-lg font-semibold text-secondary">{movie.genre}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">{t.rating}</p>
                  <p className="text-lg font-semibold text-accent">★ {movie.rating.toFixed(1)}/10</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Similar Movies */}
        {movie.similar && movie.similar.length > 0 && (
          <div className="container mx-auto px-4 py-12 border-t border-primary/10">
            <MovieGrid
              movies={movie.similar.map((s: any) => s.similarMovie).slice(0, 10)}
              title="🎬 Similar Movies"
            />
          </div>
        )}
      </motion.div>
      <Footer />
    </div>
  );
}

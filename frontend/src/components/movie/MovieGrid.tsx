'use client';

import { Movie } from '@/types';
import { motion } from 'framer-motion';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  isLoading?: boolean;
}

export const MovieGrid = ({ movies, title, isLoading }: MovieGridProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-surface rounded-3xl aspect-[2/3] animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {title && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4"
        >
          <div className="h-10 w-2 bg-primary rounded-full shadow-glow-primary" />
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            {title}
          </h2>
        </motion.div>
      )}
      
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
      >
        {movies.map((movie) => (
          <motion.div key={movie.id} variants={item}>
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </motion.div>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

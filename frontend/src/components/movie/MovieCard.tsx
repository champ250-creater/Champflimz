'use client';

import Image from 'next/image';
import { Movie } from '@/types';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/context/LanguageContext';

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

export const MovieCard = ({ movie, priority = false }: MovieCardProps) => {
  const t = useTranslation();

  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <motion.div
        whileHover={{ y: -12, scale: 1.02 }}
        className="group relative rounded-3xl overflow-hidden bg-surface border border-white/5 shadow-2xl transition-all duration-500"
      >
        {/* Poster Image with Zoom Effect */}
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Image
            src={movie.posterUrl || 'https://via.placeholder.com/300x450?text=No+Image'}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={priority}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
          
          {/* Subtle Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          {/* Glass Info Badge (Hidden by default, shown on hover) */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2">
               <span className="text-primary font-black text-sm">★ {movie.rating.toFixed(1)}</span>
               <span className="text-white/60 text-xs">• {movie.releaseYear}</span>
            </div>
            <h3 className="text-lg font-bold text-white leading-tight mb-4">
              {movie.title}
            </h3>
            <button className="w-full py-2.5 bg-primary text-black font-black text-xs uppercase tracking-widest rounded-xl shadow-glow-primary transform active:scale-95 transition-all">
              {t.watchNow}
            </button>
          </div>

          {/* Persistent Rating & HD Badge */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 group-hover:opacity-0 transition-opacity duration-300">
            <div className="px-3 py-1 glass rounded-full text-xs font-black text-primary border-primary/20">
              ★ {movie.rating.toFixed(1)}
            </div>
            <div className="px-3 py-1 glass rounded-full text-[10px] font-black text-white/80 border-white/10 text-center uppercase">
              4K
            </div>
          </div>
        </div>

        {/* Minimal Info (Shown when not hovered) */}
        <div className="p-4 group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="font-bold text-text truncate mb-1">
            {movie.title}
          </h3>
          <p className="text-xs text-text-muted font-medium">
            {movie.genre.split(',')[0]} • {movie.releaseYear}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

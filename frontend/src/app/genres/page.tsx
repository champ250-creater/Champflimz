'use client';

import { useTranslation } from '@/context/LanguageContext';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';

const genres = [
  'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi',
  'Thriller', 'Animation', 'Documentary', 'Fantasy', 'Adventure', 'Mystery'
];

export default function GenresPage() {
  const t = useTranslation();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1020] to-[#151A2E]">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">{t.browseGenres}</h1>
        <p className="text-muted mb-8">{t.exploreByCategory}</p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {genres.map((genre, i) => (
            <motion.button
              key={genre}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="p-6 bg-gradient-to-br from-primary to-secondary rounded-lg text-white font-bold text-lg hover:shadow-lg hover:shadow-primary/50 transition"
            >
              {genre}
            </motion.button>
          ))}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

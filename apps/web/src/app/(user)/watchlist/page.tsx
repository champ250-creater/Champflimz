import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@champflimz/ui';
import { Bookmark, Play, Trash2 } from 'lucide-react';
import Link from 'next/link';

// Mock data since we are Server Components and need auth
const mockWatchlist = [
  { id: 1, videoId: 101, title: 'Inception', posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', addedAt: new Date().toISOString() },
  { id: 2, videoId: 102, title: 'Interstellar', posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', addedAt: new Date().toISOString() },
  { id: 3, videoId: 103, title: 'The Dark Knight', posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', addedAt: new Date().toISOString() },
];

export default function WatchlistPage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface-base)] text-white font-ui pt-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center gap-4 mb-12">
          <Bookmark className="w-8 h-8 text-[var(--color-accent-500)]" />
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">My Watchlist</h1>
        </div>

        {mockWatchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Bookmark className="w-16 h-16 text-white/20 mb-6" />
            <h2 className="text-2xl font-bold mb-2">Your list is empty</h2>
            <p className="text-white/60 max-w-md mb-8">Save movies and shows here to watch them later. Discover new content and build your ultimate collection.</p>
            <Button size="lg" asChild>
              <Link href="/">Explore Catalog</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {mockWatchlist.map((item) => (
              <Card key={item.id} className="group relative overflow-hidden bg-[var(--color-surface-1)] border-white/5 hover:border-white/20 transition-all duration-300">
                <div className="aspect-[2/3] w-full bg-[var(--color-surface-2)]">
                  <img src={item.posterUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[var(--ease-move)]" />
                </div>
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="font-semibold text-lg mb-4 truncate">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="flex-1 rounded-full gap-2" asChild>
                      <Link href={`/watch/${item.videoId}`}>
                        <Play className="w-4 h-4" fill="currentColor" /> Play
                      </Link>
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

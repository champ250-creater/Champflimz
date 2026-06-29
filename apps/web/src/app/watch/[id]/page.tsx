import AdvancedPlayer from "@/components/movie/AdvancedPlayer";
import { ArrowLeft, ThumbsUp, Plus, Share2, Download } from "lucide-react";
import Link from "next/link";

export default function WatchPage({ params }: { params: { id: string } }) {
  // In a real app, fetch movie details based on params.id
  const movie = {
    title: "Interstellar Odyssey",
    src: "https://files.vidstack.io/sprite-fight/hls/stream.m3u8", // Example HLS stream
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop",
    year: 2026,
    rating: "PG-13",
    duration: "2h 45m",
    description: "When humanity's time on Earth is coming to an end, a group of explorers must travel beyond our solar system to discover a new home for mankind."
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        
        <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-white mb-6 transition-colors">
          <ArrowLeft size={20} /> Back to Browse
        </Link>

        <div className="max-w-5xl mx-auto">
          <AdvancedPlayer title={movie.title} src={movie.src} poster={movie.poster} />
          
          <div className="mt-8 flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{movie.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted font-medium mb-6">
                <span>{movie.year}</span>
                <span className="px-2 py-0.5 border border-muted/50 rounded">{movie.rating}</span>
                <span>{movie.duration}</span>
                <span className="text-primary border border-primary/30 px-2 py-0.5 rounded glass-panel">4K HDR</span>
              </div>
              <p className="text-lg text-textMain/80 leading-relaxed max-w-3xl">
                {movie.description}
              </p>
            </div>

            <div className="flex items-center gap-4 md:flex-col md:w-32">
              <button className="flex flex-col items-center justify-center gap-2 text-muted hover:text-white transition-colors group">
                <div className="p-3 rounded-full glass-panel group-hover:bg-white/10"><Plus size={24} /></div>
                <span className="text-xs font-semibold">My List</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 text-muted hover:text-white transition-colors group">
                <div className="p-3 rounded-full glass-panel group-hover:bg-white/10"><ThumbsUp size={24} /></div>
                <span className="text-xs font-semibold">Rate</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 text-muted hover:text-white transition-colors group">
                <div className="p-3 rounded-full glass-panel group-hover:bg-white/10"><Download size={24} /></div>
                <span className="text-xs font-semibold">Download</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

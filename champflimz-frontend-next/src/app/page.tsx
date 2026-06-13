import HeroBanner from "@/components/home/HeroBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroBanner />
      
      {/* Movie Row placeholders to demonstrate spacing and gradients */}
      <div className="container mx-auto px-4 md:px-8 py-12 -mt-32 relative z-20">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Trending Now</h2>
          <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="min-w-[200px] h-[300px] md:min-w-[250px] md:h-[375px] rounded-xl glass-panel relative group overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-white mb-1">Movie Title {i}</h3>
                    <p className="text-xs text-primary font-semibold">2026 • Sci-Fi</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

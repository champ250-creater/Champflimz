"use client";

import { useEffect, useState, useRef } from 'react';

interface AdvancedPlayerProps {
  title: string;
  src: string;
  poster?: string;
}

export default function AdvancedPlayer({ title, src, poster }: AdvancedPlayerProps) {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full aspect-video bg-surface animate-pulse rounded-xl" />;

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10 bg-black relative group">
      <video 
        ref={videoRef}
        className="w-full aspect-video outline-none"
        poster={poster}
        controls
        controlsList="nodownload"
        crossOrigin="anonymous"
      >
        <source src={src} type="application/x-mpegURL" />
        <source src={src} type="video/mp4" />
        <track kind="subtitles" src="/subs/english.vtt" srcLang="en" label="English" default />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

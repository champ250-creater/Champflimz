"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Hls from "hls.js";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings, FastForward, Rewind, PictureInPicture } from "lucide-react";

interface AdvancedPlayerProps {
  title: string;
  src: string; // The HLS (.m3u8) or DASH (.mpd) URL
  poster?: string;
  type?: "hls" | "dash" | "mp4";
}

export default function AdvancedPlayer({ title, src, poster, type = "hls" }: AdvancedPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [qualityLevels, setQualityLevels] = useState<{height: number; bitrate: number}[]>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1); // -1 = Auto
  
  const hlsRef = useRef<Hls | null>(null);
  let hoverTimeout: NodeJS.Timeout;

  // Initialize HLS.js
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (type === "hls" && Hls.isSupported()) {
      const hls = new Hls({
        capLevelToPlayerSize: true,
      });
      hlsRef.current = hls;
      
      hls.loadSource(src);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        setQualityLevels(data.levels);
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS (Safari)
      video.src = src;
    } else if (type === "mp4") {
      video.src = src;
    }
  }, [src, type]);

  // Video Events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onDurationChange = () => setDuration(video.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("durationchange", onDurationChange);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("durationchange", onDurationChange);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  // Controls Visibility
  const handleMouseMove = () => {
    setIsHovering(true);
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => setIsHovering(false), 3000);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const togglePiP = async () => {
    if (!videoRef.current) return;
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      await videoRef.current.requestPictureInPicture();
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
  };

  const skipTime = (amount: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += amount;
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      
      switch(e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "i":
          e.preventDefault();
          togglePiP();
          break;
        case "t":
          e.preventDefault();
          setIsCinemaMode(!isCinemaMode);
          break;
        case "arrowleft":
          e.preventDefault();
          skipTime(-10);
          break;
        case "arrowright":
          e.preventDefault();
          skipTime(10);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, isMuted, isCinemaMode]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* Cinema Mode Background Dimmer */}
      {isCinemaMode && !isFullscreen && (
        <div className="fixed inset-0 bg-black/85 z-40 pointer-events-none transition-opacity duration-500 ease-[var(--ease-move)]" />
      )}
      
      <div 
        ref={containerRef}
        className={`relative group bg-black overflow-hidden font-ui ${isCinemaMode && !isFullscreen ? 'z-50 shadow-[var(--shadow-modal)] scale-[1.02]' : 'rounded-xl shadow-[var(--shadow-float)]'} transition-all duration-500 ease-[var(--ease-move)]`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsHovering(false)}
      >
        <video
          ref={videoRef}
          className="w-full aspect-video outline-none bg-black cursor-pointer"
          poster={poster}
          onClick={togglePlay}
          playsInline
        />

        {/* Top Ambient Progress Bar (Visible when controls hidden) */}
        {!isHovering && !isPlaying && duration > 0 && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-10">
            <div 
              className="h-full bg-[var(--color-accent-500)]" 
              style={{ width: `${(currentTime / duration) * 100}%` }} 
            />
          </div>
        )}

        {/* Custom UI Layer */}
        <div 
          className={`absolute inset-0 flex flex-col justify-between pointer-events-none transition-opacity duration-300 ease-in-out ${isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Top Gradient */}
          <div className="w-full h-24 bg-gradient-to-b from-black/80 to-transparent p-6 pointer-events-auto">
            <h2 className="text-white font-display text-2xl font-bold tracking-tight drop-shadow-lg">{title}</h2>
          </div>

          {/* Center Play Button */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={togglePlay}
                className="pointer-events-auto bg-black/40 hover:bg-[var(--color-accent-500)] text-white p-6 rounded-full backdrop-blur-md border border-white/10 transition-all duration-[var(--duration-fast)] ease-[var(--ease-move)] hover:scale-110 shadow-[var(--shadow-float)]"
              >
                <Play className="w-12 h-12 ml-1" fill="currentColor" />
              </button>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 md:p-6 pt-12 pointer-events-auto">
            
            {/* Progress Bar */}
            <div 
              ref={progressRef}
              className="w-full h-1.5 bg-white/30 rounded-full mb-6 cursor-pointer group/progress relative overflow-hidden flex items-center transition-all duration-200 hover:h-2.5"
              onClick={handleProgressClick}
            >
              <div 
                className="absolute left-0 top-0 bottom-0 bg-[var(--color-accent-500)] group-hover/progress:bg-[var(--color-accent-400)] transition-colors rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-white">
              {/* Left Controls */}
              <div className="flex items-center gap-4">
                <button onClick={togglePlay} className="hover:text-[var(--color-accent-500)] transition-colors">
                  {isPlaying ? <Pause className="w-6 h-6" fill="currentColor" /> : <Play className="w-6 h-6" fill="currentColor" />}
                </button>
                <button onClick={() => skipTime(-10)} className="hover:text-[var(--color-accent-500)] transition-colors hidden sm:block">
                  <Rewind className="w-5 h-5" />
                </button>
                <button onClick={() => skipTime(10)} className="hover:text-[var(--color-accent-500)] transition-colors hidden sm:block">
                  <FastForward className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-2 group/volume relative">
                  <button onClick={toggleMute} className="hover:text-[var(--color-accent-500)] transition-colors">
                    {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </button>
                  <input 
                    type="range" 
                    min="0" max="1" step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-0 opacity-0 group-hover/volume:w-20 group-hover/volume:opacity-100 transition-all duration-300 origin-left accent-[var(--color-accent-500)]"
                  />
                </div>

                <div className="text-sm font-mono tracking-wider text-white/80 select-none ml-2">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-4">
                <button className="hover:text-[var(--color-accent-500)] transition-colors relative group/settings">
                  <Settings className="w-5 h-5" />
                  {/* Settings Tooltip could go here */}
                </button>
                <button onClick={togglePiP} className="hover:text-[var(--color-accent-500)] transition-colors hidden md:block">
                  <PictureInPicture className="w-5 h-5" />
                </button>
                <button onClick={toggleFullscreen} className="hover:text-[var(--color-accent-500)] transition-colors">
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

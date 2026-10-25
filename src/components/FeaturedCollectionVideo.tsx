'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ArrowRight,
  Film,
} from 'lucide-react';

interface CollectionVideoItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  itemCount: string;
  poster: string;
  videoUrl: string;
  highlights: string[];
}

const COLLECTION_VIDEOS: CollectionVideoItem[] = [
  {
    id: 'laser-engraving',
    slug: 'all-products',
    title: 'Laser Engraving & Atelier Craftsmanship',
    tagline: 'High-Precision Laser Engineering on Canadian Hardwoods',
    badge: 'Atelier Laser Precision',
    description:
      'High-precision laser technology bringing architectural skylines and custom engravings to life on fine Canadian hardwoods.',
    itemCount: 'Precision Works',
    poster: '/images/laser-engraving-atelier.jpg',
    videoUrl: '',
    highlights: ['Micro-Precision Beam', 'Solid Canadian Walnut', 'Bespoke Inscriptions'],
  },
  {
    id: 'historic-architecture',
    slug: 'historic-architecture',
    title: 'Architectural Metal & Script Art',
    tagline: 'Laser-Cut Precision Silhouettes & Contemporary Patina',
    badge: 'Monumental Metallurgy',
    description:
      'Engineered with industrial precision. High-grade laser-cut stainless steel and warm brass finishes commemorate the towering skylines and iconic structures of North America.',
    itemCount: '12 Heritage Pieces',
    poster: '/images/collections/metalcraft-atelier.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    highlights: ['Surgical-Grade Steel', 'Anodized Bronze Coating', 'Architectural Accuracy'],
  },
  {
    id: 'day-night',
    slug: 'day-night',
    title: 'Artisan Living & Architectural Clocks',
    tagline: 'Silent Japanese Quartz Movements & Modern Typographic Dials',
    badge: 'Timepiece Studio',
    description:
      'Minimalist horology meeting artisanal craftsmanship. Premium wall clocks and desktop sculptures designed to celebrate the passage of memorable moments in refined interiors.',
    itemCount: '10 Timepieces',
    poster: '/images/collections/architectural-interior.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    highlights: ['Silent Sweep Movement', 'Architectural Typography', 'Solid Walnut Accents'],
  },
  {
    id: 'signature',
    slug: 'signature',
    title: 'North American Signature Keepsakes',
    tagline: 'Iconic Emblems & Architectural Monuments',
    badge: 'Core Signature',
    description:
      'The quintessential Memoriq archive. From Toronto’s CN Tower silhouettes to New York’s harbor emblems, celebrated monuments translated into heirloom art.',
    itemCount: '18 Signature Works',
    poster: '/images/cn-tower-hero.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    highlights: ['Limited Numbered Editions', 'Collector Velvet Box', 'Certificate of Provenance'],
  },
];

export default function FeaturedCollectionVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeItem = COLLECTION_VIDEOS[0];

  useEffect(() => {
    setVideoError(false);
  }, []);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const mins = Math.floor(secs / 60);
    const rem = Math.floor(secs % 60);
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      id="featured-video-collections"
      style={{
        padding: '96px 0',
        backgroundColor: '#071426',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(180, 126, 0, 0.25)',
        borderBottom: '1px solid rgba(180, 126, 0, 0.25)',
      }}
    >
      {/* Background ambient luxury lighting */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(180, 126, 0, 0.15) 0%, rgba(7, 20, 38, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(22, 54, 92, 0.35) 0%, rgba(7, 20, 38, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          <div style={{ maxWidth: '720px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: 'rgba(180, 126, 0, 0.12)',
                border: '1px solid rgba(221, 168, 46, 0.35)',
                borderRadius: '999px',
                marginBottom: '14px',
              }}
            >
              <Film size={13} style={{ color: '#dda82e' }} />
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: '#dda82e',
                }}
              >
                Behind the Scenes • The Atelier
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)',
                fontWeight: 500,
                color: '#ffffff',
                lineHeight: 1.2,
                margin: '0 0 12px',
                letterSpacing: '0.02em',
              }}
            >
              The Art of Creation
            </h2>

            <p
              style={{
                color: '#94a3b8',
                fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)',
                lineHeight: 1.65,
                margin: 0,
                maxWidth: '640px',
              }}
            >
              Discover how raw Canadian timber and architectural steel are transformed into heirloom keepsakes, sculpted with heritage artistry and timeless precision.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link
              href="/collections"
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: '#b47e00',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '2px',
                boxShadow: '0 8px 20px rgba(180, 126, 0, 0.25)',
                transition: 'all 0.25s ease',
              }}
            >
              <span>Discover the Series</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Cinematic Video Player Container */}
        <div
          ref={playerContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: isFullscreen ? 'auto' : '16 / 9',
            maxHeight: isFullscreen ? '100vh' : '620px',
            backgroundColor: '#020617',
            borderRadius: isFullscreen ? '0' : '4px',
            overflow: 'hidden',
            border: isFullscreen ? 'none' : '1px solid rgba(221, 168, 46, 0.35)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 0,
          }}
        >
          {/* Laser Engraving Visual Showcase */}
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src={activeItem.poster}
              alt="Precision laser engraving on Canadian walnut hardwood plaque"
              fill
              style={{
                objectFit: 'cover',
                transform: isPlaying ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              priority
            />

            {/* If videoUrl is provided and playing, play real video */}
            {activeItem.videoUrl && isPlaying && (
              <video
                ref={videoRef}
                src={activeItem.videoUrl}
                poster={activeItem.poster}
                playsInline
                autoPlay
                loop
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onError={() => setVideoError(true)}
                onClick={togglePlay}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
              />
            )}
          </div>

          {/* Vignette Overlay for cinematic look */}
          <div
            onClick={togglePlay}
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(7, 20, 38, 0.65) 0%, rgba(7, 20, 38, 0) 30%, rgba(7, 20, 38, 0) 65%, rgba(7, 20, 38, 0.85) 100%)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          {/* Top Info Bar inside Player */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 3,
              opacity: showControls || !isPlaying ? 1 : 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: showControls || !isPlaying ? 'auto' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: isPlaying ? '#22c55e' : '#ef4444',
                  boxShadow: isPlaying ? '0 0 12px #22c55e' : 'none',
                }}
              />
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#e2e8f0',
                }}
              >
                {activeItem.badge} • 4K ATELIER CINEMA
              </span>
            </div>
          </div>

          {/* Large Center Play / Pause Indicator */}
          {(!isPlaying || showControls) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                backgroundColor: 'rgba(12, 35, 64, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(221, 168, 46, 0.85)',
                color: '#dda82e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 4,
                boxShadow: '0 0 32px rgba(180, 126, 0, 0.45)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: !isPlaying ? 1 : showControls ? 0.85 : 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
                e.currentTarget.style.backgroundColor = 'rgba(180, 126, 0, 0.95)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                e.currentTarget.style.backgroundColor = 'rgba(12, 35, 64, 0.8)';
                e.currentTarget.style.color = '#dda82e';
              }}
            >
              {isPlaying ? <Pause size={30} /> : <Play size={30} style={{ marginLeft: '4px' }} />}
            </button>
          )}

          {/* Bottom Floating Control Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '16px 24px 20px',
              zIndex: 3,
              opacity: showControls || !isPlaying ? 1 : 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: showControls || !isPlaying ? 'auto' : 'none',
              background: 'linear-gradient(0deg, rgba(7, 20, 38, 0.95) 0%, rgba(7, 20, 38, 0) 100%)',
            }}
          >
            {/* Interactive Progress Bar */}
            <div
              onClick={handleSeek}
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '3px',
                cursor: 'pointer',
                position: 'relative',
                marginBottom: '14px',
                overflow: 'hidden',
              }}
              title="Seek timeline"
            >
              <div
                style={{
                  height: '100%',
                  width: `${progressPercent}%`,
                  backgroundColor: '#dda82e',
                  boxShadow: '0 0 10px rgba(221, 168, 46, 0.8)',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>

            {/* Bottom Controls Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  style={{
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#dda82e')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>

                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  style={{
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#dda82e')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                <span
                  style={{
                    fontSize: '0.75rem',
                    color: '#cbd5e1',
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                  }}
                >
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Center Collection Title */}
              <div
                style={{
                  display: 'none',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.82rem',
                  color: '#e2e8f0',
                  fontWeight: 600,
                }}
                className="video-center-title"
              >
                <span>{activeItem.title}</span>
              </div>

              {/* Right Controls: Fullscreen */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                  style={{
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#dda82e')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                >
                  {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

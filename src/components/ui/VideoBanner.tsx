import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import content from '@/content/pages/home.json';

gsap.registerPlugin(ScrollTrigger);

export default function VideoBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const videoSrc = content.hero.content.bannerVideo || '/videos/banner.mp4';
  const vb = content.videoBanner;
  const label = vb.content?.label || 'Behind the Lens';
  const titlePart1 = vb.content?.titlePart1 || 'Where Stories';
  const titlePart2 = vb.content?.titlePart2 || 'Come Alive';

  // Fade video in only when it starts playing
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlaying = () => setVideoReady(true);
    v.addEventListener('playing', onPlaying);
    if (!v.paused) setVideoReady(true);
    return () => v.removeEventListener('playing', onPlaying);
  }, []);

  // Parallax scroll on desktop
  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    gsap.to(videoRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[50vh] md:h-[65vh] lg:h-[75vh] overflow-hidden">
      {/* Dark base behind video */}
      <div className="absolute inset-0 bg-[var(--color-bg)]" />

      {/* Video — hidden until playing */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        // @ts-ignore
        webkit-playsinline=""
        preload="auto"
        className="absolute inset-0 w-full h-[130%] object-cover -top-[15%] transition-opacity duration-700"
        style={{ opacity: videoReady ? 1 : 0 }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-[var(--color-bg)]/40 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-[var(--color-bg)]/70 z-[2]" />

      {/* Center content */}
      <div className="absolute inset-0 z-[3] flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[var(--color-accent)] mb-5">
            {label}
          </p>
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            {titlePart1}{' '}
            <span className="italic text-[var(--color-accent)]">{titlePart2}</span>
          </h2>
        </div>
      </div>

      {/* Scan line */}
      <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
        <div className="absolute left-0 right-0 h-px bg-white/10" style={{ animation: 'scanline 4s linear infinite' }} />
      </div>
      <style>{`@keyframes scanline { 0% { top: -2%; } 100% { top: 102%; } }`}</style>
    </div>
  );
}

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import content from '@/content/pages/home.json';

gsap.registerPlugin(ScrollTrigger);

export default function VideoBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const vb = content.videoBanner;
  const label = vb.content?.label || 'Behind the Lens';
  const titlePart1 = vb.content?.titlePart1 || 'Where Stories';
  const titlePart2 = vb.content?.titlePart2 || 'Come Alive';
  const videoSrc = content.hero.content.bannerVideo || '/uploads/239444_small.mp4';

  // Hide until playing
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setReady(true);
    v.addEventListener('playing', onPlay);
    if (!v.paused) setReady(true);
    return () => v.removeEventListener('playing', onPlay);
  }, []);

  // Parallax: video moves on scroll
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
      <div className="absolute inset-0 bg-[var(--color-bg)]" />
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        preload="auto"
        className="absolute inset-0 w-full h-[130%] object-cover -top-[15%] transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[var(--color-bg)]/40 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-[var(--color-bg)]/70 z-[2]" />

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
    </div>
  );
}

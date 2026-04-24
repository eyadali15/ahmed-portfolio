import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import content from '@/content/pages/home.json';

gsap.registerPlugin(ScrollTrigger);

export default function VideoBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const vb = content.videoBanner;
  const label = vb.content?.label || 'Behind the Lens';
  const titlePart1 = vb.content?.titlePart1 || 'Where Stories';
  const titlePart2 = vb.content?.titlePart2 || 'Come Alive';
  const videoSrc = content.hero.content.bannerVideo || '/uploads/239444_small.mp4';

  // Scroll-driven video: frame advances with scroll
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const setup = () => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) return;

      gsap.to({}, {
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
          onUpdate: (self) => {
            const time = self.progress * duration;
            if (video.readyState >= 2) {
              video.currentTime = time;
            }
          },
        },
      });
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener('loadedmetadata', setup, { once: true });
    }

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[50vh] md:h-[65vh] lg:h-[75vh] overflow-hidden">
      {/* Scroll-driven video */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectFit: 'cover' }}
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

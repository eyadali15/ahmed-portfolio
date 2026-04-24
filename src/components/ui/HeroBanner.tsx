import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/ui/Button';
import content from '@/content/pages/home.json';

gsap.registerPlugin(ScrollTrigger);

type Align = 'left' | 'center' | 'right';
type Layout = { paddingTop: number; paddingBottom: number; paddingLeft: number; paddingRight: number; marginTop: number; marginBottom: number; marginLeft: number; marginRight: number; gapAfter?: number };
const box = (l: Layout) => ({
  paddingTop: l.paddingTop, paddingBottom: l.paddingBottom, paddingLeft: l.paddingLeft || undefined, paddingRight: l.paddingRight || undefined,
  marginTop: l.marginTop || undefined, marginBottom: (l.marginBottom || 0) + (l.gapAfter || 0) || undefined, marginLeft: l.marginLeft || undefined, marginRight: l.marginRight || undefined,
});
const jm = { left: 'flex-start', center: 'center', right: 'flex-end' } as const;

function setupScrollVideo(video: HTMLVideoElement, trigger: Element, start: string, end: string) {
  const duration = video.duration;
  if (!duration || isNaN(duration)) return;

  // Pause autoplay — we control it via scroll
  video.pause();

  gsap.to({}, {
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: 1,
      onUpdate: (self) => {
        try {
          video.currentTime = self.progress * duration;
        } catch (_) { /* ignore seek errors */ }
      },
    },
  });
}

function waitForVideo(video: HTMLVideoElement, callback: () => void) {
  // Already loaded
  if (video.readyState >= 1 && video.duration > 0) {
    callback();
    return;
  }

  // Listen for multiple events
  const handler = () => {
    if (video.duration > 0) {
      video.removeEventListener('loadedmetadata', handler);
      video.removeEventListener('loadeddata', handler);
      video.removeEventListener('canplay', handler);
      callback();
    }
  };
  video.addEventListener('loadedmetadata', handler);
  video.addEventListener('loadeddata', handler);
  video.addEventListener('canplay', handler);

  // Fallback polling — catches cached videos that already fired events
  let attempts = 0;
  const poll = setInterval(() => {
    attempts++;
    if (video.readyState >= 1 && video.duration > 0) {
      clearInterval(poll);
      handler();
    }
    if (attempts > 50) clearInterval(poll); // give up after 5s
  }, 100);
}

export default function HeroBanner() {
  const { content: c, elements: e, layout: l } = content.hero;
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  // Text entrance
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    if (titleRef.current) tl.fromTo(titleRef.current.querySelectorAll('.hero-word'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power4.out' });
    if (subtitleRef.current) tl.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4');
  }, []);

  // Scroll-driven video
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Force load
    video.load();

    waitForVideo(video, () => {
      setupScrollVideo(video, section, 'top top', 'bottom top');
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden" style={box(l)}>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ objectFit: 'cover' }}
      >
        <source src={c.heroImage || '/uploads/136726-764934405_small.mp4'} type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1] bg-black/50" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      <div className="relative z-[3] h-full flex flex-col items-center justify-center px-6" style={{ textAlign: l.align as Align }}>
        <div ref={titleRef} style={{ marginBottom: e.titleMarginBottom }}>
          <h1 className="font-[var(--font-heading)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1] tracking-tight">
            <span className="hero-word inline-block text-white">{c.name1 || 'Ahmed'}</span>
            <span className="hero-word inline-block ml-3 md:ml-4 text-[var(--color-accent)]">{c.name2 || 'Abuzenada'}</span>
          </h1>
        </div>
        <div ref={subtitleRef} style={{ textAlign: l.align as Align }}>
          <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-white/70" style={{ marginBottom: e.subtitleMarginBottom }}>{c.subtitle}</p>
          <div className="w-12 h-px bg-[var(--color-accent)]" style={{ margin: l.align === 'center' ? `${e.dividerMarginY}px auto` : `${e.dividerMarginY}px 0` }} />
          <p className="text-white/50 text-sm max-w-md leading-relaxed" style={{ marginBottom: e.descriptionMarginBottom, margin: l.align === 'center' ? `0 auto ${e.descriptionMarginBottom}px` : `0 0 ${e.descriptionMarginBottom}px` }}>{c.description}</p>
          <div style={{ display: 'flex', justifyContent: jm[l.align as Align] }}><Button to="/work">{c.buttonText || 'View My Work'}</Button></div>
        </div>
      </div>
    </section>
  );
}

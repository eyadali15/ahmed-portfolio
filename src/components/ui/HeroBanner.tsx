import { useEffect, useRef, useState } from 'react';
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
const isMobile = () => window.innerWidth < 768;

function waitForVideo(video: HTMLVideoElement, cb: () => void) {
  if (video.readyState >= 1 && video.duration > 0) { cb(); return; }
  const handler = () => {
    if (video.duration > 0) {
      video.removeEventListener('loadedmetadata', handler);
      video.removeEventListener('loadeddata', handler);
      video.removeEventListener('canplay', handler);
      cb();
    }
  };
  video.addEventListener('loadedmetadata', handler);
  video.addEventListener('loadeddata', handler);
  video.addEventListener('canplay', handler);
  let n = 0;
  const poll = setInterval(() => { n++; if (video.readyState >= 1 && video.duration > 0) { clearInterval(poll); handler(); } if (n > 50) clearInterval(poll); }, 100);
}

export default function HeroBanner() {
  const { content: c, elements: e, layout: l } = content.hero;
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [mobile] = useState(isMobile);

  // Text entrance
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    if (titleRef.current) tl.fromTo(titleRef.current.querySelectorAll('.hero-word'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power4.out' });
    if (subtitleRef.current) tl.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4');
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.load();

    if (mobile) {
      // MOBILE: scroll-driven currentTime (proven working)
      waitForVideo(video, () => {
        const duration = video.duration;
        if (!duration || isNaN(duration)) return;
        video.pause();
        gsap.to({}, {
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              try { video.currentTime = self.progress * duration; } catch (_) {}
            },
          },
        });
      });
    } else {
      // DESKTOP: autoplay + parallax (no frame skipping)
      video.play().catch(() => {});
      const onPlay = () => setReady(true);
      video.addEventListener('playing', onPlay);
      if (!video.paused) setReady(true);

      gsap.to(video, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, [mobile]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden" style={box(l)}>
      <video
        ref={videoRef}
        muted playsInline preload="auto"
        {...(!mobile ? { autoPlay: true, loop: true } : {})}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700"
        style={{ opacity: mobile || ready ? 1 : 0 }}
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
          <div style={{ display: 'flex', justifyContent: jm[l.align as Align] }}><Button to="/portfolio">{c.buttonText || 'View Portfolio'}</Button></div>
        </div>
      </div>
    </section>
  );
}

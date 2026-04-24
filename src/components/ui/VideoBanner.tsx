import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import content from '@/content/pages/home.json';

gsap.registerPlugin(ScrollTrigger);

function initScrollVideo(video: HTMLVideoElement, trigger: Element, start: string, end: string) {
  const duration = video.duration;
  if (!duration || isNaN(duration)) return;
  video.pause();

  gsap.to({}, {
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: 1,
      onUpdate: (self) => { try { video.currentTime = self.progress * duration; } catch (_) {} },
    },
  });

  return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
}

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

export default function VideoBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const vb = content.videoBanner;
  const label = vb.content?.label || 'Behind the Lens';
  const titlePart1 = vb.content?.titlePart1 || 'Where Stories';
  const titlePart2 = vb.content?.titlePart2 || 'Come Alive';
  const videoSrc = content.hero.content.bannerVideo || '/uploads/239444_small.mp4';
  const layout = (vb as any).layout || {};
  const h = layout.height || 65;

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;
    video.load();
    let cleanup: (() => void) | undefined;
    waitForVideo(video, () => {
      cleanup = initScrollVideo(video, container, 'top bottom', 'bottom top');
    });
    return () => { cleanup?.(); };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        height: `${h}vh`,
        paddingTop: layout.paddingTop || undefined,
        paddingBottom: layout.paddingBottom || undefined,
        paddingLeft: layout.paddingLeft || undefined,
        paddingRight: layout.paddingRight || undefined,
        marginTop: layout.marginTop || undefined,
        marginBottom: ((layout.marginBottom || 0) + (layout.gapAfter || 0)) || undefined,
        marginLeft: layout.marginLeft || undefined,
        marginRight: layout.marginRight || undefined,
      }}
    >
      <video
        ref={videoRef}
        muted playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
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

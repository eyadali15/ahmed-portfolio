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

/* ─── Animated Camera SVG ─── */
function AnimatedCamera({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Camera body */}
      <rect x="80" y="90" width="240" height="150" rx="12" fill="#1a1a1a" stroke="#333" strokeWidth="1.5" />
      <rect x="85" y="95" width="230" height="140" rx="10" fill="#111" />

      {/* Lens mount */}
      <circle cx="200" cy="165" r="55" fill="#0d0d0d" stroke="#2a2a2a" strokeWidth="2" />
      <circle cx="200" cy="165" r="48" fill="#0a0a0a" stroke="#222" strokeWidth="1.5" />

      {/* Lens glass rings */}
      <circle cx="200" cy="165" r="40" fill="none" stroke="#c9a96e" strokeWidth="0.5" opacity="0.6" />
      <circle cx="200" cy="165" r="32" fill="none" stroke="#c9a96e" strokeWidth="0.3" opacity="0.4" />
      <circle cx="200" cy="165" r="24" fill="none" stroke="#c9a96e" strokeWidth="0.3" opacity="0.3" />

      {/* Lens center (glass reflection) */}
      <circle cx="200" cy="165" r="18" fill="#0f0f1a" />
      <ellipse cx="193" cy="158" rx="6" ry="4" fill="white" opacity="0.08" />

      {/* Lens flare */}
      <circle cx="200" cy="165" r="16" fill="url(#lensGlow)" opacity="0.3" />

      {/* Viewfinder */}
      <rect x="275" y="80" width="40" height="25" rx="4" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
      <rect x="279" y="84" width="32" height="17" rx="2" fill="#0a0a0a" />

      {/* Top details */}
      <rect x="130" y="78" width="50" height="14" rx="3" fill="#1a1a1a" stroke="#333" strokeWidth="0.8" />
      <circle cx="155" cy="85" r="3" fill="#c9a96e" opacity="0.7" />

      {/* Recording indicator */}
      <circle cx="295" cy="105" r="3" fill="#ff3333" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Film strip left */}
      <g opacity="0.15">
        <rect x="30" y="100" width="40" height="130" rx="3" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x="34" y={106 + i * 20} width="12" height="14" rx="1" fill="#c9a96e" opacity="0.3" />
        ))}
      </g>

      {/* Film strip right */}
      <g opacity="0.15">
        <rect x="330" y="100" width="40" height="130" rx="3" fill="none" stroke="#c9a96e" strokeWidth="0.8" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x="354" y={106 + i * 20} width="12" height="14" rx="1" fill="#c9a96e" opacity="0.3" />
        ))}
      </g>

      {/* Bokeh lights */}
      {[
        { cx: 50, cy: 50, r: 15, o: 0.06 },
        { cx: 350, cy: 40, r: 20, o: 0.04 },
        { cx: 30, cy: 250, r: 12, o: 0.05 },
        { cx: 370, cy: 260, r: 18, o: 0.04 },
        { cx: 100, cy: 30, r: 10, o: 0.03 },
      ].map((b, i) => (
        <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill="#c9a96e" opacity={b.o} />
      ))}

      <defs>
        <radialGradient id="lensGlow">
          <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ─── Hero Section ─── */
export default function HeroBanner() {
  const { content: c, elements: e, layout: l } = content.hero;
  const sectionRef = useRef<HTMLElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Text entrance
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    if (titleRef.current) tl.fromTo(titleRef.current.querySelectorAll('.hero-word'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power4.out' });
    if (subtitleRef.current) tl.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4');
  }, []);

  // Camera entrance + scroll parallax
  useEffect(() => {
    if (!sectionRef.current || !cameraRef.current) return;

    // Entrance animation
    gsap.fromTo(cameraRef.current,
      { scale: 0.8, opacity: 0, rotateZ: -5 },
      { scale: 1, opacity: 1, rotateZ: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' }
    );

    // Scroll: camera moves up and slightly rotates
    gsap.to(cameraRef.current, {
      y: -120,
      rotateZ: 3,
      scale: 0.9,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Floating particles parallax
    if (particlesRef.current) {
      gsap.to(particlesRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden" style={box(l)}>
      {/* Dark base */}
      <div className="absolute inset-0 bg-[var(--color-bg)]" />

      {/* Radial glow behind camera */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #c9a96e 0%, transparent 70%)' }} />
      </div>

      {/* Animated camera */}
      <div ref={cameraRef} className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none">
        <AnimatedCamera className="w-[280px] md:w-[380px] lg:w-[450px] h-auto opacity-30 md:opacity-25" />
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[var(--color-accent)]"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.15 + 0.03,
              animation: `float${i % 3} ${6 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-b from-black/30 via-transparent to-black/80" />

      {/* Content */}
      <div className="relative z-[4] h-full flex flex-col items-center justify-center px-6" style={{ textAlign: l.align as Align }}>
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

      {/* Floating keyframes */}
      <style>{`
        @keyframes float0 { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-20px) translateX(10px); } }
        @keyframes float1 { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-15px) translateX(-8px); } }
        @keyframes float2 { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-25px) translateX(5px); } }
      `}</style>
    </section>
  );
}

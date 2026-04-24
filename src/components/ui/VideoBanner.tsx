import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import content from '@/content/pages/home.json';

gsap.registerPlugin(ScrollTrigger);

const BLADES = 8;

export default function VideoBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const irisRef = useRef<SVGSVGElement>(null);
  const vb = content.videoBanner;
  const label = vb.content?.label || 'Behind the Lens';
  const titlePart1 = vb.content?.titlePart1 || 'Where Stories';
  const titlePart2 = vb.content?.titlePart2 || 'Come Alive';

  useEffect(() => {
    if (!containerRef.current || !irisRef.current) return;

    // Animate iris blades closing on scroll
    const blades = irisRef.current.querySelectorAll('.iris-blade');
    blades.forEach((blade, i) => {
      const angle = (360 / BLADES) * i;
      // Start open (translated outward), close on scroll (translate inward)
      gsap.fromTo(blade,
        { rotation: angle, x: 0, y: -180 },
        {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        }
      );
    });

    // Subtle scale on the whole iris
    gsap.fromTo(irisRef.current,
      { scale: 1.1 },
      {
        scale: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[50vh] md:h-[65vh] lg:h-[75vh] overflow-hidden">
      {/* Dark base */}
      <div className="absolute inset-0 bg-[var(--color-bg)]" />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #c9a96e 0%, transparent 70%)' }} />
      </div>

      {/* Camera Iris/Shutter SVG */}
      <div className="absolute inset-0 flex items-center justify-center z-[1]">
        <svg ref={irisRef} viewBox="-200 -200 400 400" className="w-[300px] md:w-[400px] lg:w-[500px] h-auto opacity-20">
          {/* Iris blades */}
          {Array.from({ length: BLADES }).map((_, i) => {
            const angle = (360 / BLADES) * i;
            return (
              <g key={i} className="iris-blade" style={{ transformOrigin: '0 0', transform: `rotate(${angle}deg)` }}>
                <path
                  d="M -40 -180 L 40 -180 L 25 -60 L -25 -60 Z"
                  fill="#1a1a1a"
                  stroke="#c9a96e"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
              </g>
            );
          })}

          {/* Outer ring */}
          <circle cx="0" cy="0" r="190" fill="none" stroke="#c9a96e" strokeWidth="0.5" opacity="0.2" />
          <circle cx="0" cy="0" r="185" fill="none" stroke="#333" strokeWidth="1" opacity="0.3" />

          {/* Inner lens rings */}
          <circle cx="0" cy="0" r="50" fill="none" stroke="#c9a96e" strokeWidth="0.5" opacity="0.3" />
          <circle cx="0" cy="0" r="35" fill="none" stroke="#c9a96e" strokeWidth="0.3" opacity="0.2" />
          <circle cx="0" cy="0" r="20" fill="#0f0f1a" opacity="0.5" />

          {/* Lens center glow */}
          <circle cx="0" cy="0" r="25" fill="url(#irisCenterGlow)" opacity="0.4" />

          {/* Tick marks around outer ring */}
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (Math.PI * 2 * i) / 36;
            const r1 = 175;
            const r2 = i % 3 === 0 ? 168 : 172;
            return (
              <line
                key={i}
                x1={Math.cos(a) * r1} y1={Math.sin(a) * r1}
                x2={Math.cos(a) * r2} y2={Math.sin(a) * r2}
                stroke="#c9a96e" strokeWidth={i % 3 === 0 ? '1' : '0.5'} opacity="0.15"
              />
            );
          })}

          <defs>
            <radialGradient id="irisCenterGlow">
              <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#c9a96e" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-[var(--color-bg)]/60 z-[2]" />

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

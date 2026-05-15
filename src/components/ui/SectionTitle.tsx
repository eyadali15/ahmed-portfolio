import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  label?: string;
  title: string;
  className?: string;
  align?: 'left' | 'center';
  titlePaddingBottom?: number | string;
}

export default function SectionTitle({ label, title, className = '', align = 'left', titlePaddingBottom = 0 }: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll('.st-animate');
    gsap.fromTo(els,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 88%', once: true } }
    );
  }, []);

  return (
    <div ref={containerRef}
      className={`mb-10 ${align === 'center' ? 'text-center' : ''} ${className}`}
    >
      {label && (
        <p className="st-animate text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] mb-3">{label}</p>
      )}
      <h2 
        className="st-animate font-[var(--font-heading)] text-2xl md:text-3xl lg:text-4xl text-[var(--color-text-primary)] leading-tight"
        style={{ paddingBottom: titlePaddingBottom }}
      >
        {title}
      </h2>
    </div>
  );
}

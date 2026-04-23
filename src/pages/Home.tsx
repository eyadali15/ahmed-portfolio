import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import VideoBanner from '@/components/ui/VideoBanner';
import { useStore } from '@/store/useStore';
import { getFeaturedProjects } from '@/data/projects';
import PageTransition from '@/components/layout/PageTransition';
import content from '@/content/pages/home.json';

gsap.registerPlugin(ScrollTrigger);

type Align = 'left' | 'center' | 'right';
type Layout = { paddingTop: number; paddingBottom: number; paddingLeft: number; paddingRight: number; marginTop: number; marginBottom: number; marginLeft: number; marginRight: number; gapAfter?: number };
const box = (l: Layout) => ({
  paddingTop: l.paddingTop, paddingBottom: l.paddingBottom, paddingLeft: l.paddingLeft || undefined, paddingRight: l.paddingRight || undefined,
  marginTop: l.marginTop || undefined, marginBottom: (l.marginBottom || 0) + (l.gapAfter || 0) || undefined, marginLeft: l.marginLeft || undefined, marginRight: l.marginRight || undefined,
});
const jm = { left: 'flex-start', center: 'center', right: 'flex-end' } as const;

function HeroSection() {
  const { content: c, elements: e, layout: l } = content.hero;
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });
    if (titleRef.current) tl.fromTo(titleRef.current.querySelectorAll('.hero-word'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power4.out' });
    tl.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4');
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden" style={box(l)}>
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src={c.heroVideo || '/videos/banner.mp4'} type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1] bg-black/60" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/40 via-transparent to-black/90" />
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

function FeaturedSection() {
  const { content: c, elements: e, layout: l } = content.featured;
  const featured = getFeaturedProjects();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.querySelectorAll('.featured-card').forEach((card, i) => {
      gsap.fromTo(card, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: i * 0.15, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
    });
  }, []);

  return (
    <section style={box(l)}>
      <div className="container-main" style={{ textAlign: l.align as Align }}>
        <SectionTitle label={c.label} title={c.title} titlePaddingBottom={10} />
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: l.gridGap, marginTop: e.titleToGridGap }}>
          {featured.map((project) => (
            <Link key={project.slug} to={`/work/${project.slug}`} className="featured-card group block text-left">
              <div className="relative overflow-hidden aspect-video bg-[var(--color-bg-surface)] rounded-sm">
                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm bg-white/10">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-accent)] block mb-1.5">{project.category}</span>
                  <h3 className="font-[var(--font-heading)] text-xl text-white mb-1">{project.title}</h3>
                  <p className="text-xs text-white/60">{project.client} · {project.year}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: e.gridToButtonGap, display: 'flex', justifyContent: jm[(l.buttonAlign || 'center') as Align] }}>
          <Button to="/work">{c.buttonText || 'View All Work'}</Button>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const { content: c, elements: e, layout: l } = content.cta;
  return (
    <section style={box(l)}>
      <div className="container-main max-w-[700px]" style={{ textAlign: l.align as Align }}>
        <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)]" style={{ marginBottom: e.labelMarginBottom }}>{c.label}</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl leading-tight text-white" style={{ marginBottom: e.titleMarginBottom }}>
          {c.title.split("Let's bring it to life.")[0]}<span className="text-[var(--color-accent)] italic">Let's bring it to life.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/50 max-w-md text-base leading-relaxed" style={{ paddingTop: e.descriptionPaddingTop, marginBottom: e.descriptionMarginBottom, margin: l.align === 'center' ? `0 auto ${e.descriptionMarginBottom}px` : undefined }}>{c.description}</motion.p>
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} style={{ marginTop: e.buttonMarginTop, display: 'flex', justifyContent: jm[l.align as Align] }}>
          <Button to="/contact">{c.buttonText}</Button>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const setIsLoading = useStore((s) => s.setIsLoading);
  useEffect(() => { setIsLoading(false); return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); }; }, [setIsLoading]);
  return (
    <PageTransition>
      {content.hero.visible !== false && <HeroSection />}
      {content.featured.visible !== false && <FeaturedSection />}
      {content.videoBanner?.visible !== false && <VideoBanner />}
      {content.cta.visible !== false && <CTASection />}
    </PageTransition>
  );
}

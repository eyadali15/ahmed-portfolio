import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '@/components/layout/PageTransition';
import staticContent from '@/content/pages/about.json';
import { getConfig, mergeLayoutStyle } from '@/hooks/useConfig';

gsap.registerPlugin(ScrollTrigger);

type Align = 'left' | 'center' | 'right';
type Layout = { paddingTop: number; paddingBottom: number; paddingLeft: number; paddingRight: number; marginTop: number; marginBottom: number; marginLeft: number; marginRight: number; gapAfter?: number; align: string };
const box = (l: Layout) => ({
  paddingTop: l.paddingTop, paddingBottom: l.paddingBottom, paddingLeft: l.paddingLeft || undefined, paddingRight: l.paddingRight || undefined,
  marginTop: l.marginTop || undefined, marginBottom: (l.marginBottom || 0) + (l.gapAfter || 0) || undefined, marginLeft: l.marginLeft || undefined, marginRight: l.marginRight || undefined,
});

/* ──── Cinema-themed service card data ──── */
const DEFAULT_SERVICES = [
  {
    icon: '🎬',
    title: 'Film Director',
    description: 'Bringing stories to life through narrative filmmaking. From concept to final cut, I craft compelling visual narratives that resonate with audiences.',
    tags: ['Narrative Films', 'Short Films', 'Music Videos', 'Visual Storytelling'],
    svgPath: 'M15.91 13.34l2.636-4.026-.454-.406-3.673 3.099c-.675-.138-1.402.068-1.894.618-.736.823-.665 2.088.159 2.824.824.736 2.088.665 2.824-.159.492-.55.615-1.295.402-1.95zm-3.91-10.646v-2.694h4v2.694c-1.439-.243-2.592-.238-4 0zm8.851 2.064l1.407-1.407 1.414 1.414-1.321 1.321c-.462-.484-.964-.927-1.5-1.328zm-18.851 4.242h8v2h-8v-2zm-2 4h8v2h-8v-2zm3 4h7v2h-7v-2zm21-3c0 5.523-4.477 10-10 10-2.79 0-5.3-1.155-7.111-3h3.28c1.138.631 2.439 1 3.831 1 4.411 0 8-3.589 8-8s-3.589-8-8-8c-1.392 0-2.693.369-3.831 1h-3.28c1.811-1.845 4.321-3 7.111-3 5.523 0 10 4.477 10 10z'
  },
  {
    icon: '📽️',
    title: 'Commercial Director',
    description: 'Creating high-impact commercials and brand films that captivate and convert. Expert in translating brand vision into powerful visual communication.',
    tags: ['TV Commercials', 'Brand Films', 'Product Videos', 'Campaign Direction'],
    svgPath: 'M18 3l-3-3-8.156 8.156 2.994 3.02L18 3zM2 7l5 5-2 5-5-2 2-8zm7.063 11.063l3.02 2.994L20.24 12.9l-3-3-8.177 8.163zM17 21l-5-2 5-2-2 5 2-1z'
  },
  {
    icon: '🎥',
    title: 'Assistant Director (Commercial)',
    description: 'Managing the creative flow on set for high-profile commercial productions. Expert coordination between creative vision and production logistics.',
    tags: ['Set Management', 'Scheduling', 'Crew Coordination', 'Production Flow'],
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
  },
  {
    icon: '🎞️',
    title: 'Assistant Director (Film)',
    description: 'First assistant direction on narrative film sets. Breaking down scripts, managing talent, and ensuring the director\'s vision is executed flawlessly.',
    tags: ['Script Breakdown', 'Talent Management', 'Shot Lists', 'On-Set Direction'],
    svgPath: 'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z'
  }
];

function ServiceCard({ service, index, cardStyle }: { service: typeof DEFAULT_SERVICES[0]; index: number; cardStyle?: React.CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    };

    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="service-card"
      style={cardStyle}
    >
      {/* Floating cinema particles */}
      <div className="service-card__particles">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="service-card__particle" style={{
            left: `${15 + Math.random() * 70}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }} />
        ))}
      </div>

      {/* Icon with cinema reel glow */}
      <div className="service-card__icon-wrap">
        <svg className="service-card__icon-svg" viewBox="0 0 24 24" fill="currentColor">
          <path d={service.svgPath} />
        </svg>
        <div className="service-card__icon-glow" />
      </div>

      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>

      <div className="service-card__tags">
        {service.tags.map((tag, i) => (
          <span key={i} className="service-card__tag">{tag}</span>
        ))}
      </div>

      {/* Film strip border accent */}
      <div className="service-card__filmstrip" />
    </motion.div>
  );
}

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  /* ── Read CMS config, falling back to static JSON ── */
  const cms = getConfig();

  useEffect(() => {
    if (heroRef.current) gsap.fromTo(heroRef.current.querySelectorAll('.about-reveal'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power4.out', delay: 0.2 });
    if (timelineRef.current) timelineRef.current.querySelectorAll('.timeline-item').forEach((item) => {
      gsap.fromTo(item, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 88%', once: true } });
    });
    if (galleryRef.current) galleryRef.current.querySelectorAll('.gallery-img').forEach((img, i) => {
      gsap.fromTo(img, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: img, start: 'top 90%', once: true } });
    });
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  /* ── Merge CMS overrides onto static data ── */
  const hb = { ...staticContent.heroBanner, ...(cms?.about?.heroBanner ? { content: { ...staticContent.heroBanner.content, heroBackground: cms.about.heroBanner.heroBackground || staticContent.heroBanner.content.heroBackground, label: cms.about.heroBanner.label ?? staticContent.heroBanner.content.label, title: cms.about.heroBanner.title ?? staticContent.heroBanner.content.title }, visible: cms.about.heroBanner.visible ?? staticContent.heroBanner.visible } : {}) };
  const intro = { ...staticContent.intro, ...(cms?.about?.intro ? { content: { ...staticContent.intro.content, text1: cms.about.intro.text1 || staticContent.intro.content.text1, text2: cms.about.intro.text2 || staticContent.intro.content.text2 }, visible: cms.about.intro.visible ?? staticContent.intro.visible } : {}) };
  const gallery = { ...staticContent.gallery, ...(cms?.about?.gallery ? { content: { ...staticContent.gallery.content, label: cms.about.gallery.label || staticContent.gallery.content.label, title: cms.about.gallery.title || staticContent.gallery.content.title, photos: cms.about.gallery.photos?.length ? cms.about.gallery.photos : staticContent.gallery.content.photos }, visible: cms.about.gallery.visible ?? staticContent.gallery.visible } : {}) };
  const tl = { ...staticContent.timeline, ...(cms?.about?.timeline ? { content: { ...staticContent.timeline.content, label: cms.about.timeline.label || staticContent.timeline.content.label, title: cms.about.timeline.title || staticContent.timeline.content.title, milestones: cms.about.timeline.milestones?.length ? cms.about.timeline.milestones : staticContent.timeline.content.milestones }, visible: cms.about.timeline.visible ?? staticContent.timeline.visible } : {}) };
  const q = { ...staticContent.quote, ...(cms?.about?.quote ? { content: { ...staticContent.quote.content, text: cms.about.quote.text || staticContent.quote.content.text, author: cms.about.quote.author || staticContent.quote.content.author }, visible: cms.about.quote.visible ?? staticContent.quote.visible } : {}) };

  const services = (cms as any)?.about?.services || DEFAULT_SERVICES;

  /* ── Layout box-model for services ── */
  const servicesSectionStyle = mergeLayoutStyle({ paddingTop: 96, paddingBottom: 96 }, 'about', 'servicesSection');
  const servicesHeaderStyle  = mergeLayoutStyle({}, 'about', 'servicesHeader');
  const servicesGridStyle    = mergeLayoutStyle({}, 'about', 'servicesGrid');
  const servicesCardStyle    = mergeLayoutStyle({}, 'about', 'servicesCard');

  return (
    <PageTransition>
      {/* 1. Hero Banner */}
      {hb.visible !== false && (
      <section className="relative h-[50vh] min-h-[350px] w-full overflow-hidden flex items-end about-hero" style={box(hb.layout)}>
        <img src={hb.content.heroBackground} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-black/60 to-black/30" />
        <div className="relative z-10 container-main pb-12" style={{ textAlign: hb.layout.align as Align }}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-accent)]" style={{ marginBottom: hb.elements.labelMarginBottom }}>{hb.content.label}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl text-white" style={{ marginBottom: hb.elements.titleMarginBottom || undefined }}>
            {hb.content.title}
          </motion.h1>
        </div>
      </section>
      )}

      {/* 2. Intro */}
      {intro.visible !== false && (
      <section ref={heroRef} className="about-intro" style={box(intro.layout)}>
        <div className="container-main" style={{ textAlign: intro.layout.align as Align }}>
          <div className={intro.layout.align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}>
            <div className="about-reveal w-12 h-px bg-[var(--color-accent)]" style={{ marginBottom: intro.elements.dividerMarginBottom, margin: intro.layout.align === 'center' ? `0 auto ${intro.elements.dividerMarginBottom}px` : `0 0 ${intro.elements.dividerMarginBottom}px` }} />
            <p className="about-reveal text-white/60 text-base leading-relaxed max-w-xl" style={{ marginBottom: intro.elements.text1MarginBottom, margin: intro.layout.align === 'center' ? `0 auto ${intro.elements.text1MarginBottom}px` : `0 0 ${intro.elements.text1MarginBottom}px` }}>{intro.content.text1}</p>
            <p className="about-reveal text-white/60 text-base leading-relaxed max-w-xl" style={{ marginBottom: intro.elements.text2MarginBottom || undefined, margin: intro.layout.align === 'center' ? '0 auto' : undefined }}>{intro.content.text2}</p>
          </div>
        </div>
      </section>
      )}

      {/* 3. Photo Gallery */}
      {gallery.visible !== false && gallery && gallery.content && gallery.content.photos && gallery.content.photos.length > 0 && (
        <section className="border-t border-[var(--color-border)] about-gallery" style={box(gallery.layout)}>
          <div className="container-main" style={{ textAlign: gallery.layout.align as Align }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)]" style={{ marginBottom: gallery.elements.labelMarginBottom }}>{gallery.content.label}</p>
              <h2 className="font-[var(--font-heading)] text-2xl md:text-3xl" style={{ marginBottom: gallery.elements.titleMarginBottom }}>{gallery.content.title}</h2>
            </motion.div>
            <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-4" style={{ gap: gallery.layout.gridGap }}>
              {gallery.content.photos.map((photo: string, i: number) => (
                <div key={i} className="gallery-img relative overflow-hidden rounded-sm aspect-[3/4] group">
                  <img src={photo} alt={`Ahmed Hany ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Services Section (replaces old Philosophy & Expertise) */}
      <section className="border-t border-[var(--color-border)] about-services" style={servicesSectionStyle}>
        <div className="container-main">
          {/* Section label like the reference */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="services-header flex items-center gap-4 mb-6" style={servicesHeaderStyle}>
            <div className="w-10 h-px bg-[var(--color-accent)]" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-accent)]">Services</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">03</span>
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[var(--font-heading)] text-2xl md:text-3xl lg:text-4xl mb-12">
            What I Do
          </motion.h2>

          <div className="services-grid" style={servicesGridStyle}>
            {services.map((service: typeof DEFAULT_SERVICES[0], i: number) => (
              <ServiceCard key={i} service={service} index={i} cardStyle={servicesCardStyle} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Timeline */}
      {tl.visible !== false && (
      <section className="border-t border-[var(--color-border)] about-timeline" style={box(tl.layout)}>
        <div className="container-main" style={{ textAlign: tl.layout.align as Align }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)]" style={{ marginBottom: tl.elements.labelMarginBottom }}>{tl.content.label}</p>
            <h2 className="font-[var(--font-heading)] text-2xl md:text-3xl" style={{ marginBottom: tl.elements.titleMarginBottom }}>{tl.content.title}</h2>
          </motion.div>
          <div ref={timelineRef} className="relative text-left">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-[var(--color-border)]" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: tl.layout.gridGap }}>
              {(tl.content.milestones || []).map((m: { year: string; title: string; description: string }, i: number) => (
                <div key={i} className="timeline-item relative pl-14">
                  <div className="absolute left-[8px] top-1 w-2.5 h-2.5 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)]" />
                  <span className="text-[10px] text-[var(--color-accent)] uppercase tracking-[0.25em] block" style={{ marginBottom: tl.elements.yearMarginBottom }}>{m.year}</span>
                  <h3 className="font-[var(--font-heading)] text-xl" style={{ marginBottom: tl.elements.itemTitleMarginBottom }}>{m.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-md">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 6. Quote */}
      {q.visible !== false && (
      <section className="border-t border-[var(--color-border)] about-quote" style={box(q.layout)}>
        <div className="container-main max-w-[700px]" style={{ textAlign: q.layout.align as Align }}>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <svg className="w-6 h-6 text-[var(--color-accent)]" style={{ marginBottom: q.elements.iconMarginBottom, margin: q.layout.align === 'center' ? `0 auto ${q.elements.iconMarginBottom}px` : `0 0 ${q.elements.iconMarginBottom}px` }} fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
            <blockquote className="font-[var(--font-heading)] text-2xl md:text-3xl italic text-white leading-relaxed" style={{ marginBottom: q.elements.quoteMarginBottom }}>{q.content.text}</blockquote>
            <cite className="text-xs text-white/30 uppercase tracking-[0.2em] not-italic">— {q.content.author}</cite>
          </motion.div>
        </div>
      </section>
      )}
    </PageTransition>
  );
}

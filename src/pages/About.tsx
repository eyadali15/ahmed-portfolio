import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '@/components/layout/PageTransition';
import content from '@/content/pages/about.json';

gsap.registerPlugin(ScrollTrigger);

type Align = 'left' | 'center' | 'right';
type Layout = { paddingTop: number; paddingBottom: number; paddingLeft: number; paddingRight: number; marginTop: number; marginBottom: number; marginLeft: number; marginRight: number; gapAfter?: number; align: string };
const box = (l: Layout) => ({
  paddingTop: l.paddingTop, paddingBottom: l.paddingBottom, paddingLeft: l.paddingLeft || undefined, paddingRight: l.paddingRight || undefined,
  marginTop: l.marginTop || undefined, marginBottom: (l.marginBottom || 0) + (l.gapAfter || 0) || undefined, marginLeft: l.marginLeft || undefined, marginRight: l.marginRight || undefined,
});

const milestones = [
  { year: '2018', title: 'Began Filmmaking', description: 'First picked up a camera and discovered a passion for visual storytelling.' },
  { year: '2020', title: 'First Short Film', description: 'Directed and produced first narrative short, selected for multiple festivals.' },
  { year: '2021', title: 'Trucage Documentary', description: 'Award-winning documentary exploring stunt professionals. Saudi Film Festival selection.' },
  { year: '2022', title: 'Commercial Work', description: 'Began working as assistant director on major commercial productions.' },
  { year: '2023', title: 'Major Campaigns', description: 'Collaborated on high-profile campaigns for brands including Almarai.' },
  { year: '2024', title: 'Creative Direction', description: 'Expanded into creative direction for commercial and documentary projects.' },
];

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

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

  const hb = content.heroBanner;
  const intro = content.intro;
  const gallery = content.gallery;
  const phil = content.philosophy;
  const tl = content.timeline;
  const q = content.quote;

  return (
    <PageTransition>
      {/* 1. Hero Banner */}
      {hb.visible !== false && (
      <section className="relative h-[50vh] min-h-[350px] w-full overflow-hidden flex items-end" style={box(hb.layout)}>
        <img src={hb.content.heroBackground} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-black/60 to-black/30" />
        <div className="relative z-10 container-main pb-12" style={{ textAlign: hb.layout.align as Align }}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-accent)]" style={{ marginBottom: hb.elements.labelMarginBottom }}>{hb.content.label}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl text-white" style={{ marginBottom: hb.elements.titleMarginBottom || undefined }}>
            {hb.content.title.split('seeing differently')[0]}<span className="italic text-[var(--color-accent)]">seeing differently</span>
          </motion.h1>
        </div>
      </section>
      )}

      {/* 2. Intro */}
      {intro.visible !== false && (
      <section ref={heroRef} style={box(intro.layout)}>
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
        <section className="border-t border-[var(--color-border)]" style={box(gallery.layout)}>
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

      {/* 4. Philosophy & Expertise */}
      {phil.visible !== false && (
      <section className="border-t border-[var(--color-border)]" style={box(phil.layout)}>
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: phil.layout.gridGap }}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h2 className="font-[var(--font-heading)] text-2xl md:text-3xl" style={{ marginBottom: phil.elements.titleMarginBottom }}>{phil.content.title1}</h2>
              <div className="w-10 h-px bg-[var(--color-accent)]" style={{ marginBottom: phil.elements.dividerMarginBottom }} />
              <p className="text-white/60 text-base leading-relaxed" style={{ marginBottom: phil.elements.text1MarginBottom }}>{phil.content.text1}</p>
              <p className="text-white/60 text-base leading-relaxed">{phil.content.text2}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
              <h2 className="font-[var(--font-heading)] text-2xl md:text-3xl" style={{ marginBottom: phil.elements.titleMarginBottom }}>{phil.content.title2}</h2>
              <div className="w-10 h-px bg-[var(--color-accent)]" style={{ marginBottom: phil.elements.dividerMarginBottom }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: phil.elements.expertiseItemGap }}>
                {[{ title: 'Direction', desc: 'Narrative, documentary, and commercial' }, { title: 'Assistant Direction', desc: 'Large-scale productions' }, { title: 'Storytelling', desc: 'Script development and visual narrative' }, { title: 'Post-Production', desc: 'Editing, grading, and VFX supervision' }].map((item, i) => (
                  <div key={i} className="border-b border-[var(--color-border)]" style={{ paddingBottom: phil.elements.expertiseItemPaddingBottom }}>
                    <h3 className="text-base text-white font-medium mb-1.5">{item.title}</h3>
                    <p className="text-sm text-white/40">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* 5. Timeline */}
      {tl.visible !== false && (
      <section className="border-t border-[var(--color-border)]" style={box(tl.layout)}>
        <div className="container-main" style={{ textAlign: tl.layout.align as Align }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)]" style={{ marginBottom: tl.elements.labelMarginBottom }}>{tl.content.label}</p>
            <h2 className="font-[var(--font-heading)] text-2xl md:text-3xl" style={{ marginBottom: tl.elements.titleMarginBottom }}>{tl.content.title}</h2>
          </motion.div>
          <div ref={timelineRef} className="relative text-left">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-[var(--color-border)]" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: tl.layout.gridGap }}>
              {milestones.map((m, i) => (
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
      <section className="border-t border-[var(--color-border)]" style={box(q.layout)}>
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

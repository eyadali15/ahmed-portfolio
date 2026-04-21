import { useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '@/components/layout/PageTransition';
import VideoPlayer from '@/components/ui/VideoPlayer';
import Button from '@/components/ui/Button';
import { getProjectBySlug, getRelatedProjects } from '@/data/projects';
import workContent from '@/content/pages/work.json';

gsap.registerPlugin(ScrollTrigger);
const d = workContent.detail;

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug || '');
  const related = getRelatedProjects(slug || '', 3);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(contentRef.current.querySelectorAll('.detail-animate'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2 });
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, [slug]);

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-[var(--font-heading)] text-3xl mb-6">Project Not Found</h1>
            <Button to="/work">Back to Work</Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <motion.div initial={{ scaleY: 1 }} animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: 'top' }}
        className="fixed inset-0 bg-[var(--color-bg)] z-50" />

      <div ref={contentRef}>
        {/* Spacer for fixed navbar */}
        <div style={{ height: d.topSpacerHeight }} />

        {/* Back button - bigger */}
        <div className="container-main" style={{ paddingTop: d.backButtonPaddingY, paddingBottom: d.backButtonPaddingY }}>
          <button onClick={() => navigate('/work')}
            className="detail-animate flex items-center gap-3 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer group"
            style={{ paddingLeft: d.backButtonPaddingX, paddingRight: d.backButtonPaddingX }}>
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 12H5m0 0l7 7m-7-7l7-7" />
            </svg>
            <span className="uppercase tracking-[0.2em] text-sm font-medium">Back to Work</span>
          </button>
        </div>

        {/* Video */}
        <div className="container-main" style={{ maxWidth: d.contentMaxWidth, paddingTop: d.contentPaddingY, paddingBottom: d.contentPaddingY }}>
          <div className="detail-animate" style={{ marginBottom: d.videoMarginBottom }}>
            <VideoPlayer vimeoId={project.vimeoId} title={project.title} />
          </div>
        </div>

        {/* Info */}
        <div className="container-main" style={{ maxWidth: d.contentMaxWidth, paddingTop: d.contentPaddingY, paddingBottom: d.contentPaddingY }}>
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: d.columnsGap }}>
            <div className="lg:col-span-2">
              <span className="detail-animate block text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent)]"
                style={{ marginBottom: d.categoryMarginBottom }}>{project.category}</span>
              <h1 className="detail-animate font-[var(--font-heading)] text-3xl md:text-4xl"
                style={{ marginBottom: d.titleMarginBottom }}>{project.title}</h1>
              <p className="detail-animate text-[var(--color-text-secondary)] leading-relaxed text-base"
                style={{ marginBottom: d.descriptionMarginBottom }}>{project.description}</p>

              {project.credits.length > 0 && (
                <div className="detail-animate">
                  <h3 className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]"
                    style={{ marginBottom: d.creditsLabelMarginBottom }}>Credits</h3>
                  <div className="border-t border-[var(--color-border)]">
                    {project.credits.map((credit, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-[var(--color-border)]"
                        style={{ paddingTop: d.creditItemPaddingY, paddingBottom: d.creditItemPaddingY }}>
                        <span className="text-sm text-[var(--color-text-muted)] uppercase tracking-wider">{credit.role}</span>
                        <span className="text-sm text-[var(--color-text-primary)]">{credit.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="detail-animate lg:sticky lg:top-28" style={{ display: 'flex', flexDirection: 'column', gap: d.sidebarItemGap }}>
                {[
                  { l: 'Client', v: project.client },
                  { l: 'Role', v: project.role },
                  { l: 'Year', v: String(project.year) },
                  { l: 'Category', v: project.category },
                ].map((item) => (
                  <div key={item.l}>
                    <h4 className="text-[9px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]"
                      style={{ marginBottom: d.sidebarLabelMarginBottom }}>{item.l}</h4>
                    <p className="text-base text-[var(--color-text-primary)] capitalize">{item.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <section style={{ paddingTop: d.relatedSectionPaddingY, paddingBottom: d.relatedSectionPaddingY }}>
          <div className="container-main">
            <div className="border-t border-[var(--color-border)]" style={{ paddingTop: d.relatedSectionPaddingY }}>
              <h3 className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-muted)]"
                style={{ marginBottom: d.relatedTitleMarginBottom }}>Related Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: d.relatedGridGap }}>
                {related.map((p) => (
                  <Link key={p.slug} to={`/work/${p.slug}`} className="group">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                      <div className="relative overflow-hidden aspect-video bg-[var(--color-bg-surface)] mb-4">
                        <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/50 to-transparent" />
                      </div>
                      <h4 className="font-[var(--font-heading)] text-lg group-hover:text-[var(--color-accent)] transition-colors duration-300">{p.title}</h4>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">{p.client} · {p.year}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

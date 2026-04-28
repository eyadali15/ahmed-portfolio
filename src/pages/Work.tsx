import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '@/components/layout/PageTransition';
import ProjectCard from '@/components/ui/ProjectCard';
import FilterBar from '@/components/ui/FilterBar';
import Button from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { projects as staticProjects } from '@/data/projects';
import spacing from '@/content/design/spacing.json';
import workContent from '@/content/pages/work.json';
import global from '@/content/pages/global.json';
import { getConfig, mergeLayoutStyle } from '@/hooks/useConfig';

gsap.registerPlugin(ScrollTrigger);
const d = workContent.detail;
const ITEMS_PER_PAGE = 9;

const roleTabs = [
  { key: 'assistant', label: 'Assistant Director' },
  { key: 'director', label: 'Director' },
];

/** Build inline style from a {size, align} CMS style object */
function textStyle(s?: { size?: string; align?: string }): React.CSSProperties {
  if (!s) return {};
  const out: React.CSSProperties = {};
  if (s.size) out.fontSize = s.size;
  if (s.align) out.textAlign = s.align as any;
  return out;
}

/** Get justifyContent from align string */
function justifyFromAlign(align?: string): string {
  if (align === 'center') return 'center';
  if (align === 'right') return 'flex-end';
  return 'flex-start';
}

export default function Work() {
  const { activeFilter, setActiveFilter, activeRole, setActiveRole } = useStore();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const cms = getConfig();

  /* ── CMS text ── */
  const s = cms?.spacing?.work || spacing.work;
  const port = (cms as any)?.portfolio;
  const portStyles = port?.styles || {};
  const wh = {
    label: port?.hero?.label || global.workHero.label,
    titlePart1: port?.hero?.titlePart1 || global.workHero.titlePart1,
    titlePart2: port?.hero?.titlePart2 || global.workHero.titlePart2,
    heroBackground: port?.hero?.heroBackground || (s as any).heroBackground || 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?auto=format&fit=crop&w=1920&q=80',
    showMoreText: port?.showMoreText || global.workHero.showMoreText || 'Show More',
    noProjectsText: port?.noProjectsText || global.workHero.noProjectsText || 'No projects found in this category.',
  };

  /* ── CMS projects or static ── */
  const allProjects = (cms?.projects && cms.projects.length > 0)
    ? cms.projects.map(p => ({
        ...p,
        role: p.role === 'assistant' ? 'Assistant Director' : (p.role === 'director' ? 'Director' : p.role),
        category: p.category === 'film' ? 'Film' : p.category === 'documentary' ? 'Documentary' : p.category === 'commercial' ? 'Commercial' : p.category,
      }))
    : staticProjects;

  // Filter by role first
  const roleFiltered = allProjects.filter((p) => {
    if (activeRole === 'assistant') return p.role === 'Assistant Director';
    return p.role === 'Director' || p.role === 'Director & Writer';
  });

  // Then filter by category
  const filteredProjects = activeFilter === 'all' ? roleFiltered : roleFiltered.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase());
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  useEffect(() => { setVisibleCount(ITEMS_PER_PAGE); }, [activeFilter, activeRole]);
  useEffect(() => { setActiveFilter('all'); setActiveRole('assistant'); return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); }; }, [setActiveFilter, setActiveRole]);

  /* ── Layout box model ── */
  const heroStyle = mergeLayoutStyle({}, 'portfolio', 'hero');
  const roleStyle = mergeLayoutStyle({}, 'portfolio', 'roleButtons');
  const filterStyle = mergeLayoutStyle({}, 'portfolio', 'filters');
  const gridStyle = mergeLayoutStyle({}, 'portfolio', 'grid');

  /* ── Per-element styles from CMS ── */
  const labelStyle = textStyle(portStyles.heroLabel);
  const titleStyle = textStyle(portStyles.heroTitle);
  const roleBtnStyle = textStyle(portStyles.roleButtons);
  const filterBtnStyle = textStyle(portStyles.filterButtons);
  const showMoreStyle = textStyle(portStyles.showMoreBtn);

  /* ── Alignment for button containers ── */
  const roleBtnJustify = justifyFromAlign(portStyles.roleButtons?.align);
  const filterBtnJustify = justifyFromAlign(portStyles.filterButtons?.align);
  const showMoreJustify = justifyFromAlign(portStyles.showMoreBtn?.align);

  return (
    <PageTransition>
      {/* Hero banner */}
      <section className="work-hero relative h-[50vh] min-h-[350px] w-full overflow-hidden flex items-end" style={heroStyle}>
        <img src={wh.heroBackground} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-black/60 to-black/30" />
        <div className="relative z-10 container-main pb-12" style={titleStyle.textAlign ? { textAlign: titleStyle.textAlign } : undefined}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-accent)] mb-4"
            style={labelStyle}>{wh.label}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl text-white"
            style={titleStyle}>
            {wh.titlePart1} <span className="italic text-[var(--color-accent)]">{wh.titlePart2}</span>
          </motion.h1>
        </div>
      </section>

      <section className="min-h-screen">
        <div className="container-main" style={{ paddingTop: (s as any).sectionPaddingY, paddingBottom: (s as any).sectionPaddingY, paddingLeft: (s as any).sectionPaddingX || undefined, paddingRight: (s as any).sectionPaddingX || undefined }}>

          {/* Role Tabs */}
          <div className="role-buttons flex flex-wrap items-center gap-3" style={{ ...roleStyle, marginTop: (s as any).titleToFilterGap, marginBottom: (s as any).roleToFilterGap, justifyContent: roleBtnJustify }}>
            {roleTabs.map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => { setActiveRole(tab.key); setActiveFilter('all'); }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer border ${
                  activeRole === tab.key
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white border-[var(--color-accent)] hover:bg-white hover:text-black hover:border-white'
                }`}
                style={{
                  fontSize: roleBtnStyle.fontSize || '0.75rem',
                  borderRadius: spacing.buttons.filterStyle === 'rounded' ? spacing.buttons.filterBorderRadius : 0,
                  paddingTop: spacing.buttons.filterPaddingTop,
                  paddingBottom: spacing.buttons.filterPaddingBottom,
                  paddingLeft: spacing.buttons.filterPaddingLeft,
                  paddingRight: spacing.buttons.filterPaddingRight,
                }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="filter-bar flex flex-wrap items-center gap-3" style={{ ...filterStyle, marginBottom: (s as any).filterToGridGap, justifyContent: filterBtnJustify }}>
            <FilterBar fontSize={filterBtnStyle.fontSize as string | undefined} />
          </div>

          {/* Projects Grid */}
          <motion.div layout className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ ...gridStyle, gap: (s as any).gridGap, paddingTop: (s as any).gridPaddingTop }}>
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, i) => (
                <motion.div key={project.slug} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35, delay: i < ITEMS_PER_PAGE ? i * 0.04 : (i % ITEMS_PER_PAGE) * 0.04 }}>
                  <ProjectCard project={project as any} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Show More */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex"
              style={{ marginTop: d.showMoreMarginTop, justifyContent: showMoreJustify, ...showMoreStyle }}
            >
              <Button onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}>
                {wh.showMoreText} ({filteredProjects.length - visibleCount} remaining)
              </Button>
            </motion.div>
          )}

          {/* No results */}
          {filteredProjects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
              <p className="text-white/40">{wh.noProjectsText}</p>
            </motion.div>
          )}
        </div>
        <div style={{ height: (s as any).bottomSpacerHeight }} />
      </section>
    </PageTransition>
  );
}

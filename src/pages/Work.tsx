import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '@/components/layout/PageTransition';
import ProjectCard from '@/components/ui/ProjectCard';
import FilterBar from '@/components/ui/FilterBar';
import Button from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { projects } from '@/data/projects';
import spacing from '@/content/design/spacing.json';
import workContent from '@/content/pages/work.json';
import global from '@/content/pages/global.json';

gsap.registerPlugin(ScrollTrigger);
const s = spacing.work;
const d = workContent.detail;
const wh = global.workHero;
const ITEMS_PER_PAGE = 9;

const roleTabs = [
  { key: 'assistant', label: 'Assistant Director' },
  { key: 'director', label: 'Director' },
];

export default function Work() {
  const { activeFilter, setActiveFilter, activeRole, setActiveRole } = useStore();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Filter by role first
  const roleFiltered = projects.filter((p) => {
    if (activeRole === 'assistant') return p.role === 'Assistant Director';
    return p.role === 'Director' || p.role === 'Director & Writer';
  });

  // Then filter by category
  const filteredProjects = activeFilter === 'all' ? roleFiltered : roleFiltered.filter((p) => p.category === activeFilter);
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  useEffect(() => { setVisibleCount(ITEMS_PER_PAGE); }, [activeFilter, activeRole]);
  useEffect(() => { setActiveFilter('all'); setActiveRole('assistant'); return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); }; }, [setActiveFilter, setActiveRole]);

  return (
    <PageTransition>
      {/* Hero banner */}
      <section className="relative h-[50vh] min-h-[350px] w-full overflow-hidden flex items-end">
        <img src={s.heroBackground} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-black/60 to-black/30" />
        <div className="relative z-10 container-main pb-12">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-accent)] mb-4">{wh.label}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl text-white">
            {wh.titlePart1} <span className="italic text-[var(--color-accent)]">{wh.titlePart2}</span>
          </motion.h1>
        </div>
      </section>

      <section className="min-h-screen">
        <div className="container-main" style={{ paddingTop: s.sectionPaddingY, paddingBottom: s.sectionPaddingY, paddingLeft: s.sectionPaddingX || undefined, paddingRight: s.sectionPaddingX || undefined }}>

          {/* Role Tabs */}
          <div className="flex justify-center gap-3 mb-8" style={{ marginTop: s.titleToFilterGap }}>
            {roleTabs.map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => { setActiveRole(tab.key); setActiveFilter('all'); }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative px-6 py-3 text-sm uppercase tracking-[0.15em] font-medium rounded-lg transition-all duration-300 cursor-pointer ${
                  activeRole === tab.key
                    ? 'bg-[var(--color-accent)] text-black'
                    : 'border border-white/20 text-white/60 hover:text-white hover:border-white/40'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Category Filters */}
          <div style={{ marginBottom: s.filterToGridGap, textAlign: (s.filterAlign as 'left' | 'center' | 'right') || 'left' }}>
            <FilterBar />
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: s.gridGap, paddingTop: s.gridPaddingTop }}>
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, i) => (
                <motion.div key={project.slug} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35, delay: i < ITEMS_PER_PAGE ? i * 0.04 : (i % ITEMS_PER_PAGE) * 0.04 }}>
                  <ProjectCard project={project} index={i} />
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
              className="flex justify-center"
              style={{ marginTop: d.showMoreMarginTop }}
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
        <div style={{ height: s.bottomSpacerHeight }} />
      </section>
    </PageTransition>
  );
}

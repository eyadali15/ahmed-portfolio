import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.76, 0, 0.24, 1] }}
    >
      <Link to={`/portfolio/${project.slug}`} className="group block">
        <div className="relative overflow-hidden bg-[var(--color-bg-surface)] aspect-video rounded-sm">
          <img src={project.thumbnail} alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/5">
              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)] bg-[var(--color-bg)]/70 backdrop-blur-sm px-3 py-1.5">{project.category}</span>
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-[var(--font-heading)] text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300">{project.title}</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">{project.client} — {project.role}</p>
          </div>
          <span className="text-xs text-[var(--color-text-muted)] mt-1 shrink-0">{project.year}</span>
        </div>
      </Link>
    </motion.div>
  );
}

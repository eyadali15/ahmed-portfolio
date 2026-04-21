import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { categories } from '@/data/projects';
import spacing from '@/content/design/spacing.json';

const b = spacing.buttons;

export default function FilterBar() {
  const { activeFilter, setActiveFilter } = useStore();
  const filterRadius = b.filterStyle === 'rounded' ? b.filterBorderRadius : 0;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-wrap items-center gap-3">
      {categories.map((cat) => (
        <button key={cat.key} onClick={() => setActiveFilter(cat.key)}
          className={`text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer border ${
            activeFilter === cat.key
              ? 'bg-white text-black border-white'
              : 'bg-transparent text-white border-[var(--color-accent)] hover:bg-white hover:text-black hover:border-white'
          }`}
          style={{
            borderRadius: filterRadius,
            paddingTop: b.filterPaddingTop,
            paddingBottom: b.filterPaddingBottom,
            paddingLeft: b.filterPaddingLeft,
            paddingRight: b.filterPaddingRight,
          }}>
          {cat.label}
        </button>
      ))}
    </motion.div>
  );
}

import { useEffect, useState, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { useStore } from '@/store/useStore';
import global from '@/content/pages/global.json';
import homeContent from '@/content/pages/home.json';

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const setIsLoading = useStore((s) => s.setIsLoading);
  const done = useRef(false);

  useEffect(() => {
    // Fast loading — no heavy videos to preload anymore
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 20 + 8;
        if (next >= 100 && !done.current) {
          done.current = true;
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 400);
          return 100;
        }
        return Math.min(next, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [setIsLoading]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] bg-[var(--color-bg)] flex flex-col items-center justify-center"
    >
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
        <h1 className="font-[var(--font-heading)] text-2xl md:text-3xl mb-2">
          <span className="text-[var(--color-text-primary)]">{global.navbar.name1}</span>{' '}
          <span className="text-[var(--color-accent)]">{global.navbar.name2}</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-text-muted)] mb-10">
          {homeContent.hero.content.subtitle || 'Filmmaker'}
        </p>
        <div className="w-40 h-px bg-[var(--color-border)] mx-auto overflow-hidden">
          <motion.div className="h-full bg-[var(--color-accent)]" initial={{ width: 0 }} animate={{ width: `${Math.min(progress, 100)}%` }} transition={{ duration: 0.2 }} />
        </div>
        <p className="text-[10px] text-[var(--color-text-muted)] mt-3 tracking-widest">{Math.min(Math.round(progress), 100)}%</p>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const { isLoading } = useStore();
  const location = useLocation();

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[var(--color-bg)]">

        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen />}
        </AnimatePresence>

        <Navbar />

        <main>
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname}>
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

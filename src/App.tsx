import { useEffect, useState, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { useStore } from '@/store/useStore';
import homeContent from '@/content/pages/home.json';
import global from '@/content/pages/global.json';

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const setIsLoading = useStore((s) => s.setIsLoading);
  const assetsReady = useRef(false);

  useEffect(() => {
    // Preload hero image + banner video
    const heroImg = homeContent.hero.content.heroImage || '/uploads/photo_1_2026-04-21_09-17-26.jpg';
    const bannerSrc = homeContent.hero.content.bannerVideo || '/videos/banner.mp4';
    let loaded = 0;
    const total = 2;

    const checkDone = () => {
      loaded++;
      if (loaded >= total) assetsReady.current = true;
    };

    // Preload hero image
    const img = new Image();
    img.onload = checkDone;
    img.onerror = checkDone;
    img.src = heroImg;

    // Preload banner video
    const v = document.createElement('video');
    v.muted = true;
    v.preload = 'auto';
    v.oncanplaythrough = checkDone;
    v.onerror = checkDone;
    v.src = bannerSrc;

    // Progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 14 + 5;
        if (next >= 90 && !assetsReady.current) return 90;
        if (next >= 90 && assetsReady.current) {
          clearInterval(interval);
          setProgress(100);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return next;
      });
    }, 80);

    // Safety timeout: max 5 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setIsLoading(false), 400);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      v.src = '';
    };
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
        <div className="film-grain" />

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

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
  const videoReady = useRef(false);
  const progressRef = useRef(0);

  useEffect(() => {
    // Preload the hero video in the background
    const heroSrc = homeContent.hero.content.heroVideo || '/videos/banner.mp4';
    const bannerSrc = homeContent.hero.content.bannerVideo || '/videos/banner.mp4';
    let videosLoaded = 0;
    const totalVideos = 2;

    const checkDone = () => {
      videosLoaded++;
      if (videosLoaded >= totalVideos) {
        videoReady.current = true;
      }
    };

    // Preload hero video
    const v1 = document.createElement('video');
    v1.muted = true;
    v1.preload = 'auto';
    v1.oncanplaythrough = checkDone;
    v1.onerror = checkDone; // Don't block on error
    v1.src = heroSrc;

    // Preload banner video
    const v2 = document.createElement('video');
    v2.muted = true;
    v2.preload = 'auto';
    v2.oncanplaythrough = checkDone;
    v2.onerror = checkDone;
    v2.src = bannerSrc;

    // Progress bar: animate to 90% quickly, then wait for video
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 12 + 4;
        progressRef.current = next;

        if (next >= 90 && !videoReady.current) {
          // Hold at 90% until video is ready
          return 90;
        }

        if (next >= 90 && videoReady.current) {
          // Video ready — finish to 100%
          clearInterval(interval);
          setProgress(100);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }

        return next;
      });
    }, 100);

    // Safety timeout: don't wait more than 6 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setIsLoading(false), 400);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      v1.src = '';
      v2.src = '';
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

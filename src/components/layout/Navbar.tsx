import { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import gsap from 'gsap';
import global from '@/content/pages/global.json';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { isMenuOpen, setIsMenuOpen } = useStore();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(logoRef.current, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' });
    }
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [location, setIsMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[var(--color-bg)]/80 backdrop-blur-xl border-b border-[var(--color-border)]' : 'bg-transparent'
      }`}>
        <div className="container-main flex items-center justify-between h-[70px]">
          <Link ref={logoRef} to="/" className="text-sm tracking-wider uppercase">
            <span className="text-[var(--color-text-primary)] font-semibold">{global.navbar.name1}</span>
            <span className="text-[var(--color-accent)] ml-1">{global.navbar.name2}</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}
                className={`relative text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                  location.pathname === link.to
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--color-accent)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
              </Link>
            ))}
          </div>

          <button className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <motion.span animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="block w-5 h-[1.5px] bg-[var(--color-text-primary)]" transition={{ duration: 0.3 }} />
            <motion.span animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-[1.5px] bg-[var(--color-text-primary)]" transition={{ duration: 0.2 }} />
            <motion.span animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} className="block w-5 h-[1.5px] bg-[var(--color-text-primary)]" transition={{ duration: 0.3 }} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur-2xl flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div key={link.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ delay: i * 0.08, duration: 0.4 }}>
                  <Link to={link.to} className={`text-3xl font-[var(--font-heading)] tracking-wider ${
                    location.pathname === link.to ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]'
                  }`}>{link.label}</Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

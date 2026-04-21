import { Link } from 'react-router-dom';
import spacing from '@/content/design/spacing.json';

const s = spacing.footer;

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-3"
          style={{ paddingTop: s.mainPaddingY, paddingBottom: s.mainPaddingY, paddingLeft: s.mainPaddingX || undefined, paddingRight: s.mainPaddingX || undefined, gap: s.columnsGap }}>
          <div className="flex flex-col justify-center">
            <h3 className="font-[var(--font-heading)] text-xl mb-4">
              <span className="text-white">Ahmed</span> <span className="text-[var(--color-accent)]">Abuzenada</span>
            </h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">Award-winning filmmaker & assistant director based in Saudi Arabia. Crafting cinematic stories that inspire.</p>
          </div>
          <div className="flex flex-col justify-center">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6">Navigation</h4>
            <div className="flex flex-col gap-4">
              {[{ to: '/', label: 'Home' }, { to: '/work', label: 'Work' }, { to: '/about', label: 'About' }, { to: '/contact', label: 'Contact' }].map((link) => (
                <Link key={link.to} to={link.to} className="text-sm text-white/50 hover:text-[var(--color-accent)] transition-colors duration-300 w-fit">{link.label}</Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6">Connect</h4>
            <div className="flex flex-col gap-4">
              <a href="https://vimeo.com/ahmedabuzenada" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-[var(--color-accent)] transition-colors duration-300 w-fit">Vimeo</a>
              <a href="mailto:contact@ahmedabuzenada.com" className="text-sm text-white/50 hover:text-[var(--color-accent)] transition-colors duration-300 w-fit">Email</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-[var(--color-accent)] transition-colors duration-300 w-fit">LinkedIn</a>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-[var(--color-accent)] transition-colors duration-300 w-fit">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ paddingTop: s.bottomBarPaddingY, paddingBottom: s.bottomBarPaddingY }}>
          <p className="text-xs text-white/25">© {new Date().getFullYear()} Ahmed Hany Abuzenada. All rights reserved. <span className="text-[var(--color-accent)]/20 ml-2">CLOUDFLARE MODE 🚀</span></p>
          <p className="text-xs text-white/25">Crafted with passion for cinema</p>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import spacing from '@/content/design/spacing.json';
import global from '@/content/pages/global.json';

const s = spacing.footer;
const f = global.footer;

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-3"
          style={{ paddingTop: s.mainPaddingY, paddingBottom: s.mainPaddingY, paddingLeft: s.mainPaddingX || undefined, paddingRight: s.mainPaddingX || undefined, gap: s.columnsGap }}>
          <div className="flex flex-col justify-center">
            <h3 className="font-[var(--font-heading)] text-xl mb-4">
              <span className="text-white">{f.name1}</span> <span className="text-[var(--color-accent)]">{f.name2}</span>
            </h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">{f.description}</p>
          </div>
          <div className="flex flex-col justify-center">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6">{f.navigationTitle}</h4>
            <div className="flex flex-col gap-4">
              {[{ to: '/', label: 'Home' }, { to: '/work', label: 'Work' }, { to: '/about', label: 'About' }, { to: '/contact', label: 'Contact' }].map((link) => (
                <Link key={link.to} to={link.to} className="text-sm text-white/50 hover:text-[var(--color-accent)] transition-colors duration-300 w-fit">{link.label}</Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6">{f.connectTitle}</h4>
            <div className="flex flex-col gap-4">
              <a href={f.vimeoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-[var(--color-accent)] transition-colors duration-300 w-fit">{f.vimeoLabel}</a>
              <a href={`mailto:${f.email}`} className="text-sm text-white/50 hover:text-[var(--color-accent)] transition-colors duration-300 w-fit">{f.emailLabel}</a>
              <a href={f.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-[var(--color-accent)] transition-colors duration-300 w-fit">{f.linkedinLabel}</a>
              <a href={f.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-[var(--color-accent)] transition-colors duration-300 w-fit">{f.whatsappLabel}</a>
            </div>
          </div>
        </div>
        <div className="border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ paddingTop: s.bottomBarPaddingY, paddingBottom: s.bottomBarPaddingY }}>
          <p className="text-xs text-white/25">© {new Date().getFullYear()} {f.copyrightName}. All rights reserved.</p>
          <p className="text-xs text-white/25">{f.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

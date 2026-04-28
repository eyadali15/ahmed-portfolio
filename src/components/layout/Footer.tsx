import { Link } from 'react-router-dom';
import spacing from '@/content/design/spacing.json';
import global from '@/content/pages/global.json';
import { getConfig } from '@/hooks/useConfig';

const s = spacing.footer;
const f = global.footer;

/* ── Social links with brand SVGs ── */
const socialLinks = [
  {
    key: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/_ahmedhanyy/',
    icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
  {
    key: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/ahmed.hany.39',
    icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    key: 'vimeo',
    label: 'Vimeo',
    href: 'https://vimeo.com/ahmedabuzenada',
    icon: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/></svg>,
  },
];

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  const cms = getConfig();
  const email = (cms?.contact?.info as any)?.email || f.email || 'abuzfilms@gmail.com';

  return (
    <footer className="footer relative overflow-hidden border-t border-white/[0.04]">

      {/* Subtle background accent glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--color-accent)]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main relative z-10">
        {/* ── Main Footer Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8"
          style={{ paddingTop: s.mainPaddingY + 16, paddingBottom: s.mainPaddingY + 16 }}>

          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col">
            <h3 className="font-[var(--font-heading)] text-2xl mb-4">
              <span className="text-white">{f.name1}</span>{' '}
              <span className="text-[var(--color-accent)]">{f.name2}</span>
            </h3>
            <p className="text-white/35 text-sm leading-relaxed max-w-sm mb-8">{f.description}</p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.label}
                  className="group w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/[0.06] transition-all duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-[9px] uppercase tracking-[0.3em] text-[var(--color-accent)]/70 mb-5 font-semibold">{f.navigationTitle}</h4>
            <div className="flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to}
                  className="text-sm text-white/40 hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4">
            <h4 className="text-[9px] uppercase tracking-[0.3em] text-[var(--color-accent)]/70 mb-5 font-semibold">{f.connectTitle}</h4>
            <div className="flex flex-col gap-4">
              <a href={`mailto:${email}`}
                className="group flex items-center gap-3 text-sm text-white/40 hover:text-white transition-colors duration-300">
                <span className="w-8 h-8 rounded-lg border border-white/[0.06] flex items-center justify-center group-hover:border-[var(--color-accent)]/30 group-hover:bg-[var(--color-accent)]/[0.05] transition-all duration-300">
                  <svg className="w-3.5 h-3.5 text-white/30 group-hover:text-[var(--color-accent)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                </span>
                {email}
              </a>
              <div className="flex items-center gap-3 text-sm text-white/40">
                <span className="w-8 h-8 rounded-lg border border-white/[0.06] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                </span>
                Saudi Arabia
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ paddingTop: s.bottomBarPaddingY + 4, paddingBottom: s.bottomBarPaddingY + 4 }}>
          <p className="text-[11px] text-white/20 tracking-wide">© {new Date().getFullYear()} {f.copyrightName}. All rights reserved.</p>
          <p className="text-[11px] text-white/15 italic tracking-wide">{f.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

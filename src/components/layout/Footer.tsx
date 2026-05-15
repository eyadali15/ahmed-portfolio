import { Link } from 'react-router-dom';
import spacing from '@/content/design/spacing.json';
import global from '@/content/pages/global.json';
import { getConfig, mergeLayoutStyle } from '@/hooks/useConfig';

const s = spacing.footer;
const f = global.footer;

const SocialIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactNode> = {
    instagram: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
    facebook: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    vimeo: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/></svg>,
    whatsapp: <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  };
  return <>{icons[type] || null}</>;
};

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  const cms = getConfig();
  const ft = (cms as any)?.footer || {};
  const gen = (cms as any)?.general?.socialLinks || {};

  
  const brandName1 = ft.name1 || f.name1;
  const brandName2 = ft.name2 || f.name2;
  const description = ft.description || f.description;
  const location = ft.location || 'Saudi Arabia & Egypt';
  const email = ft.email || (cms?.contact?.info as any)?.email || f.email || 'abuzfilms@gmail.com';
  const copyrightName = ft.copyrightName || f.copyrightName;
  const tagline = ft.tagline || f.tagline;

  const socials = [
    { key: 'instagram', label: 'Instagram', href: gen.instagram || ft.instagramUrl || '' },
    { key: 'facebook', label: 'Facebook', href: gen.facebook || ft.facebookUrl || '' },
    { key: 'vimeo', label: 'Vimeo', href: gen.vimeo || ft.vimeoUrl || '' },
    { key: 'whatsapp', label: 'WhatsApp', href: gen.whatsapp || '' },
  ].filter(l => l.href);

  
  const wrapperStyle      = mergeLayoutStyle({}, 'footer', 'wrapper');
  const mainContentStyle  = mergeLayoutStyle({}, 'footer', 'mainContent');
  const brandSectionStyle = mergeLayoutStyle({}, 'footer', 'brandSection');
  const brandNameStyle    = mergeLayoutStyle({}, 'footer', 'brandName');
  const brandDescStyle    = mergeLayoutStyle({}, 'footer', 'brandDesc');
  const locationTagStyle  = mergeLayoutStyle({}, 'footer', 'locationTag');
  const navColumnStyle    = mergeLayoutStyle({}, 'footer', 'navColumn');
  const navTitleStyle     = mergeLayoutStyle({}, 'footer', 'navTitle');
  const navLinksStyle     = mergeLayoutStyle({}, 'footer', 'navLinks');
  const connectColumnStyle= mergeLayoutStyle({}, 'footer', 'connectColumn');
  const connectTitleStyle = mergeLayoutStyle({}, 'footer', 'connectTitle');
  const emailLinkStyle    = mergeLayoutStyle({}, 'footer', 'emailLink');
  const socialIconsStyle  = mergeLayoutStyle({}, 'footer', 'socialIcons');
  const bottomBarStyle    = mergeLayoutStyle({}, 'footer', 'bottomBar');
  const copyrightStyle    = mergeLayoutStyle({}, 'footer', 'copyright');
  const taglineStyle      = mergeLayoutStyle({}, 'footer', 'tagline');

  return (
    <footer className="footer relative overflow-hidden border-t border-white/[0.04]" style={wrapperStyle}>
      {/* Subtle accent glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--color-accent)]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main relative z-10">
        {}
        <div className="footer-main-content flex flex-col md:flex-row justify-between gap-12"
          style={{ paddingTop: s.mainPaddingY + 20, paddingBottom: s.mainPaddingY + 20, ...mainContentStyle }}>

          {}
          <div className="footer-brand flex flex-col max-w-sm" style={brandSectionStyle}>
            <h3 className="footer-brand-name font-[var(--font-heading)] text-2xl mb-3" style={brandNameStyle}>
              <span className="text-white">{brandName1}</span>{' '}
              <span className="text-[var(--color-accent)]">{brandName2}</span>
            </h3>
            <p className="footer-brand-desc text-white/35 text-sm leading-relaxed mb-6" style={brandDescStyle}>{description}</p>

            {/* Location tag */}
            <div className="footer-location flex items-center gap-2 text-white/25 text-xs tracking-wide" style={locationTagStyle}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
              {location}
            </div>
          </div>

          {}
          <div className="flex gap-16 md:gap-20">
            {/* Navigation */}
            <div className="footer-nav" style={navColumnStyle}>
              <h4 className="footer-nav-title text-[9px] uppercase tracking-[0.3em] text-[var(--color-accent)]/70 mb-5 font-semibold" style={navTitleStyle}>{f.navigationTitle}</h4>
              <div className="footer-nav-links flex flex-col gap-3" style={navLinksStyle}>
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to}
                    className="text-sm text-white/40 hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">{link.label}</Link>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div className="footer-connect" style={connectColumnStyle}>
              <h4 className="footer-connect-title text-[9px] uppercase tracking-[0.3em] text-[var(--color-accent)]/70 mb-5 font-semibold" style={connectTitleStyle}>{f.connectTitle}</h4>
              <div className="flex flex-col gap-4">
                <a href={`mailto:${email}`} className="footer-email group flex items-center gap-2.5 text-sm text-white/40 hover:text-white transition-colors duration-300" style={emailLinkStyle}>
                  <svg className="w-4 h-4 text-white/20 group-hover:text-[var(--color-accent)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                  {email}
                </a>
                {/* Social Icon Buttons */}
                <div className="footer-socials flex items-center gap-2.5 mt-2" style={socialIconsStyle}>
                  {socials.map((link) => (
                    <a key={link.key} href={link.href} target="_blank" rel="noopener noreferrer" title={link.label}
                      className="group w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/[0.06] transition-all duration-300">
                      <SocialIcon type={link.key} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="footer-bottom-bar border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ paddingTop: s.bottomBarPaddingY + 4, paddingBottom: s.bottomBarPaddingY + 4, ...bottomBarStyle }}>
          <p className="footer-copyright text-[11px] text-white/20 tracking-wide" style={copyrightStyle}>© {new Date().getFullYear()} {copyrightName}. All rights reserved.</p>
          <p className="footer-tagline text-[11px] text-white/15 italic tracking-wide" style={taglineStyle}>{tagline}</p>
        </div>
      </div>
    </footer>
  );
}

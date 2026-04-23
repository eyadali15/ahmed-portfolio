import { motion } from 'framer-motion';
import PageTransition from '@/components/layout/PageTransition';
import ContactForm from '@/components/ui/ContactForm';
import content from '@/content/pages/contact.json';

type Align = 'left' | 'center' | 'right';
type Layout = { paddingTop: number; paddingBottom: number; paddingLeft: number; paddingRight: number; marginTop: number; marginBottom: number; marginLeft: number; marginRight: number; gapAfter?: number; align: string };
const box = (l: Layout) => ({
  paddingTop: l.paddingTop, paddingBottom: l.paddingBottom, paddingLeft: l.paddingLeft || undefined, paddingRight: l.paddingRight || undefined,
  marginTop: l.marginTop || undefined, marginBottom: (l.marginBottom || 0) + (l.gapAfter || 0) || undefined, marginLeft: l.marginLeft || undefined, marginRight: l.marginRight || undefined,
});
const jm = { left: 'flex-start', center: 'center', right: 'flex-end' } as const;

export default function Contact() {
  const h = content.header;
  const info = content.info;

  return (
    <PageTransition>
      <section className="min-h-screen">
        <div className="h-[110px]" />
        <div className="container-main">
          {/* 1. Header */}
          {h.visible !== false && (
          <div style={{ ...box(h.layout), textAlign: h.layout.align as Align }}>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-accent)]" style={{ marginBottom: h.elements.labelMarginBottom }}>{h.content.label}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl leading-tight" style={{ marginBottom: h.elements.titleMarginBottom }}>
              {h.content.title.split('together')[0]}<span className="italic text-[var(--color-accent)]">together</span>
            </motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.35 }}
              className="w-12 h-px bg-[var(--color-accent)]" style={{ marginBottom: h.elements.dividerMarginBottom, margin: h.layout.align === 'center' ? `0 auto ${h.elements.dividerMarginBottom}px` : `0 0 ${h.elements.dividerMarginBottom}px` }} />
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="text-white/50 text-base max-w-lg leading-relaxed" style={{ marginBottom: h.elements.descriptionMarginBottom || undefined, margin: h.layout.align === 'center' ? '0 auto' : undefined }}>{h.content.description}</motion.p>
          </div>
          )}

          {/* 2. Info + Form */}
          {info.visible !== false && (
          <div className="max-w-4xl mx-auto" style={box(info.layout)}>
            <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: info.layout.gridGap }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col justify-center">
                <div style={{ display: 'flex', flexDirection: 'column', gap: info.elements.infoItemsGap, textAlign: info.layout.align as Align }}>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30" style={{ marginBottom: info.elements.sectionLabelMarginBottom }}>Email</h4>
                    <a href={`mailto:${info.content.email}`} className="text-lg text-white hover:text-[var(--color-accent)] transition-colors">{info.content.email}</a>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30" style={{ marginBottom: info.elements.sectionLabelMarginBottom }}>Location</h4>
                    <p className="text-lg text-white">{info.content.location}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/30" style={{ marginBottom: info.elements.sectionLabelMarginBottom + 8 }}>Follow</h4>
                    <div className="flex items-center gap-5" style={{ justifyContent: jm[(info.layout.align || 'left') as Align] }}>
                      {[{ label: 'Vimeo', href: info.content.vimeoUrl }, { label: 'LinkedIn', href: info.content.linkedinUrl }, { label: 'WhatsApp', href: info.content.whatsappUrl }].map((link) => (
                        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-lg border border-[var(--color-border)] text-sm text-white/60 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300">{link.label}</a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}><ContactForm /></motion.div>
            </div>
          </div>
          )}
        </div>
        <div className="h-20" />
      </section>
    </PageTransition>
  );
}

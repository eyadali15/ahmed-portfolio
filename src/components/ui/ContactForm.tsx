import { useState } from 'react';
import { motion } from 'framer-motion';
import spacing from '@/content/design/spacing.json';
import contact from '@/content/pages/contact.json';

const b = spacing.buttons;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch('https://formsubmit.co/ajax/abuziflms@gmail.com', {
        method: 'POST',
        body: data,
      });
      setSubmitted(true);
      form.reset();
    } catch {
      alert('Failed to send. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
        <div className="w-16 h-16 rounded-full border-2 border-[var(--color-accent)] flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-[var(--font-heading)] text-2xl text-white mb-3">Message Sent</h3>
        <p className="text-white/40 text-sm mb-8">I'll get back to you soon.</p>
        <button onClick={() => setSubmitted(false)} className="text-sm text-[var(--color-accent)] hover:underline cursor-pointer">Send another message</button>
      </motion.div>
    );
  }

  return (
    <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      {/* Hidden FormSubmit fields */}
      <input type="hidden" name="_subject" value="New message from ahmedhany.com" />
      <input type="hidden" name="_template" value="box" />
      <input type="text" name="_honey" style={{ display: 'none' }} />

      <div className="space-y-5">
        <input
          name="name" type="text" placeholder="Your Name" required
          className="w-full bg-transparent border-b border-[var(--color-border)] px-0 py-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
        />
        <input
          name="email" type="email" placeholder="Your Email" required
          className="w-full bg-transparent border-b border-[var(--color-border)] px-0 py-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
        />
        <textarea
          name="message" placeholder="Your Message" required rows={4}
          className="w-full bg-transparent border-b border-[var(--color-border)] px-0 py-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-300 resize-none"
        />
      </div>

      <button type="submit" disabled={sending}
        className="mt-8 inline-flex items-center gap-3 border border-[var(--color-accent)] bg-transparent text-white text-sm uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-white hover:text-black hover:border-white cursor-pointer disabled:opacity-50"
        style={{
          borderRadius: b.style === 'rounded' ? b.borderRadius : 0,
          paddingTop: b.paddingTop,
          paddingBottom: b.paddingBottom,
          paddingLeft: b.paddingLeft,
          paddingRight: b.paddingRight,
        }}>
        {/* Added dynamic text from contact.json later */}
        <span>{sending ? 'Sending...' : contact.info.content.formButtonText || 'Send Message'}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </button>
    </motion.form>
  );
}

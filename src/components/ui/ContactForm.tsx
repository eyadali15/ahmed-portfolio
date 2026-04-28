import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import spacing from '@/content/design/spacing.json';
import { getConfig } from '@/hooks/useConfig';

const b = spacing.buttons;
const TARGET_EMAIL = 'abuzfilms@gmail.com';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const cms = getConfig();
  const buttonText = (cms?.contact?.info as any)?.formButtonText || 'Send Message';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
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
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center py-16"
      >
        <div className="relative w-20 h-20 mx-auto mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full border-2 border-[var(--color-accent)] flex items-center justify-center"
          >
            <svg className="w-8 h-8 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
          <div className="absolute inset-0 rounded-full bg-[var(--color-accent)]/10 animate-ping" />
        </div>
        <h3 className="font-[var(--font-heading)] text-2xl text-white mb-3">Message Delivered</h3>
        <p className="text-white/40 text-sm mb-8 max-w-xs mx-auto">Thank you for reaching out. I'll get back to you as soon as possible.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm text-[var(--color-accent)] hover:underline cursor-pointer underline-offset-4 tracking-wider uppercase"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="contact-form"
    >
      {/* Hidden FormSubmit fields */}
      <input type="hidden" name="_subject" value="New message from ahmadhany.com" />
      <input type="hidden" name="_template" value="box" />
      <input type="text" name="_honey" style={{ display: 'none' }} />

      <div className="space-y-2">
        {/* Name + Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="form-field-group">
            <label className={`form-field-label ${focusedField === 'name' ? 'active' : ''}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
              Name
            </label>
            <input
              name="name" type="text" placeholder="John Doe" required
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              className="contact-input"
            />
          </div>
          <div className="form-field-group">
            <label className={`form-field-label ${focusedField === 'email' ? 'active' : ''}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              Email
            </label>
            <input
              name="email" type="email" placeholder="john@example.com" required
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className="contact-input"
            />
          </div>
        </div>

        {/* Subject */}
        <div className="form-field-group">
          <label className={`form-field-label ${focusedField === 'subject' ? 'active' : ''}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
              Subject
            </label>
            <input
              name="_subject" type="text" placeholder="Project Inquiry" required
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
              className="contact-input"
            />
          </div>

        {/* Message */}
        <div className="form-field-group">
          <label className={`form-field-label ${focusedField === 'message' ? 'active' : ''}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
              Message
            </label>
          <textarea
            name="message" placeholder="Tell me about your project..." required rows={5}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            className="contact-input contact-textarea"
          />
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={sending}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="contact-submit-btn"
        style={{
          borderRadius: b.style === 'rounded' ? b.borderRadius : 0,
        }}
      >
        <AnimatePresence mode="wait">
          {sending ? (
            <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </motion.span>
          ) : (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
              {buttonText}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.form>
  );
}

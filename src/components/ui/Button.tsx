import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import spacing from '@/content/design/spacing.json';

const b = spacing.buttons;

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, to, href, onClick, className = '' }: ButtonProps) {
  const radius = b.style === 'rounded' ? b.borderRadius : 0;
  const baseClass = `inline-flex items-center gap-3 border border-[var(--color-accent)] bg-transparent text-white text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black hover:border-white cursor-pointer font-medium ${className}`;
  const inlineStyle = {
    borderRadius: radius,
    paddingTop: b.paddingTop,
    paddingBottom: b.paddingBottom,
    paddingLeft: b.paddingLeft,
    paddingRight: b.paddingRight,
    marginTop: b.marginTop || undefined,
    marginBottom: b.marginBottom || undefined,
    marginLeft: b.marginLeft || undefined,
    marginRight: b.marginRight || undefined,
  };

  const content = (
    <>
      <span>{children}</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
      </svg>
    </>
  );

  if (to) return <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block"><Link to={to} className={baseClass} style={inlineStyle}>{content}</Link></motion.div>;
  if (href) return <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block"><a href={href} target="_blank" rel="noopener noreferrer" className={baseClass} style={inlineStyle}>{content}</a></motion.div>;
  return <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onClick} className={baseClass} style={inlineStyle}>{content}</motion.button>;
}

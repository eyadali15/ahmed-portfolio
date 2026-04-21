import { Link } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <PageTransition>
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-accent)] mb-6">Error 404</p>
          <h1 className="font-[var(--font-heading)] text-5xl md:text-7xl mb-6">
            Page <span className="italic text-[var(--color-accent)]">not found</span>
          </h1>
          <p className="text-white/50 text-base mb-12 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button to="/">Back to Home</Button>
        </div>
      </section>
    </PageTransition>
  );
}

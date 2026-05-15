import PageTransition from '@/components/layout/PageTransition';
import Button from '@/components/ui/Button';
import global from '@/content/pages/global.json';

const nf = global.notFound;

export default function NotFound() {
  return (
    <PageTransition>
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-accent)] mb-6">{nf.label}</p>
          <h1 className="font-[var(--font-heading)] text-5xl md:text-7xl mb-6">
            {nf.titlePart1} <span className="italic text-[var(--color-accent)]">{nf.titlePart2}</span>
          </h1>
          <p className="text-white/50 text-base mb-12 max-w-md mx-auto">
            {nf.description}
          </p>
          <Button to="/">{nf.buttonText}</Button>
        </div>
      </section>
    </PageTransition>
  );
}

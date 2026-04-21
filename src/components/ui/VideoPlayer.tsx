import { useState } from 'react';

interface VideoPlayerProps {
  vimeoId: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
}

export default function VideoPlayer({
  vimeoId,
  title = 'Video',
  className = '',
  autoplay = false,
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(autoplay);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const thumbnailUrl = `https://vumbnail.com/${vimeoId}.jpg`;

  // Show thumbnail with play button - click to load iframe
  if (!playing) {
    return (
      <div className={`vimeo-wrapper ${className}`}>
        <div
          className="absolute inset-0 cursor-pointer group"
          onClick={() => setPlaying(true)}
        >
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/60 flex items-center justify-center backdrop-blur-sm bg-white/10 group-hover:scale-110 group-hover:border-[var(--color-accent)] transition-all duration-300">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show iframe embed when playing - with error fallback
  if (error) {
    return (
      <div className={`vimeo-wrapper ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-surface)]">
          <img
            src={thumbnailUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative z-10 text-center px-6">
            <p className="text-white/60 text-sm mb-4">Video embed blocked by your network</p>
            <a
              href={`https://vimeo.com/${vimeoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-black text-sm uppercase tracking-wider rounded hover:brightness-110 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              Watch on Vimeo
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`vimeo-wrapper ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-[var(--color-bg-surface)] flex items-center justify-center z-10">
          <img src={thumbnailUrl} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-20" />
          <div className="relative flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest">Loading</span>
          </div>
        </div>
      )}
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&color=c9a96e&autoplay=1&muted=0`}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}

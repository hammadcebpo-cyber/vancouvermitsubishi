import { DEALERSHIP_INFO } from '../data/dealership.ts';

interface SocialIconsProps {
  variant?: 'light' | 'dark';
}

export function SocialIcons({ variant = 'light' }: SocialIconsProps) {
  const baseClass =
    variant === 'dark'
      ? 'w-10 h-10 inline-flex items-center justify-center border border-white/20 text-white hover:border-[#E60012] hover:bg-[#E60012] transition-colors focus-visible:outline-2 focus-visible:outline-white'
      : 'w-10 h-10 inline-flex items-center justify-center border border-neutral-300 text-[#101010] hover:border-[#E60012] hover:bg-[#E60012] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E60012]';

  return (
    <div className="flex items-center gap-3">
      <a
        href={DEALERSHIP_INFO.social.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Vancouver Mitsubishi on Facebook (opens in a new tab)"
        className={baseClass}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.6V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V11H7.7v3h2.6v8h3.2z" />
        </svg>
      </a>

      <a
        href={DEALERSHIP_INFO.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Vancouver Mitsubishi on Instagram (opens in a new tab)"
        className={baseClass}
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </a>

      <a
        href={DEALERSHIP_INFO.social.youtube}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Vancouver Mitsubishi on YouTube (opens in a new tab)"
        className={baseClass}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
        </svg>
      </a>
    </div>
  );
}

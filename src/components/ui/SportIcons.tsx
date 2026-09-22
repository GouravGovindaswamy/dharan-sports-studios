type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CricketIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...base}>
      <path d="M9 23 L21 11" strokeWidth={5.5} />
      <path d="M21 11 L25 7" strokeWidth={2.4} />
      <circle cx="7" cy="25" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SilambamIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...base}>
      <path d="M6 27 L26 5" />
      <path d="M6 27 L10 27 M6 27 L6 23" />
      <path d="M26 5 L22 5 M26 5 L26 9" />
      <path d="M20 8 Q24 12 22 17" strokeWidth={1.2} opacity="0.6" />
    </svg>
  );
}

export function KarateIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...base}>
      <circle cx="16" cy="12" r="6" />
      <path d="M9 22 Q16 17 23 22 L23 26 Q16 30 9 26 Z" />
      <path d="M13 22 L19 22" strokeWidth={2.2} />
    </svg>
  );
}

export function ArcheryIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...base}>
      <path d="M10 4 Q4 16 10 28" />
      <path d="M10 4 L10 28" strokeWidth={1.1} opacity="0.7" />
      <path d="M6 16 L27 16" />
      <path d="M27 16 L22 12 M27 16 L22 20" />
      <path d="M6 16 L10 14 M6 16 L10 18" strokeWidth={1.1} opacity="0.7" />
    </svg>
  );
}

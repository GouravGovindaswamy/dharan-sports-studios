type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CricketBallObject({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...base}>
      <circle cx="16" cy="16" r="11" />
      <path d="M6.5 13.5 Q16 6 25.5 13.5" strokeWidth={1.1} opacity="0.75" />
      <path d="M6.5 18.5 Q16 26 25.5 18.5" strokeWidth={1.1} opacity="0.75" />
    </svg>
  );
}

export function FootballObject({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...base}>
      <circle cx="16" cy="16" r="11" />
      <path d="M16 9 L20.5 12.3 L18.8 17.6 L13.2 17.6 L11.5 12.3 Z" strokeWidth={1.2} />
      <path d="M16 9 L16 5.3 M20.5 12.3 L24.6 10.4 M18.8 17.6 L21.1 21.6 M13.2 17.6 L10.9 21.6 M11.5 12.3 L7.4 10.4" strokeWidth={1} opacity="0.65" />
    </svg>
  );
}

export function ArrowObject({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...base}>
      <path d="M5 27 L27 5" strokeWidth={1.7} />
      <path d="M27 5 L19.5 7 M27 5 L25 12.5" strokeWidth={1.7} />
      <path d="M5 27 L9 25.7 M5 27 L6.3 23" strokeWidth={1.2} opacity="0.7" />
    </svg>
  );
}

export function SilambamStickObject({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...base}>
      <path d="M5 27 L27 5" strokeWidth={2.6} />
      <path d="M10.5 21.5 L13 19 M15.5 15.9 L18 13.4 M20.5 10.9 L23 8.4" strokeWidth={0.9} opacity="0.55" />
    </svg>
  );
}

export function KarateBeltObject({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...base}>
      <path d="M3 14 L12.5 14" strokeWidth={4} />
      <path d="M19.5 14 L29 14" strokeWidth={4} />
      <rect x="12" y="10" width="8" height="9" rx="2" strokeWidth={1.4} />
      <path d="M14.5 19 L12.5 27.5 M17.5 19 L19.5 27.5" strokeWidth={2.2} />
    </svg>
  );
}


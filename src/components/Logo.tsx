type LogoProps = {
  variant?: "full" | "mark";
  className?: string;
};

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="1" y="1" width="46" height="46" rx="13" fill="#182150" />
      <path d="M48 0 L48 20 L28 0 Z" fill="#DD7A2E" />
      <rect x="1" y="1" width="46" height="46" rx="13" fill="none" stroke="#080A1A" strokeOpacity="0.25" />
      <text
        x="24"
        y="33"
        textAnchor="middle"
        fontFamily="'Fraunces', serif"
        fontWeight="700"
        fontSize="25"
        fill="#FBF8F2"
      >
        D
      </text>
    </svg>
  );
}

export function Logo({ variant = "full", className = "" }: LogoProps) {
  if (variant === "mark") return <LogoMark className={className} />;

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tight text-primary sm:text-xl">
          Dharan Sports Studios
        </span>
        <span className="font-label mt-0.5 text-[10px] uppercase tracking-[0.25em] text-muted">
          OXFS &middot; Est. 2006
        </span>
      </span>
    </span>
  );
}

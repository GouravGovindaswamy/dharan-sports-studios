type LogoProps = {
  variant?: "full" | "mark";
  className?: string;
};

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return <img src="/images/logo-mark.png" alt="" aria-hidden="true" className={`w-auto object-contain ${className}`} />;
}

export function Logo({ variant = "full", className = "" }: LogoProps) {
  if (variant === "mark") return <LogoMark className={className} />;

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="h-10 sm:h-11" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tight text-primary sm:text-xl">
          Dharan Sports Studios
        </span>
        <span className="font-label mt-0.5 text-[10px] uppercase tracking-[0.25em] text-ember-500">
          Nurturing Skills
        </span>
      </span>
    </span>
  );
}

export function SectionDivider() {
  return (
    <div className="relative h-px w-full bg-navy-900/10 dark:bg-white/10" role="presentation" aria-hidden="true">
      <div
        className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #DD7A2E 0px, #DD7A2E 6px, transparent 6px, transparent 18px)",
        }}
      />
      <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ember-500 bg-app" />
    </div>
  );
}

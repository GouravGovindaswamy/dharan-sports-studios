import { useEffect, useState } from "react";

/**
 * Tracks which of the given section ids is currently most prominent in the
 * viewport. `ids` should be in page (top-to-bottom) order — when more than
 * one section is simultaneously intersecting the tracking band, the earliest
 * one in that order wins.
 *
 * IntersectionObserver callbacks only report entries whose intersection
 * state changed since the last firing, not a full snapshot of every
 * observed element — so intersecting ids are tracked incrementally rather
 * than derived fresh from each callback's entry list.
 */
export function useScrollSpy(ids: string[]): string | null {
  const [intersecting, setIntersecting] = useState<Set<string>>(new Set());

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIntersecting((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            if (entry.isIntersecting) {
              next.add(entry.target.id);
            } else {
              next.delete(entry.target.id);
            }
          }
          return next;
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return ids.find((id) => intersecting.has(id)) ?? null;
}

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useScrollSpy } from "./useScrollSpy";

type ObserveCallback = IntersectionObserverCallback;

describe("useScrollSpy", () => {
  let capturedCallback: ObserveCallback | null = null;
  const observedElements: Element[] = [];
  const originalObserver = window.IntersectionObserver;

  beforeEach(() => {
    document.body.innerHTML = `
      <section id="profile"></section>
      <section id="coaching"></section>
      <section id="contact"></section>
    `;
    observedElements.length = 0;

    class FakeIntersectionObserver implements IntersectionObserver {
      readonly root: Element | null = null;
      readonly rootMargin: string = "";
      readonly thresholds: ReadonlyArray<number> = [];
      constructor(callback: ObserveCallback) {
        capturedCallback = callback;
      }
      observe(el: Element) {
        observedElements.push(el);
      }
      unobserve() {}
      disconnect() {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    }

    window.IntersectionObserver = FakeIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    window.IntersectionObserver = originalObserver;
    capturedCallback = null;
  });

  function fireIntersection(entries: Array<{ id: string; isIntersecting: boolean }>) {
    const fakeEntries = entries.map(({ id, isIntersecting }) => ({
      target: document.getElementById(id),
      isIntersecting,
    })) as unknown as IntersectionObserverEntry[];
    act(() => {
      capturedCallback?.(fakeEntries, {} as IntersectionObserver);
    });
  }

  it("observes every element for the given ids", () => {
    renderHook(() => useScrollSpy(["profile", "coaching", "contact"]));
    expect(observedElements.map((el) => el.id).sort()).toEqual(["coaching", "contact", "profile"]);
  });

  it("returns null before any section has intersected", () => {
    const { result } = renderHook(() => useScrollSpy(["profile", "coaching", "contact"]));
    expect(result.current).toBeNull();
  });

  it("reports the intersecting section", () => {
    const { result } = renderHook(() => useScrollSpy(["profile", "coaching", "contact"]));
    fireIntersection([{ id: "coaching", isIntersecting: true }]);
    expect(result.current).toBe("coaching");
  });

  it("prefers the earliest id (in page order) when several intersect at once", () => {
    const { result } = renderHook(() => useScrollSpy(["profile", "coaching", "contact"]));
    fireIntersection([
      { id: "profile", isIntersecting: true },
      { id: "coaching", isIntersecting: true },
    ]);
    expect(result.current).toBe("profile");
  });

  it("falls back to the next intersecting section once the active one leaves", () => {
    const { result } = renderHook(() => useScrollSpy(["profile", "coaching", "contact"]));
    fireIntersection([{ id: "coaching", isIntersecting: true }]);
    expect(result.current).toBe("coaching");

    fireIntersection([
      { id: "coaching", isIntersecting: false },
      { id: "contact", isIntersecting: true },
    ]);
    expect(result.current).toBe("contact");
  });
});

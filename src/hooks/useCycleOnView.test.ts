import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockUseInView, mockUseReducedMotion } = vi.hoisted(() => ({
  mockUseInView: vi.fn(),
  mockUseReducedMotion: vi.fn(),
}));

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  return { ...actual, useInView: mockUseInView, useReducedMotion: mockUseReducedMotion };
});

import { useCycleOnView } from "./useCycleOnView";

describe("useCycleOnView", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockUseReducedMotion.mockReturnValue(false);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("does not advance while the element is off screen", () => {
    mockUseInView.mockReturnValue(false);
    const { result } = renderHook(() => useCycleOnView(1000));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.cycle).toBe(0);
  });

  it("advances on an interval once the element is in view", () => {
    mockUseInView.mockReturnValue(true);
    const { result } = renderHook(() => useCycleOnView(1000));

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.cycle).toBe(3);
  });

  it("does not advance when the user prefers reduced motion, even in view", () => {
    mockUseInView.mockReturnValue(true);
    mockUseReducedMotion.mockReturnValue(true);
    const { result } = renderHook(() => useCycleOnView(1000));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.cycle).toBe(0);
  });
});

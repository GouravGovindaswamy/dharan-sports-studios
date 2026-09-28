import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Counter } from "./Counter";

const hoisted = vi.hoisted(() => ({
  isInView: true,
  reducedMotion: true,
}));

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  return {
    ...actual,
    useInView: () => hoisted.isInView,
    useReducedMotion: () => hoisted.reducedMotion,
  };
});

describe("Counter", () => {
  it("jumps straight to the final value when reduced motion is preferred and the element is in view", () => {
    hoisted.isInView = true;
    hoisted.reducedMotion = true;
    render(<Counter value={250} suffix="+" />);
    expect(screen.getByText("250+")).toBeInTheDocument();
  });

  it("only renders the trophy badge when showBadge is set", () => {
    hoisted.isInView = true;
    hoisted.reducedMotion = true;

    const { unmount } = render(<Counter value={95} suffix="%" showBadge />);
    expect(screen.getByText("95%")).toBeInTheDocument();
    expect(document.querySelector("svg")).not.toBeNull();
    unmount();

    render(<Counter value={95} suffix="%" />);
    expect(screen.getByText("95%")).toBeInTheDocument();
    expect(document.querySelector("svg")).toBeNull();
  });

  it("stays at zero until the element scrolls into view", () => {
    hoisted.isInView = false;
    hoisted.reducedMotion = true;
    render(<Counter value={17} />);
    expect(screen.queryByText("17")).not.toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});

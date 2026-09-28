import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CoachingMatrix } from "./CoachingMatrix";

// Filtering removes cards via AnimatePresence's exit animation, which is
// intentionally non-instant for full-motion users. Forcing reduced motion
// here makes the removal synchronous so these tests assert on the resulting
// list rather than on animation timing.
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  return { ...actual, useReducedMotion: () => true };
});

describe("CoachingMatrix", () => {
  it("shows all five discipline cards by default", () => {
    render(<CoachingMatrix />);
    for (const name of ["Cricket", "Football", "Silambam", "Karate", "Archery"]) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }
  });

  it("filters down to a single discipline when its tab is selected", async () => {
    const user = userEvent.setup();
    render(<CoachingMatrix />);

    await user.click(screen.getByRole("tab", { name: "Football" }));

    expect(screen.getByRole("heading", { name: "Football" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Cricket" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Archery" })).not.toBeInTheDocument();
  });

  it("returns to showing every discipline when All is reselected", async () => {
    const user = userEvent.setup();
    render(<CoachingMatrix />);

    await user.click(screen.getByRole("tab", { name: "Karate" }));
    expect(screen.queryByRole("heading", { name: "Football" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "All" }));
    expect(screen.getByRole("heading", { name: "Football" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Karate" })).toBeInTheDocument();
  });
});

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProgramCard } from "./ProgramCard";
import type { CoachingProgram } from "../data/content";

const sampleProgram: CoachingProgram = {
  id: "karate",
  sport: "Karate Skill Nurturing",
  tagline: "Self-Defence · Discipline · Confidence",
  badge: "Stronger Mind, Stronger Body",
  accent: "crimson",
  schedule: [{ label: "Tue & Wed", time: "5:00 PM – 6:00 PM" }],
  frequency: "2 Days / Week",
  venue: "Jones Sports Studios Range (Sankarapuram, Sithalapakkam)",
  focus: "Kata, Kumite, posture, balance, and self-defense discipline.",
  focusAreas: ["Self-Defence Skills", "Kata & Kumite", "Focus & Discipline", "Flexibility & Fitness", "Character Development"],
};

describe("ProgramCard", () => {
  it("shows the summary front face by default", () => {
    render(<ProgramCard program={sampleProgram} isFeatured={false} fullWidth={false} />);
    expect(screen.getByRole("heading", { name: "Karate" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /show full player card for karate/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("flips to reveal the full focus-area list and flips back", async () => {
    const user = userEvent.setup();
    render(<ProgramCard program={sampleProgram} isFeatured={false} fullWidth={false} />);

    const flipButton = screen.getByRole("button", { name: /show full player card for karate/i });
    await user.click(flipButton);

    expect(flipButton).toHaveAttribute("aria-expanded", "true");
    // The front face only previews 4 of 5 tags; the back face lists all 5 as a checklist.
    expect(screen.getByText("Character Development")).toBeInTheDocument();

    const backButton = screen.getByRole("button", { name: /show summary card for karate/i });
    await user.click(backButton);
    expect(flipButton).toHaveAttribute("aria-expanded", "false");
  });

  it("links the back face's CTA to the contact section", async () => {
    const user = userEvent.setup();
    render(<ProgramCard program={sampleProgram} isFeatured={false} fullWidth={false} />);
    await user.click(screen.getByRole("button", { name: /show full player card for karate/i }));

    const cta = screen.getByRole("link", { name: /book this batch/i });
    expect(cta).toHaveAttribute("href", "#contact");
  });

  it("shows more focus-area tags up front for the featured card", () => {
    render(<ProgramCard program={sampleProgram} isFeatured fullWidth />);
    const article = screen.getByRole("heading", { name: "Karate" }).closest("article");
    expect(article).not.toBeNull();
    // isFeatured previews up to 5 tags instead of 4 — with exactly 5 focus
    // areas, the "+N more" overflow indicator should not appear on the front face.
    expect(within(article as HTMLElement).queryByText(/more$/)).not.toBeInTheDocument();
  });
});

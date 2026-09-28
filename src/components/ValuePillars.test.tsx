import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ValuePillars } from "./ValuePillars";
import { valuePillars } from "../data/content";

describe("ValuePillars", () => {
  it("starts with none of the traits marked as discovered", () => {
    render(<ValuePillars />);
    expect(screen.getByText(`0/${valuePillars.length}`)).toBeInTheDocument();
    expect(screen.queryByText(/all traits discovered/i)).not.toBeInTheDocument();
  });

  it("marks a trait as discovered on hover and updates the counter", async () => {
    const user = userEvent.setup();
    render(<ValuePillars />);

    const first = screen.getByRole("button", { name: valuePillars[0].title });
    await user.hover(first);

    expect(first).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(`1/${valuePillars.length}`)).toBeInTheDocument();
  });

  it("also discovers a trait via keyboard focus, for non-mouse users", async () => {
    const user = userEvent.setup();
    render(<ValuePillars />);

    const first = screen.getByRole("button", { name: valuePillars[0].title });
    fireEvent.focus(first);
    expect(first).toHaveAttribute("aria-pressed", "true");

    // hovering the same one again shouldn't double count
    await user.hover(first);
    expect(screen.getByText(`1/${valuePillars.length}`)).toBeInTheDocument();
  });

  it("shows the completion message once every trait has been discovered", async () => {
    const user = userEvent.setup();
    render(<ValuePillars />);

    for (const pillar of valuePillars) {
      await user.hover(screen.getByRole("button", { name: pillar.title }));
    }

    expect(screen.getByText(/all traits discovered/i)).toBeInTheDocument();
    expect(screen.getByText(`${valuePillars.length}/${valuePillars.length}`)).toBeInTheDocument();
  });
});

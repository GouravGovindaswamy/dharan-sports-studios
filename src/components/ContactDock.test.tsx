import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactDock } from "./ContactDock";

describe("ContactDock", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("opens a wa.me link with the filled-in registration details on submit", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    const user = userEvent.setup();
    render(<ContactDock />);

    await user.type(screen.getByLabelText(/full name/i), "Ravi Kumar");
    await user.selectOptions(screen.getByLabelText(/preferred sport/i), "Football");
    await user.click(screen.getByRole("button", { name: /send via whatsapp/i }));

    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url, target, features] = openSpy.mock.calls[0];
    expect(url).toContain("https://wa.me/919840874713?text=");
    expect(url).toContain(encodeURIComponent("Name: Ravi Kumar"));
    expect(url).toContain(encodeURIComponent("Preferred Sport: Football"));
    expect(target).toBe("_blank");
    expect(features).toBe("noopener,noreferrer");
  });

  it("shows the achievement confirmation after a successful submit", async () => {
    vi.spyOn(window, "open").mockImplementation(() => null);
    const user = userEvent.setup();
    render(<ContactDock />);

    expect(screen.queryByText(/trial request sent/i)).not.toBeInTheDocument();

    await user.type(screen.getByLabelText(/full name/i), "Ravi Kumar");
    await user.click(screen.getByRole("button", { name: /send via whatsapp/i }));

    expect(await screen.findByText(/trial request sent/i)).toBeInTheDocument();
  });

  it("exposes direct call, email, and WhatsApp links with the real contact details", () => {
    render(<ContactDock />);
    expect(screen.getByRole("link", { name: /call direct/i })).toHaveAttribute("href", "tel:+918939988127");
    expect(screen.getByRole("link", { name: /^email/i })).toHaveAttribute("href", "mailto:dharansports@gmail.com");
  });
});

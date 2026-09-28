import { describe, expect, it } from "vitest";
import { buildRegistrationMessage, whatsappHref } from "./whatsapp";

describe("whatsappHref", () => {
  it("strips non-digit characters from the phone number", () => {
    const href = whatsappHref("+91-9840874713", "hello");
    expect(href).toBe("https://wa.me/919840874713?text=hello");
  });

  it("URL-encodes the message, including newlines", () => {
    const href = whatsappHref("+91-9840874713", "Line one\nLine two & more");
    expect(href).toContain("text=Line%20one%0ALine%20two%20%26%20more");
  });
});

describe("buildRegistrationMessage", () => {
  it("includes all required fields in order", () => {
    const message = buildRegistrationMessage({
      fullName: "Ravi Kumar",
      ageGroup: "Under 14",
      sport: "Cricket",
      campus: "Sithalapakkam",
      message: "",
    });

    expect(message).toBe(
      [
        "Hi DSS, I would like to enquire about coaching trials.",
        "Name: Ravi Kumar",
        "Age Group: Under 14",
        "Preferred Sport: Cricket",
        "Preferred Campus: Sithalapakkam",
      ].join("\n")
    );
  });

  it("omits the message line entirely when no message was entered", () => {
    const message = buildRegistrationMessage({
      fullName: "Ravi Kumar",
      ageGroup: "Under 14",
      sport: "Cricket",
      campus: "Sithalapakkam",
      message: "",
    });
    expect(message).not.toContain("Message:");
  });

  it("appends the optional message line when provided", () => {
    const message = buildRegistrationMessage({
      fullName: "Ravi Kumar",
      ageGroup: "Under 14",
      sport: "Cricket",
      campus: "Sithalapakkam",
      message: "Available only on weekends",
    });
    expect(message).toContain("Message: Available only on weekends");
  });
});

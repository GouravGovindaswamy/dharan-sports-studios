/**
 * Builds a wa.me deep link from a phone number (any punctuation stripped)
 * and a pre-filled message.
 */
export function whatsappHref(number: string, message: string): string {
  const digits = number.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/**
 * Composes the multi-line WhatsApp enquiry message from a registration form's
 * field values, omitting the optional message line when it's empty.
 */
export function buildRegistrationMessage(fields: {
  fullName: string;
  ageGroup: string;
  sport: string;
  campus: string;
  message: string;
}): string {
  const lines = [
    "Hi DSS, I would like to enquire about coaching trials.",
    `Name: ${fields.fullName}`,
    `Age Group: ${fields.ageGroup}`,
    `Preferred Sport: ${fields.sport}`,
    `Preferred Campus: ${fields.campus}`,
    fields.message ? `Message: ${fields.message}` : null,
  ];
  return lines.filter(Boolean).join("\n");
}

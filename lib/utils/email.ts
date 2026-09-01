// Requires a local part, an "@", and a domain with at least one dot (e.g. "user@example.com").
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email)
}

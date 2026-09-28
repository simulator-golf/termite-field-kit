import { createHash, timingSafeEqual } from "node:crypto";

// The whole site sits behind one shared access code (SITE_ACCESS_CODE). After
// the code is entered, the browser keeps a cookie holding a hash of it, so
// changing the code signs everyone out.

export const ACCESS_COOKIE = "field_kit_access";
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function accessCode(): string | undefined {
  return process.env.SITE_ACCESS_CODE?.trim() || undefined;
}

export function accessToken(code: string): string {
  return createHash("sha256").update(`field-kit:${code}`).digest("hex");
}

export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

// Only allow redirects back to a path on this site.
export function safeNext(next: unknown): string {
  const n = typeof next === "string" ? next : "";
  return n.startsWith("/") && !n.startsWith("//") && !n.startsWith("/\\") ? n : "/";
}

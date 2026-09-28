import { NextResponse } from "next/server";
import { ACCESS_COOKIE, ACCESS_MAX_AGE, accessCode, accessToken, safeEqual, safeNext } from "@/lib/access";

// Best-effort brute-force brake: per IP, in this server instance's memory.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_TRIES = 10;
const tries = new Map<string, number[]>();

function tooManyTries(ip: string): boolean {
  const now = Date.now();
  const recent = (tries.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  tries.set(ip, recent);
  return recent.length > MAX_TRIES;
}

function backToUnlock(request: Request, next: string, error: string) {
  const url = new URL("/unlock", request.url);
  url.searchParams.set("error", error);
  if (next !== "/") url.searchParams.set("next", next);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const next = safeNext(form?.get("next"));
  const code = accessCode();
  if (!code) return backToUnlock(request, next, "setup");

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooManyTries(ip)) return backToUnlock(request, next, "wait");

  const entered = String(form?.get("code") ?? "").trim();
  if (!safeEqual(accessToken(entered), accessToken(code))) {
    return backToUnlock(request, next, "wrong");
  }

  const res = NextResponse.redirect(new URL(next, request.url), 303);
  res.cookies.set(ACCESS_COOKIE, accessToken(code), {
    httpOnly: true,
    secure: new URL(request.url).protocol === "https:",
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_MAX_AGE,
  });
  return res;
}

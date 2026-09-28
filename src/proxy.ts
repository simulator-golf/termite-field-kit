import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_COOKIE, accessCode, accessToken, safeEqual } from "@/lib/access";

const OPEN_PATHS = ["/unlock", "/api/unlock"];

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (OPEN_PATHS.includes(pathname)) return NextResponse.next();

  const code = accessCode();
  const cookie = request.cookies.get(ACCESS_COOKIE)?.value;
  if (code && cookie && safeEqual(cookie, accessToken(code))) {
    return NextResponse.next();
  }

  const unlock = new URL("/unlock", request.url);
  unlock.search = "";
  if (pathname !== "/") unlock.searchParams.set("next", pathname + search);
  return NextResponse.redirect(unlock);
}

export const config = {
  // Everything, including the photos in public/, except Next's own build assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

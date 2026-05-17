import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";

const ADMIN_PROTECTED_PATHS = [
  "/admin/dashboard",
  "/admin/bookings",
  "/admin/customers",
  "/admin/payments",
  "/admin/rooms",
  "/admin/settings",
];

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthed = await verifyAdminSessionToken(token);

  if (pathname === "/admin/login") {
    if (isAuthed) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (
    pathname === "/admin" ||
    ADMIN_PROTECTED_PATHS.some((path) => pathname.startsWith(path))
  ) {
    if (!isAuthed) {
      const loginUrl = new URL("/admin/login", request.url);
      const nextPath =
        pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
      loginUrl.searchParams.set("next", nextPath);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

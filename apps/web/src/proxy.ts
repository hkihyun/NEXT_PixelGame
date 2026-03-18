import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  demoAuthCookieName,
  isAuthPath,
  isProtectedPath,
} from "@/lib/demo-auth";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isAuthenticated = request.cookies.get(demoAuthCookieName)?.value === "active";

  if (!isAuthenticated && isProtectedPath(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && isAuthPath(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/me";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/build",
    "/build/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/login",
    "/me",
    "/me/:path*",
    "/notifications",
    "/notifications/:path*",
    "/publish",
    "/publish/:path*",
    "/settings",
    "/settings/:path*",
    "/signup",
  ],
};

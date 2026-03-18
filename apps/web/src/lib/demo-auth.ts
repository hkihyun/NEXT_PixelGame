export type DemoAccountRole = "player" | "creator";

export interface DemoSession {
  displayName: string;
  email: string;
  role: DemoAccountRole;
}

export const demoAuthCookieName = "pixel_demo_session";
export const demoSessionStorageKey = "pixel_demo_session";
export const demoFollowingStorageKey = "pixel_demo_following";
export const demoSessionMaxAge = 60 * 60 * 24 * 30;
export const defaultFollowingSlugs = ["minho-park", "yuna-studio"];

export const defaultDemoSession: DemoSession = {
  displayName: "Aria Cho",
  email: "aria@pixel.example",
  role: "creator",
};

const protectedRoutePrefixes = [
  "/admin",
  "/build",
  "/dashboard",
  "/me",
  "/notifications",
  "/publish",
  "/settings",
];

export function isProtectedPath(pathname: string) {
  return protectedRoutePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function isAuthPath(pathname: string) {
  return pathname === "/login" || pathname === "/signup";
}

export function sanitizeNextPath(nextPath?: string | null) {
  if (!nextPath || !nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return "/me";
  }

  return nextPath;
}

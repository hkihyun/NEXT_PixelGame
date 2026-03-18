"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDemoAuth } from "@/components/demo-auth-provider";

const publicNavItems = [
  { href: "/games", label: "Browse" },
  { href: "/trending", label: "Trending" },
  { href: "/news", label: "News" },
  { href: "/jams", label: "Jams" },
  { href: "/people", label: "People" },
];

const accountNavItems = [
  { href: "/me", label: "Library" },
  { href: "/dashboard/games", label: "Dashboard" },
];

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout, session } = useDemoAuth();

  function handleLogout() {
    logout();
    router.push("/login");
    router.refresh();
  }

  const loginHref = `/login?next=${encodeURIComponent(pathname || "/me")}`;
  const createHref = isAuthenticated ? "/build" : `/login?next=${encodeURIComponent("/build")}`;
  const navItems = isAuthenticated ? [...publicNavItems, ...accountNavItems] : publicNavItems;

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="site-brand" href="/">
          <span aria-hidden="true" className="site-brand__mark" />
          <span>Pixel Game Builder</span>
        </Link>
        <nav aria-label="Primary" className="site-nav">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-header__cta">
          {isAuthenticated ? (
            <>
              <span className="site-header__user">{session?.displayName ?? "Demo user"}</span>
              <button className="button button--ghost button--small" onClick={handleLogout} type="button">
                Log out
              </button>
              <Link className="button button--primary button--small" href={createHref}>
                Create Game
              </Link>
            </>
          ) : (
            <>
              <Link className="button button--ghost button--small" href="/signup">
                Sign Up
              </Link>
              <Link className="button button--primary button--small" href={loginHref}>
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

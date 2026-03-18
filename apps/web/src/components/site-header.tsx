import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Browse" },
  { href: "/search", label: "Search" },
  { href: "/collections", label: "Collections" },
  { href: "/dashboard/games", label: "Dashboard" },
];

export function SiteHeader() {
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
          <Link className="button button--primary button--small" href="/build">
            Create Game
          </Link>
        </div>
      </div>
    </header>
  );
}

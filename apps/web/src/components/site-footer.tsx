import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div className="site-footer__meta">
          <p>
            This demo now covers browse, search, creator, library, dashboard, help, legal, and
            admin surfaces on top of the existing build / publish / play flow.
          </p>
        </div>
        <div className="site-footer__links">
          <Link href="/games">Browse Games</Link>
          <Link href="/search">Search</Link>
          <Link href="/dashboard/games">Creator Dashboard</Link>
          <Link href="/help">Help</Link>
          <Link href="/legal">Legal</Link>
        </div>
      </div>
    </footer>
  );
}

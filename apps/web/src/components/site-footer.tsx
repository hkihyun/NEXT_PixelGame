import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div className="site-footer__meta">
          <p>
            이 데모는 기존 build / publish / play 흐름 위에 browse, trending, news, jams,
            creator, library, dashboard, help, legal, admin 표면까지 이어지는 게임 플랫폼
            구조를 다룹니다.
          </p>
        </div>
        <div className="site-footer__links">
          <Link href="/games">Browse Games</Link>
          <Link href="/trending">Trending</Link>
          <Link href="/news">News</Link>
          <Link href="/jams">Jams</Link>
          <Link href="/people">People</Link>
          <Link href="/me">Library</Link>
          <Link href="/dashboard/games">Creator Dashboard</Link>
          <Link href="/help">Help</Link>
          <Link href="/legal">Legal</Link>
        </div>
      </div>
    </footer>
  );
}

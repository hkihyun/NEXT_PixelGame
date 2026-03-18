"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./follow-button.module.css";
import { useDemoAuth } from "@/components/demo-auth-provider";

export function FollowButton({
  creatorSlug,
  creatorName,
  isSelf = false,
}: {
  creatorSlug: string;
  creatorName: string;
  isSelf?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isFollowing, toggleFollow } = useDemoAuth();

  if (isSelf) {
    return (
      <Link className={`button button--ghost button--small ${styles.followButton}`} href="/me">
        내 계정
      </Link>
    );
  }

  const following = isFollowing(creatorSlug);

  function handleClick() {
    if (!isAuthenticated) {
      router.push(`/login?next=${encodeURIComponent(pathname || `/creators/${creatorSlug}`)}`);
      return;
    }

    toggleFollow(creatorSlug);
  }

  return (
    <button
      aria-label={`${creatorName} ${following ? "언팔로우" : "팔로우"}`}
      aria-pressed={following}
      className={`button ${following ? "button--primary" : "button--ghost"} button--small ${styles.followButton}`}
      onClick={handleClick}
      type="button"
    >
      {following ? "팔로잉" : "팔로우"}
    </button>
  );
}

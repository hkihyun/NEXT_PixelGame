"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import styles from "./people-directory.module.css";
import { useDemoAuth } from "@/components/demo-auth-provider";
import { FollowButton } from "@/components/follow-button";
import type { CreatorDirectoryEntry } from "@/lib/platform-data";

type DirectoryFilter = "all" | "following" | "suggested";

export function PeopleDirectory({
  entries,
  currentUserSlug,
}: {
  entries: CreatorDirectoryEntry[];
  currentUserSlug: string;
}) {
  const { followingSlugs, isAuthenticated } = useDemoAuth();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<DirectoryFilter>("all");
  const deferredQuery = useDeferredValue(query);

  const visibleEntries = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    const baseEntries = isAuthenticated
      ? entries.filter((entry) => entry.slug !== currentUserSlug)
      : entries;

    const searchFiltered = normalizedQuery
      ? baseEntries.filter((entry) =>
          [
            entry.name,
            entry.handle,
            entry.role,
            entry.location,
            entry.bio,
            ...entry.specialties,
            ...entry.tags,
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery),
        )
      : baseEntries;

    if (filter === "following") {
      return searchFiltered.filter((entry) => followingSlugs.includes(entry.slug));
    }

    if (filter === "suggested") {
      return searchFiltered
        .filter((entry) => !followingSlugs.includes(entry.slug))
        .sort((a, b) => b.followers - a.followers);
    }

    return searchFiltered;
  }, [currentUserSlug, deferredQuery, entries, filter, followingSlugs, isAuthenticated]);

  const followingCount = isAuthenticated
    ? followingSlugs.filter((slug) => slug !== currentUserSlug).length
    : 0;

  return (
    <div className={styles.directory}>
      <div className={styles.toolbar}>
        <label className={styles.searchField}>
          <span>사람 검색</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="이름, 핸들, 역할, 도시, 태그로 찾기"
            value={query}
          />
        </label>
        <div className={styles.filterRow}>
          {([
            { value: "all", label: "전체" },
            { value: "following", label: "팔로잉" },
            { value: "suggested", label: "추천" },
          ] satisfies Array<{ value: DirectoryFilter; label: string }>).map((item) => (
            <button
              className={`${styles.filterChip} ${filter === item.value ? styles.filterChipActive : ""}`}
              key={item.value}
              onClick={() => setFilter(item.value)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.summaryRow}>
        <span>{`${visibleEntries.length} creators`}</span>
        <span>{`팔로잉 ${followingCount}`}</span>
        <span>{isAuthenticated ? "로그인 상태에서 즉시 팔로우 반영" : "로그인하면 팔로우 상태 저장"}</span>
      </div>

      {filter === "following" && !isAuthenticated ? (
        <div className={styles.emptyState}>
          <strong>팔로잉 목록은 로그인 후에 관리됩니다.</strong>
          <p>데모 로그인 후 다시 돌아오면 팔로우한 사람만 따로 볼 수 있습니다.</p>
          <Link className="button button--primary button--small" href="/login?next=/people">
            로그인
          </Link>
        </div>
      ) : visibleEntries.length > 0 ? (
        <div className={styles.grid}>
          {visibleEntries.map((entry) => (
            <article className={styles.personCard} key={entry.slug}>
              <div className={styles.banner} style={{ background: entry.accent }} />
              <div className={styles.cardBody}>
                <div className={styles.topRow}>
                  <div>
                    <strong>{entry.name}</strong>
                    <span>{entry.handle}</span>
                  </div>
                  <FollowButton creatorName={entry.name} creatorSlug={entry.slug} isSelf={entry.slug === currentUserSlug} />
                </div>

                <p>{entry.pinnedLine}</p>

                <div className={styles.metaRow}>
                  <span>{entry.role}</span>
                  <span>{entry.location}</span>
                  <span>{entry.featuredGameTitle}</span>
                </div>

                <div className={styles.statGrid}>
                  <article>
                    <span>팔로워</span>
                    <strong>{formatCompact(entry.followers)}</strong>
                  </article>
                  <article>
                    <span>공개 게임</span>
                    <strong>{entry.publicGameCount}</strong>
                  </article>
                  <article>
                    <span>플레이</span>
                    <strong>{formatCompact(entry.totalPlays)}</strong>
                  </article>
                </div>

                <div className={styles.tagRow}>
                  {entry.tags.slice(0, 4).map((tag) => (
                    <span className={styles.tag} key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.linkRow}>
                  <Link href={`/creators/${entry.slug}`}>프로필 보기</Link>
                  <Link href={`/search?creator=${entry.slug}`}>게임 보기</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <strong>조건에 맞는 사람이 없습니다.</strong>
          <p>검색어를 줄이거나 추천 필터로 바꿔 보세요.</p>
        </div>
      )}
    </div>
  );
}

export function FollowingOverview({
  entries,
  currentUserSlug,
}: {
  entries: CreatorDirectoryEntry[];
  currentUserSlug: string;
}) {
  const { followingSlugs } = useDemoAuth();

  const followingEntries = useMemo(
    () =>
      entries.filter(
        (entry) => entry.slug !== currentUserSlug && followingSlugs.includes(entry.slug),
      ),
    [currentUserSlug, entries, followingSlugs],
  );

  if (followingEntries.length === 0) {
    return (
      <div className={styles.emptyState}>
        <strong>아직 팔로우 중인 사람이 없습니다.</strong>
        <p>사람 찾기에서 크리에이터를 팔로우하면 여기에도 바로 반영됩니다.</p>
        <Link className="button button--primary button--small" href="/people">
          사람 찾기
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.followingList}>
      {followingEntries.map((entry) => (
        <article className={styles.followingRow} key={entry.slug}>
          <div>
            <strong>{entry.name}</strong>
            <p>{entry.pinnedLine}</p>
          </div>
          <div className={styles.followingActions}>
            <FollowButton creatorName={entry.name} creatorSlug={entry.slug} />
            <Link className="button button--ghost button--small" href={`/creators/${entry.slug}`}>
              프로필
            </Link>
          </div>
        </article>
      ))}
      <Link className="button button--ghost button--small" href="/people">
        사람 더 찾기
      </Link>
    </div>
  );
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("ko-KR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

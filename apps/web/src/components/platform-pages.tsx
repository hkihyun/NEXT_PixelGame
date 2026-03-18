import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./platform-pages.module.css";
import { FollowButton } from "@/components/follow-button";
import { FollowingOverview, PeopleDirectory } from "@/components/people-directory";
import {
  getFeaturedNewsPosts,
  getJamBySlug,
  getJamEvents,
  getJamFeaturedGames,
  getJamMetrics,
  getNewsAuthors,
  getNewsMetrics,
  getNewsPosts,
  getNewsRelatedGames,
  type JamEvent,
  type JamStatus,
  type NewsKind,
  type NewsPost,
} from "@/lib/platform-community-data";
import {
  adminTasks,
  collections,
  formatCompact,
  getAnalyticsStats,
  getBrowseGames,
  getCollectionBySlug,
  getCollectionGames,
  getCreatorDirectory,
  getCreatorBySlug,
  getCreatorStats,
  getCreators,
  getCurrentUser,
  getCurrentUserGames,
  getDashboardStats,
  getFeaturedGames,
  getGameBySlug,
  getGamesByCreator,
  getGamesByTag,
  getLatestGames,
  getLegalDocumentBySlug,
  getLibraryData,
  getRecommendedGames,
  getSearchExamples,
  getTagCatalog,
  getTagDefinition,
  getThemeGradient,
  getThemeLabel,
  helpArticles,
  legalDocuments,
  notifications,
  savedBuilds,
  searchGames,
  tagDefinitions,
  currentUserSlug,
  type CreatorProfile,
  type CuratedCollection,
  type GameSort,
  type GameVisibility,
  type PlatformGame,
} from "@/lib/platform-data";

function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className={`shell ${styles.hero}`}>
      <div className={styles.heroCopy}>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {actions ? <div className={styles.heroActions}>{actions}</div> : null}
      </div>
      <div className={styles.heroAside}>{aside}</div>
    </section>
  );
}

function Section({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className={`shell ${styles.section}`}>
      <div className={styles.sectionHeader}>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

function MetricStrip({
  items,
}: {
  items: Array<{
    label: string;
    value: string;
  }>;
}) {
  return (
    <section className={`shell ${styles.metricStrip}`}>
      {items.map((item) => (
        <article className={`card ${styles.metricCard}`} key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </article>
      ))}
    </section>
  );
}

function Card({
  eyebrow,
  title,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <article className={`card ${styles.panel}`}>
      <div className={styles.cardContent}>
        <div className={styles.cardTop}>
          <span className={styles.cardEyebrow}>{eyebrow}</span>
          {meta ? <span className={styles.cardMeta}>{meta}</span> : null}
        </div>
        <strong>{title}</strong>
        <div className={styles.cardBody}>{children}</div>
      </div>
    </article>
  );
}

function GameGrid({ games }: { games: PlatformGame[] }) {
  return (
    <div className={styles.cardGrid}>
      {games.map((game) => (
        <Link className={`${styles.cardLink} ${styles.gameCard}`} href={`/games/${game.slug}`} key={game.slug}>
          <div className={styles.gameVisual} style={{ background: getThemeGradient(game.theme) }}>
            <span>{getThemeLabel(game.theme)}</span>
            <strong>{game.title}</strong>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardTop}>
              <span className={styles.cardEyebrow}>{game.hook}</span>
              <span className={styles.cardMeta}>{visibilityLabel(game.status)}</span>
            </div>
            <strong>{game.oneLinePitch}</strong>
            <p>{game.blurb}</p>
            <div className={styles.tagRow}>
              <span className={styles.tag}>{game.genreLabel}</span>
              {game.tags.slice(0, 3).map((tag) => (
                <span className={styles.tag} key={tag}>
                  {getTagDefinition(tag)?.label ?? tag}
                </span>
              ))}
            </div>
            <div className={styles.metaList}>
              <span>평점 {game.rating.toFixed(1)}</span>
              <span>플레이 {formatCompact(game.plays)}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function CreatorCard({ creator }: { creator: CreatorProfile }) {
  const stats = getCreatorStats(creator.slug);

  return (
    <Link className={`${styles.cardLink} ${styles.creatorCard}`} href={`/creators/${creator.slug}`}>
      <div className={styles.creatorBanner} style={{ background: creator.accent }} />
      <div className={styles.cardContent}>
        <div className={styles.cardTop}>
          <span className={styles.cardEyebrow}>{creator.role}</span>
          <span className={styles.cardMeta}>{creator.location}</span>
        </div>
        <strong>{creator.name}</strong>
        <p>{creator.pinnedLine}</p>
        <div className={styles.metaList}>
          {stats.slice(0, 3).map((item) => (
            <span key={item.label}>
              {item.label} {item.value}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function CollectionCard({ collection }: { collection: CuratedCollection }) {
  return (
    <Link className={`${styles.cardLink} ${styles.collectionCard}`} href={`/collections/${collection.slug}`}>
      <div className={styles.cardContent}>
        <div className={styles.cardTop}>
          <span className={styles.cardEyebrow}>{collection.curator}</span>
          <span className={styles.cardMeta}>{collection.gameSlugs.length} games</span>
        </div>
        <strong>{collection.title}</strong>
        <p>{collection.description}</p>
        <div className={styles.metaList}>
          <span>{collection.theme}</span>
        </div>
      </div>
    </Link>
  );
}

function NewsFeedCard({ post }: { post: NewsPost }) {
  const game = post.gameSlug ? getGameBySlug(post.gameSlug) : undefined;
  const creator = getNewsAuthors(post);

  return (
    <Link className={styles.cardLink} href={post.href}>
      <span className={styles.surface} style={{ background: post.accent }} />
      <div className={styles.cardContent}>
        <div className={styles.cardTop}>
          <span className={styles.cardEyebrow}>{newsKindLabel(post.kind)}</span>
          <span className={styles.cardMeta}>{formatCalendarDate(post.publishedAt)}</span>
        </div>
        <strong>{post.title}</strong>
        <p>{post.summary}</p>
        <div className={styles.metaList}>
          {game ? <span>{game.title}</span> : null}
          {creator ? <span>{creator.name}</span> : null}
        </div>
      </div>
    </Link>
  );
}

function JamCard({ jam }: { jam: JamEvent }) {
  return (
    <Link className={styles.cardLink} href={`/jams/${jam.slug}`}>
      <span className={styles.surface} style={{ background: jam.accent }} />
      <div className={styles.cardContent}>
        <div className={styles.cardTop}>
          <span className={styles.cardEyebrow}>{jamStatusLabel(jam.status)}</span>
          <span className={styles.cardMeta}>{jam.host}</span>
        </div>
        <strong>{jam.title}</strong>
        <p>{jam.summary}</p>
        <div className={styles.metaList}>
          <span>{jam.theme}</span>
          <span>{formatCompact(jam.participants)} joined</span>
          <span>{formatCompact(jam.submissions)} submissions</span>
        </div>
      </div>
    </Link>
  );
}

function GameList({
  games,
  includeStatus = false,
}: {
  games: PlatformGame[];
  includeStatus?: boolean;
}) {
  return (
    <div className={styles.stackCompact}>
      {games.map((game) => (
        <Link className={styles.inlineItem} href={`/games/${game.slug}`} key={game.slug}>
          <strong>{game.title}</strong>
          <span>{game.updatedAt}</span>
          <p>{game.oneLinePitch}</p>
          {includeStatus ? <small className={statusClassName(game.status)}>{visibilityLabel(game.status)}</small> : null}
        </Link>
      ))}
    </div>
  );
}

function Timeline({
  items,
}: {
  items: Array<{
    title: string;
    body: string;
    meta: string;
    bullets: string[];
  }>;
}) {
  return (
    <div className={styles.timeline}>
      {items.map((item) => (
        <article className={`card ${styles.timelineItem}`} key={`${item.title}-${item.meta}`}>
          <div className={styles.cardContent}>
            <div className={styles.cardTop}>
              <span className={styles.cardEyebrow}>{item.title}</span>
              <span className={styles.cardMeta}>{item.meta}</span>
            </div>
            <strong>{item.body}</strong>
            <ul className={styles.bulletList}>
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <section className={`shell ${styles.section}`}>
      <article className={`card ${styles.emptyState}`}>
        <p>{message}</p>
      </article>
    </section>
  );
}

function buildHref(pathname: string, params: Record<string, string | undefined>) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  const query = searchParams.toString();
  return query ? `${pathname}?${query}` : pathname;
}

function visibilityLabel(status: GameVisibility) {
  switch (status) {
    case "public":
      return "공개";
    case "unlisted":
      return "비공개 링크";
    case "draft":
    default:
      return "초안";
  }
}

function statusClassName(status: GameVisibility) {
  return `${styles.statusBadge} ${status === "public" ? styles.statusPublic : status === "unlisted" ? styles.statusUnlisted : styles.statusDraft}`;
}

function sortLabel(sort: GameSort) {
  switch (sort) {
    case "latest":
      return "최신순";
    case "rating":
      return "평점순";
    case "plays":
      return "플레이수순";
    case "popular":
    default:
      return "인기순";
  }
}

function newsKindLabel(kind: NewsKind) {
  switch (kind) {
    case "devlog":
      return "Devlog";
    case "release":
      return "Release";
    case "platform":
    default:
      return "Platform";
  }
}

function jamStatusLabel(status: JamStatus) {
  switch (status) {
    case "open":
      return "접수 중";
    case "upcoming":
      return "예정";
    case "judging":
      return "심사 중";
    case "completed":
    default:
      return "종료";
  }
}

function formatCalendarDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function DiscoveryHubPage({
  sort = "popular",
  tag,
}: {
  sort?: GameSort;
  tag?: string;
}) {
  const games = getBrowseGames(sort, tag);
  const filters = getTagCatalog();
  const sortOptions: Array<{ value: GameSort; label: string }> = [
    { value: "popular", label: "인기순" },
    { value: "latest", label: "최신순" },
    { value: "rating", label: "평점순" },
    { value: "plays", label: "플레이수순" },
  ];

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Discovery"
        title="게임 목록 / 탐색 허브"
        description="인기, 최신, 추천 게임과 장르/태그 필터, 정렬 기준, 썸네일 카드를 한 화면에 모아 실제 서비스의 입구 역할을 하도록 구성했습니다."
        actions={
          <>
            <Link className="button button--primary" href="/search?q=browser">
              검색 결과 보기
            </Link>
            <Link className="button button--ghost" href="/collections">
              큐레이션 보기
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Now Live" title="서비스 진입점이 홈 밖으로 확장됩니다." meta={`${games.length} indexed games`}>
            <p>이제 랜딩 페이지 외에도 별도 브라우즈 허브에서 공개 게임을 발견할 수 있습니다.</p>
            <div className={styles.metaList}>
              <span>인기 / 최신 / 추천 섹션</span>
              <span>장르 / 태그 필터</span>
              <span>정렬 기준 유지</span>
            </div>
          </Card>
        }
      />

      <MetricStrip
        items={[
          { label: "공개 게임", value: `${games.length}` },
          { label: "추천 컬렉션", value: `${collections.length}` },
          { label: "활성 태그", value: `${filters.length}` },
          { label: "참여 제작자", value: `${getCreators().length}` },
        ]}
      />

      <Section
        eyebrow="Browse"
        title="필터와 정렬"
        description="장르/태그 선택 뒤에도 정렬 기준이 유지되도록 링크를 구성했습니다."
      >
        <div className={styles.toolbar}>
          <div className={styles.chipRow}>
            {sortOptions.map((option) => (
              <Link
                className={`${styles.chip} ${sort === option.value ? styles.chipActive : ""}`}
                href={buildHref("/games", { sort: option.value, tag })}
                key={option.value}
              >
                {option.label}
              </Link>
            ))}
          </div>
          <div className={styles.chipRow}>
            <Link
              className={`${styles.chip} ${!tag ? styles.chipActive : ""}`}
              href={buildHref("/games", { sort })}
            >
              전체
            </Link>
            {filters.map((filter) => (
              <Link
                className={`${styles.chip} ${tag === filter.slug ? styles.chipActive : ""}`}
                href={buildHref("/games", { sort, tag: filter.slug })}
                key={filter.slug}
              >
                {filter.label} · {filter.count}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Featured" title="인기 게임" description="플레이, 저장, 좋아요 지표를 합산해 현재 허브 최상단에 노출할 만한 대표작을 배치했습니다.">
        <GameGrid games={getFeaturedGames()} />
      </Section>

      <Section eyebrow="Latest" title="최신 게임" description="최근 업데이트나 공개가 일어난 게임을 별도 축으로 분리해 신작 탐색성을 확보합니다.">
        <GameGrid games={getLatestGames()} />
      </Section>

      <Section eyebrow="Recommended" title="추천 게임" description="상세 페이지 완성도와 평점 반응이 좋은 게임을 골라 추천 섹션에 배치합니다.">
        <GameGrid games={getRecommendedGames()} />
      </Section>

      <Section eyebrow="All Games" title="전체 목록" description={`현재 기준 ${sortLabel(sort)} 정렬${tag ? ` / ${getTagDefinition(tag)?.label ?? tag} 필터` : ""}가 적용된 결과입니다.`}>
        <GameGrid games={games} />
      </Section>
    </div>
  );
}

export function SearchResultsPage({
  query,
  sort = "popular",
  tag,
  creator,
}: {
  query?: string;
  sort?: GameSort;
  tag?: string;
  creator?: string;
}) {
  const results = searchGames({ query, sort, tag, creator });
  const creatorProfile = creator ? getCreatorBySlug(creator) : undefined;

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Search"
        title="검색 결과"
        description="제목, 태그, 제작자, 부분 일치 검색을 모두 흉내 낸 전용 결과 페이지입니다."
        actions={
          <>
            <Link className="button button--primary" href="/games">
              전체 브라우즈로 이동
            </Link>
            <Link className="button button--ghost" href={buildHref("/search", { sort, tag })}>
              검색 초기화
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Search State" title={query ? `"${query}" 검색 중` : "추천 키워드로 시작하세요"} meta={`${results.length} results`}>
            <div className={styles.metaList}>
              <span>{query ? `검색어: ${query}` : "검색어 없음"}</span>
              <span>{tag ? `필터: ${getTagDefinition(tag)?.label ?? tag}` : "필터 없음"}</span>
              <span>{creatorProfile ? `제작자: ${creatorProfile.name}` : "제작자 제한 없음"}</span>
            </div>
          </Card>
        }
      />

      <Section eyebrow="Quick Query" title="추천 검색어" description="초기 데모에서도 검색 사용 사례가 보이도록 자주 쓸 만한 검색어를 바로 노출합니다.">
        <div className={styles.chipRow}>
          {getSearchExamples().map((keyword) => (
            <Link className={styles.chip} href={buildHref("/search", { q: keyword, sort })} key={keyword}>
              {keyword}
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Result Summary" title={`${results.length}개의 결과`} description="정렬과 필터를 유지한 채 결과를 분리해 보여줍니다.">
        <div className={styles.toolbar}>
          <div className={styles.chipRow}>
            {(["popular", "latest", "rating", "plays"] as GameSort[]).map((value) => (
              <Link
                className={`${styles.chip} ${sort === value ? styles.chipActive : ""}`}
                href={buildHref("/search", { q: query, sort: value, tag, creator })}
                key={value}
              >
                {sortLabel(value)}
              </Link>
            ))}
          </div>
          <div className={styles.chipRow}>
            {tagDefinitions.map((item) => (
              <Link
                className={`${styles.chip} ${tag === item.slug ? styles.chipActive : ""}`}
                href={buildHref("/search", { q: query, sort, tag: item.slug, creator })}
                key={item.slug}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        {results.length > 0 ? <GameGrid games={results} /> : <EmptyState message="일치하는 게임이 없습니다. 다른 태그나 제작자 조합으로 다시 검색해 보세요." />}
      </Section>
    </div>
  );
}

export function TagIndexPage() {
  const tags = getTagCatalog();

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Tags"
        title="카테고리 / 태그 허브"
        description="SEO, 탐색성, 추천 시스템 설계를 위해 태그 축을 별도 페이지로 노출합니다."
        actions={
          <>
            <Link className="button button--primary" href="/games">
              게임 브라우즈 열기
            </Link>
            <Link className="button button--ghost" href="/search?q=pixel-art">
              태그 검색 예시
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Browse Taxonomy" title="검색과 추천을 위한 기본 축" meta={`${tags.length} categories`}>
            <p>장르와 속성 태그를 같은 허브에서 보여 주되, 상세 페이지는 개별 라우트로 분리했습니다.</p>
          </Card>
        }
      />

      <Section eyebrow="Tag Catalog" title="탐색용 태그 목록" description="각 태그마다 연결된 게임 수와 설명을 함께 보여줍니다.">
        <div className={styles.cardGrid}>
          {tags.map((tag) => (
            <Link className={`${styles.cardLink} ${styles.tagCard}`} href={`/tags/${tag.slug}`} key={tag.slug}>
              <span className={styles.surface} style={{ background: tag.accent }} />
              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <span className={styles.cardEyebrow}>{tag.kind === "genre" ? "Genre" : "Tag"}</span>
                  <span className={styles.cardMeta}>{tag.count} games</span>
                </div>
                <strong>{tag.label}</strong>
                <p>{tag.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}

export function TagDetailPage({ slug, sort = "popular" }: { slug: string; sort?: GameSort }) {
  const tag = getTagDefinition(slug);
  const games = getGamesByTag(slug, sort);

  if (!tag) {
    return <EmptyState message="존재하지 않는 태그입니다." />;
  }

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow={tag.kind === "genre" ? "Genre" : "Tag"}
        title={`${tag.label} 페이지`}
        description={tag.description}
        actions={
          <>
            <Link className="button button--primary" href={buildHref("/games", { tag: slug, sort })}>
              이 태그로 브라우즈
            </Link>
            <Link className="button button--ghost" href="/tags">
              전체 태그 보기
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Indexed" title={`${games.length}개 게임이 연결됨`} meta={sortLabel(sort)}>
            <p>태그별 발견성을 높이기 위한 상세 라우트입니다.</p>
          </Card>
        }
      />

      <Section eyebrow="Games" title={`${tag.label} 게임`} description="태그 상세 페이지에서도 정렬 기준을 유지할 수 있게 설계했습니다.">
        <div className={styles.chipRow}>
          {(["popular", "latest", "rating", "plays"] as GameSort[]).map((value) => (
            <Link
              className={`${styles.chip} ${sort === value ? styles.chipActive : ""}`}
              href={buildHref(`/tags/${slug}`, { sort: value })}
              key={value}
            >
              {sortLabel(value)}
            </Link>
          ))}
        </div>
        <GameGrid games={games} />
      </Section>
    </div>
  );
}

export function CollectionsPage() {
  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Collections"
        title="컬렉션 / 큐레이션"
        description="특정 테마의 게임을 묶는 큐레이션 공간입니다. 플랫폼 감성과 재발견 루프를 강화합니다."
        actions={
          <>
            <Link className="button button--primary" href="/trending">
              트렌딩 보기
            </Link>
            <Link className="button button--ghost" href="/games">
              전체 게임 허브
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Editorial Layer" title="기계 추천과 별개인 인간 큐레이션" meta={`${collections.length} collections`}>
            <p>게임을 단순히 나열하지 않고 맥락과 테마를 붙여 다시 소비하게 만드는 레이어입니다.</p>
          </Card>
        }
      />

      <Section eyebrow="Curated Lists" title="공개 컬렉션" description="주간 추천, 첫 게임 쇼케이스, 코옵 나이트처럼 주제가 살아 있는 묶음을 준비했습니다.">
        <div className={styles.cardGrid}>
          {collections.map((collection) => (
            <CollectionCard collection={collection} key={collection.slug} />
          ))}
        </div>
      </Section>
    </div>
  );
}

export function CollectionDetailPage({ slug }: { slug: string }) {
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return <EmptyState message="존재하지 않는 컬렉션입니다." />;
  }

  const games = getCollectionGames(collection);

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Collection"
        title={collection.title}
        description={collection.description}
        actions={
          <>
            <Link className="button button--primary" href="/collections">
              다른 컬렉션 보기
            </Link>
            <Link className="button button--ghost" href="/games">
              전체 게임 보기
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Curator Note" title={collection.theme} meta={collection.curator}>
            <p>{collection.note}</p>
          </Card>
        }
      />

      <Section eyebrow="Games" title="컬렉션에 포함된 게임" description="큐레이터 설명과 함께 게임을 묶어 보여줍니다.">
        <GameGrid games={games} />
      </Section>
    </div>
  );
}

export function TrendingPage() {
  const popular = getFeaturedGames();
  const rising = getLatestGames();

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Trending"
        title="랭킹 / 트렌딩"
        description="오늘 인기 게임, 급상승, 누적 플레이, 제작자 반응을 별도 축으로 보여 줘 재방문 이유를 만듭니다."
        actions={
          <>
            <Link className="button button--primary" href="/games?sort=plays">
              많이 플레이된 게임
            </Link>
            <Link className="button button--ghost" href="/collections">
              큐레이션으로 이동
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Return Loop" title="매일 확인할 만한 표면" meta="Today / Week / All-time">
            <p>브라우즈와 분리된 랭킹 허브는 반복 방문의 핵심 동기가 됩니다.</p>
          </Card>
        }
      />

      <Section eyebrow="Today" title="오늘 인기 게임" description="즉시 반응이 좋은 게임을 메인 카드로 올립니다.">
        <GameGrid games={popular} />
      </Section>

      <Section eyebrow="Rising" title="이번 주 급상승" description="최근 업데이트 이후 상승세가 보이는 게임을 분리해 노출합니다.">
        <GameGrid games={rising} />
      </Section>

      <Section eyebrow="Creators" title="좋아요 급상승 제작자" description="게임 뿐 아니라 창작자 자체가 발견되는 구조를 의도했습니다.">
        <div className={styles.cardGrid}>
          {getCreators().map((creator) => (
            <CreatorCard creator={creator} key={creator.slug} />
          ))}
        </div>
      </Section>
    </div>
  );
}

export function NewsHubPage() {
  const metrics = getNewsMetrics();
  const featuredPosts = getFeaturedNewsPosts();
  const devlogPosts = getNewsPosts("devlog");
  const platformPosts = getNewsPosts("platform");
  const relatedGames = getNewsRelatedGames().slice(0, 4);

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="News"
        title="뉴스 / 업데이트 허브"
        description="Steam의 News Hub와 itch.io의 Developer Logs처럼, 게임 업데이트와 플랫폼 공지를 한 축으로 묶는 재방문 표면입니다."
        actions={
          <>
            <Link className="button button--primary" href="/jams">
              진행 중인 게임잼
            </Link>
            <Link className="button button--ghost" href="/trending">
              트렌딩 보기
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Why it matters" title="업데이트가 쌓일수록 플랫폼은 다시 방문할 이유를 갖습니다" meta="devlog / release / platform">
            <div className={styles.metaList}>
              <span>게임별 변경 이력</span>
              <span>런칭 / 큐레이션 소식</span>
              <span>플랫폼 운영 공지</span>
            </div>
          </Card>
        }
      />

      <MetricStrip
        items={[
          { label: "총 포스트", value: `${metrics.total}` },
          { label: "개발 로그", value: `${metrics.devlogs}` },
          { label: "릴리스 소식", value: `${metrics.releases}` },
          { label: "플랫폼 공지", value: `${metrics.platform}` },
        ]}
      />

      <Section eyebrow="Featured" title="지금 주목할 업데이트" description="홈과 트렌딩에서 다시 끌어올 만한 핵심 소식을 먼저 노출합니다.">
        <div className={styles.cardGrid}>
          {featuredPosts.map((post) => (
            <NewsFeedCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Devlogs" title="최근 개발 로그" description="itch.io의 Developer Logs처럼 제작자 업데이트를 별도 피드로 볼 수 있게 구성했습니다.">
        <div className={styles.cardGrid}>
          {devlogPosts.map((post) => (
            <NewsFeedCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Platform" title="운영 / 기능 공지" description="도움말, 신고, 퍼블리시 흐름과 직접 연결되는 플랫폼 공지를 별도 묶음으로 보여 줍니다.">
        <div className={styles.stack}>
          {platformPosts.map((post) => (
            <Card eyebrow={newsKindLabel(post.kind)} key={post.slug} meta={formatCalendarDate(post.publishedAt)} title={post.title}>
              <p>{post.summary}</p>
              <ul className={styles.bulletList}>
                {post.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className={styles.linkList}>
                <Link href={post.href}>바로 보기</Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Updated Games" title="업데이트가 이어지는 게임" description="뉴스 허브가 다시 탐색으로 이어지도록 최근 소식이 붙은 게임을 연결합니다.">
        <GameGrid games={relatedGames} />
      </Section>
    </div>
  );
}

export function JamsPage() {
  const metrics = getJamMetrics();
  const activeJams = [...getJamEvents("open"), ...getJamEvents("judging")];
  const upcomingJams = getJamEvents("upcoming");
  const recentJams = getJamEvents("completed");
  const featuredGames = Array.from(
    new Map(
      getJamEvents()
        .flatMap((jam) => getJamFeaturedGames(jam))
        .map((game) => [game.slug, game]),
    ).values(),
  ).slice(0, 4);

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Jams"
        title="게임잼 / 챌린지 허브"
        description="itch.io의 Game Jams처럼 플랫폼 안에서 제작 이벤트를 열고, 제출작을 다시 발견으로 연결하는 구조를 추가했습니다."
        actions={
          <>
            <Link className="button button--primary" href="/build">
              새 잼용 게임 만들기
            </Link>
            <Link className="button button--ghost" href="/news">
              업데이트 허브
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Community Loop" title="창작 이벤트는 제작자와 플레이어를 다시 묶습니다" meta="host / submit / feature">
            <div className={styles.metaList}>
              <span>진행 중 잼</span>
              <span>예정 잼</span>
              <span>제출작 큐레이션</span>
            </div>
          </Card>
        }
      />

      <MetricStrip
        items={[
          { label: "총 게임잼", value: `${metrics.total}` },
          { label: "현재 진행", value: `${metrics.open}` },
          { label: "참가자", value: formatCompact(metrics.participants) },
          { label: "제출작", value: formatCompact(metrics.submissions) },
        ]}
      />

      <Section eyebrow="Active" title="지금 참가 가능한 잼" description="진행 중이거나 심사 중인 이벤트를 첫 화면에서 확인할 수 있게 두었습니다.">
        <div className={styles.cardGrid}>
          {activeJams.map((jam) => (
            <JamCard key={jam.slug} jam={jam} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Upcoming" title="곧 시작하는 잼" description="제작 일정을 미리 잡을 수 있도록 예정 이벤트를 별도 분리했습니다.">
        <div className={styles.cardGrid}>
          {upcomingJams.map((jam) => (
            <JamCard key={jam.slug} jam={jam} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Highlights" title="잼에서 주목받은 게임" description="이벤트가 끝난 뒤에도 제출작이 계속 발견되도록 대표 게임을 다시 노출합니다.">
        <GameGrid games={featuredGames} />
      </Section>

      <Section eyebrow="Recently Wrapped" title="최근 종료된 잼" description="종료된 이벤트도 아카이브 성격으로 남겨 커뮤니티 히스토리를 만듭니다.">
        <div className={styles.cardGrid}>
          {recentJams.map((jam) => (
            <JamCard key={jam.slug} jam={jam} />
          ))}
        </div>
      </Section>
    </div>
  );
}

export function JamDetailPage({ slug }: { slug: string }) {
  const jam = getJamBySlug(slug);

  if (!jam) {
    return <EmptyState message="게임잼 정보를 찾을 수 없습니다." />;
  }

  const featuredGames = getJamFeaturedGames(jam);
  const resultLabel = jam.status === "completed" ? "큐레이션 정리 완료" : jam.status === "judging" ? "심사 중" : "결과 발표 예정";

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Jam"
        title={jam.title}
        description={jam.summary}
        actions={
          <>
            <Link className="button button--primary" href="/build">
              이 테마로 만들기
            </Link>
            <Link className="button button--ghost" href="/jams">
              전체 게임잼 보기
            </Link>
          </>
        }
        aside={
          <Card eyebrow={jamStatusLabel(jam.status)} title={jam.theme} meta={`${formatCalendarDate(jam.startsAt)} - ${formatCalendarDate(jam.endsAt)}`}>
            <p>{jam.prompt}</p>
          </Card>
        }
      />

      <MetricStrip
        items={[
          { label: "상태", value: jamStatusLabel(jam.status) },
          { label: "참가자", value: formatCompact(jam.participants) },
          { label: "제출작", value: formatCompact(jam.submissions) },
          { label: "마감", value: formatCalendarDate(jam.endsAt) },
        ]}
      />

      <Section eyebrow="Brief" title="호스트 메모 / 참여 규칙" description="잼 상세는 공지, 규칙, 결과가 한 화면에서 이어져야 합니다.">
        <div className={styles.detailColumns}>
          <Card eyebrow="Host note" title={jam.host} meta={jam.prize}>
            <p>{jam.hostNote}</p>
          </Card>
          <Card eyebrow="Rules" title="참여 전에 확인할 것" meta={`${jam.rules.length} rules`}>
            <ul className={styles.bulletList}>
              {jam.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Schedule" title="진행 일정" description="접수, 마감, 결과 공개 타이밍을 요약해 보여 줍니다.">
        <Timeline
          items={[
            {
              title: "접수 시작",
              body: jam.prompt,
              meta: formatCalendarDate(jam.startsAt),
              bullets: [jam.theme, `주최: ${jam.host}`, "빌드와 퍼블리시 흐름이 바로 이어집니다."],
            },
            {
              title: "제출 마감",
              body: "최종 빌드와 상세 페이지를 제출합니다.",
              meta: formatCalendarDate(jam.endsAt),
              bullets: [jam.prize, `${formatCompact(jam.participants)} creators joined`, `${formatCompact(jam.submissions)} submissions`],
            },
            {
              title: "결과 정리",
              body: "뉴스 허브와 컬렉션에 다시 연결됩니다.",
              meta: resultLabel,
              bullets: ["추천 슬롯 노출", "운영팀 큐레이션 메모", "트렌딩과 컬렉션 연동"],
            },
          ]}
        />
      </Section>

      <Section eyebrow="Featured" title="대표 제출작" description="잼 상세에서 바로 플레이하거나 상세 페이지로 넘어갈 수 있게 연결했습니다.">
        <GameGrid games={featuredGames} />
      </Section>
    </div>
  );
}

export function GameDetailPage({ slug }: { slug: string }) {
  const game = getGameBySlug(slug);

  if (!game) {
    return <EmptyState message="존재하지 않는 게임입니다." />;
  }

  const creator = getCreatorBySlug(game.creatorSlug);
  const relatedGames = getRecommendedGames().filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Game"
        title={game.title}
        description={game.oneLinePitch}
        actions={
          <>
            <Link className="button button--primary" href={`/play/${game.slug}`}>
              게임 실행
            </Link>
            <Link className="button button--ghost" href={`/games/${game.slug}/reviews`}>
              리뷰 보기
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Game Facts" title={game.tagline} meta={`${game.version} · ${game.playTime}`}>
            <div className={styles.metricMiniGrid}>
              <article>
                <span>평점</span>
                <strong>{game.rating.toFixed(1)}</strong>
              </article>
              <article>
                <span>플레이</span>
                <strong>{formatCompact(game.plays)}</strong>
              </article>
              <article>
                <span>좋아요</span>
                <strong>{formatCompact(game.likes)}</strong>
              </article>
              <article>
                <span>저장</span>
                <strong>{formatCompact(game.saves)}</strong>
              </article>
            </div>
          </Card>
        }
      />

      <section className={`shell ${styles.playSplit}`}>
        <div className={`card ${styles.playStageCard}`}>
          <div className={styles.playStage} style={{ background: getThemeGradient(game.theme) }}>
            <div className={styles.playHud}>
              <span>HP {game.spec.player.hp}</span>
              <span>Coins {game.spec.goal.requiredCoins}</span>
              <span>{getThemeLabel(game.theme)}</span>
            </div>
            <div className={styles.pixelGrid}>
              {Array.from({ length: 48 }).map((_, index) => (
                <span key={index} />
              ))}
            </div>
            <div className={styles.actorRow}>
              <span>{game.spec.player.characterId}</span>
              <span>{game.spec.enemies[0]?.type} x{game.spec.enemies[0]?.count ?? 0}</span>
              <span>{game.spec.map.levelPreset}</span>
            </div>
          </div>
        </div>
        <div className={styles.sideStack}>
          <Card eyebrow="About" title="게임 소개" meta={game.genreLabel}>
            <p>{game.description}</p>
            <div className={styles.tagRow}>
              <span className={styles.tag}>{game.genreLabel}</span>
              {game.tags.map((item) => (
                <Link className={styles.tag} href={`/tags/${item}`} key={item}>
                  {getTagDefinition(item)?.label ?? item}
                </Link>
              ))}
            </div>
          </Card>
          <Card eyebrow="Actions" title="좋아요 / 저장 / 공유" meta="Mock actions">
            <div className={styles.actionButtonRow}>
              <button className="button button--ghost button--small" type="button">
                좋아요
              </button>
              <button className="button button--ghost button--small" type="button">
                저장
              </button>
              <Link className="button button--ghost button--small" href={`/report?game=${game.slug}`}>
                공유 / 신고
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Section eyebrow="Description" title="상세 설명" description={game.blurb}>
        <div className={styles.detailColumns}>
          <Card eyebrow="Controls" title="조작법" meta={game.audience}>
            <ul className={styles.bulletList}>
              {game.controls.map((control) => (
                <li key={control}>{control}</li>
              ))}
            </ul>
          </Card>
          <Card eyebrow="Creator" title={creator?.name ?? "Unknown creator"} meta={creator?.handle ?? ""}>
            <p>{creator?.bio}</p>
            <div className={styles.linkList}>
              <Link href={`/creators/${creator?.slug}`}>프로필 보기</Link>
              <Link href={`/games/${game.slug}/devlog`}>업데이트 노트</Link>
              <Link href={`/games/${game.slug}/reviews`}>댓글 / 리뷰</Link>
            </div>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Media" title="스크린샷 / GIF / 트레일러" description="게임의 훅을 실행 전에도 이해할 수 있게 만드는 미디어 영역입니다.">
        <div className={styles.cardGrid}>
          {game.media.map((item) => (
            <article className={`card ${styles.mediaCard}`} key={item.title}>
              <div className={styles.mediaSurface} style={{ background: item.accent }} />
              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <span className={styles.cardEyebrow}>{item.kind}</span>
                  <span className={styles.cardMeta}>{game.version}</span>
                </div>
                <strong>{item.title}</strong>
                <p>{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Versioning" title="버전 정보 / 업데이트 내역" description="프로젝트 페이지에서 버전과 변경 이력을 한 번에 확인할 수 있게 했습니다.">
        <Timeline items={game.changelog.map((entry) => ({ title: entry.version, body: entry.summary, meta: entry.date, bullets: entry.bullets }))} />
      </Section>

      <Section eyebrow="Feedback" title="리뷰 / 댓글 미리보기" description="초기 MVP에서는 댓글 중심으로 시작하고, 평점 요약을 함께 보이도록 구성했습니다.">
        <div className={styles.cardGrid}>
          {game.reviews.map((review) => (
            <article className={`card ${styles.reviewCard}`} key={`${review.author}-${review.createdAt}`}>
              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <span className={styles.cardEyebrow}>{review.author}</span>
                  <span className={styles.cardMeta}>{review.rating.toFixed(1)} / 5</span>
                </div>
                <p>{review.body}</p>
                <span className={styles.muted}>{review.createdAt}</span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Related" title="다른 추천 게임" description="상세 페이지를 탐색 허브의 연장선으로 활용합니다.">
        <GameGrid games={relatedGames} />
      </Section>
    </div>
  );
}

export function GameReviewsPage({ slug }: { slug: string }) {
  const game = getGameBySlug(slug);

  if (!game) {
    return <EmptyState message="리뷰를 찾을 수 없습니다." />;
  }

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Reviews"
        title={`${game.title} 리뷰 / 댓글`}
        description="게임 상세 안에 넣을 수도 있지만, 확장성을 위해 별도 라우트로도 분리한 형태입니다."
        actions={
          <>
            <Link className="button button--primary" href={`/games/${game.slug}`}>
              게임 상세로 이동
            </Link>
            <Link className="button button--ghost" href={`/report?game=${game.slug}`}>
              버그 제보 / 신고
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Rating" title={`${game.rating.toFixed(1)} / 5.0`} meta={`${game.reviews.length} reviews`}>
            <p>초기 MVP 기준 댓글 중심 구조를 보여 주되, 평점 요약도 같은 맥락에서 노출합니다.</p>
          </Card>
        }
      />

      <Section eyebrow="All Reviews" title="플레이어 피드백" description="별점, 짧은 후기, 버그 제보 흐름을 한곳에 묶었습니다.">
        <div className={styles.stack}>
          {game.reviews.map((review) => (
            <Card eyebrow={review.author} key={`${review.author}-${review.createdAt}`} meta={review.createdAt} title={`${review.rating.toFixed(1)} / 5`}>
              <p>{review.body}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

export function GameDevlogPage({ slug }: { slug: string }) {
  const game = getGameBySlug(slug);

  if (!game) {
    return <EmptyState message="업데이트 노트를 찾을 수 없습니다." />;
  }

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Devlog"
        title={`${game.title} 업데이트 노트`}
        description="버전 추가, 버그 수정, 다음 예고를 플레이어와 계속 소통하는 공간으로 구성했습니다."
        actions={
          <>
            <Link className="button button--primary" href={`/games/${game.slug}`}>
              게임 상세 보기
            </Link>
            <Link className="button button--ghost" href={`/creators/${game.creatorSlug}`}>
              제작자 프로필
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Latest Version" title={game.version} meta={game.updatedAt}>
            <p>{game.changelog[0]?.summary}</p>
          </Card>
        }
      />

      <Section eyebrow="Timeline" title="버전 히스토리" description="별도 피드로 분리한 업데이트 기록입니다.">
        <Timeline items={game.changelog.map((entry) => ({ title: entry.version, body: entry.summary, meta: entry.date, bullets: entry.bullets }))} />
      </Section>
    </div>
  );
}

export function CreatorProfilePage({ slug }: { slug: string }) {
  const creator = getCreatorBySlug(slug);

  if (!creator) {
    return <EmptyState message="제작자 프로필을 찾을 수 없습니다." />;
  }

  const games = getGamesByCreator(slug);
  const stats = getCreatorStats(slug);

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Creator"
        title={creator.name}
        description={creator.bio}
        actions={
          <>
            <FollowButton creatorName={creator.name} creatorSlug={creator.slug} isSelf={creator.slug === currentUserSlug} />
            <Link className="button button--ghost" href={`/search?creator=${creator.slug}`}>
              제작자 검색 결과
            </Link>
          </>
        }
        aside={
          <Card eyebrow={creator.role} title={creator.pinnedLine} meta={creator.location}>
            <div className={styles.metaList}>
              <span>팔로워 {formatCompact(creator.followers)}</span>
              <span>팔로잉 {formatCompact(creator.following)}</span>
            </div>
            <div className={styles.tagRow}>
              {creator.specialties.map((specialty) => (
                <span className={styles.tag} key={specialty}>
                  {specialty}
                </span>
              ))}
            </div>
            <div className={styles.linkList}>
              {creator.links.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </Card>
        }
      />

      <MetricStrip items={stats} />

      <Section eyebrow="Featured Work" title="대표작" description="프로필에서도 대표작이 먼저 발견되도록 고정 영역을 둡니다.">
        <GameGrid games={games.filter((game) => game.slug === creator.featuredGameSlug)} />
      </Section>

      <Section eyebrow="Published Games" title="만든 게임 목록" description="창작자 프로필에서 공개된 프로젝트를 바로 탐색할 수 있도록 연결합니다.">
        <GameGrid games={games} />
      </Section>
    </div>
  );
}

export function PeoplePage() {
  const creators = getCreatorDirectory();
  const totalFollowers = creators.reduce((sum, creator) => sum + creator.followers, 0);
  const totalProjects = creators.reduce((sum, creator) => sum + creator.publicGameCount, 0);
  const cityCount = new Set(creators.map((creator) => creator.location)).size;

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="People"
        title="사람 찾기 / 팔로우"
        description="Epic의 친구 찾기와 itch/Steam 계열의 creator discovery 표면을 참고해, 이름 검색과 팔로우/팔로잉 관리를 한곳에 묶었습니다."
        actions={
          <>
            <Link className="button button--primary" href="/login?next=/people">
              로그인하고 팔로우
            </Link>
            <Link className="button button--ghost" href="/me">
              내 라이브러리
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Social Graph" title="플레이어와 제작자를 연결하는 사람 탐색 허브" meta="follow / following / discovery">
            <div className={styles.metaList}>
              <span>검색</span>
              <span>추천</span>
              <span>팔로잉</span>
            </div>
          </Card>
        }
      />

      <MetricStrip
        items={[
          { label: "등록 크리에이터", value: `${creators.length}` },
          { label: "공개 프로젝트", value: `${totalProjects}` },
          { label: "팔로워 합계", value: formatCompact(totalFollowers) },
          { label: "활동 도시", value: `${cityCount}` },
        ]}
      />

      <Section eyebrow="Directory" title="사람 검색과 팔로우 관리" description="이름, 역할, 도시, 태그로 찾고 바로 팔로우 상태를 바꿀 수 있습니다.">
        <PeopleDirectory currentUserSlug={currentUserSlug} entries={creators} />
      </Section>
    </div>
  );
}

export function MePage() {
  const currentUser = getCurrentUser();
  const library = getLibraryData();
  const creators = getCreatorDirectory();

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="My Space"
        title="내 프로필 / 내 라이브러리"
        description="플레이어와 제작자가 다시 돌아오게 만드는 개인 공간입니다. 최근 플레이, 즐겨찾기, 내가 올린 게임, 임시 저장 빌드를 한 번에 묶었습니다."
        actions={
          <>
            <Link className="button button--primary" href="/dashboard/games">
              내 게임 대시보드
            </Link>
            <Link className="button button--ghost" href="/settings">
              설정
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Profile" title={currentUser?.name ?? "My profile"} meta={currentUser?.handle ?? ""}>
            <p>{currentUser?.bio}</p>
          </Card>
        }
      />

      <Section eyebrow="Recent" title="최근 플레이한 게임" description="플레이어 성격의 개인 히스토리를 먼저 보여 줍니다.">
        <GameGrid games={library.recentGames} />
      </Section>

      <Section eyebrow="Favorites" title="즐겨찾기 / 좋아요" description="나중에 다시 돌아오게 만드는 개인 보관함입니다.">
        <div className={styles.detailColumns}>
          <Card eyebrow="Favorites" title="즐겨찾기" meta={`${library.favorites.length} games`}>
            <GameList games={library.favorites} />
          </Card>
          <Card eyebrow="Likes" title="좋아요 누른 게임" meta={`${library.likedGames.length} games`}>
            <GameList games={library.likedGames} />
          </Card>
        </div>
      </Section>

      <Section eyebrow="Creator Space" title="내가 올린 게임 / 임시 저장 빌드" description="플레이어 공간 안에서도 제작자 역할이 자연스럽게 이어지도록 붙였습니다.">
        <div className={styles.detailColumns}>
          <Card eyebrow="Uploads" title="내가 올린 게임" meta={`${library.uploadedGames.length} projects`}>
            <GameList games={library.uploadedGames} includeStatus />
          </Card>
          <Card eyebrow="Drafts" title="임시저장 빌드" meta={`${savedBuilds.length} saved`}>
            <div className={styles.stackCompact}>
              {library.savedBuilds.map((item) => (
                <article className={styles.inlineItem} key={item.id}>
                  <strong>{item.title}</strong>
                  <span>{item.updatedAt}</span>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Follows" title="팔로우 중인 제작자" description="창작자 생태계를 개인 공간과 연결합니다.">
        <FollowingOverview currentUserSlug={currentUserSlug} entries={creators} />
      </Section>
    </div>
  );
}

export function DashboardGamesPage() {
  const games = getCurrentUserGames();

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Dashboard"
        title="내 게임 대시보드"
        description="빌드와 퍼블리시를 상위에서 관리하는 제작자용 허브입니다."
        actions={
          <>
            <Link className="button button--primary" href="/build">
              새 게임 만들기
            </Link>
            <Link className="button button--ghost" href="/dashboard/analytics">
              분석 보기
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Creator Hub" title="초안 -> 비공개 -> 공개 흐름 관리" meta={`${games.length} projects`}>
            <p>게임 생성, 관리, 빌드, 퍼블리시 흐름을 한 축으로 연결했습니다.</p>
          </Card>
        }
      />

      <MetricStrip items={getDashboardStats()} />

      <Section eyebrow="Projects" title="내 프로젝트 목록" description="상태와 경고를 카드형 목록으로 보여 줍니다.">
        <div className={styles.stack}>
          {games.map((game) => (
            <Link className={`${styles.cardLink} ${styles.dashboardRow}`} href={`/dashboard/games/${game.slug}`} key={game.slug}>
              <div className={styles.dashboardLead}>
                <strong>{game.title}</strong>
                <span>{game.updatedAt}</span>
              </div>
              <div className={styles.dashboardMeta}>
                <span className={statusClassName(game.status)}>{visibilityLabel(game.status)}</span>
                <span>플레이 {formatCompact(game.plays)}</span>
                <span>{game.indexed ? "검색 노출 중" : "검색 비노출"}</span>
              </div>
              <div className={styles.warningList}>
                {(game.warnings.length > 0 ? game.warnings : ["경고 없음"]).map((warning) => (
                  <span key={warning}>{warning}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}

export function DashboardGameEditorPage({ slug }: { slug: string }) {
  const game = getGameBySlug(slug);

  if (!game) {
    return <EmptyState message="관리할 게임을 찾을 수 없습니다." />;
  }

  const tabs = ["기본정보", "실행 파일/빌드", "썸네일/미디어", "설명/조작법", "공개 설정", "버전/업데이트", "분석"];

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Game Editor"
        title={`${game.title} 관리 / 수정`}
        description="하나의 게임을 종합 편집하는 탭 기반 화면입니다."
        actions={
          <>
            <Link className="button button--primary" href="/publish">
              퍼블리시로 이동
            </Link>
            <Link className="button button--ghost" href={`/games/${game.slug}`}>
              공개 페이지 보기
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Status" title={visibilityLabel(game.status)} meta={game.updatedAt}>
            <div className={styles.warningList}>
              {(game.warnings.length > 0 ? game.warnings : ["퍼블리시 준비 완료"]).map((warning) => (
                <span key={warning}>{warning}</span>
              ))}
            </div>
          </Card>
        }
      />

      <Section eyebrow="Tabs" title="편집 탭 구조" description="게임 생성 -> 관리 -> 빌드 -> 퍼블리시 흐름을 한 눈에 보여 줍니다.">
        <div className={styles.chipRow}>
          {tabs.map((tab, index) => (
            <span className={`${styles.chip} ${index === 0 ? styles.chipActive : ""}`} key={tab}>
              {tab}
            </span>
          ))}
        </div>
      </Section>

      <Section eyebrow="Editor" title="현재 편집 상태" description="기본정보, 미디어, 공개 설정, 버전, 분석을 각각 카드로 쪼개어 관리합니다.">
        <div className={styles.cardGrid}>
          <Card eyebrow="Basic" title="기본정보" meta={game.genreLabel}>
            <div className={styles.metaList}>
              <span>제목: {game.title}</span>
              <span>한줄 소개: {game.oneLinePitch}</span>
              <span>태그: {game.tags.join(", ")}</span>
            </div>
          </Card>
          <Card eyebrow="Build" title="실행 파일 / 빌드" meta={game.spec.projectId}>
            <div className={styles.metaList}>
              <span>Template: {game.spec.template}</span>
              <span>Tileset: {game.spec.map.tilesetId}</span>
              <span>BGM: {game.spec.audio.bgm}</span>
            </div>
          </Card>
          <Card eyebrow="Media" title="썸네일 / 미디어" meta={`${game.media.length} assets`}>
            <p>{game.media[0]?.caption ?? "미디어가 아직 없습니다."}</p>
          </Card>
          <Card eyebrow="Publish" title="공개 설정" meta={visibilityLabel(game.status)}>
            <div className={styles.metaList}>
              <span>{game.indexed ? "검색 인덱싱 활성화" : "검색 인덱싱 비활성화"}</span>
              <span>대표 썸네일 검수 필요 여부 확인</span>
              <span>공유 카드 문구 점검</span>
            </div>
          </Card>
          <Card eyebrow="Version" title="버전 / 업데이트" meta={game.version}>
            <p>{game.changelog[0]?.summary}</p>
          </Card>
          <Card eyebrow="Analytics" title="분석" meta="7-day window">
            <div className={styles.metaList}>
              <span>플레이 {formatCompact(game.plays)}</span>
              <span>좋아요 {formatCompact(game.likes)}</span>
              <span>저장 {formatCompact(game.saves)}</span>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}

export function DashboardAnalyticsPage() {
  const games = getCurrentUserGames().filter((game) => game.status === "public");

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Analytics"
        title="제작자 분석"
        description="조회수, 플레이 수, 평균 플레이 시간, 완주율, 좋아요, 유입 경로, 버전별 성과를 보여 주는 제작자 분석 페이지입니다."
        actions={
          <>
            <Link className="button button--primary" href="/dashboard/games">
              프로젝트 관리로 이동
            </Link>
            <Link className="button button--ghost" href="/notifications">
              알림 보기
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Overview" title="최근 7일 성과" meta="Creator metrics">
            <p>공개 게임 기준 핵심 지표를 요약해서 보여 줍니다.</p>
          </Card>
        }
      />

      <MetricStrip items={getAnalyticsStats()} />

      <Section eyebrow="By Game" title="게임별 성과" description="버전과 플레이 수, 좋아요, 저장 수를 비교하는 카드 목록입니다.">
        <div className={styles.cardGrid}>
          {games.map((game) => (
            <Card eyebrow={game.version} key={game.slug} meta={game.updatedAt} title={game.title}>
              <div className={styles.metricMiniGrid}>
                <article>
                  <span>플레이</span>
                  <strong>{formatCompact(game.plays)}</strong>
                </article>
                <article>
                  <span>좋아요</span>
                  <strong>{formatCompact(game.likes)}</strong>
                </article>
                <article>
                  <span>저장</span>
                  <strong>{formatCompact(game.saves)}</strong>
                </article>
                <article>
                  <span>유입</span>
                  <strong>{game.tags.includes("browser") ? "Browse" : "Direct"}</strong>
                </article>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

export function LoginPage() {
  return (
    <AuthShell
      eyebrow="Login"
      title="로그인"
      description="플레이어와 제작자 모두 여기서 다시 들어옵니다. 데모용이므로 실제 인증 대신 필요한 필드만 표현했습니다."
      secondaryHref="/signup"
      secondaryLabel="회원가입"
    />
  );
}

export function SignupPage() {
  return (
    <AuthShell
      eyebrow="Sign Up"
      title="회원가입"
      description="양면 플랫폼답게 시작점이 플레이어인지 제작자인지 이후 온보딩으로 바로 이어지게 설계했습니다."
      secondaryHref="/onboarding"
      secondaryLabel="온보딩 보기"
    />
  );
}

export function OnboardingPage() {
  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Onboarding"
        title="첫 사용자 온보딩"
        description="플레이어로 시작할지 제작자로 시작할지 선택하게 해 양면 플랫폼의 진입 구조를 분리했습니다."
        actions={
          <>
            <button className="button button--primary" type="button">
              플레이어로 시작
            </button>
            <button className="button button--ghost" type="button">
              제작자로 시작
            </button>
          </>
        }
        aside={
          <Card eyebrow="Role Split" title="역할별 시작 흐름" meta="player / creator">
            <p>플레이어는 탐색과 라이브러리, 제작자는 빌드와 대시보드로 자연스럽게 이어집니다.</p>
          </Card>
        }
      />

      <Section eyebrow="Tracks" title="역할별 시작 경로" description="온보딩 카드 하나로 이후 동선을 분기합니다.">
        <div className={styles.cardGrid}>
          <Card eyebrow="Player" title="플레이어 시작" meta="/games -> /me">
            <ul className={styles.bulletList}>
              <li>추천 게임 탐색</li>
              <li>좋아요 / 즐겨찾기 저장</li>
              <li>최근 플레이와 알림 유지</li>
            </ul>
          </Card>
          <Card eyebrow="Creator" title="제작자 시작" meta="/build -> /dashboard">
            <ul className={styles.bulletList}>
              <li>첫 Game Spec 생성</li>
              <li>썸네일과 설명 정리</li>
              <li>대시보드에서 상태 관리</li>
            </ul>
          </Card>
        </div>
      </Section>
    </div>
  );
}

export function SettingsPage() {
  const sections = [
    "프로필 수정",
    "비밀번호 / 계정 보안",
    "알림 설정",
    "소셜 설정 / 팔로우 허용",
    "공개 범위",
    "계정 삭제",
    "제작자 정보 수정",
  ];

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Settings"
        title="설정"
        description="계정 보안, 공개 범위, 알림, 제작자 정보 등 실서비스 공개 전에 반드시 필요한 기본 설정 영역입니다."
        actions={
          <>
            <button className="button button--primary" type="button">
              변경사항 저장
            </button>
            <Link className="button button--ghost" href="/legal/privacy">
              개인정보 처리방침
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Account" title="공개 범위와 보안 관리" meta="profile / notifications / security">
            <p>개인 계정과 제작자 계정 설정을 한 축에서 관리하도록 구성했습니다.</p>
          </Card>
        }
      />

      <Section eyebrow="Preferences" title="설정 카테고리" description="최소 구성으로 필요한 설정 축을 모두 노출했습니다.">
        <div className={styles.cardGrid}>
          {sections.map((section) => (
            <Card eyebrow="Setting" key={section} title={section} meta="Mock form">
              <p>{section} 항목을 실제 폼으로 확장할 수 있도록 독립 카드 형태로 배치했습니다.</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

export function NotificationsPage() {
  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Notifications"
        title="알림"
        description="팔로우한 제작자의 신작, 댓글, 승인/반려, 좋아요/팔로우 등 커뮤니티형 플랫폼에 필요한 알림 축입니다."
        actions={
          <>
            <Link className="button button--primary" href="/me">
              내 라이브러리
            </Link>
            <Link className="button button--ghost" href="/settings">
              알림 설정
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Inbox" title={`${notifications.length}개 알림`} meta="creator / social / system">
            <p>콘텐츠 반응과 시스템 상태를 한곳에서 확인할 수 있게 했습니다.</p>
          </Card>
        }
      />

      <Section eyebrow="Feed" title="최근 알림" description="알림은 개인 공간과 제작자 운영 모두에 걸쳐 있어야 합니다.">
        <div className={styles.stack}>
          {notifications.map((notification) => (
            <Link className={`${styles.cardLink} ${styles.notificationRow}`} href={notification.href} key={notification.id}>
              <strong>{notification.title}</strong>
              <p>{notification.detail}</p>
              <span>{notification.time}</span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}

export function ReportPage({ game }: { game?: string }) {
  const selectedGame = game ? getGameBySlug(game) : undefined;

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Report"
        title="신고 / 모더레이션"
        description="UGC 플랫폼에서 최소한 사용자용 신고 폼은 반드시 필요합니다."
        actions={
          <>
            <button className="button button--primary" type="button">
              신고 제출
            </button>
            <Link className="button button--ghost" href="/help">
              도움말 보기
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Selected" title={selectedGame?.title ?? "대상 미선택"} meta="report form">
            <p>게임, 댓글, 사용자, 저작권 중 어떤 항목을 신고하는지 명확히 분리합니다.</p>
          </Card>
        }
      />

      <Section eyebrow="Report Types" title="신고 가능한 항목" description="초기에는 사용자용 신고 폼만 있어도 충분하도록 구성했습니다.">
        <div className={styles.cardGrid}>
          {["게임 신고", "댓글 신고", "사용자 차단", "저작권 신고", "연령 제한 / 부적절 콘텐츠"].map((item) => (
            <Card eyebrow="Case" key={item} title={item} meta="user-facing">
              <p>{item} 흐름을 운영자 큐와 연결할 수 있도록 별도 케이스로 분리했습니다.</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

export function HelpPage() {
  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Help"
        title="도움말 / 가이드"
        description="비개발자도 게임 만들기가 핵심인 서비스라면 빌드와 퍼블리시 과정을 문서로 별도 안내해야 합니다."
        actions={
          <>
            <Link className="button button--primary" href="/build">
              바로 만들기
            </Link>
            <Link className="button button--ghost" href="/legal">
              법적 문서 보기
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Guides" title={`${helpArticles.length}개 가이드`} meta="creator education">
            <p>처음 만들기, 퍼블리시, 썸네일, 저작권 등 초기 가이드를 분리했습니다.</p>
          </Card>
        }
      />

      <Section eyebrow="Articles" title="가이드 문서" description="도움말도 단일 문서가 아니라 목적별 카드로 나누는 것이 탐색에 유리합니다.">
        <div className={styles.cardGrid}>
          {helpArticles.map((article) => (
            <Card eyebrow="Guide" key={article.slug} meta={article.summary} title={article.title}>
              <ul className={styles.bulletList}>
                {article.sections.map((section) => (
                  <li key={section}>{section}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

export function LegalHubPage() {
  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Legal"
        title="법적 문서"
        description="이용약관, 개인정보처리방침, 쿠키 정책, 콘텐츠 정책, 저작권 정책을 별도 라우트로 분리할 준비가 된 허브입니다."
        actions={
          <>
            <Link className="button button--primary" href="/legal/terms">
              이용약관
            </Link>
            <Link className="button button--ghost" href="/legal/privacy">
              개인정보처리방침
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Compliance" title="실서비스 공개 전 필수 영역" meta={`${legalDocuments.length} documents`}>
            <p>법적 페이지는 푸터와 설정, 신고 페이지에서 모두 연결될 수 있도록 분리했습니다.</p>
          </Card>
        }
      />

      <Section eyebrow="Documents" title="문서 목록" description="각 문서는 허브와 개별 상세 페이지 양쪽에서 접근 가능합니다.">
        <div className={styles.cardGrid}>
          {legalDocuments.map((document) => (
            <Link className={`${styles.cardLink} ${styles.docCard}`} href={`/legal/${document.slug}`} key={document.slug}>
              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <span className={styles.cardEyebrow}>Document</span>
                  <span className={styles.cardMeta}>{document.slug}</span>
                </div>
                <strong>{document.title}</strong>
                <p>{document.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}

export function LegalDocumentPage({ slug }: { slug: string }) {
  const document = getLegalDocumentBySlug(slug);

  if (!document) {
    return <EmptyState message="문서를 찾을 수 없습니다." />;
  }

  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Legal Document"
        title={document.title}
        description={document.summary}
        actions={
          <>
            <Link className="button button--primary" href="/legal">
              법적 허브로 이동
            </Link>
            <Link className="button button--ghost" href="/report">
              신고 페이지
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Policy" title={document.slug} meta="latest mock draft">
            <p>실제 서비스 문안으로 바꾸기 전까지 구조와 연결성을 검증하는 목적의 목업 페이지입니다.</p>
          </Card>
        }
      />

      <Section eyebrow="Highlights" title="핵심 항목" description="긴 법률 문서를 직접 다 쓰지 않더라도, 페이지 구조와 핵심 포인트 요약은 먼저 잡아 둘 수 있습니다.">
        <div className={styles.stack}>
          {document.highlights.map((item) => (
            <Card eyebrow="Key Point" key={item} title={document.title} meta={document.slug}>
              <p>{item}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

export function AdminPage() {
  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Admin"
        title="관리자 페이지"
        description="게임 승인/숨김, 신고 처리, 유저 제재, 추천 선정, 태그 관리, 배너 관리 등 운영용 기능을 모아 둔 내부 허브입니다."
        actions={
          <>
            <button className="button button--primary" type="button">
              우선순위 높은 작업 보기
            </button>
            <Link className="button button--ghost" href="/report">
              사용자 신고 흐름 보기
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Ops" title={`${adminTasks.length}개 운영 작업`} meta="moderation / curation">
            <p>서비스가 UGC 플랫폼으로 갈수록 운영 툴의 질이 사용자 경험을 좌우합니다.</p>
          </Card>
        }
      />

      <Section eyebrow="Queue" title="운영 대기열" description="신고, 게임 승인, 태그 정리, 배너 관리 작업을 한 축으로 보여 줍니다.">
        <div className={styles.stack}>
          {adminTasks.map((task) => (
            <Card eyebrow={task.queue} key={task.id} title={task.title} meta={task.priority.toUpperCase()}>
              <p>{task.detail}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

function AuthShell({
  eyebrow,
  title,
  description,
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  return (
    <div className={styles.page}>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={
          <>
            <button className="button button--primary" type="button">
              계속하기
            </button>
            <Link className="button button--ghost" href={secondaryHref}>
              {secondaryLabel}
            </Link>
          </>
        }
        aside={
          <Card eyebrow="Entry" title="양면 플랫폼 공통 진입점" meta="auth / onboarding">
            <p>플레이어와 제작자가 같은 로그인 축에서 시작하지만, 이후 동선은 역할별로 갈라지게 설계했습니다.</p>
          </Card>
        }
      />

      <Section eyebrow="Form" title={`${title} 폼`} description="실제 API 연결 전 레이아웃과 정보 구조를 확인하기 위한 폼 목업입니다.">
        <div className={styles.formCard}>
          <label className={styles.field}>
            <span>이메일</span>
            <input defaultValue="demo@pixel.example" readOnly />
          </label>
          <label className={styles.field}>
            <span>비밀번호</span>
            <input defaultValue="password" readOnly type="password" />
          </label>
          <label className={styles.field}>
            <span>표시 이름</span>
            <input defaultValue="Pixel Creator" readOnly />
          </label>
        </div>
      </Section>
    </div>
  );
}

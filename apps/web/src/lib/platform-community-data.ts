import {
  getCreatorBySlug,
  getGameBySlug,
  type PlatformGame,
} from "@/lib/platform-data";

export type NewsKind = "devlog" | "release" | "platform";
export type JamStatus = "open" | "upcoming" | "judging" | "completed";

export interface NewsPost {
  slug: string;
  title: string;
  summary: string;
  kind: NewsKind;
  publishedAt: string;
  href: string;
  accent: string;
  gameSlug?: string;
  creatorSlug?: string;
  highlights: string[];
}

export interface JamEvent {
  slug: string;
  title: string;
  summary: string;
  theme: string;
  prompt: string;
  host: string;
  hostNote: string;
  status: JamStatus;
  startsAt: string;
  endsAt: string;
  prize: string;
  participants: number;
  submissions: number;
  accent: string;
  featuredGameSlugs: string[];
  rules: string[];
}

const newsPosts: NewsPost[] = [
  {
    slug: "browser-spring-sprint-open",
    title: "Browser Spring Sprint 참가 접수가 열렸습니다",
    summary: "짧은 세션과 반복 플레이에 강한 브라우저 게임을 모집하는 시즌 잼입니다.",
    kind: "platform",
    publishedAt: "2026-03-18",
    href: "/jams/browser-spring-sprint",
    accent: "linear-gradient(135deg, rgba(49, 130, 246, 0.18), rgba(255, 255, 255, 0.9))",
    highlights: ["2주 제작", "홈페이지 추천 슬롯", "운영팀 큐레이션 인터뷰"],
  },
  {
    slug: "forest-dash-leaderboard-pass",
    title: "Forest Dash가 리더보드용 러닝 라인을 다시 다듬었습니다",
    summary: "첫 20초 학습 구간을 줄이고 바로 리트라이하게 만드는 스피드런 패치를 배포했습니다.",
    kind: "devlog",
    publishedAt: "2026-03-17",
    href: "/games/forest-dash/devlog",
    accent: "linear-gradient(135deg, rgba(120, 204, 148, 0.22), rgba(255, 255, 255, 0.88))",
    gameSlug: "forest-dash",
    creatorSlug: "minho-park",
    highlights: ["튜토리얼 축소", "초반 점프 루프 수정", "기록 경쟁 강화"],
  },
  {
    slug: "haunted-signal-launch-week",
    title: "Haunted Signal이 추천 컬렉션에 올라갔습니다",
    summary: "런칭 첫 주 반응이 좋아 공포 큐레이션과 뉴스 허브 양쪽에 동시 노출됩니다.",
    kind: "release",
    publishedAt: "2026-03-16",
    href: "/games/haunted-signal",
    accent: "linear-gradient(135deg, rgba(255, 152, 122, 0.3), rgba(17, 24, 39, 0.12))",
    gameSlug: "haunted-signal",
    creatorSlug: "yuna-studio",
    highlights: ["큐레이션 선정", "런칭 주간 피처드", "공포 태그 반응 상승"],
  },
  {
    slug: "knight-in-the-cave-speedrun-patch",
    title: "Knight in the Cave 1.2.3 패치가 적용됐습니다",
    summary: "초반 코인 루트와 점프 타이밍을 보정해 다시 도전하기 좋은 흐름으로 정리했습니다.",
    kind: "devlog",
    publishedAt: "2026-03-16",
    href: "/games/knight-in-the-cave/devlog",
    accent: "linear-gradient(135deg, rgba(25, 81, 154, 0.24), rgba(255, 255, 255, 0.9))",
    gameSlug: "knight-in-the-cave",
    creatorSlug: "aria-cho",
    highlights: ["코인 배치 수정", "초반 난이도 다듬기", "스피드런 루프 유지"],
  },
  {
    slug: "creator-dashboard-checklist-update",
    title: "퍼블리시 체크리스트가 대시보드 흐름에 연결됐습니다",
    summary: "썸네일, 검색 노출, 업데이트 노트 누락 여부를 게임 관리 화면에서 바로 확인할 수 있습니다.",
    kind: "platform",
    publishedAt: "2026-03-15",
    href: "/dashboard/games",
    accent: "linear-gradient(135deg, rgba(91, 167, 255, 0.18), rgba(240, 247, 255, 0.94))",
    highlights: ["퍼블리시 준비 상태 표시", "경고 배지 정리", "관리 화면 연결 강화"],
  },
  {
    slug: "neon-night-run-trailer-refresh",
    title: "Neon Night Run 트레일러 컷과 설명 구성이 갱신됐습니다",
    summary: "상세 페이지 첫 화면에서 훅이 더 잘 보이도록 미디어 순서와 공유 문구를 정비했습니다.",
    kind: "release",
    publishedAt: "2026-03-14",
    href: "/games/neon-night-run",
    accent: "linear-gradient(135deg, rgba(56, 216, 255, 0.24), rgba(18, 33, 59, 0.18))",
    gameSlug: "neon-night-run",
    creatorSlug: "aria-cho",
    highlights: ["트레일러 리프레시", "공유 카드 문구 수정", "미디어 우선순위 조정"],
  },
  {
    slug: "safety-reporting-refresh",
    title: "신고 유형과 도움말 문서가 다시 정리됐습니다",
    summary: "저작권, 부적절 콘텐츠, 연령 제한 안내를 신고 플로우와 함께 묶어 사용자 이해를 높였습니다.",
    kind: "platform",
    publishedAt: "2026-03-13",
    href: "/help",
    accent: "linear-gradient(135deg, rgba(255, 205, 118, 0.22), rgba(255, 255, 255, 0.9))",
    highlights: ["신고 유형 분리", "법률 문서 연결", "운영 정책 설명 강화"],
  },
];

const jamEvents: JamEvent[] = [
  {
    slug: "browser-spring-sprint",
    title: "Browser Spring Sprint",
    summary: "설치 없이 바로 실행되는 짧은 세션용 게임을 모으는 봄 시즌 잼입니다.",
    theme: "One room, one loop",
    prompt: "플레이어가 30초 안에 규칙을 이해하고 다시 시작하고 싶어지는 게임",
    host: "Pixel Editorial",
    hostNote: "브라우저 플랫폼의 강점은 낮은 진입 장벽과 반복 플레이입니다. 첫 30초의 훅이 선명한 작품을 찾고 있습니다.",
    status: "open",
    startsAt: "2026-03-15",
    endsAt: "2026-03-29",
    prize: "홈 노출 슬롯 + 제작자 인터뷰",
    participants: 128,
    submissions: 42,
    accent: "linear-gradient(135deg, rgba(49, 130, 246, 0.24), rgba(255, 255, 255, 0.94))",
    featuredGameSlugs: ["knight-in-the-cave", "forest-dash", "neon-night-run"],
    rules: [
      "브라우저에서 10초 안에 첫 화면이 떠야 합니다.",
      "키보드 기준 기본 조작법을 상세 페이지에 반드시 적습니다.",
      "첫 플레이 3분 안에 핵심 루프가 드러나야 합니다.",
    ],
  },
  {
    slug: "cozy-campfire-jam",
    title: "Cozy Campfire Jam",
    summary: "긴장 대신 분위기와 리듬으로 붙잡는 편안한 브라우저 게임을 찾는 커뮤니티 잼입니다.",
    theme: "Warm loops for late-night play",
    prompt: "실패해도 다시 들어가고 싶은 따뜻한 분위기의 게임",
    host: "Community Picks",
    hostNote: "추천 피드에 오래 남는 게임은 종종 강한 경쟁보다 명확한 무드와 반복 가능한 리듬을 가집니다.",
    status: "upcoming",
    startsAt: "2026-04-04",
    endsAt: "2026-04-11",
    prize: "큐레이션 컬렉션 고정 + 커뮤니티 리뷰 세션",
    participants: 74,
    submissions: 0,
    accent: "linear-gradient(135deg, rgba(255, 168, 110, 0.22), rgba(255, 255, 255, 0.92))",
    featuredGameSlugs: ["pixel-pantry", "coop-constellation"],
    rules: [
      "과도한 텍스트 대신 화면 구성으로 분위기를 전달합니다.",
      "헤드폰 없이도 플레이 가능한 오디오 밸런스를 권장합니다.",
      "스크린샷 두 장만으로 게임의 무드를 설명할 수 있어야 합니다.",
    ],
  },
  {
    slug: "micro-speedrun-lab",
    title: "Micro Speedrun Lab",
    summary: "짧은 코스를 반복하며 기록을 줄여 나가는 작품을 모아 심사 중인 실험형 잼입니다.",
    theme: "Retry faster",
    prompt: "실패 즉시 다시 시작할 이유가 분명한 짧은 스테이지",
    host: "Creator Relations",
    hostNote: "랭킹과 스트리밍에 강한 게임은 리트라이 비용이 낮고 실패 이유가 명확합니다.",
    status: "judging",
    startsAt: "2026-03-01",
    endsAt: "2026-03-14",
    prize: "트렌딩 피처드 + 운영팀 피드백 세션",
    participants: 96,
    submissions: 57,
    accent: "linear-gradient(135deg, rgba(100, 199, 167, 0.22), rgba(255, 255, 255, 0.92))",
    featuredGameSlugs: ["forest-dash", "ember-rescue", "knight-in-the-cave"],
    rules: [
      "한 판 길이는 5분 이내를 권장합니다.",
      "실패 원인은 플레이어가 즉시 이해할 수 있어야 합니다.",
      "업데이트 노트에 밸런스 변경 내역을 남겨야 합니다.",
    ],
  },
  {
    slug: "night-shift-horror-jam",
    title: "Night Shift Horror Jam",
    summary: "짧은 플레이 안에서 긴장과 반전을 만드는 공포 작품을 모았던 시즌 잼입니다.",
    theme: "Signals in the dark",
    prompt: "시야, 사운드, 타이밍만으로 긴장감을 만드는 5분 체험",
    host: "Editorial Horror Desk",
    hostNote: "브라우저 공포 게임은 긴 러닝타임보다 즉시 전파되는 강한 장면과 사운드 설계가 중요합니다.",
    status: "completed",
    startsAt: "2026-02-08",
    endsAt: "2026-02-21",
    prize: "공포 컬렉션 메인 슬롯 + 특집 인터뷰",
    participants: 164,
    submissions: 88,
    accent: "linear-gradient(135deg, rgba(255, 152, 122, 0.26), rgba(17, 24, 39, 0.18))",
    featuredGameSlugs: ["haunted-signal", "lantern-echo"],
    rules: [
      "점프 스케어보다 분위기 설계를 우선합니다.",
      "경고 문구와 신고 경로를 공개 페이지에서 확인 가능해야 합니다.",
      "스크린샷만으로도 톤이 읽혀야 합니다.",
    ],
  },
];

export function getNewsPosts(kind?: NewsKind) {
  const posts = kind ? newsPosts.filter((post) => post.kind === kind) : newsPosts;
  return [...posts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getFeaturedNewsPosts() {
  return getNewsPosts().slice(0, 3);
}

export function getNewsRelatedGames() {
  const seen = new Set<string>();
  const games: PlatformGame[] = [];

  getNewsPosts().forEach((post) => {
    if (!post.gameSlug || seen.has(post.gameSlug)) {
      return;
    }

    const game = getGameBySlug(post.gameSlug);

    if (!game) {
      return;
    }

    seen.add(post.gameSlug);
    games.push(game);
  });

  return games;
}

export function getNewsMetrics() {
  return {
    total: newsPosts.length,
    devlogs: newsPosts.filter((post) => post.kind === "devlog").length,
    releases: newsPosts.filter((post) => post.kind === "release").length,
    platform: newsPosts.filter((post) => post.kind === "platform").length,
  };
}

export function getJamEvents(status?: JamStatus) {
  return status ? jamEvents.filter((jam) => jam.status === status) : [...jamEvents];
}

export function getJamBySlug(slug: string) {
  return jamEvents.find((jam) => jam.slug === slug);
}

export function getJamFeaturedGames(jam: JamEvent) {
  return jam.featuredGameSlugs
    .map((slug) => getGameBySlug(slug))
    .filter((game): game is PlatformGame => Boolean(game));
}

export function getJamMetrics() {
  return {
    total: jamEvents.length,
    open: jamEvents.filter((jam) => jam.status === "open" || jam.status === "judging").length,
    participants: jamEvents.reduce((sum, jam) => sum + jam.participants, 0),
    submissions: jamEvents.reduce((sum, jam) => sum + jam.submissions, 0),
  };
}

export function getNewsAuthors(post: NewsPost) {
  return post.creatorSlug ? getCreatorBySlug(post.creatorSlug) : undefined;
}

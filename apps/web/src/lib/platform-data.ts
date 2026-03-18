import type { GameSpec, ThemeId } from "@pixel/contracts";

export type GameVisibility = "public" | "unlisted" | "draft";
export type GameSort = "popular" | "latest" | "rating" | "plays";
export type MediaKind = "screenshot" | "gif" | "trailer";

export interface PlatformGame {
  slug: string;
  title: string;
  hook: string;
  oneLinePitch: string;
  blurb: string;
  tagline: string;
  description: string;
  genreLabel: string;
  genreSlug: string;
  theme: ThemeId;
  creatorSlug: string;
  tags: string[];
  rating: number;
  plays: number;
  likes: number;
  saves: number;
  releasedAt: string;
  updatedAt: string;
  version: string;
  playTime: string;
  audience: string;
  featuredReason: string;
  recommendationReason: string;
  status: GameVisibility;
  indexed: boolean;
  warnings: string[];
  controls: string[];
  media: Array<{
    title: string;
    kind: MediaKind;
    caption: string;
    accent: string;
  }>;
  changelog: Array<{
    version: string;
    date: string;
    summary: string;
    bullets: string[];
  }>;
  reviews: Array<{
    author: string;
    rating: number;
    body: string;
    createdAt: string;
  }>;
  spec: GameSpec;
}

export interface CreatorProfile {
  slug: string;
  name: string;
  handle: string;
  bio: string;
  role: string;
  location: string;
  accent: string;
  pinnedLine: string;
  featuredGameSlug: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export interface TagDefinition {
  slug: string;
  label: string;
  kind: "genre" | "tag";
  description: string;
  accent: string;
}

export interface CuratedCollection {
  slug: string;
  title: string;
  description: string;
  curator: string;
  theme: string;
  note: string;
  gameSlugs: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  type: "creator" | "system" | "social" | "review";
  href: string;
}

export interface HelpArticle {
  slug: string;
  title: string;
  summary: string;
  sections: string[];
}

export interface LegalDocument {
  slug: string;
  title: string;
  summary: string;
  highlights: string[];
}

export interface SavedBuild {
  id: string;
  title: string;
  updatedAt: string;
  status: "draft" | "review" | "ready";
  note: string;
}

export interface AdminTask {
  id: string;
  title: string;
  queue: string;
  priority: "high" | "medium" | "low";
  detail: string;
}

type CharacterId = GameSpec["player"]["characterId"];
type EnemyId = GameSpec["enemies"][number]["type"];

const themePresets: Record<
  ThemeId,
  {
    label: string;
    gradient: string;
    stage: string;
    tilesetId: string;
    bgm: string;
    enemyType: EnemyId;
  }
> = {
  cave: {
    label: "동굴",
    gradient: "linear-gradient(135deg, #162031 0%, #325377 100%)",
    stage: "linear-gradient(180deg, rgba(22, 32, 49, 0.98), rgba(50, 83, 119, 0.92))",
    tilesetId: "cave_tileset_01",
    bgm: "bgm_cave",
    enemyType: "slime",
  },
  forest: {
    label: "숲",
    gradient: "linear-gradient(135deg, #173726 0%, #60a561 100%)",
    stage: "linear-gradient(180deg, rgba(23, 55, 38, 0.98), rgba(96, 165, 97, 0.88))",
    tilesetId: "forest_tileset_01",
    bgm: "bgm_forest",
    enemyType: "bat",
  },
  neon: {
    label: "네온",
    gradient: "linear-gradient(135deg, #12213b 0%, #38d8ff 100%)",
    stage: "linear-gradient(180deg, rgba(18, 33, 59, 0.98), rgba(56, 216, 255, 0.86))",
    tilesetId: "neon_tileset_01",
    bgm: "bgm_neon",
    enemyType: "drone",
  },
  volcano: {
    label: "화산",
    gradient: "linear-gradient(135deg, #461d17 0%, #ff8c4a 100%)",
    stage: "linear-gradient(180deg, rgba(70, 29, 23, 0.98), rgba(255, 140, 74, 0.84))",
    tilesetId: "volcano_tileset_01",
    bgm: "bgm_volcano",
    enemyType: "ember",
  },
};

const creators: CreatorProfile[] = [
  {
    slug: "aria-cho",
    name: "Aria Cho",
    handle: "@ariacho",
    bio: "픽셀 액션과 빠른 세션형 브라우저 게임을 만드는 솔로 크리에이터. 완성도 높은 튜토리얼과 재플레이 루프를 중요하게 봅니다.",
    role: "Solo creator",
    location: "Seoul",
    accent: "linear-gradient(135deg, rgba(49, 130, 246, 0.24), rgba(91, 167, 255, 0.06))",
    pinnedLine: "짧게 시작해서 여러 번 다시 하게 만드는 템포를 설계합니다.",
    featuredGameSlug: "knight-in-the-cave",
    links: [
      { label: "X", href: "https://example.com/aria-x" },
      { label: "YouTube", href: "https://example.com/aria-youtube" },
      { label: "Devlog", href: "/games/knight-in-the-cave/devlog" },
    ],
  },
  {
    slug: "minho-park",
    name: "Minho Park",
    handle: "@minho",
    bio: "퍼즐과 이동감 사이의 균형을 연구하는 제작자. 브라우저에서 직관적으로 이해되는 규칙을 선호합니다.",
    role: "System designer",
    location: "Busan",
    accent: "linear-gradient(135deg, rgba(120, 204, 148, 0.26), rgba(255, 255, 255, 0.06))",
    pinnedLine: "첫 30초에 규칙이 이해되는 게임을 만듭니다.",
    featuredGameSlug: "forest-dash",
    links: [
      { label: "Portfolio", href: "https://example.com/minho" },
      { label: "Discord", href: "https://example.com/minho-discord" },
      { label: "Creator Hub", href: "/creators/minho-park" },
    ],
  },
  {
    slug: "yuna-studio",
    name: "Yuna Studio",
    handle: "@yunastudio",
    bio: "짧은 호러 세션과 분위기 연출에 집중하는 소규모 팀. GIF 한 장으로도 세계관이 읽히는 게임을 만듭니다.",
    role: "Mood team",
    location: "Incheon",
    accent: "linear-gradient(135deg, rgba(255, 171, 94, 0.28), rgba(17, 24, 39, 0.08))",
    pinnedLine: "플레이 전부터 기억에 남는 분위기를 쌓는 팀입니다.",
    featuredGameSlug: "haunted-signal",
    links: [
      { label: "TikTok", href: "https://example.com/yuna-tiktok" },
      { label: "Press Kit", href: "https://example.com/yuna-press" },
      { label: "Creator Hub", href: "/creators/yuna-studio" },
    ],
  },
  {
    slug: "studio-duo",
    name: "Studio Duo",
    handle: "@studioduo",
    bio: "2인용 브라우저 코옵과 관전 재미를 함께 설계하는 팀. 짧은 플레이에도 서로의 차이가 드러나는 시스템을 좋아합니다.",
    role: "Co-op team",
    location: "Daegu",
    accent: "linear-gradient(135deg, rgba(180, 143, 255, 0.22), rgba(66, 153, 225, 0.08))",
    pinnedLine: "협동 게임은 규칙보다 리액션이 먼저 읽혀야 한다고 믿습니다.",
    featuredGameSlug: "coop-constellation",
    links: [
      { label: "Instagram", href: "https://example.com/studioduo-instagram" },
      { label: "Merch", href: "https://example.com/studioduo-shop" },
      { label: "Creator Hub", href: "/creators/studio-duo" },
    ],
  },
];

function makeSpec(options: {
  projectId: string;
  title: string;
  description: string;
  theme: ThemeId;
  characterId: CharacterId;
  requiredCoins: number;
  enemyCount: number;
  jumpPower: number;
  hp: number;
  moveSpeed: number;
  levelPreset: string;
  sfxPack: string;
}): GameSpec {
  const preset = themePresets[options.theme];

  return {
    projectId: options.projectId,
    template: "platformer_basic",
    theme: options.theme,
    player: {
      characterId: options.characterId,
      moveSpeed: options.moveSpeed,
      jumpPower: options.jumpPower,
      hp: options.hp,
    },
    goal: {
      type: "reach_exit_after_collect",
      requiredCoins: options.requiredCoins,
    },
    enemies: [
      {
        type: preset.enemyType,
        count: options.enemyCount,
        speed: Math.min(150, 70 + options.enemyCount * 10),
      },
    ],
    items: [
      {
        type: "coin",
        count: options.requiredCoins + 2,
      },
    ],
    map: {
      tilesetId: preset.tilesetId,
      levelPreset: options.levelPreset,
    },
    ui: {
      showHp: true,
      showCoinCount: true,
    },
    audio: {
      bgm: preset.bgm,
      sfxPack: options.sfxPack,
    },
    publish: {
      title: options.title,
      description: options.description,
    },
  };
}

const allGames: PlatformGame[] = [
  {
    slug: "knight-in-the-cave",
    title: "Knight in the Cave",
    hook: "인기 액션 플랫포머",
    oneLinePitch: "10개의 코인을 모아 탈출하는 하이리텐션 플랫폼 액션",
    blurb: "짧은 세션 안에 점프, 수집, 탈출 루프가 빠르게 돌아가는 대표 데모 게임입니다.",
    tagline: "입문 유저도 바로 이해하는 템포형 플랫폼 액션",
    description:
      "튜토리얼 없이도 조작이 읽히는 구조를 목표로 설계된 데모입니다. 코인 수집, 적 회피, 출구 도달의 루프를 짧게 압축했고, 첫 1분 안에 게임의 훅을 이해하도록 만들어졌습니다.",
    genreLabel: "액션 플랫포머",
    genreSlug: "action",
    theme: "cave",
    creatorSlug: "aria-cho",
    tags: ["solo", "pixel-art", "browser", "speedrun"],
    rating: 4.8,
    plays: 18240,
    likes: 3240,
    saves: 1340,
    releasedAt: "2026-02-12",
    updatedAt: "2026-03-16",
    version: "1.2.3",
    playTime: "3-5분",
    audience: "캐주얼 액션 팬",
    featuredReason: "플랫폼 진입 유저가 가장 빠르게 서비스 톤을 이해하는 대표작입니다.",
    recommendationReason: "빌드 스튜디오와 퍼블리시 흐름이 가장 잘 연결되는 기본 레퍼런스입니다.",
    status: "public",
    indexed: true,
    warnings: [],
    controls: ["이동: A / D 또는 ← / →", "점프: Space", "목표: 코인 10개를 모은 뒤 출구 도달"],
    media: [
      {
        title: "게임 플레이 화면",
        kind: "screenshot",
        caption: "HUD와 출구 동선이 한 장면 안에서 바로 읽히는 대표 구간",
        accent: themePresets.cave.gradient,
      },
      {
        title: "점프 타이밍 GIF",
        kind: "gif",
        caption: "짧은 루프 안에서 템포가 올라가는 코인 구간",
        accent: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(91, 167, 255, 0.4))",
      },
      {
        title: "트레일러 컷",
        kind: "trailer",
        caption: "30초 길이의 핵심 플레이 요약 트레일러",
        accent: "linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(49, 130, 246, 0.8))",
      },
    ],
    changelog: [
      {
        version: "1.2.3",
        date: "2026-03-16",
        summary: "초반 난이도와 점프 판정을 미세 조정했습니다.",
        bullets: ["1스테이지 적 배치 1개 감소", "점프 직후 착지 판정 여유폭 확대", "출구 직전 코인 배치 리듬 개선"],
      },
      {
        version: "1.2.0",
        date: "2026-03-08",
        summary: "공유 카드와 썸네일 카피를 업데이트했습니다.",
        bullets: ["대표 썸네일 교체", "한줄 소개 문구 정리", "공개 플레이 링크 고정"],
      },
    ],
    reviews: [
      {
        author: "playjin",
        rating: 5,
        body: "첫 10초 안에 규칙이 이해되고 다시 하게 만드는 속도가 좋았습니다.",
        createdAt: "2026-03-15",
      },
      {
        author: "cavefan",
        rating: 4,
        body: "코인 루트가 잘 보여서 방송용으로도 괜찮습니다. 후반 한 번 더 꼬이면 더 재밌을 듯합니다.",
        createdAt: "2026-03-13",
      },
    ],
    spec: makeSpec({
      projectId: "proj_001",
      title: "Knight in the Cave",
      description: "동굴 테마에서 10개의 코인을 모아 탈출하는 액션 플랫포머",
      theme: "cave",
      characterId: "hero_knight",
      requiredCoins: 10,
      enemyCount: 3,
      jumpPower: 420,
      hp: 3,
      moveSpeed: 180,
      levelPreset: "short_intro_stage",
      sfxPack: "platformer_sfx_basic",
    }),
  },
  {
    slug: "forest-dash",
    title: "Forest Dash",
    hook: "최신 스피드러너",
    oneLinePitch: "빨리 달릴수록 리듬이 살아나는 숲 테마 러너",
    blurb: "시작과 동시에 질주감을 주는 템포형 게임으로, 짧은 리트라이 동선이 강점입니다.",
    tagline: "숲 지형의 이동감과 연속 점프를 밀어붙이는 러너",
    description:
      "길게 읽지 않아도 되는 규칙과 뚜렷한 리듬을 가진 브라우저 러너입니다. 속도를 유지할수록 맵 구조가 보이고, 코스 이해도가 실력으로 연결되도록 설계했습니다.",
    genreLabel: "스피드 러너",
    genreSlug: "action",
    theme: "forest",
    creatorSlug: "minho-park",
    tags: ["solo", "browser", "speedrun", "pixel-art"],
    rating: 4.6,
    plays: 9640,
    likes: 1740,
    saves: 720,
    releasedAt: "2026-02-28",
    updatedAt: "2026-03-17",
    version: "0.9.8",
    playTime: "2-4분",
    audience: "스피드런 지향 유저",
    featuredReason: "최신 공개작 중 가장 빠르게 회전하는 플레이 데이터가 쌓이고 있습니다.",
    recommendationReason: "짧은 러너 구조라 모바일 데모와도 연결하기 좋습니다.",
    status: "public",
    indexed: true,
    warnings: [],
    controls: ["이동: A / D", "점프: Space", "목표: 숲 코스를 끊기지 않고 완주"],
    media: [
      {
        title: "캐노피 질주",
        kind: "screenshot",
        caption: "속도가 올라갈수록 길이 시각적으로 열리는 구간",
        accent: themePresets.forest.gradient,
      },
      {
        title: "연속 점프 GIF",
        kind: "gif",
        caption: "점프 3연속 구간의 속도감 테스트 컷",
        accent: "linear-gradient(135deg, rgba(23, 55, 38, 0.96), rgba(136, 214, 124, 0.72))",
      },
    ],
    changelog: [
      {
        version: "0.9.8",
        date: "2026-03-17",
        summary: "튜토리얼 텍스트를 제거하고 시작 동선을 더 단순화했습니다.",
        bullets: ["첫 점프 구간 시인성 개선", "숲 배경 레이어 정리", "완주 시간 UI 정렬 수정"],
      },
    ],
    reviews: [
      {
        author: "runner_52",
        rating: 5,
        body: "속도감이 좋아서 계속 기록 갱신하게 됩니다.",
        createdAt: "2026-03-17",
      },
      {
        author: "quietleaf",
        rating: 4,
        body: "배경이 예쁘고 리트라이가 빨라서 스트레스가 적어요.",
        createdAt: "2026-03-11",
      },
    ],
    spec: makeSpec({
      projectId: "proj_002",
      title: "Forest Dash",
      description: "숲 지형을 빠르게 질주하는 스피드 러너",
      theme: "forest",
      characterId: "shadow_ninja",
      requiredCoins: 12,
      enemyCount: 4,
      jumpPower: 460,
      hp: 3,
      moveSpeed: 210,
      levelPreset: "canopy_dash_stage",
      sfxPack: "forest_sfx_light",
    }),
  },
  {
    slug: "neon-night-run",
    title: "Neon Night Run",
    hook: "추천 리듬 액션",
    oneLinePitch: "리듬감 있는 네온 스테이지를 파고드는 하이브리드 러너",
    blurb: "반응 속도와 빛의 리듬이 맞물리는 도시형 네온 액션 데모입니다.",
    tagline: "트레일러 한 컷만으로도 감도가 전달되는 네온 액션",
    description:
      "플레이 템포와 시각 이펙트를 함께 밀어 올린 데모입니다. 짧은 플레이 시간 안에서도 도시의 분위기와 루프 구조가 선명하게 남도록 구성했습니다.",
    genreLabel: "리듬 액션",
    genreSlug: "action",
    theme: "neon",
    creatorSlug: "aria-cho",
    tags: ["solo", "browser", "pixel-art", "trending"],
    rating: 4.9,
    plays: 14320,
    likes: 2980,
    saves: 1260,
    releasedAt: "2026-01-30",
    updatedAt: "2026-03-14",
    version: "2.0.1",
    playTime: "4-6분",
    audience: "네온 미학과 템포 액션 팬",
    featuredReason: "좋아요 전환율이 높아 추천 섹션 대표작으로 쓰기 좋습니다.",
    recommendationReason: "트레일러와 썸네일, 상세 설명 구성이 모두 완성형에 가깝습니다.",
    status: "public",
    indexed: true,
    warnings: [],
    controls: ["이동: ← / →", "점프: Space", "목표: 네온 루프에서 실수 없이 탈출"],
    media: [
      {
        title: "도시 루프 스크린샷",
        kind: "screenshot",
        caption: "네온 배경과 움직임이 동시에 읽히는 메인 장면",
        accent: themePresets.neon.gradient,
      },
      {
        title: "트레일러 클립",
        kind: "trailer",
        caption: "도시형 네온 테마를 강조한 20초 프리뷰",
        accent: "linear-gradient(135deg, rgba(14, 28, 52, 0.98), rgba(62, 227, 255, 0.78))",
      },
    ],
    changelog: [
      {
        version: "2.0.1",
        date: "2026-03-14",
        summary: "루프 마지막 구간의 판정과 라이팅을 정리했습니다.",
        bullets: ["드론 이동 속도 보정", "트레일러 썸네일 리프레시", "상세 설명에 조작 힌트 추가"],
      },
      {
        version: "2.0.0",
        date: "2026-03-02",
        summary: "네온 시즌 업데이트로 맵 구조를 전체 리빌드했습니다.",
        bullets: ["루프 후반부 구조 재설계", "배경 애니메이션 강화", "저장 수 기반 추천 카드 노출"],
      },
    ],
    reviews: [
      {
        author: "synthbyte",
        rating: 5,
        body: "시각적인 톤이 확실하고 리듬감이 강해서 공유하기 좋았습니다.",
        createdAt: "2026-03-14",
      },
      {
        author: "lazyowl",
        rating: 5,
        body: "한 판만 하려고 했다가 계속 다시 켰습니다.",
        createdAt: "2026-03-10",
      },
    ],
    spec: makeSpec({
      projectId: "proj_003",
      title: "Neon Night Run",
      description: "도시형 네온 루프를 질주하는 리듬 액션",
      theme: "neon",
      characterId: "clockwork_robot",
      requiredCoins: 18,
      enemyCount: 5,
      jumpPower: 440,
      hp: 4,
      moveSpeed: 220,
      levelPreset: "rooftop_sprint_stage",
      sfxPack: "future_sfx_arcade",
    }),
  },
  {
    slug: "haunted-signal",
    title: "Haunted Signal",
    hook: "분위기형 공포 추천",
    oneLinePitch: "짧은 공포 세션으로 긴장감을 압축한 픽셀 호러",
    blurb: "픽셀 조명과 라디오 신호를 활용해 긴장감을 만드는 브라우저 호러 데모입니다.",
    tagline: "플레이 전 이미지 한 장으로도 긴장감을 주는 공포 데모",
    description:
      "짧은 플레이 타임 안에서 분위기를 세우는 데 집중한 호러 게임입니다. 소리 단서와 미묘한 화면 변화가 플레이어를 이끌고, 세션이 끝난 뒤에도 장면이 기억에 남도록 구성했습니다.",
    genreLabel: "픽셀 호러",
    genreSlug: "horror",
    theme: "volcano",
    creatorSlug: "yuna-studio",
    tags: ["solo", "browser", "pixel-art", "horror"],
    rating: 4.7,
    plays: 8360,
    likes: 2020,
    saves: 1010,
    releasedAt: "2026-02-21",
    updatedAt: "2026-03-12",
    version: "1.1.0",
    playTime: "5-7분",
    audience: "분위기형 호러 팬",
    featuredReason: "썸네일과 상세 설명의 결이 명확해 메인 큐레이션에 잘 맞습니다.",
    recommendationReason: "공포 태그와 브라우저 태그의 교집합 대표작입니다.",
    status: "public",
    indexed: true,
    warnings: [],
    controls: ["이동: W / A / S / D", "상호작용: E", "목표: 라디오 신호를 따라 탈출"],
    media: [
      {
        title: "라디오 신호 장면",
        kind: "screenshot",
        caption: "불길한 조명과 오브젝트가 동시에 보이는 핵심 컷",
        accent: "linear-gradient(135deg, #201312 0%, #8f3b2f 100%)",
      },
      {
        title: "점멸 GIF",
        kind: "gif",
        caption: "라디오 노이즈에 반응하는 화면 변화 테스트",
        accent: "linear-gradient(135deg, rgba(32, 19, 18, 0.98), rgba(177, 77, 63, 0.7))",
      },
    ],
    changelog: [
      {
        version: "1.1.0",
        date: "2026-03-12",
        summary: "신호 추적 구간과 엔딩 연출을 보강했습니다.",
        bullets: ["라디오 노이즈 시점 전환 추가", "공포 태그 설명 정리", "트레일러 프레임 교체"],
      },
    ],
    reviews: [
      {
        author: "moondust",
        rating: 5,
        body: "짧은데도 장면이 오래 남는 공포감이 좋았습니다.",
        createdAt: "2026-03-12",
      },
      {
        author: "catradio",
        rating: 4,
        body: "조작은 단순한데 분위기가 잘 살아있어요.",
        createdAt: "2026-03-09",
      },
    ],
    spec: makeSpec({
      projectId: "proj_004",
      title: "Haunted Signal",
      description: "라디오 신호를 따라 탈출하는 픽셀 호러 데모",
      theme: "volcano",
      characterId: "pixel_cat",
      requiredCoins: 9,
      enemyCount: 2,
      jumpPower: 360,
      hp: 2,
      moveSpeed: 160,
      levelPreset: "volcano_escape_stage",
      sfxPack: "volcano_sfx_heavy",
    }),
  },
  {
    slug: "coop-constellation",
    title: "Co-op Constellation",
    hook: "2인용 협동 추천",
    oneLinePitch: "두 명이 호흡을 맞춰 루트를 만드는 브라우저 코옵",
    blurb: "협동 퍼즐과 이동이 같이 돌아가는 2인용 브라우저 실험작입니다.",
    tagline: "두 플레이어의 역할 차이가 바로 보이는 협동 데모",
    description:
      "관전만 해도 규칙이 보이는 협동 게임을 목표로 설계했습니다. 한 명은 길을 만들고, 다른 한 명은 타이밍을 맞추며 전진하는 방식으로 진행됩니다.",
    genreLabel: "협동 퍼즐 액션",
    genreSlug: "puzzle",
    theme: "neon",
    creatorSlug: "studio-duo",
    tags: ["co-op", "browser", "pixel-art", "party"],
    rating: 4.5,
    plays: 6120,
    likes: 1180,
    saves: 690,
    releasedAt: "2026-02-09",
    updatedAt: "2026-03-11",
    version: "0.8.6",
    playTime: "8-12분",
    audience: "친구와 함께 하는 협동 유저",
    featuredReason: "리텐션보다 회자성을 만드는 타입이라 큐레이션과 잘 맞습니다.",
    recommendationReason: "2인용 태그를 대표하는 브라우저 게임입니다.",
    status: "public",
    indexed: true,
    warnings: [],
    controls: ["Player 1: W / A / S / D", "Player 2: 방향키", "목표: 별자리를 완성하고 포탈 열기"],
    media: [
      {
        title: "협동 스테이지",
        kind: "screenshot",
        caption: "두 캐릭터의 위치와 역할이 한 번에 읽히는 메인 화면",
        accent: "linear-gradient(135deg, rgba(26, 35, 72, 1), rgba(149, 113, 255, 0.8))",
      },
    ],
    changelog: [
      {
        version: "0.8.6",
        date: "2026-03-11",
        summary: "관전 모드와 코옵 안내 문구를 다듬었습니다.",
        bullets: ["역할별 튜토리얼 문구 정리", "별자리 완료 애니메이션 조정", "공유 카드 문장 재작성"],
      },
    ],
    reviews: [
      {
        author: "duo_gamer",
        rating: 5,
        body: "친구랑 같이 할 때 리액션이 크게 나와서 재밌습니다.",
        createdAt: "2026-03-11",
      },
      {
        author: "solo_watch",
        rating: 4,
        body: "관전만 해도 룰이 보여서 스트리밍용으로 괜찮아요.",
        createdAt: "2026-03-06",
      },
    ],
    spec: makeSpec({
      projectId: "proj_005",
      title: "Co-op Constellation",
      description: "둘이 협력해 별자리를 완성하는 코옵 브라우저 게임",
      theme: "neon",
      characterId: "hero_knight",
      requiredCoins: 14,
      enemyCount: 4,
      jumpPower: 410,
      hp: 4,
      moveSpeed: 190,
      levelPreset: "rooftop_sprint_stage",
      sfxPack: "future_sfx_arcade",
    }),
  },
  {
    slug: "pixel-pantry",
    title: "Pixel Pantry",
    hook: "편안한 퍼즐 추천",
    oneLinePitch: "짧고 귀여운 재료 정리 퍼즐",
    blurb: "정리, 조합, 제한 시간의 균형이 가벼운 퍼즐 게임입니다.",
    tagline: "플레이 진입장벽이 낮은 브라우저 퍼즐",
    description:
      "복잡한 설명 없이도 바로 플레이가 가능한 정리형 퍼즐입니다. 픽셀 주방 테마와 직관적인 조작 덕분에 짧은 세션 반복에 잘 어울립니다.",
    genreLabel: "캐주얼 퍼즐",
    genreSlug: "puzzle",
    theme: "forest",
    creatorSlug: "minho-park",
    tags: ["solo", "browser", "puzzle", "pixel-art"],
    rating: 4.4,
    plays: 7420,
    likes: 1260,
    saves: 580,
    releasedAt: "2026-02-03",
    updatedAt: "2026-03-10",
    version: "1.0.4",
    playTime: "4-8분",
    audience: "가벼운 퍼즐 유저",
    featuredReason: "액션 계열이 아닌 브라우저 퍼즐 대표작으로 균형을 잡아줍니다.",
    recommendationReason: "짧은 플레이와 부드러운 분위기로 추천 전환이 좋습니다.",
    status: "public",
    indexed: true,
    warnings: [],
    controls: ["이동: 방향키", "정리: Space", "목표: 재료를 시간 안에 정렬"],
    media: [
      {
        title: "주방 퍼즐 보드",
        kind: "screenshot",
        caption: "색과 오브젝트를 한눈에 읽을 수 있는 보드 장면",
        accent: "linear-gradient(135deg, rgba(29, 83, 44, 0.96), rgba(156, 214, 137, 0.84))",
      },
    ],
    changelog: [
      {
        version: "1.0.4",
        date: "2026-03-10",
        summary: "튜토리얼 애니메이션과 보드 대비를 개선했습니다.",
        bullets: ["재료 아이콘 대비 수정", "퍼즐 실패 피드백 보강", "저장용 대표 이미지 교체"],
      },
    ],
    reviews: [
      {
        author: "pantryday",
        rating: 4,
        body: "짧게 하기 좋고 귀여워서 자꾸 켜게 됩니다.",
        createdAt: "2026-03-10",
      },
      {
        author: "looper",
        rating: 5,
        body: "스트레스 없이 반복하기 좋았어요.",
        createdAt: "2026-03-08",
      },
    ],
    spec: makeSpec({
      projectId: "proj_006",
      title: "Pixel Pantry",
      description: "재료를 정렬해 점수를 올리는 캐주얼 퍼즐",
      theme: "forest",
      characterId: "pixel_cat",
      requiredCoins: 8,
      enemyCount: 1,
      jumpPower: 320,
      hp: 3,
      moveSpeed: 160,
      levelPreset: "canopy_dash_stage",
      sfxPack: "forest_sfx_light",
    }),
  },
  {
    slug: "lantern-echo",
    title: "Lantern Echo",
    hook: "비공개 테스트중",
    oneLinePitch: "공개 직전 단계의 분위기형 네온 탐색작",
    blurb: "내부 링크로만 공유 중인 테스트 빌드입니다.",
    tagline: "링크를 아는 사람만 들어오는 언리스트 프로젝트",
    description:
      "크리에이터가 공개 전 마지막 검수를 위해 유지 중인 언리스트 게임입니다. 미디어와 설명은 거의 완성됐지만 검색 인덱싱은 아직 열지 않았습니다.",
    genreLabel: "탐색 액션",
    genreSlug: "action",
    theme: "neon",
    creatorSlug: "aria-cho",
    tags: ["solo", "browser", "trending"],
    rating: 4.3,
    plays: 1280,
    likes: 210,
    saves: 94,
    releasedAt: "2026-03-05",
    updatedAt: "2026-03-17",
    version: "0.7.2",
    playTime: "5분",
    audience: "내부 플레이테스터",
    featuredReason: "공개 전 QA 용도로만 사용 중입니다.",
    recommendationReason: "언리스트 상태라 추천에는 노출되지 않습니다.",
    status: "unlisted",
    indexed: false,
    warnings: ["검색 인덱싱 꺼짐", "썸네일 교체 필요"],
    controls: ["이동: A / D", "점프: Space", "목표: 등불 신호를 따라 전진"],
    media: [
      {
        title: "언리스트 미리보기",
        kind: "screenshot",
        caption: "최종 공개 전 검수용 메인 장면",
        accent: "linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(74, 225, 255, 0.58))",
      },
    ],
    changelog: [
      {
        version: "0.7.2",
        date: "2026-03-17",
        summary: "언리스트 링크 미리보기 문구와 조명을 손봤습니다.",
        bullets: ["공유 카드 요약 정리", "인트로 조명 대비 증가", "썸네일 후보 2안 추가"],
      },
    ],
    reviews: [
      {
        author: "internal_qa",
        rating: 4,
        body: "분위기는 좋지만 썸네일은 더 강하게 가도 될 것 같습니다.",
        createdAt: "2026-03-17",
      },
    ],
    spec: makeSpec({
      projectId: "proj_007",
      title: "Lantern Echo",
      description: "등불 신호를 따라 전진하는 언리스트 탐색 액션",
      theme: "neon",
      characterId: "shadow_ninja",
      requiredCoins: 11,
      enemyCount: 3,
      jumpPower: 430,
      hp: 3,
      moveSpeed: 195,
      levelPreset: "rooftop_sprint_stage",
      sfxPack: "future_sfx_arcade",
    }),
  },
  {
    slug: "ember-rescue",
    title: "Ember Rescue",
    hook: "제작 중 초안",
    oneLinePitch: "화산 테마 구조를 시험 중인 제작 중 빌드",
    blurb: "썸네일과 설명이 아직 정리되지 않은 내부 초안입니다.",
    tagline: "대시보드에서 계속 손보는 화산 테마 초안",
    description:
      "크리에이터 대시보드와 편집 화면 검증을 위해 유지 중인 초안입니다. 아직 플레이 페이지로 공개되지는 않았고, 빌드와 설명, 미디어를 계속 보완하는 단계입니다.",
    genreLabel: "액션 플랫포머",
    genreSlug: "action",
    theme: "volcano",
    creatorSlug: "aria-cho",
    tags: ["solo", "browser"],
    rating: 0,
    plays: 0,
    likes: 0,
    saves: 0,
    releasedAt: "2026-03-18",
    updatedAt: "2026-03-18",
    version: "0.1.0",
    playTime: "미정",
    audience: "내부 제작용",
    featuredReason: "아직 공개 대상이 아닙니다.",
    recommendationReason: "초안 상태라 추천 노출이 없습니다.",
    status: "draft",
    indexed: false,
    warnings: ["썸네일 미완성", "상세 설명 미작성", "공개 설정 미정"],
    controls: ["이동: A / D", "점프: Space", "목표: 용암 구간 탈출"],
    media: [
      {
        title: "초안 미디어 슬롯",
        kind: "screenshot",
        caption: "미디어 자리만 먼저 잡아둔 상태",
        accent: themePresets.volcano.gradient,
      },
    ],
    changelog: [
      {
        version: "0.1.0",
        date: "2026-03-18",
        summary: "첫 초안 생성",
        bullets: ["기본 스펙 생성", "대시보드 경고 노출 연결", "공개 설정 미정 상태 유지"],
      },
    ],
    reviews: [],
    spec: makeSpec({
      projectId: "proj_008",
      title: "Ember Rescue",
      description: "용암을 피해 탈출하는 초안 액션 플랫포머",
      theme: "volcano",
      characterId: "hero_knight",
      requiredCoins: 15,
      enemyCount: 5,
      jumpPower: 470,
      hp: 3,
      moveSpeed: 205,
      levelPreset: "volcano_escape_stage",
      sfxPack: "volcano_sfx_heavy",
    }),
  },
];

export const currentUserSlug = "aria-cho";

export const tagDefinitions: TagDefinition[] = [
  {
    slug: "action",
    label: "액션",
    kind: "genre",
    description: "반응 속도와 순간 판단이 중요한 장르",
    accent: "linear-gradient(135deg, rgba(49, 130, 246, 0.18), rgba(255, 255, 255, 0.78))",
  },
  {
    slug: "puzzle",
    label: "퍼즐",
    kind: "genre",
    description: "규칙 이해와 정리감이 중요한 장르",
    accent: "linear-gradient(135deg, rgba(120, 204, 148, 0.22), rgba(255, 255, 255, 0.8))",
  },
  {
    slug: "horror",
    label: "공포",
    kind: "genre",
    description: "분위기와 긴장감으로 몰입을 만드는 장르",
    accent: "linear-gradient(135deg, rgba(255, 152, 122, 0.24), rgba(32, 19, 18, 0.14))",
  },
  {
    slug: "solo",
    label: "1인용",
    kind: "tag",
    description: "혼자 바로 플레이할 수 있는 세션형 게임",
    accent: "linear-gradient(135deg, rgba(123, 160, 255, 0.18), rgba(255, 255, 255, 0.84))",
  },
  {
    slug: "co-op",
    label: "2인용",
    kind: "tag",
    description: "친구와 같이 즐기는 협동 중심 게임",
    accent: "linear-gradient(135deg, rgba(164, 126, 255, 0.18), rgba(255, 255, 255, 0.82))",
  },
  {
    slug: "pixel-art",
    label: "픽셀아트",
    kind: "tag",
    description: "픽셀 비주얼이 중심인 게임",
    accent: "linear-gradient(135deg, rgba(255, 205, 118, 0.22), rgba(255, 255, 255, 0.82))",
  },
  {
    slug: "browser",
    label: "브라우저 게임",
    kind: "tag",
    description: "설치 없이 브라우저에서 바로 플레이",
    accent: "linear-gradient(135deg, rgba(91, 167, 255, 0.18), rgba(255, 255, 255, 0.9))",
  },
  {
    slug: "speedrun",
    label: "스피드런",
    kind: "tag",
    description: "빠른 재도전과 기록 갱신이 중요한 게임",
    accent: "linear-gradient(135deg, rgba(100, 199, 167, 0.18), rgba(255, 255, 255, 0.88))",
  },
  {
    slug: "trending",
    label: "트렌딩",
    kind: "tag",
    description: "최근 반응이 크게 올라온 게임",
    accent: "linear-gradient(135deg, rgba(255, 168, 110, 0.2), rgba(255, 255, 255, 0.86))",
  },
  {
    slug: "party",
    label: "파티",
    kind: "tag",
    description: "같이 보거나 같이 할 때 재미가 커지는 게임",
    accent: "linear-gradient(135deg, rgba(255, 122, 189, 0.18), rgba(255, 255, 255, 0.86))",
  },
];

export const collections: CuratedCollection[] = [
  {
    slug: "weekly-pixel-horror",
    title: "이번 주 픽셀 공포 셀렉션",
    description: "짧은 플레이로 긴 여운을 남기는 브라우저 호러 묶음",
    curator: "Editorial",
    theme: "분위기와 썸네일이 강한 게임",
    note: "공포 태그와 브라우저 태그가 함께 붙은 게임을 중심으로 선별했습니다.",
    gameSlugs: ["haunted-signal", "knight-in-the-cave"],
  },
  {
    slug: "first-creator-showcase",
    title: "첫 게임으로 공개하기 좋은 데모",
    description: "초보 제작자도 레이아웃과 설명 구조를 참고하기 쉬운 게임 모음",
    curator: "Creator Relations",
    theme: "상세 페이지 완성도가 높은 프로젝트",
    note: "썸네일, 한줄 소개, 조작법, 업데이트 내역이 균형 있게 들어간 사례를 모았습니다.",
    gameSlugs: ["knight-in-the-cave", "forest-dash", "pixel-pantry"],
  },
  {
    slug: "couch-coop-night",
    title: "2인용 브라우저 나이트",
    description: "한 화면에서 같이 보기 좋은 협동/파티 게임 모음",
    curator: "Community Picks",
    theme: "같이 플레이하거나 관전하기 좋은 프로젝트",
    note: "친구와 함께 바로 열기 좋은 브라우저 코옵 위주로 묶었습니다.",
    gameSlugs: ["coop-constellation", "forest-dash"],
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "notif_001",
    title: "Neon Night Run에 새 댓글이 달렸습니다",
    detail: "synthbyte가 트레일러 컷과 리듬감에 대해 긍정적인 후기를 남겼습니다.",
    time: "방금 전",
    type: "review",
    href: "/games/neon-night-run/reviews",
  },
  {
    id: "notif_002",
    title: "Yuna Studio가 새 게임을 공개했습니다",
    detail: "Haunted Signal이 공개되었고 추천 태그에 등록되었습니다.",
    time: "25분 전",
    type: "creator",
    href: "/games/haunted-signal",
  },
  {
    id: "notif_003",
    title: "Lantern Echo가 인덱싱 대기 상태입니다",
    detail: "썸네일 품질 경고를 해결하면 검색 노출을 켤 수 있습니다.",
    time: "1시간 전",
    type: "system",
    href: "/dashboard/games/lantern-echo",
  },
  {
    id: "notif_004",
    title: "새 팔로워 12명이 생겼습니다",
    detail: "이번 주 추천 큐레이션 노출 이후 Aria Cho 프로필 유입이 증가했습니다.",
    time: "오늘",
    type: "social",
    href: "/creators/aria-cho",
  },
  {
    id: "notif_005",
    title: "공개 정책 문서가 업데이트되었습니다",
    detail: "콘텐츠 정책 문서에 저작권 신고 절차가 추가되었습니다.",
    time: "어제",
    type: "system",
    href: "/legal/content-policy",
  },
];

export const helpArticles: HelpArticle[] = [
  {
    slug: "first-game",
    title: "처음 게임 만들기",
    summary: "빌드 스튜디오에서 첫 게임 초안을 만들고 공개 흐름으로 넘기는 방법",
    sections: [
      "Build Studio에서 핵심 한 문장으로 게임 의도를 정리합니다.",
      "요약 카드와 미리보기 상태를 확인한 뒤 Publish로 이동합니다.",
      "썸네일, 한줄 소개, 공개 범위를 정리하고 링크를 발행합니다.",
    ],
  },
  {
    slug: "publish-checklist",
    title: "퍼블리시 전 체크리스트",
    summary: "검색 노출과 상세 페이지 완성도를 함께 확인하는 기본 체크리스트",
    sections: [
      "대표 썸네일과 한줄 소개가 게임의 훅을 바로 설명하는지 확인합니다.",
      "조작법, 태그, 업데이트 내역을 빠뜨리지 않았는지 봅니다.",
      "공개 범위가 public인지, 검색 인덱싱이 켜져 있는지 확인합니다.",
    ],
  },
  {
    slug: "thumbnail-spec",
    title: "썸네일 규격 가이드",
    summary: "브라우저 목록 카드와 상세 페이지 히어로에서 모두 잘 보이는 썸네일 만들기",
    sections: [
      "게임 장면 하나로 훅이 읽히는 구도를 먼저 잡습니다.",
      "텍스트는 최소화하고 색 대비를 분명하게 가져갑니다.",
      "검색 카드와 공유 카드에서 잘리는 영역을 고려해 중심 피사체를 배치합니다.",
    ],
  },
  {
    slug: "copyright-basics",
    title: "저작권 주의사항",
    summary: "사용자 생성 콘텐츠 플랫폼에서 기본적으로 지켜야 하는 저작권 원칙",
    sections: [
      "직접 제작하지 않은 이미지, 음악, 코드의 사용 권한을 확인합니다.",
      "신고가 접수되면 비공개 전환과 추가 자료 요청이 발생할 수 있습니다.",
      "저작권 정책과 신고 절차는 법적 페이지에서 최신 기준을 확인합니다.",
    ],
  },
];

export const legalDocuments: LegalDocument[] = [
  {
    slug: "terms",
    title: "이용약관",
    summary: "서비스 이용자와 플랫폼 간 기본 계약 조건",
    highlights: [
      "서비스 사용 시 계정 보안과 콘텐츠 책임은 사용자에게 있습니다.",
      "운영 정책 위반 콘텐츠는 숨김 또는 삭제될 수 있습니다.",
      "플랫폼은 실험 기능을 예고 없이 조정할 수 있습니다.",
    ],
  },
  {
    slug: "privacy",
    title: "개인정보처리방침",
    summary: "계정, 프로필, 플레이 로그, 알림 처리 기준",
    highlights: [
      "프로필 정보와 활동 데이터는 서비스 운영과 추천 시스템 개선에 사용됩니다.",
      "외부 공개 범위는 설정 페이지에서 관리할 수 있습니다.",
      "삭제 요청 시 보관 의무가 없는 정보는 정책에 따라 제거됩니다.",
    ],
  },
  {
    slug: "cookies",
    title: "쿠키 정책",
    summary: "로그인 유지, 추천, 성능 측정을 위한 쿠키 및 유사 기술 사용 안내",
    highlights: [
      "로그인 세션과 최근 플레이 기록 유지에 쿠키를 사용합니다.",
      "추천 성능 분석을 위한 집계형 이벤트가 저장될 수 있습니다.",
      "브라우저 설정으로 일부 쿠키를 비활성화할 수 있습니다.",
    ],
  },
  {
    slug: "content-policy",
    title: "콘텐츠 정책",
    summary: "공개 가능한 게임, 미디어, 커뮤니티 상호작용 기준",
    highlights: [
      "부적절하거나 유해한 콘텐츠는 경고 없이 비공개 전환될 수 있습니다.",
      "신고가 누적된 프로젝트는 운영 검토 대기열로 이동합니다.",
      "연령 제한이 필요한 콘텐츠는 별도 표기를 요구할 수 있습니다.",
    ],
  },
  {
    slug: "copyright",
    title: "저작권 정책",
    summary: "권리 침해 신고와 대응 절차 안내",
    highlights: [
      "권리자는 신고 페이지를 통해 침해 콘텐츠를 신고할 수 있습니다.",
      "플랫폼은 사실 확인을 위해 추가 자료 제출을 요청할 수 있습니다.",
      "반복 위반 시 프로젝트 숨김과 계정 제재가 적용될 수 있습니다.",
    ],
  },
];

export const savedBuilds: SavedBuild[] = [
  {
    id: "build_001",
    title: "Volcano tutorial tuning",
    updatedAt: "2026-03-18 09:40",
    status: "draft",
    note: "화산 구간 초반 튜토리얼 문구와 적 수를 조정 중입니다.",
  },
  {
    id: "build_002",
    title: "Lantern Echo thumbnail pass",
    updatedAt: "2026-03-17 18:10",
    status: "review",
    note: "언리스트 프로젝트 썸네일 후보 2안을 검토 중입니다.",
  },
  {
    id: "build_003",
    title: "Knight speedrun patch",
    updatedAt: "2026-03-15 22:05",
    status: "ready",
    note: "코인 루트 최적화 패치가 배포 직전 상태입니다.",
  },
];

export const adminTasks: AdminTask[] = [
  {
    id: "admin_001",
    title: "신규 공포 태그 검토",
    queue: "태그 관리",
    priority: "medium",
    detail: "Haunted Signal 이후 유입된 유사 태그 4개를 정리해야 합니다.",
  },
  {
    id: "admin_002",
    title: "저작권 신고 1건 확인",
    queue: "신고 처리",
    priority: "high",
    detail: "외부 이미지 사용 관련 신고가 접수되어 자료 확인이 필요합니다.",
  },
  {
    id: "admin_003",
    title: "메인 추천 카드 교체",
    queue: "배너 관리",
    priority: "medium",
    detail: "이번 주 메인 추천 영역을 공포 큐레이션으로 교체합니다.",
  },
  {
    id: "admin_004",
    title: "Lantern Echo 인덱싱 승인 여부",
    queue: "게임 승인",
    priority: "low",
    detail: "썸네일 보완 후 검색 인덱싱을 허용할지 검토 중입니다.",
  },
  {
    id: "admin_005",
    title: "부적절 댓글 3건 숨김",
    queue: "커뮤니티 모더레이션",
    priority: "high",
    detail: "Neon Night Run 댓글 영역에서 신고된 표현을 처리해야 합니다.",
  },
];

export function getThemeLabel(theme: ThemeId) {
  return themePresets[theme].label;
}

export function getThemeGradient(theme: ThemeId) {
  return themePresets[theme].gradient;
}

export function getThemeStage(theme: ThemeId) {
  return themePresets[theme].stage;
}

export function getAllGames() {
  return [...allGames];
}

export function getPublicGames() {
  return allGames.filter((game) => game.status === "public");
}

export function getGameBySlug(slug: string) {
  return allGames.find((game) => game.slug === slug);
}

export function getCreatorBySlug(slug: string) {
  return creators.find((creator) => creator.slug === slug);
}

export function getCreators() {
  return [...creators];
}

export function getGamesByCreator(slug: string, options?: { includeHidden?: boolean }) {
  const includeHidden = options?.includeHidden ?? false;

  return allGames.filter((game) => {
    if (game.creatorSlug !== slug) {
      return false;
    }

    return includeHidden ? true : game.status === "public";
  });
}

export function getCurrentUser() {
  return getCreatorBySlug(currentUserSlug);
}

export function getCurrentUserGames() {
  return getGamesByCreator(currentUserSlug, { includeHidden: true });
}

export function getBrowseGames(sort: GameSort = "popular", tag?: string) {
  const filtered = getPublicGames().filter((game) => matchesTag(game, tag));
  return sortGames(filtered, sort);
}

export function sortGames(games: PlatformGame[], sort: GameSort) {
  const cloned = [...games];

  switch (sort) {
    case "latest":
      return cloned.sort((a, b) => toDateScore(b.updatedAt) - toDateScore(a.updatedAt));
    case "rating":
      return cloned.sort((a, b) => b.rating - a.rating || b.likes - a.likes);
    case "plays":
      return cloned.sort((a, b) => b.plays - a.plays);
    case "popular":
    default:
      return cloned.sort((a, b) => popularityScore(b) - popularityScore(a));
  }
}

export function searchGames(options: {
  query?: string;
  sort?: GameSort;
  tag?: string;
  creator?: string;
}) {
  const query = options.query?.trim().toLowerCase() ?? "";
  const sort = options.sort ?? "popular";

  const filtered = getPublicGames().filter((game) => {
    if (options.creator && game.creatorSlug !== options.creator) {
      return false;
    }

    if (!matchesTag(game, options.tag)) {
      return false;
    }

    if (!query) {
      return true;
    }

    const creator = getCreatorBySlug(game.creatorSlug);
    const searchable = [
      game.title,
      game.oneLinePitch,
      game.blurb,
      game.description,
      game.genreLabel,
      game.genreSlug,
      ...game.tags,
      creator?.name ?? "",
      creator?.handle ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(query);
  });

  return sortGames(filtered, sort);
}

export function getFeaturedGames() {
  return sortGames(getPublicGames(), "popular").slice(0, 4);
}

export function getLatestGames() {
  return sortGames(getPublicGames(), "latest").slice(0, 4);
}

export function getRecommendedGames() {
  return sortGames(getPublicGames(), "rating").slice(0, 4);
}

export function getTagDefinition(slug: string) {
  return tagDefinitions.find((tag) => tag.slug === slug);
}

export function getTagCatalog() {
  return tagDefinitions.map((tag) => ({
    ...tag,
    count: getPublicGames().filter((game) => matchesTag(game, tag.slug)).length,
  }));
}

export function getGamesByTag(tag: string, sort: GameSort = "popular") {
  return getBrowseGames(sort, tag);
}

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getCollectionGames(collection: CuratedCollection) {
  return collection.gameSlugs
    .map((slug) => getGameBySlug(slug))
    .filter((game): game is PlatformGame => Boolean(game));
}

export function getLegalDocumentBySlug(slug: string) {
  return legalDocuments.find((document) => document.slug === slug);
}

export function getDashboardStats() {
  const games = getCurrentUserGames();
  const publicGames = games.filter((game) => game.status === "public");

  return [
    { label: "총 프로젝트", value: `${games.length}` },
    { label: "공개 게임", value: `${publicGames.length}` },
    { label: "총 플레이 수", value: formatCompact(sum(games.map((game) => game.plays))) },
    { label: "좋아요 합계", value: formatCompact(sum(games.map((game) => game.likes))) },
  ];
}

export function getAnalyticsStats() {
  const games = getCurrentUserGames();
  const totalPlays = sum(games.map((game) => game.plays));
  const totalLikes = sum(games.map((game) => game.likes));
  const totalSaves = sum(games.map((game) => game.saves));

  return [
    { label: "조회수", value: formatCompact(totalPlays * 2.4) },
    { label: "플레이 수", value: formatCompact(totalPlays) },
    { label: "평균 플레이 시간", value: "4분 18초" },
    { label: "완주율", value: "42%" },
    { label: "좋아요", value: formatCompact(totalLikes) },
    { label: "저장", value: formatCompact(totalSaves) },
  ];
}

export function getCreatorStats(creatorSlug: string) {
  const games = getGamesByCreator(creatorSlug, { includeHidden: false });

  return [
    { label: "공개 게임", value: `${games.length}` },
    { label: "총 플레이 수", value: formatCompact(sum(games.map((game) => game.plays))) },
    { label: "총 좋아요", value: formatCompact(sum(games.map((game) => game.likes))) },
    { label: "대표작", value: games[0]?.title ?? "-" },
  ];
}

export function getLibraryData() {
  return {
    recentGames: ["neon-night-run", "haunted-signal", "forest-dash"]
      .map((slug) => getGameBySlug(slug))
      .filter((game): game is PlatformGame => Boolean(game)),
    favorites: ["knight-in-the-cave", "pixel-pantry"]
      .map((slug) => getGameBySlug(slug))
      .filter((game): game is PlatformGame => Boolean(game)),
    likedGames: ["neon-night-run", "haunted-signal", "coop-constellation"]
      .map((slug) => getGameBySlug(slug))
      .filter((game): game is PlatformGame => Boolean(game)),
    uploadedGames: getCurrentUserGames(),
    followedCreators: ["minho-park", "yuna-studio"]
      .map((slug) => getCreatorBySlug(slug))
      .filter((creator): creator is CreatorProfile => Boolean(creator)),
    savedBuilds,
  };
}

export function getSearchExamples() {
  return ["공포", "픽셀아트", "Aria", "browser", "2인용"];
}

export function formatCompact(value: number) {
  return new Intl.NumberFormat("ko-KR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function matchesTag(game: PlatformGame, tag?: string) {
  if (!tag) {
    return true;
  }

  return game.genreSlug === tag || game.tags.includes(tag);
}

function popularityScore(game: PlatformGame) {
  return game.plays + game.likes * 6 + game.saves * 10 + game.rating * 100;
}

function toDateScore(value: string) {
  return new Date(value).getTime();
}

function sum(values: number[]) {
  return values.reduce((accumulator, value) => accumulator + value, 0);
}

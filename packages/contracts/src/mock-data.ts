import type { ChatMessage, ExampleGame, GameSpec, ScreenState } from "./game-spec";

export const screenStates: ScreenState[] = [
  "idle",
  "collecting_intent",
  "drafting_spec",
  "waiting_user_confirmation",
  "building_preview",
  "preview_ready",
  "publishing",
  "published",
  "error",
];

export const allowedActions = [
  "테마 변경",
  "캐릭터 변경",
  "적 수 조정",
  "점프력 조정",
  "맵 프리셋 변경",
  "승리 조건 조정",
  "사운드 변경",
  "퍼블리시",
  "다운로드",
] as const;

export const initialGameSpec: GameSpec = {
  projectId: "proj_001",
  template: "platformer_basic",
  theme: "cave",
  player: {
    characterId: "hero_knight",
    moveSpeed: 180,
    jumpPower: 420,
    hp: 3,
  },
  goal: {
    type: "reach_exit_after_collect",
    requiredCoins: 10,
  },
  enemies: [{ type: "slime", count: 3, speed: 80 }],
  items: [{ type: "coin", count: 12 }],
  map: {
    tilesetId: "cave_tileset_01",
    levelPreset: "short_intro_stage",
  },
  ui: {
    showHp: true,
    showCoinCount: true,
  },
  audio: {
    bgm: "bgm_cave",
    sfxPack: "platformer_sfx_basic",
  },
  publish: {
    title: "Knight in the Cave",
    description: "동전을 모아 출구로 가는 픽셀 플랫포머",
  },
};

export const initialMessages: ChatMessage[] = [
  {
    id: "msg_001",
    role: "assistant",
    content:
      "원하는 게임 분위기와 캐릭터, 난이도를 말해 주세요. 예: 동굴 배경에 닌자 캐릭터, 코인 12개를 모아 탈출.",
    timestamp: "09:00",
  },
];

export const exampleGames: ExampleGame[] = [
  {
    slug: "knight-in-the-cave",
    title: "Knight in the Cave",
    theme: "cave",
    blurb: "동굴 속 코인을 모으고 탈출하는 정통 픽셀 플랫포머",
    hook: "기본 템플릿 기반 데모",
  },
  {
    slug: "forest-dash",
    title: "Forest Dash",
    theme: "forest",
    blurb: "가벼운 점프와 빠른 이동이 강조된 숲속 러닝 스테이지",
    hook: "속도감 중심 변형",
  },
  {
    slug: "neon-night-run",
    title: "Neon Night Run",
    theme: "neon",
    blurb: "네온 타일셋과 전자음이 어울리는 미래형 미션",
    hook: "테마 전환 샘플",
  },
];

export const exampleGameSpecs: Record<string, GameSpec> = {
  "knight-in-the-cave": initialGameSpec,
  "forest-dash": {
    projectId: "proj_002",
    template: "platformer_basic",
    theme: "forest",
    player: {
      characterId: "shadow_ninja",
      moveSpeed: 210,
      jumpPower: 460,
      hp: 3,
    },
    goal: {
      type: "reach_exit_after_collect",
      requiredCoins: 14,
    },
    enemies: [{ type: "bat", count: 4, speed: 110 }],
    items: [{ type: "coin", count: 16 }],
    map: {
      tilesetId: "forest_tileset_01",
      levelPreset: "canopy_dash_stage",
    },
    ui: {
      showHp: true,
      showCoinCount: true,
    },
    audio: {
      bgm: "bgm_forest",
      sfxPack: "forest_sfx_light",
    },
    publish: {
      title: "Forest Dash",
      description: "빠른 이동과 연속 점프가 강조된 숲속 스피드런 플랫포머",
    },
  },
  "neon-night-run": {
    projectId: "proj_003",
    template: "platformer_basic",
    theme: "neon",
    player: {
      characterId: "clockwork_robot",
      moveSpeed: 220,
      jumpPower: 440,
      hp: 4,
    },
    goal: {
      type: "reach_exit_after_collect",
      requiredCoins: 18,
    },
    enemies: [{ type: "drone", count: 5, speed: 120 }],
    items: [{ type: "coin", count: 20 }],
    map: {
      tilesetId: "neon_tileset_01",
      levelPreset: "rooftop_sprint_stage",
    },
    ui: {
      showHp: true,
      showCoinCount: true,
    },
    audio: {
      bgm: "bgm_neon",
      sfxPack: "future_sfx_arcade",
    },
    publish: {
      title: "Neon Night Run",
      description: "전자음과 야간 도심 배경을 살린 하이 템포 플랫포머 미션",
    },
  },
};

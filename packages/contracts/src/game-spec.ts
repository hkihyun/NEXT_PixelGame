export type ScreenState =
  | "idle"
  | "collecting_intent"
  | "drafting_spec"
  | "waiting_user_confirmation"
  | "building_preview"
  | "preview_ready"
  | "publishing"
  | "published"
  | "error";

export type ThemeId = "cave" | "forest" | "neon" | "volcano";
export type CharacterId =
  | "hero_knight"
  | "shadow_ninja"
  | "clockwork_robot"
  | "pixel_cat";

export interface GameSpec {
  projectId: string;
  template: "platformer_basic";
  theme: ThemeId;
  player: {
    characterId: CharacterId;
    moveSpeed: number;
    jumpPower: number;
    hp: number;
  };
  goal: {
    type: "reach_exit_after_collect";
    requiredCoins: number;
  };
  enemies: Array<{
    type: "slime" | "bat" | "drone" | "ember";
    count: number;
    speed: number;
  }>;
  items: Array<{
    type: "coin" | "crystal";
    count: number;
  }>;
  map: {
    tilesetId: string;
    levelPreset: string;
  };
  ui: {
    showHp: boolean;
    showCoinCount: boolean;
  };
  audio: {
    bgm: string;
    sfxPack: string;
  };
  publish: {
    title: string;
    description: string;
  };
}

export interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
}

export interface GameSummary {
  genre: "platformer";
  theme: ThemeId;
  goal: string;
  buildState: ScreenState;
  highlight: string;
}

export interface AssetPreviewCard {
  id: string;
  label: string;
  value: string;
  note: string;
  accent: string;
}

export interface ExampleGame {
  slug: string;
  title: string;
  theme: ThemeId;
  blurb: string;
  hook: string;
}

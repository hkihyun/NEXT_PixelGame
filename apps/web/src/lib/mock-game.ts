import {
  allowedActions as contractAllowedActions,
  exampleGames,
  exampleGameSpecs,
  initialGameSpec,
  type AssetPreviewCard,
  type CharacterId,
  type ExampleGame,
  type GameSpec,
  type GameSummary,
  type ScreenState,
  type ThemeId,
} from "@pixel/contracts";

export const allowedActions = [...contractAllowedActions];

export const starterPrompts = [
  "숲 배경으로 바꾸고 닌자 캐릭터로 진행해 줘",
  "적 수를 5마리로 늘리고 점프력을 500으로 올려 줘",
  "네온 테마에 전자음 사운드, 코인 18개를 모으면 클리어",
];

export const buildFlow: ScreenState[] = [
  "idle",
  "collecting_intent",
  "drafting_spec",
  "waiting_user_confirmation",
  "building_preview",
  "preview_ready",
];

export const themeLabels: Record<ThemeId, string> = {
  cave: "동굴",
  forest: "숲",
  neon: "네온",
  volcano: "화산",
};

export const themePresentation: Record<
  ThemeId,
  {
    label: string;
    background: string;
    surface: string;
    thumbnail: string;
    tilesetId: string;
    bgm: string;
    enemyType: GameSpec["enemies"][number]["type"];
  }
> = {
  cave: {
    label: "동굴",
    background: "linear-gradient(135deg, #283343, #486172)",
    surface: "linear-gradient(135deg, rgba(40, 51, 67, 0.95), rgba(72, 97, 114, 0.9))",
    thumbnail: "radial-gradient(circle at top left, rgba(157, 215, 172, 0.18), transparent 35%), linear-gradient(135deg, #1a2732, #4b6474)",
    tilesetId: "cave_tileset_01",
    bgm: "bgm_cave",
    enemyType: "slime",
  },
  forest: {
    label: "숲",
    background: "linear-gradient(135deg, #2c4a34, #7bb168)",
    surface: "linear-gradient(135deg, rgba(44, 74, 52, 0.98), rgba(123, 177, 104, 0.86))",
    thumbnail: "radial-gradient(circle at top left, rgba(255, 255, 255, 0.18), transparent 30%), linear-gradient(135deg, #23402d, #7fbe6c)",
    tilesetId: "forest_tileset_01",
    bgm: "bgm_forest",
    enemyType: "bat",
  },
  neon: {
    label: "네온",
    background: "linear-gradient(135deg, #10233d, #4ae1ff)",
    surface: "linear-gradient(135deg, rgba(16, 35, 61, 0.98), rgba(74, 225, 255, 0.88))",
    thumbnail: "radial-gradient(circle at top right, rgba(233, 95, 255, 0.24), transparent 32%), linear-gradient(135deg, #0d1e38, #44d7ff)",
    tilesetId: "neon_tileset_01",
    bgm: "bgm_neon",
    enemyType: "drone",
  },
  volcano: {
    label: "화산",
    background: "linear-gradient(135deg, #4b2418, #ff8d58)",
    surface: "linear-gradient(135deg, rgba(75, 36, 24, 0.98), rgba(255, 141, 88, 0.84))",
    thumbnail: "radial-gradient(circle at center, rgba(255, 220, 180, 0.14), transparent 36%), linear-gradient(135deg, #482115, #ff8d58)",
    tilesetId: "volcano_tileset_01",
    bgm: "bgm_volcano",
    enemyType: "ember",
  },
};

export const characterLabels: Record<CharacterId, string> = {
  hero_knight: "기사",
  shadow_ninja: "닌자",
  clockwork_robot: "로봇",
  pixel_cat: "픽셀 캣",
};

export const enemyLabels: Record<GameSpec["enemies"][number]["type"], string> = {
  slime: "슬라임",
  bat: "박쥐",
  drone: "드론",
  ember: "엠버",
};

export const buildStateLabels: Record<ScreenState, string> = {
  idle: "대기",
  collecting_intent: "요구 수집",
  drafting_spec: "Spec 정리",
  waiting_user_confirmation: "검토 대기",
  building_preview: "프리뷰 빌드",
  preview_ready: "프리뷰 준비 완료",
  publishing: "퍼블리시 중",
  published: "퍼블리시 완료",
  error: "오류",
};

export const levelPresetLabels: Record<string, string> = {
  short_intro_stage: "Short Intro",
  canopy_dash_stage: "Canopy Dash",
  rooftop_sprint_stage: "Rooftop Sprint",
  volcano_escape_stage: "Volcano Escape",
};

export const audioLabels: Record<string, string> = {
  bgm_cave: "Cave Echo",
  bgm_forest: "Forest Breeze",
  bgm_neon: "Neon Pulse",
  bgm_volcano: "Molten Rush",
};

const characterKeywords: Record<CharacterId, string[]> = {
  hero_knight: ["기사", "knight"],
  shadow_ninja: ["닌자", "ninja"],
  clockwork_robot: ["로봇", "robot"],
  pixel_cat: ["고양이", "cat"],
};

const themeKeywords: Record<ThemeId, string[]> = {
  cave: ["동굴", "cave"],
  forest: ["숲", "forest"],
  neon: ["네온", "neon"],
  volcano: ["화산", "용암", "volcano", "lava"],
};

const mapProfiles = [
  {
    id: "short_intro_stage",
    label: "Short Intro",
    keywords: ["짧", "intro", "입문"],
  },
  {
    id: "canopy_dash_stage",
    label: "Canopy Dash",
    keywords: ["숲", "canopy", "대시", "speed", "빠른"],
  },
  {
    id: "rooftop_sprint_stage",
    label: "Rooftop Sprint",
    keywords: ["옥상", "rooftop", "네온", "도심"],
  },
  {
    id: "volcano_escape_stage",
    label: "Volcano Escape",
    keywords: ["화산", "용암", "escape", "탈출"],
  },
] as const;

const audioProfiles = [
  {
    keywords: ["동굴", "잔잔", "echo", "ambient"],
    bgm: "bgm_cave",
    sfxPack: "platformer_sfx_basic",
  },
  {
    keywords: ["숲", "forest", "light", "자연"],
    bgm: "bgm_forest",
    sfxPack: "forest_sfx_light",
  },
  {
    keywords: ["네온", "전자", "arcade", "synth"],
    bgm: "bgm_neon",
    sfxPack: "future_sfx_arcade",
  },
  {
    keywords: ["화산", "heavy", "강한", "molten"],
    bgm: "bgm_volcano",
    sfxPack: "volcano_sfx_heavy",
  },
] as const;

type SpecPatchPreview = Partial<{
  theme: ThemeId;
  player: Partial<GameSpec["player"]>;
  goal: Partial<GameSpec["goal"]>;
  enemies: GameSpec["enemies"];
  items: GameSpec["items"];
  map: Partial<GameSpec["map"]>;
  audio: Partial<GameSpec["audio"]>;
  publish: Partial<GameSpec["publish"]>;
}>;

export function cloneGameSpec(spec: GameSpec): GameSpec {
  return {
    ...spec,
    player: { ...spec.player },
    goal: { ...spec.goal },
    enemies: spec.enemies.map((enemy) => ({ ...enemy })),
    items: spec.items.map((item) => ({ ...item })),
    map: { ...spec.map },
    ui: { ...spec.ui },
    audio: { ...spec.audio },
    publish: { ...spec.publish },
  };
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function slugToTitle(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getCharacterLabel(characterId: CharacterId) {
  return characterLabels[characterId];
}

export function getThemeLabel(theme: ThemeId) {
  return themeLabels[theme];
}

export function getGoalLabel(spec: GameSpec) {
  return `코인 ${spec.goal.requiredCoins}개를 모아 출구 도달`;
}

export function getLevelLabel(levelPreset: string) {
  return levelPresetLabels[levelPreset] ?? levelPreset;
}

export function getAudioLabel(bgm: string) {
  return audioLabels[bgm] ?? bgm;
}

export function deriveSummary(spec: GameSpec, buildState: ScreenState): GameSummary {
  const enemy = spec.enemies[0];

  return {
    genre: "platformer",
    theme: spec.theme,
    goal: getGoalLabel(spec),
    buildState,
    highlight: `${themeLabels[spec.theme]} · ${getCharacterLabel(spec.player.characterId)} · ${enemyLabels[enemy.type]} ${enemy.count}마리`,
  };
}

export function deriveAssetCards(spec: GameSpec): AssetPreviewCard[] {
  return [
    {
      id: "theme",
      label: "Theme",
      value: themeLabels[spec.theme],
      note: spec.map.tilesetId,
      accent: themePresentation[spec.theme].thumbnail,
    },
    {
      id: "player",
      label: "Character",
      value: getCharacterLabel(spec.player.characterId),
      note: `Jump ${spec.player.jumpPower} / HP ${spec.player.hp}`,
      accent: "linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(240, 229, 197, 0.82))",
    },
    {
      id: "map",
      label: "Map",
      value: getLevelLabel(spec.map.levelPreset),
      note: `Goal ${spec.goal.requiredCoins} coins`,
      accent: "linear-gradient(135deg, rgba(157, 215, 172, 0.34), rgba(255, 255, 255, 0.92))",
    },
    {
      id: "audio",
      label: "Sound",
      value: getAudioLabel(spec.audio.bgm),
      note: spec.audio.sfxPack,
      accent: "linear-gradient(135deg, rgba(242, 139, 69, 0.26), rgba(255, 255, 255, 0.92))",
    },
  ];
}

export function getPreviewActors(spec: GameSpec) {
  const enemy = spec.enemies[0];
  const items = spec.items[0];

  return [
    getCharacterLabel(spec.player.characterId),
    `${enemyLabels[enemy.type]} x${enemy.count}`,
    `${items.type === "coin" ? "Coin" : "Crystal"} x${items.count}`,
    `Exit @ ${getLevelLabel(spec.map.levelPreset)}`,
  ];
}

export function resolveGame(slug: string): { game: ExampleGame; spec: GameSpec } {
  const game = exampleGames.find((item) => item.slug === slug);

  if (game) {
    return {
      game,
      spec: cloneGameSpec(exampleGameSpecs[slug] ?? initialGameSpec),
    };
  }

  const fallbackSpec = cloneGameSpec(initialGameSpec);
  const title = slugToTitle(slug);

  fallbackSpec.publish.title = title;
  fallbackSpec.publish.description = "퍼블리시 페이지에서 생성된 mock 플레이 페이지입니다.";

  return {
    game: {
      slug,
      title,
      theme: fallbackSpec.theme,
      blurb: fallbackSpec.publish.description,
      hook: "Mock publish route",
    },
    spec: fallbackSpec,
  };
}

export function applyMockPrompt(spec: GameSpec, input: string) {
  const nextSpec = cloneGameSpec(spec);
  const patch: SpecPatchPreview = {};
  const changes: string[] = [];
  const normalized = input.toLowerCase();

  const detectedTheme = findKeywordMatch(themeKeywords, normalized);
  if (detectedTheme && detectedTheme !== nextSpec.theme) {
    nextSpec.theme = detectedTheme;
    nextSpec.map.tilesetId = themePresentation[detectedTheme].tilesetId;
    nextSpec.audio.bgm = themePresentation[detectedTheme].bgm;
    nextSpec.enemies[0].type = themePresentation[detectedTheme].enemyType;
    patch.theme = detectedTheme;
    patch.map = { ...patch.map, tilesetId: nextSpec.map.tilesetId };
    patch.audio = { ...patch.audio, bgm: nextSpec.audio.bgm };
    patch.enemies = nextSpec.enemies.map((enemy) => ({ ...enemy }));
    changes.push(`테마를 ${themeLabels[detectedTheme]}로 변경`);
  }

  const detectedCharacter = findKeywordMatch(characterKeywords, normalized);
  if (detectedCharacter && detectedCharacter !== nextSpec.player.characterId) {
    nextSpec.player.characterId = detectedCharacter;
    patch.player = { ...patch.player, characterId: detectedCharacter };
    changes.push(`캐릭터를 ${getCharacterLabel(detectedCharacter)}로 변경`);
  }

  const enemyCount = extractNumberByKeywords(normalized, ["적", "enemy", "슬라임", "박쥐", "드론", "엠버", "몬스터", "마리"]);
  if (enemyCount !== null) {
    nextSpec.enemies[0].count = clamp(enemyCount, 1, 12);
    patch.enemies = nextSpec.enemies.map((enemy) => ({ ...enemy }));
    changes.push(`적 수를 ${nextSpec.enemies[0].count}마리로 조정`);
  }

  const coinCount = extractNumberByKeywords(normalized, ["코인", "coin", "goal", "목표"]);
  if (coinCount !== null) {
    nextSpec.goal.requiredCoins = clamp(coinCount, 3, 30);
    nextSpec.items[0].count = Math.max(nextSpec.goal.requiredCoins + 2, nextSpec.items[0].count);
    patch.goal = { ...patch.goal, requiredCoins: nextSpec.goal.requiredCoins };
    patch.items = nextSpec.items.map((item) => ({ ...item }));
    changes.push(`승리 조건을 코인 ${nextSpec.goal.requiredCoins}개로 조정`);
  }

  const jumpPower = extractNumberByKeywords(normalized, ["점프", "jump"]);
  if (jumpPower !== null) {
    nextSpec.player.jumpPower = clamp(jumpPower, 280, 620);
    patch.player = { ...patch.player, jumpPower: nextSpec.player.jumpPower };
    changes.push(`점프력을 ${nextSpec.player.jumpPower}로 조정`);
  }

  const mapProfile = mapProfiles.find((profile) =>
    profile.keywords.some((keyword) => normalized.includes(keyword)),
  );
  if (mapProfile && mapProfile.id !== nextSpec.map.levelPreset) {
    nextSpec.map.levelPreset = mapProfile.id;
    patch.map = { ...patch.map, levelPreset: mapProfile.id };
    changes.push(`맵 프리셋을 ${mapProfile.label}로 변경`);
  }

  const audioProfile = audioProfiles.find((profile) =>
    profile.keywords.some((keyword) => normalized.includes(keyword)),
  );
  if (
    audioProfile &&
    (audioProfile.bgm !== nextSpec.audio.bgm || audioProfile.sfxPack !== nextSpec.audio.sfxPack)
  ) {
    nextSpec.audio.bgm = audioProfile.bgm;
    nextSpec.audio.sfxPack = audioProfile.sfxPack;
    patch.audio = {
      ...patch.audio,
      bgm: audioProfile.bgm,
      sfxPack: audioProfile.sfxPack,
    };
    changes.push(`사운드를 ${getAudioLabel(audioProfile.bgm)} 중심으로 갱신`);
  }

  if (changes.length > 0) {
    nextSpec.publish.title = buildTitle(nextSpec);
    nextSpec.publish.description = buildDescription(nextSpec);
    patch.publish = {
      title: nextSpec.publish.title,
      description: nextSpec.publish.description,
    };
  }

  const assistantText =
    changes.length > 0
      ? `${changes.join(", ")}했습니다. mock preview build를 다시 시작합니다.`
      : "허용된 액션 범위 안에서 반영할 변경점을 찾지 못해 기존 Game Spec을 유지합니다.";

  return {
    nextSpec,
    patch,
    patchText: JSON.stringify(changes.length > 0 ? patch : {}, null, 2),
    assistantText,
  };
}

function buildTitle(spec: GameSpec) {
  const titleStem: Record<CharacterId, string> = {
    hero_knight: "Knight",
    shadow_ninja: "Ninja",
    clockwork_robot: "Robot",
    pixel_cat: "Pixel Cat",
  };

  const suffix: Record<ThemeId, string> = {
    cave: "in the Cave",
    forest: "Forest Dash",
    neon: "Night Run",
    volcano: "Lava Escape",
  };

  return `${titleStem[spec.player.characterId]} ${suffix[spec.theme]}`.trim();
}

function buildDescription(spec: GameSpec) {
  return `${themeLabels[spec.theme]} 테마에서 ${getCharacterLabel(spec.player.characterId)}가 ${getGoalLabel(spec)}를 수행하는 mock 플랫포머`;
}

function findKeywordMatch<T extends string>(dictionary: Record<T, string[]>, input: string) {
  return (Object.entries(dictionary) as Array<[T, string[]]>).find(([, keywords]) =>
    keywords.some((keyword) => input.includes(keyword)),
  )?.[0];
}

function extractNumberByKeywords(input: string, keywords: string[]) {
  for (const keyword of keywords) {
    const escaped = escapeRegExp(keyword);
    const forward = input.match(new RegExp(`${escaped}[^0-9]{0,8}(\\d{1,3})`));
    if (forward) {
      return Number(forward[1]);
    }

    const backward = input.match(new RegExp(`(\\d{1,3})[^0-9]{0,6}${escaped}`));
    if (backward) {
      return Number(backward[1]);
    }
  }

  return null;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

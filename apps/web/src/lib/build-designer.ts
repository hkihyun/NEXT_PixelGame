export type DesignStage =
  | "listening"
  | "clarifying"
  | "structuring"
  | "ready_for_handoff";

export type MessageRole = "assistant" | "user";
export type Confidence = "high" | "medium";
export type QuestionPriority = "critical" | "important";

export interface DesignerMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  chips?: string[];
  checklist?: string[];
  followUps?: string[];
}

export interface DesignSignal {
  label: string;
  value: string;
  confidence: Confidence;
}

export interface DesignQuestion {
  id: string;
  title: string;
  description: string;
  priority: QuestionPriority;
}

export interface DesignBrief {
  title: string;
  premise: string;
  genre: string;
  playerFantasy: string;
  coreLoop: string;
  setting: string;
  platform: string;
  perspective: string;
  tone: string;
  artDirection: string;
  audience: string;
  sessionLength: string;
  progression: string;
  references: string[];
  constraints: string[];
}

export interface DesignSession {
  brief: DesignBrief;
  stage: DesignStage;
  signals: DesignSignal[];
  questions: DesignQuestion[];
  assumptions: string[];
  suggestedReplies: string[];
  payloadPreview: string;
}

export interface HandoffStep {
  label: string;
  detail: string;
  status: "done" | "current" | "todo";
}

export interface BriefFieldRow {
  key: keyof DesignBrief;
  label: string;
  value: string;
  status: "filled" | "missing";
}

interface Pattern {
  value: string;
  keywords: string[];
}

const questionTemplates = {
  genre: {
    title: "장르와 핵심 재미를 한 줄로 정해 주세요.",
    description: "예: 협동 생존 경영, 카드 퍼즐 RPG, 로그라이트 액션",
    priority: "critical" as const,
    suggestions: ["로그라이트 액션으로", "카드 퍼즐 RPG로", "협동 생존 경영 게임으로"],
  },
  coreLoop: {
    title: "플레이어가 반복할 핵심 루프를 3단계로 말해 주세요.",
    description: "예: 탐험 -> 수집 -> 귀환",
    priority: "critical" as const,
    suggestions: ["탐험 -> 전투 -> 귀환 구조로", "배달 -> 업그레이드 -> 재도전 구조로", "관찰 -> 퍼즐 해결 -> 다음 방 해금"],
  },
  platform: {
    title: "우선 타겟 플랫폼을 정해 주세요.",
    description: "모바일, PC, 웹, 콘솔 중 무엇을 먼저 맞출지 필요합니다.",
    priority: "important" as const,
    suggestions: ["모바일 세로형으로", "PC 우선으로", "웹에서 바로 실행되게"],
  },
  perspective: {
    title: "화면 시점을 정해 주세요.",
    description: "탑다운, 횡스크롤, 1인칭, 카드형 UI 등",
    priority: "important" as const,
    suggestions: ["탑다운 시점으로", "횡스크롤로", "카드형 인터페이스로"],
  },
  tone: {
    title: "플레이어가 느껴야 할 감정을 더 구체화해 주세요.",
    description: "예: 포근함, 긴장감, 우울함, 유머",
    priority: "important" as const,
    suggestions: ["포근하고 따뜻하게", "긴장감 있게", "유머러스하게"],
  },
  artDirection: {
    title: "비주얼 방향을 정해 주세요.",
    description: "픽셀 아트, 로우폴리, 손그림, 미니멀 등",
    priority: "important" as const,
    suggestions: ["픽셀 아트로", "로우폴리 3D로", "손그림 일러스트 톤으로"],
  },
  audience: {
    title: "가장 많이 플레이할 사람을 정해 주세요.",
    description: "캐주얼, 하드코어, 친구 파티, 어린이, 코어 게이머 등",
    priority: "important" as const,
    suggestions: ["캐주얼 유저 대상", "하드코어 유저 대상", "친구 둘이 함께하는 게임"],
  },
  sessionLength: {
    title: "한 판 길이를 정해 주세요.",
    description: "1분, 5분, 20분처럼 세션 길이가 필요합니다.",
    priority: "critical" as const,
    suggestions: ["한 판 1분 내로", "한 판 5분 정도로", "20분 이상 몰입형으로"],
  },
  progression: {
    title: "장기적인 성장 구조를 정해 주세요.",
    description: "메타 업그레이드, 챕터 해금, 시설 확장 같은 구조가 필요합니다.",
    priority: "important" as const,
    suggestions: ["메타 업그레이드가 있었으면 해", "챕터 해금 구조로", "시설 확장 중심으로"],
  },
};

const stageFieldKeys: Array<keyof DesignBrief> = [
  "genre",
  "coreLoop",
  "platform",
  "perspective",
  "artDirection",
  "sessionLength",
];

const completionFieldKeys: Array<keyof DesignBrief> = [
  "genre",
  "playerFantasy",
  "coreLoop",
  "setting",
  "platform",
  "perspective",
  "tone",
  "artDirection",
  "audience",
  "sessionLength",
  "progression",
];

const fieldLabels: Record<keyof DesignBrief, string> = {
  title: "Working title",
  premise: "Premise",
  genre: "Genre",
  playerFantasy: "Player fantasy",
  coreLoop: "Core loop",
  setting: "Setting",
  platform: "Platform",
  perspective: "View",
  tone: "Tone",
  artDirection: "Art direction",
  audience: "Audience",
  sessionLength: "Session",
  progression: "Progression",
  references: "References",
  constraints: "Constraints",
};

const briefFieldOrder: Array<keyof DesignBrief> = [
  "genre",
  "playerFantasy",
  "coreLoop",
  "setting",
  "platform",
  "perspective",
  "tone",
  "artDirection",
  "audience",
  "sessionLength",
  "progression",
];

const genrePatterns: Pattern[] = [
  { value: "카드 퍼즐 RPG", keywords: ["카드 퍼즐 rpg", "deck puzzle rpg", "카드 퍼즐"] },
  { value: "로그라이트 액션", keywords: ["로그라이트 액션", "action roguelite", "roguelite action"] },
  { value: "로그라이트", keywords: ["로그라이트", "roguelite"] },
  { value: "로그라이크", keywords: ["로그라이크", "roguelike"] },
  { value: "플랫포머", keywords: ["플랫포머", "platformer", "횡스크롤 액션"] },
  { value: "탑다운 슈터", keywords: ["탑다운 슈터", "top down shooter"] },
  { value: "소울라이크 액션", keywords: ["소울라이크", "soulslike"] },
  { value: "생존 제작", keywords: ["생존 제작", "survival crafting", "crafting survival"] },
  { value: "서바이벌", keywords: ["서바이벌", "survival"] },
  { value: "협동 어드벤처", keywords: ["협동 어드벤처", "co-op adventure", "coop adventure"] },
  { value: "경영 시뮬레이션", keywords: ["경영", "management sim", "management", "tycoon"] },
  { value: "라이프 시뮬레이션", keywords: ["라이프 시뮬", "life sim", "생활 시뮬"] },
  { value: "농장 시뮬레이션", keywords: ["농장", "farm sim", "farming"] },
  { value: "내러티브 어드벤처", keywords: ["내러티브", "narrative adventure", "스토리 게임"] },
  { value: "파티 게임", keywords: ["파티 게임", "party game"] },
  { value: "전략 시뮬레이션", keywords: ["전략 시뮬레이션", "strategy simulation", "strategy sim"] },
  { value: "디펜스", keywords: ["디펜스", "tower defense", "defense"] },
  { value: "리듬 액션", keywords: ["리듬", "rhythm"] },
  { value: "퍼즐", keywords: ["퍼즐", "puzzle"] },
];

const tonePatterns: Pattern[] = [
  { value: "포근하고 따뜻함", keywords: ["cozy", "포근", "따뜻", "아늑", "힐링"] },
  { value: "긴장감 있고 날카로움", keywords: ["긴장", "스릴", "tense", "sharp"] },
  { value: "우울하고 서늘함", keywords: ["우울", "서늘", "dark", "gloom", "melancholy"] },
  { value: "낙천적이고 경쾌함", keywords: ["경쾌", "희망", "hopeful", "bright"] },
  { value: "유머러스하고 가벼움", keywords: ["유머", "웃긴", "comedy", "funny"] },
  { value: "신비롭고 몽환적", keywords: ["몽환", "신비", "dreamy", "mystic"] },
  { value: "경쟁적이고 공격적", keywords: ["경쟁", "competitive", "aggressive"] },
];

const platformPatterns: Pattern[] = [
  { value: "모바일 세로형", keywords: ["모바일 세로형", "vertical mobile", "portrait mobile", "세로형"] },
  { value: "모바일", keywords: ["모바일", "ios", "android"] },
  { value: "PC", keywords: ["pc", "steam", "키보드", "keyboard", "mouse"] },
  { value: "웹", keywords: ["웹", "browser", "web game", "브라우저"] },
  { value: "콘솔 / 패드", keywords: ["콘솔", "gamepad", "패드", "controller"] },
  { value: "휴대용 콘솔", keywords: ["switch", "스위치", "handheld"] },
];

const perspectivePatterns: Pattern[] = [
  { value: "탑다운", keywords: ["탑다운", "top down"] },
  { value: "횡스크롤", keywords: ["횡스크롤", "side-scroller", "side scroller", "side scrolling"] },
  { value: "1인칭", keywords: ["1인칭", "first person", "fps"] },
  { value: "3인칭", keywords: ["3인칭", "third person"] },
  { value: "아이소메트릭", keywords: ["아이소메트릭", "isometric"] },
  { value: "카드형 UI", keywords: ["카드형", "card battler", "tabletop"] },
  { value: "텍스트 / 대화형", keywords: ["텍스트", "text-based", "대화형"] },
];

const artPatterns: Pattern[] = [
  { value: "픽셀 아트", keywords: ["픽셀", "pixel art", "pixel"] },
  { value: "로우폴리 3D", keywords: ["로우폴리", "low poly"] },
  { value: "손그림 일러스트", keywords: ["손그림", "핸드드로운", "illustrated", "illustration"] },
  { value: "미니멀 그래픽", keywords: ["미니멀", "minimal", "flat", "vector"] },
  { value: "셀 셰이딩 애니메이션", keywords: ["셀 셰이딩", "cel shading"] },
  { value: "UI 중심 추상 스타일", keywords: ["추상", "abstract", "ui 중심"] },
];

const audiencePatterns: Pattern[] = [
  { value: "캐주얼 유저", keywords: ["캐주얼", "casual"] },
  { value: "코어 게이머", keywords: ["코어", "midcore"] },
  { value: "하드코어 유저", keywords: ["하드코어", "hardcore"] },
  { value: "친구 / 파티 플레이어", keywords: ["친구", "party", "파티", "협동"] },
  { value: "어린이 / 가족", keywords: ["어린이", "키즈", "kids", "family"] },
];

const settingPatterns: Pattern[] = [
  { value: "사이버펑크 도시", keywords: ["사이버펑크", "cyberpunk"] },
  { value: "우주", keywords: ["우주", "space", "galaxy"] },
  { value: "바다", keywords: ["바다", "ocean", "sea"] },
  { value: "숲", keywords: ["숲", "forest"] },
  { value: "지하 / 동굴", keywords: ["동굴", "지하", "cave", "underground"] },
  { value: "마을", keywords: ["마을", "village", "town"] },
  { value: "학교", keywords: ["학교", "school"] },
  { value: "도시", keywords: ["도시", "city", "urban"] },
  { value: "포스트아포칼립스", keywords: ["포스트아포칼립스", "apocalypse", "post-apocalyptic"] },
  { value: "판타지 왕국", keywords: ["판타지", "fantasy kingdom", "왕국", "마법"] },
];

const fantasyPatterns: Pattern[] = [
  { value: "위험한 환경을 돌파하며 배달을 완수하는 플레이어", keywords: ["배달", "delivery"] },
  { value: "오염된 환경을 정화하며 회복을 만드는 플레이어", keywords: ["정화", "cleanse", "cleanup"] },
  { value: "자신만의 공간과 시스템을 운영하는 플레이어", keywords: ["운영", "management", "run a", "manage"] },
  { value: "수집과 생존 판단을 반복하는 플레이어", keywords: ["생존", "survival", "채집", "수집"] },
  { value: "적을 읽고 빠르게 대응하는 전투 플레이어", keywords: ["전투", "combat", "battle"] },
  { value: "은신과 타이밍으로 위기를 통과하는 플레이어", keywords: ["잠입", "stealth", "은신"] },
  { value: "대화와 선택으로 관계를 바꾸는 플레이어", keywords: ["대화", "선택", "story", "narrative"] },
  { value: "퍼즐 구조를 읽고 해답을 찾는 플레이어", keywords: ["퍼즐", "puzzle", "solve"] },
];

const mechanicPatterns: Pattern[] = [
  { value: "탐험", keywords: ["탐험", "explore", "exploration"] },
  { value: "전투", keywords: ["전투", "combat", "battle", "싸우"] },
  { value: "수집", keywords: ["수집", "채집", "collect", "loot"] },
  { value: "제작", keywords: ["제작", "craft", "crafting"] },
  { value: "건설", keywords: ["건설", "build", "base building"] },
  { value: "운영", keywords: ["운영", "management", "manage"] },
  { value: "퍼즐 해결", keywords: ["퍼즐", "solve"] },
  { value: "배달", keywords: ["배달", "delivery"] },
  { value: "정화", keywords: ["정화", "cleanse", "clean up"] },
  { value: "잠입", keywords: ["잠입", "stealth", "은신"] },
  { value: "협동", keywords: ["협동", "co-op", "협력"] },
  { value: "대화", keywords: ["대화", "conversation", "narrative", "story"] },
  { value: "도주", keywords: ["도주", "escape", "evade", "회피"] },
  { value: "덱 빌딩", keywords: ["덱", "deck"] },
  { value: "육성", keywords: ["육성", "upgrade", "grow", "성장"] },
  { value: "리듬 입력", keywords: ["리듬", "beat", "rhythm"] },
];

const ambiguousDescriptors = [
  "감성",
  "중독성",
  "유니크",
  "독특",
  "세련",
  "재밌",
  "재미있",
  "느낌",
  "깊이",
];

export const stageLabels: Record<DesignStage, string> = {
  listening: "Intent intake",
  clarifying: "Clarifying gaps",
  structuring: "Structuring brief",
  ready_for_handoff: "Ready for MCP",
};

export const stageDescriptions: Record<DesignStage, string> = {
  listening: "첫 아이디어를 설계 메모로 바꾸는 단계입니다.",
  clarifying: "모호하거나 비어 있는 항목을 다시 질문하는 단계입니다.",
  structuring: "핵심 필드를 묶어 NLP handoff용 브리프로 정리하는 단계입니다.",
  ready_for_handoff: "구조화된 설계 초안이 있어 MCP 연동 준비가 된 상태입니다.",
};

export const designerStarterPrompts = [
  "비 오는 사이버펑크 도시를 오토바이로 달리며 배달하는 3분짜리 PC 로그라이트 액션을 만들고 싶어.",
  "친구 둘이 협동해서 오염된 바다를 정화하는 포근한 생존 경영 게임을 구상 중이야.",
  "모바일 세로형으로 1분 안에 끝나는 카드 퍼즐 RPG를 만들고 싶어.",
  "동물 마을을 운영하면서 손님들의 사연을 듣는 따뜻한 라이프 시뮬레이션을 생각하고 있어.",
];

export function createInitialDesignSession(): DesignSession {
  const brief = createEmptyBrief();
  const questions: DesignQuestion[] = [
    questionTemplates.genre,
    questionTemplates.platform,
    questionTemplates.sessionLength,
  ].map((question, index) => ({
    id: `initial_${index}`,
    title: question.title,
    description: question.description,
    priority: question.priority,
  }));
  const assumptions = ["아직 정보가 적어서 질문 중심 모드로 대화를 시작합니다."];
  const suggestedReplies = [
    "모바일 세로형으로 1분 안에 끝나게 하고 싶어",
    "PC용 협동 생존 경영 게임을 생각 중이야",
    "픽셀 아트 로그라이트 액션으로 가고 싶어",
  ];

  return {
    brief,
    stage: "listening",
    signals: [],
    questions,
    assumptions,
    suggestedReplies,
    payloadPreview: buildPayloadPreview({
      brief,
      stage: "listening",
      signals: [],
      questions,
      assumptions,
      suggestedReplies,
      payloadPreview: "",
    }),
  };
}

export const initialDesignerMessages: DesignerMessage[] = [
  createMessage(
    "assistant",
    "원하는 게임을 자연어로 설명해 주세요.\n\n저는 장르, 플레이 감정, 플랫폼, 화면 시점, 세션 길이처럼 설계에 꼭 필요한 항목을 정리하고, 비어 있거나 모호한 부분만 다시 물어보겠습니다.",
    {
      chips: ["장르", "핵심 루프", "플랫폼", "아트 톤"],
      followUps: ["예: 모바일 세로형 카드 퍼즐 RPG", "예: 친구 둘이 협동하는 cozy survival"],
    },
  ),
];

export function createUserMessage(content: string) {
  return createMessage("user", content);
}

export function analyzeDesignPrompt(session: DesignSession, prompt: string) {
  const normalized = prompt.toLowerCase();
  const previousBrief = session.brief;
  const confirmedFields = new Set<keyof DesignBrief>();

  const detectedGenre = matchPattern(normalized, genrePatterns);
  if (detectedGenre) {
    confirmedFields.add("genre");
  }

  const detectedTone = matchPattern(normalized, tonePatterns);
  if (detectedTone) {
    confirmedFields.add("tone");
  }

  const detectedPlatform = matchPattern(normalized, platformPatterns);
  if (detectedPlatform) {
    confirmedFields.add("platform");
  }

  const detectedPerspective = matchPattern(normalized, perspectivePatterns);
  if (detectedPerspective) {
    confirmedFields.add("perspective");
  }

  const detectedArtDirection = matchPattern(normalized, artPatterns);
  if (detectedArtDirection) {
    confirmedFields.add("artDirection");
  }

  const detectedAudience = matchPattern(normalized, audiencePatterns);
  if (detectedAudience) {
    confirmedFields.add("audience");
  }

  const detectedSetting = matchPattern(normalized, settingPatterns);
  if (detectedSetting) {
    confirmedFields.add("setting");
  }

  const detectedFantasy = matchPattern(normalized, fantasyPatterns);
  if (detectedFantasy) {
    confirmedFields.add("playerFantasy");
  }

  const detectedSessionLength = extractSessionLength(prompt);
  if (detectedSessionLength) {
    confirmedFields.add("sessionLength");
  }

  const explicitLoop = extractExplicitLoop(prompt);
  const detectedMechanics = collectPatternMatches(normalized, mechanicPatterns, 4);
  if (explicitLoop || detectedMechanics.length >= 2) {
    confirmedFields.add("coreLoop");
  }

  const detectedProgression = inferProgression(normalized, detectedGenre || previousBrief.genre, detectedMechanics);
  if (detectedProgression) {
    confirmedFields.add("progression");
  }

  const detectedReferences = extractReferences(prompt);
  const detectedConstraints = extractConstraints(prompt, normalized, detectedSessionLength);
  const proposedTitle = extractTitle(prompt);
  const detectedPremise = extractPremise(prompt, previousBrief.premise, confirmedFields.size);

  const nextBrief: DesignBrief = {
    title:
      proposedTitle ||
      previousBrief.title ||
      deriveTitle(detectedGenre || previousBrief.genre, detectedSetting || previousBrief.setting),
    premise: detectedPremise || previousBrief.premise,
    genre: detectedGenre || previousBrief.genre,
    playerFantasy:
      detectedFantasy ||
      previousBrief.playerFantasy ||
      inferPlayerFantasy(
        detectedGenre || previousBrief.genre,
        detectedSetting || previousBrief.setting,
        detectedMechanics,
      ),
    coreLoop:
      explicitLoop ||
      previousBrief.coreLoop ||
      inferCoreLoop(detectedMechanics, detectedGenre || previousBrief.genre),
    setting: detectedSetting || previousBrief.setting,
    platform: detectedPlatform || previousBrief.platform,
    perspective: detectedPerspective || previousBrief.perspective,
    tone: detectedTone || previousBrief.tone,
    artDirection: detectedArtDirection || previousBrief.artDirection,
    audience: detectedAudience || previousBrief.audience,
    sessionLength: detectedSessionLength || previousBrief.sessionLength,
    progression: previousBrief.progression || detectedProgression,
    references: mergeUnique(previousBrief.references, detectedReferences),
    constraints: mergeUnique(previousBrief.constraints, detectedConstraints),
  };

  if (!nextBrief.progression) {
    nextBrief.progression = inferProgression(
      normalized,
      nextBrief.genre,
      explicitLoop ? explicitLoop.split(" -> ") : detectedMechanics,
    );
  }

  if (!nextBrief.coreLoop) {
    nextBrief.coreLoop = inferCoreLoop(detectedMechanics, nextBrief.genre);
  }

  if (!nextBrief.playerFantasy) {
    nextBrief.playerFantasy = inferPlayerFantasy(nextBrief.genre, nextBrief.setting, detectedMechanics);
  }

  if (!nextBrief.title) {
    nextBrief.title = "Untitled Game";
  }

  const ambiguousTerms = collectAmbiguousTerms(normalized);
  const questions = buildQuestions(nextBrief, ambiguousTerms);
  const stage = deriveStage(nextBrief);
  const assumptions = buildAssumptions(nextBrief, stage);
  const suggestedReplies = buildSuggestedReplies(questions);
  const signals = buildSignals(nextBrief, confirmedFields);

  const nextSession: DesignSession = {
    brief: nextBrief,
    stage,
    signals,
    questions,
    assumptions,
    suggestedReplies,
    payloadPreview: buildPayloadPreview({
      brief: nextBrief,
      stage,
      signals,
      questions,
      assumptions,
      suggestedReplies,
      payloadPreview: "",
    }),
  };

  const changedFields = Array.from(confirmedFields).map((field) => fieldLabels[field]);
  const assistantMessage = createAssistantMessage(nextSession, changedFields, ambiguousTerms);

  return {
    nextSession,
    assistantMessage,
  };
}

export function getBriefFieldRows(brief: DesignBrief): BriefFieldRow[] {
  return briefFieldOrder.map((key) => {
    const value = Array.isArray(brief[key]) ? (brief[key] as string[]).join(", ") : String(brief[key] || "");

    return {
      key,
      label: fieldLabels[key],
      value,
      status: value ? "filled" : "missing",
    };
  });
}

export function getBriefCompletion(brief: DesignBrief) {
  const filled = completionFieldKeys.filter((key) => Boolean(brief[key])).length;

  return {
    filled,
    total: completionFieldKeys.length,
  };
}

export function getHandoffSteps(stage: DesignStage, questionCount: number): HandoffStep[] {
  return [
    {
      label: "Intent capture",
      detail: "사용자 자연어를 설계 메모로 정규화",
      status: stage === "listening" ? "current" : "done",
    },
    {
      label: "Gap check",
      detail: questionCount > 0 ? `${questionCount}개의 열린 질문 유지` : "빈칸이 거의 없음",
      status:
        stage === "clarifying" || (stage === "listening" && questionCount > 0)
          ? "current"
          : questionCount === 0
            ? "done"
            : "todo",
    },
    {
      label: "Brief structuring",
      detail: "장르, 루프, 플랫폼, 톤, 성장 구조 패키징",
      status: stage === "structuring" ? "current" : stage === "ready_for_handoff" ? "done" : "todo",
    },
    {
      label: "MCP handoff",
      detail: "향후 spec writer / asset planner / quest builder 연결",
      status: stage === "ready_for_handoff" ? "done" : "todo",
    },
  ];
}

function createEmptyBrief(): DesignBrief {
  return {
    title: "",
    premise: "",
    genre: "",
    playerFantasy: "",
    coreLoop: "",
    setting: "",
    platform: "",
    perspective: "",
    tone: "",
    artDirection: "",
    audience: "",
    sessionLength: "",
    progression: "",
    references: [],
    constraints: [],
  };
}

function createMessage(role: MessageRole, content: string, extra?: Partial<DesignerMessage>): DesignerMessage {
  return {
    id: `${role}_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    role,
    content,
    timestamp: new Intl.DateTimeFormat("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date()),
    ...extra,
  };
}

function createAssistantMessage(
  session: DesignSession,
  changedFields: string[],
  ambiguousTerms: string[],
) {
  const direction = session.brief.genre ? `${session.brief.genre} 방향` : "초기 방향";
  const updateLine = changedFields.length
    ? `${changedFields.join(", ")}를 중심으로 설계 메모를 갱신했습니다.`
    : "이번 입력은 메모에 반영했지만 아직 확정적으로 읽힌 필드는 많지 않습니다.";
  const ambiguityLine = ambiguousTerms.length
    ? `‘${ambiguousTerms.slice(0, 2).join("’, ‘")}’ 같은 표현은 더 구체적인 감정이나 레퍼런스로 바꾸면 NLP 정확도가 올라갑니다.`
    : "";
  const nextLine = session.questions.length
    ? `다음으로는 ${session.questions[0].title}`
    : "핵심 설계 필드가 채워져서 NLP가 구조화된 브리프로 넘길 준비가 됐습니다.";
  const chips = session.signals.slice(0, 5).map((signal) => `${signal.label} · ${signal.value}`);

  return createMessage("assistant", `${direction}으로 설계를 읽고 있습니다.\n\n${updateLine}\n\n${ambiguityLine || nextLine}`, {
    chips,
    checklist: session.assumptions.slice(0, 3),
    followUps: session.questions.slice(0, 3).map((question) => question.title),
  });
}

function buildPayloadPreview(session: DesignSession) {
  return JSON.stringify(
    {
      stage: session.stage,
      brief: {
        title: session.brief.title || null,
        premise: session.brief.premise || null,
        genre: session.brief.genre || null,
        playerFantasy: session.brief.playerFantasy || null,
        coreLoop: session.brief.coreLoop || null,
        setting: session.brief.setting || null,
        platform: session.brief.platform || null,
        perspective: session.brief.perspective || null,
        tone: session.brief.tone || null,
        artDirection: session.brief.artDirection || null,
        audience: session.brief.audience || null,
        sessionLength: session.brief.sessionLength || null,
        progression: session.brief.progression || null,
        references: session.brief.references,
        constraints: session.brief.constraints,
      },
      openQuestions: session.questions.map((question) => question.title),
      assumptions: session.assumptions,
    },
    null,
    2,
  );
}

function buildQuestions(brief: DesignBrief, ambiguousTerms: string[]) {
  const questions: DesignQuestion[] = [];

  if (!brief.genre) {
    questions.push(createQuestion("genre"));
  }
  if (!brief.coreLoop) {
    questions.push(createQuestion("coreLoop"));
  }
  if (!brief.platform) {
    questions.push(createQuestion("platform"));
  }
  if (!brief.perspective) {
    questions.push(createQuestion("perspective"));
  }
  if (!brief.artDirection) {
    questions.push(createQuestion("artDirection"));
  }
  if (!brief.sessionLength) {
    questions.push(createQuestion("sessionLength"));
  }
  if (!brief.audience) {
    questions.push(createQuestion("audience"));
  }
  if (!brief.progression) {
    questions.push(createQuestion("progression"));
  }
  if (!brief.tone) {
    questions.push(createQuestion("tone"));
  }
  if (ambiguousTerms.length > 0) {
    questions.push({
      id: `ambiguity_${ambiguousTerms[0]}`,
      title: `‘${ambiguousTerms[0]}’이 어떤 감정인지 더 구체적으로 정해 주세요.`,
      description: "예: 포근함, 긴장감, 우울함, 유머처럼 감정 단어로 바꾸면 좋습니다.",
      priority: "important",
    });
  }

  return questions.slice(0, 4);
}

function buildSuggestedReplies(questions: DesignQuestion[]) {
  if (questions.length === 0) {
    return [
      "메타 성장 구조도 더 자세히 잡아줘",
      "튜토리얼 첫 5분 흐름을 정리해줘",
      "MCP로 넘길 schema preview 형식으로 보여줘",
    ];
  }

  const suggestions = questions.flatMap((question) => {
    if (question.id.startsWith("ambiguity_")) {
      return ["포근하지만 살짝 쓸쓸한 톤이야", "긴장감이 있지만 공포는 아니야", "유머러스한 방향으로 가고 싶어"];
    }

    const template = questionTemplates[question.id as keyof typeof questionTemplates];
    return template?.suggestions ?? [];
  });

  return uniqueStrings(suggestions).slice(0, 6);
}

function buildAssumptions(brief: DesignBrief, stage: DesignStage) {
  const assumptions: string[] = [];

  if (!brief.platform) {
    assumptions.push("플랫폼이 확정되기 전까지 입력 흐름은 PC 기준으로 임시 가정합니다.");
  }
  if (!brief.perspective) {
    assumptions.push("시점이 미정이라 화면 설계는 범용 채팅형 레이아웃으로 유지합니다.");
  }
  if (!brief.artDirection) {
    assumptions.push("아트 톤은 asset pipeline 연결 직전에 고정해도 괜찮습니다.");
  }
  if (stage === "ready_for_handoff") {
    assumptions.push("현재 정보만으로도 NLP가 MCP 전달용 초안 패키지를 만들 수 있습니다.");
  }

  return assumptions.slice(0, 3);
}

function buildSignals(brief: DesignBrief, confirmedFields: Set<keyof DesignBrief>): DesignSignal[] {
  const signalDefinitions: Array<{ label: string; key: keyof DesignBrief; value: string }> = [
    { label: "Genre", key: "genre", value: brief.genre },
    { label: "Setting", key: "setting", value: brief.setting },
    { label: "Platform", key: "platform", value: brief.platform },
    { label: "View", key: "perspective", value: brief.perspective },
    { label: "Loop", key: "coreLoop", value: brief.coreLoop },
    { label: "Tone", key: "tone", value: brief.tone },
    { label: "Art", key: "artDirection", value: brief.artDirection },
    { label: "Session", key: "sessionLength", value: brief.sessionLength },
  ];

  return signalDefinitions
    .filter((signal) => Boolean(signal.value))
    .slice(0, 6)
    .map((signal) => {
      const confidence: Confidence = confirmedFields.has(signal.key) ? "high" : "medium";

      return {
        label: signal.label,
        value: signal.value,
        confidence,
      };
    });
}

function deriveStage(brief: DesignBrief): DesignStage {
  const missingCount = stageFieldKeys.filter((key) => !brief[key]).length;

  if (missingCount >= 5) {
    return "listening";
  }
  if (missingCount >= 3) {
    return "clarifying";
  }
  if (missingCount >= 1) {
    return "structuring";
  }
  return "ready_for_handoff";
}

function createQuestion(key: keyof typeof questionTemplates): DesignQuestion {
  const template = questionTemplates[key];

  return {
    id: key,
    title: template.title,
    description: template.description,
    priority: template.priority,
  };
}

function matchPattern(input: string, patterns: Pattern[]) {
  return patterns.find((pattern) => pattern.keywords.some((keyword) => input.includes(keyword)))?.value ?? "";
}

function collectPatternMatches(input: string, patterns: Pattern[], limit = 3) {
  const values: string[] = [];

  for (const pattern of patterns) {
    if (pattern.keywords.some((keyword) => input.includes(keyword)) && !values.includes(pattern.value)) {
      values.push(pattern.value);
    }
    if (values.length === limit) {
      break;
    }
  }

  return values;
}

function extractTitle(prompt: string) {
  const match = prompt.match(/(?:제목|타이틀)\s*(?:은|는|:)?\s*["“]?([^"\n]{2,48})["”]?/i);
  return match ? compactText(match[1]) : "";
}

function extractPremise(prompt: string, currentPremise: string, confirmedFieldCount: number) {
  const compact = compactText(prompt);
  if (!compact) {
    return currentPremise;
  }
  if (currentPremise && compact.length < 28 && confirmedFieldCount <= 2) {
    return currentPremise;
  }
  return compact.length > 128 ? `${compact.slice(0, 125)}...` : compact;
}

function extractSessionLength(prompt: string) {
  const match = prompt.match(/(\d+)\s*(초|분|시간|sec(?:ond)?s?|min(?:ute)?s?|hours?)/i);
  if (!match) {
    return "";
  }

  const amount = Number(match[1]);
  const rawUnit = match[2].toLowerCase();
  const unit = rawUnit.startsWith("sec")
    ? "초"
    : rawUnit.startsWith("min")
      ? "분"
      : rawUnit.startsWith("hour")
        ? "시간"
        : rawUnit;
  const within = /안에|이내|within/i.test(prompt) ? " 이내" : "";

  return `${amount}${unit}${within}`;
}

function extractExplicitLoop(prompt: string) {
  const match = prompt.match(/([A-Za-z0-9가-힣 /]+(?:->|→)[A-Za-z0-9가-힣 /]+(?:->|→)[A-Za-z0-9가-힣 /]+)/);
  if (!match) {
    return "";
  }
  return compactText(match[1].replaceAll("→", " -> "));
}

function inferCoreLoop(mechanics: string[], genre: string) {
  if (mechanics.length >= 3) {
    return mechanics.slice(0, 3).join(" -> ");
  }
  if (genre.includes("로그")) {
    return "탐험 -> 전투 -> 귀환";
  }
  if (genre.includes("경영")) {
    return "획득 -> 배치 / 운영 -> 확장";
  }
  if (genre.includes("퍼즐")) {
    return "관찰 -> 해결 -> 다음 난도";
  }
  if (genre.includes("서바이벌")) {
    return "탐색 -> 수집 -> 생존 유지";
  }
  return "";
}

function inferPlayerFantasy(genre: string, setting: string, mechanics: string[]) {
  if (mechanics.includes("배달")) {
    return "위험한 환경을 돌파하며 배달을 완수하는 플레이어";
  }
  if (mechanics.includes("정화")) {
    return "오염된 환경을 정화하며 회복을 만드는 플레이어";
  }
  if (mechanics.includes("운영") || genre.includes("경영")) {
    return "자기만의 공간과 시스템을 운영하는 플레이어";
  }
  if (mechanics.includes("협동")) {
    return "서로 역할을 나누어 문제를 해결하는 팀 플레이어";
  }
  if (genre.includes("로그")) {
    return "매 런마다 리스크와 보상을 저울질하는 플레이어";
  }
  if (setting) {
    return `${setting}에서 자신의 방식으로 문제를 해결하는 플레이어`;
  }
  return "";
}

function inferProgression(input: string, genre: string, mechanics: string[]) {
  if (input.includes("챕터") || input.includes("스토리")) {
    return "챕터 해금과 스토리 진행";
  }
  if (genre.includes("로그")) {
    return "런 단위 반복 + 메타 업그레이드";
  }
  if (genre.includes("경영") || mechanics.includes("운영")) {
    return "시설 확장과 신규 시스템 해금";
  }
  if (mechanics.includes("전투")) {
    return "적 패턴 확장과 장비 성장";
  }
  if (mechanics.includes("협동")) {
    return "역할 해금과 팀 조합 확장";
  }
  return "";
}

function extractReferences(prompt: string) {
  const matches = Array.from(prompt.matchAll(/([A-Za-z0-9가-힣][A-Za-z0-9가-힣 :'\-]{1,28})\s*(같은|처럼)/g))
    .map((match) => compactText(match[1]))
    .filter((value) => value.length >= 2 && value !== "게임");

  return uniqueStrings(matches).slice(0, 3);
}

function extractConstraints(prompt: string, normalized: string, sessionLength: string) {
  const constraints: string[] = [];

  if (normalized.includes("세로형")) {
    constraints.push("세로형 UI");
  }
  if (normalized.includes("한 손") || normalized.includes("원핸드")) {
    constraints.push("한 손 조작");
  }
  if (normalized.includes("저사양") || normalized.includes("low spec")) {
    constraints.push("저사양 대응");
  }
  if (normalized.includes("오프라인")) {
    constraints.push("오프라인 플레이");
  }
  if (normalized.includes("협동") || normalized.includes("멀티")) {
    constraints.push("멀티플레이 고려");
  }
  if (normalized.includes("웹") || normalized.includes("브라우저")) {
    constraints.push("브라우저 실행");
  }
  if (sessionLength && (sessionLength.includes("초") || sessionLength.includes("분"))) {
    constraints.push("짧은 세션");
  }
  if (/실시간|real-time/i.test(prompt)) {
    constraints.push("실시간 반응성");
  }

  return uniqueStrings(constraints).slice(0, 4);
}

function collectAmbiguousTerms(input: string) {
  return uniqueStrings(
    ambiguousDescriptors.filter((descriptor) => input.includes(descriptor)).map((descriptor) => descriptor.trim()),
  ).slice(0, 2);
}

function deriveTitle(genre: string, setting: string) {
  if (!genre && !setting) {
    return "";
  }

  const left = setting || "New";
  const right = genre || "Game";
  return `${left} ${right}`.trim();
}

function mergeUnique(current: string[], incoming: string[]) {
  return uniqueStrings([...current, ...incoming]).slice(0, 5);
}

function uniqueStrings(values: string[]) {
  return values.filter((value, index) => value && values.indexOf(value) === index);
}

function compactText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

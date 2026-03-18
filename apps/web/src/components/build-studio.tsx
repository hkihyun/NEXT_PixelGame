"use client";

import {
  initialGameSpec,
  initialMessages,
  screenStates,
  type ChatMessage,
  type GameSpec,
  type ScreenState,
} from "@pixel/contracts";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import styles from "./build-studio.module.css";
import {
  allowedActions,
  applyMockPrompt,
  buildFlow,
  buildStateLabels,
  deriveAssetCards,
  deriveSummary,
  getPreviewActors,
  getThemeLabel,
  starterPrompts,
  themePresentation,
} from "@/lib/mock-game";

const transitionSequence: Array<{ delay: number; state: ScreenState }> = [
  { delay: 180, state: "drafting_spec" },
  { delay: 520, state: "waiting_user_confirmation" },
  { delay: 920, state: "building_preview" },
  { delay: 1450, state: "preview_ready" },
];

export function BuildStudio() {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [spec, setSpec] = useState<GameSpec>(initialGameSpec);
  const [buildState, setBuildState] = useState<ScreenState>("idle");
  const [latestPatch, setLatestPatch] = useState("{}");
  const [isPending, startTransition] = useTransition();
  const timeoutsRef = useRef<number[]>([]);

  const summary = deriveSummary(spec, buildState);
  const assetCards = deriveAssetCards(spec);
  const previewActors = getPreviewActors(spec);

  useEffect(() => {
    const timers = timeoutsRef.current;

    return () => {
      clearTimers(timers);
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const prompt = draft.trim();
    if (!prompt) {
      return;
    }

    clearTimers(timeoutsRef.current);
    setBuildState("collecting_intent");

    const userMessage = createMessage("user", prompt);
    const result = applyMockPrompt(spec, prompt);
    const assistantMessage = createMessage("assistant", result.assistantText);

    startTransition(() => {
      setMessages((current) => [...current, userMessage, assistantMessage]);
      setSpec(result.nextSpec);
      setLatestPatch(result.patchText);
      setDraft("");
    });

    transitionSequence.forEach(({ delay, state }) => {
      const timeout = window.setTimeout(() => {
        setBuildState(state);
      }, delay);

      timeoutsRef.current.push(timeout);
    });
  }

  return (
    <div className={styles.page}>
      <section className={`shell ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <span className="eyebrow">Build Studio</span>
          <h1>대화 입력을 Game Spec patch로 바꾸는 첫 프론트 흐름</h1>
          <p>
            문서 기준으로 좌측에는 대화 UI, 우측에는 요약 카드, 에셋 프리뷰,
            미리보기 패널을 고정했습니다. 실제 백엔드 없이도 허용된 액션 범위 안에서
            상태 전환을 검증할 수 있습니다.
          </p>
        </div>
        <div className={`card ${styles.heroAside}`}>
          <span className="status-pill">{buildStateLabels[buildState]}</span>
          <strong>{summary.highlight}</strong>
          <p>
            현재 mock 프로젝트는 <span className="mono">{spec.projectId}</span> 기준으로
            동작하며, 입력 후 preview 상태가 자동으로 갱신됩니다.
          </p>
          <Link className="button button--ghost button--small" href="/publish">
            퍼블리시 폼으로 이동
          </Link>
        </div>
      </section>

      <section className={`shell ${styles.workspace}`}>
        <div className={`card ${styles.chatCard}`}>
          <div className={styles.cardHeading}>
            <div>
              <span className="eyebrow">Chat</span>
              <h2>대화 입력</h2>
            </div>
            <span className={styles.cardMeta}>{messages.length} messages</span>
          </div>

          <div className={styles.promptRow}>
            {starterPrompts.map((prompt) => (
              <button
                className={styles.promptChip}
                key={prompt}
                onClick={() => setDraft(prompt)}
                type="button"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className={styles.messageList}>
            {messages.map((message) => (
              <article
                className={`${styles.message} ${
                  message.role === "user" ? styles.messageUser : styles.messageAssistant
                }`}
                key={message.id}
              >
                <div className={styles.messageTop}>
                  <strong>{message.role === "user" ? "User" : "Assistant"}</strong>
                  <span>{message.timestamp}</span>
                </div>
                <p>{message.content}</p>
              </article>
            ))}
          </div>

          <form className={styles.composer} onSubmit={handleSubmit}>
            <label className={styles.fieldLabel} htmlFor="build-input">
              허용 액션 범위 안에서 수정 요청 입력
            </label>
            <textarea
              className={styles.textarea}
              id="build-input"
              onChange={(event) => setDraft(event.target.value)}
              placeholder="예: 네온 테마로 바꾸고 적 5마리, 점프력 500으로 올려 줘"
              value={draft}
            />
            <div className={styles.composerFooter}>
              <span>현재 단계: {buildStateLabels[buildState]}</span>
              <button className="button button--primary" disabled={isPending} type="submit">
                {isPending ? "Spec 갱신 중..." : "Spec patch 적용"}
              </button>
            </div>
          </form>
        </div>

        <div className={styles.rightRail}>
          <section className={`card ${styles.summaryCard}`}>
            <div className={styles.cardHeading}>
              <div>
                <span className="eyebrow">Summary</span>
                <h2>게임 요약 카드</h2>
              </div>
              <span className={styles.cardMeta}>{getThemeLabel(summary.theme)}</span>
            </div>
            <div className={styles.summaryGrid}>
              <article>
                <span>Genre</span>
                <strong>{summary.genre}</strong>
              </article>
              <article>
                <span>Theme</span>
                <strong>{getThemeLabel(summary.theme)}</strong>
              </article>
              <article>
                <span>Goal</span>
                <strong>{summary.goal}</strong>
              </article>
              <article>
                <span>Build</span>
                <strong>{buildStateLabels[summary.buildState]}</strong>
              </article>
            </div>
            <div className={styles.summaryFooter}>
              <p>{summary.highlight}</p>
              <div className={styles.statusRow}>
                {buildFlow.map((state) => (
                  <span
                    className={`${styles.stateChip} ${
                      state === buildState ? styles.stateChipActive : ""
                    }`}
                    key={state}
                  >
                    {buildStateLabels[state]}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className={`card ${styles.assetCard}`}>
            <div className={styles.cardHeading}>
              <div>
                <span className="eyebrow">Assets</span>
                <h2>에셋 프리뷰</h2>
              </div>
              <span className={styles.cardMeta}>4 cards</span>
            </div>
            <div className={styles.assetGrid}>
              {assetCards.map((card) => (
                <article className={styles.assetItem} key={card.id}>
                  <div className={styles.assetSwatch} style={{ background: card.accent }} />
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                  <p>{card.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={`card ${styles.previewCard}`}>
            <div className={styles.cardHeading}>
              <div>
                <span className="eyebrow">Preview</span>
                <h2>게임 미리보기 패널</h2>
              </div>
              <span className={styles.cardMeta}>{buildStateLabels[buildState]}</span>
            </div>

            <div
              className={styles.previewStage}
              style={{ background: themePresentation[spec.theme].surface }}
            >
              <div className={styles.previewTop}>
                <span className={styles.previewBadge}>{spec.template}</span>
                <span className={styles.previewBadge}>{spec.map.tilesetId}</span>
                <span className={styles.previewBadge}>{spec.audio.bgm}</span>
              </div>
              <div className={styles.pixelField}>
                {Array.from({ length: 30 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
              <div className={styles.actorStrip}>
                {previewActors.map((actor) => (
                  <span key={actor}>{actor}</span>
                ))}
              </div>
            </div>

            <div className={styles.detailGrid}>
              <article>
                <span>Allowed actions</span>
                <div className={styles.tagList}>
                  {allowedActions.map((action) => (
                    <span className={styles.inlineTag} key={action}>
                      {action}
                    </span>
                  ))}
                </div>
              </article>
              <article>
                <span>State model</span>
                <div className={styles.tagList}>
                  {screenStates.map((state) => (
                    <span className={styles.inlineTag} key={state}>
                      {buildStateLabels[state]}
                    </span>
                  ))}
                </div>
              </article>
            </div>

            <div className={styles.patchPanel}>
              <div className={styles.patchTop}>
                <strong>Latest Spec Patch</strong>
                <span className="mono">contract-first mock</span>
              </div>
              <pre>{latestPatch}</pre>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: `${role}_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    role,
    content,
    timestamp: new Intl.DateTimeFormat("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date()),
  };
}

function clearTimers(timers: number[]) {
  timers.forEach((timer) => window.clearTimeout(timer));
  timers.length = 0;
}

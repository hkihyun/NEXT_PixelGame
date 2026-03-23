"use client";

import Link from "next/link";
import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  analyzeDesignPrompt,
  createInitialDesignSession,
  createUserMessage,
  designerStarterPrompts,
  initialDesignerMessages,
  stageLabels,
  type DesignSession,
  type DesignerMessage,
} from "@/lib/build-designer";
import styles from "./build-studio.module.css";

interface ConversationRecord {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
  messages: DesignerMessage[];
  session: DesignSession;
}

const seededConversations = [
  createConversationRecord("current", [], "Now", "New Game Design"),
  createConversationRecord(
    "mobile_cards",
    [
      "모바일 세로형으로 1분 안에 끝나는 카드 퍼즐 RPG를 만들고 싶어.",
      "픽셀 아트로 가고, 플레이어는 카드 조합으로 적을 밀어내면 좋겠어.",
    ],
    "Today",
    "Vertical Card Puzzle",
  ),
  createConversationRecord(
    "cozy_ocean",
    [
      "친구 둘이 협동해서 오염된 바다를 정화하는 포근한 생존 경영 게임을 구상 중이야.",
      "PC 기준이고 한 판은 10분 정도, 시점은 탑다운이면 좋겠어.",
    ],
    "Yesterday",
    "Cozy Ocean Co-op",
  ),
  createConversationRecord(
    "city_delivery",
    ["비 오는 사이버펑크 도시를 오토바이로 달리며 배달하는 3분짜리 PC 로그라이트 액션을 만들고 싶어."],
    "This week",
    "Cyberpunk Delivery",
  ),
];

export function BuildStudio() {
  const [conversations, setConversations] = useState<ConversationRecord[]>(seededConversations);
  const [activeConversationId, setActiveConversationId] = useState(seededConversations[0]?.id ?? "current");
  const [draft, setDraft] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPending, startTransition] = useTransition();
  const messageViewportRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeConversation =
    conversations.find((conversation) => conversation.id === activeConversationId) ?? conversations[0];

  const syncScroll = useEffectEvent(() => {
    const viewport = messageViewportRef.current;
    if (!viewport) {
      return;
    }

    viewport.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    });
  });

  useEffect(() => {
    syncScroll();
  }, [activeConversation?.messages.length, activeConversationId]);

  if (!activeConversation) {
    return null;
  }

  const isFreshConversation = activeConversation.messages.length <= 1;
  const topSignals = activeConversation.session.signals.slice(0, 4);
  const topQuestions = activeConversation.session.questions.slice(0, 2);

  function submitPrompt(rawPrompt: string) {
    const prompt = rawPrompt.trim();
    if (!prompt) {
      return;
    }

    const userMessage = createUserMessage(prompt);
    const result = analyzeDesignPrompt(activeConversation.session, prompt);
    const updatedConversation: ConversationRecord = {
      ...activeConversation,
      title: buildConversationTitle(result.nextSession, prompt, activeConversation.title),
      preview: buildConversationPreview(result.nextSession, prompt),
      updatedAt: "Now",
      messages: [...activeConversation.messages, userMessage, result.assistantMessage],
      session: result.nextSession,
    };

    startTransition(() => {
      setConversations((current) => [
        updatedConversation,
        ...current.filter((conversation) => conversation.id !== activeConversation.id),
      ]);
      setDraft("");
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitPrompt(draft);
  }

  function handleComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  function handleSuggestionClick(prompt: string) {
    submitPrompt(prompt);
    textareaRef.current?.focus();
  }

  function handleCreateConversation() {
    const nextConversation = createConversationRecord(createConversationId(), [], "Now", "New Game Design");
    setConversations((current) => [nextConversation, ...current]);
    setActiveConversationId(nextConversation.id);
    setDraft("");
  }

  function toggleSidebar() {
    setIsSidebarOpen((current) => !current);
  }

  return (
    <div className={styles.page}>
      <section
        className={`shell ${styles.layout}`}
        data-sidebar-open={isSidebarOpen}
      >
        <button
          aria-expanded={isSidebarOpen}
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          className={styles.sidebarHandle}
          data-open={isSidebarOpen}
          onClick={toggleSidebar}
          type="button"
        >
          <span className={styles.sidebarHandleGlyph} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className={styles.sidebarHandleLabel}>{isSidebarOpen ? "Hide chats" : "Show chats"}</span>
        </button>

        <aside className={`card ${styles.sidebar}`} data-open={isSidebarOpen}>
          <div className={styles.sidebarTop}>
            <div className={styles.sidebarActions}>
              <button
                className={`button button--primary button--small ${styles.sidebarCreate}`}
                onClick={handleCreateConversation}
                type="button"
              >
                <span className={styles.sidebarCreateIcon}>+</span>
                <span className={styles.sidebarCreateLabel}>New chat</span>
              </button>
            </div>

            <div className={styles.sidebarIntro}>
              <span className="eyebrow">Create Game</span>
              <h1>Game Design Chat</h1>
            </div>
          </div>

          <div className={styles.sidebarMeta}>
            <span>NLP-ready frontend</span>
            <p>프롬프트가 메인이 되고, 과거 대화는 왼쪽에서 빠르게 전환할 수 있는 구조입니다.</p>
          </div>

          <div className={styles.historyBlock}>
            <div className={styles.historyHeader}>
              <span className={styles.sidebarLabel}>Recent conversations</span>
            </div>

            <div className={styles.historyList}>
              {conversations.map((conversation) => (
                <button
                  className={styles.historyItem}
                  data-active={conversation.id === activeConversationId}
                  key={conversation.id}
                  onClick={() => setActiveConversationId(conversation.id)}
                  type="button"
                >
                  <span className={styles.historyAvatar}>{getConversationGlyph(conversation.title)}</span>
                  <div className={styles.historyContent}>
                    <strong>{conversation.title}</strong>
                    <p>{conversation.preview}</p>
                    <span>{conversation.updatedAt}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sidebarFooter}>
            <span>{stageLabels[activeConversation.session.stage]}</span>
            <Link href="/publish">Publish shell</Link>
          </div>
        </aside>

        <section className={`card ${styles.mainShell}`}>
          <header className={styles.mainHeader}>
            <div className={styles.mainIdentity}>
              <strong>{activeConversation.title}</strong>
              <p>
                {isFreshConversation
                  ? "LLM 화면처럼 프롬프트를 중심에 두고, 필요한 질문만 이어서 설계를 구체화하는 구조입니다."
                  : activeConversation.preview}
              </p>
            </div>

            <div className={styles.headerActions}>
              <span className={styles.headerChip}>{stageLabels[activeConversation.session.stage]}</span>
              <span className={styles.headerChip}>
                {activeConversation.session.questions.length} open questions
              </span>
            </div>
          </header>

          {topSignals.length ? (
            <div className={styles.signalStrip}>
              {topSignals.map((signal) => (
                <span className={styles.signalChip} key={`${signal.label}-${signal.value}`}>
                  {signal.label}: {signal.value}
                </span>
              ))}
            </div>
          ) : null}

          {isFreshConversation ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyCopy}>
                <span className={styles.emptyLabel}>Build with natural language</span>
                <h2>어떤 게임을 만들고 싶나요?</h2>
                <p>
                  원하는 게임을 설명하면 필요한 정보만 다시 질문하고, 대화가 곧 게임 설계 메모가 되도록
                  프론트를 구성했습니다.
                </p>
              </div>

              <form className={`${styles.composer} ${styles.composerCentered}`} onSubmit={handleSubmit}>
                <label className={styles.composerLabel} htmlFor="design-prompt">
                  게임 아이디어를 자유롭게 입력하세요
                </label>
                <textarea
                  className={styles.textarea}
                  id="design-prompt"
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={handleComposerKeyDown}
                  placeholder="예: 친구 둘이 협동해서 오염된 바다를 정화하는 포근한 생존 경영 게임을 만들고 싶어. PC 기준이고 한 판은 10분 정도였으면 해."
                  ref={textareaRef}
                  value={draft}
                />
                <div className={styles.composerFooter}>
                  <div className={styles.composerHints}>
                    <span>Enter send</span>
                    <span>Shift + Enter new line</span>
                  </div>
                  <button className="button button--primary" disabled={isPending} type="submit">
                    {isPending ? "Preparing..." : "Send prompt"}
                  </button>
                </div>
              </form>

              <div className={styles.starterRow}>
                {designerStarterPrompts.map((prompt) => (
                  <button
                    className={styles.starterChip}
                    key={prompt}
                    onClick={() => handleSuggestionClick(prompt)}
                    type="button"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.conversationView}>
              <div className={styles.threadViewport} ref={messageViewportRef}>
                <div className={styles.thread}>
                  {activeConversation.messages.map((message) => (
                    <article className={styles.message} data-role={message.role} key={message.id}>
                      <div className={styles.messageTop}>
                        <strong>{message.role === "assistant" ? "Design Copilot" : "You"}</strong>
                        <span>{message.timestamp}</span>
                      </div>
                      <p>{message.content}</p>

                      {message.chips?.length ? (
                        <div className={styles.messageChipRow}>
                          {message.chips.map((chip) => (
                            <span className={styles.messageChip} key={chip}>
                              {chip}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      {message.followUps?.length ? (
                        <div className={styles.messageMetaBlock}>
                          <span>Need next</span>
                          <ul>
                            {message.followUps.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>

              {(topQuestions.length || activeConversation.session.assumptions.length) ? (
                <div className={styles.contextRow}>
                  {topQuestions.length ? (
                    <div className={styles.contextLine}>
                      <span>Open</span>
                      <p>{topQuestions.map((question) => question.title).join(" / ")}</p>
                    </div>
                  ) : null}

                  {activeConversation.session.assumptions.length ? (
                    <div className={styles.contextLine}>
                      <span>Assume</span>
                      <p>{activeConversation.session.assumptions.slice(0, 2).join(" / ")}</p>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <form className={`${styles.composer} ${styles.composerDocked}`} onSubmit={handleSubmit}>
                <label className={styles.composerLabel} htmlFor="design-prompt-thread">
                  대화를 이어서 설계를 더 구체화하세요
                </label>
                <textarea
                  className={styles.textarea}
                  id="design-prompt-thread"
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={handleComposerKeyDown}
                  placeholder="예: 탑다운 시점으로 하고, 아트는 픽셀보다 손그림 느낌이면 좋겠어."
                  ref={textareaRef}
                  value={draft}
                />
                <div className={styles.composerFooter}>
                  <div className={styles.composerHints}>
                    <span>{activeConversation.session.questions.length} open questions</span>
                    <span>{topSignals.length} captured signals</span>
                  </div>
                  <button className="button button--primary" disabled={isPending} type="submit">
                    {isPending ? "Updating..." : "Send prompt"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </section>
    </div>
  );
}

function createConversationRecord(
  id: string,
  prompts: string[],
  updatedAt: string,
  fallbackTitle: string,
): ConversationRecord {
  let session = createInitialDesignSession();
  let messages = [...initialDesignerMessages];

  prompts.forEach((prompt) => {
    const userMessage = createUserMessage(prompt);
    const result = analyzeDesignPrompt(session, prompt);

    messages = [...messages, userMessage, result.assistantMessage];
    session = result.nextSession;
  });

  return {
    id,
    title: buildConversationTitle(session, prompts[0] ?? "", fallbackTitle),
    preview: buildConversationPreview(session, prompts[0] ?? fallbackTitle),
    updatedAt,
    messages,
    session,
  };
}

function buildConversationTitle(session: DesignSession, prompt: string, fallback: string) {
  if (session.brief.title && session.brief.title !== "Untitled Game") {
    return session.brief.title;
  }

  const compact = prompt.replace(/\s+/g, " ").trim();
  if (!compact) {
    return fallback;
  }

  return compact.length > 24 ? `${compact.slice(0, 24)}...` : compact;
}

function buildConversationPreview(session: DesignSession, prompt: string) {
  const parts = [
    session.brief.genre,
    session.brief.platform,
    session.brief.sessionLength,
    session.brief.tone,
  ].filter(Boolean);

  if (parts.length > 0) {
    return parts.slice(0, 3).join(" · ");
  }

  const compact = prompt.replace(/\s+/g, " ").trim();
  return compact ? (compact.length > 44 ? `${compact.slice(0, 44)}...` : compact) : "No messages yet";
}

function createConversationId() {
  return `conversation_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
}

function getConversationGlyph(title: string) {
  const compact = title.trim();
  return compact ? compact.charAt(0).toUpperCase() : "G";
}

import type { CSSProperties } from "react";
import { exampleGames } from "@pixel/contracts";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import styles from "./page.module.css";

const valueCards = [
  {
    title: "대화를 입력하면",
    description: "허용된 액션만 추려서 Game Spec patch로 정리합니다.",
  },
  {
    title: "오른쪽 패널이 즉시 바뀌고",
    description: "요약 카드와 에셋 카드, preview 상태가 함께 반응합니다.",
  },
  {
    title: "퍼블리시와 플레이까지",
    description: "한 흐름 안에서 확인 가능한 제품형 프론트 기준을 먼저 확보합니다.",
  },
];

const routeCards = [
  {
    path: "/build",
    title: "Build Studio",
    headline: "채팅, 요약, 프리뷰를 한 화면에서 확인",
    description:
      "실제 백엔드가 없어도 Spec patch와 상태 전환을 바로 체감할 수 있게 정리했습니다.",
    href: "/build",
  },
  {
    path: "/publish",
    title: "Publish Flow",
    headline: "제목과 설명, 공개 범위를 깔끔하게 정리",
    description: "프리뷰와 게시를 분리해 두고 결과 페이지까지 자연스럽게 이어집니다.",
    href: "/publish",
  },
  {
    path: "/play/[slug]",
    title: "Play Surface",
    headline: "HUD와 조작 안내, 공유 액션을 먼저 고정",
    description: "실제 게임 엔진이 붙기 전에도 플레이 경험의 구조를 선명하게 보여줍니다.",
    href: "/play/knight-in-the-cave",
  },
  {
    path: "/",
    title: "Product Landing",
    headline: "팀이 기준으로 삼을 수 있는 첫 인상과 정보 계층",
    description: "서비스 소개, 예시 게임, 시작 액션을 한 번에 이해되는 구조로 정리했습니다.",
    href: "/",
  },
] as const;

const buildLoop = [
  "Game Spec를 중심 데이터로 두고 대화는 입력 수단으로만 사용합니다.",
  "채팅 입력 후 요약 카드와 preview 상태가 즉시 바뀌는 흐름을 먼저 보여줍니다.",
  "퍼블리시와 플레이 페이지까지 이어지는 전체 제품 흐름을 프론트에서 검증합니다.",
];

const principles = [
  "Game Spec 중심 모델",
  "Contract-first mock workflow",
  "Build, publish, play를 분리한 화면 계층",
];

const themeAccent: Record<
  (typeof exampleGames)[number]["theme"],
  { background: CSSProperties["background"]; shadow: string }
> = {
  cave: {
    background: "linear-gradient(180deg, #0f172a 0%, #22395d 100%)",
    shadow: "rgba(34, 57, 93, 0.24)",
  },
  forest: {
    background: "linear-gradient(180deg, #11281f 0%, #2c6b49 100%)",
    shadow: "rgba(44, 107, 73, 0.22)",
  },
  neon: {
    background: "linear-gradient(180deg, #09111f 0%, #19519a 100%)",
    shadow: "rgba(25, 81, 154, 0.24)",
  },
  volcano: {
    background: "linear-gradient(180deg, #22110d 0%, #8f4a36 100%)",
    shadow: "rgba(143, 74, 54, 0.24)",
  },
};

export default function Home() {
  const featuredGame = exampleGames[0];
  const secondaryGames = exampleGames.slice(1);

  return (
    <div className={styles.page}>
      <section className={`shell ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <span className="eyebrow">Pixel Game Builder</span>
          <h1>대화 몇 줄로 게임 흐름을 설계하고, 바로 프리뷰하세요.</h1>
          <p>
            Toss 계열 제품 페이지처럼 핵심 문장을 크게 드러내고, 복잡한 기능은 카드
            레이어 안에 정리했습니다. 이 베이스라인은 백엔드 없이도 Build, Publish,
            Play 흐름이 자연스럽게 이어지는 프론트 기준 화면입니다.
          </p>
          <div className={styles.heroActions}>
            <Link className="button button--primary" href="/build">
              빌드 스튜디오 열기
            </Link>
            <Link className="button button--ghost" href="/publish">
              퍼블리시 보기
            </Link>
          </div>
          <div className={styles.heroStats}>
            <article>
              <strong>01</strong>
              <span>Game Spec 중심</span>
            </article>
            <article>
              <strong>04</strong>
              <span>핵심 화면 연결</span>
            </article>
            <article>
              <strong>100%</strong>
              <span>mock 기반 검증 가능</span>
            </article>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroGlow} />
          <div className={styles.phoneMock}>
            <div className={styles.phoneTop}>
              <span className="status-pill">preview_ready</span>
              <span className={styles.phoneLabel}>proj_001</span>
            </div>
            <div className={styles.phoneSummary}>
              <article>
                <span>Theme</span>
                <strong>Cave</strong>
              </article>
              <article>
                <span>Character</span>
                <strong>Knight</strong>
              </article>
              <article>
                <span>Goal</span>
                <strong>10 coins</strong>
              </article>
            </div>
            <div className={styles.phonePreview}>
              <div className={styles.previewChips}>
                <span>HUD</span>
                <span>Assets</span>
                <span>BGM</span>
              </div>
              <div className={styles.phonePixels}>
                {Array.from({ length: 24 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
            </div>
          </div>

          <article className={`${styles.floatCard} ${styles.floatCardPrimary}`}>
            <span className={styles.floatLabel}>Latest patch</span>
            <strong>{`{ theme: "cave", goal: 10 }`}</strong>
            <p>입력 후 허용된 액션만 추려 patch로 반영됩니다.</p>
          </article>

          <article className={`${styles.floatCard} ${styles.floatCardSecondary}`}>
            <span className={styles.floatLabel}>Status</span>
            <strong>Build → Preview → Publish</strong>
            <p>각 단계가 한 흐름으로 이어지는 제품 경험을 먼저 고정합니다.</p>
          </article>
        </div>
      </section>

      <section className={`shell ${styles.valueSection}`}>
        <ScrollReveal delay={40}>
          <div className={styles.sectionHeading}>
            <span className="eyebrow">Why this product</span>
            <h2>프론트는 예쁜 데모보다 먼저, 이해되는 흐름을 보여줘야 합니다.</h2>
            <p>
              한 장르, 한 템플릿, 한 에셋 팩에 집중해서 제품의 뼈대를 먼저 세우는 것이
              현재 단계의 목표입니다.
            </p>
          </div>
        </ScrollReveal>
        <div className={styles.valueGrid}>
          {valueCards.map((card, index) => (
            <ScrollReveal delay={120 + index * 90} key={card.title}>
              <article className={`card ${styles.valueCard}`}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className={`shell ${styles.routeSection}`}>
        {routeCards.map((route, index) => (
          <ScrollReveal
            delay={80 + index * 90}
            key={route.path}
            variant={index % 2 === 0 ? "left" : "right"}
          >
            <article className={`card ${styles.routeCard}`}>
              <div className={styles.routeCopy}>
                <span className={styles.routePath}>{route.path}</span>
                <span className={styles.routeTitle}>{route.title}</span>
                <h3>{route.headline}</h3>
                <p>{route.description}</p>
                <Link className="button button--ghost button--small" href={route.href}>
                  이동하기
                </Link>
              </div>
              <div className={`${styles.routeVisual} ${styles[`routeVisual${index + 1}`]}`}>
                <div className={styles.routeVisualPanel}>
                  <span>{route.title}</span>
                  <strong>{index === 0 ? "Spec patch live" : index === 1 ? "Publish ready" : index === 2 ? "Playable shell" : "Product landing"}</strong>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </section>

      <section className={`shell ${styles.gamesSection}`}>
        <ScrollReveal delay={40} variant="left">
          <article className={styles.featuredGame}>
            <div
              className={styles.featuredVisual}
              style={{
                background: themeAccent[featuredGame.theme].background,
                boxShadow: `0 34px 80px ${themeAccent[featuredGame.theme].shadow}`,
              }}
            >
              <span className={styles.featuredHook}>{featuredGame.hook}</span>
              <h3>{featuredGame.title}</h3>
              <p>{featuredGame.blurb}</p>
              <Link className="button button--ghost button--small" href={`/play/${featuredGame.slug}`}>
                플레이 미리보기
              </Link>
            </div>
          </article>
        </ScrollReveal>
        <div className={styles.exampleGrid}>
          {secondaryGames.map((game, index) => (
            <ScrollReveal delay={140 + index * 90} key={game.slug} variant="right">
              <article className={`card ${styles.exampleCard}`}>
                <div
                  className={styles.exampleSwatch}
                  style={{
                    background: themeAccent[game.theme].background,
                    boxShadow: `0 24px 60px ${themeAccent[game.theme].shadow}`,
                  }}
                />
                <div className={styles.exampleCopy}>
                  <span className={styles.exampleHook}>{game.hook}</span>
                  <h3>{game.title}</h3>
                  <p>{game.blurb}</p>
                </div>
                <Link className="button button--ghost button--small" href={`/play/${game.slug}`}>
                  열어보기
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className={`shell ${styles.bottomSection}`}>
        <ScrollReveal delay={60} variant="left">
          <div className={`card ${styles.loopPanel}`}>
            <span className="eyebrow">Build flow</span>
            <h2>현재 프론트가 전달해야 하는 핵심 흐름</h2>
            <ol className={styles.loopList}>
              {buildLoop.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={150} variant="right">
          <div className={`card ${styles.principlePanel}`}>
            <span className="eyebrow">Core rules</span>
            <h2>디자인이 숨기지 말아야 하는 세 가지 원칙</h2>
            <div className={styles.principleList}>
              {principles.map((item, index) => (
                <ScrollReveal delay={220 + index * 70} key={item} variant="scale">
                  <article>
                    <strong>{item}</strong>
                    <p>백엔드가 붙더라도 이 정보 계층과 제품 흐름이 그대로 유지되도록 설계합니다.</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

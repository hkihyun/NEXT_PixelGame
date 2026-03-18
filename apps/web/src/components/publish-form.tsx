"use client";

import { initialGameSpec, type ScreenState, type ThemeId } from "@pixel/contracts";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./publish-form.module.css";
import {
  buildStateLabels,
  getAudioLabel,
  getCharacterLabel,
  getGoalLabel,
  slugify,
  themeLabels,
  themePresentation,
} from "@/lib/mock-game";

type Visibility = "public" | "unlisted" | "private";

const visibilityOptions: Array<{ value: Visibility; label: string; note: string }> = [
  { value: "public", label: "공개", note: "플레이 페이지를 바로 공유할 수 있습니다." },
  { value: "unlisted", label: "링크 공유", note: "링크가 있는 사람만 접근합니다." },
  { value: "private", label: "비공개", note: "로컬 확인용으로만 유지합니다." },
];

export function PublishForm() {
  const [title, setTitle] = useState(initialGameSpec.publish.title);
  const [description, setDescription] = useState(initialGameSpec.publish.description);
  const [theme, setTheme] = useState<ThemeId>(initialGameSpec.theme);
  const [visibility, setVisibility] = useState<Visibility>("public");
  const [status, setStatus] = useState<ScreenState>("preview_ready");
  const [publishedSlug, setPublishedSlug] = useState(slugify(initialGameSpec.publish.title));
  const timeoutRef = useRef<number | null>(null);

  const playHref = `/play/${publishedSlug || "pixel-game-builder"}`;

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    const nextSlug = slugify(title) || "pixel-game-builder";

    setPublishedSlug(nextSlug);
    setStatus("publishing");

    timeoutRef.current = window.setTimeout(() => {
      setStatus("published");
    }, 950);
  }

  function handleDownload() {
    const payload = {
      projectId: initialGameSpec.projectId,
      visibility,
      status,
      publishUrl: playHref,
      spec: {
        ...initialGameSpec,
        theme,
        publish: {
          title,
          description,
        },
      },
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `${publishedSlug || "pixel-game-builder"}-spec.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className={styles.page}>
      <section className={`shell ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <span className="eyebrow">Publish</span>
          <h1>프리뷰와 퍼블리시를 분리한 mock 배포 폼</h1>
          <p>
            문서에 맞춰 제목, 설명, 썸네일, 공개 여부, 게시 버튼을 먼저 고정했습니다.
            실제 업로드 대신 mock 상태 전환과 공유 링크를 검증할 수 있습니다.
          </p>
        </div>
        <div className={`card ${styles.heroCard}`}>
          <span className="status-pill">{buildStateLabels[status]}</span>
          <strong>{title}</strong>
          <p>
            퍼블리시 단계에서도 중심 데이터는 Game Spec이며, 이후 백엔드는 이 폼의
            구조를 그대로 API와 연결하면 됩니다.
          </p>
          <div className={styles.heroLinks}>
            <Link className="button button--ghost button--small" href="/build">
              빌드 스튜디오로 돌아가기
            </Link>
            <button className="button button--ghost button--small" onClick={handleDownload} type="button">
              Spec 다운로드
            </button>
          </div>
        </div>
      </section>

      <section className={`shell ${styles.grid}`}>
        <form className={`card ${styles.formCard}`} onSubmit={handleSubmit}>
          <div className={styles.cardHeading}>
            <div>
              <span className="eyebrow">Form</span>
              <h2>퍼블리시 입력</h2>
            </div>
            <span className={styles.cardMeta}>{buildStateLabels[status]}</span>
          </div>

          <label className={styles.field}>
            <span>제목</span>
            <input
              className={styles.input}
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          </label>

          <label className={styles.field}>
            <span>설명</span>
            <textarea
              className={styles.textarea}
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />
          </label>

          <div className={styles.field}>
            <span>썸네일 테마</span>
            <div className={styles.thumbnailGrid}>
              {(Object.keys(themePresentation) as ThemeId[]).map((themeId) => (
                <button
                  className={`${styles.thumbnailButton} ${
                    themeId === theme ? styles.thumbnailButtonActive : ""
                  }`}
                  key={themeId}
                  onClick={() => setTheme(themeId)}
                  style={{ background: themePresentation[themeId].thumbnail }}
                  type="button"
                >
                  <strong>{themeLabels[themeId]}</strong>
                  <span>{themePresentation[themeId].tilesetId}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <span>공개 여부</span>
            <div className={styles.visibilityGrid}>
              {visibilityOptions.map((option) => (
                <label className={styles.visibilityCard} key={option.value}>
                  <input
                    checked={visibility === option.value}
                    name="visibility"
                    onChange={() => setVisibility(option.value)}
                    type="radio"
                    value={option.value}
                  />
                  <div>
                    <strong>{option.label}</strong>
                    <p>{option.note}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.submitRow}>
            <p>
              게시 후 이동 경로: <span className="mono">{playHref}</span>
            </p>
            <button className="button button--primary" type="submit">
              {status === "publishing" ? "게시 중..." : "게시하기"}
            </button>
          </div>
        </form>

        <div className={styles.sideRail}>
          <section className={`card ${styles.summaryCard}`}>
            <div className={styles.cardHeading}>
              <div>
                <span className="eyebrow">Payload</span>
                <h2>배포 대상 요약</h2>
              </div>
              <span className={styles.cardMeta}>{visibility}</span>
            </div>
            <div className={styles.summaryList}>
              <article>
                <span>Theme</span>
                <strong>{themeLabels[theme]}</strong>
              </article>
              <article>
                <span>Character</span>
                <strong>{getCharacterLabel(initialGameSpec.player.characterId)}</strong>
              </article>
              <article>
                <span>Goal</span>
                <strong>{getGoalLabel(initialGameSpec)}</strong>
              </article>
              <article>
                <span>Sound</span>
                <strong>{getAudioLabel(initialGameSpec.audio.bgm)}</strong>
              </article>
            </div>
            <div className={styles.thumbnailPreview} style={{ background: themePresentation[theme].surface }}>
              <span className={styles.previewBadge}>{themePresentation[theme].tilesetId}</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </div>
          </section>

          <section className={`card ${styles.resultCard}`}>
            <div className={styles.cardHeading}>
              <div>
                <span className="eyebrow">Result</span>
                <h2>퍼블리시 결과</h2>
              </div>
              <span className={styles.cardMeta}>mock output</span>
            </div>
            <div className={styles.resultBody}>
              <p>상태: {buildStateLabels[status]}</p>
              <p>슬러그: {publishedSlug || "pixel-game-builder"}</p>
              <p>프로젝트: {initialGameSpec.projectId}</p>
              {status === "published" ? (
                <Link className="button button--primary" href={playHref}>
                  플레이 페이지 열기
                </Link>
              ) : (
                <button className="button button--ghost" disabled type="button">
                  게시 완료 후 활성화
                </button>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

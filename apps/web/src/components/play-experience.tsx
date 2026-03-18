"use client";

import type { ExampleGame, GameSpec } from "@pixel/contracts";
import Link from "next/link";
import { useState } from "react";
import styles from "./play-experience.module.css";
import {
  getAudioLabel,
  getCharacterLabel,
  getGoalLabel,
  getPreviewActors,
  getThemeLabel,
  themePresentation,
} from "@/lib/mock-game";

interface PlayExperienceProps {
  game: ExampleGame;
  spec: GameSpec;
  slug: string;
}

export function PlayExperience({ game, spec, slug }: PlayExperienceProps) {
  const [copied, setCopied] = useState(false);
  const previewActors = getPreviewActors(spec);

  async function handleCopyLink() {
    const shareUrl = `${window.location.origin}/play/${slug}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={styles.page}>
      <section className={`shell ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <span className="eyebrow">Play</span>
          <h1>{game.title}</h1>
          <p>{game.blurb}</p>
          <div className={styles.metaRow}>
            <span className={styles.metaChip}>{getThemeLabel(spec.theme)}</span>
            <span className={styles.metaChip}>{getCharacterLabel(spec.player.characterId)}</span>
            <span className={styles.metaChip}>{getAudioLabel(spec.audio.bgm)}</span>
          </div>
        </div>
        <div className={`card ${styles.heroCard}`}>
          <span className="status-pill">mock playable surface</span>
          <strong>{getGoalLabel(spec)}</strong>
          <p>
            실제 게임 캔버스 대신 HUD, 오브젝트, 조작 안내, 공유 액션을 먼저 고정한
            플레이 페이지입니다.
          </p>
          <div className={styles.actionRow}>
            <Link className="button button--ghost button--small" href="/build">
              빌드 페이지로 이동
            </Link>
            <button className="button button--primary button--small" onClick={handleCopyLink} type="button">
              {copied ? "링크 복사됨" : "공유 링크 복사"}
            </button>
          </div>
        </div>
      </section>

      <section className={`shell ${styles.playGrid}`}>
        <div className={`card ${styles.stageCard}`}>
          <div
            className={styles.stageSurface}
            style={{ background: themePresentation[spec.theme].surface }}
          >
            <div className={styles.hudRow}>
              <span>HP {spec.player.hp}</span>
              <span>Coins {spec.items[0]?.count ?? 0}</span>
              <span>{getGoalLabel(spec)}</span>
            </div>
            <div className={styles.pixelField}>
              {Array.from({ length: 42 }).map((_, index) => (
                <span key={index} />
              ))}
            </div>
            <div className={styles.actorStrip}>
              {previewActors.map((actor) => (
                <span key={actor}>{actor}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sideRail}>
          <section className={`card ${styles.infoCard}`}>
            <span className="eyebrow">Controls</span>
            <h2>조작 안내</h2>
            <ul className={styles.infoList}>
              <li>이동: 방향키 또는 `A / D`</li>
              <li>점프: `Space`</li>
              <li>목표: 코인을 모으고 출구 도달</li>
              <li>현재 템플릿: `platformer_basic`</li>
            </ul>
          </section>

          <section className={`card ${styles.infoCard}`}>
            <span className="eyebrow">Spec</span>
            <h2>게임 설명</h2>
            <div className={styles.specGrid}>
              <article>
                <span>Theme</span>
                <strong>{getThemeLabel(spec.theme)}</strong>
              </article>
              <article>
                <span>Character</span>
                <strong>{getCharacterLabel(spec.player.characterId)}</strong>
              </article>
              <article>
                <span>Jump</span>
                <strong>{spec.player.jumpPower}</strong>
              </article>
              <article>
                <span>Enemies</span>
                <strong>{spec.enemies[0]?.count ?? 0}</strong>
              </article>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

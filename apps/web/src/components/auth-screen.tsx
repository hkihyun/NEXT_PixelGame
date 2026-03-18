"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import styles from "./auth-screen.module.css";
import { sanitizeNextPath, type DemoAccountRole } from "@/lib/demo-auth";
import { useDemoAuth } from "@/components/demo-auth-provider";

const authHighlights = [
  "로그인 후에만 마이페이지, 알림, 설정, 대시보드, 빌드/퍼블리시 화면에 접근합니다.",
  "Steam처럼 로그인과 계정 생성 흐름을 분리하고, 새 계정 유입을 별도 CTA로 둡니다.",
  "데모 모드에서는 백엔드 없이 버튼 클릭만으로 세션 쿠키와 로컬 상태를 만들어 줍니다.",
];

const socialProviders = ["Steam-style Email", "Epic-style Social Graph", "itch-style Creator Feed"];

export function AuthScreen({
  mode,
  nextPath,
}: {
  mode: "login" | "signup";
  nextPath?: string;
}) {
  const router = useRouter();
  const { login } = useDemoAuth();
  const [isPending, startTransition] = useTransition();
  const [displayName, setDisplayName] = useState("Aria Cho");
  const [email, setEmail] = useState("aria@pixel.example");
  const [password, setPassword] = useState("password");
  const [role, setRole] = useState<DemoAccountRole>("creator");

  const isSignup = mode === "signup";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(() => {
      login({
        displayName: displayName.trim() || "Aria Cho",
        email: email.trim() || "aria@pixel.example",
        role,
      });

      router.push(
        nextPath
          ? sanitizeNextPath(nextPath)
          : role === "creator"
            ? "/dashboard/games"
            : "/me",
      );
      router.refresh();
    });
  }

  return (
    <div className={styles.page}>
      <section className={`shell ${styles.shell}`}>
        <div className={styles.heroPanel}>
          <span className="eyebrow">{isSignup ? "Create Account" : "Sign In"}</span>
          <h1>{isSignup ? "데모 계정을 만들고 바로 플랫폼 안으로 들어옵니다." : "로그인 후에만 개인 공간과 제작 도구에 접근합니다."}</h1>
          <p>
            실제 인증 서버 없이 화면 흐름만 검증하는 단계입니다. 로그인 버튼을 누르면 데모
            세션이 생성되고 보호된 계정 화면으로 바로 이동합니다.
          </p>

          <div className={styles.providerRow}>
            {socialProviders.map((provider) => (
              <span className={styles.providerChip} key={provider}>
                {provider}
              </span>
            ))}
          </div>

          <div className={styles.heroGrid}>
            {authHighlights.map((item, index) => (
              <article className={styles.heroCard} key={item}>
                <strong>{`0${index + 1}`}</strong>
                <p>{item}</p>
              </article>
            ))}
          </div>

          <div className={styles.bottomLinks}>
            <Link href="/games">먼저 둘러보기</Link>
            <Link href="/people">사람 찾기</Link>
            <Link href={isSignup ? "/login" : "/signup"}>{isSignup ? "이미 계정이 있나요?" : "처음이라면 계정 만들기"}</Link>
          </div>
        </div>

        <div className={styles.formPanel}>
          <div className={styles.formIntro}>
            <span className="eyebrow">{isSignup ? "Account Setup" : "Welcome Back"}</span>
            <h2>{isSignup ? "계정 생성" : "로그인"}</h2>
            <p>
              {isSignup
                ? "Epic 계열 런처처럼 이메일과 표시 이름, 역할을 먼저 받고 바로 플랫폼 상태를 열어 줍니다."
                : "Steam 로그인 페이지처럼 핵심 필드만 먼저 보여 주고, 신규 유입은 우측 CTA로 분리합니다."}
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {isSignup ? (
              <label className={styles.field}>
                <span>표시 이름</span>
                <input onChange={(event) => setDisplayName(event.target.value)} value={displayName} />
              </label>
            ) : null}

            <label className={styles.field}>
              <span>이메일</span>
              <input onChange={(event) => setEmail(event.target.value)} value={email} />
            </label>

            <label className={styles.field}>
              <span>비밀번호</span>
              <input onChange={(event) => setPassword(event.target.value)} type="password" value={password} />
            </label>

            <div className={styles.field}>
              <span>이 계정의 기본 역할</span>
              <div className={styles.roleRow}>
                {(["player", "creator"] as DemoAccountRole[]).map((item) => (
                  <button
                    className={`${styles.roleChip} ${role === item ? styles.roleChipActive : ""}`}
                    key={item}
                    onClick={() => setRole(item)}
                    type="button"
                  >
                    <strong>{item === "player" ? "플레이어" : "제작자"}</strong>
                    <small>{item === "player" ? "라이브러리와 사람 찾기 중심" : "대시보드와 빌드 도구 중심"}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.demoNotice}>
              <strong>Demo mode</strong>
              <p>버튼을 누르면 백엔드 없이 로그인 상태가 활성화되고, `next` 경로가 있으면 그곳으로 이동합니다.</p>
            </div>

            <div className={styles.formActions}>
              <button className="button button--primary" disabled={isPending} type="submit">
                {isPending ? "세션 여는 중..." : isSignup ? "데모 계정 만들기" : "로그인"}
              </button>
              <Link className="button button--ghost" href={isSignup ? "/login" : "/signup"}>
                {isSignup ? "이미 계정이 있어요" : "회원가입"}
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

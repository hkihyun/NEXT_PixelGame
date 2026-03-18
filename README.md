# Pixel Game Builder Platform

Pixel Game Builder Platform의 프론트 베이스라인입니다. 문서에서 권장한 스택인 `Next.js + TypeScript + pnpm` 기준으로 구성했고, 아직 백엔드 연결 없이 mock Game Spec으로 화면 흐름을 확인할 수 있습니다.

## 포함 범위

- 랜딩 페이지 `/`
- 게임 만들기 페이지 `/build`
- 퍼블리시 페이지 `/publish`
- 플레이 페이지 `/play/[slug]`
- `packages/contracts` 기반 mock 데이터와 상태 모델

## 실행

```bash
pnpm install
pnpm dev

or
npx pnpm@10.6.1 dev

```

브라우저에서 `http://localhost:3000`을 열면 됩니다.

`pnpm` 이 설치되어 있지 않다면 아래처럼 바로 실행할 수 있습니다.

```bash
npx pnpm@10.6.1 install
npx pnpm@10.6.1 dev
```

## 현재 확인 가능한 화면

- `/` 랜딩 페이지
- `/build` 채팅 기반 Game Spec patch 스튜디오
- `/publish` mock 퍼블리시 폼
- `/play/[slug]` mock 플레이 페이지

## 구조

```txt
apps/
  web/
  api/
  mcp-server/
packages/
  contracts/
  config/
docs/
  PROJECT_BASELINE.md
```

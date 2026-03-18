# Web App

Pixel Game Builder Platform의 프론트엔드 앱입니다.

## 라우트

- `/` 랜딩 페이지
- `/build` 채팅 기반 Game Spec patch 스튜디오
- `/publish` mock 퍼블리시 폼
- `/play/[slug]` mock 플레이 페이지

## 실행

```bash
pnpm dev
```

현재 환경처럼 `pnpm` CLI가 없다면:

```bash
npx pnpm@10.6.1 dev
```

## 특징

- `@pixel/contracts` 기반 mock Game Spec 사용
- backend 없이 상태 전환과 preview 흐름 검증 가능
- build / publish / play 페이지 분리

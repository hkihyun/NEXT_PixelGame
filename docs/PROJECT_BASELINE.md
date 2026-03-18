# PROJECT BASELINE

이 저장소는 Pixel Game Builder Platform의 초기 베이스라인을 구현하기 위한 모노레포 구조를 따른다.

## 핵심 원칙

- 중심 데이터는 chat history가 아니라 `Game Spec`
- 프론트는 backend 연결 전에도 mock 데이터로 개발
- 수정 단위는 전체 재생성이 아니라 `Spec patch`
- 초기 화면 범위는 `/`, `/build`, `/publish`, `/play/[slug]`

## 권장 스택

- Frontend: Next.js + TypeScript
- Backend API: FastAPI
- MCP Server: TypeScript + MCP SDK
- DB: PostgreSQL
- Local DB: SQLite
- Storage: S3 호환 스토리지
- Realtime: WebSocket

## 화면 상태 모델

```txt
idle
collecting_intent
drafting_spec
waiting_user_confirmation
building_preview
preview_ready
publishing
published
error
```

## 초기 허용 액션

- 테마 변경
- 캐릭터 변경
- 적 수 조정
- 점프력 조정
- 맵 프리셋 변경
- 승리 조건 조정
- 사운드 변경
- 퍼블리시
- 다운로드

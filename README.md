# Todo List 앱 프로젝트 문서

## 1. 프로젝트 개요

React + Express + MongoDB를 연결한 풀스택 Todo 리스트 웹 애플리케이션.
기본 CRUD를 넘어 우선순위, 마감일, 진행률 추적, 하위 할 일(Sub-todo) 등 실용적인 기능을 포함한다.

---

## 2. 기능 목록

### 기본 기능 (MVP)
| 기능 | 설명 |
|------|------|
| Todo 추가 | 우측 하단 FAB 버튼 → 모달에서 제목 입력 후 추가 |
| Todo 조회 | 전체 목록 최신순 표시 |
| 완료 체크 | 원형 체크버튼으로 완료/미완료 토글, 취소선 애니메이션 |
| 인라인 수정 | 수정 버튼 클릭 시 입력창으로 전환 (제목·우선순위·마감일) |
| 삭제 | 개별 삭제 / 완료 항목 일괄 삭제 |

### 확장 기능
| 기능 | 설명 |
|------|------|
| 우선순위 | 높음(빨강) / 보통(주황) / 낮음(초록) 뱃지 |
| 마감일 | 달력 UI로 날짜 선택, D-Day 카운트다운 표시 |
| 필터 탭 | 전체 / 진행 중 / 완료 — 각 탭에 항목 수 뱃지 표시 |
| 진행률 바 | 전체 대비 완료 비율을 보라색 그라데이션 바로 시각화 |
| 다크모드 | 우측 상단 버튼 토글, `localStorage`에 저장되어 새로고침 유지 |
| 텍스트 줄바꿈 | 공백 없는 긴 문자열도 카드 밖으로 넘치지 않도록 처리 |
| Sub-todo | 각 Todo에 하위 할 일 추가/완료/삭제, 진행률 바 표시 |

---

## 3. 사용 방법

### 할 일 추가
1. 우측 하단 **+** FAB 버튼 클릭 → 모달 열림
2. 제목 입력
3. 우선순위 버튼(높음/보통/낮음) 선택
4. 마감일 버튼 클릭 → 달력에서 날짜 선택 (선택사항)
5. **추가** 버튼 클릭 또는 Enter

### 할 일 수정
1. 항목에 마우스를 올리면 수정/삭제 버튼 표시 (모바일: 탭하면 표시)
2. 연필 아이콘 클릭 → 제목, 우선순위, 마감일 수정 가능
3. **저장** 버튼 클릭 또는 ESC로 취소

### 완료 처리
- 항목 왼쪽 원형 버튼 클릭 → 완료 상태 토글
- 완료된 항목은 취소선 + 흐리게 표시
- 하단 **완료된 항목 모두 삭제** 버튼으로 일괄 제거

### 필터
- **전체**: 모든 항목
- **진행 중**: 미완료 항목만
- **완료**: 완료된 항목만

### 하위 할 일 (Sub-todo)
1. Todo 항목 내 **하위 할 일** 섹션 확장
2. 입력창에 하위 할 일 제목 입력 후 Enter 또는 추가 버튼 클릭
3. 각 Sub-todo 좌측 체크버튼으로 완료 토글
4. 삭제 버튼으로 개별 제거
5. 상단 진행률 바에 Sub-todo 완료 비율 반영

---

## 4. 기술 스택 및 선택 이유

| 구분 | 기술 | 선택 이유 |
|------|------|-----------|
| Frontend | React 18 + Vite | 컴포넌트 재사용, HMR로 빠른 개발 속도 |
| 스타일링 | Tailwind CSS | 클래스명만으로 빠른 스타일링, 다크모드 지원 간편 |
| HTTP | Axios | fetch보다 간결한 API, 인터셉터 지원 |
| Backend | Node.js + Express | 가볍고 빠른 REST API 구성, JS 단일 언어 |
| Database | MongoDB Atlas | 스키마 유연성, 무료 클라우드 제공 |
| 배포 | Vercel | GitHub 연동 자동 배포, 프론트+백엔드 동시 지원 |
| 날짜 UI | react-day-picker v9 | Tailwind 친화적, 커스터마이징 자유도 높음 |
| 날짜 유틸 | date-fns v4 | 경량 날짜 포맷·계산 라이브러리 |

---

## 5. 프로젝트 구조

```
Todo/
└── todo-app/
    ├── backend/
    │   ├── index.js          # Express 서버 + Mongoose 모델 + API 라우트 전체
    │   └── package.json
    └── frontend/
        ├── src/
        │   ├── App.jsx            # 메인 상태 관리 (todos, filter, darkMode, modal)
        │   ├── api.js             # Axios 인스턴스 + API 함수 모음
        │   ├── main.jsx           # React 앱 진입점
        │   ├── index.css          # Tailwind 지시자 + 커스텀 애니메이션
        │   └── components/
        │       ├── TodoModal.jsx      # 할 일 추가 모달 (FAB로 열림)
        │       ├── TodoItem.jsx       # 개별 항목 카드 (토글/수정/삭제/뱃지/sub-todo)
        │       ├── FilterBar.jsx      # 필터 탭 바
        │       ├── DatePicker.jsx     # 커스텀 달력 팝오버 컴포넌트
        │       ├── EmptyState.jsx     # 빈 목록 안내 메시지
        │       └── CircularProgress.jsx  # SVG 원형 진행률 컴포넌트
        ├── index.html
        ├── vite.config.js
        └── tailwind.config.js
```

---

## 6. 데이터 모델

```js
// MongoDB SubTodo 스키마
{
  title:     String,   // 하위 할 일 제목 (필수)
  completed: Boolean   // 완료 여부 (기본값: false)
}

// MongoDB Todo 스키마
{
  title:     String,      // 할 일 제목 (필수)
  completed: Boolean,     // 완료 여부 (기본값: false)
  priority:  String,      // '높음' | '보통' | '낮음' (기본값: '보통')
  dueDate:   Date,        // 마감일 (선택, null 허용)
  subTodos:  [SubTodo],   // 하위 할 일 목록 (기본값: [])
  createdAt: Date,        // 자동 생성 (Mongoose timestamps)
  updatedAt: Date         // 자동 갱신 (Mongoose timestamps)
}
```

---

## 7. API 엔드포인트

### Todo

| Method | Path | 설명 |
|--------|------|------|
| GET | /api/todos | 전체 목록 조회 (최신순) |
| POST | /api/todos | 새 항목 추가 (title, priority, dueDate) |
| PUT | /api/todos/:id | 항목 수정 (title, completed, priority, dueDate) |
| DELETE | /api/todos/:id | 개별 삭제 |
| DELETE | /api/todos | 완료 항목 전체 삭제 |

### Sub-todo

| Method | Path | 설명 |
|--------|------|------|
| POST | /api/todos/:id/subtodos | 하위 할 일 추가 (title) |
| PUT | /api/todos/:id/subtodos/:subId | 하위 할 일 수정 (completed) ※ UI에서는 완료 토글만 지원 |
| DELETE | /api/todos/:id/subtodos/:subId | 하위 할 일 삭제 |

---

## 8. 편의성 설계 결정

- **FAB + 모달**: 우측 하단 플로팅 버튼으로 추가 모달을 열어 입력 흐름을 분리 → 목록 화면을 깔끔하게 유지
- **Optimistic UI**: 서버 응답 전에 화면을 먼저 업데이트하고, 실패 시 롤백 → 빠른 반응성
- **스켈레톤 로딩**: 데이터 로딩 중 빈 카드 3개 표시 → 레이아웃 덜컹임 방지
- **에러 배너**: 서버 연결 실패 시 상단에 표시, X 버튼으로 닫기 가능
- **완료 항목 D-day 숨김**: 완료된 항목에는 D-day 뱃지를 표시하지 않아 불필요한 정보 제거
- **ESC로 수정 취소**: 수정 모드에서 ESC 입력 시 변경 없이 종료
- **마감일 X 버튼**: 날짜 선택 버튼 내부에 X 버튼으로 마감일 빠르게 제거 가능
- **Sub-todo 진행률 바**: 상위 Todo 카드 안에 하위 항목 완료 비율을 바로 표시 → 세부 진행 상황 한눈에 파악
- **모달 클릭 외부 닫기 / ESC**: 모달 바깥 클릭 또는 ESC 키로 손쉽게 닫기

---

## 9. 환경 변수

### 백엔드 (`todo-app/backend/.env`)

| 변수 | 필수 | 설명 |
|------|------|------|
| `MONGODB_URI` | ✅ | MongoDB Atlas 연결 문자열 |
| `PORT` | ❌ | 서버 포트 (기본값: 5000) |

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/todoDB?retryWrites=true&w=majority
PORT=5000
```

### 프론트엔드 (`todo-app/frontend/.env`)

| 변수 | 필수 | 설명 |
|------|------|------|
| `VITE_API_URL` | ❌ | API 서버 주소. 미설정 시 `/api`(상대 경로)로 동작 — Vercel 배포 환경에서는 불필요 |

---

## 10. 로컬 실행 방법

### 사전 요구사항
- Node.js 18 이상
- MongoDB Atlas 계정 및 클러스터

### 백엔드 실행

```bash
cd todo-app/backend
npm install
# .env 파일 생성 후 MONGODB_URI 입력
npm run dev      # nodemon으로 개발 서버 실행 (포트 5000)
```

### 프론트엔드 실행

```bash
cd todo-app/frontend
npm install
npm run dev      # Vite 개발 서버 실행 (포트 5173)
```

브라우저에서 `http://localhost:5173` 접속. 프론트엔드의 `/api` 요청은 `vite.config.js` 프록시 설정에 의해 자동으로 `http://localhost:5000`으로 전달됩니다.

---

## 11. 배포

- **배포 플랫폼**: Vercel
- **GitHub 레포지토리**: https://github.com/SmongsDev/todo-app-mini-project-20213107
- **배포 URL**: https://todo-app-mini-project-20213107.vercel.app/

> Vercel 환경 변수로 `MONGODB_URI`를 설정해야 정상 동작합니다.

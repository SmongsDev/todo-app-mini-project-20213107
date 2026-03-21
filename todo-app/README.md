# Todo List App

풀스택 Todo 리스트 웹 애플리케이션입니다.

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB Atlas (Mongoose) |
| 배포 | Vercel |

## 기능

- **Todo 추가** — 입력창에 할 일 입력 후 추가
- **Todo 조회** — 전체 목록 실시간 표시
- **완료 체크** — 체크버튼으로 완료/미완료 토글
- **인라인 수정** — 항목에 마우스를 올리면 수정 버튼 표시
- **삭제** — 개별 삭제 및 완료 항목 일괄 삭제
- **필터** — 전체 / 진행 중 / 완료 탭
- **진행률 바** — 전체 대비 완료 비율 시각화
- **다크모드** — 우측 상단 버튼으로 토글, localStorage에 저장

## 로컬 실행

### 1. 저장소 클론

```bash
git clone https://github.com/<your-username>/todo-app-mini-project-학번.git
cd todo-app-mini-project-학번
```

### 2. 백엔드 실행

```bash
cd backend
npm install

# .env.example을 복사하고 MongoDB URI 입력
cp .env.example .env
# .env 파일을 열어서 MONGODB_URI 값을 실제 Atlas 연결 문자열로 교체

npm run dev
# → http://localhost:5000
```

### 3. 프론트엔드 실행

```bash
cd ../frontend
npm install
npm run dev
# → http://localhost:5173
```

## MongoDB Atlas 연결 문자열 형식

```
mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/todoDB?retryWrites=true&w=majority
```

## Vercel 배포

1. GitHub에 전체 프로젝트 push
2. [Vercel](https://vercel.com) → **New Project** → GitHub 레포 선택
3. **Environment Variables**에 `MONGODB_URI` 추가
4. Deploy

> **팁**: frontend의 `VITE_API_URL` 환경 변수를 Vercel 배포 URL로 설정하면
> 프론트가 올바른 백엔드 주소를 가리킵니다.
> 예: `VITE_API_URL=https://todo-app-학번.vercel.app`

## API 엔드포인트

| Method | Path | 설명 |
|--------|------|------|
| GET | /api/todos | 전체 목록 조회 |
| POST | /api/todos | 새 항목 추가 |
| PUT | /api/todos/:id | 제목/완료 상태 수정 |
| DELETE | /api/todos/:id | 개별 삭제 |
| DELETE | /api/todos | 완료 항목 전체 삭제 |

## 프로젝트 구조

```
todo-app/
├── backend/
│   ├── index.js          # Express 서버 + API 라우트
│   ├── .env.example      # 환경 변수 예시
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # 메인 컴포넌트 (상태 관리)
│   │   ├── api.js        # Axios API 요청 함수
│   │   ├── index.css     # Tailwind + 커스텀 스타일
│   │   └── components/
│   │       ├── TodoInput.jsx   # 입력 폼
│   │       ├── TodoItem.jsx    # 개별 항목 (수정/삭제)
│   │       ├── FilterBar.jsx   # 필터 탭
│   │       └── EmptyState.jsx  # 빈 상태 표시
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── vercel.json           # Vercel 배포 설정
├── .gitignore
└── README.md
```

# 강의 웹 플랫폼 구축 계획

> 이 문서는 구현 시작 전 요구사항과 아키텍처를 정리한 것입니다. 코드는 아직 작성하지 않았습니다.
> "확정" 항목은 대화로 합의된 내용, "제안"은 제가 기본값을 정해서 진행하려는 항목(다르게 원하면 말씀해주세요), "열린 질문"은 답변이 필요한 항목입니다.

## 0. 배포 위치 (변경됨)

새 리포를 따로 만들지 않고, **이미 운영 중인 포트폴리오 리포(`kimminsu-123/portfolio`, 현재 `https://kimminsu-123.github.io/portfolio/`로 라이브 중)의 하위 폴더**로 넣는 것으로 확정합니다.

- 프로젝트 경로: `/Users/gimminsu/Desktop/3.Personal/portfolio/labsite/`
- 배포 후 URL: `https://kimminsu-123.github.io/portfolio/labsite/` (레포 root가 이미 Pages 소스이므로, 이 폴더에 커밋 후 push만 하면 별도 Pages 설정 없이 자동 배포됨)
- 포트폴리오 메인 페이지(`index.html`)의 hero 영역 CTA 버튼 목록(현재 "개인 학습 페이지", "프로젝트 보기" 등이 있는 자리, `index.html:1234~1249`)에 이 사이트로 가는 링크를 하나 추가
- ⚠️ 기존 포트폴리오 리포에는 이력서/포트폴리오 PDF, 프로젝트 소스 zip 등 개인 자료가 이미 커밋되어 있습니다. LabSite 관련 파일은 전부 `labsite/` 폴더 안에서만 작업해서 기존 파일과 섞이지 않도록 합니다.
- ⚠️ 리포가 `/portfolio/` 하위 경로로 서빙되고 LabSite는 그 안의 `/labsite/` 하위 경로이므로, LabSite 내부 HTML/CSS/JS는 **절대경로(`/style.css`)가 아니라 상대경로(`./style.css` 또는 `assets/style.css`)로만 자원을 참조**해야 합니다. 절대경로를 쓰면 로컬에서는 되다가 배포하면 깨집니다.
- ⚠️ **폴더명은 반드시 소문자 `labsite`로 고정** — GitHub Pages는 URL 경로를 대소문자로 구분합니다(도메인은 무관하지만 경로는 구분됨, [출처](https://github.com/IEAWindSystems/windIO/issues/148)). `LabSite`(대문자 포함)로 두면 `https://kimminsu-123.github.io/portfolio/labsite`로 접속했을 때 404가 납니다. 앞으로 이 폴더 아래에 만드는 모든 하위 경로(관리자 페이지, 과제 페이지 등)도 전부 소문자로 통일합니다.
- ⚠️ 지금은 폴더 안에 `PLANNING.md`만 있고 실제 `index.html`이 없으므로, 폴더명을 바꿔도 `https://kimminsu-123.github.io/portfolio/labsite`는 아직 빈 화면(404 또는 디렉터리 리스팅 없음)입니다. §10 구현 순서대로 실제 사이트를 만들어 push해야 콘텐츠가 보입니다.
- 참고: `/portfolio/labsite` (슬래시 없이) 로 접속해도 `index.html`이 있으면 정적 호스팅의 일반적인 동작으로 정상 표시됩니다. 브라우저가 자동으로 끝에 슬래시를 붙여 리다이렉트할 수 있는데 정상 동작입니다.

---

## 1. 요구사항 원문 정리

| # | 요구사항 |
|---|---|
| 1 | GitHub Pages에 연결해서 외부에 공개 |
| 2 | 구글 드라이브 연동, 수강생 과제 제출 시 지정 폴더에 저장 |
| 3 | 강의자료 업로드/삭제 기능 + PPT/HTML 미리보기 |
| 4 | 강의자료 다운로드는 본인(관리자)만 가능(비밀번호/인증 게이트), 수강생 제출물은 비공개로 관리자 드라이브에만 전송 |
| 5 | 같은 과제 재제출 시 새 파일 추가가 아니라 기존 파일 업데이트 |

---

## 2. 확정된 아키텍처 결정

### 왜 백엔드가 필요한가
GitHub Pages는 정적 파일만 서빙합니다. 서버 코드를 못 돌리기 때문에, 드라이브 API 인증 정보나 "관리자만 다운로드 가능" 같은 검증 로직을 프론트엔드(JS)에 두면 리포가 public인 이상 전부 노출됩니다. 그래서 인증/드라이브 쓰기가 필요한 모든 동작은 별도 백엔드를 거치도록 설계합니다.

| 결정 항목 | 선택 | 이유 |
|---|---|---|
| 백엔드 | **Google Apps Script Web App** | 서버 비용 없음, 관리자 본인 구글 계정 권한으로 바로 Drive 접근(서비스 계정 키 관리 불필요), 개인 프로젝트 규모에 충분 |
| 강의자료 원본 저장 위치 | **Google Drive에만 저장** (Git 리포에 커밋 X) | 리포가 가벼워지고, "비번 없인 다운로드 불가" 요구사항을 Drive 권한/API로 자연스럽게 구현 가능 |
| 관리자 인증 | **본인 구글 계정 OAuth 로그인 제한** | 별도 비밀번호 관리/유출 리스크 없음. 로그인한 계정 이메일이 설정된 관리자 이메일과 일치할 때만 업로드/삭제/다운로드 허용 |
| 과제 관리 | **관리자가 사이트에서 과제를 직접 생성/삭제** | 과제 메타데이터(제목/설명/마감일)를 관리자가 등록 → 학생은 등록된 과제에만 제출 가능 |
| 학생 식별 | **구글 계정 로그인** | 이메일 기준으로 정확히 식별 가능 → 재제출 시 "같은 학생, 같은 과제" 판별이 파일명 오탈자에 영향받지 않음 |
| 제출 파일 정리 방식 | **과제별 하위 폴더 자동 생성** | 과제/학생 수가 늘어도 폴더가 안 섞임. 재제출 감지 키 = `(과제 폴더, 학생 이메일)` |
| PPT 미리보기 렌더링 | **Slides API 변환 + 슬라이드 이미지 캐싱, 자체 UI로 표시** (Drive 임베드 iframe 미사용) | Google 변환 엔진으로 렌더링 안정성 확보, 원본이 아닌 이미지라 텍스트 복사·편집 불가. 업로드 시점에 1회 생성해 캐싱하면 조회마다 API 쿼터 안 씀 |
| HTML 미리보기 렌더링 | **자체 렌더링 (sandboxed `<iframe srcdoc>`)** (Drive 임베드 iframe 미사용) | Drive가 HTML을 실제로 렌더링해주는지 불확실성 자체를 제거, 완전한 커스텀 UI 가능 |
| 미리보기 화면 다운로드 차단 | **PPT는 이미지 렌더링이라 원본 파일 자체가 브라우저에 내려가지 않음 / HTML은 차단 안 됨(사용자 확인·합의됨)** | PPT는 원본 미노출로 사실상 다운로드 방지, HTML은 렌더링 특성상 원본 소스 노출이 불가피함을 감수하기로 함. 어느 쪽이든 화면 캡처까지 막을 순 없음(공통 한계) |

---

## 3. 전체 구성도

```
[학생/외부 방문자 브라우저]
        │  (HTML/CSS/JS 정적 파일)
        ▼
[GitHub Pages: kimminsu-123.github.io/portfolio/labsite/]
  ← 기존 포트폴리오 리포 하위 폴더, git push만 하면 자동 배포 (별도 Pages 설정 불필요)
        │  fetch(POST) — Google ID Token 포함
        ▼
[Google Apps Script Web App]  ← "나(관리자)" 권한으로 실행
        │            │            │
        ▼            ▼            ▼
[Google Drive]  [Slides API]  [Google Sheet]  (과제/강의자료 메타데이터 DB 역할)
 ├─ 강의자료 폴더   PPT→Slides 변환 +
 └─ 과제제출 루트   슬라이드 이미지 추출
      └─ (과제별 하위 폴더 자동 생성)   (업로드 시 1회, §7 만료 이슈 확인 필요)
```

- 로그인: 프론트엔드에서 **Google Identity Services**로 로그인 → ID Token(JWT) 획득
- 모든 쓰기/게이트 필요 요청은 이 ID Token을 Apps Script로 전달 → Apps Script가 토큰 검증 후 이메일 확인
- 관리자 이메일과 비교해 관리자 전용 기능(업로드/삭제/다운로드/과제 생성삭제) 허용 여부 판단

---

## 4. 요구사항 → 구현 매핑

**1) GitHub Pages 공개**
- 기존 `portfolio` 리포의 `main` 브랜치, `labsite/` 하위 폴더로 커밋·push → 별도 Pages 활성화 없이 자동 배포
- 포트폴리오 메인 페이지에 LabSite로 가는 링크 버튼 추가 (사용자 요청사항)
- 프론트엔드 코드에는 비밀 정보(관리자 이메일 검증 로직 등)를 넣지 않음 — 전부 Apps Script 쪽에서 검증. 이 리포는 이미 public이므로 프론트엔드 JS는 전 세계에 공개된다는 전제로 설계

**2) 구글 드라이브 연동, 지정 폴더 저장**
- 관리자가 사전에 "과제 제출 루트 폴더"를 하나 만들고 폴더 ID를 설정값(Config 시트)에 등록
- 과제 생성 시 그 폴더 아래에 `{과제ID 또는 과제명}` 하위 폴더를 Apps Script가 자동 생성

**3) 업로드/삭제 + PPT·HTML 미리보기**
- 관리자가 프론트 관리자 페이지에서 파일 업로드 → Apps Script가 강의자료 폴더(비공개, 관리자만 접근)에 원본 저장 + Sheet에 메타데이터 기록
- **PPT**: 업로드 시 Apps Script가 Drive API로 원본을 Google Slides 사본으로 변환 → Slides API `presentations.pages.getThumbnail`로 슬라이드별 PNG를 미리 뽑아 `Lectures` 시트에 캐싱 → 학생이 미리보기를 열면 캐싱된 이미지들을 순서대로 자체 슬라이드 뷰어 UI로 표시 (Drive/Slides의 임베드 iframe·브랜딩 없음)
- **HTML**: 원본을 그대로 저장, 미리보기 요청 시 Apps Script가 Drive에서 HTML 텍스트를 읽어 프론트로 전달 → `<iframe sandbox srcdoc="...">`로 렌더링 (Drive 뷰어 미사용)
- 삭제 시 Drive 원본 파일(+PPT는 변환된 Slides 사본) 삭제 + Sheet 메타데이터 삭제

**4) 다운로드 게이트 / 제출물 비공개**
- 강의자료 원본 파일은 Drive에 비공개로 저장되고 공유 설정을 바꾸지 않음 — Apps Script가 관리자 권한으로만 접근 가능
- "다운로드" 버튼 클릭 시에만 ID Token을 Apps Script로 전송 → 관리자 이메일 일치 확인 후 원본 파일 바이너리 반환
- PPT는 미리보기 자체가 이미지라서 원본 파일이 브라우저에 노출되지 않아 다운로드 게이트가 실질적으로 지켜짐. HTML은 미리보기 시 원본 소스가 브라우저에 노출되는 걸 감수하기로 합의함(§2 표 참고) — HTML 파일에 한해서는 "다운로드는 관리자만"이 사실상 느슨해짐을 인지
- 학생 제출 파일은 관리자 개인 드라이브 안에만 저장되고, 공유 링크를 생성하지 않으므로 다른 수강생이 볼 수 없음

**5) 재제출 시 파일 업데이트**
- 제출 시 Apps Script가 `(과제 하위 폴더, 로그인한 학생 이메일)` 조합으로 기존 파일 존재 여부 조회
- 있으면 `Drive.Files.update`(같은 fileId 유지, 내용만 교체) / 없으면 신규 생성

---

## 5. 데이터 모델 (제안 — Google Sheet를 경량 DB로 사용)

Apps Script와 짝을 이루는 가장 단순한 방식이라 제안합니다. 규모가 커지면 나중에 Firestore 등으로 이전 가능(YAGNI 원칙상 지금은 과함).

**`Config` 탭** (key-value)
| key | value |
|---|---|
| ADMIN_EMAIL | (관리자 구글 이메일) |
| LECTURE_FOLDER_ID | (강의자료 저장용 드라이브 폴더 ID) |
| SUBMISSION_ROOT_FOLDER_ID | (과제 제출 루트 폴더 ID) |
| GOOGLE_OAUTH_CLIENT_ID | (OAuth 클라이언트 ID) |

**`Lectures` 탭**
| id | title | week | fileType(ppt/html) | sourceFileId | slidesFileId(ppt 전용, 변환된 Slides 사본) | slideImageFileIds(ppt 전용, JSON 배열 — **Drive 파일 ID들**. URL 아님, `getLecturePreview` 조회 시마다 즉석으로 base64 인코딩해서 응답) | uploadedAt |

**`Assignments` 탭**
| id | title | description | dueDate | folderId | createdAt |

**`Submissions` 탭** (제출 로그 — 실제 파일은 Drive에 있고, 이건 이력 확인용)
| id | assignmentId | studentEmail | studentName | fileId | fileName | firstSubmittedAt | lastUpdatedAt |

---

## 6. 인증 흐름

1. 프론트엔드에 "Google로 로그인" 버튼 → Google Identity Services가 로그인 처리, ID Token(JWT) 반환
2. 관리자 전용 동작(업로드/삭제/과제 생성삭제/다운로드) 또는 학생 제출 시, 프론트가 `fetch(APPS_SCRIPT_URL, { method: 'POST', body: JSON.stringify({ idToken, action, ...payload }) })` 호출
3. Apps Script가 `UrlFetchApp`으로 구글 tokeninfo 엔드포인트 호출해 토큰 검증 → 이메일 추출
4. 관리자 전용 동작이면 이메일이 `Config.ADMIN_EMAIL`과 일치하는지 확인, 아니면 즉시 거부
5. 학생 제출은 로그인만 되어 있으면 허용, 추출된 이메일을 제출자 식별자로 사용

---

## 7. ⚠️ 확인 필요 / 기술적 리스크

구현 전 실제로 테스트해봐야 확정할 수 있는 항목들입니다. 단정하지 않고 여기 남겨둡니다.

- ~~GitHub Pages 공개 범위~~ → **해결됨**: `portfolio` 리포는 이미 public, `https://kimminsu-123.github.io/portfolio/`로 라이브 확인 완료. `labsite/` 하위 폴더도 동일 리포이므로 추가 설정 없이 공개됨.
- ~~HTML 파일의 Drive 미리보기 렌더링 여부~~ → **해결됨**: Drive 뷰어를 아예 안 쓰고 자체 `srcdoc` 렌더링으로 결정했으므로 이 불확실성 자체가 사라짐(§2, §4-3).
- ~~Slides 썸네일 이미지 URL의 유효기간~~ → **해결됨**: `presentations.pages.getThumbnail`의 `contentUrl`은 서명된 임시 URL로 **수명 30분**임을 공식 문서로 확인. 그래서 URL을 캐싱하는 대신, 업로드 시점에 만료 전 즉시 `UrlFetchApp.fetch()`로 바이트를 가져와 Drive PNG 파일로 영구 저장하고, 시트에는 그 **파일 ID 배열**만 저장. `getLecturePreview` 조회 시마다 그 파일들을 읽어 base64로 즉석 인코딩해 응답(§10-5로 구현·라이브 검증 완료).
- ~~pptx → Google Slides 변환의 정확한 API 절차~~ → **해결됨**: `Drive.Files.create({mimeType: MimeType.GOOGLE_SLIDES, ...}, blob)` 호출로 pptx 바이너리를 Slides 사본으로 자동 변환. 실제 업로드로 종단 확인 완료(§10-5).
- **Slides API 쿼터**: 검색 결과 썸네일 요청은 "expensive read request"로 분류되어 일반 API 호출보다 쿼터를 많이 소모합니다. 업로드 시 1회만 호출하는 현재 설계로는 문제없을 것으로 예상되지만, 위 만료 이슈로 인해 조회 시마다 재호출하게 될 경우 소규모 강의 규모에서도 쿼터를 넘길 수 있어 확인 필요.
- **Apps Script Web App과 CORS**: 브라우저에서 커스텀 헤더(`Authorization` 등)로 요청하면 preflight(OPTIONS) 요청이 발생하는데 Apps Script Web App은 이를 기본 지원하지 않습니다. 이 문서의 설계처럼 ID Token을 **요청 바디**에 담아 단순 POST로 보내는 방식으로 이 문제를 피할 계획입니다만, 실제 구현 시 재확인이 필요합니다.
- **Apps Script/Drive/Slides API 일일 할당량**: 개인(무료) 구글 계정 기준 실행 시간·API 호출 쿼터가 있습니다. 소규모 강의(수강생 수십 명) 규모라면 충분할 것으로 예상되지만 정확한 수치는 확인 필요.
- **하위 폴더 배포 시 상대경로**: `/portfolio/labsite/` 처럼 2단 하위 경로에서 서빙되므로, HTML의 `<script src>`, `<link href>`, `fetch()` 경로를 절대경로로 잘못 쓰면 로컬 테스트에서는 멀쩡하다가 실제 배포에서만 깨지는 문제가 생길 수 있습니다 — 배포 후 반드시 실제 URL에서 재확인 필요.

---

## 8. 사전 준비물 체크리스트 (사용자가 직접 해야 하는 것)

- [x] ~~GitHub 리포지토리 생성~~ → 기존 `portfolio` 리포 재사용
- [x] Google Cloud Console에서 프로젝트 생성 → OAuth 클라이언트 ID(웹 애플리케이션) 발급 완료 (`184581754648-...apps.googleusercontent.com`)
  > ⚠️ **겪은 함정**: OAuth 동의 화면 User Type이 기본으로 "Internal"이면 조직 외부 계정(개인 Gmail 포함) 로그인이 전부 `403 org_internal` 오류로 막힘. **"External"로 전환 + 테스트 단계에선 테스트 사용자 등록, 실서비스 시 "앱 게시(Publish)"로 전환** 필요 — 이미 조치함
  > ⚠️ 아직 안 함: `https://kimminsu-123.github.io`를 "승인된 자바스크립트 원본"에 등록 (지금까지는 `http://localhost:8080` 로컬 테스트용만 등록됨) — 실제 배포 전 필수
- [x] Google Apps Script 프로젝트 생성 + Web App 배포 완료 (exec URL 확보, 배포 ID `AKfycbz00DX...`)
- [x] Google Apps Script 프로젝트에서 고급 서비스(Drive API v3, Slides API v1) 활성화 완료
- [x] Script Properties에 `ADMIN_EMAIL`(`minhahas43@gmail.com`), `GOOGLE_OAUTH_CLIENT_ID` 입력 완료 및 로그인 검증으로 확인됨
- [x] Google Drive에 "강의자료" 폴더 생성 완료 (`setupLectureFolder()`로 자동 생성, `LECTURE_FOLDER_ID` Script Properties 자동 저장 확인됨). "과제 제출 루트" 폴더(`SUBMISSION_ROOT_FOLDER_ID`)는 §10-7 과제 제출 기능에서 필요할 때 같은 방식으로 추가
- [x] Google Sheet 생성 완료 (`LabSite DB`, `Lectures` 탭 + 헤더 행). `Code.js`의 `setupDatabase()` 함수로 자동 생성 후 `SPREADSHEET_ID` Script Properties에 자동 저장됨. `Assignments`/`Submissions` 탭은 6~7단계에서 필요할 때 추가
- [ ] 포트폴리오 `index.html` hero-cta에 LabSite로 가는 버튼 추가 (버튼 문구는 §9 참고)

**백엔드 코드는 clasp으로 로컬 관리**: `labsite/backend/`에 `Code.js`, `appsscript.json` 존재. 수정 후 `clasp push` → `clasp deploy -i AKfycbz00DX469QYTmKlOfgJe5jgo2JhwIrHik4Zxml9IyrCAVCMg3E8GODxpROEebBzD_gt`로 기존 배포 갱신(URL 유지). 로컬 로그인 테스트용 `labsite/test-login.local.html`은 git에는 안 올라감(`.gitignore` 처리).

---

## 9. 아직 정해지지 않은 것 (열린 질문 — 답변 주시면 반영하겠습니다)

1. ~~프론트엔드 기술 스택~~ → **해결됨**: 순수 HTML/CSS/JS로 결정 (빌드 없음, 기존 portfolio 리포와 방식 통일)
2. ~~강의자료 목록/미리보기 접근 범위~~ → **해결됨**: 로그인 없이 공개로 확정. `listLectures`/`getLecturePreview` 액션은 idToken 검증 없이 동작 (다운로드만 추후 관리자 게이트 적용, §4-4 그대로 유지)
3. **과제 마감 후 정책**: 마감일이 지나면 재제출을 막을지, 계속 허용할지?
4. ~~커스텀 도메인~~ → 해결됨: 현재 `kimminsu-123.github.io/portfolio/` 그대로 사용, 별도 도메인 없음
5. **포트폴리오 메인 페이지 링크 문구/위치**: hero-cta 영역(§0 참고)에 "개인 학습 페이지" 옆에 나란히 추가하는 걸로 가정하고 진행해도 될까요? 버튼 문구(예: "강의 자료실", "Lecture Site" 등)도 원하시는 걸로 알려주세요.

---

## 10. 구현 순서 제안

1. ~~사전 준비물(§8) 세팅~~ → 완료 (Drive 폴더 ID 2개만 남음)
2. ~~Apps Script: 로그인 검증 API만 우선 구현~~ → **완료**. `doGet`(헬스체크) + `doPost`(`verifyLogin` action, tokeninfo 검증 + ADMIN_EMAIL 비교)까지 실제 구글 로그인으로 종단 테스트 성공 (`{"ok":true,"email":"minhahas43@gmail.com","isAdmin":true}`)
3. ~~프론트 뼈대 + 구글 로그인 연동~~ → **완료**. `labsite/index.html`, `css/style.css`, `js/config.js`, `js/auth.js`, `js/app.js` 작성. 로그인 시 백엔드 `verifyLogin` 호출 → 응답을 `sessionStorage`에 저장해 새로고침에도 로그인 상태 유지, 로그인/로그아웃에 따라 화면 토글. 로컬 서버(`localhost:8080`)에서 실제 로그인까지 브라우저로 테스트 완료
4. ~~강의자료 목록 조회 + 미리보기 (읽기 전용 기능부터)~~ → **완료, 라이브 배포 및 종단 테스트 통과**. Apps Script에 `listLectures`(Lectures 시트 목록 반환)/`getLecturePreview`(ppt는 캐싱된 slideImageUrls, html은 Drive에서 읽은 원문) 액션 추가, `getConfig()`에 `spreadsheetId` 추가. 프론트에 `js/lectures.js` 추가 — 강의자료 카드 목록(로그인 여부 무관 항상 노출) + 미리보기 모달(PPT는 이미지 슬라이드 뷰어, HTML은 `sandbox="allow-scripts"` iframe srcdoc). `clasp deploy -i AKfycbz00DX...`로 기존 exec URL(배포 @5)에 반영 완료, `seedTestLectures()`로 넣은 테스트 데이터(html 1건 + ppt 3슬라이드 1건)로 실제 exec URL과 로컬 브라우저 렌더링까지 확인 완료. ⚠️ `seedTestLectures()`가 만든 테스트 행 2개(`test-html-1`, `test-ppt-1`)와 `test-lecture.html` Drive 파일은 §10-5(관리자 업로드) 구현 전 임시 데이터 — 실제 강의자료 업로드 기능이 생기면 삭제 예정
5. ~~관리자 업로드/삭제 (쓰기 + 인증 게이트)~~ → **완료, 실제 관리자 로그인으로 종단 테스트 통과**. Apps Script에 `requireAdmin`(idToken 검증 + 관리자 이메일 비교 공통 헬퍼), `uploadLecture`/`deleteLecture` 액션 추가. 업로드 시 HTML은 원본 그대로 Drive 저장, PPT는 원본 보관 + `Drive.Files.create`로 Slides 사본 변환 + 슬라이드별 썸네일을 Drive PNG로 캐싱(§7 해결 항목 참고) + `Lectures` 시트에 메타데이터 기록. 삭제 시 관련 Drive 파일(원본/Slides 사본/슬라이드 이미지) 전부 휴지통 이동 + 시트 행 삭제. 관리자 UI는 index.html과 분리된 `admin.html`(+ `js/admin.js`, `js/upload.js`)로 신규 작성, `js/lectures.js`는 옵션 파라미터로 확장해 삭제 버튼을 관리자 화면에서만 노출(index.html 회귀 없음). 실제 pptx/html 파일 업로드→미리보기→삭제까지 브라우저에서 전부 확인 완료. 이후 사용성 피드백으로 미리보기를 전체화면(F11 대응)으로 변경, PPT 좌우 화살표 키 네비게이션 추가, 삭제 중 로딩 상태 표시 추가
6. 과제 생성/삭제 (관리자) ← **다음 단계**
7. 과제 제출 + 재제출 업데이트 로직 (학생 기능, §4-5 핵심)
8. 다운로드 게이트 + 미리보기 다운로드 차단 옵션 적용
9. GitHub Pages 배포 파이프라인 구성
10. 통합 테스트

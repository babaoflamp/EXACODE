## 배포 개요

ExaCode Canvas 애플리케이션의 개발 서버 검증용 배포 파일을 전달드립니다.
요청하신 대로 **localhost:8501** 환경으로 설정하여 압축파일을 준비하였습니다.

---

## 배포 파일 정보

**파일명:** `exacode-canvas-localhost-deploy.tar.gz`
**크기:** 1.1MB
**포함 파일:** 380개
**환경 설정:** localhost:8501 (개발 서버 검증용)

---

## 주요 변경사항

기존 192.168.200.18:8501 → **localhost:8501**로 변경된 핵심 파일들:

### 1. 웹 애플리케이션 개발 서버 설정
```json
// apps/web/package.json
"dev": "next dev -H ${SERVER_IP:-localhost} -p 8501"
```

### 2. API 클라이언트 기본 설정
```typescript
// apps/web/src/hooks/utils.ts
const apiUrl = process.env.NEXT_PUBLIC_API_URL ??
               process.env.NEXT_PUBLIC_LANGGRAPH_API_URL ??
               `http://localhost:8501/api`;
```

---

## 배포 절차

### 1단계: 파일 압축 해제
```bash
tar -xzf exacode-canvas-localhost-deploy.tar.gz
cd exacode-canvas/
```

### 2단계: 의존성 설치
```bash
yarn install
```

### 3단계: 프로젝트 빌드
```bash
yarn build
```

### 4단계: 개발 서버 실행

#### 로컬 접속만 필요한 경우 (localhost)
```bash
# LangGraph 에이전트 서버 실행 (터미널 1)
cd apps/agents
yarn dev
# 실행 결과: http://localhost:54367

# 웹 애플리케이션 실행 (터미널 2)
cd apps/web
yarn dev
# 실행 결과: http://localhost:8501
```

#### 외부 PC에서 접속이 필요한 경우
```bash
# LangGraph 에이전트 서버 실행 (터미널 1)
cd apps/agents
yarn dev
# 실행 결과: http://localhost:54367

# 웹 애플리케이션 실행 (터미널 2) - 서버 IP 지정
cd apps/web

# 방법 1: 환경변수 설정 후 실행 (권장)
export SERVER_IP=192.168.200.18
yarn dev

# 방법 2: 직접 명령어에 지정
SERVER_IP=192.168.200.18 yarn dev

# 방법 3: 모든 인터페이스에 바인딩
SERVER_IP=0.0.0.0 yarn dev

# 실행 결과: http://[서버IP]:8501
```

---

## 서비스 접근 정보

### 로컬 접속
**메인 애플리케이션:** http://localhost:8501
**LangGraph API:** http://localhost:54367
**API 엔드포인트:** http://localhost:8501/api

### 외부 PC 접속 (SERVER_IP 설정 시)
**메인 애플리케이션:** http://[서버IP]:8501
**LangGraph API:** http://localhost:54367 (로컬만 접속 가능)
**API 엔드포인트:** http://[서버IP]:8501/api

---

## 환경 설정 확인사항

### 필수 포트 확인
- **3000**: Next.js 기본 포트 (사용 안 함)
- **8501**: 메인 웹 애플리케이션 포트
- **54367**: LangGraph 에이전트 서버 포트

### 환경 변수 파일 포함
배포 패키지에는 다음 환경 설정 파일들이 포함되어 있습니다:
- `./.env` (LangGraph 에이전트용)
- `./apps/web/.env` (웹 애플리케이션용)
- `./docs/env-templates/` (환경 설정 템플릿)

---

## 검증 방법

### 1. 서버 상태 확인
```bash
# 포트 사용 현황 확인
netstat -tulpn | grep -E "(8501|54367)"

# 프로세스 확인
ps aux | grep -E "(next|langgraph)"
```

### 2. 웹 접근 테스트
1. 브라우저에서 `http://localhost:8501` 접속
2. 메인 화면 로딩 확인
3. 문서 생성/편집 기능 테스트

### 3. API 연결 테스트
- 브라우저 개발자 도구에서 Network 탭 확인
- API 호출이 `localhost:8501/api`로 정상 수행되는지 확인

---

## 시스템 요구사항

**Node.js:** 18.0 이상
**Yarn:** 1.22 이상
**메모리:** 4GB 이상 권장
**디스크:** 2GB 이상 여유 공간

---

## 트러블슈팅

### 포트 충돌 발생 시
```bash
# 포트 8501 사용 프로세스 종료
sudo lsof -ti:8501 | xargs kill -9

# 포트 54367 사용 프로세스 종료
sudo lsof -ti:54367 | xargs kill -9
```

### 빌드 오류 발생 시
```bash
# 캐시 정리 후 재빌드
yarn clean
rm -rf node_modules .next .turbo
yarn install
yarn build
```

**추가 문서:**
- 상세 배포 가이드: `docs/deployment-plan.md`
- 스크립트 사용법: `docs/scripts/README.md`
- 빠른 테스트: `docs/scripts/quick-test.sh`

---

## 체크리스트

배포 완료 후 다음 사항을 확인해주세요:

- [ ] 압축 파일 정상 해제
- [ ] yarn install 정상 완료
- [ ] yarn build 정상 완료
- [ ] 에이전트 서버 실행 (포트 54367)
- [ ] 웹 애플리케이션 실행 (포트 8501)
- [ ] http://localhost:8501 정상 접속
- [ ] 문서 생성/편집 기능 테스트
- [ ] API 통신 정상 동작
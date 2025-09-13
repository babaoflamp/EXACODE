# ExaCode Canvas 서버 배포 스크립트 가이드

이 디렉토리에는 ExaCode Canvas 프로젝트를 새 서버로 이전하기 위한 스크립트들이 포함되어 있습니다.

## 파일 구성

### 스크립트 파일들
- **deploy.sh**: 메인 배포 스크립트 - 환경설정부터 빌드까지 자동화
- **quick-test.sh**: 배포 후 연동 상태를 빠르게 테스트하는 스크립트

### 환경변수 템플릿들 (../env-templates/)
- **.env.template**: 루트 환경변수 파일 템플릿
- **web.env.template**: 웹 앱 환경변수 파일 템플릿

## 사용 방법

### 1단계: 전체 배포 실행
```bash
# 프로젝트 루트에서 실행
cd /path/to/exacode-canvas

# IP만 지정하여 배포
./docs/scripts/deploy.sh 192.168.200.19

# IP와 도메인 모두 지정하여 배포
./docs/scripts/deploy.sh 192.168.200.19 https://new-exacode.lge.com
```

### 2단계: 서비스 시작
배포 완료 후 생성된 스크립트로 서비스를 시작합니다:

```bash
# 터미널 1: 백엔드 시작
./start-backend.sh

# 터미널 2: 프론트엔드 시작 (새 터미널에서)
./start-frontend.sh
```

### 3단계: 연동 테스트
```bash
# 연동 상태 자동 테스트
./docs/scripts/quick-test.sh
```

## deploy.sh 상세 기능

### Phase 1: 환경 확인
- Node.js, Yarn 설치 상태 확인
- 프로젝트 구조 검증

### Phase 2: 환경변수 업데이트
- 기존 .env 파일들 백업 (타임스탬프 포함)
- 새 IP/도메인으로 환경변수 자동 변경
- 루트 .env와 apps/web/.env 모두 처리

### Phase 3: 네트워크 검증
- SSO 서버 (sso.lge.com) 접근성 확인
- LDAP 서버 (lgesaads01.lge.net:636) 접근성 확인

### Phase 4: 빌드
- yarn install: 의존성 설치
- yarn build: 프로젝트 빌드

### Phase 5: 포트 확인
- 3000, 8501, 54367 포트 사용 현황 확인

### Phase 6: 시작 스크립트 생성
- start-backend.sh: 백엔드 시작 스크립트
- start-frontend.sh: 프론트엔드 시작 스크립트

## quick-test.sh 상세 기능

### 1. 기본 서비스 상태 확인
- 프론트엔드 (포트 3000) 응답 테스트
- 백엔드 (포트 54367) 응답 테스트

### 2. 네트워크 연결성 확인
- SSO 서버 연결 테스트
- LDAP 서버 연결 테스트 (nmap 사용)

### 3. API 엔드포인트 확인
- /api/auth/sso 접근성 확인
- /api/auth/ldap 접근성 확인

### 4. 환경변수 설정 확인
- IP 주소 관련 환경변수들이 올바르게 설정되었는지 검증

## 환경변수 변경 내역

### 루트 .env 파일
```bash
SERVER_IP=[NEW_SERVER_IP]                    # 변경됨
NEXT_PUBLIC_APP_URL=[NEW_APP_URL]           # 변경됨
SSO_COOKIE_PATH=/exacode-chat.lge.com       # 도메인 변경 시 수정 필요
```

### apps/web/.env 파일
```bash
SERVER_IP=[NEW_SERVER_IP]                           # 변경됨
LANGGRAPH_API_URL=http://[NEW_SERVER_IP]:54367     # 변경됨
NEXT_PUBLIC_API_URL=http://[NEW_SERVER_IP]:8501/api # 변경됨
```

### 변경되지 않는 설정들
- **SSO 설정**: SSO_URL, SSO_COOKIE_NAME (LG전자 내부 서비스)
- **LDAP 설정**: 모든 LDAP 관련 설정 (FQDN 사용)
- **외부 서비스**: Supabase, AI API 키들
- **포트**: 기본 포트 유지 (3000, 8501, 54367)

## 사전 요구사항

### 서버 환경
- **Node.js**: v18 이상
- **Yarn**: 최신 버전
- **포트**: 3000, 8501, 54367 사용 가능
- **권한**: sudo 또는 포트 바인딩 권한

### 네트워크 환경
- **LG전자 내부망**: SSO/LDAP 서버 접근을 위해 필요
- **방화벽**: 필요한 포트들이 오픈되어 있어야 함
- **인터넷**: 외부 AI API 및 Supabase 접근

## 문제 해결

### 일반적인 오류들

#### 1. 포트 충돌
```bash
# 포트 사용 현황 확인
netstat -tlnp | grep :3000
netstat -tlnp | grep :54367

# 프로세스 종료
kill -9 <PID>
```

#### 2. 권한 오류
```bash
# sudo로 실행하거나 높은 포트 번호 사용 (>1024)
sudo ./start-backend.sh

# 또는 환경변수에서 포트 변경
PORT=3001 yarn dev
```

#### 3. 빌드 실패
```bash
# 캐시 클리어 후 재시도
yarn cache clean
rm -rf node_modules
yarn install
yarn build
```

#### 4. 네트워크 연결 실패
- 방화벽 설정 확인
- LG전자 내부망 연결 상태 확인
- IT팀에 네트워크 정책 문의

## 지원

문제가 발생하면 다음 정보와 함께 문의하세요:

1. **에러 메시지**: 전체 스택 트레이스 포함
2. **환경 정보**: OS, Node.js 버전, 네트워크 환경
3. **로그 파일**: 콘솔 출력 전체
4. **테스트 결과**: quick-test.sh 실행 결과

## 예상 소요시간

| Phase | 작업 내용 | 예상 시간 | 비고 |
|-------|----------|-----------|------|
| Phase 1 | 환경 설정 준비 | 15분 | 사전 조사 및 권한 확인 |
| Phase 2 | 환경변수 업데이트 | 10분 | IP/도메인 관련 설정 변경 |
| Phase 3 | 네트워크 접근성 검증 | 10분 | 내부망 연결 및 방화벽 확인 |
| Phase 4 | 애플리케이션 배포 | 20분 | 코드 복사, 빌드, 설정 |
| Phase 5 | 서비스 시작 및 테스트 | 15분 | 구동 및 기능 테스트 |
| Phase 6 | DNS/프록시 설정 | 30분 | 선택사항 |
| **총 예상시간** | | **1.5 ~ 2시간** | 네트워크 이슈 없는 경우 |

## 긴급 상황 대응

### 롤백 계획
1. **즉시 롤백**: 기존 서버 재가동
2. **DNS 롤백**: 도메인 변경한 경우 이전 IP로 DNS 되돌리기
3. **사용자 안내**: 장애 상황 및 복구 시간 안내

### 주의사항
- **다운타임**: 기존 서비스 실행 중인 경우 다운타임 최소화 전략 필요
- **SSO 쿠키**: 도메인 종속적이므로 도메인 변경 시 SSO 재설정 필요
- **사용자 안내**: 기존 URL 변경 시 사용자들에게 새 URL 안내 필요
- **데이터 백업**: 중요한 사용자 데이터나 설정 파일 백업 권장

---

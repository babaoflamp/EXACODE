# 서버 이전 배포 계획

## 현재 환경 분석

### **현재 서버 설정**
- **현재 IP**: `192.168.200.18`
- **포트 구성**:
  - Frontend: `3000` (개발), `8501` (프록시)
  - LangGraph Backend: `54367`
- **도메인**: `https://exacode-chat.lge.com`
- **아키텍처**: Yarn Workspace 모노레포 (Next.js + LangGraph)

### **IP 종속적인 설정들**
1. **루트 `.env`**:
   - `SERVER_IP=192.168.200.18`
   - `NEXT_PUBLIC_APP_URL=https://exacode-chat.lge.com`

2. **`apps/web/.env`**:
   - `LANGGRAPH_API_URL=http://192.168.200.18:54367`
   - `NEXT_PUBLIC_API_URL=http://192.168.200.18:8501/api`

### **외부 연동 서비스들**
- **SSO**: `http://sso.lge.com` (LG전자 내부) - IP 무관
- **LDAP**: `ldaps://lgesaads01.lge.net` (LG전자 내부) - IP 무관
- **Supabase**: 외부 클라우드 서비스 - IP 무관
- **AI APIs**: 외부 클라우드 서비스들 - IP 무관

---

## Phase 1: 환경 설정 준비 (15분)

### 1.1 새 서버 정보 확인
- [ ] 새 서버의 실제 IP 주소 확인
- [ ] 새 도메인명 또는 기존 도메인의 DNS 변경 계획 수립
- [ ] 포트 전략 결정: 기존 포트 구성 유지 vs 새 포트 할당

### 1.2 접근 권한 확인
- [ ] 새 서버 root/sudo 권한 확인
- [ ] 필요한 포트(3000, 8501, 54367) 바인딩 가능 여부 확인
- [ ] 방화벽 정책 확인

---

## Phase 2: 환경변수 업데이트 (10분)

### 2.1 루트 `.env` 파일 수정
```bash
# 변경 전
SERVER_IP=192.168.200.18
NEXT_PUBLIC_APP_URL=https://exacode-chat.lge.com

# 변경 후 (예시)
SERVER_IP=[새_IP_주소]
NEXT_PUBLIC_APP_URL=https://[새_도메인]
```

### 2.2 `apps/web/.env` 파일 수정
```bash
# 변경 전
LANGGRAPH_API_URL=http://192.168.200.18:54367
NEXT_PUBLIC_API_URL=http://192.168.200.18:8501/api

# 변경 후 (예시)
LANGGRAPH_API_URL=http://[새_IP_주소]:54367
NEXT_PUBLIC_API_URL=http://[새_IP_주소]:8501/api
```

### 2.3 SSO 쿠키 경로 확인
- SSO_COOKIE_PATH가 도메인 종속적이므로 도메인 변경 시 조정 필요
- 현재: `SSO_COOKIE_PATH=/exacode-chat.lge.com`

---

## Phase 3: 네트워크 접근성 검증 (10분)

### 3.1 LG전자 내부망 연결 테스트
```bash
# SSO 서버 접근 테스트
curl -I http://sso.lge.com/agentless/seoul/exacodeAngeless.jsp

# LDAP 서버 접근 테스트
nmap -p 636 lgesaads01.lge.net
```

### 3.2 방화벽 설정 확인
- [ ] 포트 3000 오픈 확인
- [ ] 포트 8501 오픈 확인
- [ ] 포트 54367 오픈 확인
- [ ] 필요 시 IT팀에 방화벽 해제 요청

---

## Phase 4: 애플리케이션 배포 (20분)

### 4.1 런타임 환경 설정
```bash
# Node.js 설치 확인 (v18 이상 권장)
node --version

# Yarn 설치 확인
yarn --version
```

### 4.2 소스코드 배포
```bash
# Git을 통한 배포 (권장)
git clone [repository_url] exacode-canvas
cd exacode-canvas

# 또는 기존 서버에서 파일 복사
scp -r /home/scottk/GitHub/20250911/exacode-canvas user@[새_IP]:/path/to/destination
```

### 4.3 의존성 설치 및 빌드
```bash
# 의존성 설치
yarn install

# 전체 워크스페이스 빌드
yarn build
```

### 4.4 환경변수 파일 적용
- [ ] 수정된 `.env` 파일 적용
- [ ] 수정된 `apps/web/.env` 파일 적용
- [ ] 환경변수 로드 확인

---

## Phase 5: 서비스 시작 및 테스트 (15분)

### 5.1 서비스 시작
```bash
# 터미널 1: LangGraph 백엔드 시작
cd apps/agents
yarn dev
# 포트 54367에서 실행 확인

# 터미널 2: Next.js 프론트엔드 시작
cd apps/web
yarn dev
# 포트 3000에서 실행 확인
```

### 5.2 기본 연결 테스트
- [ ] `http://[새_IP]:3000` 접속 테스트
- [ ] `http://[새_IP]:54367` LangGraph 서버 응답 확인
- [ ] 프론트엔드-백엔드 통신 확인

### 5.3 인증 연동 테스트
- [ ] 개발자 도구에서 "SSO 연동 확인" 버튼 테스트
- [ ] 개발자 도구에서 "LDAP 연동 확인" 버튼 테스트
- [ ] `exacode@lge.com` 테스트 계정 로그인 확인
- [ ] 쿠키 기반 인증 플로우 확인

---

## Phase 6: DNS 및 프록시 설정 (선택사항, 30분)

### 6.1 도메인 설정 (도메인 변경 시)
- [ ] DNS 레코드 업데이트 또는 IT팀 요청
- [ ] 도메인 전파 확인 (`nslookup [새_도메인]`)

### 6.2 리버스 프록시 설정 (선택)
```nginx
# nginx 설정 예시
server {
    listen 80;
    server_name [새_도메인];

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ {
        proxy_pass http://localhost:8501;
    }
}
```

### 6.3 SSL 인증서 (HTTPS 사용 시)
- [ ] SSL 인증서 발급/이전
- [ ] HTTPS 리다이렉션 설정
- [ ] 환경변수에서 HTTPS URL 업데이트

---

## 배포 체크리스트

### 필수 확인사항
- [ ] **네트워크**: 새 서버가 LG전자 내부망에 연결되어 SSO/LDAP 접근 가능한지
- [ ] **권한**: 새 서버에서 포트 바인딩 및 서비스 실행 권한
- [ ] **방화벽**: 필요한 포트들(3000, 8501, 54367)이 오픈되어 있는지
- [ ] **의존성**: Node.js(v18+), Yarn 등 런타임 환경 설치 여부
- [ ] **환경변수**: IP 주소 관련 모든 설정 업데이트 완료
- [ ] **빌드**: `yarn build` 성공적 완료
- [ ] **서비스**: 프론트엔드/백엔드 정상 구동
- [ ] **인증**: SSO/LDAP 연동 정상 작동

### 주의사항
- **다운타임**: 기존 서비스 실행 중인 경우 다운타임 최소화 전략 필요
- **SSO 쿠키**: 도메인 종속적이므로 도메인 변경 시 SSO 재설정 필요
- **사용자 안내**: 기존 URL 변경 시 사용자들에게 새 URL 안내 필요
- **데이터 백업**: 중요한 사용자 데이터나 설정 파일 백업 권장

---

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

---

## 긴급 상황 대응

### 롤백 계획
1. **즉시 롤백**: 기존 서버 재가동
2. **DNS 롤백**: 도메인 변경한 경우 이전 IP로 DNS 되돌리기
3. **사용자 안내**: 장애 상황 및 복구 시간 안내

### 문제 해결 가이드
- **포트 충돌**: `netstat -tlnp | grep :포트번호`로 충돌 확인
- **권한 오류**: `sudo`로 실행 또는 포트 번호 변경 (>1024)
- **네트워크 오류**: 방화벽 설정 재확인 또는 IT팀 문의
- **빌드 실패**: Node.js 버전 확인 및 캐시 클리어 (`yarn cache clean`)

---

*작성일: 2025년 1월 13일*
*작성자: Claude Code*
*프로젝트: ExaCode Canvas 서버 이전*
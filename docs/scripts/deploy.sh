#!/bin/bash

# ExaCode Canvas 서버 이전 배포 스크립트
# Usage: ./deploy.sh <NEW_SERVER_IP> [NEW_DOMAIN]

set -e  # 오류 시 스크립트 중단

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로그 함수들
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 사용법 출력
usage() {
    echo "Usage: $0 <NEW_SERVER_IP> [NEW_DOMAIN]"
    echo ""
    echo "Examples:"
    echo "  $0 192.168.200.19"
    echo "  $0 192.168.200.19 https://new-exacode.lge.com"
    echo ""
    exit 1
}

# 파라미터 확인
if [ $# -lt 1 ]; then
    log_error "새 서버 IP가 필요합니다."
    usage
fi

NEW_SERVER_IP=$1
NEW_DOMAIN=${2:-"http://$NEW_SERVER_IP:3000"}

log_info "서버 이전 배포를 시작합니다..."
log_info "새 서버 IP: $NEW_SERVER_IP"
log_info "새 도메인: $NEW_DOMAIN"

# 현재 디렉토리 확인
if [ ! -f "package.json" ] || [ ! -d "apps/web" ]; then
    log_error "ExaCode Canvas 프로젝트 루트 디렉토리에서 실행해주세요."
    exit 1
fi

# Phase 1: 환경 확인
log_info "Phase 1: 환경 확인 중..."

# Node.js 버전 확인
if ! command -v node &> /dev/null; then
    log_error "Node.js가 설치되지 않았습니다."
    exit 1
fi

NODE_VERSION=$(node --version)
log_success "Node.js 버전: $NODE_VERSION"

# Yarn 확인
if ! command -v yarn &> /dev/null; then
    log_error "Yarn이 설치되지 않았습니다."
    exit 1
fi

YARN_VERSION=$(yarn --version)
log_success "Yarn 버전: $YARN_VERSION"

# Phase 2: 환경변수 파일 백업 및 업데이트
log_info "Phase 2: 환경변수 파일 업데이트 중..."

# 기존 파일 백업
if [ -f ".env" ]; then
    cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
    log_success "루트 .env 파일 백업 완료"
fi

if [ -f "apps/web/.env" ]; then
    cp apps/web/.env apps/web/.env.backup.$(date +%Y%m%d_%H%M%S)
    log_success "웹 .env 파일 백업 완료"
fi

# 템플릿 파일 확인
if [ ! -f "docs/env-templates/.env.template" ]; then
    log_error "환경변수 템플릿 파일이 없습니다: docs/env-templates/.env.template"
    exit 1
fi

if [ ! -f "docs/env-templates/web.env.template" ]; then
    log_error "웹 환경변수 템플릿 파일이 없습니다: docs/env-templates/web.env.template"
    exit 1
fi

# 루트 .env 파일 생성
log_info "루트 .env 파일 업데이트 중..."
sed "s/\[NEW_SERVER_IP\]/$NEW_SERVER_IP/g; s|\[NEW_APP_URL\]|$NEW_DOMAIN|g" \
    docs/env-templates/.env.template > .env
log_success "루트 .env 파일 업데이트 완료"

# 웹 .env 파일 생성
log_info "웹 .env 파일 업데이트 중..."
sed "s/\[NEW_SERVER_IP\]/$NEW_SERVER_IP/g" \
    docs/env-templates/web.env.template > apps/web/.env
log_success "웹 .env 파일 업데이트 완료"

# Phase 3: 네트워크 접근성 검증
log_info "Phase 3: 네트워크 접근성 검증 중..."

# SSO 서버 접근 테스트
log_info "SSO 서버 접근성 확인 중..."
if curl -s --connect-timeout 5 -I http://sso.lge.com &>/dev/null; then
    log_success "SSO 서버 접근 가능"
else
    log_warning "SSO 서버 접근 불가 - LG전자 내부망 연결을 확인하세요"
fi

# LDAP 서버 접근 테스트 (nmap이 있는 경우)
if command -v nmap &> /dev/null; then
    log_info "LDAP 서버 접근성 확인 중..."
    if nmap -p 636 lgesaads01.lge.net 2>/dev/null | grep -q "636/tcp open"; then
        log_success "LDAP 서버 접근 가능"
    else
        log_warning "LDAP 서버 접근 불가 - LG전자 내부망 연결을 확인하세요"
    fi
else
    log_warning "nmap이 설치되지 않아 LDAP 접근성을 확인할 수 없습니다"
fi

# Phase 4: 의존성 설치 및 빌드
log_info "Phase 4: 의존성 설치 및 빌드 중..."

# 의존성 설치
log_info "의존성 설치 중..."
if yarn install; then
    log_success "의존성 설치 완료"
else
    log_error "의존성 설치 실패"
    exit 1
fi

# 빌드
log_info "프로젝트 빌드 중..."
if yarn build; then
    log_success "빌드 완료"
else
    log_error "빌드 실패"
    exit 1
fi

# Phase 5: 포트 확인
log_info "Phase 5: 포트 사용 현황 확인 중..."

check_port() {
    local port=$1
    if netstat -tlnp 2>/dev/null | grep -q ":$port "; then
        log_warning "포트 $port이 이미 사용 중입니다"
        netstat -tlnp 2>/dev/null | grep ":$port "
        return 1
    else
        log_success "포트 $port 사용 가능"
        return 0
    fi
}

check_port 3000
check_port 8501
check_port 54367

# Phase 6: 시작 스크립트 생성
log_info "Phase 6: 시작 스크립트 생성 중..."

# 백엔드 시작 스크립트
cat > start-backend.sh << 'EOF'
#!/bin/bash
echo "Starting LangGraph backend..."
cd apps/agents
yarn dev
EOF

# 프론트엔드 시작 스크립트
cat > start-frontend.sh << 'EOF'
#!/bin/bash
echo "Starting Next.js frontend..."
cd apps/web
yarn dev
EOF

chmod +x start-backend.sh start-frontend.sh
log_success "시작 스크립트 생성 완료"

# 배포 완료 메시지
echo ""
log_success "======================================"
log_success "   🚀 배포 준비가 완료되었습니다!"
log_success "======================================"
echo ""
log_info "다음 단계:"
echo "  1. 백엔드 시작: ./start-backend.sh"
echo "  2. 프론트엔드 시작: ./start-frontend.sh (별도 터미널)"
echo ""
log_info "접속 정보:"
echo "  - 프론트엔드: http://$NEW_SERVER_IP:3000"
echo "  - 백엔드 API: http://$NEW_SERVER_IP:54367"
echo "  - 프록시 API: http://$NEW_SERVER_IP:8501/api"
echo ""
log_info "테스트 방법:"
echo "  - SSO 연동: 개발자 도구 > 'SSO 연동 확인' 버튼"
echo "  - LDAP 연동: 개발자 도구 > 'LDAP 연동 확인' 버튼"
echo "  - 테스트 로그인: exacode@lge.com"
echo ""
log_warning "주의사항:"
echo "  - 두 서비스 모두 실행해야 정상 작동합니다"
echo "  - 방화벽에서 포트 3000, 8501, 54367이 열려있는지 확인하세요"
echo "  - LG전자 내부망 연결이 필요합니다 (SSO/LDAP)"
echo ""
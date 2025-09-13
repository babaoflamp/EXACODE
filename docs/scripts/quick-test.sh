#!/bin/bash

# ExaCode Canvas 연동 테스트 스크립트
# 서버 이전 후 SSO/LDAP 연동 상태를 빠르게 확인

set -e

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

# 서버 IP 추출 (환경변수에서)
if [ -f ".env" ]; then
    SERVER_IP=$(grep "SERVER_IP=" .env | cut -d'=' -f2)
else
    log_error ".env 파일을 찾을 수 없습니다."
    exit 1
fi

if [ -z "$SERVER_IP" ]; then
    log_error "SERVER_IP를 .env 파일에서 찾을 수 없습니다."
    exit 1
fi

log_info "서버 연동 테스트를 시작합니다..."
log_info "대상 서버: $SERVER_IP"

# 1. 기본 서비스 상태 확인
log_info "=== 1. 기본 서비스 상태 확인 ==="

# 프론트엔드 확인
log_info "프론트엔드 서비스 확인 중..."
if curl -s --connect-timeout 5 "http://$SERVER_IP:3000" > /dev/null; then
    log_success "프론트엔드 서비스 정상 (포트 3000)"
else
    log_error "프론트엔드 서비스 접근 불가 (포트 3000)"
fi

# 백엔드 확인
log_info "백엔드 서비스 확인 중..."
if curl -s --connect-timeout 5 "http://$SERVER_IP:54367" > /dev/null; then
    log_success "백엔드 서비스 정상 (포트 54367)"
else
    log_error "백엔드 서비스 접근 불가 (포트 54367)"
fi

# 2. 네트워크 연결성 확인
log_info "=== 2. 네트워크 연결성 확인 ==="

# SSO 서버 연결 확인
log_info "SSO 서버 연결 확인 중..."
if curl -s --connect-timeout 5 -I http://sso.lge.com &>/dev/null; then
    log_success "SSO 서버 연결 정상 (sso.lge.com)"
else
    log_warning "SSO 서버 연결 불가 - 내부망 연결 확인 필요"
fi

# LDAP 서버 연결 확인
log_info "LDAP 서버 연결 확인 중..."
if command -v nmap &> /dev/null; then
    if timeout 10 nmap -p 636 lgesaads01.lge.net 2>/dev/null | grep -q "636/tcp open"; then
        log_success "LDAP 서버 연결 정상 (lgesaads01.lge.net:636)"
    else
        log_warning "LDAP 서버 연결 불가 - 내부망 연결 확인 필요"
    fi
else
    log_warning "nmap이 설치되지 않아 LDAP 연결을 확인할 수 없습니다"
fi

# 3. API 엔드포인트 확인
log_info "=== 3. API 엔드포인트 확인 ==="

# SSO API 확인
log_info "SSO API 엔드포인트 확인 중..."
if curl -s --connect-timeout 5 "http://$SERVER_IP:3000/api/auth/sso" -X GET &>/dev/null; then
    log_success "SSO API 엔드포인트 접근 가능"
else
    log_warning "SSO API 엔드포인트 접근 불가"
fi

# LDAP API 확인
log_info "LDAP API 엔드포인트 확인 중..."
if curl -s --connect-timeout 5 "http://$SERVER_IP:3000/api/auth/ldap" -X GET > /dev/null; then
    log_success "LDAP API 엔드포인트 접근 가능"
else
    log_warning "LDAP API 엔드포인트 접근 불가"
fi

# 4. 환경변수 확인
log_info "=== 4. 환경변수 설정 확인 ==="

check_env_var() {
    local file=$1
    local var=$2
    local expected=$3

    if [ -f "$file" ]; then
        local value=$(grep "^$var=" "$file" | cut -d'=' -f2- | tr -d '"')
        if [ -n "$value" ]; then
            if [[ "$value" == *"$expected"* ]]; then
                log_success "$file: $var 올바르게 설정됨"
            else
                log_warning "$file: $var 값 확인 필요 - $value"
            fi
        else
            log_error "$file: $var 설정되지 않음"
        fi
    else
        log_error "$file 파일이 없습니다"
    fi
}

check_env_var ".env" "SERVER_IP" "$SERVER_IP"
check_env_var ".env" "SSO_ENABLED" "true"
check_env_var "apps/web/.env" "LANGGRAPH_API_URL" "$SERVER_IP:54367"
check_env_var "apps/web/.env" "NEXT_PUBLIC_API_URL" "$SERVER_IP:8501"

# 5. 테스트 요약
echo ""
log_info "=== 테스트 요약 ==="
echo ""
log_info "수동 테스트 방법:"
echo "  1. 브라우저에서 http://$SERVER_IP:3000 접속"
echo "  2. 로그인 페이지에서 개발자 도구 열기"
echo "  3. 'SSO 연동 확인' 버튼 클릭하여 연동 상태 확인"
echo "  4. 'LDAP 연동 확인' 버튼 클릭하여 연동 상태 확인"
echo "  5. '쿠키로 로그인' 버튼으로 테스트 로그인 (exacode@lge.com)"
echo ""
log_info "문제 해결:"
echo "  - 서비스 접근 불가: 해당 서비스가 실행 중인지 확인"
echo "  - 내부망 연결 불가: LG전자 내부망 연결 상태 확인"
echo "  - API 접근 불가: 방화벽 설정 확인"
echo ""

# 최종 상태 표시
if curl -s --connect-timeout 5 "http://$SERVER_IP:3000" > /dev/null &&
   curl -s --connect-timeout 5 "http://$SERVER_IP:54367" > /dev/null; then
    log_success "기본 서비스가 정상 작동 중입니다! 🚀"
else
    log_error "일부 서비스에 문제가 있습니다. 위 내용을 확인해주세요."
fi
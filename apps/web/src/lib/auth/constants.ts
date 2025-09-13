/**
 * 인증 관련 상수 정의
 */

export const AUTH_CONSTANTS = {
  // 테스트 계정 정보
  TEST_USER_EMAIL: 'exacode@lge.com',
  TEST_USER_ID: 'exacode',
  TEST_USER_NAME: 'exacode',
  TEST_USER_DEPARTMENT: '인공지능 알고리즘TP',

  // 세션 및 토큰 설정
  COOKIE_MAX_AGE: 24 * 60 * 60, // 24시간 (초)
  SESSION_TIMEOUT: 3600, // 1시간 (초)
  TOKEN_REFRESH_THRESHOLD: 5 * 60, // 5분 (초)

  // 인증 방법
  AUTH_METHODS: {
    SUPABASE: 'supabase',
    SSO: 'sso',
    LDAP: 'ldap'
  } as const,

  // 쿠키 이름들
  COOKIE_NAMES: {
    SSO_ID: 'ssoId',
    AUTH_TOKEN: 'auth-token',
    TEST_SESSION: 'test_session',
    EXACODE_USER: 'exacode_user',
    EXACODE_USER_ALT: 'exacodeUser',
    SB_ACCESS_TOKEN: 'sb-access-token',
    SB_REFRESH_TOKEN: 'sb-refresh-token',
    SUPABASE_AUTH_TOKEN: 'supabase-auth-token',
    SESSION: 'session',
    USER_SESSION: 'user_session'
  } as const,

  // API 엔드포인트
  API_ENDPOINTS: {
    SSO_AUTH: '/api/auth/sso',
    TOKEN_VERIFY: '/api/auth/verify-token',
    LOGOUT: '/api/auth/logout',
    TEST_LOGIN: '/api/auth/test'
  } as const,

  // 에러 메시지
  ERROR_MESSAGES: {
    LOGIN_FAILED: '로그인에 실패했습니다.',
    SESSION_EXPIRED: '세션이 만료되었습니다.',
    UNAUTHORIZED: '인증이 필요합니다.',
    TOKEN_INVALID: '유효하지 않은 토큰입니다.',
    NETWORK_ERROR: '네트워크 오류가 발생했습니다.'
  } as const
} as const;

export type AuthMethod = typeof AUTH_CONSTANTS.AUTH_METHODS[keyof typeof AUTH_CONSTANTS.AUTH_METHODS];
export type CookieName = typeof AUTH_CONSTANTS.COOKIE_NAMES[keyof typeof AUTH_CONSTANTS.COOKIE_NAMES];
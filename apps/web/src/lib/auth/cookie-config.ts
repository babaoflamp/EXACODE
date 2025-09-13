/**
 * 보안 쿠키 설정을 위한 표준 설정
 */

export const SECURE_COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
  maxAge: 24 * 60 * 60 // 24시간
} as const;

export const AUTH_COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 24 * 60 * 60 // 24시간
} as const;

export const TEST_COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 24 * 60 * 60 // 24시간
} as const;

/**
 * 쿠키 삭제를 위한 설정
 */
export const COOKIE_DELETE_CONFIG = {
  path: '/',
  expires: new Date(0), // 1970년 1월 1일
  httpOnly: false, // JavaScript에서도 접근 가능하도록
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const
} as const;

export const HTTPONLY_COOKIE_DELETE_CONFIG = {
  path: '/',
  expires: new Date(0),
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const
} as const;
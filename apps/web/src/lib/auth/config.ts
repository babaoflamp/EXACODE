import { AuthConfig } from './types';

// 환경변수에서 인증 설정 가져오기
export function getAuthConfig(): AuthConfig {
  return {
    sso: {
      enabled: process.env.SSO_ENABLED === 'true',
      url: process.env.SSO_URL || '',
      cookieName: process.env.SSO_COOKIE_NAME || 'ssoId',
      cookiePath: process.env.SSO_COOKIE_PATH || '/',
    },
    ldap: {
      enabled: true, // LDAP는 항상 활성화
      host: process.env.LDAP_HOST || '',
      port: parseInt(process.env.LDAP_PORT || '636'),
      user: process.env.LDAP_USER || '',
      password: process.env.LDAP_PASSWORD || '',
      userSearchBase: process.env.LDAP_USER_SEARCH_BASE || '',
      groupSearchBase: process.env.LDAP_GROUP_SEARCH_BASE || '',
      groupFilter: process.env.LDAP_GROUP_FILTER || '(objectclass=person)',
      certPath: process.env.LDAP_CERT_PATH || '', // LDAPS 인증서 경로
    },
  };
}

// JWT 관련 시크릿
export const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';
export const SESSION_SECRET = process.env.SESSION_SECRET || 'your-session-secret';
export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-32-character-encryption-key-here';
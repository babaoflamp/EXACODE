// 인증 관련 타입 정의
import { AUTH_CONSTANTS } from './constants';

export type AuthMethod = typeof AUTH_CONSTANTS.AUTH_METHODS[keyof typeof AUTH_CONSTANTS.AUTH_METHODS];

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  authMethod: AuthMethod;
  employeeId?: string;
  department?: string;
  groups?: string[];
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

export interface TokenVerificationResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
  expired?: boolean;
}

export interface CookieConfig {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  path: string;
  maxAge: number;
}

export interface LogoutResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface SSOResponse {
  success: boolean;
  user?: AuthUser;
  error?: string;
  redirectUrl?: string;
}

export interface LDAPResponse {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

export interface LDAPUser {
  dn: string;
  cn: string;
  mail: string;
  sAMAccountName: string;
  department?: string;
  memberOf?: string[];
}

export interface AuthConfig {
  sso: {
    enabled: boolean;
    url: string;
    cookieName: string;
    cookiePath: string;
  };
  ldap: {
    enabled: boolean;
    host: string;
    port: number;
    user: string;
    password: string;
    userSearchBase: string;
    groupSearchBase: string;
    groupFilter: string;
    certPath: string;
  };
}
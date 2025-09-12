// 인증 관련 타입 정의

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  authMethod: 'supabase' | 'sso' | 'ldap';
  employeeId?: string;
  department?: string;
  groups?: string[];
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
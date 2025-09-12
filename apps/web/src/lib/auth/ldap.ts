import { Client } from 'ldapts';
import { readFileSync } from 'fs';
import { getAuthConfig } from './config';
import { LDAPResponse, LDAPUser, AuthUser } from './types';

// LDAP 클라이언트 생성
function createLDAPClient() {
  const config = getAuthConfig().ldap;
  
  const clientOptions: any = {
    url: `${config.host}:${config.port}`,
    timeout: 10000,
    connectTimeout: 10000,
  };

  // LDAPS 인증서 설정
  if (config.certPath) {
    try {
      const cert = readFileSync(config.certPath, 'utf8');
      clientOptions.tlsOptions = {
        ca: cert,
        rejectUnauthorized: false, // 개발환경에서는 false, 운영에서는 true로 설정
      };
    } catch (error) {
      console.warn('LDAP certificate file not found, using default TLS options');
      clientOptions.tlsOptions = {
        rejectUnauthorized: false,
      };
    }
  } else {
    // 인증서 경로가 없으면 기본 TLS 옵션 사용
    clientOptions.tlsOptions = {
      rejectUnauthorized: false,
    };
  }

  return new Client(clientOptions);
}

// LDAP 사용자 인증
export async function authenticateLDAP(username: string, password: string): Promise<LDAPResponse> {
  const config = getAuthConfig().ldap;
  
  if (!config.enabled) {
    return { success: false, error: 'LDAP authentication is disabled' };
  }

  let client: Client | null = null;

  try {
    client = createLDAPClient();
    
    // 서비스 계정으로 먼저 바인드
    await client.bind(config.user, config.password);
    
    // 사용자 검색
    const searchResult = await client.search(config.userSearchBase, {
      scope: 'sub',
      filter: `(|(sAMAccountName=${username})(mail=${username}))`,
      attributes: ['cn', 'mail', 'sAMAccountName', 'department', 'memberOf', 'dn'],
    });

    const users = searchResult.searchEntries;
    
    if (users.length === 0) {
      return { success: false, error: 'User not found' };
    }

    const ldapUser = users[0] as unknown as LDAPUser;
    
    // 찾은 사용자로 인증 시도
    try {
      await client.bind(ldapUser.dn, password);
      
      // 인증 성공 시 사용자 정보 변환
      const authUser: AuthUser = {
        id: ldapUser.sAMAccountName || ldapUser.cn,
        email: ldapUser.mail,
        name: ldapUser.cn,
        authMethod: 'ldap',
        employeeId: ldapUser.sAMAccountName,
        department: ldapUser.department,
        groups: Array.isArray(ldapUser.memberOf) ? ldapUser.memberOf : ldapUser.memberOf ? [ldapUser.memberOf] : [],
      };

      return { success: true, user: authUser };
      
    } catch (authError) {
      return { success: false, error: 'Invalid password' };
    }

  } catch (error) {
    console.error('LDAP authentication error:', error);
    return { success: false, error: 'LDAP connection failed' };
  } finally {
    if (client) {
      try {
        await client.unbind();
      } catch (unbindError) {
        console.warn('Failed to unbind LDAP client:', unbindError);
      }
    }
  }
}

// LDAP 사용자 정보 조회
export async function getLDAPUser(username: string): Promise<LDAPUser | null> {
  const config = getAuthConfig().ldap;
  
  if (!config.enabled) {
    return null;
  }

  let client: Client | null = null;

  try {
    client = createLDAPClient();
    await client.bind(config.user, config.password);
    
    const searchResult = await client.search(config.userSearchBase, {
      scope: 'sub',
      filter: `(|(sAMAccountName=${username})(mail=${username}))`,
      attributes: ['cn', 'mail', 'sAMAccountName', 'department', 'memberOf', 'dn'],
    });

    const users = searchResult.searchEntries;
    return users.length > 0 ? (users[0] as unknown as LDAPUser) : null;

  } catch (error) {
    console.error('LDAP user lookup error:', error);
    return null;
  } finally {
    if (client) {
      try {
        await client.unbind();
      } catch (unbindError) {
        console.warn('Failed to unbind LDAP client:', unbindError);
      }
    }
  }
}

// LDAP 연결 테스트
export async function testLDAPConnection(): Promise<boolean> {
  const config = getAuthConfig().ldap;
  
  if (!config.enabled) {
    return false;
  }

  let client: Client | null = null;

  try {
    client = createLDAPClient();
    await client.bind(config.user, config.password);
    return true;
  } catch (error) {
    console.error('LDAP connection test failed:', error);
    return false;
  } finally {
    if (client) {
      try {
        await client.unbind();
      } catch (unbindError) {
        console.warn('Failed to unbind LDAP client:', unbindError);
      }
    }
  }
}
// 통합 인증 관리 (클라이언트/서버 공통)
export * from './types';
export * from './config';
import { AuthUser } from './types';

// NOTE: 서버 전용 함수들은 직접 import하지 말고 dynamic import 사용
// 클라이언트에서 번들링 시 server 코드가 포함되는 것을 방지

// 인증 방식 우선순위에 따른 사용자 검증
export async function authenticateUser(
  method: 'sso' | 'ldap' | 'supabase',
  credentials: any
): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  
  switch (method) {
    case 'sso':
      const { verifySSOCookie } = await import('./sso');
      return await verifySSOCookie(credentials.cookieValue);
      
    case 'ldap':
      const { authenticateLDAP } = await import('./ldap');
      return await authenticateLDAP(credentials.username, credentials.password);
      
    case 'supabase':
      // 기존 Supabase 인증은 그대로 유지
      return { success: true, user: credentials.user };
      
    default:
      return { success: false, error: 'Unknown authentication method' };
  }
}
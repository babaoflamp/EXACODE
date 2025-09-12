import { NextResponse } from 'next/server';

// 클라이언트에 노출해도 안전한 인증 설정 정보 반환
export async function GET() {
  console.log('Auth config API called');
  
  // 환경변수에서 직접 읽어오기
  const safeConfig = {
    sso: {
      enabled: process.env.SSO_ENABLED === 'true',
      url: process.env.SSO_URL ? process.env.SSO_URL.replace(/\/[^\/]*$/, '/***') : 'Not configured',
      status: process.env.SSO_ENABLED === 'true' && process.env.SSO_URL ? 'Configured' : 'Not configured'
    },
    ldap: {
      enabled: true, // LDAP는 항상 활성화
      host: process.env.LDAP_HOST || 'Not configured',
      port: parseInt(process.env.LDAP_PORT || '636'),
      userSearchBase: process.env.LDAP_USER_SEARCH_BASE || 'Not configured',
      status: process.env.LDAP_HOST ? 'Configured' : 'Not configured'
    }
  };
  
  console.log('Returning config:', safeConfig);
  return NextResponse.json(safeConfig);
}
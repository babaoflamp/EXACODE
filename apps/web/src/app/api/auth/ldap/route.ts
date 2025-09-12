import { NextRequest, NextResponse } from 'next/server';
import { authenticateLDAP } from '@/lib/auth/ldap';
import { createAuthToken } from '@/lib/auth/server-only';

// LDAP 인증 처리
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    // LDAP 인증
    const ldapResult = await authenticateLDAP(username, password);
    
    if (!ldapResult.success || !ldapResult.user) {
      return NextResponse.json(
        { error: ldapResult.error || 'LDAP authentication failed' },
        { status: 401 }
      );
    }
    
    console.log('LDAP authentication successful:', { 
      email: ldapResult.user.email, 
      name: ldapResult.user.name,
      employeeId: ldapResult.user.employeeId 
    });
    
    // JWT 토큰 생성
    const authToken = createAuthToken(ldapResult.user);
    
    const response = NextResponse.json({
      success: true,
      user: ldapResult.user,
      token: authToken,
    });
    
    // 인증 쿠키 설정
    response.cookies.set('auth-token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24시간
      path: '/',
    });
    
    return response;
    
  } catch (error) {
    console.error('LDAP authentication error:', error);
    return NextResponse.json(
      { error: 'LDAP authentication processing failed' },
      { status: 500 }
    );
  }
}

// LDAP 연결 테스트
export async function GET() {
  try {
    const { testLDAPConnection } = await import('@/lib/auth/ldap');
    const isConnected = await testLDAPConnection();
    
    return NextResponse.json({
      connected: isConnected,
      message: isConnected ? 'LDAP connection successful' : 'LDAP connection failed'
    });
    
  } catch (error) {
    console.error('LDAP connection test error:', error);
    return NextResponse.json(
      { connected: false, error: 'LDAP connection test failed' },
      { status: 500 }
    );
  }
}
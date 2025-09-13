import { NextRequest, NextResponse } from 'next/server';
import { getSSOLoginUrl, verifySSOCookie } from '@/lib/auth/sso';
import { createAuthToken } from '@/lib/auth/server-only';

// SSO 로그인 시작
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const returnUrl = searchParams.get('returnUrl') || '/';
    
    // SSO 리다이렉트 URL 생성
    const ssoUrl = getSSOLoginUrl(returnUrl);
    
    return NextResponse.redirect(ssoUrl);
    
  } catch (error) {
    console.error('SSO login initiation error:', error);
    return NextResponse.json(
      { error: 'SSO login failed to start' },
      { status: 500 }
    );
  }
}

// SSO 콜백 처리 및 쿠키 검증
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cookieValue, returnUrl } = body;
    
    console.log('SSO API 호출됨 - 쿠키 값:', cookieValue);
    
    if (!cookieValue) {
      console.error('SSO 쿠키 값 없음');
      return NextResponse.json(
        { error: 'SSO cookie is required' },
        { status: 400 }
      );
    }
    
    // SSO 쿠키 검증
    console.log('SSO 쿠키 검증 시작:', cookieValue);
    const ssoResult = await verifySSOCookie(cookieValue);
    
    if (!ssoResult.success || !ssoResult.user) {
      console.error('SSO verification failed:', ssoResult.error);
      return NextResponse.json(
        { error: ssoResult.error || 'SSO authentication failed' },
        { status: 401 }
      );
    }
    
    console.log('SSO verification successful:', { 
      email: ssoResult.user.email, 
      name: ssoResult.user.name,
      employeeId: ssoResult.user.employeeId 
    });
    
    // JWT 토큰 생성 (Supabase 동기화 없이 바로 진행)
    const authToken = createAuthToken(ssoResult.user);
    
    const response = NextResponse.json({
      success: true,
      user: ssoResult.user,
      token: authToken,
      redirectUrl: returnUrl || '/',
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
    console.error('SSO callback processing error:', error);
    return NextResponse.json(
      { error: 'SSO authentication processing failed' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  console.log('Cookie login API GET called');
  return NextResponse.json({
    success: true,
    message: 'Cookie login API is working',
    timestamp: new Date().toISOString()
  });
}

export async function POST(_request: NextRequest) {
  console.log('Cookie login API called');
  
  try {
    const supabase = createClient();
    
    // 테스트용 사용자 정보
    const testUserData = {
      email: 'exacode@lge.com',
      password: 'test123456'
    };

    console.log('Attempting to sign up/login user:', testUserData.email);

    // 먼저 회원가입 시도
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testUserData.email,
      password: testUserData.password,
      options: {
        data: {
          name: 'exacode',
          department: '인공지능 알고리즘TP',
          employeeId: 'exacode'
        }
      }
    });

    console.log('Signup result:', { signUpData, signUpError });

    // 사용자가 이미 존재하는 경우 또는 회원가입 성공한 경우 로그인 시도
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: testUserData.email,
      password: testUserData.password,
    });

    console.log('Login result:', { loginData, loginError });

    // 로그인 성공 시
    if (loginData?.session && loginData?.user) {
      console.log('Login successful with session');
      
      // 성공 응답과 함께 쿠키 설정
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          id: loginData.user.id,
          email: loginData.user.email,
          name: loginData.user.user_metadata?.name || 'exacode',
          department: loginData.user.user_metadata?.department || '인공지능 알고리즘TP',
          employeeId: loginData.user.user_metadata?.employeeId || 'exacode'
        }
      });

      return response;
    }
    
    // 로그인 실패했지만 사용자 정보는 있는 경우 (이메일 미확인 등)
    if (signUpData?.user) {
      console.log('User created but session not active, creating manual session');
      
      const response = NextResponse.json({
        success: true,
        message: 'Manual login successful',
        user: {
          email: testUserData.email,
          name: 'exacode',
          department: '인공지능 알고리즘TP',
          employeeId: 'exacode'
        }
      });

      // 임시 세션 쿠키 설정
      response.cookies.set('exacode_session', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 86400, // 24시간
        path: '/'
      });

      response.cookies.set('exacode_user', JSON.stringify({
        email: testUserData.email,
        name: 'exacode',
        department: '인공지능 알고리즘TP',
        employeeId: 'exacode'
      }), {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 86400,
        path: '/'
      });

      return response;
    }

    // 모든 시도 실패
    return NextResponse.json({
      success: false,
      error: `Login failed: ${loginError?.message || 'Unknown error'}`,
      debug: {
        signUpError: signUpError?.message,
        loginError: loginError?.message
      }
    }, { status: 400 });

  } catch (error) {
    console.error('Cookie login API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}
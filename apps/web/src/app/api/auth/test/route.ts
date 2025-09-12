import { NextResponse } from 'next/server';

export async function GET() {
  console.log('Test auth API GET called');
  return NextResponse.json({
    success: true,
    message: 'Test API is working',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  console.log('Test auth API POST called');
  
  try {
    const body = await request.json();
    console.log('Received body:', JSON.stringify(body, null, 2));
    
    const { authType, userInfo } = body;
    
    if (!authType || !userInfo) {
      return NextResponse.json({
        success: false,
        error: 'Missing authType or userInfo'
      }, { status: 400 });
    }

    // 테스트용 사용자 정보로 Supabase 세션 생성 (사용하지 않음)
    // const supabase = createSupabaseClient();
    
    // 테스트용 토큰 생성 (실제 환경에서는 보안상 권장하지 않음)
    const testToken = `test_token_${Date.now()}_${userInfo.email}`;
    
    // 응답에 사용자 정보 포함
    const responseData = {
      success: true,
      message: 'Test login successful',
      user: {
        email: userInfo.email,
        name: userInfo.name,
        department: userInfo.department || '',
        employeeId: userInfo.employeeId,
        authType: authType,
        ssoId: userInfo.ssoId || null
      },
      token: testToken
    };
    
    console.log('Sending response:', JSON.stringify(responseData, null, 2));
    const response = NextResponse.json(responseData);

    // 실제 로그인을 위한 Supabase 인증 시도
    try {
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = createClient();
      
      // 테스트 사용자로 로그인 시도
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: userInfo.email,
        password: 'test123456' // 고정 테스트 패스워드
      });

      if (loginError) {
        // 로그인 실패 시 회원가입 시도
        const { error: signUpError } = await supabase.auth.signUp({
          email: userInfo.email,
          password: 'test123456',
          options: {
            data: {
              name: userInfo.name,
              department: userInfo.department,
              employeeId: userInfo.employeeId
            }
          }
        });

        if (signUpError && !signUpError.message.includes('already registered')) {
          console.error('Signup failed:', signUpError);
        }
      }

      console.log('Supabase auth attempted for:', userInfo.email);
    } catch (authError) {
      console.error('Auth error, falling back to session cookies:', authError);
    }

    // 테스트용 세션 쿠키 설정
    response.cookies.set('test_session', testToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400 // 24시간
    });

    // 사용자 정보 쿠키 설정 (클라이언트에서 읽을 수 있도록)
    response.cookies.set('exacode_user', JSON.stringify({
      email: userInfo.email,
      name: userInfo.name,
      department: userInfo.department,
      employeeId: userInfo.employeeId
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400,
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Test auth API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function DELETE() {
  console.log('Test auth API DELETE called');
  
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Test cookies cleared'
    });

    // 테스트 쿠키들 삭제 (더 명시적인 방법)
    response.cookies.set('test_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      expires: new Date(0)
    });
    
    response.cookies.set('ssoId', '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      expires: new Date(0)
    });
    
    console.log('DELETE response created successfully');
    return response;
  } catch (error) {
    console.error('DELETE API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to clear cookies'
    }, { status: 500 });
  }
}
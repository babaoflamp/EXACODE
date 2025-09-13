import { Session, User } from "@supabase/supabase-js";
import { createClient } from "./server";
import { headers, cookies } from "next/headers";

export async function verifyUserAuthenticated(): Promise<
  { user: User; session: Session } | undefined
> {
  console.log('verifyUserAuthenticated 시작');
  
  // 0. 먼저 쿠키에서 직접 테스트 모드 확인
  const cookieStore = cookies();
  const testSession = cookieStore.get('test_session');
  const exacodeUser = cookieStore.get('exacode_user');
  const ssoId = cookieStore.get('ssoId');
  
  // 테스트 모드 감지
  const isTestMode = testSession?.value || (ssoId?.value === 'exacode@lge.com');
  
  console.log('쿠키 확인:', { 
    hasTestSession: !!testSession?.value,
    hasSsoId: !!ssoId?.value,
    ssoIdValue: ssoId?.value,
    isTestMode: isTestMode
  });
  
  if (isTestMode) {
    console.log('서버 직접 테스트 모드 감지');
    
    let testUser;
    if (exacodeUser?.value) {
      try {
        // URL 디코딩 후 JSON 파싱
        const decodedUser = decodeURIComponent(exacodeUser.value);
        const userData = JSON.parse(decodedUser);
        testUser = {
          id: userData.employeeId || 'exacode',
          email: userData.email,
          name: userData.name,
          employeeId: userData.employeeId,
          department: userData.department,
          authMethod: 'sso'
        };
        console.log('서버: exacode_user 쿠키에서 사용자 정보 파싱 완료:', testUser.email);
      } catch (error) {
        console.warn('서버: 테스트 사용자 파싱 실패:', error);
        // 파싱 실패 시 기본값 사용
        testUser = {
          id: 'exacode',
          email: 'exacode@lge.com',
          name: 'exacode',
          employeeId: 'exacode',
          department: '인공지능 알고리즘TP',
          authMethod: 'sso'
        };
      }
    } else {
      // 기본 테스트 사용자
      testUser = {
        id: 'exacode',
        email: 'exacode@lge.com',
        name: 'exacode',
        employeeId: 'exacode',
        department: '인공지능 알고리즘TP',
        authMethod: 'sso'
      };
      console.log('서버: 기본 테스트 사용자 생성');
    }
    
    // 테스트 사용자를 Supabase 형식으로 변환
    const mockUser: User = {
      id: testUser.id,
      email: testUser.email,
      app_metadata: {},
      user_metadata: {
        name: testUser.name,
        employeeId: testUser.employeeId,
        department: testUser.department,
        authMethod: testUser.authMethod
      },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // 테스트 세션 생성
    const mockSession: Session = {
      access_token: `test_${testUser.id}_${Date.now()}`,
      refresh_token: 'test_refresh',
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: 'bearer',
      user: mockUser
    };
    
    console.log('서버: 테스트 사용자 검증 완료:', mockUser.email);
    return { user: mockUser, session: mockSession };
  }
  
  // 1. 미들웨어 헤더 확인 (외부 인증)
  const headersList = headers();
  const authMethod = headersList.get('x-auth-method');
  const authUserHeader = headersList.get('x-auth-user');
  
  console.log('인증 헤더 확인:', { 
    hasAuthMethod: !!authMethod, 
    hasAuthUser: !!authUserHeader,
    authMethod: authMethod 
  });
  
  if (authMethod && authUserHeader) {
    try {
      // Base64 디코딩하여 사용자 정보 복원
      const userInfo = JSON.parse(Buffer.from(authUserHeader, 'base64').toString('utf-8'));
      console.log('외부 인증 사용자 발견:', { method: authMethod, user: userInfo });
      
      // 외부 인증 사용자를 Supabase 형식으로 변환
      const mockUser: User = {
        id: userInfo.id || userInfo.employeeId,
        email: userInfo.email,
        app_metadata: {},
        user_metadata: {
          name: userInfo.name,
          employeeId: userInfo.employeeId,
          department: userInfo.department,
          authMethod: userInfo.authMethod
        },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // 외부 인증용 모의 세션 생성
      const mockSession: Session = {
        access_token: `external_${userInfo.id}_${Date.now()}`,
        refresh_token: 'external_refresh',
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        token_type: 'bearer',
        user: mockUser
      };
      
      console.log('외부 인증 사용자 검증 완료:', mockUser.email);
      return { user: mockUser, session: mockSession };
    } catch (error) {
      console.error('외부 인증 헤더 파싱 실패:', error);
    }
  }
  
  // 2. 외부 인증이 없으면 기존 Supabase 인증 확인
  const supabase = createClient();
  
  // Use getUser() which authenticates against the Supabase Auth server
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  
  if (userError || !user) {
    console.log('Supabase 인증 실패 또는 사용자 없음');
    return undefined;
  }

  // Only get session after confirming user is authenticated
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  
  if (sessionError || !session) {
    console.log('Supabase 세션 없음');
    return undefined;
  }
  
  console.log('Supabase 인증 사용자 검증 완료:', user.email);
  return { user, session };
}

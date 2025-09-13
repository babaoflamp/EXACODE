import { createSupabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { AuthUser } from "@/lib/auth/types";
import { AUTH_CONSTANTS } from "@/lib/auth/constants";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type UserContentType = {
  getUser: () => Promise<User | undefined>;
  getAuthUser: () => Promise<AuthUser | undefined>;
  user: User | undefined;
  authUser: AuthUser | undefined;
  authMethod: 'supabase' | 'sso' | 'ldap' | undefined;
  loading: boolean;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContentType | undefined>(undefined);

// 쿠키 헬퍼 함수
function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();
  const [authUser, setAuthUser] = useState<AuthUser>();
  const [authMethod, setAuthMethod] = useState<'supabase' | 'sso' | 'ldap'>();
  const [loading, setLoading] = useState(true);
  
  // React Strict Mode 이중 실행 방지를 위한 ref
  const hasInitialized = useRef(false);

  // 테스트 모드 감지 (현재 미사용)
  // const isTestMode = typeof window !== 'undefined' && getCookie('test_session');

  useEffect(() => {
    // React Strict Mode cleanup 대응을 위한 취소 플래그
    let isCancelled = false;
    
    // 이중 실행 방지 - hasInitialized가 이미 true면 중단
    if (hasInitialized.current) {
      console.log('useEffect 중복 실행 감지 - 차단됨');
      return;
    }
    
    // 서버 사이드인 경우 스킵
    if (typeof window === "undefined") return;
    
    // 초기화 플래그 설정
    hasInitialized.current = true;
    console.log('useEffect 첫 실행 - 초기화 시작');

    // 테스트 세션 직접 확인 (test_session 또는 ssoId가 테스트 값인 경우)
    const testSession = getCookie('test_session');
    const exacodeUser = getCookie('exacode_user');
    const ssoId = getCookie('ssoId');
    
    // 테스트 모드 감지: test_session 쿠키가 있거나 ssoId가 테스트 계정인 경우
    const isTestModeDetected = testSession || (ssoId === AUTH_CONSTANTS.TEST_USER_EMAIL);
    
    if (isTestModeDetected) {
      // 테스트 모드: 직접 사용자 정보 설정, API 호출 절대 없음
      console.log('테스트 모드 감지: API 호출 없이 직접 처리');
      
      if (!isCancelled) {
        let testAuthUser: AuthUser;
        
        if (exacodeUser) {
          // exacode_user 쿠키에서 사용자 정보 파싱 (URL 디코딩 필요)
          try {
            // URL 디코딩 후 JSON 파싱
            const decodedUser = decodeURIComponent(exacodeUser);
            console.log('디코딩된 사용자 데이터:', decodedUser);
            const userData = JSON.parse(decodedUser);
            testAuthUser = {
              id: userData.employeeId || AUTH_CONSTANTS.TEST_USER_ID,
              email: userData.email,
              name: userData.name,
              authMethod: AUTH_CONSTANTS.AUTH_METHODS.SSO,
              employeeId: userData.employeeId,
              department: userData.department
            };
            console.log('exacode_user 쿠키에서 테스트 사용자 설정:', testAuthUser);
          } catch (parseError) {
            console.error('테스트 사용자 파싱 실패:', parseError);
            console.log('원본 쿠키 값:', exacodeUser);
            // 파싱 실패 시 기본값 사용
            testAuthUser = {
              id: AUTH_CONSTANTS.TEST_USER_ID,
              email: AUTH_CONSTANTS.TEST_USER_EMAIL,
              name: AUTH_CONSTANTS.TEST_USER_NAME,
              authMethod: AUTH_CONSTANTS.AUTH_METHODS.SSO,
              employeeId: AUTH_CONSTANTS.TEST_USER_ID,
              department: AUTH_CONSTANTS.TEST_USER_DEPARTMENT
            };
          }
        } else {
          // exacode_user 쿠키가 없으면 기본 테스트 사용자 생성
          testAuthUser = {
            id: AUTH_CONSTANTS.TEST_USER_ID,
            email: AUTH_CONSTANTS.TEST_USER_EMAIL,
            name: AUTH_CONSTANTS.TEST_USER_NAME,
            authMethod: AUTH_CONSTANTS.AUTH_METHODS.SSO,
            employeeId: AUTH_CONSTANTS.TEST_USER_ID,
            department: AUTH_CONSTANTS.TEST_USER_DEPARTMENT
          };
          console.log('기본 테스트 사용자 설정:', testAuthUser);
        }
        
        setAuthUser(testAuthUser);
        setAuthMethod('sso');
        
        // 테스트 모드에서는 user도 설정 (다른 컴포넌트들이 user를 기대함)
        const mockSupabaseUser: User = {
          id: testAuthUser.id,
          email: testAuthUser.email,
          app_metadata: {},
          user_metadata: {
            name: testAuthUser.name,
            employeeId: testAuthUser.employeeId,
            department: testAuthUser.department,
            authMethod: testAuthUser.authMethod
          },
          aud: 'authenticated',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        setUser(mockSupabaseUser);
      }
      
      if (!isCancelled) {
        setLoading(false);
        console.log('테스트 모드: 모든 API 호출 완전 차단 완료');
      }
      
      return () => {
        isCancelled = true;
        console.log('테스트 모드 cleanup 실행');
      };
    }

    // 일반 모드에서만 API 호출 (테스트 세션이 없을 때만)
    console.log('일반 모드: 인증 API 호출 시작');
    if (!isCancelled) {
      Promise.all([getUser(), getAuthUser()]).finally(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });
    }
    
    // cleanup 함수
    return () => {
      isCancelled = true;
      console.log('일반 모드 cleanup 실행');
    };
  }, []);

  const getUser = useCallback(async () => {
    // 테스트 모드에서는 절대 실행하지 않음 (최우선 차단)
    const testSession = getCookie('test_session');
    const ssoId = getCookie('ssoId');
    const isTestMode = testSession || (ssoId === 'exacode@lge.com');
    
    if (isTestMode) {
      console.log('getUser: 테스트 모드 감지 - Supabase API 차단');
      return undefined;
    }

    if (user) {
      return user;
    }

    const supabase = createSupabaseClient();

    try {
      // Use getUser() which authenticates against the Supabase Auth server
      const {
        data: { user: supabaseUser },
        error,
      } = await supabase.auth.getUser();
      
      if (error) {
        // 테스트 세션이 있으면 에러 로그 출력하지 않음
        if (typeof window !== 'undefined') {
          const testSession = getCookie('test_session');
          if (!testSession) {
            console.error("Auth error:", error);
          }
        } else {
          console.error("Auth error:", error);
        }
        setUser(undefined);
        return undefined;
      }
      
      setUser(supabaseUser || undefined);
      if (supabaseUser) {
        setAuthMethod('supabase');
      }
      return supabaseUser || undefined;
    } catch (error) {
      // 테스트 세션이 있으면 에러 로그 출력하지 않음
      if (typeof window !== 'undefined') {
        const testSession = getCookie('test_session');
        if (!testSession) {
          console.error("Failed to get user:", error);
        }
      } else {
        console.error("Failed to get user:", error);
      }
      setUser(undefined);
      return undefined;
    }
  }, []);

  // 외부 인증 사용자 정보 가져오기
  const getAuthUser = useCallback(async (): Promise<AuthUser | undefined> => {
    // 테스트 모드에서는 절대 실행하지 않음 (최우선 차단)
    const testSession = getCookie('test_session');
    const ssoId = getCookie('ssoId');
    const isTestMode = testSession || (ssoId === 'exacode@lge.com');
    
    if (isTestMode) {
      console.log('getAuthUser: 테스트 모드 감지 - SSO API 차단');
      return undefined;
    }

    if (authUser) {
      return authUser;
    }

    try {
      // SSO 쿠키 확인 (ssoId 쿠키 사용)
      const ssoCookie = getCookie('ssoId');
      if (ssoCookie) {
        console.log('SSO 쿠키 발견:', ssoCookie);
        try {
          const ssoResponse = await fetch('/api/auth/sso', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cookieValue: ssoCookie }),
          });
          
          if (ssoResponse.ok) {
            const ssoData = await ssoResponse.json();
            if (ssoData.success && ssoData.user) {
              setAuthUser(ssoData.user);
              setAuthMethod('sso');
              return ssoData.user;
            }
          } else {
            console.error('SSO API 응답 에러:', ssoResponse.status, ssoResponse.statusText);
          }
        } catch (ssoError) {
          console.error('SSO API 호출 실패:', ssoError);
        }
      }

      // 커스텀 JWT 토큰 확인
      const authToken = getCookie('auth-token');
      if (authToken) {
        try {
          // 클라이언트에서는 API를 통해 토큰 검증
          const tokenResponse = await fetch('/api/auth/verify-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: authToken }),
          });
          
          if (tokenResponse.ok) {
            const tokenData = await tokenResponse.json();
            if (tokenData.success && tokenData.user) {
              setAuthUser(tokenData.user);
              setAuthMethod(tokenData.user.authMethod);
              return tokenData.user;
            }
          }
        } catch (tokenError) {
          console.warn('Token verification failed:', tokenError);
        }
      }

      setAuthUser(undefined);
      return undefined;
    } catch (error) {
      console.error("Failed to get auth user:", error);
      setAuthUser(undefined);
      return undefined;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      // 1. 서버에서 httpOnly 쿠키들 삭제 (test_session 포함)
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('서버에서 쿠키 삭제 요청 완료');
      } catch (fetchError) {
        console.warn('서버 쿠키 삭제 실패:', fetchError);
      }

      // 2. Supabase 로그아웃
      if (user) {
        const supabase = createSupabaseClient();
        await supabase.auth.signOut();
      }

      // 3. 클라이언트에서 접근 가능한 쿠키들 삭제
      const cookiesToDelete = Object.values(AUTH_CONSTANTS.COOKIE_NAMES);

      // 더 확실한 쿠키 삭제를 위한 다양한 방법 시도
      cookiesToDelete.forEach(cookieName => {
        // 기본 삭제
        document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        document.cookie = `${cookieName}=; path=/; max-age=0`;

        // 도메인별 삭제
        document.cookie = `${cookieName}=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        document.cookie = `${cookieName}=; path=/; domain=.${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      });

      // 4. 로컬 스토리지 및 세션 스토리지 정리
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {
        console.warn('스토리지 정리 중 오류:', e);
      }

      // 5. 상태 초기화
      setUser(undefined);
      setAuthUser(undefined);
      setAuthMethod(undefined);

      console.log('로그아웃 완료');

      // 6. 페이지 완전 새로고침으로 초기화 보장
      setTimeout(() => {
        window.location.replace('/auth/login');
      }, 200);
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
      // 오류가 발생해도 로그인 페이지로 이동
      window.location.replace('/auth/login');
    }
  }, [user]);

  const contextValue: UserContentType = useMemo(() => ({
    getUser,
    getAuthUser,
    user,
    authUser,
    authMethod,
    loading,
    logout,
  }), [getUser, getAuthUser, user, authUser, authMethod, loading, logout]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}

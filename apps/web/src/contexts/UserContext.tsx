import { createSupabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { AuthUser } from "@/lib/auth/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContentType = {
  getUser: () => Promise<User | undefined>;
  getAuthUser: () => Promise<AuthUser | undefined>;
  user: User | undefined;
  authUser: AuthUser | undefined;
  authMethod: 'supabase' | 'sso' | 'ldap' | undefined;
  loading: boolean;
};

const UserContext = createContext<UserContentType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();
  const [authUser, setAuthUser] = useState<AuthUser>();
  const [authMethod, setAuthMethod] = useState<'supabase' | 'sso' | 'ldap'>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ((user || authUser) || typeof window === "undefined") return;

    // 두 가지 인증 방식 모두 확인
    Promise.all([getUser(), getAuthUser()]).finally(() => {
      setLoading(false);
    });
  }, [user, authUser]);

  const getUser = useCallback(async () => {
    if (user) {
      setLoading(false);
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
        console.error("Auth error:", error);
        setUser(undefined);
        return undefined;
      }
      
      setUser(supabaseUser || undefined);
      if (supabaseUser) {
        setAuthMethod('supabase');
      }
      return supabaseUser || undefined;
    } catch (error) {
      console.error("Failed to get user:", error);
      setUser(undefined);
      return undefined;
    }
  }, [user]);

  // 외부 인증 사용자 정보 가져오기
  const getAuthUser = useCallback(async (): Promise<AuthUser | undefined> => {
    if (authUser) {
      return authUser;
    }

    try {
      // SSO 쿠키 확인
      const ssoCookie = getCookie(process.env.NEXT_PUBLIC_SSO_COOKIE_NAME || 'ssoId');
      if (ssoCookie) {
        const ssoResponse = await fetch('/api/auth/sso/verify', {
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
  }, [authUser]);

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

  const contextValue: UserContentType = {
    getUser,
    getAuthUser,
    user,
    authUser,
    authMethod,
    loading,
  };

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

import { getAuthConfig } from './config';
import { SSOResponse, AuthUser } from './types';

// SSO 리다이렉트 URL 생성
export function getSSOLoginUrl(returnUrl?: string): string {
  const config = getAuthConfig().sso;
  
  if (!config.enabled) {
    throw new Error('SSO authentication is disabled');
  }

  const ssoUrl = new URL(config.url);
  
  // 리턴 URL이 있으면 파라미터로 추가
  if (returnUrl) {
    ssoUrl.searchParams.set('returnUrl', returnUrl);
  }
  
  return ssoUrl.toString();
}

// SSO 쿠키 검증
export async function verifySSOCookie(cookieValue: string): Promise<SSOResponse> {
  const config = getAuthConfig().sso;
  
  if (!config.enabled) {
    return { success: false, error: 'SSO authentication is disabled' };
  }

  if (!cookieValue) {
    return { success: false, error: 'SSO cookie not found' };
  }

  // 개발/테스트 환경에서는 단순 검증
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    // exacode@lge.com 테스트 계정 처리
    if (cookieValue === 'exacode@lge.com') {
      const authUser: AuthUser = {
        id: 'exacode',
        email: 'exacode@lge.com',
        name: 'exacode',
        authMethod: 'sso',
        employeeId: 'exacode',
        department: '인공지능 알고리즘TP',
      };

      return { success: true, user: authUser };
    }
  }

  try {
    // LG전자 SSO 시스템에 쿠키 검증 요청
    // 실제 구현에서는 SSO 서버의 검증 API를 호출해야 함
    const verificationUrl = config.url.replace('.jsp', '_verify.jsp');
    
    const response = await fetch(verificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': `${config.cookieName}=${cookieValue}`,
      },
      body: `ssoId=${encodeURIComponent(cookieValue)}`,
    });

    if (!response.ok) {
      return { success: false, error: 'SSO verification failed' };
    }

    const result = await response.text();
    
    // SSO 응답 파싱 (실제 LG전자 SSO 응답 형식에 따라 조정 필요)
    if (result.includes('success') || result.includes('valid')) {
      // SSO 응답에서 사용자 정보 추출
      const userInfo = parseSSOResponse(result);
      
      if (userInfo) {
        const authUser: AuthUser = {
          id: userInfo.employeeId || userInfo.userId,
          email: userInfo.email,
          name: userInfo.name,
          authMethod: 'sso',
          employeeId: userInfo.employeeId,
          department: userInfo.department,
        };

        return { success: true, user: authUser };
      }
    }

    return { success: false, error: 'Invalid SSO response' };

  } catch (error) {
    console.error('SSO verification error:', error);
    return { success: false, error: 'SSO verification request failed' };
  }
}

// SSO 응답 파싱 (LG전자 SSO 응답 형식에 따라 구현)
function parseSSOResponse(response: string): any {
  try {
    // XML 또는 JSON 형태의 응답을 파싱
    // 실제 LG전자 SSO 응답 형식에 맞게 구현 필요
    
    // 예시: XML 형태 응답 파싱
    if (response.includes('<')) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(response, 'text/xml');
      
      return {
        userId: doc.querySelector('userId')?.textContent || '',
        employeeId: doc.querySelector('empId')?.textContent || '',
        name: doc.querySelector('name')?.textContent || '',
        email: doc.querySelector('email')?.textContent || '',
        department: doc.querySelector('dept')?.textContent || '',
      };
    }
    
    // 예시: JSON 형태 응답 파싱
    if (response.startsWith('{')) {
      const data = JSON.parse(response);
      return data;
    }
    
    // 예시: 단순 텍스트 응답 파싱
    const lines = response.split('\\n');
    const userInfo: any = {};
    
    lines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        userInfo[key.trim()] = value.trim();
      }
    });
    
    return userInfo;
    
  } catch (error) {
    console.error('SSO response parsing error:', error);
    return null;
  }
}

// SSO 로그아웃
export async function performSSOLogout(cookieValue?: string): Promise<boolean> {
  const config = getAuthConfig().sso;
  
  if (!config.enabled) {
    return false;
  }

  try {
    // SSO 로그아웃 URL 생성
    const logoutUrl = config.url.replace('.jsp', '_logout.jsp');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    
    if (cookieValue) {
      headers['Cookie'] = `${config.cookieName}=${cookieValue}`;
    }
    
    const response = await fetch(logoutUrl, {
      method: 'POST',
      headers,
    });

    return response.ok;
    
  } catch (error) {
    console.error('SSO logout error:', error);
    return false;
  }
}

// 클라이언트에서 SSO 쿠키 가져오기
export function getSSOCookieFromBrowser(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const config = getAuthConfig().sso;
  const cookies = document.cookie.split(';');
  
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === config.cookieName) {
      return decodeURIComponent(value);
    }
  }
  
  return null;
}

// SSO 연결 테스트
export async function testSSOConnection(): Promise<boolean> {
  const config = getAuthConfig().sso;
  
  if (!config.enabled) {
    return false;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(config.url, {
      method: 'HEAD',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    return response.ok || response.status === 302; // 302는 리다이렉트로 정상
    
  } catch (error) {
    console.error('SSO connection test failed:', error);
    return false;
  }
}
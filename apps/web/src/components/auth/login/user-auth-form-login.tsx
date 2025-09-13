"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Icons } from "../../ui/icons";
import { Label } from "../../ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { LoginWithEmailInput } from "./Login";
import { useState } from "react";
import { PasswordInput } from "../../ui/password-input";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onLoginWithEmail: (input: LoginWithEmailInput) => Promise<void>;
  onLoginWithOauth: (provider: "google" | "github") => Promise<void>;
}

export function UserAuthForm({
  className,
  onLoginWithEmail,
  onLoginWithOauth: _onLoginWithOauth,
  ...props
}: UserAuthFormProps) {
  const [isEmailPasswordLoading, setEmailPasswordIsLoading] = useState(false);
  const [isGoogleLoading, _setGoogleIsLoading] = useState(false);
  const [isGithubLoading, _setGithubIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [isCreatingCookie, setIsCreatingCookie] = useState(false);
  const [isTestLogin, setIsTestLogin] = useState(false);
  const [isSsoChecking, setIsSsoChecking] = useState(false);
  const [isLdapChecking, setIsLdapChecking] = useState(false);
  const _router = useRouter();

  const isLoading =
    isEmailPasswordLoading || isGoogleLoading || isGithubLoading;


  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setEmailPasswordIsLoading(true);

    await onLoginWithEmail({ email, password });
    setEmailPasswordIsLoading(false);
  }

  // 테스트 쿠키 클리어 핸들러
  const handleClearTestCookies = async () => {
    setIsClearing(true);
    try {
      // 클라이언트 측 쿠키 삭제
      document.cookie = 'ssoId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'test_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      // 서버 측 쿠키 삭제 요청
      const response = await fetch('/api/auth/test', {
        method: 'DELETE',
      });

      if (response.ok) {
        try {
          const responseText = await response.text();
          console.log('DELETE 응답 텍스트:', responseText);
          
          let result;
          try {
            result = JSON.parse(responseText);
            console.log('테스트 쿠키 삭제 성공:', result.message);
          } catch (parseError) {
            console.warn('JSON 파싱 실패, 하지만 응답은 성공:', responseText);
            // JSON 파싱 실패해도 HTTP 상태가 성공이면 쿠키 삭제는 성공으로 간주
            result = { success: true, message: '쿠키 삭제 완료' };
          }
          
          // 쿠키가 실제로 삭제되었는지 확인
          const remainingSsoId = document.cookie
            .split('; ')
            .find(row => row.startsWith('ssoId='))
            ?.split('=')[1];
            
          if (!remainingSsoId) {
            alert('테스트 쿠키가 삭제되었습니다.');
          } else {
            console.warn('ssoId 쿠키가 여전히 존재합니다:', remainingSsoId);
            alert('쿠키 삭제가 완료되었지만, 일부 쿠키가 남아있을 수 있습니다.');
          }
        } catch (textError) {
          console.error('응답 텍스트 읽기 실패:', textError);
          // 응답 읽기 실패해도 클라이언트 쿠키는 삭제되었으므로 성공으로 처리
          alert('테스트 쿠키가 삭제되었습니다.');
        }
      } else {
        const errorText = await response.text();
        console.error('DELETE 요청 실패:', errorText);
        throw new Error(`테스트 쿠키 삭제 요청 실패 (${response.status})`);
      }
    } catch (error) {
      console.error('테스트 쿠키 삭제 실패:', error);
      alert(error instanceof Error ? error.message : '테스트 쿠키 삭제에 실패했습니다.');
    }
    setIsClearing(false);
  };

  // 테스트 쿠키 생성 핸들러
  const handleCreateTestCookie = async () => {
    setIsCreatingCookie(true);
    try {
      // ssoId 테스트 쿠키 생성 - exacode@lge.com으로 설정
      const testSsoId = 'exacode@lge.com';
      document.cookie = `ssoId=${testSsoId}; path=/; max-age=86400`; // 24시간
      
      console.log('테스트 ssoId 쿠키 생성:', testSsoId);
      alert(`테스트 ssoId 쿠키가 생성되었습니다: ${testSsoId}`);
    } catch (error) {
      console.error('테스트 쿠키 생성 실패:', error);
      alert(error instanceof Error ? error.message : '테스트 쿠키 생성에 실패했습니다.');
    }
    setIsCreatingCookie(false);
  };

  // 테스트 쿠키로 로그인 핸들러
  const handleTestCookieLogin = async () => {
    setIsTestLogin(true);
    try {
      // 테스트 계정 정보
      const testSsoId = 'exacode@lge.com';
      
      // 먼저 테스트 쿠키를 자동으로 생성
      document.cookie = `ssoId=${testSsoId}; path=/; max-age=86400`; // 24시간
      
      console.log('테스트 쿠키로 로그인 시도:', testSsoId);

      // 기존 테스트 API 사용 (더 안정적)
      const response = await fetch('/api/auth/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authType: 'cookie',
          userInfo: {
            email: 'exacode@lge.com',
            name: 'exacode',
            department: '인공지능 알고리즘TP',
            employeeId: 'exacode',
            ssoId: testSsoId
          }
        }),
      });

      if (response.ok) {
        const responseText = await response.text();
        console.log('서버 응답:', responseText);
        
        try {
          const result = JSON.parse(responseText);
          console.log('파싱된 결과:', result);
          
          if (result.success) {
            console.log('테스트 로그인 성공:', result.user.email);
            
            // 메인 페이지로 리다이렉트 (팝업 없이 바로 이동)
            window.location.href = '/';
          } else {
            throw new Error(result.error || '쿠키 로그인 실패');
          }
        } catch (parseError) {
          console.error('JSON 파싱 오류:', parseError);
          console.error('응답 내용:', responseText.substring(0, 500));
          throw new Error('서버 응답 형식 오류 (HTML 페이지가 반환됨)');
        }
      } else {
        const errorText = await response.text();
        console.error('HTTP 오류:', response.status, errorText);
        throw new Error(`로그인 요청 실패 (${response.status})`);
      }
      
    } catch (error) {
      console.error('테스트 쿠키 로그인 실패:', error);
      alert(error instanceof Error ? error.message : '테스트 쿠키 로그인에 실패했습니다.');
    }
    setIsTestLogin(false);
  };

  // SSO 연동 확인 핸들러
  const handleSsoCheck = async () => {
    setIsSsoChecking(true);
    try {
      console.log('SSO 연동 상태 확인 중...');
      
      // SSO 연동 확인 API 호출 (예시)
      const response = await fetch('/api/auth/sso/check', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('SSO 연동 확인 결과:', result);
        alert(`SSO 연동 상태: ${result.success ? '정상' : '오류'}\n${result.message || ''}`);
      } else {
        // API가 없는 경우 기본 확인 로직
        console.log('SSO API 없음 - 기본 확인 로직 실행');
        
        // SSO 쿠키 확인
        const ssoCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('ssoId='));
        
        if (ssoCookie) {
          alert('SSO 연동 상태: 정상\nSSO 쿠키가 존재합니다.');
        } else {
          alert('SSO 연동 상태: 오류\nSSO 쿠키가 없습니다.');
        }
      }
    } catch (error) {
      console.error('SSO 연동 확인 실패:', error);
      alert('SSO 연동 확인 중 오류가 발생했습니다.');
    }
    setIsSsoChecking(false);
  };

  // LDAP 연동 확인 핸들러
  const handleLdapCheck = async () => {
    setIsLdapChecking(true);
    try {
      console.log('LDAP 연동 상태 확인 중...');
      
      // LDAP 연동 확인 API 호출 (예시)
      const response = await fetch('/api/auth/ldap/check', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('LDAP 연동 확인 결과:', result);
        alert(`LDAP 연동 상태: ${result.success ? '정상' : '오류'}\n${result.message || ''}`);
      } else {
        // API가 없는 경우 기본 확인 로직
        console.log('LDAP API 없음 - 기본 확인 로직 실행');
        
        // LDAP 관련 환경변수나 설정 확인 (예시)
        alert('LDAP 연동 상태: 미구현\nLDAP 연동 확인 로직이 필요합니다.');
      }
    } catch (error) {
      console.error('LDAP 연동 확인 실패:', error);
      alert('LDAP 연동 확인 중 오류가 발생했습니다.');
    }
    setIsLdapChecking(false);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>

      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <div className="pt-1 pb-[2px] px-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (!showPasswordField) {
                    setShowPasswordField(true);
                  }
                }}
              />
            </div>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out pt-[2px] pb-1 px-1",
                showPasswordField ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <PasswordInput
                id="password"
                autoComplete="new-password"
                autoCorrect="off"
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      {/* 테스트용 버튼들 (개발용) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-3 space-y-2">
          <div className="text-xs text-gray-500 text-center font-medium">개발자 테스트 도구</div>
          <div className="flex gap-2">
            <Button
              onClick={handleCreateTestCookie}
              variant="outline"
              size="sm"
              type="button"
              disabled={isCreatingCookie}
              className="flex-1"
            >
              {isCreatingCookie ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              쿠키 생성
            </Button>
            <Button
              onClick={handleTestCookieLogin}
              variant="default"
              size="sm"
              type="button"
              disabled={isTestLogin}
              className="flex-1"
            >
              {isTestLogin ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              쿠키로 로그인
            </Button>
            <Button
              onClick={handleClearTestCookies}
              variant="destructive"
              size="sm"
              type="button"
              disabled={isClearing}
              className="flex-1"
            >
              {isClearing ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              쿠키 삭제
            </Button>
          </div>
          
          {/* SSO/LDAP 연동 확인 버튼들 */}
          <div className="border-t pt-3 mt-3">
            <div className="text-xs text-gray-500 text-center font-medium mb-2">연동 상태 확인</div>
            <TooltipProvider>
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleSsoCheck}
                      variant="outline"
                      size="sm"
                      type="button"
                      disabled={isSsoChecking}
                      className="flex-1"
                    >
                      {isSsoChecking ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      SSO 연동 확인
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    <div className="text-left space-y-1">
                      <div className="font-medium">SSO 연동 정보</div>
                      <div className="text-xs space-y-0.5">
                        <div><span className="font-medium">서버:</span> sso.lge.com</div>
                        <div><span className="font-medium">경로:</span> /agentless/seoul/exacodeAngeless.jsp</div>
                        <div><span className="font-medium">쿠키:</span> ssoId</div>
                        <div><span className="font-medium">상태:</span> 활성화</div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleLdapCheck}
                      variant="outline"
                      size="sm"
                      type="button"
                      disabled={isLdapChecking}
                      className="flex-1"
                    >
                      {isLdapChecking ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      LDAP 연동 확인
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    <div className="text-left space-y-1">
                      <div className="font-medium">LDAP 연동 정보</div>
                      <div className="text-xs space-y-0.5">
                        <div><span className="font-medium">서버:</span> lgesaads01.lge.net</div>
                        <div><span className="font-medium">포트:</span> 636 (LDAPS)</div>
                        <div><span className="font-medium">계정:</span> exacode@lge.com</div>
                        <div><span className="font-medium">기준DN:</span> OU=LGE Users,dc=LGE,dc=NET</div>
                        <div><span className="font-medium">상태:</span> 활성화</div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </div>
      )}
    </div>
  );
}

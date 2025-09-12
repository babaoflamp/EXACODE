import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

// 확장된 인증 검증을 위한 import
async function verifyExternalAuth(request: NextRequest) {
  try {
    // SSO 쿠키 확인
    const ssoCookie = request.cookies.get(process.env.SSO_COOKIE_NAME || 'ssoId');
    if (ssoCookie?.value) {
      const { verifySSOCookie } = await import('../auth/sso');
      const ssoResult = await verifySSOCookie(ssoCookie.value);
      if (ssoResult.success && ssoResult.user) {
        return { method: 'sso', user: ssoResult.user };
      }
    }

    // 커스텀 JWT 토큰 확인
    const authToken = request.cookies.get('auth-token');
    if (authToken?.value) {
      const { verifyAuthToken } = await import('../auth/server-only');
      const user = verifyAuthToken(authToken.value);
      if (user) {
        return { method: user.authMethod, user };
      }
    }

    return null;
  } catch (error) {
    console.warn('External auth verification failed:', error);
    return null;
  }
}

export async function updateSession(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined");
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined");
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // Supabase 사용자 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 외부 인증 시스템 확인 (SSO/LDAP)
  const externalAuth = await verifyExternalAuth(request);

  // 인증된 사용자가 있는지 확인 (Supabase 또는 외부 인증)
  const isAuthenticated = user || externalAuth;

  if (!isAuthenticated && !request.nextUrl.pathname.startsWith("/auth")) {
    // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // 인증된 사용자가 auth 페이지에 접근하려 할 때 홈으로 리다이렉트
  if (isAuthenticated) {
    if (
      request.nextUrl.pathname.startsWith("/auth") &&
      !request.nextUrl.pathname.startsWith("/auth/signout")
    ) {
      // 인증된 사용자는 홈 페이지로 리다이렉트
      const url = new URL("/", request.url);
      return NextResponse.redirect(url);
    }
  }

  // 외부 인증 사용자 정보를 요청 헤더에 추가 (선택사항)
  if (externalAuth && !user) {
    supabaseResponse.headers.set('x-auth-method', externalAuth.method);
    supabaseResponse.headers.set('x-auth-user', JSON.stringify(externalAuth.user));
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}

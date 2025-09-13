import { NextRequest, NextResponse } from "next/server";
import { AUTH_CONSTANTS } from "@/lib/auth/constants";
import { COOKIE_DELETE_CONFIG, HTTPONLY_COOKIE_DELETE_CONFIG } from "@/lib/auth/cookie-config";
import { createModuleLogger } from "@/lib/utils/logger";

const logger = createModuleLogger('AUTH_LOGOUT');

export async function POST(_request: NextRequest) {
  try {
    logger.info('로그아웃 API 호출됨');

    const response = NextResponse.json({
      success: true,
      message: '로그아웃 완료'
    });

    // 모든 인증 관련 쿠키들을 서버에서 삭제
    const cookiesToDelete = Object.values(AUTH_CONSTANTS.COOKIE_NAMES);

    cookiesToDelete.forEach(cookieName => {
      // JavaScript 접근 가능한 쿠키 삭제
      response.cookies.set(cookieName, '', COOKIE_DELETE_CONFIG);

      // httpOnly 쿠키 삭제
      response.cookies.set(cookieName, '', HTTPONLY_COOKIE_DELETE_CONFIG);

      // 다양한 SameSite 설정으로 삭제
      response.cookies.set(cookieName, '', {
        ...HTTPONLY_COOKIE_DELETE_CONFIG,
        sameSite: 'strict'
      });
    });

    logger.info('서버에서 쿠키 삭제 완료');
    return response;

  } catch (error) {
    logger.error('로그아웃 API 오류:', error);

    const errorResponse = NextResponse.json({
      success: false,
      error: '로그아웃 처리 중 오류가 발생했습니다.'
    }, { status: 500 });

    return errorResponse;
  }
}
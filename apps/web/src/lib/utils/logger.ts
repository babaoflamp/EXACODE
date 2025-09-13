/**
 * 환경별 로깅 유틸리티
 * 프로덕션 환경에서는 디버그 로그를 제거하고 필요한 로그만 출력
 */

interface Logger {
  debug: (message: string, ...args: any[]) => void;
  info: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
}

const isDevelopment = process.env.NODE_ENV === 'development';
// const isProduction = process.env.NODE_ENV === 'production'; // 현재 사용되지 않음

/**
 * 개발 환경용 로거 - 모든 로그 출력
 */
const developmentLogger: Logger = {
  debug: (message: string, ...args: any[]) => console.log(`[DEBUG] ${message}`, ...args),
  info: (message: string, ...args: any[]) => console.log(`[INFO] ${message}`, ...args),
  warn: (message: string, ...args: any[]) => console.warn(`[WARN] ${message}`, ...args),
  error: (message: string, ...args: any[]) => console.error(`[ERROR] ${message}`, ...args),
};

/**
 * 프로덕션 환경용 로거 - 에러와 경고만 출력
 */
const productionLogger: Logger = {
  debug: () => {}, // 프로덕션에서는 디버그 로그 제거
  info: () => {},  // 프로덕션에서는 정보 로그 제거
  warn: (message: string, ...args: any[]) => console.warn(`[WARN] ${message}`, ...args),
  error: (message: string, ...args: any[]) => console.error(`[ERROR] ${message}`, ...args),
};

/**
 * 환경에 따른 로거 선택
 */
export const logger: Logger = isDevelopment ? developmentLogger : productionLogger;

/**
 * 특정 모듈용 로거 생성
 */
export const createModuleLogger = (moduleName: string): Logger => ({
  debug: (message: string, ...args: any[]) => logger.debug(`[${moduleName}] ${message}`, ...args),
  info: (message: string, ...args: any[]) => logger.info(`[${moduleName}] ${message}`, ...args),
  warn: (message: string, ...args: any[]) => logger.warn(`[${moduleName}] ${message}`, ...args),
  error: (message: string, ...args: any[]) => logger.error(`[${moduleName}] ${message}`, ...args),
});

/**
 * 사용자 정보 로깅용 (민감한 정보 제거)
 */
export const logUserAction = (action: string, userId?: string, additionalInfo?: Record<string, any>) => {
  const sanitizedInfo = additionalInfo ?
    Object.keys(additionalInfo).reduce((acc, key) => {
      // 민감한 정보는 마스킹
      const sensitiveKeys = ['password', 'token', 'secret', 'key'];
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        acc[key] = '[REDACTED]';
      } else {
        acc[key] = additionalInfo[key];
      }
      return acc;
    }, {} as Record<string, any>) : {};

  logger.info(`User Action: ${action}`, {
    userId: userId || 'anonymous',
    timestamp: new Date().toISOString(),
    ...sanitizedInfo
  });
};
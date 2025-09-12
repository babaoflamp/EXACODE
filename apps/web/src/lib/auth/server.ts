// 서버 전용 인증 코드
import jwt from 'jsonwebtoken';
import { createClient } from '../supabase/server';
import { AuthUser } from './types';
import { JWT_SECRET } from './config';

// Supabase와 외부 인증 시스템 연동 (서버 전용)
export async function syncUserWithSupabase(authUser: AuthUser): Promise<string | null> {
  try {
    const supabase = createClient();
    
    // 기존 사용자 확인
    const { data: existingUsers, error: searchError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', authUser.email)
      .limit(1);

    if (searchError) {
      console.error('Error searching for existing user:', searchError);
      return null;
    }

    // 기존 사용자가 있으면 업데이트
    if (existingUsers && existingUsers.length > 0) {
      const { error: updateError } = await supabase
        .from('users')
        .update({
          name: authUser.name,
          auth_method: authUser.authMethod,
          employee_id: authUser.employeeId,
          department: authUser.department,
          groups: authUser.groups,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingUsers[0].id);

      if (updateError) {
        console.error('Error updating existing user:', updateError);
        return null;
      }

      return existingUsers[0].id;
    } else {
      // 새 사용자 생성
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          id: authUser.id,
          email: authUser.email,
          name: authUser.name,
          auth_method: authUser.authMethod,
          employee_id: authUser.employeeId,
          department: authUser.department,
          groups: authUser.groups,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select('id')
        .single();

      if (insertError) {
        console.error('Error creating new user:', insertError);
        return null;
      }

      return newUser?.id || null;
    }
  } catch (error) {
    console.error('Error syncing user with Supabase:', error);
    return null;
  }
}

// JWT 토큰 생성 (서버 전용)
export function createAuthToken(authUser: AuthUser): string {
  
  const payload = {
    sub: authUser.id,
    email: authUser.email,
    name: authUser.name,
    authMethod: authUser.authMethod,
    employeeId: authUser.employeeId,
    department: authUser.department,
    groups: authUser.groups,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24시간
  };

  return jwt.sign(payload, JWT_SECRET);
}

// JWT 토큰 검증 (서버 전용)
export function verifyAuthToken(token: string): AuthUser | null {
  try {
    
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & {
      sub: string;
      email: string;
      name: string;
      authMethod: 'supabase' | 'sso' | 'ldap';
      employeeId?: string;
      department?: string;
      groups?: string[];
    };
    
    return {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      authMethod: decoded.authMethod,
      employeeId: decoded.employeeId,
      department: decoded.department,
      groups: decoded.groups,
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}
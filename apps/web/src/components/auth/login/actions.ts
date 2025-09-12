"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { LoginWithEmailInput } from "./Login";

export async function login(input: LoginWithEmailInput) {
  const supabase = createClient();

  const data = {
    email: input.email,
    password: input.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    redirect("/auth/login?error=true");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function loginWithCookie() {
  // 테스트용 사용자 정보로 일반 로그인 시도
  const testUserData = {
    email: 'exacode@lge.com',
    password: 'test123456' // 테스트용 고정 패스워드
  };

  try {
    const supabase = createClient();
    
    // 먼저 이 이메일로 로그인 시도
    const { data, error } = await supabase.auth.signInWithPassword({
      email: testUserData.email,
      password: testUserData.password,
    });

    if (error) {
      // 로그인 실패 시 (사용자가 없거나 패스워드 틀림), 회원가입 시도
      console.log('Login failed, trying to sign up:', error.message);
      
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: testUserData.email,
        password: testUserData.password,
        options: {
          data: {
            name: 'exacode',
            department: '인공지능 알고리즘TP',
            employeeId: 'exacode'
          },
          emailRedirectTo: undefined // 이메일 확인 건너뛰기
        }
      });

      if (signUpError) {
        console.error('Signup error:', signUpError);
        throw new Error('사용자 생성 중 오류가 발생했습니다: ' + signUpError.message);
      }

      // 회원가입 후 자동 로그인되므로 성공
      console.log('User created and logged in:', signUpData);
    } else {
      console.log('Login successful:', data);
    }

    revalidatePath("/", "layout");
    redirect("/");

  } catch (error) {
    console.error('Cookie login error:', error);
    redirect("/auth/login?error=true");
  }
}

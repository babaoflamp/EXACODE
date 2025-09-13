"use client";

import { useUserContext } from "@/contexts/UserContext";
import { Button } from "./button";
import { LogOut, User } from "lucide-react";
import Image from "next/image";

export function AppHeader() {
  const { user, authUser, logout } = useUserContext();

  // 로그인되지 않은 경우 헤더 숨김
  if (!user && !authUser) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
  };

  // authUser (SSO/LDAP) 정보 우선 사용, 없으면 Supabase user 정보 사용
  const displayName = authUser?.name || user?.user_metadata?.full_name || user?.email || '사용자';
  const department = authUser?.department || '부서 정보 없음';

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-14 px-4">
        {/* 왼쪽: 로고/제목 */}
        <div className="flex items-center gap-3">
          <Image
            src="/EXACODE_Canvas.png"
            alt="EXACODE Canvas Logo"
            width={32}
            height={32}
            className="rounded"
          />
          <h1 className="text-lg font-semibold text-gray-900">EXACODE Canvas</h1>
        </div>

        {/* 오른쪽: 사용자 정보 및 로그아웃 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <User className="w-4 h-4" />
            <div className="flex flex-col items-end">
              <div className="font-medium">{displayName}</div>
              <div className="text-xs text-gray-500">{department}</div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </Button>
        </div>
      </div>
    </header>
  );
}
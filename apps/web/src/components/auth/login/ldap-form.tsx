"use client";

import * as React from "react";
import { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Icons } from "../../ui/icons";
import { Label } from "../../ui/label";
import { PasswordInput } from "../../ui/password-input";

interface LDAPFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
}

export function LDAPForm({ onSubmit, isLoading }: LDAPFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      await onSubmit(username, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="ldap-username" className="text-sm font-medium">
          사용자 ID
        </Label>
        <Input
          id="ldap-username"
          placeholder="사용자 ID 또는 이메일"
          type="text"
          autoCapitalize="none"
          autoComplete="username"
          autoCorrect="off"
          disabled={isLoading}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="ldap-password" className="text-sm font-medium">
          비밀번호
        </Label>
        <PasswordInput
          id="ldap-password"
          autoComplete="current-password"
          disabled={isLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button 
        type="submit" 
        disabled={isLoading || !username || !password}
        className="w-full"
      >
        {isLoading && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        LDAP 로그인
      </Button>
    </form>
  );
}
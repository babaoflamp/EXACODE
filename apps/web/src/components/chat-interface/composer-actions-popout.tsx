"use client";

import { ComposerAddAttachment } from "../assistant-ui/attachment";

interface ComposerActionsPopOutProps {
  userId: string | undefined;
  chatStarted: boolean;
}

export function ComposerActionsPopOut(_props: ComposerActionsPopOutProps) {
  return (
    <div className="flex items-center justify-center">
      <ComposerAddAttachment />
    </div>
  );
}

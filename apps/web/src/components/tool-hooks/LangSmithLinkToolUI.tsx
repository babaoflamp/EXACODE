import { useAssistantToolUI } from "@assistant-ui/react";
import { useCallback } from "react";

export const useLangSmithLinkToolUI = () =>
  useAssistantToolUI({
    toolName: "langsmith_tool_ui",
    render: useCallback((_input) => {
      return null;
    }, []),
  });

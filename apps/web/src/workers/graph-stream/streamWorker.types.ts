import { ALL_MODEL_NAMES } from "@opencanvas/shared/models";
import { CustomModelConfig, GraphInput } from "@opencanvas/shared/types";

// Web Worker를 사용하지 않으므로 더 이상 필요하지 않음
// export interface StreamWorkerMessage {
//   type: "chunk" | "done" | "error";
//   data?: string;
//   error?: string;
// }

export interface StreamConfig {
  threadId: string;
  assistantId: string;
  input: GraphInput;
  modelName: ALL_MODEL_NAMES;
  modelConfigs: Record<string, CustomModelConfig>;
}

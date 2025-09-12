import { StreamConfig } from "./streamWorker.types";
import { createClient } from "@/hooks/utils";

export class StreamWorkerService {
  constructor() {
    // Web Worker 없이 직접 스트리밍 처리
  }

  async *streamData(config: StreamConfig): AsyncGenerator<any, void, unknown> {
    try {
      const { threadId, assistantId, input, modelName, modelConfigs } = config;

      console.log('Starting stream with config:', {
        threadId,
        assistantId,
        modelName,
        inputType: typeof input
      });

      const client = createClient();

      const stream = client.runs.stream(threadId, assistantId, {
        input: input as Record<string, unknown>,
        streamMode: "events",
        config: {
          configurable: {
            customModelName: modelName,
            modelConfig: modelConfigs[modelName as keyof typeof modelConfigs],
          },
        },
      });

      for await (const chunk of stream) {
        yield chunk;
      }
    } catch (error: any) {
      console.error('Stream error:', error);
      throw new Error(`Streaming failed: ${error.message}`);
    }
  }

  terminate() {
    // Web Worker 없으므로 아무것도 하지 않음
  }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_MODEL_CONFIG = exports.DEFAULT_MODEL_NAME = exports.ALL_MODELS = exports.THINKING_MODELS = exports.NON_STREAMING_TEXT_MODELS = exports.NON_STREAMING_TOOL_CALLING_MODELS = exports.TEMPERATURE_EXCLUDED_MODELS = exports.LANGCHAIN_USER_ONLY_MODELS = void 0;
const AZURE_MODELS = [
    {
        name: "azure/gpt-4.1-nano",
        label: "Azure OpenAI",
        isNew: false,
        config: {
            provider: "azure_openai",
            temperatureRange: {
                min: 0,
                max: 1,
                default: 0.5,
                current: 0.5,
            },
            maxTokens: {
                min: 1,
                max: 4_096,
                default: 4_096,
                current: 4_096,
            },
        },
    },
];
const EXACODE_MODELS = [
    {
        name: "exacode/chat-exacode-think",
        label: "Chat-EXACODE-Think",
        isNew: false,
        config: {
            provider: "openai",
            temperatureRange: {
                min: 0,
                max: 1,
                default: 0.5,
                current: 0.5,
            },
            maxTokens: {
                min: 1,
                max: 8_192,
                default: 4_096,
                current: 4_096,
            },
        },
    },
    {
        name: "exacode/chat-exacode-a",
        label: "Chat-EXACODE-A",
        isNew: false,
        config: {
            provider: "openai",
            temperatureRange: {
                min: 0,
                max: 1,
                default: 0.5,
                current: 0.5,
            },
            maxTokens: {
                min: 1,
                max: 8_192,
                default: 4_096,
                current: 4_096,
            },
        },
    },
    {
        name: "exacode/chat-exacode-b",
        label: "Chat-EXACODE-B",
        isNew: false,
        config: {
            provider: "openai",
            temperatureRange: {
                min: 0,
                max: 1,
                default: 0.5,
                current: 0.5,
            },
            maxTokens: {
                min: 1,
                max: 8_192,
                default: 4_096,
                current: 4_096,
            },
        },
    },
];
// Commented out unused models to avoid TypeScript errors
/*
const OPENAI_MODELS: ModelConfigurationParams[] = [
  {
    name: "gpt-4.1",
    label: "GPT 4.1",
    config: {
      provider: "openai",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 32_768,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: true,
  },
  {
    name: "gpt-4.1-mini",
    label: "GPT 4.1 mini",
    config: {
      provider: "openai",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 32_768,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: true,
  },
  {
    name: "o4-mini",
    label: "o4 mini",
    config: {
      provider: "openai",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 100_000,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: true,
  },
  {
    name: "gpt-4o",
    label: "GPT 4o",
    config: {
      provider: "openai",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 16_384,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
  {
    name: "gpt-4o-mini",
    label: "GPT 4o mini",
    config: {
      provider: "openai",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 16_384,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
  {
    name: "gpt-4.5-preview",
    label: "GPT 4.5",
    config: {
      provider: "openai",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 16_384,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
  {
    name: "o3-mini",
    label: "o3 mini",
    config: {
      provider: "openai",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 100_000,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
  {
    name: "o1-mini",
    label: "o1 mini",
    config: {
      provider: "openai",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 65_536,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
  {
    name: "o1",
    label: "o1",
    config: {
      provider: "openai",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 100_000,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
];
*/
/**
 * Ollama model names _MUST_ be prefixed with `"ollama-"`
 */
/*
const OLLAMA_MODELS = [
  {
    name: "ollama-llama3.3",
    label: "Llama 3.3 70B (local)",
    config: {
      provider: "ollama",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 2_048,
        default: 2_048,
        current: 2_048,
      },
    },
    isNew: false,
  },
];
*/
/*
const ANTHROPIC_MODELS = [
  {
    name: "claude-sonnet-4-0",
    label: "Claude Sonnet 4",
    config: {
      provider: "anthropic",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 64_000,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: true,
  },
  {
    name: "claude-opus-4-0",
    label: "Claude Opus 4",
    config: {
      provider: "anthropic",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 32_000,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: true,
  },
  {
    name: "claude-3-7-sonnet-latest",
    label: "Claude 3.7 Sonnet",
    config: {
      provider: "anthropic",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 8_192,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
  {
    name: "claude-3-5-sonnet-latest",
    label: "Claude 3.5 Sonnet",
    config: {
      provider: "anthropic",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 8_192,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
  {
    name: "claude-3-5-haiku-20241022",
    label: "Claude 3.5 Haiku",
    config: {
      provider: "anthropic",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 8_192,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
  {
    name: "claude-3-haiku-20240307",
    label: "Claude 3 Haiku (old)",
    config: {
      provider: "anthropic",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 4_096,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
];
*/
/*
const FIREWORKS_MODELS: ModelConfigurationParams[] = [
  {
    name: "accounts/fireworks/models/llama-v3p3-70b-instruct",
    label: "Llama 3.3 70B",
    config: {
      provider: "fireworks",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 16_384,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
  {
    name: "accounts/fireworks/models/llama-v3p1-70b-instruct",
    label: "Llama 70B (old)",
    config: {
      provider: "fireworks",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 16_384,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
  {
    name: "accounts/fireworks/models/deepseek-v3",
    label: "DeepSeek V3",
    config: {
      provider: "fireworks",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 8_000,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
  {
    name: "accounts/fireworks/models/deepseek-r1",
    label: "DeepSeek R1",
    config: {
      provider: "fireworks",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 8_000,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
];
*/
/*
const GROQ_MODELS: ModelConfigurationParams[] = [
  {
    name: "groq/deepseek-r1-distill-llama-70b",
    label: "DeepSeek R1 Llama 70b Distill",
    config: {
      provider: "groq",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 8_000,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
];
*/
/*
const GEMINI_MODELS: ModelConfigurationParams[] = [
  {
    name: "gemini-2.5-flash-preview-05-20",
    label: "Gemini 2.5 Flash (Preview)",
    config: {
      provider: "google-genai",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 100_000,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: true,
  },
  {
    name: "gemini-2.5-pro-preview-05-06",
    label: "Gemini 2.5 Pro (Preview)",
    config: {
      provider: "google-genai",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 100_000,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: true,
  },
  {
    name: "gemini-1.5-flash",
    label: "Gemini 1.5 Flash",
    config: {
      provider: "google-genai",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 8_192,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
  {
    name: "gemini-2.0-flash",
    label: "Gemini 2.0 Flash",
    config: {
      provider: "google-genai",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 1_048_576,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
  {
    name: "gemini-2.0-flash-thinking-exp-01-21",
    label: "Gemini 2.0 Flash Thinking",
    config: {
      provider: "google-genai",
      temperatureRange: {
        min: 0,
        max: 1,
        default: 0.5,
        current: 0.5,
      },
      maxTokens: {
        min: 1,
        max: 1_048_576,
        default: 4_096,
        current: 4_096,
      },
    },
    isNew: false,
  },
];
*/
exports.LANGCHAIN_USER_ONLY_MODELS = [
    "o1",
    "gpt-4o",
    "gpt-4.5-preview",
    "claude-3-5-sonnet-latest",
    "claude-3-7-sonnet-latest",
    "gemini-2.0-flash-thinking-exp-01-21",
    "gemini-2.5-pro-preview-05-06",
    "claude-sonnet-4-0",
    "claude-opus-4-0",
    "gpt-4.1",
];
// Models which do NOT support the temperature parameter.
exports.TEMPERATURE_EXCLUDED_MODELS = [
    "o1-mini",
    "o3-mini",
    "o1",
    "o4-mini",
];
// Models which do NOT stream back tool calls.
exports.NON_STREAMING_TOOL_CALLING_MODELS = [
    "gemini-2.0-flash-exp",
    "gemini-1.5-flash",
    "gemini-2.5-pro-preview-05-06",
    "gemini-2.5-flash-preview-05-20",
];
// Models which do NOT stream back text.
exports.NON_STREAMING_TEXT_MODELS = [
    "o1",
    "gemini-2.0-flash-thinking-exp-01-21",
];
// Models which preform CoT before generating a final response.
exports.THINKING_MODELS = [
    "accounts/fireworks/models/deepseek-r1",
    "groq/deepseek-r1-distill-llama-70b",
];
// Add back Fireworks models for Llama access
const FIREWORKS_MODELS_LLAMA = [
    {
        name: "accounts/fireworks/models/llama-v3p3-70b-instruct",
        label: "Llama 3.3 70B (Free)",
        config: {
            provider: "fireworks",
            temperatureRange: {
                min: 0,
                max: 1,
                default: 0.5,
                current: 0.5,
            },
            maxTokens: {
                min: 1,
                max: 16_384,
                default: 4_096,
                current: 4_096,
            },
        },
        isNew: false,
    },
];
exports.ALL_MODELS = [
    ...AZURE_MODELS,
    ...EXACODE_MODELS,
    ...FIREWORKS_MODELS_LLAMA,
    // Commented out other models
    // ...OPENAI_MODELS,
    // ...ANTHROPIC_MODELS,
    // ...GEMINI_MODELS,
    // ...OLLAMA_MODELS,
    // ...GROQ_MODELS,
];
// Use EXACODE model as default due to Azure OpenAI configuration issues
exports.DEFAULT_MODEL_NAME = EXACODE_MODELS[0].name; // exacode/chat-exacode-think
exports.DEFAULT_MODEL_CONFIG = {
    ...EXACODE_MODELS[0].config,
    temperatureRange: { ...EXACODE_MODELS[0].config.temperatureRange },
    maxTokens: { ...EXACODE_MODELS[0].config.maxTokens },
};

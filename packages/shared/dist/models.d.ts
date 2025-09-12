import { CustomModelConfig, ModelConfigurationParams } from "./types.js";
declare const AZURE_MODELS: ModelConfigurationParams[];
declare const EXACODE_MODELS: ModelConfigurationParams[];
/**
 * Ollama model names _MUST_ be prefixed with `"ollama-"`
 */
export declare const LANGCHAIN_USER_ONLY_MODELS: string[];
export declare const TEMPERATURE_EXCLUDED_MODELS: string[];
export declare const NON_STREAMING_TOOL_CALLING_MODELS: string[];
export declare const NON_STREAMING_TEXT_MODELS: string[];
export declare const THINKING_MODELS: string[];
declare const FIREWORKS_MODELS_LLAMA: ModelConfigurationParams[];
export declare const ALL_MODELS: ModelConfigurationParams[];
type AZURE_MODEL_NAMES = (typeof AZURE_MODELS)[number]["name"];
type EXACODE_MODEL_NAMES = (typeof EXACODE_MODELS)[number]["name"];
type FIREWORKS_LLAMA_MODEL_NAMES = (typeof FIREWORKS_MODELS_LLAMA)[number]["name"];
export type ALL_MODEL_NAMES = AZURE_MODEL_NAMES | EXACODE_MODEL_NAMES | FIREWORKS_LLAMA_MODEL_NAMES;
export declare const DEFAULT_MODEL_NAME: ALL_MODEL_NAMES;
export declare const DEFAULT_MODEL_CONFIG: CustomModelConfig;
export {};

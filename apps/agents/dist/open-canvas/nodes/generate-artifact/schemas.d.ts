import { z } from "zod";
export declare const ARTIFACT_TOOL_SCHEMA: z.ZodObject<{
    type: z.ZodEnum<["code", "text"]>;
    language: z.ZodOptional<z.ZodNullable<z.ZodEnum<[string, ...string[]]>>>;
    isValidReact: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    artifact: z.ZodString;
    title: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "code" | "text";
    artifact: string;
    title: string;
    language?: string | null | undefined;
    isValidReact?: boolean | null | undefined;
}, {
    type: "code" | "text";
    artifact: string;
    title: string;
    language?: string | null | undefined;
    isValidReact?: boolean | null | undefined;
}>;

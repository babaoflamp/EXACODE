import { z } from "zod";
export declare const OPTIONALLY_UPDATE_ARTIFACT_META_SCHEMA: z.ZodObject<{
    type: z.ZodEnum<["text", "code"]>;
    title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    language: z.ZodEnum<[string, ...string[]]>;
}, "strip", z.ZodTypeAny, {
    type: "code" | "text";
    language: string;
    title?: string | null | undefined;
}, {
    type: "code" | "text";
    language: string;
    title?: string | null | undefined;
}>;

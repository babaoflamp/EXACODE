"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ls = __importStar(require("langsmith/vitest"));
const zod_1 = require("zod");
const openai_1 = require("@langchain/openai");
const index_1 = require("@opencanvas/agents/dist/open-canvas/index");
const query_routing_js_1 = require("./data/query_routing.js");
const codegen_js_1 = require("./data/codegen.js");
ls.describe("query routing", () => {
    ls.test("routes followups with questions to update artifact", {
        inputs: query_routing_js_1.QUERY_ROUTING_DATA.inputs,
        referenceOutputs: query_routing_js_1.QUERY_ROUTING_DATA.referenceOutputs,
    }, async ({ inputs, referenceOutputs }) => {
        const generatePathNode = index_1.graph.nodes.generatePath;
        const res = await generatePathNode.invoke(inputs, {
            configurable: {
                customModelName: "gpt-4o-mini",
            },
        });
        ls.logOutputs(res);
        (0, vitest_1.expect)(res).toEqual(referenceOutputs);
    });
});
const qualityEvaluator = async (params) => {
    const judge = new openai_1.ChatOpenAI({ model: "gpt-4o" }).withStructuredOutput(zod_1.z.object({
        justification: zod_1.z
            .string()
            .describe("reasoning for why you are assigning a given quality score"),
        quality_score: zod_1.z
            .number()
            .describe("quality score for how well the generated code answers the query."),
    }), {
        name: "judge",
    });
    const EVAL_PROMPT = [
        `Given the following user query and generated code, judge whether the`,
        `code satisfies the user's query. Return a quality score between 1 and 10,`,
        `where a 1 would be completely irrelevant to the user's input, and 10 would be a perfectly accurate code sample.`,
        `A 5 would be a code sample that is partially on target, but is missing some aspect of a user's request.`,
        `Justify your answer.\n`,
        `<query>\n${params.inputs}\n</query>\n`,
        `<generated_code>\n${params.outputs}\n</generated_code>`,
    ].join(" ");
    const res = await judge.invoke(EVAL_PROMPT);
    return {
        key: "quality",
        score: res.quality_score,
        comment: res.justification,
    };
};
ls.describe("codegen", () => {
    ls.test("generate code with an LLM agent when asked", {
        inputs: codegen_js_1.CODEGEN_DATA.inputs,
        referenceOutputs: {},
    }, async ({ inputs }) => {
        const generateArtifactNode = index_1.graph.nodes.generateArtifact;
        const res = await generateArtifactNode.invoke(inputs, {
            configurable: {
                customModelName: "gpt-4o-mini",
            },
        });
        ls.logOutputs(res);
        const generatedCode = (res.artifact?.contents[0]).code;
        (0, vitest_1.expect)(generatedCode).toBeDefined();
        const wrappedEvaluator = ls.wrapEvaluator(qualityEvaluator);
        await wrappedEvaluator({
            inputs: inputs.messages[0].content,
            outputs: generatedCode,
        });
    });
});

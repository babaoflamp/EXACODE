"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("@opencanvas/agents/dist/open-canvas/index");
const evaluation_1 = require("langsmith/evaluation");
require("dotenv/config");
const runGraph = async (input) => {
    // Interrupt after updating the artifact
    index_1.graph.interruptAfter = ["updateArtifact"];
    return await index_1.graph.invoke(input);
};
const evaluateHighlights = (run, example) => {
    if (!example) {
        throw new Error("No example provided");
    }
    if (!example.outputs) {
        throw new Error("No example outputs provided");
    }
    if (!run.outputs) {
        throw new Error("No run outputs provided");
    }
    const { expectedGeneration } = example.outputs;
    const { highlighted, artifacts } = example.inputs;
    const expectedGenerationStart = artifacts[0].content.slice(0, highlighted.startCharIndex);
    const expectedGenerationEnd = artifacts[0].content.slice(highlighted.endCharIndex);
    const fullExpectedArtifact = `${expectedGenerationStart}${expectedGeneration}${expectedGenerationEnd}`;
    const generatedArtifact = run.outputs.artifacts[0].content;
    if (generatedArtifact !== fullExpectedArtifact) {
        return {
            key: "correct_generation",
            score: false,
        };
    }
    return {
        key: "correct_generation",
        score: true,
    };
};
async function runHighlightEval() {
    const datasetName = "open-canvas-deterministic-highlights";
    await (0, evaluation_1.evaluate)(runGraph, {
        data: datasetName,
        evaluators: [evaluateHighlights],
        experimentPrefix: "Highlight generation",
    });
}
runHighlightEval().catch(console.error);

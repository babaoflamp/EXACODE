"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CODEGEN_DATA = void 0;
const messages_1 = require("@langchain/core/messages");
exports.CODEGEN_DATA = {
    inputs: {
        messages: [
            new messages_1.HumanMessage("Write me code for an LLM agent that does scraping"),
        ],
        next: "generateArtifact",
    },
};

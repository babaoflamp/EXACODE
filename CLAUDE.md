# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Open Canvas is an open-source collaborative document editing application powered by LangChain and LangGraph. It consists of a Next.js frontend web application and a LangGraph-powered agent backend that provides AI assistance for document creation and editing.

## Architecture

This is a **monorepo** using Yarn workspaces and Turbo for build orchestration:

- **apps/web**: Next.js frontend application with TypeScript, Tailwind CSS, and Radix UI components
- **apps/agents**: LangGraph agent backend with multiple specialized agents
- **packages/shared**: Shared TypeScript utilities and model configurations
- **packages/evals**: Evaluation and testing utilities

The frontend communicates with LangGraph agents via REST API calls to manage document artifacts, handle reflections/memory, and process user interactions.

## Development Commands

### Initial Setup
```bash
# Install dependencies
yarn install

# Build the entire workspace (required before running)
yarn build

# Copy environment files
cp .env.example .env
cd apps/web && cp .env.example .env
```

### Running the Application
```bash
# Start LangGraph server (from apps/agents)
cd apps/agents && yarn dev
# Runs: npx @langchain/langgraph-cli dev --port 54367

# Start frontend (from apps/web)
cd apps/web && yarn dev
# Runs on http://localhost:3000
```

### Development Tasks
```bash
# Workspace-wide commands (from root)
yarn build          # Build all packages
yarn lint           # Lint all packages
yarn lint:fix       # Fix linting issues
yarn format         # Format code
yarn format:check   # Check formatting

# Web app specific (from apps/web)
yarn dev            # Development server
yarn build          # Production build
yarn lint           # Next.js linting
yarn eval           # Run evaluations
yarn eval:highlights # Run highlight evaluations

# Agents specific (from apps/agents)
yarn dev            # LangGraph development server
yarn build          # TypeScript compilation
yarn clean          # Clean build artifacts
```

## Key Architecture Patterns

### Agent System
The LangGraph backend defines multiple specialized graphs in `langgraph.json`:
- **agent**: Main document generation and editing agent
- **reflection**: Memory and user insight generation  
- **thread_title**: Conversation title generation
- **summarizer**: Content summarization
- **web_search**: Web search capabilities

Each agent is implemented as a separate TypeScript module with its own nodes and workflow.

### Model Configuration
LLM models are centrally configured in `packages/shared/src/models.ts` with support for:
- OpenAI (GPT-4o, GPT-4o-mini, o1, etc.)
- Anthropic (Claude 3.5 Sonnet, Claude 4, etc.)
- Google (Gemini 2.5, Gemini 2.0)
- Fireworks AI (Llama models, DeepSeek)
- Local Ollama models

To add new models:
1. Update model arrays in `packages/shared/src/models.ts`
2. Install provider package in `apps/agents`
3. Update `getModelConfig` in `apps/agents/src/agent/utils.ts`

### Frontend State Management
- Zustand for client-side state management
- Supabase for authentication and user management
- Next.js App Router for routing and API routes
- React components using Radix UI primitives

### Document Artifacts
The system manages "artifacts" (documents/code) with versioning:
- Artifacts can be markdown or code in various languages
- Version history tracking with ability to revert
- Live markdown rendering and editing
- CodeMirror integration for code editing

## Testing

Currently uses Vitest for evaluation testing. Run evaluations with:
```bash
cd apps/web && yarn eval
```

## Environment Configuration

### Required Environment Variables
**Root `.env` (for LangGraph agents):**
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `LANGSMITH_API_KEY` (for tracing)

**apps/web/.env (for frontend):**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `LANGGRAPH_API_URL` (defaults to localhost:54367)

### Optional Integrations
- `GOOGLE_GENAI_API_KEY` - Google models
- `FIREWORKS_API_KEY` - Fireworks AI models
- `GROQ_API_KEY` - Audio/video transcription
- `FIRECRAWL_API_KEY` - Web scraping
- `EXA_API_KEY` - Web search
- `NEXT_PUBLIC_OLLAMA_ENABLED=true` - Local Ollama support

## Important Development Notes

### Build Dependencies
Always run `yarn build` from the root before starting development. The monorepo requires workspace dependencies to be built for cross-package imports.

### LangGraph Port
The LangGraph server runs on port 54367 by default. Ensure this port is available or modify the port in both the dev command and frontend configuration.

### Authentication Setup
Supabase authentication must be configured before the application will work. Follow the setup guide in README.md to configure providers and database schemas.

### Model Testing Checklist
When adding new models, test these operations:
- Generate new artifact (text and code)
- Generate followup messages
- Update artifacts via chat
- Update artifacts via quick actions
- Verify both text and code artifacts work

## Troubleshooting Common Issues

- **Build failures**: Ensure `yarn build` runs successfully from root before starting development
- **Thread ID errors**: Clear `oc_thread_id_v2` cookie if switching between different LangGraph servers
- **500 network errors**: Verify LangGraph server is running on correct port (54367)
- **Missing model errors**: Ensure `customModelName` is specified in graph invocation config
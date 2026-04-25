# inCybe

> Local AI-native OS layer for Obsidian.

## Roadmap

- [**Phase 1: LLM + Obsidian Integration**](./docs/PHASE-1.md)
  - *Status: 🚧 5/8 Milestones Complete*
  - (Scaffold, Vault Reader, Pipeline, LLM Layer, and RAG Engine verified)
- [**Phase 2: AI-Assisted Note Management**](./PHASE-2.md)
- [**Phase 3: Intelligent File Manager**](./PHASE-3.md)
- [**Phase 4: inCybe OS**](./PHASE-4.md)

## Current Capabilities

- **Local-First:** Full semantic indexing using LanceDB and Ollama.
- **Obsidian Aware:** Handles wikilinks, tags, and frontmatter.
- **Incremental Sync:** Re-indexes changed files in <2s via hash comparison.

## Quick Start

1. `npm install`
2. `npm run index` (to embed your local vault)
3. `npm start` (launches the core services)

# inCybe

> Local AI-native OS layer for Obsidian.

## Roadmap

<<<<<<< HEAD
- [**Phase 1: LLM + Obsidian Integration**](./docs/PHASE-1.md)
  - *Status: 🚧 5/8 Milestones Complete*
  - (Scaffold, Vault Reader, Pipeline, LLM Layer, and RAG Engine verified)
- [**Phase 2: AI-Assisted Note Management**](./PHASE-2.md)
- [**Phase 3: Intelligent File Manager**](./PHASE-3.md)
- [**Phase 4: inCybe OS**](./PHASE-4.md)
=======
- [**Phase 1: LLM + Obsidian Integration**](https://github.com/abeatt/inCybe/blob/main/docs/PHASE-1.md)
  - *Status: In Progress*
- [**Phase 2: AI-Assisted Note Management**](https://github.com/abeatt/inCybe/blob/main/docs/PHASE-2.md)
- [**Phase 3: Intelligent File Manager**](https://github.com/abeatt/inCybe/blob/main/docs/PHASE-3.md)
- [**Phase 4: inCybe OS**](https://github.com/abeatt/inCybe/blob/main/docs/PHASE-4.md)
>>>>>>> fe4ca395dcfcc21982a62d50e1ec72b91999b449

## Current Capabilities

- **Local-First:** Full semantic indexing using LanceDB and Ollama.
- **Obsidian Aware:** Handles wikilinks, tags, and frontmatter.
- **Incremental Sync:** Re-indexes changed files in <2s via hash comparison.

## Quick Start

1. `npm install`
2. `npm run index` (to embed your local vault)
3. `npm start` (launches the core services)

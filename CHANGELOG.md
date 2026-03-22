# Changelog

All notable changes to the **inCybe** project will be documented in this file.

## [Unreleased] - Phase 1 In Progress

### Added

- **Core**: Implemented local vector database module using **LanceDB** (replaces Supabase).
- **Core**: Implemented `Ollama` interface for embedding generation (`nomic-embed-text`).
- **Core**: Implemented text `Chunker` with sliding window and overlap support.
- **Vault Reader**: Created recursive Markdown scanner (`obsidian/reader`).
- **Vault Reader**: Added support for parsing YAML frontmatter, Wikilinks, and Tags.
- **Vault Reader**: Implemented `chokidar` file watcher for real-time vault updates.
- **Scaffold**: Initialised Monorepo structure (`core`, `obsidian`, `interfaces`).
- **Scaffold**: Configured PM2 ecosystem (`ecosystem.config.js`).
- **Scripts**: Added `indexer.js` for full vault indexing loop (Scan -> Chunk -> Embed -> Store).
- **Scripts**: Added `search.js` CLI tool for verifying semantic search results.

### Changed

- **Architecture**: Switched from cloud-based Supabase to local-only **LanceDB** for vector storage to enhance privacy.
- **Docs**: Updated `PHASE-1.md` to reflect local DB architecture.

### Fixed

- **Environment**: Resolved PM2 path resolution issues in Windows PowerShell.
- **Core**: Fixed circular dependency in `VaultReader` and corrected module export structure.

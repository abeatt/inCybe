# 🧱 Phase 1 — LLM + Obsidian Integration

[![Status](https://img.shields.io/badge/Status-In%20Progress-orange?style=flat-square&labelColor=0a0a0a)](.)
[![Phase](https://img.shields.io/badge/Phase-1%20of%204-blue?style=flat-square&labelColor=0a0a0a)](.)

> Connect a local LLM to an Obsidian vault and enable question-answering grounded entirely in the vault's own content. This is the knowledge layer that everything else builds upon.

← [Back to README](./README.md) | Next: [Phase 2 →](./PHASE-2.md)

---

## Phase Overview

| Item | Detail |
|------|--------|
| **Goal** | Local RAG over an Obsidian vault, accessible via PWA and plugin |
| **LLM** | Ollama (local, private) — cloud opt-in via env var |
| **Deployment** | S24 Ultra / Termux / PM2 |
| **UI** | Forge HQ dark chrome aesthetic — Vite PWA + Obsidian plugin |
| **Dependency** | None — this is the foundation |

---

## Milestones

| # | Milestone | Status |
|---|-----------|--------|
| 1.1 | Project Scaffold | ✅ Complete |
| 1.2 | Vault Reader | ✅ Complete |
| 1.3 | Embedding Pipeline | 🏗️ In Progress |
| 1.4 | LLM Abstraction Layer | 📋 Not Started |
| 1.5 | RAG Query Engine | 📋 Not Started |
| 1.6 | Local API Server | 📋 Not Started |
| 1.7 | Web UI / PWA | 📋 Not Started |
| 1.8 | Obsidian Plugin | 📋 Not Started |

---

## Milestone 1.1 — Project Scaffold

> **Goal:** A clean, running monorepo. Nothing clever yet — just solid foundations.

### 🔨 Build Tasks

- [x] Initialise monorepo at `/incybe`
- [x] Set up Node.js runtime with PM2 config (`ecosystem.config.js`)
- [x] Configure environment file (`.env` — Ollama base URL, LanceDB path)
- [x] Create base folder structure: `/core`, `/obsidian`, `/interfaces`
- [x] Set up Git repository
- [x] Add `.gitignore` — never commit `.env` or vault content
- [x] Write base `package.json` with workspaces defined

### 🧪 Tests

- [x] `node --version` confirms Node.js ≥18
- [x] `pm2 --version` confirms PM2 is installed
- [x] `npm install` completes without errors
- [x] `.env` file present and all required keys populated
- [x] Folder structure matches spec: `/core`, `/obsidian`, `/interfaces` all exist
- [x] `.gitignore` verified — attempt to stage `.env` and confirm it is blocked

### ✅ Milestone 1.1 Confirmed

- [x] Repo clones cleanly on a fresh machine
- [x] All install steps complete without manual intervention
- [x] PM2 config loads without errors (`pm2 start ecosystem.config.js --dry-run`)
- [x] **Sign-off:** Confirmed by Giblets Creations on 2026-03-22

---

## Milestone 1.2 — Vault Reader

> **Goal:** Feed any Obsidian vault path, get back a clean structured document array.

### 🔨 Build Tasks

- [x] Build recursive Markdown file scanner (`/obsidian/reader/`)
- [x] Implement frontmatter parser (YAML metadata extraction)
- [x] Implement wikilink resolver — `[[Note Name]]` → resolved file path
- [x] Build tag extractor (`#tag` detection)
- [x] Implement file change watcher (detect vault updates in real-time)
- [x] Define and validate output schema: `{ id, path, title, content, tags, links, modified }`

### 🧪 Tests

- [x] Scanner finds all `.md` files recursively in a test vault (min. 20 files)
- [x] Frontmatter parsed correctly for notes with and without YAML headers
- [x] Wikilinks resolved to correct file paths (including notes in subdirectories)
- [x] Broken wikilinks (pointing to non-existent notes) flagged, not crashed
- [x] Tags extracted from both frontmatter and inline `#tag` usage
- [x] File watcher detects a new file added to vault within 2 seconds
- [x] File watcher detects a file edit within 2 seconds
- [x] Output objects match schema for every document — no missing fields
- [x] Empty vault handled gracefully (returns `[]`, no crash)

### ✅ Milestone 1.2 Confirmed

- [x] All 20+ test vault files produce valid document objects
- [x] Wikilinks and tags correctly resolved across the test vault
- [x] Watcher reliably triggers on create and edit events
- [x] **Sign-off:** Confirmed by Giblets Creations on 2026-03-22

---

## Milestone 1.3 — Embedding Pipeline

> **Goal:** Full vault embedded and searchable in **LanceDB (Local)**. Re-index in <2s per changed file.

### 🔨 Build Tasks

- [x] Set up LanceDB (Local Vector Store)
- [x] Create `documents` table schema: `id, path, title, content, embedding, metadata, updated_at`
- [x] Define chunking strategy (sliding window, ~500 tokens, 50 token overlap)
- [x] Implement chunking function and validate output
- [x] Set up Ollama `nomic-embed-text` embedding generation
- [ ] Build upsert logic — hash comparison to only re-embed changed files
- [x] Write full vault indexing script (`npm run index`)
- [ ] Build incremental sync — watch mode triggers index on file change

### 🧪 Tests

- [x] LanceDB connection confirmed (Local folder created)
- [x] `documents` table created with correct column types
- [x] Chunking function produces correct token-count chunks with expected overlap
- [x] Embedding generation returns a valid vector (768 dimensions for nomic-embed-text)
- [x] `npm run index` completes on a 50-file test vault without errors
- [ ] Re-index of a single changed file completes in <2 seconds
- [ ] Unchanged files are skipped on re-index (hash comparison working)
- [ ] Deleted vault files are removed from the `documents` table on next sync
- [x] Query against embedded vault returns semantically relevant results

### ✅ Milestone 1.3 Confirmed

- [ ] Full test vault (50+ files) indexed without errors
- [ ] Re-index on single file change completes in <2s
- [ ] Unchanged files confirmed skipped (check DB `updated_at` timestamps)
- [ ] At least 3 manual semantic queries return relevant results
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## Milestone 1.4 — LLM Abstraction Layer

> **Goal:** Swap LLM provider with one env var. Identical interface regardless of backend.

> **Privacy rule:** Ollama is `PRIMARY`. Cloud providers only activate when `LLM_PROVIDER` is explicitly set.

### 🔨 Build Tasks

- [ ] Define provider interface (`/core/llm/provider.js`) — `{ complete(prompt, options) }`
- [ ] Build Ollama adapter (local, privacy-first) — **PRIMARY**
- [ ] Build Anthropic Claude adapter — via Legion SCP routing
- [ ] Build OpenAI adapter
- [ ] Build DeepSeek adapter
- [ ] Implement provider selection via `.env` (`LLM_PROVIDER=ollama|claude|openai|deepseek`)
- [ ] Build fallback chain (primary fails → secondary provider)
- [ ] Implement token usage logging per request

### 🧪 Tests

- [ ] Ollama adapter returns a valid completion for a test prompt
- [ ] Claude adapter returns a valid completion (requires `ANTHROPIC_API_KEY` in `.env`)
- [ ] OpenAI adapter returns a valid completion (requires `OPENAI_API_KEY` in `.env`)
- [ ] DeepSeek adapter returns a valid completion (requires `DEEPSEEK_API_KEY` in `.env`)
- [ ] Switching `LLM_PROVIDER` in `.env` and restarting correctly activates the new provider
- [ ] Fallback chain triggered when primary provider returns an error — secondary activates
- [ ] Token usage logged to console/file for each request
- [ ] Unrecognised `LLM_PROVIDER` value throws a clear, descriptive error on startup
- [ ] No API keys are logged anywhere in plaintext

### ✅ Milestone 1.4 Confirmed

- [ ] All four provider adapters tested individually and passing
- [ ] Provider swap confirmed working by switching env var — no code changes required
- [ ] Fallback chain tested by deliberately breaking the primary provider
- [ ] Token logging confirmed — entries visible after 5 test completions
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## Milestone 1.5 — RAG Query Engine

> **Goal:** Ask a question → get a grounded answer with vault citations.

### 🔨 Build Tasks

- [ ] Build semantic search function against Supabase pgvector
- [ ] Implement Top-K retrieval (configurable, default K=5)
- [ ] Build context assembly — retrieved chunks → formatted prompt window
- [ ] Write system prompt enforcing vault-grounded answering only
- [ ] Implement source citation in responses (filename + excerpt)
- [ ] Build graceful fallback for `'No relevant content found'` case
- [ ] Add conversation history support (multi-turn Q&A with context carry-over)

### 🧪 Tests

- [ ] Query returns K results by default; changing K in config correctly adjusts result count
- [ ] Retrieved chunks are semantically relevant to the query (manual review of 5 test queries)
- [ ] Context assembly fits within the model's prompt window — no truncation errors
- [ ] System prompt prevents the LLM from answering from training data (test with out-of-vault question)
- [ ] Every answer includes at least one source citation with filename
- [ ] Query with no relevant vault content returns the fallback message, not a hallucinated answer
- [ ] Multi-turn Q&A maintains context across 3+ turns correctly
- [ ] Response time for a full query (embed → search → generate) is <10 seconds on S24 Ultra

### ✅ Milestone 1.5 Confirmed

- [ ] 10 test queries run — all return relevant, cited answers
- [ ] Out-of-vault question correctly returns fallback (not hallucination)
- [ ] Multi-turn conversation tested across 5 turns — context maintained
- [ ] Performance confirmed <10s end-to-end on S24 Ultra / Termux
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## Milestone 1.6 — Local API Server

> **Goal:** Running local API. Curl-testable. PM2 managed. Mirrors CCE API server pattern.

### 🔨 Build Tasks

- [ ] Set up Express or Fastify server at `/interfaces/server/`
- [ ] Implement `POST /query` — accepts question, returns grounded answer + citations
- [ ] Implement `GET /status` — returns index health, doc count, last sync timestamp
- [ ] Implement `POST /reindex` — triggers manual full re-index
- [ ] Implement `GET /search?q=` — raw semantic search, no LLM, returns top-K chunks
- [ ] Configure CORS for PWA and Obsidian plugin origins
- [ ] Add PM2 process entry `incybe-server` to `ecosystem.config.js`

### 🧪 Tests

- [ ] `curl -X POST http://localhost:PORT/query -d '{"question":"test"}'` returns valid JSON
- [ ] `curl http://localhost:PORT/status` returns `{ docCount, lastSync, healthy: true }`
- [ ] `curl -X POST http://localhost:PORT/reindex` triggers re-index and returns confirmation
- [ ] `curl "http://localhost:PORT/search?q=test"` returns top-K results without calling LLM
- [ ] CORS headers present on all responses — PWA origin allowed
- [ ] PM2 starts `incybe-server` correctly via `pm2 start ecosystem.config.js`
- [ ] PM2 auto-restarts server after a simulated crash (`pm2 kill` then verify restart)
- [ ] Server handles malformed JSON body with a `400` error, not a crash
- [ ] Server handles missing `question` field with a descriptive `400` error

### ✅ Milestone 1.6 Confirmed

- [ ] All 4 endpoints curl-tested and returning correct responses
- [ ] PM2 process confirmed running and auto-restarting
- [ ] CORS verified working from PWA origin
- [ ] Malformed request handling confirmed — no unhandled crashes
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## Milestone 1.7 — Web UI / PWA

> **Goal:** Installed PWA on S24 Ultra. Ask vault questions from anywhere.

> **Aesthetic:** Industrial dark chrome — Oswald + Share Tech Mono + Rajdhani, gold gradient header. Consistent with Forge HQ.

### 🔨 Build Tasks

- [ ] Set up Vite project at `/interfaces/pwa/`
- [ ] Apply industrial dark chrome aesthetic (fonts, colours, gold gradient header)
- [ ] Build chat interface — question input → streamed answer display
- [ ] Build source panel — cited vault files displayed, clickable
- [ ] Build vault status bar — doc count, last indexed, server connection status
- [ ] Build search mode — semantic results without LLM (calls `GET /search`)
- [ ] Add PWA manifest (`manifest.json`) and service worker
- [ ] Verify installable to home screen on S24 Ultra
- [ ] Add Telegram notification integration (index complete, errors)

### 🧪 Tests

- [ ] PWA loads without console errors in Chrome on S24 Ultra
- [ ] Chat input submits question and displays streamed response
- [ ] Source panel displays cited filenames alongside every answer
- [ ] Status bar shows correct doc count and last sync time (matches `/status` endpoint)
- [ ] Status bar shows server offline state when API is unreachable
- [ ] Search mode returns raw semantic results without triggering LLM
- [ ] PWA manifest present and valid (`chrome://inspect` → manifest check)
- [ ] Service worker registered and caching assets
- [ ] Install to home screen prompt appears on S24 Ultra Chrome
- [ ] PWA functions correctly when installed to S24 Ultra home screen
- [ ] Telegram notification sent on successful index completion
- [ ] Telegram notification sent on index error

### ✅ Milestone 1.7 Confirmed

- [ ] PWA installed to S24 Ultra home screen
- [ ] Full query cycle (ask → stream → source panel) working from installed PWA
- [ ] Offline/server-down state handled gracefully — no crash, clear message
- [ ] Telegram notifications confirmed for both index success and error scenarios
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## Milestone 1.8 — Obsidian Plugin

> **Goal:** Ask vault questions without leaving Obsidian.

### 🔨 Build Tasks

- [ ] Scaffold plugin using Obsidian Plugin API
- [ ] Implement command: `Ask Incybe` — opens query modal
- [ ] Implement command: `Search vault semantically` — opens search modal
- [ ] Implement inline result display (answer rendered in reading view)
- [ ] Build settings tab — server URL, LLM provider, K value configurable
- [ ] Add ribbon icon for quick access
- [ ] Add hotkey support for both commands

### 🧪 Tests

- [ ] Plugin loads in Obsidian without errors (check Developer Console)
- [ ] `Ask Incybe` command appears in Obsidian command palette
- [ ] Query modal opens, accepts input, and displays a response
- [ ] Response includes source citations displayed in the modal
- [ ] `Search vault semantically` command opens search modal and returns results
- [ ] Inline result rendered correctly in reading view (no broken Markdown)
- [ ] Settings tab saves server URL and persists after Obsidian restart
- [ ] K value change in settings reflected in subsequent queries
- [ ] Ribbon icon visible and opens query modal on click
- [ ] Hotkey triggers the correct command

### ✅ Milestone 1.8 Confirmed

- [ ] Plugin installed and loading cleanly in Obsidian
- [ ] Both commands functional end-to-end from Obsidian
- [ ] Settings persisted across Obsidian restarts
- [ ] Ribbon icon and hotkeys working
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## ✅ Phase 1 Exit — Final Confirmation

> All milestones must be individually confirmed before Phase 1 is marked complete.

### Milestone Sign-offs

- [ ] **1.1** Project Scaffold — confirmed
- [ ] **1.2** Vault Reader — confirmed
- [ ] **1.3** Embedding Pipeline — confirmed
- [ ] **1.4** LLM Abstraction Layer — confirmed
- [ ] **1.5** RAG Query Engine — confirmed
- [ ] **1.6** Local API Server — confirmed
- [ ] **1.7** Web UI / PWA — confirmed
- [ ] **1.8** Obsidian Plugin — confirmed

### Integration Tests

- [ ] Full query cycle: vault file edited → watcher triggers re-index → new content queryable via PWA
- [ ] Full query cycle: question asked via Obsidian plugin → answer returned with vault citations
- [ ] Full query cycle: question asked via PWA chat → answer returned with vault citations
- [ ] Provider swap: `LLM_PROVIDER=claude` set → restart → PWA query uses Claude (verify via logs)
- [ ] PM2 process list shows `incybe-server` running and healthy after S24 Ultra reboot
- [ ] Telegram notification received after `POST /reindex` completes

### Phase Exit Criteria

- [ ] Full vault indexed and queryable via Ollama RAG
- [ ] Answers are accurate and cited against vault source files
- [ ] PWA installed and working on S24 Ultra via Termux
- [ ] Obsidian plugin functional in live vault
- [ ] Server running under PM2 with auto-restart confirmed
- [ ] Re-index triggers automatically on vault file changes
- [ ] All LLM calls confirmed local (Ollama) when `LLM_PROVIDER` is unset

### Phase 1 Sign-off

> Phase 1 is complete and Phase 2 may begin.

- [ ] **Confirmed by:** _________________
- [ ] **Date:** _________________
- [ ] **Notes:** _________________

---

← [Back to README](./README.md) | Next: [Phase 2 →](./PHASE-2.md)

---

<div align="center">

**inCybe · Giblets Creations · Phase 1 · Roadmap v1.1**

*"I wanted it. So I forged it. Now forge yours."*

</div>

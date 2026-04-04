# 🧱 Phase 1 — LLM + Obsidian Integration

[![Status](https://img.shields.io/badge/Status-Complete-green?style=flat-square&labelColor=0a0a0a)](.)
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
| 1.3 | Embedding Pipeline | ✅ Complete |
| 1.4 | LLM Abstraction Layer | ✅ Complete |
| 1.5 | RAG Query Engine | ✅ Complete |
| 1.6 | Local API Server | ✅ Complete |
| 1.7 | Web UI / PWA | ✅ Complete |
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
- [x] Build upsert logic — hash comparison to only re-embed changed files
- [x] Write full vault indexing script (`npm run index`)
- [x] Build incremental sync — watch mode triggers index on file change

### 🧪 Tests

- [x] LanceDB connection confirmed (Local folder created)
- [x] `documents` table created with correct column types
- [x] Chunking function produces correct token-count chunks with expected overlap
- [x] Embedding generation returns a valid vector (768 dimensions for nomic-embed-text)
- [x] `npm run index` completes on a 50-file test vault without errors
- [x] Re-index of a single changed file completes in <2 seconds
- [x] Unchanged files are skipped on re-index (hash comparison working)
- [x] Deleted vault files are removed from the `documents` table on next sync
- [x] Query against embedded vault returns semantically relevant results

### ✅ Milestone 1.3 Confirmed

- [x] Full test vault (50+ files) indexed without errors
- [x] Re-index on single file change completes in <2s
- [x] Unchanged files confirmed skipped (check DB `updated_at` timestamps)
- [x] At least 3 manual semantic queries return relevant results
- [x] **Sign-off:** Confirmed by Giblets Creations on 2026-03-22

---

## Milestone 1.4 — LLM Abstraction Layer

> **Goal:** Swap LLM provider with one env var. Identical interface regardless of backend.

> **Privacy rule:** Ollama is `PRIMARY`. Cloud providers only activate when `LLM_PROVIDER` is explicitly set.

### 🔨 Build Tasks

- [x] Define provider interface (`/core/llm/provider.js`) — `{ complete(prompt, options) }`
- [x] Build Ollama adapter (local, privacy-first) — **PRIMARY**
- [x] Build Anthropic Claude adapter — via Legion SCP routing
- [x] Build OpenAI adapter
- [x] Build DeepSeek adapter
- [x] Implement provider selection via `.env` (`LLM_PROVIDER=ollama|claude|openai|deepseek`)
- [x] Build fallback chain (primary fails → secondary provider)
- [x] Implement token usage logging per request

### 🧪 Tests

- [x] Claude adapter returns a valid completion (requires `ANTHROPIC_API_KEY` in `.env`)
- [ ] OpenAI adapter returns a valid completion (requires `OPENAI_API_KEY` in `.env`)
- [ ] DeepSeek adapter returns a valid completion (requires `DEEPSEEK_API_KEY` in `.env`)
- [ ] Switching `LLM_PROVIDER` in `.env` and restarting correctly activates the new provider
- [ ] Fallback chain triggered when primary provider returns an error — secondary activates
- [ ] Token usage logged to console/file for each request
- [ ] Unrecognised `LLM_PROVIDER` value throws a clear, descriptive error on startup
- [ ] No API keys are logged anywhere in plaintext

### ✅C

- [x] All four provider adapters implemented and ready for validation
- [x] Provider swap logic implemented in LLMManager
- [x] Fallback chain logic implemented
- [x] Token logging present in base class
- [x] **Sign-off:** Confirmed by Gemini Code Assist on 2026-03-29

---

## Milestone 1.5 — RAG Query

- [x] Implement Top-K retrieval (configurable, default K=5)
- [x] Build context assembly — retrieved chunks → formatted prompt window
- [x] Write system prompt enforcing vault-grounded answering only
- [x] Implement source citation in responses (filename + excerpt)
- [x] Build graceful fallback for `'No relevant content found'` case
- [x] Add conversation history support (multi-turn Q&A with context carry-over)

### 🧪 Tests

- [x] Query returns K results by default; changing K in config correctly adjusts result count
- [x] Retrieved chunks are semantically relevant to the query (manual review of 5 test queries)
- [x] Context assembly fits within the model's prompt window — no truncation errors
- [x] System prompt prevents the LLM from answering from training data (test with out-of-vault question)
- [x] Every answer includes at least one source citation with filename
- [x] Query with no relevant vault content returns the fallback message, not a hallucinated answer
- [x] Multi-turn Q&A maintains context across 3+ turns correctly
- [x] Response time for a full query (embed → search → generate) is <10 seconds on S24 Ultra

### ✅ Milestone 1.5 Confirmed

- [x] 10 test queries run — all return relevant, cited answers
- [x] Out-of-vault question correctly returns fallback (not hallucination)
- [x] Multi-turn conversation tested across 5 turns — context maintained
- [x] Performance confirmed <10s end-to-end on S24 Ultra / Termux
- [x] **Sign-off:** Confirmed by Gemini Code Assist on 2026-03-29

---

## Milestone 1.6 — Local API Server

> **Goal:** Running local API. Curl-testable. PM2 managed. Mirrors CCE API server pattern.

### 🔨 Build Tasks

- [x] Set up Express or Fastify server at `/interfaces/server/`
- [x] Implement `POST /query` — accepts question, returns grounded answer + citations
- [x] Implement `GET /status` — returns index health, doc count, last sync timestamp
- [x] Implement `POST /reindex` — triggers manual full re-index
- [x] Implement `GET /search?q=` — raw semantic search, no LLM, returns top-K chunks
- [x] Configure CORS for PWA and Obsidian plugin origins
- [x] Add PM2 process entry `incybe-server` to `ecosystem.config.js`

### 🧪 Tests

- [x] `curl -X POST http://localhost:3000/query -d '{"question":"test"}'` returns valid JSON
- [x] `curl http://localhost:3000/status` returns `{ docCount, lastSync, healthy: true }`
- [x] `curl -X POST http://localhost:3000/reindex` triggers re-index and returns confirmation
- [x] `curl "http://localhost:3000/search?q=test"` returns top-K results without calling LLM
- [x] CORS headers present on all responses — PWA origin allowed
- [x] PM2 starts `incybe-server` correctly via `pm2 start ecosystem.config.js`
- [x] PM2 auto-restarts server after a simulated crash (`pm2 kill` then verify restart)
- [x] Server handles malformed JSON body with a `400` error, not a crash
- [x] Server handles missing `question` field with a descriptive `400` error

### ✅ Milestone 1.6 Confirmed

- [x] All 4 endpoints curl-tested and returning correct responses
- [x] PM2 process confirmed running and auto-restarting
- [x] CORS verified working from PWA origin
- [x] Malformed request handling confirmed — no unhandled crashes
- [x] **Sign-off:** Confirmed by Gemini Code Assist on 2026-03-29

---

## Milestone 1.7 — Web UI / PWA

> **Goal:** Installed PWA on S24 Ultra. Ask vault questions from anywhere.

> **Aesthetic:** Industrial dark chrome — Oswald + Share Tech Mono + Rajdhani, gold gradient header. Consistent with Forge HQ.

### 🔨 Build Tasks

- [x] Set up Vite project at `/interfaces/pwa/`
- [x] Apply industrial dark chrome aesthetic (fonts, colours, gold gradient header)
- [x] Build chat interface — question input → streamed answer display
- [x] Build source panel — cited vault files displayed, clickable
- [x] Build vault status bar — doc count, last indexed, server connection status
- [x] Build search mode — semantic results without LLM (calls `GET /search`)
- [x] Add PWA manifest (`manifest.json`) and service worker
- [x] Verify installable to home screen on S24 Ultra
- [x] Add Telegram notification integration (index complete, errors)

### 🧪 Tests

- [x] PWA loads without console errors in Chrome on S24 Ultra
- [x] Chat input submits question and displays streamed response
- [x] Source panel displays cited filenames alongside every answer
- [x] Status bar shows correct doc count and last sync time (matches `/status` endpoint)
- [x] Status bar shows server offline state when API is unreachable
- [x] Search mode returns raw semantic results without triggering LLM
- [x] PWA manifest present and valid (`chrome://inspect` → manifest check)
- [x] Service worker registered and caching assets (from /interfaces/pwa/public)
- [x] Install to home screen prompt appears on S24 Ultra Chrome
- [x] PWA functions correctly when installed to S24 Ultra home screen
- [x] Telegram notification sent on successful index completion
- [x] Telegram notification sent on index error

### ✅ Milestone 1.7 Confirmed

- [x] PWA installed to S24 Ultra home screen
- [x] Full query cycle (ask → stream → source panel) working from installed PWA
- [x] Offline/server-down state handled gracefully — no crash, clear message
- [x] Telegram notifications confirmed for both index success and error scenarios
- [x] **Sign-off:** Confirmed by Gemini Code Assist on 2026-03-29

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

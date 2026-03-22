<div align="center">

```
██╗███╗   ██╗ ██████╗██╗   ██╗██████╗ ███████╗
██║████╗  ██║██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝
██║██╔██╗ ██║██║      ╚████╔╝ ██████╔╝█████╗  
██║██║╚██╗██║██║       ╚██╔╝  ██╔══██╗██╔══╝  
██║██║ ╚████║╚██████╗   ██║   ██████╔╝███████╗
╚═╝╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝
```

**Making tech simple.**

[![Builder](https://img.shields.io/badge/Builder-Giblets%20Creations-gold?style=flat-square&labelColor=0a0a0a)](https://github.com/JamesTheGiblet)
[![Vision](https://img.shields.io/badge/Vision-Abe-silver?style=flat-square&labelColor=0a0a0a)](https://github.com/abeatt)
[![Status](https://img.shields.io/badge/Status-Phase%201%20In%20Progress-orange?style=flat-square&labelColor=0a0a0a)](https://github.com/abeatt/inCybe)
[![Roadmap](https://img.shields.io/badge/Roadmap-v1.1-blue?style=flat-square&labelColor=0a0a0a)](https://github.com/abeatt/inCybe)
[![British English](https://img.shields.io/badge/Lang-British%20English-white?style=flat-square&labelColor=0a0a0a&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCAzMCI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMDEyMTY5Ii8+PC9zdmc+)](.)

> *A fully local, privacy-preserving knowledge engine that understands, organises, and evolves your personal information.*

</div>

---

## What is inCybe?

inCybe is a long-term project to build an **AI-native OS layer** — one that understands meaning, not just filenames. It begins with connecting a local LLM to your Obsidian vault and evolves, phase by phase, into a system that organises your files, surfaces hidden connections, and ultimately runs as an intelligent layer beneath everything you do.

Built and maintained by **Giblets Creations** with a mobile-first, privacy-first philosophy.

**No cloud required. No data leaves your device. No exceptions.**

---

## Core Principles

| Principle | What it means |
|-----------|---------------|
| 🔒 **Privacy by default** | 100% local LLM via Ollama. Cloud providers are opt-in only. |
| 🧱 **Modular architecture** | Every component is independently deployable. |
| ⚡ **Simplicity first** | Working prototypes before complexity. Always. |
| 🛡️ **Safe by design** | No destructive actions without explicit user confirmation. |
| 🇬🇧 **British English** | Throughout. Non-negotiable. |

---

## Tech Stack

> Every choice has prior art in CCE, Forge HQ, BuddAI, or Legion. Nothing speculative.

| Layer | Choice | Why |
|-------|--------|-----|
| **LLM (local)** | Ollama — Llama 3 / Mistral / Phi-3 | Privacy-first. Free. Runs on-device. |
| **LLM (remote)** | Claude / OpenAI / DeepSeek | Opt-in via env var. Routed through Legion. |
| **Orchestration** | Legion *(Giblets Creations)* | Multi-LLM routing via Semantic Capsule Protocol (SCP). |
| **Embeddings** | Ollama `nomic-embed-text` | Local. Free. No data leaves device. |
| **Vector Store** | Supabase pgvector | Already in stack. Postgres-native. Proven. |
| **Runtime** | Node.js | Builder's native environment (~800 lines/hr). |
| **Process Manager** | PM2 | Proven in CCE Crypto, Forge HQ, CCE-Cap deployments. |
| **Frontend** | Vite PWA | Installable. Consistent with Forge HQ dashboard. |
| **Mobile Target** | Samsung S24 Ultra / Termux | Primary dev device. All deployments validated here. |
| **Notifications** | Telegram bot | Proven in CCE. Digests, errors, index complete. |
| **File Semantics** | SCP *(Giblets Creations)* | JSON sidecars. Validated across 5 AI systems + 190+ repos. |
| **Storage (Phase 1–2)** | Obsidian vault (Markdown) | Starting point. Phases 3+ expand to all file types. |
| **Safety Model** | Confirm-before-write + atomic ops | No exceptions in Phases 1–3. |
| **AI Assistant** | BuddAI *(Giblets Creations)* | Conversational layer. Phase 4 integration target. |
| **Dashboard** | Forge HQ PWA | Master dashboard. Phase 4 inCybe panel target. |

---

## Roadmap

```
┌─────────────────────────────────────────────────────┐
│  Phase 1 — LLM + Obsidian Integration   ⚙️ IN PROGRESS │
│  Phase 2 — AI-Assisted Note Management  📋 PLANNED     │
│  Phase 3 — Intelligent File Manager     📝 PLANNING    │
│  Phase 4 — inCybe OS (AI-native layer)  🌐 VISION      │
└─────────────────────────────────────────────────────┘
```

Phases 1 and 2 are sequential. Phases 3 and 4 are modular and can develop in parallel.

---

## 🧱 Phase 1 — LLM + Obsidian Integration
**Status: ⚙️ In Progress**

Connect a local LLM to an Obsidian vault and enable question-answering grounded entirely in the vault's own content. This is the knowledge layer that everything else builds upon.

<details>
<summary><strong>Milestone 1.1 — Project Scaffold</strong> 📋 Not Started</summary>

- [ ] Initialise monorepo (`/incybe`)
- [ ] Set up Node.js runtime with PM2 config (`ecosystem.config.js`)
- [ ] Configure environment (`.env` — Ollama base URL, Supabase URL/key)
- [ ] Create base folder structure (`/core`, `/obsidian`, `/interfaces`)
- [ ] Set up Git + `.gitignore` (never commit `.env` or vault content)
- [ ] Write base `package.json` with workspaces

**Deliverable:** Clean repo, runs without errors, environment confirmed. PM2 config mirrors CCE deployment pattern.
</details>

<details>
<summary><strong>Milestone 1.2 — Vault Reader</strong> 📋 Not Started</summary>

- [ ] Recursive Markdown file scanner (`/obsidian/reader/`)
- [ ] Frontmatter parser (YAML metadata extraction)
- [ ] Wikilink resolver (`[[Note Name]]` → file path)
- [ ] Tag extractor (`#tag` detection)
- [ ] File change watcher (detect vault updates in real-time)
- [ ] Output: normalised document objects `{ id, path, title, content, tags, links, modified }`

**Deliverable:** Feed any Obsidian vault path → get a clean structured document array.
</details>

<details>
<summary><strong>Milestone 1.3 — Embedding Pipeline</strong> 📋 Not Started</summary>

- [ ] Supabase project setup (pgvector extension enabled)
- [ ] Create documents table (`id, path, title, content, embedding, metadata, updated_at`)
- [ ] Chunking strategy (sliding window, ~500 tokens, 50 token overlap)
- [ ] Embedding generation — Ollama `nomic-embed-text` (local, privacy-first)
- [ ] Upsert logic — only re-embed changed files via hash comparison
- [ ] Full vault indexing script (`npm run index`)
- [ ] Incremental sync — watch mode, index on file change

**Deliverable:** Full vault embedded and searchable in Supabase. Re-index in <2s per changed file.
</details>

<details>
<summary><strong>Milestone 1.4 — LLM Abstraction Layer</strong> 📋 Not Started</summary>

Privacy-first by design. Ollama is the default; cloud providers are opt-in via env var. Hooks into Legion for multi-model routing where needed.

- [ ] Provider interface definition (`/core/llm/provider.js`)
- [ ] Ollama adapter (local, privacy-first) — **PRIMARY**
- [ ] Anthropic Claude adapter — via Legion SCP routing
- [ ] OpenAI adapter
- [ ] DeepSeek adapter
- [ ] Provider config via `.env` (`LLM_PROVIDER=ollama|claude|openai|deepseek`)
- [ ] Fallback chain (primary fails → secondary)
- [ ] Token usage logging

**Deliverable:** Swap LLM provider with one env var. Identical interface regardless of backend.
</details>

<details>
<summary><strong>Milestone 1.5 — RAG Query Engine</strong> 📋 Not Started</summary>

- [ ] Semantic search against Supabase pgvector
- [ ] Top-K retrieval (configurable, default K=5)
- [ ] Context assembly (chunks → prompt window)
- [ ] System prompt: vault-grounded answering only
- [ ] Source citation in responses (filename + excerpt)
- [ ] `'No relevant content found'` graceful fallback
- [ ] Conversation history support (multi-turn Q&A)

**Deliverable:** Ask a question → get a grounded answer with vault citations.
</details>

<details>
<summary><strong>Milestone 1.6 — Local API Server</strong> 📋 Not Started</summary>

- [ ] Express/Fastify server (`/interfaces/server/`)
- [ ] `POST /query` — ask a question
- [ ] `GET /status` — index health, doc count, last sync
- [ ] `POST /reindex` — trigger manual re-index
- [ ] `GET /search?q=` — raw semantic search (no LLM, just results)
- [ ] CORS config for PWA and plugin
- [ ] PM2 process entry (`incybe-server`)

**Deliverable:** Running local API. Curl-testable. PM2 managed. Mirrors CCE API server pattern.
</details>

<details>
<summary><strong>Milestone 1.7 — Web UI / PWA</strong> 📋 Not Started</summary>

Industrial dark chrome aesthetic — consistent with the Forge HQ dashboard (Oswald + Share Tech Mono + Rajdhani, gold gradient header).

- [ ] Vite project setup (`/interfaces/pwa/`)
- [ ] Industrial dark aesthetic consistent with Forge HQ
- [ ] Chat interface (question → streamed answer)
- [ ] Source panel (cited vault files, clickable)
- [ ] Vault status bar (doc count, last indexed, server status)
- [ ] Search mode (semantic results without LLM)
- [ ] PWA manifest + service worker (installable to home screen)
- [ ] Telegram notification integration (index complete, errors)

**Deliverable:** Installed PWA on S24 Ultra. Ask vault questions from anywhere.
</details>

<details>
<summary><strong>Milestone 1.8 — Obsidian Plugin</strong> 📋 Not Started</summary>

- [ ] Plugin scaffold (Obsidian Plugin API)
- [ ] Command: `Ask Incybe` (opens query modal)
- [ ] Command: `Search vault semantically`
- [ ] Inline result display (answer in reading view)
- [ ] Settings tab (server URL, provider, K value)
- [ ] Ribbon icon + hotkey support

**Deliverable:** Ask questions without leaving Obsidian.
</details>

**Phase 1 Exit Criteria:**
- [ ] Full vault indexed and queryable via Ollama RAG
- [ ] Answers are accurate and cited against vault source files
- [ ] PWA installed and working on S24 Ultra via Termux
- [ ] Obsidian plugin functional
- [ ] Server running under PM2 with auto-restart
- [ ] Re-index triggers automatically on vault changes
- [ ] All LLM calls stay local (Ollama) unless explicitly overridden

---

## 🧹 Phase 2 — AI-Assisted Note Management
**Status: 📋 Planned**

The AI shifts from passive Q&A to active collaborator — but always with explicit user approval before touching anything.

> **Constraint:** No autonomous deletion or rewriting. Version history maintained for every AI-touched file. No exceptions.

<details>
<summary><strong>Milestone 2.1 — Safe Write System</strong> 📋 Not Started</summary>

- [ ] Version history for every file before AI modification
- [ ] Atomic write operations (write to temp → validate → replace)
- [ ] Diff generation (show exactly what changed)
- [ ] Rollback command (`incybe rollback <file>`)
- [ ] Change log (`/vault/.incybe/history/`)
- [ ] User confirmation gate — no write without approval

**Deliverable:** Nothing touches the vault without a safety net.
</details>

<details>
<summary><strong>Milestone 2.2 — Note Tidying Engine</strong> 📋 Not Started</summary>

- [ ] Heading hierarchy fixer (H1 → H2 → H3 enforcement)
- [ ] Consistent frontmatter formatter
- [ ] Trailing whitespace / empty line cleanup
- [ ] Broken wikilink detector
- [ ] Code block language tag suggester
- [ ] Batch tidy with approval queue

**Deliverable:** Clean, consistently formatted vault.
</details>

<details>
<summary><strong>Milestone 2.3 — Duplicate & Overlap Detection</strong> 📋 Not Started</summary>

- [ ] Semantic similarity scoring across all docs
- [ ] Duplicate candidate report (similarity > threshold)
- [ ] Overlap map (shared topics across different files)
- [ ] Merge suggestion engine
- [ ] Side-by-side diff view in PWA

**Deliverable:** Know exactly what's redundant before acting.
</details>

<details>
<summary><strong>Milestone 2.4 — Consolidation Engine</strong> 📋 Not Started</summary>

- [ ] Multi-note merge (AI synthesises into single coherent doc)
- [ ] Source attribution preserved in merged output
- [ ] User reviews merge before commit
- [ ] Original files archived (not deleted)
- [ ] Wikilink update propagation (links to merged files updated)

**Deliverable:** Turn scattered notes into clean, authoritative documents.
</details>

<details>
<summary><strong>Milestone 2.5 — Reorganisation Advisor</strong> 📋 Not Started</summary>

- [ ] Current folder/tag structure analyser
- [ ] AI-suggested folder taxonomy
- [ ] Tag normalisation (deduplicate/standardise tags)
- [ ] Move plan preview (what goes where)
- [ ] Batch move with wikilink repair

**Deliverable:** Vault that organises itself on request.
</details>

<details>
<summary><strong>Milestone 2.6 — Surface & Connect</strong> 📋 Not Started</summary>

- [ ] 'What's related to what I'm writing?' — real-time suggestions
- [ ] Forgotten note surfacer (relevant old notes for current context)
- [ ] Backlink gap detector (notes that should link but don't)

**Deliverable:** The vault starts talking back.
</details>

<details>
<summary><strong>Milestone 2.7 — Edit Proposal Mode</strong> 📋 Not Started</summary>

The LLM offers proposed edits in a stasis state — visible but not applied — awaiting user approval. Designed for mobile-friendly use on the S24 Ultra.

- [ ] LLM offers user a proposed new note
- [ ] LLM offers user the choice to proceed with the proposal
- [ ] LLM applies changes when requested
- [ ] Toggle proposal mode on/off
- [ ] Proposal text stays in stasis (pulsing opacity)
- [ ] Stasis visible toggle (optimised for phone use)

**Deliverable:** Intent-accurate edits with full user control.
</details>

**Phase 2 Exit Criteria:**
- [ ] Zero destructive actions without explicit user approval
- [ ] Rollback works reliably for every AI action
- [ ] Duplicate detection accuracy >90%
- [ ] Consolidation produces coherent, usable documents
- [ ] Reorganisation advisor tested on a real vault

---

## 🧠 Phase 3 — Intelligent File Manager
**Status: 📝 Planning**

Expand beyond Obsidian to all files, all types. Every file becomes semantically aware, searchable, and connected.

| Milestone | Description |
|-----------|-------------|
| 3.1 SCP Integration | Auto-generate `.scp.json` sidecars for every indexed file |
| 3.2 Universal File Indexer | PDF, DOCX, TXT, MD, code files — unified schema |
| 3.3 Semantic Search (Universal) | One search box. Everything findable. |
| 3.4 Relationship Mapper | Force-directed knowledge graph (Data Cube style) |
| 3.5 Change Intelligence | 'What changed this week?' digest via Telegram |
| 3.6 AI Categorisation Engine | Auto-tag new files. Inbox zero workflow. |

**Phase 3 Exit Criteria:**
- [ ] All major file types indexed and searchable
- [ ] SCP sidecars generated across full file system
- [ ] Relationship graph renders correctly for 1,000+ files
- [ ] Change digest delivered reliably via Telegram
- [ ] Categorisation accuracy >85% on user feedback

---

## 🧬 Phase 4 — inCybe OS
**Status: 🌐 Vision**

A fully AI-native operating system layer. Intentionally open-ended — the project evolves as earlier phases mature.

| Milestone | Description |
|-----------|-------------|
| 4.1 Natural Language Shell | Replace terminal commands with intent-based queries |
| 4.2 Autonomous Cleanup Agent | Archives, deduplicates, tidies on schedule |
| 4.3 Context-Aware Workflows | *"Prepare everything I need for project X"* |
| 4.4 Multi-Agent Architecture | Specialist agents running in parallel via Legion |
| 4.5 Plugin Ecosystem | Third-party intelligence modules |
| 4.6 Forge HQ Integration | inCybe as a panel inside the Forge HQ dashboard PWA |
| 4.7 BuddAI Deep Integration | BuddAI as the conversational layer over inCybe's knowledge |
| 4.8 IoT Mesh Awareness | ESP32-C3 node data feeds into the knowledge system |
| 4.9 AR / Spatial Interface | FORGE WORLD-style 3D navigation of the file graph |
| 4.10 Semantic FS Layer | OS-level file system driver with AI metadata baked in |

---

## Risk Register

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Embedding costs spiral | 🟢 Low | Incremental sync + `nomic-embed-text` is free |
| Vault corruption from bad write | 🟢 Low | Atomic writes + version history + rollback command |
| LLM hallucination in answers | 🟡 Medium | Vault-grounded prompts + citations always required |
| Ollama model quality gap | 🟡 Medium | Fallback chain to Claude/OpenAI via Legion |
| Scope creep into Phase 4 | 🔴 High | Phase exit criteria enforce discipline; phases are sequential |
| Supabase free tier limits | 🟡 Medium | Monitor usage; self-host pgvector via Termux if needed |
| Termux environment breaks | 🟢 Low | PM2 auto-restart; mirrors proven CCE & Forge HQ setup |

---

## Glossary

| Term | Definition |
|------|-----------|
| **SCP** | Semantic Capsule Protocol — Giblets Creations standard. JSON sidecar files making any file self-documenting for AI. Validated across 5 AI systems and 190+ repos. |
| **RAG** | Retrieval-Augmented Generation — grounding LLM answers in real source documents. |
| **pgvector** | Postgres extension for storing and querying vector embeddings. |
| **Chunk** | A segment of a document used for embedding (~300–500 tokens). |
| **K** | Number of top results returned by vector search (default 5). |
| **Wikilink** | Obsidian-style internal link: `[[Note Name]]`. |
| **Ollama** | Local LLM runner. Enables fully private, on-device inference. |
| **Legion** | Giblets Creations multi-LLM orchestration system (Claude, Gemini, DeepSeek, Ollama, OpenAI). |
| **Forge HQ** | Giblets Creations master dashboard PWA. Dark chrome aesthetic, S24 Ultra home screen. |
| **BuddAI** | Giblets Creations AI assistant platform. 279+ tests, ESP32 validated, `/teach` `/wrong` `/why` interface. |
| **PM2** | Node.js process manager. Used for CCE Crypto, Forge HQ, CCE-Cap signal, and all Giblets servers. |
| **Termux** | Android terminal emulator. Primary deployment environment on S24 Ultra. |

---

## Collaboration Guidelines

- **Simplicity is key** — working prototypes before architecture
- **Start small** — working prototypes first, always
- **Safety first** — no destructive actions without confirmation
- **Version control everything** — all AI-generated changes tracked
- **British English** — for all text, throughout
- **Commit often, merge frequently**
- **Boy Scout Rule** — leave it better than you found it
- **Leverage existing Giblets Creations tooling** before building new

---

<div align="center">

**inCybe · Giblets Creations · Roadmap v1.1 · March 2026**

*"I wanted it. So I forged it. Now forge yours."*

</div>

================================================================================
  inCybe — README
  Making tech simple
  Builder: Giblets Creations  |  Vision: Abe
  Roadmap v1.1  |  Updated: March 2026  |  Status: Phase 1 In Progress
================================================================================


────────────────────────────────────────────────────────────────────────────────
🌐  OVERVIEW
────────────────────────────────────────────────────────────────────────────────

inCybe is an ambitious, long-term project to build a fully local,
privacy-preserving knowledge engine that understands, organises, and evolves
your personal information, files, and apps — an OS that collaborates with the
user, organises itself, and evolves over time.

The project begins with small, achievable steps, each one building toward the
larger goal of a fully autonomous, intuitive environment. Built and maintained
by Giblets Creations with a mobile-first, privacy-first philosophy.


────────────────────────────────────────────────────────────────────────────────
🚀  PROJECT VISION
────────────────────────────────────────────────────────────────────────────────

inCybe aims to become:

  •  A semantic file system that understands meaning, not just filenames
  •  An AI-native OS layer capable of answering questions, reorganising
     information, and maintaining itself
  •  A knowledge environment where notes, documents, and files form a living,
     interconnected system
  •  A personal intelligence layer that learns how you think and adapts to
     your workflows

Core Principles
  •  Privacy by default — 100% local LLM usage (Ollama-first, no external
     calls required)
  •  Modular architecture — each component is independently deployable
  •  Extensible for future automation and multi-agent orchestration
  •  Simplicity — working prototypes before complexity
  •  British English throughout

Design Goals
  •  Fast semantic search and retrieval across all personal content
  •  Natural-language querying over your entire environment
  •  Safe write system — no destructive actions without explicit confirmation
  •  Automated tidying, merging, and restructuring on request
  •  Surface hidden relationships and insights
  •  Clean UI — Obsidian in Phases 1 & 2, Forge HQ PWA thereafter
  •  Keep everything local, lightweight, and transparent


────────────────────────────────────────────────────────────────────────────────
🛠️  TECH STACK
────────────────────────────────────────────────────────────────────────────────

The stack is drawn directly from the proven Giblets Creations toolchain —
every choice has prior art in CCE, Forge HQ, BuddAI, or Legion.

  Layer                  Choice
  ─────────────────────  ────────────────────────────────────────────────────
  LLM (local)            Ollama — privacy-first, runs on-device
                         Llama 3 / Mistral / Phi-3 as model targets
  LLM (remote)           Anthropic Claude, OpenAI, DeepSeek
                         via Legion multi-LLM router
  LLM Orchestration      Legion (Giblets Creations) — semantic capsule routing
                         across Claude, Gemini, DeepSeek, Ollama
  Embeddings             Local Ollama embedding models (nomic-embed-text)
                         Supabase pgvector as vector store
  Vector Store           Supabase pgvector — already in Giblets stack,
                         Postgres-native, proven
  Runtime                Node.js — builder's native environment
                         (~800 lines/hr with AI orchestration)
  Process Manager        PM2 — proven in CCE Crypto, Forge HQ,
                         CCE-Cap signal deployments
  Frontend               Vite PWA — installable, consistent with
                         Forge HQ dashboard aesthetic
  Mobile Target          Samsung S24 Ultra / Termux — primary dev device,
                         all deployments validated here
  Notifications          Telegram bot — proven in CCE deployment
                         (index complete, errors, digests)
  File Semantics         SCP (Semantic Capsule Protocol) — Giblets Creations
                         standard, validated across 5 AI systems
  Storage                Obsidian vault (Markdown) Phases 1–2
                         Local filesystem Phase 3+
  Safety Model           Confirm-before-write with atomic ops + version history
                         No exceptions Phases 1–3
  AI Assistant           BuddAI — Giblets Creations assistant platform,
                         conversational layer in Phase 4
  Dashboard              Forge HQ — master PWA dashboard,
                         Phase 4 inCybe panel target


================================================================================
🧱  PHASE 1 — LLM + OBSIDIAN INTEGRATION
Status: ⚙️  In Progress
================================================================================

Connect Ollama (local LLM) to an Obsidian vault and enable question-answering
grounded entirely in the vault's own content. This phase establishes the
knowledge layer that everything else builds upon.


────────────────────────────────────────────────────────────────────────────────
Milestone 1.1 — Project Scaffold                          📋  Not Started
────────────────────────────────────────────────────────────────────────────────

  ☐  Initialise monorepo (/incybe)
  ☐  Set up Node.js runtime with PM2 config (ecosystem.config.js)
  ☐  Configure environment (.env — Ollama base URL, Supabase URL/key)
  ☐  Create base folder structure (/core, /obsidian, /interfaces)
  ☐  Set up Git + .gitignore (never commit .env or vault content)
  ☐  Write base package.json with workspaces

  📦 Deliverable: Clean repo, runs without errors, environment confirmed.
                  PM2 config mirrors CCE deployment pattern.


────────────────────────────────────────────────────────────────────────────────
Milestone 1.2 — Vault Reader                              📋  Not Started
────────────────────────────────────────────────────────────────────────────────

  ☐  Recursive Markdown file scanner (/obsidian/reader/)
  ☐  Frontmatter parser (YAML metadata extraction)
  ☐  Wikilink resolver ([[Note Name]] → file path)
  ☐  Tag extractor (#tag detection)
  ☐  File change watcher (detect vault updates in real-time)
  ☐  Output: normalised document objects
     { id, path, title, content, tags, links, modified }

  📦 Deliverable: Feed any Obsidian vault path → get a clean structured
                  document array.


────────────────────────────────────────────────────────────────────────────────
Milestone 1.3 — Embedding Pipeline                        📋  Not Started
────────────────────────────────────────────────────────────────────────────────

  ☐  Supabase project setup (pgvector extension enabled)
  ☐  Create documents table
     (id, path, title, content, embedding, metadata, updated_at)
  ☐  Chunking strategy (sliding window, ~500 tokens, 50 token overlap)
  ☐  Embedding generation — Ollama nomic-embed-text (local, privacy-first)
  ☐  Upsert logic — only re-embed changed files via hash comparison
  ☐  Full vault indexing script (npm run index)
  ☐  Incremental sync — watch mode, index on file change

  📦 Deliverable: Full vault embedded and searchable in Supabase.
                  Re-index in <2s per changed file.


────────────────────────────────────────────────────────────────────────────────
Milestone 1.4 — LLM Abstraction Layer                     📋  Not Started
────────────────────────────────────────────────────────────────────────────────

  Privacy-first by design. Ollama is the default; cloud providers are opt-in
  via env var. Hooks into Legion for multi-model routing where needed.

  ☐  Provider interface definition (/core/llm/provider.js)
  ☐  Ollama adapter (local, privacy-first) — PRIMARY
  ☐  Anthropic Claude adapter — via Legion SCP routing
  ☐  OpenAI adapter
  ☐  DeepSeek adapter
  ☐  Provider config via .env (LLM_PROVIDER=ollama|claude|openai|deepseek)
  ☐  Fallback chain (primary fails → secondary)
  ☐  Token usage logging

  📦 Deliverable: Swap LLM provider with one env var. Identical interface
                  regardless of backend.


────────────────────────────────────────────────────────────────────────────────
Milestone 1.5 — RAG Query Engine                          📋  Not Started
────────────────────────────────────────────────────────────────────────────────

  ☐  Semantic search against Supabase pgvector
  ☐  Top-K retrieval (configurable, default K=5)
  ☐  Context assembly (chunks → prompt window)
  ☐  System prompt: vault-grounded answering only
  ☐  Source citation in responses (filename + excerpt)
  ☐  'No relevant content found' graceful fallback
  ☐  Conversation history support (multi-turn Q&A)

  📦 Deliverable: Ask a question → get a grounded answer with vault citations.


────────────────────────────────────────────────────────────────────────────────
Milestone 1.6 — Local API Server                          📋  Not Started
────────────────────────────────────────────────────────────────────────────────

  ☐  Express/Fastify server (/interfaces/server/)
  ☐  POST /query — ask a question
  ☐  GET /status — index health, doc count, last sync
  ☐  POST /reindex — trigger manual re-index
  ☐  GET /search?q= — raw semantic search (no LLM, just results)
  ☐  CORS config for PWA and plugin
  ☐  PM2 process entry (incybe-server)

  📦 Deliverable: Running local API. Curl-testable. PM2 managed.
                  Mirrors CCE API server pattern.


────────────────────────────────────────────────────────────────────────────────
Milestone 1.7 — Web UI / PWA                              📋  Not Started
────────────────────────────────────────────────────────────────────────────────

  Industrial dark chrome aesthetic — consistent with the Forge HQ dashboard
  (Oswald + Share Tech Mono + Rajdhani, gold gradient header).

  ☐  Vite project setup (/interfaces/pwa/)
  ☐  Industrial dark aesthetic consistent with Forge HQ
  ☐  Chat interface (question → streamed answer)
  ☐  Source panel (cited vault files, clickable)
  ☐  Vault status bar (doc count, last indexed, server status)
  ☐  Search mode (semantic results without LLM)
  ☐  PWA manifest + service worker (installable to home screen)
  ☐  Telegram notification integration (index complete, errors)

  📦 Deliverable: Installed PWA on S24 Ultra. Ask vault questions
                  from anywhere.


────────────────────────────────────────────────────────────────────────────────
Milestone 1.8 — Obsidian Plugin                           📋  Not Started
────────────────────────────────────────────────────────────────────────────────

  ☐  Plugin scaffold (Obsidian Plugin API)
  ☐  Command: 'Ask Incybe' (opens query modal)
  ☐  Command: 'Search vault semantically'
  ☐  Inline result display (answer in reading view)
  ☐  Settings tab (server URL, provider, K value)
  ☐  Ribbon icon
  ☐  Hotkey support

  📦 Deliverable: Ask questions without leaving Obsidian.


────────────────────────────────────────────────────────────────────────────────
Phase 1 Exit Criteria
────────────────────────────────────────────────────────────────────────────────

  ☐  Full vault indexed and queryable via Ollama RAG
  ☐  Answers are accurate and cited against vault source files
  ☐  PWA installed and working on S24 Ultra via Termux
  ☐  Obsidian plugin functional
  ☐  Server running under PM2 with auto-restart
  ☐  Re-index triggers automatically on vault changes
  ☐  All LLM calls stay local (Ollama) unless explicitly overridden


================================================================================
🧹  PHASE 2 — AI-ASSISTED NOTE MANAGEMENT
Status: 📋  Planned
================================================================================

Use the LLM to actively maintain and improve the Obsidian vault. The AI shifts
from passive Q&A to active collaborator — but always with the user's explicit
approval before touching anything.

Constraints:
  •  All proposed edits shown to user before application
  •  No autonomous deletion or rewriting without explicit confirmation
  •  Version history maintained for every AI-touched file


────────────────────────────────────────────────────────────────────────────────
Milestone 2.1 — Safe Write System                         📋  Not Started
────────────────────────────────────────────────────────────────────────────────

  ☐  Version history for every file before AI modification
  ☐  Atomic write operations (write to temp → validate → replace)
  ☐  Diff generation (show exactly what changed)
  ☐  Rollback command (incybe rollback <file>)
  ☐  Change log (/vault/.incybe/history/)
  ☐  User confirmation gate — no write without approval

  📦 Deliverable: Nothing touches the vault without a safety net.


────────────────────────────────────────────────────────────────────────────────
Milestone 2.2 — Note Tidying Engine                       📋  Not Started
────────────────────────────────────────────────────────────────────────────────

  ☐  Heading hierarchy fixer (H1 → H2 → H3 enforcement)
  ☐  Consistent frontmatter formatter
  ☐  Trailing whitespace / empty line cleanup
  ☐  Broken wikilink detector
  ☐  Code block language tag suggester
  ☐  Batch tidy with approval queue

  📦 Deliverable: Clean, consistently formatted vault.


────────────────────────────────────────────────────────────────────────────────
Milestone 2.3 — Duplicate & Overlap Detection             📋  Not Started
────────────────────────────────────────────────────────────────────────────────

  ☐  Semantic similarity scoring across all docs
  ☐  Duplicate candidate report (similarity > threshold)
  ☐  Overlap map (shared topics across different files)
  ☐  Merge suggestion engine
  ☐  Side-by-side diff view in PWA

  📦 Deliverable: Know exactly what's redundant before acting.


────────────────────────────────────────────────────────────────────────────────
Milestone 2.4 — Consolidation Engine                      📋  Not Started
────────────────────────────────────────────────────────────────────────────────

  ☐  Multi-note merge (AI synthesises into single coherent doc)
  ☐  Source attribution preserved in merged output
  ☐  User reviews merge before commit
  ☐  Original files archived (not deleted)
  ☐  Wikilink update propagation (links to merged files updated)

  📦 Deliverable: Turn scattered notes into clean, authoritative documents.


────────────────────────────────────────────────────────────────────────────────
Milestone 2.5 — Reorganisation Advisor                    📋  Not Started
────────────────────────────────────────────────────────────────────────────────

  ☐  Current folder/tag structure analyser
  ☐  AI-suggested folder taxonomy
  ☐  Tag normalisation (deduplicate/standardise tags)
  ☐  Move plan preview (what goes where)
  ☐  Batch move with wikilink repair

  📦 Deliverable: Vault that organises itself on request.


────────────────────────────────────────────────────────────────────────────────
Milestone 2.6 — Surface & Connect                         📋  Not Started
────────────────────────────────────────────────────────────────────────────────

  ☐  'What's related to what I'm writing?' — real-time suggestions
  ☐  Forgotten note surfacer (relevant old notes for current context)
  ☐  Backlink gap detector (notes that should link but don't)

  📦 Deliverable: The vault starts talking back.


────────────────────────────────────────────────────────────────────────────────
Milestone 2.7 — Edit Proposal Mode                        📋  Not Started
────────────────────────────────────────────────────────────────────────────────

  The LLM offers proposed edits in a stasis state — visible but not applied —
  awaiting user approval. Designed for mobile-friendly use on the S24 Ultra.

  ☐  LLM offers user proposed new note
  ☐  LLM offers user choice to proceed with note proposed
  ☐  LLM applies changes to note proposal when requested
  ☐  Toggle proposal mode off/on
  ☐  Proposal note text stays in stasis, visible with pulsing opacity
  ☐  Stasis visible toggle (especially for phone use)

  📦 Deliverable: Easier, intent-accurate edits with full user control.


────────────────────────────────────────────────────────────────────────────────
Phase 2 Exit Criteria
────────────────────────────────────────────────────────────────────────────────

  ☐  Zero destructive actions without explicit user approval
  ☐  Rollback works reliably for every AI action
  ☐  Duplicate detection accuracy >90%
  ☐  Consolidation produces coherent, usable documents
  ☐  Reorganisation advisor tested on real vault


================================================================================
🧠  PHASE 3 — INTELLIGENT FILE MANAGER PROTOTYPE
Status: 📝  Planning
================================================================================

Expand beyond Obsidian to all files, all types. This is where inCybe starts to
feel like a new kind of OS — every file becomes semantically aware, searchable,
and connected.


────────────────────────────────────────────────────────────────────────────────
Milestone 3.1 — SCP Integration                           📝  Planning
────────────────────────────────────────────────────────────────────────────────

  SCP (Semantic Capsule Protocol) is a Giblets Creations standard — JSON
  sidecar files that make any file self-documenting for AI. Already validated
  across 5 AI systems and 190+ repos.

  ☐  SCP engine ported into /core/scp/
  ☐  Auto-generate .scp.json sidecars for all indexed files
  ☐  Sidecar schema: { summary, tags, related, category, confidence }
  ☐  Sidecar update on file change
  ☐  SCP viewer in PWA (file → its semantic profile)

  📦 Deliverable: Every file becomes self-describing.


────────────────────────────────────────────────────────────────────────────────
Milestone 3.2 — Universal File Indexer                    📝  Planning
────────────────────────────────────────────────────────────────────────────────

  ☐  File type handlers: PDF, DOCX, TXT, MD, code files
  ☐  PDF text extraction (pdfjs / poppler)
  ☐  DOCX text extraction (mammoth)
  ☐  Code file semantic summarisation
  ☐  Image captioning pipeline (optional, Phase 3+)
  ☐  Unified document schema across all types

  📦 Deliverable: Ask questions about any file, not just Markdown.


────────────────────────────────────────────────────────────────────────────────
Milestone 3.3 — Semantic Search (Universal)               📝  Planning
────────────────────────────────────────────────────────────────────────────────

  ☐  Cross-type semantic search
  ☐  File type filters
  ☐  Date range filters
  ☐  'Find everything about X' — across all sources
  ☐  Ranked results with confidence scores

  📦 Deliverable: One search box. Everything findable.


────────────────────────────────────────────────────────────────────────────────
Milestone 3.4 — Relationship Mapper                       📝  Planning
────────────────────────────────────────────────────────────────────────────────

  Visual graph view inspired by the Data Cube / FORGE CUBE force-directed
  graph work already built under Giblets Creations.

  ☐  Cross-file link graph (semantic connections, not just wikilinks)
  ☐  Visual graph view in PWA (force-directed, Data Cube style)
  ☐  'What connects to this file?' panel
  ☐  Cluster detection (topic islands)
  ☐  Orphan detector (files with no connections)

  📦 Deliverable: See the shape of your knowledge.


────────────────────────────────────────────────────────────────────────────────
Milestone 3.5 — Change Intelligence                       📝  Planning
────────────────────────────────────────────────────────────────────────────────

  ☐  'What changed this week?' digest
  ☐  New file summary feed
  ☐  Modified file diff summaries
  ☐  AI-generated weekly report (Telegram delivery)
  ☐  Activity heatmap in PWA

  📦 Deliverable: The system tells you what happened while you were away.


────────────────────────────────────────────────────────────────────────────────
Milestone 3.6 — AI Categorisation Engine                  📝  Planning
────────────────────────────────────────────────────────────────────────────────

  ☐  Auto-tag new files on creation
  ☐  Category suggestion (project, reference, archive, inbox)
  ☐  Inbox zero workflow (untagged → suggested home)
  ☐  Confidence-gated auto-apply vs suggest
  ☐  User feedback loop (correct AI → improves future suggestions)

  📦 Deliverable: Files land where they belong.


────────────────────────────────────────────────────────────────────────────────
Phase 3 Exit Criteria
────────────────────────────────────────────────────────────────────────────────

  ☐  All major file types indexed and searchable
  ☐  SCP sidecars generated across full file system
  ☐  Relationship graph renders correctly for 1000+ files
  ☐  Change digest delivered reliably via Telegram
  ☐  Categorisation accuracy >85% on user feedback


================================================================================
🧬  PHASE 4 — INCYBE OS (LONG-TERM VISION)
Status: 🌐  Vision
================================================================================

A fully AI-native operating system layer. Intentionally open-ended — the
project evolves as the earlier phases mature. Phase 4 draws deeply from the
broader Giblets Creations platform ecosystem.

Aspirational Features:
  •  AI-driven file system that organises itself
  •  Natural-language interface for all system operations
  •  Autonomous cleanup, archiving, and optimisation
  •  Context-aware workflows ('prepare everything I need for project X')
  •  Multi-agent architecture for background tasks
  •  Plugin ecosystem for extending intelligence
  •  Potentially down to the binary / logic level — full semantic FS driver

Concept Milestones (Exploratory):

  Milestone    Description
  ───────────  ────────────────────────────────────────────────────────────
  4.1          Natural Language Shell
               Replace terminal commands with intent-based queries
  4.2          Autonomous Cleanup Agent
               Background agent: archives, deduplicates, tidies on schedule
  4.3          Context-Aware Workflows
               'Prepare everything I need for project X'
  4.4          Multi-Agent Architecture
               Specialist agents (indexer, cleaner, advisor, reporter)
               in parallel — Legion-backed
  4.5          Plugin Ecosystem
               Third-party intelligence modules
  4.6          Forge HQ Integration
               inCybe as a panel inside the Forge HQ dashboard PWA
  4.7          BuddAI Deep Integration
               BuddAI as the conversational layer over inCybe's knowledge base
  4.8          IoT Mesh Awareness
               ESP32-C3 node data feeds into the knowledge system
               (S24 Ultra as BLE hub)
  4.9          AR / Spatial Interface
               FORGE WORLD-style 3D navigation of the file graph
               (Three.js / WebXR)
  4.10         Semantic FS Layer
               OS-level file system driver with AI metadata baked in


================================================================================
⚙️  CROSS-PHASE TECHNICAL DECISIONS
================================================================================

  Decision               Choice                   Rationale
  ─────────────────────  ───────────────────────  ──────────────────────────────
  LLM (local)            Ollama                   Privacy-first; free;
                                                  no data leaves device
  LLM (remote)           Claude / OpenAI /        Opt-in via env var;
                         DeepSeek                 routed through Legion
  LLM orchestration      Legion (Giblets)         Already built; SCP routing
                                                  across 5 AI systems
  LLM abstraction        Custom router            Avoid vendor lock-in;
                                                  identical interface
  Vector store           Supabase pgvector        Already in stack;
                                                  Postgres-native
  Runtime                Node.js                  Builder's native environment
  Process manager        PM2                      Proven in CCE Crypto,
                                                  Forge HQ, CCE-Cap
  File semantics         SCP                      Already built; validated
                                                  across 5 AI systems
  Safety model           Confirm-before-write     No exceptions in Phases 1–3
  Mobile target          S24 Ultra / Termux       Primary dev device;
                                                  all deployments run here
  Frontend               Vite PWA                 Installable; consistent
                                                  with Forge HQ
  Notifications          Telegram                 Proven in CCE deployment
  AI assistant           BuddAI                   Giblets Creations platform;
                                                  Phase 4 integration
  Dashboard              Forge HQ                 Master PWA; Phase 4
                                                  inCybe panel target


================================================================================
⚠️  RISK REGISTER
================================================================================

  Risk                           Likelihood          Mitigation
  ─────────────────────────────  ──────────────────  ──────────────────────────
  Embedding costs spiral         Low (Ollama local)  Incremental sync +
                                                     Ollama nomic-embed-text
                                                     is free
  Vault corruption from          Low                 Atomic writes + version
  bad write                                          history; rollback command
  LLM hallucination in answers   Medium              Vault-grounded prompts +
                                                     source citations always
                                                     required
  Ollama model quality gap       Medium              Fallback chain to
                                                     Claude/OpenAI via Legion
                                                     if accuracy insufficient
  Scope creep into Phase 4       High                Phase exit criteria
  too early                                          enforce discipline;
                                                     phases are sequential
  Supabase free tier limits      Medium              Monitor usage; self-host
                                                     pgvector via Termux
                                                     if needed
  Termux environment breaks      Low                 PM2 auto-restart; mirrors
                                                     proven CCE & Forge HQ
                                                     setup


================================================================================
🧭  ROADMAP SUMMARY
================================================================================

  Phase                                              Status
  ─────────────────────────────────────────────────  ──────────────────────────
  🧱 Phase 1 — LLM + Obsidian Integration            ⚙️   In Progress
  🧹 Phase 2 — AI-Assisted Note Management           📋  Planned
  🧠 Phase 3 — Intelligent File Manager Prototype    📝  Planning
  🧬 Phase 4 — inCybe OS (AI-native OS layer)        🌐  Vision

  Phase 3 & 4 are modular and can be developed independently.
  Core phases are sequential.


================================================================================
📖  GLOSSARY
================================================================================

  Term        Definition
  ──────────  ────────────────────────────────────────────────────────────────
  SCP         Semantic Capsule Protocol — Giblets Creations standard JSON
              sidecar files making any file self-documenting for AI
  RAG         Retrieval-Augmented Generation — grounding LLM answers in real
              source documents
  pgvector    Postgres extension for storing and querying vector embeddings
  Chunk       A segment of a document used for embedding (~300–500 tokens)
  K           Number of top results returned by vector search (default 5)
  Wikilink    Obsidian-style internal link: [[Note Name]]
  Ollama      Local LLM runner — enables fully private, on-device inference
  Legion      Giblets Creations multi-LLM orchestration system
              (Claude, Gemini, DeepSeek, Ollama, OpenAI)
  Forge HQ    Giblets Creations master dashboard PWA
              (dark chrome aesthetic, S24 Ultra home screen)
  BuddAI      Giblets Creations AI assistant platform
              (279+ tests, ESP32 validated, /teach /wrong /why interface)
  PM2         Node.js process manager; used for CCE Crypto, Forge HQ,
              CCE-Cap signal, and all Giblets servers
  Termux      Android terminal emulator; primary deployment environment
              on S24 Ultra


================================================================================
🤝  COLLABORATION GUIDELINES
================================================================================

  •  Simplicity is key — working prototypes before architecture
  •  Keep communication clear and frequent
  •  Start small — working prototypes first
  •  Prioritise safety: no destructive actions without confirmation
  •  Maintain version control for all AI-generated changes
  •  British English for all text
  •  Commit often, merge frequently
  •  Boy Scout Rule — leave it better than you found it
  •  Leverage existing Giblets Creations tooling before building new


================================================================================
  inCybe  ·  Giblets Creations  ·  Roadmap v1.1  ·  March 2026
  "I wanted it. So I forged it. Now forge yours."
================================================================================

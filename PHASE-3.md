# 🧠 Phase 3 — Intelligent File Manager

[![Status](https://img.shields.io/badge/Status-Planning-lightgrey?style=flat-square&labelColor=0a0a0a)](.)
[![Phase](https://img.shields.io/badge/Phase-3%20of%204-blue?style=flat-square&labelColor=0a0a0a)](.)
[![Dependency](https://img.shields.io/badge/Requires-Phase%202%20Complete-orange?style=flat-square&labelColor=0a0a0a)](./PHASE-2.md)

> Expand beyond Obsidian to all files, all types. Every file becomes semantically aware, searchable, and connected. This is where inCybe starts to feel like a new kind of OS.

← [Phase 2](./PHASE-2.md) | [Back to README](./README.md) | Next: [Phase 4 →](./PHASE-4.md)

---

## Phase Overview

| Item | Detail |
|------|--------|
| **Goal** | Universal semantic file indexing, search, relationship mapping, and categorisation |
| **Prerequisite** | Phase 2 complete and confirmed |
| **New Capability** | All file types indexed — not just Markdown. SCP sidecars on everything. |
| **Safety Model** | Confirm-before-write inherited from Phase 2. No exceptions. |
| **Key Output** | One search box. Everything findable. The vault starts talking to the rest of your filesystem. |

---

## Milestones

| # | Milestone | Status |
|---|-----------|--------|
| 3.1 | SCP Integration | 📝 Planning |
| 3.2 | Universal File Indexer | 📝 Planning |
| 3.3 | Semantic Search (Universal) | 📝 Planning |
| 3.4 | Relationship Mapper | 📝 Planning |
| 3.5 | Change Intelligence | 📝 Planning |
| 3.6 | AI Categorisation Engine | 📝 Planning |

---

## Milestone 3.1 — SCP Integration

> **Goal:** Every file becomes self-describing.

> SCP (Semantic Capsule Protocol) is a Giblets Creations standard — JSON sidecar files that make any file self-documenting for AI. Already validated across 5 AI systems and 190+ repos.

### 🔨 Build Tasks

- [ ] Port SCP engine into `/core/scp/`
- [ ] Auto-generate `.scp.json` sidecar for every indexed file
- [ ] Define sidecar schema: `{ summary, tags, related, category, confidence, generatedAt, sourceHash }`
- [ ] Implement sidecar update on file change (hash comparison — only regenerate if content changed)
- [ ] Build SCP viewer in PWA — select any file, view its semantic profile
- [ ] Add SCP status indicator to PWA status bar (% of files with valid sidecars)

### 🧪 Tests

- [ ] SCP engine generates a valid `.scp.json` for a Markdown file
- [ ] SCP engine generates a valid `.scp.json` for a PDF file
- [ ] SCP engine generates a valid `.scp.json` for a code file (`.js`, `.py`)
- [ ] `summary` field is concise and accurate (manual review of 10 test files)
- [ ] `tags` field contains relevant, non-generic terms
- [ ] `confidence` field is a float between 0 and 1
- [ ] Sidecar updates when source file is modified (hash mismatch triggers regeneration)
- [ ] Sidecar does not update when source file is unchanged (hash match skips regeneration)
- [ ] PWA SCP viewer displays all sidecar fields clearly for a selected file
- [ ] SCP status bar shows correct percentage of sidecar-covered files
- [ ] `.scp.json` files excluded from vault indexing (not self-referentially indexed)

### ✅ Milestone 3.1 Confirmed

- [ ] Sidecars generated for 50+ files across at least 3 file types
- [ ] Summary and tag quality reviewed manually — assessed as useful
- [ ] Update logic confirmed: changed file → new sidecar; unchanged file → no regeneration
- [ ] PWA viewer tested on 5 file types — rendering correctly
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## Milestone 3.2 — Universal File Indexer

> **Goal:** Ask questions about any file, not just Markdown.

### 🔨 Build Tasks

- [ ] Build PDF text extraction handler (use `pdfjs` or `poppler`)
- [ ] Build DOCX text extraction handler (use `mammoth`)
- [ ] Build plain text (`.txt`) handler
- [ ] Build Markdown (`.md`) handler — port and extend from Phase 1 Vault Reader
- [ ] Build code file handler — extract content + generate semantic summary via LLM
- [ ] Define unified document schema across all file types: `{ id, path, type, title, content, summary, tags, modified }`
- [ ] Integrate all handlers into a single `indexFile(path)` function
- [ ] Update embedding pipeline to accept any indexed file type
- [ ] Update `npm run index` to recurse across the configured root directories, not just the vault

### 🧪 Tests

- [ ] PDF extraction: 5 test PDFs correctly converted to plain text (verify key phrases present)
- [ ] PDF extraction handles scanned/image-only PDFs gracefully (returns empty content, not crash)
- [ ] DOCX extraction: 5 test DOCX files correctly converted (headings, paragraphs, tables)
- [ ] TXT handler: plain text file indexed with correct content
- [ ] Code file handler: `.js` and `.py` files produce a meaningful semantic summary
- [ ] Unified schema validated for an output from each file type handler — no missing fields
- [ ] `indexFile(path)` correctly routes to the right handler based on file extension
- [ ] Unknown/unsupported file types return a clear skip message, not a crash
- [ ] `npm run index` indexes a mixed directory of all supported types without errors
- [ ] Indexed non-Markdown files are queryable via the RAG query engine from Phase 1

### ✅ Milestone 3.2 Confirmed

- [ ] All 5 file type handlers tested on real files — outputs reviewed
- [ ] Mixed-type directory indexed successfully via `npm run index`
- [ ] A PDF, DOCX, and code file are each queryable via the existing RAG engine
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## Milestone 3.3 — Semantic Search (Universal)

> **Goal:** One search box. Everything findable.

### 🔨 Build Tasks

- [ ] Extend semantic search to query across all indexed file types (not just Markdown)
- [ ] Implement file type filter — search within `pdf`, `docx`, `md`, `code`, or `all`
- [ ] Implement date range filter — `modified_after` and `modified_before` parameters
- [ ] Build "Find everything about X" — returns results ranked across all sources
- [ ] Add confidence scores to all search results
- [ ] Update PWA search mode to expose type and date filters

### 🧪 Tests

- [ ] Search query returns results from Markdown, PDF, and DOCX simultaneously
- [ ] File type filter `pdf` returns only PDF-sourced results
- [ ] File type filter `md` returns only Markdown-sourced results
- [ ] Date range filter correctly excludes files modified outside the specified range
- [ ] Confidence scores present and between 0–1 for all results
- [ ] "Find everything about X" returns ranked, cross-type results for 5 test queries
- [ ] Results ranked by semantic relevance — top result is the most relevant (manual check, 5 queries)
- [ ] PWA type filter and date filter controls work correctly on S24 Ultra
- [ ] Empty result set handled gracefully — clear "nothing found" message, not an empty render

### ✅ Milestone 3.3 Confirmed

- [ ] 10 cross-type queries run — results confirmed relevant and correctly filtered
- [ ] Ranking quality reviewed — top results are consistently the most semantically relevant
- [ ] PWA filter controls tested on S24 Ultra — usable on mobile
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## Milestone 3.4 — Relationship Mapper

> **Goal:** See the shape of your knowledge.

> Visual graph view inspired by the Data Cube / FORGE CUBE force-directed graph work already built under Giblets Creations.

### 🔨 Build Tasks

- [ ] Build cross-file semantic link graph — connections based on embedding similarity, not just wikilinks
- [ ] Implement force-directed graph view in PWA (Data Cube / FORGE CUBE aesthetic)
- [ ] Build "What connects to this file?" panel — click a node, see its connections
- [ ] Implement cluster detection — group semantically related files into topic islands
- [ ] Build orphan detector — highlight files with no semantic connections

### 🧪 Tests

- [ ] Graph renders for a 50-file test set without performance issues (target <3s load)
- [ ] Graph renders for a 200-file test set (target <8s load)
- [ ] Node connections reflect genuine semantic relationships (manual review of 10 connections)
- [ ] Nodes that are wikilinked are also connected in the graph (wikilinks respected)
- [ ] Clicking a node opens the "What connects to this file?" panel correctly
- [ ] Panel shows top 5 related files with similarity scores
- [ ] Cluster detection groups recognisably related files together (manual validation on test vault)
- [ ] Orphan detection flags files with zero connections — list accessible in PWA
- [ ] Graph is navigable on S24 Ultra (pinch zoom, pan, tap-to-select)
- [ ] Graph updates when a new file is indexed (node appears without full reload)

### ✅ Milestone 3.4 Confirmed

- [ ] Graph loaded and reviewed on a 100+ file vault — rendering correctly
- [ ] Cluster groupings validated as semantically meaningful
- [ ] Orphan list reviewed — all flagged files confirmed as genuinely isolated
- [ ] Graph navigable on S24 Ultra — usable on mobile
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## Milestone 3.5 — Change Intelligence

> **Goal:** The system tells you what happened while you were away.

### 🔨 Build Tasks

- [ ] Build "What changed this week?" digest — summary of new and modified files
- [ ] Build new file summary feed — AI-generated one-liner for each new file
- [ ] Build modified file diff summaries — brief natural language description of what changed
- [ ] Build AI-generated weekly report — delivered via Telegram on schedule
- [ ] Build activity heatmap in PWA — visual of file activity over time

### 🧪 Tests

- [ ] "What changed this week?" query returns a correctly scoped result set (new + modified files, correct date range)
- [ ] New file summary feed shows one-liner summaries for 5 test new files — summaries are accurate
- [ ] Modified file diff summaries correctly describe what changed (manual review of 3 test edits)
- [ ] Telegram weekly report delivered at the scheduled time
- [ ] Telegram report contains correct counts (files added, modified, unchanged)
- [ ] Telegram report is readable and concise on a mobile screen
- [ ] Activity heatmap renders correctly in PWA for a 30-day activity window
- [ ] Heatmap correctly represents high-activity and low-activity periods

### ✅ Milestone 3.5 Confirmed

- [ ] Digest tested across a real week of vault activity — output reviewed as accurate
- [ ] Telegram report received and reviewed — content confirmed correct
- [ ] Activity heatmap tested on 30+ days of data — rendering correctly
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## Milestone 3.6 — AI Categorisation Engine

> **Goal:** Files land where they belong.

### 🔨 Build Tasks

- [ ] Build auto-tagger — generates relevant tags for newly created or imported files
- [ ] Build category suggester — assigns files to: `project`, `reference`, `archive`, or `inbox`
- [ ] Build inbox zero workflow — presents untagged/uncategorised files with suggested homes
- [ ] Implement confidence-gated behaviour — high confidence (>0.90) auto-applies; lower confidence presents suggestion for approval
- [ ] Build user feedback loop — user corrections fed back to improve future suggestions

### 🧪 Tests

- [ ] Auto-tagger generates relevant tags for 10 test files across different types
- [ ] Tags are specific and non-generic (e.g. `#esp32` not `#technology`)
- [ ] Category suggester correctly categorises 10 test files (manual validation)
- [ ] High-confidence tags (>0.90) applied automatically without prompting user
- [ ] Low-confidence tags (<0.90) presented to user as suggestions before application
- [ ] Inbox zero workflow presents all untagged files in the PWA clearly
- [ ] Inbox zero workflow allows individual approval, rejection, and custom override
- [ ] User correction recorded — corrected tag/category stored for future inference
- [ ] After 5 corrections, subsequent suggestions for similar files reflect the corrections
- [ ] Safe Write System (2.1) invoked for any tag auto-applied to a file

### ✅ Milestone 3.6 Confirmed

- [ ] Auto-tagging tested on 20+ real files — tag quality reviewed as useful
- [ ] Confidence gating confirmed: auto-apply vs. suggest behaviour verified
- [ ] Feedback loop tested across 5 corrections — improved suggestions observed
- [ ] Inbox zero workflow tested end-to-end on 10 untagged files
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## ✅ Phase 3 Exit — Final Confirmation

> All milestones must be individually confirmed before Phase 3 is marked complete.

### Milestone Sign-offs

- [ ] **3.1** SCP Integration — confirmed
- [ ] **3.2** Universal File Indexer — confirmed
- [ ] **3.3** Semantic Search (Universal) — confirmed
- [ ] **3.4** Relationship Mapper — confirmed
- [ ] **3.5** Change Intelligence — confirmed
- [ ] **3.6** AI Categorisation Engine — confirmed

### Integration Tests

- [ ] New PDF dropped into watched directory → auto-indexed → sidecar generated → queryable via PWA within 30 seconds
- [ ] Cross-type search: query returns results from Markdown, PDF, and code files simultaneously
- [ ] Relationship graph: new file indexed → node appears in graph → connected to related files
- [ ] Weekly Telegram digest delivered with accurate counts for a real week of activity
- [ ] Inbox zero: 10 new untagged files → categorisation engine processes all → user approves → tags applied → snapshots confirmed
- [ ] "Find everything about X" query returns relevant results across all file types

### Phase Exit Criteria

- [ ] All major file types (MD, PDF, DOCX, TXT, code) indexed and searchable
- [ ] SCP sidecars generated across all indexed files
- [ ] Relationship graph renders correctly for 1,000+ files (performance validated)
- [ ] Change digest delivered reliably via Telegram across 2 consecutive weeks
- [ ] Categorisation accuracy >85% validated on a representative test set
- [ ] Safe Write System confirmed active for every write operation in Phase 3

### Phase 3 Sign-off

> Phase 3 is complete and Phase 4 planning may begin.

- [ ] **Confirmed by:** _________________
- [ ] **Date:** _________________
- [ ] **Notes:** _________________

---

← [Phase 2](./PHASE-2.md) | [Back to README](./README.md) | Next: [Phase 4 →](./PHASE-4.md)

---

<div align="center">

**inCybe · Giblets Creations · Phase 3 · Roadmap v1.1**

*"I wanted it. So I forged it. Now forge yours."*

</div>

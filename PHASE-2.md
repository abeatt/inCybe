# 🧹 Phase 2 — AI-Assisted Note Management

[![Status](https://img.shields.io/badge/Status-Planned-lightgrey?style=flat-square&labelColor=0a0a0a)](.)
[![Phase](https://img.shields.io/badge/Phase-2%20of%204-blue?style=flat-square&labelColor=0a0a0a)](.)
[![Dependency](https://img.shields.io/badge/Requires-Phase%201%20Complete-orange?style=flat-square&labelColor=0a0a0a)](./PHASE-1.md)

> The AI shifts from passive Q&A to active collaborator — maintaining and improving the vault, but always with explicit user approval before touching anything.

← [Phase 1](./PHASE-1.md) | [Back to README](./README.md) | Next: [Phase 3 →](./PHASE-3.md)

---

## ⚠️ Safety Contract

> This is the non-negotiable constraint that governs every milestone in Phase 2.

- **No autonomous deletion or rewriting** — ever
- **Every proposed change shown to user before application**
- **Version history maintained for every AI-touched file**
- **Rollback available for every AI action**

Violating these constraints is a bug, not a feature request.

---

## Phase Overview

| Item | Detail |
|------|--------|
| **Goal** | AI-assisted vault maintenance with full user control and rollback |
| **Prerequisite** | Phase 1 complete and confirmed |
| **Safety Model** | Confirm-before-write, atomic ops, version history |
| **New Capability** | AI proposes → user approves → system executes |

---

## Milestones

| # | Milestone | Status |
|---|-----------|--------|
| 2.1 | Safe Write System | 📋 Not Started |
| 2.2 | Note Tidying Engine | 📋 Not Started |
| 2.3 | Duplicate & Overlap Detection | 📋 Not Started |
| 2.4 | Consolidation Engine | 📋 Not Started |
| 2.5 | Reorganisation Advisor | 📋 Not Started |
| 2.6 | Surface & Connect | 📋 Not Started |
| 2.7 | Edit Proposal Mode | 📋 Not Started |

> **Note:** Milestone 2.1 (Safe Write System) must be completed and confirmed before any other Phase 2 milestone begins. It is the safety net for all that follows.

---

## Milestone 2.1 — Safe Write System

> **Goal:** Nothing touches the vault without a safety net.

> ⚠️ **This milestone gates all others in Phase 2.** Do not proceed to 2.2+ until 2.1 is confirmed.

### 🔨 Build Tasks

- [ ] Implement version history — snapshot every file before any AI modification
- [ ] Version snapshots stored at `/vault/.incybe/history/<filename>/<timestamp>.md`
- [ ] Build atomic write operations — write to temp file → validate → replace original
- [ ] Implement diff generation — produce a human-readable diff of every proposed change
- [ ] Build rollback command: `incybe rollback <filename>` restores the previous version
- [ ] Build change log — every AI action recorded at `/vault/.incybe/changelog.json`
- [ ] Implement user confirmation gate — no write executes without explicit `y` / approve

### 🧪 Tests

- [ ] Modify a test file via the system — confirm snapshot created in `/history/` before write
- [ ] Snapshot filename includes correct timestamp format
- [ ] Atomic write: simulate a failed write mid-operation — confirm original file is intact
- [ ] Diff output is human-readable and accurately reflects what changed
- [ ] `incybe rollback <filename>` restores previous version exactly (byte-for-byte comparison)
- [ ] Rollback of a rollback works correctly (can step back multiple versions)
- [ ] Change log entry created for every AI action (action type, file, timestamp)
- [ ] Confirmation gate: answer `n` → no file is written, no snapshot created
- [ ] Confirmation gate: answer `y` → write proceeds, snapshot and log entry created
- [ ] System handles vault path with spaces and special characters without breaking

### ✅ Milestone 2.1 Confirmed

- [ ] Snapshot created and verified for a test file modification
- [ ] Atomic write tested — no partial writes observed on simulated failure
- [ ] Rollback confirmed working across 3 sequential versions of a test file
- [ ] Change log entries verified for 5 test actions
- [ ] Confirmation gate tested — `n` produces zero file changes
- [ ] **⚠️ Gate Sign-off:** Phase 2 milestones 2.2–2.7 are blocked until this is signed. Confirmed by _________________ on _________________

---

## Milestone 2.2 — Note Tidying Engine

> **Goal:** Clean, consistently formatted vault — proposed by AI, approved by user.

### 🔨 Build Tasks

- [ ] Build heading hierarchy fixer (enforce H1 → H2 → H3 nesting rules)
- [ ] Build consistent frontmatter formatter (key order, quoting, spacing)
- [ ] Build trailing whitespace and empty line cleaner
- [ ] Build broken wikilink detector (flag links pointing to non-existent notes)
- [ ] Build code block language tag suggester (detect untagged code blocks and suggest language)
- [ ] Implement batch tidy mode — queue all proposed changes for single approval pass

### 🧪 Tests

- [ ] Heading fixer correctly restructures a test note with broken hierarchy (e.g. H1 → H3 skip)
- [ ] Frontmatter formatter produces consistent output across 10 test notes with varying formats
- [ ] Whitespace cleaner removes trailing spaces and excess blank lines without touching content
- [ ] Broken wikilink detector identifies all invalid links in a 50-note test vault
- [ ] Broken wikilink detector produces zero false positives (valid links not flagged)
- [ ] Code block suggester correctly identifies at least 3 common languages (js, python, bash)
- [ ] All proposed changes shown to user as diffs before application
- [ ] Batch approval queue displays all pending changes and allows selective approval
- [ ] Rejecting one item in the batch does not affect others
- [ ] Safe Write System (2.1) invoked for every applied tidy action — snapshot confirmed

### ✅ Milestone 2.2 Confirmed

- [ ] Heading fix, frontmatter format, whitespace clean tested on real vault files
- [ ] Broken wikilink report generated for full test vault with zero false positives
- [ ] Batch tidy run on 10+ files — selective approval working
- [ ] Every applied change confirmed to have a snapshot in `/history/`
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## Milestone 2.3 — Duplicate & Overlap Detection

> **Goal:** Know exactly what's redundant before acting.

### 🔨 Build Tasks

- [ ] Build semantic similarity scoring across all embedded vault documents
- [ ] Implement duplicate candidate report (configurable similarity threshold, default 0.92)
- [ ] Build overlap map — identify shared topics across different files above a lower threshold (default 0.75)
- [ ] Build merge suggestion engine — pair duplicates/overlaps with recommended action
- [ ] Build side-by-side diff view in PWA — compare two notes before deciding

### 🧪 Tests

- [ ] Similarity scoring produces expected results on known-duplicate test note pairs
- [ ] Similarity scoring correctly does not flag clearly unrelated notes as duplicates
- [ ] Duplicate report generated for a 50-note vault — results reviewed for accuracy
- [ ] Threshold adjustment (e.g. 0.85 vs 0.95) produces meaningfully different result sets
- [ ] Overlap map identifies cross-topic connections not visible via wikilinks alone
- [ ] Merge suggestion engine produces coherent recommendations for 5 test pairs
- [ ] PWA side-by-side diff view renders two notes clearly on S24 Ultra screen
- [ ] Diff view highlights differences — does not require user to spot them manually

### ✅ Milestone 2.3 Confirmed

- [ ] Duplicate detection accuracy validated on a test set with known duplicates (>90% accuracy)
- [ ] Overlap map reviewed and confirmed useful on a real vault
- [ ] PWA side-by-side view tested on S24 Ultra — readable and functional
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## Milestone 2.4 — Consolidation Engine

> **Goal:** Turn scattered notes into clean, authoritative documents.

### 🔨 Build Tasks

- [ ] Build multi-note merge — LLM synthesises selected notes into a single coherent document
- [ ] Preserve source attribution in merged output (which content came from which note)
- [ ] Build pre-merge review — user sees the proposed merged document before commit
- [ ] Archive original files on merge (move to `/vault/.incybe/archive/`, do not delete)
- [ ] Implement wikilink update propagation — links pointing to merged files updated automatically

### 🧪 Tests

- [ ] Merge of 2 related test notes produces a coherent, readable output
- [ ] Merge of 4 related test notes produces a coherent, readable output
- [ ] Source attribution present in merged document (comments or footnotes)
- [ ] Pre-merge review shows full proposed output before any file is written
- [ ] Declining merge at review stage leaves all original files intact
- [ ] Accepting merge archives originals at correct path — not deleted
- [ ] Archived files recoverable from `/vault/.incybe/archive/`
- [ ] Wikilinks to merged notes updated in all referencing files
- [ ] No wikilinks broken after a merge operation
- [ ] Safe Write System (2.1) invoked for merge and wikilink updates

### ✅ Milestone 2.4 Confirmed

- [ ] 3 successful merges completed on real vault content — outputs reviewed as usable
- [ ] Original files confirmed archived, not deleted
- [ ] Wikilink updates verified across 3+ referencing files post-merge
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## Milestone 2.5 — Reorganisation Advisor

> **Goal:** Vault that organises itself on request.

### 🔨 Build Tasks

- [ ] Build current folder and tag structure analyser — produce summary of existing organisation
- [ ] Build AI-suggested folder taxonomy based on vault content
- [ ] Build tag normalisation — deduplicate and standardise tags (e.g. `#ai` and `#AI` → `#ai`)
- [ ] Build move plan preview — show proposed file moves before executing
- [ ] Implement batch move with automatic wikilink repair

### 🧪 Tests

- [ ] Structure analyser produces accurate summary of a 50-note test vault (folder counts, tag counts, depth)
- [ ] AI taxonomy suggestion is coherent and relevant to actual vault content
- [ ] Tag normalisation correctly deduplicates case variants across 20 test tags
- [ ] Tag normalisation does not merge semantically distinct tags (e.g. `#python` ≠ `#py`)
- [ ] Move plan preview shows every proposed file move before execution
- [ ] User can selectively exclude files from the move plan
- [ ] Batch move executes correctly — files appear at new paths
- [ ] Wikilinks repaired automatically — no broken links after batch move
- [ ] Safe Write System (2.1) invoked for every moved file

### ✅ Milestone 2.5 Confirmed

- [ ] Reorganisation tested on a real vault section — outcome reviewed as sensible
- [ ] Tag normalisation run on full vault — no false merges observed
- [ ] Post-move wikilink check confirms zero broken links
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## Milestone 2.6 — Surface & Connect

> **Goal:** The vault starts talking back.

### 🔨 Build Tasks

- [ ] Build "What's related to what I'm writing?" — real-time semantic suggestions based on active note
- [ ] Build forgotten note surfacer — surface semantically relevant old notes given a current query or context
- [ ] Build backlink gap detector — identify notes that are semantically related but not wikilinked

### 🧪 Tests

- [ ] Related note suggestions appear for an active test note within 3 seconds
- [ ] Suggestions are semantically relevant (manual review of 10 test cases)
- [ ] Forgotten note surfacer returns notes not visited in 30+ days but relevant to current context
- [ ] Backlink gap detector identifies at least 3 genuine missing links in a test vault
- [ ] Backlink gap detector produces zero false positives on clearly unrelated note pairs
- [ ] Suggestions panel visible in PWA without obstructing main chat/search interface

### ✅ Milestone 2.6 Confirmed

- [ ] Related suggestions tested in 10 live note contexts — results reviewed as useful
- [ ] Forgotten note surfacer tested against a vault with intentionally buried notes
- [ ] Backlink gap detector validated on a known test set
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## Milestone 2.7 — Edit Proposal Mode

> **Goal:** Intent-accurate edits with full user control. Optimised for S24 Ultra.

> The LLM proposes edits in a stasis state — visible, not applied — awaiting user approval.

### 🔨 Build Tasks

- [ ] Build LLM-generated note proposal — AI drafts a proposed new or edited note
- [ ] Build proposal UI — proposed text displayed with pulsing opacity (stasis state)
- [ ] Build choice gate — user explicitly chooses to proceed, modify, or discard the proposal
- [ ] Build apply action — proposal applied to note only on user confirmation
- [ ] Implement proposal mode toggle — on/off switch accessible in PWA and plugin
- [ ] Implement stasis visibility toggle — show/hide the proposal overlay (especially for phone use)

### 🧪 Tests

- [ ] LLM generates a coherent proposed note for 3 different request types (new note, edit, merge)
- [ ] Proposal displayed with pulsing opacity — visually distinct from accepted content
- [ ] Discarding a proposal leaves the original note completely unchanged
- [ ] Accepting a proposal writes the content and creates a snapshot via Safe Write System (2.1)
- [ ] Modifying a proposal (requesting a revision) produces an updated stasis state
- [ ] Proposal mode toggle correctly enables and disables the feature
- [ ] Stasis visibility toggle works on S24 Ultra — proposal hides/shows on tap
- [ ] Proposal mode functional via Obsidian plugin (not just PWA)
- [ ] Long proposals scroll correctly on S24 Ultra without UI breakage

### ✅ Milestone 2.7 Confirmed

- [ ] Proposal → discard cycle tested — no files modified
- [ ] Proposal → accept cycle tested — file written, snapshot confirmed
- [ ] Proposal → revise → accept cycle tested end-to-end
- [ ] Stasis toggle verified on S24 Ultra in both PWA and plugin
- [ ] **Sign-off:** Confirmed by _________________ on _________________

---

## ✅ Phase 2 Exit — Final Confirmation

> All milestones must be individually confirmed before Phase 2 is marked complete.

### Milestone Sign-offs

- [ ] **2.1** Safe Write System — confirmed *(required before all others)*
- [ ] **2.2** Note Tidying Engine — confirmed
- [ ] **2.3** Duplicate & Overlap Detection — confirmed
- [ ] **2.4** Consolidation Engine — confirmed
- [ ] **2.5** Reorganisation Advisor — confirmed
- [ ] **2.6** Surface & Connect — confirmed
- [ ] **2.7** Edit Proposal Mode — confirmed

### Integration Tests

- [ ] Full tidy cycle: AI proposes → user reviews diff → user approves → file tidied → snapshot exists
- [ ] Full merge cycle: duplicates detected → merge proposed → user reviews → merge applied → originals archived → wikilinks updated
- [ ] Full reorganisation cycle: structure analysed → taxonomy proposed → moves previewed → approved → executed → zero broken links
- [ ] Edit Proposal Mode: proposal generated → modified → accepted → snapshot confirmed
- [ ] Rollback tested end-to-end: AI action applied → `incybe rollback` → original file restored
- [ ] All Phase 2 features functional via both PWA and Obsidian plugin

### Phase Exit Criteria

- [ ] Zero destructive actions occurred without explicit user approval throughout all Phase 2 testing
- [ ] Rollback tested and confirmed working for every type of AI action
- [ ] Duplicate detection accuracy >90% on test set
- [ ] Consolidation produces coherent, usable documents — confirmed by human review
- [ ] Reorganisation advisor tested on a real vault — outcome reviewed as sensible
- [ ] Safe Write System confirmed active for every write operation in Phase 2

### Phase 2 Sign-off

> Phase 2 is complete and Phase 3 may begin.

- [ ] **Confirmed by:** _________________
- [ ] **Date:** _________________
- [ ] **Notes:** _________________

---

← [Phase 1](./PHASE-1.md) | [Back to README](./README.md) | Next: [Phase 3 →](./PHASE-3.md)

---

<div align="center">

**inCybe · Giblets Creations · Phase 2 · Roadmap v1.1**

*"I wanted it. So I forged it. Now forge yours."*

</div>

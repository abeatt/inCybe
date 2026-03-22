# 🧬 Phase 4 — inCybe OS

[![Status](https://img.shields.io/badge/Status-Vision-blueviolet?style=flat-square&labelColor=0a0a0a)](.)
[![Phase](https://img.shields.io/badge/Phase-4%20of%204-blue?style=flat-square&labelColor=0a0a0a)](.)
[![Dependency](https://img.shields.io/badge/Requires-Phase%203%20Complete-orange?style=flat-square&labelColor=0a0a0a)](./PHASE-3.md)

> A fully AI-native operating system layer. Intentionally open-ended — the project evolves as the earlier phases mature. Phase 4 draws deeply from the broader Giblets Creations platform ecosystem.

← [Phase 3](./PHASE-3.md) | [Back to README](./README.md)

---

## Phase Overview

Phase 4 is not a fixed specification. It is a **directional vision** — a set of aspirational capabilities that will be refined, scoped, and planned once Phase 3 is complete. The milestones listed here are exploratory. Each will require a planning pass before development begins.

> **Rule:** No Phase 4 milestone moves to active development without its own planning sign-off (see end of each milestone stub).

| Item | Detail |
|------|--------|
| **Goal** | A fully AI-native OS layer — every file, every app, every workflow semantically aware |
| **Prerequisite** | Phase 3 complete and confirmed |
| **Architecture** | Multi-agent, Legion-backed, Forge HQ integrated |
| **Philosophy** | The system knows what you need before you ask |

---

## Milestones

| # | Milestone | Status |
|---|-----------|--------|
| 4.1 | Natural Language Shell | 🌐 Vision |
| 4.2 | Autonomous Cleanup Agent | 🌐 Vision |
| 4.3 | Context-Aware Workflows | 🌐 Vision |
| 4.4 | Multi-Agent Architecture | 🌐 Vision |
| 4.5 | Plugin Ecosystem | 🌐 Vision |
| 4.6 | Forge HQ Integration | 🌐 Vision |
| 4.7 | BuddAI Deep Integration | 🌐 Vision |
| 4.8 | IoT Mesh Awareness | 🌐 Vision |
| 4.9 | AR / Spatial Interface | 🌐 Vision |
| 4.10 | Semantic FS Layer | 🌐 Vision |

---

## Milestone 4.1 — Natural Language Shell

> Replace terminal commands with intent-based queries.

**Concept:** Instead of `ls -la | grep .md`, ask: *"Show me every Markdown file modified in the last 3 days."* inCybe translates intent to action, confirms with the user, and executes.

**Design Constraints:**
- Every proposed command shown to user before execution
- Destructive operations require double confirmation
- Full audit log of every shell action taken

### Planning Checklist

- [ ] Define scope: which shell operations are in scope for Phase 4.1?
- [ ] Identify safety boundaries — what is inCybe never allowed to execute without explicit user input?
- [ ] Review Legion routing architecture for suitability as the NL → command translation layer
- [ ] Prototype NL → shell command mapping on 10 common use cases
- [ ] Define confirmation UX for destructive vs non-destructive commands

### Planning Sign-off

- [ ] Scope defined and agreed
- [ ] Safety boundaries documented
- [ ] **Ready for development planning:** Confirmed by _________________ on _________________

---

## Milestone 4.2 — Autonomous Cleanup Agent

> Background agent: archives, deduplicates, tidies on schedule — without user intervention for safe operations.

**Concept:** A continuously running agent that monitors the file system, identifies candidates for archiving, deduplication, and tidying, and acts autonomously on low-risk operations (e.g. whitespace cleanup) while queuing higher-risk operations for user review.

**Design Constraints:**
- Autonomous action only permitted for explicitly whitelisted, reversible operations
- All actions logged with full rollback capability (inherits Phase 2 Safe Write System)
- User can pause/resume the agent at any time
- Weekly summary of all autonomous actions sent via Telegram

### Planning Checklist

- [ ] Define the whitelist of autonomous (no-confirmation-needed) operations
- [ ] Define the escalation list of operations that always require user confirmation
- [ ] Design agent scheduling — cron-based vs event-driven vs hybrid
- [ ] Design the weekly summary report format
- [ ] Review PM2 deployment pattern for long-running background agent
- [ ] Define agent pause/resume controls in Forge HQ panel

### Planning Sign-off

- [ ] Autonomous operation whitelist agreed and documented
- [ ] Agent scheduling approach decided
- [ ] **Ready for development planning:** Confirmed by _________________ on _________________

---

## Milestone 4.3 — Context-Aware Workflows

> *"Prepare everything I need for project X."*

**Concept:** inCybe understands project context — which files, notes, tools, and data sources belong to a given project — and can prepare a workspace, surface relevant recent changes, and brief the user on project status on demand.

**Design Constraints:**
- Project context is defined by the user, not inferred autonomously
- No files moved or modified as part of workflow preparation without confirmation
- Workflow output is a briefing, not an action — user decides what happens next

### Planning Checklist

- [ ] Define the project context model — how does a user define a project to inCybe?
- [ ] Design the workspace preparation output format (briefing document, file list, summary)
- [ ] Identify integration points with Forge HQ dashboard for project switching
- [ ] Prototype a project briefing for 3 real Giblets Creations projects
- [ ] Define how inCybe handles projects that span multiple file types and locations

### Planning Sign-off

- [ ] Project context model defined
- [ ] Workflow output format agreed
- [ ] **Ready for development planning:** Confirmed by _________________ on _________________

---

## Milestone 4.4 — Multi-Agent Architecture

> Specialist agents running in parallel via Legion — indexer, cleaner, advisor, reporter.

**Concept:** Break inCybe's capabilities into specialist agents, each running as an independent Legion-routed process. Agents share a common state store and communicate via a lightweight message bus.

**Agents (proposed):**
| Agent | Role |
|-------|------|
| Indexer | Continuous file system monitoring and embedding |
| Cleaner | Safe, scheduled tidying and deduplication |
| Advisor | Surfaces recommendations — related notes, backlink gaps, reorganisation |
| Reporter | Change intelligence, digests, Telegram delivery |
| Archivist | Long-term storage decisions and archiving |

**Design Constraints:**
- Each agent independently restartable via PM2
- Agents never act on the same file simultaneously (locking mechanism required)
- All agents respect the Phase 2 Safe Write System

### Planning Checklist

- [ ] Review Legion's current multi-agent capabilities and routing model
- [ ] Define inter-agent message format (extend SCP or define new protocol)
- [ ] Design file locking mechanism to prevent concurrent writes
- [ ] Define agent failure handling — what happens when one agent crashes?
- [ ] Map each Phase 1–3 capability to its target agent
- [ ] Design agent health dashboard panel for Forge HQ

### Planning Sign-off

- [ ] Agent architecture agreed and documented
- [ ] Legion integration approach confirmed
- [ ] **Ready for development planning:** Confirmed by _________________ on _________________

---

## Milestone 4.5 — Plugin Ecosystem

> Third-party intelligence modules that extend inCybe's capabilities.

**Concept:** A defined plugin interface that allows new intelligence modules to be added to inCybe — custom file handlers, new analysis engines, domain-specific categorisation rules, or entirely new capabilities.

**Design Constraints:**
- Plugins run in isolation — cannot access files outside their declared scope
- Plugin manifest required: `{ name, version, permissions, author }`
- Permissions model: plugins must declare what they can read, write, or execute
- No plugin can bypass the Safe Write System

### Planning Checklist

- [ ] Define the plugin interface specification (API contract)
- [ ] Define the permissions model — what scopes are available?
- [ ] Design the plugin manifest format
- [ ] Build a reference plugin as a proof-of-concept
- [ ] Design the plugin discovery and installation flow in Forge HQ
- [ ] Define sandboxing approach for plugin execution

### Planning Sign-off

- [ ] Plugin interface specification drafted
- [ ] Permissions model agreed
- [ ] **Ready for development planning:** Confirmed by _________________ on _________________

---

## Milestone 4.6 — Forge HQ Integration

> inCybe as a dedicated panel inside the Forge HQ master dashboard PWA.

**Concept:** Forge HQ is the Giblets Creations command centre. Phase 4 brings inCybe into it natively — a panel that surfaces vault status, agent health, recent activity, and quick query access without leaving Forge HQ.

**Panel Components (proposed):**
- Vault health summary (doc count, last sync, agent statuses)
- Recent activity feed (last 10 indexed files, last 10 AI actions)
- Quick query input (inline RAG query without leaving Forge HQ)
- Agent control panel (pause/resume each agent)
- Link to full inCybe PWA for deeper interaction

### Planning Checklist

- [ ] Review current Forge HQ panel architecture and API contract
- [ ] Design inCybe panel layout — consistent with Forge HQ dark chrome aesthetic
- [ ] Define which inCybe API endpoints the Forge HQ panel consumes
- [ ] Plan real-time status updates (WebSocket vs polling)
- [ ] Build panel in isolation, then integrate into Forge HQ

### Planning Sign-off

- [ ] Panel design agreed and mocked
- [ ] API contract between inCybe and Forge HQ defined
- [ ] **Ready for development planning:** Confirmed by _________________ on _________________

---

## Milestone 4.7 — BuddAI Deep Integration

> BuddAI as the conversational layer over inCybe's knowledge base.

**Concept:** BuddAI becomes inCybe's voice — a conversational interface that can answer questions about your files, guide reorganisation, explain what the agents are doing, and teach the system new behaviours via `/teach`, `/wrong`, and `/why`.

**Design Constraints:**
- BuddAI operates over inCybe's indexed knowledge — not its own training data
- `/teach` allows user to correct inCybe's understanding of specific files or topics
- `/wrong` flags an incorrect answer for review
- `/why` explains the reasoning behind any inCybe action or recommendation

### Planning Checklist

- [ ] Review current BuddAI architecture and `/teach` `/wrong` `/why` interface
- [ ] Define how BuddAI routes queries to inCybe's RAG engine vs its own knowledge
- [ ] Design the `/teach` interface for inCybe-specific corrections (file context, topic context)
- [ ] Plan BuddAI deployment alongside inCybe on S24 Ultra / Termux
- [ ] Define how BuddAI surfaces inCybe agent actions in conversational form

### Planning Sign-off

- [ ] BuddAI integration architecture agreed
- [ ] `/teach` `/wrong` `/why` interface scoped for inCybe context
- [ ] **Ready for development planning:** Confirmed by _________________ on _________________

---

## Milestone 4.8 — IoT Mesh Awareness

> ESP32-C3 node data feeds into the knowledge system — the S24 Ultra as BLE hub.

**Concept:** inCybe ingests data from the Giblets Creations IoT mesh (ESP32-C3 nodes, PVDF harvesters, sensor arrays) and indexes it alongside file-based knowledge. Sensor readings become queryable context.

**Concept Queries:**
- *"What was the temperature in the workshop when I was writing this note?"*
- *"Show me all notes created during high-activity sensor periods."*
- *"What patterns correlate with my most productive work sessions?"*

### Planning Checklist

- [ ] Review current S24 Ultra BLE hub architecture and ESP32-C3 node data formats
- [ ] Define the sensor data schema for inCybe indexing
- [ ] Design the IoT data ingestion pipeline (BLE → S24 → inCybe)
- [ ] Define which sensor data types are indexable and queryable
- [ ] Design the correlation query interface — linking file activity to sensor context

### Planning Sign-off

- [ ] IoT data schema agreed
- [ ] Ingestion pipeline architecture defined
- [ ] **Ready for development planning:** Confirmed by _________________ on _________________

---

## Milestone 4.9 — AR / Spatial Interface

> FORGE WORLD-style 3D navigation of the file graph — Three.js / WebXR.

**Concept:** Navigate your knowledge graph in 3D space. Files float as nodes, clusters emerge as constellations, and relationships are visible as spatial connections. Built on the FORGE WORLD and Data Cube foundations already established in the Giblets Creations stack.

**Design Constraints:**
- Must run on S24 Ultra (WebXR in Chrome)
- Performance target: 60fps for graphs up to 500 nodes
- Interaction: tap to select, pinch to navigate, gesture to filter

### Planning Checklist

- [ ] Review current FORGE WORLD Three.js / WebXR implementation for reusability
- [ ] Review Data Cube force-directed graph code for porting to 3D
- [ ] Define performance targets and test methodology for S24 Ultra
- [ ] Design the spatial layout algorithm for the file graph
- [ ] Define interaction model: navigation, selection, filtering in AR/3D

### Planning Sign-off

- [ ] Reusable components from FORGE WORLD and Data Cube identified
- [ ] Performance targets agreed
- [ ] **Ready for development planning:** Confirmed by _________________ on _________________

---

## Milestone 4.10 — Semantic FS Layer

> OS-level file system driver with AI metadata baked in.

**Concept:** The deepest milestone. A file system driver that makes semantic understanding a first-class OS primitive — every file query, open, and save is semantically aware. Files know what they are and how they relate to everything else.

> ⚠️ **This is the long horizon.** The technical path is unclear until Phase 3 is complete and the architecture has matured. This milestone stub exists to anchor the vision.

### Planning Checklist

- [ ] Research existing semantic FS projects and prior art
- [ ] Define the minimum viable version of a semantic FS layer on Android / Termux
- [ ] Assess feasibility given S24 Ultra / Termux environment constraints
- [ ] Identify which Phase 3 components are directly reusable
- [ ] Define what "OS-level" means in the Termux / Android context

### Planning Sign-off

- [ ] Feasibility assessment completed
- [ ] Minimum viable scope defined
- [ ] **Ready for development planning:** Confirmed by _________________ on _________________

---

## ✅ Phase 4 — Planning Gate

> Phase 4 has no single exit criteria — it evolves continuously. Instead, each milestone requires its own planning sign-off before development begins.

### Individual Milestone Planning Status

- [ ] **4.1** Natural Language Shell — planning signed off
- [ ] **4.2** Autonomous Cleanup Agent — planning signed off
- [ ] **4.3** Context-Aware Workflows — planning signed off
- [ ] **4.4** Multi-Agent Architecture — planning signed off
- [ ] **4.5** Plugin Ecosystem — planning signed off
- [ ] **4.6** Forge HQ Integration — planning signed off
- [ ] **4.7** BuddAI Deep Integration — planning signed off
- [ ] **4.8** IoT Mesh Awareness — planning signed off
- [ ] **4.9** AR / Spatial Interface — planning signed off
- [ ] **4.10** Semantic FS Layer — planning signed off

### Phase 4 Initiation Checklist

- [ ] Phase 3 fully confirmed and signed off
- [ ] Legion multi-agent capabilities reviewed and confirmed sufficient for 4.4
- [ ] Forge HQ architecture reviewed — panel API contract drafted
- [ ] BuddAI architecture reviewed — integration approach agreed
- [ ] Priority order for first 3 Phase 4 milestones agreed between James and Abe

### Phase 4 Initiation Sign-off

> Authorises Phase 4 planning and development to begin.

- [ ] **Confirmed by:** _________________
- [ ] **Date:** _________________
- [ ] **First 3 milestones prioritised as:** _________________, _________________, _________________
- [ ] **Notes:** _________________

---

← [Phase 3](./PHASE-3.md) | [Back to README](./README.md)

---

<div align="center">

**inCybe · Giblets Creations · Phase 4 · Roadmap v1.1**

*"I wanted it. So I forged it. Now forge yours."*

</div>

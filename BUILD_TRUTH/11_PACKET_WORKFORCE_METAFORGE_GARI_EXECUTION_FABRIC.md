# 11 — Packet OS, Workforce Spine, MetaForge, GARI, and Execution Fabric

## Purpose

This layer turns governed intent into durable work and routes it to bounded execution.

The canonical chain is:

`MISSION → PACKETS → STAFFING → CAPABILITY ROUTE → EXECUTION → VERIFICATION → HANDOFF/CLOSE`

## Packet OS

Packet OS is the atomic work grammar and state machine of the Estate.

A Packet is not a prompt. It is a durable unit of bounded work with lifecycle, dependencies, authority and proof requirements.

Minimum Packet contract:

```yaml
packet_id: string
mission_id: string
title: string
objective: string
scope: []
non_goals: []
inputs: []
outputs: []
dependencies: []
required_capabilities: []
risk_class: string
authority_ref: string
assigned_role: optional
lease_ref: optional
state: queued|leased|executing|verifying|blocked|failed|complete|superseded
acceptance: []
proof_requirements: []
failure_route: string
created_at: timestamp
updated_at: timestamp
```

## Packet lifecycle

```text
DECLARED
  ↓
AUTHORIZED
  ↓
QUEUED
  ↓
LEASED
  ↓
EXECUTING
  ↓
VERIFYING
  ├── PASS → COMPLETE
  ├── FAIL → REPAIR/RETRY
  ├── BLOCKED → BLOCKED_WITH_DEPENDENCY
  └── SUPERSEDED → CLOSED_WITH_LINEAGE
```

No Packet may be marked complete because an agent says “done.” The declared acceptance contract must be satisfied by evidence.

## Workforce Spine

Workforce Spine is the operations-routing body.

Responsibilities:

- receive authorized Packets;
- expand capability requirements;
- select eligible role population;
- issue/reconcile leases;
- route handoffs;
- track Packet state;
- surface blockers;
- preserve owner accountability;
- prevent orphaned work;
- expose queue/throughput/latency health;
- route failed work to the correct recovery/repair authority.

Workforce Spine is **one spine** even when work is fulfilled by Resident Workforce, FARC, WOOK, Native Foundry, hackathon-specific agents, humans, cloud workers or local models.

## GARI

GARI is the research intelligence / institute body.

GARI Packet classes include:

- source research;
- technical synthesis;
- benchmark/evaluation design;
- literature mapping;
- market/competition analysis;
- hypothesis testing;
- publication/paper generation;
- experiment interpretation;
- capability research.

GARI outputs carry sources, uncertainty and evidence class. Research results are not implementation proof.

Typical handoff:

`GARI → design/spec Packet → JANUS/Workforce → MetaForge or other builder`

## MetaForge

MetaForge is the build, repair, packaging and implementation factory.

MetaForge responsibilities:

- convert approved design Packets into implementation plans;
- scaffold software;
- patch existing systems before replacement;
- compile/build/package;
- generate migrations with rollback coordinates;
- create tests;
- produce implementation evidence;
- hand results to SECA/DevOS.

MetaForge does not self-approve production.

Canonical path:

`PROMETHEUS/GARI/ARCHITECT PROPOSAL → JANUS AUTHORIZATION → METAFORGE → SECA → PROMOTION DECISION`

## Build Truth relationship

Build Truth files define what must exist, why, where it fits and how it is proven.

They do not substitute for implementation.

For a system to move from `DESIGNED` to `IMPLEMENTED`, MetaForge or another executor must produce concrete artifacts linked back to the Build Truth contract.

## Execution Fabric

The execution fabric joins Packet OS, Workforce Spine, Capability Genome, CrownGrid, VISHVARUPA execution envelopes and physical/cloud executors.

Conceptual flow:

```text
PACKET
  ↓
Workforce capability resolution
  ↓
ROLE / AGENT eligibility
  ↓
CrownGrid node/model placement
  ↓
Execution Envelope
  ↓
Executor Adapter
  ↓
Workspace / sandbox
  ↓
Action
  ↓
Execution Receipt
```

## Executor adapter contract

Each executor class should implement a common surface such as:

```text
QUALIFY()
CAPABILITIES()
HEALTH()
PREPARE(packet, envelope)
EXECUTE()
CANCEL()
COLLECT_ARTIFACTS()
RECEIPT()
CLEANUP()
```

Executor classes may include:

- Windows local process;
- PowerShell script;
- Python worker;
- container;
- WSL process;
- GitHub Actions runner;
- Render/Vercel deployment adapter;
- browser/VM sandbox;
- Unreal build node;
- Ollama/local-model worker;
- remote API model;
- ARK mobile/field adapter.

## Workspace isolation

Work should execute in a bounded workspace appropriate to risk.

Required controls may include:

- dedicated working directory;
- read/write scope enforcement;
- temporary credentials;
- network allowlists;
- timeouts;
- mutation count limits;
- rollback snapshot/branch;
- environment manifest;
- artifact hashing.

Production checkout/direct mutation is forbidden unless specifically designed and authorized.

## Queue and backpressure

The Estate must measure:

- queue depth;
- oldest Packet age;
- lease count;
- execution duration;
- retries;
- blocked dependencies;
- verifier backlog;
- model/node saturation;
- time-to-verified-outcome.

When overloaded, the system should throttle or defer rather than silently dropping work.

## Idempotency and irreversible actions

Packets should carry an idempotency key where repeated execution could duplicate effects.

Irreversible actions require explicit human/JANUS gates and must not be automatically replayed after runner/network failure.

## Completion receipt

A successful work Packet should produce or reference:

```json
{
  "packet_id": "...",
  "mission_id": "...",
  "role_id": "...",
  "agent_id": "...",
  "executor_id": "...",
  "model": "...",
  "node": "...",
  "authority_envelope": "...",
  "started_at": "...",
  "finished_at": "...",
  "artifacts": [],
  "hashes": [],
  "tests": [],
  "verdict_ref": "...",
  "proof_refs": []
}
```

## Proof gates

This fabric is qualified when:

1. an authorized Packet persists across process restart;
2. Workforce resolves it by capability;
3. an executor lease is issued and heartbeats;
4. CrownGrid can choose between at least two eligible execution routes or explicitly report only one;
5. the executor runs inside the declared envelope;
6. artifacts are hashed and returned;
7. SECA verifies acceptance;
8. failed work routes to repair/block rather than false completion;
9. a disconnected/reconnected queue reconciles without duplicate irreversible work;
10. the final Packet state propagates into Thoth, SESHAT and Universal Atlas.

# 04 — Universal Atlas, GAOA, and SESHAT Reality Graph

## Canonical role

**Universal Atlas is the canonical Map of Reality.**

It is the Estate-wide graph of entities, relationships, identities, authorities, capabilities, dependencies, representations, worlds, evidence and lifecycle state.

Universal Atlas does not own historical chronology by itself and does not adjudicate proof by itself. It consumes temporal truth from SESHAT, provenance from Thoth and verified evidence from SECA/ProofGrid.

## GAOA — ontology authority

GAOA defines the canonical classes and relation vocabulary used by Universal Atlas.

Minimum entity classes:

- Person
- Agent
- Role
- Office
- Organization
- System
- Organ
- Repository
- Branch
- Commit
- Release
- Service
- Process
- Scheduled Task
- Workflow
- Model
- Capability
- Packet
- Mission
- Campaign
- Decision
- Authority Envelope
- Execution Envelope
- Node
- Device
- Network
- Storage Volume
- Dataset
- Memory
- Proof
- Receipt
- Claim
- Event
- World
- Simulation
- Representation
- Product
- Customer
- Institution
- External Actor

Minimum relation types:

`OWNS`, `AUTHORIZES`, `GOVERNS`, `PRODUCES`, `CONSUMES`, `DEPENDS_ON`, `EXECUTES`, `VERIFIES`, `OBSERVES`, `ROUTES_TO`, `HANDOFF_TO`, `FAILS_TO`, `RECOVERS_WITH`, `MEMBER_OF`, `CAPABLE_OF`, `USES_MODEL`, `RUNS_ON`, `REPRESENTS`, `SAME_AS`, `ALIAS_OF`, `ANCESTOR_OF`, `DESCENDANT_OF`, `FORK_OF`, `MERGED_INTO`, `SUPERSEDES`, `SUPERSEDED_BY`, `PROVEN_BY`, `CLAIMS`, `SIMULATES`, `MANIFESTS`, `EXTERNALIZES`.

## Identity law

Identity is stable across representation changes.

Examples:

- a system may have multiple repos;
- a repo may contain multiple runtime organs;
- one concept may have ancestor and descendant implementations;
- a historical alias does not create a new current organ;
- a website or Unreal renderer may represent a canonical entity without owning it.

Every merge/supersession must preserve source lineage.

## Repository census law

Repository count is a **snapshot property**, never a timeless invariant.

Required snapshot model:

```json
{
  "repository_snapshot_id": "GA-REPO-CENSUS-2026-09-09T...",
  "observed_at": "timestamp",
  "repo_count": 56,
  "repositories": []
}
```

Each repository record should include:

```text
repository_id
name
url
observed_at
lifecycle_class
system_class
organ_status
service_status
campaign_status
canonical_owner
producer
consumer
authority
capabilities[]
evidence_class
last_verified_at
runtime_participant
production_participant
historical_only
```

Recommended repository lifecycle classes:

`RUNTIME_ORGAN`, `CONTROL_PLANE`, `CAPABILITY_SYSTEM`, `PRODUCT`, `PUBLIC_SURFACE`, `HACKATHON_ENTRY`, `RESEARCH`, `HARDWARE_SUPPORT`, `PROVENANCE`, `ARCHIVE`, `EMPTY_SHELL`, `UNCLASSIFIED`.

Historical counts remain valid as historical observations. They are never rewritten simply because the Estate grew.

## SESHAT — temporal truth

SESHAT records **state-at-T** and change over time.

Core responsibilities:

- capture observation time separately from event time;
- preserve current and historical states;
- record deltas;
- preserve contradiction history;
- track freshness/TTL of volatile state;
- link controller statements to the time they were valid;
- prevent stale control packets from silently outranking newer authoritative receipts.

Minimum state record:

```json
{
  "state_id": "state-id",
  "entity_id": "entity-id",
  "valid_from": "timestamp",
  "valid_to": null,
  "observed_at": "timestamp",
  "state": {},
  "epistemic_class": "OBSERVED",
  "authority_source": "source-id",
  "proof_refs": []
}
```

## Contradiction handling

When two controllers disagree, Universal Atlas must not pick one based on recency alone.

Canonical contradiction record:

```text
CONTRADICTION_ID
CLAIM_A
CLAIM_B
SOURCE_A
SOURCE_B
TIMESTAMPS
AUTHORITY_CLASS_A
AUTHORITY_CLASS_B
EVIDENCE_A
EVIDENCE_B
RESOLUTION_STATUS
RESOLUTION_AUTHORITY
```

Resolution priority is domain-based authority + evidence, not arbitrary controller order.

Example:

`authoritative Phantom product receipt` may supersede an older Workforce status for a Phantom phase while preserving the old Workforce claim historically.

## Map write path

No arbitrary component writes directly to canonical truth.

Preferred path:

`Observation → evidence/receipt → SECA/domain verifier → SESHAT temporal record → Universal Atlas relationship/state update → Thoth provenance registration`

Some low-risk telemetry can enter as `OBSERVED/UNVERIFIED` but cannot self-promote to `VERIFIED`.

## Map read path

Consumers query the map by explicit truth need:

- current verified state;
- latest observation regardless of proof;
- state at time T;
- lineage history;
- dependency closure;
- authority route;
- capability route;
- proof chain;
- unresolved contradictions;
- simulated/candidate alternatives.

## Proof gates

Universal Atlas/SESHAT is qualified when it can demonstrate:

1. stable IDs across aliases;
2. historical repository snapshots without cardinality overwrite;
3. one current-state query with provenance;
4. one state-at-T query;
5. one contradiction preserved and resolved;
6. one supersession chain;
7. one physical node linked to real execution evidence;
8. one Packet linked intent→executor→proof→memory;
9. one Euna simulated entity clearly separated from live state;
10. one external event returned into the map.

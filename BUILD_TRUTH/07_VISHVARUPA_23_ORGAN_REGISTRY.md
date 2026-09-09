# 07 — Vishvarupa 23-Organ Registry

## Canonical role

Vishvarupa is the **whole-organism integration pattern** for the Ghost Atlas Estate. It is not one application and not one model. It is the coordinated body formed by the resident organs, their contracts, the shared command/proof loop, and the physical estate they inhabit.

The canonical first resident registry contains 23 organs.

## Organ contract schema

Every organ must expose:

```text
ORGAN_ID
CANONICAL_NAME
ROLE
OWNER
MANDATE
INPUTS[]
OUTPUTS[]
AUTHORITY
CAPABILITIES[]
DEPENDENCIES[]
PRODUCERS[]
CONSUMERS[]
HEALTH_SIGNALS[]
FAILURE_ROUTE
PROOF_CLASS
LIFECYCLE
IMPLEMENTATION_REFS[]
```

A name without this contract remains conceptual.

## The 23 resident organs

### 01 — Atlas Mind / Vishvarupa
**Role:** cognitive synthesis and operational mind.  
Consumes current reality, history, Packet state, evidence and cognitive models. Produces interpretations, candidate plans and organism-level awareness. Does not bypass JANUS authority.

### 02 — ARCADIA
**Role:** governing cognitive architecture.  
Maintains separation between memory, cognition, authority, simulation and execution. Prevents uncontrolled monolithic-agent collapse.

### 03 — Thoth
**Role:** memory, archive, provenance, retrieval.  
Stores durable accepted history and evidence lineage.

### 04 — Universal Atlas / SESHAT
**Role:** canonical estate graph, reality map and temporal truth.  
Universal Atlas owns topology; SESHAT owns state-at-T/delta.

### 05 — NAVI
**Role:** relational/behavioral cognition and intent normalization.  
Transforms human-language goals into bounded intent candidates for JANUS.

### 06 — Janus Prime / Odin
**Role:** authority, sequencing, dependency law and promotion.  
Owns consequential route selection and explicit transition authority.

### 07 — Packet OS
**Role:** atomic work grammar and work-state machine.  
Represents missions as durable packets with owners, dependencies, handoffs and proof contracts.

### 08 — MetaForge
**Role:** build, repair, packaging and implementation.  
Consumes authorized implementation packets and produces artifacts/patches for verification.

### 09 — Workforce Spine
**Role:** work routing and bounded staffing.  
Maps Packet requirements to role/capability/executor populations and tracks work state.

### 10 — SECA / DevOS
**Role:** verification, completion truth and release qualification.  
Judges whether implementation has earned the claimed lifecycle state.

### 11 — Medusa
**Role:** security, permission, privacy and federation boundary.  
Enforces scope, credentials, network/file access and external/public exposure law.

### 12 — EDEN / Cali
**Role:** primary resident execution body.  
Runs bounded physical/local execution and produces executor receipts.

### 13 — CrownGrid
**Role:** estate I/O and capability/model/node placement.  
Resolves requested capability classes into available nodes/models/executors.

### 14 — ServerForge
**Role:** service/communication nervous-system interface.  
Hosts or routes service/event communication surfaces such as Discord/server operations where canonical.

### 15 — RoadBridge
**Role:** field capture and transit interface.  
Connects mobile/field observations and commands into governed Estate transport.

### 16 — ProofGrid
**Role:** evidence and receipt fabric.  
Stores/links execution proof, hashes, acceptance results and verification evidence.

### 17 — Audience Forge
**Role:** public/commercial proof translation.  
Produces public-safe representations and case-study surfaces from verified proof only.

### 18 — GARI
**Role:** research intelligence and institute knowledge production.  
Conducts bounded research, synthesis, publication and validation tasks.

### 19 — HYPERNET-OMEGA
**Role:** transport/federation fabric.  
Carries packets, events, state synchronization and node communication without owning local truth.

### 20 — META-FATE
**Role:** governed state transition / fate-state routing.  
Coordinates legal transition of state candidates through authority and proof gates.

### 21 — NHCM
**Role:** state-model candidates and metacognitive state representation.  
Produces bounded candidate interpretations with confidence/epistemic class.

### 22 — CSA-95
**Role:** canonical architecture/capability support surface retained from the original resident registry.  
Must be reconciled against its current implementation body before any stronger runtime claim. Until mapped, treat as `CANONICAL_IDENTITY / IMPLEMENTATION_RECONCILIATION_REQUIRED`.

### 23 — MECA
**Role:** meta-cognitive engineering and governed capability evolution.  
Owns self-architecting-development semantics, maturity gates and capability evolution contracts; it does not grant itself production authority.

## Control-plane and supporting systems

The following are critical but are not counted as additional first-23 resident organs:

- **OmniMind / Mothership** — control-plane surfaces over Atlas Mind/Vishvarupa.
- **Hydra / Reverse Uno** — failure/healing loop.
- **Prometheus** — bounded improvement/promotion proposal loop.
- **OSIRIS / Resurrection Engine** — rollback/restoration authority.
- **AURA** — whole-organism coherence/health sensing.
- **BodyForge** — resource and embodiment governance.
- **Capability Genome / GA-CAP** — capability phenotype registry.
- **COSMOS** — nested self→civilization→planet→cosmos model.
- **AEON** — deep-time model.
- **MINDNOS** — subordinate mind/cognitive architecture where still canonical.
- **Ghost Atlantia / GAIA / Euna** — worldstate, planetary feedback and simulation layers.

These systems may become formal organs in a future evidence-backed registry revision, but this file preserves the original 23-organ baseline rather than silently renumbering history.

## Organ I/O heartbeat

```text
Steward / Phone / API
        ↓
CrownGrid ← RoadBridge / ServerForge / Hypernet
        ↓
Medusa
        ↓
META-FATE
        ↓
Thoth ←→ Universal Atlas / SESHAT
        ↓
Atlas Mind / Vishvarupa ←→ OmniMind / Mothership
        ↓
Janus / Odin
        ↓
Packet OS
        ↓
Workforce Spine
   ├──→ EDEN
   ├──→ MetaForge
   └──→ GARI
        ↓
SECA / DevOS
        ↓
ProofGrid
   ├──→ Thoth
   ├──→ Universal Atlas / SESHAT
   └──→ Hypernet / operator return
```

Failure and improvement side loops:

```text
FAILURE → Hydra/Reverse Uno → Prometheus diagnosis → JANUS
JANUS → MetaForge repair OR OSIRIS restore → SECA → ProofGrid
```

## Organ status law

Every organ has two distinct statuses:

1. **Canonical identity status** — does the Estate recognize the organ and its role?
2. **Runtime implementation status** — is there a current verified implementation performing that role?

A canonical identity may exist while implementation is missing, superseded, duplicated or implemented elsewhere. The registry must state this explicitly rather than inventing runtime proof.

## Organ qualification

An organ is `RUNTIME_VERIFIED` only when:

- implementation identity is resolved;
- inputs/outputs are observed;
- authority boundary is tested;
- health signal exists;
- at least one successful handoff is evidenced;
- at least one failure route is known;
- proof is registered in ProofGrid/Thoth/Universal Atlas.

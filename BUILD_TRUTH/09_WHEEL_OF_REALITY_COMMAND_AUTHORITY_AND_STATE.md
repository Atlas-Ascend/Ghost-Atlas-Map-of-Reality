# 09 — Wheel of Reality, Command, Authority, and State

## Canonical control pattern

The Wheel of Reality is the master control loop for the Ghost Atlas organism:

`OBSERVER → PERMISSION → INTENTION → IMAGINATION → ACTION → FEEDBACK → PROOF → INTEGRATION → RETURN`

This is not merely a philosophical sequence. It is the canonical systems-control grammar for turning sensed or human-originated intent into bounded, evidenced state change.

## Stage ownership

### 1. OBSERVER
Primary systems:

- Prime Architect / operator
- AURA
- NAVI
- runtime observability
- Mirror Debugger
- Universal Atlas current-state reads

Output:

`OBSERVATION_ENVELOPE`

Required properties:

- source;
- timestamp;
- epistemic class;
- uncertainty;
- evidence refs if available;
- no implicit mutation authority.

### 2. PERMISSION
Primary systems:

- Medusa
- JANUS/Odin
- HSG/ARC-G or current governance equivalent
- execution policy

Output:

`AUTHORITY_ENVELOPE`

Permission defines what may happen, not what must happen.

### 3. INTENTION
Primary systems:

- founder/operator intent
- NAVI normalization
- JANUS decision

Output:

`MISSION_INTENT`

Required fields:

```text
INTENT_ID
GOAL
SCOPE
CONSTRAINTS
NON_GOALS
SUCCESS_CONDITIONS
RISK_CLASS
HUMAN_GATES
EXPIRY
```

### 4. IMAGINATION
Primary systems:

- OmniMind
- Atlas Mind / Vishvarupa
- Universal Atlas
- MetaForge planning
- GARI research
- Euna where simulation is useful

Output:

candidate plans, not production permission.

Every candidate plan must retain its source assumptions and may be rejected without affecting canonical state.

### 5. ACTION
Primary systems:

- Packet OS
- Workforce Spine
- MetaForge
- GARI
- CrownGrid
- EDEN / bounded executor

Output:

`EXECUTION_EVENT` and executor receipts.

Action must carry authority and execution-envelope references.

### 6. FEEDBACK
Primary systems:

- AURA
- Runtime Observatory
- Event Gateway / service fabric
- GAIA/system simulations where appropriate
- physical node telemetry

Output:

observations of consequences, not automatic truth promotion.

### 7. PROOF
Primary systems:

- SECA
- DevOS
- ProofGrid
- domain-specific tests/verifiers

Output:

`VERDICT + RECEIPT`

Possible verdicts include:

`PASS`, `FAIL`, `BLOCKED`, `INCONCLUSIVE`, `DEGRADED_PASS`, `SUPERSEDED`.

### 8. INTEGRATION
Primary systems:

- Thoth
- SESHAT
- Universal Atlas
- Capability Genome
- GARI

Output:

updated durable memory, temporal state, capability knowledge and reality graph.

### 9. RETURN
Primary systems:

- Atlas Mind / OmniMind
- Packet OS
- operator surface
- next-cycle scheduler

Output:

verified mission result plus next eligible state.

The Wheel is incomplete if the result does not return to the requesting context.

## JANUS authority law

JANUS owns strategic transition authority across the Estate, subject to root-human gates and domain-specific restrictions.

JANUS responsibilities:

- select lawful route;
- order dependencies;
- approve or deny consequential mutation;
- enforce promotion rules;
- choose forward-repair vs rollback route when authorized;
- prevent duplicate control planes from self-promoting;
- preserve human-only gates;
- issue decision receipts.

JANUS does not manufacture evidence. It consumes proof and makes governed decisions from it.

## ODIN role

ODIN remains the strategic-choice / sacrifice / prioritization complement in the Janus/Odin executive layer. Where implementations are combined, the contract must still distinguish:

- transition/threshold governance;
- strategic priority and tradeoff;
- dependency order;
- irreversible consequence boundaries.

## META-FATE

META-FATE coordinates legal state-transition pathways. It should model transitions such as:

```text
CANDIDATE
  → AUTHORIZED_FOR_SANDBOX
  → EXECUTED
  → VERIFIED
  → PROMOTION_ELIGIBLE
  → PROMOTED
```

and deny illegal jumps such as:

`SIMULATED → PRODUCTION` without the intermediate authority/proof gates.

## Worldstate compiler boundary

Any Worldstate Compiler may combine state, memory and permission into a candidate worldstate. It may not self-promote the candidate. Promotion requires the relevant authority + proof path.

## Daemon / scheduler law

Resident schedulers, daemons and recurring workers may initiate only actions already permitted by explicit policy/mission contracts.

A scheduler trigger is not new root authority.

Required resident-cycle identity:

```text
SCHEDULE_EVENT_ID
POLICY_REF
MISSION/LOOP_REF
PACKET_ID
EXECUTOR
START_TIME
RESULT
PROOF_REF
NEXT_SCHEDULE
```

## Mastery before manifestation

Capabilities that can materially mutate the Estate should require evidence of competence before being granted broader authority.

A capability passport may include:

- role;
- tool/capability;
- allowed environment;
- training/trial evidence;
- verification score;
- expiry;
- revocation state;
- promotion authority.

The agent may become more capable without becoming more authorized.

## Control-loop proof gates

The Wheel is qualified when one Golden Mission proves:

1. observer state captured;
2. authority envelope issued;
3. intent normalized without semantic drift;
4. multiple candidate routes may be considered;
5. chosen route becomes Packet work;
6. physical/digital action executes within envelope;
7. consequence telemetry returns;
8. SECA emits a verdict;
9. ProofGrid stores receipt;
10. SESHAT/Universal Atlas update current state;
11. Thoth preserves provenance;
12. final result returns to the operator/OmniMind context;
13. an unauthorized transition is explicitly denied.

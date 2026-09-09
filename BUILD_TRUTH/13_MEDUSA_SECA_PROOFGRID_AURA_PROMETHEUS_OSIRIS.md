# 13 — Medusa, SECA, ProofGrid, AURA, Prometheus, and OSIRIS

## Purpose

The Estate requires distinct systems for **permission, observation, verification, evidence, forward improvement, and restoration**. Collapsing these functions creates dangerous self-certification.

Canonical separation:

`MEDUSA = boundary / permission enforcement`  
`AURA = organism health and coherence sensing`  
`SECA / DevOS = verification and release judgment`  
`ProofGrid = evidence and receipts`  
`PROMETHEUS = empirical improvement proposals`  
`MetaForge = implementation`  
`OSIRIS = restoration/rollback`  
`JANUS = authorization`

## Medusa

Medusa is the security, privacy, permission and federation boundary.

Responsibilities:

- enforce authority envelopes;
- file/network/credential scope;
- public/private classification;
- secret handling rules;
- connector boundaries;
- external publication review;
- destructive/irreversible action gates;
- capability revocation;
- session isolation;
- public-surface redaction where required.

Medusa may deny execution even when a capable worker exists.

### Medusa decision contract

```json
{
  "decision_id": "...",
  "subject": "agent/executor",
  "packet_id": "...",
  "authority_ref": "...",
  "requested_action": "...",
  "decision": "ALLOW|DENY|REQUIRE_HUMAN|NARROW_SCOPE",
  "reason": "...",
  "effective_scope": {},
  "expires_at": "..."
}
```

## AURA

AURA answers a higher-order question than individual health endpoints:

> Is the organism coherent, degraded, contradictory, stale, partitioned, recovering, or healthy?

Inputs may include:

- service/process heartbeat;
- Packet queues;
- runner health;
- proof freshness;
- contradiction count;
- stale SESHAT observations;
- node health;
- model/runtime availability;
- recovery events;
- error-rate trends;
- manual intervention frequency;
- failure propagation.

AURA is an observer, not an unrestricted repair agent.

## SECA / DevOS

SECA/DevOS is the truth court and release-verification layer.

Responsibilities:

- evaluate acceptance criteria;
- run deterministic tests where possible;
- validate artifact hashes;
- verify Build Truth requirements;
- distinguish code success from runtime success;
- enforce lifecycle-state promotion;
- gate production release;
- emit explicit verdicts;
- prevent false green.

### Verdict contract

```yaml
verdict_id: string
subject_ref: string
claim: string
verdict: PASS|FAIL|BLOCKED|INCONCLUSIVE|DEGRADED_PASS
criteria: []
evidence_refs: []
tests: []
verifier: seca
timestamp: timestamp
limitations: []
```

SECA does not decide business strategy or human intent. It judges declared acceptance.

## ProofGrid

ProofGrid is the evidence fabric.

It stores or indexes:

- build receipts;
- runtime receipts;
- screenshots/video references where relevant;
- test outputs;
- hashes;
- deployment receipts;
- physical-machine receipts;
- signed/attested manifests;
- independent review artifacts;
- external acceptance evidence;
- failure and recovery evidence.

ProofGrid must preserve evidence identity and content integrity.

### Proof receipt minimum

```json
{
  "receipt_id": "...",
  "claim": "...",
  "subject": "...",
  "produced_at": "...",
  "producer": "...",
  "executor": "...",
  "artifact_refs": [],
  "sha256": [],
  "environment_ref": "...",
  "authority_ref": "...",
  "verdict_ref": "...",
  "proves": [],
  "does_not_prove": []
}
```

The `does_not_prove` field is encouraged for high-value receipts to stop scope inflation.

## Self-Observatorium

The Self-Observatorium is the longitudinal analytics layer over AURA/ProofGrid/runtime telemetry.

Track:

- reliability trend;
- recovery effectiveness;
- false-green rate;
- time from intent T0 to proof Tn;
- autonomous repair success;
- operator intervention frequency;
- queue wait;
- repeated failure classes;
- verifier disagreement;
- node/model performance by capability;
- production drift.

It informs Prometheus but does not mutate production.

## Prometheus

Prometheus is controlled forward-evolution analysis.

It consumes:

```text
MISSION
PACKET
ROLE
MODEL
NODE
CAPABILITY
QUEUE_TIME
EXECUTION_TIME
RETRIES
TOOL_CALLS
RESOURCE_USE
MEDUSA_VERDICT
SECA_VERDICT
FAILURE_CLASS
RECOVERY_METHOD
TIME_TO_VERIFIED_OUTCOME
```

Prometheus produces **Improvement Packets**, not direct mutations.

Canonical write path:

`PROMETHEUS → IMPROVEMENT_PACKET → JANUS → METAFORGE → TEST/SANDBOX → SECA → PROMOTION DECISION`

Optimization target is verified outcome quality, reliability, safety and cost—not raw output volume or speed alone.

## Hydra / Reverse Uno

Hydra/Reverse Uno is the bounded healing/reconciliation loop used to detect failures, generate retry/repair routes and return broken execution to an authorized recovery path.

It must not repeatedly self-trigger destructive actions or hide failure behind infinite retries.

Required retry controls:

- failure-class-aware retry;
- max attempts;
- backoff;
- idempotency awareness;
- escalation;
- final blocked state;
- preserved evidence.

## OSIRIS / Resurrection Engine

OSIRIS owns **backward restoration**.

Responsibilities:

- identify known-good restore coordinate;
- validate restore artifact/hash;
- preserve failure evidence before rollback;
- restore runtime/config/artifact state;
- verify service return;
- hand to SECA for post-restore verification;
- record restored lineage in SESHAT/Thoth.

OSIRIS does not choose a restore point arbitrarily. JANUS/human authority determines when rollback is permitted.

## Golden failure test

A production-ready organism must prove a controlled fault sequence:

```text
KNOWN-GOOD STATE
    ↓
INJECT REVERSIBLE FAULT
    ↓
AURA DETECTS
    ↓
FAILURE CLASSIFIED
    ↓
PROMETHEUS/HYDRA PROPOSE ROUTE
    ↓
JANUS AUTHORIZES
    ├── FORWARD: MetaForge repair
    └── BACKWARD: OSIRIS restore
    ↓
SECA RE-VERIFIES
    ↓
PROOFGRID RECEIPT
    ↓
THOTH + SESHAT + UNIVERSAL ATLAS UPDATE
```

## Anti-self-certification laws

1. Builder cannot be sole verifier of its own consequential change.
2. Prometheus cannot directly mutate production.
3. OSIRIS cannot erase the failed path from provenance.
4. Medusa cannot redefine mission intent while enforcing policy.
5. AURA cannot promote health based only on absence of alerts.
6. ProofGrid stores evidence; it does not reinterpret weak evidence into a stronger claim.
7. SECA verdicts must name limitations and exact acceptance scope.

## Proof gates

This assurance stack is qualified when:

1. an unauthorized file/network/credential mutation is denied;
2. AURA detects one meaningful degraded condition;
3. SECA distinguishes implementation pass from physical runtime pass;
4. ProofGrid stores a receipt with hashes and exact claim scope;
5. one failure routes through controlled forward repair;
6. one failure routes through OSIRIS rollback;
7. post-recovery state is reverified;
8. failure evidence remains retrievable after recovery;
9. Prometheus emits an Improvement Packet but cannot self-apply it;
10. organism health returns to the Map of Reality with time/provenance.

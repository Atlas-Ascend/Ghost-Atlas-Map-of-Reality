# 05 — Thoth, AEON, Memory, Time, and Provenance

## Canonical distinction

Ghost Atlas separates **memory**, **temporal state**, **lineage**, and **truth adjudication**.

- **Thoth** stores durable memory, provenance, retrieval context, receipts, lineage references and accepted history.
- **SESHAT** stores state-at-time and deltas.
- **AEON** models deep time, epochs, temporal identity, ancestry, descendants and long-horizon continuity.
- **ProofGrid** stores evidence artifacts and receipts.
- **SECA** judges whether a claim has earned its stated completion class.
- **Universal Atlas** binds these into the relational reality map.

No one of these systems should absorb all of the others.

## Thoth — memory cortex

Thoth is the durable memory cortex of the Vishvarupa organism.

Primary responsibilities:

- ingest and index verified receipts;
- preserve source provenance;
- preserve accepted system history;
- retain prior controller states and decisions;
- support retrieval by mission, Packet, organ, repository, entity, proof, date and lineage;
- retain dissent, contradiction and failed paths where useful;
- preserve evidence needed to reconstruct why the Estate believed something;
- supply Atlas Mind, JANUS, GARI, SECA, Prometheus and Universal Atlas with historical context.

## Memory classes

At minimum Thoth distinguishes:

`RAW_OBSERVATION`, `WORKING_CONTEXT`, `RECEIPT`, `VERIFIED_FACT`, `DECISION_RECORD`, `LINEAGE`, `FAILURE`, `RECOVERY`, `HISTORICAL_CANON`, `SUPERSEDED_CANON`, `EXTERNAL_EVIDENCE`, `SIMULATION_RESULT`.

Simulated memories must remain tagged as simulated.

## Provenance DAG

Every promoted fact should be traceable backwards.

Example:

```text
CURRENT_CLAIM
   ↓ proven_by
SECA_VERDICT
   ↓ based_on
PROOFGRID_RECEIPT
   ↓ produced_by
EXECUTION_EVENT
   ↓ executed_from
PACKET
   ↓ authorized_by
JANUS_DECISION
   ↓ normalized_from
FOUNDER_INTENT
```

The provenance graph should remain navigable even after a system is superseded.

## Anti-rollback provenance law

Operational state may roll back.

Historical evidence may not silently roll back.

Therefore:

`RUNTIME_ROLLBACK = ALLOWED WITH AUTHORITY`

while:

`PROVENANCE_ERASURE = DENIED BY DEFAULT`

If a record must be retracted, the system should append a retraction/supersession event rather than silently rewriting history.

## AEON — deep-time layer

AEON gives the Estate explicit long-horizon temporal semantics.

AEON owns concepts such as:

- Reality Epoch
- Release Era
- Machine Generation
- Architecture Generation
- Civilization Branch
- Model Lineage
- Ancestral System
- Descendant System
- Historical Portal
- Future Candidate Epoch
- Book of Return / continuity reference

AEON enables questions like:

- What did Ghost Atlas believe in August 2026?
- Which current organ descends from an older system?
- Which release was production during a particular mission?
- Which architecture existed before a migration?
- Which external proof caused a commercial state transition?
- Which failed approach repeatedly reappears?

## Epoch contract

```json
{
  "epoch_id": "GA-EPOCH-...",
  "name": "Golden Baseline 1.0 Era",
  "starts_at": "timestamp",
  "ends_at": null,
  "entry_event": "event-id",
  "exit_event": null,
  "canonical_system_refs": [],
  "production_release_refs": [],
  "major_truth_refs": [],
  "parent_epoch": null
}
```

## Book of Return semantics

The Book of Return is a continuity architecture for lost, dormant, superseded or historical state. Technically it should support:

- finding prior known-good configurations;
- recovering lineage across renamed systems;
- locating previous identities/roles;
- reconstructing old release topology;
- restoring continuity after storage or service loss;
- distinguishing resurrection of a proven state from creation of a new one.

It does not automatically restore anything. OSIRIS and JANUS own authorized restoration.

## Freshness law

Memory can be durable while current-state truth becomes stale.

Every volatile observation should carry freshness metadata such as:

```text
observed_at
valid_until / ttl
source
source_health
verification_class
```

A 30-day-old service-health observation remains valid history but is not a current health claim.

## Contradiction memory

Correct minority dissent and consensus failures should remain visible where useful. The Estate should be able to retrieve:

`problem → proposals → disagreement → evidence → decision → consequence → critique → revision`

This becomes institutional intelligence for Prometheus, GARI and future governance evaluation.

## Proof gates

Thoth/AEON qualification requires at least:

1. retrieve a complete mission provenance chain;
2. retrieve a prior state without corrupting current state;
3. show an ancestor→descendant system lineage;
4. show one superseded claim plus its replacement;
5. show one failed/recovered execution preserved historically;
6. distinguish historical truth from current truth;
7. restore a known-good coordinate through OSIRIS while preserving the failure evidence;
8. export a deterministic evidence bundle for independent inspection.

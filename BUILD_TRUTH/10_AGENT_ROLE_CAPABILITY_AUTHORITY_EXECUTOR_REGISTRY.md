# 10 — Agent, Role, Capability, Authority, Executor Registry

## Purpose

Ghost Atlas contains multiple agent populations. They are **workforce pools**, not competing control planes.

Known populations include:

- canonical resident Workforce roles;
- FARC repository custodians;
- Native Foundry specialists/donor agents;
- WOOK product-production roles;
- bounded hackathon/product-specific agents;
- future local or remote specialist models.

The common abstraction is:

`AGENT → ROLE → CAPABILITY → AUTHORITY → EXECUTION ENVELOPE → EXECUTOR → PROOF CONTRACT`

Workforce Spine selects an eligible population by capability and authority, not by repository mythology or display name.

## Canonical identities

### Agent
A runtime identity that can perform bounded work. The underlying model may change without changing the agent/role contract.

### Role
A durable job contract containing duties, handoffs, constraints and expected outputs.

### Capability
A normalized statement of what can be done, under what conditions.

### Authority
A grant defining what the role/agent may read, write, mutate, publish, execute or approve.

### Executor
The actual process/service/model/node combination performing the action.

### Execution Envelope
The temporary bounded contract joining mission, role, capability, authority, resource and environment.

## Agent record

```yaml
agent_id: stable-id
name: string
population: resident|farc|foundry|wook|product|other
role_ids: []
model_binding:
  model_class: string
  model_instance: optional
  substitutable: true
state: active|idle|leased|degraded|retired
last_heartbeat: timestamp
capability_passports: []
```

## Role contract

```yaml
role_id: string
title: string
mandate: string
duties: []
accepts_packets: []
produces: []
required_capabilities: []
forbidden_actions: []
upstream_handoffs: []
downstream_handoffs: []
escalation_route: string
proof_requirements: []
```

## Capability phenotype

Capability Genome / GA-CAP should normalize execution requirements into phenotypes.

Example:

```yaml
capability_id: repo.python.repair
inputs:
  - git-repository
requires:
  language: python
  tools: [git, python, pytest]
  network: optional
  filesystem_write: workspace-only
risk_class: reversible-code-change
proof:
  - diff
  - tests-pass
  - seca-verdict
```

A Packet requests a capability phenotype; Workforce Spine resolves eligible roles; CrownGrid resolves eligible execution locations/models.

## Authority envelope

Authority is contextual and expiring.

```yaml
authority_envelope_id: string
issued_by: janus-or-human-authority
subject_role: string
subject_agent: string
mission_id: string
packet_id: string
allowed_capabilities: []
read_scopes: []
write_scopes: []
network_scopes: []
credential_scopes: []
publish_scopes: []
destructive_actions: false
irreversible_actions: false
expires_at: timestamp
revocable: true
human_confirmation_required: []
```

No agent receives implied estate-wide authority merely because it is called “admin,” “architect,” “zero,” or “prime.”

## Execution envelope

The execution envelope is the runtime join of role + Packet + authority + environment.

Required fields:

```text
EXECUTION_ENVELOPE_ID
MISSION_ID
PACKET_ID
AGENT_ID
ROLE_ID
CAPABILITY_IDS[]
AUTHORITY_ENVELOPE_ID
FILESYSTEM_READ_SCOPE[]
FILESYSTEM_WRITE_SCOPE[]
NETWORK_SCOPE[]
CREDENTIAL_SCOPE[]
MODEL_CLASS_ALLOWED[]
NODE_CLASS_ALLOWED[]
MAX_RUNTIME
MAX_MUTATIONS
MAX_COST
REVERSIBILITY_CLASS
ROLLBACK_REQUIRED
MEDUSA_OBSERVATION_REQUIRED
SECA_VERIFICATION_REQUIRED
PROOFGRID_RECEIPT_REQUIRED
```

## Capability passports and mastery

Before an agent receives sensitive capability, the Estate may require a capability passport.

Passport evidence can include:

- sandbox trial;
- deterministic test suite;
- prior accepted work;
- tool-specific validation;
- safety/permission test;
- version qualification.

Capability mastery never automatically grants broader authority. Authorization remains separate.

## Model substitutability

The model is a resource beneath the role contract.

Preferred rule:

`ROLE_ID + CAPABILITY + AUTHORITY` remains stable while `MODEL_INSTANCE` may change.

This permits:

- local model replacement;
- remote model failover;
- larger/smaller model routing;
- benchmark-driven optimization;
- vendor independence;
- privacy-based routing.

A change of model must be captured in execution receipts.

## Workforce selection algorithm

Conceptually:

```text
PACKET REQUIREMENTS
    ↓
CAPABILITY PHENOTYPE
    ↓
ELIGIBLE ROLES
    ↓
ELIGIBLE AGENTS
    ↓
AUTHORITY FILTER
    ↓
HEALTH / LOAD / MODEL / NODE FILTER
    ↓
LEASE
    ↓
EXECUTION ENVELOPE
```

No eligible candidate produces `BLOCKED_NO_ELIGIBLE_EXECUTOR` rather than silently widening permissions.

## Leases

A lease should include:

```text
LEASE_ID
PACKET_ID
AGENT_ID
EXECUTOR_ID
ISSUED_AT
EXPIRES_AT
HEARTBEAT_INTERVAL
RENEWAL_RULE
REVOCATION_RULE
```

Stale leases must become reclaimable without duplicating irreversible actions.

## Handoff semantics

Roles do not “finish” by dropping an artifact in a folder. Completion requires a downstream handoff or terminal state.

Typical chain:

`Researcher → Architect → Builder → Reviewer → Verifier → Release/Operator`

Each transition carries Packet state and proof refs.

## Proof gates

The registry is qualified when:

1. at least two distinct agent populations resolve through one capability schema;
2. one role runs on two different model instances without changing authority;
3. one Packet is denied because capability exists but authority does not;
4. one stale lease is reclaimed safely;
5. one agent failure causes bounded reassignment;
6. one capability passport gates a sensitive action;
7. all executed actions record role, agent, model, node and authority envelope;
8. Workforce Spine can explain why a specific executor was selected.

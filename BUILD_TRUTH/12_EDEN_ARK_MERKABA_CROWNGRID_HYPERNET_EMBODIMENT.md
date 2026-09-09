# 12 — EDEN, ARK, Merkaba, CrownGrid, and Hypernet Embodiment

## Purpose

Ghost Atlas is not complete as a cloud-only architecture. The Map of Reality includes **physical embodiment**: machines, phones, storage, networks, models, processes and their current capability state.

The embodiment hierarchy is:

`COMMAND SURFACES → CROWNGRID → NODE/MODEL ROUTE → EDEN / ARK / MERKABA / REMOTE → HYPERNET → RECEIPT`

## EDEN / Cali

EDEN is the primary home/runtime body.

Canonical responsibilities:

- resident execution;
- local model access;
- Windows/WSL/container workloads where available;
- artifact generation;
- local storage and proof staging;
- self-hosted runner execution;
- service/task/daemon hosting;
- machine-local recovery;
- physical truth receipts.

EDEN does not become globally healthy merely because its GitHub runner answers. Health claims must name the specific layer proven.

## ARK family

ARK is the portable/local-first embodiment family.

ARK nodes may provide:

- field command surface;
- local queue;
- evidence capture;
- sensor/camera/device input;
- offline/disconnected work;
- lightweight local inference;
- Wake-on-LAN/sentinel functions;
- local proof transport;
- operator identity/device ceremony where required.

An ARK should not be forced to become a miniature EDEN if it is better used as a field/control node.

## Merkaba family

Merkaba represents larger embodied nodes for site, vehicle, community, infrastructure or higher-capacity deployments.

A Merkaba node must still expose the same canonical node/capability/authority/proof contracts as EDEN and ARK; scale does not create a new control plane.

## CrownGrid

CrownGrid is the placement and estate-I/O abstraction above physical machines.

CrownGrid responsibilities:

- node discovery;
- node identity;
- capability manifests;
- model residency;
- health/freshness;
- load and queue depth;
- resource telemetry;
- placement selection;
- failover;
- route receipts;
- transport handoff to Hypernet or local executor adapters.

CrownGrid should answer:

> Which currently eligible execution path best satisfies this Packet under capability, privacy, authority, cost and latency constraints?

not simply:

> Which machine has the biggest model?

## Node manifest

```yaml
node_id: string
node_class: eden|ark|merkaba|workstation|remote
hostname: string
os: string
architecture: string
cpu:
  model: string
  utilization: number
ram:
  total_gb: number
  available_gb: number
gpu:
  model: string
  vram_total_gb: number
  vram_available_gb: number
storage: []
network: []
models_resident: []
executor_classes: []
capabilities: []
power_class: string
queue_depth: integer
active_workers: integer
health: string
last_heartbeat: timestamp
proof_ref: string
```

## Model residency

Model placement is a first-class scheduling input.

CrownGrid should know:

- model family/version;
- quantization where relevant;
- runtime (Ollama/llama.cpp/vLLM/etc.);
- node residency;
- load time/cold-start cost;
- VRAM/RAM requirements;
- benchmark history by Packet class;
- privacy class;
- external API dependency.

The goal is **time-to-verified-outcome**, not benchmark vanity.

## Hypernet

Hypernet is the distributed nervous/transport fabric.

It may carry:

- events;
- Packets;
- queue state;
- node discovery;
- proof references;
- health heartbeats;
- command envelopes;
- reconciliation data;
- public/private federation routes.

Hypernet does **not** own canonical local state. Transport success is not business/runtime proof.

## ServerForge and RoadBridge

### ServerForge
Provides server/service communication surfaces and external interface nervous-system functions. It should expose adapters into the canonical event/Packet/proof model rather than inventing an alternate state grammar.

### RoadBridge
Provides field capture and mobility routing. It binds phones/field devices/observations to CrownGrid/Hypernet while preserving device identity, source timestamp and trust class.

## Physical estate census

The canonical physical baseline must observe, where applicable:

- Windows version/build;
- services;
- scheduled tasks;
- running processes;
- listening ports;
- volumes and free space;
- repository checkouts;
- WSL distributions;
- Docker engine/containers/images/Compose projects;
- Git/GitHub runner state;
- Tailscale/Hypernet state;
- Ollama/model state;
- GPU/CPU/RAM;
- Android/ADB devices;
- ARK/JANUS/ODIN connectivity;
- critical runtime directories under `C:\Ghost`;
- current proof paths.

The census should be primarily observational. Mutation is routed as separate repair work.

## Local-fabric portability proof

Canonical receipt target:

`GA-LOCAL-FABRIC-PORTABILITY-001`

Proof:

```text
same Packet capability contract
        ↓
executor/node A
        ↓ PASS
same Packet capability contract
        ↓
executor/node B
        ↓ PASS
        ↓
same SECA acceptance criteria
```

This demonstrates hardware substitutability beneath the command plane.

## Disconnected operation

At least one ARK/local node should eventually prove:

`receive/retain bounded Packet → lose central connection → continue permitted local work → preserve local receipt → reconnect → reconcile without duplicate mutation`.

## Physical-truth law

Physical claims require physical evidence. Examples:

- `RUNNER_REACHABLE` proves job transport/runner claim, not whole-machine health.
- `OLLAMA_LIST_PASS` proves model-service response, not model-quality proof.
- `DOCKER_HEALTHY` proves Docker scope only.
- `UE_BUILD_RECEIPT` proves the specific Unreal build/cook/package chain it references.

Every receipt names exactly what it proves.

## Proof gates

Embodiment is qualified when:

1. current physical census is returned with timestamps;
2. CrownGrid has at least two node identities or explicitly records the current single-node limit;
3. node capability manifests are fresh and evidence-linked;
4. one Packet is routed by capability rather than hard-coded hostname;
5. one failover or portability case is proven;
6. one disconnected/reconciled field path is proven when ARK hardware permits;
7. local model routing records model+node in the receipt;
8. physical runner/service survives reboot where resident operation is claimed;
9. Hypernet transports without becoming canonical truth owner;
10. all physical deltas return to Universal Atlas/SESHAT.

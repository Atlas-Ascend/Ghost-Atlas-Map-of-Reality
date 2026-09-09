# Software Design

## Architectural style

The MVP is an immutable, zero-runtime-dependency Node.js service. The canonical model is code-defined and validated before promotion. The service publishes the graph through a read-only HTTP API and a browser visualization. This keeps the initial executable map deterministic while leaving persistence and live estate ingestion behind explicit future gates.

## Runtime modules

- `src/model.js` — canonical layers, nodes, edges, original 23-organ registry, Wheel of Reality, campaign packets, invariants.
- `src/server.js` — HTTP transport, health, API and static UI serving.
- `public/` — human-operable visualization surface.
- `scripts/verify.mjs` — invariant gate.
- `scripts/generate-receipt.mjs` — deterministic model hash + implementation receipt.
- `test/` — unit/integration tests.

## Data authority

Universal Atlas owns graph topology; SESHAT owns time/deltas; Thoth owns memory/provenance; SECA/ProofGrid own verified-evidence promotion. The MVP encodes these contracts but does not fabricate live data from those systems.

## Future adapters

Live adapters must arrive as bounded producers: GitHub, EDEN filesystem census, Windows/WSL/Docker/Ollama, Hypernet/Tailscale, Thoth, ProofGrid and external evidence. Each adapter emits observations with source, timestamp and epistemic class. No adapter may self-promote an observation into canonical truth.

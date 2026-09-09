# Live Estate Sensory Loop

## Purpose

Turn the Map of Reality from a canonical architecture model into a freshness-aware observer of the real Ghost Atlas Estate without exposing raw machine data publicly.

## Physical evidence path

`PHYSICAL EDEN → Eden-2.0 self-hosted GitHub Actions workflow → sanitized census → GitHub OIDC attestation → Map of Reality ingest → freshness gate → UI / Proof API`

The ingest endpoint has no shared API key. It accepts a GitHub Actions OIDC JWT only when all of these match exactly:

- issuer: `https://token.actions.githubusercontent.com`
- audience: `ghost-atlas-map-of-reality`
- repository: `Atlas-Ascend/Eden-2.0`
- ref: `refs/heads/main`
- workflow: `.github/workflows/map-of-reality-physical-census.yml`

The JWT signature is validated from GitHub's published JWKS.

## Public-data boundary

The public payload is allowlisted. It may contain coarse health gates and counts only. It does not accept or publish IP addresses, MAC addresses, usernames, credentials, token material, file contents, process command lines, private repository URLs, or detailed network topology.

Raw detailed census evidence remains a private Eden-2.0 Actions artifact.

## Freshness law

A physical observation is not perpetual truth.

`FRESH_PROVEN → STALE → superseded by next signed observation`

Default freshness: 2 hours. New ingest must be no older than 15 minutes.

## Persistence truth boundary

The current public runtime uses `EPHEMERAL_PROCESS_CACHE`. Render restart can clear the live cache. The hourly physical workflow repopulates it, while the private GitHub proof artifact remains the durable witness for that run.

Durable Thoth / SESHAT writeback is a later promotion gate and is not claimed by this implementation.

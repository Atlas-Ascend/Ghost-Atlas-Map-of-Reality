import { createHash } from 'node:crypto';

const MAX_HISTORY = 72;
const FRESH_MS = Number(process.env.GA_LIVE_FRESH_MS || 2 * 60 * 60 * 1000);
const MAX_INGEST_AGE_MS = Number(process.env.GA_MAX_INGEST_AGE_MS || 15 * 60 * 1000);
const MAX_FUTURE_SKEW_MS = 2 * 60 * 1000;
const GATES = ['windows','cghost','git','github_runner','wsl','docker','ollama','tailscale','adb','thoth','workforce'];
const METRICS = ['uptime_minutes','logical_cpu_count','memory_gb','cghost_top_level_count','repo_count','runner_service_count','wsl_distro_count','docker_running_containers','ollama_model_count','tailscale_connected','adb_device_count'];
const PROOF = ['github_run_id','head_sha','ref','repository','workflow','runner_name'];

let latest = null;
const history = [];

const safeText = (value, max=160) => typeof value === 'string' ? value.slice(0,max) : null;
const safeNumber = value => typeof value === 'number' && Number.isFinite(value) ? value : null;
const safeBoolean = value => typeof value === 'boolean' ? value : null;

export function normalizePhysicalSnapshot(input, now=Date.now()) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('INVALID_SNAPSHOT');
  if (Number(input.schema_version) !== 1) throw new Error('UNSUPPORTED_SCHEMA_VERSION');
  const machineId = safeText(input.machine_id,64);
  if (!machineId || !/^[A-Za-z0-9._-]+$/.test(machineId)) throw new Error('INVALID_MACHINE_ID');
  const capturedMs = Date.parse(input.captured_at);
  if (!Number.isFinite(capturedMs)) throw new Error('INVALID_CAPTURED_AT');
  if (capturedMs > now + MAX_FUTURE_SKEW_MS) throw new Error('CAPTURED_AT_IN_FUTURE');
  if (now - capturedMs > MAX_INGEST_AGE_MS) throw new Error('SNAPSHOT_TOO_OLD_FOR_INGEST');

  const gates = {};
  for (const key of GATES) {
    const value = safeText(input.gates?.[key],48);
    if (value) gates[key] = value.toUpperCase();
  }

  const metrics = {};
  for (const key of METRICS) {
    const raw = input.metrics?.[key];
    const value = key === 'tailscale_connected' ? safeBoolean(raw) : safeNumber(raw);
    if (value !== null) metrics[key] = value;
  }

  const proof = {};
  for (const key of PROOF) {
    const value = safeText(String(input.proof?.[key] ?? ''), key === 'head_sha' ? 64 : 220);
    if (value) proof[key] = value;
  }

  return {
    schema_version: 1,
    machine_id: machineId,
    captured_at: new Date(capturedMs).toISOString(),
    source: 'physical_eden_github_oidc',
    gates,
    metrics,
    proof
  };
}

export function acceptPhysicalSnapshot(input, identity, now=Date.now()) {
  const snapshot = normalizePhysicalSnapshot(input, now);
  const acceptedAt = new Date(now).toISOString();
  const attestation = {
    issuer: identity.iss,
    repository: identity.repository,
    ref: identity.ref,
    workflow_ref: identity.workflow_ref || identity.job_workflow_ref,
    run_id: identity.run_id || snapshot.proof.github_run_id || null,
    actor: identity.actor || null
  };
  const canonical = JSON.stringify({snapshot,attestation,accepted_at:acceptedAt});
  const receipt = {
    receipt_id: `GA-PHYSICAL-INGEST-${createHash('sha256').update(canonical).digest('hex').slice(0,16)}`,
    accepted_at: acceptedAt,
    state: 'PHYSICAL_EVIDENCE_ACCEPTED',
    machine_id: snapshot.machine_id,
    captured_at: snapshot.captured_at,
    attestation
  };
  latest = {...snapshot, accepted_at: acceptedAt, attestation, receipt_id: receipt.receipt_id};
  history.unshift(latest);
  if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
  return receipt;
}

export function getLiveState(now=Date.now()) {
  if (!latest) return {
    state: 'UNSEEN',
    freshness: 'NO_PHYSICAL_SNAPSHOT',
    age_seconds: null,
    latest: null,
    storage: 'EPHEMERAL_PROCESS_CACHE',
    truth_boundary: 'Only GitHub-OIDC-attested physical EDEN census payloads are accepted. Durable Thoth/SESHAT persistence is not yet claimed.'
  };
  const ageMs = Math.max(0, now - Date.parse(latest.captured_at));
  const fresh = ageMs <= FRESH_MS;
  return {
    state: fresh ? 'FRESH_PROVEN' : 'STALE',
    freshness: fresh ? 'WITHIN_FRESHNESS_WINDOW' : 'OUTSIDE_FRESHNESS_WINDOW',
    age_seconds: Math.round(ageMs/1000),
    latest,
    storage: 'EPHEMERAL_PROCESS_CACHE',
    truth_boundary: 'Physical state is a signed observation at captured_at, not a claim of perpetual machine health. Raw detailed census remains private in GitHub Actions proof.'
  };
}

export function getLiveHistory(now=Date.now()) {
  return {count:history.length, current:getLiveState(now).state, history:[...history], storage:'EPHEMERAL_PROCESS_CACHE'};
}

export function resetLiveStateForTests() {
  latest = null;
  history.length = 0;
}

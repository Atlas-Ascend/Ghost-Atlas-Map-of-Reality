import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { layers, nodes, edges, organRegistry23, validateModel } from './model.js';
import { getLiveState } from './live-state.js';
import { buildOrganismPacket } from './organism-packet.js';
import { getResidentDoctrine, getDoctrineOfDoctrines, getTriModeOs } from './doctrine.js';

const sources = [
  { key: 'convergence_manifest', path: './singularity-40-manifest.json', expected_git_blob: 'cb5920af495ee58a1ff6b8db639b299304866b24' },
  { key: 'sovereignty_policy', path: './sovereign-reclamation-snapshot.json', expected_git_blob: 'f07643f8c7707d5f21956903507efc4ba279cd74' }
];
const history = [];
let active = null;
const hash = (value) => createHash('sha256').update(typeof value === 'string' ? value : JSON.stringify(value)).digest('hex');
const sourceBlob = (bytes) => createHash('sha1').update(Buffer.concat([Buffer.from('blob ' + bytes.length + '\0'), bytes])).digest('hex');
const requireTruth = (ok, code) => { if (!ok) throw new Error(code); };
const sourceSnapshot = () => Object.fromEntries(sources.map((s) => {
  const bytes = readFileSync(fileURLToPath(new URL(s.path, import.meta.url)));
  const git_blob = sourceBlob(bytes);
  requireTruth(git_blob === s.expected_git_blob, 'CANONICAL_SOURCE_DRIFT_' + s.key);
  return [s.key, { data: JSON.parse(bytes.toString('utf8')), git_blob, sha256: hash(bytes.toString('utf8')) }];
}));
function policyChecks(p) {
  return {
    quarantine: p.mode === 'QUARANTINE_ONLY',
    activation_disabled: p.activation?.enabled === false,
    no_delegation: p.operator?.delegation_enabled === false,
    authenticated_commands: p.operator?.execution_requires_authenticated_command === true,
    one_mind: p.one_mind_covenant?.principles?.length === 7,
    nine_realms: p.realms?.length === 9,
    no_new_repositories: p.reconstruction?.no_new_repositories === true,
    no_human_judgment: p.records?.real_person_judgment === false
  };
}

export function getSingularityCycleState() {
  return {
    schema: 'GA-SINGULARITY-40-CYCLE-STATE-v1',
    latest: history[0] || null,
    cycle_count_this_process: history.length,
    running: Boolean(active),
    storage: 'process-memory-and-Render-app-logs',
    scope: 'read-only source-and-model proof, no agents executed',
    server_restart_loses_in_memory_history: true
  };
}
export function runSingularityCycle(trigger = 'operator') {
  if (active) return active;
  active = performCycle(trigger).finally(() => { active = null; });
  return active;
}

async function performCycle(trigger) {
  const started_at = new Date().toISOString();
  const stages = [];
  const ctx = {};
  const stage = async (id, run) => {
    const began = Date.now();
    try {
      const evidence = await run();
      stages.push({ id, status: 'PASS', elapsed_ms: Date.now() - began, evidence });
    } catch (err) {
      stages.push({ id, status: 'FAIL', elapsed_ms: Date.now() - began, code: String(err.message || err).slice(0,160) });
      throw err;
    }
  };
  try {
    await stage('OBSERVER', () => {
      ctx.sources = sourceSnapshot();
      ctx.model = validateModel();
      requireTruth(ctx.model.ok, 'MAP_MODEL_INVALID');
      return {
        pinned_git_blobs: Object.fromEntries(Object.entries(ctx.sources).map(([k,v]) => [k,v.git_blob])),
        model_counts: ctx.model.counts,
        model_valid: true
      };
    });
    await stage('PERMISSION', () => {
      const p = ctx.sources.sovereignty_policy.data;
      const checks = policyChecks(p);
      requireTruth(Object.values(checks).every(Boolean), 'SOVEREIGNTY_POLICY_CHECK_FAILED');
      ctx.policy_checks = checks;
      return { passed: Object.values(checks).length, total: Object.keys(checks).length, checks, agent_execution: 'DENY', promotion: 'GATED' };
    });
    await stage('INTENTION', () => {
      const m = ctx.sources.convergence_manifest.data;
      const count = m.requested_conversation_count;
      const recorded = m.existing_meta_fate_corpus_count;
      requireTruth(count === 40 && recorded === 27 && count - recorded === m.unresolved_exact_source_slots, 'SOURCE_COUNT_MISMATCH');
      requireTruth(m.exact_40_conversation_identity_verified === false && m.execution.can_execute_agents === false, 'ACTIVATION_CLAIM_MISMATCH');
      return { requested: count, recorded_meta_fate_entries: recorded, missing_exact_source_slots: count-recorded, exact_40_verified: false };
    });
    await stage('IMAGINATION', () => {
      const m = ctx.sources.convergence_manifest.data;
      requireTruth(m.known_framework_lanes.length === 17, 'FRAMEWORK_LANE_DRIFT');
      requireTruth(new Set(m.known_framework_lanes.map(x=>x.id)).size === 17, 'DUPLICATE_LANE_ID');
      const must = ['JANUS_ODIN','THOTH','ATLAS_MIND','QUETZALCOATL','PACKET_OS','WORKFORCE_SPINE','CROWNGRID','MEDUSA','SECA_DEVOS','METAFORGE','EDEN_CALI'];
      requireTruth(must.every(x=>m.existing_owner_routes.includes(x)), 'CANONICAL_OWNER_ROUTE_MISSING');
      return { candidate_frameworks: 17, canonical_owners: must, new_repositories: 0 };
    });
    await stage('ACTION', async () => {
      const manifest = ctx.sources.convergence_manifest.data;
      // Bounded concurrent capability evaluation: validates/hashes candidate lane descriptions, no external execution.
      ctx.lanes = await Promise.all(manifest.known_framework_lanes.map(async (l) => {
        requireTruth(/^FRAMEWORK-\d{2}$/.test(l.id), 'INVALID_LANE_ID');
        requireTruth(l.source_state === 'PRIOR_CONTEXT_ONLY_REQUIRES_EXACT_CHAT_BINDING', 'UNVERIFIED_SOURCE_PROMOTION');
        return { id: l.id, name: l.name, status: 'SOURCE_PROJECTION_VALIDATED', source_verified: false, packet_sha256: hash({ id:l.id, name:l.name, source_state:l.source_state }) };
      }));
      return { concurrency: 'Promise.all', lane_count:ctx.lanes.length, lane_projection_hash:hash(ctx.lanes), system_mutations:0, real_agents_dispatched:0 };
    });
    await stage('FEEDBACK', () => {
      const live = getLiveState();
      ctx.packet = buildOrganismPacket(live);
      return { physical_evidence_state:live.state, physical_age_seconds:live.age_seconds, packet_id:ctx.packet.packet_id, packet_state:ctx.packet.state, model_layers:layers.length, model_nodes:nodes.length, model_edges:edges.length };
    });
    await stage('PROOF', () => {
      requireTruth(ctx.model.ok && organRegistry23.length === 23, 'PROOF_MODEL_FAILURE');
      requireTruth(ctx.lanes.length === 17 && Object.values(ctx.policy_checks).every(Boolean), 'PROOF_CHAIN_INVALID');
      const tri=getTriModeOs(), doc=getResidentDoctrine(), meta=getDoctrineOfDoctrines();
      return { map_validation:'PASS', organs:23, governance:'PASS', framework_projections:17, resident_doctrine:doc.version, meta_doctrine:meta.version, tri_mode_os:tri.version, full_40_chat_ingestion:'PENDING_13', medusa_seca_live_approval:'PENDING' };
    });
    await stage('INTEGRATION', () => ({
      existing_routes: ctx.sources.convergence_manifest.data.existing_owner_routes,
      record_mode:'EPHEMERAL_RECEIPT_PLUS_APP_LOG',
      thoth_writeback:'NOT_ATTESTED',
      credential_material_recorded:false
    }));
    await stage('RETURN', () => ({
      operator_result:'READ_ONLY_FULL_WHEEL_CYCLE_COMPLETED',
      next_gate:'VERIFY_13_SOURCE_BINDINGS_AND_INDEPENDENT_MEDUSA_SECA_PROMOTION',
      physical_runtime_promotion:false
    }));
  } catch {
    // Stage error has already been captured. Return a fail-closed receipt.
  }
  const receipt = {
    schema:'GA-SINGULARITY-40-CYCLE-RECEIPT-v1',
    campaign:'GA-EDEN-SINGULARITY-40-20261018',
    trigger: trigger === 'startup' ? 'startup' : 'authenticated_operator',
    started_at,
    ended_at:new Date().toISOString(),
    execution_scope:'READ_ONLY_CANONICAL_CONVERGENCE_AND_MODEL_CHECK',
    state: stages.length === 9 && stages.every(s=>s.status==='PASS') ? 'PROOF_CYCLE_PASS_PROMOTION_GATED' : 'PROOF_CYCLE_FAIL',
    stage_count:stages.length,
    stages,
    live_runtime_execution:false,
    external_agent_execution:false,
    exact_40_chat_ingestion:false,
    production_promotion:false
  };
  receipt.receipt_sha256 = hash(receipt);
  history.unshift(receipt); if (history.length > 16) history.length = 16;
  console.info('EDEN_SINGULARITY_CYCLE_RECEIPT=' + JSON.stringify({ receipt_sha256:receipt.receipt_sha256, state:receipt.state, stage_count:receipt.stage_count, stages:stages.map(s=>s.id+':'+s.status), timestamp:receipt.ended_at, trigger:receipt.trigger }));
  return receipt;
}

import { createHash } from 'node:crypto';

const TARGET_SYSTEMS = ['workforce-spine','Packet-OS','JANUS','Thoth','Universal-Atlas'];

export function buildOrganismPacket(live, now=Date.now()) {
  const receiptId = live?.latest?.receipt_id || null;
  const correlationId = receiptId || `GA-MOR-${String(live?.state || 'UNSEEN')}`;
  const identity = JSON.stringify({correlationId,state:live?.state || 'UNSEEN',captured_at:live?.latest?.captured_at || null});
  const packetId = `GA-MOR-SENSOR-${createHash('sha256').update(identity).digest('hex').slice(0,16)}`;
  return {
    contract: 'GA-C2P-1',
    packet_id: packetId,
    correlation_id: correlationId,
    intent: 'OBSERVE_ESTATE_STATE',
    source_system: 'Ghost-Atlas-Map-of-Reality',
    target_systems: TARGET_SYSTEMS,
    state: live?.state === 'FRESH_PROVEN' ? 'READY' : 'OBSERVATION_ONLY',
    artifact_refs: [
      {kind:'api',ref:'/api/v1/live'},
      {kind:'api',ref:'/api/v1/map'}
    ],
    proof_refs: receiptId ? [{kind:'physical_evidence_receipt',ref:receiptId}] : [],
    timestamps: {
      observed_at: live?.latest?.captured_at || null,
      emitted_at: new Date(now).toISOString()
    },
    evidence_class: live?.state === 'FRESH_PROVEN' ? 'SIGNED_PHYSICAL_OBSERVATION' : 'NON_PROMOTABLE_OBSERVATION',
    route: {
      producer: 'Ghost-Atlas-Map-of-Reality',
      consumer: 'workforce-spine',
      next_authority: 'Packet-OS',
      verification: 'SECA/DevOS',
      memory: 'Thoth',
      command: 'JANUS'
    },
    observation: {
      physical_state: live?.state || 'UNSEEN',
      freshness: live?.freshness || 'NO_PHYSICAL_SNAPSHOT',
      age_seconds: live?.age_seconds ?? null,
      machine_id: live?.latest?.machine_id || null,
      gates: live?.latest?.gates || {},
      metrics: live?.latest?.metrics || {}
    },
    promotion_law: 'This packet is sensory input only. Workforce Spine and Packet OS own routing; SECA/DevOS owns verification; no packet self-promotes.'
  };
}

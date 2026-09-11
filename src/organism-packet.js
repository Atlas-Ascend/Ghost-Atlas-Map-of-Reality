import { createHash } from 'node:crypto';

const TARGET_SYSTEMS = [
  'workforce-spine',
  'Packet-OS',
  'JANUS',
  'Atlas-Mind',
  'SECA/DevOS',
  'ProofGrid',
  'Thoth',
  'SESHAT',
  'Universal-Atlas'
];

const WHEEL_ROUTE = [
  { phase:'OBSERVER', systems:['Ghost-Atlas-Map-of-Reality'] },
  { phase:'PERMISSION', systems:['Medusa','JANUS'] },
  { phase:'INTENTION', systems:['JANUS'] },
  { phase:'IMAGINATION', systems:['Atlas-Mind'] },
  { phase:'ACTION', systems:['Packet-OS','workforce-spine'] },
  { phase:'FEEDBACK', systems:['Ghost-Atlas-Map-of-Reality'] },
  { phase:'PROOF', systems:['SECA/DevOS','ProofGrid'] },
  { phase:'INTEGRATION', systems:['Thoth','SESHAT','Universal-Atlas'] },
  { phase:'RETURN', systems:['Atlas-Mind'] }
];

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
      {kind:'api',ref:'/api/v1/map'},
      {kind:'api',ref:'/api/v1/wheel'}
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
      command: 'JANUS',
      cognition: 'Atlas-Mind',
      verification: 'SECA/DevOS',
      proof: 'ProofGrid',
      memory: 'Thoth',
      temporal_index: 'SESHAT',
      reality_map: 'Universal-Atlas',
      return_context: 'Atlas-Mind'
    },
    wheel_route: WHEEL_ROUTE,
    observation: {
      physical_state: live?.state || 'UNSEEN',
      freshness: live?.freshness || 'NO_PHYSICAL_SNAPSHOT',
      age_seconds: live?.age_seconds ?? null,
      machine_id: live?.latest?.machine_id || null,
      gates: live?.latest?.gates || {},
      metrics: live?.latest?.metrics || {}
    },
    promotion_law: 'This packet is sensory input only. Workforce Spine and Packet OS own routing; JANUS/Medusa govern permission; SECA/DevOS verifies; ProofGrid receipts; Thoth/SESHAT/Universal Atlas integrate; Atlas Mind receives the returned result. No packet self-promotes.'
  };
}

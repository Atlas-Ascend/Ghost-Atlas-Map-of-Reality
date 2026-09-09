import test from 'node:test';
import assert from 'node:assert/strict';
import { buildOrganismPacket } from '../src/organism-packet.js';

test('GA-C2P-1 packet preserves organism routing fields',()=>{
  const now=Date.now();
  const packet=buildOrganismPacket({state:'FRESH_PROVEN',freshness:'WITHIN_FRESHNESS_WINDOW',age_seconds:5,latest:{receipt_id:'GA-PHYSICAL-INGEST-abc',captured_at:new Date(now).toISOString(),machine_id:'EDEN',gates:{windows:'PASS'},metrics:{repo_count:42}}},now);
  for(const key of ['packet_id','correlation_id','intent','source_system','target_systems','state','artifact_refs','proof_refs','timestamps']) assert.ok(packet[key]!==undefined,key);
  assert.equal(packet.contract,'GA-C2P-1');
  assert.equal(packet.source_system,'Ghost-Atlas-Map-of-Reality');
  assert.equal(packet.state,'READY');
  assert.ok(packet.target_systems.includes('workforce-spine'));
  assert.equal(packet.evidence_class,'SIGNED_PHYSICAL_OBSERVATION');
});

test('unseen state never self-promotes',()=>{
  const packet=buildOrganismPacket({state:'UNSEEN',freshness:'NO_PHYSICAL_SNAPSHOT',age_seconds:null,latest:null});
  assert.equal(packet.state,'OBSERVATION_ONLY');
  assert.equal(packet.evidence_class,'NON_PROMOTABLE_OBSERVATION');
  assert.equal(packet.proof_refs.length,0);
});

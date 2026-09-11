import test from 'node:test';
import assert from 'node:assert/strict';
import { buildOrganismPacket } from '../src/organism-packet.js';

test('GA-C2P-1 packet preserves organism routing fields',()=>{
  const now=Date.now();
  const packet=buildOrganismPacket({state:'FRESH_PROVEN',freshness:'WITHIN_FRESHNESS_WINDOW',age_seconds:5,latest:{receipt_id:'GA-PHYSICAL-INGEST-abc',captured_at:new Date(now).toISOString(),machine_id:'EDEN',gates:{windows:'PASS'},metrics:{repo_count:42}}},now);
  for(const key of ['packet_id','correlation_id','intent','source_system','target_systems','state','artifact_refs','proof_refs','timestamps','route','wheel_route']) assert.ok(packet[key]!==undefined,key);
  assert.equal(packet.contract,'GA-C2P-1');
  assert.equal(packet.source_system,'Ghost-Atlas-Map-of-Reality');
  assert.equal(packet.state,'READY');
  for(const system of ['workforce-spine','Packet-OS','JANUS','Atlas-Mind','SECA/DevOS','ProofGrid','Thoth','SESHAT','Universal-Atlas']) {
    assert.ok(packet.target_systems.includes(system),system);
  }
  assert.deepEqual(packet.wheel_route.map(stage=>stage.phase),['OBSERVER','PERMISSION','INTENTION','IMAGINATION','ACTION','FEEDBACK','PROOF','INTEGRATION','RETURN']);
  assert.equal(packet.route.cognition,'Atlas-Mind');
  assert.equal(packet.route.proof,'ProofGrid');
  assert.equal(packet.route.memory,'Thoth');
  assert.equal(packet.route.temporal_index,'SESHAT');
  assert.equal(packet.route.reality_map,'Universal-Atlas');
  assert.equal(packet.route.return_context,'Atlas-Mind');
  assert.ok(packet.artifact_refs.some(ref=>ref.ref==='/api/v1/wheel'));
  assert.equal(packet.evidence_class,'SIGNED_PHYSICAL_OBSERVATION');
});

test('unseen state never self-promotes',()=>{
  const packet=buildOrganismPacket({state:'UNSEEN',freshness:'NO_PHYSICAL_SNAPSHOT',age_seconds:null,latest:null});
  assert.equal(packet.state,'OBSERVATION_ONLY');
  assert.equal(packet.evidence_class,'NON_PROMOTABLE_OBSERVATION');
  assert.equal(packet.proof_refs.length,0);
  assert.match(packet.promotion_law,/No packet self-promotes/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { runSingularityCycle, getSingularityCycleState } from '../src/singularity-cycle.js';

test('sovereign Singularity 40 executes a complete governed read-only wheel', async () => {
  const receipt = await runSingularityCycle('operator');
  assert.equal(receipt.state,'PROOF_CYCLE_PASS_PROMOTION_GATED');
  assert.equal(receipt.stage_count,9);
  assert.deepEqual(receipt.stages.map(s=>s.id),[
    'OBSERVER','PERMISSION','INTENTION','IMAGINATION','ACTION','FEEDBACK','PROOF','INTEGRATION','RETURN'
  ]);
  assert.ok(receipt.stages.every(s=>s.status==='PASS'));
  assert.match(receipt.receipt_sha256,/^[0-9a-f]{64}$/);
  assert.equal(receipt.live_runtime_execution,false);
  assert.equal(receipt.external_agent_execution,false);
  assert.equal(receipt.exact_40_chat_ingestion,false);
  assert.equal(receipt.production_promotion,false);
  const stages = Object.fromEntries(receipt.stages.map(s=>[s.id,s.evidence]));
  assert.equal(stages.PERMISSION.passed,8);
  assert.equal(stages.INTENTION.requested,40);
  assert.equal(stages.INTENTION.missing_exact_source_slots,13);
  assert.equal(stages.IMAGINATION.candidate_frameworks,17);
  assert.equal(stages.ACTION.lane_count,17);
  assert.equal(stages.ACTION.system_mutations,0);
  assert.equal(stages.PROOF.organs,23);
  assert.equal(getSingularityCycleState().latest.receipt_sha256,receipt.receipt_sha256);
});

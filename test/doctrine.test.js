import test from 'node:test';
import assert from 'node:assert/strict';
import { getResidentDoctrine, buildResidentBootstrap } from '../src/doctrine.js';

test('resident doctrine loads as active v1', () => {
  const doctrine = getResidentDoctrine();
  assert.equal(doctrine.version, '1.0.0');
  assert.equal(doctrine.status, 'ACTIVE');
  assert.equal(doctrine.council_invocation.always_loaded, true);
  assert.ok(doctrine.claim_types.includes('EMPIRICAL'));
  assert.ok(doctrine.claim_types.includes('SYMBOLIC'));
});

test('resident bootstrap fails closed on authority promotion', () => {
  const bootstrap = buildResidentBootstrap({resident_id:'TEST-RESIDENT', role:'researcher', human_intent_ref:'CASE-001'});
  assert.equal(bootstrap.status, 'DOCTRINE_LOADED');
  assert.equal(bootstrap.invariants.self_promotion, 'DENIED');
  assert.equal(bootstrap.invariants.arbitrary_execution, 'DENIED');
  assert.equal(bootstrap.invariants.consequential_action_without_janus, 'DENIED');
  assert.equal(bootstrap.invariants.empirical_promotion_without_verification, 'DENIED');
  assert.equal(bootstrap.invariants.untyped_claims, 'DENIED');
});

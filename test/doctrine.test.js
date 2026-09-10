import test from 'node:test';
import assert from 'node:assert/strict';
import { getResidentDoctrine, getDoctrineOfDoctrines, buildResidentBootstrap } from '../src/doctrine.js';

test('resident doctrine loads as active v1', () => {
  const doctrine = getResidentDoctrine();
  assert.equal(doctrine.version, '1.0.0');
  assert.equal(doctrine.status, 'ACTIVE');
  assert.equal(doctrine.council_invocation.always_loaded, true);
  assert.ok(doctrine.claim_types.includes('EMPIRICAL'));
  assert.ok(doctrine.claim_types.includes('SYMBOLIC'));
});

test('Doctrine of Doctrines loads as canonical estate-wide meta-doctrine', () => {
  const doctrine = getDoctrineOfDoctrines();
  assert.equal(doctrine.version, '1.0.0');
  assert.equal(doctrine.status, 'CANONICAL');
  assert.equal(doctrine.scope, 'estate-wide');
  assert.equal(doctrine.prime_law, 'No doctrine may grant itself root authority.');
  assert.deepEqual(doctrine.precedence.slice(0, 3), ['HUMAN_AGENCY', 'BUILD_TRUTH', 'DOCTRINE_OF_DOCTRINES']);
  assert.equal(doctrine.conflict_rules.empirical_disputes, 'SECA_DEVOS');
  assert.equal(doctrine.conflict_rules.consequential_unresolved_conflicts, 'JANUS_ODIN');
});

test('resident bootstrap fails closed on authority promotion and loads the complete doctrine stack', () => {
  const bootstrap = buildResidentBootstrap({resident_id:'TEST-RESIDENT', role:'researcher', human_intent_ref:'CASE-001'});
  assert.equal(bootstrap.status, 'DOCTRINE_STACK_LOADED');
  assert.equal(bootstrap.doctrine_version, '1.0.0');
  assert.equal(bootstrap.meta_doctrine_version, '1.0.0');
  assert.equal(bootstrap.doctrine_stack[0], 'HUMAN_AGENCY');
  assert.equal(bootstrap.doctrine_stack[1], 'BUILD_TRUTH');
  assert.equal(bootstrap.doctrine_stack[2], 'DOCTRINE_OF_DOCTRINES');
  assert.equal(bootstrap.invariants.self_promotion, 'DENIED');
  assert.equal(bootstrap.invariants.doctrine_self_crowning, 'DENIED');
  assert.equal(bootstrap.invariants.arbitrary_execution, 'DENIED');
  assert.equal(bootstrap.invariants.consequential_action_without_janus, 'DENIED');
  assert.equal(bootstrap.invariants.empirical_promotion_without_verification, 'DENIED');
  assert.equal(bootstrap.invariants.untyped_claims, 'DENIED');
});

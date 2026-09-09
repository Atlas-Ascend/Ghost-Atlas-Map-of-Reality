import test from 'node:test';
import assert from 'node:assert/strict';
import { acceptPhysicalSnapshot, getLiveState, normalizePhysicalSnapshot, resetLiveStateForTests } from '../src/live-state.js';

const payload=now=>({schema_version:1,machine_id:'EDEN',captured_at:new Date(now).toISOString(),source:'physical_eden_github_oidc',gates:{windows:'pass',docker:'available',secret_extra:'SHOULD_DROP'},metrics:{repo_count:56,ollama_model_count:3,tailscale_connected:true,secret_extra:999},proof:{github_run_id:'123',head_sha:'abc',repository:'Atlas-Ascend/Eden-2.0',runner_name:'EDEN',secret_extra:'DROP'}});

test('physical snapshot is whitelisted and normalized',()=>{const now=Date.now();const s=normalizePhysicalSnapshot(payload(now),now);assert.equal(s.gates.windows,'PASS');assert.equal(s.gates.secret_extra,undefined);assert.equal(s.metrics.repo_count,56);assert.equal(s.metrics.secret_extra,undefined);assert.equal(s.proof.secret_extra,undefined);});
test('fresh signed snapshot promotes only live evidence state',()=>{resetLiveStateForTests();const now=Date.now();acceptPhysicalSnapshot(payload(now),{iss:'https://token.actions.githubusercontent.com',repository:'Atlas-Ascend/Eden-2.0',ref:'refs/heads/main',workflow_ref:'Atlas-Ascend/Eden-2.0/.github/workflows/map-of-reality-physical-census.yml@refs/heads/main',run_id:'123'},now);assert.equal(getLiveState(now).state,'FRESH_PROVEN');assert.equal(getLiveState(now+3*60*60*1000).state,'STALE');});
test('old census is rejected at ingest',()=>{const now=Date.now();assert.throws(()=>normalizePhysicalSnapshot(payload(now-60*60*1000),now),/SNAPSHOT_TOO_OLD/);});

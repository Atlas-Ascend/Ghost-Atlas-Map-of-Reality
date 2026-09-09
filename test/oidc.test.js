import test from 'node:test';
import assert from 'node:assert/strict';
import { validateClaims } from '../src/github-oidc.js';

const expected={audience:'ghost-atlas-map-of-reality',repository:'Atlas-Ascend/Eden-2.0',ref:'refs/heads/main',workflow:'.github/workflows/map-of-reality-physical-census.yml'};
const claims=now=>({iss:'https://token.actions.githubusercontent.com',aud:'ghost-atlas-map-of-reality',repository:'Atlas-Ascend/Eden-2.0',ref:'refs/heads/main',workflow_ref:'Atlas-Ascend/Eden-2.0/.github/workflows/map-of-reality-physical-census.yml@refs/heads/main',iat:now-5,exp:now+300});
test('exact Eden physical workflow claims are accepted',()=>{const now=Math.floor(Date.now()/1000);assert.equal(validateClaims(claims(now),now,expected).repository,'Atlas-Ascend/Eden-2.0');});
test('wrong workflow is denied',()=>{const now=Math.floor(Date.now()/1000);const c={...claims(now),workflow_ref:'Atlas-Ascend/Eden-2.0/.github/workflows/other.yml@refs/heads/main'};assert.throws(()=>validateClaims(c,now,expected),/WORKFLOW_REJECTED/);});
test('wrong repository is denied',()=>{const now=Math.floor(Date.now()/1000);const c={...claims(now),repository:'someone/else'};assert.throws(()=>validateClaims(c,now,expected),/REPOSITORY_REJECTED/);});

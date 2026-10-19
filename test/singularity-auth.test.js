import test from 'node:test';
import assert from 'node:assert/strict';
import { scryptSync } from 'node:crypto';
import { server } from '../src/server.js';

test('EDEN Singularity 40 is password-gated while the Map of Reality remains online', async (t) => {
  const salt = Buffer.from('0123456789abcdeffedcba9876543210', 'hex');
  const syntheticPassword = 'synthetic-test-credential-not-production';
  const digest = scryptSync(syntheticPassword, salt, 32, { N: 16384, r: 8, p: 1 });
  const previousHash = process.env.EDEN_SINGULARITY_SCRYPT_HASH;
  const previousUser = process.env.EDEN_SINGULARITY_USER;
  process.env.EDEN_SINGULARITY_SCRYPT_HASH =
    'scrypt:16384:8:1:' + salt.toString('hex') + ':' + digest.toString('hex');
  process.env.EDEN_SINGULARITY_USER = 'architect';
  t.after(() => {
    if (previousHash === undefined) delete process.env.EDEN_SINGULARITY_SCRYPT_HASH;
    else process.env.EDEN_SINGULARITY_SCRYPT_HASH = previousHash;
    if (previousUser === undefined) delete process.env.EDEN_SINGULARITY_USER;
    else process.env.EDEN_SINGULARITY_USER = previousUser;
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  t.after(() => new Promise(resolve => server.close(resolve)));
  const url = 'http://127.0.0.1:' + server.address().port;
  const unauthorized = await fetch(url + '/singularity');
  assert.equal(unauthorized.status, 401);
  assert.match(unauthorized.headers.get('www-authenticate') || '', /Basic/);
  const badCredential = await fetch(url + '/singularity', {
    headers: { authorization: 'Basic ' + Buffer.from('architect:wrong-password').toString('base64') }
  });
  assert.equal(badCredential.status, 401);
  const accepted = await fetch(url + '/singularity', {
    headers: { authorization: 'Basic ' + Buffer.from('architect:' + syntheticPassword).toString('base64') }
  });
  assert.equal(accepted.status, 200);
  const page = await accepted.text();
  assert.match(page, /SOVEREIGN SINGULARITY/);
  assert.match(page, /40-chat convergence/);
  assert.match(accepted.headers.get('cache-control') || '', /no-store/);
  const bypass = await fetch(url + '/singularity-40.html');
  assert.equal(bypass.status, 404);
  const originalService = await fetch(url + '/health');
  assert.equal(originalService.status, 200);
  assert.equal((await originalService.json()).service, 'ghost-atlas-map-of-reality');
});

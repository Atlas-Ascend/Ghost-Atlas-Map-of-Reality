import { createPublicKey, verify as verifySignature } from 'node:crypto';

const ISSUER = 'https://token.actions.githubusercontent.com';
const DISCOVERY = `${ISSUER}/.well-known/openid-configuration`;
const DEFAULTS = {
  audience: process.env.GA_OIDC_AUDIENCE || 'ghost-atlas-map-of-reality',
  repository: process.env.GA_OIDC_REPOSITORY || 'Atlas-Ascend/Eden-2.0',
  ref: process.env.GA_OIDC_REF || 'refs/heads/main',
  workflow: process.env.GA_OIDC_WORKFLOW || '.github/workflows/map-of-reality-physical-census.yml'
};
let cache = {expires:0, jwks:null};

const decodePart = part => JSON.parse(Buffer.from(part,'base64url').toString('utf8'));
const audienceMatches = (aud, expected) => Array.isArray(aud) ? aud.includes(expected) : aud === expected;

export function validateClaims(claims, nowSeconds=Math.floor(Date.now()/1000), expected=DEFAULTS) {
  if (!claims || typeof claims !== 'object') throw new Error('OIDC_CLAIMS_MISSING');
  if (claims.iss !== ISSUER) throw new Error('OIDC_ISSUER_REJECTED');
  if (!audienceMatches(claims.aud, expected.audience)) throw new Error('OIDC_AUDIENCE_REJECTED');
  if (claims.repository !== expected.repository) throw new Error('OIDC_REPOSITORY_REJECTED');
  if (claims.ref !== expected.ref) throw new Error('OIDC_REF_REJECTED');
  if (!Number.isFinite(Number(claims.exp)) || Number(claims.exp) < nowSeconds - 30) throw new Error('OIDC_EXPIRED');
  if (!Number.isFinite(Number(claims.iat)) || Number(claims.iat) > nowSeconds + 30) throw new Error('OIDC_IAT_REJECTED');
  if (claims.nbf && Number(claims.nbf) > nowSeconds + 30) throw new Error('OIDC_NOT_YET_VALID');
  const workflowRef = claims.job_workflow_ref || claims.workflow_ref || '';
  const required = `${expected.repository}/${expected.workflow}@${expected.ref}`;
  if (workflowRef !== required) throw new Error('OIDC_WORKFLOW_REJECTED');
  return claims;
}

async function getJwks() {
  if (cache.jwks && Date.now() < cache.expires) return cache.jwks;
  const discoveryResponse = await fetch(DISCOVERY,{signal:AbortSignal.timeout(5000)});
  if (!discoveryResponse.ok) throw new Error('OIDC_DISCOVERY_FAILED');
  const discovery = await discoveryResponse.json();
  const jwksResponse = await fetch(discovery.jwks_uri,{signal:AbortSignal.timeout(5000)});
  if (!jwksResponse.ok) throw new Error('OIDC_JWKS_FAILED');
  cache = {jwks:await jwksResponse.json(), expires:Date.now()+10*60*1000};
  return cache.jwks;
}

export async function verifyGitHubActionsOidc(token) {
  if (!token || typeof token !== 'string') throw new Error('OIDC_TOKEN_MISSING');
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('OIDC_TOKEN_MALFORMED');
  const [encodedHeader,encodedPayload,encodedSignature] = parts;
  const header = decodePart(encodedHeader);
  const claims = decodePart(encodedPayload);
  if (header.alg !== 'RS256' || !header.kid) throw new Error('OIDC_HEADER_REJECTED');
  const jwks = await getJwks();
  const jwk = jwks.keys?.find(key=>key.kid===header.kid && key.kty==='RSA');
  if (!jwk) throw new Error('OIDC_SIGNING_KEY_NOT_FOUND');
  const key = createPublicKey({key:jwk,format:'jwk'});
  const valid = verifySignature('RSA-SHA256',Buffer.from(`${encodedHeader}.${encodedPayload}`),key,Buffer.from(encodedSignature,'base64url'));
  if (!valid) throw new Error('OIDC_SIGNATURE_REJECTED');
  return validateClaims(claims);
}

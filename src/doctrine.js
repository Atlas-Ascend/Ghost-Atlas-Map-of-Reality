import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const doctrinePath = path.resolve(__dirname, '../OMNITHEON/resident-doctrine.v1.json');

export function getResidentDoctrine(){
  const doctrine = JSON.parse(fs.readFileSync(doctrinePath, 'utf8'));
  return {
    ...doctrine,
    runtime: {
      loaded: true,
      source: 'OMNITHEON/resident-doctrine.v1.json',
      loaded_at: new Date().toISOString()
    }
  };
}

export function buildResidentBootstrap({resident_id='UNBOUND', role='UNBOUND', human_intent_ref='UNBOUND'}={}){
  const doctrine = getResidentDoctrine();
  return {
    resident_id,
    role,
    human_intent_ref,
    doctrine_version: doctrine.version,
    doctrine_schema: doctrine.schema,
    status: 'DOCTRINE_LOADED',
    claim_types: doctrine.claim_types,
    startup_questions: doctrine.startup_questions,
    council_invocation: doctrine.council_invocation,
    authority: doctrine.authority,
    packet_metadata: doctrine.packet_metadata,
    execution_chain: doctrine.execution_chain,
    invariants: {
      self_promotion: 'DENIED',
      arbitrary_execution: 'DENIED',
      consequential_action_without_janus: 'DENIED',
      empirical_promotion_without_verification: 'DENIED',
      untyped_claims: 'DENIED'
    }
  };
}

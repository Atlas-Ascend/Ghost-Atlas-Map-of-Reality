import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const doctrinePath = path.resolve(__dirname, '../OMNITHEON/resident-doctrine.v1.json');
const metaDoctrinePath = path.resolve(__dirname, '../OMNITHEON/doctrine-of-doctrines.v1.json');
const triModeOsPath = path.resolve(__dirname, '../OMNITHEON/tri-mode-os.v1.json');

function loadJson(sourcePath, source){
  const document = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  return {...document, runtime:{loaded:true,source,loaded_at:new Date().toISOString()}};
}

export function getResidentDoctrine(){
  return loadJson(doctrinePath, 'OMNITHEON/resident-doctrine.v1.json');
}

export function getDoctrineOfDoctrines(){
  return loadJson(metaDoctrinePath, 'OMNITHEON/doctrine-of-doctrines.v1.json');
}

export function getTriModeOs(){
  return loadJson(triModeOsPath, 'OMNITHEON/tri-mode-os.v1.json');
}

export function buildResidentBootstrap({resident_id='UNBOUND', role='UNBOUND', human_intent_ref='UNBOUND'}={}){
  const doctrine = getResidentDoctrine();
  const metaDoctrine = getDoctrineOfDoctrines();
  const triModeOs = getTriModeOs();
  return {
    resident_id,
    role,
    human_intent_ref,
    doctrine_version: doctrine.version,
    doctrine_schema: doctrine.schema,
    meta_doctrine_version: metaDoctrine.version,
    meta_doctrine_schema: metaDoctrine.schema,
    tri_mode_os_version: triModeOs.version,
    tri_mode_os_schema: triModeOs.schema,
    doctrine_stack: metaDoctrine.precedence,
    tri_mode_os: {
      authority_modes: Object.keys(triModeOs.authority_modes),
      execution_lanes: Object.keys(triModeOs.execution_lanes),
      estate_default: triModeOs.estate_default,
      closure_rule: triModeOs.closure_rule
    },
    status: 'DOCTRINE_STACK_LOADED',
    claim_types: doctrine.claim_types,
    startup_questions: doctrine.startup_questions,
    council_invocation: doctrine.council_invocation,
    authority: doctrine.authority,
    packet_metadata: doctrine.packet_metadata,
    execution_chain: doctrine.execution_chain,
    invariants: {
      self_promotion: 'DENIED',
      doctrine_self_crowning: 'DENIED',
      arbitrary_execution: 'DENIED',
      consequential_action_without_janus: 'DENIED',
      empirical_promotion_without_verification: 'DENIED',
      untyped_claims: 'DENIED'
    }
  };
}

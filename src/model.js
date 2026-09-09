export const VERSION = '0.1.0';
export const CAMPAIGN_ID = 'GA-MAP-OF-REALITY-CONVERGENCE-001';

export const layers = [
  { id: 'source', order: 0, name: 'Source / Field', purpose: 'Potential, unknowns, founder-root authority and cosmological framing.' },
  { id: 'cosmology', order: 10, name: 'Cosmological Lifecycle', purpose: 'Create, preserve, transform and resource the technical estate.' },
  { id: 'reality', order: 20, name: 'Reality Model', purpose: 'Ontology, canonical graph, time, provenance and epistemic state.' },
  { id: 'consciousness', order: 30, name: 'Consciousness & Cognition', purpose: 'Observer state, interpretation, synthesis and executive cognition.' },
  { id: 'command', order: 40, name: 'Command & Authority', purpose: 'Normalize intent, authorize work, govern state transitions.' },
  { id: 'work', order: 50, name: 'Work & Capability', purpose: 'Packets, workforce, research, building and bounded execution.' },
  { id: 'embodiment', order: 60, name: 'Embodiment & Fabric', purpose: 'Node placement, physical execution, transport, field I/O.' },
  { id: 'proof', order: 70, name: 'Proof & Homeostasis', purpose: 'Policy, health, verification, evidence, repair and restoration.' },
  { id: 'world', order: 80, name: 'Worldstate & Simulation', purpose: 'Canonical world representation, planetary simulation and Euna nursery.' },
  { id: 'manifestation', order: 90, name: 'Manifestation & Return', purpose: 'Products, institutes, company, external proof and reality return.' }
];

const n = (id, name, layer, role, kind='system', status='CANONICAL') => ({ id, name, layer, role, kind, status });

export const nodes = [
  n('field','Field / Brahman','source','Possibility field and cosmological source framing','principle'),
  n('architect','Prime Architect','source','Human root authority, intent origin and final irreversible-action authority','human'),
  n('purusha','Purusha','cosmology','Observer pole; separates witnessing from manifestation','principle'),
  n('prakriti','Prakriti','cosmology','Manifesting pole; materializes authorized design into runtime form','principle'),
  n('brahma','Brahma Office','cosmology','Creation lifecycle: genesis, design, first-form instantiation','office'),
  n('vishnu','Vishnu Office','cosmology','Preservation lifecycle: continuity, maintenance, LTS and uptime','office'),
  n('shiva','Shiva Office','cosmology','Transformation lifecycle: deprecation, supersession, migration and rebirth','office'),
  n('mahshakti','Mahashakti','cosmology','Resource and active-capacity substrate for manifestation','principle'),
  n('gaoa','GAOA','reality','Ontology for persons, agents, systems, symbols, worlds, memories, proof and relationships'),
  n('universal-atlas','Universal Atlas','reality','Canonical Map of Reality: entities, relationships, topology and current graph'),
  n('seshat','SESHAT','reality','Temporal truth: state-at-T, deltas, chronology and contradiction history'),
  n('thoth','Thoth','reality','Durable memory, archive, provenance, receipts and lineage'),
  n('aeon','AEON','reality','Deep time, epochs, lineage and continuity across versions'),
  n('proof-claims','Epistemic Claim Layer','reality','Separates observed, inferred, simulated, historical and asserted state','contract'),
  n('aoc','Atlas of Consciousness','consciousness','Maps observer/state-space, experiential topology and cognitive modes'),
  n('nhcm','NHCM','consciousness','State-model candidates, confidence classes and governed mindstate transitions'),
  n('atlas-mind','Atlas Mind / Vishvarupa','consciousness','Cognitive synthesis and operational mind over current map and history'),
  n('arcadia','ARCADIA','consciousness','Governing cognitive architecture'),
  n('omnimind','OmniMind','consciousness','High-level synthesis, planning and operator-facing cognition'),
  n('mothership','Mothership','consciousness','System-of-systems command context and control-plane integration'),
  n('navi','NAVI','command','Normalize founder language into bounded intent and contextual route options'),
  n('janus-odin','Janus Prime / Odin','command','Authority, sequencing, dependency law, prioritization and promotion'),
  n('meta-fate','META-FATE','command','Governed state-transition and promotion boundary'),
  n('wheel','Wheel of Reality','command','Observe → Permit → Intend → Imagine → Act → Feedback → Proof → Integrate → Return','control-loop'),
  n('packet-os','Packet OS','work','Atomic work grammar, durable packet state and handoff contract'),
  n('workforce','Workforce Spine','work','Capability-based routing, queues, leases and handoffs'),
  n('cap-genome','Capability Genome','work','Agent → role → capability → authority → executor registry'),
  n('gari','GARI','work','Research intelligence, synthesis, validation and publication'),
  n('metaforge','MetaForge','work','Authorized build, repair, packaging and implementation'),
  n('execution-envelope','Execution Envelope','work','Per-packet capability, filesystem, network, credential, runtime and mutation bounds','contract'),
  n('crown-grid','CrownGrid','embodiment','Capability/model/node placement and estate I/O routing'),
  n('eden','EDEN / Cali','embodiment','Primary physical runtime body and execution node'),
  n('ark','ARK','embodiment','Portable local-first body and field command/evidence node'),
  n('merkaba','Merkaba','embodiment','Larger site/vehicle/community embodiment class'),
  n('hypernet','HYPERNET-OMEGA','embodiment','Local-first nervous/transport fabric; does not own state'),
  n('serverforge','ServerForge','embodiment','Service and communication I/O surface'),
  n('roadbridge','RoadBridge','embodiment','Field capture and transit I/O'),
  n('bodyforge','BodyForge','embodiment','Resource governor for runtime and embodiment constraints'),
  n('medusa','Medusa','proof','Security, privacy, permission, perimeter and observation gate'),
  n('aura','AURA','proof','Organism coherence, health, drift and degradation sensing'),
  n('seca-devos','SECA / DevOS','proof','Completion truth, verification, release gates and technical judgment'),
  n('proofgrid','ProofGrid','proof','Evidence receipts and independently inspectable proof'),
  n('prometheus','PROMETHEUS','proof','Measured forward-improvement proposals; no direct production mutation'),
  n('osiris','OSIRIS','proof','Backward restoration and known-good recovery coordinates'),
  n('hydra','Hydra / Reverse Uno','proof','Failure reconciliation and healing loop'),
  n('audience-forge','Audience Forge','proof','Public-safe evidence presentation and external proof translation'),
  n('ghost-atlantia','Ghost Atlantia','world','Canonical world representation rendered from verified state'),
  n('gaia','GAIA','world','Planetary/ecological causal feedback and world simulation'),
  n('reality-os','Reality OS','world','Worldstate transition and representation boundary'),
  n('cymatics','Cymatics Engine','world','Visual state signatures; renderer, never truth authority'),
  n('euna','Euna','world','Simulation-first nursery for developmental architectures and possible worlds'),
  n('cosmos','COSMOS','world','Nested systems from self through civilization, planet and cosmos'),
  n('meca','MECA','world','Governed meta-cognitive and self-architecting capability evolution'),
  n('csa95','CSA-95','world','Subordinate architecture / classification surface preserved from original organ registry'),
  n('products','Products','manifestation','Bounded software/hardware/services produced from proven capabilities','output'),
  n('institutes','Institutes','manifestation','Research, education and institutional manifestations','output'),
  n('company','Company','manifestation','Commercial operating manifestation; not an organism-health authority','output'),
  n('external-proof','External Proof','manifestation','Customer, deployment, independent review or other outside evidence','evidence'),
  n('return','Reality Return','manifestation','External consequences are ingested back into Universal Atlas/SESHAT/Thoth','control-loop')
];

const e = (from, to, relation, proof='ROUTING_CONTRACT') => ({ from, to, relation, proof });
export const edges = [
  e('field','architect','frames'), e('architect','navi','expresses_intent'),
  e('field','purusha','differentiates'), e('field','prakriti','manifests'),
  e('purusha','brahma','observes_creation'), e('prakriti','brahma','enables_creation'),
  e('brahma','vishnu','hands_off_created_system'), e('vishnu','shiva','hands_off_obsolete_system'), e('shiva','brahma','releases_reborn_design'),
  e('mahshakti','brahma','resources'), e('mahshakti','vishnu','resources'), e('mahshakti','shiva','resources'),
  e('gaoa','universal-atlas','defines_entity_classes'), e('seshat','universal-atlas','temporalizes'), e('thoth','universal-atlas','supplies_provenance'), e('aeon','seshat','supplies_epochs'),
  e('proof-claims','universal-atlas','classifies_epistemic_state'),
  e('universal-atlas','atlas-mind','supplies_current_map'), e('thoth','atlas-mind','supplies_history'), e('aoc','atlas-mind','supplies_observer_state'), e('nhcm','atlas-mind','supplies_state_candidates'),
  e('arcadia','atlas-mind','constrains_cognition'), e('omnimind','atlas-mind','exchanges_synthesis'), e('mothership','atlas-mind','exchanges_control_context'),
  e('navi','janus-odin','submits_bounded_intent'), e('atlas-mind','janus-odin','submits_interpretation'), e('janus-odin','meta-fate','authorizes_transition'), e('meta-fate','packet-os','promotes_work'),
  e('wheel','navi','observe'), e('wheel','janus-odin','intend'), e('wheel','omnimind','imagine'), e('wheel','packet-os','act'), e('wheel','proofgrid','prove'), e('wheel','return','return'),
  e('packet-os','workforce','queues_packet'), e('cap-genome','workforce','selects_capability'), e('workforce','execution-envelope','binds_authority'),
  e('workforce','gari','routes_research'), e('workforce','metaforge','routes_build'), e('execution-envelope','crown-grid','requests_execution'),
  e('crown-grid','eden','places'), e('crown-grid','ark','places'), e('crown-grid','merkaba','places'), e('hypernet','crown-grid','transports'), e('serverforge','crown-grid','publishes_io'), e('roadbridge','crown-grid','publishes_field_io'), e('bodyforge','crown-grid','publishes_resource_constraints'),
  e('eden','medusa','emits_observable_action'), e('ark','medusa','emits_observable_action'), e('merkaba','medusa','emits_observable_action'), e('aura','medusa','publishes_health_context'),
  e('medusa','seca-devos','submits_policy_observation'), e('seca-devos','proofgrid','emits_verdict'), e('proofgrid','thoth','archives_receipt'), e('proofgrid','seshat','records_time'), e('proofgrid','universal-atlas','updates_verified_state'),
  e('proofgrid','prometheus','supplies_telemetry'), e('prometheus','janus-odin','proposes_improvement'), e('janus-odin','metaforge','authorizes_repair'), e('metaforge','seca-devos','submits_implementation'), e('osiris','seca-devos','submits_restoration'), e('hydra','prometheus','routes_failure'),
  e('universal-atlas','ghost-atlantia','renders_verified_world'), e('gaia','ghost-atlantia','supplies_simulation'), e('reality-os','ghost-atlantia','governs_world_transition'), e('cymatics','ghost-atlantia','renders_visual_signature'), e('euna','seca-devos','submits_candidate_for_promotion'), e('meca','euna','develops_candidate_architectures'), e('cosmos','gaia','supplies_nested_context'),
  e('proofgrid','audience-forge','publishes_public_safe_proof'), e('audience-forge','products','supports_product_evidence'), e('products','external-proof','seeks_validation'), e('institutes','external-proof','seeks_validation'), e('company','external-proof','seeks_validation'),
  e('external-proof','return','produces_feedback'), e('return','universal-atlas','updates_map'), e('return','seshat','records_delta'), e('return','thoth','archives_consequence')
];

export const organRegistry23 = [
  ['atlas-mind','Atlas Mind / Vishvarupa'], ['arcadia','ARCADIA'], ['thoth','Thoth'], ['universal-atlas','Universal Atlas / SESHAT'], ['navi','NAVI'],
  ['janus-odin','Janus Prime / Odin'], ['packet-os','Packet OS'], ['metaforge','MetaForge'], ['workforce','Workforce Spine'], ['seca-devos','SECA / DevOS'],
  ['medusa','Medusa'], ['eden','EDEN / Cali'], ['crown-grid','CrownGrid'], ['serverforge','ServerForge'], ['roadbridge','RoadBridge'], ['proofgrid','ProofGrid'],
  ['audience-forge','Audience Forge'], ['gari','GARI'], ['hypernet','HYPERNET-OMEGA'], ['meta-fate','META-FATE'], ['nhcm','NHCM'], ['csa95','CSA-95'], ['meca','MECA']
].map(([id,name], index)=>({ organ: index+1, id, name }));

export const wheel = [
  ['OBSERVER',['navi','aura']], ['PERMISSION',['medusa','janus-odin']], ['INTENTION',['janus-odin']], ['IMAGINATION',['omnimind','universal-atlas','atlas-mind','metaforge']],
  ['ACTION',['packet-os','workforce','crown-grid','eden']], ['FEEDBACK',['aura','gaia']], ['PROOF',['seca-devos','proofgrid']], ['INTEGRATION',['thoth','seshat','universal-atlas','cap-genome','gari']], ['RETURN',['return','atlas-mind']]
].map(([phase,systems], index)=>({index,indexLabel:index+1,phase,systems}));

export const campaign = {
  id: CAMPAIGN_ID,
  name: 'Ghost Atlas Map of Reality Convergence',
  state: 'IMPLEMENTED_MVP / PHYSICAL_AND_EXTERNAL_GATES_REMAIN',
  laws: ['PATCH_ROUTE_VERIFY_PROMOTE','GENERATION_IS_NOT_PERMISSION','PHYSICAL_TRUTH_OUTRANKS_REPOSITORY_TRUTH','NO_FALSE_GREEN','PRODUCTION_MUST_NOT_DRIFT'],
  packets: [
    ['MR-000','Canon Lock','PASS'], ['MR-010','Physical Reality Census','GATED_PHYSICAL'], ['MR-020','Universal Atlas / SESHAT Reality Graph','IMPLEMENTED_MVP'],
    ['MR-030','Thoth / AEON Memory-Time','IMPLEMENTED_MVP'], ['MR-040','GAOA Ontology','IMPLEMENTED_MVP'], ['MR-050','Atlas of Consciousness / NHCM','IMPLEMENTED_MVP'],
    ['MR-060','Vishvarupa 23-Organ Reconciliation','IMPLEMENTED_MVP'], ['MR-070','Human-Body I/O + Handoffs','IMPLEMENTED_MVP'], ['MR-080','Agent/Role/Capability/Authority Registry','IMPLEMENTED_MVP'],
    ['MR-090','Physical Embodiment','GATED_PHYSICAL'], ['MR-100','Golden Wheel Mission','READY_FOR_RUNTIME_PROOF'], ['MR-110','Failure/Healing/Resurrection','GATED_RUNTIME'],
    ['MR-120','Second Unattended Resident Cycle','GATED_RUNTIME'], ['MR-130','Euna Simulation Boundary','IMPLEMENTED_MVP'], ['MR-140','Ghost Atlantia / GAIA Worldstate','IMPLEMENTED_MVP'],
    ['MR-150','Golden Production Freeze','GATED_PROOF'], ['MR-160','Products / Public Surfaces','IMPLEMENTED_MVP'], ['MR-170','Commercial External Proof','GATED_EXTERNAL'],
    ['MR-180','Company Formation','GATED_EXTERNAL'], ['MR-190','Verified Reality Return','IMPLEMENTED_MVP']
  ].map(([id,name,state])=>({id,name,state}))
};

export function validateModel() {
  const ids = new Set(nodes.map(x=>x.id));
  const duplicateIds = nodes.map(x=>x.id).filter((id,i,a)=>a.indexOf(id)!==i);
  const badEdges = edges.filter(x=>!ids.has(x.from)||!ids.has(x.to));
  const layerIds = new Set(layers.map(x=>x.id));
  const badLayers = nodes.filter(x=>!layerIds.has(x.layer));
  const organMissing = organRegistry23.filter(x=>!ids.has(x.id));
  return { ok: duplicateIds.length===0 && badEdges.length===0 && badLayers.length===0 && organMissing.length===0 && organRegistry23.length===23, duplicateIds, badEdges, badLayers, organMissing, counts:{layers:layers.length,nodes:nodes.length,edges:edges.length,organs:organRegistry23.length} };
}

export function mapSnapshot() {
  return { version: VERSION, campaignId: CAMPAIGN_ID, generatedAt: new Date().toISOString(), layers, nodes, edges, organRegistry23, wheel, campaign, validation: validateModel() };
}

import test from 'node:test'; import assert from 'node:assert/strict';
import { validateModel, organRegistry23, nodes, edges, layers, campaign } from '../src/model.js';
test('model invariants pass',()=>assert.equal(validateModel().ok,true));
test('original Vishvarupa organ registry remains exactly 23',()=>assert.equal(organRegistry23.length,23));
test('Universal Atlas, SESHAT, Thoth and Euna are first-class',()=>{for(const id of ['universal-atlas','seshat','thoth','euna']) assert.ok(nodes.some(n=>n.id===id));});
test('every edge references real nodes',()=>assert.equal(validateModel().badEdges.length,0));
test('full lifecycle spans source through manifestation',()=>assert.deepEqual([layers[0].id,layers.at(-1).id],['source','manifestation']));
test('campaign preserves physical and external truth gates',()=>{assert.ok(campaign.packets.some(p=>p.state==='GATED_PHYSICAL')); assert.ok(campaign.packets.some(p=>p.state==='GATED_EXTERNAL'));});
test('graph has substantial connected model',()=>{assert.ok(nodes.length>=50); assert.ok(edges.length>=60);});

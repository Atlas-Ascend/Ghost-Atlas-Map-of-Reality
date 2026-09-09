import test from 'node:test'; import assert from 'node:assert/strict'; import { server } from '../src/server.js';
async function withServer(fn){await new Promise(r=>server.listen(0,'127.0.0.1',r)); try{const {port}=server.address(); await fn(`http://127.0.0.1:${port}`)} finally{await new Promise(r=>server.close(r));}}
test('health endpoint passes',()=>withServer(async base=>{const r=await fetch(base+'/health'); assert.equal(r.status,200); const b=await r.json(); assert.equal(b.status,'ok'); assert.equal(b.validation.ok,true);}));
test('map API returns original 23 organs',()=>withServer(async base=>{const b=await fetch(base+'/api/v1/map').then(r=>r.json()); assert.equal(b.organRegistry23.length,23);}));
test('UI is served',()=>withServer(async base=>{const r=await fetch(base+'/'); const t=await r.text(); assert.equal(r.status,200); assert.match(t,/Map of Reality/);}));

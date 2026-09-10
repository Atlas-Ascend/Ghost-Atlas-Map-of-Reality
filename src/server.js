import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { VERSION, layers, nodes, edges, organRegistry23, wheel, campaign, validateModel, mapSnapshot } from './model.js';
import { verifyGitHubActionsOidc } from './github-oidc.js';
import { acceptPhysicalSnapshot, getLiveHistory, getLiveState } from './live-state.js';
import { buildOrganismPacket } from './organism-packet.js';
import { getResidentDoctrine, buildResidentBootstrap } from './doctrine.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';

const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml'};
const json = (res,status,body) => {res.writeHead(status,{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'});res.end(JSON.stringify(body,null,2));};
const sendStatic = (res,pathname) => {
  const clean = pathname === '/' ? '/index.html' : pathname;
  const target = path.resolve(publicDir,'.'+clean);
  if (!target.startsWith(publicDir)) return false;
  try {const stat=fs.statSync(target);if(!stat.isFile()) return false;res.writeHead(200,{'content-type':mime[path.extname(target)]||'application/octet-stream','cache-control':'public, max-age=300','x-content-type-options':'nosniff'});fs.createReadStream(target).pipe(res);return true;} catch{return false;}
};
const readJsonBody = async req => {
  const chunks=[];let size=0;
  for await (const chunk of req){size+=chunk.length;if(size>65536) throw new Error('BODY_TOO_LARGE');chunks.push(chunk);}
  if(!chunks.length) throw new Error('BODY_REQUIRED');
  try{return JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{throw new Error('INVALID_JSON');}
};

async function handle(req,res){
  const url = new URL(req.url,`http://${req.headers.host||'localhost'}`);
  if(req.method==='GET'&&url.pathname==='/health'){const live=getLiveState();return json(res,200,{status:'ok',service:'ghost-atlas-map-of-reality',version:VERSION,validation:validateModel(),doctrine:{version:getResidentDoctrine().version,status:'ACTIVE'},physical_evidence:{state:live.state,age_seconds:live.age_seconds},organism_packet:{contract:'GA-C2P-1',state:buildOrganismPacket(live).state},time:new Date().toISOString()});}
  if(req.method==='GET'&&url.pathname==='/api/v1/map') return json(res,200,mapSnapshot());
  if(req.method==='GET'&&url.pathname==='/api/v1/layers') return json(res,200,{layers});
  if(req.method==='GET'&&url.pathname==='/api/v1/nodes') return json(res,200,{nodes});
  if(req.method==='GET'&&url.pathname==='/api/v1/edges') return json(res,200,{edges});
  if(req.method==='GET'&&url.pathname==='/api/v1/organs') return json(res,200,{count:organRegistry23.length,organs:organRegistry23});
  if(req.method==='GET'&&url.pathname==='/api/v1/wheel') return json(res,200,{wheel});
  if(req.method==='GET'&&url.pathname==='/api/v1/campaign') return json(res,200,campaign);
  if(req.method==='GET'&&url.pathname==='/api/v1/live') return json(res,200,getLiveState());
  if(req.method==='GET'&&url.pathname==='/api/v1/live/history') return json(res,200,getLiveHistory());
  if(req.method==='GET'&&url.pathname==='/api/v1/organism/packet') return json(res,200,buildOrganismPacket(getLiveState()));
  if(req.method==='GET'&&url.pathname==='/api/v1/omnitheon/doctrine') return json(res,200,getResidentDoctrine());
  if(req.method==='GET'&&url.pathname==='/api/v1/omnitheon/bootstrap') return json(res,200,buildResidentBootstrap({resident_id:url.searchParams.get('resident_id')||'UNBOUND',role:url.searchParams.get('role')||'UNBOUND',human_intent_ref:url.searchParams.get('human_intent_ref')||'UNBOUND'}));
  if(req.method==='POST'&&url.pathname==='/api/v1/ingest/physical'){
    const auth=req.headers.authorization||'';
    if(!auth.startsWith('Bearer ')) return json(res,401,{error:'OIDC_BEARER_REQUIRED'});
    let identity;
    try{identity=await verifyGitHubActionsOidc(auth.slice(7));}catch(error){return json(res,401,{error:'OIDC_REJECTED',reason:error.message});}
    try{const body=await readJsonBody(req);const receipt=acceptPhysicalSnapshot(body,identity);return json(res,201,receipt);}catch(error){return json(res,400,{error:'PHYSICAL_SNAPSHOT_REJECTED',reason:error.message});}
  }
  if(req.method==='GET'&&url.pathname==='/api/v1/proof'){
    const live=getLiveState();
    return json(res,200,{state:live.state==='FRESH_PROVEN'?'IMPLEMENTATION_PLUS_FRESH_PHYSICAL_EVIDENCE':'IMPLEMENTATION_PROOF',physical_evidence:live,organism_packet:buildOrganismPacket(live),doctrine:{version:getResidentDoctrine().version,status:'ACTIVE'},truthBoundary:'Software invariants are local proof. Physical EDEN is promoted only from signed workflow evidence and expires into STALE; sensory packets never self-promote.',validation:validateModel()});
  }
  if(req.method==='GET'&&url.pathname==='/api/v1/openapi.json') return json(res,200,{openapi:'3.1.0',info:{title:'Ghost Atlas Map of Reality API',version:VERSION},paths:{'/health':{get:{summary:'Health, invariants, doctrine and physical-evidence freshness'}},'/api/v1/map':{get:{summary:'Complete Map of Reality snapshot'}},'/api/v1/organs':{get:{summary:'Original 23-organ Vishvarupa registry'}},'/api/v1/wheel':{get:{summary:'Wheel of Reality control loop'}},'/api/v1/campaign':{get:{summary:'Convergence campaign state'}},'/api/v1/live':{get:{summary:'Latest sanitized physical-Estate evidence'}},'/api/v1/live/history':{get:{summary:'Ephemeral recent physical evidence history'}},'/api/v1/organism/packet':{get:{summary:'GA-C2P-1 sensory packet for Workforce Spine / Packet OS'}},'/api/v1/omnitheon/doctrine':{get:{summary:'Machine-readable OMNITHEON resident and workforce doctrine'}},'/api/v1/omnitheon/bootstrap':{get:{summary:'Resident startup doctrine bootstrap contract'}},'/api/v1/ingest/physical':{post:{summary:'GitHub-OIDC authenticated physical EDEN census ingest'}}}});
  if(req.method==='GET'&&sendStatic(res,url.pathname)) return;
  json(res,404,{error:'NOT_FOUND',path:url.pathname});
}

export const server=http.createServer((req,res)=>{handle(req,res).catch(error=>json(res,500,{error:'INTERNAL_ERROR',reason:error.message}));});
if(process.argv[1]===fileURLToPath(import.meta.url)) server.listen(port,host,()=>console.log(`Ghost Atlas Map of Reality v${VERSION} listening on http://${host}:${port}`));

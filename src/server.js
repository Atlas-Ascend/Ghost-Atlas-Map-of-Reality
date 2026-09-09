import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { VERSION, layers, nodes, edges, organRegistry23, wheel, campaign, validateModel, mapSnapshot } from './model.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';

const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml'};
const json = (res, status, body) => { const data=JSON.stringify(body,null,2); res.writeHead(status,{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}); res.end(data); };
const sendStatic = (res, pathname) => {
  const clean = pathname === '/' ? '/index.html' : pathname;
  const target = path.resolve(publicDir, '.' + clean);
  if (!target.startsWith(publicDir)) return false;
  try {
    const stat=fs.statSync(target); if(!stat.isFile()) return false;
    res.writeHead(200,{'content-type': mime[path.extname(target)] || 'application/octet-stream','cache-control':'public, max-age=300'});
    fs.createReadStream(target).pipe(res); return true;
  } catch { return false; }
};

export const server = http.createServer((req,res)=>{
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (req.method === 'GET' && url.pathname === '/health') return json(res,200,{status:'ok',service:'ghost-atlas-map-of-reality',version:VERSION,validation:validateModel(),time:new Date().toISOString()});
  if (req.method === 'GET' && url.pathname === '/api/v1/map') return json(res,200,mapSnapshot());
  if (req.method === 'GET' && url.pathname === '/api/v1/layers') return json(res,200,{layers});
  if (req.method === 'GET' && url.pathname === '/api/v1/nodes') return json(res,200,{nodes});
  if (req.method === 'GET' && url.pathname === '/api/v1/edges') return json(res,200,{edges});
  if (req.method === 'GET' && url.pathname === '/api/v1/organs') return json(res,200,{count:organRegistry23.length,organs:organRegistry23});
  if (req.method === 'GET' && url.pathname === '/api/v1/wheel') return json(res,200,{wheel});
  if (req.method === 'GET' && url.pathname === '/api/v1/campaign') return json(res,200,campaign);
  if (req.method === 'GET' && url.pathname === '/api/v1/proof') return json(res,200,{state:'IMPLEMENTATION_PROOF',truthBoundary:'Software model/API/UI can be proven here. Physical EDEN, unattended-cycle and external-commercial gates require separate evidence.',validation:validateModel()});
  if (req.method === 'GET' && url.pathname === '/api/v1/openapi.json') return json(res,200,{openapi:'3.1.0',info:{title:'Ghost Atlas Map of Reality API',version:VERSION},paths:{'/health':{get:{summary:'Health and invariant validation'}},'/api/v1/map':{get:{summary:'Complete Map of Reality snapshot'}},'/api/v1/organs':{get:{summary:'Original 23-organ Vishvarupa registry'}},'/api/v1/wheel':{get:{summary:'Wheel of Reality control loop'}},'/api/v1/campaign':{get:{summary:'Convergence campaign state'}}}});
  if (req.method === 'GET' && sendStatic(res,url.pathname)) return;
  json(res,404,{error:'NOT_FOUND',path:url.pathname});
});

if (process.argv[1] === fileURLToPath(import.meta.url)) server.listen(port,host,()=>console.log(`Ghost Atlas Map of Reality v${VERSION} listening on http://${host}:${port}`));

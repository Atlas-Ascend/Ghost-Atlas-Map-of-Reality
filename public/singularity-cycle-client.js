const out=document.getElementById('cycle-output');
const run=document.getElementById('cycle-trigger');
const status=document.getElementById('cycle-status');
async function refresh(method='GET'){
  const response=await fetch('/api/v1/singularity/cycle',{method,credentials:'same-origin',headers:{'Content-Type':'application/json'},...(method==='POST'?{body:'{}'}:{})});
  const data=await response.json();
  if(!response.ok)throw Error(data.error||String(response.status));
  const receipt=method==='POST'?data:data.latest;
  status.textContent=receipt?.state||'NO_RECEIPT';
  out.textContent=receipt?[
    'SHA256 '+receipt.receipt_sha256,
    'TRIGGER '+receipt.trigger,
    'FINISHED '+receipt.ended_at,
    ...receipt.stages.map(s=>s.id+': '+s.status),
    'RUNTIME PROMOTION '+receipt.production_promotion
  ].join('\n'):'No cycle receipt yet';
}
run.addEventListener('click',async()=>{
  run.disabled=true;status.textContent='RUNNING';
  try{await refresh('POST');}catch(e){status.textContent='ERROR';out.textContent=e.message;}
  finally{run.disabled=false;}
});
refresh().catch(e=>{status.textContent='UNAVAILABLE';out.textContent=e.message;});

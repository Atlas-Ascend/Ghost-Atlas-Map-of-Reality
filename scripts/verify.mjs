import { validateModel, nodes, edges, layers, organRegistry23 } from '../src/model.js';
const result=validateModel(); console.log(JSON.stringify(result,null,2));
if(!result.ok) process.exit(1);
if(nodes.length<50 || edges.length<60 || layers.length<10 || organRegistry23.length!==23) process.exit(2);
console.log('MAP_OF_REALITY_VERIFY=PASS');

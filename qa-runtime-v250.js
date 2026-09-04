const fs=require('fs'),vm=require('vm');
let failWrites=false;const store=new Map();
function el(){return {innerHTML:'',textContent:'',dataset:{},value:'',addEventListener(){},querySelector(){return null},querySelectorAll(){return[]},closest(){return null},classList:{add(){},remove(){},toggle(){}}}}
const app=el();const docListeners={};
const document={querySelector:s=>s==='#app'?app:null,querySelectorAll:()=>[],addEventListener(t,fn){(docListeners[t]??=[]).push(fn)},getElementById:()=>null,createElement:el,body:el()};
const localStorage={setItem(k,v){if(failWrites)throw new Error('injected storage failure');store.set(k,v)},getItem:k=>store.get(k)||null,removeItem:k=>store.delete(k)};
const ctx={console,document,localStorage,navigator:{serviceWorker:null},location:{},setTimeout,clearTimeout,Date,window:null};ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
for(const f of ['curriculum.js','content-packs.js','content-quality-v70.js','app.js','content-depth-v120.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
const clickBefore=(docListeners.click||[]).length;vm.runInContext(fs.readFileSync('runtime-core-v250.js','utf8'),ctx,{filename:'runtime-core-v250.js'});const clickAfter=(docListeners.click||[]).length;
const R=ctx.BAHASA_RUNTIME_V250, results=[];const check=(n,o)=>results.push([n,!!o]);
const a=R.audit();check('runtime audit 12/12',a.passed===a.total&&a.total===12);check('144 units',a.curriculum.total===144&&a.curriculum.passed);check('content audit clean',a.content?.units===144&&!a.content?.failures?.length);check('pedagogy audit clean',a.pedagogy?.units===144&&a.pedagogy?.passed);check('single runtime aliases',ctx.BAHASA_RUNTIME===ctx.BAHASA_RUNTIME_V200&&ctx.BAHASA_RUNTIME===ctx.BAHASA_RUNTIME_V120);check('single delegated click binding',clickAfter===clickBefore+1&&ctx.__BAHASA_RUNTIME_CLICK_BOUND__===true);
const s0=JSON.stringify(R.getState());failWrites=true;const tx=R.transaction(s=>{s.__fault=1},'fault-injection');failWrites=false;check('storage fault rollback',!tx.ok&&JSON.stringify(R.getState())===s0);check('fault left no stale mutation',!('__fault' in R.getState()));
const snap=R.getState();snap.__mutated=true;check('snapshot is detached',!('__mutated' in R.getState()));
store.set('bahasaAIUltimateV250','{bad json');store.set('bahasaAIUltimateV200',JSON.stringify({year:3,view:'home'}));const restored=R.restore();check('malformed current storage falls back safely',restored.ok&&restored.key==='bahasaAIUltimateV200'&&restored.data.year===3);store.delete('bahasaAIUltimateV250');
const before=JSON.stringify(R.getState());const bad=R.goto('__missing__');check('invalid route rejected without state mutation',bad.ok===false&&JSON.stringify(R.getState())===before);
check('project boundary',R.policy.independentProject&&R.policy.karanganAIDependency===false);
console.log(results.map(([n,o])=>`${o?'PASS':'FAIL'}: ${n}`).join('\n'));const failed=results.filter(x=>!x[1]);console.log(`TOTAL ${results.length-failed.length}/${results.length}`);if(failed.length)process.exit(1);

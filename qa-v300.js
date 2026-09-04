const fs=require('fs'),vm=require('vm');
const app={innerHTML:''};function el(){return {innerHTML:'',textContent:'',dataset:{},value:'',disabled:false,addEventListener(){},querySelector(){return null},querySelectorAll(){return[]},classList:{add(){},remove(){},toggle(){}}}}
const document={querySelector:s=>s==='#app'?app:null,querySelectorAll:()=>[],addEventListener(){},getElementById:()=>null,createElement:el,body:el()};
const store=new Map(),localStorage={setItem:(k,v)=>store.set(k,v),getItem:k=>store.get(k)||null,removeItem:k=>store.delete(k)};
const ctx={console,document,localStorage,navigator:{serviceWorker:null},location:{},setTimeout,clearTimeout,Date,window:null,scrollTo(){},confirm(){return false}};ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
for(const f of ['curriculum.js','content-packs.js','content-quality-v70.js','app.js','content-depth-v120.js','runtime-core-v250.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
const C=ctx.BAHASA_CURRICULUM, checks=[];const ok=(n,v)=>checks.push([n,!!v]);
ok('v300 marker',ctx.BAHASA_IPAD_V300?.version==='300.0.0');ok('independent project',ctx.BAHASA_IPAD_V300?.karanganAIDependency===false);ok('144 units',[1,2,3,4,5,6].reduce((n,y)=>n+C.getUnits(y).length,0)===144);
const y1=C.getUnits(1);ok('Y1 U1 no sentence-writing demand',/Dengar dan kenal bunyi/.test(y1[0].prompt)&&!/Bina satu ayat/.test(y1[0].prompt));ok('Y1 U4 syllable task',/suku kata/.test(y1[3].prompt));ok('Y1 sentence demand delayed',/Bina satu ayat/.test(y1[12].prompt));ok('meaning-first retained',!!ctx.BAHASA_OPEN_RESPONSE);ok('runtime audit clean',ctx.BAHASA_RUNTIME.audit().passed===ctx.BAHASA_RUNTIME.audit().total);
console.log(checks.map(([n,v])=>`${v?'PASS':'FAIL'}: ${n}`).join('\n'));let f=checks.filter(x=>!x[1]);console.log(`TOTAL ${checks.length-f.length}/${checks.length}`);if(f.length)process.exit(1);

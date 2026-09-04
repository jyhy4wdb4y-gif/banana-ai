const fs=require('fs');
const html=fs.readFileSync('index.html','utf8');
const stable=fs.readFileSync('stable-v1.js','utf8');
const app=fs.readFileSync('app.js','utf8');
const curriculum=fs.readFileSync('curriculum.js','utf8');
const checks={
 title:html.includes('Bahasa AI COMPLETE Stable v1.0'),
 stableLoaded:html.includes('stable-v1.js'),
 stableLast:html.indexOf('stable-v1.js')>html.indexOf('complete-rc1.js'),
 marker:stable.includes('BAHASA_COMPLETE_STABLE_V1'),
 version:stable.includes("VERSION='1.0.0'"),
 independent:stable.includes('karanganAIDependency:false'),
 guidedNotMastery:stable.includes('guidedIsMastery:false'),
 independentRequired:stable.includes('independentRequired:true'),
 meaningFirst:app.includes('unusual')||app.includes('meaning'),
 curriculum144:curriculum.includes('144')||curriculum.includes('unitTitles')
};
let fail=0; for(const [k,v] of Object.entries(checks)){console.log((v?'PASS ':'FAIL ')+k); if(!v)fail++;} if(fail)process.exit(1);

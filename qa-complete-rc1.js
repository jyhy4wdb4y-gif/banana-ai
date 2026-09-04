const fs=require('fs'),vm=require('vm');
const files=['curriculum.js','content-packs.js','content-quality-v70.js','app.js','content-depth-v120.js','runtime-core-v250.js','complete-rc1.js'];
let failed=0; const check=(n,v)=>{console.log(`${v?'PASS':'FAIL'} ${n}`);if(!v)failed++};
for(const f of files){try{new vm.Script(fs.readFileSync(f,'utf8'),{filename:f});check(`syntax ${f}`,true)}catch(e){check(`syntax ${f}`,false);console.error(e.message)}}
const app=fs.readFileSync('app.js','utf8'),rc=fs.readFileSync('complete-rc1.js','utf8'),css=fs.readFileSync('style.css','utf8'),html=fs.readFileSync('index.html','utf8'),cur=fs.readFileSync('curriculum.js','utf8');
check('independent Bahasa AI boundary',rc.includes("karanganAIDependency:false")&&rc.includes("project:'Bahasa AI'"));
check('Year1 focus-specific huruf',rc.includes("s[0]==='huruf'")&&rc.includes('bindHuruf'));
check('Year1 focus-specific suku',rc.includes("s[0]==='suku'")&&rc.includes('bindSuku'));
check('Year1 focus-specific kata',rc.includes("s[0]==='kata'")&&rc.includes('bindKata'));
check('guided is not mastery',rc.includes('guidedIsMastery:false')&&rc.includes("addEvidence('guided')"));
check('speech is optional',rc.includes('speechRecognitionRequired:false'));
check('iPad nav no clipping',css.includes('grid-template-columns:repeat(6,minmax(0,1fr))')&&css.includes('overflow:visible!important'));
check('RC1 loaded last',html.indexOf('complete-rc1.js')>html.indexOf('runtime-core-v250.js'));
check('RC1 title',html.includes('Bahasa AI COMPLETE RC1'));
check('meaning-first preserved',app.includes('Urutan semakan: Makna')&&app.includes('independentReady'));
check('144-unit architecture marker',cur.includes('24')&&cur.includes('unitTitles'));
if(failed)process.exit(1);

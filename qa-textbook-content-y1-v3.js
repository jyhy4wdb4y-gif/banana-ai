const fs=require('fs'),vm=require('vm');
const ctx={window:{}};vm.createContext(ctx);
['textbook-map-sjk.js','curriculum.js','full-content-matrix.js','textbook-content-y1-v3.js'].forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f}));
const A=ctx.window.BAHASA_TEXTBOOK_CONTENT_Y1.audit();
const C=ctx.window.BAHASA_CURRICULUM;
const F=ctx.window.BAHASA_FULL_CONTENT;
const checks=[
 ['24 Y1 units',A.units===24],['72 unique passages',A.uniquePassages===72],['audit passed',A.passed],
 ['Y1 mapped titles applied',C.years[1].units[0].title==='Saya Sayang akan Keluarga'&&C.years[1].units[23].title==='Selamatkan Alam'],
 ['old title removed',!C.years[1].units.some(u=>u.title==='Kenali Diri')],
 ['vocab depth >=18',C.years[1].units.every(u=>u.words.length>=18)],
 ['source/original flags',Object.values(ctx.window.BAHASA_TEXTBOOK_CONTENT_Y1.records).every(r=>r.originalContent&&/ORIGINAL/.test(r.sourceStatus))],
 ['no premature writing Y1 U1-12',Object.values(ctx.window.BAHASA_TEXTBOOK_CONTENT_Y1.records).slice(0,12).every(r=>!/tulis satu ayat|bina satu ayat/i.test(r.writing.guided))],
 ['full matrix overlay active',F.get('T1U1').title==='Saya Sayang akan Keluarga'&&F.get('T1U24').title==='Selamatkan Alam'],
 ['independent mastery protected',Object.values(ctx.window.BAHASA_TEXTBOOK_CONTENT_Y1.records).every(r=>!r.masteryPolicy.guidedIsMastery&&r.masteryPolicy.independentRequired)]
];
let fail=0;for(const [n,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${n}`);if(!ok)fail++;}
console.log(JSON.stringify(A,null,2));process.exit(fail?1:0);

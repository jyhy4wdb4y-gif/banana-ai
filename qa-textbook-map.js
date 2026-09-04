const fs=require('fs'),vm=require('vm'); const ctx={window:{}}; vm.createContext(ctx);
for(const f of ['textbook-map-sjk.js','curriculum.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
const C=ctx.window.BAHASA_CURRICULUM,M=ctx.window.BAHASA_TEXTBOOK_MAP,u=C.years[1].units;
const old=['Kenali Diri','Keluarga Saya','Rumah dan Sekolah'];
const tests=[['24 units',u.length===24],['8 themes',new Set(u.map(x=>x.theme[0])).size===8],['3 units/theme',[...new Set(u.map(x=>x.theme[0]))].every(t=>u.filter(x=>x.theme[0]===t).length===3)],['old titles removed',!u.some(x=>old.includes(x.title))],['source metadata',u.every(x=>x.sourceBasis&&x.sourceStatus&&x.originalContent)],['12+ words/unit',u.every(x=>x.words.length>=12)],['Y2-6 pending',[2,3,4,5,6].every(y=>C.years[y].mappingStatus==='PENDING_SOURCE_VERIFICATION')],['Y1 early no sentence prompt',u.slice(0,12).every(x=>!/^Bina satu ayat/.test(x.prompt))],['map version',!!C.textbookMapVersion]];
for(const [n,ok] of tests)console.log(`${ok?'PASS':'FAIL'} ${n}`); if(tests.some(x=>!x[1]))process.exit(1);

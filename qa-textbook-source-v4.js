const fs=require('fs'),vm=require('vm'),assert=require('assert');
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync('textbook-source-registry.js','utf8'),ctx);
const R=ctx.window.BAHASA_TEXTBOOK_SOURCES;let n=0;function ok(x,m){assert(x,m);console.log('PASS',m);n++}
ok(R.version.includes('v4'),'source registry v4 loaded');
ok(R.years[2].code==='AT012003','Y2 KPM textbook code preserved');
ok(R.years[3].code==='AT013004','Y3 KPM textbook code preserved');
ok(R.years[4].catalogStatus==='OFFICIAL_DBP_CONTINUITY_VERIFIED','Y4 DBP continuity verified without inventing unit structure');
ok(R.years[5].code==='AT015001','Y5 KPM textbook code verified');
ok(R.years[5].publisher==='Dewan Bahasa dan Pustaka','Y5 publisher verified');
ok(R.years[5].mappingStatus==='CATALOG_VERIFIED_STRUCTURE_PENDING','Y5 unit structure remains pending');
ok(R.years[6].catalogStatus==='OFFICIAL_DBP_TEXTBOOK_SOURCE_VERIFIED','Y6 official DBP source preserved');
ok(Object.values(R.years).every(y=>!String(y.mappingStatus).includes('FULLY_MAPPED')||y.mappingStatus==='TEXTBOOK_STRUCTURE_MAPPED'),'no false full-mapping claims');
console.log(`SOURCE V4 QA ${n}/9 PASS`);
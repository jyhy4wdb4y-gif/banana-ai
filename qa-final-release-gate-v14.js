const fs=require('fs'),vm=require('vm');
const ctx={window:{},console};ctx.window.window=ctx.window;vm.createContext(ctx);
const chain=['textbook-map-sjk.js','curriculum.js','full-content-matrix.js','textbook-content-y1-v3.js','textbook-content-y6-v6.js','textbook-content-y2-y5-v7.js','content-consolidation-v8.js','content-quality-v9.js','content-quality-v10.js','content-quality-v11.js','content-finalization-v12.js','content-polish-v13.js','content-release-v14.js'];
chain.forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f}));
const a=ctx.window.BAHASA_CONTENT_RELEASE_V14.audit();console.log(JSON.stringify(a,null,2));
if(!a.passed||a.units!==144||a.uniqueQuestions!==1296||a.uniqueReadings!==432)process.exit(1);
for(const r of Object.values(ctx.window.BAHASA_CONTENT_RELEASE_V14.records)){
 if(r.releasePolicy.guidedIsMastery||r.releasePolicy.aiIsAuthority||!r.releasePolicy.aiOptional||!r.releasePolicy.independentTransferRequired)process.exit(2);
 if(!r.releasePolicy.staleResponseMustNotMutate||!r.releasePolicy.duplicateSubmissionMustBeIdempotent)process.exit(3);
 if(!r.adaptivePath.deterministicFallback)process.exit(4);
}
const html=fs.readFileSync('index.html','utf8'),sw=fs.readFileSync('sw.js','utf8');
if(!html.includes('content-release-v14.js')||html.indexOf('content-release-v14.js')>html.indexOf('app.js'))process.exit(5);
if(!sw.includes('bahasa-ai-release-v14')||!sw.includes("'./content-release-v14.js'"))process.exit(6);
console.log('FINAL RELEASE GATE V14 PASS');

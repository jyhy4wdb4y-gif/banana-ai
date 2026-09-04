const fs=require('fs'),vm=require('vm');const ctx={window:{},console};ctx.window.window=ctx.window;vm.createContext(ctx);
['textbook-map-sjk.js','curriculum.js','full-content-matrix.js','textbook-content-y1-v3.js','textbook-content-y6-v6.js','textbook-content-y2-y5-v7.js','content-consolidation-v8.js','content-quality-v9.js','content-quality-v10.js','content-quality-v11.js','content-finalization-v12.js','content-polish-v13.js'].forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f}));
const a=ctx.window.BAHASA_CONTENT_POLISH_V13.audit();console.log(JSON.stringify(a,null,2));
if(!a.passed||a.units!==144||a.vocabularyDepthTasks<432||a.readingStrategyTasks!==432||a.miniDialogues!==144||a.uniqueUnitSignatures<100)process.exit(1);
for(const r of Object.values(ctx.window.BAHASA_CONTENT_POLISH_V13.records)){
 if(!r.adaptivePath.deterministicFallback||!r.adaptivePath.aiOptional)process.exit(2);
 if(r.adaptivePath.routes.success.masteryCredit!==true)process.exit(3);
 for(const k of ['meaning','task-fit','evidence','coherence','language']) if(r.adaptivePath.routes[k].masteryCredit) process.exit(4);
 if(!r.masteryEvidence.rejected.includes('guided-retry')||!r.masteryEvidence.rejected.includes('ai-supplied-answer'))process.exit(5);
}
console.log('CONTENT POLISH V13 QA PASS');

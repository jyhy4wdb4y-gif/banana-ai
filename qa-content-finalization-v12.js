const fs=require('fs'),vm=require('vm');const ctx={window:{},console};ctx.window.window=ctx.window;vm.createContext(ctx);
['textbook-map-sjk.js','curriculum.js','full-content-matrix.js','textbook-content-y1-v3.js','textbook-content-y6-v6.js','textbook-content-y2-y5-v7.js','content-consolidation-v8.js','content-quality-v9.js','content-quality-v10.js','content-quality-v11.js','content-finalization-v12.js'].forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f}));
const a=ctx.window.BAHASA_CONTENT_FINALIZATION_V12.audit();console.log(JSON.stringify(a,null,2));
if(!a.passed||a.units!==144||a.listeningTasks!==288||a.speakingTasks!==288||a.seniBahasaTasks!==288||a.independentChallenges!==144||a.yearResponseLevels!==6)process.exit(1);
for(const r of Object.values(ctx.window.BAHASA_CONTENT_FINALIZATION_V12.records)){
 if(r.masteryGate.guidedEvidenceWeight!==0||r.masteryGate.aiJudgmentIsAuthority||!r.recoveryPlan.semanticPriority||!r.recoveryPlan.preserveCorrectParts)process.exit(2);
 if(!r.independentChallenge.noHint||!r.independentChallenge.newContext||r.independentChallenge.guided)process.exit(3);
}
console.log('CONTENT FINALIZATION V12 QA PASS');

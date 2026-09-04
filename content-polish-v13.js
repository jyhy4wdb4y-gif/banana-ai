/* Bahasa AI — Content Polish v13. Adaptive pathway, vocabulary depth, reading strategy, writing progression and anti-template variation. */
(()=>{'use strict';
const V='CONTENT-POLISH-V13',Q=window.BAHASA_CONTENT_FINALIZATION_V12,F=window.BAHASA_FULL_CONTENT;
if(!Q||!F)return;
const records={};
const readingStrategies={
1:['Cari perkataan yang kamu kenal.','Padankan gambar atau konteks dengan maksud.','Jawab soalan siapa/apa/di mana.'],
2:['Cari ayat yang mengandungi maklumat penting.','Gunakan perkataan sekeliling untuk meneka maksud.','Susun peristiwa atau maklumat mengikut urutan.'],
3:['Kenal pasti idea utama.','Cari bukti yang menyokong jawapan.','Bezakan maklumat tersurat dengan inferens mudah.'],
4:['Kenal pasti idea utama dan huraian.','Bandingkan maklumat daripada dua bahagian teks.','Terangkan hubungan sebab, kesan atau tujuan.'],
5:['Jejak petunjuk untuk membuat inferens.','Nilai sama ada alasan benar-benar menyokong pendirian.','Bezakan fakta, pendapat dan cadangan.'],
6:['Tentukan maklumat paling relevan untuk tujuan tugasan.','Nilai kekuatan bukti dan kemungkinan bias.','Gabungkan beberapa maklumat untuk membuat rumusan atau keputusan.']
};
const vocabDepth={
1:['sebut','padan gambar','guna dalam frasa'],2:['makna','lawan/seerti mudah','guna dalam ayat'],3:['makna mengikut konteks','keluarga kata mudah','guna dalam dua ayat berbeza'],4:['makna mengikut konteks','pilihan kata paling tepat','guna dalam huraian'],5:['nuansa makna','kolokasi/ungkapan berkaitan','guna mengikut khalayak'],6:['nuansa dan register','ketepatan istilah','guna secara tepat dalam hujah atau rumusan']
};
const writingSteps={
1:['pilih kata','bina frasa','bina satu ayat bermakna','semak maksud'],
2:['rancang satu idea','bina ayat lengkap','tambah maklumat','semak ejaan dan tanda baca'],
3:['tentukan idea utama','bina ayat sokongan','susun 3–5 ayat','semak hubungan idea'],
4:['rancang isi','tambah huraian','beri contoh','susun perenggan','semak koheren'],
5:['tetapkan tujuan dan khalayak','rancang beberapa isi','huraikan dengan contoh/bukti','guna penanda wacana secara tepat','edit bahasa dan struktur'],
6:['analisis tugasan','pilih dan susun isi paling relevan','sokong dengan alasan/bukti','bina kohesi antara perenggan','nilai semula ketepatan dan kesan bahasa','edit secara bebas']
};
const contexts=['keluarga','sekolah','kejiranan','kesihatan','keselamatan','alam sekitar','teknologi','budaya','kewangan','komuniti','sukan','perjalanan'];
function seed(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function rotate(a,n){return a.map((_,i)=>a[(i+n)%a.length])}
function make(r){
 const y=r.year,s=seed(r.unitId),ctx=contexts[s%contexts.length];
 const vocabSkills=rotate(vocabDepth[y],s%vocabDepth[y].length).map((skill,i)=>({id:`${r.unitId}-VD${i+1}`,skill,prompt:i===0?`Pilih satu kata penting daripada unit “${r.title}” dan tunjukkan ${skill}.`:`Gunakan kosa kata unit untuk ${skill} dalam konteks ${ctx}.`,guided:i===0&&y<=2}));
 const readingPlan=rotate(readingStrategies[y],(s>>>3)%3).map((strategy,i)=>({id:`${r.unitId}-RS${i+1}`,strategy,prompt:`Gunakan strategi ini ketika membaca bahan unit: ${strategy}`,independent:i===2&&y>=3}));
 const writingPlan=writingSteps[y].map((step,i)=>({order:i+1,step,scaffold:y<=2&&i<2?'high':y<=4&&i<2?'medium':'low'}));
 const miniDialogue={
   roles:y<=2?['Murid A','Murid B']:['Penyampai','Pendengar'],
   context:ctx,
   prompt:y===1?'Gunakan dua kata daripada unit dalam dialog dua giliran.':y===2?'Bina dialog empat giliran menggunakan ayat lengkap.':y===3?'Bina dialog yang meminta dan memberi penjelasan.':y===4?'Bina dialog yang membandingkan dua pilihan dengan sopan.':y===5?'Bina dialog yang menyatakan pendirian dan memberi alasan.':'Bina dialog yang mempertahankan pendirian, menjawab soalan balas dan membuat rumusan.',
   turnTarget:y===1?2:y===2?4:y<=4?6:8
 };
 const adaptivePath={
   diagnoseOrder:['meaning','task-fit','evidence','coherence','language'],
   routes:{
    meaning:{action:'reteach-with-simpler-context',masteryCredit:false},
    'task-fit':{action:'restate-task-and-contrast-example',masteryCredit:false},
    evidence:{action:'highlight-clue-then-new-example',masteryCredit:false},
    coherence:{action:'reorder-ideas-then-rebuild',masteryCredit:false},
    language:{action:'preserve-correct-parts-and-edit-one-error-at-a-time',masteryCredit:false},
    success:{action:'new-context-independent-transfer',masteryCredit:true}
   },
   maxSameExampleRetries:1,
   afterFailure:'change-context-not-answer',
   aiOptional:true,
   deterministicFallback:true
 };
 const masteryEvidence={
   required:y<=2?2:3,
   accepted:['independent-new-context','independent-transfer','independent-self-check'],
   rejected:['hinted','copied-example','guided-retry','ai-supplied-answer'],
   expiryReview:y<=2?'after-3-units':y<=4?'after-4-units':'after-5-units'
 };
 Object.assign(r,{vocabularyDepthPractice:vocabSkills,readingStrategyPlan:readingPlan,writingProcess:writingPlan,miniDialogue,adaptivePath,masteryEvidence,polishVersion:V});
 return r;
}
Object.entries(Q.records).forEach(([id,r])=>{records[id]=make(r);F.records[id]=records[id]});
function audit(){
 const fail=[],years={};let vocab=0,reading=0,dialogues=0,writingStepsCount=0;for(let y=1;y<=6;y++)years[y]=0;
 const signature=new Set();
 for(const [id,r] of Object.entries(records)){
  years[r.year]++;vocab+=r.vocabularyDepthPractice.length;reading+=r.readingStrategyPlan.length;dialogues++;writingStepsCount+=r.writingProcess.length;
  if(r.vocabularyDepthPractice.length<3)fail.push(id+':vocab-depth');
  if(r.readingStrategyPlan.length!==3)fail.push(id+':reading-strategy');
  if(!r.adaptivePath.aiOptional||!r.adaptivePath.deterministicFallback)fail.push(id+':fallback');
  if(r.adaptivePath.routes.success.masteryCredit!==true||Object.values(r.adaptivePath.routes).slice(0,5).some(x=>x.masteryCredit))fail.push(id+':mastery-route');
  if(r.masteryEvidence.rejected.includes('guided-retry')===false)fail.push(id+':guided-master');
  signature.add(`${r.year}|${r.miniDialogue.context}|${r.miniDialogue.prompt}|${r.readingStrategyPlan.map(x=>x.strategy).join('/')}`);
 }
 const uniqueSignatures=signature.size;
 if(uniqueSignatures<100)fail.push('variation:'+uniqueSignatures);
 const stepsByYear={};for(let y=1;y<=6;y++){const one=Object.values(records).find(r=>r.year===y);stepsByYear[y]=one?.writingProcess.length||0}
 for(let y=2;y<=6;y++)if(stepsByYear[y]<stepsByYear[y-1]&&y>=3)fail.push('writing-regression-y'+y);
 return {version:V,units:Object.keys(records).length,years,vocabularyDepthTasks:vocab,readingStrategyTasks:reading,miniDialogues:dialogues,writingProcessSteps:writingStepsCount,uniqueUnitSignatures:uniqueSignatures,stepsByYear,passed:fail.length===0&&Object.values(years).every(n=>n===24),failures:fail};
}
window.BAHASA_CONTENT_POLISH_V13={version:V,records,get:id=>records[id]||null,audit};
})();

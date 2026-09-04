/* Bahasa AI — Content Quality v11. Assessment blueprint, item rotation, authentic transfer and anti-template guard. */
(()=>{'use strict';
const V='CONTENT-QUALITY-V11',Q=window.BAHASA_CONTENT_QUALITY_V10,F=window.BAHASA_FULL_CONTENT;
if(!Q||!F)return; const records={};
const purposes=['menerangkan','membandingkan','mencadangkan','menceritakan','menilai','meyakinkan'];
const contexts=['di rumah','di sekolah','dalam komuniti','semasa aktiviti berkumpulan','dalam situasi digital','ketika membuat keputusan'];
const stems={
 1:['Siapa atau apakah yang penting?','Apakah yang berlaku?','Pilih kata yang sesuai dan terangkan maksudnya.'],
 2:['Nyatakan maklumat penting.','Mengapakah tindakan itu sesuai?','Bina ayat lengkap berdasarkan situasi.'],
 3:['Apakah idea utama?','Apakah bukti yang menyokong jawapan?','Bagaimanakah dua maklumat itu berkaitan?'],
 4:['Jelaskan isi dan huraian yang relevan.','Bandingkan dua pilihan berdasarkan maklumat.','Berikan contoh yang menguatkan penjelasan.'],
 5:['Buat inferens dan jelaskan petunjuknya.','Nilai tindakan dan berikan alasan.','Cadangkan penyelesaian serta kesannya.'],
 6:['Nilai kesahihan atau kerelevanan maklumat.','Pertahankan pendirian dengan bukti.','Sintesis maklumat dan cadangkan tindakan yang wajar.']
};
function seed(s){return [...s].reduce((a,c)=>((a*33)+c.charCodeAt(0))>>>0,5381)}
function make(r){const y=r.year,s=seed(r.unitId),purpose=purposes[(s+y)%purposes.length],context=contexts[(s+y*2)%contexts.length];
 const assessmentBlueprint={
  diagnostic:[{skill:'prior-knowledge',prompt:`Tanpa melihat nota, nyatakan apa yang sudah kamu tahu tentang “${r.title}”.`,mastery:false}],
  formative:stems[y].map((p,i)=>({id:`${r.unitId}-AF${i+1}`,prompt:p,focus:i===0?'meaning':i===1?'evidence':'language-use',mastery:false})),
  transfer:[{id:`${r.unitId}-AT1`,prompt:`Dalam konteks baharu ${context}, gunakan pembelajaran unit “${r.title}” untuk ${purpose} sesuatu dengan tepat.`,newContext:true,noHint:true,masteryCandidate:true}],
  exit:[{id:`${r.unitId}-AE1`,prompt:'Terangkan satu perkara yang kamu boleh lakukan sendiri sekarang dan berikan satu contoh baharu.',selfExplanation:true,mastery:false}]
 };
 const itemRotation=[0,1,2].map(i=>({set:String.fromCharCode(65+i),readingIndex:(s+i)%3,questionStart:(s+i*3)%9,vocabOffset:(s+i*5)%Math.max(1,r.vocab.length),rule:'Do not repeat the same set immediately after success.'}));
 const authenticTask={audience:y<=2?'rakan atau ahli keluarga':y<=4?'rakan sekelas atau guru':'warga sekolah atau komuniti',purpose,context,prompt:y<=2?`Sampaikan idea tentang “${r.title}” kepada ${y===1?'rakan':'ahli keluarga'} menggunakan bahasa yang mudah difahami.`:`Hasilkan respons untuk ${context} dengan tujuan ${purpose}; pilih maklumat yang relevan dan sesuaikan bahasa dengan khalayak.`,independent:true};
 const feedbackOrder=['meaning','task-fit','completeness','coherence','language'];
 const masteryGate={minimumIndependentEvidence:y<=2?2:3,mustInclude:['new-context','no-hint','self-check'],guidedEvidenceWeight:0,aiJudgmentIsAuthority:false,allowRetry:true,staleResponseMustNotMutate:true};
 Object.assign(r,{assessmentBlueprint,itemRotation,authenticTask,feedbackOrder,masteryGate,qualityVersion:V});return r;
}
Object.entries(Q.records).forEach(([id,r])=>{records[id]=make(r);F.records[id]=records[id]});
function audit(){const fail=[],transferPrompts=[];let formative=0,transfer=0,rotation=0;const years={};for(let y=1;y<=6;y++)years[y]=0;
 for(const [id,r] of Object.entries(records)){years[r.year]++;formative+=r.assessmentBlueprint.formative.length;transfer+=r.assessmentBlueprint.transfer.length;rotation+=r.itemRotation.length;transferPrompts.push(r.assessmentBlueprint.transfer[0].prompt);if(r.assessmentBlueprint.formative.length!==3)fail.push(id+':formative');if(r.itemRotation.length!==3)new Error();if(r.masteryGate.guidedEvidenceWeight!==0||r.masteryGate.aiJudgmentIsAuthority)fail.push(id+':mastery-authority');if(r.feedbackOrder[0]!=='meaning'||r.feedbackOrder.at(-1)!=='language')fail.push(id+':feedback-order');if(!r.authenticTask.independent)fail.push(id+':authentic');}
 const uniqueTransfer=new Set(transferPrompts).size; if(uniqueTransfer<120)fail.push('transfer-variation:'+uniqueTransfer);
 return {version:V,units:Object.keys(records).length,years,formativeTasks:formative,transferTasks:transfer,itemRotationSets:rotation,uniqueTransferPrompts:uniqueTransfer,passed:fail.length===0&&Object.values(years).every(n=>n===24),failures:fail};}
window.BAHASA_CONTENT_QUALITY_V11={version:V,records,get:id=>records[id]||null,audit};
})();

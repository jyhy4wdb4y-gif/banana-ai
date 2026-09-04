/* Bahasa AI — Content Finalization v12. Year progression, varied multimodal practice, remediation and mastery integrity. */
(()=>{'use strict';
const V='CONTENT-FINALIZATION-V12',Q=window.BAHASA_CONTENT_QUALITY_V11,F=window.BAHASA_FULL_CONTENT;
if(!Q||!F)return;
const records={};
const listenFrames={
1:['Dengar dua kali. Pilih perkataan yang kamu dengar.','Dengar arahan ringkas. Tunjukkan gambar atau perkataan yang betul.'],
2:['Dengar ayat. Susun maklumat mengikut urutan.','Dengar penerangan ringkas. Nyatakan siapa, apa dan di mana.'],
3:['Dengar petikan pendek. Catat dua maklumat penting.','Dengar pendapat. Bezakan fakta dengan pendapat mudah.'],
4:['Dengar penerangan. Kenal pasti isi utama dan satu huraian.','Dengar dua pandangan. Nyatakan persamaan atau perbezaan.'],
5:['Dengar hujah ringkas. Kenal pasti alasan dan bukti.','Dengar maklumat. Buat satu inferens dan jelaskan petunjuknya.'],
6:['Dengar dua sumber ringkas. Nilai maklumat yang paling relevan.','Dengar pandangan. Rumuskan pendirian dan sokong dengan alasan.']
};
const speakFrames={
1:['Sebut perkataan dengan jelas dan bina frasa mudah.','Ceritakan satu perkara dengan satu atau dua ayat mudah.'],
2:['Terangkan maklumat dengan ayat lengkap.','Tanya dan jawab soalan mudah berkaitan situasi.'],
3:['Ceritakan semula mengikut urutan yang betul.','Berikan pendapat dan satu alasan yang sesuai.'],
4:['Huraikan idea dengan isi dan contoh.','Bandingkan dua pilihan secara lisan.'],
5:['Nyatakan pendirian, alasan dan contoh yang relevan.','Beri respons terhadap pandangan orang lain dengan sopan.'],
6:['Bentangkan rumusan yang tersusun dan tepat.','Pertahankan pendirian dengan bukti serta respons kepada soalan balas.']
};
const seniFrames={
1:['Main bunyi dan rima menggunakan kata daripada unit.','Lakonkan dialog pendek dengan intonasi sesuai.'],
2:['Cipta rangkap atau dialog ringkas menggunakan kosa kata unit.','Baca teks kreatif pendek dengan sebutan dan intonasi sesuai.'],
3:['Ubah satu situasi menjadi dialog atau cerita mini.','Gunakan peribahasa atau ungkapan mudah apabila sesuai.'],
4:['Hasilkan dialog kreatif dengan watak dan tujuan yang jelas.','Eksperimen dengan gaya bahasa mudah tanpa mengubah maksud.'],
5:['Hasilkan respons kreatif dengan nada yang sesuai kepada khalayak.','Gunakan ungkapan menarik secara tepat dalam konteks.'],
6:['Hasilkan teks kreatif ringkas yang koheren dan berkesan.','Nilai pilihan gaya bahasa dan jelaskan kesannya kepada pembaca.']
};
const remediation={
 meaning:['Cari kata kunci dalam soalan dan petikan.','Terangkan maksud dengan kata sendiri sebelum menjawab semula.'],
 evidence:['Garis maklumat yang menyokong jawapan.','Padankan setiap alasan dengan bukti daripada konteks.'],
 language:['Baca ayat perlahan-lahan. Semak susunan kata dan tanda baca.','Betulkan satu kesalahan pada satu masa tanpa membuang bahagian yang sudah betul.'],
 coherence:['Susun idea mengikut urutan: idea utama → huraian → contoh.','Gunakan penanda wacana hanya apabila hubungan idea benar-benar sesuai.'],
 transfer:['Tukar contoh, tempat atau watak tetapi kekalkan kemahiran yang sama.','Jawab situasi baharu tanpa menyalin contoh latihan.']
};
function yearBand(y){return y<=2?'foundation':y<=4?'development':'independent';}
function make(r){
 const y=r.year,idx=(parseInt(String(r.unitId).match(/(\\d+)$/)?.[1]||'1',10)-1)%24;
 const listening=listenFrames[y].map((prompt,i)=>({id:`${r.unitId}-L${i+1}`,prompt,mode:'listening',independent:i===1&&y>=3}));
 const speaking=speakFrames[y].map((prompt,i)=>({id:`${r.unitId}-S${i+1}`,prompt,mode:'speaking',independent:i===1}));
 const seni=seniFrames[y].map((prompt,i)=>({id:`${r.unitId}-SB${i+1}`,prompt,mode:'seni-bahasa',creative:true}));
 const recoveryPlan={
   meaning:remediation.meaning[idx%2], evidence:remediation.evidence[(idx+y)%2], language:remediation.language[(idx+y+1)%2],
   coherence:remediation.coherence[idx%2], transfer:remediation.transfer[(idx+y)%2],
   preserveCorrectParts:true, semanticPriority:true, maxGuidedRetries:2,
   afterTwoGuidedRetries:'switch-example-then-new-context'
 };
 const progression={
   band:yearBand(y), scaffoldLevel:y===1?'high':y===2?'high-medium':y===3?'medium':y===4?'medium-low':y===5?'low':'minimal',
   responseExpectation:y===1?'word/phrase/simple sentence':y===2?'complete sentence':y===3?'linked sentences/short paragraph':y===4?'structured paragraph':y===5?'multi-paragraph composition':'independent coherent composition',
   reasoning:y<=2?'literal + simple cause':y===3?'main idea + evidence':y===4?'comparison + explanation':y===5?'inference + evaluation':'evaluation + synthesis + justification'
 };
 const independentChallenge={
   id:`${r.unitId}-IC1`, noHint:true, newContext:true, unseenExample:true, guided:false,
   prompt:y<=2?`Gunakan kemahiran unit “${r.title}” dalam contoh baharu yang kamu cipta sendiri.`:`Gunakan kemahiran unit “${r.title}” dalam situasi baharu. Pilih maklumat sendiri, hasilkan respons, kemudian semak maksud, susunan idea dan bahasa tanpa petunjuk.`,
   requiresSelfCheck:true, countsTowardMastery:true
 };
 const selfCheck=y<=2?['Adakah jawapan saya menjawab soalan?','Adakah ayat saya lengkap dan mudah difahami?','Adakah saya mencuba sendiri?']:[
   'Adakah respons saya benar-benar menepati tugasan?','Adakah setiap idea penting disokong dengan huraian atau bukti?','Adakah susunan idea jelas dan berkaitan?','Adakah pilihan bahasa tepat untuk tujuan dan khalayak?','Adakah saya menyemak sendiri sebelum menghantar?'
 ];
 Object.assign(r,{listeningPractice:listening,speakingPractice:speaking,seniBahasaPractice:seni,recoveryPlan,progression,independentChallenge,selfCheck,finalizationVersion:V});
 return r;
}
Object.entries(Q.records).forEach(([id,r])=>{records[id]=make(r);F.records[id]=records[id]});
function audit(){
 const fail=[],years={};let listening=0,speaking=0,seni=0,independent=0;for(let y=1;y<=6;y++)years[y]=0;
 const expectations={};
 for(const [id,r] of Object.entries(records)){
  years[r.year]++;listening+=r.listeningPractice.length;speaking+=r.speakingPractice.length;seni+=r.seniBahasaPractice.length;if(r.independentChallenge.countsTowardMastery)independent++;
  expectations[r.year]=r.progression.responseExpectation;
  if(r.listeningPractice.length!==2||r.speakingPractice.length!==2||r.seniBahasaPractice.length!==2)fail.push(id+':multimodal');
  if(!r.recoveryPlan.preserveCorrectParts||!r.recoveryPlan.semanticPriority)fail.push(id+':meaning-first');
  if(!r.independentChallenge.noHint||!r.independentChallenge.newContext||r.independentChallenge.guided)fail.push(id+':independent');
  if(r.masteryGate.guidedEvidenceWeight!==0||r.masteryGate.aiJudgmentIsAuthority)fail.push(id+':mastery-integrity');
 }
 const expUnique=new Set(Object.values(expectations)).size;
 if(expUnique<6)fail.push('year-progression:'+expUnique);
 return {version:V,units:Object.keys(records).length,years,listeningTasks:listening,speakingTasks:speaking,seniBahasaTasks:seni,independentChallenges:independent,yearResponseLevels:expUnique,passed:fail.length===0&&Object.values(years).every(n=>n===24),failures:fail};
}
window.BAHASA_CONTENT_FINALIZATION_V12={version:V,records,get:id=>records[id]||null,audit};
})();

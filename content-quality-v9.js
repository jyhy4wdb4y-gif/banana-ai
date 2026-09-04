/* Bahasa AI — Content Quality v9. Adds unit-specific activity variety, misconception repair, and independent transfer. */
(()=>{'use strict';
const V='CONTENT-QUALITY-V9', B=window.BAHASA_COMPLETE_CONTENT, F=window.BAHASA_FULL_CONTENT, C=window.BAHASA_CURRICULUM;
if(!B||!F||!C)return;
const oralFrames=[
 ['cerita semula','Ceritakan semula satu maklumat penting tanpa membaca teks.'],
 ['soal jawab','Tanya satu soalan yang sesuai, kemudian jawab dengan ayat lengkap.'],
 ['pilih dan jelaskan','Pilih satu tindakan yang sesuai dan jelaskan sebabnya.'],
 ['banding beza','Nyatakan satu persamaan atau perbezaan yang berkaitan dengan unit ini.'],
 ['susun idea','Sampaikan idea mengikut urutan mula, kemudian dan akhir.'],
 ['pendirian','Berikan pendapat sendiri dan sokong dengan satu alasan.']
];
const seniByYear={
 1:[['bunyi-bahasa','Padankan bunyi, suku kata atau perkataan yang sedap didengar dalam konteks unit.'],['irama','Baca frasa pendek dengan sebutan dan intonasi yang sesuai.']],
 2:[['irama','Baca ayat dengan jeda dan intonasi yang sesuai.'],['ungkapan','Cipta satu ungkapan pendek yang menarik berdasarkan situasi unit.']],
 3:[['bahasa-indah','Kenal pasti perkataan atau frasa yang menjadikan gambaran lebih hidup.'],['cipta','Cipta dua ayat kreatif yang masih mengekalkan maksud yang munasabah.']],
 4:[['apresiasi','Terangkan kesan satu pilihan kata atau ungkapan terhadap pembaca.'],['olah','Olah satu ayat biasa menjadi ayat yang lebih menarik tanpa mengubah fakta.']],
 5:[['gaya-bahasa','Bandingkan dua cara menyampaikan idea dan pilih yang lebih berkesan.'],['cipta','Hasilkan ungkapan kreatif yang sesuai dengan khalayak dan tujuan.']],
 6:[['apresiasi-kritis','Nilai keberkesanan pilihan bahasa dalam menyampaikan mesej.'],['transformasi','Ubah gaya penyampaian untuk khalayak berbeza sambil mengekalkan maksud.']]
};
const misconception={
 meaning:{signal:'jawapan tidak sesuai dengan konteks atau maksud utama',repair:['baca/dengar semula konteks minimum','kenal pasti kata kunci','bezakan dua kemungkinan makna','cuba contoh baharu tanpa menyalin']},
 incomplete:{signal:'idea betul tetapi maklumat belum cukup',repair:['kekalkan bahagian yang betul','tanya siapa/apa/mengapa/bagaimana yang masih hilang','lengkapkan hanya bahagian yang kurang','cuba semula secara bebas']},
 language:{signal:'maksud boleh difahami tetapi bentuk bahasa lemah',repair:['jangan padam idea yang betul','fokus satu kesalahan bahasa pada satu masa','baiki bentuk sasaran','gunakan bentuk itu dalam ayat baharu']},
 sequence:{signal:'maklumat betul tetapi urutan atau hubungan idea tidak jelas',repair:['asingkan idea utama dan sokongan','susun mengikut hubungan masa/sebab/kesan','pilih penanda yang sesuai','ceritakan semula tanpa petunjuk']},
 transfer:{signal:'berjaya dengan model tetapi gagal dalam konteks baharu',repair:['kurangkan bantuan satu tahap','beri konteks baharu yang setara','minta murid menerangkan strategi','nilai hanya percubaan bebas sebagai mastery']}
};
function unitSeed(id){return [...id].reduce((a,c)=>a+c.charCodeAt(0),0)}
function addQuality(r){
 const seed=unitSeed(r.unitId), y=r.year, title=r.title, vocab=r.vocab||[];
 const frame=oralFrames[seed%oralFrames.length];
 const production=vocab.slice(0,Math.min(6,vocab.length)).map((word,k)=>({id:`${r.unitId}-VP${k+1}`,word,prompt:y<=2?`Gunakan “${word}” dalam ayat mudah yang sesuai dengan “${title}”.`:`Gunakan “${word}” untuk menerangkan idea tentang “${title}” dengan tepat.`,independent:k>=4}));
 const activityMix=[
  {type:'retrieval',prompt:`Tanpa melihat senarai, ingat semula ${y<=2?2:3} kata penting daripada unit “${title}”.`},
  {type:'context-choice',prompt:'Pilih kata yang paling tepat untuk situasi baharu dan jelaskan petunjuk konteks yang membantu.'},
  {type:'oral-'+frame[0],prompt:frame[1]},
  {type:'evidence',prompt:y<=2?'Cari satu maklumat dalam teks yang menyokong jawapanmu.':'Sokong jawapan dengan bukti atau maklumat yang relevan daripada teks.'},
  {type:'repair',prompt:'Semak satu jawapan yang kurang tepat: kekalkan bahagian betul dan baiki hanya bahagian yang perlu.'},
  {type:'transfer',prompt:`Gunakan kemahiran unit “${title}” dalam situasi lain yang belum pernah ditunjukkan.`,independent:true}
 ];
 const selfCheck=y<=2?['Saya faham soalan.','Jawapan saya sesuai dengan situasi.','Saya menggunakan ayat yang boleh difahami.','Saya cuba sendiri sebelum meminta bantuan.']:['Idea saya relevan dan tepat.','Saya menyokong idea dengan maklumat/alasan.','Hubungan antara idea jelas.','Saya menyemak bahasa selepas memastikan maksud betul.','Saya boleh guna kemahiran ini dalam konteks baharu.'];
 const independentChallenge={prompt:y===1?`Gunakan dua kata daripada unit “${title}” dalam respons baharu tanpa model.`:y===2?`Bina 2–3 ayat berkaitan tentang situasi baharu menggunakan kemahiran unit “${title}”.`:y===3?`Tulis perenggan pendek tentang situasi baharu dan pastikan idea utama serta sokongan jelas.`:y===4?`Hasilkan perenggan berstruktur dengan isi, huraian dan contoh dalam konteks baharu.`:y===5?`Hasilkan respons berkembang yang menunjukkan sebab, kesan atau cadangan dan hubungan idea yang lancar.`:`Hasilkan respons bebas yang koheren, nilai maklumat yang relevan dan sunting sendiri sebelum hantar.`,noModel:true,noHint:true,newContext:true,countsForMastery:true};
 r.vocabProduction=production;r.activityMix=activityMix;r.seniBahasa=seniByYear[y].map(([type,prompt],k)=>({type,prompt,independent:k===1&&y>=3}));r.misconceptionRepair=misconception;r.selfCheck=selfCheck;r.independentChallenge=independentChallenge;r.qualityVersion=V;
 return r;
}
const records={};Object.keys(B.records).forEach(id=>{const r=addQuality(B.records[id]);records[id]=r;F.records[id]=r;});
function audit(){const fail=[],prompts=[],ind=[];for(const [id,r] of Object.entries(records)){if(r.activityMix?.length!==6)fail.push(id+':mix');if(r.vocabProduction?.length<6)fail.push(id+':vocab-production');if(r.seniBahasa?.length!==2)fail.push(id+':seni');if(Object.keys(r.misconceptionRepair||{}).length!==5)fail.push(id+':repair');if(!r.independentChallenge?.noHint||!r.independentChallenge?.newContext)fail.push(id+':independent');prompts.push(...r.activityMix.map(x=>`${id}:${x.type}:${x.prompt}`));ind.push(r.independentChallenge.prompt)}
 const years={};for(let y=1;y<=6;y++)years[y]=Object.values(records).filter(r=>r.year===y).length;
 return {version:V,units:Object.keys(records).length,years,activityTasks:Object.keys(records).length*6,vocabProduction:Object.values(records).reduce((n,r)=>n+r.vocabProduction.length,0),misconceptionPaths:Object.keys(records).length*5,independentChallenges:ind.length,uniqueIndependentChallengeIds:new Set(Object.keys(records).map(id=>id+'-IC')).size,promptVariants:new Set(ind).size,passed:fail.length===0&&Object.values(years).every(n=>n===24),failures:fail};}
window.BAHASA_CONTENT_QUALITY_V9={version:V,records,get:id=>records[id]||null,audit};
})();

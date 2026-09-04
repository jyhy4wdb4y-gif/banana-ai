(()=>{
'use strict';
const V='TEXTBOOK-CONTENT-Y2-Y5-V7';
const C=window.BAHASA_CURRICULUM;
const FC=window.BAHASA_FULL_CONTENT?.records;
if(!C||!FC)return;
const YEAR_CFG={
2:{read:'45–75 patah perkataan',skill:'ayat lengkap dan maklumat tambahan',q:['literal','vocabulary','application'],write:'2–4 ayat berkaitan'},
3:{read:'70–110 patah perkataan',skill:'idea utama, sokongan dan urutan',q:['literal','inferential','sequence'],write:'perenggan pendek 3–5 ayat'},
4:{read:'100–150 patah perkataan',skill:'isi, huraian, contoh dan ayat majmuk',q:['literal','inferential','application'],write:'perenggan lengkap berstruktur'},
5:{read:'130–190 patah perkataan',skill:'idea, sebab, kesan, cadangan dan wacana',q:['literal','inferential','critical'],write:'karangan/perenggan berkembang'}
};
const THEME_LEX=[
['keluarga','tanggungjawab','prihatin','hormat','bekerjasama','kasih sayang','rutin','sokongan','berbincang','membantu','harmoni','teladan'],
['kesihatan','kebersihan','pemakanan','senaman','rehat','cergas','seimbang','bersih','pencegahan','amalan','persekitaran','sejahtera'],
['keselamatan','waspada','risiko','peraturan','bahaya','cermat','melindungi','tindakan','kecemasan','laluan','isyarat','pencegahan'],
['perpaduan','masyarakat','jiran','kerjasama','hormat','toleransi','muhibah','sukarelawan','komuniti','sepakat','sumbangan','harmoni'],
['budaya','warisan','Malaysia','tradisi','kesenian','bahasa','identiti','patriotik','perayaan','menghargai','generasi','negara'],
['sains','teknologi','inovasi','ciptaan','kajian','fungsi','kreatif','digital','eksperimen','maklumat','penyelesaian','manfaat'],
['alam','kelestarian','haiwan','tumbuhan','sumber','kitar semula','pencemaran','memelihara','habitat','hijau','jimat','tanggungjawab'],
['wang','keperluan','kehendak','simpanan','belanjawan','usaha','amanah','jujur','perbelanjaan','nilai','usahawan','berhemah']
];
const SCENES=[
['di rumah','bersama ahli keluarga','semasa merancang aktiviti hujung minggu'],
['di sekolah','bersama rakan sekelas','semasa menjalankan kempen kelas'],
['di kawasan kejiranan','bersama jiran','semasa aktiviti komuniti'],
['di perpustakaan','bersama kumpulan projek','semasa mencari maklumat'],
['di taman rekreasi','bersama keluarga dan rakan','semasa aktiviti luar'],
['di pusat sains','bersama guru','semasa membuat pemerhatian'],
['di kebun komuniti','bersama sukarelawan','semasa menjaga alam'],
['di karnival sekolah','bersama ahli kelab','semasa mengurus gerai']
];
function clean(s){return String(s||'').replace(/[“”]/g,'').trim();}
function passage(y,title,theme,t,n){
 const [place,people,event]=SCENES[(t+n)%SCENES.length];
 const a=THEME_LEX[t];
 if(y===2){
  return [
   `${clean(title)} menjadi topik pembelajaran Amir ${place}. Dia mendengar penerangan guru dan memilih perkataan penting seperti ${a[0]}, ${a[1]} dan ${a[2]}. Selepas itu, Amir menceritakan semula dua maklumat dengan ayat lengkap. Rakannya menambah satu maklumat supaya cerita mereka lebih jelas.`,
   `${event}, Mei Ling dan rakannya belajar tentang ${clean(title).toLowerCase()}. Mereka melihat keadaan sekeliling, bertanya soalan dan mencatat perkara yang penting. Mereka bersetuju bahawa sikap ${a[3]} dan ${a[4]} membantu semua orang. Pada akhir aktiviti, setiap murid menyebut satu tindakan yang boleh dilakukan sendiri.`,
   `${people} berbincang tentang ${clean(title).toLowerCase()}. Mula-mula mereka mengenal pasti masalah. Kemudian mereka memilih tindakan yang mudah dan selamat. Mereka menerangkan siapa yang perlu bertindak, apa yang perlu dilakukan dan sebab tindakan itu penting. Dengan cara ini, maklumat dalam ayat menjadi lebih lengkap.`
  ][n];
 }
 if(y===3){
  return [
   `Dalam pembelajaran tentang ${clean(title)}, sekumpulan murid ${place} mengumpulkan beberapa maklumat. Mereka mendapati bahawa ${a[0]} berkait rapat dengan ${a[1]} dan ${a[2]}. Ketua kumpulan meminta setiap ahli memilih satu idea utama dan dua maklumat sokongan. Selepas berbincang, mereka menyusun maklumat mengikut urutan supaya pembaca mudah memahami mesej mereka.`,
   `${event}, murid-murid meneliti situasi berkaitan ${clean(title).toLowerCase()}. Ada beberapa cadangan, tetapi mereka perlu memilih cadangan yang paling sesuai. Mereka menggunakan kata kunci ${a[3]}, ${a[4]} dan ${a[5]} untuk menerangkan sebab. Akhirnya, mereka menghasilkan tiga ayat yang saling berkaitan dan menyemak sama ada setiap ayat menyokong idea utama.`,
   `Guru memberikan satu situasi baharu tentang ${clean(title).toLowerCase()}. Murid tidak boleh menyalin contoh sebelumnya. Mereka perlu mengenal pasti perkara penting, menyusun tindakan mengikut urutan dan menerangkan hasilnya. Aktiviti ini menunjukkan bahawa memahami konteks lebih penting daripada menghafal satu jawapan. Murid kemudian menulis perenggan pendek menggunakan perkataan sendiri.`
  ][n];
 }
 if(y===4){
  return [
   `Topik ${clean(title)} dibincangkan melalui satu projek kecil ${place}. Murid meneliti maklumat, membezakan isi utama daripada butiran sampingan dan memilih bukti yang relevan. Mereka mendapati bahawa ${a[0]}, ${a[1]} dan ${a[2]} saling berkaitan. Setiap kumpulan perlu membina satu isi, menghuraikannya dan memberikan contoh yang benar-benar menyokong isi tersebut. Mereka juga menggabungkan dua idea menggunakan kata hubung yang sesuai supaya ayat lebih lancar.`,
   `${event}, kumpulan Suresh berhadapan dengan dua pilihan berkaitan ${clean(title).toLowerCase()}. Mereka tidak terus memilih jawapan pertama. Sebaliknya, mereka menyenaraikan kelebihan, kekangan dan kemungkinan kesan setiap pilihan. Sikap ${a[3]} dan ${a[4]} dijadikan panduan. Selepas membuat keputusan, mereka menerangkan alasan dalam satu perenggan yang mempunyai ayat topik, huraian dan contoh.`,
   `Satu poster tentang ${clean(title).toLowerCase()} menarik perhatian murid. Guru meminta mereka menilai sama ada mesej poster itu jelas dan boleh diamalkan. Murid mengenal pasti maklumat penting, membina inferens dan mencadangkan penambahbaikan. Mereka kemudian memindahkan idea tersebut kepada situasi lain ${place}. Tugas terakhir ialah menulis perenggan baharu tanpa menyalin ayat daripada bahan rangsangan.`
  ][n];
 }
 return [
  `Pembelajaran tentang ${clean(title)} bermula dengan satu persoalan: apakah tindakan yang memberi manfaat dan apakah kesannya kepada orang lain? Murid ${place} meneliti beberapa maklumat dan mengelaskan fakta, pendapat serta cadangan. Mereka menggunakan konsep ${a[0]}, ${a[1]} dan ${a[2]} untuk membina hujah. Setiap kumpulan perlu menyatakan pendirian, memberikan sebab, menyokongnya dengan contoh dan mempertimbangkan pandangan yang berbeza sebelum membuat rumusan.`,
  `${event}, murid menjalankan tugasan berkaitan ${clean(title).toLowerCase()}. Mereka mendapati bahawa satu keputusan boleh menghasilkan kesan yang berbeza dalam jangka pendek dan jangka panjang. Oleh itu, mereka membandingkan pilihan berdasarkan ${a[3]}, ${a[4]} dan ${a[5]}. Mereka menggunakan penanda wacana untuk menghubungkan sebab, kesan dan cadangan. Selepas pembentangan, kumpulan lain menyoal sama ada bukti yang digunakan benar-benar menyokong kesimpulan.`,
  `Guru memberikan senario baharu tentang ${clean(title).toLowerCase()} tanpa contoh jawapan. Murid perlu mentafsir kehendak tugasan, memilih isi yang relevan dan membina respons yang koheren. Mereka digalakkan menyunting perkataan yang kabur, membuang pengulangan dan menambah huraian apabila alasan belum mencukupi. Pada akhir aktiviti, setiap murid menghasilkan respons sendiri dan menerangkan satu penambahbaikan yang dibuat semasa semakan.`
 ][n];
}
function make(y,i){
 const u=C.years[y].units[i], t=Math.floor(i/3), title=u.title, theme=Array.isArray(u.theme)?u.theme[0]:u.theme;
 const lex=[...new Set([...(u.words||[]),...THEME_LEX[t]])].slice(0,y===2?12:14);
 const readings=[0,1,2].map(n=>passage(y,title,theme,t,n));
 const questions=readings.flatMap((_,n)=>[
  {level:YEAR_CFG[y].q[0],q:`Bahan ${n+1}: Nyatakan maklumat utama yang dinyatakan dengan jelas.`,expect:'jawapan berdasarkan bahan'},
  {level:YEAR_CFG[y].q[1],q:y<=2?`Bahan ${n+1}: Pilih satu perkataan penting dan jelaskan maksudnya dalam konteks.`:`Bahan ${n+1}: Apakah yang dapat kamu simpulkan? Jelaskan berdasarkan maklumat dalam bahan.`,expect:'maksud/inferens yang relevan + sokongan'},
  {level:YEAR_CFG[y].q[2],q:`Bahan ${n+1}: Gunakan idea daripada bahan dalam situasi baharu dan jelaskan pilihanmu.`,expect:'pemindahan idea yang bermakna',independent:n===2}
 ]);
 const grammar=[
  {stage:'notice',prompt:y===2?'Kenal pasti subjek dan tindakan dalam satu ayat lengkap.':y===3?'Kenal pasti kata hubung atau penanda urutan yang menghubungkan idea.':y===4?'Kenal pasti hubungan antara dua klausa dalam ayat majmuk.':'Kenal pasti penanda wacana dan jelaskan hubungan idea yang dibinanya.'},
  {stage:'repair',prompt:'Baiki satu ayat yang kurang jelas atau kurang gramatis tanpa mengubah maksud penting.'},
  {stage:'transfer',prompt:`Bina ayat baharu tentang ${clean(title).toLowerCase()} menggunakan pola bahasa yang dipelajari.`,independent:true}
 ];
 const writing={guided:`Bina ${YEAR_CFG[y].write} tentang “${title}” dengan rangka bantuan.`,transfer:`Gunakan kemahiran ${YEAR_CFG[y].skill} dalam konteks lain yang berkaitan dengan tema ${theme}.`,mastery:`Hasilkan ${YEAR_CFG[y].write} tentang “${title}” tanpa model, pilihan jawapan atau petunjuk isi. Semak sendiri sebelum hantar.`,checklist:y<=3?['maksud jelas','ayat lengkap','idea berkaitan','ejaan/tanda baca disemak']:['isi relevan','huraian jelas','contoh menyokong','hubungan idea lancar','tatabahasa disemak','semakan kendiri']};
 return {year:y,unitId:`y${y}-u${i+1}`,title,theme,contentRole:'BAHASA_AI_ORIGINAL_CURRICULUM_ALIGNED',officialUnitTitleClaim:false,mappingStatus:C.years[y].mappingStatus||'PENDING_SOURCE_VERIFICATION',difficulty:{readingTarget:YEAR_CFG[y].read,skillTarget:YEAR_CFG[y].skill},domains:['Mendengar dan Bertutur','Membaca','Menulis','Seni Bahasa','Tatabahasa'],vocab:lex,readings,questions,grammar,writing,sourceBasis:'Bahasa AI original teaching content aligned to the current year skill progression. Official textbook unit-title mapping remains separate and is never inferred from these app-authored titles.',sourceStatus:'ORIGINAL_CONTENT_OFFICIAL_UNIT_MAPPING_PENDING',originalContent:true,copyrightNote:'Original Bahasa AI material; no textbook passage, illustration or exercise copied.',masteryPolicy:{guidedIsMastery:false,transferRequired:true,independentRequired:true,noHint:true}};
}
const records={};
for(const y of [2,3,4,5])for(let i=0;i<24;i++){const r=make(y,i);records[r.unitId]=r;FC[r.unitId]=r;const u=C.years[y].units[i];u.words=r.vocab.slice();u.contentDepth='DEEP_ORIGINAL_V7';u.domains=r.domains.slice();u.contentStatus=r.sourceStatus;}
function audit(){const ids=Object.keys(records),passages=[],fail=[];if(ids.length!==96)fail.push('unit-count');ids.forEach(id=>{const r=records[id];if(r.vocab.length<12)fail.push(id+':vocab');if(r.readings.length!==3)fail.push(id+':readings');if(r.questions.length!==9)fail.push(id+':questions');if(r.grammar.length!==3)fail.push(id+':grammar');if(r.officialUnitTitleClaim!==false)fail.push(id+':claim');passages.push(...r.readings);});const unique=new Set(passages);if(unique.size!==passages.length)fail.push('duplicate-passages');return {version:V,units:ids.length,years:[2,3,4,5],passages:passages.length,uniquePassages:unique.size,questions:ids.reduce((a,id)=>a+records[id].questions.length,0),languageTasks:ids.reduce((a,id)=>a+records[id].grammar.length,0),passed:fail.length===0,failures:fail};}
window.BAHASA_TEXTBOOK_CONTENT_Y2_Y5={version:V,records,get:id=>records[id]||null,audit};
})();

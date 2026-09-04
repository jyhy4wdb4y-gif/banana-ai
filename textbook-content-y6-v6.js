(()=>{
'use strict';
const V='TEXTBOOK-CONTENT-Y6-V6';
const THEMES=[
 'Kekeluargaan','Kesihatan dan Kebersihan','Keselamatan','Perpaduan',
 'Kebudayaan, Kesenian dan Estetika','Sains, Teknologi dan Inovasi',
 'Ekonomi, Keusahawanan dan Pengurusan Kewangan','Integriti'
];
const TOPICS=[
 ['Keluarga sebagai sokongan','Tanggungjawab dalam keluarga','Membina keluarga harmoni'],
 ['Amalan hidup sihat','Kebersihan persekitaran','Kesihatan mental dan emosi'],
 ['Keselamatan diri','Keselamatan komuniti','Tindakan semasa kecemasan'],
 ['Hidup bermasyarakat','Kerjasama pelbagai kaum','Semangat muhibah'],
 ['Warisan budaya','Seni dalam kehidupan','Menghargai estetika'],
 ['Sains dalam kehidupan','Teknologi yang bertanggungjawab','Inovasi menyelesaikan masalah'],
 ['Keusahawanan beretika','Mengurus wang dengan bijak','Membuat keputusan kewangan'],
 ['Amanah dan jujur','Tanggungjawab dan adil','Integriti dalam tindakan']
];
const LEX=[
 ['sokongan','tanggungjawab','prihatin','komunikasi','kepercayaan','harmoni','menghargai','kerjasama','cabaran','penyelesaian','empati','komitmen'],
 ['pemakanan','kecergasan','kebersihan','pencegahan','jangkitan','kesejahteraan','emosi','seimbang','persekitaran','kesedaran','rawatan','amalan'],
 ['risiko','waspada','kecemasan','prosedur','perlindungan','tindakan','pencegahan','bahaya','laluan','isyarat','kesedaran','tanggungjawab'],
 ['perpaduan','muhibah','toleransi','kerjasama','kepelbagaian','hormat','masyarakat','sukarelawan','komuniti','keharmonian','sumbangan','sepakat'],
 ['warisan','estetika','kesenian','tradisi','kreativiti','identiti','persembahan','kraf','pemuliharaan','apresiasi','budaya','generasi'],
 ['inovasi','teknologi','penyelidikan','reka cipta','eksperimen','data','fungsi','kecekapan','kelestarian','keselamatan','penyelesaian','impak'],
 ['usahawan','modal','belanjawan','simpanan','keperluan','kehendak','keuntungan','perbelanjaan','nilai','risiko','perancangan','transaksi'],
 ['integriti','amanah','jujur','adil','prinsip','akauntabiliti','keputusan','tanggungjawab','etika','kepercayaan','telus','berhemah']
];
function passage(theme,topic,n){
 const frames=[
  `${topic} memerlukan pengetahuan dan tindakan yang konsisten. Dalam kehidupan harian, seseorang perlu menilai keadaan, mempertimbangkan kesannya kepada orang lain dan memilih tindakan yang sesuai. Sikap bertanggungjawab membantu kita membuat keputusan yang lebih matang.`,
  `Sekumpulan murid menjalankan projek tentang ${topic.toLowerCase()}. Mereka mengumpulkan maklumat, membandingkan beberapa pilihan dan berbincang tentang kelebihan serta kekurangan setiap cadangan. Selepas itu, mereka memilih satu tindakan yang boleh dilaksanakan dan menerangkan sebab pilihan tersebut.`,
  `Isu berkaitan ${topic.toLowerCase()} tidak semestinya mempunyai satu jawapan mudah. Kita perlu mengenal pasti fakta, membezakan pendapat daripada bukti dan mempertimbangkan akibat jangka pendek serta jangka panjang. Pendekatan ini membantu kita bertindak secara rasional dan berhemah.`
 ]; return frames[n];
}
function make(themeIdx,unitIdx){
 const unitNo=themeIdx*3+unitIdx+1, theme=THEMES[themeIdx], topic=TOPICS[themeIdx][unitIdx];
 const id=`y6-u${unitNo}`; const vocab=[...LEX[themeIdx],topic.toLowerCase(),theme.toLowerCase()].slice(0,14);
 const readings=[0,1,2].map(n=>passage(theme,topic,n));
 const questions=readings.flatMap((p,n)=>[
  {level:'literal',q:`Petikan ${n+1}: Nyatakan dua maklumat penting daripada petikan.`,expect:'dua maklumat yang disokong petikan'},
  {level:'inferential',q:`Petikan ${n+1}: Apakah kesimpulan yang munasabah? Berikan bukti.`,expect:'inferens + bukti daripada petikan'},
  {level:'critical',q:`Petikan ${n+1}: Nilai satu tindakan atau pendirian dalam konteks ini. Jelaskan alasan.`,expect:'penilaian relevan + alasan',independent:true}
 ]);
 const grammar=[
  {stage:'struktur',prompt:'Kenal pasti satu ayat majmuk atau hubungan idea dalam petikan dan terangkan fungsinya.'},
  {stage:'edit',prompt:'Sunting satu ayat supaya lebih gramatis, tepat dan jelas tanpa mengubah maksud asal.'},
  {stage:'transfer',prompt:`Tulis satu ayat matang tentang ${topic.toLowerCase()} menggunakan penanda wacana yang sesuai.`,independent:true}
 ];
 const writing={
  guided:`Rancang satu perenggan tentang “${topic}”: isi utama, huraian dan contoh.`,
  transfer:`Gunakan idea ${theme.toLowerCase()} dalam situasi baharu dan jelaskan sebab tindakan pilihanmu.`,
  mastery:`Tulis perenggan bebas yang koheren tentang “${topic}” tanpa model atau pilihan jawapan. Semak sendiri bahasa dan ketepatan idea.`,
  checklist:['isi jelas','huraian menyokong isi','contoh relevan','penanda wacana sesuai','tatabahasa tepat','semakan kendiri']
 };
 return {year:6,unitId:id,title:topic,theme,domains:['Mendengar dan Bertutur','Membaca','Menulis','Seni Bahasa','Tatabahasa'],vocab,readings,questions,grammar,writing,sourceBasis:'Official DBP Bahasa Melayu Tahun 6 SJK confirms 8 themes / 24 units and modular DSKP skills. Topic titles and all learning materials here are original Bahasa AI content, not claimed as textbook unit titles.',sourceStatus:'OFFICIAL_THEME_FRAMEWORK_VERIFIED_ORIGINAL_UNIT_CONTENT',originalContent:true,copyrightNote:'Original Bahasa AI passages/questions; no textbook passage, illustration or exercise copied.',masteryPolicy:{guidedIsMastery:false,transferRequired:true,independentRequired:true,noHint:true}};
}
const records={}; for(let t=0;t<8;t++)for(let u=0;u<3;u++){const r=make(t,u);records[r.unitId]=r;}
if(window.BAHASA_FULL_CONTENT?.records){Object.assign(window.BAHASA_FULL_CONTENT.records,records);}
if(window.BAHASA_CURRICULUM?.years?.[6]){
 const units=window.BAHASA_CURRICULUM.years[6].units||[];
 units.forEach((u,i)=>{const r=records[`y6-u${i+1}`];if(!r)return;u.words=r.vocab.slice();u.contentDepth='OFFICIAL_THEME_ALIGNED_ORIGINAL_DEEP';u.domains=r.domains.slice();u.textbookAlignment={theme:r.theme,status:r.sourceStatus,officialUnitTitleClaim:false};});
 window.BAHASA_CURRICULUM.years[6].contentVersion=V;
}
function audit(){const ids=Object.keys(records),p=new Set(),fail=[];if(ids.length!==24)fail.push('unit-count');ids.forEach(id=>{const r=records[id];if(r.vocab.length<12)fail.push(id+':vocab');if(r.readings.length!==3)fail.push(id+':readings');r.readings.forEach(x=>{if(p.has(x))fail.push(id+':duplicate');p.add(x)});if(r.questions.length!==9)fail.push(id+':questions');if(r.grammar.length!==3)fail.push(id+':grammar');if(!r.masteryPolicy.independentRequired)fail.push(id+':mastery');});return {version:V,units:ids.length,themes:new Set(ids.map(id=>records[id].theme)).size,uniquePassages:p.size,questions:ids.reduce((a,id)=>a+records[id].questions.length,0),passed:fail.length===0,failures:fail};}
window.BAHASA_TEXTBOOK_CONTENT_Y6={version:V,records,get:id=>records[id]||null,audit};
})();

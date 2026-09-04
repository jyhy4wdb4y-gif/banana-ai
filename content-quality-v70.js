/* Bahasa AI ULTIMATE v70 — Unit-by-Unit Teaching Blueprint.
   App-authored curriculum-aware content; not an official SK/SP mapping. */
(function(){
'use strict';
const V='70.0.0';
const themeLex=[
 ['keluarga','diri','kasih sayang','tanggungjawab','rumah','sekolah','membantu','menghormati','gembira','prihatin'],
 ['kesihatan','kebersihan','sihat','bersih','cergas','makanan','air','senaman','menjaga','amalan'],
 ['keselamatan','peraturan','bahaya','selamat','cermat','jalan raya','melindungi','mematuhi','waspada','tindakan'],
 ['masyarakat','jiran','rakan','kerjasama','hormat','toleransi','membantu','bersama','harmoni','perpaduan'],
 ['Malaysia','budaya','warisan','seni','negara','bangga','menghargai','perayaan','identiti','patriotik'],
 ['sains','teknologi','inovasi','ciptaan','maklumat','kreatif','menguji','memerhati','fungsi','idea'],
 ['alam','lestari','tumbuhan','haiwan','sumber','hijau','menjaga','mengurangkan','memelihara','persekitaran'],
 ['wang','usaha','amanah','jimat','keperluan','integriti','mengurus','memilih','nilai','tanggungjawab']
];
const unitMoves=['kenal pasti','terangkan','gunakan'];
const yearSpec={
1:{read:3,task:'Kenal perkataan, frasa dan bina satu ayat mudah.',grammar:'perkataan → frasa → ayat mudah',comp:['siapa/apa','apa berlaku','guna dalam ayat baharu']},
2:{read:4,task:'Bina dua ayat lengkap dan tambah maklumat yang sesuai.',grammar:'frasa → ayat lengkap → maklumat',comp:['maklumat jelas','sebab mudah','guna dalam situasi baharu']},
3:{read:5,task:'Susun idea utama dan sokongan menjadi perenggan ringkas.',grammar:'ayat berkembang → hubungan idea',comp:['idea utama','idea sokongan','aplikasi']},
4:{read:6,task:'Kembangkan isi dengan huraian dan contoh yang relevan.',grammar:'ayat majmuk → isi → huraian → contoh',comp:['bukti','inferens','aplikasi beralasan']},
5:{read:7,task:'Kembangkan perenggan dengan penanda wacana dan contoh.',grammar:'pengembangan idea → penanda wacana',comp:['maklumat tersurat','inferens','penilaian']},
6:{read:8,task:'Nilai maklumat, bina respons koheren dan sunting bahasa.',grammar:'koheren → gaya → penyuntingan',comp:['bukti','inferens/tujuan','KBAT dan justifikasi']}
};
function cleanTitle(t){return String(t||'').replace(/[“”]/g,'').trim()}
function titleWords(t){return cleanTitle(t).toLowerCase().split(/\s+/).filter(w=>w.length>3 && !['yang','dan','dalam','kita','saya'].includes(w));}
function blueprint(y,i,u){
 y=Number(y); const s=yearSpec[y], theme=Math.floor(i/3), slot=i%3, lex=themeLex[theme];
 const title=cleanTitle(u.title), tw=titleWords(title), key=tw[0]||lex[slot];
 const vocab=[...new Set([key,lex[slot],lex[(slot+3)%10],lex[(i+5)%10],...lex])].slice(0,Math.min(10,5+y));
 const scene=[`di sekolah ketika mempelajari ${title}`,`di rumah dalam situasi berkaitan ${key}`,`dalam komuniti apabila berhadapan dengan ${lex[(slot+4)%10]}`];
 const readings=scene.map((sc,n)=>{
   const core=`Murid ${unitMoves[n]} ${key} ${sc}. Mereka mengaitkannya dengan ${lex[(slot+n+1)%10]} dan ${lex[(slot+n+2)%10]}.`;
   if(y<=2)return `${title}. ${core} Tindakan itu perlu ${lex[(slot+8)%10]}.`;
   if(y<=4)return `${title} memberi peluang kepada murid memahami ${key}. ${core} Mereka menerangkan sebab tindakan itu sesuai dan memberikan contoh yang berkaitan.`;
   return `${title} memerlukan murid meneliti ${key} daripada lebih daripada satu sudut. ${core} Mereka membandingkan pilihan, mempertimbangkan sebab dan kesan, kemudian membuat keputusan yang boleh dipertahankan dengan bukti.`;
 });
 const questions=readings.flatMap((_,n)=>[
   {level:'literal',q:`Petikan ${n+1}: Apakah maklumat penting tentang ${key}?`,expect:s.comp[0]},
   {level:'inference',q:`Petikan ${n+1}: Mengapakah tindakan itu sesuai dengan konteks?`,expect:s.comp[1]},
   {level:'application',q:`Petikan ${n+1}: Gunakan idea ${title} dalam situasi lain dan jelaskan pilihan kamu.`,expect:s.comp[2],independent:true}
 ]);
 const grammar=[
   {stage:'notice',prompt:`Kenal pasti contoh ${s.grammar} dalam bahan ${title}.`},
   {stage:'repair',prompt:`Baiki satu ayat tentang ${key} supaya maksudnya tepat dan jelas.`},
   {stage:'produce',prompt:`Bina contoh sendiri menggunakan ${s.grammar} tanpa menyalin model.`,independent:true}
 ];
 const writing={guided:s.task,transfer:`Tulis respons baharu tentang ${title} dalam konteks yang tidak digunakan dalam petikan.`,mastery:`Tanpa hint atau model, tunjukkan kemahiran ${u.focus} melalui respons asli tentang ${title}.`,checklist:y<=2?['bermakna','berkaitan','huruf besar/tanda baca']:['menepati tugasan','idea relevan','bahasa jelas','contoh/bukti sesuai','semak semula']};
 return {version:V,year:y,unitId:u.id,title,theme:theme+1,focus:u.focus,vocab,readings,questions,grammar,writing,masteryPolicy:{guidedIsMastery:false,transferRequired:true,independentRequired:true,noHint:true}};
}
function audit(){
 const C=window.BAHASA_CURRICULUM, failures=[], titles=new Set(), passages=new Set(); let units=0,questions=0,vocab=0;
 for(let y=1;y<=6;y++){
  const us=C.getYear(y); if(us.length!==24)failures.push(`Y${y}:unit-count-${us.length}`);
  us.forEach((u,i)=>{units++; const b=blueprint(y,i,u); const tk=`${y}:${b.title}`; if(titles.has(tk))failures.push(`${u.id}:duplicate-title`);titles.add(tk);
   if(b.vocab.length<Math.min(10,5+y))failures.push(`${u.id}:vocab-short`); vocab+=b.vocab.length;
   if(b.readings.length!==3)failures.push(`${u.id}:reading-count`); b.readings.forEach(p=>{if(passages.has(p))failures.push(`${u.id}:duplicate-passage`);passages.add(p)});
   if(b.questions.length!==9)failures.push(`${u.id}:question-count`); questions+=b.questions.length;
   if(!b.masteryPolicy.independentRequired||!b.masteryPolicy.noHint)failures.push(`${u.id}:mastery-policy`);
  });
 }
 return {version:V,units,uniqueUnitTitles:titles.size,uniquePassages:passages.size,questions,vocabItems:vocab,failures};
}
window.BAHASA_CONTENT_V70={version:V,blueprint,audit,yearSpec,principle:'Unit-specific content → comprehension ladder → language production → transfer → no-hint independent mastery'};
})();

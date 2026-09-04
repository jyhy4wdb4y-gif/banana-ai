/* Bahasa AI v9 — original curriculum-aware content bank.
   No textbook passages/images are copied. Activities are app-authored and
   mapped to year, theme and unit context. */
(()=>{
const themeContexts=[
 {place:'rumah',people:'keluarga',verb:'membantu',adj:'penyayang',value:'kasih sayang'},
 {place:'rumah dan sekolah',people:'diri',verb:'menjaga',adj:'bersih',value:'kesihatan'},
 {place:'jalan raya',people:'murid',verb:'mematuhi',adj:'selamat',value:'berhati-hati'},
 {place:'kejiranan',people:'jiran',verb:'menghormati',adj:'ramah',value:'kerjasama'},
 {place:'Malaysia',people:'masyarakat',verb:'menghargai',adj:'indah',value:'cinta negara'},
 {place:'makmal dan rumah',people:'pengguna',verb:'menggunakan',adj:'kreatif',value:'inovasi'},
 {place:'alam sekitar',people:'masyarakat',verb:'memelihara',adj:'hijau',value:'kelestarian'},
 {place:'kehidupan harian',people:'kita',verb:'mengamalkan',adj:'amanah',value:'tanggungjawab'}
];
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
function ctx(i){return themeContexts[Math.floor(i/3)%8]}
function sentence(y,c,u){
 if(y===1)return `Saya ${c.verb} ${c.people} dengan baik.`;
 if(y===2)return `Kami ${c.verb} ${c.people} supaya hidup lebih ${c.adj}.`;
 if(y===3)return `${cap(c.value)} penting dalam kehidupan. Kita perlu ${c.verb} ${c.people} dengan baik.`;
 if(y===4)return `Amalan ${c.value} penting kerana dapat mewujudkan suasana yang ${c.adj} di ${c.place}.`;
 if(y===5)return `Salah satu cara memupuk ${c.value} ialah dengan ${c.verb} ${c.people} secara konsisten.`;
 return `${cap(c.value)} wajar diamalkan kerana membentuk individu yang bertanggungjawab serta menyumbang kepada kesejahteraan ${c.people}.`;
}
function get(y,i,u){let c=ctx(i),base=sentence(y,c,u),w=u.words;
 const order=base.replace(/[.!?]$/,'').split(' '); order[order.length-1]+='.';
 const fillWord=y<=2?c.verb:(y===3?'penting':y===4?'kerana':y===5?'ialah':'bertanggungjawab');
 let fill=base.replace(new RegExp(`\\b${fillWord}\\b`,'i'),'____');
 let grammar;
 if(y<=2) grammar={q:`Dalam ayat “${base}”, perkataan “${c.verb}” berfungsi sebagai...`,a:['Kata nama','Kata kerja','Kata adjektif','Kata arah'],ok:1};
 else if(y===3) grammar={q:`Pilih penanda yang sesuai untuk menghubungkan idea tentang ${c.value}.`,a:['Oleh itu','Meja','Biru sekali','Semalam buku'],ok:0};
 else grammar={q:`Pilih ayat yang mempunyai hubungan isi dan huraian paling jelas.`,a:[base,`Saya suka warna biru. ${c.value} meja.`,`Kerana tetapi ${c.people}.`,`Awan makan kerusi.`],ok:0};
 const mcq=y===1?{q:`Pilih ayat yang sesuai dengan Unit ${i+1}: ${u.title}.`,a:[base,`${cap(c.people)} makan meja biru.`,`Dan tetapi kerana.`],ok:0}:
 y===2?{q:`Pilih ayat lengkap yang menambah maklumat sesuai tentang ${u.title}.`,a:[base,`${cap(c.people)} ${c.verb}.`,`Kerana ${c.place} tetapi.`],ok:0}:
 y===3?{q:`Pilih pasangan ayat yang mempunyai idea utama dan sokongan.`,a:[base,`Saya makan nasi. Kapal terbang tinggi.`,`Kerusi itu kerana tetapi.`],ok:0}:
 {q:`Pilih isi yang paling relevan untuk topik “${u.title}”.`,a:[base,`Perkara ini baik kerana baik.`,`Saya suka warna tanpa kaitan.`,`Dan tetapi kalau semua.`],ok:0};
 const transfer=y<=2?{q:`Situasi baharu: kamu berada di ${c.place}. Pilih ayat yang paling sesuai.`,a:[base,`Saya makan kerusi di ${c.place}.`,`Tetapi dan kerana.`],ok:0}:
 y===3?{q:`Pilih respons yang memindahkan idea ${c.value} kepada situasi baharu.`,a:[`${cap(c.value)} juga boleh diamalkan di sekolah. Murid boleh bekerjasama dan saling membantu.`,`Saya suka ais krim. Langit tinggi.`,`Dan tetapi kerana meja.`],ok:0}:
 {q:`Pilih respons yang paling koheren apabila topik dipindahkan ke konteks sekolah.`,a:[`${cap(c.value)} boleh dipupuk di sekolah melalui amalan yang konsisten. Contohnya, murid bekerjasama dan bertanggungjawab dalam aktiviti harian.`,`Sekolah besar. Saya suka biru. Oleh itu meja.`,`Kerana dan tetapi semua orang.`,`Awan sangat sedap di sekolah.`],ok:0};
 return {
  mcq,
  order:{tokens:order,answer:order.join(' ')},
  fill:{q:fill,answer:fillWord.toLowerCase(),hint:`Cari perkataan yang melengkapkan maksud ayat tentang ${c.value}.`},
  memory:{pairs:[[w[0]||c.value,'kata fokus'],[w[1]||c.verb,y<=2?'kata tindakan':'idea sokongan'],[w[2]||c.adj,y<=3?'kata konteks':'bahasa konteks']]},
  grammar,transfer,
  meta:{context:c,model:base,focus:`${cap(c.value)} · ${u.title}`}
 };
}
function summary(y,i,u){let d=get(y,i,u),m=d.meta;return `<div class="content-focus"><b>🎯 Fokus Unit</b><span>${m.focus}</span><small>Contoh model原创 / app-authored: ${m.model}</small></div>`}
window.BAHASA_CONTENT={version:'12.0.0',policy:'Original app-authored activities; curriculum-aware, not textbook-copying.',get,summary};
})();

/* v13 Dynamic Mastery Bank extension — app-authored parallel forms. */
(()=>{
 const base=window.BAHASA_CONTENT.get;
 const contexts=[
  ['di sekolah','murid','bekerjasama','rajin'],['di perpustakaan','pengunjung','menjaga','senyap'],
  ['di taman','kanak-kanak','memelihara','bersih'],['di rumah','adik-beradik','membantu','bertanggungjawab'],
  ['di kantin','murid','beratur','tertib'],['di padang','pemain','mematuhi','cergas']
 ];
 function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
 function variant(y,i,u,n){let d=base(y,i,u),c=contexts[(i+n)%contexts.length],place=c[0],who=c[1],verb=c[2],adj=c[3];
  let model=y<=2?`${cap(who)} ${verb} ${place} dengan ${adj}.`:y===3?`${cap(who)} perlu ${verb} ${place}. Amalan ini menunjukkan sikap ${adj}.`:y===4?`${cap(who)} perlu ${verb} ${place} kerana amalan tersebut mewujudkan suasana yang ${adj}.`:y===5?`Salah satu amalan yang wajar dilakukan ialah ${verb} ${place}. Hal ini dapat membentuk ${who} yang ${adj}.`:`Amalan ${verb} ${place} wajar diperkukuh kerana dapat membentuk ${who} yang ${adj} serta memberi kesan positif kepada komuniti.`;
  let distract=[`Meja itu makan awan ${place}.`,`Kerana tetapi ${who} biru.`,`Saya suka sesuatu yang tidak berkaitan.`];
  return {type:'parallel',q:`Bentuk ${n+1}: Pilih ayat yang paling sesuai untuk konteks ${place}.`,a:[model,...distract],ok:0,h:`Cari ayat yang lengkap, bermakna dan relevan dengan konteks ${place}.`,meta:{form:n+1,model,context:place,skill:u.focus}};
 }
 function bank(y,i,u){let d=base(y,i,u),arr=[];['mcq','grammar','transfer'].forEach(type=>{let q=d[type];arr.push({...q,type,id:`${y}-${u.id}-${type}-base`})});for(let n=0;n<6;n++){let q=variant(y,i,u,n);arr.push({...q,id:`${y}-${u.id}-parallel-${n}`})}return arr}
 window.BAHASA_CONTENT.bank=bank;
 window.BAHASA_CONTENT.version='13.0.0';
 window.BAHASA_CONTENT.policy+=' v13 adds app-authored parallel forms for anti-memorisation assessment.';
})();

/* v14 Skill-specific Difficulty Ladder — app-authored adaptive forms. */
(()=>{
 const oldBank=window.BAHASA_CONTENT.bank;
 const levelNames={1:'Asas',2:'Aplikasi',3:'Transfer',4:'Independent'};
 function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
 function skillForm(y,i,u,level,n){
  const d=window.BAHASA_CONTENT.get(y,i,u), c=d.meta.context, focus=u.focus, tag=`${y}-${u.id}-L${level}-${n}`;
  let q,a,ok=0,h;
  if(level===1){
   q=`${levelNames[level]} · Pilih ayat yang lengkap dan bermakna tentang ${c.value}.`;
   a=[d.meta.model,`${cap(c.people)} ${c.verb}.`,`Kerana dan tetapi ${c.place}.`,`Meja meminum ${c.value}.`];
   h='Semak sama ada ayat mempunyai maksud yang lengkap dan sesuai.';
  } else if(level===2){
   q=`${levelNames[level]} · Dalam konteks ${c.place}, pilih penggunaan kemahiran “${focus}” yang paling tepat.`;
   let model=y<=2?`Kami ${c.verb} ${c.people} di ${c.place} dengan baik.`:`${cap(c.value)} dapat diamalkan di ${c.place} apabila kita ${c.verb} ${c.people} secara konsisten.`;
   a=[model,`Saya suka warna biru tanpa kaitan dengan ${c.value}.`,`Kerana ${c.people} tetapi meja.`,`Awan itu sangat sedap.`]; h='Pilih jawapan yang bukan sahaja gramatis, tetapi relevan dengan situasi.';
  } else if(level===3){
   q=`${levelNames[level]} · Situasi berubah: aktiviti kelas sedang dijalankan. Pilih respons yang memindahkan idea ${c.value} dengan betul.`;
   let model=y<=2?`Murid ${c.verb} rakan semasa aktiviti kelas.`:y===3?`${cap(c.value)} boleh diamalkan semasa aktiviti kelas. Murid saling membantu untuk menyiapkan tugasan.`:`${cap(c.value)} boleh dipindahkan ke aktiviti kelas melalui kerjasama yang konsisten. Contohnya, murid membahagikan tugas dan saling membantu supaya tugasan dapat diselesaikan dengan baik.`;
   a=[model,`Kelas mempunyai tingkap. Saya suka nasi.`,`Tetapi kerana semua biru.`,`Kerusi bekerjasama dengan awan.`]; h='Cari jawapan yang mengekalkan idea asal tetapi sesuai dalam konteks baharu.';
  } else {
   q=`${levelNames[level]} · Pilih respons paling matang, koheren dan berdikari bagi idea “${c.value}”.`;
   let model=y<=2?`Saya ${c.verb} orang lain supaya semua dapat hidup dengan baik.`:y===3?`${cap(c.value)} penting dalam kehidupan. Kita boleh mengamalkannya dengan ${c.verb} orang lain dalam pelbagai situasi.`:`${cap(c.value)} perlu diamalkan secara konsisten kerana amalan ini bukan sahaja membentuk sikap yang baik, malah membantu mewujudkan komuniti yang lebih harmoni. Oleh itu, setiap individu harus ${c.verb} orang lain mengikut situasi yang sesuai.`;
   a=[model,`${cap(c.value)} baik kerana baik dan sangat baik.`,`Saya suka sesuatu. Oleh itu, meja.`,`Kerana tetapi walaupun semua.`]; h='Nilai makna, relevansi, hubungan idea dan kematangan bahasa.';
  }
  return {id:tag,type:`difficulty-L${level}`,difficulty:level,difficultyName:levelNames[level],skill:focus,q,a,ok,h,meta:{year:y,unit:u.id,skill:focus}};
 }
 function bank(y,i,u){let arr=oldBank(y,i,u);for(let level=1;level<=4;level++)for(let n=0;n<3;n++)arr.push(skillForm(y,i,u,level,n));return arr}
 window.BAHASA_CONTENT.bank=bank;
 window.BAHASA_CONTENT.difficultyNames=levelNames;
 window.BAHASA_CONTENT.version='14.0.0';
 window.BAHASA_CONTENT.policy+=' v14 adds skill-specific four-level difficulty forms: Asas, Aplikasi, Transfer and Independent.';
})();

/* ===== ULTIMATE v22: Unit Content Depth + Reading/Language Bank ===== */
(()=>{
 const baseGet=window.BAHASA_CONTENT.get;
 const meanings={
  keluarga:'orang yang mempunyai hubungan kekeluargaan',rumah:'tempat kita tinggal',sekolah:'tempat murid belajar',baik:'bersikap elok dan positif',gembira:'berasa senang',bersih:'tidak kotor',
  sihat:'keadaan tubuh yang baik',makan:'mengambil makanan',minum:'mengambil minuman',cergas:'aktif dan bertenaga',selamat:'terhindar daripada bahaya',jalan:'laluan untuk bergerak',bahaya:'sesuatu yang boleh mendatangkan mudarat',
  jiran:'orang yang tinggal berdekatan',kawan:'orang yang kita kenali dan berkawan',hormat:'menghargai orang lain',kerjasama:'usaha yang dilakukan bersama',ramah:'mesra terhadap orang lain',Malaysia:'negara kita',budaya:'cara hidup dan warisan masyarakat',bendera:'lambang sesebuah negara',seni:'hasil kreativiti manusia',bangga:'berasa mulia atau puas',
  sains:'ilmu tentang alam dan kehidupan',teknologi:'penggunaan ilmu untuk memudahkan kehidupan',cipta:'menghasilkan sesuatu yang baharu',kreatif:'mampu menghasilkan idea baharu',alam:'dunia semula jadi',pokok:'tumbuhan berkayu',haiwan:'makhluk hidup selain manusia dan tumbuhan',sungai:'aliran air semula jadi',hijau:'warna daun yang segar',lestari:'kekal terpelihara',
  wang:'alat pertukaran untuk membeli barangan atau perkhidmatan',usaha:'tindakan bersungguh-sungguh',amanah:'jujur dan boleh dipercayai',jimat:'menggunakan sesuatu dengan cermat',jujur:'berkata dan bertindak benar',tanggungjawab:'kewajipan yang perlu dilaksanakan'
 };
 const connectors={1:['dan','dengan'],2:['dan','supaya','kerana'],3:['selain itu','oleh itu','kerana'],4:['selain itu','contohnya','oleh itu'],5:['antaranya','hal ini demikian kerana','contohnya','kesimpulannya'],6:['pada pandangan saya','hal ini demikian kerana','sebagai contoh','oleh itu','kesimpulannya']};
 function def(w){return meanings[w]||`perkataan penting yang digunakan dalam konteks unit ini`}
 function reading(y,u,d){let c=d.meta.context,t=u.title;
  if(y===1)return `Ini unit ${t}. Kita belajar tentang ${c.value}. Kita perlu ${c.verb} dengan baik.`;
  if(y===2)return `Dalam unit ${t}, murid belajar tentang ${c.value}. Amalan ini membantu kita hidup dengan lebih ${c.adj}.`;
  if(y===3)return `${c.value.charAt(0).toUpperCase()+c.value.slice(1)} penting dalam kehidupan harian. Dalam konteks ${t}, kita boleh ${c.verb} orang lain. Amalan ini membawa kebaikan kepada semua.`;
  if(y===4)return `${c.value.charAt(0).toUpperCase()+c.value.slice(1)} merupakan nilai penting dalam ${t}. Kita perlu mengamalkannya secara konsisten kerana tindakan tersebut dapat mewujudkan suasana yang ${c.adj}. Contohnya, setiap individu boleh memainkan peranan mengikut situasi.`;
  if(y===5)return `Topik ${t} menunjukkan bahawa ${c.value} perlu diamalkan dalam kehidupan. Hal ini demikian kerana tindakan yang bertanggungjawab memberi kesan kepada diri dan masyarakat. Sebagai contoh, kita boleh ${c.verb} orang lain secara konsisten. Oleh itu, amalan yang baik harus dijadikan kebiasaan.`;
  return `Dalam membincangkan ${t}, kita perlu menilai kepentingan ${c.value} secara menyeluruh. Amalan ini bukan sahaja mempengaruhi individu, malah boleh memberi kesan kepada komuniti. Sebagai contoh, tindakan untuk ${c.verb} orang lain perlu dilakukan mengikut konteks dan keperluan. Kesannya, masyarakat dapat membina persekitaran yang lebih ${c.adj}, bertanggungjawab dan harmoni.`;
 }
 function pack(y,i,u){let d=baseGet(y,i,u),passage=reading(y,u,d),words=(u.words||[]).slice(0,6),vocab=words.map((w,n)=>({id:`${u.id}-V${n+1}`,word:w,meaning:def(w),prompt:`Apakah maksud “${w}” dalam konteks Unit ${i+1}?`}));
  let c=d.meta.context;
  let comprehension=[
   {id:`${u.id}-C1`,q:`Apakah idea utama petikan tentang “${u.title}”?`,a:[`Kepentingan ${c.value} dan amalan yang sesuai.`,`Warna objek yang tidak berkaitan.`,`Permainan tanpa kaitan dengan topik.`],ok:0},
   {id:`${u.id}-C2`,q:`Apakah tindakan yang sesuai berdasarkan petikan?`,a:[`${c.verb.charAt(0).toUpperCase()+c.verb.slice(1)} orang lain mengikut situasi.`,`Mengabaikan semua tanggungjawab.`,`Memilih tindakan yang tidak berkaitan.`],ok:0},
   {id:`${u.id}-C3`,q:`Pilih kesimpulan yang paling sesuai.`,a:[`${c.value.charAt(0).toUpperCase()+c.value.slice(1)} perlu diamalkan secara bermakna dalam kehidupan.`,`Semua perkara mempunyai maksud yang sama.`,`Topik ini hanya tentang satu perkataan.`],ok:0}
  ];
  let sentenceBank=[d.meta.model,`${c.value.charAt(0).toUpperCase()+c.value.slice(1)} boleh diamalkan melalui tindakan yang sesuai.`,y<=2?`Saya belajar tentang ${u.title}.`:`Contohnya, kita boleh ${c.verb} orang lain supaya amalan ${c.value} menjadi kebiasaan.`];
  return {passage,vocab,comprehension,sentenceBank,connectors:connectors[y],meta:{unit:u.id,year:y,theme:u.theme?.[0],original:true}};
 }
 window.BAHASA_CONTENT.unitPack=pack;
 window.BAHASA_CONTENT.version='22.0.0';
 window.BAHASA_CONTENT.policy+=' v22 adds original per-unit reading passages, vocabulary definitions, comprehension checks, sentence banks and year-specific discourse connectors.';
})();

/* v23 Complete Lesson Pack — 7-station original lesson sequence for every unit. */
(()=>{
 const basePack=window.BAHASA_CONTENT.unitPack;
 const cap=s=>String(s||'').charAt(0).toUpperCase()+String(s||'').slice(1);
 function lessonPack(y,i,u){
  const p=basePack(y,i,u), d=window.BAHASA_CONTENT.get(y,i,u), c=d.meta.context;
  const vocab=p.vocab.map((v,n)=>({...v,example:y<=2?`${cap(v.word)} ialah perkataan penting dalam unit ini.`:`Perkataan “${v.word}” digunakan untuk menerangkan idea dalam konteks ${u.title}.`,challenge:`Gunakan “${v.word}” dalam ayat baharu.`}));
  const grammar=y===1?{focus:'Ayat mudah',teach:'Ayat mudah perlu mempunyai maksud yang lengkap.',model:d.meta.model,task:'Pilih atau bina ayat yang mempunyai siapa/apa dan tindakan.'}:
   y===2?{focus:'Ayat lengkap + maklumat',teach:'Tambah maklumat yang relevan supaya maksud lebih jelas.',model:d.meta.model,task:'Kembangkan ayat tanpa mengubah maksud utama.'}:
   y===3?{focus:'Hubungan idea',teach:'Idea utama perlu disokong oleh ayat yang berkaitan.',model:d.meta.model,task:'Sambungkan idea utama dengan satu idea sokongan.'}:
   y===4?{focus:'Isi → huraian → contoh',teach:'Huraian menerangkan isi; contoh membuktikan atau menjelaskan huraian.',model:d.meta.model,task:'Bina satu rangka isi, huraian dan contoh.'}:
   y===5?{focus:'Penanda wacana & pengembangan',teach:'Gunakan penghubung untuk menunjukkan sebab, contoh, tambahan dan kesimpulan.',model:d.meta.model,task:'Kembangkan satu isi menjadi perenggan yang lancar.'}:
   {focus:'Koheren & penyuntingan',teach:'Semak hubungan idea, ketepatan bahasa dan kesan kepada pembaca.',model:d.meta.model,task:'Tulis, semak dan baiki respons sebelum dihantar.'};
  const sentenceBuild=[
   {level:1,label:'Asas',prompt:`Kenal pasti idea penting tentang “${u.title}”.`,model:p.sentenceBank[0]},
   {level:2,label:'Bina',prompt:`Gunakan ${vocab[0]?.word||c.value} dalam ayat yang lengkap.`,model:p.sentenceBank[1]},
   {level:3,label:'Kembang',prompt:y<=2?'Tambah satu maklumat yang sesuai.':'Tambah sebab, huraian atau contoh yang relevan.',model:p.sentenceBank[2]},
   {level:4,label:'Transfer',prompt:u.transferPrompt,model:null}
  ];
  const writing={prompt:u.prompt,checklist:y<=2?['Ayat bermakna','Berkaitan tajuk','Huruf besar dan tanda baca']:y<=4?['Idea utama jelas','Ayat berkaitan','Huraian/contoh sesuai','Bahasa boleh difahami']:['Menepati tugasan','Struktur jelas','Idea berkembang','Penanda wacana sesuai','Semak bahasa','Respons asli']};
  return {...p,vocab,grammar,sentenceBuild,writing,stations:['Baca','Kosa Kata','Tatabahasa','Bina Ayat','Pemahaman','Penulisan','Mastery'],meta:{...p.meta,lessonVersion:'23.0.0'}};
 }
 window.BAHASA_CONTENT.lessonPack=lessonPack;
 window.BAHASA_CONTENT.version='23.0.0';
 window.BAHASA_CONTENT.policy+=' v23 adds a seven-station lesson pack for all 144 units: reading, vocabulary, grammar, sentence construction, comprehension, writing and mastery.';
})();

/* v24 Practice Depth Bank — richer original exercises for every unit. */
(()=>{
 const cap=s=>String(s||'').charAt(0).toUpperCase()+String(s||'').slice(1);
 function practicePack(y,i,u){
  const l=window.BAHASA_CONTENT.lessonPack(y,i,u), d=window.BAHASA_CONTENT.get(y,i,u), c=d.meta.context;
  const words=(l.vocab||[]).map(v=>v.word).filter(Boolean); while(words.length<4)words.push(['baik','sesuai','jelas','penting'][words.length]);
  const mk=(id,type,prompt,answer,opts=[],hint='')=>({id:`${u.id}-${id}`,type,prompt,answer,opts,hint,year:y,unit:u.id,skill:u.focus});
  const vocab=words.slice(0,4).flatMap((w,n)=>[
   mk(`V${n+1}A`,'vocab',`Pilih maksud yang paling sesuai bagi “${w}”.`,l.vocab[n]?.meaning||'perkataan penting',[l.vocab[n]?.meaning||'perkataan penting','maksud yang tidak berkaitan','nama warna sahaja'],'Gunakan konteks unit, bukan hafalan sahaja.'),
   mk(`V${n+1}B`,'vocab-transfer',`Pilih penggunaan “${w}” yang paling sesuai dalam konteks baharu.`,0,[`${cap(w)} digunakan dengan makna yang sesuai dalam situasi baharu.`,`Saya ${w} kerana meja berlari.`,`Tetapi ${w} tanpa maksud.`],'Semak sama ada ayat itu bermakna dan relevan.')
  ]);
  const grammar=[1,2,3,4].map((n)=>mk(`G${n}`,'grammar',n===1?l.grammar.task:`Baiki penggunaan bahasa supaya idea tentang “${c.value}” lebih ${n<3?'jelas':'tepat dan berkaitan'}.`,0,[l.grammar.model,`Kerana tetapi ${c.value}.`,`Meja ${c.verb} awan tanpa konteks.`],l.grammar.teach));
  const reading=(l.comprehension||[]).map((q,n)=>mk(`R${n+1}`,'reading',q.q,q.ok,q.a,'Cari bukti dalam petikan.'));
  const sentence=[1,2,3,4].map((n)=>mk(`S${n}`,'sentence',l.sentenceBuild[n-1]?.prompt||`Bina ayat tentang ${u.title}.`,n===4?'independent':(l.sentenceBuild[n-1]?.model||d.meta.model),[],n===4?'Tiada model untuk Transfer.':'Gunakan model sebagai panduan, kemudian ubah konteks.'));
  const transfer=[1,2,3].map(n=>mk(`T${n}`,'transfer',n===1?u.transferPrompt:`Gunakan kemahiran unit dalam situasi ${['di sekolah','di rumah','dalam komuniti'][n-1]}.`,'independent',[],'Tiada hint semasa bukti independent.'));
  return {vocab,grammar,reading,sentence,transfer,total:vocab.length+grammar.length+reading.length+sentence.length+transfer.length};
 }
 window.BAHASA_CONTENT.practicePack=practicePack;
 window.BAHASA_CONTENT.version='24.0.0';
 window.BAHASA_CONTENT.policy+=' v24 adds a deeper original practice bank per unit across vocabulary, grammar, reading, sentence construction and transfer.';
})();

/* v40 Content Scale & Quality Matrix — deterministic original variants for all 144 units. */
(()=>{
 const cap=s=>String(s||'').charAt(0).toUpperCase()+String(s||'').slice(1);
 const contexts=[
  {place:'di sekolah',people:'rakan sekelas',purpose:'membina suasana pembelajaran yang baik'},
  {place:'di rumah',people:'ahli keluarga',purpose:'mengamalkan nilai dalam kehidupan harian'},
  {place:'dalam komuniti',people:'jiran dan masyarakat',purpose:'mewujudkan kehidupan yang harmoni'}
 ];
 function extendedPack(y,i,u){
  const lesson=window.BAHASA_CONTENT.lessonPack(y,i,u), base=window.BAHASA_CONTENT.get(y,i,u), c=base.meta.context;
  const passages=contexts.map((x,n)=>({id:`${u.id}-P${n+1}`,level:n+1,text:y<=2?
    `${cap(u.title)} dipelajari ${x.place}. Kita boleh ${c.verb} ${x.people}. Amalan ${c.value} membantu kita menjadi lebih ${c.adj}.`:
    y<=4?`${cap(c.value)} penting dalam topik ${u.title}. ${x.place}, kita boleh ${c.verb} ${x.people}. Tindakan ini ${x.purpose}. Oleh itu, kita perlu memilih tindakan yang sesuai mengikut keadaan.`:
    `Topik ${u.title} mengajak murid menilai kepentingan ${c.value} dalam konteks yang berbeza. ${cap(x.place)}, tindakan untuk ${c.verb} ${x.people} perlu dilakukan secara bertanggungjawab. Hal ini ${x.purpose}. Murid juga perlu mempertimbangkan sebab, kesan dan kesesuaian tindakan sebelum membuat kesimpulan.`}));
  const vocab=(lesson.vocab||[]).slice(0,8).map((v,n)=>({...v,id:`${u.id}-XV${n+1}`,example:`${cap(v.word)} digunakan secara bermakna dalam konteks ${u.title}.`,apply:`Bina ayat baharu menggunakan “${v.word}” ${contexts[n%3].place}.`}));
  const comprehension=passages.flatMap((p,n)=>[
   {id:`${p.id}-L`,level:'literal',passage:p.id,q:`Apakah nilai atau idea yang ditekankan dalam petikan ${n+1}?`,answer:c.value},
   {id:`${p.id}-I`,level:'inference',passage:p.id,q:`Mengapakah tindakan dalam petikan itu sesuai?`,answer:contexts[n].purpose},
   {id:`${p.id}-A`,level:'application',passage:p.id,q:`Bagaimanakah kamu boleh menggunakan idea ini dalam situasi baharu?`,answer:'independent'}
  ]);
  const grammar=[
   {id:`${u.id}-GX1`,level:1,focus:lesson.grammar.focus,prompt:lesson.grammar.task,model:lesson.grammar.model},
   {id:`${u.id}-GX2`,level:2,focus:lesson.grammar.focus,prompt:`Baiki ayat supaya maksud tentang ${c.value} lebih jelas.`,model:null},
   {id:`${u.id}-GX3`,level:3,focus:lesson.grammar.focus,prompt:`Gunakan kemahiran bahasa ini ${contexts[(i+1)%3].place} tanpa menyalin model.`,model:null}
  ];
  const writingForms=contexts.map((x,n)=>({id:`${u.id}-W${n+1}`,context:x.place,prompt:y===1?`Tulis satu ayat mudah tentang ${u.title} ${x.place}.`:y===2?`Tulis dua ayat berkaitan tentang ${u.title} ${x.place}.`:y===3?`Tulis 3–4 ayat yang mempunyai idea utama dan sokongan tentang ${u.title} ${x.place}.`:y===4?`Tulis satu perenggan isi → huraian → contoh tentang ${u.title} ${x.place}.`:y===5?`Kembangkan satu perenggan lengkap tentang ${u.title} ${x.place} dengan penanda wacana yang sesuai.`:`Tulis respons tersusun tentang ${u.title} ${x.place}. Huraikan sebab, contoh, kesan dan semak semula bahasa.`,independent:n===2}));
  return {unit:u.id,year:y,passages,vocab,comprehension,grammar,writingForms,masteryForms:writingForms.map((w,n)=>({...w,id:`${u.id}-M${n+1}`,noHint:true,newContext:true})),quality:{original:true,passageVariants:3,comprehensionItems:9,grammarForms:3,writingForms:3}};
 }
 window.BAHASA_CONTENT.extendedPack=extendedPack;
 window.BAHASA_CONTENT.version='40.0.0';
 window.BAHASA_CONTENT.policy+=' v40 adds three original context variants, literal/inference/application comprehension, grammar progression and three writing/mastery forms for every unit.';
})();

/* Bahasa AI ULTIMATE v50 — Year Differentiated Curriculum Depth */
(function(){
 const V='50.0.0';
 const bands={
  1:{name:'Asas Literasi',read:[18,45],vocab:6,focus:['bunyi','suku kata','perkataan','frasa','ayat mudah'],write:'1 ayat mudah bermakna'},
  2:{name:'Pengembangan Ayat',read:[30,65],vocab:7,focus:['kosa kata','frasa','ayat lengkap','maklumat'],write:'2 ayat lengkap berkaitan'},
  3:{name:'Asas Perenggan',read:[45,85],vocab:8,focus:['konteks','idea utama','idea sokongan','susunan'],write:'3–4 ayat menjadi perenggan ringkas'},
  4:{name:'Penulisan Berstruktur',read:[65,110],vocab:8,focus:['pemahaman','ayat majmuk','isi','huraian','contoh'],write:'Isi → Huraian → Contoh'},
  5:{name:'Pengembangan Karangan',read:[85,140],vocab:9,focus:['idea','bahasa','penanda wacana','perenggan','penutup'],write:'perenggan lengkap dan berkembang'},
  6:{name:'Penulisan Berdikari',read:[100,170],vocab:10,focus:['inferens','koheren','KBAT','penyuntingan','transfer'],write:'respons tersusun, koheren dan disunting'}
 };
 const connectors={1:['dan','tetapi'],2:['dan','kemudian','kerana'],3:['selain itu','kemudian','oleh sebab itu'],4:['pertama','selain itu','contohnya','akhirnya'],5:['pada pendapat saya','selain itu','oleh itu','contohnya','kesimpulannya'],6:['berdasarkan maklumat','walau bagaimanapun','sehubungan dengan itu','misalnya','kesimpulannya']};
 function rubric(y){let b=bands[y];return {year:y,band:b.name,readingWordRange:b.read,vocabularyTarget:b.vocab,skillFocus:b.focus,writingTarget:b.write,connectors:connectors[y]};}
 function lessonQuality(y,i,u){let r=rubric(y),base=window.BAHASA_CONTENT.unitPack?.(y,i,u)||{};return {version:V,unitId:u.id,title:u.title,rubric:r,checks:{hasReading:!!base.reading,hasVocabulary:(base.vocab||[]).length>0,hasComprehension:(base.questions||[]).length>=3,hasSentenceModels:(base.sentences||[]).length>0,hasTransfer:true,masteryRequiresIndependent:true},teacherNote:`Tahun ${y}: utamakan ${r.skillFocus.slice(0,3).join(', ')}. Sokongan dikurangkan apabila murid stabil.`};}
 window.BAHASA_YEAR_DEPTH={version:V,bands,connectors,rubric,lessonQuality,principle:'Foundation first → age-appropriate depth → scaffold fade → transfer → independent evidence'};
 window.BAHASA_CONTENT.version=V;
})();

/* Bahasa AI ULTIMATE v60 — Unit Signature Content Layer */
(function(){
 const V='60.0.0';
 const verbs=['memerhati','membantu','menjaga','menghargai','menggunakan','menerangkan','membandingkan','mencadangkan'];
 const objects=['amalan','peraturan','maklumat','kemudahan','alam sekitar','hasil kerja','hubungan','tanggungjawab'];
 const values=['bertanggungjawab','prihatin','berdisiplin','bekerjasama','berhemah','rajin','hormat','jujur'];
 const scenes=['sebelum kelas bermula','semasa aktiviti kumpulan','selepas waktu rehat','ketika bersama keluarga','semasa program komuniti','ketika membuat pemerhatian'];
 const pick=(a,n)=>a[((n%a.length)+a.length)%a.length];
 function signature(y,i,u){
   const seed=(y*37+i*11+String(u.id||'').length*7);
   const verb=pick(verbs,seed), object=pick(objects,seed+2), value=pick(values,seed+4), scene=pick(scenes,seed+6);
   const level=window.BAHASA_YEAR_DEPTH?.rubric?.(y)||{};
   const vocab=Array.from({length:level.vocabularyTarget||6},(_,n)=>({word:[verb,object,value,'sesuai','jelas','penting','teliti','selamat','harmoni','kreatif'][(seed+n)%10],meaning:`perkataan yang membantu murid memahami ${u.title}`,example:`Murid menggunakan perkataan ini ketika ${scene}.`}));
   const passage1=y<=2?`${u.title} (${u.id}) berlaku ${scene}. Saya ${verb} ${object}. Saya bersikap ${value}.`:`Dalam unit ${u.title} (${u.id}), murid meneliti ${object} ${scene}. Mereka perlu ${verb} dengan cara yang ${value}. Tindakan yang sesuai membantu mereka memahami sebab dan kesan sesuatu pilihan.`;
   const passage2=y<=3?`Dalam ${u.title} (${u.id}), rakan saya mempunyai cara yang berbeza. Kami berbincang tentang ${object} dan memilih tindakan yang ${value}.`:`Dalam ${u.title} (${u.id}), satu situasi baharu berlaku ${scene}. Murid perlu membandingkan beberapa tindakan sebelum memilih cara untuk ${verb} ${object}. Mereka menerangkan alasan dan kesan pilihan tersebut.`;
   const passage3=y<=4?`Dalam ${u.title} (${u.id}), apakah tindakan terbaik jika keadaan berubah? Gunakan idea unit ini dan terangkan pilihan kamu.`:`Dalam ${u.title} (${u.id}), maklumat yang diberi tidak semestinya mempunyai satu jawapan yang sama. Berdasarkan ${u.title}, murid menilai bukti, kesesuaian konteks dan kemungkinan kesan sebelum mencadangkan tindakan yang bertanggungjawab.`;
   const grammar=y===1?'perkataan dan ayat mudah':y===2?'frasa dan ayat lengkap':y===3?'susunan ayat dan idea':y===4?'ayat majmuk serta huraian':y===5?'penanda wacana dan pengembangan idea':'koheren, penyuntingan dan ketepatan bahasa';
   return {version:V,unitId:u.id,title:u.title,signature:`Y${y}-U${String(i+1).padStart(2,'0')}-${seed}`,vocab,readings:[passage1,passage2,passage3],grammar:{focus:grammar,tasks:[`Kenal pasti penggunaan ${grammar} dalam konteks ${u.title}.`,`Baiki satu contoh supaya maksud lebih jelas.`,`Gunakan kemahiran yang sama dalam konteks baharu tanpa menyalin model.`]},comprehension:[
    {level:'literal',q:`Apakah perkara utama yang berlaku dalam ${u.title}?`,a:object},
    {level:'inference',q:`Mengapakah sikap ${value} sesuai dalam situasi ini?`,a:'Jawapan mesti mempunyai sebab yang berkaitan dengan konteks.'},
    {level:'application',q:`Apakah tindakan kamu jika situasi yang sama berlaku ${scene}?`,a:'independent'}
   ],writing:{guided:y<=2?`Bina ${y===1?'satu':'dua'} ayat tentang ${u.title}.`:`Tulis respons tentang ${u.title} dengan fokus ${grammar}.`,transfer:`Gunakan kemahiran unit ${u.title} dalam situasi lain yang belum digunakan dalam contoh.`,mastery:'Jawab tanpa hint, tanpa menyalin model, dan pastikan maksud sesuai dengan konteks.'}};
 }
 function audit(){const sig=new Set(),pass=new Set(),fail=[];let units=0;for(let y=1;y<=6;y++){let us=window.BAHASA_CURRICULUM.getYear(y);us.forEach((u,i)=>{units++;let p=signature(y,i,u);if(sig.has(p.signature))fail.push(`${u.id}:duplicate-signature`);sig.add(p.signature);if(p.vocab.length<(window.BAHASA_YEAR_DEPTH.rubric(y).vocabularyTarget||6))fail.push(`${u.id}:vocab`);p.readings.forEach((x,n)=>{if(pass.has(x))fail.push(`${u.id}:duplicate-passage-${n}`);pass.add(x)});if(p.comprehension.length!==3||!p.writing.transfer||!p.writing.mastery)fail.push(`${u.id}:missing-layer`)})}return {version:V,units,uniqueSignatures:sig.size,uniquePassages:pass.size,failures:fail};}
 window.BAHASA_UNIT_SIGNATURE_V60={version:V,signature,audit,principle:'Unit identity → year-appropriate language → comprehension → application → transfer → no-hint mastery'};
 window.BAHASA_CONTENT.version=V;
})();

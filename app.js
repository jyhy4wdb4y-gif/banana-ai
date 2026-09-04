const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const KEY='bahasaAIUltimateV20';
const OLD_KEYS=['bahasaAIv10','bahasaAIv9'];
const DEFAULT={year:1,stream:'SJKC',xp:120,streak:5,school:18,view:'home',skill:0,unit:0,avatar:'🐱',evidence:{},unitDone:{},drafts:{},missionDone:{},mistakes:[],reviewQueue:[],assessment:{}};
let migrated=JSON.parse(localStorage.getItem(KEY)||OLD_KEYS.map(k=>localStorage.getItem(k)).find(Boolean)||'{}');
let state={...DEFAULT,...migrated}; state.mistakes=state.mistakes||[]; state.reviewQueue=state.reviewQueue||[]; state.assessment=state.assessment||{};
let save=()=>localStorage.setItem(KEY,JSON.stringify(state)); const Y=()=>BAHASA_CURRICULUM.years[state.year],skills=()=>Y().skills,units=()=>Y().units,sk=(i=state.skill)=>skills()[i],un=(i=state.unit)=>units()[i];
const key=(s=sk())=>`${state.year}:${s[0]}`,score=k=>state.evidence[k]?.mastery||0,ind=k=>state.evidence[k]?.independent||0;
function mastery(){let a=skills().map(s=>score(`${state.year}:${s[0]}`));return Math.round(a.reduce((x,y)=>x+y,0)/a.length)}
function unlocked(s){return s[3].every(id=>score(`${state.year}:${id}`)>=60)}
function status(s){let v=score(`${state.year}:${s[0]}`);return v>=80?'mastered':v>=40?'learning':unlocked(s)?'ready':'locked'}
function weak(){return skills().filter(s=>unlocked(s)&&score(`${state.year}:${s[0]}`)<60).sort((a,b)=>score(`${state.year}:${a[0]}`)-score(`${state.year}:${b[0]}`))}
function next(){return skills().find(s=>unlocked(s)&&score(`${state.year}:${s[0]}`)<80)||skills()[skills().length-1]}
function mission(){let w=weak()[0],n=next(),r=skills().find(s=>score(`${state.year}:${s[0]}`)>=60&&score(`${state.year}:${s[0]}`)<90);return [r&&['Ulang Kaji','🔁',r],w&&['Pemulihan','🧠',w],['Belajar','📘',n],['Cuba Sendiri','⭐',n]].filter(Boolean).slice(0,4)}
function nav(){return `<nav>${[['home','🏠','Utama'],['curriculum','🗺️','Kurikulum'],['learn','📚','Belajar'],['practice','🎮','Latihan'],['writing','📝','Karangan'],['review','🔁','Ulang Kaji'],['progress','📊','Kemajuan'],['profile','👤','Profil']].map(x=>`<button data-view="${x[0]}" class="${state.view===x[0]?'active':''}">${x[1]} ${x[2]}</button>`).join('')}<div class="student">${state.avatar} T${state.year} · ⭐ ${state.xp}</div></nav>`}
function shell(c){return `<header class="hero"><div class="aira">👩🏻‍🏫</div><div class="brand"><div class="logo">Bahasa <span>AI</span></div><b>Belajar Bahasa Melayu<br>Dari Tahun 1 Hingga Tahun 6</b></div><div class="hero-badges"><span>✅ Tahun 1–6</span><span>✅ Curriculum-aware</span><span>✅ Adaptive Mastery</span><span>✅ Original learning content</span></div><div class="school">🇲🇾 🏫<small>Belajar · Main · Kuasai</small></div></header>${nav()}<main>${c}</main><footer><b>Bahasa AI ULTIMATE v20.0</b><span>📚 School Progress</span><span>🧠 Independent Mastery</span><span>📱 iPad / iPhone / Web</span></footer>`}
const card=(t,b,c='')=>`<article class="card ${c}"><h3>${t}</h3>${b}</article>`,bar=(n,v)=>`<div class="skill"><label><span>${n}</span><b>${v}%</b></label><div><i style="width:${v}%"></i></div></div>`;
function yearPicker(){return `<div class="year-grid">${[1,2,3,4,5,6].map(n=>`<button class="year y${n} ${n===state.year?'sel':''}" data-year="${n}">Tahun ${n}</button>`).join('')}</div><label class="select-label">Aliran <select id="stream">${BAHASA_CURRICULUM.streams.map(s=>`<option ${s===state.stream?'selected':''}>${s}</option>`).join('')}</select></label>`}
function skillList(){return `<div class="topic-list">${skills().map((s,i)=>{let st=status(s);return `<button data-skill="${i}" ${st==='locked'?'disabled':''} class="${st}"><span>${s[2]}</span><b>${s[1]}<small>${st==='mastered'?'Dikuasai ✓':st==='locked'?'Terkunci':score(`${state.year}:${s[0]}`)+'%'}</small></b><i>${st==='locked'?'🔒':'›'}</i></button>`}).join('')}</div>`}
function home(){let m=mission();return shell(`<section class="page"><div class="welcome-strip"><div><small>SELAMAT DATANG</small><h1>Hai Adik! Jom belajar bersama Cikgu Aira ✨</h1><p>Tahun ${state.year} · ${Y().stage} · ${Y().goal}</p></div><button class="pink" data-view="curriculum">Teruskan Pembelajaran →</button></div><div class="dashboard-grid">${card('1. Cikgu Aira',`<div class="teacher-big">👩🏻‍🏫</div><div class="bubble">Cikgu akan ikut kemahiran yang kamu sudah kuasai dan bantu bahagian yang masih lemah.</div><button class="pink" data-view="learn">Jom Belajar</button>`)}${card('2. Pilih Tahun',yearPicker()+`<div class="note">🎓 ${Y().stage}</div>`)}${card('3. Dashboard Murid',`<div class="profile-row"><b>${state.avatar} Adik</b><strong>⭐ ${state.xp}</strong></div>${bar('School Progress',state.school)}${bar('My Mastery',mastery())}<div class="stats"><span><b>${skills().filter(s=>status(s)==='mastered').length}</b> Skill ✓</span><span><b>${Object.keys(state.unitDone).filter(k=>k.startsWith(state.year+':')).length}</b> Unit</span><span><b>${state.streak}</b> Hari 🔥</span></div>`)}${card('4. Skill Graph',skillList())}${card('5. Misi Hari Ini',m.map((x,i)=>`<div class="mission-step"><b>${i+1}</b><span>${x[1]} ${x[0]}<small>${x[2][1]}</small></span></div>`).join('')+`<button class="green" id="startMission">Mula Misi</button>`)}${card('6. Laluan Kurikulum',`<div class="big-number">${units().length}</div><p>unit pembelajaran asli untuk Tahun ${state.year}, disusun mengikut tema dan progression skill.</p><button class="soft wide" data-view="curriculum">Lihat Semua Unit →</button>`)}</div></section>`)}
function curriculum(){let grouped={};units().forEach((u,i)=>(grouped[u.theme[0]]??=[]).push([u,i]));return shell(`<section class="page narrow"><div class="center-title"><small>CURRICULUM MAP · ${state.stream}</small><h1>🗺️ Tahun ${state.year} · ${Y().stage}</h1><p>${Y().goal}</p></div><div class="source-note">📌 ${BAHASA_CURRICULUM.sourcePolicy}<br><b>Current curriculum label:</b> ${state.year<=3?BAHASA_CURRICULUM.curriculumVersions.tahap1:BAHASA_CURRICULUM.curriculumVersions.tahap2}</div><div class="theme-grid">${Object.entries(grouped).map(([t,arr],ti)=>card(`${arr[0][0].theme[1]} Tema ${ti+1} · ${t}`,arr.map(([u,i])=>`<button class="unit-row ${state.unitDone[`${state.year}:${u.id}`]?'done':''}" data-unit="${i}"><span>${i+1}</span><b>${u.title}<small>${skills().find(s=>s[0]===u.focus)?.[1]||'Bahasa'}</small></b><i>${state.unitDone[`${state.year}:${u.id}`]?'✓':'›'}</i></button>`).join(''))).join('')}</div></section>`)}
function learn(){let u=un(),s=skills().find(x=>x[0]===u.focus)||sk();state.skill=skills().indexOf(s);let st=status(s);return shell(`<section class="page narrow"><div class="crumb">Tahun ${state.year} › ${u.theme[0]} › Unit ${state.unit+1}</div><div class="lesson-head"><button class="back" data-view="curriculum">←</button><div><small>${u.theme[1]} ${u.theme[0]}</small><h1>${u.title}</h1><p>Fokus: ${s[2]} ${s[1]}</p></div></div><div class="lesson-layout"><aside class="card">${skillList()}</aside><article class="card lesson"><div class="stage-pills"><span class="on">1 Faham</span><span>2 Belajar</span><span>3 Bina</span><span>4 Guna</span></div><div class="lesson-visual">${u.theme[1]}</div><h2>Faham konteks dahulu</h2><p class="lead">${u.prompt}</p><div class="word-chips">${u.words.map(w=>`<span>${w}</span>`).join('')}</div>${window.BAHASA_CONTENT?.summary?.(state.year,state.unit,u)||''}<div class="example"><b>Belajar</b><p>${lessonText(state.year,u)}</p></div><div class="cycle-grid">${Object.entries(u.learningCycle||{}).map(([k,v],i)=>`<div class="cycle-step"><b>${i+1} · ${k.toUpperCase()}</b><span>${v}</span></div>`).join('')}</div><div class="example"><b>🎯 Bukti Mastery</b><ul>${(u.masteryEvidence||[]).map(x=>`<li>${x}</li>`).join('')}</ul><p><small>${u.contentType||''} · ${u.sourceStatus||''}</small></p></div><div class="example"><b>🔄 Transfer</b><p>${u.transferPrompt||'Gunakan kemahiran dalam konteks baharu.'}</p></div><div class="example"><b>Mastery rule</b><p>Guided practice membantu pembelajaran. Penguasaan penuh memerlukan percubaan baharu tanpa petunjuk.</p></div><button class="pink" id="guided">Selesai Guided → Latihan</button><button class="green" id="independent">Cuba Sendiri ⭐</button><div class="micro-status">${bar(s[1],score(key(s)))}</div></article></div></section>`)}
function lessonText(y,u){return y===1?`Kenal perkataan dalam konteks “${u.title}”, bina frasa, kemudian ayat mudah yang bermakna.`:y===2?`Gunakan kosa kata unit untuk membina ayat lengkap dan tambah maklumat yang sesuai.`:y===3?`Cari idea utama, tambah idea sokongan dan susun 2–3 ayat yang berkaitan.`:y===4?`Kenal pasti isi, beri huraian dan contoh sebelum membina perenggan.`:y===5?`Rancang isi, huraian, contoh dan gunakan penanda wacana dengan tepat.`:`Rancang respons, bina aliran idea yang koheren, kemudian semak bahasa dan ketepatan.`}
function practice(){let u=un();return shell(`<section class="page narrow"><div class="lesson-head"><button class="back" data-view="learn">←</button><div><small>LATIHAN MULTI-AKTIVITI · ${u.title}</small><h1>🎮 Belajar dengan pelbagai cara</h1><p>Pilih aktiviti. Sistem menukar jenis latihan mengikut tahap dan skill.</p></div></div><article class="card quiz"><div class="activity-picker">${[['mcq','🎯','Pilih Jawapan'],['order','🧩','Susun Ayat'],['fill','✍️','Isi Tempat Kosong'],['memory','🧠','Memori Kosa Kata'],['grammar','🌧️','Tatabahasa'],['transfer','⭐','Transfer']].map((x,i)=>`<button data-activity="${x[0]}" class="${i===0?'active':''}">${x[1]}<br>${x[2]}</button>`).join('')}</div><div id="activityBoard" class="activity-board"></div><div id="activityFeedback" class="activity-feedback">Cuba sendiri dahulu. Petunjuk hanya muncul selepas kesilapan.</div><button class="green hidden" id="nextIndependent">Cuba Sendiri Tanpa Petunjuk ⭐</button></article></section>`)}
function activityData(type){
 let u=un(),w=u.words,topic=w[0]||'bahasa',y=state.year;
 let rich=window.BAHASA_CONTENT?.get?.(y,state.unit,u);
 if(rich && rich[type]) return rich[type];
 const packs={
  1:{subject:'Saya',order:['Saya','menjaga',topic,'dengan','baik.'],fill:`Saya ____ ${topic} dengan baik.`,fillAns:'menjaga',hint:'Cari kata kerja yang menunjukkan tindakan.',grammarQ:`Dalam ayat “Saya menjaga ${topic} dengan baik.”, “menjaga” ialah...`,grammarA:['Kata nama','Kata kerja','Kata adjektif','Kata arah'],grammarOk:1,transfer:[`Saya menjaga ${topic} dengan baik.`,`${topic} makan kerusi kerana biru.`,`Dan tetapi ${topic}.`]},
  2:{subject:'Kami',order:['Kami','menjaga',topic,'supaya','sentiasa','bersih.'],fill:`Kami menjaga ${topic} supaya sentiasa ____.`,fillAns:'bersih',hint:'Cari kata adjektif yang menerangkan keadaan.',grammarQ:`Dalam frasa “${topic} yang bersih”, “bersih” ialah...`,grammarA:['Kata kerja','Kata adjektif','Kata nama khas','Kata arah'],grammarOk:1,transfer:[`Kami menjaga ${topic} supaya sentiasa bersih.`,`${topic} sangat berlari meja.`,`Kerana dan ${topic}.`]},
  3:{subject:'Murid-murid',order:[`${topic}`,'penting','dalam','kehidupan','kita.'],fill:`${topic} penting. Oleh itu, kita perlu ____ dengan baik.`,fillAns:'menjaganya',hint:'Gunakan kata kerja yang merujuk semula kepada perkara tadi.',grammarQ:`Dalam ayat “${topic} penting dalam kehidupan kita.”, frasa “dalam kehidupan kita” memberi...`,grammarA:['maklumat tambahan','nama orang','kata seru','soalan'],grammarOk:0,transfer:[`${topic} penting dalam kehidupan. Oleh itu, kita perlu menjaganya.`,`Saya suka nasi. Kapal terbang tinggi.`,`Tetapi dan kerana ${topic}.`]},
  4:{subject:'Kita',order:['Kita','perlu','mengamalkan',topic,'kerana','membawa','manfaat.'],fill:`Kita perlu mengamalkan ${topic} kerana ____ manfaat.`,fillAns:'membawa',hint:'Lengkapkan huraian sebab dengan kata kerja yang sesuai.',grammarQ:`“kerana” dalam ayat ini berfungsi untuk...`,grammarA:['menghubungkan sebab','menamakan orang','menunjukkan warna','menutup ayat'],grammarOk:0,transfer:[`Kita perlu mengamalkan ${topic} kerana membawa manfaat. Contohnya, amalan ini boleh dilakukan di sekolah.`,`Kita perlu ${topic}. Contohnya awan ialah kerusi.`,`Dan tetapi kerana.`]},
  5:{subject:'Masyarakat',order:[`Amalan`,topic,'wajar','dipupuk','kerana','membentuk','masyarakat','bertanggungjawab.'],fill:`Amalan ${topic} wajar dipupuk kerana dapat ____ masyarakat yang bertanggungjawab.`,fillAns:'membentuk',hint:'Cari kata kerja yang menerangkan kesan amalan tersebut.',grammarQ:`Penanda wacana yang paling sesuai untuk memperkenalkan contoh ialah...`,grammarA:['Contohnya','Walaupun','Adakah','Wah'],grammarOk:0,transfer:[`Amalan ${topic} wajar dipupuk. Contohnya, murid boleh mempraktikkannya di sekolah. Kesannya, suasana menjadi lebih harmoni.`,`Amalan ${topic} bagus kerana bagus.`,`Contohnya dan tetapi semua.`]},
  6:{subject:'Kita',order:[`Dalam`,`menghadapi`,`cabaran`,topic+',','kita','perlu','bertindak','secara','bijaksana.'],fill:`Dalam menghadapi cabaran ${topic}, kita perlu bertindak secara ____ dan bertanggungjawab.`,fillAns:'bijaksana',hint:'Pilih kata adjektif yang sesuai dengan tindakan matang.',grammarQ:`Ayat manakah menunjukkan hubungan idea yang paling koheren?`,grammarA:[`Isu ${topic} perlu ditangani. Oleh itu, tindakan yang terancang amat penting.`,`Isu ${topic} penting. Meja itu biru.`,`Kerana tetapi walaupun.`],grammarOk:0,transfer:[`Isu ${topic} perlu dilihat dari pelbagai sudut. Langkah yang praktikal perlu dirancang, dilaksanakan dan dinilai semula agar memberi kesan yang berkekalan.`,`Isu ${topic} sangat bagus dan bagus.`,`Semua orang mesti setuju tanpa huraian.`]}
 };
 let p=packs[y];
 if(type==='order')return {tokens:p.order,answer:p.order.join(' ').replace(' ,',',')};
 if(type==='fill')return {q:p.fill,answer:p.fillAns,hint:p.hint};
 if(type==='memory')return {pairs:[[w[0],'kata fokus'],[w[1]||'baik',y<=2?'kata sokongan':'idea sokongan'],[w[2]||'bersih',y<=3?'kata konteks':'contoh konteks']]};
 if(type==='grammar')return {q:p.grammarQ,a:p.grammarA,ok:p.grammarOk};
 if(type==='transfer')return {q:`Pindahkan kemahiran Unit ${state.unit+1} kepada konteks baharu. Pilih respons paling sesuai.`,a:p.transfer,ok:0};
 return quizSet(y,u)[0]
}
function renderActivity(type='mcq'){let b=$('#activityBoard'),f=$('#activityFeedback');if(!b)return;let d=activityData(type);f.textContent='Cuba sendiri dahulu. Petunjuk hanya muncul selepas kesilapan.';if(type==='mcq'||type==='grammar'||type==='transfer'){b.innerHTML=`<h2>${d.q}</h2><div class="answers">${d.a.map((a,i)=>`<button data-act-answer="${i}">${a}</button>`).join('')}</div>`;$$('[data-act-answer]').forEach(x=>x.onclick=()=>{if(+x.dataset.actAnswer===d.ok){x.classList.add('correct');f.textContent='⭐ Betul! Aktiviti direkod sebagai guided evidence.';addEvidence('guided')}else{x.classList.add('wrong');f.textContent='Belum tepat. Semak maksud dan cuba lagi.';recordMistake(type,d.q,d.a[d.ok],d.hint||'')}})}else if(type==='order'){let shuffled=[...d.tokens].sort(()=>.5-Math.random());b.innerHTML=`<h2>Susun menjadi ayat yang bermakna</h2><div class="token-bank">${shuffled.map((t,i)=>`<button class="token" data-token="${i}">${t}</button>`).join('')}</div><div id="dropzone" class="dropzone"></div><button id="checkOrder" class="pink">Semak Ayat</button>`;let picked=[];$$('[data-token]').forEach(x=>x.onclick=()=>{picked.push(x.textContent);x.disabled=true;$('#dropzone').innerHTML=picked.map(t=>`<span class="token">${t}</span>`).join(' ')});$('#checkOrder').onclick=()=>{if(picked.join(' ')===d.answer){f.textContent='⭐ Susunan betul!';addEvidence('guided')}else{f.textContent='Belum tepat. Cuba fikir: siapa → buat apa → maklumat.';recordMistake('Susun Ayat','Susun ayat: '+d.tokens.join(' / '),d.answer,'siapa → buat apa → maklumat')}}}else if(type==='fill'){b.innerHTML=`<h2>Isi perkataan yang sesuai</h2><p class="lead">${d.q}</p><input id="fillAnswer" class="fill-input" autocomplete="off"><button id="checkFill" class="pink">Semak</button>`;let tries=0;$('#checkFill').onclick=()=>{tries++;if($('#fillAnswer').value.trim().toLowerCase()===d.answer){f.textContent='⭐ Tepat! Kamu memilih kata yang sesuai.';addEvidence('guided')}else{f.textContent=tries>=2?d.hint:'Belum tepat. Cuba sekali lagi.';if(tries===1)recordMistake('Isi Tempat Kosong',d.q,d.answer,d.hint)}}}else if(type==='memory'){let cards=[];d.pairs.forEach((p,i)=>{cards.push({id:i,t:p[0]},{id:i,t:p[1]})});cards.sort(()=>.5-Math.random());b.innerHTML=`<h2>Padankan kosa kata dengan fungsi</h2><div class="memory-grid">${cards.map((c,i)=>`<button class="memory-card" data-mem="${i}" data-pair="${c.id}">${c.t}</button>`).join('')}</div>`;let first=null,done=0;$$('[data-mem]').forEach(x=>x.onclick=()=>{if(!first){first=x;x.classList.add('correct')}else{if(first!==x&&first.dataset.pair===x.dataset.pair){x.classList.add('correct');first.disabled=x.disabled=true;done++;f.textContent='Padanan betul ✓';if(done===d.pairs.length){f.textContent='⭐ Semua padanan selesai!';addEvidence('guided')}}else{first.classList.remove('correct');f.textContent='Belum sepadan. Cuba lagi.'}first=null}})}}
function quizSet(y,u){let w=u.words; if(y===1)return [
 {q:'1 · FAHAM — Pilih perkataan yang paling sesuai dengan tema ini.',a:[w[0],w[1],w[2]],ok:0,h:'Lihat semula tajuk unit dan perkataan penting.'},
 {q:'2 · BINA — Pilih ayat yang lengkap dan bermakna.',a:[`${w[0]} itu bersih.`,`Dan itu kerana.`,`Meja berlari makan.`],ok:0,h:'Cari ayat yang ada maksud lengkap.'},
 {q:'3 · GUNA — Pilih ayat yang masih sesuai dalam konteks baharu.',a:[`Saya menjaga ${w[0]} dengan baik.`,`Saya makan meja dengan gembira.`,`Kerana tetapi ${w[0]}.`],ok:0,h:'Semak maksud, bukan susunan perkataan sahaja.'}];
 if(y===2)return [
 {q:'1 · FAHAM — Pilih frasa yang bermakna.',a:[`${w[0]} yang baik`,`dan kerana tetapi`,`makan kerusi`],ok:0,h:'Frasa perlu membawa maksud yang sesuai.'},
 {q:'2 · BINA — Pilih ayat lengkap dengan maklumat tambahan.',a:[`Saya menjaga ${w[0]} dengan baik.`,`Saya ${w[0]}.`,`Kerana tetapi ${w[0]}.`],ok:0,h:'Cari siapa/buat apa serta maklumat tambahan.'},
 {q:'3 · GUNA — Pilih penerangan yang paling sesuai.',a:[`${w[0]} itu bersih dan selesa.`,`${w[0]} itu masin dan berlari.`,`Dan ${w[0]} kerana.`],ok:0,h:'Penerangan mesti sesuai dengan benda atau situasi.'}];
 if(y===3)return [
 {q:'1 · FAHAM — Pilih idea utama yang jelas.',a:[`${w[0]} penting dalam kehidupan.`,`Saya suka nasi semalam.`,`Dan tetapi kerana.`],ok:0,h:'Idea utama mesti jelas dan berkaitan dengan topik.'},
 {q:'2 · BINA — Pilih dua ayat yang saling berkaitan.',a:[`${w[0]} penting dalam kehidupan. Kita perlu menjaganya dengan baik.`,`Saya suka nasi. Kapal terbang tinggi.`,`Kerusi itu kerana tetapi.`],ok:0,h:'Ayat kedua perlu menyokong ayat pertama.'},
 {q:'3 · GUNA — Pilih penutup kecil yang sesuai.',a:[`Oleh itu, kita harus menghargai ${w[0]}.`,`Tiba-tiba meja makan langit.`,`Tetapi dan kerana.`],ok:0,h:'Penutup perlu kembali kepada idea utama.'}];
 return [
 {q:'1 · FAHAM — Pilih isi yang relevan dan boleh dihuraikan.',a:[`Kita perlu mengamalkan ${w[0]} kerana membawa manfaat kepada diri dan masyarakat.`,`Benda itu bagus kerana bagus.`,`Dan tetapi kalau semua.`],ok:0,h:'Isi yang baik menjawab tajuk dan boleh diterangkan.'},
 {q:'2 · BINA — Pilih huraian yang benar-benar menyokong isi.',a:[`Amalan ini membantu kita bertindak dengan lebih bertanggungjawab dalam kehidupan harian.`,`Saya suka warna biru tanpa sebab.`,`Kerana dan tetapi.`],ok:0,h:'Huraian perlu menerangkan mengapa atau bagaimana.'},
 {q:'3 · GUNA — Pilih contoh yang paling relevan.',a:[`Contohnya, kita boleh mempraktikkannya di rumah, sekolah dan dalam masyarakat.`,`Contohnya, awan ialah kerusi.`,`Contohnya, dan tetapi.`],ok:0,h:'Contoh mesti membuktikan atau menjelaskan isi.'}];}
function writingPlan(y){
 if(y===1)return {label:'Bina Ayat',min:4,steps:['Siapa / Apa?','Buat apa?','Maklumat mudah'],tip:'Tulis satu ayat yang lengkap dan bermakna.'};
 if(y===2)return {label:'Ayat Berkembang',min:7,steps:['Ayat lengkap','Tambah penerangan','Semak maksud'],tip:'Tambah satu maklumat yang sesuai tanpa merosakkan maksud ayat.'};
 if(y===3)return {label:'Perenggan Pendek',min:15,steps:['Idea utama','2 idea sokongan','Ayat penutup kecil'],tip:'Pastikan semua ayat bercakap tentang idea yang sama.'};
 if(y===4)return {label:'Perenggan Berstruktur',min:25,steps:['Isi','Huraian','Contoh','Ayat penegas'],tip:'Huraian mesti menerangkan isi; contoh mesti relevan.'};
 if(y===5)return {label:'Karangan Lengkap',min:45,steps:['Pendahuluan','Isi + Huraian','Contoh','Penanda wacana','Penutup'],tip:'Susun idea supaya setiap perenggan mempunyai fungsi yang jelas.'};
 return {label:'Penulis Berdikari',min:60,steps:['Analisis tajuk','Rancang isi','Huraikan + bukti/contoh','Koheren','Sunting bahasa','Penutup'],tip:'Tulis secara berdikari, kemudian semak ketepatan, koheren dan gaya.'}
}
function writing(){let u=un(),draft=state.drafts[u.id]||'',p=writingPlan(state.year);return shell(`<section class="page narrow"><div class="lesson-head"><button class="back" data-view="curriculum">←</button><div><small>KARANGAN STUDIO · TAHUN ${state.year} · ${p.label.toUpperCase()}</small><h1>📝 ${u.title}</h1><p>${u.prompt}</p></div></div><article class="card writing"><div class="writing-level"><b>${p.label}</b><span>Sasaran latihan: ≥ ${p.min} perkataan</span></div><div class="writing-scaffold">${scaffold(state.year)}</div><div class="writing-tip">💡 ${p.tip}</div><textarea id="writingText" placeholder="Tulis di sini...">${draft}</textarea><div class="writing-tools"><span id="wordCount">0 perkataan</span><button class="pink" id="saveWriting">Simpan Draf</button><button class="green" id="submitWriting">Hantar Bukti Independent</button></div><div id="writingFeedback" class="safe-ai">👩🏻‍🏫 <b>Cikgu Aira:</b> Gunakan checklist tahap kamu dahulu. Bantuan AI tidak menentukan curriculum mastery.</div><div class="self-check"><b>Semak sebelum hantar</b>${p.steps.map(x=>`<label><input type="checkbox"> ${x}</label>`).join('')}</div></article></section>`)}
function scaffold(y){return `<div class="scaffold">${writingPlan(y).steps.map((x,i)=>`<span>${i+1}. ${x}</span>`).join('')}</div>`}
function recordMistake(type,prompt,answer,hint=''){let item={id:Date.now()+Math.random(),year:state.year,unit:un().id,skill:sk()[0],type,prompt,answer,hint,ts:Date.now(),due:Date.now()+86400000,interval:1};state.mistakes.unshift(item);state.mistakes=state.mistakes.slice(0,100);state.reviewQueue.push(item);save()}
function dueReviews(){return state.reviewQueue.filter(x=>x.year===state.year&&x.due<=Date.now()).sort((a,b)=>a.due-b.due)}
function review(){let due=dueReviews(),recent=state.mistakes.filter(x=>x.year===state.year).slice(0,8);return shell(`<section class="page narrow"><div class="center-title"><small>SPACED REVIEW</small><h1>🔁 Ulang Kaji Pintar</h1><p>Sistem mengembalikan kesilapan lama pada masa yang sesuai supaya kemahiran tidak cepat lupa.</p></div><div class="progress-grid">${card('Hari Ini',`<div class="big-number">${due.length}</div><p>latihan perlu diulang hari ini</p>${due.length?`<button class="pink" id="startReview">Mula Ulang Kaji</button>`:'<div class="note">✨ Tiada review tertunggak.</div>'}`)}${card('Buku Kesilapan',recent.length?recent.map(x=>`<div class="unit-row"><span>⚠️</span><b>${x.type}<small>${x.prompt}</small></b></div>`).join(''):'<p>Belum ada kesilapan direkod.</p>')}${card('Mastery Test',`<p>Ujian ini tidak memberi hint. Lulus 3 soalan transfer/independent untuk mengesahkan kemahiran.</p><button class="green" id="masteryTest">Mula Mastery Test ⭐</button>`)}${card('Memory Schedule',`<p>Jawapan betul menjarakkan review: 1 → 3 → 7 → 14 hari. Jawapan salah kembali ke 1 hari.</p><p><b>${state.reviewQueue.filter(x=>x.year===state.year).length}</b> item dalam jadual.</p>`)}</div><div id="reviewBoard" class="card quiz hidden"></div></section>`)}
function runReview(){let items=dueReviews();let b=$('#reviewBoard');b.classList.remove('hidden');if(!items.length){b.innerHTML='<h2>✨ Semua review selesai.</h2>';return}let x=items[0];b.innerHTML=`<small>${x.type.toUpperCase()}</small><h2>${x.prompt}</h2><input id="reviewAnswer" class="fill-input" autocomplete="off"><button id="checkReview" class="pink">Semak</button><div id="reviewFeedback" class="activity-feedback"></div>`;$('#checkReview').onclick=()=>{let ok=$('#reviewAnswer').value.trim().toLowerCase()===String(x.answer).trim().toLowerCase();if(ok){x.interval=x.interval>=7?14:x.interval>=3?7:3;x.due=Date.now()+x.interval*86400000;$('#reviewFeedback').textContent=`⭐ Betul. Akan diulang lagi dalam ${x.interval} hari.`}else{x.interval=1;x.due=Date.now()+86400000;$('#reviewFeedback').textContent=`Belum tepat. Jawapan: ${x.answer}. Item kembali esok.`}state.reviewQueue=state.reviewQueue.filter(i=>i.id!==x.id);state.reviewQueue.push(x);save();setTimeout(runReview,500)}}
function runMasteryTest(){let s=sk(),u=un(),qs=quizSet(state.year,u).slice(0,3),i=0,correct=0;b=$('#reviewBoard');b.classList.remove('hidden');const show=()=>{if(i>=qs.length){let pass=correct>=3;b.innerHTML=`<h2>${pass?'🏆 Mastery Test Lulus':'🧠 Belum dikuasai'}</h2><p>${correct}/3 betul. ${pass?'Independent mastery evidence direkod.':'Sistem akan masukkan kemahiran ini ke recovery.'}</p>`;if(pass)addEvidence('independent');else{let k=key(s);state.evidence[k]=state.evidence[k]||{guided:0,independent:0,mastery:0};state.evidence[k].mastery=Math.min(state.evidence[k].mastery,70);save()}return}let q=qs[i];b.innerHTML=`<small>MASTERY ${i+1}/3 · TANPA HINT</small><h2>${q.q}</h2><div class="answers">${q.a.map((a,j)=>`<button data-mtest="${j}">${a}</button>`).join('')}</div>`;$$('[data-mtest]').forEach(btn=>btn.onclick=()=>{if(+btn.dataset.mtest===q.ok)correct++;else recordMistake('Mastery Test',q.q,q.a[q.ok],q.h);i++;show()})};show()}
function progress(){return shell(`<section class="page narrow"><div class="center-title"><small>KEMAJUAN</small><h1>📊 Tahun ${state.year} Learning Profile</h1></div><div class="progress-grid">${card('📚 School Progress',bar('Kedudukan sekolah',state.school))}${card('🧠 My Mastery',bar('Penguasaan sebenar',mastery()))}${card('🎯 Skill Graph',skills().map(s=>bar(s[1],score(`${state.year}:${s[0]}`))).join(''))}${card('🧾 Assessment',`<p><b>${state.mistakes.filter(x=>x.year===state.year).length}</b> kesilapan direkod · <b>${dueReviews().length}</b> review perlu dibuat.</p><button class="soft wide" data-view="review">Buka Ulang Kaji →</button>`)}${card('🔁 Recovery',`<h2>${Math.max(0,state.school-mastery())}% learning gap</h2><p>${weak().length?`Fokus: <b>${weak()[0][1]}</b>`:'Tiada weak skill terbuka.'}</p><p>Prerequisite mesti ≥60%; mastery ≥80% memerlukan independent evidence.</p>`)}</div></section>`)}
function profile(){return shell(`<section class="page narrow"><div class="center-title"><small>PROFIL</small><h1>${state.avatar} Adik · Tahun ${state.year}</h1></div><div class="profile-grid">${card('Avatar',`<div class="avatars">${['🐱','🐼','🐰','🐯','🦖','🤖','🦊','🐥'].map(a=>`<button data-avatar="${a}" class="${a===state.avatar?'sel':''}">${a}</button>`).join('')}</div>`)}${card('Tetapan',yearPicker()+`<p><b>Versi:</b> ${state.year<=3?BAHASA_CURRICULUM.curriculumVersions.tahap1:BAHASA_CURRICULUM.curriculumVersions.tahap2}</p>`)}${card('Rekod',`<div class="big-number">⭐ ${state.xp}</div><p>${Object.keys(state.unitDone).filter(k=>k.startsWith(state.year+':')).length}/${units().length} unit · ${state.streak} hari</p>`)}${card('Data Demo',`<p>Progress disimpan dalam peranti ini menggunakan localStorage.</p><button class="soft wide" id="resetDemo">Reset Progress</button>`)}</div></section>`)}
function addEvidence(kind){let k=key(),e=state.evidence[k]||{guided:0,independent:0,mastery:0};if(kind==='guided'){e.guided++;e.mastery=Math.min(70,e.mastery+20);state.xp+=5}else{e.independent++;e.mastery=Math.min(100,e.mastery+35);state.xp+=12;if(e.mastery>=80)state.unitDone[`${state.year}:${un().id}`]=true}state.evidence[k]=e;save()}
function render(){let v={home,curriculum,learn,practice,writing,review,progress,profile};$('#app').innerHTML=(v[state.view]||home)();bind()}
function bind(){$('#startReview')?.addEventListener('click',runReview);$('#masteryTest')?.addEventListener('click',runMasteryTest);$$('[data-activity]').forEach(b=>b.onclick=()=>{$$('[data-activity]').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderActivity(b.dataset.activity)});if(state.view==='practice')setTimeout(()=>renderActivity('mcq'),0);$$('[data-view]').forEach(b=>b.onclick=()=>{state.view=b.dataset.view;save();render();scrollTo(0,0)});$$('[data-year]').forEach(b=>b.onclick=()=>{state.year=+b.dataset.year;state.skill=0;state.unit=0;save();render()});$('#stream')?.addEventListener('change',e=>{state.stream=e.target.value;save()});$$('[data-skill]').forEach(b=>b.onclick=()=>{if(!b.disabled){state.skill=+b.dataset.skill;let id=sk()[0],idx=units().findIndex(u=>u.focus===id);if(idx>=0)state.unit=idx;state.view='learn';save();render();scrollTo(0,0)}});$$('[data-unit]').forEach(b=>b.onclick=()=>{state.unit=+b.dataset.unit;let u=un(),i=skills().findIndex(s=>s[0]===u.focus);state.skill=Math.max(0,i);state.view='learn';save();render();scrollTo(0,0)});$('#startMission')?.addEventListener('click',()=>{let t=(mission().find(x=>x[0]==='Pemulihan')||mission()[0])[2],i=skills().indexOf(t);state.skill=i;let ui=units().findIndex(u=>u.focus===t[0]);if(ui>=0)state.unit=ui;state.view='learn';save();render()});$('#guided')?.addEventListener('click',()=>{addEvidence('guided');state.view='practice';render()});$('#independent')?.addEventListener('click',()=>{state.view='writing';save();render()});if(state.view==='practice'){let qs=quizSet(state.year,un()),qi=0,tries=0;const showQ=()=>{let q=qs[qi];$('#quizStage').innerHTML=`<small>CABARAN ${qi+1} / ${qs.length}</small><h2>${q.q}</h2><div class="answers">${q.a.map((a,i)=>`<button data-qanswer="${i}">${a}</button>`).join('')}</div>`;$('#quizBar').style.width=((qi+1)/qs.length*100)+'%';$$('[data-qanswer]').forEach(b=>b.onclick=()=>{let ok=+b.dataset.qanswer===q.ok;tries++;if(ok){b.classList.add('correct');$('#quizFeedback').innerHTML='<div class="good">⭐ Betul! Kemahiran ini berjaya digunakan.</div>';setTimeout(()=>{qi++;tries=0;if(qi<qs.length){$('#quizFeedback').innerHTML='';showQ()}else{addEvidence('guided');$('#quizStage').innerHTML='<h2>🏆 Guided Challenge selesai</h2><p>Kamu sudah melalui Faham → Bina → Guna. Sekarang buktikan secara independent.</p>';$('#nextIndependent').classList.remove('hidden')}},350)}else{b.classList.add('wrong');$('#quizFeedback').innerHTML=`<div class="retry">Belum tepat. ${tries>=2?q.h:'Cuba sekali lagi dan semak maksud jawapan.'}</div>`}})};showQ()}$('#nextIndependent')?.addEventListener('click',()=>{state.view='writing';save();render()});let wt=$('#writingText');if(wt){let count=()=>$('#wordCount').textContent=(wt.value.trim().match(/\S+/g)||[]).length+' perkataan';count();wt.oninput=count}$('#saveWriting')?.addEventListener('click',()=>{state.drafts[un().id]=wt.value;save();$('#saveWriting').textContent='Disimpan ✓'});$('#submitWriting')?.addEventListener('click',()=>{let n=(wt.value.trim().match(/\S+/g)||[]).length,min=writingPlan(state.year).min;if(n<min){$('#writingFeedback').innerHTML=`⚠️ Cuba tambah sedikit lagi. Sasaran latihan ini sekurang-kurangnya ${min} perkataan.`;return}state.drafts[un().id]=wt.value;addEvidence('independent');$('#writingFeedback').innerHTML='⭐ Bukti independent direkodkan. Ini menaikkan mastery kerana dibuat dalam tugasan aplikasi tanpa jawapan diberi.';save()});$$('[data-avatar]').forEach(b=>b.onclick=()=>{state.avatar=b.dataset.avatar;save();render()});$('#resetDemo')?.addEventListener('click',()=>{if(confirm('Reset semua progress demo?')){state={...DEFAULT};save();render()}})}
render();

/* v11 Adaptive Diagnostic Layer — appended without replacing v10 baseline. */
(()=>{
  const V11_KEY='bahasaAIv11';
  if(!localStorage.getItem(V11_KEY)) localStorage.setItem(V11_KEY, localStorage.getItem('bahasaAIv10')||JSON.stringify(state));
  const oldSave=save;
  save=()=>{ localStorage.setItem(V11_KEY,JSON.stringify(state)); localStorage.setItem('bahasaAIv10',JSON.stringify(state)); };
  state.diagnostics=state.diagnostics||{}; state.interventions=state.interventions||{};
  function diagnosticFor(s){
    const k=`${state.year}:${s[0]}`, mistakes=state.mistakes.filter(x=>x.year===state.year&&x.skill===s[0]);
    const types={}; mistakes.forEach(x=>types[x.type]=(types[x.type]||0)+1);
    const top=Object.entries(types).sort((a,b)=>b[1]-a[1])[0];
    const v=score(k), independent=ind(k);
    let band=v>=80&&independent>0?'Kuasai':v>=60?'Hampir Kuasai':v>=40?'Sedang Belajar':'Perlu Pemulihan';
    let cause=top?`Kesilapan paling kerap: ${top[0]} (${top[1]}×).`:independent===0?'Belum ada bukti independent.':'Perlu lebih banyak bukti pembelajaran.';
    let action=v<40?'Kembali kepada contoh mudah + guided practice.':v<60?'Latihan sasaran pada jenis kesilapan utama.':independent===0?'Cuba transfer tanpa hint.':'Spaced review untuk kekalkan penguasaan.';
    return {band,cause,action,mistakes:mistakes.length,mastery:v,independent};
  }
  function diagnosticView(){
    const rows=skills().map(s=>[s,diagnosticFor(s)]);
    return shell(`<section class="page narrow"><div class="center-title"><small>ADAPTIVE DIAGNOSTIC</small><h1>🩺 Diagnosis Pembelajaran</h1><p>Bukan sekadar markah: sistem melihat mastery, independent evidence dan pola kesilapan untuk memilih intervensi seterusnya.</p></div><div class="source-note">📌 Diagnosis ini ialah mekanisme Bahasa AI, bukan Tahap Penguasaan rasmi KPM. Ia menyokong pembelajaran formatif dan tidak menggantikan pertimbangan guru.</div><div class="diagnostic-grid">${rows.map(([s,d])=>card(`${s[2]} ${s[1]}`,`<div class="diag-band">${d.band}</div>${bar('Mastery',d.mastery)}<p><b>Diagnosis:</b> ${d.cause}</p><p><b>Intervensi:</b> ${d.action}</p><small>${d.mistakes} kesilapan · ${d.independent} bukti independent</small><button class="soft wide" data-diag-skill="${skills().indexOf(s)}">Latih Skill Ini →</button>`)).join('')}</div></section>`);
  }
  function buildAdaptiveMission(){
    const ranked=skills().filter(unlocked).map(s=>({s,d:diagnosticFor(s)})).sort((a,b)=>a.d.mastery-b.d.mastery||b.d.mistakes-a.d.mistakes);
    const target=ranked[0]?.s||next(); const d=diagnosticFor(target);
    return {target,d,steps:[
      ['Faham','📘',`Ulang konsep ${target[1]} dengan contoh ringkas.`],
      ['Pulih','🩺',d.action],
      ['Guna','🎮','Buat aktiviti sasaran dalam konteks unit semasa.'],
      ['Bukti','⭐','Akhiri dengan transfer / independent tanpa hint.']
    ]};
  }
  function interventionView(){const m=buildAdaptiveMission();return shell(`<section class="page narrow"><div class="center-title"><small>PERSONALISED PATH</small><h1>🧭 Laluan Pemulihan Pintar</h1><p>Fokus sekarang: <b>${m.target[1]}</b> · ${m.d.band}</p></div><div class="intervention-path">${m.steps.map((x,i)=>`<article class="card"><div class="mission-step"><b>${i+1}</b><span>${x[1]} ${x[0]}<small>${x[2]}</small></span></div></article>`).join('')}</div><article class="card"><h3>Kenapa skill ini dipilih?</h3><p>${m.d.cause}</p><p>Mastery ${m.d.mastery}% · Independent ${m.d.independent} · Kesilapan ${m.d.mistakes}</p><button class="pink" id="beginIntervention">Mulakan Intervensi →</button></article></section>`)}
  window.diagnosticFor=diagnosticFor; window.buildAdaptiveMission=buildAdaptiveMission; window.interventionView=interventionView; window.diagnosticView=diagnosticView;
  const oldNav=nav; nav=()=>oldNav().replace('<div class="student">',`<button data-view="diagnostic" class="${state.view==='diagnostic'?'active':''}">🩺 Diagnosis</button><button data-view="intervention" class="${state.view==='intervention'?'active':''}">🧭 Pemulihan</button><div class="student">`);
  const oldShell=shell; shell=(c)=>oldShell(c).replace('Bahasa AI v10.0','Bahasa AI v11.0');
  const oldRender=render; render=()=>{let v={home,curriculum,learn,practice,writing,review,progress,profile,diagnostic:diagnosticView,intervention:interventionView};$('#app').innerHTML=(v[state.view]||home)();bind(); $$('[data-diag-skill]').forEach(b=>b.onclick=()=>{state.skill=+b.dataset.diagSkill;let ui=units().findIndex(u=>u.focus===sk()[0]);if(ui>=0)state.unit=ui;state.view='learn';save();render();scrollTo(0,0)}); $('#beginIntervention')?.addEventListener('click',()=>{let m=buildAdaptiveMission();state.skill=skills().indexOf(m.target);let ui=units().findIndex(u=>u.focus===m.target[0]);if(ui>=0)state.unit=ui;state.view='learn';save();render();scrollTo(0,0)});};
  render();
})();

/* v12 Adaptive Item Memory Layer — preserves v11 baseline. */
(()=>{
 const V12_KEY='bahasaAIv12';
 if(!localStorage.getItem(V12_KEY)) localStorage.setItem(V12_KEY,localStorage.getItem('bahasaAIv11')||JSON.stringify(state));
 state.itemMemory=state.itemMemory||{}; state.vocabMemory=state.vocabMemory||{}; state.sessionSeen=state.sessionSeen||[];
 save=()=>{localStorage.setItem(V12_KEY,JSON.stringify(state));localStorage.setItem('bahasaAIv11',JSON.stringify(state));};
 const itemId=(type,q)=>`${state.year}:${un().id}:${type}:${String(q).toLowerCase().replace(/[^a-z0-9]+/g,'-').slice(0,60)}`;
 function rememberItem(type,q,correct){let id=itemId(type,q),m=state.itemMemory[id]||{seen:0,correct:0,wrong:0,last:0};m.seen++;correct?m.correct++:m.wrong++;m.last=Date.now();state.itemMemory[id]=m;state.sessionSeen=[id,...state.sessionSeen.filter(x=>x!==id)].slice(0,50);save();}
 function antiMemorise(items){return [...items].sort((a,b)=>{let A=state.itemMemory[itemId(a.type||'q',a.q)]||{},B=state.itemMemory[itemId(b.type||'q',b.q)]||{};let as=(A.seen||0)*3+(A.correct||0)-(A.wrong||0)*2,bs=(B.seen||0)*3+(B.correct||0)-(B.wrong||0)*2;return as-bs||Math.random()-.5})}
 function vocabWords(){let out=[];units().forEach(u=>(u.words||[]).forEach(w=>{if(w&&!out.includes(w))out.push(w)}));return out.slice(0,36)}
 function vocabView(){let words=vocabWords(),due=words.filter(w=>{let m=state.vocabMemory[`${state.year}:${w}`];return !m||!m.due||m.due<=Date.now()});return shell(`<section class="page narrow"><div class="center-title"><small>LONG-TERM MEMORY</small><h1>🧠 Bank Memori Kosa Kata</h1><p>Perkataan yang sukar akan muncul lebih kerap; perkataan yang stabil dijarakkan semula.</p></div><div class="source-note">Hari ini: <b>${due.length}</b> perkataan perlu diulang · Bank Tahun ${state.year}: <b>${words.length}</b></div><article class="card quiz"><div id="vocabBoard"></div><div id="vocabFeedback" class="activity-feedback">Tekan mula untuk sesi memori ringkas.</div><button class="pink" id="startVocab">Mula Ulang Kaji Kosa Kata</button></article></section>`)}
 function runVocab(){let pool=vocabWords().filter(w=>{let m=state.vocabMemory[`${state.year}:${w}`];return !m||!m.due||m.due<=Date.now()});if(!pool.length)pool=vocabWords();pool=pool.sort((a,b)=>(state.vocabMemory[`${state.year}:${a}`]?.level||0)-(state.vocabMemory[`${state.year}:${b}`]?.level||0)).slice(0,8);let i=0;const show=()=>{let b=$('#vocabBoard');if(i>=pool.length){b.innerHTML='<h2>🎉 Sesi memori selesai</h2><p>Perkataan yang belum stabil akan kembali lebih awal.</p>';return}let w=pool[i],u=units().find(x=>(x.words||[]).includes(w))||un(),c=window.BAHASA_CONTENT?.get?.(state.year,units().indexOf(u),u)?.meta?.model||'';b.innerHTML=`<small>${i+1}/${pool.length}</small><h2>${w}</h2><p>Ingat maksud dan penggunaannya. Contoh konteks:</p><div class="example">${c}</div><div class="answers"><button data-vknow="0">Belum ingat</button><button data-vknow="1">Hampir ingat</button><button data-vknow="2">Ingat ✓</button></div>`;$$('[data-vknow]').forEach(x=>x.onclick=()=>{let quality=+x.dataset.vknow,k=`${state.year}:${w}`,m=state.vocabMemory[k]||{level:0,seen:0};m.seen++;m.level=quality===2?Math.min(5,m.level+1):quality===1?Math.max(1,m.level):0;let days=[1,1,3,7,14,30][m.level];m.due=Date.now()+days*86400000;m.last=Date.now();state.vocabMemory[k]=m;save();i++;show()})};show()}
 window.itemId=itemId; window.rememberItem=rememberItem; window.antiMemorise=antiMemorise;
 const oldActivityData=activityData; activityData=(type)=>{let d=oldActivityData(type);d.itemId=itemId(type,d.q||d.answer||type);return d};
 const oldRecordMistake=recordMistake; recordMistake=(type,q,answer,hint)=>{rememberItem(type,q,false);oldRecordMistake(type,q,answer,hint)};
 const oldNav12=nav;nav=()=>oldNav12().replace('<div class="student">',`<button data-view="vocab" class="${state.view==='vocab'?'active':''}">🧠 Kosa Kata</button><div class="student">`);
 const oldShell12=shell;shell=(c)=>oldShell12(c).replace('Bahasa AI v11.0','Bahasa AI v12.0');
 const previousRender=render;render=()=>{if(state.view==='vocab'){$('#app').innerHTML=vocabView();bind();$('#startVocab')?.addEventListener('click',runVocab);return}previousRender();};
 const oldRunMasteryTest=runMasteryTest;runMasteryTest=()=>{let before=Object.values(state.itemMemory).reduce((a,x)=>a+(x.seen||0),0);oldRunMasteryTest();state.assessment.lastAntiMemoriseCheck={at:Date.now(),priorSeen:before};save()};
 save();render();
})();

/* ===== Bahasa AI v13: Dynamic Mastery Question Bank ===== */
(()=>{
 state.assessment=state.assessment||{history:[],formsSeen:{},replacementQueue:[]};
 function bankForUnit(){return window.BAHASA_CONTENT?.bank?.(state.year,state.unit,un())||[]}
 function qid(q){return q.id||itemId(q.type||'q',q.q)}
 function exposure(q){let m=state.itemMemory[qid(q)]||{};return (m.seen||0)*4+(m.correct||0)*2-(m.wrong||0)}
 function selectFresh(n=3,avoid=[]){let banned=new Set(avoid),pool=bankForUnit().filter(q=>!banned.has(qid(q)));pool.sort((a,b)=>exposure(a)-exposure(b)||Math.random()-.5);return pool.slice(0,n)}
 function recordDynamic(q,correct){let id=qid(q),m=state.itemMemory[id]||{seen:0,correct:0,wrong:0,last:0};m.seen++;correct?m.correct++:m.wrong++;m.last=Date.now();state.itemMemory[id]=m;state.assessment.formsSeen[id]=(state.assessment.formsSeen[id]||0)+1;if(!correct){state.assessment.replacementQueue.unshift({year:state.year,unit:state.unit,skill:un().focus,type:q.type||'parallel',at:Date.now(),avoid:id});state.assessment.replacementQueue=state.assessment.replacementQueue.slice(0,80)}save()}
 window.dynamicBankStats=()=>({bank:bankForUnit().length,seen:Object.keys(state.assessment.formsSeen).length,replacements:state.assessment.replacementQueue.length});
 runMasteryTest=()=>{let s=sk(),first=selectFresh(3),used=[],i=0,correct=0;b=$('#reviewBoard');b.classList.remove('hidden');
  const finish=()=>{let pass=correct>=3;b.innerHTML=`<h2>${pass?'🏆 Mastery Test Lulus':'🧠 Belum dikuasai'}</h2><p>${correct}/3 betul. ${pass?'Tiga bentuk soalan berbeza berjaya dijawab tanpa hint.':'Soalan gantian akan digunakan semasa pemulihan; sistem tidak mengulang bentuk yang sama sahaja.'}</p><small>Anti-memorisation: ${used.length} bentuk unik digunakan.</small>`;state.assessment.history.unshift({at:Date.now(),year:state.year,unit:state.unit,skill:s[0],correct,total:3,forms:[...used],pass});state.assessment.history=state.assessment.history.slice(0,60);if(pass)addEvidence('independent');else{let k=key(s);state.evidence[k]=state.evidence[k]||{guided:0,independent:0,mastery:0};state.evidence[k].mastery=Math.min(state.evidence[k].mastery,70);save()}};
  const show=()=>{if(i>=3)return finish();let pool=i<first.length?[first[i]]:selectFresh(1,used),q=pool[0];if(!q)return finish();used.push(qid(q));b.innerHTML=`<small>MASTERY ${i+1}/3 · BENTUK DINAMIK · TANPA HINT</small><h2>${q.q}</h2><div class="answers">${q.a.map((a,j)=>`<button data-dm="${j}">${a}</button>`).join('')}</div>`;$$('[data-dm]').forEach(btn=>btn.onclick=()=>{let ok=+btn.dataset.dm===q.ok;recordDynamic(q,ok);if(ok)correct++;else recordMistake(`Mastery:${q.type||'parallel'}`,q.q,q.a[q.ok],q.h||'Semak maksud dan relevansi ayat.');i++;show()})};show()};
 const oldProgress=progress;progress=()=>{let html=oldProgress(),stats=window.dynamicBankStats();return html.replace('</section></main>',`<article class="card"><h3>🧪 Dynamic Assessment</h3><p><b>${stats.bank}</b> bentuk soalan tersedia untuk unit semasa · <b>${stats.replacements}</b> targeted replacement menunggu.</p><small>Mastery Test mengutamakan item yang kurang pernah dilihat untuk mengurangkan kesan hafalan jawapan.</small></article></section></main>`)};
 save();
})();

/* ===== Bahasa AI v14: Skill-Specific Difficulty Engine ===== */
(()=>{
 const V14_KEY='bahasaAIv14';
 if(!localStorage.getItem(V14_KEY)) localStorage.setItem(V14_KEY,localStorage.getItem('bahasaAIv12')||JSON.stringify(state));
 state.difficulty=state.difficulty||{}; state.assessment=state.assessment||{history:[],formsSeen:{},replacementQueue:[]};
 save=()=>{localStorage.setItem(V14_KEY,JSON.stringify(state));localStorage.setItem('bahasaAIv12',JSON.stringify(state));};
 function diffKey(s=sk()){return `${state.year}:${s[0]}`}
 function recommendedLevel(s=sk()){
   const k=diffKey(s),v=score(key(s)),independent=ind(key(s)),recent=(state.assessment.history||[]).filter(x=>x.year===state.year&&x.skill===s[0]).slice(0,3);
   const recentRate=recent.length?recent.reduce((a,x)=>a+x.correct,0)/(recent.length*3):null;
   let level=v<35?1:v<60?2:v<80?3:4;
   if(recentRate!==null&&recentRate<0.5)level=Math.max(1,level-1);
   if(independent===0&&level===4)level=3;
   state.difficulty[k]=level; return level;
 }
 function adaptiveSelect(n=3,avoid=[]){
   const level=recommendedLevel(), banned=new Set(avoid), all=(window.BAHASA_CONTENT.bank?.(state.year,state.unit,un())||[]).filter(q=>!banned.has(qid(q)));
   const exact=all.filter(q=>q.difficulty===level), near=all.filter(q=>q.difficulty&&Math.abs(q.difficulty-level)===1), legacy=all.filter(q=>!q.difficulty);
   const rank=arr=>arr.sort((a,b)=>exposure(a)-exposure(b)||Math.random()-.5);
   return [...rank(exact),...rank(near),...rank(legacy)].slice(0,n);
 }
 window.skillDifficulty=()=>({level:recommendedLevel(),name:window.BAHASA_CONTENT.difficultyNames?.[recommendedLevel()]||'',skill:sk()[1]});
 runMasteryTest=()=>{let s=sk(),level=recommendedLevel(s),first=adaptiveSelect(3),used=[],i=0,correct=0;b=$('#reviewBoard');b.classList.remove('hidden');
  const finish=()=>{let pass=correct>=3,canMaster=pass&&level>=3;b.innerHTML=`<h2>${pass?'🏆 Ujian Selesai':'🧠 Belum dikuasai'}</h2><p>${correct}/3 betul pada tahap <b>${window.BAHASA_CONTENT.difficultyNames[level]}</b>. ${canMaster?'Independent mastery evidence direkod.':pass?'Bagus. Sistem akan menaikkan kesukaran sebelum mengesahkan mastery.':'Sistem akan menurunkan satu tahap jika perlu dan memberi latihan sasaran.'}</p><small>Adaptive difficulty · ${used.length} bentuk unik · tanpa hint</small>`;state.assessment.history.unshift({at:Date.now(),year:state.year,unit:state.unit,skill:s[0],correct,total:3,forms:[...used],pass,difficulty:level});state.assessment.history=state.assessment.history.slice(0,80);if(canMaster)addEvidence('independent');else if(!pass){let k=key(s);state.evidence[k]=state.evidence[k]||{guided:0,independent:0,mastery:0};state.evidence[k].mastery=Math.min(state.evidence[k].mastery,70);state.difficulty[diffKey(s)]=Math.max(1,level-1);save()}else{state.difficulty[diffKey(s)]=Math.min(4,level+1);save()}};
  const show=()=>{if(i>=3)return finish();let q=first[i]||adaptiveSelect(1,used)[0];if(!q)return finish();used.push(qid(q));b.innerHTML=`<small>MASTERY ${i+1}/3 · ${q.difficultyName||'Dinamik'} · TANPA HINT</small><h2>${q.q}</h2><div class="answers">${q.a.map((a,j)=>`<button data-v14m="${j}">${a}</button>`).join('')}</div>`;$$('[data-v14m]').forEach(btn=>btn.onclick=()=>{let ok=+btn.dataset.v14m===q.ok;recordDynamic(q,ok);if(ok)correct++;else recordMistake(`Mastery:${q.type||'adaptive'}`,q.q,q.a[q.ok],q.h||'Semak makna dan relevansi.');i++;show()})};show()};
 const oldProgress14=progress;progress=()=>{let html=oldProgress14(),d=window.skillDifficulty();return html.replace('</section></main>',`<article class="card"><h3>🎚️ Adaptive Difficulty</h3><p>Skill semasa: <b>${d.skill}</b> · Tahap disyorkan: <b>${d.level} — ${d.name}</b></p><div class="difficulty-ladder"><span class="${d.level===1?'on':''}">1 Asas</span><span class="${d.level===2?'on':''}">2 Aplikasi</span><span class="${d.level===3?'on':''}">3 Transfer</span><span class="${d.level===4?'on':''}">4 Independent</span></div><small>Kesukaran berubah berdasarkan mastery, independent evidence dan keputusan assessment terkini.</small></article></section></main>`)};
 const oldShell14=shell;shell=(c)=>oldShell14(c).replace('Bahasa AI v12.0','Bahasa AI v14.0').replace('Bahasa AI v13.0','Bahasa AI v14.0');
 save();render();
})();

/* ===== Bahasa AI v15: Error Taxonomy + Targeted Remediation Engine ===== */
(()=>{
 const V15_KEY='bahasaAIv15';
 if(!localStorage.getItem(V15_KEY)) localStorage.setItem(V15_KEY,localStorage.getItem('bahasaAIv14')||JSON.stringify(state));
 state.errorProfile=state.errorProfile||{}; state.remediationHistory=state.remediationHistory||[];
 save=()=>{localStorage.setItem(V15_KEY,JSON.stringify(state));localStorage.setItem('bahasaAIv14',JSON.stringify(state));};
 const TAX={
  meaning:{label:'Makna / Kosa Kata',icon:'🧠',teach:'Semak maksud kata dahulu, kemudian pilih perkataan yang sesuai dengan konteks.'},
  completeness:{label:'Ayat Tidak Lengkap',icon:'🧩',teach:'Cari siapa/apa, tindakan dan maklumat yang diperlukan supaya ayat lengkap.'},
  grammar:{label:'Tatabahasa',icon:'🔤',teach:'Kenal pasti fungsi kata dan hubungan antara perkataan sebelum membina ayat.'},
  semantic:{label:'Makna Tidak Munasabah',icon:'💡',teach:'Baca keseluruhan ayat dan tanya: adakah maksud ini masuk akal dalam dunia sebenar?'},
  relevance:{label:'Tidak Relevan / Lari Topik',icon:'🎯',teach:'Kekalkan fokus pada tajuk, situasi dan idea utama yang diminta.'},
  coherence:{label:'Idea Tidak Koheren',icon:'🔗',teach:'Susun idea utama → huraian → contoh dan gunakan hubungan yang jelas antara ayat.'},
  transfer:{label:'Transfer Lemah',icon:'🌱',teach:'Gunakan kemahiran yang sama dalam situasi baharu, bukan menghafal ayat contoh.'}
 };
 function classifyError(type,q='',answer='',hint=''){
  let t=`${type} ${q} ${answer} ${hint}`.toLowerCase();
  if(/kosa|perkataan|maksud|vocab|isi tempat/.test(t))return 'meaning';
  if(/grammar|tatabahasa|kata nama|kata kerja|kata adjektif|imbuhan|sendi|hubung/.test(t))return 'grammar';
  if(/susun|lengkap|frasa|ayat mudah/.test(t))return 'completeness';
  if(/transfer|situasi baharu|independent/.test(t))return 'transfer';
  if(/koheren|huraian|perenggan|idea sokongan|penanda wacana/.test(t))return 'coherence';
  if(/relevan|topik|fokus/.test(t))return 'relevance';
  return 'semantic';
 }
 function errorKey(skill=sk()[0]){return `${state.year}:${skill}`}
 function noteError(cat){let k=errorKey(),p=state.errorProfile[k]||{};p[cat]=(p[cat]||0)+1;p.last=Date.now();state.errorProfile[k]=p;save()}
 const prevMistake15=recordMistake;recordMistake=(type,q,answer,hint)=>{let cat=classifyError(type,q,answer,hint);noteError(cat);prevMistake15(type,q,answer,hint);let m=state.mistakes?.[0];if(m&&!m.errorCategory)m.errorCategory=cat;save()};
 function dominantError(s=sk()){let p=state.errorProfile[errorKey(s[0])]||{},entries=Object.entries(p).filter(([k])=>k!=='last').sort((a,b)=>b[1]-a[1]);return entries[0]?.[0]||null}
 function targetedQuestion(cat,s=sk()){
  let u=un(),d=window.BAHASA_CONTENT.get(state.year,state.unit,u),m=d.meta.model,c=d.meta.context,base={type:`remediation:${cat}`,category:cat};
  if(cat==='meaning')return {...base,q:`Pilih perkataan yang paling sesuai dengan maksud ayat: “${m}”`,a:[u.words?.[0]||c.value,'kerusi','awan','semalam'],ok:0,h:TAX.meaning.teach};
  if(cat==='completeness')return {...base,q:'Pilih ayat yang lengkap.',a:[m,`${c.people} ${c.verb}.`,'Kerana di sekolah.','Dan tetapi semua.'],ok:0,h:TAX.completeness.teach};
  if(cat==='grammar')return {...base,q:`Pilih ayat yang menggunakan bahasa paling tepat dalam konteks “${u.title}”.`,a:[m,`Kerana dan ${c.people}.`,`${c.people} sangat dengan ${c.verb}.`,`Di tetapi ${c.place}.`],ok:0,h:TAX.grammar.teach};
  if(cat==='relevance')return {...base,q:`Topik ialah “${u.title}”. Pilih ayat yang paling relevan.`,a:[m,'Saya suka warna biru.','Awan berada di langit.','Meja itu baharu.'],ok:0,h:TAX.relevance.teach};
  if(cat==='coherence')return {...base,q:'Pilih sambungan idea yang paling koheren.',a:[`${m} Oleh itu, amalan ini wajar diteruskan secara konsisten.`,`${m} Saya suka ais krim.`,`${m} Tetapi meja biru.`,`${m} Kerana dan semua.`],ok:0,h:TAX.coherence.teach};
  if(cat==='transfer')return {...base,q:`Gunakan idea unit ini dalam situasi baharu di sekolah. Pilih respons terbaik.`,a:[state.year<=2?`Murid ${c.verb} rakan di sekolah.`:`${c.value.charAt(0).toUpperCase()+c.value.slice(1)} boleh diamalkan di sekolah apabila murid ${c.verb} rakan secara konsisten.`,'Sekolah besar dan saya suka nasi.','Kerana tetapi meja.','Awan sangat rajin.'],ok:0,h:TAX.transfer.teach};
  return {...base,q:'Pilih ayat yang paling munasabah dan bermakna.',a:[m,`Meja ${c.verb} manusia dengan gembira.`,'Awan sangat sedap dimakan.','Kerana tetapi semua biru.'],ok:0,h:TAX.semantic.teach};
 }
 function errorProfileView(){let rows=skills().map(s=>{let p=state.errorProfile[errorKey(s[0])]||{},dom=dominantError(s),total=Object.entries(p).filter(([k])=>k!=='last').reduce((a,[,v])=>a+(Number(v)||0),0);return {s,p,dom,total}}).filter(x=>x.total).sort((a,b)=>b.total-a.total);return shell(`<section class="page narrow"><div class="center-title"><small>ERROR TAXONOMY</small><h1>🧬 Peta Kesilapan</h1><p>Sistem membezakan jenis kesilapan supaya pemulihan mengajar punca sebenar, bukan sekadar mengulang soalan.</p></div><div class="source-note">📌 Kategori ini ialah mekanisme diagnostik Bahasa AI, bukan kategori rasmi TP/PBD KPM.</div><div class="diagnostic-grid">${rows.length?rows.map(x=>{let t=TAX[x.dom];return card(`${x.s[2]} ${x.s[1]}`,`<div class="diag-band">${t.icon} ${t.label}</div><p><b>${x.total}</b> kesilapan diklasifikasikan.</p><p><b>Pemulihan:</b> ${t.teach}</p><button class="soft wide" data-remediate="${skills().indexOf(x.s)}">Latihan Sasaran →</button>`)}).join(''):`<article class="card"><h3>✨ Belum ada pola kesilapan</h3><p>Teruskan latihan. Peta akan terbina apabila sistem mempunyai bukti yang mencukupi.</p></article>`}</div></section>`)}
 function runTargetedRemediation(){let cat=dominantError()||'semantic',q=targetedQuestion(cat),b=$('#reviewBoard');if(!b){state.view='review';save();render();setTimeout(runTargetedRemediation,0);return}b.classList.remove('hidden');b.innerHTML=`<small>PEMULIHAN SASARAN · ${TAX[cat].icon} ${TAX[cat].label}</small><h2>${q.q}</h2><div class="answers">${q.a.map((a,j)=>`<button data-remq="${j}">${a}</button>`).join('')}</div><div id="remHint" class="activity-feedback"></div>`;$$('[data-remq]').forEach(btn=>btn.onclick=()=>{let ok=+btn.dataset.remq===q.ok;rememberItem(q.type,q.q,ok);state.remediationHistory.unshift({at:Date.now(),year:state.year,skill:sk()[0],category:cat,correct:ok});state.remediationHistory=state.remediationHistory.slice(0,100);if(ok){$('#remHint').innerHTML='✓ Bagus. Sekarang gunakan kemahiran ini pada soalan baharu tanpa petunjuk.';setTimeout(runMasteryTest,550)}else{$('#remHint').innerHTML=`🩺 ${q.h}`;noteError(cat)}save()})}
 const oldDiag15=diagnosticFor;diagnosticFor=(s)=>{let d=oldDiag15(s),cat=dominantError(s);if(cat){d.errorCategory=cat;d.cause=`${TAX[cat].icon} Pola utama: ${TAX[cat].label}. ${d.cause}`;d.action=TAX[cat].teach}return d};
 const oldNav15=nav;nav=()=>oldNav15().replace('<div class="student">',`<button data-view="errors" class="${state.view==='errors'?'active':''}">🧬 Kesilapan</button><div class="student">`);
 const oldRender15=render;render=()=>{if(state.view==='errors'){$('#app').innerHTML=errorProfileView();bind();$$('[data-remediate]').forEach(b=>b.onclick=()=>{state.skill=+b.dataset.remediate;let ui=units().findIndex(u=>u.focus===sk()[0]);if(ui>=0)state.unit=ui;state.view='review';save();render();setTimeout(runTargetedRemediation,0)});return}oldRender15();};
 const oldIntervention15=interventionView;interventionView=()=>{let html=oldIntervention15(),cat=dominantError();return cat?html.replace('</section></main>',`<article class="card"><h3>${TAX[cat].icon} Pemulihan Berdasarkan Punca</h3><p><b>${TAX[cat].label}</b></p><p>${TAX[cat].teach}</p><button class="green" id="targetRemediation">Buat Latihan Sasaran →</button></article></section></main>`):html};
 const oldBind15=bind;bind=()=>{oldBind15();$('#targetRemediation')?.addEventListener('click',runTargetedRemediation)};
 const oldShell15=shell;shell=(c)=>oldShell15(c).replace(/Bahasa AI v14\.0/g,'Bahasa AI v15.0');
 window.BAHASA_ERROR_TAXONOMY=TAX; window.runTargetedRemediation=runTargetedRemediation;
 save();render();
})();

/* ===== Bahasa AI v16: Open-Response Meaning-First Coach ===== */
(()=>{
 const V16_KEY='bahasaAIv16';
 if(!localStorage.getItem(V16_KEY)) localStorage.setItem(V16_KEY,localStorage.getItem('bahasaAIv15')||JSON.stringify(state));
 state.openResponses=state.openResponses||[]; state.openRetry=state.openRetry||{};
 save=()=>{localStorage.setItem(V16_KEY,JSON.stringify(state));localStorage.setItem('bahasaAIv15',JSON.stringify(state));};
 const norm=t=>String(t||'').toLowerCase().replace(/[^a-zà-ž0-9\s]/gi,' ').replace(/\s+/g,' ').trim();
 const words=t=>norm(t).split(' ').filter(Boolean);
 function analyseOpen(text){
  const y=state.year,u=un(),t=norm(text),ws=words(text),issues=[],topic=[...u.words,...norm(u.title).split(' ')].filter(x=>String(x).length>2).map(norm);
  const impossible=[/awan (?:makan|memakan)/,/meja (?:berlari|makan|ketawa)/,/kerusi (?:minum|makan|berlari)/,/rasa masin.*(?:orang|kelas)/,/gila bodoh/,/dan kelas\b/,/kerana tetapi/,/tetapi dan/];
  if(impossible.some(r=>r.test(t))) issues.push({cat:'semantic',priority:1,msg:'Maksud ayat belum munasabah. Semak siapa/apa yang melakukan tindakan dan sama ada gabungan idea itu masuk akal.'});
  let sentences=String(text).split(/[.!?]+/).map(x=>x.trim()).filter(Boolean);
  if(ws.length<Math.max(4,writingPlan(y).min*.45)||sentences.some(s=>words(s).length<3)) issues.push({cat:'completeness',priority:2,msg:'Jawapan masih terlalu pendek atau ada ayat yang belum lengkap. Lengkapkan siapa/apa + tindakan + maklumat.'});
  const hit=topic.some(k=>k&&t.includes(k));
  if(!hit && ws.length>=6) issues.push({cat:'relevance',priority:3,msg:`Pastikan jawapan kekal berkaitan dengan tajuk “${u.title}”.`});
  if(y>=3 && sentences.length>=2 && !/(dan|kemudian|selain itu|oleh itu|kerana|supaya|namun|seterusnya|contohnya|akhirnya)/.test(t)) issues.push({cat:'coherence',priority:4,msg:'Idea sudah ada, tetapi hubungan antara ayat belum jelas. Tambah hubungan idea seperti sebab, urutan, huraian atau contoh.'});
  if(/\b(saya|dia|mereka|kami|kita)\s+(adalah|ialah)\s+(pergi|makan|bermain|menjaga)\b/.test(t)||/\bdi\s+(makan|menjaga|membaca)\b/.test(t)) issues.push({cat:'grammar',priority:5,msg:'Semak bentuk dan fungsi kata dalam ayat. Betulkan bahasa selepas maksud dan isi sudah tepat.'});
  let primary=issues.sort((a,b)=>a.priority-b.priority)[0]||null;
  let min=writingPlan(y).min,meaningOK=!issues.some(x=>x.cat==='semantic'),relevant=!issues.some(x=>x.cat==='relevance'),complete=!issues.some(x=>x.cat==='completeness');
  let independentReady=ws.length>=min&&meaningOK&&relevant&&complete&&!issues.some(x=>x.cat==='coherence');
  return {wordCount:ws.length,meaningOK,relevant,complete,issues,primary,independentReady};
 }
 function coachHTML(a){
  if(a.independentReady)return `<div class="open-good"><b>⭐ Cuba Sendiri berjaya</b><p>Jawapan bermakna, berkaitan dan cukup lengkap untuk bukti independent pada tahap ini.</p></div>`;
  let p=a.primary||{cat:'transfer',msg:'Cuba gunakan kemahiran ini dengan lebih jelas dalam konteks baharu.'},tax=window.BAHASA_ERROR_TAXONOMY?.[p.cat];
  return `<div class="open-coach"><b>${tax?.icon||'👩🏻‍🏫'} Cikgu Aira — satu fokus dahulu</b><p>${p.msg}</p><small>Urutan semakan: Makna → Skill sasaran → Kesesuaian → Bahasa → Independence. Bahagian yang sudah betul dikekalkan.</small></div>`;
 }
 function handleOpenSubmit(e){
  const btn=e.target.closest?.('#submitWriting'); if(!btn)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  const wt=$('#writingText'),fb=$('#writingFeedback'); if(!wt||!fb)return;
  const text=wt.value.trim(),a=analyseOpen(text),rk=`${state.year}:${un().id}`,attempt=(state.openRetry[rk]||0)+1;state.openRetry[rk]=attempt;
  state.drafts[un().id]=text;state.openResponses.unshift({at:Date.now(),year:state.year,unit:un().id,skill:sk()[0],attempt,analysis:a,text:text.slice(0,1200)});state.openResponses=state.openResponses.slice(0,120);
  if(a.primary){noteError(a.primary.cat);state.remediationHistory.unshift({at:Date.now(),year:state.year,skill:sk()[0],category:a.primary.cat,source:'open-response',correct:false});}
  if(a.independentReady){addEvidence('independent');state.openRetry[rk]=0;fb.innerHTML=coachHTML(a)+`<p class="open-meta">${a.wordCount} perkataan · Independent evidence direkod.</p>`;}
  else {fb.innerHTML=coachHTML(a)+`<p class="open-meta">Percubaan ${attempt} · ${a.wordCount} perkataan · Belum direkod sebagai mastery.</p><button class="soft" id="openRetryBtn">Baiki jawapan yang sama →</button>`;}
  save();
  $('#openRetryBtn')?.addEventListener('click',()=>{wt.focus();wt.scrollIntoView({behavior:'smooth',block:'center'})});
 }
 document.addEventListener('click',handleOpenSubmit,true);
 const oldProgress16=progress;progress=()=>{let html=oldProgress16(),r=state.openResponses.filter(x=>x.year===state.year),ok=r.filter(x=>x.analysis?.independentReady).length;return html.replace('</section></main>',`<article class="card"><h3>✍️ Open Response Evidence</h3><p><b>${r.length}</b> respons dianalisis · <b>${ok}</b> memenuhi bukti independent.</p><small>Semakan mengutamakan makna dan kesesuaian sebelum bahasa. Ini ialah enjin formatif Bahasa AI, bukan pemarkahan rasmi KPM.</small></article></section></main>`)};
 const oldShell16=shell;shell=(c)=>oldShell16(c).replace(/Bahasa AI v15\.0/g,'Bahasa AI v16.0');
 window.BAHASA_OPEN_RESPONSE={analyse:analyseOpen,version:'16.0.0'};
 save();render();
})();

/* ===== Bahasa AI ULTIMATE v20: Graduation + Safe Semantic Boundary + Portfolio ===== */
state.portfolio=state.portfolio||[]; state.semanticAudit=state.semanticAudit||[]; state.graduation=state.graduation||{};
function ultimateBand(s){const k=`${state.year}:${s[0]}`,e=state.evidence[k]||{},m=e.mastery||0,iv=e.independent||0; if(m>=90&&iv>=2)return 'Kukuh'; if(m>=80&&iv>=1)return 'Dikuasai'; if(m>=60)return 'Hampir Kuasai'; if(m>=40)return 'Sedang Belajar'; return 'Perlu Bimbingan'}
function canGraduateYear(){return skills().every(s=>score(`${state.year}:${s[0]}`)>=80&&ind(`${state.year}:${s[0]}`)>=1)}
function portfolioView(){let rows=state.portfolio.filter(x=>x.year===state.year).slice().reverse();return shell(`<section class="page narrow"><div class="center-title"><small>PORTFOLIO PEMBELAJARAN</small><h1>🎓 Bukti Penguasaan Tahun ${state.year}</h1><p>Mastery datang daripada bukti independent, bukan XP atau latihan berpandu sahaja.</p></div><div class="progress-grid">${card('Status Tahun',`<div class="big-number">${canGraduateYear()?'🏆':'🌱'}</div><h2>${canGraduateYear()?'Sedia Graduasi Dalaman':'Masih Membina Penguasaan'}</h2><p>${skills().filter(s=>score(`${state.year}:${s[0]}`)>=80&&ind(`${state.year}:${s[0]}`)>=1).length}/${skills().length} skill memenuhi bukti independent.</p>`)}${card('Skill Evidence',skills().map(s=>`<div class="unit-row"><span>${s[2]}</span><b>${s[1]}<small>${ultimateBand(s)} · Mastery ${score(`${state.year}:${s[0]}`)}% · Independent ${ind(`${state.year}:${s[0]}`)}</small></b></div>`).join(''))}${card('Hasil Penulisan',rows.length?rows.map(x=>`<div class="unit-row"><span>📝</span><b>${x.title}<small>${new Date(x.ts).toLocaleDateString()} · ${x.words} perkataan · ${x.status}</small></b></div>`).join(''):'<p>Belum ada hasil independent yang lulus readiness check.</p>')}${card('Data & Privasi',`<p>Versi ini menyimpan progress pada peranti. AI bukan autoriti curriculum atau mastery.</p><button class="soft wide" id="exportProgress">Eksport Progress JSON</button>`)}</div></section>`)}
function addPortfolio(text,result){let u=un();state.portfolio.push({id:Date.now(),year:state.year,unit:u.id,title:u.title,skill:sk()[0],words:(text.trim().match(/\S+/g)||[]).length,status:result.ok?'Independent evidence':'Needs revision',ts:Date.now()});state.portfolio=state.portfolio.slice(-120);save()}
function exportProgress(){let data={product:'Bahasa AI ULTIMATE',version:'20.0.0',exportedAt:new Date().toISOString(),year:state.year,stream:state.stream,xp:state.xp,mastery:mastery(),evidence:state.evidence,mistakes:state.mistakes,portfolio:state.portfolio};let blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`bahasa-ai-progress-tahun-${state.year}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
const _ultimateNav=nav; nav=function(){return _ultimateNav().replace('<div class="student">',`<button data-view="portfolio" class="${state.view==='portfolio'?'active':''}">🎓 Portfolio</button><div class="student">`)};
const _ultimateRender=render; render=function(){if(state.view==='portfolio'){$('#app').innerHTML=portfolioView();bind();$('#exportProgress')?.addEventListener('click',exportProgress);return}_ultimateRender();};
// Capture successful open-response submissions into the portfolio without changing the meaning-first gate.
document.addEventListener('click',e=>{if(!e.target.closest?.('#submitWriting'))return;setTimeout(()=>{let wt=$('#writingText');if(!wt)return;let r=typeof analyzeOpenResponse==='function'?analyzeOpenResponse(wt.value,state.year,un()):null;if(r?.ok){let last=state.portfolio[state.portfolio.length-1];if(!last||last.unit!==un().id||last.textHash!==wt.value.length){addPortfolio(wt.value,r);state.portfolio[state.portfolio.length-1].textHash=wt.value.length;save()}}},50)},true);

/* ===== Bahasa AI ULTIMATE v21: Safe Open-Response Transfer + Teacher Snapshot ===== */
(()=>{
 const V21_KEY='bahasaAIUltimateV21';
 if(!localStorage.getItem(V21_KEY)) localStorage.setItem(V21_KEY,localStorage.getItem('bahasaAIUltimateV20')||JSON.stringify(state));
 state.openTransfer=state.openTransfer||{}; state.teacherNotes=state.teacherNotes||{};
 save=()=>{localStorage.setItem(V21_KEY,JSON.stringify(state));localStorage.setItem('bahasaAIUltimateV20',JSON.stringify(state));};
 const baseAnalyse=window.BAHASA_OPEN_RESPONSE?.analyse;
 const creativeSignals=/\b(seolah-olah|bagai|seperti|ibarat|walaupun|namun|tiba-tiba|tanpa diduga|pada pendapat saya)\b/i;
 function safeAnalyse(text){
   let a=baseAnalyse?baseAnalyse(text):{issues:[],independentReady:false,wordCount:String(text).trim().split(/\s+/).filter(Boolean).length};
   const raw=String(text||'').trim(), ambiguous=[];
   // Never reject unusual/creative language merely because it is uncommon.
   if(creativeSignals.test(raw) && a.primary?.cat==='semantic'){
     ambiguous.push(a.primary); a.issues=a.issues.filter(x=>x!==a.primary); a.primary=a.issues.sort((x,y)=>x.priority-y.priority)[0]||null;
   }
   const severe=a.issues?.some(x=>['semantic','relevance','completeness'].includes(x.cat));
   const languageOnly=a.issues?.length>0 && a.issues.every(x=>['grammar','coherence'].includes(x.cat));
   const decision=severe?'coach':ambiguous.length?'needs_review':(a.independentReady||languageOnly?'accept':'coach');
   return {...a,ambiguous,decision};
 }
 function transferPrompt(){let u=un(),y=state.year;return y<=2?`Tulis ayat baharu tentang “${u.words[1]||u.title}”. Jangan salin ayat tadi.`:y<=4?`Gunakan kemahiran yang sama dalam situasi baharu berkaitan “${u.theme[0]}”. Tulis dengan idea kamu sendiri.`:`Tulis respons baharu yang menggunakan kemahiran ini dalam konteks lain. Pastikan idea, huraian dan hubungan idea datang daripada kamu sendiri.`}
 function v21Coach(a){
   if(a.decision==='needs_review')return `<div class="open-coach safe-uncertain"><b>🟣 Jawapan kreatif / tidak biasa</b><p>Cikgu Aira tidak akan terus menandakan jawapan ini salah. Semak maksud dan kesesuaiannya dengan konteks, kemudian cuba jelaskan idea dengan lebih terang.</p><small>Uncertainty guard: unusual ≠ wrong.</small></div>`;
   if(a.decision==='accept' && !a.issues?.length)return `<div class="open-good"><b>✅ Maksud dan tugasan sesuai</b><p>Sekarang buktikan kemahiran yang sama dalam konteks baharu.</p></div>`;
   let p=a.primary;return `<div class="open-coach"><b>👩🏻‍🏫 Satu fokus dahulu</b><p>${p?.msg||'Jelaskan maksud dan lengkapkan respons sebelum meneruskan.'}</p><small>Makna → Skill sasaran → Kesesuaian → Bahasa → Independence</small></div>`;
 }
 function intercept(e){
   const b=e.target.closest?.('#submitWriting'); if(!b)return;
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
   const wt=$('#writingText'),fb=$('#writingFeedback');if(!wt||!fb)return;
   const text=wt.value.trim(),a=safeAnalyse(text),rk=`${state.year}:${un().id}`,stage=state.openTransfer[rk]?.stage||'base';
   state.drafts[un().id]=text;
   if(stage==='base'){
     if(a.decision==='accept'){
       state.openTransfer[rk]={stage:'transfer',base:text,baseAt:Date.now()};
       fb.innerHTML=v21Coach(a)+`<div class="transfer-box"><b>⭐ Transfer Challenge</b><p>${transferPrompt()}</p><button class="green" id="beginTransfer">Tulis jawapan baharu →</button></div>`;
       $('#beginTransfer')?.addEventListener('click',()=>{wt.value='';wt.placeholder='Tulis jawapan baharu tanpa menyalin jawapan pertama...';wt.focus();});
     } else {
       if(a.primary) noteError(a.primary.cat);
       fb.innerHTML=v21Coach(a)+`<p class="open-meta">Belum masuk Independent Mastery. Baiki bahagian utama sahaja; bahagian yang betul dikekalkan.</p>`;
     }
   } else {
     const base=state.openTransfer[rk].base||'', same=base.toLowerCase().replace(/\W/g,'')===text.toLowerCase().replace(/\W/g,'');
     if(same){fb.innerHTML=`<div class="open-coach"><b>🔄 Ini masih jawapan yang sama</b><p>Independent mastery memerlukan konteks baharu, bukan menghafal atau menyalin.</p></div>`;return;}
     if(a.decision==='accept' && a.wordCount>=Math.max(4,writingPlan(state.year).min*.7)){
       addEvidence('independent'); state.openTransfer[rk]={stage:'done',base,transfer:text,doneAt:Date.now()};
       state.portfolio.unshift({at:Date.now(),year:state.year,unit:un().id,skill:sk()[0],type:'open-transfer',text:text.slice(0,800)});state.portfolio=state.portfolio.slice(0,100);
       fb.innerHTML=`<div class="open-good"><b>🏆 Independent Transfer berjaya</b><p>Kemahiran digunakan dalam konteks baharu tanpa menyalin jawapan pertama. Bukti mastery direkod.</p></div>`;
     }else{if(a.primary)noteError(a.primary.cat);fb.innerHTML=v21Coach(a)+`<p class="open-meta">Transfer belum cukup kukuh. Cuba baiki respons baharu ini.</p>`;}
   }
   state.openResponses.unshift({at:Date.now(),year:state.year,unit:un().id,skill:sk()[0],analysis:a,text:text.slice(0,1200),v21:true});state.openResponses=state.openResponses.slice(0,150);save();
 }
 document.addEventListener('click',intercept,true);
 const oldNav=nav; nav=()=>oldNav().replace('<div class="student">',`<button data-view="teacher" class="${state.view==='teacher'?'active':''}">📋 Laporan</button><div class="student">`);
 function teacherView(){let ss=skills(),rows=ss.map(s=>{let k=`${state.year}:${s[0]}`,d=typeof diagnosticFor==='function'?diagnosticFor(s):null;return `<tr><td>${s[2]} ${s[1]}</td><td>${score(k)}%</td><td>${ind(k)}</td><td>${d?.errorCategory?window.BAHASA_ERROR_TAXONOMY?.[d.errorCategory]?.label||d.errorCategory:'—'}</td><td>${ultimateBand(s)}</td></tr>`}).join('');return shell(`<section class="page narrow"><div class="center-title"><small>TEACHER / PARENT SNAPSHOT</small><h1>📋 Laporan Pembelajaran · Tahun ${state.year}</h1><p>Ringkasan formatif Bahasa AI. Bukan laporan rasmi PBD/TP KPM.</p></div><article class="card report-card"><div class="report-kpis"><span><b>${mastery()}%</b>My Mastery</span><span><b>${ss.filter(s=>ind(`${state.year}:${s[0]}`)>0).length}/${ss.length}</b>Independent Evidence</span><span><b>${state.mistakes.filter(x=>x.year===state.year).length}</b>Kesilapan direkod</span></div><div class="table-wrap"><table><thead><tr><th>Skill</th><th>Mastery</th><th>Independent</th><th>Pola Utama</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div><p class="source-note">Gunakan laporan ini untuk melihat pola pembelajaran dan menentukan latihan seterusnya. Jangan samakan band dalaman Bahasa AI dengan Tahap Penguasaan rasmi sekolah.</p></article></section>`)}
 const oldRender=render;render=()=>{if(state.view==='teacher'){$('#app').innerHTML=teacherView();bind();return}oldRender();};
 const oldShell=shell;shell=(c)=>oldShell(c).replace(/Bahasa AI ULTIMATE v20\.0|Bahasa AI v16\.0|Bahasa AI v15\.0/g,'Bahasa AI ULTIMATE v21.0');
 window.BAHASA_OPEN_RESPONSE_V21={analyse:safeAnalyse,version:'21.0.0',principle:'Meaning → Skill Target → Appropriateness → Language → Independence'};
 save();render();
})();

/* ===== Bahasa AI ULTIMATE v22: Content Depth UI + Unit Check ===== */
(()=>{
 const prevLearn=learn;
 function depthBlock(){let u=un(),p=window.BAHASA_CONTENT?.unitPack?.(state.year,state.unit,u);if(!p)return'';return `<article class="card depth-card"><div class="depth-head"><div><small>UNIT CONTENT PACK · ORIGINAL</small><h2>📚 Baca, Faham & Gunakan</h2></div><span>${p.vocab.length} kosa kata · ${p.comprehension.length} soalan</span></div><div class="reading-passage"><b>📖 Petikan Ringkas</b><p>${p.passage}</p></div><h3>🌱 Kosa Kata Unit</h3><div class="vocab-depth">${p.vocab.map(v=>`<button class="vocab-tile" data-vword="${v.word}"><b>${v.word}</b><small>${v.meaning}</small></button>`).join('')}</div><h3>✨ Bank Ayat</h3><div class="sentence-bank">${p.sentenceBank.map((s,i)=>`<div><span>${i+1}</span>${s}</div>`).join('')}</div><h3>🔗 Penanda / Penghubung Tahap Ini</h3><div class="word-chips">${p.connectors.map(x=>`<span>${x}</span>`).join('')}</div><button class="green wide" id="unitCheck">Semak Pemahaman Unit →</button><div id="unitCheckBoard"></div><p class="source-note">Petikan dan soalan ini ialah kandungan asli Bahasa AI yang dipadankan dengan tema/skill aplikasi; bukan salinan buku teks.</p></article>`}
 learn=function(){let html=prevLearn();return html.replace('</section></main>',depthBlock()+'</section></main>')};
 function runUnitCheck(){let u=un(),p=window.BAHASA_CONTENT.unitPack(state.year,state.unit,u),idx=0,correct=0,board=$('#unitCheckBoard');function show(){let q=p.comprehension[idx];if(!q){board.innerHTML=`<div class="unit-result"><b>⭐ ${correct}/${p.comprehension.length} tepat</b><p>${correct===p.comprehension.length?'Pemahaman kukuh. Teruskan kepada aplikasi dan transfer.':'Semak semula petikan dan cuba aktiviti sasaran sebelum Mastery Test.'}</p></div>`;if(correct===p.comprehension.length)addEvidence('guided');return}board.innerHTML=`<div class="unit-check"><small>PEMAHAMAN ${idx+1}/${p.comprehension.length}</small><h3>${q.q}</h3><div class="answers">${q.a.map((a,i)=>`<button data-unit-answer="${i}">${a}</button>`).join('')}</div><div id="unitCheckFeedback"></div></div>`;$$('[data-unit-answer]').forEach(b=>b.onclick=()=>{let ok=+b.dataset.unitAnswer===q.ok;if(ok){correct++;b.classList.add('correct');$('#unitCheckFeedback').innerHTML='<div class="good">Betul. Cari bukti makna dalam petikan.</div>';setTimeout(()=>{idx++;show()},350)}else{b.classList.add('wrong');$('#unitCheckFeedback').innerHTML='<div class="retry">Belum tepat. Baca petikan semula dan cari idea yang benar-benar berkaitan.</div>';}})}show()}
 const oldRender=render;render=function(){oldRender();if(state.view==='learn'){$('#unitCheck')?.addEventListener('click',runUnitCheck);$$('[data-vword]').forEach(b=>b.onclick=()=>b.classList.toggle('open'))}};
 window.BAHASA_UNIT_CONTENT_V22={version:'22.0.0',unitPacks:144,principle:'Read → Understand → Vocabulary → Sentence Model → Comprehension → Application → Transfer'};
})();

/* ===== Bahasa AI ULTIMATE v23: Complete 7-Station Unit Lesson ===== */
(()=>{
 const V23='bahasaAIUltimateV23';
 if(!localStorage.getItem(V23))localStorage.setItem(V23,localStorage.getItem('bahasaAIUltimateV22')||localStorage.getItem('bahasaAIv16')||JSON.stringify(state));
 state.lessonProgress=state.lessonProgress||{};
 const oldSave=save; save=()=>{oldSave();localStorage.setItem(V23,JSON.stringify(state));};
 function lessonKey(){return `${state.year}:${un().id}`}
 function lessonProgress(){let k=lessonKey();return state.lessonProgress[k]||(state.lessonProgress[k]={stations:{},updated:Date.now()})}
 function markStation(n){let p=lessonProgress();p.stations[n]=true;p.updated=Date.now();save()}
 function lessonView(){let u=un(),p=window.BAHASA_CONTENT.lessonPack(state.year,state.unit,u),lp=lessonProgress(),done=Object.keys(lp.stations).length;
  const station=(n,icon,title,body,action='Selesai & Teruskan')=>`<article class="card lesson-station ${lp.stations[n]?'station-done':''}"><div class="station-title"><span>${icon}</span><div><small>STESEN ${n}/7</small><h2>${title}</h2></div>${lp.stations[n]?'<b class="done-badge">✓ Selesai</b>':''}</div>${body}<button class="soft wide" data-station-done="${n}">${action}</button></article>`;
  return shell(`<section class="page narrow"><div class="center-title"><small>COMPLETE UNIT LESSON · TAHUN ${state.year}</small><h1>🎒 ${u.title}</h1><p>${u.theme[1]} ${u.theme[0]} · ${sk()[2]} ${sk()[1]}</p></div><div class="lesson-progress"><b>${done}/7 stesen</b><div><i style="width:${done/7*100}%"></i></div><span>Guided completion tidak sama dengan Independent Mastery.</span></div><div class="lesson-stack">
  ${station(1,'📖','Baca & Faham',`<div class="reading-passage"><p>${p.passage}</p></div><p><b>Fokus:</b> cari idea utama dan bukti yang berkaitan dengan tajuk.</p>`)}
  ${station(2,'🌱','Kosa Kata',`<div class="vocab-depth">${p.vocab.map(v=>`<div class="vocab-tile open"><b>${v.word}</b><small>${v.meaning}</small><em>${v.example}</em></div>`).join('')}</div>`)}
  ${station(3,'⚙️','Tatabahasa',`<div class="teaching-note"><b>${p.grammar.focus}</b><p>${p.grammar.teach}</p><blockquote>${p.grammar.model}</blockquote><p>🎯 ${p.grammar.task}</p></div>`)}
  ${station(4,'🧱','Bina Ayat',`<div class="ladder-list">${p.sentenceBuild.map(x=>`<div><b>L${x.level} · ${x.label}</b><span>${x.prompt}</span>${x.model?`<small>Model: ${x.model}</small>`:'<small>Tanpa model — cuba sendiri.</small>'}</div>`).join('')}</div>`)}
  ${station(5,'🔎','Pemahaman',`<p>Gunakan 3 soalan pemahaman unit. Jawapan penuh memberi Guided Evidence sahaja.</p><button class="green wide" id="lessonComprehension">Mulakan 3 Soalan →</button><div id="lessonCheckBoard"></div>`,'Tandakan Stesen Selesai')}
  ${station(6,'✏️','Penulisan',`<div class="writing-brief"><b>${p.writing.prompt}</b><div class="word-chips">${p.writing.checklist.map(x=>`<span>✓ ${x}</span>`).join('')}</div><p>Gunakan Writing Studio untuk Meaning-first coaching dan Transfer Challenge.</p></div><button class="green wide" id="goWritingStudio">Buka Writing Studio →</button>`,'Tandakan Stesen Selesai')}
  ${station(7,'🏆','Mastery',`<p>Mastery memerlukan bukti baharu tanpa hint. Guided completion sahaja tidak mencukupi.</p><button class="green wide" id="lessonMastery">Mulakan Mastery Test →</button>`,'Tandakan selepas Mastery')}
  </div><p class="source-note">Semua petikan, contoh dan latihan dalam lesson pack ini ialah kandungan asli Bahasa AI. Penjajaran kurikulum tidak bermaksud salinan buku teks atau dakwaan SK/SP yang belum disahkan.</p></section>`)}
 const oldNav=nav;nav=()=>oldNav().replace('<div class="student">',`<button data-view="lesson" class="${state.view==='lesson'?'active':''}">🎒 Pelajaran</button><div class="student">`);
 function runLessonCheck(){let u=un(),p=window.BAHASA_CONTENT.lessonPack(state.year,state.unit,u),idx=0,correct=0,b=$('#lessonCheckBoard');function show(){let q=p.comprehension[idx];if(!q){b.innerHTML=`<div class="unit-result"><b>${correct}/3 tepat</b><p>${correct===3?'Pemahaman kukuh. Guided Evidence direkod.':'Baca petikan semula sebelum mencuba lagi.'}</p></div>`;if(correct===3){addEvidence('guided');markStation(5)}return}b.innerHTML=`<div class="unit-check"><small>SOALAN ${idx+1}/3</small><h3>${q.q}</h3><div class="answers">${q.a.map((a,j)=>`<button data-lcheck="${j}">${a}</button>`).join('')}</div></div>`;$$('[data-lcheck]').forEach(x=>x.onclick=()=>{if(+x.dataset.lcheck===q.ok){correct++;idx++;show()}else{x.classList.add('wrong')}})}show()}
 const oldRender=render;render=()=>{if(state.view==='lesson'){$('#app').innerHTML=lessonView();bind();$$('[data-station-done]').forEach(b=>b.onclick=()=>{markStation(+b.dataset.stationDone);render()});$('#lessonComprehension')?.addEventListener('click',runLessonCheck);$('#goWritingStudio')?.addEventListener('click',()=>{markStation(6);state.view='writing';save();render()});$('#lessonMastery')?.addEventListener('click',()=>{state.view='review';save();render();setTimeout(runMasteryTest,0)});return}oldRender()};
 const oldShell=shell;shell=c=>oldShell(c).replace(/Bahasa AI ULTIMATE v22\.0|Bahasa AI ULTIMATE v21\.0|Bahasa AI ULTIMATE v20\.0/g,'Bahasa AI ULTIMATE v23.0');
 window.BAHASA_LESSON_V23={version:'23.0.0',stations:7,units:144};save();render();
})();

/* ===== Bahasa AI ULTIMATE v24: Practice Depth & Lesson Evidence ===== */
(()=>{
 const V24='bahasaAIUltimateV24';
 if(!localStorage.getItem(V24))localStorage.setItem(V24,localStorage.getItem('bahasaAIUltimateV23')||JSON.stringify(state));
 state.lessonEvidence=state.lessonEvidence||{};
 const prevSave=save; save=()=>{prevSave();localStorage.setItem(V24,JSON.stringify(state));};
 function evKey(){return `${state.year}:${un().id}`}
 function evidence(){return state.lessonEvidence[evKey()]||(state.lessonEvidence[evKey()]={attempts:0,correct:0,domains:{},updated:Date.now()})}
 function recordDomain(domain,correct){let e=evidence();e.attempts++;if(correct)e.correct++;e.domains[domain]=e.domains[domain]||{attempts:0,correct:0};e.domains[domain].attempts++;if(correct)e.domains[domain].correct++;e.updated=Date.now();save()}
 function depthView(){let u=un(),p=window.BAHASA_CONTENT.practicePack(state.year,state.unit,u),e=evidence();let domains=[['vocab','🌱','Kosa Kata',p.vocab],['grammar','⚙️','Tatabahasa',p.grammar],['reading','📖','Pemahaman',p.reading],['sentence','🧱','Bina Ayat',p.sentence],['transfer','⭐','Transfer',p.transfer]];return shell(`<section class="page narrow"><div class="center-title"><small>PRACTICE DEPTH · TAHUN ${state.year}</small><h1>🧪 ${u.title}</h1><p>Latihan berlapis mengikut domain. Item guided tidak memberi Independent Mastery.</p></div><div class="card"><div class="lesson-progress"><b>${e.correct}/${e.attempts||0} tepat</b><div><i style="width:${e.attempts?e.correct/e.attempts*100:0}%"></i></div><span>Rekod ini ialah bukti latihan dalaman Bahasa AI.</span></div></div><div class="lesson-stack">${domains.map(([k,ic,t,arr])=>{let x=e.domains[k]||{attempts:0,correct:0};return `<article class="card lesson-station"><div class="station-title"><span>${ic}</span><div><small>${arr.length} ITEM · ${x.correct}/${x.attempts} TEPAT</small><h2>${t}</h2></div></div><p>${k==='transfer'?'Gunakan konteks baharu tanpa menyalin model.':'Soalan berubah mengikut kandungan unit dan kemahiran.'}</p><button class="green wide" data-depth="${k}">Mulakan ${t} →</button><div id="depth-${k}"></div></article>`}).join('')}</div></section>`)}
 function runDepth(domain){let u=un(),pack=window.BAHASA_CONTENT.practicePack(state.year,state.unit,u),items=pack[domain],idx=0,b=$(`#depth-${domain}`);function show(){let q=items[idx];if(!q){b.innerHTML='<div class="unit-result"><b>Sesi selesai</b><p>Gunakan keputusan ini untuk memilih latihan seterusnya. Transfer kekal sebagai bukti berasingan.</p></div>';return}let opts=q.opts||[];b.innerHTML=`<div class="unit-check"><small>${domain.toUpperCase()} · ${idx+1}/${items.length}</small><h3>${q.prompt}</h3>${opts.length?`<div class="answers">${opts.map((a,j)=>`<button data-depth-answer="${j}">${a}</button>`).join('')}</div>`:`<textarea id="depthText" placeholder="Tulis jawapan sendiri..."></textarea><button class="green" id="depthSubmit">Hantar</button>`}<div class="activity-feedback" id="depthFeedback"></div></div>`;if(opts.length){$$('[data-depth-answer]').forEach(x=>x.onclick=()=>{let ok=+x.dataset.depthAnswer===+q.answer;recordDomain(domain,ok);if(ok){idx++;show()}else{$('#depthFeedback').textContent=q.hint||'Cuba lagi dengan konteks baharu.';x.classList.add('wrong')}})}else{$('#depthSubmit').onclick=()=>{let txt=($('#depthText').value||'').trim();if(txt.split(/\s+/).filter(Boolean).length<3){$('#depthFeedback').textContent='Bina respons yang lengkap dahulu.';recordDomain(domain,false);return}recordDomain(domain,true);if(domain!=='transfer')addEvidence('guided');idx++;show()}}}show()}
 const prevNav=nav;nav=()=>prevNav().replace('<div class="student">',`<button data-view="depth" class="${state.view==='depth'?'active':''}">🧪 Latihan+</button><div class="student">`);
 const prevRender=render;render=()=>{if(state.view==='depth'){$('#app').innerHTML=depthView();bind();$$('[data-depth]').forEach(b=>b.onclick=()=>runDepth(b.dataset.depth));return}prevRender()};
 const prevShell=shell;shell=c=>prevShell(c).replace(/Bahasa AI ULTIMATE v23\.0/g,'Bahasa AI ULTIMATE v24.0');
 window.BAHASA_PRACTICE_V24={version:'24.0.0',domains:5,principle:'Vocabulary → Grammar → Reading → Sentence → Transfer'};save();render();
})();

/* ===== Bahasa AI ULTIMATE v25: Adaptive Learning Orchestrator ===== */
(()=>{
 const V25='bahasaAIUltimateV25';
 if(!localStorage.getItem(V25)) localStorage.setItem(V25,localStorage.getItem('bahasaAIUltimateV24')||JSON.stringify(state));
 state.adaptivePlan=state.adaptivePlan||{};
 state.adaptiveHistory=state.adaptiveHistory||[];
 const oldSave25=save; save=()=>{oldSave25();localStorage.setItem(V25,JSON.stringify(state));};
 const DOMAIN_META={vocab:['🌱','Kosa Kata'],grammar:['⚙️','Tatabahasa'],reading:['📖','Pemahaman'],sentence:['🧱','Bina Ayat'],transfer:['⭐','Transfer']};
 function currentEvidence(){let k=`${state.year}:${un().id}`;return state.lessonEvidence?.[k]||{attempts:0,correct:0,domains:{}}}
 function domainRate(k){let d=currentEvidence().domains?.[k]||{attempts:0,correct:0};return d.attempts?Math.round(d.correct/d.attempts*100):null}
 function domainNeed(k){let r=domainRate(k),d=currentEvidence().domains?.[k]||{attempts:0};if(!d.attempts)return 70;if(r<50)return 100;if(r<70)return 85;if(r<85)return 55;return 20}
 function prereqGap(){let s=sk();return s.find(x=>!unlocked(x))||null}
 function chooseNext(){
   let gap=prereqGap(); if(gap)return {mode:'foundation',domain:'vocab',title:'Pulihkan asas dahulu',reason:`Prasyarat ${gap[1]} belum cukup kukuh.`,action:'depth'};
   let domains=Object.keys(DOMAIN_META), ranked=domains.map(k=>[k,domainNeed(k)]).sort((a,b)=>b[1]-a[1]);
   let [weak,n]=ranked[0],e=currentEvidence(),m=mastery(),independent=ind(`${state.year}:${sk()[0]}`);
   if(e.attempts<5)return {mode:'current',domain:weak,title:'Teruskan kandungan semasa',reason:'Bukti latihan unit ini masih belum mencukupi untuk membuat keputusan yang stabil.',action:'depth'};
   if(n>=85)return {mode:'recovery',domain:weak,title:`Pulihkan ${DOMAIN_META[weak][1]}`,reason:`Prestasi ${DOMAIN_META[weak][1]} memerlukan pengukuhan sebelum bergerak lebih jauh.`,action:'depth'};
   if(m>=70 && independent===0)return {mode:'transfer',domain:'transfer',title:'Masuk Transfer Challenge',reason:'Guided mastery sudah kukuh tetapi bukti independent masih belum ada.',action:'depth'};
   if(m>=80 && independent>0)return {mode:'review',domain:'transfer',title:'Spaced Review / unit seterusnya',reason:'Skill semasa mempunyai mastery dan bukti independent. Kekalkan melalui review sebelum bergerak.',action:'review'};
   return {mode:'practice',domain:weak,title:`Latihan sasaran: ${DOMAIN_META[weak][1]}`,reason:'Domain ini memberi nilai pembelajaran tertinggi untuk sesi seterusnya.',action:'depth'};
 }
 function adaptiveView(){let c=chooseNext(),e=currentEvidence(),domains=Object.keys(DOMAIN_META);let cards=domains.map(k=>{let d=e.domains?.[k]||{attempts:0,correct:0},r=domainRate(k);return `<div class="adaptive-domain"><span>${DOMAIN_META[k][0]}</span><div><b>${DOMAIN_META[k][1]}</b><small>${d.correct}/${d.attempts} tepat · ${r===null?'Belum ada bukti':r+'%'}</small></div><i class="need-${domainNeed(k)>=85?'high':domainNeed(k)>=55?'mid':'low'}">${domainNeed(k)>=85?'Pulih':domainNeed(k)>=55?'Latih':'Kukuh'}</i></div>`}).join('');return shell(`<section class="page narrow"><div class="center-title"><small>ADAPTIVE LEARNING ORCHESTRATOR · TAHUN ${state.year}</small><h1>🧭 Apa patut saya belajar sekarang?</h1><p>Sistem memilih langkah seterusnya daripada bukti domain, prerequisite, mastery dan independent evidence.</p></div><article class="card adaptive-next"><small>CADANGAN SESI SETERUSNYA</small><h2>${c.title}</h2><p>${c.reason}</p><div class="word-chips"><span>Mode: ${c.mode}</span><span>Mastery: ${mastery()}%</span><span>Independent: ${ind(`${state.year}:${sk()[0]}`)}</span></div><button class="green wide" id="doAdaptive">Mulakan cadangan →</button></article><article class="card"><h2>📊 Bukti 5 Domain</h2><div class="adaptive-domains">${cards}</div><p class="source-note">Cadangan ini ialah keputusan dalaman Bahasa AI, bukan Tahap Penguasaan rasmi KPM. Guided evidence tidak ditukar menjadi independent mastery.</p></article><article class="card"><h2>🔁 Logik keputusan</h2><p><b>Prasyarat lemah</b> → pemulihan asas · <b>Domain lemah</b> → targeted practice · <b>Guided kukuh tanpa independent</b> → transfer · <b>Mastery + independent</b> → spaced review / kemajuan.</p></article></section>`)}
 const oldNav25=nav;nav=()=>oldNav25().replace('<div class="student">',`<button data-view="adaptive" class="${state.view==='adaptive'?'active':''}">🧭 Seterusnya</button><div class="student">`);
 const oldRender25=render;render=()=>{if(state.view==='adaptive'){$('#app').innerHTML=adaptiveView();bind();$('#doAdaptive')?.addEventListener('click',()=>{let c=chooseNext();state.adaptiveHistory.unshift({at:Date.now(),year:state.year,unit:un().id,skill:sk()[0],decision:c});state.adaptiveHistory=state.adaptiveHistory.slice(0,100);if(c.action==='review'){state.view='review';save();render();return}state.view='depth';state.adaptivePlan={domain:c.domain,at:Date.now()};save();render();setTimeout(()=>document.querySelector(`[data-depth="${c.domain}"]`)?.click(),0)});return}oldRender25()};
 const oldShell25=shell;shell=c=>oldShell25(c).replace(/Bahasa AI ULTIMATE v24\.0/g,'Bahasa AI ULTIMATE v25.0');
 window.BAHASA_ADAPTIVE_V25={version:'25.0.0',chooseNext,domainRate,domainNeed,principle:'Prerequisite → Evidence → Recovery → Transfer → Independent → Review'};
 save();render();
})();

/* ===== Bahasa AI ULTIMATE v26: Daily Mission Composer + Accelerated Learning Loop ===== */
(()=>{
 const V26='bahasaAIUltimateV26';
 if(!localStorage.getItem(V26)) localStorage.setItem(V26,localStorage.getItem('bahasaAIUltimateV25')||JSON.stringify(state));
 state.dailyComposer=state.dailyComposer||{}; state.dailyComposerHistory=state.dailyComposerHistory||[];
 const oldSave26=save; save=()=>{oldSave26();localStorage.setItem(V26,JSON.stringify(state));};
 const META={vocab:['🌱','Kosa Kata'],grammar:['⚙️','Tatabahasa'],reading:['📖','Pemahaman'],sentence:['🧱','Bina Ayat'],transfer:['⭐','Transfer']};
 function todayKey(){return new Date().toISOString().slice(0,10)}
 function evFor(unitId=un().id){return state.lessonEvidence?.[`${state.year}:${unitId}`]||{attempts:0,correct:0,domains:{}}}
 function rate(domain){let d=evFor().domains?.[domain]||{attempts:0,correct:0};return d.attempts?d.correct/d.attempts:0}
 function dueCount(){try{return (typeof dueReviews==='function'?dueReviews():[]).length}catch(_){return 0}}
 function weakest(){return Object.keys(META).map(k=>({domain:k,rate:rate(k),n:(evFor().domains?.[k]?.attempts||0)})).sort((a,b)=>(a.n? a.rate: -1)-(b.n? b.rate:-1))[0]}
 function compose(){
   const key=`${todayKey()}:${state.year}:${un().id}`, cached=state.dailyComposer[key]; if(cached)return cached;
   let w=weakest(),m=mastery(),iv=ind(`${state.year}:${sk()[0]}`),due=dueCount(),steps=[];
   steps.push({type:'current',icon:'📘',title:'Kandungan Semasa',detail:`Tahun ${state.year} · ${un().title}`,view:'lesson'});
   if(w.n===0||w.rate<.7)steps.push({type:'recovery',icon:'🛠️',title:`Pulihkan ${META[w.domain][1]}`,detail:w.n===0?'Kumpul bukti asas dahulu.':`Ketepatan semasa ${Math.round(w.rate*100)}%.`,view:'depth',domain:w.domain});
   else steps.push({type:'practice',icon:'🎯',title:`Kukuhkan ${META[w.domain][1]}`,detail:`Ketepatan ${Math.round(w.rate*100)}%; bina kestabilan dengan item baharu.`,view:'depth',domain:w.domain});
   if(due>0)steps.push({type:'review',icon:'🔁',title:'Spaced Review',detail:`${due} item sudah sampai masa untuk diulang.`,view:'review'});
   if(m>=60)steps.push({type:'transfer',icon:'⭐',title:'Transfer Challenge',detail:'Gunakan skill dalam konteks baharu tanpa menyalin model.',view:'depth',domain:'transfer'});
   if(m>=80&&iv>=1)steps.push({type:'mastery',icon:'🏆',title:'Mastery Test',detail:'Ujian fresh, no-hint untuk mengesahkan penguasaan.',view:'review',mastery:true});
   let plan={key,created:Date.now(),year:state.year,unit:un().id,skill:sk()[0],steps:steps.slice(0,5),mastery:m,independent:iv,due}; state.dailyComposer[key]=plan;save();return plan;
 }
 function dailyView(){let p=compose();return shell(`<section class="page narrow"><div class="center-title"><small>DAILY ADAPTIVE MISSION · TAHUN ${state.year}</small><h1>🚀 Misi Hari Ini</h1><p>Satu sesi menggabungkan kandungan semasa, pemulihan, spaced review, transfer dan mastery mengikut bukti sebenar.</p></div><article class="card"><div class="lesson-progress"><b>${p.steps.length} langkah dipilih</b><div><i style="width:${Math.min(100,p.steps.length*20)}%"></i></div><span>Mastery ${p.mastery}% · Independent ${p.independent} · Review due ${p.due}</span></div></article><div class="lesson-stack">${p.steps.map((s,i)=>`<article class="card lesson-station"><div class="station-title"><span>${s.icon}</span><div><small>LANGKAH ${i+1} · ${s.type.toUpperCase()}</small><h2>${s.title}</h2></div></div><p>${s.detail}</p><button class="green wide" data-daily="${i}">${i===0?'Mulakan':'Teruskan'} →</button></article>`).join('')}</div><article class="card"><h3>🧠 Prinsip</h3><p>New learning tidak menutup foundation gap. Guided success tidak menjadi mastery. Transfer dan no-hint evidence diperlukan sebelum skill dianggap benar-benar kukuh.</p></article></section>`)}
 function launch(i){let p=compose(),s=p.steps[i];if(!s)return;state.dailyComposerHistory.unshift({at:Date.now(),plan:p.key,step:s.type,domain:s.domain||null});state.dailyComposerHistory=state.dailyComposerHistory.slice(0,200);if(s.view==='depth'){state.view='depth';state.adaptivePlan={domain:s.domain,at:Date.now(),source:'daily'};save();render();setTimeout(()=>document.querySelector(`[data-depth="${s.domain}"]`)?.click(),0);return}state.view=s.view;save();render();if(s.mastery)setTimeout(()=>typeof runMasteryTest==='function'&&runMasteryTest(),0)}
 const oldNav26=nav;nav=()=>oldNav26().replace('<div class="student">',`<button data-view="daily" class="${state.view==='daily'?'active':''}">🚀 Hari Ini</button><div class="student">`);
 const oldRender26=render;render=()=>{if(state.view==='daily'){$('#app').innerHTML=dailyView();bind();$$('[data-daily]').forEach(b=>b.onclick=()=>launch(+b.dataset.daily));return}oldRender26()};
 const oldShell26=shell;shell=c=>oldShell26(c).replace(/Bahasa AI ULTIMATE v25\.0/g,'Bahasa AI ULTIMATE v26.0');
 window.BAHASA_DAILY_V26={version:'26.0.0',compose,weakest,dueCount,principle:'Current + Recovery + Review + Transfer + Mastery'};save();render();
})();

/* ===== Bahasa AI ULTIMATE v30: Accelerated Learning Intelligence Suite ===== */
(()=>{
 const V30='bahasaAIUltimateV30';
 if(!localStorage.getItem(V30)) localStorage.setItem(V30,localStorage.getItem('bahasaAIUltimateV26')||JSON.stringify(state));
 state.weeklyPlans=state.weeklyPlans||{};state.learningPulse=state.learningPulse||[];state.promotionEvidence=state.promotionEvidence||{};state.sessionLog=state.sessionLog||[];
 const oldSave30=save;save=()=>{oldSave30();localStorage.setItem(V30,JSON.stringify(state));};
 const DM={vocab:'Kosa Kata',grammar:'Tatabahasa',reading:'Pemahaman',sentence:'Bina Ayat',transfer:'Transfer'};
 function ev30(){return state.lessonEvidence?.[`${state.year}:${un().id}`]||{attempts:0,correct:0,domains:{}}}
 function dr30(k){let d=ev30().domains?.[k]||{attempts:0,correct:0};return d.attempts?Math.round(d.correct/d.attempts*100):null}
 function readiness(){let ss=skills(),mastered=ss.filter(s=>score(`${state.year}:${s[0]}`)>=80).length,indep=ss.filter(s=>ind(`${state.year}:${s[0]}`)>0).length,locked=ss.filter(s=>!unlocked(s)).length,avg=Math.round(ss.reduce((a,s)=>a+score(`${state.year}:${s[0]}`),0)/Math.max(1,ss.length));let transfer=dr30('transfer');let ready=avg>=80&&mastered>=Math.ceil(ss.length*.75)&&indep>=Math.ceil(ss.length*.6)&&locked===0&&(transfer===null||transfer>=70);return{avg,mastered,indep,locked,transfer,ready,total:ss.length}}
 function weekKey(){let d=new Date(),x=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));x.setUTCDate(x.getUTCDate()+4-(x.getUTCDay()||7));let y=new Date(Date.UTC(x.getUTCFullYear(),0,1));return `${x.getUTCFullYear()}-W${String(Math.ceil((((x-y)/86400000)+1)/7)).padStart(2,'0')}`}
 function makeWeek(){let key=`${weekKey()}:${state.year}`,old=state.weeklyPlans[key];if(old)return old;let domains=Object.keys(DM).map(k=>({k,r:dr30(k)})).sort((a,b)=>(a.r??-1)-(b.r??-1)),weak=domains[0].k;let plan={key,created:Date.now(),days:[
 {day:'Isnin',icon:'📘',focus:'Kurikulum + '+DM[weak],mode:'current'},
 {day:'Selasa',icon:'🛠️',focus:'Targeted Recovery · '+DM[weak],mode:'recovery'},
 {day:'Rabu',icon:'🔁',focus:'Spaced Review + mixed retrieval',mode:'review'},
 {day:'Khamis',icon:'⭐',focus:'Transfer · konteks baharu',mode:'transfer'},
 {day:'Jumaat',icon:'🏆',focus:'Independent / Mastery evidence',mode:'mastery'}]};state.weeklyPlans[key]=plan;save();return plan}
 function pulse(){let r=readiness(),rates=Object.keys(DM).map(k=>dr30(k)).filter(x=>x!==null),stability=rates.length?Math.round(rates.reduce((a,b)=>a+b,0)/rates.length):0;let risk=r.locked?'foundation':rates.some(x=>x<50)?'recovery':r.indep<Math.ceil(r.total*.4)?'independence':'progress';return{...r,stability,risk}}
 function intelligenceView(){let w=makeWeek(),p=pulse(),domains=Object.keys(DM).map(k=>`<div class="adaptive-domain"><span>${k==='vocab'?'🌱':k==='grammar'?'⚙️':k==='reading'?'📖':k==='sentence'?'🧱':'⭐'}</span><div><b>${DM[k]}</b><small>${dr30(k)===null?'Belum cukup bukti':dr30(k)+'% ketepatan'}</small></div></div>`).join('');return shell(`<section class="page narrow"><div class="center-title"><small>LEARNING INTELLIGENCE SUITE · TAHUN ${state.year}</small><h1>⚡ Pelan Belajar Pintar</h1><p>Daily mission + weekly rhythm + mastery readiness dalam satu lapisan keputusan.</p></div><article class="card"><h2>📡 Learning Pulse</h2><div class="report-kpis"><span><b>${p.avg}%</b>Purata Skill</span><span><b>${p.indep}/${p.total}</b>Independent</span><span><b>${p.stability}%</b>Domain Stability</span></div><p><b>Keutamaan:</b> ${p.risk==='foundation'?'Pulihkan prerequisite':p.risk==='recovery'?'Targeted recovery':p.risk==='independence'?'Bina independent evidence':'Teruskan progression + review'}.</p></article><article class="card"><h2>🗓️ Pelan Mingguan ${weekKey()}</h2><div class="lesson-stack">${w.days.map((d,i)=>`<div class="mission-step"><b>${i+1}</b><span>${d.icon} ${d.day}<small>${d.focus}</small></span></div>`).join('')}</div><button class="green wide" id="startSmartDay">Mulakan misi adaptif hari ini →</button></article><article class="card"><h2>📊 5-Domain Signal</h2><div class="adaptive-domains">${domains}</div></article><article class="card"><h2>🎓 Readiness Gate</h2><p>${p.ready?'🏆 Bukti dalaman menunjukkan readiness yang kukuh untuk progression seterusnya.':'🔒 Belum buka progression gate. Sistem akan terus membina prerequisite, transfer dan independent evidence.'}</p><div class="word-chips"><span>${p.mastered}/${p.total} skill ≥80</span><span>${p.indep}/${p.total} independent</span><span>${p.locked} locked</span></div><p class="source-note">Readiness ini ialah signal dalaman Bahasa AI, bukan Tahap Penguasaan rasmi KPM dan bukan pengganti pertimbangan guru.</p></article></section>`)}
 function recordPulse(){let p=pulse();state.learningPulse.unshift({at:Date.now(),year:state.year,unit:un().id,...p});state.learningPulse=state.learningPulse.slice(0,120);save()}
 const oldNav30=nav;nav=()=>oldNav30().replace('<div class="student">',`<button data-view="intelligence" class="${state.view==='intelligence'?'active':''}">⚡ Pintar</button><div class="student">`);
 const oldRender30=render;render=()=>{if(state.view==='intelligence'){$('#app').innerHTML=intelligenceView();bind();$('#startSmartDay')?.addEventListener('click',()=>{recordPulse();state.view='daily';save();render()});return}oldRender30()};
 const oldShell30=shell;shell=c=>oldShell30(c).replace(/Bahasa AI ULTIMATE v26\.0/g,'Bahasa AI ULTIMATE v30.0');
 window.BAHASA_INTELLIGENCE_V30={version:'30.0.0',readiness,makeWeek,pulse,principle:'Daily → Weekly → Recovery → Transfer → Independent → Readiness'};save();render();
})();

/* ===== Bahasa AI ULTIMATE v35: Curriculum-to-Mastery Accelerator ===== */
(()=>{
 const V='35.0.0';
 state.accel35=state.accel35||{sessions:[],weeklyGoal:5,lastPlan:null};
 const skillNow=()=>{try{return un()}catch(e){return (window.BAHASA_CURRICULUM?.skills?.[state.year]||[])[0]||{id:'asas',name:'Asas'}}};
 const score=(k)=>{try{return typeof dr30==='function'?dr30(k):null}catch(e){return null}};
 const domains=['vocab','grammar','reading','sentence','transfer'];
 function weakest(){return domains.map(k=>[k,score(k)]).filter(x=>x[1]!==null).sort((a,b)=>a[1]-b[1])[0]||['reading',null]}
 function dueCount(){try{return typeof dueReviews==='function'?dueReviews().length:(state.reviewQueue||[]).filter(x=>new Date(x.due||0)<=new Date()).length}catch(e){return 0}}
 function independent(){let s=skillNow();return Number(state.evidence?.[`${state.year}:${s.id}`]?.independent||state.evidence?.[s.id]?.independent||0)}
 function todayPlan(){
   const s=skillNow(), w=weakest(), m=typeof mastery==='function'?mastery(s):0, due=dueCount(), ind=independent();
   const blocks=[];
   if(m<60) blocks.push({type:'foundation',icon:'🧱',title:'Pulihkan Asas',why:`${s.name||s.id} masih perlukan asas yang kukuh.`,action:'lesson'});
   if(w[1]!==null && w[1]<70) blocks.push({type:'recovery',icon:'🛠️',title:`Pulih ${w[0]}`,why:`Ketepatan ${w[1]}% — fokus pada kelemahan sebenar.`,action:'practice'});
   if(due>0) blocks.push({type:'review',icon:'🔁',title:`Ulang Kaji ${due} item`,why:'Spaced review sudah sampai masa.',action:'review'});
   if(m>=60 && ind<1) blocks.push({type:'transfer',icon:'⭐',title:'Transfer Baharu',why:'Buktikan kemahiran dalam konteks baharu tanpa menyalin jawapan.',action:'writing'});
   if(m>=80 && ind>=1) blocks.push({type:'mastery',icon:'🏆',title:'Mastery Check',why:'Cuba bukti bebas tanpa hint.',action:'mastery'});
   if(!blocks.length) blocks.push({type:'current',icon:'📘',title:'Teruskan Unit Semasa',why:'Progression stabil — teruskan kandungan kurikulum semasa.',action:'lesson'});
   return blocks.slice(0,4);
 }
 function route(a){
   if(a==='review' && typeof runReview==='function') return runReview();
   if(a==='mastery' && typeof runMasteryTest==='function') return runMasteryTest();
   if(a==='writing'){state.view='writing';save();return render()}
   if(a==='practice'){state.view='activity';state.activity='grammar';save();return render()}
   state.view='lesson';save();render();
 }
 function accelerator(){
   const p=todayPlan(), w=weakest(), s=skillNow(), due=dueCount();
   return shell(`<section class="page narrow"><div class="center-title"><small>CURRICULUM → MASTERY ACCELERATOR · TAHUN ${state.year}</small><h1>🚀 Misi Hari Ini</h1><p>Sistem memilih sedikit tugasan bernilai tinggi, bukan menyuruh murid membuat semuanya.</p></div>
   <article class="card"><div class="report-kpis"><span><b>${typeof mastery==='function'?mastery(s):0}%</b>${s.name||s.id}</span><span><b>${w[1]===null?'—':w[1]+'%'}</b>Domain terlemah</span><span><b>${due}</b>Review due</span></div></article>
   <div class="lesson-stack">${p.map((b,i)=>`<article class="card mission-step"><b>${i+1}</b><span><strong>${b.icon} ${b.title}</strong><small>${b.why}</small><button class="small accelGo" data-action="${b.action}">Mulakan →</button></span></article>`).join('')}</div>
   <article class="card"><h2>🧠 Prinsip keputusan</h2><p>Asas dahulu → pulih kelemahan → ulang kaji bila tiba masa → transfer konteks baharu → bukti independent.</p><p class="source-note">Pelan ini ialah orkestrasi pembelajaran dalaman Bahasa AI; ia tidak menukar completion atau XP menjadi Tahap Penguasaan rasmi.</p></article></section>`)
 }
 const oldView=typeof view==='function'?view:null;
 if(oldView){view=function(){if(state.view==='accelerator')return accelerator();return oldView()}}
 const oldNav=nav;nav=()=>oldNav().replace('<div class="student">',`<button data-view="accelerator" class="${state.view==='accelerator'?'active':''}">🚀 Hari Ini</button><div class="student">`);
 const oldBind=bind;bind=function(){oldBind();document.querySelectorAll('.accelGo').forEach(b=>b.onclick=()=>route(b.dataset.action));};
 const oldShell=shell;shell=c=>oldShell(c).replace(/Bahasa AI ULTIMATE v30\.0/g,'Bahasa AI ULTIMATE v35.0');
 window.BAHASA_ACCELERATOR_V35={version:V,todayPlan,weakest,dueCount,principle:'Foundation → Recovery → Review → Transfer → Independent Mastery'};
 save();render();
})();

/* ===== Bahasa AI ULTIMATE v40: Content Quality & Scale Console ===== */
(()=>{
 const V='40.0.0';
 const oldSave=save; save=()=>{oldSave();localStorage.setItem('bahasaAIUltimateV40',JSON.stringify(state));};
 function stats(){let units=0,passages=0,questions=0,grammar=0,writing=0,mastery=0,issues=[];for(let y=1;y<=6;y++){let us=window.BAHASA_CURRICULUM.getYear(y);for(let i=0;i<us.length;i++){let p=window.BAHASA_CONTENT.extendedPack(y,i,us[i]);units++;passages+=p.passages.length;questions+=p.comprehension.length;grammar+=p.grammar.length;writing+=p.writingForms.length;mastery+=p.masteryForms.length;if(p.passages.length<3||p.comprehension.length<9||p.writingForms.length<3)issues.push(us[i].id)}}return{units,passages,questions,grammar,writing,mastery,issues}}
 function contentLab(){let u=un(),p=window.BAHASA_CONTENT.extendedPack(state.year,state.unit,u),s=stats();return shell(`<section class="page narrow"><div class="center-title"><small>CONTENT QUALITY LAYER · v40</small><h1>📚 ${u.title}</h1><p>同一个技能用不同情境练习，减少背答案；从理解逐步走向应用与独立表达。</p></div><article class="card"><h2>📖 3 个阅读情境</h2>${p.passages.map((x,i)=>`<div class="teaching-note"><b>Petikan ${i+1}</b><p>${x.text}</p></div>`).join('')}</article><article class="card"><h2>🔎 理解梯度</h2><div class="word-chips"><span>Literal ×3</span><span>Inference ×3</span><span>Application ×3</span></div><p>不是只找原文答案：第三层必须把同一技能带到新情境。</p></article><article class="card"><h2>✏️ 3 个写作 / Mastery Forms</h2>${p.writingForms.map((w,i)=>`<div class="mission-step"><b>${i+1}</b><span>${w.context}<small>${w.prompt}</small></span></div>`).join('')}<p class="source-note">第三个 form 为 independent context；Mastery form 不提供 hint。</p></article><article class="card"><h2>🧪 Content QA Matrix</h2><div class="report-kpis"><span><b>${s.units}</b>Units</span><span><b>${s.passages}</b>Passages</span><span><b>${s.questions}</b>Comprehension</span></div><div class="report-kpis"><span><b>${s.grammar}</b>Grammar forms</span><span><b>${s.writing}</b>Writing forms</span><span><b>${s.mastery}</b>Mastery forms</span></div><p>${s.issues.length?'⚠️ '+s.issues.length+' unit incomplete':'✅ 所有 144 Units 通过结构完整性检查'}</p></article></section>`)}
 const oldNav=nav;nav=()=>oldNav().replace('<div class="student">',`<button data-view="contentlab" class="${state.view==='contentlab'?'active':''}">📚 内容+</button><div class="student">`);
 const oldRender=render;render=()=>{if(state.view==='contentlab'){$('#app').innerHTML=contentLab();bind();return}oldRender()};
 const oldShell=shell;shell=c=>oldShell(c).replace(/Bahasa AI ULTIMATE v35\.0/g,'Bahasa AI ULTIMATE v40.0');
 window.BAHASA_CONTENT_V40={version:V,stats,principle:'Multiple contexts → Literal → Inference → Application → Independent Mastery'};save();render();
})();

/* Bahasa AI ULTIMATE v50 — Curriculum Depth + Quality Dashboard */
(function(){
 const V='50.0.0';
 function depthQA(){let out={units:0,year:{},failures:[]};for(let y=1;y<=6;y++){let us=window.BAHASA_CURRICULUM?.getUnits?.(y)||[];out.year[y]={units:us.length,checked:0};us.forEach((u,i)=>{out.units++;let q=window.BAHASA_YEAR_DEPTH?.lessonQuality?.(y,i,u);if(q){out.year[y].checked++;Object.entries(q.checks).forEach(([k,v])=>{if(!v)out.failures.push(`${y}:${u.id}:${k}`)})}})}return out}
 function learningProfile(){let r=window.BAHASA_YEAR_DEPTH?.rubric?.(state.year);if(!r)return null;return {...r,currentUnit:un()?.title||'',mastery:Math.round(Object.values(state.mastery||{}).reduce((a,b)=>a+(+b||0),0)/Math.max(1,Object.keys(state.mastery||{}).length))};}
 window.BAHASA_V50={version:V,depthQA,learningProfile,policy:{xpIsMastery:false,guidedIsIndependent:false,creativeUnusualIsWrong:false,officialTP:false}};
 try{localStorage.setItem('bahasaAIUltimateV50',JSON.stringify(state))}catch(e){}
})();

/* ===== Bahasa AI ULTIMATE v60: Unit-by-Unit Content Studio ===== */
(()=>{
 const V='60.0.0';
 function studio60(){let u=un(),p=window.BAHASA_UNIT_SIGNATURE_V60.signature(state.year,state.unit,u),a=window.BAHASA_UNIT_SIGNATURE_V60.audit();return shell(`<section class="page narrow"><div class="center-title"><small>UNIT SIGNATURE CONTENT · v60</small><h1>🧭 ${u.title}</h1><p>每个 Unit 有自己的教学 signature；同一主题也不再只重复同一组通用内容。</p></div><article class="card"><h2>📖 Unit-specific Reading</h2>${p.readings.map((x,i)=>`<div class="teaching-note"><b>Petikan ${i+1}</b><p>${x}</p></div>`).join('')}</article><article class="card"><h2>🌱 Kosa Kata Unit</h2><div class="vocab-grid">${p.vocab.map(v=>`<div class="vocab-tile"><b>${v.word}</b><small>${v.meaning}</small><p>${v.example}</p></div>`).join('')}</div></article><article class="card"><h2>⚙️ Tatabahasa → Pemahaman → Penulisan</h2><p><b>${p.grammar.focus}</b></p>${p.grammar.tasks.map((x,i)=>`<div class="mission-step"><b>${i+1}</b><span>${x}</span></div>`).join('')}<hr>${p.comprehension.map(q=>`<p><b>${q.level}</b> · ${q.q}</p>`).join('')}<div class="teaching-note"><b>Transfer</b><p>${p.writing.transfer}</p><b>Mastery</b><p>${p.writing.mastery}</p></div></article><article class="card"><h2>🧪 Unit Content Audit</h2><div class="report-kpis"><span><b>${a.units}</b>Units</span><span><b>${a.uniqueSignatures}</b>Unique signatures</span><span><b>${a.uniquePassages}</b>Unique passages</span></div><p>${a.failures.length?'⚠️ '+a.failures.length+' issue(s)':'✅ 144 Units 通过 v60 signature/content structural audit'}</p></article></section>`)}
 const oldNav60=nav;nav=()=>oldNav60().replace('<div class="student">',`<button data-view="unitstudio" class="${state.view==='unitstudio'?'active':''}">🧭 Unit+</button><div class="student">`);
 const oldRender60=render;render=()=>{if(state.view==='unitstudio'){$('#app').innerHTML=studio60();bind();return}oldRender60()};
 const oldShell60=shell;shell=c=>oldShell60(c).replace(/Bahasa AI ULTIMATE v50\.0/g,'Bahasa AI ULTIMATE v60.0');
 window.BAHASA_V60={version:V,policy:{unitSpecific:true,masteryRequiresIndependent:true,officialTP:false}};
 try{localStorage.setItem('bahasaAIUltimateV60',JSON.stringify(state))}catch(e){}
 render();
})();

/* ===== Bahasa AI ULTIMATE v70: Content Blueprint Console + compatibility stabilization ===== */
(()=>{
 const V='70.0.0';
 function v70Lab(){
  const u=un(), b=window.BAHASA_CONTENT_V70.blueprint(state.year,state.unit,u), a=window.BAHASA_CONTENT_V70.audit();
  return shell(`<section class="page narrow"><div class="center-title"><small>UNIT-BY-UNIT TEACHING BLUEPRINT · v70</small><h1>🧠 ${u.title}</h1><p>Unit-specific vocabulary, reading, comprehension, language production, transfer and independent mastery.</p></div>
  <article class="card"><h2>🌱 Kosa Kata (${b.vocab.length})</h2><div class="word-chips">${b.vocab.map(x=>`<span>${x}</span>`).join('')}</div></article>
  <article class="card"><h2>📖 3 Contexts</h2>${b.readings.map((p,i)=>`<div class="teaching-note"><b>Petikan ${i+1}</b><p>${p}</p></div>`).join('')}</article>
  <article class="card"><h2>🔎 9 Soalan: Literal → Inferens → Aplikasi</h2>${b.questions.map(q=>`<p><b>${q.level}</b> · ${q.q}</p>`).join('')}</article>
  <article class="card"><h2>⚙️ Language Production</h2>${b.grammar.map((g,i)=>`<div class="mission-step"><b>${i+1}</b><span>${g.prompt}</span></div>`).join('')}<div class="teaching-note"><b>Transfer</b><p>${b.writing.transfer}</p><b>Independent Mastery</b><p>${b.writing.mastery}</p></div></article>
  <article class="card"><h2>🧪 v70 QA</h2><div class="report-kpis"><span><b>${a.units}</b>Units</span><span><b>${a.uniquePassages}</b>Unique passages</span><span><b>${a.questions}</b>Questions</span></div><p>${a.failures.length?'⚠️ '+a.failures.join(', '):'✅ Unit/content structural audit passed'}</p></article></section>`);
 }
 const oldNav70=nav; nav=()=>oldNav70().replace('<div class="student">',`<button data-view="v70lab" class="${state.view==='v70lab'?'active':''}">🧠 Blueprint</button><div class="student">`);
 const oldRender70=render; render=()=>{if(state.view==='v70lab'){$('#app').innerHTML=v70Lab();bind();return}oldRender70()};
 const oldShell70=shell; shell=c=>oldShell70(c).replace(/Bahasa AI ULTIMATE v60\.0/g,'Bahasa AI ULTIMATE v70.0');
 window.BAHASA_V70={version:V,audit:()=>window.BAHASA_CONTENT_V70.audit(),fixed:['BAHASA_CURRICULUM.getYear','BAHASA_CURRICULUM.getUnits'],policy:{guidedIsMastery:false,independentRequired:true,officialTP:false}};
 try{localStorage.setItem('bahasaAIUltimateV70',JSON.stringify(state))}catch(e){}
 render();
})();


/* ===== Bahasa AI ULTIMATE v80: Runtime Stabilization + Integrity Gate ===== */
(()=>{
 const V='80.0.0';
 function runtimeAudit(){
   const checks=[]; const add=(name,ok,detail='')=>checks.push({name,ok:!!ok,detail});
   try{add('Curriculum API',!!window.BAHASA_CURRICULUM?.getYear && !!window.BAHASA_CURRICULUM?.getUnits)}catch(e){add('Curriculum API',false,e.message)}
   try{const a=window.BAHASA_CONTENT_V70?.audit?.();add('144-unit content audit',a?.units===144 && !a?.failures?.length,JSON.stringify(a||{}))}catch(e){add('144-unit content audit',false,e.message)}
   try{add('Meaning-first coach',!!window.BAHASA_OPEN_RESPONSE)}catch(e){add('Meaning-first coach',false,e.message)}
   try{add('Adaptive accelerator',!!window.BAHASA_ACCELERATOR_V35)}catch(e){add('Adaptive accelerator',false,e.message)}
   try{add('Daily composer',!!window.BAHASA_DAILY_V26)}catch(e){add('Daily composer',false,e.message)}
   try{add('Learning intelligence',!!window.BAHASA_INTELLIGENCE_V30)}catch(e){add('Learning intelligence',false,e.message)}
   try{add('Unit signature layer',!!window.BAHASA_UNIT_SIGNATURE_V60)}catch(e){add('Unit signature layer',false,e.message)}
   try{const y=state.year,u=un(); add('Current unit resolvable',!!u,`T${y} U${state.unit+1}`)}catch(e){add('Current unit resolvable',false,e.message)}
   try{const before=JSON.stringify(state); save(); const raw=localStorage.getItem('bahasaAIUltimateV40')||localStorage.getItem('bahasaAIUltimateV20'); add('Persistence write',!!raw); add('State preserved by save',before===JSON.stringify(state))}catch(e){add('Persistence write',false,e.message)}
   return {version:V,passed:checks.filter(x=>x.ok).length,total:checks.length,failures:checks.filter(x=>!x.ok),checks};
 }
 // Consolidated current snapshot while retaining all backwards-compatible keys used by prior stable builds.
 try{localStorage.setItem('bahasaAIUltimateV80',JSON.stringify(state))}catch(e){}
 const oldShell80=shell; shell=c=>oldShell80(c).replace(/Bahasa AI ULTIMATE v70\.0/g,'Bahasa AI ULTIMATE v90.0');
 window.BAHASA_RUNTIME_V80={version:V,runtimeAudit,policy:{singleStableBaseline:true,guidedIsMastery:false,independentRequired:true,officialTP:false},criticalFixes:['mutable save pipeline so v11→v40 persistence wrappers execute instead of throwing Assignment to constant variable']};
 render();
})();

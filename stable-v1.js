/* Bahasa AI COMPLETE — Release Candidate 1
   Independent Bahasa AI project. No Karangan AI runtime dependency. */
(()=>{
  const VERSION='1.0.0';
  const previousLearn=learn;
  const previousBind=bind;
  const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const uniq=a=>[...new Set((a||[]).filter(Boolean))];
  function speak(text){
    try{
      if(!('speechSynthesis' in window)) return false;
      speechSynthesis.cancel();
      const u=new SpeechSynthesisUtterance(String(text));u.lang='ms-MY';u.rate=.68;u.pitch=1;
      speechSynthesis.speak(u);return true;
    }catch(e){return false}
  }
  function syllables(word){
    const w=String(word||'').toLowerCase().replace(/[^a-z]/g,'');
    if(!w) return [];
    const chunks=w.match(/[^aeiou]*[aeiou]+(?:ng|ny|[bcdfghjklmnpqrstvwxyz](?=[^aeiou]|$))?/g);
    return chunks&&chunks.length>1?chunks:[w.slice(0,Math.max(1,Math.ceil(w.length/2))),w.slice(Math.max(1,Math.ceil(w.length/2)))].filter(Boolean);
  }
  function frame(u,s,stages,body){
    return shell(`<section class="page narrow rc1-student"><div class="crumb">Tahun 1 › ${escape(u.theme?.[0]||'')} › Unit ${state.unit+1}</div><div class="lesson-head"><button class="back" data-view="curriculum">←</button><div><small>${escape(u.theme?.[1]||'')} ${escape(u.theme?.[0]||'')}</small><h1>${escape(u.title)}</h1><p>Fokus: ${s[2]||''} ${escape(s[1])}</p></div></div><article class="card lesson rc1-focus"><div class="rc1-stagebar">${stages.map((x,i)=>`<span class="rc1-stage ${i?'':'on'}" data-rc1-pill="${i}">${i+1} ${escape(x)}</span>`).join('')}</div><div id="rc1Task" class="rc1-task">${body}</div><details class="v300-more"><summary>Untuk ibu bapa / guru</summary><p>${lessonText(1,u)}</p><p>Aktiviti berpandu membina asas. Penguasaan penuh hanya selepas bukti independent dalam konteks baharu.</p></details></article></section>`);
  }
  function wordButtons(words,attr='data-rc1-say'){return `<div class="word-chips">${words.map(w=>`<button type="button" class="v300-word" ${attr}="${escape(w)}">🔊 ${escape(w)}</button>`).join('')}</div>`}
  function firstWord(u){return (u.words||[])[0]||'saya'}
  function hurufView(u,s){const words=(u.words||[]).slice(0,4),w=firstWord(u),letter=(w[0]||'s').toUpperCase();return frame(u,s,['Dengar','Kenal','Sebut','Cuba'],`<div class="rc1-symbol">${letter}</div><small class="v300-kicker">AKTIVITI 1 · DENGAR</small><h2>Dengar bunyi awal</h2><p class="lead">Tekan perkataan dan dengar bunyi awalnya.</p>${wordButtons(words)}<div id="rc1Coach" class="v350-coach">👩🏻‍🏫 Dengar dahulu. Tidak perlu membina ayat.</div><button class="v350-primary" id="rc1Next" disabled>Sudah dengar → Kenal huruf</button>`)}
  function sukuView(u,s){const words=(u.words||[]).slice(0,4),w=firstWord(u),parts=syllables(w);return frame(u,s,['Dengar','Pecah','Cantum','Cuba'],`<div class="rc1-symbol">${escape(parts.join(' · '))}</div><small class="v300-kicker">AKTIVITI 1 · DENGAR</small><h2>Dengar perkataan</h2><p class="lead">Dengar “${escape(w)}”, kemudian kita pecahkan kepada suku kata.</p><button class="v350-listen" id="rc1Model">🔊 Dengar “${escape(w)}”</button><div id="rc1Coach" class="v350-coach">👩🏻‍🏫 Dengar dahulu. Selepas itu pecahkan bunyinya.</div><button class="v350-primary" id="rc1Next" disabled>Sudah dengar → Pecah suku kata</button>`)}
  function kataView(u,s){const words=(u.words||[]).slice(0,4),w=firstWord(u);return frame(u,s,['Lihat','Dengar','Padan','Cuba'],`<div class="rc1-symbol">🌳</div><small class="v300-kicker">AKTIVITI 1 · LIHAT</small><h2>Kenal perkataan</h2><p class="lead">Lihat perkataan dan dengar sebutannya.</p>${wordButtons(words)}<div id="rc1Coach" class="v350-coach">👩🏻‍🏫 Pilih satu perkataan dahulu. Faham bentuk dan bunyinya.</div><button class="v350-primary" id="rc1Next" disabled>Sudah lihat → Padan perkataan</button>`)}
  learn=function(){
    if(state.year!==1) return previousLearn();
    const u=un(),s=skills().find(x=>x[0]===u.focus)||sk();state.skill=Math.max(0,skills().indexOf(s));
    if(s[0]==='huruf') return hurufView(u,s);
    if(s[0]==='suku') return sukuView(u,s);
    if(s[0]==='kata') return kataView(u,s);
    return previousLearn();
  };
  function setStage(n){$$('[data-rc1-pill]').forEach((el,i)=>{el.classList.toggle('on',i===n);el.classList.toggle('done',i<n)})}
  function finishGuided(msg='🌟 Bagus! Aktiviti asas selesai.'){
    const c=$('#rc1Coach');if(c)c.textContent=msg;
    try{addEvidence('guided');save()}catch(e){}
  }
  function bindHuruf(u){
    let heard=false;const words=(u.words||[]).slice(0,4),w=firstWord(u),letter=(w[0]||'s').toUpperCase(),task=$('#rc1Task');
    $$('[data-rc1-say]').forEach(b=>b.onclick=()=>{heard=true;speak(b.dataset.rc1Say);b.classList.add('heard');$('#rc1Coach').textContent=`🔊 “${b.dataset.rc1Say}”. Dengar bunyi awalnya.`;$('#rc1Next').disabled=false});
    $('#rc1Next').onclick=()=>{setStage(1);const opts=uniq([letter,'A','M','B','S']).slice(0,4);task.innerHTML=`<div class="rc1-symbol">${letter}</div><small class="v300-kicker">AKTIVITI 2 · KENAL</small><h2>Huruf manakah bunyi awal “${escape(w)}”?</h2><div class="v350-choicegrid">${opts.map(x=>`<button class="v350-choice" data-rc1-letter="${x}">${x}</button>`).join('')}</div><div id="rc1Coach" class="v350-coach">💡 Dengar semula jika perlu.</div><button class="v350-listen" id="rc1Replay">🔊 Dengar semula</button>`;$('#rc1Replay').onclick=()=>speak(w);$$('[data-rc1-letter]').forEach(b=>b.onclick=()=>{if(b.dataset.rc1Letter===letter){b.classList.add('good');$('#rc1Coach').textContent='✅ Betul.';setTimeout(stage2,350)}else{b.classList.add('bad');$('#rc1Coach').textContent='Cuba lagi. Dengar bunyi awal.'}})};
    function stage2(){setStage(2);task.innerHTML=`<div class="rc1-symbol">${letter}</div><small class="v300-kicker">AKTIVITI 3 · SEBUT</small><h2>Sebut “${escape(w)}”</h2><p class="lead">Dengar model, kemudian sebut dengan suara kamu.</p><button class="v350-listen" id="rc1Replay">🔊 Cikgu Aira sebut</button><div id="rc1Coach" class="v350-coach">Tiada markah suara pada tahap ini.</div><button class="v350-primary" id="rc1Spoken">Saya sudah sebut →</button>`;$('#rc1Replay').onclick=()=>speak(w);$('#rc1Spoken').onclick=stage3}
    function stage3(){setStage(3);const opts=uniq(words.length?words:[w,'buku','meja','bola']);task.innerHTML=`<small class="v300-kicker">AKTIVITI 4 · CUBA SENDIRI</small><h2>Cari perkataan bermula dengan ${letter}</h2><div class="v350-choicegrid">${opts.map(x=>`<button class="v350-choice" data-rc1-word="${escape(x)}">${escape(x)}</button>`).join('')}</div><div id="rc1Coach" class="v350-coach">🌱 Percubaan kendiri ringkas. Belum mastery penuh.</div>`;$$('[data-rc1-word]').forEach(b=>b.onclick=()=>{if((b.dataset.rc1Word[0]||'').toUpperCase()===letter){b.classList.add('good');finishGuided()}else{b.classList.add('bad');$('#rc1Coach').textContent='Belum tepat. Lihat huruf pertama.'}})}
  }
  function bindSuku(u){
    const w=firstWord(u),parts=syllables(w),task=$('#rc1Task');$('#rc1Model').onclick=()=>{speak(w);$('#rc1Next').disabled=false};
    $('#rc1Next').onclick=()=>{setStage(1);task.innerHTML=`<div class="rc1-symbol">${escape(parts.join(' · '))}</div><small class="v300-kicker">AKTIVITI 2 · PECAH</small><h2>Pecahkan “${escape(w)}”</h2><p class="lead">Tekan setiap bahagian dari kiri ke kanan.</p><div class="v350-choicegrid">${parts.map((p,i)=>`<button class="v350-choice" data-rc1-part="${i}">${escape(p)}</button>`).join('')}</div><div id="rc1Coach" class="v350-coach">💡 Sebut setiap suku kata perlahan-lahan.</div><button class="v350-primary" id="rc1Join" disabled>Sudah pecah → Cantum</button>`;let seen=new Set;$$('[data-rc1-part]').forEach(b=>b.onclick=()=>{seen.add(b.dataset.rc1Part);b.classList.add('good');speak(b.textContent);$('#rc1Join').disabled=seen.size===parts.length});$('#rc1Join').onclick=stage2};
    function stage2(){setStage(2);task.innerHTML=`<div class="rc1-symbol">${escape(parts.join(' + '))}</div><small class="v300-kicker">AKTIVITI 3 · CANTUM</small><h2>Cantum semula</h2><button class="v350-listen" id="rc1Joined">🔊 ${escape(parts.join(' + '))} → ${escape(w)}</button><div id="rc1Coach" class="v350-coach">👩🏻‍🏫 Dengar bagaimana suku kata menjadi satu perkataan.</div><button class="v350-primary" id="rc1Try">Saya faham → Cuba sendiri</button>`;$('#rc1Joined').onclick=()=>speak(w);$('#rc1Try').onclick=stage3}
    function stage3(){setStage(3);const wrong=uniq([(parts[0]||'')+(parts[1]||''),parts.slice().reverse().join(''),w+'a','ma'+w]).filter(x=>x&&x!==w);const opts=uniq([w,...wrong]).slice(0,4).sort(()=>.5-Math.random());task.innerHTML=`<small class="v300-kicker">AKTIVITI 4 · CUBA SENDIRI</small><h2>Yang manakah perkataan “${escape(w)}”?</h2><div class="v350-choicegrid">${opts.map(x=>`<button class="v350-choice" data-rc1-suku="${escape(x)}">${escape(x)}</button>`).join('')}</div><div id="rc1Coach" class="v350-coach">🌱 Cuba tanpa bantuan.</div>`;$$('[data-rc1-suku]').forEach(b=>b.onclick=()=>{if(b.dataset.rc1Suku===w){b.classList.add('good');finishGuided()}else{b.classList.add('bad');$('#rc1Coach').textContent='Cuba cantum semula suku kata.'}})}
  }
  function bindKata(u){
    const words=(u.words||[]).slice(0,4),w=firstWord(u),task=$('#rc1Task');let heard=false;$$('[data-rc1-say]').forEach(b=>b.onclick=()=>{heard=true;speak(b.dataset.rc1Say);b.classList.add('heard');$('#rc1Next').disabled=false});
    $('#rc1Next').onclick=()=>{setStage(1);task.innerHTML=`<div class="rc1-symbol">🔊</div><small class="v300-kicker">AKTIVITI 2 · DENGAR</small><h2>Dengar “${escape(w)}”</h2><button class="v350-listen" id="rc1Replay">🔊 Dengar perkataan</button><div id="rc1Coach" class="v350-coach">👩🏻‍🏫 Dengar dengan teliti, kemudian padankan.</div><button class="v350-primary" id="rc1Match">Sudah dengar → Padan</button>`;$('#rc1Replay').onclick=()=>speak(w);$('#rc1Match').onclick=stage2};
    function stage2(){setStage(2);const opts=uniq(words);task.innerHTML=`<small class="v300-kicker">AKTIVITI 3 · PADAN</small><h2>Pilih perkataan yang kamu dengar</h2><button class="v350-listen" id="rc1Replay">🔊 Dengar lagi</button><div class="v350-choicegrid">${opts.map(x=>`<button class="v350-choice" data-rc1-match="${escape(x)}">${escape(x)}</button>`).join('')}</div><div id="rc1Coach" class="v350-coach">💡 Padankan bunyi dengan bentuk perkataan.</div>`;$('#rc1Replay').onclick=()=>speak(w);$$('[data-rc1-match]').forEach(b=>b.onclick=()=>{if(b.dataset.rc1Match===w){b.classList.add('good');$('#rc1Coach').textContent='✅ Betul.';setTimeout(stage3,350)}else{b.classList.add('bad');$('#rc1Coach').textContent='Belum tepat. Dengar sekali lagi.'}})}
    function stage3(){setStage(3);task.innerHTML=`<small class="v300-kicker">AKTIVITI 4 · CUBA SENDIRI</small><h2>Cari “${escape(w)}”</h2><p class="lead">Pilih tanpa mendengar model.</p><div class="v350-choicegrid">${uniq(words).map(x=>`<button class="v350-choice" data-rc1-final="${escape(x)}">${escape(x)}</button>`).join('')}</div><div id="rc1Coach" class="v350-coach">🌱 Ini bukti latihan, bukan mastery penuh.</div>`;$$('[data-rc1-final]').forEach(b=>b.onclick=()=>{if(b.dataset.rc1Final===w){b.classList.add('good');finishGuided()}else{b.classList.add('bad');$('#rc1Coach').textContent='Cuba lihat semula bentuk perkataan.'}})}
  }
  bind=function(){previousBind();const task=$('#rc1Task');if(!task)return;const u=un(),s=skills().find(x=>x[0]===u.focus)||sk();if(s[0]==='huruf')bindHuruf(u);else if(s[0]==='suku')bindSuku(u);else if(s[0]==='kata')bindKata(u)};
  window.BAHASA_COMPLETE_STABLE_V1={version:VERSION,project:'Bahasa AI',independentProject:true,karanganAIDependency:false,year1FoundationFocusSpecific:true,speechRecognitionRequired:false,masteryPolicy:{guidedIsMastery:false,independentRequired:true},curriculumClaim:'curriculum-aware app-authored; official SK/SP labels only after source verification'};
})();

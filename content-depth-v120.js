/* Bahasa AI v120 — Year-specific pedagogical quality gates.
   App-authored curriculum-aware constraints; not an official SK/SP certification. */
(()=>{
'use strict';
const V='120.0.0';
const YEAR_RULES={
1:{reading:[8,55],vocab:[4,8],writing:'perkataan → frasa → ayat mudah',forbid:['KBAT panjang','karangan panjang'],focus:['huruf','suku kata','perkataan','frasa','ayat mudah']},
2:{reading:[18,80],vocab:[5,9],writing:'ayat lengkap + maklumat',focus:['kosa kata','frasa','ayat','maklumat']},
3:{reading:[30,115],vocab:[6,10],writing:'2–3 ayat berkaitan → perenggan ringkas',focus:['idea utama','idea sokongan','susun ayat','perenggan']},
4:{reading:[45,150],vocab:[7,11],writing:'isi → huraian → contoh',focus:['ayat majmuk','isi','huraian','contoh']},
5:{reading:[60,190],vocab:[8,12],writing:'perenggan lengkap + penanda wacana',focus:['penanda wacana','perenggan','karangan']},
6:{reading:[75,230],vocab:[8,14],writing:'koheren → KBAT → sunting → independent',focus:['inferens','koheren','KBAT','penyuntingan','transfer']}
};
const wc=s=>String(s||'').trim().split(/\s+/).filter(Boolean).length;
function inspectUnit(y,i){
 const u=window.BAHASA_CURRICULUM?.getUnits?.(y)?.[i]; if(!u)return {ok:false,issues:['unit missing']};
 const b=window.BAHASA_CONTENT_V70?.blueprint?.(y,i,u);if(!b)return {ok:false,issues:['blueprint missing']};
 const r=YEAR_RULES[y], issues=[];
 if((b.vocab||[]).length<r.vocab[0])issues.push('vocab below year floor');
 if((b.readings||[]).length<3)issues.push('fewer than 3 reading contexts');
 if((b.questions||[]).filter(q=>String(q.level).toLowerCase()==='literal').length<3)issues.push('literal ladder incomplete');
 if((b.questions||[]).filter(q=>/infer/i.test(q.level)).length<3)issues.push('inference ladder incomplete');
 if((b.questions||[]).filter(q=>/appl|aplik|app/i.test(q.level)).length<3)issues.push('application ladder incomplete');
 if(!b.writing?.transfer||!b.writing?.mastery)issues.push('transfer/mastery missing');
 return {ok:issues.length===0,year:y,unit:i+1,id:u.id,title:u.title,readingWords:(b.readings||[]).map(wc),vocabCount:(b.vocab||[]).length,issues,expectation:r.writing};
}
function audit(){let units=0,issues=[];const byYear={};for(let y=1;y<=6;y++){byYear[y]={units:0,pass:0,issues:0};for(let i=0;i<24;i++){const x=inspectUnit(y,i);units++;byYear[y].units++;if(x.ok)byYear[y].pass++;else{x.issues.forEach(issue=>issues.push(`${y}:${i+1}:${issue}`));byYear[y].issues+=x.issues.length}}}return {version:V,units,byYear,issues,passed:issues.length===0,rules:YEAR_RULES}}
window.BAHASA_PEDAGOGY_V120={version:V,YEAR_RULES,inspectUnit,audit,principle:'Foundation first in Year 1; progressively deeper comprehension, production and independent transfer through Year 6',officialMapping:false};
})();

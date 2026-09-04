/* Bahasa AI — Final Release Content v14. Context-specific comprehension prompts + release invariants. */
(()=>{'use strict';
const V='CONTENT-RELEASE-V14',P=window.BAHASA_CONTENT_POLISH_V13,F=window.BAHASA_FULL_CONTENT;if(!P||!F)return;
const records={};
const literal=[
 (r,k)=>`Dalam bahan ini, apakah maklumat paling penting tentang ${k}?`,
 (r,k)=>`Nyatakan fakta daripada petikan yang membantu kamu memahami ${k}.`,
 (r,k)=>`Apakah yang berlaku atau diterangkan berkaitan ${k}?`,
 (r,k)=>`Cari satu bukti tersurat tentang ${k} dalam petikan.`
];
const infer=[
 (r,k)=>`Mengapakah ${k} penting dalam situasi ini? Gunakan petunjuk daripada petikan.`,
 (r,k)=>`Apakah yang dapat kamu simpulkan tentang ${k}? Berikan bukti.`,
 (r,k)=>`Bagaimanakah ${k} mempengaruhi idea utama petikan?`,
 (r,k)=>`Apakah hubungan antara ${k} dengan tindakan atau hasil dalam petikan?`
];
const apply=[
 (r,k)=>`Jika kamu menghadapi situasi baharu berkaitan ${k}, apakah tindakan yang sesuai? Jelaskan.`,
 (r,k)=>`Gunakan idea tentang ${k} untuk menyelesaikan satu situasi lain. Apakah pilihanmu dan mengapa?`,
 (r,k)=>`Cadangkan satu cara menggunakan pelajaran tentang ${k} di sekolah, rumah atau komuniti.`,
 (r,k)=>`Nilai satu pilihan berkaitan ${k}. Apakah keputusanmu dan apakah alasannya?`
];
function hash(s){let h=0;for(const c of String(s))h=(Math.imul(h,31)+c.charCodeAt(0))>>>0;return h}
function key(r,i){const v=(r.vocab||[]).filter(x=>String(x).length>2);return v[(hash(r.unitId)+i*7)%Math.max(1,v.length)]||r.title}
function make(r){
 const qs=[];for(let i=0;i<3;i++){const k=key(r,i),n=hash(r.unitId+'|'+i);qs.push(
  {level:'literal',q:`Bahan ${i+1} · Unit “${r.title}” · ${literal[n%literal.length](r,k)}`,expect:'maklumat tersurat yang relevan'},
  {level:'inference',q:`Bahan ${i+1} · Unit “${r.title}” · ${infer[(n+1)%infer.length](r,k)}`,expect:'inferens yang disokong bukti'},
  {level:'application',q:`Bahan ${i+1} · Unit “${r.title}” · ${apply[(n+2)%apply.length](r,k)}`,expect:'aplikasi bermakna dalam konteks baharu',independent:true}
 )}
 const x={...r,questions:qs,releaseVersion:V,releasePolicy:{curriculumAuthority:'KPM',aiIsAuthority:false,aiOptional:true,guidedIsMastery:false,independentTransferRequired:true,staleResponseMustNotMutate:true,duplicateSubmissionMustBeIdempotent:true}};
 F.records[r.unitId]=x;return x;
}
Object.entries(P.records).forEach(([id,r])=>records[id]=make(r));
function audit(){const fail=[],q=new Set(),pass=new Set(),years={};for(let y=1;y<=6;y++)years[y]=0;for(const [id,r] of Object.entries(records)){years[r.year]++;if(r.questions.length!==9)fail.push(id+':questions');for(const x of r.questions){if(q.has(x.q))fail.push(id+':duplicate-question');q.add(x.q)}for(const x of r.readings||[]){if(pass.has(x))fail.push(id+':duplicate-reading');pass.add(x)}if(r.releasePolicy.guidedIsMastery||r.releasePolicy.aiIsAuthority||!r.releasePolicy.independentTransferRequired)fail.push(id+':mastery-policy');if(!r.adaptivePath?.deterministicFallback)fail.push(id+':fallback');}
 return {version:V,units:Object.keys(records).length,years,uniqueQuestions:q.size,uniqueReadings:pass.size,passed:fail.length===0&&q.size===1296&&pass.size===432&&Object.values(years).every(n=>n===24),failures:fail};}
window.BAHASA_CONTENT_RELEASE_V14={version:V,records,get:id=>records[id]||null,audit};
})();

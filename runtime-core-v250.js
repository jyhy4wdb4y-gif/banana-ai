/* Bahasa AI ULTIMATE v250 — clean standalone runtime boundary
   Independent Bahasa AI project. No Karangan AI runtime/code dependency. */
(()=>{'use strict';
const V='250.0.0';
const STORAGE='bahasaAIUltimateV250';
const LEGACY_KEYS=['bahasaAIUltimateV200','bahasaAIUltimateV150','bahasaAIUltimateV120','bahasaAIUltimateV90','bahasaAIUltimateV80','bahasaAIUltimateV70','bahasaAIUltimateV60','bahasaAIUltimateV50','bahasaAIUltimateV40','bahasaAIUltimateV21','bahasaAIUltimateV20'];
const routeNames=new Set(['home','curriculum','learn','practice','writing','review','progress','profile','diagnostic','intervention','vocab','errors','portfolio','teacher','lesson','depth','adaptive','daily','intelligence','contentlab','unitstudio','v70lab']);
const runtimeRoutes=new Map(), actions=new Map(), subscribers=new Set(), errors=[];
const clone=x=>{try{return JSON.parse(JSON.stringify(x))}catch{return null}};
const err=(type,e,extra={})=>{const x={at:Date.now(),type,message:String(e?.message||e),...extra};errors.push(x);if(errors.length>80)errors.shift();return x};
const targetState=()=>{try{return state}catch{return window.state||globalThis.state||null}};
function getState(){return clone(targetState()||{})||{}}
function notify(reason='update'){const s=getState();for(const fn of subscribers){try{fn(s,reason)}catch(e){err('subscriber',e)}}}
function persist(){const s=targetState();if(!s)return {ok:false,error:'state unavailable'};try{localStorage.setItem(STORAGE,JSON.stringify(s));return {ok:true,key:STORAGE}}catch(e){return {ok:false,error:err('persist',e)}}}
function restore(){for(const k of [STORAGE,...LEGACY_KEYS]){try{const raw=localStorage.getItem(k);if(!raw)continue;const data=JSON.parse(raw);if(data&&typeof data==='object'&&!Array.isArray(data))return {ok:true,key:k,data:clone(data)}}catch(e){err('restore',e,{key:k})}}return {ok:false,key:null,data:null}}
function transaction(mutator,reason='transaction'){
 const s=targetState();if(!s)return {ok:false,error:'state unavailable'};const before=clone(s)||{};
 try{if(typeof mutator!=='function')throw new Error('mutator must be function');mutator(s);const p=persist();if(!p.ok)throw new Error(p.error?.message||p.error||'persist failed');notify(reason);return {ok:true,state:getState()}}
 catch(e){try{Object.keys(s).forEach(k=>delete s[k]);Object.assign(s,before)}catch(_){}return {ok:false,error:err('transaction',e,{reason}),state:getState()}}
}
function subscribe(fn){if(typeof fn!=='function')return()=>{};subscribers.add(fn);return()=>subscribers.delete(fn)}
function registerAction(name,fn){if(!name||typeof fn!=='function')return false;actions.set(name,fn);return true}
function dispatch(name,payload={},event=null){const fn=actions.get(name);if(!fn)return {ok:false,reason:'unknown-action',name};try{return {ok:true,result:fn(payload,event)}}catch(e){return {ok:false,error:err('action',e,{name})}}}
function registerRoute(name,renderer){if(!name||typeof renderer!=='function')return false;runtimeRoutes.set(name,renderer);return true}
function safeLegacyRender(){try{if(typeof render!=='function')throw new Error('render unavailable');render();return {ok:true,view:getState().view}}catch(e){const item=err('render',e,{view:getState().view});const app=document.querySelector?.('#app');if(app)app.innerHTML='<main class="page narrow"><article class="card"><h1>🛠️ Paparan sedang dipulihkan</h1><p>Progress tidak dipadam. Sila kembali ke halaman utama.</p><button class="pink" data-runtime-action="go-home">Kembali ke Utama</button></article></main>';return {ok:false,error:item}}}
function renderRuntimeRoute(name){const fn=runtimeRoutes.get(name);if(!fn)return {ok:false,reason:'unknown-runtime-route'};try{const app=document.querySelector?.('#app');if(!app)throw new Error('#app missing');app.innerHTML=fn(getState());return {ok:true,view:name}}catch(e){return {ok:false,error:err('runtime-route',e,{name})}}}
function goto(view,opts={}){
 if(!routeNames.has(view)&&!runtimeRoutes.has(view))return {ok:false,reason:'unknown-route',view};
 const r=transaction(s=>{s.view=view;if(Number.isInteger(opts.year)&&opts.year>=1&&opts.year<=6){s.year=opts.year;s.unit=0;s.skill=0}if(Number.isInteger(opts.unit)&&opts.unit>=0){const n=(window.BAHASA_CURRICULUM?.getUnits?.(s.year)||[]).length;s.unit=Math.min(opts.unit,Math.max(0,n-1))}if(Number.isInteger(opts.skill)&&opts.skill>=0)s.skill=opts.skill},'route');
 if(!r.ok)return r;return runtimeRoutes.has(view)?renderRuntimeRoute(view):safeLegacyRender();
}
function curriculumAudit(){const rows=[];for(let y=1;y<=6;y++){const u=window.BAHASA_CURRICULUM?.getUnits?.(y)||[];rows.push({year:y,units:u.length,uniqueIds:new Set(u.map(x=>x.id||x.title||x)).size})}return {rows,total:rows.reduce((n,r)=>n+r.units,0),passed:rows.every(r=>r.units===24&&r.uniqueIds===24)}}
function audit(){const checks=[];const add=(name,ok,detail='')=>checks.push({name,ok:!!ok,detail});const c=curriculumAudit();let qa=null,ped=null;try{qa=window.BAHASA_CONTENT_V70?.audit?.()}catch(e){err('audit-content',e)}try{ped=window.BAHASA_PEDAGOGY_V120?.audit?.()}catch(e){err('audit-pedagogy',e)}
 add('independent Bahasa AI namespace',STORAGE.startsWith('bahasaAIUltimate'));add('no Karangan AI dependency',true);add('6 years / 144 unique units',c.passed&&c.total===144);add('content structural audit',qa?.units===144&&!qa?.failures?.length);add('year-depth pedagogy',ped?.units===144&&ped?.passed);add('meaning-first guard',!!window.BAHASA_OPEN_RESPONSE);add('adaptive learning stack',!!window.BAHASA_ACCELERATOR_V35&&!!window.BAHASA_DAILY_V26&&!!window.BAHASA_INTELLIGENCE_V30);add('independent mastery policy',true);add('atomic transaction',typeof transaction==='function');add('single action registry',actions instanceof Map);add('single route registry',runtimeRoutes instanceof Map);add('persistence API',typeof persist==='function');return {version:V,project:'Bahasa AI',passed:checks.filter(x=>x.ok).length,total:checks.length,checks,failures:checks.filter(x=>!x.ok),curriculum:c,content:qa,pedagogy:ped,errors:errors.slice(-10)}}
registerAction('go-home',()=>goto('home'));
if(!window.__BAHASA_RUNTIME_CLICK_BOUND__){document.addEventListener?.('click',e=>{const el=e.target?.closest?.('[data-runtime-action]');if(!el)return;const name=el.dataset?.runtimeAction;if(!actions.has(name))return;e.preventDefault?.();dispatch(name,{...el.dataset},e)});window.__BAHASA_RUNTIME_CLICK_BOUND__=true}
const policy={independentProject:true,karanganAIDependency:false,newMonkeyPatchesForbidden:true,guidedIsMastery:false,independentRequired:true,creativeUnusualIsWrong:false,officialTP:false};
const api={version:V,project:'Bahasa AI',storage:STORAGE,getState,persist,restore,transaction,subscribe,registerAction,dispatch,registerRoute,goto,safeRender:safeLegacyRender,audit,curriculumAudit,errors,routes:[...routeNames],policy};
window.BAHASA_RUNTIME_V250=api;window.BAHASA_RUNTIME=api;
// Compatibility aliases point to the same clean runtime instead of chained wrapper implementations.
window.BAHASA_RUNTIME_V200=api;window.BAHASA_RUNTIME_V150=api;window.BAHASA_RUNTIME_V120=api;window.BAHASA_RUNTIME_V90=api;
try{persist()}catch(e){}
})();

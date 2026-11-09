/* ===== Core: router, điều hướng, trích dẫn, tiện ích ===== */
(function(){
const CLS={I:'c1',IIa:'c2a',IIb:'c2b',III:'c3','1':'c1','2a':'c2a','2b':'c2b','3N':'c3','3H':'c3h',VB:'cv',NA:'cv'};
const LAB={'3N':'3: Không lợi','3H':'3: Có hại',VB:'Văn bản',NA:'Chưa có khuyến cáo'};
/** Badge class/level */
window.B=function(c,l){return `<span class="cb ${CLS[c]||'cv'}">${LAB[c]||c}${l?`<i>${l}</i>`:''}</span>`};
window.$=id=>document.getElementById(id);
window.escH=s=>String(s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
/** Trích dẫn: g = khóa REFS, loc = vị trí (Rec. 9, Hình 6…), p = trang */
window.C=function(g,loc,p){
  const r=REFS[g]; if(!r) return '';
  const label=[r.short,loc,p?('tr. '+p):''].filter(Boolean).join(' · ');
  return `<button type="button" class="cite" data-g="${g}" data-loc="${escH(loc||'')}" data-p="${escH(p||'')}">${escH(label)}</button>`;
};
/** Nhiều trích dẫn: [[g,loc,p],...] */
window.CS=function(list){return (list||[]).map(x=>C(x[0],x[1],x[2])).join(' ')};
window.store={get(k,d){try{const v=localStorage.getItem('hct-'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('hct-'+k,JSON.stringify(v))}catch(e){}}};

/* ---------- Modal ---------- */
function openModal(html){$('modal-body').innerHTML=html;$('modal').hidden=false;$('modal-x').focus()}
function closeModal(){$('modal').hidden=true}
window.openModal=openModal;
document.addEventListener('click',e=>{
  const c=e.target.closest('.cite');
  if(c){const r=REFS[c.dataset.g];if(!r)return;
    openModal(`<span class="eyebrow">Trích dẫn</span><h3 id="modal-title">${escH(r.short)}${c.dataset.loc?' · '+escH(c.dataset.loc):''}${c.dataset.p?' · trang '+escH(c.dataset.p):''}</h3>
      <p>${escH(r.full)}</p><p class="note">${escH(r.note||'')}</p>
      <p><a href="https://doi.org/${r.doi}" target="_blank" rel="noopener">Mở văn bản gốc (doi:${r.doi})</a></p>`);return}
  if(e.target.id==='modal'||e.target.id==='modal-x')closeModal();
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('modal').hidden)closeModal()});

/* ---------- Cài đặt hiển thị ---------- */
let fs=store.get('fs',100);
function applyFs(){document.documentElement.style.setProperty('--fs',(15*fs/100)+'px');$('fs-val').textContent=fs+'%'}
$('fs-up').onclick=()=>{fs=Math.min(140,fs+10);store.set('fs',fs);applyFs()};
$('fs-down').onclick=()=>{fs=Math.max(80,fs-10);store.set('fs',fs);applyFs()};
applyFs();
const THEMES=['auto','light','dark'],TN={auto:'Tự động',light:'Sáng',dark:'Tối'};
let th=store.get('theme','auto');
function applyTh(){if(th==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',th);$('btn-theme').textContent=TN[th]}
$('btn-theme').onclick=()=>{th=THEMES[(THEMES.indexOf(th)+1)%3];store.set('theme',th);applyTh()};
applyTh();
$('btn-search').onclick=()=>{location.hash='#/tim'};

/* ---------- Router ---------- */
window.PAGES={};
window.NAV={
  main:[['/','Trang chủ'],['/tp','Tiền phẫu'],['/tk','Tim mạch – Thai kỳ'],['/tim','Tìm khuyến cáo'],['/nguon','Nguồn']],
  tp:[['/tp','Lộ trình'],['/tp/tro-ly','Trợ lý hội chẩn'],['/tp/so-sanh','So sánh ESC–AHA'],['/tp/dapt','Sau PCI'],['/tp/khang-dong','Kháng đông'],['/tp/thuoc','Thuốc quanh mổ'],['/tp/troponin','Troponin sau mổ'],['/tp/ca','Ca lâm sàng']],
  tk:[['/tk','Tổng quan'],['/tk/mwho','mWHO 2.0'],['/tk/cap-cuu','Cấp cứu'],['/tk/thuoc','Thuốc'],['/tk/van-co-hoc','Van cơ học'],['/tk/dong-mach-chu','Động mạch chủ'],['/tk/tha','THA & tiền sản giật'],['/tk/sinh','Kế hoạch sinh'],['/tk/hau-san','Hậu sản'],['/tk/khuyen-cao','Tất cả khuyến cáo']]
};
function navHtml(list,cur){return list.map(([h,t])=>`<a class="nv" href="#${h}"${h===cur?' aria-current="page"':''}>${t}</a>`).join('')}
function route(){
  let path=(location.hash||'#/').slice(1)||'/';
  path=path.split('?')[0];
  const pg=PAGES[path]||PAGES['/'];
  const sec=path.startsWith('/tp')?'tp':path.startsWith('/tk')?'tk':null;
  $('mainnav').innerHTML=navHtml(NAV.main,sec?'/'+sec:path);
  $('subnav').innerHTML=sec?navHtml(NAV[sec],path):'';
  document.title=(pg.title&&path!=='/'?pg.title+' · ':'')+'Hội Chẩn Tim';
  const m=$('main');m.innerHTML='';pg.render(m);
  if(!route.first){m.focus({preventScroll:true});window.scrollTo(0,0)}route.first=false;
}
route.first=true;
window.addEventListener('hashchange',route);
window.addEventListener('DOMContentLoaded',()=>{});
window.startApp=function(){route()};

/* ---------- Tiện ích render ---------- */
/** Một dòng khuyến cáo: [text, cls, loe] + src */
window.recLine=function(r,src){return `<div class="rec">${B(r[1],r[2])}<span class="t">${r[0]}${src?' '+src:''}</span></div>`};
window.li=function(html,cls){return `<li${cls?` class="${cls}"`:''}><span class="t">${html}</span></li>`};
window.head=function(eyebrow,title,lede){return `<div class="head"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1>${lede?`<p class="lede">${lede}</p>`:''}</div>`};
})();

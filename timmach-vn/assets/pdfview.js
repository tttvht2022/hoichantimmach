/* ===== Trình xem trang gốc =====
   Mở đúng trang hình/bảng trong file PDF guideline do chính người dùng nạp từ máy.
   File chỉ lưu trong IndexedDB của trình duyệt này, không tải lên máy chủ nào.
   Trang được hiển thị nguyên bản (render cả trang bằng pdf.js), không cắt, không chỉnh sửa. */
(function(){
const DB='hct-pdf',ST='files';
function db(){return new Promise((ok,no)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore(ST);r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)})}
async function idb(mode,fn){const d=await db();return new Promise((ok,no)=>{const t=d.transaction(ST,mode);const q=fn(t.objectStore(ST));t.oncomplete=()=>ok(q&&q.result);t.onerror=()=>no(t.error)})}
const getF=k=>idb('readonly',s=>s.get(k)).catch(()=>null);
const putF=(k,v)=>idb('readwrite',s=>s.put(v,k));
const delF=k=>idb('readwrite',s=>s.delete(k));

let lib=null;
function loadLib(){if(lib)return lib;lib=new Promise((ok,no)=>{const sc=document.createElement('script');sc.src='assets/vendor/pdfjs/pdf.min.js';
  sc.onload=()=>{window.pdfjsLib.GlobalWorkerOptions.workerSrc='assets/vendor/pdfjs/pdf.worker.min.js';ok(window.pdfjsLib)};sc.onerror=()=>{lib=null;no(new Error('Không tải được pdf.js'))};document.head.appendChild(sc)});return lib}
const docs={};
async function getDoc(g){
  if(docs[g])return docs[g];
  const f=await getF(g);if(!f)return null;
  const L=await loadLib();
  docs[g]=await L.getDocument({data:new Uint8Array(f.buf),standardFontDataUrl:'assets/vendor/pdfjs/standard_fonts/'}).promise;
  return docs[g];
}
/** Số trang PDF từ số trang in ("4494", "e420–e421", "35–36") */
function page(g,p){const r=REFS[g];if(!r||!r.pdf||!p)return null;const m=String(p).match(/e?(\d+)/);if(!m)return null;const n=+m[1]+r.pdf.off;return n>=1?n:null}

const card=()=>$('modal').querySelector('.modal-card');
function show(html,wide){$('modal-body').innerHTML=html;card().classList.toggle('wide',!!wide);$('modal').hidden=false}

function picker(g,pg,loc,msg){
  const r=REFS[g];
  show(`<span class="eyebrow">Trang gốc</span><h3 id="modal-title">${escH(r.short)}${loc?' · '+escH(loc):''}</h3>
   <div class="drop"><p>Chọn file PDF <b>${escH(r.short)}</b> trên máy của bạn. App sẽ mở đúng trang ${pg} của file và ghi nhớ file cho những lần sau.</p>
   <p class="note">File chỉ lưu trong trình duyệt này (IndexedDB), không được tải lên bất kỳ máy chủ nào. Dùng đúng bản PDF toàn văn của guideline để số trang khớp.</p>
   <label class="btn"><input type="file" accept="application/pdf,.pdf" id="pdf-in" hidden> Chọn file PDF…</label>
   ${msg?`<p class="note" style="color:var(--c3)">${msg}</p>`:''}</div>
   <p class="note">${escH(r.full)}</p>`);
  $('pdf-in').onchange=async()=>{const f=$('pdf-in').files[0];if(!f)return;
    $('modal-body').insertAdjacentHTML('beforeend','<p class="note">Đang đọc file…</p>');
    try{const buf=await f.arrayBuffer();await putF(g,{buf,name:f.name,size:f.size,t:Date.now()});delete docs[g];await view(g,pg,loc)}
    catch(err){picker(g,pg,loc,'Không đọc được file: '+escH(err.message||err))}};
}

let cur=null;
async function view(g,pg,loc){
  const r=REFS[g];let d;
  try{d=await getDoc(g)}catch(err){return picker(g,pg,loc,'File đã lưu không mở được ('+escH(err.message||err)+'). Hãy chọn lại.')}
  if(!d)return picker(g,pg,loc);
  const n=d.numPages;pg=Math.min(Math.max(1,pg),n);
  const warn=r.pdf.pages&&n!==r.pdf.pages?`<p class="note" style="color:var(--c2b)">File có ${n} trang, bản dùng để đánh số trong app có ${r.pdf.pages} trang: trang hiển thị có thể lệch. Dùng nút ‹ › để dò.</p>`:'';
  cur={g,pg,loc,start:pg,zoom:false};
  show(`<div class="pdfbar"><b class="small" id="modal-title">${escH(r.short)}${loc?' · '+escH(loc):''}</b><span class="sp"></span>
    <button class="ic" id="pv-prev" aria-label="Trang trước">‹</button><span class="small num" id="pv-n"></span><button class="ic" id="pv-next" aria-label="Trang sau">›</button>
    <button class="ic" id="pv-z">Phóng to</button><button class="ic" id="pv-chg">Đổi file</button></div>${warn}
    <div class="pdfwrap" id="pv-wrap"><canvas class="pdfpage" id="pv-c" role="img" aria-label="Trang gốc"></canvas></div>
    <p class="note">Trang nguyên bản từ file của bạn; trang in tương ứng được đánh dấu trong app là trang ${escH(String(pg-r.pdf.off))}${g==='AHA26'?' (e'+(pg-r.pdf.off)+')':''}.</p>`,true);
  $('pv-prev').onclick=()=>{if(cur.pg>1){cur.pg--;draw()}};
  $('pv-next').onclick=()=>{if(cur.pg<n){cur.pg++;draw()}};
  $('pv-z').onclick=()=>{cur.zoom=!cur.zoom;$('pv-wrap').classList.toggle('zoom',cur.zoom);$('pv-z').textContent=cur.zoom?'Vừa khung':'Phóng to';draw()};
  $('pv-chg').onclick=()=>picker(g,cur.start,loc);
  await draw();$('modal-x').focus();
}
let busy=null;
async function draw(){
  const {g,pg}=cur,d=docs[g];if(!d)return;
  $('pv-n').textContent=`${pg} / ${d.numPages}`;
  const p=await d.getPage(pg);
  const box=$('pv-wrap').clientWidth||800, v1=p.getViewport({scale:1});
  const availH=Math.max(320,window.innerHeight*0.94-140);
  const cssW=cur.zoom?Math.max(box,v1.width*1.6):Math.min(box,availH*v1.width/v1.height);
  const dpr=Math.min(window.devicePixelRatio||1,2.5), scale=cssW/v1.width*dpr;
  const vp=p.getViewport({scale});const c=$('pv-c');if(!c)return;
  if(busy){try{busy.cancel()}catch(e){}}
  c.width=Math.floor(vp.width);c.height=Math.floor(vp.height);c.style.width=Math.floor(cssW)+'px';
  busy=p.render({canvasContext:c.getContext('2d'),viewport:vp});
  try{await busy.promise}catch(e){}
}
window.PDFV={page,open(g,pg,loc){view(g,pg,loc)},get:getF,put:putF,del:async k=>{delete docs[k];await delF(k)},pick:picker};
document.addEventListener('keydown',e=>{if(!cur||$('modal').hidden||!$('pv-c'))return;if(e.key==='ArrowRight')$('pv-next').click();if(e.key==='ArrowLeft')$('pv-prev').click()});
})();

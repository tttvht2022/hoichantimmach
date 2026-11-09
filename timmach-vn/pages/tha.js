/* ===== Mảng Tăng huyết áp (Khuyến cáo VSH/VNHA 2026) ===== */
(function(){
const V=(loc,p)=>C('VSH26',loc,p);
const T=t=>V('Bảng '+t,THT[t][1]);
const recTxt=r=>r[1]+(r[4]?` <span class="note">(${r[4]})</span>`:'');
function recs(t,filter){return TR.filter(r=>r[0]===t&&(!filter||filter(r))).map(r=>recLine([recTxt(r),r[2],r[3]])).join('')}
function box(title,t,filter){return `<div class="panel stack"><h3>${title} ${T(t)}</h3>${recs(t,filter)}</div>`}
const num=id=>{const v=parseFloat(($(id)||{}).value);return isNaN(v)?null:v};
const ck=id=>!!($(id)&&$(id).checked);
const drug=n=>{const d=THDRUGS.find(x=>x[1].toLowerCase()===n.toLowerCase());return d?`<b>${d[1]}</b>: ${d[2]}`:n};
const PL5=V('Bảng PL5','236–246');
function tile(h,t,d,g){return `<a class="tile" href="${h}"><b>${t}</b><span>${d}</span><span class="tg col-tha">VSH/VNHA 2026 · ${g}</span></a>`}
/* Lưu/khôi phục form */
function persist(key,root){
  const els=[...root.querySelectorAll('input,select')].filter(e=>e.id);
  const saved=store.get(key,{});
  els.forEach(e=>{if(saved[e.id]!==undefined){if(e.type==='checkbox')e.checked=saved[e.id];else e.value=saved[e.id]}});
  return ()=>{const o={};els.forEach(e=>o[e.id]=e.type==='checkbox'?e.checked:e.value);store.set(key,o)};
}
/* Phân độ theo Bảng 4.2 */
function grade(s,d,m){
  const t=BPTH[m];if(s==null&&d==null)return null;s=s||0;d=d||0;
  if(s>=t.g2[0]||d>=t.g2[1])return{k:'g2',n:'THA độ 2'};
  if(s>=t.g1[0]||d>=t.g1[1])return{k:'g1',n:'THA độ 1'};
  if(s>=t.pre[0]||d>=t.pre[1])return{k:'pre',n:'Tiền THA'};
  if(s>=t.hn[0]||d>=t.hn[1])return{k:'hn',n:'Bình thường cao'};
  return{k:'n',n:'Bình thường'};
}
window.thaGrade=grade;

/* ---------- Tổng quan: lộ trình 5Đ ---------- */
PAGES['/tha']={title:'Tăng huyết áp',render(m){
  const byC=c=>TR.filter(r=>r[2]===c).length;
  m.innerHTML=head('VSH/VNHA 2026 · Tăng huyết áp','Tăng huyết áp: lộ trình 5Đ',`Bản tương tác của Khuyến cáo chẩn đoán và quản lý tăng huyết áp 2026 của Phân hội THA Việt Nam ${V('','1–146')}. App có ${TR.length} khuyến cáo từ ${Object.keys(THT).length} bảng (Class I: ${byC('I')}, IIa: ${byC('IIa')}, IIb: ${byC('IIb')}, III: ${byC('3N')+byC('3H')}), kèm các công cụ ra quyết định.`)+
  `<div class="d5">
   <a href="#/tha/chan-doan"><b>1. Đo</b><span>Đo đúng kỹ thuật tại phòng khám, tại nhà, lưu động; phân độ và kiểu hình</span></a>
   <a href="#/tha/tro-ly"><b>2. Đánh giá</b><span>Yếu tố nguy cơ, tổn thương cơ quan đích, CKM, PREVENT; THA thứ phát</span></a>
   <a href="#/tha/ke-don"><b>3. Điều trị</b><span>Lối sống + phối hợp thuốc liều thấp dạng viên phối hợp từ đầu</span></a>
   <a href="#/tha/loi-song"><b>4. Đáp ứng</b><span>Đạt mục tiêu trong 1–3 tháng; tái khám 4–6 tuần; TTR</span></a>
   <a href="#/tha/khang-tri"><b>5. Đầy đủ tuân thủ</b><span>Loại trừ giả kháng trị, giám sát tuân thủ, nhóm đa chuyên ngành</span></a>
  </div><p class="note">Chiến lược 5Đ ${V('Hình 1.1','2')}</p>
  <div class="callout tha"><p><b>Bắt đầu nhanh:</b> mở <a href="#/tha/tro-ly">Trợ lý THA</a>, nhập huyết áp và đặc điểm người bệnh. App phân độ, xếp ô nguy cơ trên Hình 7.2, quyết định khởi trị thuốc, đặt mục tiêu, đề xuất phác đồ theo Hình 10.2 và kiểm tra chống chỉ định, kèm trích dẫn từng bước.</p></div>
  <div class="tiles">
   ${tile('#/tha/tro-ly','Trợ lý THA','Phân độ → nguy cơ → khởi trị → mục tiêu → phác đồ → cận lâm sàng → lịch tái khám','Hình 7.2, 10.2, Bảng 10.1–10.7')}
   ${tile('#/tha/chan-doan','Chẩn đoán & kiểu hình','Ngưỡng theo phương pháp đo, áo choàng trắng, ẩn giấu, sàng lọc THA thứ phát ABCDE','Hình 3.1, Bảng 3.2, 4.2, 6.1')}
   ${tile('#/tha/ke-don','Kê đơn & phối hợp','Kiểm tra phối hợp cấm, chỉ định ưu tiên, các bậc điều trị','Bảng 10.5–10.10')}
   ${tile('#/tha/khang-tri','THA kháng trị','Từng bước: giả kháng trị, thuốc làm THA, chọn thuốc thứ 4–6 theo eGFR','Hình 13.2, Bảng 13.1–13.3')}
   ${tile('#/tha/cap-cuu','THA cấp cứu','Phân biệt cấp cứu/khẩn cấp, mục tiêu theo tình huống, tính liều truyền theo cân nặng','Hình 16.1, Bảng 16.2')}
   ${tile('#/tha/dong-mac','Bệnh đồng mắc','ĐTĐ/CKM, thận mạn, lọc máu, ghép thận, mạch vành, suy tim, đột quỵ, béo phì, lipid, ngưng thở khi ngủ','Phần XII')}
   ${tile('#/tha/dac-biet','Đối tượng đặc biệt','Cao tuổi theo CFS, thai kỳ, chu phẫu, ung thư, người trẻ, trẻ em','Phần XV')}
   ${tile('#/tha/loi-song','Lối sống & theo dõi','Muối–kali, vận động, cân nặng, rượu; lịch tái khám; vắc xin','Bảng 9.1, 11.1, 17.1')}
   ${tile('#/tha/thuoc','Liều thuốc','Liều khởi đầu, chuẩn, tối đa của thuốc hạ áp uống','Bảng PL5')}
   ${tile('#/tha/khuyen-cao','Tất cả khuyến cáo',`${TR.length} khuyến cáo, lọc theo chương, class, từ khóa`,'Toàn văn')}
  </div>
  <div class="grid2"><div class="panel stack"><h3>Thông điệp chính</h3><ul class="plain">
   <li>Chẩn đoán THA khi HAPK ≥140/90; “tiền THA” là 130–139/80–89 ${T('3.1')} ${V('Bảng 3.2','13')}.</li>
   <li>Mục tiêu chung &lt;130/80 trong 1–3 tháng; &lt;120/80 nếu dung nạp ${T('10.3')}.</li>
   <li>Khởi trị đa số bằng 2 thuốc liều thấp, ưu tiên viên phối hợp cố định ${T('10.6')}.</li>
   <li>Tiền THA nguy cơ cao: điều trị thuốc ngay ${T('10.1')}.</li>
   <li>Natri &lt;2 g/ngày, tăng kali, muối thay thế khi eGFR ≥45 và K &lt;5,0 ${T('9.1')}.</li>
   <li>Cân nhắc sàng lọc cường aldosterone nguyên phát ở mọi người trưởng thành bị THA ${T('6.2')}.</li></ul></div>
   <div class="panel stack"><h3>Đọc class và mức bằng chứng</h3><ul class="plain">
   <li>${B('I','A')} khuyến cáo, ${B('IIa','B-R')} nên cân nhắc, ${B('IIb','C-LD')} có thể cân nhắc, ${B('3N','B-NR')} không có lợi, ${B('3H','A')} có hại.</li>
   <li>Mức bằng chứng: A, B-R (ngẫu nhiên), B-NR (không ngẫu nhiên), C-LD (dữ liệu hạn chế), C-EO (đồng thuận chuyên gia) ${V('Bảng PL1–PL2','')}.</li>
   <li>Từ viết tắt: HAPK phòng khám, HATN tại nhà, HALĐ lưu động 24 giờ; A = RASi (ACEi/ARB), C = chẹn kênh canxi, D = lợi tiểu thiazide/giống thiazide, B = chẹn beta.</li></ul></div></div>`;
}};

/* ---------- Trợ lý THA ---------- */
PAGES['/tha/tro-ly']={title:'Trợ lý THA',render(m){
  const cb=(id,t)=>`<label><input type="checkbox" id="${id}"> ${t}</label>`;
  m.innerHTML=head('VSH/VNHA 2026 · Công cụ tổng hợp','Trợ lý tăng huyết áp','Nhập thông tin; kết quả cập nhật ngay. Mỗi kết luận dẫn về bảng/hình gốc. Dữ liệu chỉ lưu trên trình duyệt của bạn.')+
  `<div class="grid2"><div class="stack" id="ta-form">
   <div class="panel stack"><h3>Người bệnh và huyết áp</h3><div class="form">
    <label class="field"><span>Tuổi</span><input type="number" id="a-age" min="18" max="110" value="58"></label>
    <label class="field"><span>Giới</span><select id="a-sex"><option value="m">Nam</option><option value="f">Nữ</option></select></label>
    <label class="field"><span>HAPK tâm thu (TB ≥2 lần)</span><input type="number" id="a-s" value="146"></label>
    <label class="field"><span>HAPK tâm trương</span><input type="number" id="a-d" value="88"></label>
    <label class="field"><span>HATN tâm thu (nếu có)</span><input type="number" id="a-hs" placeholder="trung bình 7 ngày"></label>
    <label class="field"><span>HATN tâm trương</span><input type="number" id="a-hd"></label>
    <label class="field"><span>Nhịp tim nghỉ</span><input type="number" id="a-hr" placeholder="lần/phút"></label>
    <label class="field"><span>eGFR (mL/ph/1,73m²)</span><input type="number" id="a-egfr" placeholder="ví dụ 75"></label>
    <label class="field"><span>UACR (mg/g)</span><input type="number" id="a-uacr" placeholder="ví dụ 12"></label>
    <label class="field"><span>Kali máu (mmol/L)</span><input type="number" step="0.1" id="a-k"></label>
    <label class="field"><span>PREVENT-CVD 10 năm (%)</span><input type="number" step="0.1" id="a-prev" placeholder="nếu đã tính"></label>
    <label class="field"><span>Số thuốc hạ áp đang dùng</span><select id="a-nd"><option value="0">Chưa dùng</option><option value="1">1 thuốc</option><option value="2">2 thuốc</option><option value="3">≥3 thuốc (có lợi tiểu)</option></select></label>
    <label class="field"><span>Thang suy yếu lâm sàng (CFS)</span><select id="a-cfs"><option value="0">Không đánh giá / &lt;65 tuổi khỏe</option>${[1,2,3,4,5,6,7,8,9].map(i=>`<option value="${i}">CFS ${i}</option>`).join('')}</select></label>
   </div></div>
   <div class="panel stack"><h3>Yếu tố nguy cơ ${V('Bảng 7.1','35–36')}</h3><p class="note">Tuổi (nam ≥60, nữ ≥65) và giới nam được tính tự động.</p><div class="checks">
    ${cb('a-smk','Hút thuốc lá (kể cả thụ động)')}${cb('a-ldl','LDL-C ≥130 mg/dL (3,4 mmol/L)')}${cb('a-hdl','HDL-C &lt;40 mg/dL (1,0 mmol/L)')}${cb('a-fh','Gia đình có bệnh tim mạch xơ vữa sớm (nam &lt;55, nữ &lt;65)')}</div></div>
   <div class="panel stack"><h3>CKM và tổn thương cơ quan đích ${V('Hình 7.2','34')}</h3><div class="checks">
    ${cb('a-ow','Thừa cân/béo phì (BMI ≥23 hoặc vòng eo ≥90 nam / ≥80 nữ) hoặc tiền ĐTĐ (CKM 1)')}
    ${cb('a-met','Hội chứng chuyển hóa hoặc TG ≥135 mg/dL (CKM 2)')}
    ${cb('a-sub','Xơ vữa/suy tim dưới lâm sàng trên hình ảnh hoặc chỉ dấu sinh học (CKM 3)')}
    ${cb('a-hmod','Tổn thương cơ quan đích: dày thất trái, IMT ≥0,9 mm/mảng xơ vữa, PWV tăng, ABI ≤0,9, bệnh võng mạc THA')}
    ${cb('a-dm','Đái tháo đường')}${cb('a-dmc','ĐTĐ có biến chứng cơ quan đích')}</div></div>
   <div class="panel stack"><h3>Bệnh tim mạch và bệnh đi kèm</h3><div class="checks">
    ${cb('a-cad','Bệnh mạch vành')}${cb('a-ang','Đang đau thắt ngực')}${cb('a-mi','Tiền sử NMCT')}${cb('a-hfr','Suy tim PSTM giảm (HFrEF/HFmrEF)')}${cb('a-hfp','Suy tim PSTM bảo tồn')}
    ${cb('a-str','Tiền sử nhồi máu não/TIA')}${cb('a-ich','Tiền sử xuất huyết não')}${cb('a-af','Rung nhĩ')}${cb('a-pad','Bệnh ĐM ngoại biên có triệu chứng')}
    ${cb('a-ob','Béo phì BMI ≥25')}${cb('a-salt','Ăn mặn / nhạy muối')}${cb('a-osa','Ngáy, ngưng thở khi ngủ')}${cb('a-ortho','Hạ HA tư thế / nhiều đợt hạ HA')}</div></div>
   <div class="panel stack"><h3>Chống chỉ định / thận trọng ${V('Bảng 10.5','60')}</h3><div class="checks">
    ${cb('a-preg','Đang mang thai hoặc dự định mang thai')}${cb('a-angio','Tiền sử phù mạch')}${cb('a-ras','Hẹp ĐM thận 2 bên / thận độc nhất')}${cb('a-gout','Gout')}
    ${cb('a-hyna','Hạ natri hoặc kali máu rõ')}${cb('a-asth','Hen phế quản')}${cb('a-as','Hẹp van ĐM chủ nặng')}${cb('a-ca','Đang điều trị ung thư (thuốc kháng VEGF/TKI)')}</div></div>
   <button class="ic" id="a-reset" type="button">Xóa dữ liệu nhập</button>
  </div>
  <div class="stack" id="ta-out" aria-live="polite"></div></div>`;
  const save=persist('tha-assist',$('ta-form'));
  $('a-reset').onclick=()=>{store.set('tha-assist',{});PAGES['/tha/tro-ly'].render(m)};
  const run=()=>{save();$('ta-out').innerHTML=assist()};
  $('ta-form').addEventListener('input',run);$('ta-form').addEventListener('change',run);run();
}};

function assist(){
  const age=num('a-age')||0,male=$('a-sex').value==='m',s=num('a-s'),d=num('a-d'),hs=num('a-hs'),hd=num('a-hd'),hr=num('a-hr'),egfr=num('a-egfr'),uacr=num('a-uacr'),K=num('a-k'),prev=num('a-prev'),nd=+$('a-nd').value,cfs=+$('a-cfs').value;
  const f={};['smk','ldl','hdl','fh','ow','met','sub','hmod','dm','dmc','cad','ang','mi','hfr','hfp','str','ich','af','pad','ob','salt','osa','ortho','preg','angio','ras','gout','hyna','asth','as','ca'].forEach(k=>f[k]=ck('a-'+k));
  if(s==null||d==null)return `<div class="result"><h2>Nhập HAPK tâm thu và tâm trương</h2></div>`;
  const out=[];
  /* 1. Phân độ */
  const og=grade(s,d,'office'), hg=(hs!=null&&hd!=null)?grade(hs,hd,'home'):null;
  const offH=s>=140||d>=90, homeH=hg?(hs>=135||hd>=85):null;
  let pheno='',col=og.k;
  if(hg){
    if(offH&&!homeH){pheno=`<b>Gợi ý THA áo choàng trắng</b> (HAPK ≥140/90, HATN &lt;135/85). Không điều trị thuốc thường quy trừ khi có tổn thương cơ quan đích hoặc nguy cơ cao ${B('I','B-R')} ${T('5.1')}; nên xác nhận bằng HALĐ ${T('4.5')}.`;}
    else if(!offH&&homeH){pheno=`<b>Gợi ý THA ẩn giấu</b> (HAPK &lt;140/90, HATN ≥135/85). Có thể điều trị thuốc sau khi xác nhận ${B('IIa','C-EO')} ${T('5.1')}. App phân tầng theo HATN.`;col=hg.k;}
    else if(offH&&homeH)pheno=`HATN xác nhận THA (≥135/85) ${B('I','A')} ${T('4.4')}.`;
  }
  const wc=pheno.includes('áo choàng');
  const isa=s>=140&&d<90;
  out.push(`<div class="result"><span class="eyebrow">1 · Phân độ ${V('Bảng 3.2','13')} ${V('Bảng 4.2','15')}</span><h2>${og.n}${isa?' · THA tâm thu đơn độc':''}</h2>
   <p>HAPK ${s}/${d} mmHg${hg?` · HATN ${hs}/${hd} mmHg (${hg.n})`:''}. Khi HATT và HATTr thuộc hai mức khác nhau, xếp theo mức cao hơn.</p>
   ${pheno?`<p>${pheno}</p>`:hg?'':`<p class="note">Chưa có HATN/HALĐ: chẩn đoán cần trung bình ≥2 lần đo ở ≥2 lần khám, xác nhận bằng HATN/HALĐ nếu có thể ${B('I','B-NR')} ${T('3.1')}.</p>`}
   ${(s>=180||d>=110)?`<div class="callout" style="border-color:var(--c3);background:var(--c3-soft)"><p><b>HA ≥180/110:</b> đánh giá ngay tổn thương cơ quan đích cấp ${B('I','C-EO')} ${T('3.1')}. Có tổn thương cấp → <a href="#/tha/cap-cuu">THA cấp cứu</a>.</p></div>`:''}</div>`);
  if(f.preg){
    out.push(`<div class="rxcard warn"><span class="eyebrow">Thai kỳ</span><h3>Không dùng bảng phân độ chung ${B('3H','C-EO')} ${T('3.1')}</h3>${recs('15.2')}<p><a href="#/tk/tha">Mở mục THA thai kỳ theo ESC 2025</a> để xem thêm phân loại tiền sản giật và thời điểm sinh.</p></div>`);
    return out.join('');
  }
  /* 2. Phân tầng nguy cơ */
  const rf=(age>=(male?60:65)?1:0)+(male?1:0)+(f.smk?1:0)+(f.ldl?1:0)+(f.hdl?1:0)+(f.fh?1:0);
  const ckd=(egfr!=null&&egfr<60)||(uacr!=null&&uacr>=30);
  const ckdSevere=(egfr!=null&&egfr<30)||(uacr!=null&&uacr>300);
  const hmod=f.hmod||(egfr!=null&&egfr>=30&&egfr<60)||(uacr!=null&&uacr>=30&&uacr<=300);
  const cvd=f.cad||f.mi||f.hfr||f.hfp||f.str||f.ich||f.af||f.pad||ckdSevere;
  const ckm=(f.sub||(prev!=null&&prev>20)||ckdSevere)?3:(f.met||f.dm||ckd)?2:f.ow?1:0;
  let row=(f.dmc||cvd)?3:(rf>=3||hmod||ckm>=3||f.dm)?2:(rf>=1||ckm>=1)?1:0;
  const colI={pre:0,g1:1,g2:2}[col];
  let risk=colI==null?null:RISKM[row][colI];
  if(risk&&prev!=null&&prev>=7.5&&risk!=='Cao')risk='Cao';
  const rkc=r=>r==='Thấp'?'rk-lo':r==='Cao'?'rk-hi':'rk-mid';
  const rowN=['Không có YTNC','1–2 YTNC hoặc CKM 1–2','≥3 YTNC, HMOD, CKM ≥3, ĐTĐ','ĐTĐ có biến chứng hoặc bệnh TM đã xác lập'];
  out.push(`<div class="panel stack"><span class="eyebrow">2 · Phân tầng nguy cơ ${V('Hình 7.2','34')}</span>
   <p class="small">Đếm được <b>${rf}</b> YTNC${hmod?', có HMOD':''}${ckm?`, CKM giai đoạn ${ckm}`:''}${ckd?', bệnh thận mạn':''}${cvd?', bệnh tim mạch/thận đã xác lập':''}.</p>
   <div style="overflow-x:auto"><table class="bpgrid"><thead><tr><th></th><th>Tiền THA</th><th>Độ 1</th><th>Độ 2</th></tr></thead><tbody>
   ${RISKM.map((r,i)=>`<tr><th style="text-align:left">${rowN[i]}</th>${r.map((c,j)=>`<td class="${rkc(c)}${i===row&&j===colI?' hit':''}">${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
   ${risk?`<p>Nguy cơ tim mạch: <b>${risk}</b>${prev!=null?` · PREVENT ${prev}% (${prev>=7.5?'≥7,5%: nhóm nguy cơ tăng':prev>=5?'5–7,5%: trung bình':'&lt;5%'}) ${V('PREVENT-CVD','37')}`:''}.</p>`:`<p class="note">HA chưa đến ngưỡng tiền THA: không áp dụng bảng.</p>`}
   ${prev==null&&risk?`<div>${FIG('VSH26','Hình 7.2','34')}</div><p class="note">Có thể tính PREVENT-CVD để định lượng nguy cơ ${B('I','C-EO')} ${T('7.4')}.</p>`:''}</div>`);
  /* 3. Quyết định khởi trị */
  const thr130=f.dm||f.cad||f.mi||(ckd&&uacr!=null&&uacr>=30);
  let dec='',decCls='',decMono=false;
  if(nd>0)dec=`Đang điều trị ${nd>=3?'≥3':nd} thuốc: dùng phần 5 để chọn bước tiếp theo.`;
  else if(col==='n'||col==='hn'){dec=`Chưa có chỉ định thuốc. Lối sống ${T('9.1')}; đo lại trong vòng 1 năm ${V('Bảng 7.3','40–41')}.`;decCls='ok'}
  else if(wc&&!hmod&&risk!=='Cao'){dec=`THA áo choàng trắng không HMOD, nguy cơ không cao: lối sống và theo dõi HATN/HALĐ, chưa dùng thuốc thường quy ${B('I','B-R')} ${T('5.1')}.`;decCls='ok'}
  else if(age>=80||cfs>=5){
    if(cfs>=5)dec=`Suy yếu (CFS ${cfs}): cá thể hóa ngưỡng khởi trị ${B('I','C-LD')} ${T('10.1')}; đánh giá lão khoa toàn diện ${B('I','A')} ${T('15.6')}.`;
    else if(col==='pre')dec=`≥80 tuổi, tiền THA: lối sống, cá thể hóa; ngưỡng khởi trị thường dùng ở người ≥80 tuổi là HATT ≥140 ${B('IIa','C-LD')} ${T('15.6')}.`;
    else dec=`≥80 tuổi không suy yếu: khởi trị như dân số chung ${B('IIa','C-EO')} ${T('10.1')}; khởi trị khi HATT 140–159 tùy dung nạp ${B('IIa','C-LD')} ${T('15.6')}.`;
    decMono=cfs>=5;
  }
  else if(col==='g1'||col==='g2'){dec=`<b>Khởi trị thuốc ngay</b> kèm thay đổi lối sống ${B('I','A')} ${T('10.1')}.`;decCls='warn'}
  else if(col==='pre'){
    if(risk==='Cao'||thr130||ckd){dec=`<b>Tiền THA nguy cơ cao: khởi trị thuốc ngay</b> ${B('I','A')} ${T('10.1')}.${f.dm?` ĐTĐ: điều trị khi ≥130/80 ${B('I','A')} ${T('12.2')}.`:''}${f.cad||f.mi?` Bệnh mạch vành: khởi trị từ ≥130/80 ${B('I','A')} ${T('12.9')}.`:''}${ckd&&!(uacr>=30)?` Bệnh thận mạn không protein niệu: khởi trị nếu chưa đạt sau tối đa 1 tháng lối sống ${B('I','A')} ${T('12.4')}.`:''}`;decCls='warn'}
    else if(f.str||f.ich){dec=`Sau đột quỵ/TIA/XHN với HA ≥130/80: điều trị thuốc có thể có lợi ${B('IIa','B-R')} ${T('12.15')}.`;decCls='warn'}
    else if(risk==='Trung bình'){dec=`Tiền THA nguy cơ trung bình: lối sống 1–3 tháng; chưa đạt &lt;130/80 thì có thể khởi trị (đơn trị) ${B('IIa','A')} ${T('10.1')} ${V('Hình 10.2','57')}.`;decMono=true}
    else{dec=`Tiền THA nguy cơ thấp: không điều trị thuốc ${B('3N','B-R')} ${T('10.1')}; lối sống, đánh giá lại nguy cơ trong 1 năm ${B('IIa','C-LD')} ${T('7.4')}.`;decCls='ok'}
  }
  out.push(`<div class="rxcard ${decCls}"><span class="eyebrow">3 · Quyết định điều trị</span><p>${dec}</p></div>`);
  /* 4. Mục tiêu */
  const tg=[];
  if(age>=80&&cfs<5){tg.push(`&lt;140/90 trong 1–3 tháng ${B('I','B-R')} ${T('10.3')}`,`&lt;130/80 nếu dung nạp ${B('IIa','C-EO')}`,`Không chủ động hạ &lt;120/80 ${B('3H','B-R')}`);}
  else if(cfs>=7)tg.push(`CFS 7–9: cá thể hóa ${V('Hình 15.1','130')}; suy yếu nặng hoặc tiên lượng sống &lt;3 năm có thể chấp nhận &lt;150/90 ${B('IIb','C-LD')} ${T('10.3')}`);
  else if(cfs>=4&&age>=65)tg.push(`CFS 4–6: &lt;140/90 tùy dung nạp ${V('Hình 15.1','130')}; cá thể hóa ${B('I','C-EO')} ${T('10.3')}`);
  else{
    tg.push(`&lt;130/80 trong 1–3 tháng ${B('I','A')} ${T('10.3')}`);
    if(f.dm)tg.push(`ĐTĐ: có thể &lt;120/70 nếu dung nạp ${B('I','A')} ${T('12.2')}`);
    else tg.push(`&lt;120/80 nếu dung nạp ${B('IIa','A')} ${T('10.3')}`);
    if(age>=60)tg.push(`60–79 tuổi: thận trọng khi HATTr &lt;70 ${B('I','B-R')} ${T('15.6')}`);
    if(isa&&age>=60)tg.push(`THA tâm thu đơn độc: mục tiêu chính HATT &lt;140 ${B('I','A')} ${T('15.6')}`);
  }
  if(f.cad||f.mi)tg.push(`Bệnh mạch vành: không hạ HATTr &lt;70 ${B('3H','A')}; tần số tim nghỉ 55–60 ${B('I','B-NR')} ${T('12.9')}`);
  if(f.str||f.ich)tg.push(`Sau đột quỵ: &lt;130/80 ${B('I','B-NR')}; HATT &lt;130 để dự phòng sa sút trí tuệ ${B('I','A')} ${T('12.15')}`);
  if(f.hfr||f.hfp)tg.push(`Suy tim: &lt;130/80 bất kể PSTM ${B('I','B-R')} ${T('12.11')}`);
  if(ckd)tg.push(`Bệnh thận mạn: &lt;130/80 ${B('I','A')} ${T('12.4')}`);
  if(f.osa)tg.push(`Ngưng thở khi ngủ: HA đêm &lt;120/70 ${B('IIa','C-EO')} ${T('12.19')}`);
  out.push(`<div class="panel stack"><span class="eyebrow">4 · Mục tiêu huyết áp</span><ul class="plain">${tg.map(x=>`<li>${x}</li>`).join('')}</ul></div>`);
  /* 5. Phác đồ */
  if(col!=='n'&&col!=='hn'&&!(decCls==='ok'))out.push(regimen({age,male,col,risk,nd,cfs,hr,egfr,uacr,K,ckd,decMono,f,isa}));
  /* 6. Cận lâm sàng & THA thứ phát */
  const wk=[`ECG 12 chuyển đạo ${B('I','B-R')}`,`Creatinine, eGFR, UACR ít nhất mỗi năm ${B('I','A')}`];
  if(f.cad||f.hfr||f.hfp||f.hmod)wk.push(`Siêu âm tim (ECG bất thường hoặc có triệu chứng/bệnh tim) ${B('I','B-R')}`);else wk.push(`Siêu âm tim khi có thể thay đổi xử trí ${B('IIa','B-R')}`);
  if(s>=180||d>=110||f.dm)wk.push(`Soi đáy mắt (HA ≥180/110 hoặc ĐTĐ) ${B('I','C-EO')}`);
  if(ckd)wk.push(`Siêu âm thận và Doppler ĐM thận ${B('IIa','C-LD')}`);
  wk.push(`Lipid máu đói, HbA1c, glucose; điện giải đồ (Na, K) trước khi dùng RASi/lợi tiểu ${T('11.1')}`);
  const sec=[];
  if(age<40)sec.push(`THA trước 40 tuổi: sàng lọc nguyên nhân thứ phát ${B('I','B-NR')} ${T('15.9')}`);
  if(nd>=3)sec.push(`Đang ≥3 thuốc: nghi THA kháng trị → <a href="#/tha/khang-tri">quy trình kháng trị</a>`);
  if(K!=null&&K<3.5)sec.push(`Hạ kali máu tự phát/do lợi tiểu: gợi ý cường aldosterone`);
  if(f.osa||(f.ob&&age<40))sec.push(`Đánh giá ngưng thở khi ngủ (đa ký giấc ngủ/đa ký hô hấp tại nhà) ${B('I','B-NR')} ${T('12.18')}`);
  sec.push(`Cân nhắc định lượng renin, aldosterone ở mọi người trưởng thành bị THA ${B('IIa','B-R')} ${T('6.2')}`);
  out.push(`<div class="grid2"><div class="panel stack"><span class="eyebrow">6 · Cận lâm sàng ${T('8.1')}</span><ul class="plain">${wk.map(x=>`<li>${x}</li>`).join('')}</ul></div>
   <div class="panel stack"><span class="eyebrow">THA thứ phát ${V('Bảng 6.1','27–28')}</span><ul class="plain">${sec.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>`);
  /* 7. Theo dõi */
  out.push(`<div class="panel stack"><span class="eyebrow">7 · Lịch theo dõi ${T('11.1')}</span><ol class="tline">
   <li><b>Tuần 4–6</b>Tái khám sau khởi trị hoặc chỉnh liều ${B('I','C-LD')}; kiểm tra điện giải, chức năng thận, tác dụng phụ ${B('I','C-EO')}.</li>
   <li><b>Mỗi 2–6 tuần đến khi đạt mục tiêu</b>Đạt mục tiêu trong 1–3 tháng ${T('10.3')} ${V('Bảng 7.3','40–41')}.</li>
   <li><b>Ổn định: mỗi 3–6 tháng</b>Ưu tiên HATN để đánh giá kiểm soát ${B('I','C-EO')}.${ckd?' Bệnh thận mạn trung bình–nặng: 3–6 tháng/lần.':''}</li>
   <li><b>Mỗi năm</b>Thang điểm nguy cơ, lipid đói, HbA1c, UACR, ECG ${B('I','B-R')}.</li></ol></div>`);
  return out.join('');
}

function regimen(o){
  const f=o.f,warn=[],ind=[],add=[];
  const noA=f.ras, noD=f.hyna, noBB=(o.hr!=null&&o.hr<50), fertile=!o.male&&o.age<50;
  if(f.angio)warn.push(`Tiền sử phù mạch: chống chỉ định ACEi ${T('10.5')}`);
  if(f.ras)warn.push(`Hẹp ĐM thận 2 bên/thận độc nhất: chống chỉ định ACEi/ARB ${V('Bảng 10.5','60')}`);
  if(o.K!=null&&o.K>=5)warn.push(`K ${o.K} mmol/L: thận trọng RASi, MRA (tăng kali máu) ${V('Bảng 10.5','60')}`);
  if(f.hyna)warn.push(`Hạ natri/kali rõ: chống chỉ định lợi tiểu thiazide ${V('Bảng 10.5','60')}`);
  if(f.gout)warn.push(`Gout: thận trọng lợi tiểu thiazide ${V('Bảng 10.5','60')}`);
  if(f.asth)warn.push(`Hen: chống chỉ định chẹn beta không chọn lọc và alpha-beta; thận trọng cả chẹn beta-1 chọn lọc ${V('Bảng 10.5','60')}`);
  if(f.as)warn.push(`Hẹp chủ nặng: thận trọng CCB-DHP ${V('Bảng 10.5','60')}`);
  if(noBB)warn.push(`Nhịp &lt;50: không khởi trị chẹn beta hoặc CCB non-DHP ${B('3H','A')} ${T('12.10')}`);
  if(f.hfr)warn.push(`HFrEF: không dùng diltiazem, verapamil ${B('3H','B-NR')} ${T('12.11')}`);
  if(f.ca)warn.push(`Đang điều trị ung thư: tránh diltiazem, verapamil (CYP3A4) ${B('3H','C-EO')} ${T('15.4')}`);
  if(fertile&&!noA)warn.push(`Phụ nữ trong độ tuổi sinh đẻ: thận trọng RASi, tư vấn tránh thai; CCB là lựa chọn ưu tiên khi đơn trị ${V('Hình 10.3','59')} ${V('Bảng 10.5','60')}`);
  /* Chỉ định ưu tiên */
  let pair=null,src='';
  const PC=k=>PREFCOMB.find(x=>x[0]===k);
  if(f.hfr){pair='ARNI/ACEi (hoặc ARB) + chẹn beta + MRA + SGLT2i';src=`${B('I','A')} ${T('12.11')}`;ind.push('HFrEF: GDMT 4 nhóm; không giới hạn tăng liều chỉ vì HA thấp '+B('I','B-R'))}
  else if(f.cad||f.mi||f.ang){pair=noBB?'ACEi (hoặc ARB) + CCB-DHP':'Chẹn beta + ACEi (hoặc ARB nếu không dung nạp)';src=`${B('I','A')} ${T('12.10')}`;if(f.ang)ind.push(`Đau thắt ngực: chẹn beta và/hoặc CCB ${B('I','A')}`)}
  else if(o.ckd&&o.uacr!=null&&o.uacr>=30&&!noA){pair='ACEi/ARB + CCB hoặc lợi tiểu (+ SGLT2i)';src=`${B('I','B-R')} ${T('12.5')}`}
  else if(f.str||f.ich){pair=noA?'CCB + lợi tiểu giống thiazide':'RASi + lợi tiểu giống thiazide (ví dụ perindopril + indapamide) hoặc RASi + CCB';src=`${B('I','A')} ${T('12.15')} ${V('Bảng 10.7','66')}`}
  else if(f.dm){pair=noA?'CCB + lợi tiểu giống thiazide':'RASi + CCB hoặc lợi tiểu giống thiazide (viên phối hợp)';src=`${B('I','A')} ${T('12.3')}`}
  else if(o.isa&&o.age>=60){pair='CCB + lợi tiểu giống thiazide, hoặc RASi + CCB';src=`${B('I','A')} ${T('15.6')} ${V('Bảng 10.7','66')}`}
  else if(f.ob&&!noA){pair='ACEi/ARB + CCB tác dụng kéo dài hoặc thiazide liều thấp';src=`${B('IIa','B-R')} ${T('12.16')}`}
  else if(fertile){pair='CCB-DHP + lợi tiểu giống thiazide (hoặc chẹn beta); RASi chỉ khi có biện pháp tránh thai';src=`${V('Hình 10.3','59')} ${V('Bảng 10.5','60')}`}
  else if(f.ca&&!noA){pair='ACEi/ARB, thêm CCB-DHP; phối hợp ngay nếu ≥160/100';src=`${B('I','B-NR')} ${T('15.4')}`}
  else{pair=noA?'CCB + lợi tiểu giống thiazide':(noD||f.gout)?'RASi + CCB':'RASi + CCB, hoặc RASi + lợi tiểu thiazide/giống thiazide, hoặc CCB + lợi tiểu';src=`${B('I','A')} ${T('10.6')}`}
  if(f.af)ind.push(`Rung nhĩ: kiểm soát tần số bằng chẹn beta${f.hfr?'':' hoặc CCB non-DHP'} ${V('Bảng 10.7','66')}`);
  if(!f.hfr&&!f.cad&&!f.mi&&!noBB&&o.hr!=null&&o.hr>=80&&o.age<50)ind.push(`Nhịp nghỉ ≥80, người trẻ, tăng hoạt giao cảm: chẹn beta là lựa chọn hợp lý ${V('Hình 10.3','59')}`);
  if(f.salt&&!noD)ind.push(`Ăn mặn/nhạy muối: ưu tiên có lợi tiểu thiazide ${V('Hình 10.3','59')}`);
  /* Bậc và liều */
  let step,mono=o.decMono||f.ortho;
  if(o.nd>=3)step=`<b>Đang ≥3 thuốc.</b> Nếu chưa đạt: đánh giá lại các yếu tố ảnh hưởng ${B('I','A')} ${T('10.10')} → <a href="#/tha/khang-tri">THA kháng trị</a>.`;
  else if(o.nd===2)step=`<b>Bậc 2:</b> phối hợp 3 thuốc A + C + D (ưu tiên lợi tiểu giống thiazide), dạng viên phối hợp ${B('I','A')} ${T('10.10')}.`;
  else if(mono){
    let pick=f.preg?'Nifedipine phóng thích kéo dài':(o.age>=60||fertile||noA)?'CCB-DHP (amlodipine…)':f.salt&&!noD?'Lợi tiểu thiazide/giống thiazide':'ACEi hoặc ARB';
    step=`<b>Đơn trị liệu</b> (${f.ortho?'hạ HA tư thế':'tiền THA nguy cơ trung bình hoặc suy yếu'}) ${B('IIa','C-LD')} ${T('10.6')}: gợi ý <b>${pick}</b> ${V('Hình 10.3','59')}. Chưa đạt sau 1–3 tháng → phối hợp 2 thuốc.`;
  }
  else if(o.col==='g2'&&o.risk==='Cao')step=`<b>Bậc 1 (THA độ 2, nguy cơ cao):</b> phối hợp 2 thuốc <b>liều chuẩn</b> ${B('I','B-R')}, hoặc 3 thuốc liều thấp ${B('IIa','B-R')} ${T('10.6')}.`;
  else step=`<b>Bậc 1:</b> phối hợp 2 thuốc <b>liều thấp</b>, ưu tiên viên phối hợp cố định, 1 lần/ngày ${B('I','A')} ${T('10.6')}. Sau 1–3 tháng chưa đạt → Bậc 2: A + C + D ${V('Hình 10.2','57')}.`;
  if(!f.hfr&&(f.dm||(o.ckd&&o.egfr!=null&&o.egfr>20)))add.push(`SGLT2i ${f.dm?B('I','A')+' '+T('12.3'):''}${o.ckd&&o.egfr>20?' '+B('I','A')+' '+T('12.5'):''}`);
  if(f.hfp)add.push(`HFpEF: SGLT2i ${B('I','A')} ${T('12.11')}`);
  if(f.dm&&(f.ob||o.risk==='Cao'))add.push(`GLP-1 RA nếu nguy cơ xơ vữa cao hoặc béo phì ${B('I','A')} ${T('12.3')}`);
  if(o.risk==='Cao'||f.dm||f.cad||f.str)add.push(`Statin theo mục tiêu LDL-C (rất cao &lt;1,4; cao &lt;1,8; thấp–trung bình &lt;2,6 mmol/L) ${B('I','A')} ${T('12.17')}`);
  /* Ví dụ thuốc */
  const ex=[];
  if(!noA&&!f.preg)ex.push(drug('Perindopril arginine'),drug('Telmisartan'));
  ex.push(drug('Amlodipine'));
  if(!noD)ex.push(drug('Indapamide'),drug('Chlorthalidone'));
  if(f.cad||f.mi||f.hfr||f.af)ex.push(drug('Bisoprolol'));
  return `<div class="rxcard"><span class="eyebrow">5 · Phác đồ gợi ý ${V('Hình 10.2','57')}</span>
   <p>${step}</p>
   ${o.nd<3?`<p>Phối hợp ưu tiên: <b>${pair}</b> ${src}</p>`:''}
   ${ind.length?`<ul class="plain">${ind.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}
   ${warn.length?`<div class="stack"><b class="col-c3" style="color:var(--c3)">Cảnh báo</b><ul class="plain">${warn.map(x=>`<li>${x}</li>`).join('')}</ul></div>`:''}
   ${add.length?`<p><b>Thêm vì lợi ích tim mạch–thận:</b></p><ul class="plain">${add.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}
   <details><summary>Liều tham khảo ${PL5}</summary><ul class="plain">${ex.map(x=>`<li>${x}</li>`).join('')}</ul><p class="note">Liều trong viên phối hợp: rất thấp ≤1/3, thấp ≈1/2, chuẩn, cao ≥2 lần liều chuẩn ${V('Bảng 10.9','67')}. Chẹn beta dùng ở bất kỳ bậc nào nếu có chỉ định ${B('I','A')} ${T('10.6')}.</p></details>
   <p class="note"><a href="#/tha/ke-don">Kiểm tra phối hợp thuốc</a> · Không phối hợp ACEi + ARB ${B('3H','A')} ${T('10.10')}</p></div>`;
}

/* ---------- Chẩn đoán & kiểu hình ---------- */
PAGES['/tha/chan-doan']={title:'Chẩn đoán THA',render(m){
  const rows=[['Bình thường','hn',0],['Bình thường cao','hn',1],['Tiền THA','pre',1],['THA độ 1','g1',1],['THA độ 2','g2',1]];
  const cell=(t,k)=>{const x=BPTH[t];const n=['n','hn','pre','g1','g2'];const i=n.indexOf(k);
    if(k==='n')return `&lt;${x.hn[0]}/${x.hn[1]}`;if(k==='g2')return `≥${x.g2[0]}/${x.g2[1]}`;if(k==='g1')return `≥${x.g1[0]}/${x.g1[1]}`;
    const lo=k==='hn'?x.hn:x.pre, hi=k==='hn'?x.pre:x.g1;return `${lo[0]}–${hi[0]-1}/${t==='office'&&k==='hn'?'&lt;80':lo[1]+'–'+(hi[1]-1)}`};
  m.innerHTML=head('VSH/VNHA 2026 · Đo và chẩn đoán','Chẩn đoán và kiểu hình THA',`Nhập kết quả theo phương pháp đo để phân độ (Bảng 4.2), thêm HATN để nhận diện THA áo choàng trắng hoặc ẩn giấu (Hình 3.1). ${V('Hình 3.1','13')} ${V('Bảng 4.2','15')}`)+
  `<div class="grid2"><div class="panel stack" id="dx-form"><h3>Phân độ</h3><div class="form">
    <label class="field"><span>Phương pháp đo</span><select id="dx-m">${Object.entries(BPTH).map(([k,v])=>`<option value="${k}">${v.n}</option>`).join('')}</select></label>
    <label class="field"><span>Tâm thu</span><input type="number" id="dx-s" value="138"></label>
    <label class="field"><span>Tâm trương</span><input type="number" id="dx-d" value="86"></label></div>
    <h3>Kiểu hình (cần cả hai)</h3><div class="form">
    <label class="field"><span>HAPK</span><input id="dx-o" placeholder="ví dụ 148/92"></label>
    <label class="field"><span>HATN trung bình</span><input id="dx-h" placeholder="ví dụ 128/80"></label></div>
    <div id="dx-out" class="stack" aria-live="polite"></div></div>
   <div class="panel stack"><div class="row" style="justify-content:space-between"><h3>Ngưỡng theo phương pháp đo ${V('Bảng 4.2','15')}</h3>${FIG('VSH26','Bảng 4.2','15')}</div><div style="overflow-x:auto"><table class="bpgrid" id="dx-tab"><thead><tr><th>Phân loại</th>${Object.values(BPTH).map(v=>`<th>${v.n}</th>`).join('')}</tr></thead><tbody>
    ${['n','hn','pre','g1','g2'].map((k,i)=>`<tr><th style="text-align:left">${rows[i][0]}</th>${Object.keys(BPTH).map(t=>`<td data-t="${t}" data-k="${k}">${cell(t,k)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <p class="note">Tiền THA HAPK là 130–139 và/hoặc 80–89; THA tâm thu đơn độc: HATT ≥140 và HATTr &lt;90 ${V('Bảng 3.2','13')}.</p></div></div>
  <div class="panel stack"><div class="row" style="justify-content:space-between"><h3>Lưu đồ chẩn đoán ${V('Hình 3.1','13')}</h3>${FIG('VSH26','Hình 3.1','13')}</div><div class="algo">
   <div class="ab r">HAPK ≥180 và/hoặc ≥110–120 kèm tổn thương cơ quan đích đang tiến triển → <a href="#/tha/cap-cuu">THA cấp cứu</a></div>
   <div class="ab y">HAPK ≥130/80 → xác nhận</div>
   <div class="grid2"><div class="ab n"><b>Cơ bản:</b> đo HAPK lặp lại nhiều lần khám. &lt;130/80: bình thường/bình thường cao; 130–139/80–89: tiền THA; ≥140/90: THA.</div>
   <div class="ab g"><b>Tối ưu:</b> HATN (hoặc HALĐ). &lt;130/80: bình thường/áo choàng trắng; 130–134/80–84: tiền THA; ≥135/85: THA hoặc THA ẩn giấu.</div></div></div></div>
  <div class="grid2">${box('Ngưỡng chẩn đoán','3.1')}${box('Kiểu hình THA','5.1')}</div>
  <div class="grid2">${box('Thiết bị','4.1')}${box('Đo tại phòng khám','4.3')}</div>
  <div class="grid2">${box('Đo tại nhà','4.4')}${box('Đo lưu động 24 giờ','4.5')}</div>
  ${box('Phương tiện mới, rung nhĩ, béo phì','4.6')}
  <div class="panel stack"><h3>Sàng lọc THA thứ phát: ABCDE ${V('Bảng 6.1','27–28')}</h3><div class="checks" id="sec-ck">
   ${[['THA độ ≥2 khởi phát trước 40 tuổi, hoặc THA ở trẻ em','Tìm nguyên nhân thứ phát chính'],['THA khởi phát đột ngột hoặc đang ổn định nay mất kiểm soát','Thuốc (NSAID, corticoid…), hẹp ĐM thận, cường aldosterone'],['THA kháng trị','Cường aldosterone, ngưng thở khi ngủ, hẹp ĐM thận'],['Hạ kali máu tự phát hoặc do lợi tiểu, u tuyến thượng thận tình cờ','Cường aldosterone nguyên phát: renin, aldosterone'],['Cơn THA kèm đau đầu, vã mồ hôi, hồi hộp','U tủy thượng thận: metanephrine'],['Ngáy, buồn ngủ ban ngày, béo phì, THA buổi sáng','Ngưng thở khi ngủ (Apnea)'],['Âm thổi bụng, phù phổi tái phát, creatinine tăng &gt;30% sau RASi','Hẹp ĐM thận (Bruit)'],['HA chi trên &gt; chi dưới, mạch bẹn yếu','Hẹp eo ĐM chủ (Coarctation)'],['Mặt tròn, rạn da, béo trung tâm','Cushing'],['eGFR giảm, protein niệu, hồng cầu niệu','Bệnh nhu mô thận (eGFR)'],['Tổn thương cơ quan đích nặng không tương xứng mức HA','Tìm nguyên nhân thứ phát']].map((x,i)=>`<label><input type="checkbox" data-h="${x[1]}"> ${x[0]}</label>`).join('')}</div>
   <div id="sec-out" class="note">Đánh dấu đặc điểm để xem hướng tìm nguyên nhân.</div></div>
  ${box('Khuyến cáo THA thứ phát','6.2')}`;
  const draw=()=>{
    const mm=$('dx-m').value,s=num('dx-s'),d=num('dx-d'),g=grade(s,d,mm);
    document.querySelectorAll('#dx-tab td').forEach(td=>td.classList.toggle('hit',!!g&&td.dataset.t===mm&&td.dataset.k===g.k));
    let h=g?`<div class="result"><span class="eyebrow">${BPTH[mm].n}</span><h2>${g.n}</h2>${mm==='office'&&s>=140&&d<90?'<p>THA tâm thu đơn độc.</p>':''}${mm==='office'&&(s>=180||d>=110)?`<p>HA ≥180/110: đánh giá ngay tổn thương cơ quan đích cấp ${B('I','C-EO')} ${T('3.1')}.</p>`:''}</div>`:'';
    const pr=v=>{const a=(v||'').split(/[\/\s,-]+/).map(Number);return a.length>=2&&a[0]&&a[1]?a:null};
    const o=pr($('dx-o').value),hm=pr($('dx-h').value);
    if(o&&hm){const oh=o[0]>=140||o[1]>=90,hh=hm[0]>=135||hm[1]>=85;
      const ph=oh&&hh?['THA duy trì','Cả HAPK và HATN đều cao: THA thật sự.']:oh?['THA áo choàng trắng','Xác nhận bằng HALĐ. Không dùng thuốc thường quy trừ khi có HMOD hoặc nguy cơ cao '+B('I','B-R')+'; theo dõi định kỳ vì nguy cơ chuyển thành THA.']:hh?['THA ẩn giấu','Xác nhận bằng HALĐ; có thể điều trị thuốc '+B('IIa','C-EO')+'. Hay gặp ở nam, hút thuốc, rượu, béo phì, ĐTĐ.']:['Không THA','Cả HAPK và HATN đều dưới ngưỡng.'];
      h+=`<div class="rxcard"><span class="eyebrow">Kiểu hình ${T('5.1')}</span><h3>${ph[0]}</h3><p>${ph[1]}</p></div>`}
    $('dx-out').innerHTML=h};
  $('dx-form').addEventListener('input',draw);draw();
  $('sec-ck').onchange=()=>{const hs=[...new Set([...document.querySelectorAll('#sec-ck input:checked')].map(i=>i.dataset.h))];
    $('sec-out').innerHTML=hs.length?`<b>Hướng tìm:</b> ${hs.join('; ')}. Có đặc điểm gợi ý → sàng lọc THA thứ phát ${B('I','C-EO')} ${T('6.2')}. Xét nghiệm nâng cao: ${V('Bảng 13.2','110')}.`:'Đánh dấu đặc điểm để xem hướng tìm nguyên nhân.'};
}};

/* ---------- Kê đơn & kiểm tra phối hợp ---------- */
const RX=[['acei','ACEi'],['arb','ARB'],['arni','ARNI (sacubitril/valsartan)'],['ali','Aliskiren'],['ccb','CCB-DHP (amlodipine…)'],['ndhp','CCB non-DHP (diltiazem, verapamil)'],['bb','Chẹn beta'],['thz','Lợi tiểu thiazide/giống thiazide'],['loop','Lợi tiểu quai'],['mra','MRA (spironolactone, eplerenone)'],['asi','ASI (baxdrostat…)'],['cen','Thuốc tác dụng trung ương (clonidine, methyldopa)'],['alpha','Chẹn alpha (doxazosin)'],['sglt','SGLT2i']];
const BAD=[
 [['acei','arb'],'ACEi + ARB: không phối hợp hai thuốc ức chế hệ RAA',B('3H','A')+' '+T('10.10')+' '+V('Bảng 10.8','66')],
 [['acei','arni'],'ACEi + ARNI: chống chỉ định (phù mạch). Ngưng ACEi ít nhất 36 giờ trước khi dùng ARNI',V('Bảng 10.8','66')],
 [['arb','arni'],'ARB + ARNI: trùng lặp (ARNI đã chứa valsartan)',V('Bảng 10.8','66')],
 [['acei','ali'],'ACEi + aliskiren: không khuyến cáo (tăng kali, suy thận, hạ HA)',V('Bảng 10.8','66')],
 [['arb','ali'],'ARB + aliskiren: không khuyến cáo',V('Bảng 10.8','66')],
 [['arni','ali'],'ARNI + aliskiren: không khuyến cáo',V('Bảng 10.8','66')],
 [['cen','bb'],'Thuốc trung ương + chẹn beta: nhịp chậm; nguy cơ THA dội ngược khi ngưng clonidine',V('Bảng 10.8','66')],
 [['bb','ndhp'],'Chẹn beta + diltiazem/verapamil: nhịp chậm, block AV, giảm co bóp',B('3H','B-NR')+' '+T('12.10')],
 [['mra','asi'],'MRA + ASI: không có lợi, có thể có hại',B('3N','B-NR')+' '+T('10.10')]
];
PAGES['/tha/ke-don']={title:'Kê đơn THA',render(m){
  m.innerHTML=head('VSH/VNHA 2026 · Điều trị thuốc','Kê đơn và kiểm tra phối hợp',`Chọn các thuốc trong đơn: app báo phối hợp cấm, xác định bậc điều trị và gợi ý bước tiếp theo. ${V('Hình 10.2','57')} ${V('Bảng 10.8','66')}`)+
  `<div class="grid2"><div class="panel stack"><h3>Thuốc trong đơn</h3><div class="checks" id="rx">${RX.map(r=>`<label><input type="checkbox" value="${r[0]}"> ${r[1]}</label>`).join('')}</div></div>
   <div class="stack" id="rx-out" aria-live="polite"></div></div>
  <div class="panel stack"><h3>Bậc điều trị ${V('Hình 10.2','57')}</h3><ol class="tline">
   <li><b>Tiền THA nguy cơ trung bình (PREVENT 5–7,5%)</b>Lối sống 1–3 tháng → đơn trị A, C, D hoặc B ${B('IIa','A')}</li>
   <li><b>Bậc 1: tiền THA nguy cơ cao, ĐTĐ, bệnh thận mạn, PREVENT ≥7,5% hoặc THA</b>Phối hợp 2 thuốc liều thấp: A + C, A + D, C + D (± B) ${B('I','A')}. THA độ 2 nguy cơ cao: 2 thuốc liều chuẩn ${B('I','B-R')} hoặc 3 thuốc liều thấp ${B('IIa','B-R')}</li>
   <li><b>Bậc 2 (sau 1–3 tháng chưa đạt)</b>A + C + D ${B('I','A')}</li>
   <li><b>Bậc 3: THA kháng trị</b>Chuyển chuyên khoa; thêm spironolactone/ASI hoặc thuốc khác → <a href="#/tha/khang-tri">THA kháng trị</a></li></ol>
   <div class="row">${FIG('VSH26','Hình 10.2','57')}${FIG('VSH26','Hình 10.3','59')}${FIG('VSH26','Bảng 10.5','60')}</div>
   <p class="note">Ưu tiên viên phối hợp cố định ở mọi bậc; không dung nạp thuốc nhóm I có thể dùng ASI ${B('IIb','B-R')}.</p></div>
  <div class="panel stack"><h3>Chọn thuốc theo bệnh nhân ${V('Bảng 10.5','60')} ${V('Hình 10.3','59')}</h3><div class="grid2">
   ${Object.entries(DCLASS).map(([k,v])=>`<div class="rxcard"><h3>${k} · ${v.n}</h3><p class="small"><b>Ưu tiên:</b> ${v.ind.map(x=>`<span class="chip good">${x}</span>`).join('')}</p>${v.ci.length?`<p class="small"><b>Chống chỉ định:</b> ${v.ci.map(x=>`<span class="chip bad">${x}</span>`).join('')}</p>`:''}<p class="small"><b>Thận trọng:</b> ${v.caut.map(x=>`<span class="chip">${x}</span>`).join('')}</p></div>`).join('')}</div>
   <p class="note">Nhóm I: CCB-DHP tác dụng kéo dài, RASi, lợi tiểu thiazide/giống thiazide, chẹn beta. Nhóm II: ARNI, MRA, ASI. Nhóm khác: chẹn alpha, hydralazine, amiloride, đối kháng endothelin kép, thuốc trung ương, SGLT2i/GLP-1 RA ${V('Bảng 10.4','58')}.</p></div>
  <div class="panel stack"><h3>Phối hợp ưu tiên theo bệnh đi kèm ${V('Bảng 10.7','66')}</h3><table class="bpgrid"><tbody>${PREFCOMB.map(r=>`<tr><th style="text-align:left">${r[1]}</th><td style="text-align:left">${r[2]}</td></tr>`).join('')}</tbody></table></div>
  <div class="grid2">${box('Khởi trị thuốc','10.6')}${box('Điều trị duy trì','10.10')}</div>
  <div class="callout tha"><p>Khoảng 75% người bệnh tái THA sau khi ngưng thuốc; HA thường cao hơn vào mùa đông, có thể cần chỉnh liều theo mùa ${V('mục 10.5','64')}.</p></div>`;
  const sel=new Set(store.get('tha-rx',[]));
  document.querySelectorAll('#rx input').forEach(i=>{i.checked=sel.has(i.value)});
  const draw=()=>{
    const on=new Set([...document.querySelectorAll('#rx input:checked')].map(i=>i.value));store.set('tha-rx',[...on]);
    const bad=BAD.filter(b=>b[0].every(x=>on.has(x)));
    const A=on.has('acei')||on.has('arb')||on.has('arni'),Cc=on.has('ccb'),D=on.has('thz')||on.has('loop'),Bb=on.has('bb');
    const n=[...on].filter(x=>x!=='sglt').length;
    let nxt='';
    if(n===0)nxt='Chưa chọn thuốc.';
    else if(n===1)nxt=`Đơn trị. Chưa đạt mục tiêu → phối hợp 2 thuốc liều thấp (A + C, A + D hoặc C + D) ${B('I','A')} ${T('10.6')}.`;
    else if(A&&Cc&&D&&n>=3)nxt=`Đã đủ A + C + D. Chưa đạt dù liều tối đa dung nạp → nghĩ đến THA kháng trị: loại trừ giả kháng trị, thêm spironolactone ${B('I','A')} ${T('13.3')}. <a href="#/tha/khang-tri">Mở quy trình</a>`;
    else if(n>=2)nxt=`Chưa đạt mục tiêu → hoàn thiện bộ ba A + C + D${!A?' (thiếu RASi)':''}${!Cc?' (thiếu CCB)':''}${!D?' (thiếu lợi tiểu, ưu tiên giống thiazide)':''} ${B('I','A')} ${T('10.10')}.`;
    $('rx-out').innerHTML=(bad.length?bad.map(b=>`<div class="rxcard warn"><b>⚠ ${b[1]}</b><div class="srcline">${b[2]}</div></div>`).join(''):(n?`<div class="rxcard ok"><b>Không phát hiện phối hợp cấm trong Bảng 10.8, 10.10, 12.10.</b></div>`:''))+
     `<div class="rxcard"><span class="eyebrow">Bước tiếp theo</span><p>${nxt}</p>${Bb?`<p class="note">Chẹn beta có thể dùng ở mọi bậc khi có chỉ định ưu tiên ${B('I','A')}.</p>`:''}${on.has('sglt')?'':`<p class="note">SGLT2i có lợi khi kèm ĐTĐ, bệnh thận mạn (eGFR &gt;20) hoặc suy tim ${T('12.3')} ${T('12.5')}.</p>`}</div>`};
  $('rx').onchange=draw;draw();
}};

/* ---------- THA kháng trị ---------- */
PAGES['/tha/khang-tri']={title:'THA kháng trị',render(m){
  m.innerHTML=head('VSH/VNHA 2026 · Phần XIII','THA kháng trị',`Định nghĩa: HA chưa kiểm soát dù dùng ≥3 thuốc ở liều tối đa dung nạp, trong đó có lợi tiểu; kiểm soát được nhưng cần ≥4 thuốc cũng là kháng trị ${V('Phần XIII','105')}.`)+
  `<div class="grid2"><div class="stack" id="rh-form">
   <div class="panel stack"><h3>Bước 1 · Loại trừ giả kháng trị</h3><div class="checks">
    <label><input type="checkbox" id="r1"> Đã đo đúng kỹ thuật, băng quấn đúng cỡ ${V('Bảng 4.1','15')}</label>
    <label><input type="checkbox" id="r2"> HALĐ (hoặc HATN) xác nhận, loại trừ áo choàng trắng</label>
    <label><input type="checkbox" id="r3"> Đã kiểm tra tuân thủ (đếm thuốc, giám sát trực tiếp)</label>
    <label><input type="checkbox" id="r4"> Đã rà soát thuốc/chất làm THA (danh sách bên dưới)</label>
    <label><input type="checkbox" id="r5"> Đã đánh giá lượng muối (natri niệu 24 giờ)</label>
    <label><input type="checkbox" id="r6"> Phác đồ là A + C + D ở liều tối đa dung nạp, dạng viên phối hợp</label></div></div>
   <div class="panel stack"><h3>Bước 2 · Thông tin chọn thuốc</h3><div class="form">
    <label class="field"><span>eGFR</span><input type="number" id="r-egfr" value="60"></label>
    <label class="field"><span>Kali máu</span><input type="number" step="0.1" id="r-k" value="4.2"></label>
    <label class="field"><span>Nhịp tim nghỉ</span><input type="number" id="r-hr" value="76"></label></div>
    <div class="checks"><label><input type="checkbox" id="r-hf"> Suy tim / ứ dịch</label><label><input type="checkbox" id="r-bph"> Phì đại tiền liệt tuyến, hội chứng chuyển hóa, rối loạn lipid</label><label><input type="checkbox" id="r-spi"> Đã thử spironolactone (không hiệu quả/không dung nạp)</label><label><input type="checkbox" id="r-bbi"> Có chỉ định chẹn beta (BMV, rung nhĩ, suy tim)</label></div></div>
   <div class="panel stack"><h3>Thuốc/chất làm tăng HA ${V('Bảng 13.1','108–109')}</h3><div class="checks" id="r-press">${PRESSOR.map((p,i)=>`<label><input type="checkbox" data-i="${i}"> ${p}</label>`).join('')}</div></div>
  </div><div class="stack" id="rh-out" aria-live="polite"></div></div>
  <div class="panel stack"><h3>Xét nghiệm ${V('Bảng 13.2','110')}</h3><div class="grid2"><div><b>Cơ bản</b><ul class="plain"><li>Bệnh sử, khám; chức năng thận, gan; công thức máu; canxi; TSH</li><li>Tổng phân tích nước tiểu; ECG; siêu âm thận</li><li>Loại trừ ngưng thở khi ngủ</li></ul></div><div><b>Nâng cao</b><ul class="plain"><li>Renin, aldosterone; metanephrine máu/nước tiểu</li><li>UACR/PCR; natri, kali niệu 24 giờ</li><li>Cortisol, nghiệm pháp ức chế dexamethasone</li><li>CT/MRI tuyến thượng thận; MRA/CTA mạch thận</li></ul></div></div></div>
  <div class="row">${FIG('VSH26','Hình 13.2','111')}${FIG('VSH26','Bảng 13.1','108')}</div>
  ${box('Khuyến cáo THA kháng trị','13.3')}${box('Điều trị bằng dụng cụ (triệt phá thần kinh giao cảm thận)','14.1')}`;
  const save=persist('tha-rh',$('rh-form'));
  const draw=()=>{save();
    const done=[1,2,3,4,5,6].filter(i=>ck('r'+i)).length,egfr=num('r-egfr'),K=num('r-k'),hr=num('r-hr');
    const press=[...document.querySelectorAll('#r-press input:checked')].map(i=>PRESSOR[+i.dataset.i]);
    const o=[];
    o.push(`<div class="result"><span class="eyebrow">Tiến độ</span><h2>${done}/6 bước loại trừ giả kháng trị</h2>${done<6?`<p>Hoàn thành trước khi kết luận kháng trị: HALĐ ${B('I','A')}, giám sát tuân thủ ${B('I','C-LD')}, sàng lọc thuốc làm THA ${B('I','C-EO')}, tỷ aldosterone/renin ${B('I','A')} ${T('13.3')}.</p>`:'<p>Đủ điều kiện xác định THA kháng trị thật sự.</p>'}</div>`);
    if(press.length)o.push(`<div class="rxcard warn"><b>Ngưng hoặc thay thế nếu được:</b><ul class="plain">${press.map(p=>`<li>${p}</li>`).join('')}</ul><p class="note">NSAID tăng HA khoảng 5 mmHg; caffeine khoảng 4 mmHg; cyclosporin gây THA ở &gt;50%; thuốc kháng VEGF 20–90% ${V('Bảng 13.1','108–109')}.</p></div>`);
    const diu=egfr==null?'':egfr>=45?`Lợi tiểu: dùng loại <b>giống thiazide</b> (chlorthalidone, indapamide) ${B('I','B-R')}.`:egfr>=30?`eGFR 30–44: lợi tiểu giống thiazide vẫn dùng được ${B('I','B-R')}; <b>có thể</b> chuyển/thêm lợi tiểu quai ${B('IIa','B-NR')}.`:`eGFR &lt;30: <b>nên dùng lợi tiểu quai</b> (chia 2 lần/ngày) ${B('IIa','B-NR')}.`;
    let four;
    if(ck('r-spi'))four=`Spironolactone thất bại: thay bằng <b>ASI</b> (baxdrostat 2 mg) hoặc <b>eplerenone</b> 25–50 mg ${B('IIa','A')}; amiloride 5–10 mg là lựa chọn khác ${V('Hình 13.2','111')}.`;
    else if((K!=null&&K>=5)||(egfr!=null&&egfr<30))four=`K ${K??'?'} mmol/L, eGFR ${egfr??'?'}: nguy cơ tăng kali cao với spironolactone. Cân nhắc kỹ, theo dõi kali sát, hoặc chọn chẹn beta (nếu nhịp phù hợp)/thuốc khác ${V('Hình 13.2','111')}. <span class="note">(Ngưỡng kali/eGFR ở đây là cảnh báo chung của app, không phải ngưỡng ghi trong khuyến cáo.)</span>`;
    else four=`Thuốc thứ 4: <b>spironolactone 12,5–50 mg</b> ${B('I','A')}, hoặc ASI ${B('IIa','A')} ${T('13.3')}. Kiểm tra kali, creatinine sau 1–2 tuần.`;
    const five=[];
    if(ck('r-bbi')||(hr!=null&&hr>=80))five.push(`Chẹn beta (thuốc 4–5)${ck('r-bbi')?' vì có chỉ định ưu tiên':' vì nhịp nhanh'}`);
    if(ck('r-hf')||(egfr!=null&&egfr<30))five.push('Lợi tiểu quai: ứ dịch, suy tim, eGFR &lt;30');
    if(ck('r-bph'))five.push('Chẹn alpha (doxazosin): hội chứng chuyển hóa, rối loạn lipid, phì đại tiền liệt tuyến');
    if(hr!=null&&hr>=80)five.push('Thuốc trung ương (clonidine): tăng hoạt adrenergic, nhịp nhanh; không phối hợp với chẹn beta');
    o.push(`<div class="rxcard"><span class="eyebrow">Phác đồ từng bước ${V('Hình 13.2','111')}</span><ol class="tline">
     <li><b>Tối ưu A + C + D</b>Viên phối hợp, liều tối đa dung nạp. ${diu}</li>
     <li><b>Thuốc thứ 4</b>${four}</li>
     <li><b>Thuốc thứ 5–6</b>${five.length?five.join('; '):'Chọn theo đặc điểm: chẹn beta, lợi tiểu quai, chẹn alpha, clonidine'}.</li>
     <li><b>Chưa kiểm soát</b>Nhóm đa chuyên ngành ${B('I','C-EO')}. Triệt phá thần kinh giao cảm thận tại trung tâm kinh nghiệm ${B('IIb','B-NR')}${egfr!=null&&egfr<40?` <b>— không làm vì eGFR &lt;40</b> ${B('3N','B-R')}`:''} ${T('14.1')}.</li></ol>
     <p class="note">Không phối hợp MRA với ASI ${B('3N','B-NR')} ${T('10.10')}. Tầm soát ngưng thở khi ngủ ở mọi bệnh nhân kháng trị ${B('I','B-NR')} ${T('12.18')}.</p></div>`);
    $('rh-out').innerHTML=o.join('')};
  $('rh-form').addEventListener('input',draw);$('rh-form').addEventListener('change',draw);draw();
}};

/* ---------- THA cấp cứu ---------- */
PAGES['/tha/cap-cuu']={title:'THA cấp cứu',render(m){
  const HM=[['pres','Bệnh não THA / PRES'],['isch','Nhồi máu não cấp'],['ich','Xuất huyết não'],['dissect','Bóc tách ĐM chủ'],['ape','Phù phổi cấp'],['acs','Hội chứng vành cấp'],['aki','Tổn thương thận cấp'],['ecl','Tiền sản giật nặng / sản giật / HELLP'],['pheo','Cơn cường catecholamine (u tủy, cocaine, amphetamine)'],['ret','Bệnh võng mạc độ III–IV, bệnh vi mạch huyết khối (THA ác tính)']];
  m.innerHTML=head('VSH/VNHA 2026 · Phần XVI','THA cấp cứu và khẩn cấp',`THA cấp cứu: HA &gt;180 và/hoặc &gt;110–120 mmHg kèm tổn thương cơ quan đích cấp. Không có tổn thương cấp: THA khẩn cấp, dùng thuốc uống và theo dõi ngoại trú ${V('Phần XVI','138–139')}.`)+
  `<div class="grid2"><div class="panel stack" id="em-form"><h3>Đánh giá</h3><div class="form">
    <label class="field"><span>HATT</span><input type="number" id="e-s" value="210"></label>
    <label class="field"><span>HATTr</span><input type="number" id="e-d" value="120"></label>
    <label class="field"><span>Cân nặng (kg)</span><input type="number" id="e-w" value="65"></label>
    <label class="field"><span>Bóc tách? Chênh HA hai tay</span><input type="number" id="e-arm" placeholder="mmHg"></label></div>
    <fieldset><legend>Tổn thương cơ quan đích cấp</legend><div class="checks">${HM.map(h=>`<label><input type="radio" name="e-hm" value="${h[0]}"> ${h[1]}</label>`).join('')}<label><input type="radio" name="e-hm" value="" checked> Không có</label></div></fieldset>
    <div id="e-isch" class="checks" hidden><label><input type="radio" name="e-rep" value="lysis" checked> Có tiêu sợi huyết / lấy huyết khối</label><label><input type="radio" name="e-rep" value="no"> Không tái tưới máu</label></div></div>
   <div class="stack" id="em-out" aria-live="polite"></div></div>
  <div class="panel stack"><h3>Thuốc truyền tĩnh mạch ${V('Bảng 16.2','141–142')}</h3><div style="overflow-x:auto"><table class="bpgrid"><thead><tr><th>Thuốc</th><th>Liều</th><th id="iv-wh">Theo cân nặng</th><th>Lưu ý</th></tr></thead><tbody id="iv-tb"></tbody></table></div><p class="note">Cột “theo cân nặng” chỉ đổi đơn vị theo cân nặng đã nhập; pha loãng và tốc độ bơm theo quy trình của đơn vị.</p></div>
  <div class="row">${FIG('VSH26','Hình 16.1','143')}${FIG('VSH26','Bảng 16.2','141')}</div><div class="panel stack"><h3>Nguyên tắc chung ${V('Phần XVI','140')}</h3><ul class="plain"><li>Nhập ICU/đơn vị theo dõi sát; ưu tiên thuốc truyền TM, chỉnh liều được.</li><li>Giảm MAP ≤25% trong giờ đầu; nếu ổn, đưa HA về &lt;160/100 trong 2–6 giờ, rồi HATT 130–140 trong 24–48 giờ. Tránh giảm MAP &gt;50% (thiếu máu não, thận, vành).</li><li>Labetalol và nicardipine là lựa chọn hàng đầu cho đa số tình huống.</li><li>U tủy thượng thận: phentolamine trước, không dùng chẹn beta đơn độc. Cocaine/amphetamine: benzodiazepine trước. Hạn chế nifedipine tác dụng ngắn.</li></ul></div>`;
  const save=persist('tha-em',$('em-form'));
  const fmt=x=>x>=10?Math.round(x):Math.round(x*10)/10;
  const draw=()=>{save();
    const s=num('e-s'),d=num('e-d'),w=num('e-w'),arm=num('e-arm');
    const hm=(document.querySelector('input[name=e-hm]:checked')||{}).value||'';
    $('e-isch').hidden=hm!=='isch';
    const rep=(document.querySelector('input[name=e-rep]:checked')||{}).value;
    const map=s&&d?Math.round((s+2*d)/3):null;
    const high=(s>180)||(d>110);
    const o=[];
    let key=hm==='isch'?(rep==='no'?'isch-no':'isch-lysis'):hm==='ret'?'pres':hm;
    const sc=EMER.find(e=>e[0]===key);
    if(!high&&!hm)o.push(`<div class="result"><h2>Chưa đến ngưỡng cấp cứu</h2><p>Điều trị theo lộ trình thường quy.</p></div>`);
    else if(!hm)o.push(`<div class="result"><span class="eyebrow">Phân loại</span><h2>THA khẩn cấp (không tổn thương cơ quan đích cấp)</h2><p>Thuốc uống, tăng/điều chỉnh phác đồ, tái khám sớm; không cần hạ áp nhanh bằng thuốc tĩnh mạch ${V('Phần XVI','138–139')}. Kiểm tra tuân thủ và thuốc làm THA.</p></div>`);
    else{
      const malig=hm==='ret'||(s>200&&d>120);
      o.push(`<div class="result"><span class="eyebrow">Phân loại</span><h2>THA cấp cứu${malig?' · THA ác tính':''}</h2><p>MAP hiện tại ${map??'?'} mmHg. ${sc?`<b>${sc[1]}</b>`:''}</p></div>`);
      if(sc)o.push(`<div class="rxcard warn"><span class="eyebrow">Mục tiêu và thuốc ${V('Hình 16.1','143')}</span><p><b>Thuốc ưu tiên:</b> ${sc[2]}</p><p><b>Mục tiêu:</b> ${sc[3]}</p>${['pres','ape','acs','aki'].includes(key)&&map?`<ol class="tline"><li><b>Giờ đầu</b>MAP không thấp hơn ~${Math.round(map*0.75)} mmHg (giảm ≤25%)</li><li><b>2–6 giờ</b>HA &lt;160/100</li><li><b>24–48 giờ</b>HATT 130–140</li></ol>`:''}${key==='ich'&&s?`<p>${s>=220?'HATT ≥220: không hạ dưới 130 '+B('3H','B-NR'):'HATT 150–220: hạ về 130 đến &lt;140 trong ≥7 ngày '+B('IIa','A')} ${T('12.12')}</p>`:''}${key.startsWith('isch')?`<div class="stack">${recs('12.14')}</div>`:''}</div>`);
    }
    if(arm!=null&&arm>20)o.push(`<div class="rxcard warn"><b>Chênh HA hai tay &gt;20 mmHg:</b> nghĩ đến bóc tách ĐM chủ ${V('Phần XVI','139')}.</div>`);
    $('em-out').innerHTML=o.join('');
    $('iv-wh').textContent=w?`Theo ${w} kg`:'Theo cân nặng';
    $('iv-tb').innerHTML=IVD.map(r=>{const c=r[3];let calc='—';
      if(c&&w&&c.w){const u=c.unit.replace('/kg','');calc=`Khởi đầu ${fmt(c.start*w)} ${u}; tối đa ${fmt(c.max*w)} ${u}`+(c.load?`<br>Nạp ${fmt(c.load[0]*w)}–${fmt(c.load[1]*w)} ${c.load[2].replace('/kg','')}`:'')}
      else if(c&&!c.w)calc=`${c.start} → tối đa ${c.max} ${c.unit}`;
      return `<tr${sc&&sc[2].toLowerCase().includes(r[0].toLowerCase().split(' ').pop())?' style="background:var(--tha-soft)"':''}><th style="text-align:left">${r[0]}</th><td style="text-align:left">${r[1]}</td><td>${calc}</td><td style="text-align:left" class="small">${r[2]}</td></tr>`}).join('');
  };
  $('em-form').addEventListener('input',draw);$('em-form').addEventListener('change',draw);draw();
}};

/* ---------- Bệnh đồng mắc ---------- */
const COMOR=[
 ['dm','ĐTĐ và CKM','≥130/80','<130/80; <120/70 nếu dung nạp','RASi + CCB hoặc lợi tiểu giống thiazide (viên phối hợp); SGLT2i hoặc GLP-1 RA có lợi ích tim mạch',['12.2','12.3'],`Hội chứng chuyển hóa (≥3): vòng eo ≥90 nam/≥80 nữ; HDL &lt;40 nam/&lt;50 nữ; TG ≥150; HA ≥130/80; glucose đói ≥100 mg/dL. CKM giai đoạn 0–4 ${V('Bảng 12.1','76–77')}.`],
 ['ckd','Bệnh thận mạn','≥130/80 nếu PCR ≥0,15 g/g; ≥140/90 ngay; 130–139/80–89 sau tối đa 1 tháng lối sống','<130/80 (eGFR <60 hoặc UACR ≥30)','ACEi/ARB khi có albumin niệu; CCB, thiazide; SGLT2i khi eGFR >20; lợi tiểu quai khi eGFR <30',['12.4','12.5'],`Tăng kali: cân nhắc chất gắn kali (SZC, patiromer) để duy trì RASi; dapagliflozin dùng từ eGFR 15 theo Dược thư Việt Nam ${V('Phần XII · thận mạn','83')}.`],
 ['hd','Lọc máu / thẩm phân phúc mạc','HATN ≥135/85 hoặc HALĐ ≥130/80','Trước lọc HATT 140–165, HATTr 60–100; sau lọc 120–140/≥70; thẩm phân phúc mạc ≤140/90','Trọng lượng khô; chẹn beta → CCB → ACEi/ARB; ACEi/ARB ưu tiên ở thẩm phân phúc mạc',['12.6','12.7'],''],
 ['tx','Ghép thận','≥140/90','<130/80','CCB-DHP và RASi đầu tay',['12.8'],''],
 ['cad','Bệnh mạch vành','≥130/80','<130/80; HATTr không <70; tần số tim 55–60','ACEi (ARB) + chẹn beta; đau thắt ngực: chẹn beta và/hoặc CCB',['12.9','12.10'],`Không hạ HATTr &lt;60 mmHg ở bệnh nhân mạch vành chưa tái thông ${V('Phần X','54')}.`],
 ['hf','Suy tim','—','<130/80 bất kể PSTM','HFrEF: ARNI/ACEi + chẹn beta + MRA + SGLT2i; HFpEF: SGLT2i ± ARB/MRA; lợi tiểu quai khi quá tải',['12.11'],''],
 ['ich','Xuất huyết não cấp','HATT 150–220','130 đến <140 trong ≥7 ngày; HATT >220: không <130','Labetalol, nicardipine, clevidipine; chỉnh liều êm, tránh dao động',['12.12'],''],
 ['isch','Nhồi máu não cấp','Tiêu sợi huyết: >185/110; không tái tưới máu: ≥220/120','<185/110 trước, <180/105 trong 24 giờ; không tái tưới máu: giảm ~15% trong 24 giờ','Tránh HATT <140 trong 24–72 giờ sau lấy huyết khối thành công',['12.14'],`Bảng ngưỡng và mục tiêu theo tình huống ${V('Bảng 12.13','95')}.`],
 ['sp','Dự phòng đột quỵ, sa sút trí tuệ','≥130/80','<130/80; HATT <130 để dự phòng sa sút trí tuệ','Thiazide, ACEi/ARB (perindopril + indapamide – PROGRESS)',['12.15'],`Tiền sử XHN, nguy cơ tái phát cao: có thể cân nhắc &lt;120/80 ${V('Bảng 12.13','95')}.`],
 ['ob','Béo phì','Như chung','Như chung','ACEi/ARB hàng đầu; thêm CCB hoặc thiazide liều thấp; GLP-1 RA hoặc GIP/GLP-1 RA để giảm cân',['12.16'],'Giảm 10 kg ≈ giảm 10 mmHg HATT.'],
 ['lip','Rối loạn lipid máu','Như chung','Như chung; LDL-C theo nguy cơ','Statin kể cả khi HA <140/90 ở nguy cơ cao; ưu tiên CCB, ARB, ACEi',['12.17'],''],
 ['osa','Ngưng thở khi ngủ','Như chung','HA đêm <120/70','CPAP (trung bình–nặng); ACEi/ARB nếu béo phì',['12.18','12.19'],'']
];
PAGES['/tha/dong-mac']={title:'Bệnh đồng mắc',render(m){
  m.innerHTML=head('VSH/VNHA 2026 · Phần XII','THA và bệnh đồng mắc','Chọn bệnh đi kèm: xem ngưỡng khởi trị, mục tiêu, thuốc ưu tiên và toàn bộ khuyến cáo liên quan.')+
  `<div class="row" id="cm-tabs" role="tablist">${COMOR.map(c=>`<button class="ic" role="tab" data-k="${c[0]}" aria-pressed="false">${c[1]}</button>`).join('')}</div><div id="cm-out" class="stack"></div>`;
  const show=k=>{const c=COMOR.find(x=>x[0]===k)||COMOR[0];store.set('tha-cm',c[0]);
    document.querySelectorAll('#cm-tabs button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===c[0]));
    $('cm-out').innerHTML=`<div class="grid3"><div class="rxcard"><span class="eyebrow">Ngưỡng khởi trị</span><h3>${c[2]}</h3></div><div class="rxcard"><span class="eyebrow">Mục tiêu</span><h3>${c[3]}</h3></div><div class="rxcard"><span class="eyebrow">Thuốc ưu tiên</span><p>${c[4]}</p></div></div>
     ${c[6]?`<div class="callout tha"><p>${c[6]}</p></div>`:''}${c[5].map(t=>box(THT[t][0],t)).join('')}`};
  $('cm-tabs').onclick=e=>{const b=e.target.closest('button');if(b)show(b.dataset.k)};
  const q=new URLSearchParams((location.hash.split('?')[1]||''));show(q.get('k')||store.get('tha-cm','dm'));
}};

/* ---------- Đối tượng đặc biệt ---------- */
PAGES['/tha/dac-biet']={title:'Đối tượng đặc biệt',render(m){
  const CFS=['','Rất khỏe','Khỏe','Kiểm soát bệnh tốt','Dễ tổn thương','Suy yếu nhẹ','Suy yếu trung bình','Suy yếu nặng','Suy yếu rất nặng','Giai đoạn cuối'];
  m.innerHTML=head('VSH/VNHA 2026 · Phần XV','Đối tượng đặc biệt','Người cao tuổi, thai kỳ, chu phẫu, ung thư, người trẻ và trẻ em.')+
  `<div class="grid2"><div class="panel stack"><h3>Người cao tuổi: mục tiêu theo CFS ${V('Hình 15.1','130')}</h3>
    <label class="field"><span>Thang suy yếu lâm sàng: <b id="cfs-l"></b></span><input type="range" id="cfs" min="1" max="9" value="3"></label>
    <label class="field"><span>Tuổi</span><input type="number" id="el-age" value="82"></label>
    <div id="cfs-out" aria-live="polite"></div><div>${FIG('VSH26','Hình 15.1','130')}</div>
    <p class="note">Suy yếu: CFS ≥5 hoặc FRAIL ≥3; đánh giá ở mọi người ≥75 tuổi ${T('11.2')} ${V('Bảng 15.5','128')}.</p></div>
   <div class="panel stack"><h3>Trẻ em và vị thành niên ${V('Bảng 15.8','135')}</h3><div class="form">
    <label class="field"><span>Tuổi</span><input type="number" id="ch-age" value="12" min="3" max="17"></label>
    <label class="field"><span>Giới</span><select id="ch-sex"><option value="m">Nam</option><option value="f">Nữ</option></select></label>
    <label class="field"><span>HA đo được</span><input id="ch-bp" placeholder="ví dụ 128/80"></label></div><div id="ch-out" aria-live="polite"></div>
    <p class="note">Công thức đơn giản: 3–15 tuổi, HATT nam 100 + 2 × tuổi, nữ 100 + 1,5 × tuổi; HATTr 65 + tuổi; 16–17 tuổi: 140/90.</p></div></div>
  ${box('Người cao tuổi','15.6')}
  <div class="grid2">${box('Thai kỳ','15.2')}<div class="stack">${box('Chu phẫu','15.3')}<div class="callout tha"><p>Tham chiếu: <a href="#/tk/tha">THA thai kỳ (ESC 2025)</a> · <a href="#/tp/thuoc">Thuốc quanh mổ (ESC 2022, ACC/AHA 2026)</a>. Magnesium sulfate quá liều: calcium gluconate ${V('Phần XV · thai kỳ','120')}.</p></div></div></div>
  <div class="grid2">${box('Người bệnh ung thư','15.4')}${box('Người trẻ (&lt;40 tuổi)','15.9')}</div>
  <div class="callout tha"><p>Ung thư: dùng carvedilol/nebivolol khi cần chẹn beta cùng thuốc kháng VEGF; áp dụng “quy tắc ngày ốm” (tạm ngưng RASi, lợi tiểu khi nôn, tiêu chảy, mất nước) ${V('Phần XV · ung thư','126')}. SCORE2 không áp dụng cho người &lt;40 tuổi ${V('Phần XV · người trẻ','136')}.</p></div>`;
  const draw=()=>{const c=+$('cfs').value,a=num('el-age')||0;$('cfs-l').textContent=`${c} · ${CFS[c]}`;
    let t;if(c<=3)t=[`&lt;130/80 hoặc thấp nhất dung nạp được`,a>=80?`≥80 tuổi không suy yếu: &lt;140/90 ${B('I','A')}; &lt;130/80 nếu dung nạp ${B('IIa','B-NR')}; không hướng tới HATT &lt;120 hoặc HATTr &lt;70 ${B('3H','C-LD')}`:`60–79 tuổi: &lt;130/80 ${B('I','A')}; &lt;120/80 nếu dung nạp, thận trọng HATTr &lt;70 ${B('I','B-R')}`];
    else if(c<=6)t=[`&lt;140/90 tùy dung nạp`,`Cá thể hóa ngưỡng và mục tiêu ${B('I','A')}; theo dõi hạ HA tư thế, té ngã ${B('I','C-EO')}; cân nhắc đơn trị ${B('IIa','C-LD')} ${T('10.6')}`];
    else t=[`Cá thể hóa`,`Cân nhắc giảm cường độ điều trị khi HATT &lt;120, hạ HA tư thế nặng hoặc suy yếu nặng ${B('IIa','C-LD')}; tiên lượng sống &lt;3 năm có thể chấp nhận &lt;150/90 ${B('IIb','C-LD')} ${T('10.3')}`];
    $('cfs-out').innerHTML=`<div class="result"><span class="eyebrow">Mục tiêu HAPK</span><h2>${t[0]}</h2><p>${t[1]} ${T('15.6')}</p><p class="note">Không ngừng điều trị chỉ vì tuổi ${B('3H','B-R')} hoặc vì suy giảm nhận thức ${B('I','C-EO')}.</p></div>`;
    const ag=num('ch-age'),f=$('ch-sex').value==='f',bp=($('ch-bp').value||'').split(/[\/\s]+/).map(Number);
    if(ag&&ag>=3&&ag<=17){const ts=ag>=16?140:Math.round(100+(f?1.5:2)*ag),td=ag>=16?90:65+ag;
      const hi=bp[0]&&bp[1]?(bp[0]>=ts||bp[1]>=td):null;
      $('ch-out').innerHTML=`<div class="result"><span class="eyebrow">Ngưỡng HA cao</span><h2>${ts}/${td} mmHg</h2>${hi==null?'':`<p>${hi?'<b>Vượt ngưỡng</b>: xác nhận lại nhiều lần; THA ở trẻ em là chỉ điểm tìm nguyên nhân thứ phát '+V('Bảng 6.1','27–28'):'Dưới ngưỡng.'}</p>`}</div>`}
    else $('ch-out').innerHTML='<p class="note">Nhập tuổi 3–17.</p>'};
  ['cfs','el-age','ch-age','ch-sex','ch-bp'].forEach(id=>$(id).addEventListener('input',draw));draw();
}};

/* ---------- Lối sống & theo dõi ---------- */
PAGES['/tha/loi-song']={title:'Lối sống & theo dõi',render(m){
  m.innerHTML=head('VSH/VNHA 2026 · Phần IX, XI, XVII','Lối sống, theo dõi và vắc xin','Công cụ nhỏ để tư vấn người bệnh, kèm khuyến cáo gốc.')+
  `<div class="grid3"><div class="panel stack"><h3>Đổi natri ra muối</h3><label class="field"><span>Natri trên nhãn (mg)</span><input type="number" id="na" value="800"></label><div id="na-out"></div><p class="note">Mục tiêu natri &lt;2 g/ngày (≈5 g muối) ${T('9.1')}.</p></div>
   <div class="panel stack"><h3>Giảm cân dự kiến</h3><label class="field"><span>Cân nặng giảm (kg)</span><input type="number" id="kg" value="5"></label><div id="kg-out"></div><p class="note">Mỗi 10 kg ≈ 10 mmHg HATT ${B('IIa','B-NR')} ${T('12.16')}.</p></div>
   <div class="panel stack"><h3>BMI người Việt</h3><div class="form"><label class="field"><span>Cân nặng (kg)</span><input type="number" id="bw" value="68"></label><label class="field"><span>Chiều cao (cm)</span><input type="number" id="bh" value="162"></label></div><div id="bmi-out"></div><p class="note">≥23 thừa cân, ≥25 béo phì; mục tiêu 20–23 ${T('2.5')} ${T('9.1')}.</p></div></div>
  ${box('Can thiệp không dùng thuốc','9.1')}
  <div class="grid2">${box('Theo dõi điều trị','11.1')}${box('Theo dõi ở đối tượng đặc biệt','11.2')}</div>
  <div class="panel stack"><h3>Tần suất đánh giá lại nguy cơ ${V('Bảng 7.3','40–41')}</h3><ul class="plain"><li>Lần khám đầu: đánh giá toàn diện.</li><li>HA bình thường cao hoặc áo choàng trắng chưa điều trị: đánh giá lại trong vòng 1 năm.</li><li>Đang chỉnh liều: mỗi 2–6 tuần.</li><li>Ổn định: mỗi năm. Bệnh thận mạn trung bình–nặng: mỗi 3–6 tháng.</li></ul></div>
  <div class="panel stack"><h3>Vắc xin cho người bệnh THA ${V('Bảng 17.1','145')}</h3><table class="bpgrid"><tbody>
   <tr><th style="text-align:left">Cúm</th><td style="text-align:left">Hằng năm; ưu tiên ≥65 tuổi hoặc có bệnh tim mạch</td></tr>
   <tr><th style="text-align:left">Phế cầu</th><td style="text-align:left">≥50 tuổi (PCV20 hoặc PCV21)</td></tr>
   <tr><th style="text-align:left">COVID-19</th><td style="text-align:left">Theo khuyến cáo hiện hành</td></tr>
   <tr><th style="text-align:left">RSV</th><td style="text-align:left">≥75 tuổi, hoặc ≥50 tuổi có bệnh tim mạch</td></tr>
   <tr><th style="text-align:left">Zona</th><td style="text-align:left">≥50 tuổi</td></tr></tbody></table>
   <p class="note">HA 140–179/90–109 không phải lý do hoãn tiêm chủng.</p></div>`;
  const draw=()=>{const na=num('na');$('na-out').innerHTML=na!=null?`<div class="result"><h2>${(na*2.54/1000).toFixed(1)} g muối</h2><p>${Math.round(na/20)}% hạn mức natri 2 g/ngày.</p></div>`:'';
    const kg=num('kg');$('kg-out').innerHTML=kg!=null?`<div class="result"><h2>≈ −${Math.round(kg)} mmHg HATT</h2></div>`:'';
    const w=num('bw'),h=num('bh');if(w&&h){const b=w/(h/100)**2;$('bmi-out').innerHTML=`<div class="result"><h2>BMI ${b.toFixed(1)}</h2><p>${b>=25?'Béo phì':b>=23?'Thừa cân':b>=18.5?'Bình thường':'Thiếu cân'}. Cân nặng mục tiêu (BMI 23): ≤${(23*(h/100)**2).toFixed(0)} kg.</p></div>`}};
  ['na','kg','bw','bh'].forEach(id=>$(id).addEventListener('input',draw));draw();
}};

/* ---------- Liều thuốc ---------- */
PAGES['/tha/thuoc']={title:'Liều thuốc hạ áp',render(m){
  const groups=[...new Set(THDRUGS.map(d=>d[0]))];
  m.innerHTML=head('VSH/VNHA 2026 · Phụ lục','Liều thuốc hạ áp đường uống',`Liều khởi đầu, chuẩn và tối đa ${PL5}. Luôn đối chiếu tờ hướng dẫn và chức năng gan, thận.`)+
  `<div class="filters"><input type="search" id="dr-q" placeholder="Tìm thuốc: amlodipine, indapamide…" aria-label="Tìm thuốc"><select id="dr-g" aria-label="Nhóm"><option value="">Mọi nhóm</option>${groups.map(g=>`<option>${g}</option>`).join('')}</select></div>
  <div style="overflow-x:auto"><table class="bpgrid"><thead><tr><th>Nhóm</th><th>Thuốc</th><th>Liều</th></tr></thead><tbody id="dr-tb"></tbody></table></div>
  <p class="note">Nifedipine dạng tác dụng ngắn không dùng điều trị THA mạn. Liều dùng trong thuốc phối hợp cố định theo Bảng 10.9 ${V('Bảng 10.9','67')}.</p>`;
  const draw=()=>{const q=$('dr-q').value.trim().toLowerCase(),g=$('dr-g').value;
    $('dr-tb').innerHTML=THDRUGS.filter(d=>(!g||d[0]===g)&&(!q||(d[0]+' '+d[1]).toLowerCase().includes(q))).map(d=>`<tr><td>${d[0]}</td><th style="text-align:left">${d[1]}</th><td style="text-align:left">${d[2]}</td></tr>`).join('')};
  $('dr-q').oninput=draw;$('dr-g').onchange=draw;draw();
}};

/* ---------- Tất cả khuyến cáo ---------- */
PAGES['/tha/khuyen-cao']={title:'Khuyến cáo THA',render(m){
  m.innerHTML=head('VSH/VNHA 2026','Tất cả khuyến cáo',`${TR.length} khuyến cáo từ ${Object.keys(THT).length} bảng. Lọc theo chương, bảng, class hoặc từ khóa.`)+
  `<div class="filters"><input type="search" id="k-q" placeholder="Từ khóa: spironolactone, lọc máu, ≥80 tuổi…" aria-label="Từ khóa">
   <select id="k-ch" aria-label="Chương"><option value="">Mọi chương</option>${Object.entries(THCH).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select>
   <select id="k-t" aria-label="Bảng"><option value="">Mọi bảng</option>${Object.entries(THT).map(([k,v])=>`<option value="${k}">Bảng ${k} · ${v[0]}</option>`).join('')}</select>
   <select id="k-c" aria-label="Class"><option value="">Mọi class</option><option>I</option><option>IIa</option><option>IIb</option><option value="3">III</option></select><span class="note" id="k-n"></span></div><div id="k-list" class="stack"></div>`;
  const q=new URLSearchParams(location.hash.split('?')[1]||'');if(q.get('t'))$('k-t').value=q.get('t');
  const draw=()=>{const qq=$('k-q').value.trim().toLowerCase(),ch=$('k-ch').value,t=$('k-t').value,c=$('k-c').value;
    const rs=TR.filter(r=>(!ch||THT[r[0]][2]===ch)&&(!t||r[0]===t)&&(!c||(c==='3'?r[2].startsWith('3'):r[2]===c))&&(!qq||(r[1]+' '+THT[r[0]][0]).toLowerCase().includes(qq)));
    $('k-n').textContent=rs.length+' khuyến cáo';
    const tabs=[...new Set(rs.map(r=>r[0]))];
    $('k-list').innerHTML=tabs.map(tb=>`<div class="panel stack"><h3>Bảng ${tb} · ${THT[tb][0]} ${T(tb)}</h3>${rs.filter(r=>r[0]===tb).map(r=>recLine([recTxt(r),r[2],r[3]])).join('')}</div>`).join('')||'<p class="note">Không có kết quả.</p>'};
  ['k-q','k-ch','k-t','k-c'].forEach(id=>$(id).addEventListener('input',draw));draw();
}};
})();

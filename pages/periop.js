/* ===== Mảng Tiền phẫu (ESC 2022 + ACC/AHA 2026) ===== */
(function(){
const E=(loc,p)=>C('ESC22',loc,p), A=(loc,p)=>C('AHA26',loc,p);

/* ---------- Lộ trình (kiểu gdmt.org/pathway) ---------- */
PAGES['/tp']={title:'Tiền phẫu',render(m){
  const pt=store.get('tp-patient',null);
  const chip=pt?`<span class="pill on">Bệnh nhân hiện tại</span><span class="pill">${pt.age} tuổi</span><span class="pill">${pt.surgName}</span><span class="pill">RCRI ${pt.rcri}</span><span class="pill">${pt.fcName}</span>`:`<span class="pill">Chưa nhập bệnh nhân</span><a class="nv" href="#/tp/tro-ly">Nhập ở Trợ lý hội chẩn →</a>`;
  m.innerHTML=head('Hội chẩn tim mạch trước phẫu thuật ngoài tim','Lộ trình hội chẩn tiền phẫu',`Mọi bước dùng chung một bệnh nhân. Mở các ô theo bất kỳ thứ tự nào; mũi tên chỉ gợi ý trình tự thường gặp. Nguồn: ${E('','')} ${A('','')}`)+
  `<div class="chipbar">${chip}</div>
  <div class="callout"><p><b>Về bản ACC/AHA 2026.</b> Trang đầu văn bản ghi: khuyến cáo, văn bản, hình, bảng giống hệt bản 2024; bằng chứng được rà soát đến 3/2026, không có thay đổi. ${A('Trang đầu','e413')}</p></div>
  <div class="steps-path">
   ${pstep(1,'Phân loại cấp độ khẩn và tình trạng tim cấp','Mổ cấp cứu? Có ACS, rối loạn nhịp không ổn định, suy tim mất bù?',[['#/tp/tro-ly','Trợ lý hội chẩn','Chạy song song Hình 2 ESC và Hình 1 AHA','ESC Hình 2 · AHA Hình 1']])}
   ${pstep(2,'Ước tính nguy cơ','Loại phẫu thuật, RCRI, khả năng gắng sức, frailty, biomarker',[['#/tp/so-sanh?c=risk','Đánh giá nguy cơ','Phân tầng 3 bậc (ESC) và 2 bậc (AHA)','ESC Bảng 5 · AHA Bảng 2'],['#/tp/so-sanh?c=test','Thăm dò trước mổ','ECG, NT-proBNP, troponin, TTE, stress, CCTA','ESC Rec. 7–10 · AHA §3–4']])}
   ${pstep(3,'Tối ưu thuốc và chống huyết khối','Tiếp tục, ngưng hay khởi trị; thời điểm mổ sau PCI; DOAC/VKA',[['#/tp/thuoc','Thuốc quanh mổ','Beta-blocker, statin, RAASi, SGLT2i, GLP-1 RA…','ESC Rec. 12 · AHA §7'],['#/tp/dapt','Sau PCI','Thanh thời gian class cho từng guideline','ESC Hình 6 · AHA Hình 5'],['#/tp/khang-dong','Kháng đông','Lịch ngưng theo giờ (ESC) và ngày (AHA)','ESC Hình 10 · AHA Bảng 13']])}
   ${pstep(4,'Bệnh lý đặc thù','Van tim, suy tim, tăng áp phổi, tim bẩm sinh, CIED, đột quỵ',[['#/tp/so-sanh?c=dz','Bệnh lý đặc thù','So sánh từng khuyến cáo','ESC §6 · AHA §6']])}
   ${pstep(5,'Sau mổ','Troponin, PMI/MINS, NMCT, rung nhĩ, thuyên tắc phổi',[['#/tp/troponin','Phân loại troponin sau mổ','Từng bước Có/Không theo ESC Hình 19 và AHA Hình 6','ESC Hình 18–19 · AHA Hình 6'],['#/tp/so-sanh?c=post','Biến chứng sau mổ','So sánh khuyến cáo','ESC Rec. 34 · AHA §9']])}
   ${pstep(6,'Tự kiểm tra','Ca lâm sàng có giải thích theo cả hai guideline',[['#/tp/ca','Ca lâm sàng','12 ca','ESC 2022 · ACC/AHA 2026']])}
  </div>
  <h2>Những khác biệt ảnh hưởng trực tiếp đến phiếu hội chẩn</h2>
  <div class="keydiff">${KEY.map((k,i)=>`<div class="kd"><h3>${k.t}</h3>
   <div class="r2"><span class="who esc">ESC</span><span>${B(k.e[0],k.e[1])} ${k.e[2]} ${C(...KEYSRC[i][0])}</span></div>
   <div class="r2"><span class="who aha">AHA</span><span>${B(k.a[0],k.a[1])} ${k.a[2]} ${C(...KEYSRC[i][1])}</span></div></div>`).join('')}</div>
  <h2>Quy đổi class giữa hai hệ thống</h2>
  <div class="cormap"><div class="c1"><b>I ⇄ 1</b><span>Khuyến cáo. Lợi ≫ hại.</span></div><div class="c2a"><b>IIa ⇄ 2a</b><span>Nên cân nhắc / hợp lý.</span></div><div class="c2b"><b>IIb ⇄ 2b</b><span>Có thể cân nhắc.</span></div><div class="c3"><b>III ⇄ 3: Không lợi</b><span>Không khuyến cáo.</span></div><div class="c3" style="outline:1.5px solid var(--c3)"><b>III ⇄ 3: Có hại</b><span>AHA tách riêng “có hại”.</span></div></div>
  <p class="note">ESC B ≈ AHA B-R (RCT) hoặc B-NR (không ngẫu nhiên); ESC C ≈ AHA C-LD hoặc C-EO. ${E('Bảng 1–2','3833')} ${A('Bảng 3','e420')}</p>`;
}};
function pstep(n,t,d,tiles){return `<div class="pstep"><span class="pnum">${n}</span><div class="stack"><div><h3>${t}</h3><p class="note">${d}</p></div><div class="tiles">${tiles.map(x=>`<a class="tile" href="${x[0]}"><b>${x[1]}</b><span>${x[2]}</span><span class="tg">${x[3]}</span></a>`).join('')}</div></div></div>`}

/* ---------- Trợ lý hội chẩn ---------- */
PAGES['/tp/tro-ly']={title:'Trợ lý hội chẩn',render(m){
  m.innerHTML=head('Đi qua thuật toán của cả hai guideline cùng lúc','Trợ lý hội chẩn',`Cột trái theo Hình 2 của ESC ${E('Hình 2','3844')}, cột phải theo Hình 1 của AHA ${A('Hình 1','e433')}. Thông tin nhập được lưu trên trình duyệt này và hiện ở Lộ trình. Dữ liệu mẫu là ca giả định.`)+
  `<form class="panel stack" id="f-t">
   <div class="form">
    <label class="field"><span>Mức khẩn cấp</span><select id="t-urg"><option value="elective">Chương trình (elective)</option><option value="timesens">Time-sensitive (ví dụ ung thư)</option><option value="urgent">Khẩn (2–24 h)</option><option value="emergency">Cấp cứu (&lt;2 h)</option></select></label>
    <label class="field"><span>Tuổi</span><input type="number" id="t-age" min="18" max="110" value="72"></label>
    <label class="field"><span>Loại phẫu thuật (ESC Bảng 5)</span><select id="t-surg"></select></label>
    <label class="field"><span>Khả năng gắng sức</span><select id="t-fc"><option value="good">≥4 METs / DASI &gt;34 / leo 2 tầng lầu được</option><option value="poor" selected>&lt;4 METs / DASI ≤34</option><option value="unknown">Không đánh giá được</option></select></label>
    <label class="field"><span>NT-proBNP trước mổ (pg/mL)</span><input type="number" id="t-ntp" min="0" placeholder="để trống nếu chưa làm" value="410"></label>
   </div>
   <div class="form">
    <fieldset><legend>Bệnh cảnh tim cấp</legend><div class="checks"><label><input type="checkbox" id="t-acs"> Hội chứng vành cấp</label><label><input type="checkbox" id="t-arr"> Rối loạn nhịp không ổn định</label><label><input type="checkbox" id="t-adhf"> Suy tim mất bù</label></div></fieldset>
    <fieldset><legend>Nền tim mạch</legend><div class="checks"><label><input type="checkbox" id="t-cvd" checked> Bệnh tim mạch đã biết</label><label><input type="checkbox" id="t-rf" checked> Yếu tố nguy cơ (THA, ĐTĐ, RLLP, hút thuốc, gia đình)</label><label><input type="checkbox" id="t-pci"> Đã PCI/CABG</label></div></fieldset>
    <fieldset><legend>Triệu chứng / dấu hiệu mới</legend><div class="checks"><label><input type="checkbox" id="t-dysp"> Khó thở / phù ngoại biên</label><label><input type="checkbox" id="t-cp"> Đau ngực gợi ý bệnh vành</label><label><input type="checkbox" id="t-mur"> Tiếng thổi mới</label></div></fieldset>
    <fieldset><legend>RCRI (mỗi mục 1 điểm) ${A('Bảng 4','e422')}</legend><div class="checks"><label><input type="checkbox" id="r-hs"> PT nguy cơ cao (trong phúc mạc, lồng ngực, mạch máu trên bẹn)</label><label><input type="checkbox" id="r-ihd" checked> Bệnh tim thiếu máu cục bộ</label><label><input type="checkbox" id="r-hf"> Tiền sử suy tim</label><label><input type="checkbox" id="r-cva"> Bệnh mạch máu não</label><label><input type="checkbox" id="r-ins"> ĐTĐ dùng insulin</label><label><input type="checkbox" id="r-cr"> Creatinine &gt;2,0 mg/dL (&gt;177 µmol/L)</label><label><input type="checkbox" id="r-calc"> Calculator khác (NSQIP…) ≥1%</label></div></fieldset>
    <fieldset><legend>Risk modifiers của AHA</legend><div class="checks"><label><input type="checkbox" id="m-vhd"> Bệnh van tim nặng</label><label><input type="checkbox" id="m-ph"> Tăng áp phổi nặng</label><label><input type="checkbox" id="m-chd"> Tim bẩm sinh nguy cơ cao</label><label><input type="checkbox" id="m-stroke"> Đột quỵ gần đây</label><label><input type="checkbox" id="m-cied"> Có máy tạo nhịp/ICD</label><label><input type="checkbox" id="m-frail"> Frailty</label></div></fieldset>
   </div></form>
  <div class="panel chipbar" id="t-sum"></div>
  <div class="out"><div class="outcol esc"><header>ESC 2022 · Hình 2</header><ul class="steps" id="t-esc"></ul></div><div class="outcol aha"><header>ACC/AHA 2026 · Hình 1</header><ul class="steps" id="t-aha"></ul></div></div>`;
  $('t-surg').innerHTML=['low','int','high'].map(t=>`<optgroup label="Nguy cơ ${TIERN[t]}">`+SURG.map((s,i)=>s[1]===t?`<option value="${i}">${s[0]}</option>`:'').join('')+'</optgroup>').join('');
  const saved=store.get('tp-form',null);
  if(saved){Object.entries(saved).forEach(([k,v])=>{const el=$(k);if(!el)return;if(el.type==='checkbox')el.checked=v;else el.value=v})}
  else{$('t-surg').value=String(SURG.findIndex(s=>s[0].startsWith('Trong phúc mạc')));$('r-hs').checked=true}
  $('t-surg').addEventListener('change',()=>{$('r-hs').checked=!!SURG[+$('t-surg').value][2]});
  const f=$('f-t');f.addEventListener('input',runT);f.addEventListener('change',runT);f.addEventListener('submit',e=>e.preventDefault());
  runT();
}};
function runT(){
  const g=id=>$(id).checked, urg=$('t-urg').value, age=+$('t-age').value||0, s=SURG[+$('t-surg').value], tier=s[1];
  const fc=$('t-fc').value, ntpRaw=$('t-ntp').value, ntp=ntpRaw===''?null:+ntpRaw;
  const cvd=g('t-cvd'), rf=g('t-rf')||age>=65, pci=g('t-pci'), dysp=g('t-dysp'), cp=g('t-cp'), mur=g('t-mur');
  const active=g('t-acs')||g('t-arr')||g('t-adhf');
  const rcri=['r-hs','r-ihd','r-hf','r-cva','r-ins','r-cr'].filter(g).length;
  const rcriClin=['r-ihd','r-hf','r-cva','r-ins','r-cr'].filter(g).length;
  const elevated=rcri>=2||g('r-calc');
  const mods=['m-vhd','m-ph','m-chd','m-stroke','m-cied','m-frail'].filter(g).length>0||pci;
  const sym=dysp||cp||mur, grp=cvd?3:(rf?2:1);
  /* lưu */
  const form={};document.querySelectorAll('#f-t input,#f-t select').forEach(el=>{form[el.id]=el.type==='checkbox'?el.checked:el.value});store.set('tp-form',form);
  store.set('tp-patient',{age,surgName:s[0],rcri,fcName:{good:'Gắng sức ≥4 METs',poor:'Gắng sức <4 METs',unknown:'Gắng sức không rõ'}[fc]});
  const grpN={1:'<65 tuổi, không CVD/YTNC',2:'≥65 tuổi hoặc có YTNC',3:'CVD đã biết'}[grp];
  $('t-sum').innerHTML=`<span class="pill">ESC: nhóm “${grpN}” · PT nguy cơ ${TIERN[tier]}</span><span class="pill">RCRI ${rcri} điểm → AHA: nguy cơ ${elevated?'tăng (≥1%)':'thấp (<1%)'}</span>${mods?'<span class="pill">Có risk modifier</span>':''}${ntp!==null?`<span class="pill">NT-proBNP ${ntp}: ESC ${ntp>=125?'bất thường':'bình thường'} · AHA ${ntp>=300?'bất thường':'bình thường'}</span>`:''}`;
  let X=[];
  if(urg==='emergency'||urg==='urgent'){
    X.push(li(`PT cấp cứu/khẩn: không đủ thời gian làm xét nghiệm tim mạch, tiến hành phẫu thuật. ${E('Hình 2','3844')}`,'stop'));
    if(active||cp) X.push(li(`${B('I','C')} Có triệu chứng gợi ý bệnh vành hoặc tình trạng tim cấp: tiếp cận đa chuyên khoa chọn phương án có tổng nguy cơ thấp nhất. ${E('Rec. 4','3846')}`));
    if(grp>=2&&tier!=='low') X.push(li(`${B('I','B')} hs-cTn sau mổ 24 h và 48 h để phát hiện PMI. ${E('Rec. 7','3851')}`));
  }else{
    if(urg==='timesens') X.push(li(`PT time-sensitive: quyết định đa chuyên khoa về thăm dò cá thể hóa; nếu còn thời gian, xử trí như PT chương trình. ${E('Hình 2','3844')}`));
    if(g('t-acs')) X.push(li(`${B('I','A')} ACS: nếu PT hoãn được (ví dụ ≥3 tháng), chẩn đoán và điều trị như ACS. ${E('Rec. 19','3874')}`,'stop'));
    if(g('t-arr')||g('t-adhf')) X.push(li(`Rối loạn nhịp không ổn định / suy tim mất bù: điều trị theo guideline chuyên biệt, đa chuyên khoa quyết định thời điểm mổ. ${E('§6.2–6.4','3875–3880')}`,'stop'));
    X.push(li(`${B('I','C')} Hỏi bệnh, khám kỹ, xét nghiệm thường quy. ${E('Rec. 2','3845')}`));
    X.push(li(`${B('I','B')} Bỏ thuốc lá >4 tuần; ${B('I','C')} tối ưu điều trị CVD và YTNC. ${E('Rec. 2, 11','3845, 3854')}`));
    if(tier==='low') X.push(li(`PT nguy cơ thấp: không cần thăm dò thêm. ${E('Hình 2','3844')}`));
    else if(grp===1){ if(tier==='high'&&age>45) X.push(li(`${B('IIa','C')} 45–65 tuổi, PT cao: cân nhắc ECG và biomarker. ${E('Rec. 3','3845')}`)); else X.push(li(`Không cần thăm dò thêm. ${E('Hình 2','3844')}`)); }
    else{
      X.push(li(`${B('I','C')} ECG 12 chuyển đạo trước mổ. ${E('Rec. 7','3851')}`));
      X.push(li(`${B('I','B')} hs-cTn T/I trước mổ, 24 h và 48 h sau mổ. ${E('Rec. 7','3851')}`));
      X.push(li(`${B('IIa','B')} NT-proBNP/BNP (bất thường: NT-proBNP ≥125, BNP ≥35 pg/mL). ${E('Rec. 7','3851')}`));
      X.push(li(`${B('IIa','B')} Đánh giá gắng sức (DASI hoặc leo 2 tầng lầu). ${E('Rec. 6','3850')}`));
      if(grp===3&&tier==='high') X.push(li(`Hội chẩn tim mạch, quyết định đa chuyên khoa. ${E('Hình 2','3844')}`));
    }
    if(age>=70&&tier!=='low') X.push(li(`${B('IIa','B')} Tầm soát frailty (≥70 tuổi, PT trung bình–cao). ${E('Rec. 6','3849')}`));
    if(dysp) X.push(li(`${B('I','C')} Khó thở/phù: ECG + NT-proBNP/BNP. ${E('Rec. 4','3846')}`));
    if(cp) X.push(li(`${B('I','C')} Đau ngực gợi ý CAD: làm chẩn đoán như ngoài PT. ${E('Rec. 4','3846')}`));
    if(mur) X.push(li(`${B(dysp||cp?'I':'IIa','C')} Tiếng thổi mới: TTE. ${E('Rec. 4','3845')}`));
    const bnpHigh=ntp!==null&&ntp>=125;
    if(tier==='high'&&(fc!=='good'||bnpHigh||mur)) X.push(li(`${B('I','B')} TTE: gắng sức kém, NT-proBNP cao hoặc có tiếng thổi, trước PT cao. ${E('Rec. 8','3852')}`));
    else if(tier==='int'&&(fc!=='good'||bnpHigh||rcriClin>=1)) X.push(li(`${B('IIb','B')} Có thể làm TTE trước PT trung bình. ${E('Rec. 8','3852')}`));
    if(dysp&&bnpHigh) X.push(li(`${B('I','C')} Khó thở + NT-proBNP tăng: TTE. ${E('Rec. 4','3846')}`));
    if(tier==='high'&&fc!=='good'&&urg==='elective'&&(rcriClin>=1||cvd)) X.push(li(`${B('I','B')} Stress imaging: PT cao chương trình, gắng sức kém, nguy cơ lâm sàng cao. ${E('Rec. 9','3853')}`));
    else if(tier==='high'&&fc!=='good'&&pci) X.push(li(`${B('IIa','C')} Stress imaging: gắng sức kém, đã PCI/CABG. ${E('Rec. 9','3853')}`));
    else if(tier==='int'&&fc!=='good'&&rf) X.push(li(`${B('IIb','B')} Có thể làm stress imaging nếu lo ngại thiếu máu cục bộ. ${E('Rec. 9','3853')}`));
    else if(tier!=='low') X.push(li(`${B('III','C')} Không làm stress imaging thường quy. ${E('Rec. 9','3853')}`));
  }
  $('t-esc').innerHTML=X.join('');
  let Y=[];
  if(!cvd&&!rf&&!sym&&!active) Y.push(li(`Không YTNC, không bệnh tim mạch, không triệu chứng → phẫu thuật. ${A('Hình 1','e433')}`,'stop'));
  else if(urg==='emergency') Y.push(li(`PT cấp cứu → phẫu thuật. ${A('Hình 1','e433')}`,'stop'));
  else if(active){Y.push(li(`ACS / rối loạn nhịp không ổn định / suy tim mất bù → xử trí tình trạng cấp, thảo luận đa chuyên khoa về hoãn mổ. ${A('Hình 1','e433')}`,'stop'));
    if(g('t-acs')) Y.push(li(`${B('1','C-LD')} ACS: tái thông khi phù hợp và hoãn PT chương trình. ${A('§6.1.1','e433')}`));}
  else{
    if(urg==='urgent') Y.push(li(`PT khẩn (2–24 h): chỉ làm đánh giá có thể thay đổi xử trí trong thời gian cho phép. ${A('Bảng 2','e419')}`));
    Y.push(li(`${B('2a','B-NR')} Công cụ nguy cơ đã thẩm định: RCRI ${rcri} điểm → nguy cơ ${elevated?'tăng':'thấp'}. ${A('§3.1','e421')}`));
    let gate=true;
    if(!elevated&&!mods){Y.push(li(`Nguy cơ thấp, không risk modifier → phẫu thuật. ${A('Hình 1','e433')}`,'stop'));gate=false;
      if(tier!=='low') Y.push(li(`<span class="note">ESC vẫn xếp ca này là PT nguy cơ ${TIERN[tier]}.</span>`));}
    else if(!mods){
      if(!cvd&&!sym) Y.push(li(`${B('2b','B-NR')} Có thể làm ECG. ${A('§4.1','e426')}`)); else Y.push(li(`${B('2a','B-NR')} ECG 12 chuyển đạo. ${A('§4.1','e426')}`));
      Y.push(li(`Cân nhắc khởi GDMT giảm nguy cơ lâu dài. ${A('§7','e451')}`));
    }else{
      Y.push(li(`Có risk modifier → hội chẩn theo nhóm về thời điểm mổ và thăm dò. ${A('Hình 1','e433')}`));
      if(cvd||sym) Y.push(li(`${B('2a','B-NR')} ECG 12 chuyển đạo. ${A('§4.1','e426')}`));
      if(g('m-vhd')||mur||dysp) Y.push(li(`${B('1','B-NR')} Siêu âm tim (nghi bệnh van vừa–nặng, khó thở mới, nghi rối loạn chức năng thất). ${A('§4.2.1, §6.4','e427, e441')}`));
      if(g('m-stroke')) Y.push(li(`${B('2a','B-NR')} Đột quỵ/TIA gần đây: hoãn PT chương trình ≥3 tháng. ${A('§6.7','e450')}`));
      if(g('m-chd')) Y.push(li(`${B('1','B-NR')} Hội chẩn chuyên gia ACHD. ${A('§6.3.3','e439')}`));
      if(g('m-ph')) Y.push(li(`${B('2a','C-LD')} PH nặng: hội chẩn trung tâm PH, theo dõi huyết động xâm lấn. ${A('§6.3.2','e437')}`));
      if(g('m-cied')) Y.push(li(`${B('1','B-NR')} CIED: kế hoạch trước mổ (loại máy, hãng, phụ thuộc máy). ${A('§6.6','e447')}`));
      if(g('m-frail')||age>=65) Y.push(li(`${B('2a','B-NR')} Đánh giá frailty bằng công cụ đã thẩm định. ${A('§3.3','e424')}`));
    }
    if(!mods&&dysp) Y.push(li(`${B('1','B-NR')} Khó thở mới: đánh giá chức năng thất trái. ${A('§4.2.1','e427')}`));
    if(gate){
      if(fc==='good') Y.push(li(`${B('2a','B-NR')} Gắng sức ≥4 METs / DASI >34 → phẫu thuật. ${A('§3.2, Hình 1','e423, e433')}`,'stop'));
      else{
        Y.push(li(`Gắng sức ${fc==='poor'?'kém':'không rõ'} → chỉ thăm dò thêm nếu kết quả thay đổi quyết định. ${A('Hình 1','e433')}`));
        Y.push(li(`${B('2a','B-NR')} BNP/NT-proBNP; ${B('2b','B-NR')} có thể đo troponin trước mổ. ${A('§3.4','e425')}`));
        if(ntp===null) Y.push(li(`Biomarker bình thường → mổ. Bất thường (NT-proBNP ≥300, BNP >92) → họp nhóm. ${A('Hình 1','e433')}`));
        else if(ntp<300) Y.push(li(`NT-proBNP ${ntp} &lt;300 → bình thường → phẫu thuật. ${A('Hình 1','e433')}`,'stop'));
        else{Y.push(li(`NT-proBNP ${ntp} ≥300 → họp nhóm đa chuyên khoa về thăm dò thêm. ${A('Hình 1','e433')}`));
          Y.push(li(`Cân nhắc siêu âm tim; ${B('2b','B-NR')} stress test; ${B('2b','B-NR')} CCTA. ${A('§4.3, §4.5','e428, e430')}`));
          Y.push(li(`Kết quả nguy cơ thấp → mổ. Gợi ý LM hoặc nhiều nhánh → cân nhắc hoãn, điều trị xâm lấn/không xâm lấn, hoặc vẫn mổ sau thảo luận. ${A('Hình 1','e433')}`));}
      }
      if(elevated&&(cvd||sym||(age>=65&&rf))) Y.push(li(`${B('2b','B-NR')} Có thể theo dõi troponin 24 h và 48 h sau mổ. ${A('§9.1','e467')}`));
    }
    Y.push(li(`${B('2a','B-NR')} Tầm soát OSA bằng bảng câu hỏi. ${A('§6.8','e450')}`));
  }
  $('t-aha').innerHTML=Y.join('');
}

/* ---------- So sánh ---------- */
PAGES['/tp/so-sanh']={title:'So sánh ESC–AHA',render(m){
  const q=new URLSearchParams((location.hash.split('?')[1]||''));let cat=q.get('c')||'all';
  m.innerHTML=head('Đối chiếu từng khuyến cáo','So sánh ESC 2022 và ACC/AHA 2026','Mỗi khuyến cáo ghi class và mức bằng chứng như văn bản gốc; nút trích dẫn mở tài liệu và số trang. Ô “Thực hành” là gợi ý tổng hợp của app, không phải văn bản guideline.')+
  `<div class="filters" id="m-cats">${CATS.map(([id,n])=>`<button type="button" class="chip" data-c="${id}" aria-pressed="${id===cat}">${n}</button>`).join('')}</div>
  <div class="filters"><select id="m-diff" aria-label="Mức khác biệt"><option value="">Mọi mức khác biệt</option><option value="major">Khác biệt quan trọng</option><option value="minor">Khác về mức độ</option><option value="same">Tương đồng</option><option value="esc">Chỉ ESC</option><option value="aha">Chỉ AHA</option></select><input type="search" id="m-q" placeholder="Tìm: troponin, SGLT2, hẹp chủ, CIED…" aria-label="Tìm"><span class="note" id="m-count"></span></div>
  <div id="m-list" class="stack"></div>`;
  const catName=Object.fromEntries(CATS);
  const recs=l=>l.map(r=>recLine(r)).join('');
  function render(){
    const d=$('m-diff').value, qq=$('m-q').value.trim().toLowerCase();
    const rows=M.filter(r=>(cat==='all'||r.c===cat)&&(!d||r.d===d)&&(!qq||JSON.stringify(r).toLowerCase().includes(qq)));
    $('m-count').textContent=`${rows.length} / ${M.length} chủ đề`;
    $('m-list').innerHTML=rows.map(r=>{const s=SRC[r.t]||{e:[],a:[]};return `<article class="mrow"><div class="mhead"><h3>${r.t}</h3><span class="cat">${catName[r.c]}</span><span class="dchip ${DIFF[r.d][1]}">${DIFF[r.d][0]}</span></div>
     <div class="mbody"><div><span class="side-l col-esc">ESC 2022 ${CS(s.e)}</span>${recs(r.e)}</div><div><span class="side-l col-aha">ACC/AHA 2026 ${CS(s.a)}</span>${recs(r.a)}</div></div>${r.tip?`<div class="tip"><b>Thực hành:</b> ${r.tip}</div>`:''}</article>`}).join('')||'<p class="note">Không có chủ đề khớp bộ lọc.</p>';
  }
  $('m-cats').onclick=e=>{const b=e.target.closest('.chip');if(!b)return;cat=b.dataset.c;$('m-cats').querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));render()};
  $('m-diff').onchange=render;$('m-q').oninput=render;render();
}};

/* ---------- Sau PCI ---------- */
PAGES['/tp/dapt']={title:'Sau PCI',render(m){
  m.innerHTML=head('ESC Hình 6 · AHA Hình 5 & Bảng 12','Bệnh nhân đã PCI: khi nào mổ, ngưng thuốc gì',`Hai thanh thời gian vẽ vùng class của từng guideline; vạch đen là vị trí bệnh nhân. ${E('Rec. 13, Hình 6','3860–3862')} ${A('§7.5, Hình 5','e454–e456')}`)+
  `<form class="panel form" id="f-d">
   <label class="field"><span>Kiểu can thiệp</span><select id="d-proc"><option value="des">DES</option><option value="bms">BMS</option><option value="poba">Nong bóng đơn thuần</option></select></label>
   <label class="field"><span>Chỉ định PCI</span><select id="d-ind"><option value="ccd">Bệnh vành mạn (CCD/CCS)</option><option value="acs">Hội chứng vành cấp</option></select></label>
   <label class="field"><span>Thời gian từ lúc PCI</span><span class="row"><input type="number" id="d-n" min="0" value="7" style="flex:1"><select id="d-unit"><option value="w">tuần</option><option value="d">ngày</option><option value="m">tháng</option></select></span></label>
   <label class="field"><span>Mức khẩn cấp</span><select id="d-urg"><option value="timesens">Time-sensitive</option><option value="elective">Chương trình</option></select></label>
   <label class="field"><span>P2Y12 đang dùng</span><select id="d-p2"><option value="clopidogrel">Clopidogrel</option><option value="ticagrelor">Ticagrelor</option><option value="prasugrel">Prasugrel</option></select></label>
   <fieldset><legend>Khác</legend><div class="checks"><label><input type="checkbox" id="d-hr"> Đặc điểm nguy cơ huyết khối stent cao (ESC): NMCT tái phát, huyết khối stent cũ, LVEF &lt;40%, ĐTĐ kém kiểm soát, suy thận nặng, PCI phức tạp</label><label><input type="checkbox" id="d-bleed"> PT chảy máu rất cao (nội sọ, tủy sống, dịch kính võng mạc)</label></div></fieldset>
  </form>
  <div class="panel tl" id="d-tl"></div>
  <div class="out"><div class="outcol esc"><header>ESC 2022</header><div class="verdict" id="d-esc"></div></div><div class="outcol aha"><header>ACC/AHA 2026</header><div class="verdict" id="d-aha"></div></div></div>
  <div class="panel scroll"><table><thead><tr><th>Thuốc</th><th class="col-esc">ESC: ngưng trước mổ ${E('Rec. 13','3862')}</th><th class="col-aha">AHA Bảng 12 ${A('Bảng 12','e455')}</th></tr></thead><tbody>
   <tr><td class="k">Aspirin</td><td>Tiếp tục nếu đã PCI ${B('I','B')}. PT chảy máu rất cao: ngưng ≥7 ngày ${B('I','C')}. Không PCI: có thể ngưng ≥3 ngày ${B('IIb','B')}</td><td>Phục hồi 4 ngày. Đã PCI: tiếp tục 75–100 mg ${B('1','B-R')}</td></tr>
   <tr><td class="k">Clopidogrel</td><td>5 ngày</td><td>5–7 ngày</td></tr><tr><td class="k">Ticagrelor</td><td>3–5 ngày</td><td>3–5 ngày</td></tr><tr><td class="k">Prasugrel</td><td>7 ngày</td><td>7–10 ngày</td></tr>
   <tr><td class="k">Dùng lại</td><td>Càng sớm càng tốt, trong 48 h ${B('I','C')}</td><td>Theo nguy cơ chảy máu, quyết định nhóm ${B('1','B-NR')}</td></tr></tbody></table></div>
  <details><summary>Aspirin trong nội soi tiêu hóa và mở khí quản</summary><div class="stack small">
   <p>Hai guideline tim mạch không có khuyến cáo riêng. ESC xếp nội soi không sinh thiết là chảy máu tối thiểu, nội soi có sinh thiết đơn giản là chảy máu thấp, cắt polyp đại tràng là chảy máu cao ${E('Bảng 9','3858')}.</p>
   <p>Theo ESGE/BSG 2021 ${C('ESGE21','Khuyến cáo chống huyết khối','1611–1628')}: aspirin dự phòng thứ phát được tiếp tục cho mọi thủ thuật nội soi; chỉ cân nhắc ngưng ở ESD, EMR đại tràng &gt;2 cm, EMR đường tiêu hóa trên, cắt bóng Vater, tùy nguy cơ huyết khối. P2Y12 ngưng 5 ngày (giữ aspirin) trước thủ thuật nguy cơ cao nếu nguy cơ huyết khối thấp.</p>
   <p>Mở khí quản: chưa có khuyến cáo riêng; dữ liệu quan sát cho thấy aspirin đơn trị thường được tiếp tục. Đây là suy luận thực hành, không phải khuyến cáo.</p></div></details>`;
  const f=$('f-d');f.addEventListener('input',runD);f.addEventListener('change',runD);f.addEventListener('submit',e=>e.preventDefault());runD();
}};
function segBar(segs,mk){return `<div class="bar2">${segs.map(s=>`<div class="seg ${s[2]}" style="width:${(s[1]-s[0])/13*100}%" title="${s[3]}">${(s[1]-s[0])>=1.2?s[3]:''}</div>`).join('')}<div class="marker" style="left:calc(${Math.min(mk,13)/13*100}% - 1px)"></div></div>`}
function runD(){
  const proc=$('d-proc').value, ind=$('d-ind').value, n=+$('d-n').value||0, unit=$('d-unit').value, urg=$('d-urg').value, p2=$('d-p2').value, hrF=$('d-hr').checked, bleed=$('d-bleed').checked;
  const days=unit==='d'?n:unit==='w'?n*7:n*30.44, mo=days/30.44, hr=ind==='acs'||hrF;
  const escSeg=hr?[[0,3,'c3','III'],[3,6,'c2b','IIb'],[6,12,'c2a','IIa'],[12,13,'c1','I']]:[[0,1,'c3','III'],[1,6,'c2a','IIa'],[6,13,'c1','I']];
  let ahaSeg;
  if(proc==='poba') ahaSeg=[[0,14/30.44,'cv','<14 ngày'],[14/30.44,13,'c1','1 · sau 14 ngày']];
  else if(proc==='bms') ahaSeg=[[0,1,'c3h','3: Hại'],[1,13,'c1','1 · sau 30 ngày']];
  else if(ind==='acs') ahaSeg=[[0,1,'c3h','3: Hại'],[1,3,'cv','chưa nêu'],[3,12,'c2b','2b · time-sens.'],[12,13,'c1','1']];
  else ahaSeg=[[0,1,'c3h','3: Hại'],[1,3,'cv','chưa nêu'],[3,6,'c2b','2b · time-sens.'],[6,13,'c2a','2a']];
  $('d-tl').innerHTML=`<div class="tlrow"><span class="who esc">ESC</span>${segBar(escSeg,mo)}</div><div class="tlrow"><span class="who aha">AHA</span>${segBar(ahaSeg,mo)}</div><div class="ticks">${[0,1,3,6,12].map(t=>`<span style="left:${t/13*100}%">${t} th</span>`).join('')}</div><p class="note">Bệnh nhân: ${days<60?Math.round(days)+' ngày':mo.toFixed(1)+' tháng'} sau PCI. Nhánh ESC đang hiển thị: ${hr?'ACS / nguy cơ cao':'PCI chương trình'}.</p>`;
  let e,ec;
  if(!hr){ if(mo<1){ec='III';e='Chưa đủ 1 tháng DAPT: không ngưng P2Y12. Hoãn mổ; nếu bắt buộc mổ thì giữ DAPT, mổ nơi có cath-lab 24/7.'} else if(mo<6){ec='IIa';e=urg==='elective'?'PT chương trình: hoãn đến đủ 6 tháng sau PCI chương trình (I A).':'PT time-sensitive: chấp nhận được sau ≥1 tháng DAPT (I B). Tiếp tục aspirin, ngưng P2Y12 đúng hạn.'} else {ec='I';e='Đã ≥6 tháng: ngưng P2Y12, tiếp tục aspirin, phẫu thuật.'} }
  else{ if(mo<3){ec='III';e='ACS hoặc nguy cơ cao, <3 tháng: không ngưng P2Y12. Hoãn nếu được; DAPT ≥3 tháng trước PT time-sensitive (IIa).'} else if(mo<6){ec='IIb';e=urg==='elective'?'PT chương trình: hoãn đến 12 tháng sau ACS (I A).':'PT time-sensitive 3–6 tháng: có thể cân nhắc ngưng P2Y12.'} else if(mo<12){ec='IIa';e=urg==='elective'?'PT chương trình: hoãn đến 12 tháng sau ACS (I A).':'PT time-sensitive 6–12 tháng: nên cân nhắc ngưng P2Y12, giữ aspirin.'} else {ec='I';e='Đã ≥12 tháng: ngưng P2Y12, tiếp tục aspirin, phẫu thuật.'} }
  if(proc!=='des') e+=' <span class="note">ESC không có thang riêng cho BMS hay nong bóng; khuyến cáo DES thế hệ mới nếu cần PCI trước mổ (I A).</span>';
  let a,ac;
  if(proc==='poba'){ac='1';a=days<14?'Chưa đủ 14 ngày sau nong bóng: hoãn PT chương trình đến ≥14 ngày (1 C-LD).':'Đã ≥14 ngày sau nong bóng đơn thuần: có thể tiến hành.'}
  else if(days<=30){ac='3H';a='≤30 ngày sau stent: PT chương trình phải ngưng ≥1 kháng tiểu cầu là có hại. Bắt buộc mổ: tiếp tục DAPT trừ khi chảy máu vượt trội (1 B-NR); bắc cầu TM có thể cân nhắc (2b).'}
  else if(proc==='bms'){ac='1';a='Đã >30 ngày sau BMS: có thể tiến hành (Hình 5).'}
  else if(ind==='acs'){ if(mo<3){ac='NA';a='DES vì ACS, 1–3 tháng: chưa đạt mốc ≥3 tháng (2b). Hoãn nếu được; phải mổ thì tiếp tục DAPT (1 B-NR).'} else if(mo<12){ac=urg==='elective'?'1':'2b';a=urg==='elective'?'PT chương trình: lý tưởng hoãn đến ≥12 tháng (1 B-NR).':'PT time-sensitive ≥3 tháng sau DES: có thể cân nhắc nếu nguy cơ trì hoãn > nguy cơ MACE (2b B-NR).'} else {ac='1';a='Đã ≥12 tháng sau DES vì ACS: tiến hành, giữ aspirin.'} }
  else{ if(mo<3){ac='NA';a='DES vì CCD, 1–3 tháng: AHA chỉ cân nhắc PT time-sensitive từ ≥3 tháng (2b). Hoãn nếu được; phải mổ thì tiếp tục DAPT (1 B-NR).'} else if(mo<6){ac=urg==='elective'?'2a':'2b';a=urg==='elective'?'PT chương trình: hợp lý hoãn đến ≥6 tháng (2a B-NR).':'PT time-sensitive ≥3 tháng: có thể cân nhắc (2b B-NR).'} else {ac='2a';a='Đã ≥6 tháng sau DES vì CCD: hợp lý tiến hành (2a B-NR), giữ aspirin.'} }
  const sE={clopidogrel:'5 ngày',ticagrelor:'3–5 ngày',prasugrel:'7 ngày'}[p2], sA={clopidogrel:'5–7 ngày',ticagrelor:'3–5 ngày',prasugrel:'7–10 ngày'}[p2];
  $('d-esc').innerHTML=`<span class="big">${B(ec)}</span><p>${e}</p><p class="note">${bleed?'PT chảy máu rất cao: ngưng aspirin ≥7 ngày (I C).':'Tiếp tục aspirin (I B).'} Ngưng ${p2}: ${sE} trước mổ (I B); dùng lại trong 48 h (I C).</p><div class="srcline">${E('Rec. 13','3862')} ${E('Hình 6','3860')}</div>`;
  $('d-aha').innerHTML=`<span class="big">${B(ac)}</span><p>${a}</p><p class="note">${bleed?'Aspirin: cá thể hóa theo nguy cơ chảy máu của PT; mặc định tiếp tục (1 B-R).':'Tiếp tục aspirin 75–100 mg (1 B-R).'} Phục hồi tiểu cầu sau ngưng ${p2}: ${sA} (Bảng 12).</p><div class="srcline">${A('§7.5','e454–e455')} ${A('Hình 5','e456')}</div>`;
}

/* ---------- Kháng đông ---------- */
PAGES['/tp/khang-dong']={title:'Kháng đông',render(m){
  m.innerHTML=head('ESC Hình 9–10 · AHA Bảng 13–14','Ngưng và dùng lại kháng đông đường uống',`ESC tính theo <b>giờ</b> từ liều cuối, theo eGFR ${E('Hình 10','3866')}. AHA tính theo <b>ngày</b>, dựa trên PAUSE ${A('Bảng 13','e459')}. Cả hai không bắc cầu heparin cho DOAC.`)+
  `<form class="panel form" id="f-o">
   <label class="field"><span>Thuốc</span><select id="o-drug"><option value="apixaban">Apixaban</option><option value="rivaroxaban">Rivaroxaban</option><option value="edoxaban">Edoxaban</option><option value="dabigatran">Dabigatran</option><option value="warfarin">Warfarin (VKA)</option></select></label>
   <label class="field"><span>CrCl / eGFR (mL/phút)</span><input type="number" id="o-crcl" min="5" max="200" value="62"></label>
   <label class="field"><span>Nguy cơ chảy máu của thủ thuật</span><select id="o-bleed"><option value="min">Tối thiểu (mắt, răng nhỏ, da)</option><option value="low">Thấp–trung bình</option><option value="high" selected>Cao (≥2% chảy máu lớn 30 ngày)</option><option value="neur">Tê tủy sống / ngoài màng cứng</option></select></label>
   <label class="field"><span>Nguy cơ huyết khối (VKA, AHA Bảng 14)</span><select id="o-thr"><option value="low">Thấp</option><option value="mod" selected>Trung bình</option><option value="high">Cao</option></select></label></form>
  <div class="out"><div class="outcol esc"><header>ESC 2022</header><div class="verdict" id="o-esc"></div></div><div class="outcol aha"><header>ACC/AHA 2026 · Bảng 13</header><div class="verdict" id="o-aha"></div></div></div>
  <details open><summary>AHA Bảng 14: phân tầng nguy cơ huyết khối ${A('Bảng 14','e460')}</summary><div class="scroll"><table><thead><tr><th>Mức</th><th>HKTM</th><th>Rung nhĩ</th><th>Van cơ học</th><th>Khác</th></tr></thead><tbody>
   <tr><td class="k">Thấp</td><td>VTE &gt;12 tháng</td><td>CHA₂DS₂-VASc 1–4, chưa đột quỵ</td><td>AVR cơ học 2 cánh, không YTNC đột quỵ</td><td></td></tr>
   <tr><td class="k">Trung bình</td><td>VTE 3–12 tháng; VTE tái phát</td><td>CHA₂DS₂-VASc 5–6</td><td>AVR cơ học 2 cánh có YTNC đột quỵ</td><td>Rối loạn đông máu không nặng; ung thư hoạt động</td></tr>
   <tr><td class="k">Cao</td><td>VTE &lt;1–3 tháng</td><td>CHA₂DS₂-VASc ≥7 (hoặc 5–6 có đột quỵ/TIA gần đây); AF + bệnh van hậu thấp</td><td>Van hai lá cơ học; van bi lồng/đĩa nghiêng; van cơ học + đột quỵ/TIA &lt;3 tháng</td><td>Đột quỵ do huyết tắc &lt;3 tháng; ung thư nguy cơ VTE cao; huyết khối TT &lt;3 tháng; thrombophilia nặng; kháng phospholipid</td></tr></tbody></table></div></details>
  <div class="grid2"><div class="panel stack"><h3 class="col-esc">ESC: bắc cầu &amp; đảo ngược ${E('Rec. 14','3868')}</h3><ul class="plain">
   <li>Không bắc cầu ở nguy cơ huyết khối thấp/trung bình ${B('III','B')}</li><li>Van cơ học (AVR + YTNC, AVR thế hệ cũ, van hai lá/ba lá cơ học): cân nhắc bắc cầu ${B('IIa','C')}</li><li>LMWH thay UFH khi bắc cầu ${B('I','B')}</li><li>Không dùng NOAC liều giảm ${B('III','C')}</li><li>PT khẩn: ngưng NOAC ngay ${B('I','C')}; idarucizumab cho dabigatran ${B('IIa','C')}; PCC/aPCC khi không có antidote ${B('IIa','C')}</li><li>Chảy máu khi dùng lại liều đầy đủ &gt; huyết khối: hoãn 48–72 h, dùng liều dự phòng ${B('IIb','C')}</li></ul></div>
   <div class="panel stack"><h3 class="col-aha">AHA: bắc cầu &amp; đảo ngược ${A('§7.6','e457')}</h3><ul class="plain">
   <li>Ngưng theo thời gian, nhóm đa chuyên khoa ${B('1','B-NR')}</li><li>VKA + nguy cơ huyết khối cao: bắc cầu heparin ${B('2a','C-LD')}</li><li>Bắc cầu thường quy ${B('3H','C-LD')}</li><li>Dùng lại OAC sau khi cầm máu ${B('2a','C-LD')}</li><li>Đảo ngược (Bảng 15): 4F-PCC hoặc andexanet alfa cho ức chế Xa; idarucizumab cho dabigatran ${A('Bảng 15','e460')}</li><li>Tê trục thần kinh: ngưng ≥5 thời gian bán thải (≥3 ngày ức chế Xa; ≥4 ngày dabigatran, 5–6 ngày nếu CrCl &lt;50)</li></ul></div></div>`;
  const f=$('f-o');f.addEventListener('input',runO);f.addEventListener('change',runO);f.addEventListener('submit',e=>e.preventDefault());runO();
}};
const DAYS=[-6,-5,-4,-3,-2,-1,0,1,2,3,4];
function grid(map){const lab={take:'Dùng',hold:'Nghỉ',bridge:'Cầu',post:'+ cầu'};return `<div class="scroll"><div class="days">${DAYS.map(d=>`<div class="h">${d===0?'Mổ':(d>0?'+'+d:d)}</div>`).join('')}${DAYS.map(d=>{const k=map[d]||'take';return `<div class="dk-${k}">${lab[k]}</div>`}).join('')}</div></div><div class="legend"><span><i class="dk-take"></i>Dùng thuốc</span><span><i class="dk-hold"></i>Nghỉ thuốc</span><span><i class="dk-bridge"></i>Bắc cầu heparin (INR dưới ngưỡng)</span><span><i class="dk-post"></i>Warfarin + LMWH đến khi INR đạt</span></div>`}
function hold(a,b){const o={};for(let d=a;d<=b;d++)o[d]='hold';return o}
function runO(){
  const drug=$('o-drug').value, cr=+$('o-crcl').value||0, bl=$('o-bleed').value, thr=$('o-thr').value;
  const xa=['apixaban','rivaroxaban','edoxaban'].includes(drug), vka=drug==='warfarin';
  let Es='',As='',map={};
  if(vka){
    Es=bl==='min'?`${B('I','B')} Thủ thuật chảy máu tối thiểu: không ngưng OAC.`:`Ngưng VKA để INR về mức an toàn, kiểm tra INR trước mổ. ${thr==='high'?`${B('IIa','C')} Bắc cầu chỉ cân nhắc ở van cơ học nguy cơ cao; ${B('I','B')} ưu tiên LMWH.`:`${B('III','B')} Nguy cơ huyết khối thấp/trung bình: không bắc cầu.`}`;
    if(bl==='min')As='Chảy máu tối thiểu: tiếp tục warfarin.';
    else{map=hold(-5,0);if(thr==='high'){map[-3]=map[-2]=map[-1]='bridge';if(bl==='high'){map[3]=map[4]='post'}else{map[2]=map[3]=map[4]='post'}As=`Ngưng warfarin từ ngày −5, dùng lại ngày +1. Nguy cơ huyết khối cao: ${B('2a','C-LD')} bắc cầu heparin trước mổ khi INR dưới ngưỡng; LMWH sau mổ là quyết định nhóm.`}else As=`Ngưng warfarin từ ngày −5, dùng lại ngày +1. ${B('3H','C-LD')} Không bắc cầu thường quy.`}
  }else{
    if(cr<15)Es='eGFR <15: không có chỉ định chính thức dùng NOAC.';
    else if(!xa&&cr<30)Es='Dabigatran, eGFR 15–29: không có chỉ định (Hình 10).';
    else if(bl==='min')Es=`${B('I','C')} Làm ở nồng độ đáy (12 h với thuốc 2 lần/ngày, 24 h với thuốc 1 lần/ngày); dùng lại cùng ngày hoặc hôm sau.`;
    else{let h;if(xa)h=bl==='low'?(cr>=30?'≥24 h':'≥36 h'):'≥48 h';else{const lo=cr>=80?'≥24 h':cr>=50?'≥36 h':'≥48 h',hi=cr>=80?'≥48 h':cr>=50?'≥72 h':'≥96 h';h=bl==='low'?lo:hi}
      Es=bl==='neur'?`${B('IIa','C')} Tê tủy sống/NMC: ngưng tới 5 thời gian bán thải (tối thiểu ${h}), dùng lại sau 24 h.`:`${B('I','B')} Liều cuối <b>${h}</b> trước mổ (eGFR ${cr}). Không bắc cầu UFH/LMWH.`;
      Es+=` <span class="note">Dùng lại: khoảng 24 h sau PT chảy máu thấp, 48–72 h sau PT chảy máu cao.${cr<50?' Suy thận, tuổi cao, tương tác thuốc: cân nhắc ngưng sớm thêm 12–24 h.':''}</span>`}
    if(bl==='min')As='Chảy máu tối thiểu: không ngưng.';
    else if(xa){if(bl==='neur'){map=hold(-3,2);As='Tê trục thần kinh: ngưng ≥3 ngày với ức chế Xa.'}else if(cr<30){map=bl==='high'?hold(-3,2):hold(-2,0);As=`CrCl <30, chảy máu ${bl==='high'?'cao: nghỉ 3 ngày trước, dùng lại ngày +3':'thấp–trung bình: nghỉ 2 ngày trước, dùng lại ngày +1'}.`}else{map=bl==='high'?hold(-2,2):hold(-1,0);As=`Chảy máu ${bl==='high'?'cao: nghỉ 2 ngày trước (liều cuối ngày −3), dùng lại ngày +3':'thấp–trung bình: nghỉ 1 ngày trước (liều cuối ngày −2), dùng lại ngày +1'}.`}}
    else{if(bl==='neur'){map=cr<50?hold(-6,2):hold(-4,2);As='Tê trục thần kinh: dabigatran ngưng ≥4 ngày (5–6 ngày nếu CrCl <50).'}else if(cr<50){map=bl==='high'?hold(-4,2):hold(-2,0);As=`Dabigatran CrCl <50, chảy máu ${bl==='high'?'cao: nghỉ 4 ngày, dùng lại ngày +3':'thấp–trung bình: nghỉ 2 ngày, dùng lại ngày +1'}.`}else{map=bl==='high'?hold(-2,2):hold(-1,0);As=`Dabigatran CrCl ≥50, chảy máu ${bl==='high'?'cao: nghỉ 2 ngày, dùng lại ngày +3':'thấp–trung bình: nghỉ 1 ngày, dùng lại ngày +1'}.`}}
    As=`${B('1','B-NR')} ${As} Không bắc cầu.`;
  }
  $('o-esc').innerHTML=`<p>${Es}</p><div class="srcline">${E('Rec. 14','3868')} ${E('Hình 9–10','3865–3866')}</div>`;
  $('o-aha').innerHTML=`<p>${As}</p>${grid(map)}<p class="note">Chảy máu tối thiểu = 0% chảy máu lớn 30 ngày; thấp–trung bình &lt;2%; cao ≥2%.</p><div class="srcline">${A('Bảng 13','e459')} ${A('§7.6','e457')}</div>`;
}

/* ---------- Thuốc quanh mổ ---------- */
PAGES['/tp/thuoc']={title:'Thuốc quanh mổ',render(m){
  m.innerHTML=head('Tiếp tục, ngưng hay khởi trị','Thuốc quanh mổ','Cột cuối là gợi ý tổng hợp khi hai guideline lệch nhau, theo hướng an toàn hơn; không phải văn bản guideline.')+
  `<div class="panel scroll"><table><thead><tr><th>Thuốc</th><th class="col-esc">ESC 2022</th><th class="col-aha">ACC/AHA 2026</th><th>Gợi ý tổng hợp</th><th>Nguồn</th></tr></thead><tbody>${DRUGS.map(r=>`<tr><td class="k">${r[0]}</td><td>${B(r[1][1],r[1][2])} ${r[1][0]}</td><td>${B(r[2][1],r[2][2])} ${r[2][0]}</td><td>${r[3]}</td><td>${CS(DRUGSRC[r[0]])}</td></tr>`).join('')}</tbody></table></div>
  <p class="note">GLP-1 RA: AHA dẫn đồng thuận ASA 2023. Hướng dẫn đa hội 2024 (ASA, AGA, ASMBS, ISPOR, SAGES) sau đó đã nới lỏng, cho tiếp tục ở đa số bệnh nhân; thống nhất với khoa gây mê.</p>`;
}};

/* ---------- Troponin sau mổ (kiểu troponin.org) ---------- */
PAGES['/tp/troponin']={title:'Troponin sau mổ',render(m){
  m.innerHTML=head('ESC Hình 18–19 · AHA Hình 6','Phân loại troponin tăng sau mổ',`Trả lời từng bước Có / Không / Chưa rõ. Kết quả cập nhật ngay và ghi rõ nguồn. ${E('Hình 18–19','3895–3896')} ${A('Hình 6','e469')}`)+
  `<div class="grid2">
   <div class="panel stack" id="tq">
    <h3>Bước 1 · Troponin</h3>
    ${q('q1','Troponin vượt bách phân vị 99 (URL) của xét nghiệm?')}
    ${q('q2','Có trị số trước mổ và mức tăng tuyệt đối ≥ URL (ngày 1 hoặc 2)?')}
    <h3>Bước 2 · Biểu hiện thiếu máu cục bộ</h3>
    ${q('q3','ST chênh lên trên ECG?')}
    ${q('q4','Có ≥1 tiêu chuẩn UDMI: triệu chứng thiếu máu, ECG thiếu máu mới, sóng Q bệnh lý mới, hình ảnh mất cơ tim sống/rối loạn vận động vùng mới, huyết khối mạch vành?')}
    <h3>Bước 3 · Nguyên nhân</h3>
    ${q('q5','Nguyên nhân không thiếu máu rõ: nhiễm khuẩn nặng, thuyên tắc phổi, đột quỵ, suy tim cấp?')}
    ${q('q6','Yếu tố khởi phát type 2: thiếu máu nặng (Hb <80 g/L) hoặc chảy máu, tụt HA rõ, nhịp nhanh, thiếu oxy?')}
    ${q('q7','Nghi nứt mảng xơ vữa cấp (type 1)?')}
    <button type="button" class="ic" id="tq-reset" style="align-self:flex-start">Xóa câu trả lời</button>
   </div>
   <div class="stack"><div class="result" id="tq-out"></div>
    <div class="panel stack small"><h3>Định nghĩa</h3>
     <p><span class="who esc">ESC</span> PMI: hs-cTn tăng tuyệt đối ≥ URL ở ngày 1 hoặc 2 so với trước mổ. Không có trị số nền: ngày 1 rất cao (ví dụ &gt;5 × URL) hoặc thay đổi ≥ URL giữa ngày 1 và 2. Thuật toán 0/1/2 h chưa được thẩm định quanh mổ. ${E('Hình 4','3850')}</p>
     <p><span class="who aha">AHA</span> MINS: &gt;1 trị số cTn &gt;99th URL, nghĩ do thiếu máu, sau khi loại trừ nguyên nhân không thiếu máu; tử vong 30 ngày khoảng 10%. ${A('§9.1','e467')}</p>
     <p>Khuyến cáo theo dõi: ESC ${B('I','B')} hs-cTn trước mổ, 24 h, 48 h ở CVD/YTNC/≥65 tuổi, PT trung bình–cao ${E('Rec. 7','3851')}. AHA ${B('2b','B-NR')} cTn 24 h, 48 h ở nhóm nguy cơ; ${B('3N','B-NR')} PT nguy cơ thấp ${A('§9.1','e467')}.</p></div></div></div>`;
  const ans={};
  m.querySelectorAll('.yn').forEach(g=>g.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;ans[g.dataset.q]=b.dataset.v;g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));tq(ans)}));
  $('tq-reset').onclick=()=>{Object.keys(ans).forEach(k=>delete ans[k]);m.querySelectorAll('.yn button').forEach(x=>x.setAttribute('aria-pressed','false'));tq(ans)};
  tq(ans);
}};
function q(id,t){return `<div class="q"><span>${t}</span><span class="yn" data-q="${id}"><button type="button" data-v="y" aria-pressed="false">Có</button><button type="button" data-v="n" aria-pressed="false">Không</button><button type="button" data-v="u" aria-pressed="false">?</button></span></div>`}
function tq(a){
  let t,d,recs=[];
  if(!a.q1){t='Chưa đủ dữ liệu';d='Bắt đầu ở bước 1.'}
  else if(a.q1==='n'){t='Không có tổn thương cơ tim theo troponin';d='Troponin không vượt URL. Nếu lâm sàng nghi ngờ, lặp lại xét nghiệm.'}
  else if(a.q3==='y'){t='STEMI sau mổ';d='Xử trí như STEMI, cân nhắc chụp mạch vành, cân bằng nguy cơ chảy máu và huyết khối với mức độ nặng lâm sàng.';recs=[`${B('1','B-NR')} GDMT gồm cân nhắc chụp mạch ${A('§9.2','e469')}`,`${B('I','C')} Điều trị theo guideline ngoài PT sau khi bàn với PTV ${E('Rec. 34','3899')}`]}
  else if(a.q5==='y'){t='Tổn thương cơ tim không do thiếu máu';d='Nhiễm khuẩn, thuyên tắc phổi, đột quỵ hoặc suy tim cấp. Điều trị nguyên nhân. PMI theo dõi giúp phát hiện sớm các bệnh này.';recs=[`ESC: nguyên nhân chủ yếu ngoài tim → điều trị nguyên nhân ${E('Hình 18–19','3895–3896')}`,`AHA: nonischemic myocardial injury → điều trị nguyên nhân ${A('Hình 6','e469')}`]}
  else if(a.q4==='y'){
    if(a.q7==='y'){t='NMCT type 1 (NSTEMI)';d='Điều trị như NMCT tự phát, tính đến chảy máu và huyết động.';recs=[`${B('1','C-EO')} Điều trị nội như NMCT tự phát ${A('§9.2','e469')}`,`${B('2a','C-LD')} Cân nhắc chụp mạch ${A('§9.2','e469')}`,`ESC Bước 1: type 1 → chụp mạch, aspirin, statin, theo dõi ${B('I')} ${E('Hình 19','3896')}`]}
    else{t=a.q6==='y'?'NMCT type 2':'NSTEMI, cần phân định type 1 / type 2';d='Điều trị nguyên nhân mất cân bằng cung–cầu (thiếu máu, tụt HA, nhịp nhanh, thiếu oxy); tối ưu GDMT trong giới hạn chảy máu và huyết động.';recs=[`AHA: Type 2 NSTEMI → điều trị nguyên nhân ${A('Hình 6','e469')}`,`ESC: thiếu máu nặng → truyền máu rồi đánh giá lại chỉ định chụp mạch ${E('Hình 19','3896')}`]}
  }
  else if(a.q4==='n'||a.q4==='u'){
    t=a.q6==='y'?'PMI do type 2 / MINS':'MINS (AHA) · PMI (ESC)';
    d='Tổn thương cơ tim không triệu chứng, nghĩ do thiếu máu. Tìm nguyên nhân hệ thống (ECG, siêu âm tim, Hb, huyết áp). Đa số type 2 hoặc type 1 im lặng nên được hẹn stress imaging hoặc CCTA/chụp mạch ngoại trú.';
    recs=[`${B('I','B')} Tìm nguyên nhân PMI hệ thống ${E('Rec. 34','3899')}`,`${B('IIb','B')} Dabigatran 110 mg × 2 từ ~1 tuần nếu chảy máu thấp ${E('Rec. 34','3899')}`,`ESC Bước 5: aspirin, statin, stress imaging/CCTA/ICA ${E('Hình 19','3896')}`,`${B('2a','B-NR')} Hội chẩn và hẹn tái khám ngoại trú ${A('§9.1, Hình 6','e467–e469')}`,`${B('2b','C-LD')} Cân nhắc kháng huyết khối ${A('§9.1','e467')}`]}
  else{t='Cần trả lời bước 2';d='Có ST chênh lên? Có tiêu chuẩn UDMI?'}
  if(a.q1==='y'&&a.q2==='n') d+=' Lưu ý: mức tăng < URL so với nền chưa đủ tiêu chuẩn PMI theo ESC (có thể là troponin tăng mạn).';
  $('tq-out').innerHTML=`<span class="eyebrow">Kết quả</span><h2>${t}</h2><p>${d}</p>${recs.length?`<ul class="plain">${recs.map(r=>`<li>${r}</li>`).join('')}</ul>`:''}`;
}

/* ---------- Ca lâm sàng ---------- */
PAGES['/tp/ca']={title:'Ca lâm sàng',render(m){
  m.innerHTML=head('Tự kiểm tra','Ca lâm sàng tiền phẫu','Mỗi ca chọn một đáp án; phần giải thích nêu cách ESC và AHA trả lời. Các ca đều là ca giả định.')+`<p class="note" id="q-score"></p><div id="q-list" class="stack"></div>`;
  const ans={};
  $('q-list').innerHTML=CASES.map((c,i)=>`<article class="case" data-i="${i}"><span class="eyebrow">Ca ${i+1}</span><p>${c.s}</p><div class="opts">${c.o.map((o,j)=>`<button type="button" data-j="${j}">${String.fromCharCode(65+j)}. ${o}</button>`).join('')}</div><div class="expl" hidden>${c.x}<div class="srcline">${E('','')} ${A('','')}</div></div></article>`).join('');
  const sc=()=>{const n=Object.keys(ans).length,r=Object.values(ans).filter(Boolean).length;$('q-score').textContent=n?`Đúng ${r}/${n} ca đã trả lời · tổng ${CASES.length} ca`:`${CASES.length} ca`};
  $('q-list').onclick=e=>{const b=e.target.closest('button[data-j]');if(!b)return;const art=b.closest('.case'),i=+art.dataset.i,j=+b.dataset.j,c=CASES[i];
    art.querySelectorAll('button[data-j]').forEach(x=>{x.classList.remove('right','wrong');if(+x.dataset.j===c.k)x.classList.add('right')});if(j!==c.k)b.classList.add('wrong');ans[i]=j===c.k;art.querySelector('.expl').hidden=false;sc()};
  sc();
}};
})();

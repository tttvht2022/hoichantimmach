/* ===== Mảng Tim mạch – Thai kỳ (ESC 2025) ===== */
(function(){
const P=(loc,p)=>C('ESC25',loc,p);
const RT=n=>P('Rec. '+n,PT[n][1]);
/** Liệt kê khuyến cáo theo bảng (và lọc theo nhóm) */
function recsOf(t,grp,filter){t=Number(t);return PR.filter(r=>r[0]===t&&(!grp||r[1]===grp)&&(!filter||filter(r))).map(r=>recLine([r[2],r[3],r[4]])).join('')}
window.recsOf=recsOf;
function recBox(title,t,grp,filter){return `<div class="panel stack"><h3>${title} ${RT(t)}</h3>${recsOf(t,grp,filter)}</div>`}

/* ---------- Tổng quan ---------- */
PAGES['/tk']={title:'Tim mạch – Thai kỳ',render(m){
  const n=PR.length, byC=c=>PR.filter(r=>r[3]===c).length;
  m.innerHTML=head('ESC 2025 · Tim mạch và thai kỳ','Tim mạch – Thai kỳ',`Bản tiếng Việt có tương tác của 2025 ESC Guidelines for the management of cardiovascular disease and pregnancy ${P('','4462–4568')}. App đã dịch ${n} khuyến cáo từ 23 bảng khuyến cáo (Class I: ${byC('I')}, IIa: ${byC('IIa')}, IIb: ${byC('IIb')}, III: ${byC('III')}).`)+
  `<div class="row"><a class="ic" href="#/tk/cap-cuu">Thuật toán cấp cứu</a><a class="ic" href="#/tk/khuyen-cao">Tra cứu khuyến cáo</a><a class="ic" href="https://doi.org/10.1093/eurheartj/ehaf193" target="_blank" rel="noopener">Văn bản gốc ESC</a></div>
  <div class="tiles">
   ${tile('#/tk/mwho','mWHO 2.0 & Pregnancy Heart Team','Tra nhóm nguy cơ, tần suất biến cố, nơi theo dõi và nơi sinh; tính CARPREG II','Bảng 6')}
   ${tile('#/tk/cap-cuu','Thuật toán cấp cứu','Ngừng tim, suy tim cấp/sốc tim, thuyên tắc phổi, DVT, THA nặng, nhịp nhanh, đau ngực, sinh khẩn khi đang kháng đông','Hình 5, 9, 10, 12A, 14–16, 19, 22')}
   ${tile('#/tk/thuoc','Thuốc trong thai kỳ & cho bú','Chọn thuốc theo nhóm bệnh; bật/tắt thai kỳ hoặc cho con bú','Hình 6')}
   ${tile('#/tk/van-co-hoc','Van cơ học & kháng đông','Lựa chọn VKA/LMWH theo quý, tính liều LMWH theo cân nặng','Hình 21, Bảng 10–11')}
   ${tile('#/tk/dong-mach-chu','Bệnh động mạch chủ','Nhập bệnh và đường kính: ngưỡng phẫu thuật trước mang thai, nhóm mWHO, cách sinh','Hình 8, Rec. 8')}
   ${tile('#/tk/tha','THA & tiền sản giật','Phân loại, xử trí theo huyết áp, aspirin dự phòng, thời điểm sinh','Bảng 14–15, Hình 12, Rec. 13')}
   ${tile('#/tk/sinh','Kế hoạch sinh','Thời điểm, cách sinh, vô cảm, ngưng kháng đông, thuốc co tử cung','Rec. 3, 5, 8, Hình 5')}
   ${tile('#/tk/hau-san','Hậu sản & theo dõi dài hạn','THA sau sinh, đái tháo đường thai kỳ, PPCM, lịch theo dõi kết cục thai kỳ bất lợi','Hình 24–25, Rec. 7, 23')}
   ${tile('#/tk/khuyen-cao','Tất cả khuyến cáo',`${n} khuyến cáo, lọc theo bảng, class và mức bằng chứng`,'Rec. 1–23')}
  </div>
  <div class="callout preg"><p><b>Pregnancy Heart Team.</b> Phụ nữ mWHO 2.0 nhóm II–III trở lên cần được Pregnancy Heart Team đánh giá và quản lý từ trước mang thai đến sau sinh ${B('I','C')} ${RT(1)}. Nhóm lõi gồm bác sĩ tim mạch, sản khoa, gây mê; mở rộng theo ca (di truyền, sơ sinh, huyết học, phẫu thuật tim…) ${P('Hình 3','4480')}.</p></div>
  <div class="grid2"><div class="panel stack"><h3>Thay đổi sinh lý cần nhớ</h3><ul class="plain">
   <li>ECG thai kỳ bình thường có thể: nhịp nhanh hơn, trục QRS lệch trái nhẹ (15–20°), PR ngắn hơn khoảng 20 ms, Q rõ ở II, III, aVF, T dẹt/âm ở III, aVF, V1–V3. ${P('§4.3.1, Hình 1','4474, 4484')}</li>
   <li>Thay đổi hình học và chức năng tim lớn nhất đầu quý 3, hồi phục sớm sau sinh. ${P('§4.3.2','4484')}</li>
   <li>Troponin chưa có giá trị chuẩn trong thai kỳ; không dùng troponin đơn độc thường quy. D-dimer tăng sinh lý, nhất là quý 3. ${P('§4.3.4','4484')}</li>
   <li>Không dùng nước muối sinh lý lắc (agitated saline) khi siêu âm tim thai phụ. ${P('§4.3.2','4484')}</li></ul></div>
   <div class="panel stack"><h3>Bức xạ</h3><ul class="plain">
   <li>Liều cho thai &gt;150–200 mGy có thể gây chậm tăng trưởng, dị tật (nhất là thần kinh trung ương) và ung thư; giữ liều thấp nhất có thể, tốt nhất &lt;50 mGy ${B('I','C')}. ${RT(2)}</li>
   <li>Nếu được, trì hoãn thủ thuật đến sau giai đoạn tạo cơ quan (&gt;12 tuần). X-quang ngực cho thai &lt;0,01 mGy. ${P('§4.3.5','4484')}</li>
   <li>Thuốc cản quang iod qua nhau thai nhưng chưa ghi nhận gây quái thai. ${P('§4.3.5','4484')}</li></ul></div></div>`;
}};
function tile(h,t,d,g){return `<a class="tile" href="${h}"><b>${t}</b><span>${d}</span><span class="tg col-preg">ESC 2025 · ${g}</span></a>`}

/* ---------- mWHO 2.0 ---------- */
PAGES['/tk/mwho']={title:'mWHO 2.0',render(m){
  const groups=[...new Set(MWHO_DX.map(d=>d[0]))];
  m.innerHTML=head('ESC 2025 · Bảng 6','Phân loại mWHO 2.0 và Pregnancy Heart Team',`Chọn mọi tình trạng của bệnh nhân. Nhóm mWHO 2.0 lấy theo tình trạng nặng nhất. CARPREG II giúp cá thể hóa nguy cơ trong từng nhóm. ${P('Bảng 6','4477–4479')}`)+`<div>${FIG('ESC25','Bảng 6','4477')}</div>`+
  `<div class="grid2"><div class="stack">
    <div class="panel stack"><h3>Tình trạng tim mạch</h3><input type="search" id="mw-q" placeholder="Lọc: Fontan, Marfan, hẹp hai lá…" aria-label="Lọc tình trạng">
     <div id="mw-list" class="stack" style="max-height:520px;overflow:auto"></div></div>
    <div class="panel stack"><h3>Điểm CARPREG II ${P('Bảng 6','4478')} ${C('CARPREG','','2419–2430')}</h3><div class="checks" id="cp-list">${CARPREG.map((c,i)=>`<label><input type="checkbox" data-i="${i}"> ${c[0]} <span class="pill">${c[1]} điểm</span></label>`).join('')}</div></div>
   </div>
   <div class="stack"><div class="mwho" id="mw-scale"></div><div class="result" id="mw-out"></div>${recBox('Khuyến cáo liên quan','1','Đánh giá nguy cơ mẹ')}</div></div>`;
  const sel=new Set(store.get('mw-sel',[])), cps=new Set(store.get('cp-sel',[]));
  function list(){const qq=$('mw-q').value.trim().toLowerCase();$('mw-list').innerHTML=groups.map(gp=>{const it=MWHO_DX.map((d,i)=>[d,i]).filter(([d])=>d[0]===gp&&(!qq||d[1].toLowerCase().includes(qq)||gp.toLowerCase().includes(qq)));if(!it.length)return'';return `<fieldset><legend>${gp}</legend><div class="checks">${it.map(([d,i])=>`<label><input type="checkbox" data-i="${i}"${sel.has(i)?' checked':''}> ${d[1]} <span class="cb ${['c1','c1','c2a','c2b','c3'][d[2]]}">${MWHO.classes[d[2]]}</span></label>`).join('')}</div></fieldset>`}).join('')}
  function out(){
    const cls=sel.size?Math.max(...[...sel].map(i=>MWHO_DX[i][2])):-1;
    const score=[...cps].reduce((s,i)=>s+CARPREG[i][1],0);
    $('mw-scale').innerHTML=MWHO.classes.map((c,i)=>`<div class="mw ${MWHO.css[i]}${i===cls?' on':''}"><b>${c}</b><span>${MWHO.vanHagen[i]} biến cố</span></div>`).join('');
    store.set('mw-sel',[...sel]);store.set('cp-sel',[...cps]);
    if(cls<0){$('mw-out').innerHTML=`<span class="eyebrow">Kết quả</span><h2>Chọn ít nhất một tình trạng</h2><p class="note">Danh sách lấy từ Bảng 6. Bệnh không có trong bảng cần đánh giá cá thể.</p>`;return}
    const cpBin=score===0?0:score===1?1:2, est=MWHO.carpregBars[cpBin][cls];
    $('mw-out').innerHTML=`<span class="eyebrow">Kết quả</span><h2>mWHO 2.0 nhóm ${MWHO.classes[cls]}</h2>
     <p>${MWHO.risk[cls]}.</p>
     <table><tbody>
      <tr><td class="k">Tần suất biến cố tim mạch mẹ</td><td>van Hagen 2016: ${MWHO.vanHagen[cls]} · Silversides 2018: ${MWHO.silversides[cls]}</td></tr>
      <tr><td class="k">CARPREG II</td><td>${score} điểm → ước tính ${est} trong nhóm ${MWHO.classes[cls]} <span class="note">(đọc gần đúng từ biểu đồ dưới Bảng 6)</span></td></tr>
      <tr><td class="k">Pregnancy Heart Team</td><td>${MWHO.pht[cls]}</td></tr>
      <tr><td class="k">Tư vấn</td><td>${MWHO.counsel[cls]}</td></tr>
      <tr><td class="k">Chăm sóc sản & tim trong thai kỳ</td><td>${MWHO.care[cls]}</td></tr>
      <tr><td class="k">Nơi sinh</td><td>${MWHO.delivery[cls]}</td></tr></tbody></table>
     <p class="note">Biến cố tim mạch gồm: ngừng tim, tử vong do tim, loạn nhịp cần điều trị, suy tim trái/phải, huyết khối tắc mạch, bóc tách ĐM chủ, ACS, nhập viện vì lý do tim. ${P('Bảng 6','4479')}</p>
     ${cls===4?`<div class="callout"><p>${B('I','C')} Nhóm IV: Pregnancy Heart Team thảo luận nguy cơ rất cao và quyết định chung về chấm dứt thai kỳ, có hỗ trợ tâm lý. ${RT(1)}</p></div>`:''}`;
  }
  $('mw-q').oninput=list;
  $('mw-list').onchange=e=>{const i=+e.target.dataset.i;e.target.checked?sel.add(i):sel.delete(i);out()};
  $('cp-list').querySelectorAll('input').forEach(x=>{x.checked=cps.has(+x.dataset.i);x.onchange=()=>{x.checked?cps.add(+x.dataset.i):cps.delete(+x.dataset.i);out()}});
  list();out();
}};

/* ---------- Cấp cứu ---------- */
const ALG={
 arrest:['Ngừng tim ở thai phụ','Hình 19','4529',()=>`
  <div class="ab n"><b>Nguyên nhân thường gặp</b><span>Biến chứng gây mê, chảy máu, nguyên nhân tim mạch (suy tim, ACS, loạn nhịp, bóc tách ĐM chủ, thuyên tắc phổi), thuốc, thuyên tắc ối, sản giật.</span></div>
  <div class="branch"><div class="algo"><div class="ab g"><b>Không đặc thù thai kỳ</b><span>Kiểm soát đường thở. Thuốc và liều như người không mang thai ${B('I','C')}. Ép tim như người không mang thai ${B('I','C')}. Phác đồ khử rung như người không mang thai ${B('I','C')}. Điện cực trước–bên, điện cực bên đặt dưới vú ${B('I','C')}. Không giữ thuốc vì lo quái thai ${B('I','C')}.</span></div></div>
  <div class="algo"><div class="ab g"><b>Đặc thù thai kỳ</b><span>≥20 tuần: ép tử cung sang trái bằng tay liên tục ${B('I','C')}. Đường truyền TM phía trên cơ hoành ${B('I','C')}. Đang truyền Mg²⁺ (tiền sản giật): ngưng Mg²⁺, tiêm calci gluconat 10% 30 mL. Sau hồi sức: kiểm soát thân nhiệt cá thể hóa; nằm nghiêng trái hoàn toàn.</span></div></div></div>
  <div class="arrow">↓</div><div class="ab y"><b>Can thiệp sản khoa</b><span>Không ROSC sau 4 phút hồi sức và thai có khả năng sống: mổ lấy thai ngay tại chỗ ${B('IIa','C')}. Gọi nhóm sơ sinh. Không có chỉ định ép tim bằng thiết bị (thiếu dữ liệu).</span></div>
  <div class="srcline">${RT(16)} ${P('§12.4.4','4529–4530')}</div>`],
 ahf:['Suy tim cấp và sốc tim (thai kỳ đến 6 tháng sau sinh)','Hình 22','4537',()=>`
  <div class="ab n"><b>Bước đầu</b><span>&lt;35 tuần: cân nhắc corticosteroid trưởng thành phổi thai. Đánh giá độ nặng: HA tâm thu &lt;90, nhịp &gt;130 hoặc &lt;45, nhịp thở &gt;25, SpO₂ &lt;90%, lactat &gt;2 mmol/L, ScvO₂ &lt;60%, rối loạn ý thức, da lạnh ẩm, thiểu niệu &lt;0,5 mL/kg/h.</span></div>
  <div class="branch"><div class="algo"><div class="ab g"><b>Suy tim nặng / sốc tim</b><span>Tối ưu tiền gánh (dịch hoặc lợi tiểu; nitrat nếu HA tâm thu &gt;110). Tối ưu oxy (thở máy không xâm lấn, hoặc xâm lấn nếu SpO₂ &lt;95%). Inotrope/vận mạch: levosimendan không liều nạp, dobutamine hoặc milrinone ${B('I','C')}. Mổ lấy thai khẩn khi sốc tim ${B('I','C')}. Chuyển sớm đến nơi có MCS ${B('IIa','C')}.</span></div><div class="ab n"><b>Sốc kháng trị</b><span>MCS (ưu tiên VA-ECMO hoặc LVAD) làm cầu nối hồi phục hoặc cầu nối; không hồi phục → ghép tim.</span></div></div>
  <div class="algo"><div class="ab g"><b>Không nặng · đã sinh</b><span>ƯCMC, ƯCTT, ARNI, beta-blocker, MRA, SGLT2i, lợi tiểu ${B('I')}; có thể thêm ivabradine.</span></div><div class="ab r"><b>Không nặng · chưa sinh</b><span>Hydralazine, nitrat, beta-blocker (bisoprolol, metoprolol succinat), lợi tiểu. Không dùng ƯCMC, ƯCTT, ARNI, MRA, ivabradine, SGLT2i ${B('III','C')}. Cân nhắc sinh đường âm đạo có giảm đau NMC ${B('I')}.</span></div></div></div>
  <div class="ab y"><b>Nếu PPCM</b><span>Đã sinh: bromocriptine (khởi 2,5 mg × 2/ngày, chỉnh liều) ${B('IIb','B')}; kèm kháng đông (heparin/LMWH) khi dùng bromocriptine ${B('IIa','C')}.</span></div>
  <div class="srcline">${RT(20)} ${RT(7)} ${P('Hình 22','4537')}</div>`],
 pe:['Nghi thuyên tắc phổi','Hình 10','4512',()=>`
  <div class="branch"><div class="algo"><div class="ab y"><b>A. Huyết động ổn định</b><span>Liều LMWH điều trị đầu tiên nếu dự kiến chậm chẩn đoán ${B('IIa','C')} + D-dimer.</span></div><div class="arrow">↓ D-dimer dương tính</div><div class="ab n"><b>Siêu âm tĩnh mạch</b><span>Siêu âm ép tĩnh mạch dưới bẹn và tĩnh mạch chậu. Dương tính → chẩn đoán DVT. Âm tính/không rõ → CTPA (hoặc X-quang ngực + xạ hình tưới máu phổi nếu không có CTPA).</span></div><div class="ab g"><b>Xác chẩn PE/DVT</b><span>LMWH liều điều trị ${B('I','C')} + hội chẩn Pregnancy Heart Team có chuyên gia mạch máu và huyết học ${B('I','C')}.</span></div></div>
  <div class="algo"><div class="ab y"><b>B. Huyết động không ổn định</b><span>Hội chẩn Pregnancy Heart Team ${B('I','C')} + liều UFH hoặc LMWH điều trị đầu tiên ${B('IIa','C')} + siêu âm tim.</span></div><div class="arrow">↓ Rối loạn chức năng thất phải</div><div class="ab n"><b>CTPA</b><span>Dương tính → kháng đông liều điều trị và đánh giá tái tưới máu. Không rối loạn thất phải hoặc CTPA âm → tìm nguyên nhân khác.</span></div><div class="ab y"><b>PE nguy cơ cao</b><span>Tái tưới máu qua catheter hoặc tiêu sợi huyết toàn thân ${B('IIa','C')}; lấy huyết khối phẫu thuật thay thế ${B('IIb','C')}.</span></div></div></div>
  <div class="ab n"><span>D-dimer tăng sinh lý tới 39% mỗi quý. Thuật toán YEARS điều chỉnh: ngưỡng &lt;500 µg/L nếu có tiêu chuẩn YEARS, &lt;1000 µg/L nếu không. ${P('§11.4.1.2','4511')}</span></div>
  <div class="srcline">${RT(11)} ${P('Hình 10','4512')}</div>`],
 dvt:['Nghi huyết khối tĩnh mạch sâu','Hình 9','4511',()=>`
  <div class="ab y"><b>Liều LMWH điều trị đầu tiên nếu dự kiến chậm chẩn đoán</b><span>${B('IIa','C')}</span></div><div class="arrow">↓</div>
  <div class="ab n"><b>Siêu âm tĩnh mạch</b><span>Ép tĩnh mạch dưới bẹn + siêu âm tĩnh mạch chậu. Không rõ → siêu âm lặp lại (2 lần trong 7 ngày) hoặc MR tĩnh mạch.</span></div><div class="arrow">↓ Dương tính</div>
  <div class="ab g"><b>Chẩn đoán DVT</b><span>LMWH liều điều trị theo cân nặng đầu thai kỳ ${B('I','C')} + hội chẩn Pregnancy Heart Team có chuyên gia mạch máu và huyết học ${B('I','C')}.</span></div>
  <div class="ab n"><span>Tiêu chuẩn LEFt (chân trái, chênh chu vi bắp chân ≥2 cm, quý 1) giúp nhận diện nguy cơ thấp. Huyết khối chậu–đùi trái thường gặp hơn. ${P('§11.4.1.1','4510')}</span></div>
  <div class="srcline">${RT(11)} ${P('Hình 9','4511')}</div>`],
 htn:['Tăng huyết áp nặng / tiền sản giật','Hình 12A','4518',()=>`
  <div class="branch"><div class="ab n"><b>HA 140/90–159/109</b><span>Không nhập viện thường quy.</span></div><div class="ab g"><b>HA ≥160/≥110</b><span>Cấp cứu, nhập viện ${B('I','C')}. Hạ áp cấp: labetalol TM, urapidil, nicardipine, hoặc nifedipine tác dụng ngắn đường uống, methyldopa; hydralazine TM là lựa chọn hai ${B('I','C')}.</span></div></div>
  <div class="arrow">↓</div><div class="ab n"><b>Protein niệu, rối loạn cơ quan mẹ hoặc rối loạn tử cung–nhau?</b><span>Có → tiền sản giật, đánh giá mức chăm sóc. Tiền sản giật nặng: magie sulfat dự phòng sản giật, kèm cho sinh sớm.</span></div>
  <div class="arrow">↓</div><div class="ab g"><b>Mục tiêu HA &lt;140/90</b><span>${B('I','B')}; theo dõi đều. Phù phổi: nitroglycerin truyền TM ${B('I','C')}.</span></div>
  <div class="ab r"><b>Ngộ độc magie</b><span>Kéo dài PR, QRS, QT ở 2,5–5 mmol/L; block AV, chậm nhịp, tụt HA, ngừng tim ở 6–10 mmol/L → ngưng truyền, tiêm calci gluconat 30 mL TM. ${P('§12.3.3.2.2','4518')}</span></div>
  <div class="srcline">${RT(13)} ${P('Hình 12A','4518')}</div>`],
 svt:['Nhịp nhanh trên thất và rung nhĩ','Hình 14–15','4523–4524',()=>`
  <div class="branch"><div class="ab g"><b>Mất ổn định huyết động</b><span>Sốc điện ngay ${B('I','C')}.</span></div><div class="ab g"><b>SVT ổn định</b><span>Nghiệm pháp phế vị và adenosine TM ${B('I','C')}.</span></div></div>
  <div class="ab g"><b>AF/AFL đáp ứng thất nhanh</b><span>Beta-blocker TM (metoprolol) đầu tay ${B('I','C')}; digoxin TM hoặc verapamil (LVEF bảo tồn) hàng hai ${B('IIa','C')}. Không bệnh tim cấu trúc: ibutilide hoặc flecainide để cắt cơn ${B('IIb','C')}.</span></div>
  <div class="ab n"><b>Dài hạn</b><span>AF dai dẳng/vĩnh viễn nguy cơ huyết khối tăng: LMWH liều điều trị ${B('I','C')}. Kiểm soát tần số: chẹn beta-1 chọn lọc ${B('I','C')}. WPW: flecainide hoặc propafenone ${B('I','C')}. DOAC chống chỉ định ${B('III','C')}.</span></div>
  <div class="srcline">${RT(14)} ${RT(4)}</div>`],
 vt:['Nhịp nhanh thất','Hình 16','4526',()=>`
  <div class="ab g"><b>VT kéo dài (ổn định hoặc không)</b><span>Sốc điện chuyển nhịp ngay ${B('I','C')}.</span></div>
  <div class="ab y"><b>Cắt cơn VT ổn định bằng thuốc</b><span>Beta-blocker TM, adenosine (RVOT-VT vô căn), verapamil (VT phân nhánh), procainamide, hoặc tạo nhịp vượt tần số qua dây ICD ${B('IIa','C')}.</span></div>
  <div class="ab g"><b>Dự phòng</b><span>VT vô căn kéo dài: beta-blocker hoặc verapamil ${B('I','C')}; RVOT-VT: flecainide nếu beta-blocker thất bại ${B('IIa','C')}. Cần ICD/máy tạo nhịp/CRT: cấy với bảo vệ bức xạ tối ưu ${B('I','C')}. Amiodarone: chống chỉ định trong thai kỳ (Hình 6).</span></div>
  <div class="srcline">${RT(15)} ${P('Hình 6','4494')}</div>`],
 cp:['Đau ngực và hội chứng vành cấp','Hình 11','4514',()=>`
  <div class="ab g"><b>Loại trừ bệnh đe dọa tính mạng</b><span>Thuyên tắc phổi, ACS (kể cả SCAD), hội chứng ĐM chủ cấp ${B('I','C')}.</span></div>
  <div class="ab g"><b>ACS</b><span>Xử trí như phụ nữ không mang thai, gồm thăm dò và can thiệp ${B('I','C')}. Chụp mạch với bức xạ tối thiểu có thể cân nhắc nếu lợi ích lớn hơn ${B('IIb','C')}.</span></div>
  <div class="ab g"><b>Kháng tiểu cầu</b><span>Aspirin liều thấp là lựa chọn khi đơn trị ${B('I','B')}; cần DAPT: clopidogrel là P2Y12 lựa chọn ${B('I','C')}; thời gian DAPT như người không mang thai ${B('I','C')}. Ticagrelor: tránh (Hình 6).</span></div>
  <div class="ab y"><b>Sinh</b><span>Sinh đường âm đạo ở đa số, tùy chức năng thất trái và triệu chứng ${B('IIa','C')}.</span></div>
  <div class="ab n"><span>Troponin chưa có giá trị chuẩn trong thai kỳ, không dùng đơn độc. ${P('§4.3.4','4484')}</span></div>
  <div class="srcline">${RT(12)} ${P('Hình 11','4514')}</div>`],
 deliv:['Chuyển dạ khi đang dùng kháng đông liều điều trị','Hình 5','4488',()=>`
  <div class="branch"><div class="algo"><div class="ab r"><b>Đang dùng VKA</b><span>Ngưng VKA, kiểm tra INR. Chuẩn bị hồng cầu, cho 4F-PCC (FFP nếu không có), cân nhắc vitamin K.</span></div><div class="ab g"><b>Mổ lấy thai gây mê toàn thân để bảo vệ thai</b><span>${B('I','C')}</span></div></div>
  <div class="algo"><div class="ab n"><b>Đang dùng LMWH hoặc UFH TM</b><span>Ngưng LMWH/UFH. Sinh trong 24 h (LMWH) hoặc trong 4–6 h mà aPTT chưa về bình thường (UFH): cân nhắc protamine sulfat, cân nhắc mổ lấy thai gây mê toàn thân.</span></div><div class="ab g"><b>Còn lại</b><span>Gây tê trục thần kinh và sinh đường âm đạo trừ khi có chỉ định sản khoa ${B('I')}; xử trí tích cực giai đoạn 3 bằng oxytocin để giảm băng huyết ${B('IIa')}.</span></div></div></div>
  <div class="ab g"><b>Sau sinh</b><span>Hoãn chuyển heparin sang thuốc uống đến 7–14 ngày khi vết thương lành ${B('I','C')}. Đặt catheter tê trục thần kinh gây chấn thương: chưa dùng kháng đông liều điều trị ít nhất 24 h sau rút.</span></div>
  <div class="srcline">${RT(3)} ${P('Hình 5','4488')}</div>`]
};
PAGES['/tk/cap-cuu']={title:'Cấp cứu',render(m){
  let cur=(location.hash.split('?a=')[1])||'arrest';
  m.innerHTML=head('ESC 2025 · Thuật toán cấp cứu','Thuật toán cấp cứu trong thai kỳ','Chọn tình huống. Mỗi ô ghi class khuyến cáo; nguồn ở cuối thuật toán.')+
  `<div class="filters" id="al-chips">${Object.entries(ALG).map(([k,v])=>`<button type="button" class="chip" data-k="${k}" aria-pressed="${k===cur}">${v[0]}</button>`).join('')}</div><div class="panel stack" id="al-body"></div>`;
  const draw=()=>{const a=ALG[cur];$('al-body').innerHTML=`<span class="eyebrow">ESC 2025 · ${a[1]} · tr. ${a[2]}</span><div class="row" style="justify-content:space-between"><h2>${a[0]}</h2>${FIG('ESC25',a[1].split('–')[0],a[2])}</div><div class="algo">${a[3]()}</div>`};
  $('al-chips').onclick=e=>{const b=e.target.closest('.chip');if(!b)return;cur=b.dataset.k;$('al-chips').querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));draw()};
  draw();
}};

/* ---------- Thuốc ---------- */
PAGES['/tk/thuoc']={title:'Thuốc trong thai kỳ',render(m){
  let mode='p', cat='all';
  m.innerHTML=head('ESC 2025 · Hình 6','Chọn thuốc trong thai kỳ và cho con bú',`Ba mức theo Hình 6: <span class="cb c1">++</span> lựa chọn đầu tay/an toàn nhất, <span class="cb c2a">+−</span> lựa chọn hai, <span class="cb c3">×</span> có bằng chứng độc tính cho thai/trẻ hoặc không có dữ liệu an toàn. ${P('Hình 6','4494')}`)+`<div>${FIG('ESC25','Hình 6','4494')}</div>`+
  `<div class="filters"><button type="button" class="chip" id="md-p" aria-pressed="true">Thai kỳ</button><button type="button" class="chip" id="md-l" aria-pressed="false">Cho con bú</button><input type="search" id="dq" placeholder="Tìm thuốc: amiodarone, enalapril, nifedipine…" aria-label="Tìm thuốc"></div>
  <div class="filters" id="dc">${[['all','Tất cả'],...DRUGP.map((d,i)=>[String(i),d[0]])].map(([k,n])=>`<button type="button" class="chip" data-k="${k}" aria-pressed="${k==='all'}">${n}</button>`).join('')}</div>
  <div id="dl" class="stack"></div>
  <div class="grid2">${recBox('DOAC',4)}${recBox('Thuốc suy tim chống chỉ định','20','Suy tim mạn',r=>r[3]==='III')}</div>
  <p class="note">Bảng chi tiết liều và dược động học từng thuốc nằm ở Supplementary Table S2 của guideline (không có trong bản PDF chính).</p>`;
  const draw=()=>{const qq=$('dq').value.trim().toLowerCase();
    $('dl').innerHTML=DRUGP.map((d,i)=>{if(cat!=='all'&&String(i)!==cat)return'';const v=d[1][mode];if(qq&&!v.join(' ').toLowerCase().includes(qq)&&!d[0].toLowerCase().includes(qq))return'';
      const hl=s=>qq?s.replace(new RegExp('('+qq.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','ig'),'<mark>$1</mark>'):s;
      return `<div class="panel stack"><h3>${d[0]} <span class="pill">${mode==='p'?'Thai kỳ':'Cho con bú'}</span></h3><div class="dg"><div class="dgc c1"><h4>++ Đầu tay</h4><span>${hl(v[0])||'—'}</span></div><div class="dgc c2a"><h4>+− Lựa chọn hai</h4><span>${hl(v[1])||'—'}</span></div><div class="dgc c3"><h4>× Độc tính / không dữ liệu</h4><span>${hl(v[2])||'—'}</span></div></div></div>`}).join('')||'<p class="note">Không tìm thấy trong Hình 6.</p>'};
  $('md-p').onclick=()=>{mode='p';$('md-p').setAttribute('aria-pressed','true');$('md-l').setAttribute('aria-pressed','false');draw()};
  $('md-l').onclick=()=>{mode='l';$('md-l').setAttribute('aria-pressed','true');$('md-p').setAttribute('aria-pressed','false');draw()};
  $('dc').onclick=e=>{const b=e.target.closest('.chip');if(!b)return;cat=b.dataset.k;$('dc').querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));draw()};
  $('dq').oninput=draw;draw();
}};

/* ---------- Van cơ học ---------- */
PAGES['/tk/van-co-hoc']={title:'Van cơ học',render(m){
  m.innerHTML=head('ESC 2025 · Hình 21, Bảng 10–11','Van tim cơ học và kháng đông trong thai kỳ',`Mọi thai phụ có van cơ học được Pregnancy Heart Team quản lý ${B('I','C')} ${RT(19)}. Công cụ này đi theo Hình 21 ${P('Hình 21','4535')}.`)+
  `<form class="panel form" id="f-v">
   <label class="field"><span>Giai đoạn</span><select id="v-st"><option value="pre">Dự định mang thai</option><option value="t1" selected>Quý 1 (đến tuần 12)</option><option value="t23">Quý 2–3 (đến tuần 36)</option><option value="late">Từ tuần 36 / 2 tuần trước sinh</option></select></label>
   <label class="field"><span>Liều VKA cần để đạt INR</span><select id="v-dose"><option value="low">Liều thấp (warfarin ≤5 mg; acenocoumarol ≤2 mg; phenprocoumon ≤3 mg)</option><option value="high">Liều cao</option></select></label>
   <label class="field"><span>INR có kiểm soát tốt?</span><select id="v-inr"><option value="y">Có</option><option value="n">Không</option></select></label>
   <label class="field"><span>Đo được anti-Xa?</span><select id="v-axa"><option value="y">Có</option><option value="n">Không</option></select></label>
   <fieldset><legend>Nguy cơ huyết khối van cao (Hình 21)</legend><div class="checks" id="v-hr">${['Van bên phải','Van hai lá','Rung nhĩ','Chức năng thất trái kém','Tiền sử huyết khối','Rối loạn chức năng van, nhất là hẹp','Yếu tố đông máu khác (hút thuốc)','Van thế hệ cũ'].map((t,i)=>`<label><input type="checkbox" data-i="${i}"> ${t}</label>`).join('')}</div></fieldset>
   <label class="field"><span>Cân nặng (kg) để tính LMWH</span><input type="number" id="v-w" min="30" max="200" value="60"></label>
   <label class="field"><span>LMWH</span><select id="v-lm"><option value="enox">Enoxaparin</option><option value="dalt">Dalteparin</option><option value="tinz">Tinzaparin</option></select></label>
  </form>
  <div class="grid2"><div class="result" id="v-out"></div><div class="panel stack" id="v-dose-out"></div></div>
  <div class="grid2">${recBox('Van nhân tạo',19)}${recBox('Sinh khi đang kháng đông',3,'Đang dùng kháng đông')}</div>`;
  const f=$('f-v');f.addEventListener('input',run);f.addEventListener('change',run);f.addEventListener('submit',e=>e.preventDefault());
  function run(){
    const st=$('v-st').value, dose=$('v-dose').value, inr=$('v-inr').value, axa=$('v-axa').value==='y';
    const hr=[...$('v-hr').querySelectorAll('input')].some(x=>x.checked);
    let t,d=[];
    if(st==='pre'){t='Lập kế hoạch trước khi mang thai';d=[`${B('I','C')} Kế hoạch chăm sóc ghi rõ chiến lược kháng đông (tiếp tục VKA hay chuyển LMWH liều điều trị trong quý 1) trước mang thai hoặc ngay khi phát hiện có thai.`,`${B('I','B')} Phụ nữ trẻ dự định mang thai cần thay van: ưu tiên van sinh học.`,`Nếu muốn chuyển VKA sang LMWH: chuyển càng sớm càng tốt sau thụ thai. ${P('§5.2.1.1','4490')}`]}
    else if(st==='t1'){
      if(inr==='n'){t='INR kiểm soát kém';d=['Tư vấn rằng nguy cơ mang thai rất cao; thảo luận các lựa chọn khác. '+P('Hình 21','4535')]}
      else if(hr&&(dose==='low'||!axa)){t='Tiếp tục VKA';d=['Nguy cơ huyết khối van cao, liều VKA thấp → tiếp tục VKA (nguy cơ bệnh phôi do warfarin liều thấp 0,45–0,9%). '+P('§5.2.1.1','4490'),`${B('I','C')} Theo dõi INR mỗi tuần, tối thiểu mỗi 2 tuần.`]; if(!axa&&dose==='high') d.push('Liều VKA cao và không đo được anti-Xa: cân nhắc UFH TM liên tục (hiếm dùng). '+P('Hình 21','4535'))}
      else if(dose==='high'&&axa){t='Chuyển LMWH chỉnh liều theo anti-Xa';d=['Liều VKA cao → chuyển LMWH 2 lần/ngày, chỉnh theo anti-Xa đỉnh (mỗi tuần đến khi đạt, sau đó mỗi 2–4 tuần). '+P('Bảng 10','4490'),`${B('I','C')} Đo anti-Xa đỉnh, mục tiêu theo nguy cơ cá nhân (1,0–1,2 U/mL, đo 4–6 h sau tiêm).`]}
      else if(!axa){t='Tiếp tục VKA';d=[`${B('III','C')} Không dùng LMWH khi không theo dõi được anti-Xa.`,'UFH TM liên tục chỉ khi không đo được anti-Xa và không tiếp tục được VKA; UFH tiêm dưới da không được khuyến cáo. '+P('§5.2.1.3','4491')]}
      else{t='VKA liều thấp hoặc LMWH chỉnh liều';d=['Không có nguy cơ cao, có anti-Xa: Pregnancy Heart Team chọn LMWH chỉnh liều hoặc tiếp tục VKA theo mong muốn của sản phụ. '+P('Hình 21','4535')]}
    }
    else if(st==='t23'){
      if(hr){t='Tiếp tục/chuyển sang VKA đến tuần 36';d=[`${B('IIa','C')} Quý 2–3 đến tuần 36: tiếp tục VKA ở phụ nữ nguy cơ huyết khối cao hơn.`,`${B('I','C')} INR mỗi tuần đến tối thiểu mỗi 2 tuần.`]}
      else if(axa){t='VKA (chuẩn) hoặc LMWH có anti-Xa';d=[`${B('IIb','C')} Nguy cơ thấp hơn: có thể tiếp tục LMWH có theo dõi và chỉnh liều anti-Xa.`,'VKA là chăm sóc thường quy trong quý 2–3. '+P('Hình 21','4535')]}
      else{t='VKA';d=[`${B('III','C')} Không dùng LMWH khi không theo dõi được anti-Xa.`]}
    }
    else{t='Chuẩn bị sinh';d=[`${B('I','C')} Ngưng VKA, chuyển LMWH liều điều trị hoặc UFH TM ở tuần 36 hoặc 2 tuần trước dự sinh.`,`${B('I','C')} Van cơ học là nhóm nguy cơ cao: chuyển LMWH sang UFH TM ít nhất 36 h trước sinh, ngưng UFH 4–6 h trước dự kiến sinh; aPTT bình thường trước gây tê vùng.`,`${B('I','C')} Chuyển dạ khi còn VKA hoặc <2 tuần sau ngưng: mổ lấy thai.`,`${B('I','C')} Hoãn chuyển lại thuốc uống đến 7–14 ngày sau sinh.`]}
    $('v-out').innerHTML=`<span class="eyebrow">Gợi ý theo Hình 21</span><h2>${t}</h2><ul class="plain">${d.map(x=>`<li>${x}</li>`).join('')}</ul><div class="srcline">${P('Hình 21','4535')} ${RT(19)} ${RT(3)}</div>`;
    const w=+$('v-w').value||0, L=LMWH[$('v-lm').value];
    const fmt=(iu)=>Math.round(iu).toLocaleString('vi-VN')+' IU'+($('v-lm').value==='enox'?` (≈ ${(iu/100).toFixed(0)} mg)`:'');
    const freq=x=>x==='bid'?'× 2 lần/ngày':'× 1 lần/ngày';
    $('v-dose-out').innerHTML=`<h3>Liều ${L.n} (Bảng 11) ${P('Bảng 11','4491')}</h3><table><tbody>
     <tr><td class="k">Dự phòng (50–100 kg)</td><td>${L.pro}</td></tr>
     <tr><td class="k">Điều trị, không van cơ học</td><td>${fmt(L.ther[0]*w)} ${freq(L.ther[1])}</td></tr>
     <tr><td class="k">Van cơ học: khởi đầu</td><td>${fmt(L.mhvStart[0]*w)} ${freq(L.mhvStart[1])}</td></tr>
     <tr><td class="k">Van cơ học: duy trì</td><td>${fmt(L.mhvMaint[0]*w)} ${freq(L.mhvMaint[1])}, chỉnh theo anti-Xa</td></tr>
     <tr><td class="k">Mục tiêu anti-Xa (van cơ học)</td><td>Bảng 11: 0,8–1,2 U/mL, 4–6 h sau tiêm; văn bản: cá thể hóa theo loại và vị trí van, 1,0–1,2 U/mL</td></tr></tbody></table>
     <p class="note">Tính theo cân nặng ${w} kg. Enoxaparin 100 IU = 1 mg. Kiểm tra lại liều với dược sĩ và hướng dẫn sử dụng.</p>`;
  }
  run();
}};

/* ---------- Động mạch chủ ---------- */
const AO={
 mfs:{n:'Marfan (FBN1)',I:45,strict:true,IIb:40,IIbNote:'nếu tăng >3 mm/năm hoặc tiền sử gia đình bóc tách',bb:'Beta-blocker suốt thai kỳ và sau sinh (I C)'},
 lds1:{n:'Loeys–Dietz TGFBR1/TGFBR2',I:45,IIb:40,bb:'Beta-blocker (HTAD) suốt thai kỳ và sau sinh (I C)'},
 lds2:{n:'Loeys–Dietz TGFB2/TGFB3/SMAD2/SMAD3',IIa:45,bb:'Beta-blocker (HTAD) suốt thai kỳ và sau sinh (I C)'},
 ns:{n:'nsHTAD (MYH11, ACTA2, PRKG1, MYLK)',I:45,IIb:40,IIbNote:'tùy biến thể gen, tiền sử gia đình, tốc độ giãn',bb:'Beta-blocker (HTAD) suốt thai kỳ và sau sinh (I C)'},
 bav:{n:'Van ĐM chủ hai lá',I:50,IIa:45,IIaNote:'nếu kiểu hình gốc hoặc tiền sử gia đình phình/bóc tách',bb:''},
 tad:{n:'Không có biến thể P/LP',I:50,IIa:45,IIaNote:'nếu tiền sử gia đình phình/bóc tách, THA không kiểm soát hoặc theo mong muốn người bệnh',bb:''},
 veds:{n:'Ehlers–Danlos thể mạch máu',veds:true,bb:'Celiprolol trong thai kỳ và khi cho bú (I C)'}
};
function aoMwho(k,d){
  if(k==='veds')return 4;
  if(k==='bav')return d>50?4:d>=45?3:2;
  if(k==='tad')return d>50?4:d>=40?3:0;
  return d>45?4:d>=40?3:2;
}
PAGES['/tk/dong-mach-chu']={title:'Động mạch chủ',render(m){
  m.innerHTML=head('ESC 2025 · Hình 8, Rec. 8, Bảng 6','Bệnh động mạch chủ và thai kỳ',`Chọn bệnh nền và kéo đường kính gốc/ĐM chủ lên. Ngưỡng phẫu thuật dự phòng trước mang thai, phương thức sinh và nhóm mWHO cập nhật theo đường kính. ${P('Hình 8','4502')} ${RT(8)}`)+
  `<form class="panel form" id="f-a"><label class="field"><span>Bệnh nền</span><select id="a-k">${Object.entries(AO).map(([k,v])=>`<option value="${k}">${v.n}</option>`).join('')}</select></label>
   <label class="field" style="grid-column:span 2"><span>Đường kính gốc / ĐM chủ lên: <b id="a-dv">42</b> mm</span><input type="range" id="a-d" min="30" max="60" step="1" value="42"></label>
   <fieldset><legend>Khác</legend><div class="checks"><label><input type="checkbox" id="a-diss"> Tiền sử bóc tách ĐM chủ</label><label><input type="checkbox" id="a-preg"> Đang mang thai</label></div></fieldset></form>
  <div class="panel stack"><div class="ruler" id="a-ruler"></div></div>
  <div class="grid3"><div class="result" id="a-sx"></div><div class="result" id="a-del"></div><div class="result" id="a-mw"></div></div>
  ${recBox('Theo dõi hình ảnh và điều trị nội khoa',8,null,r=>['Hình ảnh','Điều trị nội khoa','Tư vấn'].includes(r[1]))}`;
  const f=$('f-a');f.addEventListener('input',run);f.addEventListener('change',run);f.addEventListener('submit',e=>e.preventDefault());
  function run(){
    const k=$('a-k').value, d=+$('a-d').value, A=AO[k], diss=$('a-diss').checked, preg=$('a-preg').checked;$('a-dv').textContent=d;
    const pos=v=>((v-30)/30*100);
    $('a-ruler').innerHTML=[40,45,50].map(v=>`<span class="lb" style="left:${pos(v)}%">${v} mm</span>`).join('')+`<span class="mk" style="left:calc(${pos(d)}% - 1px)"></span>`;
    let sc,sx;
    if(A.veds){sc='VB';sx='Không có ngưỡng đường kính; nhóm đa chuyên khoa tư vấn nguy cơ rất cao trước mang thai (I C).'}
    else if(A.I&&(A.strict?d>A.I:d>=A.I)){sc='I';sx=`Phẫu thuật trước mang thai được khuyến cáo (ngưỡng ${A.strict?'>':'≥'}${A.I} mm).`}
    else if(A.IIa&&d>=A.IIa){sc='IIa';sx=`Nên cân nhắc phẫu thuật trước mang thai (≥${A.IIa} mm${A.IIaNote?', '+A.IIaNote:''}).`}
    else if(A.IIb&&d>=A.IIb){sc='IIb';sx=`Có thể cân nhắc phẫu thuật trước mang thai (≥${A.IIb} mm${A.IIbNote?', '+A.IIbNote:''}).`}
    else{sc='NA';sx='Dưới ngưỡng phẫu thuật dự phòng. Theo dõi hình ảnh, kiểm soát HA chặt.'}
    $('a-sx').innerHTML=`<span class="eyebrow">Phẫu thuật trước mang thai</span><span class="big">${B(sc,'C')}</span><p>${sx}</p>${A.bb?`<p class="note">${A.bb}</p>`:''}<div class="srcline">${RT(8)} ${P('Hình 8','4502')}</div>`;
    let del;
    if(k==='veds')del=`${B('I','C')} Mổ lấy thai lúc 37 tuần vì lý do sản khoa.`;
    else if(diss)del=`${B('IIa','C')} Bóc tách cấp, bán cấp hoặc mạn: nên cân nhắc mổ lấy thai.`;
    else if(d<40)del=`${B('I','C')} ĐM chủ &lt;40 mm: sinh đường âm đạo.`;
    else if(d<45)del=`${B('IIa','C')} 40–45 mm: sinh đường âm đạo có giảm đau NMC và rút ngắn giai đoạn 2; ${B('IIb','C')} có thể cân nhắc mổ lấy thai.`;
    else del=`${B('IIa','C')} ≥45 mm: nên cân nhắc mổ lấy thai.`;
    $('a-del').innerHTML=`<span class="eyebrow">Phương thức sinh</span><p>${del}</p><p>${B('III','C')} Không dùng ergometrine sau sinh.</p><div class="srcline">${RT(8)}</div>`;
    let cls=aoMwho(k,d); if(diss) cls=Math.max(cls,3);
    const img=cls>=3?'Siêu âm tim lặp lại mỗi 4–12 tuần trong thai kỳ đến 6 tháng sau sinh (I C).':'Siêu âm tim một lần ở tuần 20–30 và lúc 6 tháng sau sinh (I C).';
    $('a-mw').innerHTML=`<span class="eyebrow">mWHO 2.0 (ước theo Bảng 6)</span><span class="big"><span class="mw ${MWHO.css[cls]}" style="display:inline-flex;padding:2px 10px">${MWHO.classes[cls]}</span></span><p>${img}</p>${cls>=3?'<p class="note">Trung tâm phải có khả năng phẫu thuật tim mạch khi có biến cố chu sinh (I C).</p>':''}${preg?'<p class="note">Chưa có chụp cắt lớp gần đây: CMR không gadolinium toàn bộ ĐM chủ (I C).</p>':''}<div class="srcline">${P('Bảng 6','4478')} ${RT(8)}</div>`;
  }
  run();
}};

/* ---------- THA & tiền sản giật ---------- */
PAGES['/tk/tha']={title:'THA & tiền sản giật',render(m){
  m.innerHTML=head('ESC 2025 · Bảng 14–15, Hình 12, Rec. 13','Tăng huyết áp và tiền sản giật',`Nhập huyết áp, tuổi thai và dấu hiệu tổn thương cơ quan. ${RT(13)} ${P('Bảng 14','4516')}`)+
  `<form class="panel form" id="f-h">
   <label class="field"><span>HA tâm thu (mmHg)</span><input type="number" id="h-s" value="152"></label>
   <label class="field"><span>HA tâm trương (mmHg)</span><input type="number" id="h-d" value="98"></label>
   <label class="field"><span>Tuổi thai (tuần)</span><input type="number" id="h-ga" min="4" max="42" value="31"></label>
   <label class="field"><span>THA có trước mang thai hoặc trước 20 tuần?</span><select id="h-pre"><option value="n">Không</option><option value="y">Có</option></select></label>
   <fieldset><legend>Dấu hiệu tiền sản giật (Hình 12B)</legend><div class="checks">
    <label><input type="checkbox" id="h-prot"> Protein niệu (ACR ≥8 mg/mmol hoặc PCR ≥30 mg/mmol)</label>
    <label><input type="checkbox" id="h-org"> Tổn thương cơ quan mẹ: suy thận (creatinine ≥90 µmol/L), men gan &gt;40 IU/L, thần kinh, tiểu cầu &lt;150 000/µL, tan máu, DIC</label>
    <label><input type="checkbox" id="h-up"> Rối loạn tử cung–nhau (thai chậm tăng trưởng, Doppler bất thường, thai chết)</label>
    <label><input type="checkbox" id="h-hem"> Rối loạn cầm máu</label>
    <label><input type="checkbox" id="h-pe"> Phù phổi</label></div></fieldset>
  </form>
  <div class="grid2"><div class="result" id="h-out"></div><div class="panel stack"><h3>Nguy cơ tiền sản giật → aspirin? ${P('Bảng 15','4517')}</h3>
   <div class="grid2"><div class="checks" id="h-hi"><b class="small">Yếu tố nguy cơ cao</b>${PE_RF.high.map((t,i)=>`<label><input type="checkbox" data-i="${i}"> ${t}</label>`).join('')}</div>
   <div class="checks" id="h-mo"><b class="small">Yếu tố nguy cơ trung bình</b>${PE_RF.mod.map((t,i)=>`<label><input type="checkbox" data-i="${i}"> ${t}</label>`).join('')}</div></div><div id="h-asa"></div></div></div>
  <div class="grid2"><div class="panel stack"><h3>Thuốc hạ áp ${P('§12.3.3.2','4518')} ${P('Hình 6','4494')}</h3><ul class="plain">
   <li>Methyldopa ${B('I','B')}; labetalol, metoprolol, chẹn kênh canxi dihydropyridine ${B('I','C')}.</li>
   <li>ƯCMC, ƯCTT, ức chế renin trực tiếp: chống chỉ định tuyệt đối. Atenolol: tránh.</li>
   <li>Lợi tiểu không được khuyên dùng trong THA thai kỳ và tiền sản giật (giảm thể tích nội mạch và tưới máu tử cung–nhau).</li>
   <li>Không hạ HA tâm trương xuống dưới 80 mmHg.</li>
   <li>Canxi bổ sung (&lt;1 g/ngày) nếu khẩu phần canxi thấp (&lt;600 mg/ngày) để dự phòng tiền sản giật.</li></ul></div>
   <div class="panel stack"><h3>Phân loại (Bảng 14)</h3><ul class="plain">
   <li><b>THA mạn:</b> có trước mang thai hoặc trước 20 tuần, thường kéo dài &gt;6 tuần sau sinh.</li>
   <li><b>THA thai kỳ:</b> xuất hiện sau 20 tuần, thường hết trong 6 tuần sau sinh. Dạng thoáng qua có 40% nguy cơ tiến triển.</li>
   <li><b>Tiền sản giật:</b> THA thai kỳ kèm ≥1 dấu hiệu mới từ tuần 20: protein niệu, tổn thương cơ quan mẹ hoặc rối loạn tử cung–nhau.</li>
   <li><b>THA mạn + tiền sản giật chồng lên.</b></li><li><b>Không phân loại được trước sinh:</b> đánh giá lại ≥6 tuần sau sinh.</li>
   <li>sFlt-1/PlGF &lt;38 loại trừ tiền sản giật trong 7 ngày; ≥85 hoặc PlGF &lt;12 pg/mL ủng hộ chẩn đoán khi lâm sàng chưa rõ. ${P('§12.3.2.2, Hình 12B','4517–4519')}</li></ul></div></div>`;
  const all=()=>{run();asa()};
  ['f-h','h-hi','h-mo'].forEach(id=>{$(id).addEventListener('change',all);$(id).addEventListener('input',all)});$('f-h').addEventListener('submit',e=>e.preventDefault());
  function run(){
    const s=+$('h-s').value||0,d=+$('h-d').value||0,ga=+$('h-ga').value||0,pre=$('h-pre').value==='y';
    const pe=ga>=20&&($('h-prot').checked||$('h-org').checked||$('h-up').checked);
    const ht=s>=140||d>=90, sev=s>=160||d>=110;
    let dx;
    if(!ht&&!pe)dx='Huyết áp không trong ngưỡng THA (&lt;140/90)';
    else if(pre&&pe)dx='THA mạn + tiền sản giật chồng lên';
    else if(pe)dx='Tiền sản giật';
    else if(pre)dx='THA mạn (có trước thai kỳ hoặc trước 20 tuần)';
    else if(ga>=20)dx='THA thai kỳ';
    else dx='THA trước 20 tuần: xếp như THA mạn';
    const a=[];
    if(sev)a.push(`${B('I','C')} HA ≥160/110 là cấp cứu: nhập viện, hạ áp cấp bằng labetalol TM, urapidil, nicardipine, nifedipine tác dụng ngắn đường uống hoặc methyldopa; hydralazine TM hàng hai.`);
    else if(ht)a.push(`${B('I','B')} Bắt đầu thuốc khi HA ≥140/90 (THA thai kỳ); mục tiêu &lt;140/90. Không nhập viện thường quy nếu không có tiền sản giật.`);
    if(ht||pe)a.push(`${B('I','B')} Mục tiêu HA tâm thu &lt;140 và tâm trương &lt;90 mmHg.`);
    if($('h-pe').checked)a.push(`${B('I','C')} Phù phổi: nitroglycerin truyền TM.`);
    if(pe){a.push('Tiền sản giật có dấu hiệu nặng: magie sulfat dự phòng sản giật và cho sinh sớm. '+P('§12.3.3.2.2','4518'));
      if($('h-hem').checked)a.push(`${B('I','C')} Có rối loạn cầm máu: đẩy nhanh việc cho sinh.`);
      else a.push(`${B('I','B')} Tiền sản giật không dấu hiệu nặng: cho sinh lúc 37 tuần.`)}
    else if(ht&&!pre&&ga>=20)a.push(`${B('I','B')} THA thai kỳ: cho sinh lúc 39 tuần.`);
    if(ht)a.push(`${B('IIa','C')} Đo HA lưu động hoặc tại nhà để loại trừ THA áo choàng trắng và THA ẩn giấu.`);
    $('h-out').innerHTML=`<span class="eyebrow">Phân loại & xử trí</span><h2>${dx}</h2><p class="note">HA ${s}/${d} mmHg · ${ga} tuần${sev?' · <b>THA nặng</b>':''}</p><ul class="plain">${a.map(x=>`<li>${x}</li>`).join('')}</ul><div class="srcline">${RT(13)} ${P('Bảng 14','4516')} ${P('Hình 12A–B','4518–4519')}</div>`;
  }
  function asa(){const hi=[...$('h-hi').querySelectorAll('input')].filter(x=>x.checked).length,mo=[...$('h-mo').querySelectorAll('input')].filter(x=>x.checked).length;const yes=hi>=1||mo>=2;
    $('h-asa').innerHTML=`<div class="callout ${yes?'preg':'neutral'}"><p>${yes?`${B('I','A')} Aspirin liều thấp 75–150 mg/ngày, uống buổi tối, từ tuần 12 đến tuần 36/37 (${hi} yếu tố nguy cơ cao, ${mo} yếu tố trung bình).`:`Chưa đủ tiêu chuẩn aspirin dự phòng (cần ≥1 yếu tố nguy cơ cao hoặc ≥2 yếu tố trung bình).`} ${RT(13)}</p></div>`}
  all();
}};

/* ---------- Kế hoạch sinh ---------- */
PAGES['/tk/sinh']={title:'Kế hoạch sinh',render(m){
  m.innerHTML=head('ESC 2025 · Rec. 3, 5, 8, 9, 12, 20, Hình 5','Kế hoạch sinh',`Chọn đặc điểm của sản phụ để lập kế hoạch thời điểm, cách sinh, vô cảm, kháng đông và thuốc co tử cung. Sinh đường âm đạo là mặc định ở đa số phụ nữ bệnh tim mạch ${B('I','B')} ${RT(3)}.`)+
  `<form class="panel form" id="f-s">
   <label class="field"><span>Kháng đông hiện tại</span><select id="s-ac"><option value="none">Không</option><option value="pro">LMWH liều dự phòng</option><option value="ther">LMWH liều điều trị</option><option value="vka">VKA</option></select></label>
   <label class="field"><span>Nguy cơ huyết khối (Bảng 10)</span><select id="s-thr"><option value="low">Thấp–trung bình</option><option value="high">Cao (van cơ học)</option></select></label>
   <label class="field"><span>Đường kính ĐM chủ (mm, để trống nếu không có)</span><input type="number" id="s-ao" min="20" max="70"></label>
   <fieldset><legend>Bệnh lý</legend><div class="checks">
    <label><input type="checkbox" id="s-hf"> Suy tim nặng (EF &lt;30% và/hoặc NYHA III/IV)</label>
    <label><input type="checkbox" id="s-hcm"> HCM tắc nghẽn đường ra nặng (≥50 mmHg)</label>
    <label><input type="checkbox" id="s-arr"> Loạn nhịp không kiểm soát</label>
    <label><input type="checkbox" id="s-shock"> Sốc tim</label>
    <label><input type="checkbox" id="s-veds"> Ehlers–Danlos thể mạch máu</label>
    <label><input type="checkbox" id="s-aortic"> Bệnh ĐM chủ (bất kỳ)</label>
    <label><input type="checkbox" id="s-ie"> Van nhân tạo / tiền sử viêm nội tâm mạc / ghép tim còn tổn thương van</label>
    <label><input type="checkbox" id="s-cavb"> Block AV bẩm sinh không triệu chứng, QRS hẹp, tần số ≥50</label></div></fieldset></form>
  <div class="result" id="s-out"></div>`;
  const f=$('f-s');f.addEventListener('input',run);f.addEventListener('change',run);f.addEventListener('submit',e=>e.preventDefault());
  function run(){
    const ac=$('s-ac').value,thr=$('s-thr').value,ao=$('s-ao').value===''?null:+$('s-ao').value,g=id=>$(id).checked;
    const rows=[];
    let mode=`${B('I','B')} Sinh đường âm đạo. ${RT(3)}`;
    const cs=[];
    if(g('s-shock'))cs.push(`${B('I','C')} Sốc tim: mổ lấy thai khẩn ngay khi thai có khả năng sống. ${RT(20)}`);
    if(g('s-veds'))cs.push(`${B('I','C')} Ehlers–Danlos thể mạch máu: mổ lấy thai lúc 37 tuần. ${RT(8)}`);
    if(ac==='vka')cs.push(`${B('I','C')} Chuyển dạ khi còn VKA hoặc &lt;2 tuần sau ngưng: mổ lấy thai. ${RT(3)}`);
    if(g('s-hf')||g('s-hcm')||g('s-arr'))cs.push(`${B('I','C')} Bệnh cơ tim kèm suy tim nặng, LVOTO nặng hoặc loạn nhịp không kiểm soát: chỉ định mổ lấy thai được nêu là ngoại lệ của sinh đường âm đạo. ${RT(5)}`);
    if(ao!==null){if(ao>=45)cs.push(`${B('IIa','C')} ĐM chủ ≥45 mm: nên cân nhắc mổ lấy thai. ${RT(8)}`);else if(ao>=40)rows.push(['Cách sinh',`${B('IIa','C')} ĐM chủ 40–45 mm: sinh đường âm đạo có giảm đau NMC và rút ngắn giai đoạn 2 (hoặc ${B('IIb','C')} mổ lấy thai). ${RT(8)}`])}
    if(cs.length)mode=cs.join('<br>');
    rows.unshift(['Cách sinh',mode]);
    let timing=`${B('III','C')} Không khởi phát chuyển dạ thường quy trước 39 tuần nếu bệnh tim ổn định. ${RT(3)}`;
    if(ac==='ther')timing+=`<br>${B('IIa','C')} Đang LMWH liều điều trị: sinh theo kế hoạch quanh 39 tuần. ${RT(3)}`;
    rows.push(['Thời điểm',timing]);
    if(ac==='vka'||ac==='ther'){
      const a=[`${B('I','C')} Lên kế hoạch thời điểm sinh để kháng đông chu sinh an toàn.`];
      if(ac==='vka')a.push(`${B('I','C')} Ngưng VKA, chuyển LMWH liều điều trị hoặc UFH TM ở tuần 36 hoặc 2 tuần trước dự sinh.`);
      if(thr==='high')a.push(`${B('I','C')} Nguy cơ cao: chuyển LMWH sang UFH TM ≥36 h trước sinh, ngưng UFH 4–6 h trước dự kiến sinh; aPTT bình thường trước gây tê vùng.`);
      else a.push(`${B('I','C')} Nguy cơ thấp: gây tê trục thần kinh và sinh 24 h sau liều LMWH cuối.`);
      a.push(`${B('I','C')} Sau sinh: Pregnancy Heart Team và sản phụ quyết định dùng lại LMWH/UFH; hoãn chuyển sang thuốc uống 7–14 ngày.`);
      rows.push(['Kháng đông',a.join('<br>')+' '+RT(3)]);
    } else if(ac==='pro') rows.push(['Kháng đông','LMWH dự phòng: phối hợp với gây mê về khoảng cách liều cuối trước gây tê trục thần kinh. '+P('§4.5.6','4487')]);
    rows.push(['Vô cảm','Gây tê trục thần kinh giảm đau và giảm hoạt hóa adrenergic. HCM tắc nghẽn nặng: thận trọng với gây tê ngoài màng cứng/tủy sống vì giãn mạch ngoại biên. '+P('§6.1.5','4496')]);
    const ut=[];
    if(ac!=='none')ut.push(`${B('IIa','C')} Đang kháng đông trước sinh: xử trí tích cực giai đoạn 3 bằng oxytocin.`);
    if(g('s-aortic')||ao!==null)ut.push(`${B('III','C')} Bệnh ĐM chủ: không dùng ergometrine.`);
    if(ut.length)rows.push(['Thuốc co tử cung',ut.join('<br>')+' '+RT(3)]);
    if(g('s-ie'))rows.push(['Kháng sinh dự phòng',`${B('IIb','C')} Nhóm nguy cơ cao: có thể cân nhắc kháng sinh dự phòng toàn thân khi sinh. ${RT(3)}`]);
    if(g('s-cavb'))rows.push(['Máy tạo nhịp tạm thời',`${B('III','C')} Không đặt dự phòng khi sinh. ${RT(17)}`]);
    $('s-out').innerHTML=`<span class="eyebrow">Kế hoạch sinh</span><table><tbody>${rows.map(r=>`<tr><td class="k">${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</tbody></table>`;
  }
  run();
}};

/* ---------- Hậu sản ---------- */
PAGES['/tk/hau-san']={title:'Hậu sản',render(m){
  m.innerHTML=head('ESC 2025 · Hình 24–25, Rec. 7, 20, 23','Hậu sản và theo dõi dài hạn','Kết cục thai kỳ bất lợi (APO: THA thai kỳ, tiền sản giật, đái tháo đường thai kỳ, sinh non…) làm tăng nguy cơ tim mạch về sau.')+
  `<div class="panel stack"><h3>Lịch theo dõi sau APO ${P('Hình 25','4541')}</h3>
   <div class="scroll"><table><thead><tr><th>Mốc</th><th>Người phụ trách</th><th>Việc cần làm</th></tr></thead><tbody>
    <tr><td class="k">0–6 tuần</td><td>Sản phụ khoa</td><td>THA sau sinh không biến chứng: nifedipine hoặc labetalol (metoprolol nếu không có labetalol) ${B('I','C')}</td></tr>
    <tr><td class="k">6–12 tuần</td><td>Bàn giao cho tuyến chăm sóc ban đầu</td><td>Đái tháo đường thai kỳ: nghiệm pháp dung nạp glucose ${B('I','C')}. THA kéo dài quá 6 tuần–3 tháng: bắt đầu thuốc theo guideline, xét tình trạng cho bú ${B('I','B')}</td></tr>
    <tr><td class="k">3 tháng</td><td>Chăm sóc ban đầu</td><td>Đánh giá nguy cơ tim mạch: HA, đường huyết, lipid, BMI, tư vấn lối sống, stress ${B('IIa','C')}</td></tr>
    <tr><td class="k">6–12 tháng</td><td>Chăm sóc ban đầu</td><td>Lặp lại đánh giá sau can thiệp lối sống ${B('IIa','C')}; đái tháo đường thai kỳ: nghiệm pháp lần 2 ${B('I','C')}</td></tr>
    <tr><td class="k">Sau 12 tháng</td><td>Chăm sóc ban đầu</td><td>Kiểm tra lại mỗi 6–12 tháng; tầm soát đái tháo đường hằng năm nếu tiền sử GDM</td></tr></tbody></table></div>
   <div class="srcline">${RT(23)} ${P('Hình 25','4541')}</div></div>
  <div class="grid2"><div class="panel stack"><h3>THA mới xuất hiện sau sinh ${P('Hình 24','4541')}</h3><div class="algo">
    <div class="ab n"><b>HA ≥140/90 mới sau sinh</b></div>
    <div class="branch"><div class="ab g"><b>Không dấu hiệu tổn thương cơ quan</b><span>THA sau sinh.</span></div><div class="ab r"><b>Có dấu hiệu tổn thương cơ quan</b><span>Protein niệu, triệu chứng thần kinh, xét nghiệm bất thường. Loại trừ huyết khối tĩnh mạch não/đột quỵ, gan nhiễm mỡ cấp, giảm tiểu cầu, suy thận → tiền sản giật/sản giật sau sinh.</span></div></div></div></div>
   ${recBox('Kết cục thai kỳ bất lợi',23)}</div>
  <div class="grid2">${recBox('Bệnh cơ tim chu sinh',7)}${recBox('Suy tim sau sinh',20,null,r=>/sau sinh|cho con bú|tiết sữa/i.test(r[2]))}</div>`;
}};

/* ---------- Tất cả khuyến cáo ---------- */
PAGES['/tk/khuyen-cao']={title:'Khuyến cáo ESC 2025',render(m){
  m.innerHTML=head('ESC 2025 · Rec. Tables 1–23','Tất cả khuyến cáo tim mạch – thai kỳ',`${PR.length} khuyến cáo đã dịch. Lọc theo bảng, class, mức bằng chứng hoặc từ khóa. Bản dịch tóm lược sát nghĩa; khi cần trích dẫn chính thức, dùng văn bản gốc tiếng Anh.`)+
  `<div class="filters"><select id="k-t" aria-label="Bảng"><option value="">Mọi bảng</option>${Object.entries(PT).map(([k,v])=>`<option value="${k}">Rec. ${k} · ${v[0]}</option>`).join('')}</select>
   <select id="k-c" aria-label="Class"><option value="">Mọi class</option><option>I</option><option>IIa</option><option>IIb</option><option>III</option></select>
   <select id="k-l" aria-label="Mức bằng chứng"><option value="">Mọi mức</option><option>A</option><option>B</option><option>C</option></select>
   <input type="search" id="k-q" placeholder="Tìm: aspirin, Marfan, LMWH…" aria-label="Tìm"><span class="note" id="k-n"></span></div><div id="k-list" class="stack"></div>`;
  const tq=new URLSearchParams(location.hash.split('?')[1]||'').get('t');if(tq)$('k-t').value=tq;
  const draw=()=>{const t=$('k-t').value,c=$('k-c').value,l=$('k-l').value,qq=$('k-q').value.trim().toLowerCase();
    const rs=PR.filter(r=>(!t||String(r[0])===t)&&(!c||r[3]===c)&&(!l||r[4]===l)&&(!qq||(r[2]+' '+r[1]+' '+PT[r[0]][0]).toLowerCase().includes(qq)));
    $('k-n').textContent=`${rs.length} khuyến cáo`;
    $('k-list').innerHTML=rs.map(r=>`<div class="recrow"><div class="meta"><span class="who preg">Rec. ${r[0]}</span><span>${PT[r[0]][0]} · ${r[1]}</span></div>${recLine([r[2],r[3],r[4]])}<div class="srcline">${RT(r[0])}</div></div>`).join('')||'<p class="note">Không có khuyến cáo khớp bộ lọc.</p>'};
  ['k-t','k-c','k-l'].forEach(id=>$(id).onchange=draw);$('k-q').oninput=draw;draw();
}};
})();

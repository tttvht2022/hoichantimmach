/* ===== Trang chung: trang chủ, tìm kiếm, nguồn, giới thiệu ===== */
(function(){
PAGES['/']={title:'Trang chủ',render(m){
  m.innerHTML=`<div class="hero"><span class="eyebrow">Sổ tay hội chẩn tim mạch tiếng Việt</span><h1>Hội Chẩn Tim</h1>
   <p class="lede">Công cụ học tập dựa trên bốn guideline: đánh giá tim mạch trước phẫu thuật ngoài tim (ESC 2022, ACC/AHA 2026), tim mạch – thai kỳ (ESC 2025) và tăng huyết áp (VSH/VNHA 2026). Mỗi khuyến cáo ghi class, mức bằng chứng và nút trích dẫn mở số trang của văn bản gốc.</p></div>
  <div class="hubs three">
   <section class="hub tp"><span class="eyebrow col-aha">Tiền phẫu</span><h2>Hội chẩn trước phẫu thuật ngoài tim</h2><p class="small">${C('ESC22','','3826–3924')} ${C('AHA26','','e413–e504')}</p>
    <div class="tiles">${[['#/tp','Lộ trình hội chẩn','Các bước từ phân loại đến sau mổ'],['#/tp/tro-ly','Trợ lý hội chẩn','Hai thuật toán chạy song song'],['#/tp/so-sanh','So sánh ESC–AHA','53 chủ đề, lọc theo mức khác biệt'],['#/tp/dapt','Sau PCI','Thời điểm mổ và ngưng kháng tiểu cầu'],['#/tp/khang-dong','Kháng đông','Lịch ngưng DOAC/VKA'],['#/tp/troponin','Troponin sau mổ','Phân loại PMI/MINS từng bước']].map(t=>`<a class="tile" href="${t[0]}"><b>${t[1]}</b><span>${t[2]}</span></a>`).join('')}</div></section>
   <section class="hub tk"><span class="eyebrow col-preg">Thai kỳ</span><h2>Tim mạch và thai kỳ</h2><p class="small">${C('ESC25','','4462–4568')}</p>
    <div class="tiles">${[['#/tk/mwho','mWHO 2.0','Nhóm nguy cơ, CARPREG II, nơi sinh'],['#/tk/cap-cuu','Cấp cứu','9 thuật toán'],['#/tk/thuoc','Thuốc','Thai kỳ và cho con bú'],['#/tk/van-co-hoc','Van cơ học','VKA/LMWH theo quý, liều LMWH'],['#/tk/dong-mach-chu','Động mạch chủ','Ngưỡng mổ và cách sinh'],['#/tk/tha','THA & tiền sản giật','Phân loại, aspirin, thời điểm sinh']].map(t=>`<a class="tile" href="${t[0]}"><b>${t[1]}</b><span>${t[2]}</span></a>`).join('')}</div></section>
   <section class="hub tha"><span class="eyebrow col-tha">Tăng huyết áp</span><h2>Chẩn đoán và quản lý THA</h2><p class="small">${C('VSH26','','1–146')}</p>
    <div class="tiles">${[['#/tha/tro-ly','Trợ lý THA','Phân độ, nguy cơ, mục tiêu, phác đồ'],['#/tha/chan-doan','Chẩn đoán & kiểu hình','Áo choàng trắng, ẩn giấu, THA thứ phát'],['#/tha/ke-don','Kê đơn & phối hợp','Kiểm tra phối hợp cấm'],['#/tha/khang-tri','THA kháng trị','Thuốc thứ 4–6 theo eGFR'],['#/tha/cap-cuu','THA cấp cứu','Mục tiêu và liều truyền'],['#/tha/dong-mac','Bệnh đồng mắc','ĐTĐ, thận, mạch vành, đột quỵ…']].map(t=>`<a class="tile" href="${t[0]}"><b>${t[1]}</b><span>${t[2]}</span></a>`).join('')}</div></section>
  </div>
  <div class="callout neutral"><p><b>Chỉ dùng để học tập.</b> App tóm tắt khuyến cáo đã công bố, chưa được thẩm định cho sử dụng lâm sàng. Luôn đối chiếu văn bản gốc. Bản ACC/AHA 2026 có nội dung giống hệt bản 2024.</p></div>`;
}};

/* Chỉ mục tìm kiếm chung */
function index(){
  const out=[];
  PR.forEach(r=>out.push({g:'ESC25',where:'Rec. '+r[0]+' · '+PT[r[0]][0],t:r[2],c:r[3],l:r[4],cite:['ESC25','Rec. '+r[0],PT[r[0]][1]],href:'#/tk/khuyen-cao?t='+r[0]}));
  TR.forEach(r=>out.push({g:'VSH26',where:'Bảng '+r[0]+' · '+THT[r[0]][0],t:r[1],c:r[2],l:r[3],cite:['VSH26','Bảng '+r[0],THT[r[0]][1]],href:'#/tha/khuyen-cao?t='+r[0]}));
  M.forEach(row=>{const s=SRC[row.t]||{e:[],a:[]};
    row.e.forEach(r=>out.push({g:'ESC22',where:row.t,t:r[0],c:r[1],l:r[2]||'',cite:s.e[0],href:'#/tp/so-sanh'}));
    row.a.forEach(r=>out.push({g:'AHA26',where:row.t,t:r[0],c:r[1],l:r[2]||'',cite:s.a[0],href:'#/tp/so-sanh'}));});
  return out;
}
PAGES['/tim']={title:'Tìm khuyến cáo',render(m){
  const IDX=index();
  m.innerHTML=head('Tìm trong bốn guideline','Tìm khuyến cáo',`${IDX.length} mục từ ESC 2022, ACC/AHA 2026, ESC 2025 và VSH/VNHA 2026. Gõ từ khóa tiếng Việt hoặc tên thuốc.`)+
  `<div class="filters"><input type="search" id="s-q" placeholder="Ví dụ: aspirin, SGLT2, hẹp hai lá, Marfan" aria-label="Từ khóa" autofocus>
   <select id="s-g" aria-label="Guideline"><option value="">Mọi guideline</option><option value="ESC22">ESC 2022 (tiền phẫu)</option><option value="AHA26">ACC/AHA 2026 (tiền phẫu)</option><option value="ESC25">ESC 2025 (thai kỳ)</option><option value="VSH26">VSH/VNHA 2026 (THA)</option></select>
   <select id="s-c" aria-label="Class"><option value="">Mọi class</option><option value="1">Class I / 1</option><option value="2a">IIa / 2a</option><option value="2b">IIb / 2b</option><option value="3">III / 3</option></select><span class="note" id="s-n"></span></div><div id="s-list" class="stack"></div>`;
  const norm=c=>({I:'1',IIa:'2a',IIb:'2b',III:'3','3N':'3','3H':'3'}[c]||c);
  const draw=()=>{const qq=$('s-q').value.trim().toLowerCase(),g=$('s-g').value,c=$('s-c').value;
    let rs=IDX.filter(x=>(!g||x.g===g)&&(!c||norm(x.c)===c)&&(!qq||(x.t+' '+x.where).toLowerCase().includes(qq)));
    $('s-n').textContent=`${rs.length} kết quả`;rs=rs.slice(0,150);
    $('s-list').innerHTML=rs.map(x=>`<div class="recrow"><div class="meta"><span class="who ${REFS[x.g].cls}">${REFS[x.g].short}</span><a href="${x.href}">${x.where}</a></div>${recLine([x.t,x.c,x.l])}<div class="srcline">${x.cite?C(...x.cite):''}</div></div>`).join('')};
  $('s-q').oninput=draw;$('s-g').onchange=draw;$('s-c').onchange=draw;draw();
}};

PAGES['/nguon']={title:'Nguồn',render(m){
  m.innerHTML=head('Tài liệu gốc','Nguồn và cách trích dẫn','Số trang trong nút trích dẫn là số trang tạp chí in (riêng VSH/VNHA 2026 là số trang in của tài liệu). “Rec. n” là Recommendation Table số n; “§” là mục; “Hình”, “Bảng” là Figure, Table của văn bản gốc.')+
  `<div class="stack">${Object.entries(REFS).map(([k,r])=>`<div class="panel stack"><span class="who ${r.cls}" style="align-self:flex-start">${r.short}</span><p>${r.full}</p><p class="note">${r.note}</p>${r.doi?`<p><a href="https://doi.org/${r.doi}" target="_blank" rel="noopener">doi:${r.doi}</a></p>`:''}</div>`).join('')}
  <div class="panel stack"><h3>Lưu ý ngoài các văn bản trên</h3><p class="small">GLP-1 RA: hướng dẫn đa hội năm 2024 (ASA, AGA, ASMBS, ISPOR, SAGES) đã nới lỏng so với đồng thuận ASA 2023 mà ACC/AHA dẫn; thống nhất với khoa gây mê tại bệnh viện.</p></div></div>`;
}};
PAGES['/gioi-thieu']={title:'Giới thiệu',render(m){
  m.innerHTML=head('Về app','Giới thiệu','Hội Chẩn Tim là phiên bản tiếng Việt, lấy cảm hứng từ cách trình bày của gdmt.org, cardioob.org và troponin.org: lộ trình theo bước, công cụ tương tác, và trích dẫn ở mọi khuyến cáo.')+
  `<div class="panel stack small"><p><b>Nội dung.</b> Khuyến cáo được dịch tóm lược sát nghĩa từ văn bản gốc. Class và mức bằng chứng giữ nguyên. Các ô “Thực hành” hoặc “Gợi ý tổng hợp” là phần diễn giải của app và được ghi rõ.</p>
  <p><b>Giới hạn.</b> Chưa có bác sĩ thẩm định độc lập. Một số giá trị (tần suất biến cố theo CARPREG II trong từng nhóm mWHO) được đọc gần đúng từ biểu đồ. Bảng thuốc chi tiết (Supplementary Table S2) không có trong bản PDF chính.</p>
  <p><b>Dữ liệu cá nhân.</b> Thông tin nhập vào các công cụ chỉ lưu trên trình duyệt của bạn (localStorage), không gửi đi đâu.</p>
  <p><b>Không liên kết</b> hay được bảo trợ bởi ESC, ACC, AHA hay các website tham khảo.</p></div>`;
}};
startApp();
})();

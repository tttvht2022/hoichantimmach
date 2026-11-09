/* Tài liệu gốc. Mọi trích dẫn trong app trỏ về một khóa ở đây.
   pdf.off: trang PDF = trang in + off (để mở đúng trang trong file PDF người dùng tự nạp). */
window.REFS = {
  ESC22: {
    pdf: { off: -3825, pages: 99 },
    short: 'ESC 2022', cls: 'esc',
    full: 'Halvorsen S, Mehilli J, Cassese S, et al. 2022 ESC Guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery. Eur Heart J. 2022;43(39):3826–3924.',
    doi: '10.1093/eurheartj/ehac270',
    note: 'Số trang là số trang tạp chí (3826–3924).'
  },
  AHA26: {
    pdf: { off: -412, pages: 92 },
    short: 'ACC/AHA 2026', cls: 'aha',
    full: 'Thompson A, Fleischmann KE, Smilowitz NR, et al. 2026 AHA/ACC/ACS/ASNC/HRS/SCA/SCCT/SCMR/SVM Guideline for Perioperative Cardiovascular Management for Noncardiac Surgery. Circulation. 2026;154:e413–e504.',
    doi: '10.1161/CIR.0000000000001472',
    note: 'Nội dung đồng nhất với bản 2024 (Circulation 2024;150:e351–e442). Ủy ban giám sát rà soát bằng chứng đến 3/2026, không thay đổi khuyến cáo.'
  },
  ESC25: {
    pdf: { off: -4461, pages: 107 },
    short: 'ESC 2025', cls: 'preg',
    full: 'De Backer J, Haugaa KH, Hasselberg NE, et al. 2025 ESC Guidelines for the management of cardiovascular disease and pregnancy. Eur Heart J. 2025;46:4462–4568.',
    doi: '10.1093/eurheartj/ehaf193',
    note: 'Số trang là số trang tạp chí (4462–4568).'
  },
  ESGE21: {
    short: 'ESGE/BSG 2021', cls: 'esc',
    full: 'Veitch AM, Radaelli F, Alikhan R, et al. Endoscopy in patients on antiplatelet or anticoagulant therapy: British Society of Gastroenterology (BSG) and European Society of Gastrointestinal Endoscopy (ESGE) guideline update. Gut. 2021;70:1611–1628.',
    doi: '10.1136/gutjnl-2021-325184',
    note: 'Nguồn ngoài ba guideline chính; dùng cho nội soi tiêu hóa.'
  },
  VSH26: {
    pdf: { off: 18, pages: 272 },
    short: 'VSH/VNHA 2026', cls: 'tha',
    full: 'Hội Tim mạch học Việt Nam – Phân hội Tăng huyết áp Việt Nam (VSH/VNHA). Khuyến cáo về chẩn đoán và quản lý tăng huyết áp 2026 (bản đầy đủ). Chủ biên: Huỳnh Văn Minh; đồng chủ biên: Trần Văn Huy, Nguyễn Lân Việt, Châu Ngọc Hoa.',
    doi: '',
    note: 'Số trang là số trang in của tài liệu (phần chính tr. 1–146, phụ lục tr. 147–254). Class I/IIa/IIb/III, mức bằng chứng A, B-R, B-NR, C-LD, C-EO (Bảng PL1–PL2).'
  },
  CARPREG: {
    short: 'CARPREG II', cls: 'preg',
    full: 'Silversides CK, Grewal J, Mason J, et al. Pregnancy outcomes in women with heart disease: the CARPREG II study. J Am Coll Cardiol. 2018;71:2419–2430.',
    doi: '10.1016/j.jacc.2018.02.076',
    note: 'Nghiên cứu gốc của thang điểm CARPREG II được ESC 2025 tích hợp trong Bảng 6.'
  }
};

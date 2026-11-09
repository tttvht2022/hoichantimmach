# Hội Chẩn Tim

Sổ tay hội chẩn tim mạch tiếng Việt, có tương tác:

- **Tiền phẫu**: ESC 2022 và ACC/AHA 2026 (lộ trình, trợ lý hội chẩn, so sánh 53 chủ đề, sau PCI, kháng đông, thuốc, phân loại troponin sau mổ, ca lâm sàng).
- **Tăng huyết áp**: Khuyến cáo VSH/VNHA 2026 (lộ trình 5Đ, trợ lý THA: phân độ → nguy cơ Hình 7.2 → khởi trị → mục tiêu → phác đồ Hình 10.2; chẩn đoán và kiểu hình; kiểm tra phối hợp thuốc; THA kháng trị; THA cấp cứu kèm liều truyền theo cân nặng; bệnh đồng mắc; đối tượng đặc biệt; lối sống; liều thuốc; 266 khuyến cáo).
- **Tim mạch – Thai kỳ**: ESC 2025 (mWHO 2.0 + CARPREG II, 9 thuật toán cấp cứu, thuốc thai kỳ/cho bú, van cơ học + liều LMWH, động mạch chủ, THA/tiền sản giật, kế hoạch sinh, hậu sản, 204 khuyến cáo).

Mọi khuyến cáo có class, mức bằng chứng và nút trích dẫn (tên guideline, bảng/hình/mục, số trang tạp chí, DOI).

Chỉ dùng cho học tập; chưa được thẩm định để dùng lâm sàng.

---

## Xem thử trên máy

Mở file `index.html` bằng trình duyệt (bấm đúp). App chạy được ngay, không cần cài gì.

## Đưa lên Vercel (link dạng `ten-app.vercel.app`)

App là trang tĩnh (HTML, CSS, JS), không cần build. Có hai cách.

### Cách 1: qua GitHub, không cần cài phần mềm (khuyên dùng)

1. Đăng nhập **github.com** → nút **New** (tạo repository) → đặt tên, ví dụ `hoichantim` → **Create repository**.
2. Trong repo mới, bấm **uploading an existing file** → kéo **toàn bộ nội dung** thư mục `timmach-vn` (gồm `index.html`, `vercel.json`, `README.md` và 3 thư mục `assets`, `data`, `pages`) vào → **Commit changes**.
   - Kéo các file và thư mục bên trong, không kéo chính thư mục `timmach-vn`, để `index.html` nằm ở gốc repo.
3. Đăng nhập **vercel.com** bằng tài khoản GitHub → **Add New… → Project** → chọn repo `hoichantim` → **Import**.
4. Ở màn hình cấu hình: **Framework Preset = Other**, để trống Build Command và Output Directory → **Deploy**.
5. Sau khoảng 30 giây, Vercel cho link `https://hoichantim.vercel.app` (hoặc tên tương tự). Đổi tên miền con trong **Settings → Domains** nếu muốn.

Từ đó, mỗi lần sửa file trên GitHub (bấm biểu tượng bút chì → Commit), Vercel tự cập nhật trang.

### Cách 2: dùng Vercel CLI (cần Node.js)

```bash
cd timmach-vn
npx vercel          # lần đầu: đăng nhập, trả lời các câu hỏi, chọn "Other"
npx vercel --prod   # đưa bản chính thức lên
```

## Cấu trúc

```
index.html          khung trang, thứ tự nạp script
vercel.json         header bảo mật cơ bản
assets/style.css    giao diện (sáng/tối, cỡ chữ)
assets/core.js      router (#/…), trích dẫn, modal, cài đặt
data/refs.js        6 tài liệu gốc (DOI, ghi chú)
data/periop.js      dữ liệu tiền phẫu + bản đồ trích dẫn từng chủ đề
data/tha.js         khuyến cáo VSH/VNHA 2026 (mảng TR), Hình 7.2, Bảng 4.2, 10.5, 10.7, 13.1, 16.2, Hình 16.1, Bảng PL5
data/preg.js        204 khuyến cáo ESC 2025, Bảng 6 mWHO 2.0, Hình 6 thuốc, Bảng 11 LMWH, Bảng 15
pages/periop.js     các trang Tiền phẫu
pages/preg.js       các trang Thai kỳ
pages/tha.js        các trang Tăng huyết áp
pages/common.js     trang chủ, tìm kiếm, nguồn, giới thiệu
```

## Sửa nội dung

- Thêm hoặc sửa một khuyến cáo thai kỳ: một dòng trong mảng `PR` ở `data/preg.js`, dạng
  `[số bảng, 'nhóm', 'nội dung', 'class', 'level']`.
- Thêm hoặc sửa một khuyến cáo THA: một dòng trong mảng `TR` ở `data/tha.js`, dạng `['số bảng', 'nội dung', 'class', 'level']`.
- Thêm trích dẫn ở bất kỳ đâu: gọi `C('ESC25','Hình 6','4494')` (khóa tài liệu, vị trí, trang).
- Thêm tài liệu mới: thêm một khóa trong `data/refs.js`.

## Nguồn

1. Halvorsen S, et al. 2022 ESC Guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery. Eur Heart J 2022;43:3826–3924. doi:10.1093/eurheartj/ehac270
2. Thompson A, et al. 2026 AHA/ACC/ACS/ASNC/HRS/SCA/SCCT/SCMR/SVM Guideline for Perioperative Cardiovascular Management for Noncardiac Surgery. Circulation 2026;154:e413–e504. doi:10.1161/CIR.0000000000001472
3. De Backer J, Haugaa KH, et al. 2025 ESC Guidelines for the management of cardiovascular disease and pregnancy. Eur Heart J 2025;46:4462–4568. doi:10.1093/eurheartj/ehaf193
4. Veitch AM, et al. BSG/ESGE guideline update: endoscopy in patients on antiplatelet or anticoagulant therapy. Gut 2021;70:1611–1628.
5. Hội Tim mạch học Việt Nam – Phân hội THA Việt Nam (VSH/VNHA). Khuyến cáo về chẩn đoán và quản lý tăng huyết áp 2026 (bản đầy đủ).
6. Silversides CK, et al. CARPREG II. J Am Coll Cardiol 2018;71:2419–2430.

Không liên kết hay được bảo trợ bởi ESC, ACC, AHA, gdmt.org, cardioob.org hay troponin.org.

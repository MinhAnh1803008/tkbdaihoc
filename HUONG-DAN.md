# Đưa Thời Khóa Biểu thành app điện thoại (PWA)

## Gói này gồm
- `index.html` – trang chính (đã thêm: sao lưu/khôi phục, xuất lịch .ics, chạy offline)
- `manifest.json` – khai báo tên, biểu tượng, màu cho app
- `sw.js` – service worker: lưu trang vào máy để mở được khi mất mạng
- `icons/` – biểu tượng app (192, 512, maskable, iPhone)
- `vendor/xlsx.full.min.js` – thư viện đọc Excel, lưu sẵn trong máy

## Bước 1 – Sao lưu dữ liệu hiện có (làm TRƯỚC khi chuyển)
Dữ liệu (ghi chú, dấu tích, sự kiện) nằm trong trình duyệt theo từng địa chỉ web, nên trang mới sẽ trống.
Trên trang đang dùng: bấm **Sao lưu · Nhắc nhở → Tạo bản sao lưu → Sao chép**, rồi dán vào nơi bạn cất được (ghi chú điện thoại, tin nhắn cho chính mình...).

## Bước 2 – Đưa lên GitHub Pages
1. Vào github.com → **New repository** → đặt tên `thoikhoabieu` → chọn **Public** → Create.
2. Bấm **uploading an existing file**, kéo thả TOÀN BỘ nội dung gói này (index.html, manifest.json, sw.js, thư mục icons, thư mục vendor) → **Commit changes**.
3. **Settings → Pages →** Source: *Deploy from a branch* → Branch: `main`, thư mục `/ (root)` → Save.
4. Chờ 1–2 phút. Link sẽ là `https://<tên-github-của-bạn>.github.io/thoikhoabieu/`.

## Bước 3 – Cài lên điện thoại
- **Android (Chrome):** mở link → menu ⋮ → **Cài đặt ứng dụng** (hoặc *Thêm vào màn hình chính*).
- **iPhone:** mở link bằng **Safari** (không dùng Chrome) → nút Chia sẻ → **Thêm vào MH chính** → Thêm.

## Bước 4 – Khôi phục dữ liệu
M�� app vừa cài → **Sao lưu · Nhắc nhở** → dán bản sao lưu vào ô → **Khôi phục từ ô trên** (bấm hai lần để xác nhận).

## Bước 5 – Nhắc nhở qua app Lịch
1. Trong app: **Sao lưu · Nhắc nhở** → chọn nhắc trước 10/30/60 phút → **Tải file .ics**.
2. Android: mở file vừa tải, chọn Google Calendar để nhập. Nếu không mở được, vào calendar.google.com trên máy tính → Cài đặt → *Nhập & xuất* → chọn file; điện thoại sẽ tự đồng bộ.
   iPhone: mở file từ app Tệp → **Thêm tất cả** → chọn lịch.
3. Nên nhập vào **một lịch riêng** (ví dụ "Thời khóa biểu") để sau này muốn làm mới chỉ cần xóa lịch đó rồi nhập lại, tránh trùng lặp.
4. Nếu không nhận được nhắc, có thể app Lịch đã bỏ qua lời nhắc trong file: vào cài đặt thông báo của lịch đó và thêm nhắc mặc định (ví dụ 30 phút).

Lưu ý: file .ics là **bản chụp** tại thời điểm xuất. Sửa lịch trong app thì cần xuất lại.

## Thử offline
M�� app một lần khi có mạng → đóng hẳn → bật chế độ máy bay → mở lại. App vẫn phải lên được.

## Cập nhật trang sau này
Khi sửa `index.html`, mở `sw.js` và tăng số phiên bản (`const VER='tkb-v1'` → `'tkb-v2'`), rồi tải lại cả hai file lên GitHub. Trên điện thoại, mở app **hai lần** là thấy bản mới.

## Giới hạn cần biết
- Hai thiết bị lưu dữ liệu **riêng**; chuyển qua lại bằng sao lưu/khôi phục.
- Ảnh nền không nằm trong bản sao lưu.
- Nút "Câu khác" ngoài Claude chỉ rút danh ngôn có sẵn (không gọi được AI).
- Nhắc nhở khi app đóng chỉ có qua app Lịch; muốn nhắc ngay trong app cần đóng thành app thật (Capacitor), là bước làm sau.

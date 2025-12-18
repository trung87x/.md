# T3-11 — React DevTools Performance Tab

> Mục tiêu: Sử dụng **React DevTools Profiler** (Performance tab) để **ghi**, **đọc** và **phân tích** re-render, xác định “điểm nóng” và nguyên nhân render.

---

## 1) Bắt đầu ghi (Record)
1. Mở ứng dụng ở chế độ dev, bật **React DevTools** trong trình duyệt.
2. Vào tab **Profiler / Performance** của React DevTools (khác với Chrome Performance).
3. Nhấn **Start profiling** → thực hiện thao tác (gõ, click, điều hướng) → nhấn **Stop** để xem kết quả.

> Lưu ý: Chỉ đo phần **React tree**, không đo JS/Network toàn cục như Chrome Performance.

---

## 2) Đọc kết quả: các chế độ hiển thị
- **Flamegraph**: Cột cao = **thời gian render**. Màu đậm = tốn kém.
- **Ranked**: Xếp hạng component theo **thời gian render** (dễ tìm “điểm nóng”).
- **Commit selector**: Mỗi commit (lần cập nhật DOM) có **timestamp** và **tổng chi phí**.
- **Component chart**: Chọn 1 component để xem lịch sử render qua nhiều commit.

---

## 3) Chỉ số quan trọng
- **Actual duration**: thời gian render **thực tế** cho subtree.
- **Render count**: số lần component render trong khoảng đo.
- **Self time**: thời gian riêng của component (không tính con) — hữu ích khi con quá nặng.
- **Why did this render?** (nếu bật setting) → cho biết **props/state nào thay đổi**.

---

## 4) Tìm nguyên nhân render thừa
- Cha render kéo theo con → dùng **React.memo** ở con **ít đổi**.
- Props đổi tham chiếu (object/array/function literal) → ổn định bằng **useMemo/useCallback**.
- Context provider không memo `value` → **memo hóa value** hoặc **split context**.
- Sự kiện “dày đặc” (scroll, input) cập nhật state liên tục → **debounce/throttle**.

---

## 5) Quy trình điều tra gợi ý (playbook 5 bước)
1) **Record** thao tác gây chậm.  
2) Flamegraph/Ranked → khoanh vùng **component nặng**.  
3) Xem **Why did this render?** → props/state nào đổi.  
4) Áp dụng tối ưu (memo, colocation, split context, virtualization).  
5) **Record lại** để xác nhận cải thiện (so sánh các commit).

---

## 6) Mẹo/Setting hữu ích
- Bật **“Highlight updates when components render”** để thấy vùng nào render (Settings → General).
- Dùng **“Hide commits below … ms”** để lọc ra commit đáng chú ý.
- So sánh **trước/sau** khi bật `React.memo` hoặc `useMemo`.
- Tránh đo khi bật **Hot Reload** quá nhiều (nhiễu).

---

## 7) Mini demo (ý tưởng thao tác)
1. Tạo list 5k phần tử, gõ nhanh trong ô input.  
2. Record → thấy `List` và item render liên tục.  
3. Thêm **`useDeferredValue`** hoặc **virtualize** → Record lại để thấy thời gian commit giảm.

---

## 8) Checklist
- [ ] Ghi đúng lúc thao tác chậm.
- [ ] Đọc Flamegraph/Ranked để khoanh vùng điểm nóng.
- [ ] Hỏi “vì sao render?” bằng Why-did-this-render.
- [ ] Tối ưu có chủ đích rồi đo lại.
- [ ] Đừng nhầm Chrome Performance với React Profiler (hai công cụ khác nhau).

---

## 9) Bài tập
1. Dùng Profiler đo màn hình tìm kiếm (lọc danh sách 10k); log lại top 3 component tốn thời gian nhất.
2. Áp dụng `React.memo` + `useCallback` cho con; đo lại để thấy **Actual duration** giảm.
3. Memo hóa `Context value` và so sánh số commit trước/sau.
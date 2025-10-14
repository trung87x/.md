# T3-14 — Rerender Debugging Checklist

> Mục tiêu: Có **quy trình chuẩn** để tìm nguyên nhân re-render thừa và khắc phục từng bước.

---

## 1) Bước 0 — Tái hiện & đo
- Xác định thao tác chậm (gõ, scroll, mở modal, chuyển tab…).
- Dùng **React DevTools Profiler** (T3-11) để **Record** → chọn commit tốn thời gian.

---

## 2) Bước 1 — Vì sao component này render?
- Bật “**Why did this render?**” trong DevTools.
- Kiểm tra **props nào đổi**, **state nào đổi**, **context nào đổi**.

---

## 3) Bước 2 — Tách ranh giới render
- Tách component to thành phần **ít đổi** (memo) và **hay đổi**.
- Bọc phần ít đổi bằng `React.memo`.

---

## 4) Bước 3 — Ổn định props
- Tránh **object/array/function literal** trong JSX.
- Dùng `useMemo`/`useCallback` để ổn định props truyền xuống con memo.

---

## 5) Bước 4 — Context hygiene
- Memo hóa `value` của provider.
- Split context nếu có nhóm dữ liệu độc lập.
- Với dữ liệu lớn/nhạy cảm hiệu năng → dùng selector/context alternatives.

---

## 6) Bước 5 — Colocation state
- Đặt state **gần nơi tiêu thụ** nhất để không kéo theo subtree khác render.

---

## 7) Bước 6 — Deferred/Transition
- Với cập nhật nặng → bọc trong `startTransition`.
- Với input → dùng `useDeferredValue` cho danh sách tốn kém.

---

## 8) Bước 7 — Virtualize & debounce
- List lớn → **virtualize**.
- Sự kiện dày đặc → **debounce/throttle**.

---

## 9) Bước 8 — Kiểm tra key & reconciliation
- Đảm bảo **key ổn định** trong danh sách.
- Tránh `key=index` khi thêm/xoá/sắp xếp.

---

## 10) Bước 9 — Kiểm tra Strict Mode / render đôi
- Nhớ rằng dev có thể render nhiều lần; kiểm tra logic **idempotent**.

---

## 11) Bước 10 — Đo lại & viết PR note
- Record lại để xác thực cải thiện → chụp số liệu `actualDuration`/commit.
- Ghi rõ thay đổi (memo, colocation, split context, lazy…) và tác động.

---

## 12) Bộ câu hỏi chẩn đoán nhanh
- Component này **có cần** render lại không? Props/state nào bắt buộc?
- Có **object/array/function** nào luôn tạo mới?
- Có thể **colocate state**/split context?
- Có **React.memo** đúng chỗ chưa?
- Input có lag? → thử **useDeferredValue**.
- List nặng? → **virtualize**.

---

## 13) Bài tập
1. Áp dụng checklist cho màn hình Search (lọc 5k item); ghi lại top 3 tối ưu bạn làm.
2. Trình bày diff/PR mô tả trước-sau (số lần render, actualDuration).
3. Đánh giá tác động người dùng (input mượt hơn bao nhiêu ms).
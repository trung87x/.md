# T2-19 — Effect Anti‑Patterns (Những thói quen cần tránh)

> Mục tiêu: Nhận diện và thay thế **anti‑patterns** phổ biến khiến app chậm, lỗi loop, stale data, khó debug.

---

## 1) Dùng effect để tính **derived data**
**Anti‑pattern:** 
```jsx
useEffect(() => setFullName(first + " " + last), [first, last]);
```
**Đúng:**
```jsx
const fullName = useMemo(() => first + " " + last, [first, last]);
```

---

## 2) Đưa **literal mới** vào deps
**Anti‑pattern:**
```jsx
useEffect(() => { fetchList({ page, size: 20 }); }, [{ page, size: 20 }]);
```
**Đúng:**
```jsx
const opts = useMemo(() => ({ page, size: 20 }), [page]);
useEffect(() => { fetchList(opts); }, [opts]);
```

---

## 3) `async` trực tiếp trên callback effect
**Anti‑pattern:**
```jsx
useEffect(async () => { ... }, []);
```
**Đúng:** tạo IIFE async + cleanup/AbortController. (Xem T2‑14)

---

## 4) Effect “làm tất cả mọi thứ”
- Gom fetch, event, timer… vào **một** effect → deps phình to, khó guard.
**Giải pháp:** **Chia nhỏ** theo mục đích (T2‑12).

---

## 5) Bỏ qua ESLint Hooks
- Vô hiệu hóa `exhaustive-deps` bừa bãi → stale/loop.
**Giải pháp:** thêm deps chính xác hoặc ổn định hoá dữ liệu (T2‑07).

---

## 6) Dùng effect để **đồng bộ state ↔ props** vô cớ
**Anti‑pattern:**
```jsx
const [value, setValue] = useState(props.value);
useEffect(() => setValue(props.value), [props.value]);
```
- Dễ gây **loop** và “hai nguồn sự thật”.
**Giải pháp:** 
- Nếu chỉ **đọc**: dùng trực tiếp `props.value`.
- Nếu cần **editable**: quản lý controlled/controlled‑ish rõ ràng, hoặc dùng `useMemo`/`useDerivedState` riêng (có guard/intent).

---

## 7) SetState trong effect **không có guard**
**Anti‑pattern:**
```jsx
useEffect(() => { setOpen(true); }, [open]); // loop
```
**Đúng:**
```jsx
useEffect(() => { if (!open) setOpen(true); }, [open]);
```

---

## 8) Dùng effect để **đồng bộ DOM layout** muộn
- Đo DOM trong `useEffect` → flicker.
**Giải pháp:** `useLayoutEffect` khi cần đồng bộ trước paint (T2‑08).

---

## 9) “Trợn mắt” với **JSON.stringify** trong deps
**Anti‑pattern:**
```jsx
useEffect(() => { ... }, [JSON.stringify(filters)]);
```
**Vấn đề:** tốn CPU, ẩn lỗi, không ổn định.
**Giải pháp:** ổn định `filters` bằng `useMemo` hoặc cấu trúc lại dữ liệu/deps.

---

## 10) Không cleanup Subscription/Timer
- Rò rỉ listener, interval.
**Giải pháp:** luôn `return () => cleanup()`; dùng pattern proxy handler (T2‑15).

---

## 11) Lạm dụng effect cho **log/debug** trong prod
- Console spam, ảnh hưởng hiệu năng.
**Giải pháp:** feature flag / chỉ chạy ở dev.

---

## 12) Không xử lý **race condition**
- Gõ nhanh → kết quả cũ ghi đè mới.
**Giải pháp:** `AbortController`, requestId, hoặc flag `alive`. (T2‑14)

---

## 13) Checklist thay thế nhanh
- [ ] Derived data → `useMemo`.
- [ ] Object/array/function trong deps → ổn định bằng `useMemo`/`useCallback`.
- [ ] Async fetch → IIFE + Abort.
- [ ] Tách effects theo mục đích, guard rõ ràng.
- [ ] Bật ESLint hooks.
- [ ] Layout sync → `useLayoutEffect`.
- [ ] Cleanup đầy đủ (timer/subscription).
- [ ] Tránh `JSON.stringify` deps.

---

## 14) Bài tập
1. Refactor component có 1 effect “all‑in‑one” sang 3 effects + memo hoá deps, đo lại render.
2. Loại bỏ mọi `JSON.stringify` deps bằng cách ổn định cấu trúc dữ liệu.
3. Viết PR description giải thích 5 anti‑patterns bạn sửa và lợi ích đo bằng profiler.
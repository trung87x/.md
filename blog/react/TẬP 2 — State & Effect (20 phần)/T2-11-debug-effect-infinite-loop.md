# T2-11 — Debug Effect Infinite Loop

> Mục tiêu: Nhận diện **nguyên nhân vòng lặp vô hạn** khi dùng `useEffect`, cách **tái cấu trúc** để chặn loop và **quy trình debug** chuẩn.

---

## 1) Vì sao bị loop?
`useEffect(fn, [deps])` chạy lại **mỗi lần deps đổi**. Nếu bên trong effect bạn **setState** tạo ra **một giá trị deps mới** → effect lại chạy → **vòng lặp**.

### Ca điển hình
```jsx
// ❌ setState tạo object mới mỗi lần → deps [filters] luôn đổi
const [filters, setFilters] = useState({ q: "" });

useEffect(() => {
  setFilters({ ...filters, appliedAt: Date.now() }); // đổi reference
}, [filters]);
```

---

## 2) Các nguyên nhân phổ biến & cách sửa

### 2.1. Đặt state “derived” trong effect
- Triệu chứng: `setDerived(...)` trong effect dựa trên props/state.
- Cách sửa: **tính trực tiếp bằng `useMemo`** (không cần state phụ).
```jsx
const derived = useMemo(() => compute(props.data), [props.data]);
```

### 2.2. Tạo **object/array/function** mới trong render rồi đưa vào deps
- Triệu chứng: `useEffect(..., [options])` nhưng `options` là `{}` tạo mới mỗi render.
- Cách sửa: **memo hoá**.
```jsx
const options = useMemo(() => ({ page, pageSize }), [page, pageSize]);
useEffect(() => { fetchList(options); }, [options]); // ✅
```

### 2.3. Gọi `setState` không có guard
- Triệu chứng: setState mỗi lần effect chạy.
- Cách sửa: **guard logic**.
```jsx
useEffect(() => {
  if (status !== "idle") return;
  setStatus("loading");
}, [status]);
```

### 2.4. Thiếu/Thừa deps (ESLint hooks cảnh báo)
- Sửa theo rule **`react-hooks/exhaustive-deps`** hoặc ổn định hoá bằng `useCallback`/`useMemo`.

### 2.5. StrictMode “double invoke” (dev)
- Dev có vòng **mount → unmount → mount lại** để phát hiện side-effect. Nếu effect có hành vi **không idempotent**, bạn *tưởng* bị loop.
- Cách sửa: đảm bảo **cleanup chuẩn**, logic **idempotent**, hoặc tạm tắt StrictMode khi kiểm tra.

---

## 3) Quy trình debug 5 bước
1) **Console log** deps & payload trong effect/cleanup:
```jsx
useEffect(() => {
  console.log("effect", { a, b });
  return () => console.log("cleanup", { a, b });
}, [a, b]);
```
2) Kiểm tra **deps có đổi ngoài ý muốn** (object/array/function).
3) Nếu setState trong effect → tự hỏi: *có thể là derived?* Nếu phải set, hãy **guard** điều kiện.
4) Bật **React DevTools → Profiler**, xem component nào render lặp lại.
5) **Thu nhỏ bề mặt deps** bằng `useMemo`/`useCallback` hoặc dùng **ref pattern** khi cần.

---

## 4) Mẫu sửa lỗi thực tế

### 4.1. Fetch theo query có debounce
```jsx
const q = useDebouncedValue(query, 300);
useEffect(() => {
  let alive = true;
  (async () => {
    const res = await api.search(q);
    if (alive) setData(res);
  })();
  return () => { alive = false; };
}, [q]); // ✅ deps nhỏ gọn, có cancel
```

### 4.2. Đồng bộ trạng thái một lần
```jsx
useEffect(() => {
  setReady(true);
  // không phụ thuộc vào 'ready' → deps rỗng
  // nếu ESLint cảnh báo vì dùng biến nào đó, refactor để bỏ phụ thuộc
}, []);
```

### 4.3. Tránh setState “trượt” theo object mới
```jsx
const [filters, setFilters] = useState({ q: "", appliedAt: null });

const appliedAt = useMemo(() => Date.now(), []); // hoặc tính khi cần, không đưa vào state

useEffect(() => {
  // chỉ khi 'q' thay đổi mới set
  setFilters((prev) => prev.q === q ? prev : { ...prev, q });
}, [q]);
```

---

## 5) Checklist
- [ ] Không set “derived state” trong effect → dùng `useMemo`.
- [ ] Deps không chứa literal mới mỗi render.
- [ ] Có **guard** khi setState trong effect.
- [ ] Có **cleanup** đúng khi fetch/timer/subscription.
- [ ] Kiểm tra StrictMode.

---

## 6) Bài tập
1. Tái hiện bug loop bằng cách set object trong effect; sau đó sửa bằng memo hoá deps.
2. Viết `useDebouncedValue` và dùng cho fetch để tránh spam & loop.
3. Dùng Profiler tìm component render 10+ lần/giây; giải thích nguyên nhân và fix.
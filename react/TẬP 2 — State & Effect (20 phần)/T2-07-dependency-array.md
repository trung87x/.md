# T2-07 — Dependency Array Chính Xác (ESLint rules, stale closure, patterns)

> Mục tiêu: Viết `useEffect`/`useMemo`/`useCallback` với **deps đúng**, tránh **stale closure**, hiểu cách **ESLint React Hooks** kiểm tra.

---

## 1) Nguyên tắc vàng
- **Mọi giá trị được dùng bên trong callback** (props, state, hàm, ref.current đọc…) **đều là phụ thuộc**.
- Nếu không muốn đưa một giá trị vào deps, bạn phải **ổn định** nó (ví dụ `useRef`, `useCallback`, hoặc chuyển logic vào trong effect).
- Deps là **quan hệ dữ liệu**, không phải “tần suất chạy tuỳ ý”. Hãy thiết kế sao cho **deps phản ánh đúng dữ liệu mà effect phụ thuộc**.

---

## 2) Ba hooks liên quan deps
```jsx
useEffect(fn, [a, b]);
useMemo(makeValue, [a, b]);
useCallback(fn, [a, b]); // tương đương useMemo(() => fn, [a, b])
```
- Cả ba đều dùng cơ chế so sánh **shallow** giữa phần tử mảng deps.
- Nếu deps là **object/array/function mới mỗi render**, giá trị sẽ khác → effect/memo chạy lại.

---

## 3) Stale closure & cách tránh
### 3.1. Functional update
```jsx
setCount((prev) => prev + 1); // không phụ thuộc 'count' hiện tại
```
### 3.2. Ổn định handler bằng `useCallback`
```jsx
const onSave = React.useCallback(() => {
  api.save(form); // phụ thuộc 'form'
}, [form]);
```
### 3.3. Dùng `useRef` cho giá trị biến động nhưng không cần trigger render
```jsx
const latestQuery = React.useRef("");
useEffect(() => { latestQuery.current = query; }, [query]);
```
Sau đó các callback có thể đọc `latestQuery.current` mà không cần đưa toàn bộ `query` vào deps.

> Chỉ dùng pattern `ref.current` khi bạn **thật sự** cần “đọc giá trị mới nhất” nhưng không muốn effect chạy lại vì deps.

---

## 4) ESlint React Hooks (khuyến nghị bật)
- Rule **`react-hooks/exhaustive-deps`** tự động đề xuất deps đầy đủ.
- Nếu thấy cảnh báo, hãy:
  1) **Thêm deps đúng**,
  2) Hoặc **ổn định** biến/hàm bằng `useMemo`/`useCallback`,
  3) Hoặc **refactor** logic (đưa phần không cần thiết ra ngoài effect).

> Hạn chế tắt cảnh báo bằng `// eslint-disable-next-line`—chỉ dùng khi bạn nắm rõ hệ quả.

---

## 5) Các mẫu deps chuẩn

### 5.1. Fetch theo id
```jsx
useEffect(() => {
  let alive = true;
  (async () => {
    const data = await api.fetchUser(userId);
    if (alive) setUser(data);
  })();
  return () => { alive = false; };
}, [userId]); // ✅
```

### 5.2. Debounce input
```jsx
useEffect(() => {
  const id = setTimeout(() => doSearch(query), 300);
  return () => clearTimeout(id);
}, [query]); // ✅
```

### 5.3. Subscriptions với handler ổn định
```jsx
const onMsg = useCallback((e) => setLog((l) => [...l, e]), []);
useEffect(() => {
  socket.on("msg", onMsg);
  return () => socket.off("msg", onMsg);
}, [socket, onMsg]); // ✅
```

### 5.4. Tránh deps giả
```jsx
// ❌ Sai: đưa 'items.length' thay vì 'items'
useMemo(() => compute(items), [items.length]);

// ✅ Đúng: phụ thuộc thực thể 'items'
useMemo(() => compute(items), [items]);
```

---

## 6) Khi cố tình bỏ một deps?
- **Const bất biến** (module constant) → không cần.
- **Ref .current** đọc/ghi → không cần (vì ref là container ổn định).
- **Setter của useState** (`setX`) → ổn định, không cần.
- **Dispatch của useReducer** → ổn định, không cần.

> Nếu biến có thể thay đổi theo render → hầu hết trường hợp **nên** nằm trong deps.

---

## 7) Checklist
- [ ] Deps phản ánh **mọi nguồn dữ liệu** được dùng.
- [ ] Tránh stale bằng **functional update** / `useCallback` / `useRef` khi cần.
- [ ] Không dùng “thủ thuật” như `[JSON.stringify(obj)]`—tìm giải pháp ổn định nguồn dữ liệu.
- [ ] Bật ESLint hooks và **sửa cảnh báo** thay vì tắt.

---

## 8) Bài tập
1. Viết effect tải dữ liệu theo `userId` với cancel logic. Thêm console để kiểm tra cleanup chạy đúng.
2. Chuyển một component có *inline handlers* khiến con `React.memo` render lại → tối ưu bằng `useCallback` và giải thích deps.
3. Tạo custom hook `useDebouncedValue(value, delay)` đúng deps, dùng trong ô tìm kiếm.
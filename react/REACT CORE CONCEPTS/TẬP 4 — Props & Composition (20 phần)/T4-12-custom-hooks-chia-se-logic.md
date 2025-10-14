# T4-12 — Custom Hooks Chia Sẻ Logic

> Mục tiêu: Trích xuất **logic dùng lại** thành **custom hooks** với **hợp đồng (contract)** rõ ràng: đầu vào, đầu ra, side-effect, ổn định tham chiếu, và test được.

---

## 1) Khi nào tạo custom hook?
- Lặp lại effect/subscription/timer ở nhiều nơi.
- Quản lý **trạng thái phức tạp** (open/close, fetch, debounce, pagination).
- Cần **API thống nhất** cho team, che giấu chi tiết (AbortController, event listeners...).

---

## 2) Nguyên tắc thiết kế
- Tên bắt đầu bằng **`use`** để ESLint nhận diện.
- Khai báo **contract**: input là gì? output gồm những gì?
- Tự **cleanup** tài nguyên (subscription/timer/fetch).
- Ổn định **hàm trả về** bằng `useCallback`/`useMemo` khi cần.

---

## 3) Mẫu thường dùng

### 3.1. `useToggle`
```jsx
function useToggle(initial = false) {
  const [open, setOpen] = React.useState(initial);
  const on = React.useCallback(() => setOpen(true), []);
  const off = React.useCallback(() => setOpen(false), []);
  const toggle = React.useCallback(() => setOpen((v) => !v), []);
  return { open, on, off, toggle };
}
```

### 3.2. `useDebouncedValue`
```jsx
function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
```

### 3.3. `useControllableState` (bridge controlled/uncontrolled)
```jsx
function useControllableState({ value, defaultValue, onChange }) {
  const [inner, setInner] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const state = isControlled ? value : inner;
  const setState = React.useCallback((next) => {
    const v = typeof next === "function" ? next(state) : next;
    if (!isControlled) setInner(v);
    onChange?.(v);
  }, [isControlled, state, onChange]);
  return [state, setState];
}
```

### 3.4. `useFetch` (cơ bản, có hủy)
```jsx
function useFetch(url, options) {
  const [state, setState] = React.useState({ status: "idle", data: null, error: null });
  React.useEffect(() => {
    if (!url) return;
    const ac = new AbortController();
    setState({ status: "loading", data: null, error: null });
    (async () => {
      try {
        const r = await fetch(url, { signal: ac.signal, ...options });
        if (!r.ok) throw new Error(r.statusText);
        setState({ status: "success", data: await r.json(), error: null });
      } catch (e) {
        if (e.name !== "AbortError") setState({ status: "error", data: null, error: e });
      }
    })();
    return () => ac.abort();
  }, [url, options]);
  return state;
}
```

---

## 4) Ổn định tham chiếu
- Trả về **hàm** đã `useCallback` để **không đổi tham chiếu** mỗi render.
- Với giá trị **nặng** (kết quả tính toán) → `useMemo`.
- Nếu callback dài hạn cần truy cập **giá trị mới nhất** → `useRef` + pattern `useLatest`.

```jsx
function useLatest(value) {
  const ref = React.useRef(value);
  React.useEffect(() => { ref.current = value; }, [value]);
  return ref;
}
```

---

## 5) Testability
- Tách phần **thuần** (pure) ra ngoài hook để test dễ.
- Dùng **@testing-library/react** hoặc **vitest + RTL** để test lifecycle hook (mount/unmount, cleanup).

---

## 6) Anti-patterns
- Hook **làm quá nhiều** việc (fetch + event + timer) → tách nhỏ.
- Hook **âm thầm** gây side-effect ngoài hợp đồng (console, global state…).
- Không `cleanup` → rò rỉ listener/timer.

---

## 7) Mini demo (UMD)
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="app"></div>
  <script type="text/babel">
    function useToggle(initial=false){
      const [open, setOpen] = React.useState(initial);
      const toggle = React.useCallback(()=>setOpen(v=>!v),[]);
      return { open, toggle };
    }
    function App(){
      const { open, toggle } = useToggle();
      return <button onClick={toggle}>{open ? "ON" : "OFF"}</button>;
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 8) Checklist
- [ ] Tên bắt đầu bằng `use`; contract rõ ràng (input/output).
- [ ] Tự cleanup, deps chuẩn; ổn định hàm trả về.
- [ ] Không side-effect ngoài ý muốn.
- [ ] Có demo & test mẫu.

---

## 9) Bài tập
1. Viết `useDisclosure()` trả `{ open, onOpen, onClose, onToggle }`.
2. Viết `useRetryFetch(url, { retries, backoff })` dựa trên `useFetch`.
3. Tạo `useEventListener(target, type, handler)` và test cleanup bằng RTL.
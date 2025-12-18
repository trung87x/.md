# T2-18 — Custom Hook Quản Lý Effect

> Mục tiêu: Trích xuất logic effect lặp lại thành **custom hooks**: dọn dẹp, deps rõ ràng, tái sử dụng dễ dàng.

---

## 1) Vì sao trích xuất?
- Tránh lặp lại/fork logic ở nhiều component.
- Gom **resource lifecycle** (add/remove, subscribe/unsubscribe, start/stop timer) vào một nơi.
- Che giấu chi tiết triển khai, expose API gọn.

---

## 2) Mẫu chung
```jsx
function useSomething(depA, depB) {
  useEffect(() => {
    // init
    return () => {
      // cleanup
    };
  }, [depA, depB]);
}
```

---

## 3) Thư viện hooks nội bộ (ví dụ)

### 3.1. `useDebouncedValue`
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

### 3.2. `useInterval`
```jsx
function useInterval(callback, delay) {
  const saved = React.useRef(callback);
  React.useEffect(() => { saved.current = callback; }, [callback]);
  React.useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
```

### 3.3. `useEventListener`
```jsx
function useEventListener(target, type, handler, options) {
  const saved = React.useRef(handler);
  React.useEffect(() => { saved.current = handler; }, [handler]);
  React.useEffect(() => {
    const el = target && "current" in target ? target.current : target;
    if (!el) return;
    const fn = (e) => saved.current(e);
    el.addEventListener(type, fn, options);
    return () => el.removeEventListener(type, fn, options);
  }, [target, type, options]);
}
```

### 3.4. `useFetch` (cơ bản)
```jsx
function useFetch(url) {
  const [state, setState] = React.useState({ status: "idle", data: null, error: null });
  React.useEffect(() => {
    if (!url) return;
    const ac = new AbortController();
    setState({ status: "loading", data: null, error: null });
    (async () => {
      try {
        const r = await fetch(url, { signal: ac.signal });
        if (!r.ok) throw new Error(r.statusText);
        setState({ status: "success", data: await r.json(), error: null });
      } catch (e) {
        if (e.name === "AbortError") return;
        setState({ status: "error", data: null, error: e });
      }
    })();
    return () => ac.abort();
  }, [url]);
  return state;
}
```

---

## 4) Tổ chức & đặt tên
- `useXxx` để React Hooks Lint nhận diện.
- Input rõ ràng, return rõ ràng (object có `data/error/status` hoặc giá trị đơn).
- **Không side-effect ngoài ý muốn** (console/log…) trừ khi hook được thiết kế cho việc đó.

---

## 5) Test & tính ổn định
- Viết test unit (Jest/RTL) cho hook: xác nhận cleanup, deps, thời điểm cập nhật.
- Đảm bảo handler/return **ổn định** nếu cần (`useMemo`/`useCallback`).

---

## 6) Mini demo (UMD)
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
    function useDebouncedValue(value, delay = 300) {
      const [debounced, setDebounced] = React.useState(value);
      React.useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
      }, [value, delay]);
      return debounced;
    }
    function App() {
      const [q, setQ] = React.useState("");
      const dq = useDebouncedValue(q, 500);
      React.useEffect(() => { console.log("search:", dq); }, [dq]);
      return <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type to debounce" />;
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 7) Checklist
- [ ] Hook tự cleanup và deps rõ ràng.
- [ ] API tối giản, đặt tên `useXxx`.
- [ ] Tránh rò rỉ chi tiết triển khai ra ngoài.
- [ ] Viết ví dụ & test.

---

## 8) Bài tập
1. Viết `useOnline()` (navigator.onLine + events) trả `true/false`.
2. `useOnVisibleEffect(ref, fn)` với IntersectionObserver (cleanup đúng).
3. `useRetryFetch(url, { retries, backoff })` dựa trên `useFetch`.
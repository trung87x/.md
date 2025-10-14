# T2-15 — Effect + Event Listener Pattern

> Mục tiêu: Gắn/bỏ **event listeners** (DOM, window, document, custom emitter, socket) **đúng cách** với `useEffect`: ổn định handler, cleanup chắc chắn, tránh leak.

---

## 1) Mẫu chuẩn (DOM/Window/Document)
```jsx
function useWindowEvent(type, handler, options) {
  const saved = React.useRef(handler);
  React.useEffect(() => { saved.current = handler; }, [handler]);

  React.useEffect(() => {
    function onEvent(e) { saved.current(e); }   // stable proxy
    window.addEventListener(type, onEvent, options);
    return () => window.removeEventListener(type, onEvent, options);
  }, [type, options]);
}
```

```jsx
// dùng
useWindowEvent("keydown", (e) => {
  if (e.key === "Escape") close();
});
```

**Vì sao cần proxy?**  
- Prop `handler` thay đổi theo render; nếu truyền trực tiếp bạn phải đưa `handler` vào deps → add/remove mỗi lần.  
- Proxy ổn định + `saved.current = handler` giúp **luôn gọi phiên bản mới** mà **không** gỡ/đăng ký lại.

---

## 2) Mẫu với phần tử bất kỳ (ref)
```jsx
function useEventListener(target, type, handler, options) {
  const saved = React.useRef(handler);
  React.useEffect(() => { saved.current = handler; }, [handler]);

  React.useEffect(() => {
    const el = target && "current" in target ? target.current : target;
    if (!el) return;
    const onEvent = (e) => saved.current(e);
    el.addEventListener(type, onEvent, options);
    return () => el.removeEventListener(type, onEvent, options);
  }, [target, type, options]);
}
```

```jsx
function Search() {
  const inputRef = React.useRef(null);
  useEventListener(inputRef, "input", (e) => console.log(e.target.value));
  return <input ref={inputRef} />;
}
```

---

## 3) Custom emitter / socket
```jsx
function useEmitter(emitter, event, handler) {
  const saved = React.useRef(handler);
  React.useEffect(() => { saved.current = handler; }, [handler]);

  React.useEffect(() => {
    if (!emitter) return;
    const fn = (payload) => saved.current(payload);
    emitter.on(event, fn);
    return () => emitter.off(event, fn);
  }, [emitter, event]);
}
```

---

## 4) Bẫy & lưu ý
- **Đừng** quên cleanup `removeEventListener`/`off`.
- Với **passive events** (scroll, touch), truyền `{ passive: true }` nếu chỉ đọc, để trình duyệt tối ưu.
- Nếu cần **throttle/debounce**, nên bọc handler trước (memo hoá) hoặc dùng proxy + bộ đệm bên trong.
- Cẩn thận **SSR**: chỉ gắn listener khi `typeof window !== "undefined"`.

---

## 5) Mini demo (UMD)
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
    function useWindowEvent(type, handler, options) {
      const saved = React.useRef(handler);
      React.useEffect(() => { saved.current = handler; }, [handler]);
      React.useEffect(() => {
        const fn = (e) => saved.current(e);
        window.addEventListener(type, fn, options);
        return () => window.removeEventListener(type, fn, options);
      }, [type, options]);
    }

    function App() {
      const [count, setCount] = React.useState(0);
      useWindowEvent("keydown", (e) => e.key === "ArrowUp" && setCount((c) => c + 1));
      return <div>Press ↑ : {count}</div>;
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 6) Checklist
- [ ] Dùng proxy ổn định để gọi **handler mới nhất**.
- [ ] Cleanup bằng `removeEventListener`/`off`.
- [ ] Xem xét `passive`, `capture`, `once` khi cần.
- [ ] SSR: kiểm tra `window` trước khi đăng ký.

---

## 7) Bài tập
1. Viết `useResize` (nghe `resize`, trả `{width, height}` của window`).
2. Viết `useClickOutside(ref, onOutside)` dùng capture phase.
3. Viết `useKey(key, handler)` hỗ trợ nhiều phím và `preventDefault` tùy chọn.
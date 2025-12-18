# T4-09 — Render Props Pattern

> Mục tiêu: Dùng **render props** (function as child) để **chia sẻ logic** giữa các component trong khi **tuỳ biến UI** linh hoạt.

---

## 1) Render props là gì?
- Component nhận một **hàm** (thường là `children`) và gọi hàm đó với **state/logic** nội bộ, trả về UI.
```jsx
function Mouse({ children }) {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return children(pos); // ⬅ render props
}

// dùng
<Mouse>{({ x, y }) => <div>({x}, {y})</div>}</Mouse>
```

---

## 2) Khi nào dùng?
- Cần **tái sử dụng logic** nhưng UI khác nhau (tracking, fetch, subscription, permission...).  
- Trước kia dùng nhiều; ngày nay **custom hooks** là lựa chọn ưu tiên, nhưng render props vẫn hữu dụng ở chỗ cần **điều khiển render tree**.

---

## 3) API thiết kế gợi ý
- Dùng `children(state)` hoặc prop tên `render(state)`.
- Tài liệu rõ ràng **shape** của `state` và **hành động** (nếu có).
- Giữ **stability** của hàm `children` nếu bọc `React.memo` ở trong.

```jsx
function Fetcher({ url, children }) {
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
  return children(state);
}
```

---

## 4) So sánh với HOC & Custom Hooks
- **HOC**: bọc component và tiêm props → có thể “ẩn” cấu trúc, khó debug.  
- **Render props**: **rõ ràng** ở chỗ sử dụng; nhưng tạo **node lồng** nhiều.  
- **Custom hooks**: gọn nhất trong function component hiện đại; **ưu tiên** nếu không cần kiểm soát cấu trúc JSX.

---

## 5) Bẫy & lưu ý
- Hàm `children` là **inline** → tham chiếu **luôn mới** → con memo hoá bên trong sẽ re-render.  
  - Giải pháp: di chuyển render prop **ra ngoài** hoặc **memo** phần bên trong bằng `useMemo`/`React.memo` nếu phù hợp.
- Dễ sinh **callback hell** nếu lồng nhiều render props → cân nhắc hooks/composition.

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
    function Mouse({ children }) {
      const [pos, setPos] = React.useState({ x: 0, y: 0 });
      React.useEffect(() => {
        const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      }, []);
      return children(pos);
    }
    function App() {
      return (
        <Mouse>
          {({ x, y }) => <div>Mouse: {x}, {y}</div>}
        </Mouse>
      );
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 7) Checklist
- [ ] Rõ ràng shape `state` truyền vào `children`.
- [ ] Cân nhắc **custom hooks** trước nếu không cần điều khiển render tree.
- [ ] Tránh lồng nhiều cấp render props.
- [ ] Tối ưu stability nếu có con `React.memo` bên trong.

---

## 8) Bài tập
1. Viết `Hoverable` cung cấp `{ hovering }` cho `children`.
2. Viết `OnVisible` (IntersectionObserver) cung cấp `{ visible }` cho `children`.
3. Viết `Requester` (fetch) với `children({ status, data, error, retry })`.
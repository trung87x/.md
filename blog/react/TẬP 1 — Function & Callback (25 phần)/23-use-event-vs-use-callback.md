# 23 — useEvent vs useCallback (React Canary)

> Mục tiêu: hiểu hook mới **`useEvent`** (React Canary 2024) so sánh với `useCallback`: cùng ổn định tham chiếu nhưng khác về **closure & deps**. Có ví dụ và demo chạy ngay.

---

## 0) TL;DR

| So sánh | `useCallback` | `useEvent` |
|----------|----------------|-------------|
| Mục tiêu | Giữ **thứ tự tham chiếu** ổn định qua render | Giữ **closure mới nhất** mà không đổi tham chiếu |
| Phụ thuộc deps | Có deps | Không cần deps |
| Khi gọi | Gọi theo **closure cũ** nếu deps không đổi | Gọi luôn **logic mới nhất** |
| Dùng cho | Props callback, con memo | Event/timer/listener dài sống |
| Có trong | React stable | React Canary (sắp stable) |

---

## 1️⃣ `useCallback` giữ tham chiếu ổn định

```jsx
function App() {
  const [n, setN] = React.useState(0);

  const log = React.useCallback(() => {
    console.log("n =", n); // stale nếu deps []
  }, [n]);

  return <button onClick={log}>Log</button>;
}
```
- Nếu deps `[]` → `n` sẽ luôn là 0 (closure cũ).  
- Nếu deps `[n]` → callback mới mỗi render → con memo re-render.

---

## 2️⃣ `useEvent` giữ closure mới nhất mà không đổi ref

```jsx
import { useEvent } from "react"; // React Canary

function App() {
  const [n, setN] = React.useState(0);
  const log = React.useEvent(() => console.log("n =", n)); // luôn mới nhất
  return (
    <button onClick={() => { setN(n + 1); log(); }}>
      Count = {n}
    </button>
  );
}
```

✅ Ref **ổn định** → không re-render con.  
✅ Closure **luôn mới nhất** → không stale.

---

## 3️⃣ Kết hợp `useEvent` + `useEffect`

```jsx
function Timer() {
  const [count, setCount] = React.useState(0);
  const tick = React.useEvent(() => setCount(c => c + 1));

  React.useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]); // tick ref ổn định → deps không đổi
}
```

> Hoàn hảo cho **interval, listener, socket** — nơi stale closure thường xảy ra.

---

## 4️⃣ Khi nào chọn gì

| Mục đích | Dùng |
|-----------|------|
| Callback truyền xuống con `memo` | `useCallback` |
| Listener/timer/socket dài sống | `useEvent` |
| Cần ổn định ref + logic luôn mới | `useEvent` |
| Dùng React stable (chưa Canary) | `useRef` + wrapper proxy |

---

## 5️⃣ Demo HTML chạy ngay (CDN + Babel giả lập `useEvent`)

> Vì React stable chưa có `useEvent`, ta giả lập bằng `useRef`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>useEvent vs useCallback</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 20px; }
      .card { padding: 12px; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 12px; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      const { useState, useRef, useEffect, useCallback } = React;

      function useEvent(fn) {
        const ref = useRef(fn);
        useEffect(() => { ref.current = fn; });
        return useCallback((...args) => ref.current(...args), []);
      }

      function UseCallbackDemo() {
        const [n, setN] = useState(0);
        const log = useCallback(() => console.log("useCallback n =", n), [n]);
        return <button onClick={() => { setN(n + 1); log(); }}>useCallback n={n}</button>;
      }

      function UseEventDemo() {
        const [n, setN] = useState(0);
        const log = useEvent(() => console.log("useEvent n =", n));
        return <button onClick={() => { setN(n + 1); log(); }}>useEvent n={n}</button>;
      }

      function App() {
        return (
          <div>
            <h2>23 — useEvent vs useCallback</h2>
            <div className="card"><UseCallbackDemo /></div>
            <div className="card"><UseEventDemo /></div>
          </div>
        );
      }

      ReactDOM.createRoot(document.getElementById("root")).render(<App />);
    </script>
  </body>
</html>
```

---

## 6️⃣ Checklist nhớ

- [x] `useCallback` giữ ref ổn định **nhưng closure cũ**.  
- [x] `useEvent` giữ ref ổn định **và closure mới**.  
- [x] Dùng `useEvent` cho timer, listener, async task.  
- [x] Nếu chưa có Canary → `useRef` mô phỏng.  
- [x] Dùng deps đúng và cleanup chuẩn.

---

## 7️⃣ Đọc thêm
- React Canary Docs — `useEvent` Hook  
- RFC: useEvent Hook (github/reactjs/rfcs)  
- Dan Abramov — *Making React effects less reactive*

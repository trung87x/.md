# 17 — `useRef` chống Stale Closure (timer/listener/observer) cho React Dev

> Mục tiêu: dùng **`useRef`** để giữ **giá trị mới nhất** hoặc **hàm mới nhất** khi callback sống lâu hơn chu kỳ render (timer, event listener, socket, observer), tránh **stale closure**. Có demo chạy ngay (CDN + Babel) và các hook tiện ích.

---

## 0) TL;DR

- **Stale closure**: callback “nhớ” **snapshot state/props cũ** tại thời điểm được tạo.
- Các tác vụ **dài sống** (interval, listener, socket, observer) **không tự cập nhật** callback của bạn theo render mới.
- Dùng **`useRef`** để:
  1. Lưu **giá trị mới nhất**: `latest.current = value` mỗi render → đọc trong callback.
  2. Lưu **hàm mới nhất**: `ref.current = fn` + callback proxy luôn gọi `ref.current`.
- Kết hợp với **functional update** `setX(prev => ...)` khi cập nhật từ giá trị cũ.

---

## 1️⃣ Mô hình lỗi điển hình (stale)

```jsx
function BadCounter() {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setN(n + 1), 1000); // ❌ 'n' luôn là 0
    return () => clearInterval(id);
  }, []);
  return <div>{n}</div>;
}
```

> `n` bị **chụp** tại render đầu → mỗi lần tick vẫn dùng `n=0`.

---

## 2️⃣ Cách sửa A — Functional Update (không cần ref)

```jsx
function GoodCounter() {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setN((prev) => prev + 1), 1000); // ✅
    return () => clearInterval(id);
  }, []);
  return <div>{n}</div>;
}
```

> Dùng `prev => prev + 1` **không phụ thuộc** snapshot `n` cũ.

---

## 3️⃣ Cách sửa B — `useRef` giữ **giá trị mới nhất**

```jsx
function CounterRef() {
  const [n, setN] = React.useState(0);
  const latest = React.useRef(n);

  React.useEffect(() => {
    latest.current = n;
  }); // cập nhật mỗi render

  React.useEffect(() => {
    const id = setInterval(() => setN(latest.current + 1), 1000); // ✅ đọc mới nhất
    return () => clearInterval(id);
  }, []);

  return <div>{n}</div>;
}
```

> Dùng khi bạn **không thể** (hoặc không muốn) chuyển logic sang functional update.

---

## 4️⃣ Cách sửa C — `useRef` giữ **hàm mới nhất** (`useStableCallback`)

```jsx
function useStableCallback(fn) {
  const ref = React.useRef(fn);
  React.useEffect(() => {
    ref.current = fn;
  });
  return React.useCallback((...args) => ref.current(...args), []);
}
```

- Trả về **một tham chiếu hàm ổn định** (không đổi giữa các render)  
  **nhưng** luôn dùng **logic mới nhất** bên trong (`ref.current`).
- Hữu ích cho **API** cần callback **ổn định** (thêm/bớt listener 1 lần).

---

## 5️⃣ Listener/Observer/Socket với `useRef`

### 5.1. `addEventListener`

```jsx
function KeyLogger() {
  const [log, setLog] = React.useState([]);
  const latestAdd = React.useRef((e) => setLog((l) => [...l, e.key]));

  React.useEffect(() => {
    latestAdd.current = (e) => setLog((l) => [...l, e.key]);
  });

  React.useEffect(() => {
    const onKey = (e) => latestAdd.current(e); // luôn là hàm mới nhất
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return <div>Keys: {log.join(" ")}</div>;
}
```

### 5.2. `IntersectionObserver`

```jsx
function VisibilityBox() {
  const ref = React.useRef(null);
  const latestSet = React.useRef(null);

  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    latestSet.current = setVisible;
  });

  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([entry]) => {
      latestSet.current?.(entry.isIntersecting); // luôn dùng setter mới
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{visible ? "👀" : "…"}</div>;
}
```

### 5.3. WebSocket

```jsx
function Chat() {
  const [log, setLog] = React.useState([]);
  const latestPush = React.useRef((m) => setLog((l) => [...l, m]));

  React.useEffect(() => {
    latestPush.current = (m) => setLog((l) => [...l, m]);
  });

  React.useEffect(() => {
    const ws = new WebSocket("wss://echo.websocket.org");
    ws.onmessage = (e) => latestPush.current(e.data);
    return () => ws.close();
  }, []);

  return <pre>{log.join("\n")}</pre>;
}
```

---

## 6️⃣ So sánh nhanh các kỹ thuật

| Kỹ thuật                 | Ưu                                            | Nhược                                   | Dùng khi                                 |
| ------------------------ | --------------------------------------------- | --------------------------------------- | ---------------------------------------- |
| Functional update        | Đơn giản, “chuẩn React”                       | Chỉ áp dụng khi cập nhật từ state cũ    | Cập nhật state dựa trên giá trị trước đó |
| `useRef` giữ **giá trị** | Đọc được **mới nhất** trong callback dài sống | Cần tự đồng bộ `ref.current` mỗi render | Timer/listener/observer/socket           |
| `useRef` giữ **hàm**     | Tham chiếu **ổn định** + logic **mới**        | Cần wrapper proxy                       | API yêu cầu callback ổn định             |

---

## 7️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>useRef chống Stale Closure</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body {
        font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        padding: 20px;
      }
      .card {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 10px;
        margin-bottom: 12px;
      }
      .box {
        height: 120px;
        border: 1px dashed #aaa;
        margin-top: 12px;
        display: grid;
        place-items: center;
      }
      .spacer {
        height: 300px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      const { useState, useEffect, useRef, useCallback } = React;

      function useStableCallback(fn) {
        const ref = useRef(fn);
        useEffect(() => {
          ref.current = fn;
        });
        return useCallback((...args) => ref.current(...args), []);
      }

      function BadCounter() {
        const [n, setN] = useState(0);
        useEffect(() => {
          const id = setInterval(() => setN(n + 1), 1000); // ❌ stale
          return () => clearInterval(id);
        }, []);
        return <div>BadCounter: {n}</div>;
      }

      function GoodCounterRef() {
        const [n, setN] = useState(0);
        const latest = useRef(n);
        useEffect(() => {
          latest.current = n;
        });
        useEffect(() => {
          const id = setInterval(() => setN(latest.current + 1), 1000); // ✅
          return () => clearInterval(id);
        }, []);
        return <div>GoodCounterRef: {n}</div>;
      }

      function KeyLogger() {
        const [log, setLog] = useState([]);
        const push = useStableCallback((k) => setLog((l) => [...l, k]));
        useEffect(() => {
          const onKey = (e) => push(e.key); // ổn định + mới nhất
          window.addEventListener("keydown", onKey);
          return () => window.removeEventListener("keydown", onKey);
        }, [push]);
        return <div>Keys: {log.join(" ")}</div>;
      }

      function IOBox() {
        const ref = useRef(null);
        const [visible, setVisible] = useState(false);
        const setVisibleStable = useStableCallback((v) => setVisible(v));

        useEffect(() => {
          if (!ref.current) return;
          const io = new IntersectionObserver(([entry]) =>
            setVisibleStable(entry.isIntersecting)
          );
          io.observe(ref.current);
          return () => io.disconnect();
        }, [setVisibleStable]);

        return (
          <div className="card">
            <div className="spacer">Scroll xuống...</div>
            <div ref={ref} className="box">
              {visible ? "👀 Hiển thị" : "— Ẩn —"}
            </div>
          </div>
        );
      }

      function App() {
        return (
          <div>
            <h2>17 — useRef for Stale Closure</h2>
            <div className="card">
              <BadCounter />
            </div>
            <div className="card">
              <GoodCounterRef />
            </div>
            <div className="card">
              <KeyLogger />
            </div>
            <IOBox />
          </div>
        );
      }

      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<App />);
    </script>
  </body>
</html>
```

---

## 8️⃣ Checklist nhớ

- [x] Callback dài sống (interval/listener/socket/observer) → cần **ref** hoặc functional update.
- [x] Ghi **giá trị mới nhất** vào `ref.current` mỗi render.
- [x] Hoặc tạo **`useStableCallback`**: tham chiếu ổn định, logic mới nhất.
- [x] Cleanup đúng (gỡ listener/clear interval/close socket).
- [x] Đo đạc trước khi tối ưu quá mức.

---

## 9️⃣ Đọc thêm

- React Docs — Refs and the DOM; Effects
- Dan Abramov — A Complete Guide to useEffect
- Kent C. Dodds — useEvent pattern (ý tưởng tương tự `useStableCallback`)

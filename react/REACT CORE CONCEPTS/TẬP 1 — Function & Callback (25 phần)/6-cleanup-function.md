# 6 — Cleanup Function (dọn dẹp trong `useEffect`) cho React Dev

> Mục tiêu: hiểu **cleanup function** trong `useEffect` chạy **khi nào**, **tại sao cần**, và **mẫu dùng chuẩn** cho timer, event, subscription, fetch, observer, socket… Có demo chạy ngay (CDN + Babel).

---

## 0) TL;DR

- **Cleanup function** là **hàm bạn `return`** trong `useEffect`.
- Nó chạy **trước** khi effect mới (có deps đổi) chạy lại, **và** chạy **khi component unmount**.
- Dùng để **huỷ** timer, **gỡ** event listener, **unsubscribe**, **abort** request, **disconnect** observer/socket, **free** tài nguyên.
- Quy tắc vàng: **“Setup gì thì Cleanup nấy.”**

---

## 1) Chu kỳ chạy của `useEffect` + cleanup

```jsx
useEffect(() => {
  // 1) Setup (chạy sau render)
  // ...

  return () => {
    // 2) Cleanup (chạy trước effect kế tiếp / khi unmount)
    // ...
  };
}, [deps]);
```

- Lần **mount**: chạy **setup**.
- Khi **deps đổi**: chạy **cleanup cũ** → chạy **setup mới**.
- Khi **unmount**: chạy **cleanup cuối cùng**.

> Trong **Strict Mode (dev)**, React có thể chạy effect **hai lần** để phát hiện side‑effects không an toàn. **Cleanup phải idempotent** (gọi nhiều lần vẫn an toàn).

---

## 2) Timer: `setInterval` / `setTimeout`

### Không cleanup → rò rỉ timer

```jsx
useEffect(() => {
  const id = setInterval(() => {
    // ...
  }, 1000);
  // ❌ Thiếu clearInterval
}, []);
```

### Đúng: cleanup chuẩn + tránh stale closure

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount((prev) => prev + 1); // dùng prev để tránh stale
  }, 1000);
  return () => clearInterval(id); // ✅ cleanup
}, []);
```

---

## 3) DOM/Event: `addEventListener`

```jsx
useEffect(() => {
  function onKey(e) {
    // ...
  }
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey); // ✅
}, []);
```

> Nếu handler cần state mới nhất, dùng **ref** để lưu giá trị hiện tại rồi đọc từ `ref.current` (xem phần Closure).

---

## 4) Subscription (ví dụ: RxJS, Firebase, GraphQL)

```jsx
useEffect(() => {
  const sub = chatStream.subscribe((msg) => setMsgs((m) => [...m, msg]));
  return () => sub.unsubscribe(); // ✅
}, []);
```

---

## 5) Fetch/Abort: tránh setState sau unmount

```jsx
useEffect(() => {
  const ac = new AbortController();
  (async () => {
    try {
      const res = await fetch("/api/users", { signal: ac.signal });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      if (err.name !== "AbortError") console.error(err);
    }
  })();
  return () => ac.abort(); // ✅ hủy request khi unmount/đổi deps
}, []);
```

---

## 6) Observer/Socket: `IntersectionObserver`, `WebSocket`

```jsx
// IntersectionObserver
useEffect(() => {
  if (!ref.current) return;
  const io = new IntersectionObserver(([entry]) => {
    setVisible(entry.isIntersecting);
  });
  io.observe(ref.current);
  return () => io.disconnect(); // ✅
}, [ref]);

// WebSocket
useEffect(() => {
  const ws = new WebSocket("wss://echo.websocket.org");
  ws.onmessage = (e) => setLog((l) => [...l, e.data]);
  return () => ws.close(); // ✅
}, []);
```

---

## 7) Mẫu “ref giữ giá trị mới nhất” (kết hợp cleanup)

```jsx
function useEventLatest(value) {
  const ref = React.useRef(value);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

function Listener({ value }) {
  const latest = useEventLatest(value);
  React.useEffect(() => {
    const onClick = () => console.log("value =", latest.current);
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick); // ✅
  }, []);
  return null;
}
```

---

## 8) Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cleanup Function Demo</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body {
        font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        padding: 20px;
      }
      .card {
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 10px;
        margin-bottom: 16px;
      }
      button {
        margin-right: 8px;
      }
      .box {
        height: 120px;
        overflow: auto;
        border: 1px dashed #aaa;
        padding: 8px;
      }
      .spacer {
        height: 400px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      const { useState, useEffect, useRef } = React;

      // Hook giữ callback mới nhất
      function useEventLatest(cb) {
        const ref = useRef(cb);
        useEffect(() => {
          ref.current = cb;
        }, [cb]);
        return ref;
      }

      function TimerCard() {
        const [n, setN] = useState(0);
        useEffect(() => {
          const id = setInterval(() => setN((p) => p + 1), 1000);
          return () => clearInterval(id); // ✅ cleanup
        }, []);
        return <div className="card">⏱ Timer: {n}</div>;
      }

      function KeyLogger() {
        const [log, setLog] = useState([]);
        const add = useEventLatest((e) => setLog((l) => [...l, e.key]));

        useEffect(() => {
          const onKey = (e) => add.current(e); // dùng callback mới nhất
          window.addEventListener("keydown", onKey);
          return () => window.removeEventListener("keydown", onKey); // ✅
        }, []);

        return <div className="card">⌨️ Keys: {log.join(" ")}</div>;
      }

      function IOBox() {
        const ref = useRef(null);
        const [visible, setVisible] = useState(false);
        useEffect(() => {
          if (!ref.current) return;
          const io = new IntersectionObserver(([entry]) =>
            setVisible(entry.isIntersecting)
          );
          io.observe(ref.current);
          return () => io.disconnect(); // ✅
        }, []);
        return (
          <div className="card">
            <div className="spacer">Scroll xuống để quan sát ô...</div>
            <div ref={ref} className="box">
              👀 {visible ? "Đang hiển thị" : "Ngoài viewport"}
            </div>
          </div>
        );
      }

      function App() {
        const [mount, setMount] = useState(true);
        return (
          <div>
            <h1>Cleanup Function — useEffect</h1>
            <button onClick={() => setMount((m) => !m)}>
              {mount ? "Unmount tất cả" : "Mount lại"}
            </button>
            {mount && (
              <>
                <TimerCard />
                <KeyLogger />
                <IOBox />
              </>
            )}
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

## 9) Gotchas & mẹo

- **Thiếu cleanup** → rò rỉ bộ nhớ, nhiều listener/timer chồng lên nhau.
- **Deps sai** → effect chạy lại quá nhiều hoặc không chạy lại khi cần.
- **Strict Mode (dev)** chạy setup/cleanup thêm vòng → cleanup phải **an toàn nhiều lần**.
- Với request/fetch: **AbortController** thay vì cờ `cancelled` nếu API hỗ trợ.
- Với socket/observer: **close/disconnect** trong cleanup, kiểm tra trạng thái trước khi thao tác.

---

## 🔟 Checklist “Setup gì → Cleanup nấy”

- [x] `setInterval`/`setTimeout` → `clearInterval`/`clearTimeout`
- [x] `addEventListener` → `removeEventListener`
- [x] `subscribe()` → `unsubscribe()` / `off()`
- [x] `fetch`/XHR → `AbortController.abort()`
- [x] `observe()` → `disconnect()` / `unobserve()`
- [x] `open()` (socket) → `close()`
- [x] Tài nguyên khác (Map, cache tạm…) → `clear()`/`dispose()`

---

## 11) Kết luận

- Cleanup bảo đảm **component không để lại “dấu vết”** khi deps đổi/unmount.
- Hiểu **chu kỳ effect** và **stale closure** để đặt logic đúng chỗ.
- Áp dụng quy tắc: **Setup gì → Cleanup nấy**, luôn luôn.

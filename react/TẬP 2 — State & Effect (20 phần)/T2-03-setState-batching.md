# Tập 2 · Phần 3 — setState Batching (Gom cập nhật) & Timing

> Mục tiêu: hiểu **batching** (gom nhiều `setState` thành 1 render), phạm vi áp dụng (event sync, async), và hệ quả với UI. Có demo CDN + Babel.

---

## 0) TL;DR
- React **batch** các `setState` xảy ra **trong cùng một tick** (event handler, promise microtask…) → **1 lần render**.  
- Batching **tự động** trong React 18 cho hầu hết async (timeout, promise).  
- Dùng **functional update** để đảm bảo thứ tự đúng khi cộng dồn.  
- Muốn render ngay (rất hiếm khi cần): `flushSync` (ReactDOM).

---

## 1️⃣ Batching là gì?

```jsx
function handleClick() {
  // Hai lần setState trong 1 event
  setCount(c => c + 1);
  setCount(c => c + 1);
  // ✅ Kết quả +2, chỉ 1 lần re-render
}
```

- React gom các cập nhật và commit **một lần** để tối ưu hiệu năng.

---

## 2️⃣ Batching trong async (React 18)

```jsx
async function handleAsync() {
  await Promise.resolve();
  setN(n => n + 1);
  setN(n => n + 1);
  // ✅ vẫn batch trong React 18
}
```

> Trước React 18, cập nhật trong callback async có thể **không batch**.

---

## 3️⃣ Khi nào KHÔNG nên phá vỡ batching?

- **Hiếm khi** cần render ngay giữa chuỗi cập nhật.  
- Nếu bắt buộc (ví dụ đo lường DOM ngay sau setState) → dùng `flushSync`:

```jsx
import { flushSync } from "react-dom";
flushSync(() => setOpen(true)); // commit ngay
// đo DOM ở đây
```

> Cẩn trọng: lạm dụng `flushSync` sẽ **giảm hiệu năng**.

---

## 4️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>T2-03 — setState Batching</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 20px; }
      button { margin: 6px; }
      .card { padding: 12px; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 12px; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      const { useState } = React;

      function App() {
        const [n, setN] = useState(0);
        const [logs, setLogs] = useState([]);

        const log = (msg) => setLogs(l => [...l, msg]);

        function batchSync() {
          log("Start sync");
          setN(c => c + 1);
          setN(c => c + 1);
          log("End sync");
        }

        async function batchAsync() {
          log("Start async");
          await Promise.resolve();
          setN(c => c + 1);
          setN(c => c + 1);
          log("End async");
        }

        return (
          <div>
            <h2>T2-03 — setState Batching</h2>
            <div className="card">
              <div>n = <strong>{n}</strong></div>
              <button onClick={batchSync}>+2 (sync)</button>
              <button onClick={batchAsync}>+2 (async)</button>
            </div>
            <div className="card">
              <pre>{logs.join("\n")}</pre>
              <button onClick={() => setLogs([])}>Clear log</button>
            </div>
          </div>
        );
      }

      ReactDOM.createRoot(document.getElementById("root")).render(<App />);
    </script>
  </body>
</html>
```

---

## 5️⃣ Checklist
- [x] Functional update để cộng dồn an toàn.  
- [x] Batching tự động trong React 18, kể cả async.  
- [x] `flushSync` chỉ dùng khi thực sự cần đo lường ngay.  
- [x] Tránh setState phụ thuộc snapshot cũ trong async/timer.

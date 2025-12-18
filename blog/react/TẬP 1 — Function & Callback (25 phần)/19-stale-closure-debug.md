# 19 — Debug Stale Closure trong React

> Mục tiêu: nhận diện & debug **stale closure**: khi callback/handler/effect dùng **state/props cũ** do closure. Trang bị checklist, kỹ thuật log, StrictMode, DevTools, và cách sửa chuẩn.

---

## 0) TL;DR

- **Triệu chứng**: counter không tăng, log luôn giá trị cũ, listener không thấy state mới.  
- **Nguồn gốc**: callback được tạo ở **render cũ** → “nhớ” snapshot cũ.  
- **Cách sửa nhanh**:  
  1) `setX(prev => ...)` (functional update)  
  2) Lưu **giá trị mới nhất** vào `useRef` và đọc từ `ref.current` trong timer/listener  
  3) Đặt **deps đúng** cho `useEffect`/`useCallback`  
  4) Di chuyển side‑effect vào **effect** + cleanup chuẩn

---

## 1️⃣ Tái hiện lỗi (Minimal Repro)

```jsx
function BadCounter() {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // ❌ count luôn là 0
      console.log("tick", count);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <div>Count: {count}</div>;
}
```

---

## 2️⃣ Bật “Strict Mode” (dev) để soi side‑effect

```jsx
// index.jsx
<React.StrictMode>
  <App />
</React.StrictMode>
```
- DevMode có thể **mount → unmount → mount** lại ngay lập tức.  
- Kéo theo effect chạy **hai lần** → giúp phát hiện code setup/cleanup **không idempotent**.

---

## 3️⃣ Kỹ thuật log & định vị

- **Log deps** trong effect/callback:
```jsx
useEffect(() => {
  console.log("effect deps change: id=", id);
}, [id]);
```
- **console.time/timeEnd** đo độ trễ callback.  
- **console.trace()** xem call stack khi handler chạy.  
- **Flag** bằng emoji/label:
```js
const log = (...a) => console.log("🧪[LISTENER]", ...a);
```

---

## 4️⃣ DevTools & Profiler

- **React DevTools → Profiler**: ghi lại render, xem component nào re-render và vì sao.  
- **Highlight updates**: tô sáng vùng cập nhật để nhìn re-render không mong muốn.  
- **Network tab**: với fetch/async, kiểm tra **race** giữa nhiều request.

---

## 5️⃣ Sửa lỗi theo tình huống

### 5.1. Timer/interval
```jsx
useEffect(() => {
  const id = setInterval(() => setCount(prev => prev + 1), 1000); // ✅
  return () => clearInterval(id);
}, []);
```

### 5.2. Event listener ngoài React
```jsx
const latest = React.useRef(text);
useEffect(() => { latest.current = text; });
useEffect(() => {
  const onKey = () => console.log(latest.current); // ✅
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);
```

### 5.3. Effect phụ thuộc biến
```jsx
useEffect(() => {
  // dùng 'value'
}, [value]); // ✅ có 'value' trong deps
```

### 5.4. Callback truyền xuống con (memo)
```jsx
const onSelect = React.useCallback((id) => {
  setList(prev => prev.map(x => x.id === id ? { ...x, sel: !x.sel } : x));
}, []); // ✅ functional update → không cần 'list' trong deps
```

### 5.5. Async/fetch & race condition
```jsx
useEffect(() => {
  const ac = new AbortController();
  (async () => {
    const res = await fetch(`/api/users/${id}`, { signal: ac.signal });
    const data = await res.json();
    setUser(data); // ✅ chỉ khi request hiện tại chưa bị abort
  })();
  return () => ac.abort();
}, [id]);
```

---

## 6️⃣ ESLint plugin giúp đỡ

- Bật **`eslint-plugin-react-hooks`** (tự động nhắc thiếu deps).  
- Option **exhaustive-deps**: cảnh báo khi deps chưa đầy đủ.  
- Chấp nhận **intentional** bỏ deps bằng chú thích & giải pháp ref/functional update.

---

## 7️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Debug Stale Closure</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 20px; }
      .card { padding: 12px; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 12px; }
      .warn { color: #b45309 }
      pre { background: #f8fafc; padding: 10px; border-radius: 8px; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      const { useState, useEffect, useRef } = React;

      function BadCounter() {
        const [count, setCount] = useState(0);
        useEffect(() => {
          const id = setInterval(() => {
            setCount(count + 1);           // ❌ stale
            console.log("tick", count);    // luôn 0
          }, 1000);
          return () => clearInterval(id);
        }, []);
        return <div>BadCounter: <span className="warn">{count}</span></div>;
      }

      function GoodCounter() {
        const [count, setCount] = useState(0);
        useEffect(() => {
          const id = setInterval(() => setCount(p => p + 1), 1000); // ✅
          return () => clearInterval(id);
        }, []);
        return <div>GoodCounter: {count}</div>;
      }

      function GoodListener() {
        const [text, setText] = useState("");
        const latest = useRef(text);
        useEffect(() => { latest.current = text; });
        useEffect(() => {
          const onKey = () => console.log("text:", latest.current); // ✅ luôn mới
          window.addEventListener("keydown", onKey);
          return () => window.removeEventListener("keydown", onKey);
        }, []);
        return (
          <div className="card">
            <input value={text} onChange={e => setText(e.target.value)} placeholder="Gõ phím và xem console" />
          </div>
        );
      }

      function App() {
        return (
          <div>
            <h2>19 — Debug Stale Closure</h2>
            <div className="card"><BadCounter /></div>
            <div className="card"><GoodCounter /></div>
            <GoodListener />
            <pre>
{`Checklist:
- Dùng functional update khi cập nhật từ state cũ
- Dùng ref để lưu giá trị mới nhất cho timer/listener
- Đặt deps đúng cho effect/callback
- Cleanup chuẩn, xem StrictMode`}
            </pre>
          </div>
        );
      }
      ReactDOM.createRoot(document.getElementById("root")).render(<App />);
    </script>
  </body>
</html>
```

---

## 8️⃣ Checklist debug

- [x] Tạo **repro nhỏ**.  
- [x] Bật **StrictMode** và quan sát setup/cleanup.  
- [x] Log **deps**, **trace**, **time** để xác định render/closure.  
- [x] Áp dụng **mẫu sửa** phù hợp (prev/ref/deps).  
- [x] Dùng **ESLint hooks** để nhắc deps thiếu.

---

## 9️⃣ Đọc thêm
- React Docs — Effects & Refs  
- Dan Abramov — A Complete Guide to useEffect  
- Kent C. Dodds — Avoid stale closures (useEvent pattern)

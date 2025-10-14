# 10 — Default Parameters (Tham số mặc định) cho React Dev

> Mục tiêu: hiểu **default parameter** trong JavaScript và cách áp dụng đúng trong **React** (props mặc định, kết hợp destructuring/rest, và khác gì với `||` / `??`).

---

## 0) TL;DR

- Đặt **giá trị mặc định** ngay tại tham số: `function f(a = 1, b = 2) {}`.
- Chạy **khi đối số là `undefined`** (không phải khi là `null` hoặc giá trị falsy khác).
- Trong React, dùng cho **props**: `function Avatar({ size = 48 }) { ... }`.
- Có thể kết hợp **destructuring** & **rest**: `function Button({type="button", ...rest}){}`.

---

## 1️⃣ Cú pháp cơ bản

```js
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}
greet(); // "Hello, Guest!"
greet(undefined); // "Hello, Guest!"
greet(null); // "Hello, null!" (vì null ≠ undefined)
```

> Default chỉ kích hoạt khi **đối số là `undefined`**.

---

## 2️⃣ So sánh với `||` và `??`

| Cú pháp               | Kích hoạt khi             | Ví dụ    | Kết quả                                                  |
| --------------------- | ------------------------- | -------- | -------------------------------------------------------- | --- | --- | --- | ------------- |
| `a = a                |                           | def`     | `a` falsy (`0`, `""`, `false`, `null`, `undefined`, NaN) | `0  |     | 5`  | `5` (mất `0`) |
| `a = a ?? def`        | `a` là `null`/`undefined` | `0 ?? 5` | `0` (giữ `0`)                                            |
| `function f(a = def)` | đối số là `undefined`     | `f(0)`   | giữ `0`                                                  |

> Trong UI, **nên ưu tiên** `default parameter` hoặc `??` để **không vô tình “đè” giá trị hợp lệ** như `0`, `""`, `false`.

---

## 3️⃣ Default với biểu thức (tính tại runtime)

```js
let seed = 0;
function nextId(prefix = "ID", n = ++seed) {
  return `${prefix}-${n}`;
}
console.log(nextId()); // "ID-1"
console.log(nextId("USER")); // "USER-2"
```

> Biểu thức default chạy **mỗi lần gọi** (khi đối số là `undefined`).

---

## 4️⃣ Kết hợp với Destructuring (Object)

```js
function connect({ host = "localhost", port = 3000 } = {}) {
  return `${host}:${port}`;
}
connect(); // "localhost:3000"
connect({ port: 8080 }); // "localhost:8080"
```

> Truyền `{}` mặc định cho toàn props để tránh lỗi **Cannot destructure 'undefined'**.

### Rename + Default

```js
function openDB({ user: username = "root" } = {}) {
  return `user=${username}`;
}
```

---

## 5️⃣ Default trong React Component

```jsx
function Avatar({ src = "/default.png", size = 48, alt = "", ...rest }) {
  return <img src={src} width={size} height={size} alt={alt} {...rest} />;
}

function Badge({ count = 0, showZero = false }) {
  if (!showZero && count === 0) return null;
  return <span className="badge">{count}</span>;
}
```

> **Lý do dùng default ở tham số**: ngắn gọn, rõ ràng, phù hợp với function component.

---

## 6️⃣ Default với Function Parameter & Callback

```js
function fetchWithRetry(url, { retries = 3, interval = 500 } = {}) {
  // ...
}

const onSave = (data, done = () => {}) => {
  // ... làm gì đó
  done(); // đảm bảo luôn là function
};
```

---

## 7️⃣ Pitfalls (lỗi hay gặp)

### 7.1. Thứ tự default

```js
function f(a = 1, b = a + 1) {
  // ✅ b dùng a đã có default
  return [a, b];
}
function g(a = b + 1, b = 1) {
  // ❌ ReferenceError (TDZ)
  return [a, b];
}
```

### 7.2. Destructure thiếu default object

```js
function h({ x = 1 } /* = {} */) {
  // ❌ nếu gọi h()
  return x;
}
function h2({ x = 1 } = {}) {
  // ✅
  return x;
}
```

### 7.3. Dùng `||` làm mất giá trị hợp lệ

```js
function pad(n, width) {
  const w = width || 2; // ❌ width=0 sẽ thành 2
  // ...
}
function pad2(n, width = 2) {
  // ✅ giữ 0 nếu truyền 0
  // ...
}
```

---

## 8️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Default Parameters Demo</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body {
        font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        padding: 20px;
      }
      .row {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 12px;
      }
      input {
        padding: 6px 10px;
      }
      button {
        padding: 6px 12px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      const { useState } = React;

      function Avatar({ src = "/default.png", size = 48, alt = "", ...rest }) {
        return <img src={src} width={size} height={size} alt={alt} {...rest} />;
      }

      function Counter({ step = 1 }) {
        const [n, setN] = useState(0);
        return (
          <div className="row">
            <button onClick={() => setN(n - step)}>-{step}</button>
            <strong>{n}</strong>
            <button onClick={() => setN(n + step)}>+{step}</button>
          </div>
        );
      }

      function App() {
        const [step, setStep] = useState("");
        return (
          <div>
            <h2>10 — Default Parameters</h2>
            <div className="row">
              <label>Step:</label>
              <input
                value={step}
                onChange={(e) => setStep(e.target.value)}
                placeholder="(để trống = undefined)"
              />
            </div>
            <Counter step={step === "" ? undefined : Number(step)} />
            <Avatar
              alt="Demo"
              style={{ borderRadius: 8, border: "1px solid #ddd" }}
            />
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

## 9️⃣ Tổng kết

- Default parameter kích hoạt khi đối số là **`undefined`**.
- Dùng tốt với **React props** và **config object**.
- Tránh lạm dụng `||` → có thể “mất” giá trị hợp lệ (`0`, `""`, `false`).
- Kết hợp **destructuring** để API hàm **gọn & an toàn**.

---

## 🔟 Checklist nhớ

- [x] Props có thể vắng → `function Comp({ a = 1, b = 2 } = {}) {}`
- [x] Cần callback tùy chọn → `done = () => {}`
- [x] Cần giá trị tính toán → `b = a + 1` (nhưng tránh TDZ như ví dụ `g`)
- [x] Tránh `||` nếu `0/""/false` là hợp lệ → dùng default hoặc `??`
- [x] Kết hợp với rest: `({a=1, ...rest})`

---

## 📚 Đọc thêm

- MDN — Default parameters
- React Docs — Passing Props, Conditional Rendering
- You Don’t Know JS Yet — Types & Grammar (về `||`, `??`)

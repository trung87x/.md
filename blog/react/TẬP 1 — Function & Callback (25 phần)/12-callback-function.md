# 12 — Callback Function cho React Dev

> Mục tiêu: nắm **callback** trong JS & React: event, inline, props, hook (effect), memo (`useCallback`), closure (`setState(prev=>...)`), và flow cha–con. Có demo chạy ngay (CDN + Babel).

---

## 0) TL;DR

- **Callback** = hàm bạn **truyền vào** _để người khác gọi_ **sau này** (event, async, lifecycle).
- Trong React:
  - **Event callback**: `onClick={handle}` → React gọi khi event xảy ra.
  - **Inline callback**: `onClick={() => doThing(id)}` → tiện truyền tham số.
  - **Props callback (child → parent)**: `<Child onPing={fn} />` → con gọi hàm cha.
  - **Hook callback**: `useEffect(() => {...})` (và cleanup) → React gọi sau render.
  - **Memo callback**: `useCallback(fn, deps)` giữ tham chiếu ổn định.
  - **Closure callback**: `setState(prev => ...)` tránh stale state.

---

## 1️⃣ JS Callback cơ bản

```js
function doLater(cb) {
  setTimeout(() => cb("done"), 500);
}
doLater((msg) => console.log(msg)); // "done"
```

> Bản chất: **đăng ký** một hành động cần chạy sau đó.

---

## 2️⃣ Các loại callback trong React

| Loại    | Cú pháp                   | Ai gọi?       | Khi nào?                |
| ------- | ------------------------- | ------------- | ----------------------- |
| Event   | `<button onClick={fn}/>`  | React         | User tương tác          |
| Inline  | `onClick={() => fn(id)}`  | React         | Khi event               |
| Props   | `<Child onPing={fn}/>`    | Component con | Khi con trigger         |
| Hook    | `useEffect(() => {...})`  | React         | Sau render / cleanup    |
| Memo    | `useCallback(fn, [deps])` | —             | Giữ tham chiếu ổn định  |
| Closure | `setX(prev => ...)`       | JS Engine     | Dựa trên state mới nhất |

---

## 3️⃣ Event & Inline callback

```jsx
function Buttons() {
  const sayHi = () => alert("Hi");
  const handleRemove = (id) => alert("Remove " + id);
  return (
    <div>
      <button onClick={sayHi}>Say Hi</button>
      <button onClick={() => handleRemove(42)}>Remove #42</button>
    </div>
  );
}
```

> Inline tiện truyền param. Với list rất lớn, cân nhắc tối ưu sau **khi đo đạc** (profiling).

---

## 4️⃣ Props callback (Child → Parent)

```jsx
function Child({ onPing }) {
  return <button onClick={onPing}>Ping</button>;
}

function Parent() {
  const handlePing = () => alert("Parent got ping");
  return <Child onPing={handlePing} />;
}
```

Flow: **Parent định nghĩa → truyền vào Child → Child gọi khi cần**.

---

## 5️⃣ Hook callback (Effect & Cleanup)

```jsx
React.useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id); // cleanup callback
}, []);
```

> React gọi callback effect sau render; khi deps đổi/unmount → chạy **cleanup** trước, rồi effect mới.

---

## 6️⃣ Closure callback (tránh stale state)

```jsx
const increase = () => setCount((prev) => prev + 1); // ✅ luôn đúng
```

> Dùng **functional update** để luôn nhận giá trị state mới nhất, đặc biệt trong timer/async/listener.

---

## 7️⃣ Memo callback với `useCallback`

```jsx
const onAlert = React.useCallback(() => alert("Hello"), []);
<Child onAlert={onAlert} />;
```

**Khi nào cần**:

- Truyền vào **con được `React.memo`** (giảm re-render).
- Dùng làm **deps** cho effect khác.
  > Không tự chữa stale closure — **deps phải đúng**.

---

## 8️⃣ Lỗi thường gặp (Gotchas)

1. **Gọi hàm sớm** (thay vì truyền tham chiếu)

```jsx
<button onClick={handle()}>…</button> // ❌ gọi ngay
<button onClick={handle}>…</button>   // ✅ truyền hàm
```

2. **Deps sai với `useCallback`/`useEffect`** → stale closure.  
   → Đưa **tất cả** biến dùng trong callback vào deps, hoặc chuyển sang **ref/functional update**.

3. **Truyền callback mới mỗi render** cho component con **memo** → mất lợi ích memo.  
   → Dùng `useCallback` khi thật sự cần tối ưu.

---

## 9️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Callback in React — Demo</title>
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
      button {
        margin-right: 8px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      const { useState, useEffect, useCallback, memo } = React;

      const Child = memo(function Child({ onAlert }) {
        console.log("👶 Child render");
        return <button onClick={onAlert}>Child: Alert</button>;
      });

      function App() {
        const [count, setCount] = useState(0);

        // Event + Closure callback
        const inc = () => setCount((prev) => prev + 1);

        // Props callback (memo) — giữ ổn định bằng useCallback
        const onAlert = useCallback(() => alert("Hello from child"), []);

        // Hook callback + cleanup
        useEffect(() => {
          const id = setInterval(() => console.log("tick", Date.now()), 2000);
          return () => clearInterval(id);
        }, []);

        return (
          <div>
            <h2>12 — Callback Function</h2>
            <div className="card">
              <button onClick={inc}>+1</button>
              <span>Count: {count}</span>
            </div>
            <div className="card">
              <Child onAlert={onAlert} />
            </div>
            <div className="card">
              <button
                onClick={() => alert("Inline callback w/ param: " + count)}
              >
                Inline callback
              </button>
            </div>
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

## 🔟 Checklist nhớ

- [x] Truyền **tham chiếu hàm**, không gọi sớm.
- [x] Cần tham số? → **inline callback** `() => fn(id)`.
- [x] Con gọi cha? → **props callback**.
- [x] Tác vụ sau render / dọn dẹp? → **effect + cleanup**.
- [x] Tránh stale state → `setX(prev => ...)`.
- [x] Tối ưu re-render → `useCallback` (đúng deps) + `React.memo`.

---

## 📚 Đọc thêm

- React Docs — Handling Events, Effects, Memoization
- MDN — Callbacks, setTimeout/setInterval
- Epic React — Memoization & Performance (Kent C. Dodds)

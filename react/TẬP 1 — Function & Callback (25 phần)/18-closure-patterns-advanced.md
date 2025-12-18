# 18 — Closure Patterns (Advanced) cho React Dev

> Mục tiêu: tổng hợp **closure nâng cao**: lexical environment, scope chain, factory/module pattern, memoization, privacy; và **ứng dụng thực chiến** trong React (handler factory, stable callback, custom hooks). Có demo CDN + Babel.

---

## 0) TL;DR

- **Closure** = hàm “nhớ” biến tại **thời điểm tạo** (lexical env).  
- **Pattern chính**: Factory, Module, Memoization, Privacy (ẩn dữ liệu), Partial/Curried, Event/Handler factory.  
- React: closure xuất hiện **ở mọi chỗ** (component, handler, effect). Hiểu closure giúp:  
  - Tránh **stale closure** (dùng `prev => …`, `useRef`, deps đúng).  
  - Tạo **API gọn** (handler factory, reducer‑style, currying).  
  - Viết **custom hook** an toàn & chuẩn.

---

## 1️⃣ Lexical Environment & Scope Chain (tóm tắt nhanh)

```js
function outer(a) {
  let x = 1;
  return function inner(b) {
    return a + b + x; // inner “nhớ” a & x
  };
}
const f = outer(10);
f(5); // 16
```
- **Lexical env**: tập biến khả dụng tại nơi **định nghĩa** hàm.  
- **Scope chain**: khi lookup biến, JS đi từ **local → outer → global**.

---

## 2️⃣ Factory Pattern (hàm sinh hàm)

```js
const withPrefix = (prefix) => (s) => `${prefix}${s}`;
const warn = withPrefix("⚠️ ");
warn("Low battery"); // "⚠️ Low battery"
```
**Trong React:**
```jsx
const makeSelectHandler = (setId) => (id) => setId(id);

function List({ items }) {
  const [selected, setSelected] = React.useState(null);
  return items.map(i => (
    <button key={i.id} onClick={makeSelectHandler(setSelected)(i.id)}>
      {i.title}
    </button>
  ));
}
```
> Với list lớn, cân nhắc tối ưu (memo hóa handler chung + inline tối thiểu).

---

## 3️⃣ Module Pattern (ẩn dữ liệu, public API)

```js
function createCounter() {
  let count = 0;                 // private
  const inc = () => ++count;     // public
  const get = () => count;
  return { inc, get };
}
const c = createCounter();
c.inc(); c.get(); // 1
```
**Trong React (custom hook)**:
```jsx
function useCounter(init = 0) {
  const [n, setN] = React.useState(init);
  const inc = React.useCallback(() => setN(p => p + 1), []);
  const dec = React.useCallback(() => setN(p => p - 1), []);
  return { n, inc, dec }; // public API, state “private” trong hook
}
```

---

## 4️⃣ Memoization Pattern (cache theo input)

```js
function memo(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const val = fn(...args);
    cache.set(key, val);
    return val;
  };
}
const slowFib = n => (n < 2 ? n : slowFib(n-1) + slowFib(n-2));
const fastFib = memo(slowFib);
```
**Trong React**: dùng **`useMemo`** để memo **giá trị** trong render tree.

---

## 5️⃣ Privacy Pattern (không rò rỉ biến tạm)

```js
const createId = (() => {
  let seed = 0;                // private
  return (prefix = "id") => `${prefix}-${++seed}`;
})();

createId();   // id-1
createId();   // id-2
```

---

## 6️⃣ Partial Application / Currying

```js
const add = a => b => a + b;
const add10 = add(10);
add10(5); // 15
```
**Trong React:**
```jsx
const handleChangeFactory = (field, setForm) => (value) => setForm(f => ({ ...f, [field]: value }));
// dùng: onChange={handleChangeFactory("email", setForm)}
```

---

## 7️⃣ Event / Handler Factory trong React

```jsx
function TodoList({ items, onToggle }) {
  const makeToggle = React.useCallback((id) => () => onToggle(id), [onToggle]);
  return (
    <ul>
      {items.map(it => (
        <li key={it.id}>
          <label>
            <input type="checkbox" checked={it.done} onChange={makeToggle(it.id)} />
            {it.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```
> `makeToggle(id)` trả về handler đã “chứa” `id` bên trong closure.

---

## 8️⃣ Patterns chống **Stale Closure** (nhắc nhanh)

- **Functional update**: `setX(prev => ...)`  
- **`useRef`** giữ **giá trị/hàm mới nhất** cho timer/listener  
- **Deps đúng** cho `useEffect`/`useCallback`  
- Tách **logic side‑effect** ra **effect** và dọn dẹp chuẩn

---

## 9️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Closure Patterns Advanced</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 20px; }
      .card { padding: 12px; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 12px; }
      button { margin-right: 8px; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      const { useState, useCallback, useMemo } = React;

      // Factory
      const withPrefix = (p) => (s) => p + s;

      // Module via hook
      function useCounter(init = 0) {
        const [n, setN] = useState(init);
        const inc = useCallback(() => setN(p => p + 1), []);
        const dec = useCallback(() => setN(p => p - 1), []);
        return { n, inc, dec };
      }

      // Memoization (simple)
      function memo(fn) {
        const cache = new Map();
        return (...args) => {
          const k = JSON.stringify(args);
          if (cache.has(k)) return cache.get(k);
          const v = fn(...args);
          cache.set(k, v);
          return v;
        };
      }
      const slowFib = n => (n < 2 ? n : slowFib(n-1) + slowFib(n-2));
      const fastFib = memo(slowFib);

      function App() {
        const { n, inc, dec } = useCounter(0);
        const label = useMemo(() => withPrefix("Count: ")(String(n)), [n]);

        return (
          <div>
            <h2>18 — Closure Patterns Advanced</h2>
            <div className="card">
              <button onClick={dec}>-</button>
              <strong>{label}</strong>
              <button onClick={inc}>+</button>
            </div>
            <div className="card">
              <p>Fib(20) chậm vs memo:</p>
              <button onClick={() => console.log("fib:", fastFib(20))}>
                Compute fib(20) (xem console)
              </button>
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

## 🔟 Checklist nhớ

- [x] Hiểu lexical env & scope chain.  
- [x] Áp dụng Factory/Module/Memoization/Privacy đúng chỗ.  
- [x] Dùng closure để tạo handler factory rõ ràng.  
- [x] Chống stale với functional update / ref / deps.  
- [x] Đo đạc trước khi tối ưu hoá quá mức.

---

## 📚 Đọc thêm
- MDN — Closures, Lexical Environment  
- Kyle Simpson — *You Don’t Know JS Yet* (Scope & Closures)  
- React Docs — Effects, Memoization, Refs

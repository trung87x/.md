# 5 — Calling Functions (Gọi hàm) cho React Dev

> Mục tiêu: hiểu cách **gọi hàm** trong JavaScript và **khi nào React tự gọi / khi nào ta gọi thủ công**, gồm: gọi trực tiếp, callback, inline, props, hook, v.v.

---

## 1️⃣ Cơ bản: Gọi hàm là gì?

**Gọi hàm (Call a function)** = thực thi hàm đó bằng **cặp ngoặc `()`**.

```js
function sayHi() {
  console.log("Hi!");
}

sayHi(); // 👈 gọi hàm (execute)
```

Nếu chỉ viết `sayHi` (không có `()`), bạn **chưa gọi**, mà **chỉ truyền tham chiếu**.

```js
button.onclick = sayHi; // ✅ đúng — gán hàm, chưa gọi
button.onclick = sayHi(); // ❌ sai — gọi ngay, không chờ click
```

---

## 2️⃣ Các cách gọi hàm trong React

| Cách gọi             | Ví dụ                        | Khi nào chạy                      |
| -------------------- | ---------------------------- | --------------------------------- |
| **Direct call**      | `fn()`                       | Ngay khi code tới dòng đó         |
| **Event callback**   | `onClick={handleClick}`      | React gọi khi event xảy ra        |
| **Inline callback**  | `onClick={() => fn()}`       | Gọi khi user tương tác            |
| **Props callback**   | `<Child onAlert={fn} />`     | Con gọi → Cha xử lý               |
| **Hook callback**    | `useEffect(() => {...})`     | React gọi sau render              |
| **Memo callback**    | `useCallback(fn, [])`        | Giữ hàm ổn định qua render        |
| **Closure callback** | `setCount(prev => prev + 1)` | Hàm gọi trong hàm, nhớ giá trị cũ |

---

## 3️⃣ Ví dụ tổng hợp trong React

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calling Functions Demo</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      const { useState, useCallback, useEffect } = React;

      function Child({ onAlert }) {
        console.log("👶 Child render");
        return (
          <div style={{ border: "1px solid gray", padding: 8, marginTop: 8 }}>
            <p>Component Con</p>
            <button onClick={onAlert}>Con gọi hàm cha</button>
          </div>
        );
      }

      function App() {
        const [count, setCount] = useState(0);

        // 1️⃣ Direct Call
        function sayHi() {
          console.log("Hi React!");
        }

        // 2️⃣ Event Callback
        function handleClick() {
          alert("Bạn vừa bấm nút!");
        }

        // 3️⃣ Inline Callback
        const handleInline = () => alert("Inline callback chạy!");

        // 4️⃣ Props Callback
        const handleAlert = useCallback(() => {
          alert("Con vừa gọi cha!");
        }, []);

        // 5️⃣ Hook Callback
        useEffect(() => {
          console.log("🟢 Effect chạy sau render:", count);
          return () => console.log("🔴 Cleanup trước render lại");
        }, [count]);

        // 6️⃣ Closure Callback
        const increase = () => setCount((prev) => prev + 1);

        return (
          <div style={{ fontFamily: "system-ui", padding: 20 }}>
            <h2>5 — Calling Functions</h2>
            <button onClick={sayHi}>Direct Call (console)</button>
            <button onClick={handleClick}>Event Callback (alert)</button>
            <button onClick={handleInline}>Inline Callback</button>
            <button onClick={increase}>Closure Callback (+)</button>
            <p>Count: {count}</p>
            <Child onAlert={handleAlert} />
          </div>
        );
      }

      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<App />);
    </script>
  </body>
</html>
```

🧠 **Giải thích:**

- `sayHi()` chạy ngay khi bấm → direct call.
- `onClick={handleClick}` → React sẽ **gọi lại** khi event click xảy ra.
- `onClick={() => fn()}` → tạo **inline callback** (một closure).
- `setCount(prev => prev + 1)` → closure callback, giúp lấy state mới nhất.
- `<Child onAlert={fn} />` → hàm truyền qua **props**, con sẽ **gọi lại**.

---

## 4️⃣ Props callback chi tiết

```jsx
function Child({ onPing }) {
  return <button onClick={onPing}>Ping cha</button>;
}

function Parent() {
  function handlePing() {
    alert("Cha được ping!");
  }
  return <Child onPing={handlePing} />;
}
```

🧩 **Cơ chế:**

- `Parent` truyền xuống con 1 hàm `onPing`.
- Khi con bấm nút, React gọi `onPing()` → thực thi hàm của cha.  
  → Đây là **callback từ con lên cha**, rất phổ biến.

---

## 5️⃣ Hook callback (useEffect)

```jsx
React.useEffect(() => {
  console.log("Effect chạy sau render");
  return () => console.log("Cleanup trước render lại hoặc unmount");
}, []);
```

🧠 React **tự gọi** callback của `useEffect` sau khi render DOM.  
Hàm return bên trong là **cleanup function**.

---

## 6️⃣ Closure callback (tránh stale state)

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);

  function handleAdd() {
    setCount((prev) => prev + 1); // ✅ closure function
  }

  return <button onClick={handleAdd}>Count: {count}</button>;
}
```

🧠 `setCount(prev => prev + 1)` là **closure function** —  
hàm con “nhớ” biến `prev` (giá trị mới nhất).

---

## 7️⃣ Gọi hàm trong JSX (khi nào nên / không nên)

| Tình huống            | Viết sao                      | Nên dùng?                  |
| --------------------- | ----------------------------- | -------------------------- |
| Gọi ngay trong render | `{sayHi()}`                   | ❌ Trừ khi muốn chạy ngay  |
| Truyền làm callback   | `onClick={sayHi}`             | ✅ Chuẩn                   |
| Gọi với tham số       | `onClick={() => sayHi("Hi")}` | ✅ OK                      |
| Gọi hàm tạo component | `<Component />`               | ✅ React tự gọi khi render |

---

## 8️⃣ Gọi function component (React gọi hộ bạn)

```jsx
function Hello({ name }) {
  return <h1>Hello {name}</h1>;
}

// React sẽ tự gọi Hello({name: "React"})
<Hello name="React" />;
```

🧠 Không cần `Hello()` thủ công — React sẽ gọi component khi render.  
Nếu bạn **tự gọi `Hello()`**, nó trả về **JSX element**, không gắn DOM.

---

## 9️⃣ Kết hợp: callback chain

```jsx
function A() {
  const handleA = () => alert("A gọi B");
  return <B onPing={handleA} />;
}
function B({ onPing }) {
  const handleB = () => {
    console.log("B gọi hàm cha A");
    onPing();
  };
  return <button onClick={handleB}>Click B</button>;
}
```

→ Khi click B: React gọi `handleB()` → gọi `onPing()` → chạy `handleA()`.

---

## 🔟 Tổng kết nhanh

| Dạng             | Ai gọi    | Khi nào              | Ví dụ                    |
| ---------------- | --------- | -------------------- | ------------------------ |
| Direct           | Bạn       | Khi chạy code        | `fn()`                   |
| Event callback   | React     | Khi event xảy ra     | `onClick={fn}`           |
| Inline callback  | React     | Khi event            | `onClick={() => fn()}`   |
| Props callback   | Con       | Khi gọi lại          | `<Child onPing={fn} />`  |
| Hook callback    | React     | Sau render / cleanup | `useEffect(() => {...})` |
| Closure callback | JS Engine | Khi cần giá trị cũ   | `setState(prev => ...)`  |

---

## ✅ Checklist nhớ

- [x] Có ngoặc `()` → gọi hàm ngay.
- [x] Không có ngoặc → truyền tham chiếu (callback).
- [x] Trong React, hầu hết **React tự gọi** callback khi event/render xảy ra.
- [x] Dùng `setState(prev => ...)` để tránh stale state.
- [x] Truyền callback giữa cha-con → props callback.

---

## 📚 Đọc thêm

- MDN — Functions and Function Invocation
- React Docs — Handling Events, State Updates
- “You Don’t Know JS Yet” — Scope & Closures (Kyle Simpson)

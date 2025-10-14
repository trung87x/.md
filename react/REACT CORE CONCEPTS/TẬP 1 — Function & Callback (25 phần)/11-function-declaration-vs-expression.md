# 11 — Function Declaration vs Expression vs Arrow cho React Dev

> Mục tiêu: phân biệt **Function Declaration**, **Function Expression**, và **Arrow Function** — hiểu cách chúng sống trong bộ nhớ, gọi khi nào, và ứng dụng đúng trong React.

---

## 0) TL;DR

| Loại            | Cú pháp                    | Hoisting | `this`             | `arguments` | Dùng nhiều trong React                       |
| --------------- | -------------------------- | -------- | ------------------ | ----------- | -------------------------------------------- |
| **Declaration** | `function fn() {}`         | ✅ Có    | Có riêng           | Có          | Thỉnh thoảng (utils, helper ngoài component) |
| **Expression**  | `const fn = function() {}` | ❌ Không | Có riêng           | Có          | Ít dùng                                      |
| **Arrow**       | `const fn = () => {}`      | ❌ Không | ❌ Không (lexical) | ❌ Không    | 🥇 Phổ biến nhất                             |

---

## 1️⃣ Function Declaration

```js
function sayHi() {
  console.log("Hi!");
}
sayHi(); // ✅ Gọi được trước khi định nghĩa
```

🧠 **Đặc điểm:**

- **Hoisting:** Được “kéo lên đầu” scope → có thể gọi **trước khi khai báo**.
- Có `this`, `arguments`, `prototype` riêng.
- Tốt khi cần **định nghĩa trước, gọi sau** (vd: utils, helper).

---

## 2️⃣ Function Expression

```js
const sayHi = function () {
  console.log("Hi Expression");
};
sayHi(); // ✅ Gọi sau khi định nghĩa
```

🧠 **Đặc điểm:**

- Không hoisting (chỉ biến được hoisting, chưa có giá trị).
- Có `this` và `arguments` riêng.
- Dùng khi cần **biểu thức gán hàm** hoặc **closure cục bộ**.

---

## 3️⃣ Arrow Function (→)

```js
const sayHi = () => console.log("Hi Arrow");
sayHi();
```

🧠 **Đặc điểm chính:**

- **Không có `this` riêng** → “mượn” `this` của scope ngoài (lexical `this`).
- **Không có `arguments`** → dùng rest parameter (`...args`).
- Không dùng làm constructor (`new`) được.
- Dùng nhiều trong React: component, event handler, callback.

---

## 4️⃣ So sánh nhanh

| Thuộc tính           | Declaration            | Expression | Arrow                 |
| -------------------- | ---------------------- | ---------- | --------------------- |
| Hoisting             | ✅ Có                  | ❌ Không   | ❌ Không              |
| `this` riêng         | ✅ Có                  | ✅ Có      | ❌ Không              |
| `arguments`          | ✅ Có                  | ✅ Có      | ❌ Không              |
| Dùng làm constructor | ✅ Có                  | ✅ Có      | ❌ Không              |
| Gọn ngắn             | Trung bình             | Trung bình | ✅ Rất gọn            |
| Phù hợp React        | Helper ngoài component | Ít         | 🥇 Component, handler |

---

## 5️⃣ Trong React Component

### Declaration — ít dùng trong component

```jsx
function App() {
  function handleClick() {
    alert("Hi!");
  }
  return <button onClick={handleClick}>Click</button>;
}
```

### Expression — trung gian

```jsx
function App() {
  const handleClick = function () {
    alert("Expression!");
  };
  return <button onClick={handleClick}>Click</button>;
}
```

### Arrow — phổ biến nhất

```jsx
function App() {
  const handleClick = () => alert("Arrow!");
  return <button onClick={handleClick}>Click</button>;
}
```

---

## 6️⃣ Arrow giữ `this` đúng trong class component

```jsx
class Counter extends React.Component {
  state = { count: 0 };

  // Arrow giữ this chính xác
  handleInc = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return <button onClick={this.handleInc}>Count: {this.state.count}</button>;
  }
}
```

🧠 Nếu dùng declaration (`handleInc() {}`) → phải **bind** thủ công trong constructor:  
`this.handleInc = this.handleInc.bind(this)`.

---

## 7️⃣ Arrow trong React Hooks (function component)

```jsx
function Timer() {
  const [sec, setSec] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setSec((prev) => prev + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return <h3>⏱ {sec}s</h3>;
}
```

> Arrow function giúp closure và `this` hoạt động đúng trong hooks, tránh bind phức tạp.

---

## 8️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Declaration vs Expression vs Arrow</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body {
        font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        padding: 20px;
      }
      button {
        margin: 6px;
        padding: 8px 14px;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
      pre {
        background: #f9f9f9;
        padding: 10px;
        border-radius: 8px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      function App() {
        // Declaration
        function dec() {
          console.log("Declaration");
        }
        // Expression
        const expr = function () {
          console.log("Expression");
        };
        // Arrow
        const arrow = () => console.log("Arrow");

        return (
          <div>
            <h2>11 — Function Declaration vs Expression vs Arrow</h2>
            <button onClick={dec}>Declaration</button>
            <button onClick={expr}>Expression</button>
            <button onClick={arrow}>Arrow</button>
            <pre>{`function dec() {}`}</pre>
            <pre>{`const expr = function() {}`}</pre>
            <pre>{`const arrow = () => {}`}</pre>
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

## 9️⃣ Khi nào dùng loại nào trong React

| Trường hợp                              | Gợi ý dùng                        |
| --------------------------------------- | --------------------------------- |
| Helper thuần túy, tái sử dụng nhiều nơi | Function Declaration              |
| Hàm nội bộ trong component              | Arrow hoặc Expression             |
| Event handler                           | 🥇 Arrow                          |
| Hàm callback truyền xuống con           | Arrow + `useCallback`             |
| Class method cần giữ `this`             | Arrow hoặc bind trong constructor |

---

## 🔟 Checklist nhớ

- [x] **Declaration:** Hoisting, có `this` riêng.
- [x] **Expression:** Không hoisting, tạo trong runtime.
- [x] **Arrow:** Ngắn gọn, `this` lexical, không `arguments`.
- [x] React ưu tiên **Arrow Function** (component, handler, callback).
- [x] Với class → Arrow để tránh `bind`.
- [x] Với hooks → Arrow để giữ closure đúng.

---

## 📚 Đọc thêm

- MDN — Functions, Declarations, Expressions
- React Docs — Event Handling, Hooks and Closures
- _You Don’t Know JS Yet_ — Scope & Closures (Kyle Simpson)

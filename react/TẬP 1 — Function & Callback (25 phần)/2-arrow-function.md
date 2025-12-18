# 2 — Arrow Function (⇒) cho React Dev

> Mục tiêu: hiểu **arrow function** từ JS cơ bản đến cách dùng **chuẩn trong React** (component, event handler, callback, memo…). Có kèm snippet “copy–paste là chạy”.

---

## 0) TL;DR (nhanh gọn)

- Ngắn gọn, **không có `this` riêng** (bắt `this` theo **lexical scope**), **không có `arguments`**, **không dùng làm constructor**.
- Thường dùng trong React: **component function**, **event handler**, **inline callback** (`map`, `filter`, `useEffect`, `setState(prev => ...)`).
- Tránh lỗi phổ biến:
  - Trả về **object literal** phải bọc `(...)`: `() => ({ id: 1 })`.
  - **Implicit return** chỉ dùng cho **1 expression**; nếu có `{}` thì cần `return`.
  - **Stale closure**: dùng callback dạng `setState(prev => ...)` hoặc `useCallback` đúng cách.

---

## 1) Cú pháp và ý nghĩa nhanh

| Dạng                        | Ví dụ                                 | Ghi chú                     |
| --------------------------- | ------------------------------------- | --------------------------- |
| Một tham số                 | `x => x * 2`                          | Bỏ ngoặc khi chỉ 1 tham số  |
| Nhiều tham số               | `(a, b) => a + b`                     | Có ngoặc                    |
| Không tham số               | `() => 42`                            | Dấu ngoặc rỗng              |
| Body ngắn (implicit return) | `x => x + 1`                          | Không cần `return`          |
| Body khối (block)           | `x => { const y = x + 1; return y; }` | Dùng `{}` thì phải `return` |
| Trả về object literal       | `() => ({ id: 1, name: "A" })`        | **Phải bọc trong `(...)`**  |

### Không có/Không dùng với Arrow

- **Không có `this` riêng** → không cần bind, rất hợp dùng làm event handler trong function component.
- **Không có `arguments`** → dùng **rest parameter**: `(...args) => {}`.
- **Không dùng làm constructor** → `new (() => {})` là lỗi.
- **Không có `prototype`**.

---

## 2) Arrow trong React Component

### 2.1. Component dạng arrow

```jsx
// App.jsx
export const Hello = ({ name = "React" }) => <h1>Hello {name} 👋</h1>;
```

### 2.2. Event handler (arrow) – tránh bind rườm rà

```jsx
export const Counter = () => {
  const [count, setCount] = React.useState(0);

  const inc = () => setCount((prev) => prev + 1); // ✅ closure chuẩn
  const dec = () => setCount((prev) => prev - 1);

  return (
    <div>
      <button onClick={dec}>-</button>
      <span style={{ margin: "0 8px" }}>{count}</span>
      <button onClick={inc}>+</button>
    </div>
  );
};
```

### 2.3. Truyền tham số cho handler

```jsx
export const List = ({ items = [] }) => {
  const handleRemove = (id) => {
    console.log("Remove", id);
  };
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.title}{" "}
          <button onClick={() => handleRemove(item.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};
```

> Dùng `onClick={() => handleRemove(id)}` **OK** cho UI nhỏ/trung bình. Với danh sách rất lớn, cân nhắc tối ưu (memo, sự kiện uỷ quyền, v.v.).

---

## 3) Callback pattern “chuẩn React” với Arrow

### 3.1. `setState(prev => ...)` – chống **stale state**

```jsx
const [count, setCount] = React.useState(0);

// ❌ Dễ stale nếu chạy trong timer/async:
const wrong = () => setCount(count + 1);

// ✅ Đúng: luôn nhận giá trị mới nhất
const right = () => setCount((prev) => prev + 1);
```

### 3.2. `useEffect` và cleanup

```jsx
React.useEffect(() => {
  const id = setInterval(() => {
    // ✅ luôn đúng nhờ dùng prev
    setCount((prev) => prev + 1);
  }, 1000);
  return () => clearInterval(id);
}, []);
```

### 3.3. `useCallback` giữ **hàm ổn định** qua render

```jsx
const onAlert = React.useCallback(() => {
  alert("Hello!");
}, []);

// Truyền xuống con sẽ không tạo hàm mới mỗi lần (hữu ích khi con được memo)
<Child onAlert={onAlert} />;
```

> Ghi nhớ: Chỉ **useCallback** khi có lý do (memo hóa, dependency của effect, v.v.). Tránh lạm dụng.

---

## 4) Arrow với Array method (map/filter/reduce)

```jsx
const nums = [1, 2, 3, 4];

const doubled = nums.map((n) => n * 2); // [2,4,6,8]
const odds = nums.filter((n) => n % 2 === 1); // [1,3]
const sum = nums.reduce((a, b) => a + b, 0); // 10
```

Trong React render list:

```jsx
<ul>
  {doubled.map((n, i) => (
    <li key={i}>{n}</li>
  ))}
</ul>
```

---

## 5) Các “gotcha” thường gặp

### 5.1. Trả về object literal

```js
// ❌ sai: hiểu là block nên không trả về
const makeUser = () => { id: 1, name: "A" };

// ✅ đúng
const makeUser2 = () => ({ id: 1, name: "A" });
```

### 5.2. Quên `return` khi dùng `{}`

```js
const add = (a, b) => {
  a + b;
}; // ❌ undefined
const add2 = (a, b) => a + b; // ✅ implicit return
const add3 = (a, b) => {
  return a + b;
}; // ✅
```

### 5.3. `arguments` không tồn tại

```js
const logAll = () => {
  // console.log(arguments); // ❌ ReferenceError
};

const logAll2 = (...args) => {
  console.log(args); // ✅ dùng rest parameter
};
```

### 5.4. Không dùng `new` với arrow

```js
const Ctor = () => {};
new Ctor(); // ❌ TypeError
```

---

## 6) Arrow + Destructuring + Default params

```jsx
// Destructure props + default value
export const Avatar = ({ src = "/default.png", size = 48, ...rest }) => (
  <img src={src} width={size} height={size} alt="" {...rest} />
);

// Destructure trong tham số callback
users.map(({ id, name }) => <li key={id}>{name}</li>);

// Default cho tham số
const pow = (x, y = 2) => x ** y;
```

---

## 7) Currying / Factory nhỏ gọn với Arrow

```js
const withPrefix = (prefix) => (str) => `${prefix}${str}`;
const warn = withPrefix("⚠️ ");
console.log(warn("Disk almost full")); // "⚠️ Disk almost full"
```

Áp dụng trong React:

```jsx
const handleSelectFactory = (setSelected) => (id) => setSelected(id);
// ...
<button onClick={handleSelectFactory(setSelected)(item.id)}>Pick</button>;
```

---

## 8) Demo HTML chạy ngay (CDN + Babel)

Lưu thành `index.html` và mở bằng server tĩnh (hoặc trình duyệt hiện đại).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Arrow Function + React Demo</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      const { useState, useEffect, useCallback } = React;

      const Item = React.memo(function Item({ item, onRemove }) {
        console.log("Render Item", item.id);
        return (
          <li>
            {item.title}{" "}
            <button onClick={() => onRemove(item.id)}>Remove</button>
          </li>
        );
      });

      const App = () => {
        const [items, setItems] = useState([
          { id: 1, title: "Learn Arrow Function" },
          { id: 2, title: "Practice React" },
          { id: 3, title: "Ship Feature" },
        ]);
        const [count, setCount] = useState(0);

        // ✅ useCallback giữ hàm ổn định cho React.memo
        const handleRemove = useCallback((id) => {
          setItems((prev) => prev.filter((x) => x.id !== id));
        }, []);

        // ✅ setInterval + prev => tránh stale closure
        useEffect(() => {
          const id = setInterval(() => setCount((prev) => prev + 1), 1000);
          return () => clearInterval(id);
        }, []);

        return (
          <div style={{ fontFamily: "system-ui", padding: 16 }}>
            <h1>Arrow Function in React</h1>
            <p>Timer: {count}</p>
            <ul>
              {items.map((item) => (
                <Item key={item.id} item={item} onRemove={handleRemove} />
              ))}
            </ul>
          </div>
        );
      };

      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<App />);
    </script>
  </body>
</html>
```

---

## 9) Checklist “dùng đúng”

- [ ] Cần return object literal? → `() => ({ ... })`
- [ ] Callback setState? → `setX(prev => ...)`
- [ ] Truyền handler cho con và muốn tối ưu re-render? → `useCallback` + `React.memo`
- [ ] Dùng nhiều tham số còn “ẩn danh”? → cân nhắc đặt tên hàm cho dễ debug
- [ ] Tránh lạm dụng inline arrow trong list cực lớn (tối ưu sau khi đo đạc).

---

## 10) Tài liệu đề xuất (đọc thêm)

- MDN — Arrow function expressions
- React Docs — State as a snapshot, State updates are merged, Memoization

> Cần mình xuất thêm phiên bản **.html** riêng cho phần demo hoặc chia file theo cấu trúc dự án (App.jsx, index.jsx) không? Mình có thể tạo sẵn để bạn tải về.

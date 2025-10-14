# 9 — Destructuring in Function Parameters (Giải cấu trúc trong tham số hàm) cho React Dev

> Mục tiêu: nắm vững destructuring trực tiếp **ngay trong tham số hàm**, đặc biệt dùng với **React props**. Có TL;DR, bảng mẫu, ví dụ nâng cao, và demo chạy ngay (CDN + Babel).

---

## 0) TL;DR

- **Destructuring parameter**: lấy giá trị từ **object/array** ngay tại **chữ ký hàm**.
- Dùng nhiều trong React: `function Button({ label, ...props }) { ... }`.
- Hỗ trợ: **default value**, **rename key**, **nested destructuring**, **rest (`...rest`)**.
- Ưu điểm: **ngắn gọn**, **rõ ràng**; tránh `props.foo`, `props.bar` lặp lại.

---

## 1️⃣ Cú pháp cơ bản với Object

```js
function greet({ name, age }) {
  console.log(`Hello ${name} (${age})`);
}
greet({ name: "Alice", age: 24 });
```

### Thêm default value

```js
function greet({ name = "Guest", age = 0 }) {
  console.log(`Hello ${name} (${age})`);
}
greet({}); // Hello Guest (0)
```

### Đổi tên key (rename)

```js
function greet({ name: fullName, age: years }) {
  console.log(fullName, years);
}
```

### Gom phần còn lại (rest)

```js
function pickTitle({ title, ...rest }) {
  return { title, rest };
}
```

---

## 2️⃣ Cú pháp với Array

```js
function sum([a, b, c = 0]) {
  return a + b + c;
}
sum([1, 2]); // 3
sum([1, 2, 3]); // 6
```

> Với array, vị trí **theo index**; có thể bỏ qua phần tử: `function f([, second]) {}`.

---

## 3️⃣ Dùng trong React Component (phổ biến)

### 3.1. Destructure props ngay tại tham số

```jsx
function Button({ label, onClick, ...props }) {
  return (
    <button onClick={onClick} {...props}>
      {label}
    </button>
  );
}
```

### 3.2. Default value cho prop

```jsx
function Avatar({ src = "/default.png", size = 48, alt = "", ...rest }) {
  return <img src={src} width={size} height={size} alt={alt} {...rest} />;
}
```

### 3.3. Rename prop (tránh xung đột tên biến)

```jsx
function Field({ id: inputId, label, ...rest }) {
  return (
    <label htmlFor={inputId}>
      {label}
      <input id={inputId} {...rest} />
    </label>
  );
}
```

### 3.4. Nested destructuring (cẩn trọng)

```jsx
function UserCard({ user: { name, email, address: { city } = {} } = {} }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
      <small>{city}</small>
    </div>
  );
}
```

> Luôn cấp **default `{}`** cho cấp lồng nhau để tránh lỗi **Cannot destructure 'undefined'**.

---

## 4️⃣ So sánh: destructure trong tham số vs. trong body

```jsx
// A) Trong tham số (ngắn gọn)
function Header({ title, subtitle }) {
  return (
    <h1>
      {title} — {subtitle}
    </h1>
  );
}

// B) Trong body (linh hoạt đặt điều kiện)
function Header2(props) {
  const { title, subtitle } = props;
  return (
    <h1>
      {title} — {subtitle}
    </h1>
  );
}
```

- **Tham số**: gọn, thường dùng.
- **Trong body**: phù hợp nếu cần logic trước khi destructure (vd: kiểm tra null/undefined).

---

## 5️⃣ Mẫu kết hợp mạnh (destructure + rest + spread)

```jsx
function Panel({ title, className = "", ...rest }) {
  return (
    <section className={`p-4 rounded shadow ${className}`} {...rest}>
      <h3 className="font-semibold mb-2">{title}</h3>
      {rest.children}
    </section>
  );
}

// Dùng:
<Panel title="Welcome" className="bg-white" data-id="x">
  <p>Hello</p>
</Panel>;
```

> `...rest` gom các prop còn lại (kể cả `children`), và `{...rest}` **trải** chúng xuống DOM.

---

## 6️⃣ Pitfalls (lỗi hay gặp) & Cách né

### 6.1. Destructure từ `undefined`

```js
function f({ a }) {} // ❌ nếu truyền undefined/null
f(); // TypeError
```

**Sửa:**

```js
function f({ a } = {}) {}
f(); // OK
```

### 6.2. Nested mà quên default

```js
function g({ user: { name } }) {} // ❌ nếu user = undefined
```

**Sửa:**

```js
function g({ user: { name } = {} } = {}) {}
```

### 6.3. Lạm dụng nested quá sâu → code khó đọc

→ Tách nhỏ component/hàm, destructure ở **gần nơi dùng**.

### 6.4. Xung đột tên biến

```js
const title = "Outside";
function Comp({ title }) {
  // shadowing biến ngoài
  return <h1>{title}</h1>;
}
```

→ Đổi tên param: `{ title: headerTitle }`.

---

## 7️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Destructuring Parameters Demo</title>
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
      .row {
        display: flex;
        gap: 8px;
        margin-top: 8px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      function Button({ label, ...rest }) {
        return <button {...rest}>{label}</button>;
      }

      function Field({ id: inputId, label, ...rest }) {
        return (
          <label htmlFor={inputId} className="row">
            <span>{label}</span>
            <input id={inputId} {...rest} />
          </label>
        );
      }

      function UserCard({
        user: { name, email, address: { city } = {} } = {},
      }) {
        return (
          <div className="card">
            <strong>{name || "Unknown"}</strong>
            <div>{email || "N/A"}</div>
            <small>{city || "—"}</small>
          </div>
        );
      }

      function App() {
        const u = {
          name: "Alice",
          email: "alice@ex.com",
          address: { city: "HN" },
        };
        return (
          <div>
            <h2>9 — Destructuring in Function Parameters</h2>
            <div className="card">
              <Button
                label="Click me"
                onClick={() => alert("Hi")}
                className="btn"
              />
            </div>
            <div className="card">
              <Field
                id="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
              />
            </div>
            <UserCard user={u} />
            <UserCard /> {/* vẫn an toàn nhờ default {} */}
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

## 8️⃣ Tổng kết nhanh

| Chủ điểm     | Ví dụ                            | Ghi chú              |
| ------------ | -------------------------------- | -------------------- |
| Basic object | `function f({a,b}){}`            | Gọn, rõ              |
| Default      | `function f({a=1}={}){}`         | Tránh lỗi undefined  |
| Rename       | `function f({id: userId}){}`     | Né trùng tên         |
| Rest         | `function f({a,...rest}){}`      | Gom phần còn lại     |
| Nested       | `function f({u:{name}={}}={}){}` | Nhớ cấp default `{}` |
| Array        | `function f([a,,c=0]){}`         | Theo index           |

---

## 9️⃣ Checklist nhớ

- [x] Với props có thể **vắng**: thêm default `{}` ở **mọi cấp** cần thiết.
- [x] Tên biến bị trùng? → **rename** ngay trong tham số.
- [x] Cần pass-through nhiều prop? → dùng `...rest` + `{...rest}`.
- [x] Nested sâu khó đọc → tách nhỏ component/hàm.
- [x] Array destructuring: nhớ **theo index** và có thể **bỏ chỗ**.

---

## 🔟 Đọc thêm

- MDN — Destructuring assignment
- React Docs — Passing Props, JSX Spread Attributes
- _You Don’t Know JS Yet_ — Scope & Closures (bổ trợ hiểu sâu về scope khi destructuring)

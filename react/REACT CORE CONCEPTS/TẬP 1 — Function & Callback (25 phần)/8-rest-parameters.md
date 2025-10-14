# 8 — Rest Parameters (`...args`) cho React Dev

> Mục tiêu: hiểu rõ cú pháp `...rest` trong hàm JavaScript và React: cách gom đối số, destructuring props, kết hợp spread operator, và ứng dụng thực tế trong component.

---

## 0) TL;DR

- **Rest parameter (`...args`)** gom _các đối số còn lại_ thành một **mảng thật**.
- Dùng trong:
  - Hàm: gom nhiều tham số (`(...args) => {}`)
  - Destructuring: tách phần còn lại của object/array (`const {a, ...rest} = obj`)
  - React: gom props còn lại (`function Button({label, ...props})`)
- Khác với `arguments`: **hỗ trợ arrow**, **có method mảng**, **rõ ràng hơn**.

---

## 1️⃣ Cú pháp cơ bản

```js
function logAll(a, b, ...rest) {
  console.log(a, b); // hai tham số đầu
  console.log(rest); // phần còn lại -> mảng
}

logAll(1, 2, 3, 4, 5);
// 👉 a=1, b=2, rest=[3,4,5]
```

> Rest parameter phải nằm **cuối cùng** trong danh sách tham số.

---

## 2️⃣ So sánh nhanh với `arguments`

| Tính năng            | `arguments`             | `...rest`                  |
| -------------------- | ----------------------- | -------------------------- |
| Kiểu dữ liệu         | Giống mảng (array-like) | Mảng thật                  |
| Dùng trong arrow     | ❌ Không có             | ✅ Có                      |
| Có thể destructuring | ❌ Không                | ✅ Có                      |
| Dễ đọc, rõ ràng      | Thấp                    | Cao                        |
| Trong React          | Không dùng              | ✅ Dùng nhiều (`...props`) |

---

## 3️⃣ Dùng trong arrow function

```js
const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
console.log(sum(1, 2, 3)); // 6
```

> Arrow function **không có `arguments`**, nên **phải dùng `...rest`**.

---

## 4️⃣ Dùng trong destructuring object

```js
const user = { id: 1, name: "Alice", age: 24, country: "VN" };

const { name, ...info } = user;

console.log(name); // "Alice"
console.log(info); // { id: 1, age: 24, country: "VN" }
```

> `...info` chứa **các key còn lại** chưa được destructure.

---

## 5️⃣ Dùng trong React Component

### 🧩 Gom props “phần còn lại”

```jsx
function Button({ label, ...rest }) {
  return <button {...rest}>{label}</button>;
}

// Truyền nhiều props khác
<Button label="Click me" className="btn" id="mainBtn" />;
```

> `...rest` giúp component nhận **bất kỳ prop bổ sung nào** và **truyền xuống phần tử con** — cực phổ biến trong UI library.

---

## 6️⃣ Spread vs Rest

| Cú pháp     | Tên                 | Mục đích                          |
| ----------- | ------------------- | --------------------------------- |
| `...rest`   | **Rest parameter**  | Gom phần còn lại (khi định nghĩa) |
| `...spread` | **Spread operator** | Trải phần tử ra (khi sử dụng)     |

```js
// Rest (gom)
function f(a, ...rest) {}
// Spread (trải)
f(...[1, 2, 3]);
```

### Trong React:

```jsx
function Input({ type = "text", ...props }) {
  return <input type={type} {...props} />;
}

// Spread props ra input
<Input placeholder="Nhập tên" className="p-2 border" />;
```

---

## 7️⃣ Ứng dụng kết hợp (JS + React)

### JS: Clone và override object

```js
const base = { role: "user", active: true };
const user = { name: "Alice", ...base, role: "admin" };
console.log(user); // { name: "Alice", role: "admin", active: true }
```

### React: Wrapper component

```jsx
function Card({ title, children, ...props }) {
  return (
    <div {...props} className={"p-4 shadow " + (props.className || "")}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

<Card title="Hello" className="bg-white rounded">
  <p>Welcome to Card</p>
</Card>;
```

---

## 8️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rest Parameter Demo</title>
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
    </style>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      const Sum = (...nums) => nums.reduce((a, b) => a + b, 0);

      function LogAll(...args) {
        console.log("Arguments:", args);
      }

      function Button({ label, ...rest }) {
        return <button {...rest}>{label}</button>;
      }

      function App() {
        const total = Sum(1, 2, 3, 4);
        return (
          <div>
            <h2>8 — Rest Parameters (`...args`)</h2>
            <p>Tổng: {total}</p>
            <Button label="Click" onClick={() => LogAll("React", "JS", 2025)} />
            <Button
              label="Hover me"
              onMouseOver={() => LogAll("Hover event")}
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

| Ý chính               | Ví dụ                        | Ghi chú              |
| --------------------- | ---------------------------- | -------------------- |
| Gom đối số còn lại    | `function f(a, ...rest)`     | `rest` là mảng thật  |
| Dùng được trong arrow | `(...args) => {}`            | khác `arguments`     |
| Destructuring object  | `{a, ...rest} = obj`         | lấy phần còn lại     |
| Spread props          | `<div {...rest} />`          | phổ biến trong React |
| Kết hợp spread/rest   | `{ ...defaults, ...custom }` | clone & override     |

---

## 🔟 Checklist nhớ

- [x] Rest luôn ở **cuối danh sách tham số**.
- [x] Là **mảng thật**, có thể `.map()` / `.filter()`.
- [x] Không lẫn với spread — spread dùng khi **gọi**, rest dùng khi **định nghĩa**.
- [x] Trong React, dùng `...props` để truyền props linh hoạt.
- [x] Cặp đôi quyền lực: `Rest` (gom) + `Spread` (trải).

---

## 📚 Đọc thêm

- MDN — [Rest Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
- MDN — [Spread syntax (`...`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- React Docs — [JSX Spread Attributes](https://react.dev/reference/react/jsx#spreading-props)

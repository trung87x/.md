# 7 — `arguments` Object (Đối tượng đối số) cho React Dev

> Mục tiêu: hiểu rõ `arguments` trong JavaScript — nó hoạt động thế nào, khác gì với rest parameter `...args`, và **vì sao không có trong arrow function / React function component**.

---

## 1️⃣ `arguments` là gì?

`arguments` là **đối tượng đặc biệt** có sẵn trong **mọi hàm thường (function declaration / expression)**, chứa **tất cả đối số** được truyền vào.

```js
function logAll() {
  console.log(arguments);
}

logAll("React", "JS", 2025);
// 👉 [Arguments] { '0': 'React', '1': 'JS', '2': 2025 }
```

### Đặc điểm:

| Thuộc tính                    | Mô tả                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------- |
| Kiểu                          | `object` dạng “giống mảng” (array‑like, không có `.map()`, `.forEach()`, ...) |
| Index                         | `arguments[0]`, `arguments[1]`, ...                                           |
| Độ dài                        | `arguments.length`                                                            |
| Không có trong arrow function | Arrow function **không có** `arguments` riêng, nó sẽ “mượn” từ scope cha.     |

---

## 2️⃣ Dạng “array‑like” (không phải mảng thật)

```js
function show() {
  console.log(arguments[0]); // ✅ truy cập từng phần tử
  console.log(arguments.length); // ✅ độ dài
  console.log(Array.isArray(arguments)); // ❌ false
  console.log([...arguments]); // ✅ chuyển sang mảng thật
}
show("A", "B", "C");
```

> Dùng spread `[...arguments]` hoặc `Array.from(arguments)` để chuyển sang mảng.

---

## 3️⃣ Không tồn tại trong Arrow Function

```js
const logAll = () => {
  console.log(arguments); // ❌ ReferenceError
};
logAll("A", "B");
```

🧠 Vì arrow function **không tạo scope `arguments` riêng** — nó **thừa hưởng từ scope cha**.

Ví dụ:

```js
function outer() {
  return () => console.log(arguments);
}
outer("X", "Y")(); // 👉 in ra [Arguments] { '0': 'X', '1': 'Y' }
```

---

## 4️⃣ Thay thế hiện đại: Rest Parameter (`...args`)

```js
function logAll(...args) {
  console.log(args); // ✅ là mảng thật
}
logAll("React", "JS", 2025);
```

| `arguments`                       | `...args`                |
| --------------------------------- | ------------------------ |
| object‑like, không có method mảng | mảng thật                |
| không thể dùng trong arrow        | dùng được ở mọi function |
| không hỗ trợ destructuring        | hỗ trợ destructuring     |

---

## 5️⃣ Trong React

React function component **là hàm**, nên về lý thuyết có thể truy cập `arguments`, nhưng:

- Thực tế **không bao giờ cần**.
- React chỉ truyền **một đối số duy nhất: `props`**.
- Sử dụng `arguments` trong component sẽ **rối và phản mẫu**.

```jsx
function Hello() {
  console.log(arguments);
  return <h1>Hello React</h1>;
}
```

Kết quả:

```
[Arguments] { '0': { children: undefined } }
```

> 🧩 React gọi component như `Hello(props)` nên chỉ có `arguments[0]` = `props`.

---

## 6️⃣ So sánh nhanh trong thực tế

```js
// 🧱 Function Declaration
function sum() {
  return [...arguments].reduce((a, b) => a + b);
}
console.log(sum(1, 2, 3)); // 6

// ⚡ Arrow + Rest Parameter
const sum2 = (...nums) => nums.reduce((a, b) => a + b);
console.log(sum2(1, 2, 3)); // 6
```

| Cách        | Ưu điểm              | Nhược điểm                                       |
| ----------- | -------------------- | ------------------------------------------------ |
| `arguments` | Cũ, tương thích rộng | Không có trong arrow, không hỗ trợ destructuring |
| `...args`   | Mới, gọn, linh hoạt  | Không chạy trong ES5 cũ                          |

---

## 7️⃣ Ứng dụng: Component nhận nhiều đối số

Ví dụ sai (dùng `arguments`):

```jsx
function List() {
  console.log(arguments); // ❌ phản mẫu
  return (
    <ul>
      <li>Không nên làm thế</li>
    </ul>
  );
}
```

Ví dụ đúng (dùng rest parameter):

```jsx
function List({ items, ...props }) {
  return (
    <ul {...props}>
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

<List items={["A", "B", "C"]} className="text-lg" />;
```

🧠 `...props` giúp bạn “gom” các prop phụ như `className`, `style`, `id`... — giống tinh thần của `arguments`, nhưng sạch và hiện đại hơn.

---

## 8️⃣ Demo HTML (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Arguments vs Rest Parameter</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      function Legacy() {
        function logAll() {
          console.log("arguments:", arguments);
          alert("Xem console!");
        }
        return <button onClick={logAll}>Legacy arguments</button>;
      }

      const Modern = () => {
        const logAll = (...args) => {
          console.log("args:", args);
          alert("Xem console!");
        };
        return (
          <button onClick={() => logAll("React", "JS")}>Rest Parameter</button>
        );
      };

      function App() {
        return (
          <div style={{ fontFamily: "system-ui", padding: 20 }}>
            <h2>7 — arguments object</h2>
            <Legacy />
            <Modern />
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

| Ý              | `arguments`              | `...args`                        |
| -------------- | ------------------------ | -------------------------------- |
| Kiểu dữ liệu   | Giống mảng, không đầy đủ | Mảng thật                        |
| Trong arrow    | ❌ Không tồn tại         | ✅ Có                            |
| Trong React    | Không nên dùng           | ✅ Dùng nhiều (gom props, event) |
| Tính linh hoạt | Thấp                     | Cao                              |
| Thế hệ         | Cũ (ES3/5)               | Mới (ES6+)                       |

---

## 🔟 Ghi nhớ nhanh

- [x] `arguments` chỉ có trong **function thường**, không có trong **arrow**.
- [x] Dùng `...args` thay thế cho mọi tình huống hiện đại.
- [x] Trong React, chỉ có **`props`** — không có “arguments nhiều đối số”.
- [x] `...props` ≈ tinh thần của `arguments` nhưng sạch hơn, rõ ràng hơn.

---

## 📚 Đọc thêm

- MDN — [`arguments` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)
- MDN — [Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
- React Docs — [JSX Spread Attributes](https://react.dev/reference/react/jsx#spreading-props)

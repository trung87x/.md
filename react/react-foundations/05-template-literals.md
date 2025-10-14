# T0-04 — Template Literals

> 💬 Template literal cho phép nhúng biến vào chuỗi linh hoạt – cực kỳ hữu ích trong JSX và Tailwind.

---

## 🎯 Mục tiêu
- Biết dùng dấu `` (backtick) thay cho "" hoặc ''.
- Nhúng biến và biểu thức bằng `${}`.

---

## 🔹 Ví dụ cơ bản

```js
const name = "Tuan";
console.log(`Hello, ${name}!`); // "Hello, Tuan!"
```

---

## ⚛️ Trong JSX

```jsx
function Welcome({ name }) {
  return <h1>{`Xin chào, ${name}!`}</h1>;
}
```

---

## 🎨 Với Tailwind

```jsx
const active = true;
return <div className={`p-4 ${active ? "bg-blue-500" : "bg-gray-300"}`}>Box</div>;
```

💡 Dễ dàng kết hợp class conditionally mà không cần nối chuỗi thủ công.

---

## ✅ Kết luận
Template literals là cú pháp “ngọt ngào” trong React – giúp xử lý chuỗi, style, và dynamic class dễ dàng hơn.

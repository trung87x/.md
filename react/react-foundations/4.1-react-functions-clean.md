# 4.1 — Essential JavaScript for React: Functions (React-centric View, Clean Version)

> 💡 Trong React, **mọi thứ đều xoay quanh Functions** — component, event handler, hook, callback, v.v.  
> Dưới đây là danh sách các kiểu function trong React, sắp theo **mức độ dùng nhiều → ít dùng**, với ví dụ JSX rõ ràng.

---

## 🥇 1. Arrow Function (→)

**Mức độ:** Cực kỳ phổ biến  
**Dùng cho:** Component, Event handler, Inline callback

```jsx
const Button = ({ label }) => (
  <button onClick={() => alert(label)}>{label}</button>
);
```

**Ghi chú:**

- Ngắn gọn, tự động giữ `this` đúng.
- Không có `arguments`.
- Phổ biến nhất trong React component và callback.

---

## 🥈 2. Function Declaration

**Dùng cho:** Component hoặc helper tách biệt

```jsx
function Header() {
  return <h1>Hello</h1>;
}
```

**Ghi chú:**

- Có hoisting.
- Dễ đọc, thích hợp cho component hoặc utilities.

---

## 🥉 3. Nested Function

**Dùng cho:** Handler nội bộ trong component

```jsx
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    alert("Submitted!");
  }
  return <form onSubmit={handleSubmit}>...</form>;
}
```

**Ghi chú:** Giữ được scope của component, tránh lồng quá sâu.

---

## 4️⃣ 4. Callback / Expression Function

**Dùng cho:** Truyền function qua props

```jsx
const handleClick = function () {
  console.log("Clicked");
};

<button onClick={handleClick} />;
```

**Ghi chú:** Gần giống arrow function, nhưng có `this` riêng.

---

## 5️⃣ 5. Closure Function

**Dùng trong:** Hook và logic stateful

```jsx
function useCounter() {
  let count = 0;
  return () => ++count;
}
```

**Ghi chú:** Giúp “nhớ giá trị” giữa các lần gọi — nền tảng cho `useState`, `useEffect`.

---

## 6️⃣ 6. Cleanup Function (trong `useEffect`)

**Dùng cho:** Dọn dẹp event, timer, subscription — tránh rò rỉ bộ nhớ

```jsx
useEffect(() => {
  console.log("🟢 Effect chạy với count");

  // ⬇️ Cleanup function (chạy trước khi effect mới chạy hoặc khi unmount)
  return () => {
    console.log("🔴 Cleanup trước khi chạy effect mới");
  };
}, [count]);
```

**Ghi chú:**

- Là **hàm được return trong `useEffect`**.
- Chạy **trước** khi effect mới chạy lại, hoặc khi component **unmount**.
- Bản chất là **closure**, vì nó “nhớ” các biến tại thời điểm effect được tạo.
- Dùng để huỷ event listener, timer, request, hoặc reset dữ liệu tạm.

---

## 7️⃣ 7. Scope & Scope Chain

**Dùng cho:** Truy cập biến trong phạm vi cha

```jsx
function App() {
  const user = "Tuan";
  function Header() {
    return <h1>{user}</h1>;
  }
  return <Header />;
}
```

**Ghi chú:** Biến trong parent vẫn truy cập được ở child function.

---

## 8️⃣ 8. Default Parameter

**Dùng cho:** Props có giá trị mặc định

```jsx
function Button({ label = "Click me" }) {
  return <button>{label}</button>;
}
```

**Ghi chú:** Giúp tránh lỗi `undefined` khi props bị thiếu.

---

## 9️⃣ 9. Rest Parameter (`...props`)

**Dùng cho:** Spread props ra element

```jsx
function Card({ title, ...rest }) {
  return <div {...rest}>{title}</div>;
}
```

**Ghi chú:** Dễ dàng truyền nhiều thuộc tính mà không cần liệt kê.

---

## 🔟 10. Calling Functions (Callback)

**Dùng cho:** Gọi hàm khi event xảy ra

```jsx
function Child({ onAction }) {
  return <button onClick={onAction}>Go</button>;
}
```

**Ghi chú:** Mỗi lần render, function có thể được “tạo mới” → nên dùng `useCallback` khi cần tối ưu.

---

## 11️⃣ 11. IIFE (Immediately Invoked Function Expression)

**Dùng cho:** Tính toán giá trị ngay khi khởi tạo

```jsx
const items = (() => Array.from({ length: 5 }, (_, i) => i + 1))();
```

**Ghi chú:** Dùng để khởi tạo constant hoặc dữ liệu ban đầu cho component.

---

## 12️⃣ 12. Recursion (Đệ quy)

**Dùng cho:** Component lặp lại cấu trúc lồng nhau

```jsx
function Tree({ data }) {
  return (
    <ul>
      {data.map((n) => (
        <li key={n.id}>
          {n.name}
          {n.children && <Tree data={n.children} />}
        </li>
      ))}
    </ul>
  );
}
```

**Ghi chú:** Dùng cho menu, danh mục, hoặc comment thread.

---

## 13️⃣ 13. Hoisting

**Dùng cho:** Function Declaration có thể gọi trước khi định nghĩa

```jsx
Header(); // OK
function Header() {}
```

**Ghi chú:** Arrow function **không hoist** → chú ý thứ tự định nghĩa.

---

## 14️⃣ 14. Conditional Function

**Dùng cho:** Tạo function khác nhau theo điều kiện

```jsx
const handleClick = isAdmin ? () => alert("Admin") : () => alert("User");
```

**Ghi chú:** Giúp linh hoạt handler nhưng tránh định nghĩa lại mỗi render.

---

## 15️⃣ 15. `arguments` Object

**Dùng cho:** Truy cập tất cả tham số trong function truyền thống

```jsx
function logAll() {
  console.log(arguments);
}
logAll("React", "JS");
```

**Ghi chú:** Arrow function không có `arguments`, nên dùng rest `(...args)` thay thế.

---

## ⚛️ Tóm tắt theo nhóm sử dụng trong React

| Nhóm mục đích                       | Các loại function liên quan                  | Tần suất                             |
| ----------------------------------- | -------------------------------------------- | ------------------------------------ |
| 🧩 **Xây dựng Component & Handler** | Arrow, Declaration, Nested                   | 🌕 Rất thường xuyên                  |
| 🔁 **Quản lý logic nội bộ**         | Closure, Cleanup, Scope, Default/Rest Params | 🌕 Thường xuyên                      |
| 🧠 **Tối ưu hiệu năng / đặc biệt**  | Callback Expression, IIFE, Recursion         | 🌗 Trung bình                        |
| 🧱 **Cơ chế ngầm của JS**           | Hoisting, Conditional, arguments             | 🌑 Ít dùng trực tiếp, nhưng nên hiểu |

---

## 📘 Gợi ý cấu trúc tài liệu

```md
4.1 Essential JavaScript for React — Functions

I. Core Functions in React (Arrow, Declaration)
II. Internal Logic (Nested, Closure, Cleanup, Scope)
III. Props & Parameters (Default, Rest, arguments)
IV. Rendering Patterns (Recursion, Conditional, IIFE)
V. Underlying Mechanisms (Hoisting, Scope Chain)
```

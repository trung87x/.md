# T0-01 — Object Basics

> 🧱 Hiểu rõ về Object trong JavaScript – nền tảng của props, state và cấu trúc dữ liệu trong React.

---

## 🎯 Mục tiêu
- Biết tạo, truy cập, và clone object.
- Hiểu `spread` và `rest` operator trong React props.
- Ứng dụng object để truyền dữ liệu và cấu hình component.

---

## 🧩 Object cơ bản

```js
const user = {
  name: "Tuan",
  age: 25,
};

console.log(user.name); // "Tuan"
console.log(user["age"]); // 25
```

---

## 🔁 Clone và Spread Object

```js
const base = { theme: "dark" };
const config = { ...base, layout: "grid" };

console.log(config); // { theme: "dark", layout: "grid" }
```

💡 Spread giúp bạn sao chép hoặc mở rộng object dễ dàng.

---

## 🧱 Rest Parameter trong Object

```js
const { theme, ...rest } = config;
console.log(theme); // "dark"
console.log(rest); // { layout: "grid" }
```

---

## ⚛️ Trong React

```jsx
function Card({ title, ...props }) {
  return <div {...props}>{title}</div>;
}
```

📘 Ghi nhớ: `props` thực chất là một **object** chứa toàn bộ dữ liệu truyền xuống component.

---

## ✅ Kết luận
Object là cấu trúc trung tâm trong React — mọi props, state và config đều xoay quanh nó.

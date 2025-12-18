# T0-03 — Destructuring

> 🧠 Destructuring giúp code React ngắn gọn, rõ ràng và dễ đọc hơn.

---

## 🎯 Mục tiêu
- Biết destructuring object và array.
- Ứng dụng trong props, hooks và state.

---

## 🔹 Destructuring Object

```js
const user = { name: "Tuan", age: 25 };
const { name, age } = user;
console.log(name); // "Tuan"
```

---

## 🔹 Destructuring Array

```js
const coords = [10, 20];
const [x, y] = coords;
console.log(x, y); // 10 20
```

---

## ⚛️ Trong React Component

```jsx
function Profile({ name, age }) {
  return <p>{name} — {age}</p>;
}
```

💡 `props` là object → destructuring trực tiếp ở tham số giúp code sạch hơn.

---

## ⚛️ Trong Hook

```jsx
const [count, setCount] = useState(0);
```

Đây cũng chính là **array destructuring**.

---

## ✅ Kết luận
Destructuring giúp React code gọn hơn, dễ hiểu hơn, và là cú pháp bắt buộc phải quen.

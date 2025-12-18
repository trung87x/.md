# T0-06 — ES Modules: Import & Export

> 📦 Hiểu cơ chế import/export giúp bạn chia nhỏ code React thành module gọn gàng, tái sử dụng dễ dàng.

---

## 🎯 Mục tiêu
- Phân biệt default vs named export.
- Biết cách import alias, export nhiều thành phần.

---

## 🔹 Named Export / Import

```js
// utils.js
export function sum(a, b) {
  return a + b;
}
export const PI = 3.14;

// app.js
import { sum, PI } from "./utils.js";
```

---

## 🔹 Default Export / Import

```js
// math.js
export default function add(a, b) {
  return a + b;
}

// app.js
import add from "./math.js";
```

💡 Một file chỉ có 1 default export.

---

## 🔹 Export alias

```js
export { sum as addNumbers };
```

---

## ⚛️ Trong React

```jsx
// components/Button.jsx
export default function Button() { ... }

// index.js
import Button from "./components/Button.jsx";
```

Hoặc gom lại trong `index.js`:

```js
export { default as Button } from "./Button";
export { default as Card } from "./Card";
```

Giúp import gọn hơn:

```js
import { Button, Card } from "./components";
```

---

## ✅ Kết luận
ES Modules là nền tảng chia nhỏ ứng dụng React. Biết dùng đúng sẽ giúp code tổ chức sạch, dễ maintain, và tối ưu build.

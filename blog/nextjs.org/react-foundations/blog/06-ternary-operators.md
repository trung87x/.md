# T0-05 — Ternary Operators & Conditional Rendering

> ⚖️ Toán tử 3 ngôi giúp viết điều kiện ngắn gọn trong JSX, thay vì dùng `if` lồng nhau.

---

## 🎯 Mục tiêu
- Biết cú pháp và cách dùng `?:`.
- Ứng dụng trong render UI có điều kiện.

---

## 🔹 Cú pháp

```js
condition ? valueIfTrue : valueIfFalse;
```

---

## ⚛️ Trong JSX

```jsx
function Greeting({ isLoggedIn }) {
  return <h1>{isLoggedIn ? "Welcome back!" : "Please sign in"}</h1>;
}
```

---

## 🔹 Với toán tử `&&`

```jsx
{isAdmin && <button>⚙️ Admin Panel</button>}
```

💡 `&&` render khi điều kiện đúng, bỏ qua khi sai.

---

## 🧠 Khi nào dùng?
| Pattern | Dùng khi |
|----------|----------|
| `condition &&` | Hiển thị khi true, không else |
| `condition ? A : B` | Có hai trường hợp rõ ràng |

---

## ✅ Kết luận
Conditional rendering là “vũ khí JSX” – giúp giao diện React phản ứng linh hoạt với state và props.

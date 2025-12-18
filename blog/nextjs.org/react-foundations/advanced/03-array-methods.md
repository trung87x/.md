# T0-02 — Array Methods trong React

> 🧩 Các hàm mảng như `map`, `filter`, `reduce` cực kỳ quan trọng trong việc render danh sách và xử lý dữ liệu trong React.

---

## 🎯 Mục tiêu
- Nắm vững 3 phương thức chính: `map`, `filter`, `reduce`.
- Ứng dụng render danh sách bằng JSX.

---

## 🔹 map()

Duyệt qua mảng và **trả về mảng mới**.

```jsx
const fruits = ["🍎", "🍊", "🍌"];
const list = fruits.map((f) => <li key={f}>{f}</li>);

return <ul>{list}</ul>;
```

---

## 🔹 filter()

Lọc phần tử thỏa điều kiện.

```js
const numbers = [1, 2, 3, 4, 5];
const even = numbers.filter((n) => n % 2 === 0); // [2, 4]
```

---

## 🔹 reduce()

Tính toán tích lũy giá trị.

```js
const total = [1, 2, 3].reduce((sum, n) => sum + n, 0); // 6
```

---

## ⚛️ Ứng dụng thực tế

```jsx
function TodoList({ items }) {
  const done = items.filter((i) => i.done);
  return (
    <ul>
      {done.map((t) => (
        <li key={t.id}>{t.text}</li>
      ))}
    </ul>
  );
}
```

---

## ✅ Kết luận
`map`, `filter`, `reduce` là “vũ khí” không thể thiếu trong React để hiển thị danh sách và xử lý dữ liệu.

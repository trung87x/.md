# 25 — Function & Callback Cheatsheet (React Dev)

> Tài liệu tóm tắt “toàn tập” Function & Callback — gồm pattern, cú pháp, lỗi phổ biến và cách sửa. Dùng như “bảng tra nhanh” hoặc in ra học.

---

## ⚙️ 1️⃣ Function trong React

| Kiểu | Cú pháp | Dùng khi | Ghi chú |
|------|----------|-----------|---------|
| Declaration | `function add(a,b){}` | Định nghĩa logic độc lập | Hoisting |
| Expression | `const add = function(a,b){}` | Khi cần gán/hàm ẩn danh | Không hoisting |
| Arrow | `const add = (a,b) => a+b` | Rất phổ biến trong React | Giữ `this` |
| IIFE | `(function(){...})()` | Chạy tức thì | Hạn chế dùng trong JSX |
| Nested | `function outer(){ function inner(){} }` | Scope riêng | Tạo closure |

---

## ⚡ 2️⃣ Callback — các dạng dùng

| Loại | Ví dụ | Ghi chú |
|------|--------|--------|
| Event | `onClick={handle}` | Hàm React gọi khi event xảy ra |
| Inline | `onClick={() => fn(1)}` | Truyền tham số nhanh |
| Props | `<Child onSave={fn} />` | Con gọi cha xử lý |
| Hook | `useEffect(() => {...}, [])` | React gọi lại theo deps |
| Memo | `useCallback(fn, deps)` | Giữ ref ổn định |
| Closure | `setCount(prev => prev + 1)` | Nhớ state cũ an toàn |

---

## 🧩 3️⃣ Closure chống lỗi stale

| Tình huống | Cách xử lý |
|------------|------------|
| Timer/setInterval | `setX(prev => prev + 1)` hoặc `useRef` |
| Listener/socket | Lưu giá trị mới nhất trong ref |
| Async fetch | Dùng AbortController / cleanup |
| Con memo | Dùng `useCallback(fn, deps)` |
| Long-lived callback | Dùng `useEvent` (React Canary) |

---

## 🔁 4️⃣ Hook liên quan đến callback

| Hook | Dùng cho | Lưu ý |
|------|-----------|------|
| `useEffect` | Side-effect | Cleanup function |
| `useCallback` | Giữ callback ổn định | Phụ thuộc deps |
| `useMemo` | Memo giá trị | Không dùng cho side-effect |
| `useRef` | Giữ giá trị/hàm mới nhất | Không gây render |
| `useEvent` | Giữ logic mới nhất | Đang ở React Canary |

---

## 📊 5️⃣ Mẫu thực tế

```jsx
function Parent() {
  const [value, setValue] = React.useState("");
  const handleChange = React.useCallback((e) => setValue(e.target.value), []);

  return (
    <div>
      <input value={value} onChange={handleChange} />
      <p>{value}</p>
    </div>
  );
}
```

✅ `useCallback` giúp `handleChange` không đổi → con không render lại.

---

## 🧠 6️⃣ Best Practices

✅ Viết hàm nhỏ, tách biệt logic.  
✅ Dùng `useCallback` khi truyền xuống con memo.  
✅ Cleanup effect async (fetch, timer).  
✅ Không gói `setState` trong async mà không kiểm tra mount.  
✅ Luôn đo hiệu năng trước khi tối ưu.

---

## 🧩 7️⃣ Lỗi phổ biến & cách sửa

| Lỗi | Nguyên nhân | Cách sửa |
|------|-------------|----------|
| State không tăng | Closure nhớ state cũ | Dùng `prev =>` |
| Listener không update | Hàm stale | Dùng `ref.current` hoặc `useEvent` |
| Fetch ghi đè kết quả cũ | Race condition | AbortController |
| Con re-render hoài | Callback đổi ref mỗi render | Dùng `useCallback` |
| setState sau unmount | Async chưa cleanup | Cleanup trong effect |

---

## 🧱 8️⃣ Demo nhỏ

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Function & Callback Cheatsheet</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      function App() {
        const [count, setCount] = React.useState(0);
        const inc = React.useCallback(() => setCount(p => p + 1), []);

        return (
          <div>
            <h2>25 — Function & Callback Cheatsheet</h2>
            <button onClick={inc}>Click {count}</button>
          </div>
        );
      }
      ReactDOM.createRoot(document.getElementById("root")).render(<App />);
    </script>
  </body>
</html>
```

---

## ✅ 9️⃣ Checklist học xong

- [x] Nắm 10+ kiểu callback & closure pattern.  
- [x] Biết fix stale closure, cleanup, deps.  
- [x] Hiểu sự khác biệt useCallback vs useEvent.  
- [x] Biết khi nào cần tối ưu (có đo đạc).  
- [x] Có thể dạy lại người khác 😎

---

## 📚 10️⃣ Đọc thêm
- React Docs — Hooks, Events, Refs  
- Kent C. Dodds — Advanced React Patterns  
- Dan Abramov — *A Complete Guide to useEffect*

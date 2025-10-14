# T3-05 — React.memo & Shallow Compare

> Mục tiêu: Hiểu `React.memo` hoạt động thế nào, cơ chế **shallow compare** props, khi nào nên dùng và bẫy thường gặp.

---

## 1) `React.memo` làm gì?
- Bọc component → nếu **props không đổi (shallow)**, React **bỏ qua render** lại.
- Hữu ích khi:
  - Component con **nặng** hoặc **render nhiều**.
  - Cha thường render lại nhưng **props truyền xuống con hiếm đổi**.

```jsx
const Card = React.memo(function Card({ title, children }) {
  console.log("Card render");
  return <section><h3>{title}</h3>{children}</section>;
});
```

---

## 2) Shallow compare là gì?
- So sánh **`Object.is`** từng prop cấp 1.
- Với **object/array/function**, so sánh **tham chiếu** chứ không deep-compare.

```jsx
// Shallow compare ví dụ
Object.is(1, 1)        // true
Object.is("a", "a")    // true
Object.is({a:1}, {a:1})// false (khác tham chiếu)
```

> Vì vậy, nếu prop là **object literal** tạo mới mỗi render → `React.memo` **không chặn** được.

---

## 3) Ổn định props để tận dụng memo
- Memo hóa **object/array/function** bằng `useMemo`/`useCallback`.
```jsx
const options = React.useMemo(() => ({ dense, rounded }), [dense, rounded]);
const onPick = React.useCallback((x) => select(x), [select]);
return <List options={options} onPick={onPick} />;
```

---

## 4) `React.memo` với custom compare
- Có thể truyền hàm so sánh riêng, nhưng thường **không cần**; hãy tối ưu dữ liệu trước.
```jsx
const Row = React.memo(function Row({ item }) {
  /* ... */
}, (prev, next) => prev.item.id === next.item.id && prev.item.count === next.item.count);
```

---

## 5) Bẫy phổ biến
- Bọc **mọi component** bằng `React.memo` → **overhead** không cần thiết.
- Props thay đổi **liên tục** (ví dụ: timestamp, object mới) → memo vô dụng.
- Dùng custom compare phức tạp → tốn CPU hơn là render.

---

## 6) Mini demo (UMD)
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="app"></div>
  <script type="text/babel">
    const Child = React.memo(function Child({ config }) {
      console.log("Child render");
      return <pre>{JSON.stringify(config)}</pre>;
    });

    function App() {
      const [n, setN] = React.useState(0);
      const stable = React.useMemo(() => ({ step: 1 }), []);
      const unstable = { step: 1 }; // luôn mới

      return (
        <div>
          <button onClick={() => setN(n + 1)}>Tick {n}</button>
          <h4>Stable props → Child không render lại</h4>
          <Child config={stable} />
          <h4>Literal props → Child render lại</h4>
          <Child config={unstable} />
        </div>
      );
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 7) Checklist
- [ ] Bọc `React.memo` cho **con nặng/ít đổi**.
- [ ] Ổn định object/array/function props.
- [ ] Tránh custom compare phức tạp—tối ưu dữ liệu trước.
- [ ] Đo bằng Profiler trước & sau khi memo.

---

## 8) Bài tập
1. Bọc component list item bằng `React.memo`, đo số lần render trước/sau.
2. Thử custom compare chỉ so sánh `id` và `count`; đánh giá lợi/hại.
3. Tạo ví dụ object literal vs `useMemo` và quan sát console.
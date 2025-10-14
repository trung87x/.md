# T3-06 — useMemo & useCallback Review (Tối ưu Re-render)

> Mục tiêu: Ôn tập cách dùng `useMemo` & `useCallback` để **ổn định props** và **cache tính toán** khi có chi phí đáng kể.

---

## 1) Khi nào dùng?
- **Tính toán tốn kém** (lọc/sort/map lớn) → `useMemo` để cache theo deps.
- **Truyền handler/object xuống con đã `React.memo`** → `useCallback`/`useMemo` để giữ **tham chiếu** ổn định.
- Không lạm dụng: memo **có chi phí** (so sánh deps, lưu cache).

---

## 2) Công thức nhanh
```jsx
const memoValue = React.useMemo(() => compute(data), [data]);
const memoFn = React.useCallback(() => doSomething(arg), [arg]);
```

- `useCallback(fn, deps)` ≅ `useMemo(() => fn, deps)`.

---

## 3) Mẫu thực tế
### 3.1. Lọc & sort danh sách lớn
```jsx
const visible = React.useMemo(() => {
  const q = query.toLowerCase();
  return items
    .filter((x) => x.name.toLowerCase().includes(q))
    .sort((a, b) => a.price - b.price);
}, [items, query]);
```

### 3.2. Ổn định handler cho con `React.memo`
```jsx
const onPick = React.useCallback((id) => {
  dispatch({ type: "pick", id });
}, [dispatch]);
```

### 3.3. Memo hoá object style/options
```jsx
const style = React.useMemo(() => ({ padding: 8, fontSize: 14 }), []);
return <input style={style} />;
```

---

## 4) Bẫy & khuyến nghị
- Đừng memo hóa những thứ **rẻ** → code phức tạp mà không lợi.
- Thiếu deps → stale; thừa deps → cache phá sản. Dùng ESLint hooks.
- Memo không thay thế kiến trúc tốt (context split, colocation state…).

---

## 5) Mini demo (UMD)
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
    const List = React.memo(function List({ items, onPick }) {
      console.log("List render");
      return <ul>{items.map(x => <li key={x} onClick={() => onPick(x)}>{x}</li>)}</ul>;
    });
    function App() {
      const [n, setN] = React.useState(1000);
      const [tick, setTick] = React.useState(0);

      const items = React.useMemo(() => {
        const arr = Array.from({ length: n }, (_, i) => i);
        for (let i = 0; i < 80_000; i++) {} // mô phỏng tốn kém
        return arr;
      }, [n]);

      const onPick = React.useCallback((x) => console.log("pick", x), []);

      return (
        <div>
          <button onClick={() => setTick(t => t + 1)}>Tick {tick}</button>
          <button onClick={() => setN(v => v + 500)}>Grow {n}</button>
          <List items={items} onPick={onPick} />
        </div>
      );
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 6) Checklist
- [ ] Memo khi **có chi phí rõ** hoặc cần **ổn định tham chiếu**.
- [ ] Đúng deps; bật ESLint hooks.
- [ ] Đo lường bằng Profiler trước khi tối ưu.
- [ ] Kết hợp với `React.memo` ở con.

---

## 7) Bài tập
1. Benchmark đơn giản với danh sách 10k phần tử, so sánh trước/sau memo.
2. Tạo `Child` bọc `React.memo`, thử onClick inline vs `useCallback`.
3. Memo hóa `options`/`style` và quan sát số lần render của con.
# 16 — `useCallback` vs `useMemo` cho React Dev

> Mục tiêu: phân biệt rõ **`useCallback`** và **`useMemo`**, khi nào dùng cái nào, cách phối hợp với `React.memo`, tránh anti‑patterns, và demo chạy ngay (CDN + Babel).

---

## 0) TL;DR

- **`useCallback(fn, deps)`** → ghi nhớ **tham chiếu hàm** (function reference).  
  Dùng khi:

  - Truyền callback cho **con `React.memo`** để tránh re-render.
  - Callback cần nằm trong **deps** của hooks khác (`useEffect`, `useImperativeHandle`…).

- **`useMemo(calc, deps)`** → ghi nhớ **giá trị** trả về (value/costly compute).  
  Dùng khi:
  - Tối ưu **tính toán nặng**.
  - Tránh tạo **object/array mới** làm vỡ so sánh nông ở con `memo`.

> Cả hai **không tự sửa stale closure** — **deps phải đúng**. Nếu callback chạy ngoài lifecycle (timer/listener), cân nhắc **ref giá trị mới nhất** (xem phần Hook Callback).

---

## 1️⃣ Khác nhau cốt lõi

| Thuộc tính     | `useCallback`                          | `useMemo`                                                    |
| -------------- | -------------------------------------- | ------------------------------------------------------------ |
| Ghi nhớ        | **Hàm** (function reference)           | **Giá trị** (kết quả tính)                                   |
| Dùng cho       | Props **callback**, deps của hook      | Props **giá trị**, tính toán tốn kém                         |
| Trả về         | Hàm                                    | Bất kỳ (object/array/number/JSX…)                            |
| Tác động memo  | Tránh thay đổi tham chiếu **hàm**      | Tránh thay đổi tham chiếu **giá trị**                        |
| Thay thế nhau? | ✅ Có thể là `useMemo(() => fn, deps)` | ✅ Có thể là `useMemo(calc, deps)` nhưng kém rõ ràng cho hàm |

> Quy ước: **hàm → `useCallback`**, **giá trị → `useMemo`** để code rõ nghĩa.

---

## 2️⃣ Truyền callback cho `React.memo` (dùng `useCallback`)

```jsx
const Item = React.memo(function Item({ onRemove, item }) {
  console.log("Render Item", item.id);
  return <li onClick={() => onRemove(item.id)}>{item.title}</li>;
});

function List({ initial }) {
  const [items, setItems] = React.useState(initial);

  const onRemove = React.useCallback((id) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []); // giữ tham chiếu ổn định

  return (
    <ul>
      {items.map((i) => (
        <Item key={i.id} item={i} onRemove={onRemove} />
      ))}
    </ul>
  );
}
```

---

## 3️⃣ Tránh tạo object/array mới (dùng `useMemo`)

```jsx
function Toolbar({ selectedIds }) {
  // Nếu không memo, {} mới mỗi render sẽ làm con memo re-render
  const summary = React.useMemo(
    () => ({ total: selectedIds.length }),
    [selectedIds.length]
  );
  return <SummaryPanel data={summary} />; // SummaryPanel là React.memo
}
```

---

## 4️⃣ Có thể hoán đổi?

Bạn có thể viết:

```jsx
const onRemove = React.useMemo(
  () => (id) => setItems((p) => p.filter((x) => x.id !== id)),
  []
);
```

nhưng **ít rõ ràng**. Với **hàm**, hãy dùng `useCallback` để thể hiện ý đồ.

---

## 5️⃣ Deps phải **đúng** (cả hai)

```jsx
const save = React.useCallback(() => api.save(form), [form]); // ✅ có 'form'
const summary = React.useMemo(() => compute(items), [items]); // ✅ có 'items'
```

- Thiếu deps → **stale**.
- Dư deps không cần thiết → mất lợi ích memo (tạo lại mỗi render).

> Gợi ý: Nếu callback chỉ cập nhật state dựa trên giá trị cũ → dùng **functional update** và deps `[]` là hợp lệ.

```jsx
const inc = React.useCallback(() => setN((prev) => prev + 1), []); // ✅ không cần 'n' trong deps
```

---

## 6️⃣ Anti‑patterns phổ biến

1. **Memo mọi thứ**  
   → Tăng độ phức tạp mà không lợi ích rõ ràng. **Chỉ memo khi có lý do đo đạc** (Profiler).

2. **Dùng `useMemo` để chạy side‑effect**  
   → Sai. `useMemo` phải **thuần** (pure), không gọi API/đăng ký listener.

3. **Dùng `useCallback` để “tối ưu” nhưng deps luôn đổi**  
   → Callback vẫn đổi mỗi render → vô ích.

4. **Quên `useMemo` cho object/array props** truyền vào con `memo`  
   → Con re-render do tham chiếu mới, dù nội dung không đổi.

---

## 7️⃣ Mẫu phối hợp chuẩn

### 7.1. List tối ưu với `React.memo` + `useCallback`

```jsx
const Row = React.memo(function Row({ item, onToggle }) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => onToggle(item.id)}
        />
        {item.title}
      </label>
    </div>
  );
});

function Table({ init }) {
  const [rows, setRows] = React.useState(init);
  const onToggle = React.useCallback((id) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, checked: !r.checked } : r))
    );
  }, []);
  return rows.map((r) => <Row key={r.id} item={r} onToggle={onToggle} />);
}
```

### 7.2. Truyền props phức tạp (object) cho con memo

```jsx
const Panel = React.memo(function Panel({ data }) {
  console.log("Panel render");
  return <div>Total: {data.total}</div>;
});

function Host({ items }) {
  const data = React.useMemo(() => ({ total: items.length }), [items.length]);
  return <Panel data={data} />;
}
```

---

## 8️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>useCallback vs useMemo — Demo</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body {
        font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        padding: 20px;
      }
      .card {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 10px;
        margin-bottom: 12px;
      }
      button {
        margin-right: 8px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      const { useState, useMemo, useCallback, memo } = React;

      const Item = memo(function Item({ item, onRemove }) {
        console.log("Item render", item.id);
        return <li onClick={() => onRemove(item.id)}>{item.title}</li>;
      });

      const Panel = memo(function Panel({ data }) {
        console.log("Panel render");
        return <div>Total: {data.total}</div>;
      });

      function App() {
        const [items, setItems] = useState([
          { id: 1, title: "Alpha" },
          { id: 2, title: "Beta" },
          { id: 3, title: "Gamma" },
        ]);
        const [tick, setTick] = useState(0);

        // useCallback: giữ tham chiếu hàm ổn định cho Item
        const onRemove = useCallback((id) => {
          setItems((prev) => prev.filter((x) => x.id !== id));
        }, []);

        // useMemo: giữ object ổn định cho Panel
        const data = useMemo(() => ({ total: items.length }), [items.length]);

        return (
          <div>
            <h2>16 — useCallback vs useMemo</h2>

            <div className="card">
              <button onClick={() => setTick((t) => t + 1)}>
                Rerender host ({tick})
              </button>
              <button
                onClick={() =>
                  setItems((prev) => [
                    ...prev,
                    { id: Date.now(), title: "New" },
                  ])
                }
              >
                Add item
              </button>
            </div>

            <div className="card">
              <ul>
                {items.map((it) => (
                  <Item key={it.id} item={it} onRemove={onRemove} />
                ))}
              </ul>
            </div>

            <div className="card">
              <Panel data={data} />
            </div>
          </div>
        );
      }

      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<App />);
    </script>
  </body>
</html>
```

---

## 9️⃣ Checklist chọn đúng công cụ

- [x] **Truyền HÀM** cho con `memo` hoặc cần deps ổn định → **`useCallback`**.
- [x] **Truyền GIÁ TRỊ** (object/array/costly) cho con `memo` → **`useMemo`**.
- [x] **Deps đầy đủ** cho cả hai — tránh stale.
- [x] Tối ưu **sau khi đo đạc** (Profiler).
- [x] Callback chạy ngoài lifecycle? → **ref giá trị mới nhất** (không thuộc `useCallback`/`useMemo`).

---

## 🔟 Đọc thêm

- React Docs — Memoization (`useMemo`, `useCallback`)
- Dan Abramov — A Complete Guide to useEffect (liên quan deps/stale)
- Kent C. Dodds — When to useMemo/useCallback

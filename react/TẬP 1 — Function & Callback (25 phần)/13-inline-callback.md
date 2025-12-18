# 13 — Inline Callback trong React

> Mục tiêu: hiểu **inline callback** (`onClick={() => ...}`) — khi nào nên dùng, khi nào cần tối ưu, cách truyền tham số, xử lý event, tránh stale state, và tác động đến re-render. Có demo chạy ngay (CDN + Babel).

---

## 0) TL;DR

- **Inline callback** = viết hàm **ngay trong JSX**: `onClick={() => doThing(id)}`.
- **Ưu**: ngắn gọn, truyền tham số dễ, đọc code liền mạch.
- **Nhược**: tạo **hàm mới mỗi render** → có thể phá `React.memo` ở con nếu lạm dụng trên **list rất lớn**.
- **Khi nào đủ tốt**: UI nhỏ/trung bình, event bình thường → **dùng thoải mái**.
- **Khi cần tối ưu**: tách handler + `useCallback`, hoặc **memo hóa component con**, hoặc **uỷ quyền sự kiện**.

---

## 1️⃣ Cú pháp cơ bản

```jsx
<button onClick={() => alert("Hi")}>Say Hi</button>
```

Truyền **tham số**:

```jsx
<button onClick={() => removeById(id)}>Remove #{id}</button>
```

Truyền **event + tham số**:

```jsx
<button onClick={(e) => handleClick(e, id)}>Open</button>
```

> Không cần `e.persist()` với React 17+ (React không còn “event pooling”).

---

## 2️⃣ So với truyền tham chiếu hàm

| Cách       | Viết                         | Dùng khi                         |
| ---------- | ---------------------------- | -------------------------------- |
| Tham chiếu | `onClick={handle}`           | Không cần tham số thêm           |
| Inline     | `onClick={() => handle(id)}` | Cần truyền tham số / logic nhanh |

Ví dụ tương đương:

```jsx
<button onClick={() => inc(1)} />;

// hoặc
const handleInc = () => inc(1);
<button onClick={handleInc} />;
```

---

## 3️⃣ Truyền nhiều tham số & rẽ nhánh nhanh

```jsx
<button onClick={() => play(id, { speed: 1.25, loop: true })}>
  Play
</button>

<a href="/docs" onClick={(e) => { e.preventDefault(); navigate("/docs"); }}>
  Docs (SPA)
</a>
```

> Inline tiện chèn **`preventDefault()` / `stopPropagation()`** và logic nhỏ ngay tại chỗ.

---

## 4️⃣ Tránh stale state với inline

```jsx
function Counter() {
  const [n, setN] = React.useState(0);

  return <button onClick={() => setN((prev) => prev + 1)}>Count: {n}</button>;
}
```

> Dùng **functional update** trong inline để luôn có state mới nhất.

---

## 5️⃣ Ảnh hưởng tới re-render & tối ưu

Inline tạo **hàm mới mỗi render** → nếu truyền vào **con được `React.memo`**, con vẫn re-render vì **prop là hàm đổi tham chiếu**.

### 5.1. Khi nào cần tối ưu

- List **rất lớn** (hàng trăm/hàng nghìn items).
- Con **nặng** (render tốn kém) và dựa vào `React.memo`/`PureComponent`.

### 5.2. Cách tối ưu

- **`useCallback`** cho handler (kèm deps đúng):
  ```jsx
  const onRemove = React.useCallback((id) => {
    /* ... */
  }, []);
  <Item onRemove={onRemove} />;
  ```
- **Bọc con bằng `React.memo`**.
- **Uỷ quyền sự kiện** (ít phổ biến trong React, nhưng có thể áp dụng ở container).

> Tối ưu **sau khi đo đạc** (React DevTools Profiler). Đừng tối ưu sớm.

---

## 6️⃣ Mẫu điển hình trong list

```jsx
const Item = React.memo(function Item({ item, onRemove }) {
  return (
    <li>
      {item.title} <button onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  );
});

function List({ items }) {
  const [data, setData] = React.useState(items);
  const onRemove = React.useCallback((id) => {
    setData((d) => d.filter((x) => x.id !== id));
  }, []);

  return (
    <ul>
      {data.map((i) => (
        <Item key={i.id} item={i} onRemove={onRemove} />
      ))}
    </ul>
  );
}
```

> Ở đây **inline vẫn dùng trong `Item`**, nhưng `onRemove` là **ổn định** nhờ `useCallback` → `Item` không re-render trừ khi `item` đổi.

---

## 7️⃣ Những lỗi nhỏ thường gặp (Gotchas)

1. **Gọi sớm** thay vì truyền hàm:

```jsx
<button onClick={handle(id)} />  // ❌ gọi ngay
<button onClick={() => handle(id)} /> // ✅ đúng
```

2. **Inline quá dài** → khó đọc, khó test.  
   → Tách logic lớn ra hàm đặt tên, inline chỉ gọi.

3. **Deps sai khi chuyển sang `useCallback`** → stale closure.  
   → Ghi đủ deps hoặc chuyển logic sang `setState(prev => ...)`/`ref`.

---

## 8️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Inline Callback Demo</title>
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
      const { useState, useCallback, memo } = React;

      const Item = memo(function Item({ item, onRemove }) {
        console.log("Render Item", item.id);
        return (
          <li>
            {item.title}{" "}
            <button onClick={() => onRemove(item.id)}>Remove</button>
          </li>
        );
      });

      function App() {
        const [items, setItems] = useState([
          { id: 1, title: "Alpha" },
          { id: 2, title: "Beta" },
          { id: 3, title: "Gamma" },
        ]);

        // Handler ổn định, tối ưu cho danh sách lớn
        const onRemove = useCallback((id) => {
          setItems((prev) => prev.filter((x) => x.id !== id));
        }, []);

        return (
          <div>
            <h2>13 — Inline Callback</h2>

            <div className="card">
              <button onClick={() => alert("Inline OK")}>Inline</button>
              <a
                href="/docs"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Prevent default!");
                }}
              >
                Link với preventDefault
              </a>
            </div>

            <div className="card">
              <ul>
                {items.map((item) => (
                  <Item key={item.id} item={item} onRemove={onRemove} />
                ))}
              </ul>
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

## 9️⃣ Tổng kết nhanh

| Ý chính                 | Ví dụ                                | Ghi chú                                 |
| ----------------------- | ------------------------------------ | --------------------------------------- |
| Truyền tham số dễ       | `onClick={() => fn(id)}`             | Ưu điểm lớn của inline                  |
| Xử lý event ngay chỗ    | `(e) => { e.preventDefault(); ... }` | Tiện cho logic nhỏ                      |
| Tránh stale state       | `setX(prev => ...)`                  | Dùng trong inline                       |
| Ảnh hưởng memo          | “Tham chiếu mới mỗi render”          | Tối ưu khi cần với `useCallback`/`memo` |
| Đo đạc trước khi tối ưu | —                                    | Dùng Profiler                           |

---

## 🔟 Checklist nhớ

- [x] UI nhỏ/trung bình → inline **OK**.
- [x] List lớn/nặng → cân nhắc tách handler + `useCallback`.
- [x] Tránh inline dài dòng → tách hàm được đặt tên.
- [x] Cần event + param → `(e) => handle(e, id)`.
- [x] Tránh stale → `setState(prev => ...)` hoặc `ref`.

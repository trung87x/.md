# 14 — Props Callback (Cha ↔ Con) trong React

> Mục tiêu: nắm vững **callback qua props** giữa **Parent ↔ Child**, gồm kiểu chữ ký chuẩn (`onChange`, `onSubmit`, `onSelect`…), thiết kế dữ liệu truyền lên, tối ưu `React.memo` + `useCallback`, và các pattern nâng cao (controlled component, lifting state, reducer‑style). Có demo chạy ngay (CDN + Babel).

---

## 0) TL;DR

- **Props callback** = Cha truyền **hàm** cho Con, Con **gọi lại** để báo sự kiện / dữ liệu lên.
- Chữ ký callback nên **nhỏ gọn** và **dự đoán được**:
  - `onChange(value)` — giá trị mới
  - `onSubmit(data, event?)` — dữ liệu submit + event nếu cần
  - `onSelect(id)` / `onToggle(id, checked)` — chỉ truyền phần **cần thiết**
- Tối ưu: kết hợp **`React.memo`** ở Con + **`useCallback`** ở Cha để giữ **tham chiếu ổn định**.
- Thành phần nhập liệu dùng pattern **controlled component**: Con nhận `value` & báo `onChange(value)`.

---

## 1️⃣ Flow cơ bản: Cha định nghĩa → Truyền xuống → Con gọi

```jsx
function Child({ onPing }) {
  return <button onClick={onPing}>Ping cha</button>;
}

function Parent() {
  const handlePing = () => alert("Child ping!");
  return <Child onPing={handlePing} />;
}
```

> Cha **quyết định state** và hành vi; Con **phát tín hiệu** bằng cách gọi callback.

---

## 2️⃣ Chữ ký hàm callback — “người nhận dễ dùng, người gọi dễ hiểu”

| Tên                  | Chữ ký gợi ý           | Ghi chú                                |
| -------------------- | ---------------------- | -------------------------------------- |
| `onChange`           | `(nextValue)`          | Phù hợp input/slider/select            |
| `onSubmit`           | `(payload, event?)`    | Có thể chèn `e.preventDefault()` ở Con |
| `onSelect`           | `(id)`                 | Item‑picker, dropdown                  |
| `onToggle`           | `(id, checked)`        | Checkbox/switch trong list             |
| `onRemove`           | `(id)`                 | Xoá item                               |
| `onReorder`          | `(fromIndex, toIndex)` | Kéo‑thả                                |
| `onLoad` / `onError` | `(info)`               | Async/reporting                        |

**Rule of thumb:** Truyền **giá trị tinh gọn** mà Cha cần; **không** “đẩy cả event DOM” trừ khi thật sự cần.

---

## 3️⃣ Controlled Component qua props callback

```jsx
const TextField = React.memo(function TextField({ value, onChange, ...rest }) {
  return (
    <input
      {...rest}
      value={value}
      onChange={(e) => onChange(e.target.value)} // chuẩn: báo value tinh
    />
  );
});

function Form() {
  const [name, setName] = React.useState("");
  return (
    <div>
      <TextField value={name} onChange={setName} placeholder="Your name" />
      <p>Hello, {name || "…"}</p>
    </div>
  );
}
```

> Con **không giữ state cuối cùng** → Cha kiểm soát (`value`) và nhận cập nhật qua `onChange(value)`.

---

## 4️⃣ Tối ưu hiệu năng: `React.memo` + `useCallback`

```jsx
const Item = React.memo(function Item({ item, onRemove }) {
  console.log("Render Item", item.id);
  return (
    <li>
      {item.title} <button onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  );
});

function List({ initial }) {
  const [items, setItems] = React.useState(initial);

  // Giữ tham chiếu ổn định → Item không re-render khi item không đổi
  const handleRemove = React.useCallback((id) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  return (
    <ul>
      {items.map((it) => (
        <Item key={it.id} item={it} onRemove={handleRemove} />
      ))}
    </ul>
  );
}
```

> Nếu Con không `memo`, tối ưu này **không khác nhiều** — chỉ dùng khi **đo đạc** thấy cần.

---

## 5️⃣ Pattern “reducer‑style” cho callback phức tạp

```jsx
function Counter({ state, dispatch }) {
  return (
    <div>
      <button onClick={() => dispatch({ type: "dec" })}>-</button>
      <span style={{ margin: "0 8px" }}>{state.count}</span>
      <button onClick={() => dispatch({ type: "inc" })}>+</button>
    </div>
  );
}

function Parent() {
  const [state, setState] = React.useState({ count: 0 });

  const dispatch = React.useCallback((action) => {
    setState((s) => {
      switch (action.type) {
        case "inc":
          return { count: s.count + 1 };
        case "dec":
          return { count: s.count - 1 };
        default:
          return s;
      }
    });
  }, []);

  return <Counter state={state} dispatch={dispatch} />;
}
```

> Khi nghiệp vụ đa dạng, gửi **action** giúp **định nghĩa rõ** luồng dữ liệu (gần giống `useReducer`).

---

## 6️⃣ Truyền `ref`/event hay **value tinh**?

- **Ưu tiên value tinh** (`onChange(value)`) để Cha không phụ thuộc DOM.
- Nếu thật sự cần event DOM: `onSubmit(data, e)` hoặc `onClick(e)` nhưng **trích lọc** ngay trong Con.

---

## 7️⃣ Phối hợp với `useMemo` (tránh tạo object/mảng mới)

```jsx
function Toolbar({ selectedIds, onToggle }) {
  const summary = React.useMemo(
    () => ({ total: selectedIds.length }),
    [selectedIds.length]
  );
  return (
    <div>
      <span>Selected: {summary.total}</span>
      <button onClick={() => onToggle("all", true)}>Select All</button>
    </div>
  );
}
```

> Nếu Con `memo`, hãy chú ý **props tham chiếu** (object/array mới mỗi render) — cân nhắc `useMemo`.

---

## 8️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Props Callback — Parent ↔ Child</title>
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
      ul {
        padding-left: 16px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      const { useState, useCallback, memo } = React;

      const TextField = memo(function TextField({ value, onChange, ...rest }) {
        console.log("TextField render");
        return (
          <input
            {...rest}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      });

      const Item = memo(function Item({ item, onRemove }) {
        console.log("Item render", item.id);
        return (
          <li>
            {item.title}{" "}
            <button onClick={() => onRemove(item.id)}>Remove</button>
          </li>
        );
      });

      function App() {
        const [name, setName] = useState("");
        const [items, setItems] = useState([
          { id: 1, title: "Alpha" },
          { id: 2, title: "Beta" },
          { id: 3, title: "Gamma" },
        ]);

        const handleRemove = useCallback((id) => {
          setItems((prev) => prev.filter((x) => x.id !== id));
        }, []);

        return (
          <div>
            <h2>14 — Props Callback</h2>

            <div className="card">
              <TextField
                value={name}
                onChange={setName}
                placeholder="Your name"
              />
              <p>Hello, {name || "…"}</p>
            </div>

            <div className="card">
              <ul>
                {items.map((it) => (
                  <Item key={it.id} item={it} onRemove={handleRemove} />
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

## 9️⃣ Checklist thiết kế props callback

- [x] Chữ ký rõ ràng, truyền **giá trị tinh** (tránh “quăng cả event”).
- [x] Con có `React.memo`? → dùng `useCallback` ở Cha để **giữ ổn định** tham chiếu hàm.
- [x] Với dữ liệu phức tạp → cân nhắc **reducer‑style** (`dispatch(action)`).
- [x] Tránh tạo object/array mới không cần thiết → `useMemo`.
- [x] Luôn đặt **tên callback bắt đầu bằng `on*`**: `onChange`, `onSubmit`, `onRemove`…

---

## 🔟 Đọc thêm

- React Docs — [Passing Data Deeply with Context] & [Sharing State Between Components]
- React Docs — [Memoizing with `useMemo` and `useCallback`]
- Kent C. Dodds — Application state management patterns

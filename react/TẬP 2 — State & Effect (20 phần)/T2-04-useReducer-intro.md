# Tập 2 · Phần 4 — useReducer Nhập Môn

> Mục tiêu: dùng `useReducer` khi state phức tạp/có nhiều hành động; so sánh với `useState`, viết reducer thuần (pure), và tổ chức action kiểu Redux-like.

---

## 0) TL;DR
- `useReducer(reducer, initialState)` thích hợp khi state **nhiều nhánh cập nhật**, cần **trace** hành động.  
- Reducer phải **thuần (pure)**: không side‑effect, không mutate.  
- Action nên có dạng: `{ type: "inc", payload?: any }`.

---

## 1️⃣ API cơ bản

```jsx
const initial = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "inc": return { count: state.count + 1 };
    case "dec": return { count: state.count - 1 };
    case "set": return { count: action.value };
    default:    return state;
  }
}

const [state, dispatch] = useReducer(reducer, initial);
dispatch({ type: "inc" });
```

---

## 2️⃣ Khi nào chọn `useReducer` thay vì `useState`?
- Nhiều loại cập nhật/điều kiện phức tạp.  
- Cần log/trace (gửi action rõ ràng).  
- Muốn gom logic cập nhật vào **một chỗ** (dễ test).

---

## 3️⃣ Tổ chức action & reducer đẹp

- Tách **constant** cho type: `"inc" | "dec" | "set"`.  
- Có thể viết **action creator**:
```js
const inc = () => ({ type: "inc" });
const set = (value) => ({ type: "set", value });
```

---

## 4️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>T2-04 — useReducer Intro</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 20px; }
      button { margin: 6px; }
      .card { padding: 12px; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 12px; }
      input { padding: 6px 10px; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      const { useReducer, useState } = React;

      const initial = { count: 0 };
      function reducer(state, action) {
        switch (action.type) {
          case "inc": return { count: state.count + 1 };
          case "dec": return { count: state.count - 1 };
          case "set": return { count: action.value };
          default:    return state;
        }
      }

      function App() {
        const [state, dispatch] = useReducer(reducer, initial);
        const [val, setVal] = useState("");

        return (
          <div>
            <h2>T2-04 — useReducer Nhập Môn</h2>
            <div className="card">
              <strong>Count: {state.count}</strong>
              <div>
                <button onClick={() => dispatch({ type: "dec" })}>-</button>
                <button onClick={() => dispatch({ type: "inc" })}>+</button>
              </div>
            </div>
            <div className="card">
              <input value={val} onChange={e => setVal(e.target.value)} placeholder="Set value" />
              <button onClick={() => dispatch({ type: "set", value: Number(val) || 0 })}>
                Set
              </button>
            </div>
          </div>
        );
      }

      ReactDOM.createRoot(document.getElementById("root")).render(<App />);
    </script>
  </body>
</html>
```

---

## 5️⃣ Checklist
- [x] Reducer **pure** và **immutable**.  
- [x] Action có `type` rõ ràng; payload cần thiết.  
- [x] Dùng `useReducer` khi state/phép biến đổi phức tạp.  
- [x] Dễ test: input (state, action) → output (state mới).

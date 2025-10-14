# Tập 2 · Phần 2 — useState Nâng Cao (Object, Array, Lazy Init)

> Mục tiêu: quản lý **object/array state** đúng cách (immutable), dùng **lazy init** để tối ưu, và pattern cập nhật một phần (partial update).

---

## 0) TL;DR

- Cập nhật object/array bằng **bản sao**: `{ ...prev, key: value }`, `[...prev, item]`.  
- **Lazy init**: `useState(() => expensiveInit())` chỉ chạy 1 lần khi mount.  
- Tách nhỏ state nếu **không liên quan** để giảm re-render.

---

## 1️⃣ Object state (immutable update)

```jsx
const [form, setForm] = useState({ name: "", email: "" });

const setField = (field, value) => {
  setForm(prev => ({ ...prev, [field]: value }));
};
```

- Không mutate `prev` trực tiếp.  
- Có thể tách nhỏ: `const [name, setName] = useState("")` nếu 2 trường độc lập.

---

## 2️⃣ Array state (thêm/xóa/sửa)

```jsx
const [list, setList] = useState([{ id: 1, title: "Alpha" }]);

// Thêm
setList(prev => [...prev, { id: Date.now(), title: "New" }]);

// Xóa
setList(prev => prev.filter(x => x.id !== id));

// Sửa
setList(prev => prev.map(x => x.id === id ? { ...x, title } : x));
```

---

## 3️⃣ Lazy initialization

```jsx
const [cache, setCache] = useState(() => {
  // chỉ tính 1 lần khi mount
  return heavyComputeInitialCache();
});
```

- Hữu ích khi `initialState` **tốn kém** để tính.

---

## 4️⃣ Tách state hay gộp state?

- **Tách** khi các phần **không phụ thuộc nhau** và cập nhật **độc lập**.  
- **Gộp** khi các phần **liên quan logic** hoặc cần **cập nhật cùng lúc**.

---

## 5️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>useState Advanced</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 20px; }
      .card { padding: 12px; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 12px; }
      input { margin-right: 8px; padding: 6px 10px; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      const { useState } = React;

      function App() {
        const [form, setForm] = useState({ name: "", email: "" });
        const [list, setList] = useState([{ id: 1, title: "Alpha" }]);
        const setField = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

        return (
          <div>
            <h2>Tập 2 · Phần 2 — useState Nâng Cao</h2>

            <div className="card">
              <input value={form.name} onChange={e => setField("name", e.target.value)} placeholder="Name" />
              <input value={form.email} onChange={e => setField("email", e.target.value)} placeholder="Email" />
              <pre>{JSON.stringify(form, null, 2)}</pre>
            </div>

            <div className="card">
              <button onClick={() => setList(prev => [...prev, { id: Date.now(), title: "New" }])}>Add</button>
              <ul>
                {list.map(it => (
                  <li key={it.id}>
                    {it.title}{" "}
                    <button onClick={() => setList(prev => prev.filter(x => x.id !== it.id))}>Remove</button>
                  </li>
                ))}
              </ul>
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

## 6️⃣ Checklist

- [x] Object/array → immutable update.  
- [x] Functional update khi phụ thuộc state cũ.  
- [x] Lazy init cho initial tốn kém.  
- [x] Tách/gộp state hợp lý để giảm re-render.  
- [x] Tránh nested state quá sâu → cân nhắc `useReducer`.

# 22 — Callback & Async trong React

> Mục tiêu: hiểu cách callback hoạt động trong **bối cảnh bất đồng bộ** — `setTimeout`, `Promise`, `async/await`, `fetch`, event listener — và cách tránh lỗi stale hoặc race condition. Có ví dụ thực tế & demo.

---

## 0) TL;DR

- React không "chờ" async callback → mỗi render là **snapshot độc lập**.  
- Khi dùng async, bạn phải:  
  - Dùng **functional update** hoặc **ref** để lấy giá trị mới nhất.  
  - Hủy bỏ tác vụ cũ khi state đổi (bằng **AbortController**).  
  - Không cập nhật state sau khi unmount.  
- **Effect + async + cleanup** là pattern chính xác.

---

## 1️⃣ Callback trong setTimeout / setInterval

```jsx
function Timer() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setCount(prev => prev + 1), 1000);
    return () => clearInterval(id);
  }, []);
}
```

✅ Dùng `prev => prev + 1` tránh stale closure.  
❌ Không dùng `setCount(count + 1)` — closure sẽ nhớ `count` cũ.

---

## 2️⃣ Async callback với fetch / async-await

```jsx
function User({ id }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const ac = new AbortController();

    (async () => {
      const res = await fetch(`/api/users/${id}`, { signal: ac.signal });
      const data = await res.json();
      setUser(data);
    })();

    return () => ac.abort(); // hủy request cũ khi id đổi
  }, [id]);
}
```

✅ Tránh **race condition** khi id thay đổi nhanh.  
✅ Không leak request cũ.

---

## 3️⃣ Callback async trong event handler

```jsx
function Form() {
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api", { method: "POST" });
    const data = await res.json();
    console.log("Done", data);
    setLoading(false);
  }

  return <form onSubmit={handleSubmit}>...</form>;
}
```

- **Handler async OK** → React tự nhận dạng Promise.  
- **Không cần** bọc trong `useCallback` trừ khi truyền xuống con memo.

---

## 4️⃣ Kết hợp callback + async trong effect

```jsx
function FetchDemo() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    let cancel = false;
    (async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      const json = await res.json();
      if (!cancel) setData(json); // tránh setState sau unmount
    })();
    return () => { cancel = true };
  }, []);
}
```

✅ Cách đơn giản nhất nếu không cần AbortController.

---

## 5️⃣ Custom Hook: useAsync

```jsx
function useAsync(asyncFn, deps = []) {
  const [state, setState] = React.useState({ loading: true });

  React.useEffect(() => {
    let cancel = false;
    asyncFn()
      .then((value) => !cancel && setState({ value, loading: false }))
      .catch((error) => !cancel && setState({ error, loading: false }));
    return () => { cancel = true };
  }, deps);

  return state;
}
```

```jsx
function DataView() {
  const { value, loading, error } = useAsync(() => fetch("/api").then(r => r.json()), []);
  if (loading) return "⏳ Loading...";
  if (error) return "❌ Error";
  return <pre>{JSON.stringify(value, null, 2)}</pre>;
}
```

---

## 6️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Callback & Async Demo</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 20px; }
      .card { padding: 12px; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 12px; }
      pre { background: #f8fafc; padding: 10px; border-radius: 8px; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      const { useState, useEffect } = React;

      function useAsync(asyncFn, deps = []) {
        const [state, setState] = useState({ loading: true });
        useEffect(() => {
          let cancel = false;
          asyncFn()
            .then((value) => !cancel && setState({ value, loading: false }))
            .catch((error) => !cancel && setState({ error, loading: false }));
          return () => { cancel = true };
        }, deps);
        return state;
      }

      function DataView() {
        const { value, loading, error } = useAsync(
          () => fetch("https://jsonplaceholder.typicode.com/todos/1").then(r => r.json()),
          []
        );
        if (loading) return <div>⏳ Loading...</div>;
        if (error) return <div>❌ Error</div>;
        return <pre>{JSON.stringify(value, null, 2)}</pre>;
      }

      function App() {
        const [count, setCount] = useState(0);
        useEffect(() => {
          const id = setInterval(() => setCount(p => p + 1), 1000);
          return () => clearInterval(id);
        }, []);

        return (
          <div>
            <h2>22 — Callback & Async</h2>
            <div className="card">Timer: {count}</div>
            <div className="card"><DataView /></div>
          </div>
        );
      }

      ReactDOM.createRoot(document.getElementById("root")).render(<App />);
    </script>
  </body>
</html>
```

---

## 7️⃣ Checklist nhớ

- [x] Không dùng state cũ trong async callback → dùng ref/prev.  
- [x] Hủy request khi deps đổi hoặc component unmount.  
- [x] Không update state sau khi unmount.  
- [x] Tách logic async ra custom hook nếu tái sử dụng.  
- [x] Dùng AbortController cho fetch chuẩn.

---

## 8️⃣ Đọc thêm
- React Docs — Using async functions in effects  
- MDN — AbortController, fetch cancellation  
- Kent C. Dodds — useAsync pattern

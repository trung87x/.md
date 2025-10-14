# 15 — Hook Callback (useEffect/useCallback/useMemo/useRef) cho React Dev

> Mục tiêu: nắm vững **callback trong hook**: `useEffect` (thời điểm chạy & cleanup), `useCallback` (ổn định tham chiếu), `useMemo` (tránh tạo giá trị nặng), `useRef` (giữ giá trị mới nhất & identity), và cách phối hợp để **tránh stale closure**. Có demo chạy ngay (CDN + Babel) + vài custom hook nhỏ.

---

## 0) TL;DR

- **Effect callback**: chạy **sau render** (paint) → side‑effects; return **cleanup**.
- **Dependencies** quyết định **khi nào** effect/ callback/memo thay đổi.
- **Stale closure**: callback nhớ state/props **tại render cũ** → sửa bằng:
  1. **functional update** `setX(prev => ...)`
  2. **ref giá trị mới nhất** (`ref.current`)
  3. **deps đúng** cho `useCallback`/`useEffect`
- **useCallback**: giữ **tham chiếu hàm** ổn định (hữu ích với `React.memo`/deps).
- **useMemo**: ghi nhớ **giá trị**; không áp chế stale trừ khi deps đúng.
- **useRef**: không gây re-render; lưu trữ **mutable value** hoặc **DOM ref**.

---

## 1️⃣ `useEffect` callback & cleanup — thời điểm chạy

```jsx
useEffect(() => {
  // ✅ chạy sau render commit vào DOM
  // ⚙️ side-effect: timer, event, fetch, subscription...
  return () => {
    // cleanup: chạy trước effect kế tiếp / unmount
  };
}, [deps]);
```

- Lần đầu mount → chạy setup.
- `deps` đổi → cleanup cũ → setup mới.
- Unmount → cleanup cuối cùng.
- **Strict Mode (dev)**: React có thể gọi setup/cleanup thêm vòng để phát hiện side‑effect không an toàn.

> Nếu cần chạy **trước paint** để đo layout → dùng **`useLayoutEffect`** (cẩn trọng blocking).

---

## 2️⃣ `useCallback` — ổn định **tham chiếu hàm**

```jsx
const onSave = useCallback(() => {
  api.save(form); // 👈 cần 'form' trong deps
}, [form]);
```

- Dùng khi: truyền xuống **con `React.memo`**, hoặc dùng làm **deps** cho hooks khác.
- **Không** tự chống stale closure → **deps phải đầy đủ**.

---

## 3️⃣ `useMemo` — ghi nhớ **giá trị** tốn kém

```jsx
const expensive = useMemo(() => heavyCompute(list), [list]);
```

- Tránh tính lại mỗi render.
- Không ảnh hưởng trực tiếp tới callback; chỉ **giảm chi phí** tạo giá trị tham chiếu.

---

## 4️⃣ `useRef` — giữ **giá trị mới nhất** và identity

```jsx
const latest = useRef(value);
useEffect(() => {
  latest.current = value;
});
```

- Dùng trong **timer/event listener** để đọc state/props **mới nhất** mà **không re-render**.
- Cũng dùng để giữ **hàm ổn định** (xem `useStableCallback` bên dưới).

---

## 5️⃣ Phối hợp tránh stale closure (mẫu)

### 5.1. Timer với state

```jsx
useEffect(() => {
  const id = setInterval(() => setN((prev) => prev + 1), 1000);
  return () => clearInterval(id);
}, []);
```

### 5.2. Listener ngoài React

```jsx
const latestText = useRef(text);
useEffect(() => {
  latestText.current = text;
});
useEffect(() => {
  const onKey = () => console.log(latestText.current);
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);
```

### 5.3. Callback cho con + `React.memo`

```jsx
const onRemove = useCallback((id) => {
  setList((prev) => prev.filter((x) => x.id !== id));
}, []);
```

---

## 6️⃣ Custom hooks hữu ích (nhỏ gọn)

### 6.1. `useInterval`

```jsx
function useInterval(callback, delay) {
  const saved = React.useRef(callback);
  React.useEffect(() => {
    saved.current = callback;
  }, [callback]);
  React.useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
```

### 6.2. `useDebouncedCallback`

```jsx
function useDebouncedCallback(fn, wait = 300) {
  const t = React.useRef();
  const latest = React.useRef(fn);
  React.useEffect(() => {
    latest.current = fn;
  }, [fn]);
  return React.useCallback(
    (...args) => {
      clearTimeout(t.current);
      t.current = setTimeout(() => latest.current(...args), wait);
    },
    [wait]
  );
}
```

### 6.3. `useStableCallback` (hằng tham chiếu, luôn dùng logic mới)

```jsx
function useStableCallback(fn) {
  const ref = React.useRef(fn);
  React.useEffect(() => {
    ref.current = fn;
  });
  return React.useCallback((...args) => ref.current(...args), []);
}
```

---

## 7️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hook Callback Demo</title>
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
      const { useState, useEffect, useRef, useMemo, useCallback } = React;

      function useInterval(callback, delay) {
        const saved = useRef(callback);
        useEffect(() => {
          saved.current = callback;
        }, [callback]);
        useEffect(() => {
          if (delay == null) return;
          const id = setInterval(() => saved.current(), delay);
          return () => clearInterval(id);
        }, [delay]);
      }

      function useDebouncedCallback(fn, wait = 300) {
        const t = useRef();
        const latest = useRef(fn);
        useEffect(() => {
          latest.current = fn;
        }, [fn]);
        return useCallback(
          (...args) => {
            clearTimeout(t.current);
            t.current = setTimeout(() => latest.current(...args), wait);
          },
          [wait]
        );
      }

      function useStableCallback(fn) {
        const ref = useRef(fn);
        useEffect(() => {
          ref.current = fn;
        });
        return useCallback((...args) => ref.current(...args), []);
      }

      const List = React.memo(function List({ items, onRemove }) {
        console.log("List render", items.length);
        return (
          <ul>
            {items.map((it) => (
              <li key={it.id}>
                {it.title}{" "}
                <button onClick={() => onRemove(it.id)}>Remove</button>
              </li>
            ))}
          </ul>
        );
      });

      function App() {
        const [n, setN] = useState(0);
        const [items, setItems] = useState([
          { id: 1, title: "Alpha" },
          { id: 2, title: "Beta" },
          { id: 3, title: "Gamma" },
        ]);

        // 1) Interval + functional update (tránh stale)
        useInterval(() => setN((prev) => prev + 1), 1000);

        // 2) onRemove ổn định để phối hợp React.memo
        const onRemove = useCallback((id) => {
          setItems((prev) => prev.filter((x) => x.id !== id));
        }, []);

        // 3) Debounced logger (thử click nhanh)
        const logNow = useStableCallback((msg) => console.log("LOG:", msg));
        const logDebounced = useDebouncedCallback(
          (msg) => console.log("DEBOUNCED:", msg),
          600
        );

        // 4) useMemo giá trị nặng (minh họa)
        const total = useMemo(() => items.length + n, [items.length, n]);

        return (
          <div>
            <h2>15 — Hook Callback</h2>

            <div className="card">
              <strong>Timer:</strong> {n}s
              <button onClick={() => setN(0)}>Reset</button>
            </div>

            <div className="card">
              <List items={items} onRemove={onRemove} />
              <button
                onClick={() =>
                  setItems((prev) => [
                    ...prev,
                    { id: Date.now(), title: "New" },
                  ])
                }
              >
                Add
              </button>
            </div>

            <div className="card">
              <button
                onClick={() => {
                  logNow("clicked");
                  logDebounced("clicked");
                }}
              >
                Log (now & debounced)
              </button>
              <div>Total (items + seconds): {total}</div>
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

## 8️⃣ Checklist nhớ

- [x] Effect: setup → cleanup; deps đúng; hiểu Strict Mode dev.
- [x] setState dựa trên state cũ → **functional update**.
- [x] Callback dùng trong timer/listener → **ref giá trị mới nhất**.
- [x] Truyền xuống con `memo` → **`useCallback`** để giữ tham chiếu.
- [x] Tính nặng → **`useMemo`**.
- [x] Xây hook tiện ích (interval/debounce/stable-callback) khi tái dùng nhiều.

---

## 9️⃣ Đọc thêm

- React Docs — Effects, Memoization, Refs & the DOM
- Dan Abramov — A Complete Guide to useEffect
- Kent C. Dodds — useEvent & patterns to avoid stale closures

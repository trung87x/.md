# Tập 2 · Phần 5 — useReducer Nâng Cao (Actions, Module hóa, Side‑effect an toàn)

> Mục tiêu: tổ chức `useReducer` **quy mô lớn**: tách action creator, module hóa reducer, phối hợp với effect/async **an toàn** (không side‑effect trong reducer), tối ưu với `useCallback`/`useMemo` và selector.

---

## 0) TL;DR
- **Reducer phải thuần (pure)** — không fetch, không setTimeout, không mutate.  
- Tổ chức **action creator** + **type constants** giúp code rõ & tránh typo.  
- **Side‑effect** đặt ở **component/effect** hoặc **middleware custom hook**, rồi `dispatch` kết quả.  
- Tối ưu: truyền **selector** hoặc tách nhỏ context để tránh re-render.

---

## 1️⃣ Kiến trúc module
```
/counter/
  counter.reducer.js   // reducer + initial
  counter.actions.js   // action creators
  counter.selectors.js // optional selectors
  Counter.jsx          // UI dùng useReducer
```

### counter.reducer.js
```js
export const initial = { count: 0, loading: false, error: null };

export function reducer(state, action) {
  switch (action.type) {
    case "inc":        return { ...state, count: state.count + 1 };
    case "dec":        return { ...state, count: state.count - 1 };
    case "start":      return { ...state, loading: true, error: null };
    case "success":    return { ...state, loading: false, count: action.value };
    case "failure":    return { ...state, loading: false, error: action.error };
    default:           return state;
  }
}
```

### counter.actions.js
```js
export const inc = () => ({ type: "inc" });
export const dec = () => ({ type: "dec" });
export const start = () => ({ type: "start" });
export const success = (value) => ({ type: "success", value });
export const failure = (error) => ({ type: "failure", error });
```

---

## 2️⃣ Side‑effect: không ở reducer — dùng effect/middleware

```jsx
function Counter() {
  const [state, dispatch] = React.useReducer(reducer, initial);

  // Async: fetch value rồi dispatch
  const fetchNew = React.useCallback(async () => {
    dispatch(start());
    try {
      const res = await fetch("/api/counter");
      const data = await res.json();
      dispatch(success(data.value));
    } catch (e) {
      dispatch(failure(String(e)));
    }
  }, []);

  React.useEffect(() => {
    fetchNew();
  }, [fetchNew]);

  return (
    <div>
      {state.loading ? "Loading..." : state.count}
      {state.error && <p>❌ {state.error}</p>}
      <button onClick={() => dispatch(inc())}>+</button>
      <button onClick={() => dispatch(dec())}>-</button>
      <button onClick={fetchNew}>Refetch</button>
    </div>
  );
}
```

---

## 3️⃣ Selector & tối ưu hoá re-render

- Khi dùng context + reducer, truyền **value đã memo** và chỉ dữ liệu cần thiết.  
- Dùng **selector** để trích xuất mảnh state — dễ test & tái sử dụng.

```jsx
const selectCount = (s) => s.count;
// ...
const count = selectCount(state);
```

---

## 4️⃣ Kết hợp useReducer + useContext (mini global state)

```jsx
const Store = React.createContext(null);

function StoreProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initial);
  const value = React.useMemo(() => ({ state, dispatch }), [state]); // memo
  return <Store.Provider value={value}>{children}</Store.Provider>;
}

function useStore() {
  const ctx = React.useContext(Store);
  if (!ctx) throw new Error("Wrap with StoreProvider");
  return ctx;
}
```

---

## 5️⃣ Demo HTML chạy ngay (CDN + Babel)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>T2-05 — useReducer Advanced</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 20px; }
      .card { padding: 12px; border: 1px solid #ddd; border-radius: 10px; margin-bottom: 12px; }
      button { margin-right: 8px; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      const { useReducer, useEffect, useCallback, useMemo, createContext, useContext } = React;

      const initial = { count: 0, loading: false, error: null };
      function reducer(state, action) {
        switch (action.type) {
          case "inc":        return { ...state, count: state.count + 1 };
          case "dec":        return { ...state, count: state.count - 1 };
          case "start":      return { ...state, loading: true, error: null };
          case "success":    return { ...state, loading: false, count: action.value };
          case "failure":    return { ...state, loading: false, error: action.error };
          default:           return state;
        }
      }

      const Store = createContext(null);
      function StoreProvider({ children }) {
        const [state, dispatch] = useReducer(reducer, initial);
        const value = useMemo(() => ({ state, dispatch }), [state]);
        return <Store.Provider value={value}>{children}</Store.Provider>;
      }
      function useStore() {
        const ctx = useContext(Store);
        if (!ctx) throw new Error("Wrap with StoreProvider");
        return ctx;
      }

      function Counter() {
        const { state, dispatch } = useStore();

        const fetchNew = useCallback(async () => {
          dispatch({ type: "start" });
          try {
            const value = Math.floor(Math.random() * 100); // mô phỏng API
            await new Promise(r => setTimeout(r, 500));
            dispatch({ type: "success", value });
          } catch (e) {
            dispatch({ type: "failure", error: String(e) });
          }
        }, [dispatch]);

        useEffect(() => { fetchNew(); }, [fetchNew]);

        return (
          <div className="card">
            <div><strong>Count:</strong> {state.loading ? "Loading…" : state.count}</div>
            {state.error && <div>❌ {state.error}</div>}
            <button onClick={() => dispatch({ type: "dec" })}>-</button>
            <button onClick={() => dispatch({ type: "inc" })}>+</button>
            <button onClick={fetchNew}>Refetch</button>
          </div>
        );
      }

      function App() {
        return (
          <StoreProvider>
            <h2>T2-05 — useReducer Nâng Cao</h2>
            <Counter />
          </StoreProvider>
        );
      }

      ReactDOM.createRoot(document.getElementById("root")).render(<App />);
    </script>
  </body>
</html>
```

---

## 6️⃣ Checklist
- [x] Reducer **thuần**, không side‑effect.  
- [x] Side‑effect qua **effect** hoặc **middleware hook**, xong rồi `dispatch`.  
- [x] Action creator, module hóa reducer rõ ràng.  
- [x] Context + reducer: **memo** value context.  
- [x] Dùng selector/tách context để giảm re-render.

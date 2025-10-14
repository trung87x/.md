# T5-04 — useReducer + useContext (Global State Mini)

> Mục tiêu: Kết hợp **useReducer** + **useContext** để tạo **global state nhỏ gọn**, có kiểu hoá, tránh prop drilling và tối ưu re-render.

---

## 1) Kiến trúc
- `useReducer` quản lý **state + logic** (thuần).
- `Context` cung cấp **state** và **dispatch/actions** cho toàn app.
- **Split** context (state vs dispatch) để giảm re-render.

```tsx
type CounterState = { count: number };
type CounterAction = { type: "inc" } | { type: "dec" } | { type: "set"; payload: number };

function reducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "inc": return { count: state.count + 1 };
    case "dec": return { count: state.count - 1 };
    case "set": return { count: action.payload };
  }
}
```

---

## 2) Context & Provider
```tsx
const CounterStateCtx = React.createContext<CounterState | undefined>(undefined);
const CounterDispatchCtx = React.createContext<React.Dispatch<CounterAction> | undefined>(undefined);

export function CounterProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });
  return (
    <CounterDispatchCtx.Provider value={dispatch}>
      <CounterStateCtx.Provider value={state}>{children}</CounterStateCtx.Provider>
    </CounterDispatchCtx.Provider>
  );
}
export function useCounterState() {
  const v = React.useContext(CounterStateCtx);
  if (!v) throw new Error("useCounterState phải dùng trong CounterProvider");
  return v;
}
export function useCounterDispatch() {
  const v = React.useContext(CounterDispatchCtx);
  if (!v) throw new Error("useCounterDispatch phải dùng trong CounterProvider");
  return v;
}
```

- `dispatch` **ổn định tham chiếu** → consumer chỉ đọc dispatch **không re-render** khi state đổi.

---

## 3) Action creators (tuỳ chọn)
```tsx
function useCounterActions() {
  const dispatch = useCounterDispatch();
  return React.useMemo(() => ({
    inc: () => dispatch({ type: "inc" }),
    dec: () => dispatch({ type: "dec" }),
    set: (n: number) => dispatch({ type: "set", payload: n })
  }), [dispatch]);
}
```

---

## 4) So sánh với Redux/Zustand
- Mẫu **nhẹ** thích hợp cho **app nhỏ/vừa**.
- Khi cần **devtools, middleware, selector** hiệu năng → cân nhắc Redux Toolkit/Zustand/Jotai.

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
    const CounterStateCtx = React.createContext();
    const CounterDispatchCtx = React.createContext();
    function reducer(state, action){
      switch(action.type){
        case "inc": return { count: state.count + 1 };
        case "dec": return { count: state.count - 1 };
        case "set": return { count: action.payload };
      }
      return state;
    }
    function CounterProvider({ children }){
      const [state, dispatch] = React.useReducer(reducer, { count: 0 });
      return (
        <CounterDispatchCtx.Provider value={dispatch}>
          <CounterStateCtx.Provider value={state}>{children}</CounterStateCtx.Provider>
        </CounterDispatchCtx.Provider>
      );
    }
    function useCounterState(){ const v = React.useContext(CounterStateCtx); if(!v) throw new Error("useCounterState"); return v; }
    function useCounterDispatch(){ const v = React.useContext(CounterDispatchCtx); if(!v) throw new Error("useCounterDispatch"); return v; }
    const Value = React.memo(()=>{ const { count } = useCounterState(); console.log("Value"); return <div>Count: {count}</div> });
    const Buttons = React.memo(()=>{
      const dispatch = useCounterDispatch();
      console.log("Buttons");
      return <div><button onClick={()=>dispatch({type:"dec"})}>-</button><button onClick={()=>dispatch({type:"inc"})}>+</button></div>;
    });
    function App(){ return <CounterProvider><Value/><Buttons/></CounterProvider>; }
    ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
  </script>
</body>
</html>
```

---

## 6) Checklist
- [ ] `reducer` thuần, không side‑effect.
- [ ] Split context: **state** và **dispatch**.
- [ ] Hook `useXState`/`useXDispatch` (hoặc `useXActions`) với kiểm tra phạm vi.
- [ ] Chỉ dùng mẫu này cho **domain nhỏ/vừa**; lớn thì dùng store chuyên dụng.

---

## 7) Bài tập
1. Tạo `TodosProvider` với `useTodosState` & `useTodosActions` (add/toggle/remove).
2. Đo số lần render của nút `Add` khi state thay đổi (nó không nên re-render nhiều).
3. Nối `useReducer` này với `ServiceProvider` (DI) để fetch todo từ API giả.
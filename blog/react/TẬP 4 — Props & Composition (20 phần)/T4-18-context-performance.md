# T4-18 — Context Performance

> Mục tiêu: Hiểu **chi phí context** và tối ưu: memo hóa `value`, split context, selector/store ngoài React, và đo bằng DevTools.

---

## 1) Vấn đề hiệu năng context
- Consumer **re-render** mỗi khi **reference** `value` đổi, dù chỉ một field đổi.
- Provider chứa **object mới** mỗi render → render dây chuyền.

```jsx
// ❌ value tạo mới
<Ctx.Provider value={{ theme, toggle }}>
// ✅ memo hóa
const value = useMemo(()=>({ theme, toggle }), [theme, toggle]);
<Ctx.Provider value={value}>
```

---

## 2) Split value/actions
Tách data và action để consumer **actions** không re-render khi data đổi.
```jsx
const ValueCtx = createContext(0);
const ActionsCtx = createContext({ inc: ()=>{}, dec: ()=>{} });
```

---

## 3) Context selector vs store ngoài React
- React không có selector built‑in; consumer vẫn re-render nếu `value` đổi.  
- Dùng **use-context-selector** hoặc chuyển sang **store ngoài React** với **`useSyncExternalStore`**.

```jsx
// Store ngoài React với useSyncExternalStore
const store = { state: { count: 0 }, listeners: new Set() };
function setCount(updater){ store.state.count = updater(store.state.count); store.listeners.forEach(l=>l()); }
function useCount(){
  return React.useSyncExternalStore(
    (cb)=>{ store.listeners.add(cb); return ()=>store.listeners.delete(cb); },
    ()=>store.state.count
  );
}
```

---

## 4) Context theo domain nhỏ
- Tạo **nhiều context nhỏ**: `Theme`, `Auth`, `Locale`, `Settings`… thay vì một “mega‑context”.
- Colocation state: đặt state **gần nơi dùng nhất** để giảm phạm vi context.

---

## 5) Đo lường
- React DevTools: **“Highlight updates”**, Profiler đo commit trước/sau.
- Metric hữu ích: **render count** của consumer quan trọng.

---

## 6) Anti‑patterns
- Provider thay `value` bằng object mới mỗi render **không memo**.
- Gộp data unrelated trong 1 context → update kéo cả app render.
- Lạm dụng context cho dữ liệu thay đổi **liên tục** (cursor, thời gian thực…) → dùng store ngoài React.

---

## 7) Mini demo (UMD)
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
    const ValueCtx = React.createContext(0);
    const ActionsCtx = React.createContext({ inc:()=>{} });
    function Provider({ children }){
      const [count, setCount] = React.useState(0);
      const actions = React.useMemo(()=>({ inc:()=>setCount(c=>c+1)}), []);
      return (
        <ActionsCtx.Provider value={actions}>
          <ValueCtx.Provider value={count}>{children}</ValueCtx.Provider>
        </ActionsCtx.Provider>
      );
    }
    const Value = React.memo(()=>{ const v=React.useContext(ValueCtx); console.log("Value render"); return <div>{v}</div>; });
    const Inc = React.memo(()=>{ const {inc}=React.useContext(ActionsCtx); console.log("Inc render"); return <button onClick={inc}>+</button>; });
    ReactDOM.createRoot(document.getElementById("app")).render(<Provider><Value/><Inc/></Provider>);
  </script>
</body>
</html>
```

---

## 8) Checklist
- [ ] Memo hóa `value` object/hàm.
- [ ] Split value/actions, domain nhỏ.
- [ ] Cân nhắc store ngoài React với `useSyncExternalStore`.
- [ ] Đo bằng Profiler & highlight updates.

---

## 9) Bài tập
1. Chuyển AppContext lớn thành 3 context nhỏ; đo render trước/sau.
2. Tạo store `useCounter()` dựa trên `useSyncExternalStore` và so sánh với context.
3. Demo Provider không memo `value` → consumer render thừa; thêm memo và đo lại.
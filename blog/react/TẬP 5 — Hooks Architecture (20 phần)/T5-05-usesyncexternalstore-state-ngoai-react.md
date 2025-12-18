# T5-05 — useSyncExternalStore (State Ngoài React)

> Mục tiêu: Kết nối **store bên ngoài React** (singleton, event emitter, WebSocket, IndexedDB, Redux-like) vào component bằng **`useSyncExternalStore`** để **đồng bộ**, **ổn định**, và **an toàn concurrent**.

---

## 1) Tại sao cần `useSyncExternalStore`?
- Khi state **không nằm** trong React (ví dụ: store global tự viết, dữ liệu từ BroadcastChannel, auth SDK), bạn cần **đăng ký/lắng nghe** và **đọc snapshot** nhất quán giữa render và commit.
- Hook này đảm bảo **consistency** trong concurrent rendering.

---

## 2) API nhanh
```ts
const value = useSyncExternalStore(
  subscribe: (onStoreChange) => unsubscribe,
  getSnapshot: () => T,
  getServerSnapshot?: () => T // cho SSR
);
```

- `subscribe` đăng ký và trả hàm hủy.
- `getSnapshot` trả **giá trị hiện tại** của store. React gọi trong render và khi có thay đổi.

---

## 3) Tạo store tối giản
```ts
// store.ts
type Listener = () => void;
const listeners = new Set<Listener>();
let state = { count: 0 };

export function getSnapshot() { return state; }
export function setState(updater: (s: typeof state) => typeof state) {
  state = updater(state);
  listeners.forEach(l => l());
}
export function subscribe(l: Listener) { listeners.add(l); return () => listeners.delete(l); }
```

```tsx
// useCounterStore.ts
import { useSyncExternalStore } from "react";
import * as store from "./store";

export function useCounterStore() {
  return useSyncExternalStore(store.subscribe, store.getSnapshot);
}
export function inc(){ store.setState(s => ({ ...s, count: s.count + 1 })); }
```

---

## 4) So sánh với Context
- Context: phù hợp khi **state nằm trong React**.  
- `useSyncExternalStore`: phù hợp khi **state ở ngoài**, nhiều framework/SDK cùng truy cập.  
- Ưu điểm: **selector** tự nhiên bằng cách **chia nhỏ snapshot** (nếu snapshot là giá trị nguyên thủy hoặc reference ổn định).

```tsx
function useCount() {
  const snap = useCounterStore();
  return snap.count; // component chỉ re-render khi count đổi (nếu getSnapshot trả object mới khi field đổi)
}
```

> Tip: Nếu `getSnapshot()` luôn trả **object mới** → mọi consumer re-render. Hãy **giữ reference** khi field không đổi hoặc tách snapshot.

---

## 5) SSR
- Cung cấp `getServerSnapshot` để đọc snapshot đầu tiên trên server.
```ts
useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
```

---

## 6) Interop với Redux/Zustand
- Redux hiện đại và Zustand đã hỗ trợ selector hiệu năng; tuy nhiên bạn vẫn có thể dùng `useSyncExternalStore` để wrap store tự viết hoặc nguồn sự kiện bất kỳ.

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
    const listeners = new Set();
    let state = { count: 0 };
    function subscribe(l){ listeners.add(l); return () => listeners.delete(l); }
    function getSnapshot(){ return state; }
    function setState(updater){ state = updater(state); listeners.forEach(l=>l()); }
    function useCounter(){ return React.useSyncExternalStore(subscribe, getSnapshot); }
    const Value = React.memo(function Value(){ const { count } = useCounter(); console.log("Value"); return <div>Count: {count}</div> });
    function Buttons(){ return <div><button onClick={()=>setState(s=>({count:s.count-1}))}>-</button><button onClick={()=>setState(s=>({count:s.count+1}))}>+</button></div> }
    function App(){ return <><Value/><Buttons/></>; }
    ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
  </script>
</body>
</html>
```

---

## 8) Checklist
- [ ] `subscribe`/`unsubscribe` chuẩn, **không rò rỉ** listener.
- [ ] `getSnapshot` trả **snapshot nhất quán**; tối ưu reference khi cần.
- [ ] Cân nhắc selector bằng cách **chia nhỏ** snapshot.
- [ ] Thêm `getServerSnapshot` nếu có SSR.

---

## 9) Bài tập
1. Viết store `auth` (user/token) và hook `useAuth()` bằng `useSyncExternalStore`.
2. Tạo selector `useIsLoggedIn()`; chứng minh component khác đọc user **không** re-render khi token đổi.
3. Tích hợp BroadcastChannel để đồng bộ tab và đo re-render.
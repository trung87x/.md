# T5-13 — Hook Composition Pattern

> Mục tiêu: Ghép các **custom hooks** thành **mạch tính năng** rõ ràng (composition), tránh “god hook”, tối ưu phụ thuộc, và tái sử dụng từng khối nhỏ.

---

## 1) Tư duy thành phần
- Mỗi hook làm **một việc rõ** (SRP).
- Ghép chúng ở **hook bậc cao** hoặc **component mỏng**.
- Tránh **lồng sâu** effect/timer trong một hook lớn.

```
useAuth()      → trạng thái đăng nhập
useProfile(id) → dữ liệu người dùng
useDisclosure()→ mở/đóng UI
useKeyboard()  → phím tắt
↓
useProfileEditor(id) = compose 4 hook trên + API editor
```

---

## 2) Ví dụ: `useProfileEditor(id)`
```tsx
function useProfileEditor(id: string) {
  const { user } = useAuth();
  const { data, refresh, update } = useProfile(id);
  const modal = useDisclosure();
  const kb = useKeyboard({ Enter: () => modal.onOpen() });

  const canEdit = user?.id === id || user?.role === "admin";
  const save = React.useCallback(async (patch: any) => {
    if (!canEdit) throw new Error("no-permission");
    await update(patch);
    await refresh();
    modal.onClose();
  }, [canEdit, update, refresh, modal]);

  return { data, canEdit, save, modal, kb };
}
```

- Trả về **object đã memo** nếu cần ổn định:
```tsx
return React.useMemo(() => ({ data, canEdit, save, modal, kb }), [data, canEdit, save, modal, kb]);
```

---

## 3) Flow dữ liệu & phụ thuộc
- **Dây deps** ngắn, không tham chiếu vòng.
- Hook cấp dưới **không** import ngược hook cấp trên.
- Hạn chế **rò rỉ chi tiết** (ví dụ: nội bộ `useProfile` dùng AbortController, caller không cần biết).

---

## 4) Composition bằng config
- Hook bậc cao có thể nhận **adapter** để đổi behavior.
```tsx
function useSearchPage({ transport = fetchJson, cache = memoryCache } = {}) { /* ... */ }
```

---

## 5) Error boundary & retry
- Hook bậc cao có thể **gom lỗi** từ các hook con, thống nhất mô hình `{status,data,error}` hoặc throw để ErrorBoundary xử lý.

---

## 6) Test chiến lược
- Test từng hook nhỏ **độc lập**.
- Test hook bậc cao với **mocks** (transport/cache) và **fake timers** nếu có debounce.
- Snapshot **hợp đồng đầu ra** (shape) thay vì chi tiết nội bộ.

---

## 7) Anti‑patterns
- “God hook” làm quá nhiều: fetch + websockets + events + UI state.
- Xuyên tầng import — phụ thuộc vòng, khó tách.
- Lộ chi tiết nội bộ qua API (khi đổi implementation sẽ breaking không cần thiết).

---

## 8) Mini demo (UMD)
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
<div id="app"></div>
<script type="text/babel">
  function useDisclosure(){ const [open,setOpen]=React.useState(false); return { open, onOpen:()=>setOpen(true), onClose:()=>setOpen(false), onToggle:()=>setOpen(v=>!v) }; }
  function useCounter(){ const [n,setN]=React.useState(0); return { n, inc:()=>setN(v=>v+1) }; }
  function useEditor(){ const modal=useDisclosure(); const c=useCounter(); const save=React.useCallback(()=>{ modal.onClose(); },[modal]); return { modal, counter:c, save }; }
  function App(){ const { modal, counter, save } = useEditor(); return (<div>
    <button onClick={modal.onToggle}>{modal.open?"Close":"Open"} Editor</button>
    {modal.open && <div><button onClick={counter.inc}>+</button> {counter.n} <button onClick={save}>Save</button></div>}
  </div>); }
  ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
</script>
</body>
</html>
```

---

## 9) Checklist
- [ ] Hook nhỏ, nhiệm vụ đơn; ghép ở tầng trên.
- [ ] API ổn định, không rò rỉ chi tiết.
- [ ] Memo hoá đầu ra khi cần.
- [ ] Dây deps rõ ràng, không vòng.
- [ ] Unit cho hook nhỏ; integration cho hook bậc cao.

---

## 10) Bài tập
1. Viết `useCheckout()` ghép `useCart`, `usePayment`, `useAddress`, `useDisclosure`.
2. Tạo `useSearchPage()` ghép `useDebouncedValue`, `useQuery`, `usePagination`.
3. Viết test cho `useCheckout()` với mock `payment` thất bại & retry.
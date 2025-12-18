# T5-08 — Custom Hook: Naming & Contract

> Mục tiêu: Đặt tên và **hợp đồng (contract)** rõ ràng cho custom hooks: **đầu vào**, **đầu ra**, **side‑effect**, **ổn định tham chiếu**, **lỗi** và **testing**.

---

## 1) Naming — đặt tên có ý nghĩa
- Bắt đầu bằng **`use`**.
- Thể hiện **động từ/mục đích**: `useDisclosure`, `useDebouncedValue`, `useHover`.
- Tránh tên **mơ hồ**: `useUtils`, `useStuff`.
- Với domain: `useCart`, `useAuth`, `useFeatureFlag`…

---

## 2) Contract — tuyên ngôn rõ ràng
- **Input**: tham số & options (có default).
- **Output**: state + actions (memo hoá), hoặc tuple `[value, setValue]` nếu đóng vai trò “state hook”.
- **Side‑effect**: event listener/fetch/timer và **cleanup**.
- **Error**: cách báo lỗi (throw, state error, return union).
- **Invariants**: điều kiện bất biến (ví dụ: `id` không đổi khi mount).

```ts
type UseDebounceOptions = { delay?: number, leading?: boolean };
function useDebouncedCallback(cb: (...a:any[]) => void, { delay = 300, leading = false }: UseDebounceOptions = {}) {
  // ...
  return stableDebounced; // callback ổn định
}
```

---

## 3) Ổn định đầu ra
- Trả về **hàm** đã `useCallback` hoặc object đã `useMemo`.
- Tránh trả object **mới** mỗi render nếu không cần (làm hỏng deps của nơi dùng).

```tsx
function useDisclosure(initial=false){
  const [open, setOpen] = React.useState(initial);
  const api = React.useMemo(()=> ({
    open, onOpen: () => setOpen(true), onClose: () => setOpen(false), onToggle: () => setOpen(v=>!v)
  }), [open]);
  return api;
}
```

---

## 4) Ergonomics
- Tương thích **controlled/uncontrolled** khi hợp lý (`useControllableState`).
- Hỗ trợ **TypeScript**: generic, union literal, overload khi cần.
- Tích hợp **AbortController** cho fetch để hủy đúng cách.

---

## 5) Tài liệu & ví dụ
- Mỗi hook có **README ngắn**, **ví dụ tối thiểu** (usage snippet), và **pitfalls**.
- Liên kết đến các hook nền tảng (T5‑02 useRef, T5‑06 deferred/transition…).

---

## 6) Testing chiến lược
- Unit: tách phần **thuần** (pure) để test logic.
- RTL: kiểm tra lifecycle (mount/unmount), side‑effect, cleanup.
- Fake timers với `vi.useFakeTimers()`/`jest.useFakeTimers()` khi có timer.

---

## 7) Anti‑patterns
- Hook “tất cả trong một”: khó hiểu, khó test, khó reuse.
- Không expose cách **hủy** (cancel/abort) với tác vụ dài.
- Trả về object **không ổn định** → kéo re-render nơi dùng.

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
  function useDisclosure(initial=false){
    const [open, setOpen] = React.useState(initial);
    return React.useMemo(()=>({ open, onOpen:()=>setOpen(true), onClose:()=>setOpen(false), onToggle:()=>setOpen(v=>!v) }), [open]);
  }
  function App(){ const d = useDisclosure(); return <button onClick={d.onToggle}>{d.open?"ON":"OFF"}</button>; }
  ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
</script>
</body>
</html>
```

---

## 9) Checklist
- [ ] Tên rõ ngữ nghĩa, bắt đầu bằng `use`.
- [ ] Contract ghi rõ input/output/side‑effect/error.
- [ ] Đầu ra ổn định (memo/callback).
- [ ] Có README, ví dụ, và test.
- [ ] Không “god hook”; tách nhỏ khi cần.

---

## 10) Bài tập
1. Viết `useDebouncedCallback(cb, { delay })` trả callback ổn định; test bằng fake timers.
2. Viết `useDisclosure()` với hợp đồng rõ ràng và ví dụ sử dụng.
3. Review 5 hook trong codebase: rename + bổ sung README ngắn.
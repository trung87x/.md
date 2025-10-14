# T5-01 — Nguyên Lý Hook (Rules of Hooks) & Kiến Trúc

> Mục tiêu: Nắm **Rules of Hooks**, vì sao React yêu cầu **thứ tự gọi ổn định**, và cách tổ chức code/hook cho dự án lớn.

---

## 1) Rules of Hooks — Bất di bất dịch
1) **Chỉ gọi hooks ở cấp cao** của function component hoặc **trong custom hook**.  
   - Không gọi trong `if`, `for`, `while`, `try/catch` khác nhánh.  
2) **Không gọi hook trong hàm thường** (trừ khi đó là custom hook).  
3) **Thứ tự gọi phải ổn định** giữa các render → React ánh xạ state/effect theo **chỉ số**.

```jsx
// ✅ Đúng
function Panel({ show }) {
  const [open, setOpen] = React.useState(false);
  const value = React.useMemo(() => compute(), []);
  return show ? <Body value={value} /> : null;
}

// ❌ Sai: hook nằm trong nhánh điều kiện
function PanelBad({ show }) {
  if (show) {
    const [open] = React.useState(false); // ❌
  }
  return null;
}
```

---

## 2) Tại sao “thứ tự” quan trọng?
- React lưu state/effect theo **vị trí** gọi hook: `slot 0 = useState#1`, `slot 1 = useEffect#1`…  
- Nếu bạn chèn/xoá hook có điều kiện, **tất cả slot sau bị lệch** → bug khó đoán.

---

## 3) Cấu trúc hoá hook theo “layer”
- **UI layer**: function component **mỏng**, nhận props -> render.  
- **Hooks layer**: custom hooks **gom logic** (fetch, form, events, data transform).  
- **Infra layer**: dịch vụ/adapter (API, storage) được inject (xem T4‑15).

```
Component (UI) ─┬─ useProfile() ─ fetch/data map
                ├─ useEditing() ─ form/validation
                └─ useKeyboard() ─ shortcuts
```

---

## 4) Contract của custom hook
- **Input**: tham số/option.  
- **Output**: state + actions (ổn định tham chiếu).  
- **Side‑effect**: mô tả rõ (event listener, fetch, timer) + cleanup.  
- **Invariants**: điều kiện bất biến (ví dụ: `id` không đổi giữa mount/unmount).

```jsx
function useDisclosure(initial=false){
  const [open, setOpen] = React.useState(initial);
  const onOpen = React.useCallback(()=>setOpen(true),[]);
  const onClose = React.useCallback(()=>setOpen(false),[]);
  const onToggle = React.useCallback(()=>setOpen(v=>!v),[]);
  return { open, onOpen, onClose, onToggle };
}
```

---

## 5) Tổ chức thư mục hooks
```
src/
  hooks/
    useDisclosure.ts
    useFetch.ts
    form/
      useForm.ts
      useField.ts
    dom/
      useEventListener.ts
      useOnClickOutside.ts
```

- Mỗi hook có: **README ngắn**, **ví dụ**, **test** (Vitest/RTL).

---

## 6) ESLint: bảo hiểm an toàn
- Bật `eslint-plugin-react-hooks`.  
- Quy tắc: `rules-of-hooks`, `exhaustive-deps`.  
- Nếu cần “opt‑out” có kiểm soát: chú thích **lý do** khi disable dòng.

---

## 7) Anti‑patterns
- Hook **làm quá nhiều** (God hook). → Tách nhỏ, một nhiệm vụ rõ.  
- Trả về object **không ổn định** mỗi render (thiếu `useMemo`/`useCallback`).  
- Side‑effect **không cleanup** → rò rỉ.

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
    const onToggle = React.useCallback(()=>setOpen(v=>!v),[]);
    return { open, onToggle };
  }
  function App(){
    const { open, onToggle } = useDisclosure();
    return <button onClick={onToggle}>{open ? "ON":"OFF"}</button>;
  }
  ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
</script>
</body>
</html>
```

---

## 9) Checklist
- [ ] Hook gọi ở **top level**; không trong nhánh điều kiện.  
- [ ] UI mỏng, logic nằm trong hooks.  
- [ ] Output ổn định tham chiếu.  
- [ ] ESLint hooks bật đầy đủ.  
- [ ] Có README/test mẫu cho hook quan trọng.

---

## 10) Bài tập
1. Viết `useCounter({ min, max, step })` với action ổn định.  
2. Tách logic fetch của `Profile` thành `useProfile(id)` có cache cơ bản.  
3. Viết README cho 3 hook chủ lực của dự án.
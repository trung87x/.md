# T5-09 — Custom Hook: Input/Output Pattern

> Mục tiêu: Chuẩn hoá **đầu vào/đầu ra** của custom hook để dễ dùng, dễ test, và ổn định: chọn giữa **tham số rời** vs **options object**, **tuple** vs **object**, và mô hình **controlled/uncontrolled**.

---

## 1) Đầu vào — tham số rời hay options object?
- **Tham số rời**: tốt khi **ít & bắt buộc** (id, url).
- **Options object**: tốt khi có **nhiều tuỳ chọn** hoặc **không bắt buộc** (debounce, retry...).

```ts
// Tham số rời (ít, bắt buộc)
function useProfile(id: string) { /* ... */ }

// Options object (nhiều, optional, có default)
type UseSearchOptions = { debounce?: number; limit?: number };
function useSearch(query: string, opts: UseSearchOptions = {}) { /* ... */ }
```

### Default & merge
- Đặt **default** ngay lúc destructuring để có **một nguồn sự thật**.
```ts
function useSearch(q: string, { debounce = 300, limit = 50 }: UseSearchOptions = {}) { /* ... */ }
```

---

## 2) Đầu ra — tuple hay object?
- **Tuple** (`[value, setValue]`): hợp với “state hook” quen thuộc.
- **Object**: gợi nghĩa tốt hơn, dễ mở rộng, không phụ thuộc thứ tự.

```ts
// Tuple: gần gũi với useState
function useDisclosure(initial=false): [boolean, () => void] { /* ... */ }

// Object: rõ ràng, mở rộng
function useDisclosure2(initial=false) {
  const [open, setOpen] = React.useState(initial);
  const onOpen = React.useCallback(()=>setOpen(true),[]);
  const onClose = React.useCallback(()=>setOpen(false),[]);
  const onToggle = React.useCallback(()=>setOpen(v=>!v),[]);
  return { open, onOpen, onClose, onToggle };
}
```

> Khuyến nghị: **Object** cho hook phức tạp; **tuple** cho hook mang tính state primitive.

---

## 3) Controlled vs Uncontrolled trong hook
- Hỗ trợ **bridge** bằng `useControllableState` (xem cheatsheet T4‑20).
```ts
type UseCounterProps = {
  value?: number;              // controlled
  defaultValue?: number;       // uncontrolled
  onChange?: (v: number) => void;
  step?: number;
};
function useCounter({ value, defaultValue = 0, onChange, step = 1 }: UseCounterProps = {}) {
  const [inner, setInner] = React.useState(defaultValue);
  const isCtrl = value !== undefined;
  const count = isCtrl ? value! : inner;
  const set = React.useCallback((next: number | ((n:number)=>number)) => {
      const v = typeof next === "function" ? (next as any)(count) : next;
      if (!isCtrl) setInner(v);
      onChange?.(v);
  }, [count, isCtrl, onChange]);
  const inc = React.useCallback(() => set((n)=>n + step), [set, step]);
  const dec = React.useCallback(() => set((n)=>n - step), [set, step]);
  return { count, set, inc, dec };
}
```

---

## 4) Ổn định đầu ra
- Trả về **hàm memo hoá** (`useCallback`), **object memo** (`useMemo`) nếu cần ổn định tham chiếu cho nơi dùng (memo deps).
- Tránh tạo object mới **không cần thiết** mỗi render.

---

## 5) Xử lý lỗi & trạng thái
- Chọn mô hình: **throw** (để ErrorBoundary xử lý) hoặc trả về `{ status, data, error }`.
- Nên thống nhất trong dự án cho hook cùng nhóm (data‑fetching vs UI).

---

## 6) Mini demo (UMD)
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
    function useCounter({ value, defaultValue = 0, onChange, step = 1 } = {}) {
      const [inner, setInner] = React.useState(defaultValue);
      const isCtrl = value !== undefined;
      const count = isCtrl ? value : inner;
      const set = React.useCallback((next) => {
        const v = typeof next === "function" ? next(count) : next;
        if (!isCtrl) setInner(v);
        onChange?.(v);
      }, [count, isCtrl, onChange]);
      const inc = React.useCallback(() => set(n => n + step), [set, step]);
      const dec = React.useCallback(() => set(n => n - step), [set, step]);
      return { count, inc, dec, set };
    }
    function App(){
      const c = useCounter({ defaultValue: 1, step: 2 });
      return <div>
        <div>{c.count}</div>
        <button onClick={c.dec}>-</button>
        <button onClick={c.inc}>+</button>
      </div>;
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
  </script>
</body>
</html>
```

---

## 7) Checklist
- [ ] Chọn đúng: tham số rời vs options object (có default).
- [ ] Chọn đúng: tuple (primitive) vs object (mở rộng).
- [ ] Hỗ trợ controlled/uncontrolled khi hợp lý.
- [ ] Ổn định tham chiếu đầu ra (memo/callback).
- [ ] Quy ước thống nhất về error/status.

---

## 8) Bài tập
1. Viết `useToggle({ value, defaultValue, onChange })` hỗ trợ controlled.
2. Refactor `useSearch(q, opts)` để thêm default và trả object `{ status, data, error }`.
3. Thiết kế API `useWizard(steps, { initialStep })` và mô tả input/output.
# T2-17 — useImperativeHandle (Callback Ref)

> Mục tiêu: Cung cấp **API mệnh lệnh** (imperative) có kiểm soát cho component con khi dùng `forwardRef`, thay vì lộ toàn bộ DOM/ref; áp dụng cho input focus, scroll, play/pause, reset, v.v.

---

## 1) Khái niệm nhanh
- `forwardRef` cho phép cha **truyền ref xuống** con.
- `useImperativeHandle(ref, createHandle, deps)` kiểm soát **những gì** được lộ ra cho cha (không phải toàn bộ DOM).
- Phù hợp khi cần gọi **hành động** thay vì dữ liệu (imperative API).

---

## 2) API
```jsx
const Fancy = React.forwardRef(function Fancy(props, ref) {
  React.useImperativeHandle(ref, () => ({
    focus() { /* ... */ },
    reset() { /* ... */ },
  }), []);
  return <div />;
});
```

- `createHandle` trả về **object các phương thức**.
- `deps` quyết định khi nào handle được cập nhật.

---

## 3) Ví dụ: Input có phương thức `focus`, `select`, `clear`
```jsx
const SmartInput = React.forwardRef(function SmartInput({ defaultValue = "" }, ref) {
  const inputRef = React.useRef(null);
  const [value, setValue] = React.useState(defaultValue);

  React.useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    select: () => inputRef.current?.select(),
    clear: () => setValue(""),
    getValue: () => value,
  }), [value]);

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type here"
    />
  );
});

function App() {
  const ref = React.useRef(null);
  return (
    <div>
      <SmartInput ref={ref} defaultValue="hello" />
      <div className="space-x-2">
        <button onClick={() => ref.current?.focus()}>Focus</button>
        <button onClick={() => ref.current?.select()}>Select</button>
        <button onClick={() => ref.current?.clear()}>Clear</button>
        <button onClick={() => alert(ref.current?.getValue())}>Get</button>
      </div>
    </div>
  );
}
```

---

## 4) Ví dụ: Modal mở/đóng từ cha
```jsx
const Modal = React.forwardRef(function Modal(_, ref) {
  const [open, setOpen] = React.useState(false);
  React.useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen((o) => !o),
  }), []);
  if (!open) return null;
  return <div className="backdrop">I am a modal</div>;
});

function Page() {
  const modalRef = React.useRef(null);
  return (
    <>
      <button onClick={() => modalRef.current?.open()}>Open Modal</button>
      <Modal ref={modalRef} />
    </>
  );
}
```

---

## 5) Best practices
- Lộ ra **API nhỏ gọn** (focus/scroll/reset), không lộ toàn DOM.
- Tránh phụ thuộc **thường xuyên thay đổi** trong handle; nếu cần, đưa vào `deps` của `useImperativeHandle`.
- **Thử ưu tiên declarative** (prop/state) trước; chỉ dùng imperative khi hợp lý (focus, đo DOM tức thời…).

---

## 6) Anti-patterns
- Dùng như “backdoor” để mutates state của con một cách tùy tiện.
- Trả về handle **không ổn định** (thay đổi mỗi render vô cớ).

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
    const SmartInput = React.forwardRef(function SmartInput(_, ref) {
      const inputRef = React.useRef(null);
      React.useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
      }), []);
      return <input ref={inputRef} placeholder="Click button to focus me" />;
    });

    function App() {
      const ref = React.useRef(null);
      return (
        <div>
          <SmartInput ref={ref} />
          <button onClick={() => ref.current?.focus()}>Focus input</button>
        </div>
      );
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 8) Checklist
- [ ] Dùng `forwardRef` + `useImperativeHandle` khi cần **imperative API**.
- [ ] Expose **ít, đủ dùng**, tránh lộ DOM.
- [ ] Ổn định handle bằng deps hợp lý.
- [ ] Ưu tiên declarative trước, imperative khi cần.

---

## 9) Bài tập
1. Tạo `ScrollView` với API `scrollToTop`, `scrollToBottom`.
2. Viết `NumberInput` có `increment`, `decrement`, `reset`.
3. Tạo `Popover` có `open/close`, canh theo anchor id (dùng `useLayoutEffect` để đo vị trí).
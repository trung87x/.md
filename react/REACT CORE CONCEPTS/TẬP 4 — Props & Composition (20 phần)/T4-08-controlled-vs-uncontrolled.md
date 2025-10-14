# T4-08 — Controlled vs Uncontrolled Component

> Mục tiêu: Phân biệt **controlled** (do React điều khiển) và **uncontrolled** (DOM tự quản) cho input/form; chọn đúng mô hình theo nhu cầu.

---

## 1) Controlled component
React giữ **nguồn sự thật** (source of truth) trong state → UI là **hàm của state**.

```jsx
function NameField() {
  const [name, setName] = React.useState("");
  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
```
**Ưu**: dễ validate, đồng bộ nhiều nơi, undo/redo, serialize…  
**Nhược**: render trên mỗi thay đổi (nếu nặng, dùng `useDeferredValue`/debounce).

---

## 2) Uncontrolled component
DOM giữ giá trị, React chỉ **tham chiếu** bằng ref.
```jsx
function NameField() {
  const ref = React.useRef(null);
  function submit() {
    alert(ref.current.value); // đọc trực tiếp từ DOM
  }
  return <><input ref={ref} defaultValue="Lan" /><button onClick={submit}>Send</button></>;
}
```
**Ưu**: ít render, gần “native” form, đơn giản cho field đơn lẻ.  
**Nhược**: khó đồng bộ/validate chéo, khó test.

---

## 3) Chọn mô hình nào?
- Cần **logic** (validate, mask, dependency giữa fields, analytics) → **Controlled**.
- Field **đơn đơn** (search box, file input) → **Uncontrolled** có thể hợp lý.
- Ứng dụng lớn → Controlled giúp nhất quán.

---

## 4) Hybrid pattern: controlled ngoài, uncontrolled trong
- Dùng `defaultValue` để set giá trị ban đầu, nhưng về sau **React không điều khiển**.
- Hoặc controlled **debounced** để giảm render.

```jsx
function Search({ onChange }) {
  const [q, setQ] = React.useState("");
  const dq = React.useMemo(() => q.trim(), [q]);
  React.useEffect(() => { onChange(dq); }, [dq, onChange]);
  return <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search" />;
}
```

---

## 5) Checkbox, radio, select
- Controlled: dùng `checked` / `value` + `onChange`.
- Uncontrolled: dùng `defaultChecked` / `defaultValue`.

```jsx
<input type="checkbox" checked={done} onChange={e => setDone(e.target.checked)} />
<select value={color} onChange={e => setColor(e.target.value)}>
  <option value="red">Red</option>
</select>
```

---

## 6) File input
- Thường để **uncontrolled** (bảo mật & trình duyệt quản lý). Đọc bằng `ref` hoặc `onChange`.

---

## 7) Anti-patterns
- Trộn `value` và `defaultValue` trên **cùng input** → hành vi khó đoán.
- Dùng uncontrolled nhưng lại cố sync thường xuyên bằng effect → biến tướng thành controlled chậm chạp.
- Controlled nhưng thực hiện **tính toán nặng** trên mỗi keystroke → debounce/throttle.

---

## 8) Mini demo (UMD)
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
    function Controlled() {
      const [v, setV] = React.useState("");
      return <input value={v} onChange={e => setV(e.target.value)} placeholder="Controlled" />;
    }
    function Uncontrolled() {
      const ref = React.useRef();
      return <><input ref={ref} defaultValue="Hi" placeholder="Uncontrolled" /><button onClick={()=>alert(ref.current.value)}>Read</button></>;
    }
    function App(){ return (<div style={{display:"flex",gap:12}}><Controlled/><Uncontrolled/></div>) }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 9) Checklist
- [ ] Controlled: `value/checked` + `onChange`; state là nguồn sự thật.
- [ ] Uncontrolled: `defaultValue/defaultChecked` + ref khi cần đọc.
- [ ] Không kết hợp `value` với `defaultValue` trên cùng input.
- [ ] Debounce/`useDeferredValue` cho controlled field nặng.

---

## 10) Bài tập
1. Form login controlled (email/password) + validate đơn giản.
2. `FilePicker` uncontrolled; click “Upload” đọc `files[0]` từ ref.
3. Chuyển search box uncontrolled → controlled + debounce 300ms, so sánh render.
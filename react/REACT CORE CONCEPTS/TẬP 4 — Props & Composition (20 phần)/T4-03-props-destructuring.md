# T4-03 — Props Destructuring

> Mục tiêu: Destructure props **rõ ràng, ngắn gọn**, đặt **default value** đúng chỗ, gom nhóm props theo vai trò, và xử lý **rest props** an toàn.

---

## 1) Destructure ngay tham số
```jsx
function Button({ label, onClick, disabled }) {
  return <button disabled={disabled} onClick={onClick}>{label}</button>;
}
```
- Ngắn gọn, dễ đọc, IDE gợi ý tốt.
- Tránh `props.label` rải rác khắp component.

---

## 2) Đặt default value khi destructure
```jsx
function Badge({ text = "New", color = "#10b981" }) {
  return <span style={{ background: color }}>{text}</span>;
}
```
- Default ngay tại chỗ giúp **loại bỏ check** `text ?? "New"` ở dưới.

---

## 3) Đổi tên khi destructure
```jsx
function Avatar({ src: imageUrl, alt: title = "avatar" }) {
  return <img src={imageUrl} alt={title} />;
}
```

---

## 4) Destructure lồng (object/array)
```jsx
function Row({ user: { name, email }, tags = [] }) {
  return <div>{name} — {email} — {tags.join(", ")}</div>;
}
```
- Chỉ destructure sâu **khi chắc chắn** cấu trúc có tồn tại (hoặc có default).

---

## 5) Rest props (…rest) để chuyển tiếp
```jsx
function Input({ className, ...rest }) {
  return <input className={`input ${className ?? ""}`} {...rest} />;
}
```
- Giúp component **truyền tiếp** props gốc của HTML (vd: `placeholder`, `type`, `onBlur`…).
- **Lưu ý thứ tự**: props cụ thể → `...rest` để `rest` có thể **ghi đè** nếu muốn.

---

## 6) Kết hợp với `useMemo` / `useCallback`
```jsx
function List({ items, renderItem }) {
  const rows = React.useMemo(() => items.map(renderItem), [items, renderItem]);
  return <ul>{rows}</ul>;
}
```
- Khi destructure xong, bạn dễ thấy **đâu là deps** cần đưa vào memo/callback.

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
    function Button({ label = "OK", onClick, disabled = false, ...rest }) {
      return <button disabled={disabled} onClick={onClick} {...rest}>{label}</button>;
    }
    function App() {
      return <Button label="Save" onClick={()=>alert("saved")} title="Save file" />;
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 8) Checklist
- [ ] Destructure ngay tham số, đặt default value rõ ràng.
- [ ] Chỉ destructure sâu khi chắc cấu trúc.
- [ ] Dùng `...rest` để chuyển tiếp props hợp lệ.
- [ ] Cân nhắc `useMemo`/`useCallback` cho props phức tạp.

---

## 9) Bài tập
1. Viết `TextField({ label, hint = "", error, ...inputProps })` render label + input + hint/error.
2. Viết `Avatar({ src: imageUrl, alt = "avatar", size = 40 })` đổi tên prop và đặt default.
3. `List({ items, renderItem, ...ulProps })` chuyển tiếp `ulProps` cho `<ul>`.
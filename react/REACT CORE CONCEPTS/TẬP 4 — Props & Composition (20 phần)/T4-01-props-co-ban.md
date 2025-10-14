# T4-01 — Props Cơ Bản

> Mục tiêu: Nắm vững **props** (dữ liệu truyền từ cha → con), phân biệt với **state**, quy tắc bất biến, và cách đặt tên/kiểu hoá.

---

## 1) Props là gì?
- **Props** (properties) là **đầu vào** của component con, được **truyền từ cha**.
- Props **bất biến** đối với component nhận: con **không** tự thay đổi props.
- Khi props đổi → con **re-render** (theo shallow compare).

```jsx
function Hello({ name }) {
  return <h3>Xin chào, {name}!</h3>;
}
export default function App() {
  return <Hello name="Lan" />;
}
```

---

## 2) Phân biệt State vs Props
| Thuộc tính | Props | State |
|-----------|------|------|
| Sở hữu | Thuộc **cha** (cấp trên) | Thuộc **chính component** |
| Cập nhật | Con **không** cập nhật trực tiếp | `setState` trong component |
| Mục đích | Cấu hình/đầu vào | Dữ liệu động nội bộ |

---

## 3) Destructuring & default
```jsx
function Button({ label = "OK", onClick, disabled = false }) {
  return <button disabled={disabled} onClick={onClick}>{label}</button>;
}
```

- Đặt **giá trị mặc định** ngay khi destructuring prop.
- Tránh props “mơ hồ”; đặt tên rõ ràng: `onSave`, `variant`, `size`…

---

## 4) PropTypes/TypeScript (gợi ý)
- JS thuần: `prop-types` để kiểm tra lúc dev.
- TS: định nghĩa **type** cho props.
```ts
type ButtonProps = {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}
function Button({ label = "OK", onClick, disabled = false }: ButtonProps) { /* ... */ }
```

---

## 5) Truyền props xuống sâu (prop drilling)
- Tránh truyền tay nhiều tầng → cân nhắc **Context** (Tập 4 phần 6–7).

```jsx
// drilling (không tốt khi nhiều tầng)
<AppContext.Provider value={...}>
  <Layout>
    <Toolbar onSave={onSave} /> {/* tốt hơn: lấy từ Context */}
  </Layout>
</AppContext.Provider>
```

---

## 6) Best Practices
- Props là **đọc-only**: không mutate, chỉ đọc.
- Đặt tên theo **vai trò**: `value`, `defaultValue`, `onChange`, `open`, `onOpenChange`.
- Với boolean, dùng dạng khẳng định: `disabled`, `readOnly`.
- Nhóm props liên quan: `size`, `variant`, `color`…

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
    function Badge({ text = "New", color = "#10b981" }) {
      return <span style={{ background: color, color: "#fff", padding: "2px 6px", borderRadius: 4 }}>{text}</span>;
    }
    function App() {
      return <div><Badge /><Badge text="Hot" color="#ef4444" /></div>;
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 8) Checklist
- [ ] Props bất biến; không mutate trong con.
- [ ] Destructure + default hợp lý.
- [ ] Tên prop rõ ràng, đúng vai trò.
- [ ] Tránh drilling sâu; cân nhắc Context.

---

## 9) Bài tập
1. Viết `Button` có props: `label`, `variant: "solid" | "outline"`, `onClick`.
2. Tạo `Tag` với `color`, `onRemove` (hiển thị nút x), `children` là text.
3. Tạo `Avatar` có `src`, `alt`, `size`, fallback chữ cái đầu nếu không có ảnh.
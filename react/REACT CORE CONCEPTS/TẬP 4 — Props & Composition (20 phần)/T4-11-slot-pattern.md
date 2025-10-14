# T4-11 — Slot Pattern

> Mục tiêu: Dùng **slot pattern** (named slots) để mở rộng thành phần theo **khu vực** (`header`, `footer`, `actions`…), tạo API linh hoạt nhưng **có cấu trúc** hơn so với chỉ `children`.

---

## 1) Slot là gì?
- Thay vì chỉ có một `children`, component cung cấp **nhiều “ô cắm”** (slots) được đặt tên.
- Cha truyền **phần tử/JSX** vào từng slot để **tùy biến layout**.

```jsx
function Card({ header, footer, children, actions }) {
  return (
    <section className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {actions && <div className="card-actions">{actions}</div>}
      {footer && <div className="card-footer">{footer}</div>}
    </section>
  );
}
```

---

## 2) Lợi ích vs `children` thuần
- **Rõ ràng vị trí** (header/actions/footer), tránh “đoán” cấu trúc trong `children`.
- **Tách mối quan tâm**: content chính vẫn đặt ở `children`.
- **Khả năng thay thế**: slot có thể là **bất kỳ JSX**.

---

## 3) Slot kết hợp render props
- Slot có thể là **function** để nhận trạng thái nội bộ của component cha.

```jsx
function Dialog({ open, onOpenChange, title, actions }) {
  return (
    <div hidden={!open} role="dialog" aria-modal="true">
      <header><h3>{typeof title === "function" ? title({ open }) : title}</h3></header>
      <div className="content"><slot /></div>
      <footer>
        {typeof actions === "function"
          ? actions({ close: () => onOpenChange(false) })
          : actions}
      </footer>
    </div>
  );
}
```

---

## 4) Headless UI + Slot
- **Headless**: component **không áp đặt UI**, chỉ quản lý **state & hành vi** (keyboard, a11y) và expose qua **slots/render props**.  
- Người dùng tự render UI theo design system.

```jsx
function MenuRoot({ children }) {
  const [open, setOpen] = React.useState(false);
  const ctx = React.useMemo(() => ({ open, setOpen }), [open]);
  return <MenuCtx.Provider value={ctx}>{children}</MenuCtx.Provider>;
}
// Các slot con: <Menu.Trigger/>, <Menu.List/>, <Menu.Item/> (xem Compound ở T4-10)
```

---

## 5) Polymorphic `as` prop + slot
- Cho phép đổi thẻ HTML hoặc component nền tảng (link, button, div...).

```tsx
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
} & React.ComponentPropsWithoutRef<E>;

function Button<E extends React.ElementType = "button">({
  as, children, ...rest
}: PolymorphicProps<E>) {
  const Comp = as ?? "button";
  return <Comp {...rest}>{children}</Comp>;
}
```
- Kết hợp `as` + slot → API **mềm dẻo** nhưng vẫn **an toàn kiểu** (TS).

---

## 6) Anti-patterns
- **Quá nhiều** slot → tăng bề mặt API, khó dùng.
- Slot **phụ thuộc lẫn nhau** (ràng buộc thứ tự) → khó bảo trì.
- Slot **ẩn** yêu cầu a11y nhưng không đề ra (ví dụ thiếu `aria-*`).

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
  <style>
    .card{border:1px solid #e5e7eb;border-radius:10px;padding:12px}
    .card-header{font-weight:700;margin-bottom:8px}
    .card-actions{display:flex;gap:8px;margin-top:8px}
    .card-footer{margin-top:8px;color:#6b7280;font-size:12px}
  </style>
</head>
<body>
  <div id="app"></div>
  <script type="text/babel">
    function Card({ header, actions, footer, children }){
      return (
        <section className="card">
          {header && <div className="card-header">{header}</div>}
          <div>{children}</div>
          {actions && <div className="card-actions">{actions}</div>}
          {footer && <div className="card-footer">{footer}</div>}
        </section>
      );
    }
    function App(){
      return (
        <Card
          header={<span>Profile</span>}
          actions={<><button>Save</button><button>Cancel</button></>}
          footer="Updated 5 mins ago"
        >
          <p>Nội dung thân thẻ.</p>
        </Card>
      );
    }
    ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
  </script>
</body>
</html>
```

---

## 8) Checklist
- [ ] Dùng slot cho **vùng nội dung có tên**.
- [ ] Giữ `children` cho content chính.
- [ ] Cân nhắc render props cho slot cần **trạng thái nội bộ**.
- [ ] Tránh “bùng nổ slot”; thiết kế tối giản.

---

## 9) Bài tập
1. Thiết kế `Dialog` có slots `title`, `content`, `actions` (render props để nhận `{ open, close }`).
2. Tạo `Card` có `media` slot (ảnh/video) + `actions`.
3. Viết `Dropdown` headless với API slots + compound: `Root`, `Trigger`, `Content`, `Item`.
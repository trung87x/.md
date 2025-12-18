# T4-02 — Children & Composition

> Mục tiêu: Hiểu prop đặc biệt **`children`**, kỹ thuật **composition** để ghép UI như lego; khác biệt so với “kế thừa”.

---

## 1) `children` là gì?
- Mọi JSX lồng trong cặp thẻ component sẽ thành **`props.children`**.
```jsx
<Card>
  <h3>Title</h3>
  <p>Content...</p>
</Card>
```
```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}
```

---

## 2) Composition > Inheritance
- React **khuyến nghị composition** để tái sử dụng UI/logic thay vì kế thừa class.
- Chuyển “điểm mở rộng” thành **vị trí `children`** hoặc **slot** (xem phần sau).

---

## 3) Compound primitives (wrapper + nội dung)
```jsx
function Layout({ header, footer, children }) {
  return (
    <div>
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
}
```
Hoặc truyền thẳng `children` và để cha quyết định cấu trúc.

---

## 4) Function as children (render prop – xem chi tiết T4-14)
```jsx
<Fetcher url="/api/users">
  {(state) => state.loading ? <Spinner/> : <List items={state.data}/>}
</Fetcher>
```
→ `children` có thể là **hàm** nhận state và trả về UI, rất linh hoạt.

---

## 5) Gộp children với props khác (pattern thường gặp)
```jsx
function Modal({ title, children, actions }) {
  return (
    <div className="modal">
      <h3>{title}</h3>
      <div className="content">{children}</div>
      <div className="actions">{actions}</div>
    </div>
  );
}
```
- Dùng **composition** để tuỳ biến layout mà **không tăng** số lượng component biến thể.

---

## 6) Lưu ý khi dùng `children`
- `children` có thể là **node đơn**, **mảng**, **null**, hoặc **hàm**.
- Kiểm tra `children` bằng `React.Children` helpers khi cần: `map`, `count`, `only`, `toArray`.
- Tránh ràng buộc cứng: để người dùng linh hoạt tuỳ biến nội dung bên trong.

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
    .card { padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px }
    .actions { display:flex; gap:8px; margin-top: 8px; }
  </style>
</head>
<body>
  <div id="app"></div>
  <script type="text/babel">
    function Card({ children, actions }) {
      return (
        <div className="card">
          <div>{children}</div>
          {actions && <div className="actions">{actions}</div>}
        </div>
      );
    }
    function App() {
      return (
        <Card actions={<><button>OK</button><button>Cancel</button></>}>
          <h3>Title</h3>
          <p>Nội dung do cha quyết định.</p>
        </Card>
      );
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 8) Checklist
- [ ] `children` là prop đặc biệt chứa nội dung lồng.
- [ ] Ưu tiên composition thay vì inheritance.
- [ ] Kết hợp `children` và props slot (`header`, `footer`, `actions`).
- [ ] Cho phép `children` là hàm khi cần render linh hoạt.

---

## 9) Bài tập
1. Xây `Card` có `children` + `actions` slot.
2. Tạo `Layout` có `header`, `sidebar`, `footer` và body là `children`.
3. Viết `List` nhận `children(item)` để tuỳ biến cách render item.
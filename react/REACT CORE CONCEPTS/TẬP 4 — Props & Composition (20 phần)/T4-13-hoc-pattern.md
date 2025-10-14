# T4-13 — HOC (Higher-Order Component) Pattern

> Mục tiêu: Hiểu **HOC** (component bậc cao) — hàm nhận component và trả về **component mới** với props/logic bổ sung; khi nào dùng HOC, so sánh với hooks/render props, và các bẫy cần tránh.

---

## 1) HOC là gì?
- **HOC**: `const Enhanced = withX(BaseComponent)` — một **hàm** nhận `BaseComponent` và trả về **component** khác, thêm **props/logic**.
- Ví dụ: `connect` của Redux (truyền state/store), `withRouter` (truyền routing props).

```jsx
function withLoading(Component) {
  return function WithLoading(props) {
    const { loading, ...rest } = props;
    if (loading) return <Spinner />;
    return <Component {...rest} />;
  };
}

// dùng
const UserListWithLoading = withLoading(UserList);
```

---

## 2) Mẫu tổng quát
```jsx
function hoc(Component) {
  function Wrapped(props) {
    // bổ sung props / logic / context
    const extra = {/* ... */};
    return <Component {...props} {...extra} />;
  }
  Wrapped.displayName = `hoc(${Component.displayName || Component.name || "Anon"})`;
  return Wrapped;
}
```

- **Giữ `displayName`** để DevTools dễ đọc.
- **Pass-through props** để không “nuốt” prop của component gốc.

---

## 3) Khi nào dùng HOC?
- Cần **áp cùng một behavior** cho **nhiều component khác nhau** ở **biên compile** (ví dụ: ghi log, canh quyền, gate truy cập).
- Khi bạn **không thể** hoặc **không muốn** sửa nội tại component gốc (3rd-party).

> Trong code React hiện đại, **custom hooks** thường gọn hơn cho logic chia sẻ. HOC vẫn hữu ích cho **bọc** concerns (a11y, theming, feature flags) mà không đổi API của component gốc.

---

## 4) Kết hợp HOC + Hooks
- HOC có thể **dùng hooks bên trong** để tính toán props truyền xuống.
```jsx
function withOnline(Component) {
  return function Wrapped(props) {
    const online = useOnline(); // custom hook
    return <Component {...props} online={online} />;
  };
}
```

---

## 5) Bẫy & lưu ý
- **Wrapper hell**: lồng nhiều HOC → khó debug (“Christmas tree”).  
  - Giải pháp: gộp HOC hoặc chuyển sang **hooks** ở nơi dùng.
- **Statics bị mất**: HOC trả ra component **mới** → các static của component gốc (vd. `MyComp.fetcher`) **không còn**.  
  - Dùng **hoist-non-react-statics** để sao chép.
- **Ref forwarding**: ref mặc định **không truyền qua** HOC.  
  - Dùng `React.forwardRef` trong HOC để chuyển tiếp `ref`.

```jsx
function withForwardedRef(Component) {
  function Wrapped(props, ref) {
    return <Component ref={ref} {...props} />;
  }
  return React.forwardRef(Wrapped);
}
```

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
    function withLoading(Component){
      return function Wrapped({ loading, ...rest }){
        if(loading) return <div>Loading…</div>;
        return <Component {...rest}/>;
      }
    }
    function List({ items }){ return <ul>{items.map(i=><li key={i}>{i}</li>)}</ul> }
    const ListWithLoading = withLoading(List);
    function App(){
      return <ListWithLoading loading={false} items={[1,2,3]}/>;
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
  </script>
</body>
</html>
```

---

## 7) Checklist
- [ ] Trả về component **mới** với `displayName` rõ ràng.
- [ ] Pass-through props; không chặn props gốc.
- [ ] Xử lý **ref forwarding** nếu cần.
- [ ] Tránh wrapper hell; cân nhắc hooks thay thế.
- [ ] (Tuỳ chọn) hoist **non-react statics** từ component gốc.

---

## 8) Bài tập
1. Viết `withAuthGuard(Component)`: nếu chưa đăng nhập → render `<LoginPrompt/>`.
2. Viết `withErrorBoundary(Component)` bọc Error Boundary chung.
3. Kết hợp `withOnline` (thêm prop `online`) và `withLoading` cho `UserList`; so sánh với dùng hooks tại nơi gọi.
# T4-14 — Function-as-Child (Render Props Nâng Cao)

> Mục tiêu: Đào sâu **function-as-child**: thiết kế API, ổn định tham chiếu, phối hợp **multiple render props**, và so sánh với hooks/compound.

---

## 1) Nhắc lại khái niệm
- `children` là **hàm** nhận state/handlers và trả về UI.
```jsx
<Fetcher url="/api/me">
  {({ status, data, error, retry }) => /* UI tuỳ biến */}
</Fetcher>
```

---

## 2) Thiết kế API “sạch”
- Tài liệu **shape**: `{ status: "idle" | "loading" | "success" | "error", data, error, retry }`.
- Giữ **đặt tên** nhất quán giữa các component.  
- Cân nhắc **phân tách nhỏ**: `Fetcher` chỉ fetch; hiển thị do nơi dùng quyết định.

---

## 3) Ổn định tham chiếu & hiệu năng
- Hàm `children` là **inline** → tham chiếu **mới mỗi render**.
- Nếu bên trong có con **`React.memo`**, cân nhắc **memo part** bằng `useMemo` hoặc **đưa render function ra ngoài**.

```jsx
function ListView({ items }) {
  const renderItem = React.useCallback((it) => <li key={it.id}>{it.name}</li>, []);
  return <ul>{items.map(renderItem)}</ul>;
}
```

---

## 4) Kết hợp nhiều render props (composition)
Tránh “callback pyramid” bằng cách **bọc theo từng lớp UI** hoặc chuyển vài phần sang **hooks**.

```jsx
<Fetcher url="/api/users">
  {(usersState) => (
    <Permissions role="admin">
      {(can) => can ? <UsersTable data={usersState.data}/> : <NoAccess/>}
    </Permissions>
  )}
</Fetcher>
```

**Giải pháp thay thế**: tách logic thành **hooks** (`useUsers()`, `usePermission()`) rồi dùng JSX thường.

---

## 5) Render props + Compound/Slots
- Dùng render props để **truyền state** từ `Root` xuống các slot/compound mà **không thêm context** mới.
- Ví dụ: `Dialog` có slot `actions` là hàm nhận `{ close }` để render nút “Đóng”.

```jsx
<Dialog actions={({ close }) => <button onClick={close}>Đóng</button>}>
  Nội dung
</Dialog>
```

---

## 6) Anti-patterns
- **Lồng quá sâu** nhiều render props → khó đọc.  
- Render props **ẩn** side-effect (fetch trong render, setState trong render) → **không** làm vậy; logic side-effect phải ở `useEffect` trong component chứa render prop.
- Dùng render props ở nơi **không cần** (hooks đủ dùng).

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
    function Fetcher({ url, children }) {
      const [state, setState] = React.useState({ status: "idle", data: null, error: null });
      React.useEffect(() => {
        const ac = new AbortController();
        setState({ status: "loading", data: null, error: null });
        (async () => {
          try {
            const r = await fetch(url, { signal: ac.signal });
            if (!r.ok) throw new Error(r.statusText);
            setState({ status: "success", data: await r.json(), error: null });
          } catch (e) {
            if (e.name !== "AbortError") setState({ status: "error", data: null, error: e });
          }
        })();
        return () => ac.abort();
      }, [url]);
      const retry = React.useCallback(() => setState(s => ({ ...s })), []);
      return children({ ...state, retry });
    }
    function App(){
      return (
        <Fetcher url="https://jsonplaceholder.typicode.com/users">
          {({ status, data, error }) => (
            <div>
              <div>Status: {status}</div>
              {status === "success" && <ul>{data.slice(0,5).map(u => <li key={u.id}>{u.name}</li>)}</ul>}
              {status === "error" && <div>Error!</div>}
            </div>
          )}
        </Fetcher>
      );
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
  </script>
</body>
</html>
```

---

## 8) Checklist
- [ ] Rõ ràng **shape** của tham số render props.
- [ ] Không side-effect trong render; dùng `useEffect`.
- [ ] Giữ tham chiếu ổn (`useCallback`) khi cần.
- [ ] Không lạm dụng; cân nhắc hooks/compound/slots.

---

## 9) Bài tập
1. Viết `Geolocator` (render props) cung cấp `{ coords, error }`.
2. Viết `OnKeyPress` cung cấp `{ lastKey }` cho `children`.
3. Refactor từ render props -> custom hooks và so sánh độ đơn giản.
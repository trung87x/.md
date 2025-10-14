# T4-05 — Prop Drilling & Giải Pháp

> Mục tiêu: Nhận diện **prop drilling** (truyền tay props qua nhiều tầng) và áp dụng **giải pháp**: context, composition, colocation state, event bubble-up.

---

## 1) Prop drilling là gì?
Khi cần truyền dữ liệu/hàm từ **cha xa** đến **cháu sâu**, bạn phải đi qua nhiều component **trung gian** chỉ để “chuyển tiếp” prop đó.

```jsx
// App → Layout → Toolbar → SaveButton
function App() {
  const save = () => {/* ... */};
  return <Layout onSave={save} />;
}
function Layout({ onSave }) { return <Toolbar onSave={onSave} />; }
function Toolbar({ onSave }) { return <SaveButton onClick={onSave} />; }
```

**Vấn đề**: code rườm rà, coupling cao; đổi API ở giữa phải sửa dây chuyền.

---

## 2) Khi nào drilling là OK?
- Tối đa **1–2 tầng** và **ít biến đổi** → có thể chấp nhận.
- Tránh lạm dụng context cho dữ liệu **cục bộ**, dễ gây render dây chuyền (xem T4-18 Context performance).

---

## 3) Giải pháp 1: Context
Dùng **Context** khi dữ liệu/hành động cần ở **nhiều nơi** và thay đổi **không quá thường xuyên**.

```jsx
const SaveContext = React.createContext(() => {});

function App() {
  const save = React.useCallback(() => {/* ... */}, []);
  return (
    <SaveContext.Provider value={save}>
      <Layout />
    </SaveContext.Provider>
  );
}
function SaveButton() {
  const onSave = React.useContext(SaveContext);
  return <button onClick={onSave}>Save</button>;
}
```

**Ưu**: Loại bỏ chuyển tiếp qua trung gian.  
**Nhược**: Mọi consumer re-render khi `value` đổi → cần **memo hóa `value`**.

---

## 4) Giải pháp 2: Composition (children/slots)
Đưa “điểm mở rộng” vào `children`/`slots` để truyền trực tiếp phần UI/hành động cần thiết.

```jsx
function Toolbar({ actions }) {
  return <div className="toolbar">{actions}</div>;
}
function App() {
  const save = () => {/*...*/};
  return <Toolbar actions={<button onClick={save}>Save</button>} />;
}
```

**Ưu**: API linh hoạt, không cần context.  
**Nhược**: Khi số slot tăng nhiều, dễ rối.

---

## 5) Giải pháp 3: Colocation state (đặt state gần nơi dùng)
Nếu state chủ yếu phục vụ một **nhánh con**, hãy **đưa state xuống** thay vì đặt ở cha cao nhất.

```jsx
// ❌ State ở App kéo cả cây render
function App() {
  const [query, setQuery] = useState("");
  return <Search query={query} onChange={setQuery} />;
}
// ✅ Colocation
function Search() {
  const [query, setQuery] = useState("");
  /* ... */
}
```

---

## 6) Giải pháp 4: Bubble-up event (nâng sự kiện lên)
Thay vì truyền callback xuống sâu, cho **con phát sự kiện lên** thông qua props ở gần (**gần hơn** thay vì từ App xa xôi).

```jsx
function List({ items, onSelect }) {
  return items.map((it) => (
    <Row key={it.id} item={it} onSelect={onSelect} />
  ));
}
```

---

## 7) Anti-patterns & lưu ý
- Biến **Context** thành “global mutable state” không kiểm soát.
- Quên **memo hóa `value`** trong Provider → consumer render thừa.
- Đưa **mọi thứ** vào 1 context khổng lồ → split nhỏ theo domain.

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
    const ThemeContext = React.createContext("light");
    function Toolbar() {
      const theme = React.useContext(ThemeContext);
      return <div>Theme: {theme}</div>;
    }
    function App() {
      const [theme, setTheme] = React.useState("light");
      const value = React.useMemo(() => theme, [theme]);
      return (
        <ThemeContext.Provider value={value}>
          <button onClick={() => setTheme(t => t === "light" ? "dark" : "light")}>Toggle</button>
          <Toolbar />
        </ThemeContext.Provider>
      );
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 9) Checklist
- [ ] Drilling ≤ 2 tầng → tạm ổn; nhiều hơn → cân nhắc Context/Composition.
- [ ] Memo hóa `value` của Provider.
- [ ] Colocation state khi dữ liệu chủ yếu dùng ở nhánh con.
- [ ] Tránh “mega-context”; split theo domain.

---

## 10) Bài tập
1. Refactor một chuỗi 3–4 tầng drilling sang Context.
2. Chuyển API Toolbar dùng slot `actions` thay vì prop `onSave`.
3. Đặt state `query` xuống `Search` nếu chỉ dùng trong nhánh này.
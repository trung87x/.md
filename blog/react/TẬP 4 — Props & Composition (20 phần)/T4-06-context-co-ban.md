# T4-06 — Context Cơ Bản

> Mục tiêu: Dùng **Context** để chia sẻ dữ liệu/hành động giữa các component **không cùng cấp**, hiểu lifecycle, memo hóa `value`, và phạm vi Provider.

---

## 1) Tạo & sử dụng Context
```jsx
const ThemeContext = React.createContext("light"); // giá trị mặc định

function App() {
  const [theme, setTheme] = React.useState("light");
  const value = React.useMemo(() => theme, [theme]);
  return (
    <ThemeContext.Provider value={value}>
      <Page />
    </ThemeContext.Provider>
  );
}

function Panel() {
  const theme = React.useContext(ThemeContext);
  return <div data-theme={theme}>Panel</div>;
}
```

---

## 2) Provider & phạm vi
- Mỗi `Provider` tạo một **phạm vi** (scope) riêng.
- Có thể **lồng nhiều provider** để ghi đè giá trị ở khu vực nhỏ.

```jsx
<ThemeContext.Provider value="dark">
  <Panel />                 {/* dark */}
  <ThemeContext.Provider value="light">
    <Panel />               {/* light */}
  </ThemeContext.Provider>
</ThemeContext.Provider>
```

---

## 3) Memo hóa `value` để tránh render thừa
- Consumer **re-render** khi **reference** của `value` đổi.
- Luôn `useMemo` cho object/hàm:
```jsx
const value = React.useMemo(() => ({ theme, toggle }), [theme, toggle]);
```

---

## 4) Context vs Prop Drilling
- Context **loại bỏ** nhu cầu truyền tay qua trung gian.
- Nhưng đừng lạm dụng: context update có thể làm **nhiều consumer** re-render → tách context theo **domain nhỏ** (Theme, Auth, Locale… riêng).

---

## 5) Context cho hành động (function)
```jsx
const SaveContext = React.createContext(() => {});

function Provider({ children }) {
  const save = React.useCallback(() => {/* ... */}, []);
  return <SaveContext.Provider value={save}>{children}</SaveContext.Provider>;
}
function UseSaveButton() {
  const save = React.useContext(SaveContext);
  return <button onClick={save}>Save</button>;
}
```

---

## 6) Giá trị mặc định & kiểm tra null
Nếu context **cần Provider** để hoạt động, hãy kiểm tra và ném lỗi dễ hiểu.

```jsx
const Ctx = React.createContext(undefined);
function useCtx() {
  const v = React.useContext(Ctx);
  if (v === undefined) throw new Error("useCtx phải dùng trong Ctx.Provider");
  return v;
}
```

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
    const LangContext = React.createContext("vi");
    function Greeter() {
      const lang = React.useContext(LangContext);
      return <h3>{lang === "vi" ? "Xin chào" : "Hello"}</h3>;
    }
    function App() {
      const [lang, setLang] = React.useState("vi");
      return (
        <LangContext.Provider value={lang}>
          <button onClick={() => setLang(l => l === "vi" ? "en" : "vi")}>Switch</button>
          <Greeter />
        </LangContext.Provider>
      );
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 8) Checklist
- [ ] Tạo context với `createContext(default)`.
- [ ] Bọc vùng cần chia sẻ bằng `Provider`.
- [ ] Memo hóa `value` (đặc biệt là object/hàm).
- [ ] Tách context theo domain; tránh “mega-context”.

---

## 9) Bài tập
1. Xây `ThemeProvider` và consumer `useTheme()` có `theme/toggle`.
2. Tạo `AuthContext` chứa `user`, `login()`, `logout()`; memo hóa `value`.
3. Lồng 2 Provider (theme “dark” bao ngoài, “light” bên trong một card) và quan sát kết quả.
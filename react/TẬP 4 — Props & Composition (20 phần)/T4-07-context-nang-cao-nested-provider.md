# T4-07 — Context Nâng Cao (Nested Provider, Split, Selector)

> Mục tiêu: Làm chủ **nhiều Provider lồng nhau**, **split context** tránh render dây chuyền, và dùng **selector** để đọc 1 phần context.

---

## 1) Nested Provider: chồng ngữ cảnh có chủ đích
Bạn có thể lồng nhiều Provider để **tạo phạm vi** và **ghi đè** giá trị ở khu vực nhỏ.

```jsx
const ThemeCtx = React.createContext("light");
const LocaleCtx = React.createContext("vi");

function App() {
  return (
    <ThemeCtx.Provider value="dark">
      <LocaleCtx.Provider value="en">
        <Page />
      </LocaleCtx.Provider>
    </ThemeCtx.Provider>
  );
}
```

- `Page` đọc `ThemeCtx` → "dark", `LocaleCtx` → "en".  
- Thiết kế này giúp bạn **phân vùng** cấu hình/UI.

---

## 2) Split context để giảm re-render
Một context chứa cả **state hay đổi** và **hàm** có thể làm mọi consumer render lại. Hãy **chia nhỏ**:
```jsx
const CountValueCtx = React.createContext(0);
const CountActionsCtx = React.createContext({ inc: () => {}, dec: () => {} });

function CounterProvider({ children }) {
  const [count, setCount] = React.useState(0);
  const actions = React.useMemo(() => ({
    inc: () => setCount((c) => c + 1),
    dec: () => setCount((c) => c - 1)
  }), []);
  return (
    <CountActionsCtx.Provider value={actions}>
      <CountValueCtx.Provider value={count}>
        {children}
      </CountValueCtx.Provider>
    </CountActionsCtx.Provider>
  );
}

function useCount() { return React.useContext(CountValueCtx); }
function useCountActions() { return React.useContext(CountActionsCtx); }
```
- Consumer chỉ đọc **giá trị** sẽ re-render khi `count` đổi.  
- Consumer chỉ đọc **hành động** (`inc/dec`) **không re-render** khi `count` đổi (do `actions` đã memo).

---

## 3) Selector pattern (đọc 1 phần context)
React không có built-in selector cho context, nhưng có thể tự làm **thủ công** bằng cách **tách nhỏ** hoặc dùng lib `use-context-selector`.

### Tách nhỏ bằng custom hook
```jsx
const UserCtx = React.createContext({ id: null, name: "", role: "" });

function useUserName() {
  const user = React.useContext(UserCtx);
  return user.name; // chỉ trả phần cần dùng
}
```
> Dù hook chỉ trả `name`, **consumer vẫn re-render** khi bất kỳ trường nào của `user` đổi, vì reference `value` đổi.  
> Do đó, selector tự viết **không tránh** được re-render; để thực sự tối ưu, dùng **split context** hoặc thư viện selector.

---

## 4) Tối ưu hiệu năng với context
- **Memo hóa `value`** (đặc biệt là object/hàm).
- **Split** context theo domain (Auth, Theme, Locale, Settings...).  
- Với store lớn/phức tạp → cân nhắc **state ngoài React** (`zustand`, `redux`, `jotai`, `valtio`, `useSyncExternalStore`).

---

## 5) Forward Context qua component trung gian
Không cần **truyền props** qua component “đệm”; chỉ cần wrap bằng Provider bên ngoài. Component ở sâu vẫn đọc context đúng.

```jsx
function Frame({ children }) {
  return <div className="frame">{children}</div>;
}
function App() {
  return (
    <ThemeCtx.Provider value="dark">
      <Frame>
        <Panel /> {/* Panel vẫn đọc ThemeCtx */}
      </Frame>
    </ThemeCtx.Provider>
  );
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
    const CountValueCtx = React.createContext(0);
    const CountActionsCtx = React.createContext({ inc: () => {}, dec: () => {} });

    function Provider({ children }) {
      const [count, setCount] = React.useState(0);
      const actions = React.useMemo(() => ({
        inc: () => setCount(c => c + 1),
        dec: () => setCount(c => c - 1)
      }), []);
      return (
        <CountActionsCtx.Provider value={actions}>
          <CountValueCtx.Provider value={count}>
            {children}
          </CountValueCtx.Provider>
        </CountActionsCtx.Provider>
      );
    }

    const Value = React.memo(function Value() {
      const v = React.useContext(CountValueCtx);
      console.log("Value render");
      return <div>Count: {v}</div>;
    });

    const Buttons = React.memo(function Buttons() {
      const { inc, dec } = React.useContext(CountActionsCtx);
      console.log("Buttons render");
      return <div><button onClick={inc}>+</button><button onClick={dec}>-</button></div>;
    });

    function App() {
      return <Provider><Value /><Buttons /></Provider>;
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 7) Checklist
- [ ] Lồng nhiều Provider khi cần **phạm vi** khác nhau.
- [ ] **Split context**: tách **giá trị** và **hành động**.
- [ ] Memo hóa `value` (object/hàm).
- [ ] Cân nhắc store ngoài React cho use-case lớn.

---

## 8) Bài tập
1. Refactor context “AppContext khổng lồ” thành 3 context nhỏ (Auth/Theme/Locale).
2. Áp dụng split `value/actions` cho Counter; chứng minh `Buttons` không re-render khi `count` đổi.
3. So sánh số lần render trước/sau khi split với React DevTools.
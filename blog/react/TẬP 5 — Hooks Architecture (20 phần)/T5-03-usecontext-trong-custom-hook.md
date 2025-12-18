# T5-03 — useContext trong Custom Hook

> Mục tiêu: Bọc **useContext** vào **custom hook** để ẩn chi tiết Provider, tạo **API sạch**, kiểm tra phạm vi, và tối ưu re-render.

---

## 1) Vì sao bọc useContext?
- Ẩn **tên context** và logic kiểm tra khỏi nơi dùng.
- Cho phép **đổi implementation** nội bộ mà không đổi API.
- Dễ **mock/test** và thêm tiện ích (selector, validation).

```tsx
// Context nội bộ
type Theme = "light" | "dark";
const ThemeCtx = React.createContext<Theme | undefined>(undefined);

// Custom hook công khai
export function useTheme() {
  const v = React.useContext(ThemeCtx);
  if (v === undefined) throw new Error("useTheme phải dùng trong <ThemeProvider>");
  return v;
}

// Provider
export function ThemeProvider({ value, children }: { value: Theme; children: React.ReactNode }) {
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}
```

---

## 2) Bổ sung action: tách value/actions
```tsx
type ThemeValue = "light" | "dark";
type ThemeActions = { toggle(): void };

const ThemeValueCtx = React.createContext<ThemeValue | undefined>(undefined);
const ThemeActionsCtx = React.createContext<ThemeActions | undefined>(undefined);

export function useThemeValue() {
  const v = React.useContext(ThemeValueCtx);
  if (v === undefined) throw new Error("useThemeValue phải dùng trong Provider");
  return v;
}
export function useThemeActions() {
  const v = React.useContext(ThemeActionsCtx);
  if (v === undefined) throw new Error("useThemeActions phải dùng trong Provider");
  return v;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<ThemeValue>("light");
  const actions = React.useMemo<ThemeActions>(() => ({ toggle: () => setTheme(t => t === "light" ? "dark" : "light") }), []);
  return (
    <ThemeActionsCtx.Provider value={actions}>
      <ThemeValueCtx.Provider value={theme}>{children}</ThemeValueCtx.Provider>
    </ThemeActionsCtx.Provider>
  );
}
```
- **Lợi ích**: component chỉ đọc **actions** sẽ **không re-render** khi theme thay đổi (do `actions` đã memo).

---

## 3) Hook selector (tuỳ chọn)
- Có thể viết `useUserName()` để chỉ **trả ra** `name`.  
- **Lưu ý**: React không có selector built‑in; nếu `value` là object mới mỗi lần → consumer vẫn re-render.  
- Tối ưu hơn bằng **split context** hoặc **store ngoài React** (`useSyncExternalStore`).

---

## 4) Định nghĩa API rõ ràng
- Tạo **README ngắn** cho mỗi Provider/hook: mục đích, input/output, side‑effect.  
- Export **ít nhưng đủ**: `useXValue`, `useXActions`, `XProvider`.

---

## 5) Anti‑patterns
- Export trực tiếp Context → nơi dùng có thể **bỏ qua kiểm tra phạm vi**.
- Không **memo** `value` object/hàm.
- Dồn quá nhiều thứ vào 1 context (“mega‑context”).

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
    const ThemeValueCtx = React.createContext();
    const ThemeActionsCtx = React.createContext();
    function useThemeValue(){ const v = React.useContext(ThemeValueCtx); if(v===undefined) throw new Error("useThemeValue"); return v; }
    function useThemeActions(){ const v = React.useContext(ThemeActionsCtx); if(v===undefined) throw new Error("useThemeActions"); return v; }
    function ThemeProvider({ children }){
      const [theme, setTheme] = React.useState("light");
      const actions = React.useMemo(()=>({ toggle:()=>setTheme(t=>t==="light"?"dark":"light") }), []);
      return (
        <ThemeActionsCtx.Provider value={actions}>
          <ThemeValueCtx.Provider value={theme}>{children}</ThemeValueCtx.Provider>
        </ThemeActionsCtx.Provider>
      );
    }
    const Viewer = React.memo(function Viewer(){ const t = useThemeValue(); console.log("Viewer"); return <div>Theme: {t}</div>; });
    const Toggle = React.memo(function Toggle(){ const { toggle } = useThemeActions(); console.log("Toggle"); return <button onClick={toggle}>Toggle</button>; });
    function App(){ return <ThemeProvider><Viewer/><Toggle/></ThemeProvider>; }
    ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
  </script>
</body>
</html>
```

---

## 7) Checklist
- [ ] Luôn bọc `useContext` trong custom hook, kiểm tra phạm vi.
- [ ] Split value/actions nếu phù hợp; **memo** `value`/`actions`.
- [ ] Cân nhắc selector hoặc store ngoài React.
- [ ] Tài liệu hoá API hook/Provider.

---

## 8) Bài tập
1. Tạo `AuthProvider` với `useAuthValue()` và `useAuthActions()`.
2. Thử đo render của nút `Logout` khi `user` (value) thay đổi — chứng minh split giúp giảm render.
3. Viết README 10 dòng mô tả contract các hook này.
# T4-10 — Compound Component Pattern

> Mục tiêu: Thiết kế **bộ component hợp phần** (compound) chia sẻ cùng một state nội bộ qua Context, cho API **tự nhiên, linh hoạt**.

---

## 1) Ý tưởng
- Tách một widget phức tạp thành **nhiều phần nhỏ**: `Tabs`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`…
- Các phần con đọc **cùng một context** từ `Parent`, không cần prop drilling.

```jsx
<Tabs defaultValue="a">
  <Tabs.List>
    <Tabs.Trigger value="a">A</Tabs.Trigger>
    <Tabs.Trigger value="b">B</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="a">Content A</Tabs.Content>
  <Tabs.Content value="b">Content B</Tabs.Content>
</Tabs>
```

---

## 2) Cài đặt cơ bản
```jsx
const TabsCtx = React.createContext(null);
function useTabs() {
  const ctx = React.useContext(TabsCtx);
  if (!ctx) throw new Error("Tabs.* phải nằm trong <Tabs>");
  return ctx;
}

export function Tabs({ defaultValue, children }) {
  const [value, setValue] = React.useState(defaultValue);
  const ctx = React.useMemo(() => ({ value, setValue }), [value]);
  return <TabsCtx.Provider value={ctx}>{children}</TabsCtx.Provider>;
}

Tabs.List = function List({ children }) { return <div role="tablist">{children}</div>; };
Tabs.Trigger = function Trigger({ value, children }) {
  const { value: active, setValue } = useTabs();
  const selected = active === value;
  return (
    <button role="tab" aria-selected={selected} onClick={() => setValue(value)}>
      {children}
    </button>
  );
};
Tabs.Content = function Content({ value, children }) {
  const { value: active } = useTabs();
  if (active !== value) return null;
  return <div role="tabpanel">{children}</div>;
};
```

---

## 3) Lợi ích
- **API tự nhiên** với JSX, dễ đọc, tránh prop drilling.
- Có thể **swap**/sắp xếp các phần mà không vỡ API.
- Dễ mở rộng: thêm `Tabs.Indicator`, `Tabs.KeyboardNav`…

---

## 4) Lưu ý thiết kế
- Kiểm tra **phạm vi** (con phải nằm trong cha) → ném lỗi rõ ràng.
- Dùng **Context** để chia sẻ state; memo hoá `value`.
- Hỗ trợ **a11y**: role, aria-selected, keyboard navigation.
- Lang cận: tên static property (`Tabs.List`, …) cần được gán sau khi khai báo hàm chính.

---

## 5) Anti-patterns
- Dồn quá nhiều props vào `Parent` → lại thành “god component”.
- Không kiểm tra scope → khó debug khi dùng sai vị trí.
- Bỏ qua a11y → không thể điều hướng bằng bàn phím.

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
  <style>
    [role="tab"][aria-selected="true"] { font-weight: 700; }
  </style>
</head>
<body>
  <div id="app"></div>
  <script type="text/babel">
    const TabsCtx = React.createContext(null);
    function useTabs(){ const c = React.useContext(TabsCtx); if(!c) throw new Error("Tabs.* phải nằm trong <Tabs>"); return c; }
    function Tabs({ defaultValue, children }) {
      const [value, setValue] = React.useState(defaultValue);
      const ctx = React.useMemo(() => ({ value, setValue }), [value]);
      return <TabsCtx.Provider value={ctx}>{children}</TabsCtx.Provider>;
    }
    Tabs.List = function List({ children }) { return <div role="tablist">{children}</div>; };
    Tabs.Trigger = function Trigger({ value, children }) {
      const { value: active, setValue } = useTabs();
      const selected = active === value;
      return <button role="tab" aria-selected={selected} onClick={() => setValue(value)}>{children}</button>;
    };
    Tabs.Content = function Content({ value, children }) {
      const { value: active } = useTabs();
      if (active !== value) return null;
      return <div role="tabpanel">{children}</div>;
    };
    function App(){
      return (
        <Tabs defaultValue="a">
          <Tabs.List>
            <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
            <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="a">Nội dung A</Tabs.Content>
          <Tabs.Content value="b">Nội dung B</Tabs.Content>
        </Tabs>
      )
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
  </script>
</body>
</html>
```

---

## 7) Checklist
- [ ] Chia nhỏ widget thành các **compound** có vai trò rõ ràng.
- [ ] Dùng Context chia sẻ state, kiểm tra scope.
- [ ] Memo hoá `value`, thêm a11y (role/aria).
- [ ] API tự nhiên: `<Widget.Sub />`.

---

## 8) Bài tập
1. Tạo `Accordion`, `Accordion.Item`, `Accordion.Header`, `Accordion.Panel` (một/multiple mở tuỳ config).
2. Viết `Dropdown` compound: `Root`, `Trigger`, `Menu`, `Item` với keyboard a11y cơ bản.
3. Thêm `Tabs.Indicator` di chuyển theo tab active (dùng `useLayoutEffect` đo kích thước).
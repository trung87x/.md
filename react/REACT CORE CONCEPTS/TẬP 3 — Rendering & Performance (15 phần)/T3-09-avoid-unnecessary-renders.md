# T3-09 — Avoid Unnecessary Renders

> Mục tiêu: Cắt giảm **re-render thừa** bằng kiến trúc state hợp lý, memo hóa đúng chỗ, và phân ranh giới render.

---

## 1) Colocation state (đặt state đúng chỗ)
- Đặt state **gần nơi dùng nhất** để tránh làm cha render rồi kéo theo cả cây con.
- Tránh state “toàn cục” không cần thiết.

```jsx
// ❌ State ở cha → mọi con render theo
function Page() {
  const [query, setQuery] = useState("");
  return (
    <>
      <SearchBox value={query} onChange={setQuery} />
      <HeavyList query={query} /> {/* render lại cả Page */}
    </>
  );
}
```

```jsx
// ✅ Colocation: state nằm trong component sử dụng chính
function HeavyList() {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => filter(items, query), [items, query]);
  return <ListUI query={query} onChange={setQuery} items={visible} />;
}
```

---

## 2) Tách component theo ranh giới render
- Chia nhỏ UI thành các khối **ít thay đổi** và **hay thay đổi**, bọc phần ít đổi bằng `React.memo`.

```jsx
function Toolbar({ onSave }) { /* ít đổi */ }
const ToolbarMemo = React.memo(Toolbar);

function Screen() {
  const [draft, setDraft] = useState("");
  const save = useCallback(() => api.save(draft), [draft]);
  return (
    <>
      <ToolbarMemo onSave={save} />
      <Editor value={draft} onChange={setDraft} /> {/* đổi thường xuyên */}
    </>
  );
}
```

---

## 3) Ổn định props: object/array/function
- Dùng `useMemo`/`useCallback` để giữ tham chiếu ổn định khi truyền xuống con `React.memo`.
- Tránh tạo **literal mới** trong JSX.

```jsx
const options = useMemo(() => ({ dense, rounded }), [dense, rounded]);
const onPick = useCallback((id) => select(id), [select]);
<List options={options} onPick={onPick} />
```

---

## 4) Context hygiene (vệ sinh Context)
- **Tách context** theo nhóm dữ liệu thay đổi khác nhau.
- Memo hoá `value` của Provider.
- Với dữ liệu lớn/ hay đổi: cân nhắc **selector** (use-context-selector) hoặc **state ngoài React**.

```jsx
const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
<ThemeProvider value={value}>{children}</ThemeProvider>
```

---

## 5) Deferred & transition cho trải nghiệm mượt
- `useDeferredValue(value)` giúp **trì hoãn** render tốn kém so với input tức thời.
- `useTransition()` cho phép đánh dấu cập nhật **không gấp**, giữ UI tương tác mượt.

```jsx
const [isPending, startTransition] = useTransition();
const deferred = useDeferredValue(query);

startTransition(() => setQuery(next)); // cập nhật nặng
```

---

## 6) Virtualize danh sách lớn
- Dùng `react-window`/`react-virtuoso` để chỉ render các item **đang hiển thị**.
- Tránh map trực tiếp 10k phần tử trong DOM.

---

## 7) Minimize re-renders từ event liên tục
- Debounce/throttle các sự kiện gõ phím, scroll, resize.
- Gom nhiều `setState` vào **một** cập nhật (batching).

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
    const Sidebar = React.memo(function Sidebar() {
      console.log("Sidebar render");
      return <aside>Sidebar (memo)</aside>;
    });
    function App() {
      const [text, setText] = React.useState("");
      return (
        <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:16}}>
          <Sidebar />
          <div>
            <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Typing shouldn't rerender Sidebar" />
            <p>Text: {text}</p>
          </div>
        </div>
      );
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App />);
  </script>
</body>
</html>
```

---

## 9) Checklist
- [ ] Colocation state; tránh kéo cả cây render.
- [ ] Chia ranh giới render; bọc phần ít đổi bởi `React.memo`.
- [ ] Ổn định object/array/function props.
- [ ] Vệ sinh Context (split + memo value).
- [ ] Xem xét deferred/transition cho cập nhật nặng.
- [ ] Virtualize danh sách lớn.
- [ ] Debounce/throttle event “dày đặc”.

---

## 10) Bài tập
1. Refactor màn hình form lớn: tách Toolbar (memo) khỏi Editor.
2. Dùng `useDeferredValue` cho tìm kiếm live trên list 5k item.
3. Tạo bản virtualized cho danh sách 10k phần tử.
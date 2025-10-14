# T5-07 — `useEvent` (Canary) & Stable Alternatives

> Mục tiêu: Hiểu **`useEvent`** (đang ở kênh Canary/experimental) để tạo **callback ổn định** qua render **mà vẫn đọc được state mới nhất**, và cách thay thế bằng **pattern ổn định** (useRef/useLatest + useCallback).

> Lưu ý: `useEvent` có thể thay đổi API/tên theo phiên bản React bạn dùng. Nếu dự án **chưa** hỗ trợ, dùng **alternatives** bên dưới.

---

## 1) Vấn đề: callback “ổn định nhưng tươi”
Bạn cần một callback **không đổi tham chiếu** (để không phá `React.memo`/deps), nhưng **bên trong** phải đọc **giá trị mới nhất** của state/props.

```jsx
function Search() {
  const [query, setQuery] = React.useState("");
  const onKeyDown = React.useCallback((e) => {
    if (e.key === "Enter") doSearch(query); // ❌ query bị "chụp" tại lúc tạo callback
  }, []);
}
```

Nếu không đưa `query` vào deps, callback sẽ đọc **giá trị cũ** (stale). Nếu đưa vào deps, **tham chiếu** callback lại đổi mỗi lần gõ.

---

## 2) Ý tưởng của `useEvent`
Giả sử có:
```jsx
const onKeyDown = useEvent((e) => {
  // callback ổn định nhưng đọc "query" mới nhất
  if (e.key === "Enter") doSearch(query);
});
```
- Tham chiếu `onKeyDown` **ổn định** giữa các render.
- Bên trong đọc state/props **mới nhất**.

---

## 3) Thay thế ổn định (khuyến nghị nếu chưa có `useEvent`)
### 3.1. `useLatest` ref pattern
```jsx
function useLatest(value) {
  const ref = React.useRef(value);
  React.useEffect(() => { ref.current = value; }, [value]);
  return ref;
}

function useEventStable(fn) {
  const fnRef = useLatest(fn);
  return React.useCallback((...args) => fnRef.current(...args), [fnRef]);
}
```
Dùng:
```jsx
const onKeyDown = useEventStable((e) => {
  if (e.key === "Enter") doSearch(query); // luôn là query mới nhất
});
```

### 3.2. DOM listeners lâu dài
Khi addEventListener một lần (mount), dùng `useLatest` để handler luôn tươi mà **không** phải rebind:
```jsx
function useWindowKey(handler) {
  const h = useLatest(handler);
  React.useEffect(() => {
    const fn = (e) => h.current(e);
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [h]);
}
```

---

## 4) So sánh nhanh
| Nhu cầu | `useEvent` | `useLatest` + `useCallback` |
|---|---|---|
| Ổn định tham chiếu | ✅ | ✅ |
| Đọc state mới nhất | ✅ | ✅ |
| Có sẵn production | Tùy phiên bản | ✅ |
| DevTools/ESLint hỗ trợ | Đang cập nhật | ✅ |

---

## 5) Anti‑patterns
- Dùng `useRef` giữ state **thay cho** state thực → UI không cập nhật.
- Rebind DOM listener **mỗi render** chỉ để có giá trị tươi → tốn kém, rò rỉ nếu quên cleanup.

---

## 6) Mini demo (UMD)
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
<div id="app"></div>
<script type="text/babel">
  function useLatest(value){ const ref=React.useRef(value); React.useEffect(()=>{ref.current=value},[value]); return ref; }
  function useEventStable(fn){ const fnRef = useLatest(fn); return React.useCallback((...a)=>fnRef.current(...a),[fnRef]); }
  function App(){
    const [q, setQ] = React.useState("");
    const onKeyDown = useEventStable((e) => { if(e.key==="Enter") alert("Search: "+q); });
    return <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={onKeyDown} placeholder="Type & Enter"/>;
  }
  ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
</script>
</body>
</html>
```

---

## 7) Checklist
- [ ] Nếu chưa có `useEvent`, dùng `useLatest` + `useCallback`.
- [ ] Tránh rebind listener mỗi render.
- [ ] Callback cần **ổn định** khi truyền vào `memo`/`effect` deps.
- [ ] Luôn cleanup listeners/timer.

---

## 8) Bài tập
1. Viết `useEventStable` và áp dụng cho input search như trên.
2. Tạo hook `useDocumentClick(handler)` dùng `useLatest` để luôn đọc handler mới.
3. So sánh render count giữa giải pháp rebind vs stable handler.
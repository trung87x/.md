# T6-06 — Optimizing Re‑rendering Boundaries

> Mục tiêu: Xác định và tối ưu **ranh giới re-render**: dùng `React.memo`, tách context, ổn định props, và chia nhỏ cây theo **tần suất thay đổi**.

---

## 1) Nguyên tắc
- **Co-location state**: đặt state gần nơi dùng nhất.
- Tách **thành phần hay đổi** khỏi **thành phần ổn định**.
- Dùng **`React.memo`** cho component **pure** (shallow props).
- Ổn định **callback/objects** bằng `useCallback`/`useMemo`.

---

## 2) Phân lớp theo tần suất
- **High-churn** (thay đổi liên tục): counter, typing, animation.  
- **Low-churn**: layout, header, sidebar, theme.  
→ Tách boundary: high-churn không kéo low-churn render.

```tsx
function Shell() {
  return (
    <Layout>
      <Header /> {/* low-churn */}
      <Main><ChatPanel/></Main> {/* high-churn */}
    </Layout>
  );
}
```

---

## 3) `React.memo` & shallow compare
```tsx
const Toolbar = React.memo(function Toolbar({ actions }: { actions: string[] }) {
  /* ... */
});
// ⚠️ Tránh truyền mảng mới mỗi render:
const actions = useMemo(()=>["Save","Share"], []);
```

- Với props phức tạp, cân nhắc **`areEqual(prev, next)`** custom, nhưng tránh over-optimizing.

---

## 4) Tách context & selector
- Split `value`/`actions`, hoặc chuyển qua **store** với `useSyncExternalStore` (T5‑05).
- Hoặc wrap consumer bằng **selector hook** để giảm vùng re-render.

---

## 5) Key kỹ thuật
- Tránh **object literal** làm props/deps.
- **List lớn**: tách item thành memo component, dùng **key ổn định**.
- **Suspense boundaries** cho vùng tải dữ liệu tách rời.

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
  const Item = React.memo(function Item({ v }){ console.log("Item", v); return <li>{v}</li>; });
  function List({ list }){ return <ul>{list.map(v=> <Item key={v} v={v} />)}</ul>; }
  function App(){
    const [n, setN] = React.useState(0);
    const list = React.useMemo(()=>Array.from({length:5}, (_,i)=>"Row "+i), []);
    return <div>
      <button onClick={()=>setN(n+1)}>Tick {n}</button>
      <List list={list}/>
    </div>;
  }
  ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
</script>
</body>
</html>
```

---

## 7) Checklist
- [ ] Phân lớp high/low churn; co-locate state.  
- [ ] Memo component/props cần thiết.  
- [ ] Split context/selector; tránh prop literal.  
- [ ] Dùng Suspense boundaries khi hợp lý.

---

## 8) Bài tập
1. Tách `Header`/`Sidebar` khỏi panel chat; đo render.  
2. Biến danh sách 1k items thành memo + virtualized (T6‑11).
# T6-10 — `useTransition` & `useDeferredValue` (Deep Dive)

> Mục tiêu: Đào sâu chiến lược **điều phối cập nhật** với `startTransition` và **trì hoãn đọc** bằng `useDeferredValue`: patterns, pitfalls, đo lường UX.

---

## 1) Khi nào dùng `startTransition`
- Cập nhật **không gấp**: điều hướng, filter/list nặng, cập nhật nền.  
- Giữ input **phản hồi ngay** trong khi danh sách cập nhật **ở nền**.

```tsx
const [isPending, startTransition] = React.useTransition();
const onChange = (q: string) => startTransition(() => setQuery(q));
```

- Trong khi `isPending`, hiển thị **feedback** mảnh (spinner inline, dim).

---

## 2) Khi nào dùng `useDeferredValue`
- Khi **một phần UI** cần giá trị trễ để tránh tính toán nặng mỗi phím gõ.
```tsx
const deferredQuery = React.useDeferredValue(query);
const results = useMemo(()=> heavySearch(list, deferredQuery), [list, deferredQuery]);
```

---

## 3) Kết hợp cả hai
- Gõ phím → cập nhật state **transition**; bảng **đọc** `deferredQuery` để giảm lag.  
- Tránh defer **dữ liệu ảnh hưởng tính đúng** tức thì (validation sync).

---

## 4) Đo lường
- Dùng **Profiler** & **INP (Interaction to Next Paint)** trên Lighthouse.  
- Ghi lại thời gian filter trước/sau.

---

## 5) Pitfalls
- Defer quá nhiều → UI chậm cập nhật nhận thức.  
- Quên hiển thị `isPending` → người dùng **không có phản hồi**.  
- heavySearch không **memo hóa** → mất lợi ích.

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
  function heavy(list, q){ const t=q.toLowerCase(); return list.filter(x=>x.toLowerCase().includes(t)); }
  function App(){
    const [q, setQ] = React.useState("");
    const [isPending, startTransition] = React.useTransition();
    const deferred = React.useDeferredValue(q);
    const list = React.useMemo(()=>Array.from({length:8000}, (_,i)=>"Item "+i), []);
    const results = React.useMemo(()=>heavy(list, deferred), [list, deferred]);
    return (<div>
      <input value={q} onChange={e=>startTransition(()=>setQ(e.target.value))} placeholder="Search 8k items"/>
      {isPending && <small> Loading…</small>}
      <div>Found: {results.length}</div>
    </div>);
  }
  ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
</script>
</body>
</html>
```

---

## 7) Checklist
- [ ] Đánh dấu cập nhật không gấp bằng `startTransition`.  
- [ ] Dùng `useDeferredValue` cho phần UI đọc giá trị tốn kém.  
- [ ] Memo hóa tính toán nặng.  
- [ ] Đo INP và hiển thị phản hồi `isPending`.

---

## 8) Bài tập
1. Áp dụng cho trang tìm kiếm: đo INP trước/sau.  
2. Kết hợp với virtual list (T6‑11) để tối ưu bảng lớn.
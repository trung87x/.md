# T6-07 — Code Splitting / Lazy Import / Dynamic Route

> Mục tiêu: Giảm **JS initial load** bằng **code splitting**: `React.lazy`, dynamic `import()`, router-based chunking, và **prefetch/preload** chiến lược.

---

## 1) `React.lazy` + `Suspense`
```tsx
const SettingsPage = React.lazy(() => import("./pages/SettingsPage"));
function App(){
  return (
    <Suspense fallback={<Spinner/>}>
      <SettingsPage/>
    </Suspense>
  );
}
```

- Mỗi `lazy` tạo **chunk** riêng do bundler xử lý (Vite/Rollup/Webpack).

---

## 2) Dynamic import có đặt tên chunk
```ts
// webpackChunkName (Webpack) hoặc query plugin
const AdminPanel = React.lazy(() => import(/* webpackChunkName:"admin" */ "./AdminPanel"));
```

---

## 3) Route-level splitting
- Router (React Router/Next.js) tự động **chunk theo route**.  
- Đo **coverage**: có tải code route **không dùng** không?

---

## 4) Prefetch vs Preload
- **preload**: tải ngay với ưu tiên cao (cho critical).  
- **prefetch**: tải rảnh rỗi cho trang sắp vào.  
- Phối hợp với **hover/touch**: prefetch khi user **có ý định** chuyển trang.

```tsx
<link rel="prefetch" href="/assets/chunk-admin.js" as="script" />
```

---

## 5) Split theo feature flag
- Chỉ tải tính năng khi bật flag; giao diện fallback nếu tắt.

---

## 6) Mini demo (UMD, khái niệm)
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
  const Heavy = React.lazy(()=> new Promise(r=> setTimeout(()=> r({ default: () => <div>Heavy Loaded</div> }), 800)));
  function App(){
    const [show, setShow] = React.useState(false);
    return <div>
      <button onClick={()=>setShow(true)}>Load heavy</button>
      <React.Suspense fallback={<div>Loading…</div>}>
        {show && <Heavy/>}
      </React.Suspense>
    </div>;
  }
  ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
</script>
</body>
</html>
```

---

## 7) Checklist
- [ ] Lazy routes/panels nặng.  
- [ ] Prefetch theo **ý định** (hover/viewport).  
- [ ] Đo **bundle size** & **coverage**.  
- [ ] Fallback UX hợp lý khi load.

---

## 8) Bài tập
1. Lazy‑load trang cài đặt và prefetch khi người dùng hover menu.  
2. Đặt tên chunk cho module admin & đo size trước/sau.
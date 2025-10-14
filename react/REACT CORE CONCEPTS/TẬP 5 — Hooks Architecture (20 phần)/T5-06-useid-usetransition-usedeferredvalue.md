# T5-06 — useId, useTransition, useDeferredValue

> Mục tiêu: Làm chủ 3 hook quan trọng:
> - **`useId`**: tạo **id ổn định** giữa server/client.
> - **`useTransition`**: đánh dấu cập nhật **không gấp** để giữ UI mượt.
> - **`useDeferredValue`**: trì hoãn giá trị tốn kém để **tránh lag** khi nhập liệu.

---

## 1) `useId` — id ổn định (SSR/CSR)
```jsx
function Field() {
  const id = React.useId();
  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />
    </div>
  );
}
```
- Đảm bảo **không clash** id trong SSR + hydration.
- Không dùng cho key list (key dựa trên dữ liệu).

---

## 2) `useTransition` — cập nhật không gấp
```jsx
const [isPending, startTransition] = React.useTransition();

function onInput(next) {
  // cập nhật nặng: lọc list, tính toán, route transition...
  startTransition(() => {
    setQuery(next); // cập nhật đánh dấu "không gấp"
  });
}
```
- Trong khi **pending**, React giữ **UI tương tác** (input không lag) và có thể hiển thị **fallback** nhẹ.
- Dùng cho **chuyển trang**, **lọc nặng**, **tìm kiếm**.

---

## 3) `useDeferredValue` — hoãn giá trị tốn kém
```jsx
const deferredQuery = React.useDeferredValue(query);
const results = React.useMemo(() => heavySearch(list, deferredQuery), [list, deferredQuery]);
```
- `query` cập nhật mỗi phím, nhưng `deferredQuery` **trễ** → giảm re-render tính toán nặng.
- Hữu ích khi chỉ 1 phần UI cần giá trị trễ.

---

## 4) So sánh nhanh
- `startTransition` → dùng khi **đặt state** nặng (control chủ động).  
- `useDeferredValue` → dùng khi **đọc state** nặng (trì hoãn thụ động).

---

## 5) UI Patterns
- Hiển thị **spinner mảnh** khi `isPending`.  
- Kết hợp với **Suspense** cho fetch chuyển trang.  
- Đặt **rào**: không nên defer dữ liệu ảnh hưởng **tính đúng** (ví dụ: form validation sync).

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
    function heavy(list, q){ const t = q.toLowerCase(); return list.filter(x=>x.toLowerCase().includes(t)); }
    function App(){
      const [q, setQ] = React.useState("");
      const [isPending, startTransition] = React.useTransition();
      const deferred = React.useDeferredValue(q);
      const list = React.useMemo(()=>Array.from({length:5000}, (_,i)=>"Item "+i), []);
      const results = React.useMemo(()=>heavy(list, deferred), [list, deferred]);
      function onChange(e){
        const next = e.target.value;
        startTransition(()=> setQ(next));
      }
      return (
        <div>
          <input value={q} onChange={onChange} placeholder="Type to search 5k items"/>
          {isPending && <span> Loading…</span>}
          <div>Found: {results.length}</div>
        </div>
      );
    }
    ReactDOM.createRoot(document.getElementById("app")).render(<App/>);
  </script>
</body>
</html>
```

---

## 7) Checklist
- [ ] Dùng `useId` cho cặp `label`/`input` (SSR an toàn).
- [ ] Dùng `startTransition` cho cập nhật **nặng nhưng không gấp**.
- [ ] Dùng `useDeferredValue` cho phần UI đọc giá trị **tốn kém**.
- [ ] Hiển thị chỉ báo `isPending` hợp lý; tránh defer dữ liệu cần tính đúng tức thì.

---

## 8) Bài tập
1. Thêm `useId` vào form có nhiều field và SSR.
2. Tối ưu màn hình tìm kiếm 10k item bằng `useDeferredValue`.
3. Với điều hướng trang, bọc setState trong `startTransition` và đo UX.
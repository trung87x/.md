# T6-02 — Suspense for Data Fetching

> Mục tiêu: Dùng **Suspense** để phối hợp **loading states** khi fetch dữ liệu, kết hợp **`startTransition`** và **`use` API (React 19)** hoặc **resource wrapper** (React 18).

---

## 1) Suspense cơ bản
- `Suspense` **treo** cây con cho tới khi **tài nguyên** sẵn sàng, hiển thị `fallback` tạm.
```jsx
<Suspense fallback={<Spinner/>}>
  <UserPanel userId={id} />
</Suspense>
```

---

## 2) Cách cung cấp dữ liệu
### React 19 (`use`)
```jsx
function UserPanel({ userId }) {
  const data = use(fetchUser(userId)); // "use" một promise
  return <div>{data.name}</div>;
}
```

### React 18 (resource wrapper)
```jsx
const resource = createUserResource(id); // { read(): data | throws promise }
function UserPanel(){ const data = resource.read(); return <div>{data.name}</div>; }
```

---

## 3) Transition + Suspense
- Khi điều hướng hoặc đổi filter, bọc setState trong `startTransition` để **giữ UI phản hồi** trong khi panel con suspense.

```jsx
startTransition(() => setUserId(nextId));
```

---

## 4) Error boundary kết hợp
- Khi Promise **reject**, **Error Boundary** sẽ bắt và hiển thị fallback lỗi.  
- Tách `Suspense`/`ErrorBoundary` ở **độ hạt** phù hợp (per‑panel).

---

## 5) Streaming & SSR
- SSR có thể **stream HTML** theo từng phần khi dữ liệu sẵn sàng.  
- `Suspense` cải thiện **TTFB vs. interactivity** nếu kết hợp hợp lý.

---

## 6) Checklist
- [ ] Đặt `Suspense` gần nơi cần chờ nhất.  
- [ ] Kết hợp `startTransition` khi thay đổi nguồn dữ liệu.  
- [ ] Có **ErrorBoundary** cạnh `Suspense`.  
- [ ] Với React 18, dùng resource wrapper; React 19 cân nhắc `use()`.

---

## 7) Bài tập
1. Tạo `ProfilePage` dùng `Suspense` + `ErrorBoundary`.  
2. So sánh UX khi có/không có `startTransition` lúc đổi `userId`.
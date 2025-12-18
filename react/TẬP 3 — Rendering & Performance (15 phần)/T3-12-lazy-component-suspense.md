# T3-12 — Lazy Component & Suspense (Code Splitting)

> Mục tiêu: Dùng **`React.lazy`** + **`<Suspense>`** để **tách bundle** theo nhu cầu, hiển thị **fallback** trong lúc tải, và tổ chức preload/hậu cần lỗi đúng cách.

---

## 1) Tại sao Lazy?
- Giảm **bundle ban đầu** → trang mở nhanh hơn.
- Chỉ tải component **khi cần** (route/page/module hiếm dùng).

---

## 2) API nhanh
```jsx
const Settings = React.lazy(() => import("./Settings"));

function App() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Settings />
    </React.Suspense>
  );
}
```
- `React.lazy` nhận **hàm dynamic import** trả về module có `default` là component.
- `<Suspense fallback={...}>` hiển thị **UI dự phòng** trong lúc bundle đang tải.

---

## 3) Kết hợp với router
Ví dụ (React Router):
```jsx
const UserPage = React.lazy(() => import("./pages/UserPage"));
<Route
  path="/users/:id"
  element={
    <Suspense fallback={<PageSkeleton />}>
      <UserPage />
    </Suspense>
  }
/>
```

---

## 4) Preload để giảm trễ cảm nhận
- Preload ngay trước khi người dùng có thể cần component (hover, viewport gần tới).
```jsx
// Trong module lazy
export const preload = () => import("./Settings");

// Nơi khác
onMouseEnter={() => Settings.preload?.()}
```
> Một số lib (vd. `@loadable/component`) hỗ trợ preload built-in.

---

## 5) Xử lý lỗi tải
- Nếu dynamic import lỗi (mạng, 404), hãy dùng **Error Boundary** bao quanh để hiển thị fallback lỗi.
```jsx
<Suspense fallback={<Spinner />}>
  <ErrorBoundary fallback={<ErrorView />}>
    <Settings />
  </ErrorBoundary>
</Suspense>
```

---

## 6) SSR & hydratation
- Với SSR, cần cơ chế **manifest** để biết trước bundle nào cần tải. Sử dụng framework như **Next.js**, **Remix** hoặc lib như **@loadable/component**.
- Tránh lazy những phần **rất nhỏ** → tốn overhead request.

---

## 7) Mini demo (UMD ý tưởng)
Trong môi trường UMD demo, không có bundler/dynamic import chuẩn. Có thể mô phỏng:
```jsx
const LazyHello = React.lazy(() =>
  new Promise((res) => setTimeout(() => res({ default: () => <div>Hello (lazy)</div> }), 800))
);

function App() {
  return (
    <React.Suspense fallback={<div>Loading…</div>}>
      <LazyHello />
    </React.Suspense>
  );
}
```
> Demo trên mô phỏng thời gian tải bằng `setTimeout`.

---

## 8) Best practices
- Tách theo **đường biên**: route, tab, dialog, editor nặng.
- Gộp các import **luôn đi cùng** để tránh “kéo rời rạc” nhiều mảnh nhỏ.
- Dùng **fallback có skeleton** để tránh nhảy layout.
- Preload khi có tín hiệu ý định (hover, near viewport).

---

## 9) Checklist
- [ ] Dùng `React.lazy(() => import(...))` và bọc bằng `<Suspense>`.
- [ ] Có Error Boundary cho đường lỗi tải.
- [ ] Preload component nặng nếu có thể đoán nhu cầu.
- [ ] Tách theo route/tab/dialog; tránh chia vụn quá mức.
- [ ] Kiểm thử SSR nếu dự án có render server.

---

## 10) Bài tập
1. Lazy route `ReportsPage` với `<Suspense>` và `PageSkeleton`.
2. Thêm `preload()` và gọi khi người dùng hover menu “Reports”.
3. Thử mô phỏng lỗi import và hiển thị fallback từ Error Boundary.
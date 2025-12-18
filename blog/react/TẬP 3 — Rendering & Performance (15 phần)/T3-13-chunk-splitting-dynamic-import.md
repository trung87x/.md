# T3-13 — Chunk Splitting & Dynamic Import

> Mục tiêu: Tách bundle thành **nhiều chunk** tải theo nhu cầu bằng **dynamic import**, đặt tên chunk, preload/prefetch đúng, và tránh bẫy thường gặp.

---

## 1) Khái niệm nhanh
- **Chunk splitting**: tách mã nguồn thành nhiều file JS nhỏ (chunks) thay vì 1 bundle lớn.
- **Dynamic import** (`import()`): tải module **lúc cần** (on demand).
- Kết hợp với **`React.lazy` + `<Suspense>`** để lazy-load component UI (xem T3-12).

---

## 2) Dynamic import cơ bản
```ts
// Import động một util nặng ngay khi người dùng cần
async function handle() {
  const { heavyCompute } = await import("./heavy-util");
  const result = heavyCompute(data);
  console.log(result);
}
```
- Ưu tiên tách những phần **hiếm dùng**: báo cáo, trang cài đặt, trình soạn thảo nặng…

---

## 3) Đặt tên chunk (webpack, Vite)
```ts
// webpack magic comment
const Settings = React.lazy(() => import(/* webpackChunkName: "settings" */ "./Settings"));

// Vite (rollup) dùng /* @vite-ignore */ để bỏ phân giải, còn đặt tên chunk dựa vào đường dẫn/file.
```
> Tên chunk dễ debug hơn trong Network tab. Với Vite/Rollup, đặt tên thông qua cấu hình `build.rollupOptions.output.manualChunks`.

---

## 4) Preload vs Prefetch
- **Preload**: tải **ưu tiên cao**, cho tài nguyên **sắp dùng ngay**.
- **Prefetch**: tải **ưu tiên thấp**, cho tài nguyên **có thể** dùng sau.
```html
<link rel="preload" href="/assets/settings.js" as="script" />
<link rel="prefetch" href="/assets/reports.js" />
```
- Với router/framework (Next/Remix/React Router), dùng **API preload** tích hợp thay vì tự chèn link thủ công khi có thể.

---

## 5) Code splitting theo route/tab/dialog
- Ranh giới tách phổ biến: **route**, **tab ít mở**, **dialog to/nặng**, **biểu đồ**.
- Gom những module **luôn đi cùng** để tránh “chia vụn” thành quá nhiều request nhỏ.

---

## 6) Bẫy & khuyến nghị
- Tách quá tay → **nhiều request nhỏ**, overhead lớn.
- Lazy phần **cực nhỏ** → không đáng, tăng độ trễ.
- Quên Error Boundary khi lazy → người dùng gặp trắng trang nếu import lỗi.
- Quên **chunk cache busting** (file có hash) → người dùng tải nhầm bản cũ.

---

## 7) Mini demo (ý tưởng)
Trong UMD không có bundler thực, có thể mô phỏng download bằng setTimeout:
```jsx
const LazyTools = React.lazy(() => new Promise(res => {
  setTimeout(() => res({ default: () => <div>Tools loaded</div> }), 600);
}));
function App() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <button onClick={() => setOpen(true)}>Open tools</button>
      {open && <LazyTools />}
    </React.Suspense>
  );
}
```
---

## 8) Checklist
- [ ] Xác định biên tách: route/tab/dialog/báo cáo.
- [ ] Dùng dynamic import (`import()`) + `React.lazy` + `<Suspense>`.
- [ ] Có Error Boundary cho đường lỗi.
- [ ] Cân nhắc **preload/prefetch** khi dự đoán nhu cầu.
- [ ] Không chia vụn quá mức; giữ các module “đi cùng” trong 1 chunk.
- [ ] Bật hashing cho cache busting.

---

## 9) Bài tập
1. Tách màn **Reports** thành chunk riêng; preload khi hover menu.
2. Đo TTFB/JS-load trước & sau splitting bằng Lighthouse.
3. Thử gom các biểu đồ thường mở chung thành **1 chunk** và đo request count.
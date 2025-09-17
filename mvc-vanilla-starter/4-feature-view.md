# Feature 4 · View Lifecycle – `init`/`dispose`, cleanup context

> **Mục tiêu trọng tâm:** quản lý vòng đời view, đảm bảo resource (event listener, timer, fetch) được khởi tạo và dọn dẹp đúng thời điểm.

## 1. Mục tiêu & Phạm vi
- Chuẩn hóa interface view module: export `init(ctx)` và `dispose()` tùy chọn.
- Cho phép view đăng ký cleanup qua `ctx.onCleanup(callback)`.
- Áp dụng cho `Users` view, `UserDetail` view và widget con.
- Không xử lý state management phức tạp (Redux, v.v.).

## 2. Thành phần chính
| Thành phần | Vai trò | Điểm nổi bật |
| --- | --- | --- |
| `system.js` | Điều phối render, truyền context | Reset cleanup trước khi mount view mới. |
| View module (`*.js`) | Định nghĩa `init`, `dispose` | Có thể trả handler để update DOM. |
| View template (`*.html`) | HTML raw load qua `import.meta.glob` | Inject vào DOM root.

## 3. Yêu cầu chức năng
- **FR-1:** `system.render(result)` phải gọi `dispose` của view hiện tại trước khi mount view mới.
- **FR-2:** Cung cấp `ctx.onCleanup(fn)` để view đăng ký dọn dẹp (event listener, interval, abort controller).
- **FR-3:** Cho phép view trả về API tùy chọn (ví dụ `update(model)`) để system có thể gọi khi controller rerender cùng view.
- **FR-4:** Bảo toàn scroll & focus mặc định, trừ khi view override.

## 4. Thiết kế giải pháp
### 4.1 Context truyền vào view
```js
const ctx = {
  appEl,
  params,
  query,
  model,
  navigate,
  onCleanup(fn) {
    cleanupStack.push(fn);
  }
};
```

### 4.2 Chu trình render
1. Khi controller trả `{ view, model }`, `system.js` load `view.html` và inject vào root.
2. Gọi `viewModule.init(ctx)` nếu tồn tại, lưu kết quả làm `currentViewInstance`.
3. Nếu view cũ tồn tại `dispose`, gọi tất cả cleanup callback + `dispose()` trước khi mount mới.
4. Khi cùng view được render lại, nếu instance có `update(model, ctx)`, gọi thay vì re-init.

### 4.3 Ví dụ: `Users` view
```js
export function init(ctx) {
  const searchForm = ctx.appEl.querySelector("form[data-role='search']");
  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(searchForm);
    ctx.navigate("users", {}, { q: formData.get("q") });
  }
  searchForm.addEventListener("submit", onSubmit);
  ctx.onCleanup(() => searchForm.removeEventListener("submit", onSubmit));
}
```

### 4.4 Ví dụ: Widget con với cleanup
```js
export function init(ctx) {
  const timerId = setInterval(() => {
    // update UI
  }, 1000);
  ctx.onCleanup(() => clearInterval(timerId));
}
```

## 5. Use Case chính
- **UC-1:** Người dùng điều hướng từ Users sang UserDetail → cleanup form listener.
- **UC-2:** View thiết lập interval → khi rời trang, interval được clear.
- **UC-3:** Controller rerender cùng view (ví dụ cập nhật filter) → gọi `update` thay vì re-init toàn bộ DOM.

## 6. Kế hoạch kiểm thử
| ID | Mục tiêu | Cách kiểm | Kết quả |
| --- | --- | --- | --- |
| TC-1 | Cleanup listener | Điều hướng Users ↔ Home nhiều lần | Không xuất hiện listener trùng lặp (quan sát console). |
| TC-2 | Cleanup timer | Gắn interval trong view, điều hướng đi | `clearInterval` được gọi (dùng spy). |
| TC-3 | Update hook | Gọi rerender cùng view | Hàm `update` chạy, DOM cập nhật mà không re-init. |
| TC-4 | Dispose manual | View cung cấp `dispose` | Hàm được gọi trước khi mount view mới. |

## 7. Ghi chú triển khai
- Tạo helper `createCleanup()` trong `system.js` để gom các callback.
- Luôn reset `cleanupStack` khi render view mới để tránh memory leak.
- Khi view fetch dữ liệu, nên sử dụng `AbortController` và đăng ký abort trong cleanup.
- Đảm bảo template HTML không chứa script inline để tránh lỗi CSP.


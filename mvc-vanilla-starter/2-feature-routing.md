# Feature 2 · Routing – Hash router với tham số `:id`

> **Mục tiêu trọng tâm:** xây dựng hash router hỗ trợ tham số động, fallback 404, điều hướng chương trình và đồng bộ query string.

## 1. Mục tiêu & Phạm vi
- Điều hướng client-side dựa trên hash (`#/path`).
- Hỗ trợ tham số động dạng `:id` và wildcard `*`.
- Quản lý bảng route tách riêng (`route-table.js`) dễ bảo trì.
- Phạm vi không bao gồm guard/auth (được xử lý ở Feature 8).

## 2. Thành phần chính
| Module | Vai trò | Ghi chú |
| --- | --- | --- |
| `router.js` | Lắng nghe thay đổi hash, match route, gọi controller | Cung cấp API `navigate(path, query)` để điều hướng.
| `route-table.js` | Khai báo danh sách route | Cho phép import động để mở rộng.
| `system.js` | Hỗ trợ chạy action & render view | Tái sử dụng từ Feature 1.

## 3. Yêu cầu chức năng
- **FR-1: Parse hash** – bóc tách `path` và `query` từ `location.hash`.
- **FR-2: Match route động** – compile pattern chứa `:param`, trả `params` decode.
- **FR-3: Fallback** – nếu không khớp, route tới NotFound.
- **FR-4: Điều hướng chương trình** – expose `navigate({ name, params, query })`.
- **FR-5: Đồng bộ lịch sử** – dùng `location.hash = ...` để push state, không reload trang.
- **FR-6: Khởi động lại khi reload** – router đọc hash hiện tại khi load trang.

## 4. Thiết kế giải pháp
### 4.1 Cấu trúc route-table
```js
// route-table.js
export const routes = [
  { name: "home", pattern: "", controller: HomeController, action: "index" },
  { name: "users", pattern: "users", controller: UsersController, action: "index" },
  { name: "user-detail", pattern: "users/:id", controller: UserDetailController, action: "show" },
  { name: "not-found", pattern: "*", controller: NotFoundController, action: "index" }
];
```

### 4.2 Thuật toán match
1. Chuẩn hóa pattern (bỏ `/` đầu/cuối).
2. Thay `:param` bằng regex `([^/]+)` và lưu danh sách key.
3. So khớp với path, nếu match xây dựng `params` qua `decodeURIComponent`.
4. Nếu pattern là `*`, match mọi path và bỏ qua params.

### 4.3 Điều hướng chương trình
```js
export function navigate(name, params = {}, query = {}) {
  const route = routes.find((r) => r.name === name);
  if (!route) throw new Error(`Unknown route ${name}`);
  const path = buildPath(route.pattern, params);
  const hash = buildHash(path, query);
  if (location.hash === hash) {
    // hashchange không bắn nếu giống nhau ⇒ manually trigger
    handleHashChange();
  } else {
    location.hash = hash;
  }
}
```

## 5. Use Case chính
- **UC-1: Người dùng click menu** – router cập nhật hash, render view tương ứng.
- **UC-2: Copy đường dẫn** – dán lại URL có hash, trang phải render đúng.
- **UC-3: Điều hướng từ code** – Controller gọi `navigate("user-detail", { id })` và giữ nguyên query.

## 6. Kế hoạch kiểm thử
| ID | Kịch bản | Các bước | Kết quả |
| --- | --- | --- | --- |
| TC-1 | Điều hướng home | Hash `#/` | Home render. |
| TC-2 | Điều hướng users | Hash `#/users` | Users render. |
| TC-3 | Dynamic params | Hash `#/users/42` | Controller nhận `params.id === "42"`. |
| TC-4 | Query string | Hash `#/users?q=foo&page=2` | Controller nhận `query` tương ứng. |
| TC-5 | Fallback | Hash `#/unknown` | NotFound render. |
| TC-6 | Điều hướng chương trình | Gọi `navigate("users", {}, { page: 3 })` | Hash cập nhật và view render lại. |

## 7. Ghi chú triển khai
- Dùng `window.addEventListener("hashchange", handler)` và `load` để xử lý reload.
- Giữ router thuần, không gắn trực tiếp DOM; controller chịu trách nhiệm binding view.
- Cân nhắc debounce hashchange nếu view nặng.
- Cho phép mở rộng route-table bằng cách merge dynamic modules khi build.


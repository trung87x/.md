# 📙 Tổng quan MVC Vanilla Starter

Tài liệu này cung cấp cái nhìn súc tích nhưng đầy đủ về tám đặc tả trong thư mục `mvc-vanilla-starter`. Mỗi mục tóm tắt mục tiêu, phạm vi, yêu cầu chính và kiểm thử bắt buộc, đồng thời chỉ rõ nơi tìm chi tiết triển khai.

## Mục lục nhanh

1. [Bản đồ tính năng](#bản-đồ-tính-năng)
2. [Feature 1 – Setup Vanilla Starter](#feature-1--setup-vanilla-starter)
3. [Feature 2 – Routing với tham số](#feature-2--routing-với-tham-số)
4. [Feature 3 – Chuẩn hóa Controller](#feature-3--chuẩn-hóa-controller)
5. [Feature 4 – Lifecycle View](#feature-4--lifecycle-view)
6. [Feature 5 – Search Users](#feature-5--search-users)
7. [Feature 6 – Detail Users](#feature-6--detail-users)
8. [Feature 7 – Billing PRO giả lập](#feature-7--billing-pro-giả-lập)
9. [Feature 8 – Auth + Guard](#feature-8--auth--guard)

---

## Bản đồ tính năng

| #   | Feature        | Đích đến                               | Modules then chốt                              | Tài liệu gốc                 |
| --- | -------------- | -------------------------------------- | ---------------------------------------------- | ---------------------------- |
| 1   | Setup          | Khởi tạo khung Vite + MVC              | `system.js`, `router.js`, `base-controller.js` | `1-feature-setup-starter.md` |
| 2   | Routing        | Hash router với tham số `:id`          | `router.js`, `route-table.js`                  | `2-feature-routing.md`       |
| 3   | Controller     | Hợp đồng `{ view, model }`, xử lý lỗi  | `BaseController`, `UsersController`            | `3-feature-controller.md`    |
| 4   | View lifecycle | `init`/`dispose`, cleanup context      | Views Users & UserDetail                       | `4-feature-view.md`          |
| 5   | Search         | Bộ lọc người dùng và phân trang client | `UsersService`, `UsersController#index`        | `5-feature-search-users.md`  |
| 6   | Detail         | Trang `#/users/:id` với fallback       | `UsersService.getById`, `UserDetailController` | `6-feature-detail-users.md`  |
| 7   | Billing        | Flow mua PRO mock                      | `BillingService`, `EntitlementService`         | `7-feature-billing.md`       |
| 8   | Auth           | Đăng nhập/guard route account          | `AuthService`, `requireAuth`                   | `8-feature-auth.md`          |

> 💡 Ghi chú: Các file đặc tả 1→8 giữ nguyên chi tiết SRS/SDD, sơ đồ luồng và snippets. Tài liệu tổng quan chỉ liệt kê nội dung cốt lõi giúp định hướng nhanh.

---

## Feature 1 – Setup Vanilla Starter

- **Mục tiêu**: Dựng project Vite template `vanilla`, tổ chức thư mục MVC chuẩn và render được Home/NotFound.
- **Phạm vi**: `index.html`, `/src/app` (system, router, base controller), `/src/controllers`, `/src/views`.
- **Yêu cầu chính**:
  - Khởi tạo project, cài dependency và khởi chạy dev server ≤ 5 phút.
  - `system.js` quản lý mount view và cleanup, `router.js` định nghĩa route mặc định.
  - Home controller trả `{ view, model }` theo hợp đồng chung.
- **Kiểm thử bắt buộc**:
  - `npm run dev` hiển thị Home tại `#/`.
  - Route không tồn tại hiển thị NotFound.
  - Đổi route liên tục không phát sinh lỗi console.
- **Tham khảo chi tiết**: `mvc-vanilla-starter/1-feature-setup-starter.md`.

## Feature 2 – Routing với tham số

- **Mục tiêu**: Bổ sung bảng route hash `#/path`, hỗ trợ tham số động `:id`, fallback 404.
- **Phạm vi**: Router core, parse hash, load controller/action tương ứng.
- **Yêu cầu chính**:
  - Chuẩn hoá cấu trúc route `{ pattern, controller, action, guard? }`.
  - Hỗ trợ querystring, giữ nguyên khi chuyển route.
  - Kịch bản chuyển trang: Home → Users → User Detail → NotFound.
- **Kiểm thử bắt buộc**:
  - Hash `#/users` render danh sách người dùng.
  - `#/users/123?q=abc` parse `id=123`, query `q=abc`.
  - Route không match trả controller NotFound.
- **Tham khảo chi tiết**: `mvc-vanilla-starter/2-feature-routing.md`.

## Feature 3 – Chuẩn hóa Controller

- **Mục tiêu**: Bắt buộc controller trả `{ view, model }`, gom helper chung vào `BaseController`, xử lý lỗi tập trung.
- **Phạm vi**: `BaseController`, controller người dùng, cơ chế `runAction`.
- **Yêu cầu chính**:
  - `BaseController.view(name, model)` trả object chuẩn.
  - `runAction` bắt lỗi async, render `error` view khi cần.
  - Controller có thể truy cập `ctx` (params, query, services).
- **Kiểm thử bắt buộc**:
  - Action hợp lệ trả đúng view/model.
  - Throw error → log + view lỗi chung.
  - Guard đảm bảo action không trả undefined.
- **Tham khảo chi tiết**: `mvc-vanilla-starter/3-feature-controller.md`.

## Feature 4 – Lifecycle View

- **Mục tiêu**: Chuẩn hóa vòng đời view với `init(ctx)` và `dispose()`, đảm bảo cleanup listener/timer/fetch.
- **Phạm vi**: `system.js` (mount/unmount), `ctx.onCleanup`, views Users/UserDetail.
- **Yêu cầu chính**:
  - Mỗi view export `init(ctx)` trả fragment & optional teardown.
  - `ctx.onCleanup(fn)` thu gom việc cần hủy khi dispose.
  - Hỗ trợ view con (widget) và nhiều listener.
- **Kiểm thử bắt buộc**:
  - Điều hướng liên tục không để lại listener thừa (`console.count` kiểm soát).
  - Fetch bị hủy khi rời view.
  - View con được dispose theo parent.
- **Tham khảo chi tiết**: `mvc-vanilla-starter/4-feature-view.md`.

## Feature 5 – Search Users

- **Mục tiêu**: Cho phép tìm kiếm và phân trang danh sách người dùng qua query `q` & `page`.
- **Phạm vi**: `UsersService` mock, controller `index`, view danh sách.
- **Yêu cầu chính**:
  - Form search đọc/ghi query hash, debounce submit.
  - Phân trang client dựa trên `limit`, hiển thị thông báo khi rỗng.
  - Giữ lại trạng thái filter khi reload hoặc back/forward.
- **Kiểm thử bắt buộc**:
  - Nhập `q=Leanne` trả đúng kết quả.
  - Chuyển trang `page=2` hiển thị tập dữ liệu tiếp theo.
  - Xóa query hiển thị toàn bộ danh sách.
- **Tham khảo chi tiết**: `mvc-vanilla-starter/5-feature-search-users.md`.

## Feature 6 – Detail Users

- **Mục tiêu**: Xem chi tiết người dùng qua route `#/users/:id`, xử lý NotFound và bảo toàn query khi quay lại.
- **Phạm vi**: Service lấy user theo ID, controller detail, view hiển thị thông tin.
- **Yêu cầu chính**:
  - Nếu không tìm thấy ID → điều hướng NotFound.
  - Nút "Quay lại" trả về danh sách kèm query cũ.
  - View hiển thị thông tin cơ bản (avatar, name, email, company ...).
- **Kiểm thử bắt buộc**:
  - ID hợp lệ render đúng dữ liệu.
  - ID không tồn tại hiển thị NotFound.
  - Quay lại danh sách giữ nguyên bộ lọc.
- **Tham khảo chi tiết**: `mvc-vanilla-starter/6-feature-detail-users.md`.

## Feature 7 – Billing PRO giả lập

- **Mục tiêu**: Mô phỏng luồng nâng cấp tài khoản PRO, quản lý entitlement và kết quả giao dịch.
- **Phạm vi**: Services billing/entitlement, controller pricing/return, views thanh toán & trạng thái.
- **Yêu cầu chính**:
  - Pricing page hiển thị gói, gọi BillingService tạo transaction mock.
  - Return page đọc trạng thái (`success|cancel|error`), cập nhật entitlement.
  - Đồng bộ trạng thái PRO trong toàn app (UI phản ánh entitlement).
- **Kiểm thử bắt buộc**:
  - Flow thành công cập nhật `isPro=true`.
  - Flow hủy giữ nguyên entitlement.
  - Lỗi giao dịch hiển thị thông báo và cho retry.
- **Tham khảo chi tiết**: `mvc-vanilla-starter/7-feature-billing.md`.

## Feature 8 – Auth + Guard

- **Mục tiêu**: Thêm AuthService mock, hỗ trợ đăng nhập/đăng xuất và guard route cần đăng nhập.
- **Phạm vi**: Auth service, controllers login/account, guard `requireAuth`, view Login/Account.
- **Yêu cầu chính**:
  - `AuthService` lưu trạng thái user, phát sự kiện cho UI.
  - Form login hỗ trợ `next` query để redirect sau khi auth.
  - Route `#/account` sử dụng guard, redirect về login khi chưa auth.
- **Kiểm thử bắt buộc**:
  - Đăng nhập với credential hợp lệ → chuyển tới `next` hoặc `/account`.
  - Đăng xuất → trả về Home và xóa session.
  - Truy cập `#/account` khi chưa đăng nhập → chuyển tới `/login?next=...`.
- **Tham khảo chi tiết**: `mvc-vanilla-starter/8-feature-auth.md`.

---

### Cách sử dụng tài liệu

1. Đọc bảng `Bản đồ tính năng` để xác định nhanh module cần quan tâm.
2. Tìm phần feature tương ứng để nắm yêu cầu cốt lõi & checklist test.
3. Mở file chi tiết (1→8) để xem SRS/SDD, use case, wireframe và snippet triển khai.
4. Khi cập nhật code, đảm bảo mỗi thay đổi vẫn thỏa checklist test liên quan.

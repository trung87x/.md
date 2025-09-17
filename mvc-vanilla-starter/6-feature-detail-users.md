# Feature 6 · Detail – Trang `#/users/:id` với fallback

> **Mục tiêu trọng tâm:** hiển thị trang chi tiết người dùng dựa trên ID động, xử lý trường hợp không tồn tại và bảo toàn query khi quay lại.

## 1. Mục tiêu & Phạm vi
- Tạo route `#/users/:id` sử dụng hash router có tham số.
- Dùng `UsersService.getById` để lấy dữ liệu chi tiết (mock).
- Controller xử lý khi user không tồn tại (404-friendly) và lưu query để quay lại danh sách đúng trạng thái.
- View hiển thị thông tin cá nhân, nút "Quay lại" và các meta (email, role, plan).

## 2. Thành phần chính
| Thành phần | Vai trò | Ghi chú |
| --- | --- | --- |
| `UsersService.getById` | Lấy dữ liệu user theo ID | Trả `null` nếu không có, thời gian phản hồi mock 100–200ms (nếu cần). |
| `UserDetailController` | Controller chính cho route detail | Phân nhánh NotFound khi không tìm thấy user. |
| `UserDetail` view | Render chi tiết user | Nút quay lại gọi `ctx.navigate("users", {}, previousQuery)`.

## 3. Yêu cầu chức năng
- **FR-1:** Parse `params.id` từ router và validate (chấp nhận chuỗi, không rỗng).
- **FR-2:** Gọi service lấy dữ liệu, hỗ trợ async/Promise.
- **FR-3:** Nếu không có user → trả view `UserNotFound` với thông tin hữu ích.
- **FR-4:** Khi có user → trả view `UserDetail` với model gồm `user`, `breadcrumbs`, `previousQuery`.
- **FR-5:** Nút "Quay lại" phải điều hướng về danh sách kèm query ban đầu (`ctx.query`).
- **FR-6:** Xử lý loading state (tùy chọn) nếu service async.

## 4. Thiết kế giải pháp
### 4.1 `UsersService.getById`
```js
getById(id) {
  return this.data.find((user) => String(user.id) === String(id)) ?? null;
}
```

### 4.2 `UserDetailController`
```js
import { BaseController } from "../app/base-controller.js";
import { UsersService } from "../services/users-service.js";

export default class UserDetailController extends BaseController {
  constructor() {
    super();
    this.usersService = new UsersService();
  }

  async show(params, query, ctx) {
    const user = await this.usersService.getById(params.id);
    if (!user) {
      return this.view("UserNotFound", { id: params.id, backQuery: query });
    }
    return this.view("UserDetail", {
      user,
      breadcrumbs: [
        { label: "Users", route: { name: "users", params: {}, query } },
        { label: user.name }
      ],
      backQuery: query
    });
  }
}
```

### 4.3 View `UserDetail`
- Hiển thị tên, email, avatar (nếu có), role, subscription status.
- Nút "Quay lại" gọi `ctx.navigate("users", {}, backQuery)`.
- Nếu `user.entitlement === "pro"`, hiển thị badge PRO.

### 4.4 View `UserNotFound`
- Nội dung: `User #${id} không tồn tại.`
- Gợi ý quay lại danh sách.
- Có thể log analytics để theo dõi ID lỗi.

## 5. Use Case chính
- **UC-1:** Người dùng click vào user trong danh sách → chuyển tới chi tiết tương ứng.
- **UC-2:** ID không hợp lệ → hiển thị NotFound + link quay lại.
- **UC-3:** Quay lại danh sách → trạng thái filter/pagination được bảo toàn.

## 6. Kế hoạch kiểm thử
| ID | Kịch bản | Bước | Kết quả |
| --- | --- | --- | --- |
| TC-1 | Hiển thị chi tiết hợp lệ | Điều hướng `#/users/1` | Thông tin user #1 hiển thị đầy đủ. |
| TC-2 | ID không tồn tại | Điều hướng `#/users/999` | View UserNotFound render. |
| TC-3 | Quay lại | Từ detail click "Quay lại" | Router trở về `#/users` với query cũ. |
| TC-4 | Bookmark | Refresh tại `#/users/2` | Trang detail render đúng dữ liệu. |

## 7. Ghi chú triển khai
- Nếu `UsersService` giả lập async, dùng `await` để dễ chuyển sang API thật.
- Tránh fetch lại danh sách đầy đủ khi quay lại; rely on search feature.
- Có thể preload detail data trong router khi match (future improvement).
- Xem xét hiển thị skeleton khi chờ dữ liệu để UX tốt hơn.


# Feature 5 · Search – Bộ lọc người dùng và phân trang client

> **Mục tiêu trọng tâm:** cho phép người dùng tìm kiếm, lọc và phân trang danh sách users ngay trên client dựa trên query string.

## 1. Mục tiêu & Phạm vi
- Lọc danh sách người dùng theo từ khóa `q` và trang hiện tại `page`.
- Đồng bộ trạng thái tìm kiếm với URL (`#/users?q=...&page=...`).
- Cập nhật view Users theo kết quả tìm kiếm, hiển thị thông báo khi rỗng.
- Phân trang client-side (không call API thật), mock data từ `UsersService`.

## 2. Thành phần chính
| Module | Vai trò | Ghi chú |
| --- | --- | --- |
| `UsersService` | Cung cấp dữ liệu mock & filter | Hỗ trợ phương thức `list({ q, page, pageSize })` trả `{ items, total }`. |
| `UsersController#index` | Điều phối query, gọi service, trả view | Merge query default (`page=1`, `pageSize=10`). |
| `Users` view | Render form tìm kiếm, bảng kết quả, pager | Bắt submit để điều hướng bằng router, hiển thị trạng thái rỗng.

## 3. Yêu cầu chức năng
- **FR-1:** Đọc query `q`, `page`, `pageSize` từ router và validate (>=1).
- **FR-2:** Service filter theo `q` (case-insensitive) trên name/email.
- **FR-3:** Phân trang client – cắt mảng theo `(page-1)*pageSize`.
- **FR-4:** View hiển thị tổng số kết quả và pager (Prev/Next) vô hiệu hóa khi cần.
- **FR-5:** Từ form tìm kiếm, submit phải cập nhật hash thay vì reload.
- **FR-6:** Khi không có kết quả, hiển thị message và ẩn pager.

## 4. Thiết kế giải pháp
### 4.1 `UsersService`
```js
export class UsersService {
  constructor(data = defaultUsers) {
    this.data = data;
  }

  list({ q = "", page = 1, pageSize = 10 } = {}) {
    const normalized = q.trim().toLowerCase();
    const filtered = this.data.filter((user) =>
      [user.name, user.email].some((field) => field.toLowerCase().includes(normalized))
    );
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    return { items, total, page, pageSize, q };
  }
}
```

### 4.2 `UsersController#index`
```js
async index(params, query, ctx) {
  const page = Math.max(parseInt(query.page ?? "1", 10) || 1, 1);
  const pageSize = Math.max(parseInt(query.pageSize ?? "10", 10) || 10, 1);
  const q = (query.q ?? "").trim();
  const result = this.usersService.list({ q, page, pageSize });
  return this.view("Users", { ...result });
}
```

### 4.3 View Users
- Form chứa input `name="q"` và nút submit.
- Pager render nút Prev/Next, khi click gọi `ctx.navigate("users", {}, { q, page: page ± 1 })`.
- Khi `items.length === 0`, hiển thị `<p class="empty">Không tìm thấy người dùng.</p>`.

## 5. Use Case chính
- **UC-1:** Người dùng nhập `john` → danh sách lọc theo tên/email chứa `john`.
- **UC-2:** Click Next → trang tăng, URL cập nhật `page=2`.
- **UC-3:** Refresh trình duyệt → kết quả giữ nguyên vì query nằm trong hash.
- **UC-4:** Không có kết quả → hiển thị thông báo và pager disabled.

## 6. Kế hoạch kiểm thử
| ID | Mục tiêu | Bước | Kết quả |
| --- | --- | --- | --- |
| TC-1 | Filter | Nhập `a` → submit | Danh sách chỉ chứa user có `a` trong tên/email. |
| TC-2 | Pagination | Chuyển trang nhiều lần | Không out-of-range, Prev disabled khi `page=1`. |
| TC-3 | Query sync | Refresh trang sau khi lọc | Giữ trạng thái filter/pagination. |
| TC-4 | Empty state | Nhập từ khóa không khớp | Thông báo rỗng hiển thị. |
| TC-5 | PageSize | Điều chỉnh `pageSize` (nếu expose) | Kết quả đúng số item/trang. |

## 7. Ghi chú triển khai
- Lưu mock data trong file JSON hoặc JS để dễ import.
- Có thể mở rộng thành fetch API thật trong tương lai bằng cách thay `UsersService`.
- Debounce input nếu chuyển sang search realtime.
- Khi view update, tận dụng `ctx.onCleanup` để gỡ listener pager.


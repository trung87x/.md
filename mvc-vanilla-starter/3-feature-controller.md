# Feature 3 · Controller – Hợp đồng `{ view, model }`, xử lý lỗi

> **Mục tiêu trọng tâm:** chuẩn hóa action controller trả về `{ view, model }`, quản lý context dùng chung và xử lý lỗi tập trung.

## 1. Mục tiêu & Phạm vi
- Đảm bảo mọi action tuân theo hợp đồng trả về object `{ view, model }` hoặc `Promise` tương đương.
- Cung cấp lớp `BaseController` với helper `view()` và `redirect()`.
- Quản lý lifecycle context (cleanup, dependency injection cơ bản).
- Phạm vi tập trung vào `BaseController` và ví dụ `UsersController`.

## 2. Thành phần chính
| Module | Vai trò | Điểm chính |
| --- | --- | --- |
| `BaseController` | Lớp cha cho mọi controller | Định nghĩa helper, xử lý lỗi, inject dịch vụ. |
| `UsersController` | Ví dụ triển khai chuẩn | Action `index` trả `{ view, model }` gồm danh sách users. |
| `system.js` | Runner cho action | Nhận kết quả controller và render view tương ứng.

## 3. Yêu cầu chức năng
- **FR-1: Hợp đồng trả về** – Action phải trả `{ view: string, model: object }`.
- **FR-2: Hỗ trợ async** – Cho phép action `async/await` để fetch dữ liệu.
- **FR-3: Helper view()** – `this.view("Users", { users })` giúp tạo kết quả nhất quán.
- **FR-4: Xử lý lỗi** – Bọc action trong try/catch, log và trả NotFound/Generic error view.
- **FR-5: Context** – Pass `ctx` chứa `navigate`, `params`, `query`, `onCleanup`.

## 4. Thiết kế giải pháp
### 4.1 BaseController
```js
export class BaseController {
  view(name, model = {}) {
    return { view: name, model };
  }

  redirect(routeName, params, query, ctx) {
    ctx.navigate(routeName, params, query);
    return { redirect: true };
  }
}
```

### 4.2 Runner trong `system.js`
```js
async function runAction(Controller, action, params, query, ctx) {
  const controller = new Controller();
  if (typeof controller[action] !== "function") {
    throw new Error(`Action ${action} not implemented`);
  }

  try {
    const result = await controller[action](params, query, ctx);
    if (!result || typeof result.view !== "string") {
      throw new Error("Controller action must return { view, model }");
    }
    return result;
  } catch (error) {
    console.error(error);
    return { view: "Error", model: { message: error.message } };
  }
}
```

### 4.3 Ví dụ `UsersController`
```js
import { BaseController } from "../app/base-controller.js";
import { UsersService } from "../services/users-service.js";

export default class UsersController extends BaseController {
  constructor() {
    super();
    this.usersService = new UsersService();
  }

  async index(params, query, ctx) {
    const users = await this.usersService.list(query);
    return this.view("Users", { users, query });
  }
}
```

## 5. Use Case chính
- **UC-1:** Router gọi `UsersController#index` → trả view Users kèm dữ liệu.
- **UC-2:** Action throw error → hệ thống render view Error chung.
- **UC-3:** Controller cần điều hướng → dùng `this.redirect(...)` thay vì thao tác hash trực tiếp.

## 6. Kế hoạch kiểm thử
| ID | Mục tiêu | Bước thực hiện | Kỳ vọng |
| --- | --- | --- | --- |
| TC-1 | Tuân thủ hợp đồng | Gọi `UsersController#index` | Nhận `{ view: "Users", model: {...} }`. |
| TC-2 | Async action | Mock service `list` trả Promise | Router chờ promise resolve và render dữ liệu. |
| TC-3 | Missing action | Router gọi action không tồn tại | Log lỗi, render Error view. |
| TC-4 | Exception handling | Throw error trong action | Error view hiển thị thông điệp. |

## 7. Ghi chú triển khai
- Tránh logic business quá phức tạp trong controller; nên chuyển vào service.
- Có thể inject service qua constructor để dễ mock unit test.
- Đảm bảo cleanup trong view thay vì trong controller.
- Nếu dùng TypeScript, khai báo interface `ControllerResult` để enforce typing.


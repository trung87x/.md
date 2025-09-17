# 📚 Feature Documentation: Controller returns `{ view, model }` (FR-3)

## 1. SRS – Feature Requirement Specification

### 1.1 Mục đích

Chuẩn hoá **hợp đồng (contract)** giữa _controller action_ và _rendering system_: mỗi action phải **trả về** một object có dạng `{ view: string, model: object }` để hệ thống quyết định render.

### 1.2 Phạm vi

- Controller là ES Module class, mỗi action là `async function(params, query, ctx)`.
- Action **không** tự thao tác DOM; chỉ **trả về** `{ view, model }`.
- `system.renderView(view, model)` chịu trách nhiệm nạp HTML/JS và khởi chạy view.
- Cho phép dùng `ctx.navigate()` nếu action cần điều hướng.

### 1.3 Functional Requirements

- **FR-3-1**: Mọi action trả về `{ view, model }` hợp lệ.
- **FR-3-2**: `model` là JSON-serializable (plain object) để debug/log dễ dàng.
- **FR-3-3**: Cung cấp helper trong `BaseController`: `view(name, model)`, `notFound(path)`, (tùy chọn) `redirect(path, opts)`.
- **FR-3-4**: Lỗi trong action không làm treo app; hệ thống log và có thể rơi về `NotFound`/`Error` view (tối thiểu: NotFound).
- **FR-3-5**: Action **không** truy cập DOM, **không** gắn event; việc đó thuộc về View (FR-4).

### 1.4 Non-functional

- Thời gian chạy action (bao gồm service/data) ≤ 200ms với dữ liệu cục bộ.
- Kết quả `{ view, model }` phải ổn định, có thể ghi log.

---

## 2. Use Case / User Flow

### UC-3-1: Action trả kết quả để render

1. Router gọi `UsersController.index(params, query, ctx)`.
2. Action tạo `model` (ví dụ danh sách `userIds`, `title`).
3. Action trả `{ view: "Users", model }`.
4. Hệ thống render view `Users` với `model`.

### UC-3-2: Action trả NotFound

1. Router gọi `UsersController.detail({ id: "u404" }, query, ctx)`.
2. Không tìm thấy dữ liệu → action trả `this.view("NotFound", { path: "users/u404" })`.
3. Hệ thống render `NotFound`.

### UC-3-3: Action yêu cầu điều hướng

1. Action quyết định điều hướng (ví dụ thiếu tham số bắt buộc).
2. Gọi `ctx.navigate("users")` và kết thúc mà **không** render view hiện tại.

---

## 3. SDD – Thiết kế

### 3.1 Hợp đồng controller action

```ts
// Pseudocode / JSDoc
type Action = (
  params: Record<string, string>,
  query: Record<string, string>,
  ctx: {
    navigate(
      path: string,
      opts?: { params?: Record<string, string>; query?: Record<string, string> }
    ): void;
  }
) => Promise<{ view: string; model: Record<string, any> } | void>;
```

### 3.2 BaseController

- Cung cấp helpers để tạo kết quả chuẩn.
- Không chứa state ràng buộc view.

---

## 4. Test Plan / Test Cases

- **TC-3-1**: `UsersController.index` trả `{ view:"Users", model:{ title } }` → render `Users`.
- **TC-3-2**: `UsersController.detail` với ID tồn tại → render `UserDetail`.
- **TC-3-3**: `UsersController.detail` với ID không tồn tại → trả `NotFound`.
- **TC-3-4**: Action gọi `ctx.navigate("users")` → hệ thống điều hướng, không render view hiện tại.
- **TC-3-5**: Model là plain object (không function, không DOM node).

---

## 5. Implementation / Source Code Overview

### I-3-1. BaseController (mở rộng nhẹ)

```js
// src/app/base-controller.js
export class BaseController {
  view(name, model = {}) {
    return { view: name, model };
  }
  notFound(path = "") {
    return { view: "NotFound", model: { path } };
  }
  // Tùy chọn sử dụng trong action khi muốn điều hướng thay vì render:
  // redirect(ctx, path, opts) { ctx.navigate(path, opts); }
}
```

### I-3-2. System.runAction (đã có từ FR-1, bổ sung an toàn lỗi)

```js
// src/app/system.js (trích)
export async function runAction(Controller, action, params, query, ctx) {
  const ctrl = new Controller();
  try {
    const out = await ctrl[action](params, query, ctx);
    // Cho phép action trả void khi đã gọi ctx.navigate()
    if (!out) return { view: "Noop", model: {} };
    if (!out.view) throw new Error("Action must return { view, model }");
    return out;
  } catch (err) {
    console.error("[runAction] error:", err);
    return {
      view: "NotFound",
      model: { path: params?.id ? String(params.id) : "" },
    };
  }
}
```

> Ghi chú: `view: "Noop"` sẽ bị bỏ qua ở `render()` nếu bạn muốn; hoặc đơn giản gọi `return` ở action và `render()` tiếp tục do `ctx.navigate()` đã đổi hash.

### I-3-3. UsersController (tuân thủ FR-3)

```js
// src/controllers/UsersController.js
import { BaseController } from "../app/base-controller.js";

const MOCK = ["u123", "u456", "u789"];

export default class UsersController extends BaseController {
  async index(_params, query) {
    const page = Number(query?.page || 1);
    const pageSize = 50; // ví dụ
    const userIds = MOCK; // ở thực tế có thể gọi service
    return this.view("Users", {
      title: "Danh sách người dùng",
      page,
      pageSize,
      userIds,
    });
  }

  async detail(params) {
    const id = params?.id;
    if (!id) return this.notFound("users/");
    if (!MOCK.includes(id)) return this.notFound(`users/${id}`);
    return this.view("UserDetail", {
      title: "Chi tiết người dùng",
      userId: id,
    });
  }
}
```

### I-3-4. View tiêu thụ model (đã có từ FR-2)

```js
// src/views/Users.js (trích)
export async function init(host, model) {
  host.querySelector("#title").textContent = model.title;
  const list = model.userIds || [];
  host.querySelector("#userList").innerHTML = list
    .map((id) => `<li><a href="#/users/${id}">User ${id}</a></li>`)
    .join("");
}
```

### I-3-5. Điều hướng trong action (tuỳ chọn)

```js
// Ví dụ: thiếu tham số thì điều hướng về danh sách
async detail(params, _query, ctx) {
  if (!params?.id) {
    ctx.navigate("users"); // chuyển hướng
    return;                // không trả view để runAction có thể trả Noop
  }
  // ...
}
```

---

## 6. Change Log

| Version | Nội dung                                                                                        |
| ------- | ----------------------------------------------------------------------------------------------- |
| 1.0     | Chuẩn hoá contract `{ view, model }` cho controller action; bổ sung helper trong BaseController |

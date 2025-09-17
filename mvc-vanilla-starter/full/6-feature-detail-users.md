# 📚 Feature Documentation: Detail page by `:id` (FR-6)

## 1. SRS – Feature Requirement Specification

### 1.1 Mục đích
Đặc tả **trang chi tiết** dựa trên route pattern có tham số động `:id` (kế thừa cơ chế FR‑2, hợp đồng FR‑3 và lifecycle FR‑4).

### 1.2 Phạm vi
- Route chuẩn: `#/users/:id`.
- Controller lấy dữ liệu theo `id` thông qua service cục bộ.
- View hiển thị thông tin chi tiết và dọn dẹp đúng chuẩn.

### 1.3 Functional Requirements
- **FR-6-1**: Router match `users/:id` → truyền `{ id }` vào controller.
- **FR-6-2**: Controller gọi `UserService.getById(id)` → trả `{ view:"UserDetail", model }`.
- **FR-6-3**: Không tìm thấy → trả `NotFound` với `path` tương ứng.
- **FR-6-4**: View `UserDetail` hiển thị đầy đủ trường và không rò rỉ tài nguyên khi rời trang.
- **FR-6-5**: Cho phép liên kết quay về danh sách, bảo toàn query (nếu có `q`, `page`).

### 1.4 Non-functional
- Truy xuất dữ liệu cục bộ ≤ 50ms.
- View không gây reflow/relayout quá mức; cleanup đầy đủ (theo FR‑4).

---

## 2. Use Case / User Flow

### UC-6-1: Vào trang chi tiết
1. Điều hướng `#/users/u123`.
2. Controller lấy dữ liệu `u123` → render `UserDetail`.

### UC-6-2: Không tồn tại
1. Điều hướng `#/users/u404`.
2. Service không có `u404` → controller trả `NotFound` (`path: "users/u404"`).

### UC-6-3: Quay lại danh sách, giữ truy vấn
1. Từ `UserDetail`, bấm “Quay lại”.
2. Điều hướng `#/users?q=<term>&page=<p>` nếu query tồn tại.

---

## 3. SDD – Thiết kế

### 3.1 Route
- `users/:id` (đã khai báo trong FR‑2).

### 3.2 Dữ liệu
- Service cục bộ `UserService.getById(id): User | null`.
- Cấu trúc `User` (mock): `{ id, name, email, score }`.

### 3.3 Controller
- `UsersController.detail(params, query)`:
  - Validate `id`.
  - Gọi service, trả `NotFound` nếu null.
  - Trả `this.view("UserDetail", { user, title: user.name, backQuery: { q, page, pageSize } })`.

### 3.4 View
- `UserDetail.html/js` hiển thị các trường, có nút “Quay lại” sử dụng `ctx.navigate("users", { query: backQuery })`.

---

## 4. Test Plan / Test Cases

- **TC-6-1**: `#/users/u123` → render UserDetail (đúng tên, email).
- **TC-6-2**: `#/users/u404` → NotFound với `path = "users/u404"`.
- **TC-6-3**: Từ `#/users?q=u&page=2` click một user → vào detail → “Quay lại” giữ `q` & `page`.
- **TC-6-4**: Điều hướng qua lại 20 lần giữa list/detail → không rò rỉ listeners.
- **TC-6-5**: Thời gian dựng view ≤ 50ms (mock).

---

## 5. Implementation / Source Code Overview

### I-6-1. Service chi tiết người dùng
`src/services/UserService.js`
```js
// Bổ sung vào file đã có từ FR-5
const USERS = [
  { id: "u100", name: "Alice",  email: "alice@example.com",  score: 88 },
  { id: "u101", name: "Bob",    email: "bob@example.com",    score: 92 },
  { id: "u102", name: "Carol",  email: "carol@example.com",  score: 71 },
  { id: "u123", name: "Jane",   email: "jane@example.com",   score: 95 },
  { id: "u456", name: "John",   email: "john@example.com",   score: 77 },
  { id: "u789", name: "Miyu",   email: "miyu@example.com",   score: 84 },
];

function normalize(s = "") {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export function search(term = "") {
  const q = normalize(term.trim());
  if (!q) return USERS.map(u=>u.id);
  return USERS.map(u=>u.id).filter(id => normalize(id).includes(q));
}

export function getById(id) {
  return USERS.find(u => u.id === id) || null;
}
```

### I-6-2. Controller detail
`src/controllers/UsersController.js`
```js
import { BaseController } from "../app/base-controller.js";
import * as UserService from "../services/UserService.js";

export default class UsersController extends BaseController {
  async index(_params, query) {
    const q = String(query?.q || "");
    const page = Math.max(1, Number(query?.page || 1));
    const pageSize = Math.max(1, Number(query?.pageSize || 50));

    const all = UserService.search(q);
    const total = all.length;
    const start = (page - 1) * pageSize;
    const userIds = all.slice(start, start + pageSize);

    return this.view("Users", { title: "Users", q, page, pageSize, total, userIds });
  }

  async detail(params, query) {
    const id = params?.id;
    if (!id) return this.notFound("users/");
    const user = UserService.getById(id);
    if (!user) return this.notFound(`users/${id}`);

    const backQuery = {};
    if (query?.q) backQuery.q = String(query.q);
    if (query?.page) backQuery.page = Number(query.page);
    if (query?.pageSize) backQuery.pageSize = Number(query.pageSize);

    return this.view("UserDetail", { title: user.name, user, backQuery });
  }
}
```

### I-6-3. View chi tiết
`src/views/UserDetail.html`
```html
<section>
  <a id="back" href="#">← Quay lại</a>
  <h1 id="title"></h1>
  <ul>
    <li><strong>ID:</strong> <code id="id"></code></li>
    <li><strong>Email:</strong> <span id="email"></span></li>
    <li><strong>Score:</strong> <span id="score"></span></li>
  </ul>
</section>
```

`src/views/UserDetail.js`
```js
export async function init(host, model, ctx) {
  const { user, title, backQuery = {} } = model;

  host.querySelector("#title").textContent = title;
  host.querySelector("#id").textContent = user.id;
  host.querySelector("#email").textContent = user.email;
  host.querySelector("#score").textContent = String(user.score);

  const back = host.querySelector("#back");
  const onBack = (e) => {
    e.preventDefault();
    ctx.navigate("users", { query: backQuery });
  };
  back.addEventListener("click", onBack);
  ctx.onCleanup(() => back.removeEventListener("click", onBack));
}
```

> Ghi chú: View sử dụng `ctx.onCleanup` theo FR‑4 để huỷ listener “Back”.

---

## 6. Change Log
| Version | Nội dung |
| --- | --- |
| 1.0 | Trang chi tiết theo `:id` cho Users; giữ truy vấn khi quay lại danh sách |

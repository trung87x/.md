# 📚 Feature Documentation: Routing with `:id` (FR-2)

## 1. SRS – Feature Requirement Specification

### 1.1 Mục đích

Xác định cơ chế điều hướng theo **route pattern** (có tham số động `:id`) trong hệ thống SPA hash‑router. Hệ thống cần map chính xác `pattern → {controller, action}`, truyền tham số, và có fallback 404.

### 1.2 Phạm vi

- Hash routing (`#/path?query`) không reload trang.
- Pattern động: `:id`.
- Fallback `NotFound` khi không khớp route.

### 1.3 Functional Requirements

- **FR-2-1**: Khai báo bảng route chính thức và load khi khởi động.
- **FR-2-2**: So khớp pattern, trích tham số động, truyền vào controller action.
- **FR-2-3**: Không khớp → render `NotFound` với `path`.
- **FR-2-4**: Cung cấp `navigate(path, { params, query })` dùng chung.

### 1.4 Non-functional

- Parse/match route ≤ 50ms.
- Không rò rỉ state/listeners giữa 2 lần điều hướng.

---

## 2. Use Case / User Flow

### UC-2-1: Điều hướng tới Home

Truy cập `#/` → render Home.

### UC-2-2: Điều hướng tới danh sách người dùng

Truy cập `#/users` → render Users.

### UC-2-3: Điều hướng tới chi tiết người dùng

Truy cập `#/users/u123`.

- Router khớp `users/:id` → `{ id: "u123" }`.
- Gọi `UsersController.detail({ id: "u123" })` → render `UserDetail`.

### UC-2-4: Route không tồn tại

Truy cập `#/khong-co` → render NotFound.

---

## 3. SDD

### 3.1 Bảng route (chính thức cho FR‑2)

```js
// src/app/router.js
import { start } from "./system.js";
import HomeController from "../controllers/HomeController.js";
import UsersController from "../controllers/UsersController.js";

export function startRouter(appEl) {
  const routes = [
    { pattern: "", ctrl: HomeController, action: "index" },
    { pattern: "users", ctrl: UsersController, action: "index" },
    { pattern: "users/:id", ctrl: UsersController, action: "detail" },
  ];

  start(appEl, routes);
}
```

### 3.2 Luồng điều hướng

1. Lắng nghe `hashchange`.
2. `parseHash()` lấy `rawPath`, `query`.
3. Duyệt `routes`, `matchRoute(pattern, rawPath)` → `params`.
4. `runAction(ctrl, action, params, query, ctx)` → `{ view, model }`.
5. `renderView(view, model)`; dispose view cũ trước khi render.
6. Không khớp route → `renderView("NotFound", { path: rawPath })`.

---

## 4. Test Plan / Test Cases

- **TC-2-1**: `#/` → Home.
- **TC-2-2**: `#/users` → Users list.
- **TC-2-3**: `#/users/u123` → `UsersController.detail({id:"u123"})` được gọi.
- **TC-2-4**: `#/khong-co` → NotFound.
- **TC-2-5**: Điều hướng nhanh 10 lần → không rò rỉ listeners.

---

## 5. Implementation / Source Code Overview

### I-2-1. Route table (cố định cho FR‑2)

```js
// src/app/router.js
import { start } from "./system.js";
import HomeController from "../controllers/HomeController.js";
import UsersController from "../controllers/UsersController.js";

export function startRouter(appEl) {
  const routes = [
    { pattern: "", ctrl: HomeController, action: "index" },
    { pattern: "users", ctrl: UsersController, action: "index" },
    { pattern: "users/:id", ctrl: UsersController, action: "detail" },
  ];
  start(appEl, routes);
}
```

### I-2-2. So khớp pattern và trích tham số

```js
// src/app/system.js (trích — đã có từ FR‑1)
function compile(pattern) {
  const keys = [];
  const rx = (pattern || "")
    .replace(/(^\/+|\/+$$)/g, "")
    .replace(/:([A-Za-z0-9_]+)/g, (_, k) => {
      keys.push(k);
      return "([^/]+)";
    });
  return { regex: new RegExp(`^${rx}$`), keys };
}
function matchRoute(pattern, path) {
  const { regex, keys } = compile(pattern);
  const m = (path || "").match(regex);
  if (!m) return null;
  const params = {};
  keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1])));
  return params;
}
```

### I-2-3. Controller định nghĩa

```js
// src/controllers/UsersController.js
import { BaseController } from "../app/base-controller.js";

export default class UsersController extends BaseController {
  async index() {
    return this.view("Users", { title: "Danh sách người dùng" });
  }
  async detail(params) {
    return this.view("UserDetail", {
      title: "Chi tiết người dùng",
      userId: params.id,
    });
  }
}
```

### I-2-4. Views định nghĩa

`src/views/Users.html`

```html
<section>
  <h1 id="title"></h1>
  <ul id="userList"></ul>
</section>
```

`src/views/Users.js`

```js
export async function init(host, model) {
  host.querySelector("#title").textContent = model.title;
  // dữ liệu giả để test
  const list = ["u123", "u456", "u789"];
  host.querySelector("#userList").innerHTML = list
    .map((id) => `<li><a href="#/users/${id}">User ${id}</a></li>`)
    .join("");
}
```

`src/views/UserDetail.html`

```html
<section>
  <h1 id="title"></h1>
  <p>ID: <code id="userId"></code></p>
</section>
```

`src/views/UserDetail.js`

```js
export async function init(host, model) {
  host.querySelector("#title").textContent = model.title;
  host.querySelector("#userId").textContent = model.userId;
}
```

### I-2-5. Helper điều hướng

```js
// src/app/system.js (trích — đã có từ FR‑1)
function buildHash(path, _params = {}, query = {}) {
  const qs = new URLSearchParams(query).toString();
  return `#/${path}${qs ? `?${qs}` : ""}`;
}
const ctx = {
  navigate(path, { params = {}, query = {} } = {}) {
    let out = path;
    Object.entries(params).forEach(([k, v]) => {
      out = out.replace(`:${k}`, encodeURIComponent(v));
    });
    location.hash = buildHash(out, {}, query);
  },
};
```

> Ghi chú: `NotFound` đã tạo tại FR‑1; tái sử dụng ở FR‑2.

---

## 6. Change Log

| Version | Nội dung                                     |
| ------- | -------------------------------------------- |
| 1.0     | Routing với `:id` (Users/:id) + views đầy đủ |

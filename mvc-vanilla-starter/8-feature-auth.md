# 📚 Feature Documentation: Basic Auth & Guards (FR-8)

## 1. SRS – Feature Requirement Specification

### 1.1 Mục đích
Bổ sung **xác thực cơ bản (mock)** và **guards** để:
- Chặn truy cập vào route yêu cầu đăng nhập.
- Chuyển hướng đến trang đăng nhập kèm tham số `next`, và quay lại sau khi đăng nhập.

### 1.2 Phạm vi
- Không tích hợp OAuth/real backend; **AuthService** mock + `localStorage`.
- Route chính thức của FR‑8: `#/login`, `#/logout`, và **ít nhất một** route được gắn cờ `requireAuth: true` (ví dụ: `#/account`).
- Cơ chế guard tích hợp vào `system.start(...)` thông qua tham số `guards`.

### 1.3 Functional Requirements
- **FR-8-1**: `guards.ensureAuth()` trả `true/false` thể hiện trạng thái đăng nhập.
- **FR-8-2**: Route có `requireAuth: true` → nếu chưa đăng nhập, redirect `#/login?next=<path>`.
- **FR-8-3**: `Login` view cho phép “đăng nhập” (mock) và điều hướng về `next` (mặc định `/`).
- **FR-8-4**: `Logout` xoá trạng thái đăng nhập và quay về `Home`.
- **FR-8-5**: Guard **không** làm treo ứng dụng; có thể dùng cùng `beforeEach/beforeEnter`.

### 1.4 Non-functional
- Tác vụ đăng nhập/đăng xuất ≤ 10ms (cục bộ).
- Không rò rỉ listeners giữa các lần mở trang `Login`.

---

## 2. Use Case / User Flow

### UC-8-1: Truy cập trang cần đăng nhập
1. Người dùng mở `#/account` (được gắn `requireAuth: true`).
2. Chưa đăng nhập → hệ thống redirect `#/login?next=/account`.

### UC-8-2: Đăng nhập và quay lại
1. Ở `#/login`, người dùng bấm “Đăng nhập” (mock).
2. Hệ thống chuyển đến `next` (nếu có) hoặc `/`.

### UC-8-3: Đăng xuất
1. Người dùng mở `#/logout`.
2. Trạng thái đăng nhập bị xoá, điều hướng về Home.

---

## 3. SDD – Thiết kế

### 3.1 Guards: hợp đồng & trình tự
- `start(appEl, routes, guards)` trong `system.js` sẽ gọi theo thứ tự:
  1) `guards.beforeEach?(ctx)` → có thể trả `false` để huỷ điều hướng.
  2) Nếu route có `requireAuth`, chạy `guards.ensureAuth?({ ctx })`.
     - `false` → `ctx.navigate("login", { query: { next: "/<rawPath>" } })` và **dừng**.
  3) `route.beforeEnter?({ params, query, ctx })`.

### 3.2 Route chính thức khi **bật FR‑8**
- `login` → `AuthController.login`
- `logout` → `AuthController.logout`
- `account` (ví dụ route cần đăng nhập) → `AccountController.index` với `requireAuth: true`

> Lưu ý: FR‑2 vẫn độc lập. Việc bổ sung route dưới đây chỉ áp dụng **khi kích hoạt FR‑8**.

---

## 4. Test Plan / Test Cases

- **TC-8-1**: Chưa login, truy cập `#/account` → redirect `#/login?next=/account`.
- **TC-8-2**: Tại `#/login` bấm “Đăng nhập” → điều hướng về `/account`.
- **TC-8-3**: Tại `#/logout` → quay về Home, `ensureAuth()` trả `false`.
- **TC-8-4**: `beforeEach` trả `false` → huỷ điều hướng (tuỳ chọn).
- **TC-8-5**: Điều hướng qua lại 20 lần giữa `login/account` → không rò rỉ listeners.

---

## 5. Implementation / Source Code Overview

### I-8-1. AuthService (mock)
`src/services/AuthService.js`
```js
const KEY = "auth.loggedIn";

export default {
  isLoggedIn() {
    try { return localStorage.getItem(KEY) === "1"; }
    catch { return false; }
  },
  async login() {
    try { localStorage.setItem(KEY, "1"); } catch {}
    return true;
  },
  async logout() {
    try { localStorage.removeItem(KEY); } catch {}
    return true;
  }
};
```

### I-8-2. AuthController
`src/controllers/AuthController.js`
```js
import { BaseController } from "../app/base-controller.js";
import Auth from "../services/AuthService.js";

export default class AuthController extends BaseController {
  async login(_params, query) {
    const next = query?.next || "/";
    return this.view("Login", { next });
  }
  async logout() {
    await Auth.logout();
    return this.view("Home", { title: "Home" });
  }
}
```

### I-8-3. AccountController (route cần đăng nhập)
`src/controllers/AccountController.js`
```js
import { BaseController } from "../app/base-controller.js";

export default class AccountController extends BaseController {
  async index() {
    return this.view("Account", { title: "Tài khoản của tôi" });
  }
}
```

### I-8-4. Views
`src/views/Login.html`
```html
<section>
  <h1>Đăng nhập</h1>
  <p>Sử dụng nút dưới đây để đăng nhập (mock).</p>
  <button id="login">Đăng nhập</button>
</section>
```

`src/views/Login.js`
```js
import Auth from "../services/AuthService.js";

export async function init(host, model, ctx) {
  const next = model?.next || "/";
  const btn = host.querySelector("#login");
  const onClick = async () => { await Auth.login(); ctx.navigate(next.replace(/^\//,"")); };
  btn.addEventListener("click", onClick);
  ctx.onCleanup(() => btn.removeEventListener("click", onClick));
}
```

`src/views/Account.html`
```html
<section>
  <h1 id="title"></h1>
  <p>Chào mừng! Đây là trang tài khoản (chỉ truy cập khi đăng nhập).</p>
</section>
```

`src/views/Account.js`
```js
export async function init(host, model) {
  host.querySelector("#title").textContent = model.title;
}
```

### I-8-5. Bổ sung routes & guards khi **bật FR‑8**
`src/app/router.js`
```js
import { start } from "./system.js";
import HomeController from "../controllers/HomeController.js";
import UsersController from "../controllers/UsersController.js";
import AuthController from "../controllers/AuthController.js";
import AccountController from "../controllers/AccountController.js";
import Auth from "../services/AuthService.js";

export function startRouter(appEl) {
  const routes = [
    // --- routes lõi từ FR-2 ---
    { pattern: "",          ctrl: HomeController,    action: "index" },
    { pattern: "users",     ctrl: UsersController,   action: "index" },
    { pattern: "users/:id", ctrl: UsersController,   action: "detail" },

    // --- FR-8: Auth ---
    { pattern: "login",     ctrl: AuthController,    action: "login" },
    { pattern: "logout",    ctrl: AuthController,    action: "logout" },
    { pattern: "account",   ctrl: AccountController, action: "index", requireAuth: true },
  ];

  const guards = {
    async beforeEach() { return true; },
    async ensureAuth() { return Auth.isLoggedIn(); },
  };

  start(appEl, routes, guards);
}
```

> Khi **chưa bật FR‑8**, đừng import các controller/services/Auth vào `router.js`. Khi bật FR‑8, bạn thêm block “Auth” như trên.

---

## 6. Change Log
| Version | Nội dung |
| --- | --- |
| 1.0 | Auth mock + guards; routes login/logout/account; redirect với `next` |

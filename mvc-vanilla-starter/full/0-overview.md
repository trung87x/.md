# 📙 Tài liệu tổng hợp MVC Vanilla Starter

> Bộ tài liệu này gom toàn bộ đặc tả 8 tính năng của dự án MVC Vanilla Starter vào một file duy nhất. Bạn có thể đọc từ đầu đến cuối để nắm được yêu cầu nghiệp vụ (SRS), thiết kế (SDD), use case, test plan và implementation note cho từng hạng mục: setup dự án, routing, controller, vòng đời view, tìm kiếm người dùng, trang chi tiết, billing PRO giả lập và auth.

## Mục lục

1. [Feature 1 – Setup Vanilla Starter](#feature-1-setup-vanilla-starter)
2. [Feature 2 – Routing với tham số `:id`](#feature-2-routing-với-tham-số-id)
3. [Feature 3 – Chuẩn hóa Controller](#feature-3-chuẩn-hóa-controller)
4. [Feature 4 – Lifecycle View](#feature-4-lifecycle-view)
5. [Feature 5 – Search Users](#feature-5-search-users)
6. [Feature 6 – Detail Users](#feature-6-detail-users)
7. [Feature 7 – Billing PRO giả lập](#feature-7-billing-pro-giả-lập)
8. [Feature 8 – Auth + Guard](#feature-8-auth--guard)

---

## Feature 1 – Setup Vanilla Starter

## 📚 Feature Documentation: Setup Vanilla Starter (Optimized)

> Mục tiêu: tạo khung Vite + Vanilla JS tối thiểu, chạy được Home, hỗ trợ route và fallback 404.

### 1. SRS

#### 1.1 Mục đích

Thiết lập nền tảng MVC Vanilla Starter để các tính năng sau (routing, controller, view, search, auth, pro) có thể phát triển nhanh.

#### 1.2 Phạm vi

- Dự án Vite template `vanilla`
- Cấu trúc `/src` cơ bản
- Khởi tạo `system/router/controller/view`
- Render Home, có 404

#### 1.3 Functional Requirements

- **FR-1: Setup Vanilla Starter**
  - FR-1-1: Khởi tạo dự án (Vite)
  - FR-1-2: Cài dependencies
  - FR-1-3: Tạo cấu trúc thư mục
  - FR-1-4: Viết `system.js`, `router.js`, `base-controller.js`
  - FR-1-5: Tạo Home view và chạy được

#### 1.4 Non-functional

- Setup ≤ 5 phút, ES Module, dễ mở rộng

---

### 2. Use Case

#### UC-1: Khởi tạo dự án

- UC-1-1: Tạo project → `npm create vite@latest ... --template vanilla`
- UC-1-2: Chạy thử → `npm run dev` → mở `http://localhost:5173`

---

### 3. SDD

#### 3.1 Cấu trúc thư mục

```
mvc-vanilla-starter/
├─ index.html
├─ package.json
└─ src/
   ├─ app/
   │  ├─ main.js
   │  ├─ router.js
   │  ├─ system.js
   │  └─ base-controller.js
   ├─ controllers/
   │  └─ HomeController.js
   └─ views/
      ├─ Home.html
      ├─ Home.js
      ├─ NotFound.html
      └─ NotFound.js
```

#### 3.2 Luồng khởi động

`index.html` → `main.js` → `startRouter()` → match route → controller trả `{view, model}` → `renderView(view, model)`.

---

### 4. Test Plan

- **TC-1-1**: `npm run dev` → `#/` hiển thị Home
- **TC-1-2**: Route không tồn tại → NotFound
- **TC-1-3**: Không lỗi runtime khi đổi route liên tục

---

### 5. Implementation / Source Code Overview

#### I-1-1. Khởi tạo dự án

```bash
npm create vite@latest mvc-vanilla-starter --template vanilla
cd mvc-vanilla-starter
npm install
npm run dev
```

#### I-1-2. Base Controller

```js
// src/app/base-controller.js
export class BaseController {
  view(name, model = {}) {
    return { view: name, model };
  }
}
```

#### I-1-3. Router cơ bản

```js
// src/app/router.js
import { start } from "./system.js";
import HomeController from "../controllers/HomeController.js";

export function startRouter(appEl) {
  const routes = [{ pattern: "", ctrl: HomeController, action: "index" }];
  start(appEl, routes);
}
```

#### I-1-4. System Skeleton

```js
// === Map view để Vite phân tích tĩnh (ổn định khi build) ===
const viewJsMap = import.meta.glob("../views/**/*.js"); // lazy-load module JS
const viewHtmlMap = import.meta.glob("../views/**/*.html", {
  query: "?raw",
  import: "default",
});

let current = { dispose: null };

// ---------- Utils nhỏ gọn ----------
function toFragment(htmlString) {
  const t = document.createElement("template");
  t.innerHTML = (htmlString || "").trim();
  return t.content;
}
function buildHash(path, _params = {}, query = {}) {
  const qs = new URLSearchParams(query).toString();
  return `#/${path}${qs ? `?${qs}` : ""}`;
}
function compile(pattern) {
  const keys = [];
  const rx = pattern
    .replace(/(^\/+|\/+$$)/g, "")
    .replace(/:([A-Za-z0-9_]+)/g, (_, k) => {
      keys.push(k);
      return "([^/]+)";
    });
  return { regex: new RegExp(`^${rx}$`), keys };
}
function matchRoute(pattern, path) {
  const { regex, keys } = compile(pattern);
  const m = path.match(regex);
  if (!m) return null;
  const params = {};
  keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1])));
  return params;
}

// ---------- Controller action runner ----------
export async function runAction(Controller, action, params, query, ctx) {
  const ctrl = new Controller();
  return await ctrl[action](params, query, ctx);
}

// ---------- Hash parser ----------
export function parseHash() {
  const raw = location.hash.replace(/^#\/?/, "");
  const [p, qs] = raw.split("?");
  return {
    rawPath: (p || "").replace(/(^\/+|\/+$$)/g, ""),
    query: Object.fromEntries(new URLSearchParams(qs || "")),
  };
}

// ---------- View renderer ----------
export async function renderView(viewName, model, appEl) {
  // dispose view cũ
  if (current.dispose) {
    try {
      await current.dispose();
    } catch {}
  }
  appEl.textContent = "";

  // key tương đối theo vị trí file này (src/app/) tới views/
  const htmlKey = `../views/${viewName}.html`;
  const jsKey = `../views/${viewName}.js`;

  const loadHtml = viewHtmlMap[htmlKey];
  const loadJs = viewJsMap[jsKey];

  if (!loadHtml || !loadJs) {
    // rơi vào NotFound nếu thiếu file
    const nfHtmlLoader = viewHtmlMap["../views/NotFound.html"];
    const nfHtml = nfHtmlLoader
      ? (await nfHtmlLoader()).default
      : `<h1>Not Found</h1>`;
    appEl.appendChild(toFragment(nfHtml));
    return;
  }

  // LƯU Ý: loader() trả về module object → string nằm ở .default
  const [htmlMod, mod] = await Promise.all([loadHtml(), loadJs()]);
  const html = htmlMod.default; // ← chuẩn Vite raw import

  appEl.appendChild(toFragment(html));

  const cleanups = [];
  const ctx = {
    navigate(patternOrPath, { params = {}, query = {} } = {}) {
      let path = patternOrPath;
      Object.entries(params).forEach(([k, v]) => {
        path = path.replace(`:${k}`, encodeURIComponent(v));
      });
      location.hash = buildHash(path, {}, query);
    },
    onCleanup(fn) {
      if (typeof fn === "function") cleanups.push(fn);
    },
    $(host, sel) {
      return host.querySelector(sel);
    },
    $all(host, sel) {
      return Array.from(host.querySelectorAll(sel));
    },
  };

  const disposer = await mod.init?.(appEl, model, ctx);
  current.dispose = async () => {
    for (const fn of cleanups.splice(0)) {
      try {
        await fn();
      } catch {}
    }
    if (typeof disposer === "function") await disposer();
    if (typeof mod.dispose === "function") await mod.dispose(appEl);
  };
}

// ---------- Router khởi động ----------
export function start(appEl, routeTable, guards = {}) {
  const list = Array.isArray(routeTable)
    ? routeTable
    : Object.entries(routeTable).map(([pattern, v]) => ({ pattern, ...v }));

  async function render() {
    const { rawPath, query } = parseHash();
    let found = null,
      params = {};

    for (const r of list) {
      const p = (r.pattern || "").replace(/(^\/+|\/+$$)/g, "");
      if (p === "" && rawPath === "") {
        found = r;
        params = {};
        break;
      }
      const m = matchRoute(p, rawPath);
      if (m) {
        found = r;
        params = m;
        break;
      }
    }

    if (!found) {
      await renderView("NotFound", { path: rawPath }, appEl);
      return;
    }

    const ctx = {
      navigate: (path, { params = {}, query = {} } = {}) => {
        let out = path;
        Object.entries(params).forEach(([k, v]) => {
          out = out.replace(`:${k}`, encodeURIComponent(v));
        });
        location.hash = buildHash(out, {}, query);
      },
    };

    // Guards
    if (typeof guards.beforeEach === "function") {
      const ok = await guards.beforeEach({ route: found, params, query, ctx });
      if (ok === false) return;
    }
    if (found.requireAuth && !(await guards.ensureAuth?.({ ctx }))) {
      ctx.navigate("login", { query: { next: `/${rawPath}` } });
      return;
    }
    if (found.requirePro && !(await guards.ensurePro?.({ ctx }))) {
      ctx.navigate("pricing", { query: { next: `/${rawPath}` } });
      return;
    }
    if (typeof found.beforeEnter === "function") {
      const g = await found.beforeEnter({ params, query, ctx });
      if (g?.allow === false) {
        if (g.redirect) ctx.navigate(g.redirect.path, g.redirect);
        return;
      }
    }

    // Controller → { view, model } → render view
    const { view, model } = await runAction(
      found.ctrl,
      found.action || "index",
      params,
      query,
      ctx
    );
    await renderView(view, model, appEl);
  }

  window.addEventListener("hashchange", render);
  render();
}
```

#### I-1-5. Home Controller + View

```js
// src/controllers/HomeController.js
import { BaseController } from "../app/base-controller.js";
export default class HomeController extends BaseController {
  async index(params) {
    return this.view("Home", { title: "Home Starter", q: params?.q ?? "" });
  }
}
```

```html
<!-- src/views/Home.html -->
<section>
  <h1 id="title"></h1>
</section>
```

```js
// src/views/Home.js
export async function init(host, model) {
  host.querySelector("#title").textContent = model.title;
}
```

#### I-1-6. Main.js

```js
import { startRouter } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  startRouter(app);
});
```

#### I-1-7. NotFound

```html
<!-- src/views/NotFound.html -->
<section class="grid gap-3">
  <h1>404</h1>
  <p>Không tìm thấy: <code id="path"></code></p>
</section>
```

```js
// src/views/NotFound.js
export async function init(host, model) {
  host.querySelector("#path").textContent = model?.path || "";
}
```

#### I-1-8. index.html

```html
<!-- index.html -->
<div id="app"></div>
<script type="module" src="/src/app/main.js"></script>
```

---

### 6. Change Log / Version History

| Version | Nội dung                 |
| ------- | ------------------------ |
| 1.0     | Khởi tạo Vanilla Starter |

---

## Feature 2 – Routing với tham số `:id`

## 📚 Feature Documentation: Routing with `:id` (FR-2)

### 1. SRS – Feature Requirement Specification

#### 1.1 Mục đích

Xác định cơ chế điều hướng theo **route pattern** (có tham số động `:id`) trong hệ thống SPA hash‑router. Hệ thống cần map chính xác `pattern → {controller, action}`, truyền tham số, và có fallback 404.

#### 1.2 Phạm vi

- Hash routing (`#/path?query`) không reload trang.
- Pattern động: `:id`.
- Fallback `NotFound` khi không khớp route.

#### 1.3 Functional Requirements

- **FR-2-1**: Khai báo bảng route chính thức và load khi khởi động.
- **FR-2-2**: So khớp pattern, trích tham số động, truyền vào controller action.
- **FR-2-3**: Không khớp → render `NotFound` với `path`.
- **FR-2-4**: Cung cấp `navigate(path, { params, query })` dùng chung.

#### 1.4 Non-functional

- Parse/match route ≤ 50ms.
- Không rò rỉ state/listeners giữa 2 lần điều hướng.

---

### 2. Use Case / User Flow

#### UC-2-1: Điều hướng tới Home

Truy cập `#/` → render Home.

#### UC-2-2: Điều hướng tới danh sách người dùng

Truy cập `#/users` → render Users.

#### UC-2-3: Điều hướng tới chi tiết người dùng

Truy cập `#/users/u123`.

- Router khớp `users/:id` → `{ id: "u123" }`.
- Gọi `UsersController.detail({ id: "u123" })` → render `UserDetail`.

#### UC-2-4: Route không tồn tại

Truy cập `#/khong-co` → render NotFound.

---

### 3. SDD

#### 3.1 Bảng route (chính thức cho FR‑2)

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

#### 3.2 Luồng điều hướng

1. Lắng nghe `hashchange`.
2. `parseHash()` lấy `rawPath`, `query`.
3. Duyệt `routes`, `matchRoute(pattern, rawPath)` → `params`.
4. `runAction(ctrl, action, params, query, ctx)` → `{ view, model }`.
5. `renderView(view, model)`; dispose view cũ trước khi render.
6. Không khớp route → `renderView("NotFound", { path: rawPath })`.

---

### 4. Test Plan / Test Cases

- **TC-2-1**: `#/` → Home.
- **TC-2-2**: `#/users` → Users list.
- **TC-2-3**: `#/users/u123` → `UsersController.detail({id:"u123"})` được gọi.
- **TC-2-4**: `#/khong-co` → NotFound.
- **TC-2-5**: Điều hướng nhanh 10 lần → không rò rỉ listeners.

---

### 5. Implementation / Source Code Overview

#### I-2-1. Route table (cố định cho FR‑2)

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

#### I-2-2. So khớp pattern và trích tham số

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

#### I-2-3. Controller định nghĩa

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

#### I-2-4. Views định nghĩa

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

#### I-2-5. Helper điều hướng

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

### 6. Change Log

| Version | Nội dung                                     |
| ------- | -------------------------------------------- |
| 1.0     | Routing với `:id` (Users/:id) + views đầy đủ |

---

## Feature 3 – Chuẩn hóa Controller

## 📚 Feature Documentation: Controller returns `{ view, model }` (FR-3)

### 1. SRS – Feature Requirement Specification

#### 1.1 Mục đích

Chuẩn hoá **hợp đồng (contract)** giữa _controller action_ và _rendering system_: mỗi action phải **trả về** một object có dạng `{ view: string, model: object }` để hệ thống quyết định render.

#### 1.2 Phạm vi

- Controller là ES Module class, mỗi action là `async function(params, query, ctx)`.
- Action **không** tự thao tác DOM; chỉ **trả về** `{ view, model }`.
- `system.renderView(view, model)` chịu trách nhiệm nạp HTML/JS và khởi chạy view.
- Cho phép dùng `ctx.navigate()` nếu action cần điều hướng.

#### 1.3 Functional Requirements

- **FR-3-1**: Mọi action trả về `{ view, model }` hợp lệ.
- **FR-3-2**: `model` là JSON-serializable (plain object) để debug/log dễ dàng.
- **FR-3-3**: Cung cấp helper trong `BaseController`: `view(name, model)`, `notFound(path)`, (tùy chọn) `redirect(path, opts)`.
- **FR-3-4**: Lỗi trong action không làm treo app; hệ thống log và có thể rơi về `NotFound`/`Error` view (tối thiểu: NotFound).
- **FR-3-5**: Action **không** truy cập DOM, **không** gắn event; việc đó thuộc về View (FR-4).

#### 1.4 Non-functional

- Thời gian chạy action (bao gồm service/data) ≤ 200ms với dữ liệu cục bộ.
- Kết quả `{ view, model }` phải ổn định, có thể ghi log.

---

### 2. Use Case / User Flow

#### UC-3-1: Action trả kết quả để render

1. Router gọi `UsersController.index(params, query, ctx)`.
2. Action tạo `model` (ví dụ danh sách `userIds`, `title`).
3. Action trả `{ view: "Users", model }`.
4. Hệ thống render view `Users` với `model`.

#### UC-3-2: Action trả NotFound

1. Router gọi `UsersController.detail({ id: "u404" }, query, ctx)`.
2. Không tìm thấy dữ liệu → action trả `this.view("NotFound", { path: "users/u404" })`.
3. Hệ thống render `NotFound`.

#### UC-3-3: Action yêu cầu điều hướng

1. Action quyết định điều hướng (ví dụ thiếu tham số bắt buộc).
2. Gọi `ctx.navigate("users")` và kết thúc mà **không** render view hiện tại.

---

### 3. SDD – Thiết kế

#### 3.1 Hợp đồng controller action

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

#### 3.2 BaseController

- Cung cấp helpers để tạo kết quả chuẩn.
- Không chứa state ràng buộc view.

---

### 4. Test Plan / Test Cases

- **TC-3-1**: `UsersController.index` trả `{ view:"Users", model:{ title } }` → render `Users`.
- **TC-3-2**: `UsersController.detail` với ID tồn tại → render `UserDetail`.
- **TC-3-3**: `UsersController.detail` với ID không tồn tại → trả `NotFound`.
- **TC-3-4**: Action gọi `ctx.navigate("users")` → hệ thống điều hướng, không render view hiện tại.
- **TC-3-5**: Model là plain object (không function, không DOM node).

---

### 5. Implementation / Source Code Overview

#### I-3-1. BaseController (mở rộng nhẹ)

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

#### I-3-2. System.runAction (đã có từ FR-1, bổ sung an toàn lỗi)

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

#### I-3-3. UsersController (tuân thủ FR-3)

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

#### I-3-4. View tiêu thụ model (đã có từ FR-2)

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

#### I-3-5. Điều hướng trong action (tuỳ chọn)

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

### 6. Change Log

| Version | Nội dung                                                                                        |
| ------- | ----------------------------------------------------------------------------------------------- |
| 1.0     | Chuẩn hoá contract `{ view, model }` cho controller action; bổ sung helper trong BaseController |

---

## Feature 4 – Lifecycle View

## 📚 Feature Documentation: View lifecycle & cleanup (FR-4)

### 1. SRS – Feature Requirement Specification

#### 1.1 Mục đích
Chuẩn hoá **vòng đời View**: cách View khởi tạo UI từ `model`, đăng ký sự kiện/tài nguyên, và **dọn dẹp đầy đủ** (listeners/timers/fetch) khi điều hướng sang View khác, tránh rò rỉ bộ nhớ.

#### 1.2 Phạm vi
- View là cặp file `src/views/<Name>.html` + `src/views/<Name>.js`.
- Hàm bắt buộc: `init(host, model, ctx)`; hàm tùy chọn: `dispose(host)`.
- Hỗ trợ **cleanup** qua `ctx.onCleanup(fn)` và/hoặc giá trị trả về của `init` (disposer).
- Không sử dụng framework; dùng chuẩn DOM + AbortController.

#### 1.3 Functional Requirements
- **FR-4-1**: View dựng UI từ `model` trong `init(host, model, ctx)`.
- **FR-4-2**: Mọi listener/timer/subscription của View phải được **đăng ký cleanup**.
- **FR-4-3**: Khi route đổi, hệ thống gọi toàn bộ cleanup trước khi render View mới.
- **FR-4-4**: `init` **có thể trả về** một hàm disposer để dọn dẹp bổ sung.
- **FR-4-5**: Hỗ trợ huỷ request bất đồng bộ (fetch) bằng `AbortController` hoặc signal tương đương.

#### 1.4 Non-functional
- Dọn dẹp hoàn tất ≤ 50ms cho View thông thường.
- Không để lại listener/timer “mồ côi” sau 100 lần điều hướng liên tiếp (stress test).

---

### 2. Use Case / User Flow

#### UC-4-1: Gắn sự kiện và dọn dẹp khi rời View
1. `Users` view đăng ký click handler và interval cập nhật.
2. Điều hướng sang View khác → cleanup chạy, không còn handler/interval tồn tại.

#### UC-4-2: Hủy request đang chạy khi rời View
1. `UserDetail` view gọi `fetch(...)` với `AbortController`.
2. Điều hướng trước khi fetch hoàn tất → `abort()` được gọi, không ném lỗi chưa xử lý.

#### UC-4-3: Dọn dẹp widget con
1. View mount một widget con (trả về hàm unmount).
2. Điều hướng → hàm unmount chạy, giải phóng tài nguyên widget.

---

### 3. SDD – Thiết kế

#### 3.1 Chuẩn hàm View
```ts
// src/views/<Name>.js
export async function init(
  host: HTMLElement,
  model: Record<string, any>,
  ctx: {
    onCleanup(fn: () => (void|Promise<void>)): void;
    navigate(path: string, opts?: { params?: Record<string,string>, query?: Record<string,string> }): void;
  }
): Promise<void | (() => (void|Promise<void>))>;

// (tùy chọn)
export async function dispose(host: HTMLElement): Promise<void>;
```

#### 3.2 Cơ chế cleanup trong system
- `system.renderView()` tạo **danh sách cleanup**.
- Mọi `ctx.onCleanup(fn)` sẽ được đẩy vào danh sách.
- Nếu `init` trả về hàm, hàm đó cũng được thêm vào cuối danh sách.
- Trước khi render View mới, system gọi lần lượt các cleanup theo thứ tự đăng ký.

> Cơ chế này đã có từ FR-1; FR-4 đặc tả **bắt buộc** các View phải đăng ký cleanup đúng chuẩn.

---

### 4. Test Plan / Test Cases

- **TC-4-1**: `Users` view gắn click handler; điều hướng 50 lần → **không tăng** số handler còn treo (kiểm tra bằng counter trong console).
- **TC-4-2**: `Users` view tạo `setInterval`; điều hướng → interval bị clear.
- **TC-4-3**: `UserDetail` view tạo `fetch` với `AbortController`; điều hướng trước khi hoàn tất → request bị abort, không có unhandled rejection.
- **TC-4-4**: Widget con trả về `unmount`; điều hướng → `unmount` được gọi.
- **TC-4-5**: `dispose(host)` (nếu có) được gọi sau khi cleanup từ `init`.

---

### 5. Implementation / Source Code Overview

#### I-4-1. `system.renderView` (nhắc lại cơ chế cleanup)
```js
// src/app/system.js (trích)
export async function renderView(viewName, model, appEl) {
  if (current.dispose) { try { await current.dispose(); } catch {} }
  appEl.textContent = "";

  const htmlKey = `../views/${viewName}.html`;
  const jsKey   = `../views/${viewName}.js`;
  const loadHtml = viewHtmlMap[htmlKey];
  const loadJs   = viewJsMap[jsKey];

  if (!loadHtml || !loadJs) {
    const nf = viewHtmlMap["../views/NotFound.html"];
    const html = nf ? (await nf()).default : "<h1>Not Found</h1>";
    appEl.appendChild(toFragment(html));
    return;
  }

  const [htmlMod, mod] = await Promise.all([loadHtml(), loadJs()]);
  appEl.appendChild(toFragment(htmlMod.default));

  const cleanups = [];
  const ctx = {
    navigate(path, { params = {}, query = {} } = {}) {
      let out = path;
      Object.entries(params).forEach(([k,v]) => { out = out.replace(`:${k}`, encodeURIComponent(v)); });
      location.hash = buildHash(out, {}, query);
    },
    onCleanup(fn) { if (typeof fn === "function") cleanups.push(fn); },
  };

  const disposer = await mod.init?.(appEl, model, ctx);
  current.dispose = async () => {
    for (const fn of cleanups.splice(0)) { try { await fn(); } catch {} }
    if (typeof disposer === "function") await disposer();
    if (typeof mod.dispose === "function") await mod.dispose(appEl);
  };
}
```

#### I-4-2. `Users` view: events + interval + cleanup
`src/views/Users.html`
```html
<section>
  <h1 id="title"></h1>
  <button id="refresh">Refresh</button>
  <ul id="userList"></ul>
  <p>Tick: <span id="tick">0</span></p>
</section>
```

`src/views/Users.js`
```js
export async function init(host, model, ctx) {
  host.querySelector("#title").textContent = model.title;

  // 1) Click handler
  const btn = host.querySelector("#refresh");
  const onClick = () => console.log("[Users] refresh clicked");
  btn.addEventListener("click", onClick);
  ctx.onCleanup(() => btn.removeEventListener("click", onClick));

  // 2) Interval
  const tickEl = host.querySelector("#tick");
  let tick = 0;
  const id = setInterval(() => { tickEl.textContent = String(++tick); }, 1000);
  ctx.onCleanup(() => clearInterval(id));

  // 3) Render list (giữ đơn giản)
  const list = model.userIds || ["u123", "u456", "u789"];
  host.querySelector("#userList").innerHTML = list
    .map(id => `<li><a href="#/users/${id}">User ${id}</a></li>`)
    .join("");
}
```

#### I-4-3. `UserDetail` view: fetch + AbortController + cleanup
`src/views/UserDetail.html`
```html
<section>
  <h1 id="title"></h1>
  <p>ID: <code id="userId"></code></p>
  <pre id="data"></pre>
</section>
```

`src/views/UserDetail.js`
```js
export async function init(host, model, ctx) {
  host.querySelector("#title").textContent = model.title;
  host.querySelector("#userId").textContent = model.userId;

  const ac = new AbortController();
  const dataEl = host.querySelector("#data");

  // ví dụ fetch giả (có thể thay bằng real API)
  const p = new Promise((res) => setTimeout(() => res({ score: 100, id: model.userId }), 1500));

  let cancelled = false;
  ctx.onCleanup(() => { ac.abort(); cancelled = true; });

  try {
    const data = await p; // await fetch(url, { signal: ac.signal }).then(r=>r.json())
    if (!cancelled) dataEl.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    if (e.name !== "AbortError") console.error("[UserDetail] fetch error", e);
  }
}
```

#### I-4-4. Widget con: mount/unmount
`src/views/_widgets/Clock.js`
```js
export function mount(container) {
  let id; const span = document.createElement("span");
  container.appendChild(span);
  const update = () => span.textContent = new Date().toLocaleTimeString();
  update(); id = setInterval(update, 1000);
  return () => { clearInterval(id); container.removeChild(span); };
}
```

Sử dụng trong View:
```js
import { mount as mountClock } from "./_widgets/Clock.js";

export async function init(host, model, ctx) {
  const unmount = mountClock(host);
  ctx.onCleanup(() => unmount());
}
```

---

### 6. Change Log
| Version | Nội dung |
| --- | --- |
| 1.0 | Đặc tả vòng đời View và cơ chế cleanup; ví dụ Users/UserDetail, widget con |

---

## Feature 5 – Search Users

## 📚 Feature Documentation: Search & Results List (FR-5)

### 1. SRS – Feature Requirement Specification

#### 1.1 Mục đích
Cung cấp tính năng **tìm kiếm** và hiển thị **danh sách kết quả** theo truy vấn người dùng trên SPA, dùng cùng cơ chế router đã chuẩn hoá.

#### 1.2 Phạm vi
- Truy vấn qua **query string** (`q`) trên route hiện có.
- Kết quả hiển thị trong view danh sách, hỗ trợ phân trang đơn giản (client-side).
- Không gọi API ngoài phạm vi; dùng **service cục bộ** (mock) để demo cơ chế.

#### 1.3 Functional Requirements
- **FR-5-1**: Nhập truy vấn ở ô tìm kiếm → điều hướng đến route danh sách với `?q=<term>`.
- **FR-5-2**: Controller lấy `q` từ `query`, gọi service để trả về **kết quả lọc**.
- **FR-5-3**: View hiển thị kết quả; nếu rỗng → thông báo “Không có kết quả”.
- **FR-5-4**: Hỗ trợ phân trang client-side `page`, `pageSize` (tuỳ chọn, mặc định 50).
- **FR-5-5**: Bảo toàn truy vấn khi điều hướng (ví dụ chuyển trang vẫn giữ `q`).

#### 1.4 Non-functional
- Thời gian phản hồi với dữ liệu cục bộ ≤ 100ms.
- Lọc không phân biệt hoa/thường, bỏ dấu cơ bản (VN-friendly – tuỳ chọn).

---

### 2. Use Case / User Flow

#### UC-5-1: Tìm kiếm từ thanh nhập
1. Người dùng nhập từ khoá ở ô search → Enter.
2. Ứng dụng điều hướng `#/users?q=<term>`.
3. Kết quả hiển thị theo `term`.

#### UC-5-2: Không có kết quả
1. Điều hướng `#/users?q=<term-khong-co>`.
2. Controller trả danh sách rỗng → View hiển thị thông báo “Không có kết quả”.

#### UC-5-3: Phân trang kết quả
1. Điều hướng `#/users?q=u&page=2`.
2. View hiển thị trang 2, giữ nguyên `q` khi next/prev.

---

### 3. SDD – Thiết kế

#### 3.1 Route
Sử dụng **route đã chuẩn** từ FR‑2:  
- `#/users` (danh sách) + query `q`, `page`, `pageSize`.

#### 3.2 Service
`UserService.search(q)` trả về mảng `userIds` đã lọc; có thể thêm `normalize` để tìm **không dấu**.

#### 3.3 Controller
`UsersController.index(_params, query)` đọc `q`, `page`, `pageSize`; gọi service để có `userIds`, sau đó `return this.view("Users", { title, q, page, pageSize, total, userIds })`.

#### 3.4 View
`Users.html/js` hiển thị danh sách từ `model.userIds`, có thanh search (tối thiểu), giữ `q` trong input, và có điều hướng phân trang bằng `ctx.navigate("users", { query: { q, page } })`.

---

### 4. Test Plan / Test Cases

- **TC-5-1**: Nhập “u1” → `#/users?q=u1` → danh sách chỉ còn `u123` (mock).
- **TC-5-2**: Nhập chuỗi không khớp → hiển thị “Không có kết quả”.
- **TC-5-3**: `page` vượt quá số trang → danh sách rỗng nhưng vẫn giữ `q`.
- **TC-5-4**: Điều hướng qua lại giữa các trang → `q` không bị mất.
- **TC-5-5**: Tốc độ phản hồi ≤ 100ms với 1k bản ghi (mock).

---

### 5. Implementation / Source Code Overview

#### I-5-1. Service tìm kiếm
`src/services/UserService.js`
```js
// Mock data & search helpers cho FR-5
const USERS = ["u100","u101","u102","u103","u104","u105","u123","u456","u789"];

function normalize(s = "") {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export function search(term = "") {
  const q = normalize(term.trim());
  if (!q) return USERS.slice();
  return USERS.filter(id => normalize(id).includes(q));
}
```

#### I-5-2. Cập nhật UsersController.index để dùng search
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

  async detail(params) {
    return this.view("UserDetail", { title: "User Detail", userId: params.id });
  }
}
```

#### I-5-3. Cập nhật Users view (thanh search + phân trang)
`src/views/Users.html`
```html
<section>
  <h1 id="title"></h1>
  <form id="searchForm" class="row">
    <input id="q" placeholder="Search users..." />
    <button id="go" type="submit">Search</button>
  </form>

  <ul id="userList" class="grid"></ul>

  <nav class="pager">
    <button id="prev">Prev</button>
    <span id="pageInfo"></span>
    <button id="next">Next</button>
  </nav>

  <p id="empty" style="display:none">Không có kết quả</p>
</section>
```

`src/views/Users.js`
```js
export async function init(host, model, ctx) {
  host.querySelector("#title").textContent = model.title;

  // --- Search form ---
  const form = host.querySelector("#searchForm");
  const qInput = host.querySelector("#q");
  qInput.value = model.q || "";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    ctx.navigate("users", { query: { q: qInput.value || "", page: 1, pageSize: model.pageSize } });
  });
  ctx.onCleanup(() => form.removeEventListener("submit", () => {})); // form listener GC theo host, vẫn thêm cho nhất quán

  // --- Render list ---
  const listEl = host.querySelector("#userList");
  const emptyEl = host.querySelector("#empty");

  if (!model.userIds?.length) {
    listEl.innerHTML = "";
    emptyEl.style.display = "block";
  } else {
    emptyEl.style.display = "none";
    listEl.innerHTML = model.userIds
      .map(id => `<li><a href="#/users/${id}">${id}</a></li>`)
      .join("");
  }

  // --- Pager ---
  const prevBtn = host.querySelector("#prev");
  const nextBtn = host.querySelector("#next");
  const pageInfo = host.querySelector("#pageInfo");

  const totalPages = Math.max(1, Math.ceil((model.total || 0) / model.pageSize));
  pageInfo.textContent = `Page ${model.page} / ${totalPages}`;

  prevBtn.disabled = model.page <= 1;
  nextBtn.disabled = model.page >= totalPages;

  const toPage = (p) => ctx.navigate("users", { query: { q: model.q || "", page: p, pageSize: model.pageSize } });

  const onPrev = () => toPage(model.page - 1);
  const onNext = () => toPage(model.page + 1);

  prevBtn.addEventListener("click", onPrev);
  nextBtn.addEventListener("click", onNext);
  ctx.onCleanup(() => {
    prevBtn.removeEventListener("click", onPrev);
    nextBtn.removeEventListener("click", onNext);
  });
}
```

---

### 6. Change Log
| Version | Nội dung |
| --- | --- |
| 1.0 | Tìm kiếm & danh sách kết quả trên `#/users?q=...`, phân trang client, service cục bộ |

---

## Feature 6 – Detail Users

## 📚 Feature Documentation: Detail page by `:id` (FR-6)

### 1. SRS – Feature Requirement Specification

#### 1.1 Mục đích
Đặc tả **trang chi tiết** dựa trên route pattern có tham số động `:id` (kế thừa cơ chế FR‑2, hợp đồng FR‑3 và lifecycle FR‑4).

#### 1.2 Phạm vi
- Route chuẩn: `#/users/:id`.
- Controller lấy dữ liệu theo `id` thông qua service cục bộ.
- View hiển thị thông tin chi tiết và dọn dẹp đúng chuẩn.

#### 1.3 Functional Requirements
- **FR-6-1**: Router match `users/:id` → truyền `{ id }` vào controller.
- **FR-6-2**: Controller gọi `UserService.getById(id)` → trả `{ view:"UserDetail", model }`.
- **FR-6-3**: Không tìm thấy → trả `NotFound` với `path` tương ứng.
- **FR-6-4**: View `UserDetail` hiển thị đầy đủ trường và không rò rỉ tài nguyên khi rời trang.
- **FR-6-5**: Cho phép liên kết quay về danh sách, bảo toàn query (nếu có `q`, `page`).

#### 1.4 Non-functional
- Truy xuất dữ liệu cục bộ ≤ 50ms.
- View không gây reflow/relayout quá mức; cleanup đầy đủ (theo FR‑4).

---

### 2. Use Case / User Flow

#### UC-6-1: Vào trang chi tiết
1. Điều hướng `#/users/u123`.
2. Controller lấy dữ liệu `u123` → render `UserDetail`.

#### UC-6-2: Không tồn tại
1. Điều hướng `#/users/u404`.
2. Service không có `u404` → controller trả `NotFound` (`path: "users/u404"`).

#### UC-6-3: Quay lại danh sách, giữ truy vấn
1. Từ `UserDetail`, bấm “Quay lại”.
2. Điều hướng `#/users?q=<term>&page=<p>` nếu query tồn tại.

---

### 3. SDD – Thiết kế

#### 3.1 Route
- `users/:id` (đã khai báo trong FR‑2).

#### 3.2 Dữ liệu
- Service cục bộ `UserService.getById(id): User | null`.
- Cấu trúc `User` (mock): `{ id, name, email, score }`.

#### 3.3 Controller
- `UsersController.detail(params, query)`:
  - Validate `id`.
  - Gọi service, trả `NotFound` nếu null.
  - Trả `this.view("UserDetail", { user, title: user.name, backQuery: { q, page, pageSize } })`.

#### 3.4 View
- `UserDetail.html/js` hiển thị các trường, có nút “Quay lại” sử dụng `ctx.navigate("users", { query: backQuery })`.

---

### 4. Test Plan / Test Cases

- **TC-6-1**: `#/users/u123` → render UserDetail (đúng tên, email).
- **TC-6-2**: `#/users/u404` → NotFound với `path = "users/u404"`.
- **TC-6-3**: Từ `#/users?q=u&page=2` click một user → vào detail → “Quay lại” giữ `q` & `page`.
- **TC-6-4**: Điều hướng qua lại 20 lần giữa list/detail → không rò rỉ listeners.
- **TC-6-5**: Thời gian dựng view ≤ 50ms (mock).

---

### 5. Implementation / Source Code Overview

#### I-6-1. Service chi tiết người dùng
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

#### I-6-2. Controller detail
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

#### I-6-3. View chi tiết
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

### 6. Change Log
| Version | Nội dung |
| --- | --- |
| 1.0 | Trang chi tiết theo `:id` cho Users; giữ truy vấn khi quay lại danh sách |

---

## Feature 7 – Billing PRO giả lập

## 📚 Feature Documentation: PRO Package / Mock Billing (FR-7)

### 1. SRS – Feature Requirement Specification

#### 1.1 Mục đích
Cung cấp **luồng mua gói PRO (giả lập)** và cập nhật **entitlement** sau khi “trả về” từ cổng thanh toán, chạy độc lập với Auth (không yêu cầu đăng nhập).

#### 1.2 Phạm vi
- Route chuẩn: `#/pricing` và `#/billing/return`.
- Nút “Go PRO” chuyển đến “return URL” kèm tham số kết quả (giả lập).
- Cập nhật entitlement (`pro`) khi `status=success`.
- Điều hướng về trang tiếp theo (`next`) sau khi xử lý.

#### 1.3 Functional Requirements
- **FR-7-1**: `Pricing` hiển thị gói, bấm **Go PRO** → điều hướng tới `#/billing/return?...`.
- **FR-7-2**: `BillingReturn` đọc `query`, gọi `BillingService.capture(query)`.
- **FR-7-3**: Nếu `status=success` → set entitlement `pro=true`; nếu `failed` → giữ nguyên.
- **FR-7-4**: Sau khi xử lý, hiển thị kết quả và nút **Continue** trở về `next` (mặc định `/`).

#### 1.4 Non-functional
- Toàn bộ là **mock** (không gọi API thật).
- Thời gian xử lý ≤ 50ms.

---

### 2. Use Case / User Flow

#### UC-7-1: Mua PRO thành công
1. Người dùng mở `#/pricing`.
2. Bấm **Go PRO** → điều hướng `#/billing/return?status=success&plan=pro&tx=FAKE123&next=/users`.
3. `BillingReturn` gọi `BillingService.capture` → set entitlement `pro=true`.
4. Người dùng bấm **Continue** → quay về `/users`.

#### UC-7-2: Thanh toán thất bại
1. `#/pricing` → bấm **Go PRO** (giả lập `status=failed`).
2. `BillingReturn` hiển thị thất bại; **Continue** → quay lại `/pricing` hoặc `/`.

---

### 3. SDD – Thiết kế

#### 3.1 Route
- `pricing` → `BillingController.pricing`
- `billing/return` → `BillingController.return`

#### 3.2 Dịch vụ
- `EntitlementService` lưu/đọc entitlement cục bộ (`localStorage` + bộ nhớ tạm).
- `BillingService.capture(query)`:
  - Nếu `query.status === "success"` và `query.plan === "pro"` → `EntitlementService.set("pro", true)`.
  - Trả về `{ ok: boolean, plan, tx }`.

#### 3.3 Controller
- `pricing()` → `{ view:"Pricing", model:{ next } }`.
- `return(query)` → gọi `BillingService.capture(query)` → `{ view:"BillingReturn", model:{ ok, plan, tx, next } }`.

#### 3.4 View
- `Pricing` có nút **Go PRO** → điều hướng `billing/return` với `status`, `plan`, `tx`, `next`.
- `BillingReturn` hiển thị kết quả và nút **Continue** về `next`.

---

### 4. Test Plan / Test Cases

- **TC-7-1**: `#/pricing` → bấm **Go PRO** (success) → `#/billing/return?...` → `ok=true`, entitlement `pro=true`.
- **TC-7-2**: `#/pricing` → bấm **Go PRO** (failed) → `ok=false`, entitlement không đổi.
- **TC-7-3**: `Continue` điều hướng đúng `next`.
- **TC-7-4**: Refresh ở `#/billing/return?...` vẫn hiển thị đúng theo query (idempotent).

---

### 5. Implementation / Source Code Overview

#### I-7-1. EntitlementService
`src/services/EntitlementService.js`
```js
const KEY = "entitlements";
let cache = null;

function read() {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch { cache = {}; }
  return cache;
}

function write(obj) {
  cache = { ...(obj || {}) };
  localStorage.setItem(KEY, JSON.stringify(cache));
}

export function get(name) {
  return !!read()[name];
}

export function set(name, value) {
  const cur = read();
  cur[name] = !!value;
  write(cur);
}

export function all() { return { ...read() }; }
```

#### I-7-2. BillingService (mock)
`src/services/BillingService.js`
```js
import * as Ent from "./EntitlementService.js";

export async function capture(query = {}) {
  const status = String(query.status || "");
  const plan = String(query.plan || "");
  const tx = String(query.tx || "");

  let ok = false;
  if (status === "success" && plan === "pro") {
    Ent.set("pro", true);
    ok = true;
  }
  return { ok, plan, tx };
}
```

#### I-7-3. BillingController
`src/controllers/BillingController.js`
```js
import { BaseController } from "../app/base-controller.js";
import * as Billing from "../services/BillingService.js";

export default class BillingController extends BaseController {
  async pricing(_params, query) {
    return this.view("Pricing", { next: query?.next || "/" });
  }

  async return(_params, query) {
    const { ok, plan, tx } = await Billing.capture(query);
    const next = query?.next || "/";
    return this.view("BillingReturn", { ok, plan, tx, next });
  }
}
```

#### I-7-4. Views

`src/views/Pricing.html`
```html
<section>
  <h1>Go PRO</h1>
  <p>Unlock features with PRO plan.</p>
  <button id="goSuccess">Go PRO (success)</button>
  <button id="goFail">Go PRO (failed)</button>
</section>
```

`src/views/Pricing.js`
```js
export async function init(host, model, ctx) {
  const next = model?.next || "/";

  const go = (status) => {
    const tx = "FAKE" + Math.floor(Math.random() * 10000);
    ctx.navigate("billing/return", {
      query: { status, plan: "pro", tx, next }
    });
  };

  const okBtn = host.querySelector("#goSuccess");
  const failBtn = host.querySelector("#goFail");

  const onOk = () => go("success");
  const onFail = () => go("failed");

  okBtn.addEventListener("click", onOk);
  failBtn.addEventListener("click", onFail);

  ctx.onCleanup(() => {
    okBtn.removeEventListener("click", onOk);
    failBtn.removeEventListener("click", onFail);
  });
}
```

`src/views/BillingReturn.html`
```html
<section>
  <h1 id="title"></h1>
  <ul>
    <li><strong>Status:</strong> <span id="status"></span></li>
    <li><strong>Plan:</strong> <span id="plan"></span></li>
    <li><strong>TX:</strong> <code id="tx"></code></li>
  </ul>
  <button id="cont">Continue</button>
</section>
```

`src/views/BillingReturn.js`
```js
export async function init(host, model, ctx) {
  const { ok, plan, tx, next } = model;

  host.querySelector("#title").textContent = ok ? "Payment Success" : "Payment Failed";
  host.querySelector("#status").textContent = ok ? "success" : "failed";
  host.querySelector("#plan").textContent = plan || "-";
  host.querySelector("#tx").textContent = tx || "-";

  const btn = host.querySelector("#cont");
  const onClick = () => ctx.navigate(next.replace(/^\//,""));
  btn.addEventListener("click", onClick);
  ctx.onCleanup(() => btn.removeEventListener("click", onClick));
}
```

#### I-7-5. Bổ sung routes (không sửa FR‑2, chỉ **mở rộng** khi bật FR‑7)
`src/app/router.js`
```js
import BillingController from "../controllers/BillingController.js";

export function startRouter(appEl) {
  const routes = [
    // ... các route đã có từ FR‑2
    { pattern: "pricing",        ctrl: BillingController, action: "pricing" },
    { pattern: "billing/return", ctrl: BillingController, action: "return"  },
  ];
  start(appEl, routes);
}
```

> Lưu ý: Việc thêm route vào `router.js` là bước hợp lệ khi **enable FR‑7**. FR‑2 vẫn độc lập, không phụ thuộc FR‑7.

---

### 6. Change Log
| Version | Nội dung |
| --- | --- |
| 1.0 | Gói PRO/Thanh toán giả lập; entitlement cập nhật sau return; routes `pricing`, `billing/return` |

---

## Feature 8 – Auth + Guard

## 📚 Feature Documentation: Basic Auth & Guards (FR-8)

### 1. SRS – Feature Requirement Specification

#### 1.1 Mục đích
Bổ sung **xác thực cơ bản (mock)** và **guards** để:
- Chặn truy cập vào route yêu cầu đăng nhập.
- Chuyển hướng đến trang đăng nhập kèm tham số `next`, và quay lại sau khi đăng nhập.

#### 1.2 Phạm vi
- Không tích hợp OAuth/real backend; **AuthService** mock + `localStorage`.
- Route chính thức của FR‑8: `#/login`, `#/logout`, và **ít nhất một** route được gắn cờ `requireAuth: true` (ví dụ: `#/account`).
- Cơ chế guard tích hợp vào `system.start(...)` thông qua tham số `guards`.

#### 1.3 Functional Requirements
- **FR-8-1**: `guards.ensureAuth()` trả `true/false` thể hiện trạng thái đăng nhập.
- **FR-8-2**: Route có `requireAuth: true` → nếu chưa đăng nhập, redirect `#/login?next=<path>`.
- **FR-8-3**: `Login` view cho phép “đăng nhập” (mock) và điều hướng về `next` (mặc định `/`).
- **FR-8-4**: `Logout` xoá trạng thái đăng nhập và quay về `Home`.
- **FR-8-5**: Guard **không** làm treo ứng dụng; có thể dùng cùng `beforeEach/beforeEnter`.

#### 1.4 Non-functional
- Tác vụ đăng nhập/đăng xuất ≤ 10ms (cục bộ).
- Không rò rỉ listeners giữa các lần mở trang `Login`.

---

### 2. Use Case / User Flow

#### UC-8-1: Truy cập trang cần đăng nhập
1. Người dùng mở `#/account` (được gắn `requireAuth: true`).
2. Chưa đăng nhập → hệ thống redirect `#/login?next=/account`.

#### UC-8-2: Đăng nhập và quay lại
1. Ở `#/login`, người dùng bấm “Đăng nhập” (mock).
2. Hệ thống chuyển đến `next` (nếu có) hoặc `/`.

#### UC-8-3: Đăng xuất
1. Người dùng mở `#/logout`.
2. Trạng thái đăng nhập bị xoá, điều hướng về Home.

---

### 3. SDD – Thiết kế

#### 3.1 Guards: hợp đồng & trình tự
- `start(appEl, routes, guards)` trong `system.js` sẽ gọi theo thứ tự:
  1) `guards.beforeEach?(ctx)` → có thể trả `false` để huỷ điều hướng.
  2) Nếu route có `requireAuth`, chạy `guards.ensureAuth?({ ctx })`.
     - `false` → `ctx.navigate("login", { query: { next: "/<rawPath>" } })` và **dừng**.
  3) `route.beforeEnter?({ params, query, ctx })`.

#### 3.2 Route chính thức khi **bật FR‑8**
- `login` → `AuthController.login`
- `logout` → `AuthController.logout`
- `account` (ví dụ route cần đăng nhập) → `AccountController.index` với `requireAuth: true`

> Lưu ý: FR‑2 vẫn độc lập. Việc bổ sung route dưới đây chỉ áp dụng **khi kích hoạt FR‑8**.

---

### 4. Test Plan / Test Cases

- **TC-8-1**: Chưa login, truy cập `#/account` → redirect `#/login?next=/account`.
- **TC-8-2**: Tại `#/login` bấm “Đăng nhập” → điều hướng về `/account`.
- **TC-8-3**: Tại `#/logout` → quay về Home, `ensureAuth()` trả `false`.
- **TC-8-4**: `beforeEach` trả `false` → huỷ điều hướng (tuỳ chọn).
- **TC-8-5**: Điều hướng qua lại 20 lần giữa `login/account` → không rò rỉ listeners.

---

### 5. Implementation / Source Code Overview

#### I-8-1. AuthService (mock)
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

#### I-8-2. AuthController
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

#### I-8-3. AccountController (route cần đăng nhập)
`src/controllers/AccountController.js`
```js
import { BaseController } from "../app/base-controller.js";

export default class AccountController extends BaseController {
  async index() {
    return this.view("Account", { title: "Tài khoản của tôi" });
  }
}
```

#### I-8-4. Views
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

#### I-8-5. Bổ sung routes & guards khi **bật FR‑8**
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

### 6. Change Log
| Version | Nội dung |
| --- | --- |
| 1.0 | Auth mock + guards; routes login/logout/account; redirect với `next` |

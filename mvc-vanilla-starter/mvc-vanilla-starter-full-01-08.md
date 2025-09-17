# MVC Vanilla Starter – Full Example (Features 01→08)

> Gói **đầy đủ có thể chạy** bao gồm Setup, Routing, Controller, View lifecycle, Search, Detail, Billing (PRO mock) và Auth + Guard.  
> Cách chạy:
>
> ```bash
> npm i
> npm run dev
> ```
>
> Mặc định chạy bằng Vite. Toàn bộ mã dưới đây tách file theo cấu trúc thư mục.

---

## 📂 Cấu trúc thư mục

```
mvc-vanilla-starter/
├─ index.html
├─ package.json
└─ src/
   ├─ app/
   │  ├─ main.js
   │  ├─ router.js
   │  ├─ route-table.js
   │  ├─ system.js
   │  └─ base-controller.js
   ├─ controllers/
   │  ├─ HomeController.js
   │  ├─ UsersController.js
   │  ├─ UserDetailController.js
   │  ├─ PricingController.js
   │  ├─ BillingReturnController.js
   │  ├─ LoginController.js
   │  └─ AccountController.js
   ├─ guards/
   │  └─ auth-guard.js
   ├─ services/
   │  ├─ users-service.js
   │  ├─ billing-service.js
   │  ├─ entitlement-service.js
   │  └─ auth-service.js
   └─ views/
      ├─ Home.html
      ├─ Home.js
      ├─ Users.html
      ├─ Users.js
      ├─ UserDetail.html
      ├─ UserDetail.js
      ├─ Pricing.html
      ├─ Pricing.js
      ├─ BillingReturn.html
      ├─ BillingReturn.js
      ├─ Login.html
      ├─ Login.js
      ├─ Account.html
      └─ Account.js
```

---

## 📄 package.json

```json
{
  "name": "mvc-vanilla-starter",
  "private": true,
  "type": "module",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.4.0"
  }
}
```

---

## 📄 index.html

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MVC Vanilla Starter – 01→08</title>
    <style>
      body {
        font-family: system-ui, sans-serif;
        margin: 24px;
      }
      nav a {
        margin-right: 12px;
      }
      .empty {
        opacity: 0.7;
        font-style: italic;
      }
      .pill {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 999px;
        background: #eee;
      }
      form > * {
        margin-right: 8px;
      }
      .muted {
        color: #666;
      }
    </style>
  </head>
  <body>
    <nav>
      <a href="#/">Home</a>
      <a href="#/users">Users</a>
      <a href="#/pricing">Pricing</a>
      <a href="#/account">Account</a>
    </nav>
    <main id="app"></main>
    <script type="module" src="/src/app/main.js"></script>
  </body>
</html>
```

---

## 📄 src/app/base-controller.js

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

---

## 📄 src/app/route-table.js

```js
import HomeController from "../controllers/HomeController.js";
import UsersController from "../controllers/UsersController.js";
import UserDetailController from "../controllers/UserDetailController.js";
import PricingController from "../controllers/PricingController.js";
import BillingReturnController from "../controllers/BillingReturnController.js";
import LoginController from "../controllers/LoginController.js";
import AccountController from "../controllers/AccountController.js";

import { requireAuth } from "../guards/auth-guard.js";

// Mỗi route: { name, pattern, controller, action, guard? }
export const routes = [
  { name: "home", pattern: "", controller: HomeController, action: "index" },
  {
    name: "users",
    pattern: "users",
    controller: UsersController,
    action: "index",
  },
  {
    name: "user-detail",
    pattern: "users/:id",
    controller: UserDetailController,
    action: "show",
  },

  {
    name: "pricing",
    pattern: "pricing",
    controller: PricingController,
    action: "index",
  },
  {
    name: "bill-return",
    pattern: "billing/return",
    controller: BillingReturnController,
    action: "return",
  },

  {
    name: "login",
    pattern: "login",
    controller: LoginController,
    action: "index",
  },
  {
    name: "account",
    pattern: "account",
    controller: AccountController,
    action: "index",
    guard: requireAuth,
  },

  {
    name: "not-found",
    pattern: "*",
    controller: HomeController,
    action: "notfound",
  },
];
```

---

## 📄 src/app/router.js

```js
import { routes } from "./route-table.js";
import { start } from "./system.js";

let appEl = null;

function compile(pattern) {
  const keys = [];
  if (pattern === "*") return { re: /^.*$/, keys };
  const norm = pattern.replace(/^\/|\/$/g, "");
  const re = new RegExp(
    "^" +
      norm.replace(/:([^/]+)/g, (_, k) => {
        keys.push(k);
        return "([^/]+)";
      }) +
      "$"
  );
  return { re, keys };
}

const compiled = routes.map((r) => ({ ...r, ...compile(r.pattern) }));

function parseHash() {
  const raw = (location.hash || "#").slice(1);
  const [path, qs] = raw.split("?");
  const query = Object.fromEntries(new URLSearchParams(qs || ""));
  return { path: path.replace(/^\/|\/$/g, ""), query };
}

function matchRoute(path) {
  for (const r of compiled) {
    const m = r.re.exec(path);
    if (m) {
      const params = {};
      r.keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1])));
      return { route: r, params };
    }
  }
  return null;
}

export function navigate(name, params = {}, query = {}) {
  const r = routes.find((x) => x.name === name);
  if (!r) throw new Error(`Unknown route: ${name}`);
  let path = r.pattern.replace(/:([^/]+)/g, (_, k) =>
    encodeURIComponent(params[k] ?? "")
  );
  const hash =
    "#" +
    (path ? "/" + path : "/") +
    (Object.keys(query).length
      ? "?" + new URLSearchParams(query).toString()
      : "");
  if (location.hash === hash) {
    handle();
  } else {
    location.hash = hash;
  }
}

export function startRouter(el) {
  appEl = el;
  window.addEventListener("hashchange", handle);
  window.addEventListener("load", handle);
  handle();
}

async function handle() {
  const { path, query } = parseHash();
  const m = matchRoute(path);
  const to = m ?? { route: routes.find((r) => r.pattern === "*"), params: {} };
  await start(appEl, to, { navigate });
}
```

---

## 📄 src/app/system.js

```js
let currentCleanup = [];
let currentDispose = null;
let currentViewModule = null;

function resetCleanup() {
  for (const fn of currentCleanup.splice(0)) {
    try {
      fn();
    } catch {}
  }
  if (typeof currentDispose === "function") {
    try {
      currentDispose();
    } catch {}
  }
  currentDispose = null;
}

const htmlModules = import.meta.glob("../views/**/*.html", { as: "raw" });
const jsModules = import.meta.glob("../views/**/*.js");

async function loadViewParts(viewName) {
  const base = `../views/${viewName}`;
  const [htmlLoader, jsLoader] = [
    htmlModules[`${base}.html`],
    jsModules[`${base}.js`],
  ];
  if (!htmlLoader) throw new Error(`View template not found: ${viewName}.html`);
  const [html, jsMod] = await Promise.all([
    htmlLoader(),
    jsLoader ? jsLoader() : null,
  ]);
  return { html, jsMod };
}

async function runAction(Controller, action, params, query, ctx) {
  const controller = new Controller();
  if (typeof controller[action] !== "function")
    throw new Error(`Action ${action} not implemented`);
  const result = await controller[action](params, query, ctx);
  if (!result || typeof result.view !== "string")
    throw new Error("Controller must return { view, model }");
  return result;
}

async function runGuard(guard, ctx) {
  if (typeof guard !== "function") return { allow: true };
  try {
    const r = await guard(ctx);
    return r && typeof r.allow === "boolean" ? r : { allow: true };
  } catch {
    return { allow: true };
  }
}

export async function start(appEl, to, helpers) {
  const ctxShell = { appEl, navigate: helpers.navigate };
  const { route, params } = to;
  const query = new URLSearchParams(location.hash.split("?")[1] || "");

  const queryObj = Object.fromEntries(query.entries());
  const fullCtx = {
    ...ctxShell,
    params,
    query: queryObj,
    onCleanup(fn) {
      currentCleanup.push(fn);
    },
  };

  // Guard (nếu có)
  const guardResult = await runGuard(route.guard, fullCtx);
  if (!guardResult.allow) {
    const g = guardResult.redirect || { name: "login", params: {}, query: {} };
    helpers.navigate(g.name, g.params, g.query);
    return;
  }

  const result = await runAction(
    route.controller,
    route.action,
    params,
    queryObj,
    fullCtx
  );
  const { html, jsMod } = await loadViewParts(result.view);

  resetCleanup();
  appEl.innerHTML = html.replace(
    /\{\{(\w+)\}\}/g,
    (_, k) => result.model?.[k] ?? ""
  );

  currentViewModule = jsMod || null;
  if (currentViewModule?.init) {
    const maybe = await currentViewModule.init({
      ...fullCtx,
      model: result.model,
      onCleanup(fn) {
        currentCleanup.push(fn);
      },
    });
    if (maybe && typeof maybe.dispose === "function")
      currentDispose = maybe.dispose;
    if (maybe && typeof maybe.update === "function")
      currentViewModule.update = maybe.update;
  }
}
```

---

## 📄 src/app/main.js

```js
import { startRouter } from "./router.js";

const appEl = document.getElementById("app");
startRouter(appEl);
```

---

## 📄 src/guards/auth-guard.js

```js
import { AuthService } from "../services/auth-service.js";

export async function requireAuth(ctx) {
  if (AuthService.isAuthenticated()) return { allow: true };
  const next = location.hash.slice(1) || "/account";
  return {
    allow: false,
    redirect: { name: "login", params: {}, query: { next } },
  };
}
```

---

## 📄 src/services/users-service.js

```js
const defaultUsers = [
  {
    id: 1,
    name: "Leanne Graham",
    email: "leanne@example.com",
    role: "admin",
    plan: "free",
  },
  {
    id: 2,
    name: "Ervin Howell",
    email: "ervin@example.com",
    role: "member",
    plan: "pro",
  },
  {
    id: 3,
    name: "Clementine",
    email: "clem@example.com",
    role: "member",
    plan: "free",
  },
  {
    id: 4,
    name: "Patricia",
    email: "pat@example.com",
    role: "member",
    plan: "free",
  },
  {
    id: 5,
    name: "Chelsey",
    email: "chelsey@example.com",
    role: "member",
    plan: "pro",
  },
  {
    id: 6,
    name: "Dennis",
    email: "dennis@example.com",
    role: "member",
    plan: "free",
  },
];

export class UsersService {
  constructor(data = defaultUsers) {
    this.data = data;
  }

  list({ q = "", page = 1, pageSize = 5 } = {}) {
    const s = q.trim().toLowerCase();
    const filtered = this.data.filter((u) =>
      [u.name, u.email].some((v) => v.toLowerCase().includes(s))
    );
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    return { items, total, page, pageSize, q };
  }

  async getById(id) {
    return this.data.find((u) => String(u.id) === String(id)) ?? null;
  }
}
```

---

## 📄 src/services/billing-service.js

```js
// Fake billing service: tạo transaction và trả status (success/cancel/error)
export const BillingService = {
  async createTransaction({ plan = "pro-monthly" } = {}) {
    // Trong thực tế sẽ call API; ở đây mock một id và chờ 300ms
    const id = "txn_" + Math.random().toString(36).slice(2, 9);
    await new Promise((r) => setTimeout(r, 300));
    return { id, plan };
  },
};
```

---

## 📄 src/services/entitlement-service.js

```js
const KEY = "entitlement:isPro";

export const EntitlementService = {
  isPro() {
    return localStorage.getItem(KEY) === "1";
  },
  setPro(v) {
    if (v) localStorage.setItem(KEY, "1");
    else localStorage.removeItem(KEY);
    const ev = new CustomEvent("entitlement:change", { detail: { isPro: v } });
    window.dispatchEvent(ev);
  },
};
```

---

## 📄 src/services/auth-service.js

```js
const AUTH_KEY = "auth:user";

function readUser() {
  const raw = localStorage.getItem(AUTH_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function writeUser(u) {
  if (!u) localStorage.removeItem(AUTH_KEY);
  else localStorage.setItem(AUTH_KEY, JSON.stringify(u));
  window.dispatchEvent(new CustomEvent("auth:change", { detail: { user: u } }));
}

export const AuthService = {
  getUser() {
    return readUser();
  },
  isAuthenticated() {
    return !!readUser();
  },

  async login(username, password) {
    // Mock: username bất kỳ, password "123" là hợp lệ
    await new Promise((r) => setTimeout(r, 200));
    if (password !== "123") throw new Error("Sai mật khẩu (gợi ý: 123)");
    const user = {
      id: 1,
      name: username || "Guest",
      email: `${username || "guest"}@example.com`,
    };
    writeUser(user);
    return user;
  },

  logout() {
    writeUser(null);
  },
};
```

---

## 📄 src/controllers/HomeController.js

```js
import { BaseController } from "../app/base-controller.js";
import { EntitlementService } from "../services/entitlement-service.js";
import { AuthService } from "../services/auth-service.js";

export default class HomeController extends BaseController {
  index() {
    return this.view("Home", {
      title: "Home",
      isPro: EntitlementService.isPro(),
      user: AuthService.getUser(),
    });
  }
  notfound() {
    return this.view("Home", { title: "Không tìm thấy trang" });
  }
}
```

---

## 📄 src/controllers/UsersController.js

```js
import { BaseController } from "../app/base-controller.js";
import { UsersService } from "../services/users-service.js";

export default class UsersController extends BaseController {
  constructor() {
    super();
    this.usersService = new UsersService();
  }

  async index(params, query) {
    const page = Math.max(parseInt(query.page ?? "1", 10) || 1, 1);
    const pageSize = Math.max(parseInt(query.pageSize ?? "5", 10) || 5, 1);
    const q = (query.q ?? "").trim();
    const result = this.usersService.list({ q, page, pageSize });
    return this.view("Users", { ...result });
  }
}
```

---

## 📄 src/controllers/UserDetailController.js

```js
import { BaseController } from "../app/base-controller.js";
import { UsersService } from "../services/users-service.js";

export default class UserDetailController extends BaseController {
  constructor() {
    super();
    this.usersService = new UsersService();
  }

  async show(params, query) {
    const user = await this.usersService.getById(params.id);
    if (!user) {
      return this.view("UserDetail", {
        notFound: true,
        id: params.id,
        backQuery: query,
      });
    }
    return this.view("UserDetail", {
      user,
      backQuery: query,
    });
  }
}
```

---

## 📄 src/controllers/PricingController.js

```js
import { BaseController } from "../app/base-controller.js";
import { EntitlementService } from "../services/entitlement-service.js";

export default class PricingController extends BaseController {
  index() {
    return this.view("Pricing", {
      isPro: EntitlementService.isPro(),
    });
  }
}
```

---

## 📄 src/controllers/BillingReturnController.js

```js
import { BaseController } from "../app/base-controller.js";
import { EntitlementService } from "../services/entitlement-service.js";

export default class BillingReturnController extends BaseController {
  async return(params, query) {
    const status = (query.status || "success").toLowerCase();
    if (status === "success") EntitlementService.setPro(true);
    else if (status === "cancel") EntitlementService.setPro(false);
    // error -> giữ nguyên entitlement, chỉ hiển thị
    return this.view("BillingReturn", { status });
  }
}
```

---

## 📄 src/controllers/LoginController.js

```js
import { BaseController } from "../app/base-controller.js";

export default class LoginController extends BaseController {
  index(params, query) {
    return this.view("Login", { next: query.next || "/account" });
  }
}
```

---

## 📄 src/controllers/AccountController.js

```js
import { BaseController } from "../app/base-controller.js";
import { AuthService } from "../services/auth-service.js";
import { EntitlementService } from "../services/entitlement-service.js";

export default class AccountController extends BaseController {
  index() {
    const user = AuthService.getUser();
    return this.view("Account", {
      user,
      isPro: EntitlementService.isPro(),
    });
  }
}
```

---

## 📄 src/views/Home.html

```html
<section>
  <h1>{{title}}</h1>
  <p>Demo MVC Vanilla Starter.</p>
  <p class="muted">
    User: {{user?.name||Guest}} · Entitlement:
    <span class="pill">{{isPro?PRO:FREE}}</span>
  </p>
</section>
```

## 📄 src/views/Home.js

```js
export function init(ctx) {
  // Demo: phím tắt
  const onKey = (e) => {
    if (e.key === "u") ctx.navigate("users");
  };
  window.addEventListener("keydown", onKey);
  ctx.onCleanup(() => window.removeEventListener("keydown", onKey));
}
```

---

## 📄 src/views/Users.html

```html
<section>
  <h1>Users</h1>
  <form data-role="search">
    <input
      type="search"
      name="q"
      placeholder="Search name/email"
      value="{{q||}}"
    />
    <button>Search</button>
  </form>

  <div id="result"></div>
  <nav id="pager"></nav>
</section>
```

## 📄 src/views/Users.js

```js
export function init(ctx) {
  const { model } = ctx;
  const form = ctx.appEl.querySelector('form[data-role="search"]');
  const result = ctx.appEl.querySelector("#result");
  const pager = ctx.appEl.querySelector("#pager");

  function renderList() {
    if (!model.items.length) {
      result.innerHTML = `<p class="empty">Không tìm thấy người dùng.</p>`;
      pager.innerHTML = "";
      return;
    }
    result.innerHTML = model.items
      .map(
        (u) =>
          `<div><a href="#/users/${u.id}">${u.name}</a> <small>${u.email}</small></div>`
      )
      .join("");

    const totalPages = Math.max(1, Math.ceil(model.total / model.pageSize));
    const prevDisabled = model.page <= 1 ? "disabled" : "";
    const nextDisabled = model.page >= totalPages ? "disabled" : "";
    pager.innerHTML = `
      <button data-act="prev" ${prevDisabled}>Prev</button>
      <span>Page ${model.page}/${totalPages}</span>
      <button data-act="next" ${nextDisabled}>Next</button>
    `;
  }

  function onSubmit(e) {
    e.preventDefault();
    const data = new FormData(form);
    const q = (data.get("q") || "").toString();
    ctx.navigate("users", {}, { q, page: 1, pageSize: model.pageSize });
  }

  function onPager(e) {
    const act = e.target?.dataset?.act;
    if (!act) return;
    const q = ctx.model.q || "";
    const nextPage = act === "prev" ? ctx.model.page - 1 : ctx.model.page + 1;
    ctx.navigate(
      "users",
      {},
      { q, page: nextPage, pageSize: ctx.model.pageSize }
    );
  }

  form.addEventListener("submit", onSubmit);
  pager.addEventListener("click", onPager);
  ctx.onCleanup(() => {
    form.removeEventListener("submit", onSubmit);
    pager.removeEventListener("click", onPager);
  });

  renderList();
}
```

---

## 📄 src/views/UserDetail.html

```html
<section>
  <h1>User Detail</h1>
  <div id="zone"></div>
  <button id="back">Quay lại</button>
</section>
```

## 📄 src/views/UserDetail.js

```js
export function init(ctx) {
  const z = ctx.appEl.querySelector("#zone");
  const b = ctx.appEl.querySelector("#back");
  const m = ctx.model;

  if (m.notFound) {
    z.innerHTML = `<p>User #${m.id} không tồn tại.</p>`;
  } else {
    const u = m.user;
    z.innerHTML = `
      <div><b>${u.name}</b> — <small>${u.email}</small></div>
      <div>Role: ${u.role} · Plan: ${u.plan.toUpperCase()}</div>
    `;
  }

  function goBack() {
    ctx.navigate("users", {}, m.backQuery || {});
  }
  b.addEventListener("click", goBack);
  ctx.onCleanup(() => b.removeEventListener("click", goBack));
}
```

---

## 📄 src/views/Pricing.html

```html
<section>
  <h1>Pricing</h1>
  <p>Gói hiện tại: <span class="pill">{{isPro?PRO:FREE}}</span></p>
  <button id="buy-pro">Mua PRO (mock)</button>
  <p class="muted">
    *Demo chuyển hướng về billing/return với status success|cancel|error.
  </p>
  <div>
    <a href="#/billing/return?status=success">Giả lập Success</a> |
    <a href="#/billing/return?status=cancel">Giả lập Cancel</a> |
    <a href="#/billing/return?status=error">Giả lập Error</a>
  </div>
</section>
```

## 📄 src/views/Pricing.js

```js
import { BillingService } from "../services/billing-service.js";

export function init(ctx) {
  const btn = ctx.appEl.querySelector("#buy-pro");
  async function onBuy() {
    const txn = await BillingService.createTransaction({ plan: "pro-monthly" });
    // Chuyển thẳng sang return success (mock)
    ctx.navigate("bill-return", {}, { status: "success", id: txn.id });
  }
  btn.addEventListener("click", onBuy);
  ctx.onCleanup(() => btn.removeEventListener("click", onBuy));
}
```

---

## 📄 src/views/BillingReturn.html

```html
<section>
  <h1>Billing Return</h1>
  <p>Kết quả giao dịch: <b>{{status}}</b></p>
  <div>
    <a href="#/account">Tới Account</a> |
    <a href="#/">Về Home</a>
  </div>
</section>
```

## 📄 src/views/BillingReturn.js

```js
export function init() {}
```

---

## 📄 src/views/Login.html

```html
<section>
  <h1>Login</h1>
  <form id="login">
    <input name="username" placeholder="username" required />
    <input
      name="password"
      placeholder="password (123)"
      type="password"
      required
    />
    <button>Đăng nhập</button>
  </form>
  <p class="muted">
    Gợi ý: password là <code>123</code>. Sau khi login sẽ chuyển tới
    <code>{{next}}</code>.
  </p>
</section>
```

## 📄 src/views/Login.js

```js
import { AuthService } from "../services/auth-service.js";

export function init(ctx) {
  const form = ctx.appEl.querySelector("#login");
  async function onSubmit(e) {
    e.preventDefault();
    const data = new FormData(form);
    const username = data.get("username");
    const password = data.get("password");
    try {
      await AuthService.login(username, password);
      const next = ctx.model.next || "/account";
      // next là hash path không dấu #
      const [path, qs] = String(next).split("?");
      if (path.startsWith("/")) {
        const route = path.replace(/^\//, "");
        const query = Object.fromEntries(new URLSearchParams(qs || ""));
        // best effort: nếu route trùng name
        ctx.navigate(route || "account", {}, query);
      } else {
        ctx.navigate("account");
      }
    } catch (err) {
      alert(err.message || "Login thất bại");
    }
  }
  form.addEventListener("submit", onSubmit);
  ctx.onCleanup(() => form.removeEventListener("submit", onSubmit));
}
```

---

## 📄 src/views/Account.html

```html
<section>
  <h1>Account</h1>
  <div id="zone"></div>
  <p>
    <button id="logout">Đăng xuất</button>
  </p>
</section>
```

## 📄 src/views/Account.js

```js
import { AuthService } from "../services/auth-service.js";
import { EntitlementService } from "../services/entitlement-service.js";

export function init(ctx) {
  const z = ctx.appEl.querySelector("#zone");
  const b = ctx.appEl.querySelector("#logout");

  function render() {
    const user = AuthService.getUser();
    const isPro = EntitlementService.isPro();
    z.innerHTML = `
      <div><b>${user?.name || "Unknown"}</b> — <small>${
      user?.email || "-"
    }</small></div>
      <div class="muted">Entitlement: <span class="pill">${
        isPro ? "PRO" : "FREE"
      }</span></div>
    `;
  }

  function onLogout() {
    AuthService.logout();
    ctx.navigate("home");
  }

  b.addEventListener("click", onLogout);
  ctx.onCleanup(() => b.removeEventListener("click", onLogout));

  render();
}
```

# 📘 MVC Vanilla Starter – Specification & Implementation (Star)

> Kiến trúc: **Router mỏng** (map `pattern → { ctrl, action }`) · **Controller quyết định View + Model** (`return this.view("ViewName", model)`) · **system.js** gom toàn bộ hàm hệ thống · **View = .html + .js** (nhận `(host, model, ctx)`) · **Widget thuần module** (có cleanup).

---

## 0) Mục tiêu & Phạm vi

- Tạo **starter** có thể dùng lại cho các tính năng: browse/search, chi tiết theo `:id`, PRO/payments, auth/guards.
- Không framework (Vanilla + Vite/Static). Chuẩn hóa tài liệu theo SRS/SDD/Test/Impl/Runbook.

---

## 1) SRS – Software Requirements Specification

### 1.1 Mục đích

Cung cấp khung ứng dụng web theo mẫu MVC-vanilla, dễ mở rộng, rõ trách nhiệm (router/controller/view), phù hợp sản phẩm có tìm kiếm, trang kết quả, chi tiết, và gói PRO.

### 1.2 Phạm vi

- Frontend SPA hash-based (`#/path?query`).
- Module hóa: controller/service/widget/view.
- Guards: `requireAuth`, `requirePro`, `beforeEnter`.
- Chi trả (giả lập) & entitlement "pro".

### 1.3 Yêu cầu chức năng (FR)

- **FR-1**: Điều hướng theo route pattern (hỗ trợ `:id`).
- **FR-2**: Controller action trả `{ view, model }` quyết định render.
- **FR-3**: View nhận `model`, dựng UI, gắn sự kiện; cleanup khi rời trang.
- **FR-4**: Tìm kiếm & danh sách kết quả.
- **FR-5**: Trang chi tiết theo `:id`.
- **FR-6**: Gói PRO/Thanh toán giả lập; entitlement cập nhật sau return.
- **FR-7**: Auth cơ bản (mock) + guards.

### 1.4 Phi chức năng (NFR)

- NFR-1: **TTI nhanh** – dynamic import theo view; cache HTML partials.
- NFR-2: **Không rò rỉ** – cleanup events với `onCleanup()`.
- NFR-3: **Đọc/lập trình dễ** – view không phụ thuộc router; helpers được tiêm.
- NFR-4: Triển khai static (Vite build), không cần SSR.

---

## 2) Use Cases & Luồng

- **UC-1**: Người dùng nhập từ khóa → `#/results?q=...` → xem kết quả.
- **UC-2**: Click một item → `#/words/:id` → xem chi tiết.
- **UC-3**: Mua PRO → chuyển cổng (giả) → quay về `#/billing/return` → entitlement `pro`.
- **UC-4**: Route yêu cầu PRO → nếu chưa đăng nhập → `#/login`; nếu chưa PRO → `#/pricing`.

Sơ đồ luồng chính: Router → Controller(action) → `{view, model}` → system.renderView(view, model) → View.init(host, model, ctx) → Widgets/Events.

---

## 3) Kiến trúc (SDD)

### 3.1 Các lớp/Module

- **Router**: ánh xạ pattern → `{ ctrl, action, flags }` và khởi động `system.start()`.
- **system.js**: parse hash, match pattern `:id`, cache HTML, dynamic import JS theo view, inject helpers (`navigate`, `onCleanup`, `$`, `$all`), guards.
- **Controller**: tạo dữ liệu (gọi service), trả `this.view(ViewName, model)`.
- **Service**: business/data (mock hoặc gọi API).
- **View**: `.html + .js`; `init(host, model, ctx)` dựng UI.
- **Widgets**: thành phần UI tái dùng; trả hàm `unmount()`.

### 3.2 Dữ liệu

- Search data mock (`id`, `word`, `meaning_vi`, `pos`). Có `perform(q)` và `getById(id)`.

### 3.3 Điều hướng & Guards

- Pattern ví dụ: "", "results", "words/:id", "pro/lesson".
- Flags: `requireAuth`, `requirePro`; guard global `beforeEach`, per-route `beforeEnter`.

---

## 4) Test Plan (trích)

- **TC-1**: `#/results?q=ap` hiển thị danh sách đúng; Enter trên Home điều hướng hợp lệ.
- **TC-2**: `#/words/w1` render chi tiết đúng.
- **TC-3**: Route `pro/lesson` khi chưa login → `#/login?next=...`.
- **TC-4**: Đã login nhưng chưa PRO → `#/pricing?next=...`.
- **TC-5**: `#/billing/return?status=success` cập nhật entitlement `pro`.
- **TC-6**: Khi chuyển route, listeners cũ bị cleanup (không trùng lặp sự kiện).

---

## 5) Implementation / Source Overview (Starter)

### 5.0 Setup dự án

```bash
# Tạo project Vite với template Vanilla
npm create vite@latest mvc-vanilla-starter --template vanilla
cd mvc-vanilla-starter

# Cài đặt dependencies
npm install

# Chạy dev server
npm run dev
```

### 5.1 Cấu trúc thư mục

```
index.html
/src
  /app
    main.js
    router.js
    system.js
    base-controller.js
  /controllers
    HomeController.js
    ResultsController.js
    WordsController.js
    BillingController.js
  /services
    AuthService.js
    PaymentService.js
    SearchService.js
  /views
    Home.html
    Home.js
    Results.html
    Results.js
    WordDetail.html
    WordDetail.js
    Pricing.html
    Pricing.js
    BillingReturn.html
    BillingReturn.js
    Login.html
    Login.js
    NotFound.html
    NotFound.js
  /widgets
    SearchBox.js
    List.js
```

### 5.2 Mapping FR → Code

- **FR-1 (Router pattern :id)** → `system.js (compile, matchRoute)` + `router.js`
- **FR-2 (Controller quyết định View)** → `BaseController.view()` + các `*Controller.js`
- **FR-3 (View nhận model, cleanup)** → `system.js.renderView()` + các `View.js`
- **FR-4 (Search & kết quả)** → `ResultsController.js` + `SearchService.js` + `Results.html/js`
- **FR-5 (Chi tiết theo id)** → `WordsController.detail()` + `WordDetail.html/js`
- **FR-6 (Thanh toán PRO)** → `BillingController`, `PaymentService.js`, `Pricing.html/js`, `BillingReturn.html/js`
- **FR-7 (Auth + Guards)** → `AuthService.js`, guard trong `router.js`, `Login.html/js`

### 5.3 Mã nguồn chi tiết

#### `index.html`

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MVC Starter</title>
    <style>
      body {
        font-family: system-ui, sans-serif;
        margin: 0;
        padding: 24px;
      }
      .grid {
        display: grid;
      }
      .gap-3 {
        gap: 12px;
      }
      .gap-4 {
        gap: 16px;
      }
      .flex {
        display: flex;
      }
      .items-center {
        align-items: center;
      }
      .gap-2 {
        gap: 8px;
      }
      .border {
        border: 1px solid #ddd;
      }
      .rounded {
        border-radius: 8px;
      }
      .px-3 {
        padding-left: 12px;
        padding-right: 12px;
      }
      .py-2 {
        padding: 8px 12px;
      }
      .flex-1 {
        flex: 1;
      }
      a {
        color: #0a58ca;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <nav class="flex gap-2">
      <a href="#/">Home</a>
      <a href="#/results">Results</a>
      <a href="#/words/w1">Word w1</a>
      <a href="#/pricing">Pricing (PRO)</a>
      <a href="#/login">Login</a>
    </nav>
    <hr />
    <div id="app"></div>
    <script type="module" src="/src/app/main.js"></script>
  </body>
</html>
```

#### `/src/app/base-controller.js`

```js
export class BaseController {
  view(name, model = {}) {
    return { view: name, model };
  }
}
```

#### `/src/app/system.js`

```js
const htmlCache = new Map();
let current = { dispose: null };

async function fetchHTML(path) {
  if (htmlCache.has(path)) return htmlCache.get(path);
  const res = await fetch(path, { cache: "force-cache" });
  const txt = await res.text();
  htmlCache.set(path, txt);
  return txt;
}
function toFragment(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content;
}
function buildHash(path, params = {}, query = {}) {
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

export function parseHash() {
  const raw = location.hash.replace(/^#\/?/, "");
  const [p, qs] = raw.split("?");
  return {
    rawPath: (p || "").replace(/(^\/+|\/+$$)/g, ""),
    query: Object.fromEntries(new URLSearchParams(qs || "")),
  };
}

export async function renderView(viewName, model, appEl) {
  if (current.dispose)
    try {
      await current.dispose();
    } catch {}
  appEl.textContent = "";
  const [html, mod] = await Promise.all([
    fetchHTML(`/src/views/${viewName}.html`),
    import(`/src/views/${viewName}.js`),
  ]);
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
    for (const fn of cleanups.splice(0))
      try {
        await fn();
      } catch {}
    if (typeof disposer === "function") await disposer();
    if (typeof mod.dispose === "function") await mod.dispose(appEl);
  };
}

export async function runAction(Controller, action, params, query, ctx) {
  const ctrl = new Controller();
  return await ctrl[action](params, query, ctx);
}

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

#### `/src/app/router.js`

```js
import { start } from "./system.js";
import HomeController from "../controllers/HomeController.js";
import ResultsController from "../controllers/ResultsController.js";
import WordsController from "../controllers/WordsController.js";
import BillingController from "../controllers/BillingController.js";
import Auth from "../services/AuthService.js";

export function startRouter(appEl) {
  const routes = [
    { pattern: "", ctrl: HomeController, action: "index" },
    { pattern: "results", ctrl: ResultsController, action: "index" },
    { pattern: "words/:id", ctrl: WordsController, action: "detail" },
    {
      pattern: "pro/lesson",
      ctrl: WordsController,
      action: "proLesson",
      requireAuth: true,
      requirePro: true,
    },
    { pattern: "billing/return", ctrl: BillingController, action: "return" },
    { pattern: "login", ctrl: Auth.Controller, action: "login" },
    { pattern: "pricing", ctrl: BillingController, action: "pricing" },
  ];
  const guards = {
    async beforeEach() {
      return true;
    },
    async ensureAuth() {
      return Auth.isLoggedIn();
    },
    async ensurePro() {
      return Auth.hasEntitlement("pro");
    },
  };
  start(appEl, routes, guards);
}
```

#### `/src/app/main.js`

```js
import { startRouter } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  startRouter(app);
});
```

#### Controllers

`/src/controllers/HomeController.js`

```js
import { BaseController } from "../app/base-controller.js";
export default class HomeController extends BaseController {
  async index(params) {
    return this.view("Home", { title: "Home", q: params?.q ?? "" });
  }
}
```

`/src/controllers/ResultsController.js`

```js
import { BaseController } from "../app/base-controller.js";
import * as SearchService from "../services/SearchService.js";
export default class ResultsController extends BaseController {
  async index(params, query) {
    const q = (query?.q || "").trim();
    const items = await SearchService.perform(q);
    return this.view("Results", { title: "Kết quả", q, items });
  }
}
```

`/src/controllers/WordsController.js`

```js
import { BaseController } from "../app/base-controller.js";
import * as SearchService from "../services/SearchService.js";
export default class WordsController extends BaseController {
  async detail(params) {
    const id = params.id;
    const item = await SearchService.getById(id);
    if (!item) return this.view("NotFound", { path: `words/${id}` });
    return this.view("WordDetail", { title: item.word, item });
  }
  async proLesson(params, query) {
    return this.view("ProLesson", {
      title: "PRO Lesson",
      part: query?.part || 1,
    });
  }
}
```

`/src/controllers/BillingController.js`

```js
import { BaseController } from "../app/base-controller.js";
import Payment from "../services/PaymentService.js";
export default class BillingController extends BaseController {
  async pricing(params, query) {
    return this.view("Pricing", { plan: "pro", next: query?.next || "/" });
  }
  async return(params, query) {
    const res = await Payment.handleReturn(query);
    return this.view("BillingReturn", {
      result: res,
      next: query?.next || "/",
    });
  }
}
```

#### Services

`/src/services/AuthService.js`

```js
const state = { user: null, tokens: null };
const Auth = {
  isLoggedIn() {
    return !!state.user;
  },
  hasEntitlement(name) {
    return !!state.user?.entitlements?.includes(name);
  },
  getUser() {
    return state.user;
  },
  async login(email, pw) {
    state.user = { id: "u1", email, entitlements: [] };
    return state.user;
  },
  async logout() {
    state.user = null;
    state.tokens = null;
  },
  Controller: class {
    async login(params, query) {
      return { view: "Login", model: { next: query?.next || "/" } };
    }
  },
};
export default Auth;
```

`/src/services/PaymentService.js`

```js
const Payment = {
  async startCheckout({ plan = "pro", successPath = "billing/return" } = {}) {
    location.hash = `#/${successPath}?status=success&plan=${plan}`;
  },
  async handleReturn(query) {
    if (query.status === "success") {
      const Auth = (await import("./AuthService.js")).default;
      const u = Auth.getUser();
      if (u && !u.entitlements.includes("pro")) u.entitlements.push("pro");
      return { ok: true, message: "Thanh toán thành công" };
    }
    return { ok: false, message: "Thanh toán thất bại" };
  },
};
export default Payment;
```

`/src/services/SearchService.js`

```js
const data = [
  { id: "w1", word: "apple", meaning_vi: "quả táo", pos: "noun" },
  { id: "w2", word: "apply", meaning_vi: "nộp/áp dụng", pos: "verb" },
  { id: "w3", word: "banana", meaning_vi: "chuối", pos: "noun" },
];
export async function perform(q) {
  if (!q) return [];
  return data.filter((x) => x.word.toLowerCase().includes(q.toLowerCase()));
}
export async function getById(id) {
  return data.find((x) => x.id === id) || null;
}
```

#### Views

`/src/views/Home.html`

```html
<section class="grid gap-4">
  <h1 id="title"></h1>
  <div id="searchZone"></div>
</section>
```

`/src/views/Home.js`

```js
import { mountSearchBox } from "../widgets/SearchBox.js";
export async function init(host, model, { navigate, onCleanup, $ }) {
  $(host, "#title").textContent = model.title;
  const un = mountSearchBox($(host, "#searchZone"), {
    value: model.q,
    onSubmit(q) {
      navigate("results", { query: { q } });
    },
  });
  onCleanup(un);
}
```

`/src/views/Results.html`

```html
<section class="grid gap-4">
  <div id="searchZone"></div>
  <h2 id="title"></h2>
  <div id="listZone"></div>
</section>
```

`/src/views/Results.js`

```js
import { mountSearchBox } from "../widgets/SearchBox.js";
import { renderList } from "../widgets/List.js";
export async function init(host, model, { navigate, onCleanup, $ }) {
  $(host, "#title").textContent = model.title;
  const un = mountSearchBox($(host, "#searchZone"), {
    value: model.q,
    onSubmit(q) {
      navigate("results", { query: { q } });
    },
  });
  onCleanup(un);
  renderList($(host, "#listZone"), model.items);
}
```

`/src/views/WordDetail.html`

```html
<section class="grid gap-3">
  <h1 id="title"></h1>
  <div id="detail"></div>
</section>
```

`/src/views/WordDetail.js`

```js
export async function init(host, model, { $, navigate }) {
  $(host, "#title").textContent = model.title;
  const item = model.item;
  $(host, "#detail").innerHTML = `
    <div><b>${item.word}</b> – ${item.meaning_vi}</div>
    <div>POS: ${item.pos || "-"}</div>
    <a href="javascript:void(0)" id="back">← Back</a>
  `;
  $(host, "#back").addEventListener("click", () => navigate(""));
}
```

`/src/views/Pricing.html`

```html
<section class="grid gap-4">
  <h1>Chọn gói PRO</h1>
  <button id="choosePro" class="border rounded px-3 py-2">Mua PRO</button>
</section>
```

`/src/views/Pricing.js`

```js
import Payment from "../services/PaymentService.js";
export async function init(host, model, { $, onCleanup }) {
  $(host, "#choosePro")?.addEventListener("click", async () => {
    await Payment.startCheckout({ plan: "pro", successPath: "billing/return" });
  });
}
```

`/src/views/BillingReturn.html`

```html
<section class="grid gap-3">
  <h1>Kết quả thanh toán</h1>
  <p id="msg"></p>
  <a id="go" href="javascript:void(0)">Về trang trước</a>
</section>
```

`/src/views/BillingReturn.js`

```js
export async function init(host, model, { $, navigate }) {
  $(host, "#msg").textContent = model.result.ok ? "Thành công 🎉" : "Thất bại";
  $(host, "#go").addEventListener("click", () =>
    navigate(model.next.replace(/^#\//, ""))
  );
}
```

`/src/views/Login.html`

```html
<section class="grid gap-3">
  <h1>Đăng nhập</h1>
  <form id="f">
    <input id="email" placeholder="email" />
    <input id="pw" type="password" placeholder="mật khẩu" />
    <button>Đăng nhập</button>
  </form>
</section>
```

`/src/views/Login.js`

```js
import Auth from "../services/AuthService.js";
export async function init(host, model, { $, navigate }) {
  const f = $(host, "#f");
  f.addEventListener("submit", async (e) => {
    e.preventDefault();
    await Auth.login($(host, "#email").value, $(host, "#pw").value);
    navigate(model.next.replace(/^#\//, ""));
  });
}
```

`/src/views/NotFound.html`

```html
<section class="grid gap-3">
  <h1>404</h1>
  <p>Không tìm thấy: <code id="path"></code></p>
</section>
```

`/src/views/NotFound.js`

```js
export async function init(host, model, { $ }) {
  $(host, "#path").textContent = model.path || "";
}
```

#### Widgets

`/src/widgets/SearchBox.js`

```js
export function mountSearchBox(container, { value = "", onSubmit } = {}) {
  container.innerHTML = `
    <form class="flex gap-2 items-center">
      <input id="q" placeholder="Search..." class="border rounded px-3 py-2 flex-1" />
      <button type="submit" class="border rounded px-3 py-2">Search</button>
    </form>`;
  const form = container.querySelector("form");
  const input = container.querySelector("#q");
  input.value = value;
  const ac = new AbortController();
  form.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      onSubmit?.(input.value.trim());
    },
    { signal: ac.signal }
  );
  return () => ac.abort();
}
```

`/src/widgets/List.js`

```js
export function renderList(container, items) {
  container.innerHTML = items?.length
    ? items.map((x) => `<div>${x.word} – ${x.meaning_vi}</div>`).join("")
    : `<p>Không có kết quả.</p>`;
}
```

---

## 6) Runbook

- Dev: `npm run dev` (Vite), mở `#/`, test `#/results?q=app`, `#/words/w1`, `#/pricing`, `#/login`.
- Build: `npm run build` → deploy static hosting.
- Mở rộng: thêm controller/action → thêm 1 dòng route; thêm view → tạo cặp `.html/.js` cùng tên.

---

## 7) Change Log

| Version | Nội dung                                                                        |
| ------- | ------------------------------------------------------------------------------- |
| 1.0     | Starter MVC Vanilla (router mỏng, controller→view, guards, payment mock, `:id`) |

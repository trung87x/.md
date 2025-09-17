# 📚 Feature Documentation: Setup Vanilla Starter (Optimized)

> Mục tiêu: tạo khung Vite + Vanilla JS tối thiểu, chạy được Home, hỗ trợ route và fallback 404.

## 1. SRS

### 1.1 Mục đích

Thiết lập nền tảng MVC Vanilla Starter để các tính năng sau (routing, controller, view, search, auth, pro) có thể phát triển nhanh.

### 1.2 Phạm vi

- Dự án Vite template `vanilla`
- Cấu trúc `/src` cơ bản
- Khởi tạo `system/router/controller/view`
- Render Home, có 404

### 1.3 Functional Requirements

- **FR-1: Setup Vanilla Starter**
  - FR-1-1: Khởi tạo dự án (Vite)
  - FR-1-2: Cài dependencies
  - FR-1-3: Tạo cấu trúc thư mục
  - FR-1-4: Viết `system.js`, `router.js`, `base-controller.js`
  - FR-1-5: Tạo Home view và chạy được

### 1.4 Non-functional

- Setup ≤ 5 phút, ES Module, dễ mở rộng

---

## 2. Use Case

### UC-1: Khởi tạo dự án

- UC-1-1: Tạo project → `npm create vite@latest ... --template vanilla`
- UC-1-2: Chạy thử → `npm run dev` → mở `http://localhost:5173`

---

## 3. SDD

### 3.1 Cấu trúc thư mục

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

### 3.2 Luồng khởi động

`index.html` → `main.js` → `startRouter()` → match route → controller trả `{view, model}` → `renderView(view, model)`.

---

## 4. Test Plan

- **TC-1-1**: `npm run dev` → `#/` hiển thị Home
- **TC-1-2**: Route không tồn tại → NotFound
- **TC-1-3**: Không lỗi runtime khi đổi route liên tục

---

## 5. Implementation / Source Code Overview

### I-1-1. Khởi tạo dự án

```bash
npm create vite@latest mvc-vanilla-starter --template vanilla
cd mvc-vanilla-starter
npm install
npm run dev
```

### I-1-2. Base Controller

```js
// src/app/base-controller.js
export class BaseController {
  view(name, model = {}) {
    return { view: name, model };
  }
}
```

### I-1-3. Router cơ bản

```js
// src/app/router.js
import { start } from "./system.js";
import HomeController from "../controllers/HomeController.js";

export function startRouter(appEl) {
  const routes = [{ pattern: "", ctrl: HomeController, action: "index" }];
  start(appEl, routes);
}
```

### I-1-4. System Skeleton

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

### I-1-5. Home Controller + View

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

### I-1-6. Main.js

```js
import { startRouter } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  startRouter(app);
});
```

### I-1-7. NotFound

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

### I-1-8. index.html

```html
<!-- index.html -->
<div id="app"></div>
<script type="module" src="/src/app/main.js"></script>
```

---

## 6. Change Log / Version History

| Version | Nội dung                 |
| ------- | ------------------------ |
| 1.0     | Khởi tạo Vanilla Starter |

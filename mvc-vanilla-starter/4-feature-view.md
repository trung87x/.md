# 📚 Feature Documentation: View lifecycle & cleanup (FR-4)

## 1. SRS – Feature Requirement Specification

### 1.1 Mục đích
Chuẩn hoá **vòng đời View**: cách View khởi tạo UI từ `model`, đăng ký sự kiện/tài nguyên, và **dọn dẹp đầy đủ** (listeners/timers/fetch) khi điều hướng sang View khác, tránh rò rỉ bộ nhớ.

### 1.2 Phạm vi
- View là cặp file `src/views/<Name>.html` + `src/views/<Name>.js`.
- Hàm bắt buộc: `init(host, model, ctx)`; hàm tùy chọn: `dispose(host)`.
- Hỗ trợ **cleanup** qua `ctx.onCleanup(fn)` và/hoặc giá trị trả về của `init` (disposer).
- Không sử dụng framework; dùng chuẩn DOM + AbortController.

### 1.3 Functional Requirements
- **FR-4-1**: View dựng UI từ `model` trong `init(host, model, ctx)`.
- **FR-4-2**: Mọi listener/timer/subscription của View phải được **đăng ký cleanup**.
- **FR-4-3**: Khi route đổi, hệ thống gọi toàn bộ cleanup trước khi render View mới.
- **FR-4-4**: `init` **có thể trả về** một hàm disposer để dọn dẹp bổ sung.
- **FR-4-5**: Hỗ trợ huỷ request bất đồng bộ (fetch) bằng `AbortController` hoặc signal tương đương.

### 1.4 Non-functional
- Dọn dẹp hoàn tất ≤ 50ms cho View thông thường.
- Không để lại listener/timer “mồ côi” sau 100 lần điều hướng liên tiếp (stress test).

---

## 2. Use Case / User Flow

### UC-4-1: Gắn sự kiện và dọn dẹp khi rời View
1. `Users` view đăng ký click handler và interval cập nhật.
2. Điều hướng sang View khác → cleanup chạy, không còn handler/interval tồn tại.

### UC-4-2: Hủy request đang chạy khi rời View
1. `UserDetail` view gọi `fetch(...)` với `AbortController`.
2. Điều hướng trước khi fetch hoàn tất → `abort()` được gọi, không ném lỗi chưa xử lý.

### UC-4-3: Dọn dẹp widget con
1. View mount một widget con (trả về hàm unmount).
2. Điều hướng → hàm unmount chạy, giải phóng tài nguyên widget.

---

## 3. SDD – Thiết kế

### 3.1 Chuẩn hàm View
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

### 3.2 Cơ chế cleanup trong system
- `system.renderView()` tạo **danh sách cleanup**.
- Mọi `ctx.onCleanup(fn)` sẽ được đẩy vào danh sách.
- Nếu `init` trả về hàm, hàm đó cũng được thêm vào cuối danh sách.
- Trước khi render View mới, system gọi lần lượt các cleanup theo thứ tự đăng ký.

> Cơ chế này đã có từ FR-1; FR-4 đặc tả **bắt buộc** các View phải đăng ký cleanup đúng chuẩn.

---

## 4. Test Plan / Test Cases

- **TC-4-1**: `Users` view gắn click handler; điều hướng 50 lần → **không tăng** số handler còn treo (kiểm tra bằng counter trong console).
- **TC-4-2**: `Users` view tạo `setInterval`; điều hướng → interval bị clear.
- **TC-4-3**: `UserDetail` view tạo `fetch` với `AbortController`; điều hướng trước khi hoàn tất → request bị abort, không có unhandled rejection.
- **TC-4-4**: Widget con trả về `unmount`; điều hướng → `unmount` được gọi.
- **TC-4-5**: `dispose(host)` (nếu có) được gọi sau khi cleanup từ `init`.

---

## 5. Implementation / Source Code Overview

### I-4-1. `system.renderView` (nhắc lại cơ chế cleanup)
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

### I-4-2. `Users` view: events + interval + cleanup
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

### I-4-3. `UserDetail` view: fetch + AbortController + cleanup
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

### I-4-4. Widget con: mount/unmount
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

## 6. Change Log
| Version | Nội dung |
| --- | --- |
| 1.0 | Đặc tả vòng đời View và cơ chế cleanup; ví dụ Users/UserDetail, widget con |

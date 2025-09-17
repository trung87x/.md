# 📚 Feature Documentation: PRO Package / Mock Billing (FR-7)

## 1. SRS – Feature Requirement Specification

### 1.1 Mục đích
Cung cấp **luồng mua gói PRO (giả lập)** và cập nhật **entitlement** sau khi “trả về” từ cổng thanh toán, chạy độc lập với Auth (không yêu cầu đăng nhập).

### 1.2 Phạm vi
- Route chuẩn: `#/pricing` và `#/billing/return`.
- Nút “Go PRO” chuyển đến “return URL” kèm tham số kết quả (giả lập).
- Cập nhật entitlement (`pro`) khi `status=success`.
- Điều hướng về trang tiếp theo (`next`) sau khi xử lý.

### 1.3 Functional Requirements
- **FR-7-1**: `Pricing` hiển thị gói, bấm **Go PRO** → điều hướng tới `#/billing/return?...`.
- **FR-7-2**: `BillingReturn` đọc `query`, gọi `BillingService.capture(query)`.
- **FR-7-3**: Nếu `status=success` → set entitlement `pro=true`; nếu `failed` → giữ nguyên.
- **FR-7-4**: Sau khi xử lý, hiển thị kết quả và nút **Continue** trở về `next` (mặc định `/`).

### 1.4 Non-functional
- Toàn bộ là **mock** (không gọi API thật).
- Thời gian xử lý ≤ 50ms.

---

## 2. Use Case / User Flow

### UC-7-1: Mua PRO thành công
1. Người dùng mở `#/pricing`.
2. Bấm **Go PRO** → điều hướng `#/billing/return?status=success&plan=pro&tx=FAKE123&next=/users`.
3. `BillingReturn` gọi `BillingService.capture` → set entitlement `pro=true`.
4. Người dùng bấm **Continue** → quay về `/users`.

### UC-7-2: Thanh toán thất bại
1. `#/pricing` → bấm **Go PRO** (giả lập `status=failed`).
2. `BillingReturn` hiển thị thất bại; **Continue** → quay lại `/pricing` hoặc `/`.

---

## 3. SDD – Thiết kế

### 3.1 Route
- `pricing` → `BillingController.pricing`
- `billing/return` → `BillingController.return`

### 3.2 Dịch vụ
- `EntitlementService` lưu/đọc entitlement cục bộ (`localStorage` + bộ nhớ tạm).
- `BillingService.capture(query)`:
  - Nếu `query.status === "success"` và `query.plan === "pro"` → `EntitlementService.set("pro", true)`.
  - Trả về `{ ok: boolean, plan, tx }`.

### 3.3 Controller
- `pricing()` → `{ view:"Pricing", model:{ next } }`.
- `return(query)` → gọi `BillingService.capture(query)` → `{ view:"BillingReturn", model:{ ok, plan, tx, next } }`.

### 3.4 View
- `Pricing` có nút **Go PRO** → điều hướng `billing/return` với `status`, `plan`, `tx`, `next`.
- `BillingReturn` hiển thị kết quả và nút **Continue** về `next`.

---

## 4. Test Plan / Test Cases

- **TC-7-1**: `#/pricing` → bấm **Go PRO** (success) → `#/billing/return?...` → `ok=true`, entitlement `pro=true`.
- **TC-7-2**: `#/pricing` → bấm **Go PRO** (failed) → `ok=false`, entitlement không đổi.
- **TC-7-3**: `Continue` điều hướng đúng `next`.
- **TC-7-4**: Refresh ở `#/billing/return?...` vẫn hiển thị đúng theo query (idempotent).

---

## 5. Implementation / Source Code Overview

### I-7-1. EntitlementService
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

### I-7-2. BillingService (mock)
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

### I-7-3. BillingController
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

### I-7-4. Views

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

### I-7-5. Bổ sung routes (không sửa FR‑2, chỉ **mở rộng** khi bật FR‑7)
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

## 6. Change Log
| Version | Nội dung |
| --- | --- |
| 1.0 | Gói PRO/Thanh toán giả lập; entitlement cập nhật sau return; routes `pricing`, `billing/return` |

# 📚 Feature Documentation: Search & Results List (FR-5)

## 1. SRS – Feature Requirement Specification

### 1.1 Mục đích
Cung cấp tính năng **tìm kiếm** và hiển thị **danh sách kết quả** theo truy vấn người dùng trên SPA, dùng cùng cơ chế router đã chuẩn hoá.

### 1.2 Phạm vi
- Truy vấn qua **query string** (`q`) trên route hiện có.
- Kết quả hiển thị trong view danh sách, hỗ trợ phân trang đơn giản (client-side).
- Không gọi API ngoài phạm vi; dùng **service cục bộ** (mock) để demo cơ chế.

### 1.3 Functional Requirements
- **FR-5-1**: Nhập truy vấn ở ô tìm kiếm → điều hướng đến route danh sách với `?q=<term>`.
- **FR-5-2**: Controller lấy `q` từ `query`, gọi service để trả về **kết quả lọc**.
- **FR-5-3**: View hiển thị kết quả; nếu rỗng → thông báo “Không có kết quả”.
- **FR-5-4**: Hỗ trợ phân trang client-side `page`, `pageSize` (tuỳ chọn, mặc định 50).
- **FR-5-5**: Bảo toàn truy vấn khi điều hướng (ví dụ chuyển trang vẫn giữ `q`).

### 1.4 Non-functional
- Thời gian phản hồi với dữ liệu cục bộ ≤ 100ms.
- Lọc không phân biệt hoa/thường, bỏ dấu cơ bản (VN-friendly – tuỳ chọn).

---

## 2. Use Case / User Flow

### UC-5-1: Tìm kiếm từ thanh nhập
1. Người dùng nhập từ khoá ở ô search → Enter.
2. Ứng dụng điều hướng `#/users?q=<term>`.
3. Kết quả hiển thị theo `term`.

### UC-5-2: Không có kết quả
1. Điều hướng `#/users?q=<term-khong-co>`.
2. Controller trả danh sách rỗng → View hiển thị thông báo “Không có kết quả”.

### UC-5-3: Phân trang kết quả
1. Điều hướng `#/users?q=u&page=2`.
2. View hiển thị trang 2, giữ nguyên `q` khi next/prev.

---

## 3. SDD – Thiết kế

### 3.1 Route
Sử dụng **route đã chuẩn** từ FR‑2:  
- `#/users` (danh sách) + query `q`, `page`, `pageSize`.

### 3.2 Service
`UserService.search(q)` trả về mảng `userIds` đã lọc; có thể thêm `normalize` để tìm **không dấu**.

### 3.3 Controller
`UsersController.index(_params, query)` đọc `q`, `page`, `pageSize`; gọi service để có `userIds`, sau đó `return this.view("Users", { title, q, page, pageSize, total, userIds })`.

### 3.4 View
`Users.html/js` hiển thị danh sách từ `model.userIds`, có thanh search (tối thiểu), giữ `q` trong input, và có điều hướng phân trang bằng `ctx.navigate("users", { query: { q, page } })`.

---

## 4. Test Plan / Test Cases

- **TC-5-1**: Nhập “u1” → `#/users?q=u1` → danh sách chỉ còn `u123` (mock).
- **TC-5-2**: Nhập chuỗi không khớp → hiển thị “Không có kết quả”.
- **TC-5-3**: `page` vượt quá số trang → danh sách rỗng nhưng vẫn giữ `q`.
- **TC-5-4**: Điều hướng qua lại giữa các trang → `q` không bị mất.
- **TC-5-5**: Tốc độ phản hồi ≤ 100ms với 1k bản ghi (mock).

---

## 5. Implementation / Source Code Overview

### I-5-1. Service tìm kiếm
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

### I-5-2. Cập nhật UsersController.index để dùng search
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

### I-5-3. Cập nhật Users view (thanh search + phân trang)
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

## 6. Change Log
| Version | Nội dung |
| --- | --- |
| 1.0 | Tìm kiếm & danh sách kết quả trên `#/users?q=...`, phân trang client, service cục bộ |

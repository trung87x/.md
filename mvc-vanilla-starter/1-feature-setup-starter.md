# Feature 1 · Setup – Khởi tạo khung Vite + MVC

> **Mục tiêu trọng tâm:** khởi động dự án Vite template `vanilla`, dựng khung kiến trúc MVC tối thiểu và đảm bảo bộ đôi router–controller hoạt động với Home/404 ngay từ ngày đầu.

## 1. Mục tiêu & Phạm vi
- Thiết lập cấu trúc thư mục chuẩn cho dự án SPA nhỏ gọn.
- Tạo skeleton cho ba thành phần lõi: `system.js`, `router.js`, `base-controller.js`.
- Đảm bảo Home route (`#/`) được render và route lạ rơi vào NotFound.
- Phạm vi không bao gồm business feature; chỉ tập trung hạ tầng khởi động.

## 2. Thành phần chính
| Module | Vai trò | Ghi chú triển khai |
| --- | --- | --- |
| `system.js` | Điều phối vòng đời view, lazy-load template | Expose `start()` nhận danh sách route và root element. |
| `router.js` | Lắng nghe hashchange, match route, gọi controller | Cung cấp `startRouter(appEl)` và helper điều hướng. |
| `base-controller.js` | Chuẩn hóa action trả `{ view, model }` | Cấp helper `this.view(name, model)`.

## 3. Yêu cầu chức năng
- **FR-1: Khởi tạo dự án** – tạo app qua `npm create vite@latest ... --template vanilla`, cấu hình `package.json` với scripts `dev`, `build`, `preview`.
- **FR-2: Chuẩn hóa cấu trúc thư mục** – tạo các thư mục `src/app`, `src/controllers`, `src/views` với file mẫu Home/NotFound.
- **FR-3: Bootstrap hệ thống** – `main.js` mount app element, khởi động router.
- **FR-4: Điều hướng cơ bản** – Route `/` dùng `HomeController#index`, route khác dùng `NotFoundController#index`.
- **FR-5: Hỗ trợ hot reload** – đảm bảo import theo ESModule, không dùng dynamic require.

## 4. Thiết kế giải pháp
### 4.1 Cấu trúc thư mục
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
   │  ├─ HomeController.js
   │  └─ NotFoundController.js
   └─ views/
      ├─ Home.html / Home.js
      └─ NotFound.html / NotFound.js
```

### 4.2 Luồng khởi động
1. `main.js` lấy DOM root (`#app`).
2. Khởi tạo danh sách route và gọi `startRouter(rootEl)`.
3. `router.js` đăng ký lắng nghe `hashchange` & `load`, parse path.
4. `router.js` gọi `system.start(appEl, routes)` để điều phối action.
5. `system.js` match route, lazy-load view HTML/JS, inject model, gọi lifecycle `init`.

### 4.3 Pseudocode mấu chốt
```js
// router.js
export function startRouter(appEl) {
  const routes = [
    { pattern: "", controller: HomeController, action: "index" },
    { pattern: "*", controller: NotFoundController, action: "index" }
  ];
  start(appEl, routes);
}
```

## 5. Use Case chính
- **UC-1: Tạo dự án** – Dev chạy lệnh scaffold, mở dự án trong IDE.
- **UC-2: Chạy dev server** – `npm run dev` → trình duyệt mở Home.
- **UC-3: Điều hướng thủ công** – nhập `#/abc` → NotFound.

## 6. Kế hoạch kiểm thử
| ID | Mục tiêu | Bước thực hiện | Kết quả mong đợi |
| --- | --- | --- | --- |
| TC-1 | Khởi tạo thành công | Chạy script scaffold | Sinh đúng cấu trúc, không lỗi cài đặt. |
| TC-2 | Render Home | `npm run dev` → truy cập `#/` | Trang Home load, không lỗi console. |
| TC-3 | Fallback 404 | Điều hướng `#/random` | Thấy NotFound view. |
| TC-4 | Reload | Refresh trang bất kỳ | Router khởi động lại, view khớp hash. |

## 7. Ghi chú triển khai
- Luôn export mặc định controller để router import đơn giản.
- Dùng `import.meta.glob` trong `system.js` để Vite bundle tĩnh.
- Tránh thao tác DOM trực tiếp ngoài view để giữ controller thuần logic.
- Thiết lập ESLint/Prettier ngay từ đầu nếu team cần coding guideline.


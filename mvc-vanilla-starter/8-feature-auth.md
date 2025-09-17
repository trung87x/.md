# Feature 8 · Auth – Đăng nhập/guard route account

> **Mục tiêu trọng tâm:** cung cấp cơ chế đăng nhập mock, giữ trạng thái phiên và bảo vệ route cần quyền truy cập (`account`).

## 1. Mục tiêu & Phạm vi
- Tạo `AuthService` giả lập với login/logout, lưu token (localStorage/sessionStorage).
- Implement guard `requireAuth` kiểm tra trạng thái trước khi vào route.
- Cung cấp controller & view cho Login, Account, Logout.
- Tương tác với entitlement (Feature 7) khi hiển thị quyền lợi người dùng.

## 2. Thành phần chính
| Thành phần | Vai trò | Điểm nổi bật |
| --- | --- | --- |
| `AuthService` | Lưu và kiểm tra trạng thái đăng nhập | API: `login({ email, password })`, `logout()`, `getUser()`.
| `requireAuth` | Guard cho router | Redirect về login nếu chưa đăng nhập, đính kèm query `next`.
| `LoginController` | Xử lý form đăng nhập | Validate input, gọi service, redirect tới `next` hoặc `account`.
| `AccountController` | Trang protected | Hiển thị thông tin user & entitlement hiện tại.
| Views Login/Account | Giao diện người dùng | Form login, hiển thị trạng thái và nút logout.

## 3. Yêu cầu chức năng
- **FR-1:** `AuthService.login` kiểm tra credential mock (ví dụ email `demo@mvc.dev`, pass `123456`).
- **FR-2:** Sau login thành công, lưu token + user info vào storage và trả object `{ user }`.
- **FR-3:** `logout` xóa storage và broadcast event `auth:changed` (tùy chọn).
- **FR-4:** Guard `requireAuth(ctx, next)` kiểm tra `AuthService.isAuthenticated()`. Nếu false → redirect `#/login?next=...`.
- **FR-5:** `LoginController` đọc query `next` để điều hướng sau thành công.
- **FR-6:** `AccountController` hiển thị user info, entitlement (sử dụng `EntitlementService.getStatus()`).
- **FR-7:** Hiển thị lỗi rõ ràng khi credential sai, không reveal thông tin nhạy cảm.

## 4. Thiết kế giải pháp
### 4.1 `AuthService`
```js
const STORAGE_KEY = "mvc.auth";

export class AuthService {
  login({ email, password }) {
    if (email === "demo@mvc.dev" && password === "123456") {
      const session = {
        token: crypto.randomUUID(),
        user: { id: 1, name: "Demo User", email }
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      return session;
    }
    throw new Error("Email hoặc mật khẩu không đúng");
  }

  logout() {
    localStorage.removeItem(STORAGE_KEY);
  }

  getSession() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  isAuthenticated() {
    return !!this.getSession();
  }
}
```

### 4.2 Guard `requireAuth`
```js
export function requireAuth(ctx, next) {
  if (authService.isAuthenticated()) {
    return next();
  }
  const nextUrl = ctx.to?.hash ?? ctx.hash;
  ctx.navigate("login", {}, { next: nextUrl });
  return { stop: true };
}
```

### 4.3 Controllers & Views
- **LoginController**: render form; submit gọi `authService.login`, on success → `ctx.navigate(nextRoute)`.
- **AccountController**: lấy session + entitlement, render view hiển thị thông tin user, trạng thái PRO/free và nút logout.
- **LogoutController** (tùy chọn): gọi `logout`, redirect Home.
- **Login view**: form với email/password, hiển thị error message.
- **Account view**: trình bày thông tin user, entitlement, CTA upgrade (link tới Feature 7).

## 5. Use Case chính
- **UC-1:** Người dùng truy cập `#/account` khi chưa login → redirect tới login với `next=%23%2Faccount`.
- **UC-2:** Đăng nhập thành công → chuyển tới trang đích (account hoặc route khác từ `next`).
- **UC-3:** Đăng xuất → session bị xóa, chuyển về Home.
- **UC-4:** Refresh trang account khi đã đăng nhập → dữ liệu lấy từ storage, vẫn trong phiên.

## 6. Kế hoạch kiểm thử
| ID | Kịch bản | Các bước | Kết quả |
| --- | --- | --- | --- |
| TC-1 | Redirect guard | Truy cập `#/account` khi chưa login | Bị chuyển tới `#/login?next=%23%2Faccount`. |
| TC-2 | Login thành công | Nhập credential hợp lệ | Điều hướng tới route trong `next`. |
| TC-3 | Login sai | Nhập sai password | Hiển thị thông báo lỗi, không lưu session. |
| TC-4 | Logout | Click logout từ account | Session bị xóa, quay về Home/login. |
| TC-5 | Persist | Refresh sau khi login | Người dùng vẫn đăng nhập. |

## 7. Ghi chú triển khai
- Đảm bảo `AuthService` dùng `try/catch` trong controller để hiển thị lỗi thân thiện.
- Có thể thêm throttle để tránh brute force (dù mock).
- Khi kết hợp với Feature 7, hiển thị entitlement trong Account để khuyến khích nâng cấp.
- Nếu nâng cấp sang API thật, thay storage bằng HTTP cookie + JWT.


# Feature 7 · Billing – Flow mua PRO mock

> **Mục tiêu trọng tâm:** mô phỏng luồng nâng cấp người dùng lên gói PRO, xử lý trạng thái entitlement và giao dịch mock.

## 1. Mục tiêu & Phạm vi
- Tạo flow từ trang Pricing → Checkout → Return.
- Sử dụng `BillingService` và `EntitlementService` để xử lý subscription giả lập.
- Lưu trạng thái entitlement vào storage (localStorage) để các view khác nhận diện.
- Không tích hợp cổng thanh toán thật; chỉ mock logic client.

## 2. Thành phần chính
| Thành phần | Vai trò | Ghi chú |
| --- | --- | --- |
| `BillingService` | Giả lập tạo giao dịch, xử lý kết quả | Trả về `{ status: "success" | "failed", txId }` sau khi chờ Promise. |
| `EntitlementService` | Quản lý quyền lợi người dùng | Hàm `getStatus()` và `setStatus(plan, txId)` lưu trạng thái. |
| Controllers Pricing/Return | Orchestrate flow | `PricingController` hiển thị gói, `ReturnController` cập nhật entitlement dựa trên kết quả. |
| Views Pricing/Checkout/Return | Giao diện tương tác | Hiển thị plan, nút mua, thông báo kết quả.

## 3. Yêu cầu chức năng
- **FR-1:** Pricing page hiển thị danh sách gói (Free, Pro) với mô tả.
- **FR-2:** Khi click "Mua PRO", điều hướng tới checkout mock (`#/billing/checkout`).
- **FR-3:** Checkout gọi `BillingService.purchase(plan)` → Promise resolve với status.
- **FR-4:** Sau khi purchase, điều hướng tới `#/billing/return?status=...&tx=...`.
- **FR-5:** `ReturnController` đọc query, cập nhật `EntitlementService` nếu thành công.
- **FR-6:** Hiển thị thông báo trạng thái (thành công/thất bại) và link quay về trang trước.
- **FR-7:** Nếu entitlement đã là PRO, Pricing cần disable nút mua.

## 4. Thiết kế giải pháp
### 4.1 `BillingService`
```js
export class BillingService {
  async purchase(plan) {
    await wait(800); // giả lập network
    if (plan !== "pro") {
      return { status: "failed", reason: "Unsupported plan" };
    }
    const success = Math.random() > 0.1; // 90% thành công
    const txId = crypto.randomUUID();
    return success
      ? { status: "success", plan, txId }
      : { status: "failed", plan, txId };
  }
}
```

### 4.2 `EntitlementService`
```js
const STORAGE_KEY = "mvc.entitlement";

export class EntitlementService {
  getStatus() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{\"plan\":\"free\"}");
  }

  setStatus(plan, txId) {
    const value = { plan, txId, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    return value;
  }
}
```

### 4.3 Controllers
- **PricingController**: lấy entitlement hiện tại, render view Pricing. Khi user click mua, gọi `ctx.navigate("billing-checkout", { plan: "pro" })`.
- **CheckoutController**: hiển thị spinner, gọi `BillingService.purchase("pro")`, sau đó điều hướng tới return.
- **ReturnController**: đọc query `status`, `tx`, `plan`; nếu `status === "success"`, cập nhật entitlement qua service và render message.

### 4.4 Views
- `Pricing` view hiển thị bảng gói, badge PRO nếu người dùng đã nâng cấp.
- `Checkout` view hiển thị trạng thái đang xử lý; có thể dùng progress animation.
- `Return` view hiển thị kết quả và nút quay lại trang chính (`ctx.navigate("account")` hoặc `home`).

## 5. Use Case chính
- **UC-1:** Người dùng từ trang Users chuyển sang Pricing và nâng cấp thành công → entitlement set PRO.
- **UC-2:** Giao dịch thất bại → Return view thông báo thất bại và không đổi entitlement.
- **UC-3:** Refresh Return page → `EntitlementService` vẫn giữ trạng thái đúng dựa trên localStorage.
- **UC-4:** Người dùng PRO quay lại Pricing → nút mua bị disable, hiển thị "Đã sở hữu".

## 6. Kế hoạch kiểm thử
| ID | Kịch bản | Các bước | Kết quả |
| --- | --- | --- | --- |
| TC-1 | Flow thành công | Pricing → Checkout → Return (success) | Entitlement chuyển `pro`, hiển thị thông báo thành công. |
| TC-2 | Flow thất bại | Mock Billing trả `failed` | Entitlement giữ nguyên `free`, thông báo lỗi. |
| TC-3 | Persistence | Refresh sau khi upgrade | `getStatus()` trả plan `pro`. |
| TC-4 | Button disable | User PRO vào Pricing | Nút "Mua PRO" disabled. |
| TC-5 | Query thiếu | Return không có `tx` | Controller hiển thị lỗi chung và không set entitlement. |

## 7. Ghi chú triển khai
- Dùng `crypto.randomUUID()` (có polyfill nếu cần) để tạo mã giao dịch.
- Khi mock random thất bại, cho phép developer override (ví dụ query `?force=success`).
- Có thể phát event `entitlement:changed` để các module khác (Auth, View) bắt và update UI.
- Giữ logic lưu trữ entitlement tách biệt để dễ thay thế bằng API thực tế.


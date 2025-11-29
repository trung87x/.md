Tuyệt vời! Chủ đề **Interaction Control (Kiểm soát Tương tác)** là một nhóm tiện ích quan trọng giúp bạn quản lý cách người dùng tương tác với các phần tử trên trang, từ con trỏ chuột đến việc lựa chọn văn bản và thao tác cảm ứng.

Tôi sẽ tổng hợp nội dung từ tất cả các tiện ích bạn cung cấp để tạo ra một bài blog ngắn gọn và đầy đủ.

---

# 🖱️ Kiểm Soát Tương Tác: Con Trỏ, Chọn Lựa & Cảm Ứng Trong Tailwind CSS

Bộ tiện ích này cho phép bạn tinh chỉnh chi tiết hành vi của giao diện người dùng khi người dùng tương tác với nó, đặc biệt hữu ích cho các thành phần UI phức tạp hoặc tương tác.

## 1\. 🖱️ Kiểu Dáng Con Trỏ Chuột: `cursor`

`cursor` (`cursor-`) đặt kiểu dáng của con trỏ chuột khi nó di chuột qua một phần tử.

| **Class**                | **CSS Property**       | **Mô tả**                                                                                        |
| ------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------ |
| **`cursor-auto`**        | `cursor: auto;`        | (Mặc định) Trình duyệt quyết định (ví dụ: `text` trên văn bản, `default` trên không gian trống). |
| **`cursor-pointer`**     | `cursor: pointer;`     | **Hình ngón tay** (Thường dùng cho các nút/liên kết có thể nhấp).                                |
| **`cursor-wait`**        | `cursor: wait;`        | **Hình đồng hồ cát/xoay** (Chỉ báo đang tải).                                                    |
| **`cursor-not-allowed`** | `cursor: not-allowed;` | **Hình gạch chéo** (Chỉ báo không được phép tương tác).                                          |
| **`cursor-move`**        | `cursor: move;`        | **Hình 4 mũi tên** (Chỉ báo có thể di chuyển).                                                   |
| **`cursor-text`**        | `cursor: text;`        | **Hình chữ I** (Chỉ báo có thể chọn văn bản).                                                    |

**Ví dụ:**

HTML

    <button class="cursor-pointer hover:bg-gray-100">Click để tiếp tục</button>

---

## 2\. 🚫 Ngăn Chặn Tương Tác: `pointer-events`

`pointer-events` kiểm soát việc phần tử có thể trở thành mục tiêu của các sự kiện chuột (click, hover) và cảm ứng hay không.

| **Class**                 | **CSS Property**        | **Mô tả**                                                                           |
| ------------------------- | ----------------------- | ----------------------------------------------------------------------------------- |
| **`pointer-events-auto`** | `pointer-events: auto;` | (Mặc định) Phần tử **có thể** tương tác.                                            |
| **`pointer-events-none`** | `pointer-events: none;` | Phần tử **không thể** tương tác. Các sự kiện sẽ truyền qua nó đến phần tử bên dưới. |

**Ví dụ thường dùng:**

Để vô hiệu hóa một overlay (lớp phủ) trong suốt, cho phép click vào nội dung bên dưới nó:

HTML

    <div class="pointer-events-none absolute inset-0"></div>

---

## 3\. ✍️ Kiểm Soát Lựa Chọn Văn Bản: `user-select`

`user-select` kiểm soát việc người dùng có thể chọn (highlight) văn bản bên trong phần tử hay không.

| **Class**         | **CSS Property**     | **Mô tả**                                                                    |
| ----------------- | -------------------- | ---------------------------------------------------------------------------- |
| **`select-auto`** | `user-select: auto;` | (Mặc định) Cho phép chọn.                                                    |
| **`select-none`** | `user-select: none;` | **Ngăn chọn** văn bản (thường dùng cho các thành phần UI như nút bấm, menu). |
| **`select-text`** | `user-select: text;` | Cho phép chọn văn bản (thường dùng để ghi đè `select-none` của khối cha).    |
| **`select-all`**  | `user-select: all;`  | Click vào phần tử sẽ **chọn toàn bộ** nội dung.                              |

---

## 4\. 🤏 Kiểm Soát Cảm Ứng: `touch-action`

`touch-action` kiểm soát cách một phần tử phản ứng với thao tác cảm ứng (vuốt, kéo, pinch) trên các thiết bị hỗ trợ cảm ứng.

| **Class**                | **CSS Property**              | **Mô tả**                                                                            |
| ------------------------ | ----------------------------- | ------------------------------------------------------------------------------------ |
| **`touch-auto`**         | `touch-action: auto;`         | (Mặc định) Trình duyệt xử lý cuộn và zoom.                                           |
| **`touch-none`**         | `touch-action: none;`         | **Ngăn tất cả** hành vi cuộn/zoom/pinch mặc định của trình duyệt.                    |
| **`touch-pan-y`**        | `touch-action: pan-y;`        | Chỉ cho phép **cuộn dọc** (`pan-y`). Ngăn cuộn ngang và zoom.                        |
| **`touch-manipulation`** | `touch-action: manipulation;` | Cho phép cuộn và zoom, nhưng **tối ưu hóa** cho các thao tác nhanh (như double-tap). |

---

## 5\. ↔️ Thay Đổi Kích Thước: `resize` & `field-sizing`

### A. Cho Phép Kéo Giãn: `resize`

`resize` cho phép người dùng thay đổi kích thước thủ công của phần tử (thường là `<textarea>`).

| **Class**                       | **CSS Property**                    | **Mô tả**                                             |
| ------------------------------- | ----------------------------------- | ----------------------------------------------------- |
| **`resize-none`**               | `resize: none;`                     | **Ngăn** thay đổi kích thước.                         |
| **`resize`**                    | `resize: both;`                     | Cho phép thay đổi kích thước theo **cả hai trục**.    |
| **`resize-y`** / **`resize-x`** | `resize: vertical;` / `horizontal;` | Chỉ cho phép thay đổi kích thước theo trục dọc/ngang. |

### B. Kích Thước Trường Nhập Liệu: `field-sizing`

`field-sizing` kiểm soát việc trường nhập liệu có tự động thay đổi kích thước dựa trên nội dung hay không.

| **Class**                  | **CSS Property**         | **Mô tả**                                       |
| -------------------------- | ------------------------ | ----------------------------------------------- |
| **`field-sizing-content`** | `field-sizing: content;` | Trường nhập liệu tự động mở rộng theo nội dung. |
| **`field-sizing-fixed`**   | `field-sizing: fixed;`   | Kích thước cố định (mặc định).                  |

---

**🔥 Tóm tắt Interaction Control:**

- **Con trỏ nhấp:** Dùng **`cursor-pointer`**.
- **Ngăn tương tác:** Dùng **`pointer-events-none`**.
- **Ngăn chọn văn bản:** Dùng **`select-none`**.
- **Ngăn cuộn/zoom trình duyệt:** Dùng **`touch-none`** (hoặc `touch-pan-y`).
- **Cho phép kéo giãn `textarea`:** Dùng **`resize-y`**.

Bạn có muốn chuyển sang chủ đề tiếp theo là **Scroll Behavior (Hành vi Cuộn)**, bao gồm `scroll-snap`, `scroll-margin`, `scroll-padding`,... không?

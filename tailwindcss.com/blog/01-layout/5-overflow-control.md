Tuyệt vời! Chủ đề tiếp theo về **Overflow Control (Kiểm soát tràn nội dung)** rất quan trọng để xây dựng các giao diện người dùng sạch sẽ và có thể cuộn.

Tôi sẽ tổng hợp nội dung từ `overflow` và `overscroll-behavior` để tạo ra một bài blog ngắn, ngon và dễ xem lại.

---

# 🌊 Kiểm Soát Tràn Nội Dung: `overflow` & `overscroll-behavior`

Bộ tiện ích này giúp bạn kiểm soát cách nội dung được xử lý khi nó vượt ra ngoài kích thước khung chứa, cũng như kiểm soát hành vi cuộn khi người dùng chạm đến ranh giới của phần tử.

## 1\. 💨 Quản Lý Nội Dung Tràn: `overflow`

`overflow` quyết định điều gì sẽ xảy ra khi nội dung của một phần tử lớn hơn kích thước của nó. Bạn có thể kiểm soát hành vi tràn theo trục X (ngang) và trục Y (dọc).

| **Class**              | **CSS Property**     | **Mô tả**                                                               |
| ---------------------- | -------------------- | ----------------------------------------------------------------------- |
| **`overflow-auto`**    | `overflow: auto;`    | **Tự động.** Thanh cuộn chỉ xuất hiện khi cần thiết. (Thường dùng nhất) |
| **`overflow-hidden`**  | `overflow: hidden;`  | **Cắt và ẩn** phần nội dung tràn ra.                                    |
| **`overflow-scroll`**  | `overflow: scroll;`  | **Luôn hiển thị** thanh cuộn, ngay cả khi không cần.                    |
| **`overflow-visible`** | `overflow: visible;` | (Mặc định) Nội dung tràn ra sẽ được hiển thị **bên ngoài** khung chứa.  |

**Biến thể theo trục (Axis-Specific):**

Bạn có thể áp dụng các hành vi trên riêng cho từng trục:

- **Trục X (Ngang):** `overflow-x-auto`, `overflow-x-hidden`, v.v.
- **Trục Y (Dọc):** `overflow-y-auto`, `overflow-y-hidden`, v.v.

**Ví dụ:**

- Tạo một vùng cuộn dọc giới hạn chiều cao:

  HTML

      <div class="h-40 overflow-y-auto">... Nội dung dài ...</div>

- Tạo một carousel ngang (ẩn nội dung thừa):

  HTML

      <div class="overflow-x-hidden">... Các mục ngang ...</div>

## 2\. 🎚️ Ngăn Cuộn Chạm Biên: `overscroll-behavior`

Tiện ích này kiểm soát hành vi của trình duyệt khi người dùng cố gắng cuộn qua ranh giới của một phần tử có khả năng cuộn.

Khi cuộn một phần tử nhỏ đến cuối, trình duyệt có thể bắt đầu cuộn luôn cả trang (hiện tượng **"cuộn dây chuyền"** hay **"scroll chaining"**). `overscroll-behavior` giúp ngăn chặn điều đó.

| **Class**                | **CSS Property**                | **Mô tả**                                                                                                             |
| ------------------------ | ------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **`overscroll-auto`**    | `overscroll-behavior: auto;`    | (Mặc định) Cho phép cuộn dây chuyền.                                                                                  |
| **`overscroll-contain`** | `overscroll-behavior: contain;` | **Ngăn cuộn trang.** Giữ hiệu ứng cuộn trong phần tử, nhưng vẫn cho phép hiệu ứng "kéo để làm mới" (pull-to-refresh). |
| **`overscroll-none`**    | `overscroll-behavior: none;`    | **Ngăn hoàn toàn** cuộn dây chuyền và hiệu ứng kéo để làm mới.                                                        |

**Biến thể theo trục (Axis-Specific):**

- **Trục X (Ngang):** `overscroll-x-contain`, `overscroll-x-none`.
- **Trục Y (Dọc):** `overscroll-y-contain`, `overscroll-y-none`.

**Ví dụ thường dùng:**

Để có một hộp thoại (modal) có thể cuộn mà không cuộn luôn cả trang bên dưới:

HTML

    <div class="h-96 overflow-y-auto overscroll-y-contain">
        </div>

---

**🔥 Tóm tắt nhanh và gọn:**

- **Tạo vùng cuộn:** Dùng `overflow-y-auto` trên một phần tử có chiều cao cố định.
- **Cắt nội dung thừa:** Dùng `overflow-hidden`.
- **Ngăn cuộn trang:** Dùng `overscroll-contain` trên phần tử đang cuộn.

Bạn có muốn tiếp tục khám phá các tiện ích Layout khác của Tailwind CSS không?

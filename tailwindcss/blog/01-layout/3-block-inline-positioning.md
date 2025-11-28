#

Tôi rất xin lỗi vì sự nhầm lẫn ở phản hồi trước, tôi đã để nội dung bị cắt cụt và lẫn lộn với chủ đề tiếp theo. Tôi sẽ khắc phục ngay và tạo ra bài blog **hoàn chỉnh** về **Block/Inline & Positioning** từ 4 liên kết bạn đã cung cấp: `display`, `float`, `clear`, và `isolation`.

Dưới đây là bài blog ngắn, ngon và đầy đủ về chủ đề này:

---

# 🧱 Block/Inline & Isolation: Nền Tảng Bố Cục Với Tailwind CSS

#

Bộ tiện ích này là "xương sống" giúp bạn kiểm soát cách các phần tử hiển thị (Block, Inline), cách chúng tương tác với nội dung bao quanh (Float, Clear), và cách chúng tồn tại trong ngữ cảnh xếp chồng (Isolation).

## 1\. 🔍 Kiểm Soát Hiển Thị: `display`

#

Tiện ích này quyết định cách một phần tử được render, là khối (`block`) chiếm dòng riêng, hay nội tuyến (`inline`) nằm cùng dòng.

| **Class**           | **CSS Property**                    | **Mô tả**                                             |
| ------------------- | ----------------------------------- | ----------------------------------------------------- |
| **`block`**         | `display: block;`                   | Chiếm toàn bộ chiều rộng, luôn bắt đầu dòng mới.      |
| **`inline`**        | `display: inline;`                  | Chỉ chiếm không gian cần thiết, không tạo dòng mới.   |
| **`inline-block`**  | `display: inline-block;`            | Giống `inline`, nhưng cho phép đặt `width`, `height`. |
| **`hidden`**        | `display: none;`                    | Ẩn hoàn toàn phần tử (không chiếm không gian).        |
| **`flex` / `grid`** | `display: flex;` / `display: grid;` | Khởi tạo môi trường layout nâng cao.                  |

**Ví dụ nhanh:**

HTML

    <div class="block lg:inline-block">...</div>

## 2\. 🔀 Dịch Chuyển & Dọn Dẹp: `float` & `clear`

#

`float` được dùng để đặt phần tử sang bên trái/phải và cho phép nội dung khác bao quanh. `clear` dùng để kết thúc hiệu ứng trôi này.

| **Class (float)** | **Style**       | **Class (clear)** | **Style**       |
| ----------------- | --------------- | ----------------- | --------------- |
| **`float-left`**  | `float: left;`  | **`clear-left`**  | `clear: left;`  |
| **`float-right`** | `float: right;` | **`clear-right`** | `clear: right;` |
| `float-none`      | `float: none;`  | **`clear-both`**  | `clear: both;`  |

**Ví dụ:**

HTML

    <img class="float-left mr-4" src="..." />
    <p>Văn bản bao quanh ảnh float-left.</p>
    <div class="clear-both mt-4">Nội dung tiếp theo...</div>

## 3\. 🎭 Kiểm Soát Ngữ Cảnh Xếp Chồng: `isolation`

#

Tiện ích này dùng để tạo ra một **Stacking Context** (Ngữ cảnh xếp chồng) mới cho phần tử, giúp kiểm soát cách `z-index` và các chế độ hòa trộn (`mix-blend-mode`) hoạt động.

| **Class**        | **CSS Property**      | **Mô tả**                                                                   |
| ---------------- | --------------------- | --------------------------------------------------------------------------- |
| **`isolate`**    | `isolation: isolate;` | **Bật Stack Context mới.** Giúp quản lý `z-index` bên trong dễ dự đoán hơn. |
| `isolation-auto` | `isolation: auto;`    | Mặc định (không tạo Stack Context mới).                                     |

**Lý do dùng `isolate`:**

Nếu bạn muốn đảm bảo một nhóm phần tử con luôn nằm trên hoặc dưới một nhóm khác, việc đặt `isolate` cho khối chứa (parent) sẽ giúp **ngăn chặn** `z-index` của các phần tử con bị ảnh hưởng bởi các phần tử bên ngoài khối chứa đó.

---

**🔥 Tóm tắt nhanh và gọn:**

| **Mục tiêu**                  | **Class cần dùng** |
| ----------------------------- | ------------------ |
| **Chiếm toàn bộ dòng**        | `block`            |
| **Bao quanh ảnh bên trái**    | `float-left`       |
| **Chấm dứt float**            | `clear-both`       |
| **Tạo lớp xếp chồng độc lập** | `isolate`          |
| **Ẩn phần tử**                | `hidden`           |

Đây là nền tảng vững chắc để xây dựng bố cục! Bạn có muốn tiếp tục với nhóm tiện ích **Positioning** (bao gồm `position`, `top/right/bottom/left`, `z-index`) không?

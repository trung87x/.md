# 📰 Đơn Giản Hóa Bố Cục Đa Cột (Multi-column Layout) Với Tailwind CSS

Chào mừng bạn đến với bài viết nhanh về cách tạo và kiểm soát bố cục đa cột trong Tailwind CSS. Đây là bộ công cụ hoàn hảo cho những ai muốn sắp xếp văn bản theo phong cách tạp chí hoặc báo chí mà không cần viết CSS phức tạp.

## 1\. 🏗️ Tạo Lưới Cột Cơ Bản: `columns`

Tiện ích cốt lõi để tạo ra bố cục nhiều cột là `columns`. Bạn có thể xác định số lượng cột cố định hoặc đặt chiều rộng tối ưu cho mỗi cột.

| **Class**            | **Style**           | **Mô tả**                      |
| -------------------- | ------------------- | ------------------------------ |
| **`columns-<n>`**    | `columns: <n>;`     | Đặt số lượng cột cố định.      |
| **`columns-<size>`** | `columns: <width>;` | Đặt chiều rộng tối ưu cho cột. |
| **`columns-auto`**   | `columns: auto;`    | Mặc định.                      |

**Ví dụ:**

- **Theo số lượng:** Sử dụng `columns-3` để chia nội dung thành 3 cột đều nhau.

  HTML

      <div class="columns-3">... Nội dung dài ...</div>

- **Khoảng cách:** Kết hợp với `gap-<size>` để đặt khoảng cách giữa các cột.

  HTML

      <div class="columns-3 gap-8">... Nội dung ...</div>

- **Thiết kế Đáp ứng (Responsive):** Bạn có thể thay đổi số cột theo kích thước màn hình.

  HTML

      <div class="columns-2 md:columns-4">... Nội dung ...</div>

## 2\. ✂️ Kiểm Soát Vị Trí Ngắt Cột: `break-` Utilities

Khi nội dung được chia cột, bạn cần kiểm soát xem một khối nội dung (như một tiêu đề, một đoạn) có bị ngắt ngang cột hay không.

### A. Ngăn Ngắt Bên Trong (`break-inside`)

Sử dụng nhóm tiện ích này trên một phần tử con để ngăn phần tử đó bị chia đôi giữa hai cột.

| **Class**                       | **Style**                     | **Mô tả**                                            |
| ------------------------------- | ----------------------------- | ---------------------------------------------------- |
| **`break-inside-avoid-column`** | `break-inside: avoid-column;` | **Quan trọng nhất.** Ngăn phần tử bị ngắt ngang cột. |
| `break-inside-auto`             | `break-inside: auto;`         | Cho phép ngắt.                                       |

**Ví dụ:**

HTML

    <h2 class="break-inside-avoid-column">Phần quan trọng</h2>
    <p>...</p>

### B. Ép Buộc Ngắt (`break-before` / `break-after`)

Sử dụng nhóm tiện ích này để ép buộc hoặc ngăn chặn việc ngắt cột xảy ra **trước** hoặc **sau** một phần tử.

| **Class**                 | **Style**               | **Mô tả**                                 |
| ------------------------- | ----------------------- | ----------------------------------------- |
| **`break-before-column`** | `break-before: column;` | Bắt đầu một cột mới ngay tại phần tử này. |
| `break-after-avoid`       | `break-after: avoid;`   | Ngăn ngắt cột ngay sau phần tử.           |

## 3\. ✨ Xử Lý Hiệu Ứng Trực Quan: `box-decoration-break`

Tiện ích này kiểm soát cách các thuộc tính như `background`, `border`, `padding` được hiển thị khi một inline element (như `<span>`) bị ngắt dòng hoặc ngắt cột.

| **Class**                  | **Style**                      | **Mô tả**                                                                                         |
| -------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------- |
| **`box-decoration-slice`** | `box-decoration-break: slice;` | (Mặc định) Cắt/chia thuộc tính tại điểm ngắt.                                                     |
| **`box-decoration-clone`** | `box-decoration-break: clone;` | Nhân bản (clone) các thuộc tính (padding, background, border) cho mỗi đoạn nội dung sau khi ngắt. |

**Thường dùng:** Nếu bạn có một đoạn text dài với màu nền (background) hoặc border và nó bị ngắt thành nhiều dòng, `box-decoration-clone` sẽ giúp duy trì màu nền hoặc border riêng biệt và đầy đủ cho mỗi dòng/đoạn, tạo hiệu ứng thị giác liền mạch hơn.

---

**🔥 Tóm tắt nhanh:**

| **Mục tiêu**                             | **Class cần dùng**                                |
| ---------------------------------------- | ------------------------------------------------- |
| **Chia 4 cột**                           | `columns-4`                                       |
| **Đổi 2 cột trên MD**                    | `md:columns-2`                                    |
| **Ngăn 1 khối bị chia đôi**              | `break-inside-avoid-column`                       |
| **Ép ngắt cột**                          | `break-before-column` (hoặc `break-after-column`) |
| **Nhân bản padding/background khi ngắt** | `box-decoration-clone`                            |

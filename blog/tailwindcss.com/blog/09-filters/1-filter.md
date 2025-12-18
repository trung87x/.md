Tuyệt vời! Chủ đề **Filters (Bộ lọc)** là một nhóm tiện ích mạnh mẽ và thú vị, cho phép bạn áp dụng các hiệu ứng đồ họa trực tiếp lên hình ảnh, video và các phần tử khác mà không cần chỉnh sửa file gốc.

Tôi sẽ tổng hợp tất cả các bộ lọc bạn cung cấp để tạo ra một bài blog ngắn gọn và đầy đủ.

---

# 📸 Bộ Lọc Hình Ảnh: Các Tiện Ích `filter` Trong Tailwind CSS

Bộ tiện ích **`filter`** trong Tailwind CSS ánh xạ trực tiếp tới thuộc tính CSS `filter`, cho phép bạn chỉnh sửa màu sắc, độ mờ, độ sáng và thêm bóng đổ cho phần tử một cách dễ dàng.

## 1\. 💨 Hiệu Ứng Làm Mờ & Bóng Đổ

| **Class**                | **CSS Property**            | **Mô tả**                                                                                                      |
| ------------------------ | --------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **`blur-<size>`**        | `filter: blur(...);`        | **Làm mờ** phần tử. Thường dùng cho hiệu ứng nền (backdrop) hoặc ảnh cần làm nổi bật nội dung phía trên.       |
| **`drop-shadow-<size>`** | `filter: drop-shadow(...);` | Thêm **bóng đổ** vào hình dạng của nội dung (thường là hình ảnh), khác với `box-shadow` áp dụng lên khung hộp. |

**Ví dụ:**

HTML

    <img class="blur-3xl" src="..." />

    <svg class="drop-shadow-xl text-indigo-500">...</svg>

---

## 2\. 🌈 Điều Chỉnh Màu Sắc Cơ Bản

Các tiện ích này thay đổi mức độ của các thuộc tính màu sắc và ánh sáng.

| **Class**            | **CSS Property**           | **Mô tả**                                                                   |
| -------------------- | -------------------------- | --------------------------------------------------------------------------- |
| **`brightness-<n>`** | `filter: brightness(...);` | Điều chỉnh **độ sáng** (100 là mặc định, 200 là sáng gấp đôi).              |
| **`contrast-<n>`**   | `filter: contrast(...);`   | Điều chỉnh **độ tương phản** (100 là mặc định).                             |
| **`grayscale`**      | `filter: grayscale(100%);` | Chuyển đổi phần tử thành **thang độ xám** (đen trắng).                      |
| **`invert`**         | `filter: invert(100%);`    | **Đảo ngược** màu sắc (thường dùng cho hiệu ứng Dark Mode).                 |
| **`sepia`**          | `filter: sepia(100%);`     | Áp dụng hiệu ứng **ảnh cũ** (nâu đỏ).                                       |
| **`saturate-<n>`**   | `filter: saturate(...);`   | Tăng/giảm **độ bão hòa** màu sắc (100 là mặc định, 200 là bão hòa gấp đôi). |

**Ví dụ:**

HTML

    <img class="grayscale hover:grayscale-0 hover:contrast-125 transition" src="..." />

---

## 3\. 🔄 Xoay Màu: `hue-rotate`

`hue-rotate` (`hue-rotate-`) cho phép bạn **thay đổi tất cả màu sắc** của phần tử bằng cách xoay chúng trên bánh xe màu (Hue Wheel).

| **Class**            | **CSS Property**              | **Mô tả**                                                                  |
| -------------------- | ----------------------------- | -------------------------------------------------------------------------- |
| **`hue-rotate-0`**   | `filter: hue-rotate(0deg);`   | (Mặc định) Không xoay.                                                     |
| **`hue-rotate-90`**  | `filter: hue-rotate(90deg);`  | Xoay màu 90 độ.                                                            |
| **`hue-rotate-180`** | `filter: hue-rotate(180deg);` | **Đảo ngược** màu sắc (màu đỏ thành màu xanh ngọc, xanh dương thành vàng). |

**Ví dụ:**

HTML

    <div class="hover:hue-rotate-180 transition duration-500">...</div>

---

## 4\. 🔗 Ghi Chú Tổng Hợp

Tất cả các tiện ích `filter` này đều được **áp dụng cùng lúc** trên phần tử, tạo thành một chuỗi các hiệu ứng. Ví dụ:

HTML

    <img class="blur-sm grayscale brightness-150" src="..." />

---

**🔥 Tóm tắt Filters:**

- **Làm mờ:** Dùng **`blur-md`** (hoặc `blur-none` để loại bỏ).
- **Đen trắng/Ảnh cũ:** Dùng **`grayscale`** hoặc **`sepia`**.
- **Tạo hiệu ứng Dark Mode:** Dùng **`invert`** (cẩn thận với hình ảnh).
- **Tạo chiều sâu cho icon:** Dùng **`drop-shadow-lg`**.

Bạn có muốn chuyển sang nhóm tiện ích **Backdrop Filters (Bộ lọc Nền)**, áp dụng hiệu ứng tương tự cho nền phía sau phần tử (ví dụ: hiệu ứng kính mờ)?

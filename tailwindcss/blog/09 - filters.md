# 🌈 CSS Filters (Bộ Lọc Đồ Họa)

> Nhóm thuộc tính **FILTERS** cho phép bạn áp dụng các hiệu ứng xử lý hình ảnh (giống như trong Photoshop) trực tiếp lên phần tử. Đây là công cụ mạnh mẽ để thay đổi màu sắc, độ sáng hoặc độ sắc nét của nội dung.

---

## 1. Thuộc tính Chính: Filter vs Backdrop-filter

Sự khác biệt lớn nhất nằm ở phạm vi áp dụng hiệu ứng:

| **Thuộc tính**        | **Phạm vi tác động**                                                      | **Ứng dụng chính**                                       |
| :-------------------- | :------------------------------------------------------------------------ | :------------------------------------------------------- |
| **`filter`**          | Áp dụng bộ lọc trực tiếp lên **phần tử và tất cả nội dung** bên trong nó. | Làm mờ một hình ảnh, chuyển ảnh thành đen trắng.         |
| **`backdrop-filter`** | Áp dụng bộ lọc lên **vùng nền phía sau** phần tử (lớp phía sau).          | <br> Tạo hiệu ứng **Kính Mờ (Frosted Glass)** kinh điển. |

---

## 2. Các Hàm Lọc Phổ Biến (Filter Functions)

Các thuộc tính này đều là các **hàm** được truyền vào `filter` hoặc `backdrop-filter`.

| **Hàm lọc**         | **Ý nghĩa**                       | **Ứng dụng thực tế**                                                                                                                                          |
| :------------------ | :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`blur()`**        | Làm mờ phần tử hoặc nền sau.      | Tạo độ sâu cho giao diện hoặc làm mờ ảnh nền khi mở modal.                                                                                                    |
| **`grayscale()`**   | Chuyển màu sắc thành trắng đen.   | Dùng cho hiệu ứng ảnh cũ hoặc làm mờ phần tử khi không hoạt động.                                                                                             |
| **`saturate()`**    | Điều chỉnh độ bão hòa màu sắc.    | Tăng (`>1`) để làm màu rực rỡ hơn hoặc giảm (`<1`) để làm màu nhạt đi.                                                                                        |
| **`brightness()`**  | Điều chỉnh độ sáng.               | Làm tối ảnh nền hoặc làm sáng nội dung (thường dùng cùng `contrast`).                                                                                         |
| **`contrast()`**    | Tăng/Giảm độ tương phản.          |                                                                                                                                                               |
| **`hue-rotate()`**  | Xoay màu trên bánh xe màu (Hue).  | Thay đổi tông màu của phần tử mà không cần đổi mã màu gốc.                                                                                                    |
| **`invert()`**      | Đảo ngược màu sắc (tạo âm bản).   |                                                                                                                                                               |
| **`sepia()`**       | Chuyển sang tông màu nâu cổ điển. |                                                                                                                                                               |
| **`drop-shadow()`** | Tạo bóng đổ.                      | **Quan trọng:** Khác `box-shadow` ở chỗ, `drop-shadow` chỉ áp dụng bóng đổ theo hình dạng **nội dung** (thường dùng cho các hình dạng không phải hình vuông). |
| **`opacity()`**     | Điều chỉnh độ trong suốt.         | Tương tự như thuộc tính `opacity` truyền thống.                                                                                                               |

---

## 💡 Mẹo nhỏ: Kính Mờ (Frosted Glass)

Để tạo hiệu ứng Kính Mờ cho thanh điều hướng (navbar), bạn cần kết hợp `background-color` hơi trong suốt với `backdrop-filter`:

```css
.navbar {
  /* 1. Nền hơi trong suốt */
  background-color: rgba(255, 255, 255, 0.7);

  /* 2. Làm mờ nội dung phía sau */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px); /* Hỗ trợ Safari */
}
/* Tailwind: bg-white/70 backdrop-blur-md */
```

# 🖼️ CSS Borders & Outlines (Viền & Đường bao ngoài)

> Nhóm thuộc tính này định nghĩa các đường viền xung quanh phần tử, từ độ dày, màu sắc, kiểu dáng cho đến bo tròn góc. `outline` cũng tạo ra đường bao nhưng không chiếm không gian layout.

---

## 1. Đường Viền (Borders)

| **Thuộc tính**      | **Chức năng chính**         | **Ghi chú / Mẹo (Best Practices)**                                                                 |
| :------------------ | :-------------------------- | :------------------------------------------------------------------------------------------------- |
| **`border-width`**  | Độ dày của đường viền.      | `1px`, `2px`... Trong Tailwind: `border`, `border-2`, `border-x-4` (chỉ viền ngang).               |
| **`border-color`**  | Màu sắc của đường viền.     | Trong Tailwind: `border-blue-500`.                                                                 |
| **`border-style`**  | Kiểu đường viền.            | `solid` (liền), `dashed` (gạch), `dotted` (chấm), `double` (kép), `none` (không viền).             |
| **`border-radius`** | Bo tròn góc của đường viền. | **Cực kỳ phổ biến:** `5px`, `50%` (tạo hình tròn/oval). Trong Tailwind: `rounded`, `rounded-full`. |

---

## 2. Đường Bao Ngoài (Outlines)

> `outline` tương tự như `border` nhưng không chiếm không gian trong box model. Nó được dùng chủ yếu để tăng cường khả năng tiếp cận (accessibility) bằng cách hiển thị vùng chọn của người dùng khi duyệt bằng bàn phím.

| **Thuộc tính**       | **Chức năng chính**                            | **Ghi chú / Mẹo (Best Practices)**            |
| :------------------- | :--------------------------------------------- | :-------------------------------------------- |
| **`outline-width`**  | Độ dày của đường bao ngoài.                    |                                               |
| **`outline-color`**  | Màu sắc của đường bao ngoài.                   |                                               |
| **`outline-style`**  | Kiểu đường bao ngoài.                          | `solid`, `dashed`, `dotted`, `none`.          |
| **`outline-offset`** | Khoảng cách từ đường bao ngoài đến đường viền. | Tạo ra một khoảng trống giữa viền và outline. |

---

## 💡 Mẹo nhỏ (Pro Tips)

### 1. Bo tròn ảnh đại diện (Avatar)

Để biến một bức ảnh vuông thành tròn (avatar):

```css
.avatar {
  border-radius: 50%; /* Bo tròn 50% mỗi góc */
  overflow: hidden; /* Đảm bảo ảnh không tràn ra ngoài */
}
/* Tailwind: rounded-full overflow-hidden */
```

### 2. Thiết kế nút bấm với viền

```css
.button {
  border: 1px solid #ccc; /* Viền xám 1px */
  border-radius: 5px; /* Bo tròn nhẹ */
  padding: 10px 20px;
}
/* Tailwind: border border-gray-300 rounded-md px-5 py-2.5 */
```

### 3. Accessibility và outline

> **CẢNH BÁO:** Luôn cẩn thận khi loại bỏ **outline** mặc định (`outline: none;` hoặc `focus:outline-none` trong Tailwind) vì nó làm giảm khả năng truy cập cho người dùng bàn phím. Nếu loại bỏ, hãy đảm bảo có một trạng thái `:focus` khác để thay thế (ví dụ: đổi màu nền, thêm box-shadow).

**CSS Thuần:**

```css
/* Tránh dùng: */
button:focus {
  outline: none;
}

/* Thay vào đó, dùng (Giữ hoặc thay thế outline): */
button:focus {
  outline: 2px solid blue; /* Giữ outline */
  outline-offset: 2px;
  /* Hoặc: */
  box-shadow: 0 0 0 2px blue; /* Tạo hiệu ứng focus khác */
}
```

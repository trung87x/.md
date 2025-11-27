# 🖍️ CSS SVG (Đồ họa Vector)

> Nhóm thuộc tính này kiểm soát cách các hình dạng vector (SVG) được tô màu và kẻ viền, cho phép bạn thay đổi giao diện của icon hoặc đồ họa trực tiếp bằng CSS.

---

## 1. Thuộc tính Tạo kiểu Cốt lõi

| **Thuộc tính**     | **Chức năng chính**                                   | **Ghi chú / Mẹo**                                                                              |
| :----------------- | :---------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| **`fill`**         | Đặt **màu tô** (màu nền) **bên trong** hình dạng SVG. | Trong HTML/CSS, đây là cách bạn tô màu cho một icon. Giá trị có thể là tên màu, hex, hoặc RGB. |
| **`stroke`**       | Đặt **màu viền** (đường kẻ) của hình dạng SVG.        | Giống như `border-color` nhưng dành cho đồ họa vector.                                         |
| **`stroke-width`** | Đặt **độ dày** của đường viền (stroke).               | Trong Tailwind: `stroke-1`, `stroke-2`, v.v.                                                   |

---

## 💡 Mẹo nhỏ (Pro Tips)

### 1. Phân biệt `fill` và `background-color`

- **`fill`** là thuộc tính CSS/SVG để tô màu **bên trong** một hình dạng (`<path>`, `<circle>`) trong file SVG.
- **`background-color`** là thuộc tính CSS dùng để tô màu **phía sau** toàn bộ khối HTML chứa SVG (`<div>`, v.v.).

### 2. Biến đổi Màu Icon

Để thay đổi màu của tất cả các icon trong một khối nội dung, bạn chỉ cần áp dụng `fill` cho khối cha (nếu icon được thiết kế đúng cách):

```css
/* Đặt màu cho tất cả icon trong khối .sidebar */
.sidebar svg {
  fill: blue;
}
/* Tailwind: fill-blue-500 */
```

### 3 Tạo Hiệu ứng Vẽ (Drawing Effect)

> Dù không được liệt kê, thuộc tính **stroke-dasharray** và **stroke-dashoffset** (thường dùng trong SVG) được kết hợp để tạo ra các hiệu ứng hoạt ảnh vẽ đường viền (line drawing animation), rất phổ biến trên giao diện web hiện đại.

**Gợi ý Code (Dành cho SVG Path):**

```css
/* Bước 1: Thiết lập chiều dài nét gạch bằng chiều dài đường dẫn */
.draw-path {
  stroke-dasharray: 1000; /* Cần biết chiều dài Path */
  stroke-dashoffset: 1000; /* Ẩn đường dẫn ban đầu */
  transition: stroke-dashoffset 2s ease;
}

/* Bước 2: Kích hoạt animation */
.draw-path:hover {
  stroke-dashoffset: 0; /* Hiển thị đường dẫn */
}
```

# 🖱️ CSS Interactivity (Tương tác & Cuộn trang)

> Nhóm thuộc tính **INTERACTIVITY** quản lý cách trình duyệt xử lý các đầu vào của người dùng (chuột, cảm ứng, bàn phím), đồng thời cho phép tùy chỉnh các thành phần UI tiêu chuẩn và tối ưu hóa việc cuộn trang.

---

## 1. Tùy chỉnh UI & Màu sắc (UI Styling & Color)

| **Thuộc tính**     | **Chức năng chính**                                                              | **Ghi chú / Mẹo**                                                                 |
| :----------------- | :------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| **`accent-color`** | Đặt **màu nhấn** cho các thành phần form cơ bản (checkbox, radio button, range). | Giúp dễ dàng tùy chỉnh màu sắc của form phù hợp với thương hiệu.                  |
| **`caret-color`**  | Đặt **màu con trỏ** (dấu nháy) trong các trường nhập liệu.                       |                                                                                   |
| **`color-scheme`** | Gợi ý trình duyệt sử dụng giao diện sáng hay tối.                                | `light`, `dark`, hoặc `normal`. Giúp tối ưu giao diện cho chế độ tối (Dark Mode). |
| **`appearance`**   | Cho phép thiết lập lại cách các phần tử form gốc được hiển thị.                  | Thường dùng `none` để xóa bỏ kiểu dáng mặc định của trình duyệt cho các input.    |

## 2. Kiểm soát Tương tác (Interaction Control)

| **Thuộc tính**       | **Chức năng chính**                                                                 | **Ghi chú / Mẹo**                                                                                               |
| :------------------- | :---------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| **`cursor`**         | Đặt kiểu con trỏ chuột khi di chuyển qua phần tử.                                   | `pointer` (bàn tay), `default` (mũi tên), `not-allowed`, `grab`.                                                |
| **`pointer-events`** | Quyết định xem phần tử có phản ứng với các sự kiện chuột/chạm hay không.            | Đặt `none` để làm cho phần tử trở nên "vô hình" với chuột, cho phép nhấp vào phần tử phía dưới nó.              |
| **`user-select`**    | Kiểm soát xem người dùng có thể chọn (highlight) văn bản hay không.                 | Đặt `none` để ngăn người dùng copy nội dung quan trọng.                                                         |
| **`touch-action`**   | Chỉ định cách một phần tử phản ứng với đầu vào cảm ứng (chạm).                      | Dùng để ngăn cuộn trang mặc định khi vuốt trong một thành phần có thể cuộn riêng biệt (ví dụ: bản đồ, gallery). |
| **`resize`**         | Cho phép người dùng thay đổi kích thước thủ công của phần tử.                       | Thường dùng cho các vùng văn bản (`textarea`). Giá trị: `none`, `both`, `horizontal`, `vertical`.               |
| **`field-sizing`**   | (Mới) Cho phép trường nhập liệu tự động điều chỉnh kích thước để khớp với nội dung. | Giúp tạo ra các ô input tự động giãn nở.                                                                        |

---

## 3. Cuộn trang & Chức năng Snap (Scrolling & Snap)

| **Thuộc tính**              | **Chức năng chính**                                        | **Ghi chú / Mẹo**                                                                             |
| :-------------------------- | :--------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| **`scroll-behavior`**       | Quy định hành vi cuộn khi nhảy giữa các anchor link.       | Đặt `smooth` để cuộn mượt mà thay vì nhảy tức thì.                                            |
| **`scroll-margin/padding`** | Thêm khoảng đệm/lề khi cuộn đến một anchor link.           | Rất hữu ích khi có header cố định (fixed header) để đảm bảo nội dung không bị header che mất. |
| **`scroll-snap-type`**      | Kích hoạt và định nghĩa kiểu bắt dính (snapping) khi cuộn. | `y mandatory` yêu cầu bắt dính tuyệt đối theo trục dọc.                                       |
| **`scroll-snap-align`**     | Vị trí neo của phần tử con khi bắt dính.                   | `start`, `center`, `end`. Dùng để căn giữa các slide trong carousel.                          |
| **`scroll-snap-stop`**      | Cho phép cuộn qua nhiều điểm bắt dính cùng một lúc.        |                                                                                               |

---

## 4. Tối ưu Hiệu suất

| **Thuộc tính**    | **Chức năng chính**                                                                | **Ghi chú / Mẹo**                                                                                                                          |
| :---------------- | :--------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| **`will-change`** | Cung cấp gợi ý cho trình duyệt về các thuộc tính sẽ được thay đổi trong tương lai. | Dùng để báo trước cho trình duyệt chuẩn bị tài nguyên (GPU) cho animation sắp tới. **Sử dụng cẩn thận** vì lạm dụng có thể làm chậm trang. |

---

## 💡 Mẹo nhỏ (Pro Tips) cho Interactivity

### 1. Vô hiệu hóa Copy & Nhấp Xuyên qua

| Tình huống                 | Thuộc tính cần dùng         | Lợi ích                                                           |
| :------------------------- | :-------------------------- | :---------------------------------------------------------------- |
| **Chặn sao chép**          | **`user-select: none;`**    | Ngăn người dùng highlight và copy văn bản (dùng cho icon, logo).  |
| **Nhấp xuyên qua phần tử** | **`pointer-events: none;`** | Khi có lớp phủ trong suốt, cho phép nhấp vào phần tử phía sau nó. |

### 2. Hiệu ứng Carousel "Bắt Dính" (Scroll Snap)

Để tạo ra một gallery hoặc carousel mà các slide luôn căn giữa hoặc tự động neo lại ở đúng vị trí sau khi cuộn:

```css
/* Áp dụng cho phần tử chứa các slides */
.carousel-container {
  scroll-snap-type: x mandatory; /* Bắt dính tuyệt đối theo trục ngang */
}

/* Áp dụng cho từng slide */
.slide {
  scroll-snap-align: center; /* Slide sẽ tự căn vào giữa khung nhìn */
}
```

### 3. Gợi ý Tối ưu Hiệu suất (will-change)

> Thuộc tính **will-change** là một tín hiệu gửi đến trình duyệt, báo rằng bạn sẽ sớm thay đổi một thuộc tính cụ thể (như `transform` hoặc `opacity`) trên phần tử này. Điều này giúp trình duyệt tối ưu hóa và chuẩn bị tài nguyên (GPU) cho animation sắp tới.

**CSS Thuần:**

```css
.animated-element {
  will-change: transform, opacity; /* Báo trước sẽ thay đổi 2 thuộc tính này */
}
```

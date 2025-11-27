# ✍️ CSS Typography (Kiểu Chữ & Văn Bản)

> Typography chiếm đến **90% nội dung** của một trang web. Nắm vững phần này không chỉ giúp web đẹp hơn mà còn đảm bảo người dùng đọc nội dung dễ dàng trên mọi thiết bị.

---

## 🅰️ 1. Font Chữ & Hiển Thị Cơ Bản (Font & Style)

| **Thuộc tính**       | **Chức năng chính**                         | **Ghi chú / Mẹo**                                   |
| :------------------- | :------------------------------------------ | :-------------------------------------------------- |
| **`font-family`**    | Xác định loại font (VD: Sans-serif, Serif). | Luôn nên khai báo font dự phòng (fallback).         |
| **`font-size`**      | Kích thước chữ.                             | Tailwind dùng: `text-sm`, `text-base`, `text-lg`... |
| **`font-weight`**    | Độ đậm nhạt (100 - 900).                    | `400` (Normal), `700` (Bold).                       |
| **`font-style`**     | Kiểu chữ.                                   | `italic` (nghiêng), `normal`.                       |
| **`font-smoothing`** | Làm mượt nét chữ (antialiased).             | Giúp chữ hiển thị sắc nét hơn trên macOS/iOS.       |
| **`text-transform`** | Biến đổi ký tự.                             | `uppercase` (IN HOA), `capitalize` (Chữ Cái Đầu).   |

## 📐 2. Khoảng Cách & Căn Chỉnh (Spacing & Alignment)

| **Thuộc tính**       | **Chức năng chính**                    | **Ghi chú / Mẹo**                                               |
| :------------------- | :------------------------------------- | :-------------------------------------------------------------- |
| **`text-align`**     | Căn lề văn bản.                        | `left`, `center`, `right`, `justify` (căn đều 2 bên).           |
| **`line-height`**    | Khoảng cách giữa các dòng (Leading).   | **Quan trọng:** Văn bản dài nên để `1.5` hoặc `1.6` cho dễ đọc. |
| **`letter-spacing`** | Khoảng cách giữa các ký tự (Tracking). | Nên tăng nhẹ khi dùng chữ IN HOA.                               |
| **`vertical-align`** | Căn chỉnh theo chiều dọc.              | Dùng để căn icon thẳng hàng với chữ (inline).                   |
| **`text-indent`**    | Thụt đầu dòng đoạn văn.                |                                                                 |

## ✂️ 3. Xử Lý Ngắt Dòng & Tràn Chữ (Wrapping & Overflow)

_Phần quan trọng để tránh vỡ giao diện._

| **Thuộc tính**      | **Chức năng chính**                        | **Ghi chú / Mẹo**                                                      |
| :------------------ | :----------------------------------------- | :--------------------------------------------------------------------- |
| **`text-overflow`** | Xử lý khi chữ tràn khung.                  | Thường dùng `ellipsis` để tạo dấu "...".                               |
| **`white-space`**   | Quy định cách xuống dòng/khoảng trắng.     | `nowrap` (cấm xuống dòng), `pre` (giữ nguyên gốc).                     |
| **`word-break`**    | Quy định cách ngắt từ.                     | `break-all` (cắt ngang từ - dùng cho link quá dài).                    |
| **`overflow-wrap`** | Cho phép từ dài xuống dòng để không tràn.  | An toàn hơn `word-break`.                                              |
| **`line-clamp`**    | Giới hạn số dòng hiển thị.                 | **Rất hay dùng:** Chỉ hiện 3 dòng rồi thêm dấu "..." (`line-clamp-3`). |
| **`text-wrap`**     | Kiểm soát cách văn bản bao quanh.          | `balance` (giúp tiêu đề cân đối, không bị lẻ 1 từ cuối dòng).          |
| **`hyphens`**       | Tự động thêm dấu gạch nối (-) khi ngắt từ. |                                                                        |

## 🎀 4. Trang Trí (Decoration)

| **Thuộc tính**              | **Chức năng chính**                     | **Ghi chú / Mẹo**                          |
| :-------------------------- | :-------------------------------------- | :----------------------------------------- |
| **`text-decoration-line`**  | Kẻ dòng (`underline`, `line-through`).  | `line-through` dùng cho giá cũ/khuyến mãi. |
| **`text-decoration-style`** | Kiểu kẻ (`solid`, `dotted`, `wavy`...). |                                            |
| **`text-underline-offset`** | Khoảng cách từ chữ đến đường gạch chân. | Giúp link gạch chân thoáng và đẹp hơn.     |

## 🔢 5. Danh Sách & Khác

| **Thuộc tính**             | **Chức năng chính**                    | **Ghi chú / Mẹo**                                                           |
| :------------------------- | :------------------------------------- | :-------------------------------------------------------------------------- |
| **`list-style-type`**      | Kiểu dấu đầu dòng (`disc`, `decimal`). | Dùng `none` để bỏ dấu chấm tròn mặc định của `<ul>`.                        |
| **`font-variant-numeric`** | Điều chỉnh hiển thị số.                | `tabular-nums` giúp các con số thẳng hàng cột (dùng cho bảng giá, đồng hồ). |
| **`content`**              | Tạo nội dung giả.                      | Chỉ dùng trong `::before` và `::after`.                                     |

---

## 💡 Mẹo nhỏ (Pro Tip)

**Công thức cắt dòng mô tả sản phẩm:**
Để tạo một đoạn mô tả ngắn gọn, tự động có dấu "..." khi quá dài:

```css
.description {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Số dòng muốn hiện */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
/* Trong Tailwind chỉ cần: line-clamp-3 */
```

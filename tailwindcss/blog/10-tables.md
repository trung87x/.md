# 📊 CSS Tables (Bảng)

> Nhóm thuộc tính **TABLES** cho phép kiểm soát cách các đường viền của ô được hiển thị, cách bảng tính toán kích thước cột, và vị trí của chú thích (caption).

---

## 1. Kiểm Soát Viền & Khoảng Cách (Borders & Spacing)

Đây là hai thuộc tính quan trọng nhất quyết định giao diện đường viền của bảng.

| **Thuộc tính**        | **Chức năng chính**                                                                                                                    | **Ghi chú / Mẹo**                                                           |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| **`border-collapse`** | **Quy tắc gộp viền.** Xác định xem các đường viền của ô có nên **gộp lại thành một** (`collapse`) hay giữ **riêng biệt** (`separate`). | `collapse` thường được dùng để tạo bảng có giao diện gọn gàng, hiện đại.    |
| **`border-spacing`**  | **Khoảng cách giữa các ô.** Khoảng trống giữa các đường viền của các ô liền kề.                                                        | **Lưu ý:** Chỉ hoạt động khi `border-collapse: separate;` (viền tách biệt). |

---

## 2. Bố Cục & Chú Thích (Layout & Caption)

| **Thuộc tính**     | **Chức năng chính**                                         | **Ghi chú / Mẹo**                                                                                                                                                                |
| :----------------- | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`table-layout`** | **Phương pháp tính toán bố cục bảng.**                      | • `auto` (Mặc định): Trình duyệt tính toán độ rộng dựa trên nội dung. Chậm nhưng linh hoạt. <br>• `fixed`: Cần định nghĩa độ rộng cột rõ ràng. **Nhanh** nhưng ít linh hoạt hơn. |
| **`caption-side`** | **Vị trí của phần tử chú thích** (`<caption>`) so với bảng. | Có thể đặt `top` (trên) hoặc `bottom` (dưới).                                                                                                                                    |

---

## 💡 Mẹo nhỏ (Pro Tips)

### 1. Tăng Tốc Độ Tải Bảng

Đối với các bảng có nhiều dữ liệu và đã biết trước độ rộng cột, hãy luôn sử dụng `table-layout: fixed;` để trình duyệt không phải quét toàn bộ nội dung trong các ô trước khi hiển thị.

```css
/* Ưu tiên dùng cho các bảng lớn */
.data-table {
  table-layout: fixed;
  width: 100%;
}
```

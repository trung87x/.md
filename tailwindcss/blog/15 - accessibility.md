# ♿ CSS Accessibility (Khả năng tiếp cận)

> Nhóm thuộc tính **ACCESSIBILITY** giúp giao diện web tương thích tốt hơn với các công nghệ hỗ trợ và chế độ ưu tiên của người dùng, như trình đọc màn hình hoặc chế độ tương phản cao (High Contrast Mode).

---

## 1. Thuộc tính `forced-color-adjust`

| **Thuộc tính**            | **Chức năng chính**                                            | **Ghi chú / Mẹo**                                                                                                                                             |
| :------------------------ | :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`forced-color-adjust`** | **Kiểm soát sự điều chỉnh màu sắc cưỡng bức** của trình duyệt. | Thuộc tính này được sử dụng khi người dùng kích hoạt các chế độ tương phản cao hoặc chế độ màu đặc biệt của hệ điều hành (ví dụ: Windows High Contrast Mode). |

### Giá trị & Ý nghĩa

| **Giá trị** | **Tác động lên Giao diện**                                                                                                            | **Khi nào dùng?**                                                                                                      |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------- |
| **`auto`**  | **(Mặc định)** Trình duyệt sẽ **thay đổi tất cả** màu sắc (bao gồm nền, chữ, viền) để phù hợp với chế độ tương phản cao của hệ thống. | Tốt cho phần lớn văn bản và UI.                                                                                        |
| **`none`**  | Ngăn trình duyệt ghi đè lên màu sắc do tác giả định nghĩa. Màu sắc của tác giả sẽ được **giữ nguyên**.                                | **Quan trọng** khi màu sắc là yếu tố thông tin (ví dụ: Logo thương hiệu, biểu đồ, hoặc ảnh không mang tính trang trí). |

---

## 💡 Mẹo nhỏ (Pro Tips)

### 1. Bảo vệ Logo và Biểu đồ

Bạn nên đặt `forced-color-adjust: none;` cho các phần tử mà việc thay đổi màu sắc sẽ làm mất đi ý nghĩa hoặc bản sắc của chúng (chẳng hạn như logo hoặc biểu đồ dữ liệu).

```css
/* Bảo vệ logo khỏi bị thay đổi màu sắc trong chế độ tương phản cao */
.logo,
.chart {
  forced-color-adjust: none;
}
```

### 2. Luôn Kiểm tra Tương phản (Accessibility)

Mặc dù thuộc tính này giúp kiểm soát việc ghi đè màu, nguyên tắc cơ bản là luôn đảm bảo màu sắc của bạn đã đạt **chuẩn tương phản tối thiểu (Minimum Contrast)** để hỗ trợ mọi người dùng.

_Lưu ý: Tỷ lệ tương phản tối thiểu theo WCAG AA là **4.5:1**._

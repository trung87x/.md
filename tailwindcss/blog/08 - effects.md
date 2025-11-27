# ✨ CSS EFFECTS: Bóng Đổ, Độ Trong Suốt & Hòa Trộn Màu Sắc

> Nhóm thuộc tính **EFFECTS** cho phép nhà phát triển web áp dụng các hiệu ứng thị giác phức tạp như bóng đổ, độ trong suốt, và chế độ hòa trộn màu sắc, giúp tăng tính thẩm mỹ và chiều sâu cho giao diện.

---

## 1. Bóng Đổ & Độ Trong Suốt (Shadows & Transparency)

| **Thuộc tính**    | **Chức năng**                                              | **Ứng dụng thực tế**                                                         |
| :---------------- | :--------------------------------------------------------- | :--------------------------------------------------------------------------- |
| **`box-shadow`**  | Thêm **bóng đổ** cho toàn bộ phần tử (khung).              | Tạo cảm giác phần tử nổi lên khỏi mặt phẳng (thường dùng cho cards, modals). |
| **`text-shadow`** | Thêm **bóng đổ** cho văn bản.                              | Giúp văn bản nổi bật trên nền phức tạp.                                      |
| **`opacity`**     | Thiết lập **độ trong suốt** của toàn bộ phần tử (0 đến 1). | Dùng để làm mờ dần hình ảnh hoặc làm tối một phần giao diện.                 |

---

## 2. Chế độ Hòa trộn (Blending Modes)

Các thuộc tính này định nghĩa cách các màu sắc của phần tử chồng lên nhau và tương tác với các lớp phía sau.

| **Thuộc tính**              | **Phạm vi tác động**                                            | **Ứng dụng thực tế**                                              |
| :-------------------------- | :-------------------------------------------------------------- | :---------------------------------------------------------------- |
| **`mix-blend-mode`**        | **Phần tử** hòa trộn với nội dung **phía sau** nó (background). | Tạo hiệu ứng chữ đổi màu động khi cuộn qua các ảnh nền khác nhau. |
| **`background-blend-mode`** | **Ảnh nền** hòa trộn với **màu nền** của chính phần tử đó.      | Dùng để áp dụng tông màu thống nhất lên ảnh nền.                  |

---

## 3. Masking (Che phủ nâng cao)

Các thuộc tính `mask-*` sử dụng hình ảnh hoặc gradient như một **khuôn che (stencil)** để xác định phần nào của phần tử được hiển thị, cho phép tạo ra các hình dạng cắt xén phức tạp.

| **Thuộc tính**                                                              | **Chức năng**                                               | **Ghi chú**                                                                     |
| :-------------------------------------------------------------------------- | :---------------------------------------------------------- | :------------------------------------------------------------------------------ |
| **`mask-image`**                                                            | Dùng ảnh (hoặc gradient) làm khuôn che.                     | Tạo hiệu ứng cắt xén hình ảnh theo hình dạng phức tạp.                          |
| **`mask-clip`, `mask-origin`, `mask-position`, `mask-repeat`, `mask-size`** | Các thuộc tính định nghĩa cách thức khuôn che được áp dụng. | Hoạt động tương tự các thuộc tính `background-*` (vị trí, kích thước, lặp lại). |
| **`mask-composite`, `mask-mode`, `mask-type`**                              | Các thuộc tính kiểm soát sự tương tác và loại khuôn che.    | Dùng cho các hiệu ứng che phủ nhiều lớp.                                        |

---

## 🚀 Tóm tắt & Ứng dụng Nâng cao

### 1. Hiệu ứng Chữ theo Màu nền (Blend Mode)

Để làm chữ tự chuyển màu khi nền thay đổi:

```css
h1 {
  color: white; /* Màu chữ cơ sở */
  mix-blend-mode: difference; /* Tạo hiệu ứng nghịch đảo màu nền */
}
```

### 2. Thiết kế Lỗ Khóa (Masking)

Dùng thuộc tính **Mask** để tạo ra một lỗ hổng hình tròn hoặc hình dạng phức tạp trên một lớp màu đơn giản, nhằm để lộ nội dung phía sau. Đây là một kỹ thuật mạnh mẽ cho các gallery ảnh độc đáo.

```css
.masked-element {
  mask-image: radial-gradient(circle at center, black 50%, transparent 50%);
  -webkit-mask-image: radial-gradient(
    circle at center,
    black 50%,
    transparent 50%
  ); /* Hỗ trợ trình duyệt */
}
```

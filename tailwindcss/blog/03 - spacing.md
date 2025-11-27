# 📏 CSS Spacing (Khoảng Cách)

> Đây là nhóm thuộc tính ngắn nhất nhưng được sử dụng **nhiều nhất** trong CSS. Sự khác biệt giữa `padding` và `margin` chính là chìa khóa của mô hình hộp (Box Model).

---

## 🆚 Bảng So Sánh: Padding vs Margin

| **Thuộc tính** | **Tên tiếng Việt** | **Vị trí**                         | **Đặc điểm cốt lõi**                                     | **Khi nào dùng?**                                                             |
| :------------- | :----------------- | :--------------------------------- | :------------------------------------------------------- | :---------------------------------------------------------------------------- |
| **`padding`**  | Đệm trong          | **Bên trong** đường viền (border). | Chịu ảnh hưởng của **màu nền** (background) của phần tử. | Dùng khi muốn "làm mập" phần tử, tạo khoảng thở cho nội dung bên trong khung. |
| **`margin`**   | Lề ngoài           | **Bên ngoài** đường viền (border). | Luôn **trong suốt** (transparent), không có màu nền.     | Dùng để đẩy các phần tử khác ra xa, tạo khoảng cách giữa các khối.            |

---

## 💡 Cách phân biệt dễ nhớ (Nguyên tắc Ngôi Nhà)

Hãy tưởng tượng bạn có một ngôi nhà với hàng rào bao quanh:

1.  **Padding (Sân vườn):** Khoảng đất từ tường nhà ra đến hàng rào.

    - _Đặc điểm:_ Nếu bạn trồng cỏ (tô màu nền), phần sân này cũng sẽ có màu xanh.
    - _Tác dụng:_ Giúp ngôi nhà thoáng đãng hơn bên trong khuôn viên.

2.  **Margin (Đường đi/Hàng xóm):** Khoảng cách từ hàng rào nhà bạn sang hàng rào nhà hàng xóm.
    - _Đặc điểm:_ Là đất công cộng, không thuộc về nhà bạn (trong suốt).
    - _Tác dụng:_ Giúp nhà bạn không bị dính sát vách với nhà bên cạnh.

---

## 🚀 Mẹo dùng trong Tailwind CSS

Tailwind cung cấp các tiền tố hướng (direction) cực kỳ tiện lợi, áp dụng chung cho cả `p` (padding) và `m` (margin):

- **`t`** (top): Bên trên (VD: `pt-4`, `mt-4`)
- **`b`** (bottom): Bên dưới (VD: `pb-4`, `mb-4`)
- **`l`** (left): Bên trái (VD: `pl-4`, `ml-4`)
- **`r`** (right): Bên phải (VD: `pr-4`, `mr-4`)
- **`x`** (x-axis): Trục ngang - Trái & Phải (VD: `px-4`, `mx-4`)
- **`y`** (y-axis): Trục dọc - Trên & Dưới (VD: `py-4`, `my-4`)
- **Không có hướng:** Áp dụng đều cả 4 phía (VD: `p-4`, `m-4`)

> **Công thức Button đẹp:**
> Thường có đệm ngang (`px`) gấp đôi đệm dọc (`py`).
>
> Ví dụ: `px-4 py-2 rounded bg-blue-500 text-white`

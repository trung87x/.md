# 🎨 CSS Backgrounds (Nền)

> Nhóm thuộc tính này kiểm soát mọi thứ nằm "phía sau" nội dung, từ màu sắc đơn giản, hình ảnh, gradient cho đến các hiệu ứng cuộn trang nghệ thuật.

---

## 🖼️ 1. Hình Ảnh & Hiển Thị Cơ Bản (Basic & Sizing)

| **Thuộc tính**            | **Chức năng chính**            | **Ghi chú / Mẹo (Best Practices)**                                                                                                                                      |
| :------------------------ | :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`background-color`**    | Tô màu nền.                    | Luôn nên đặt một màu nền dự phòng trong trường hợp ảnh nền không tải được.                                                                                              |
| **`background-image`**    | Đặt ảnh nền hoặc **Gradient**. | Trong CSS, Gradient (màu chuyển sắc) được coi là một hình ảnh (`linear-gradient(...)`).                                                                                 |
| **`background-size`**     | Kích thước ảnh nền.            | <br> **Quan trọng:** <br>• `cover`: Lấp đầy khung (ảnh có thể bị cắt) - Dùng cho banner/hero section. <br>• `contain`: Hiển thị toàn bộ ảnh (có thể thừa khoảng trắng). |
| **`background-position`** | Vị trí đặt ảnh nền.            | `center`, `top`, `bottom`... Giúp chọn điểm trọng tâm của ảnh khi dùng `cover`.                                                                                         |
| **`background-repeat`**   | Lặp lại ảnh nền hay không.     | Mặc định là lặp (`repeat`). Hiện đại thường dùng `no-repeat` cho ảnh đơn.                                                                                               |

## 🎢 2. Hành Vi & Tương Tác (Behavior & Advanced)

| **Thuộc tính**              | **Chức năng chính**               | **Ghi chú / Mẹo (Best Practices)**                                                                                         |
| :-------------------------- | :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| **`background-attachment`** | Cố định nền khi cuộn trang.       | • `scroll` (Mặc định): Nền cuộn theo nội dung. <br>• `fixed`: Tạo hiệu ứng **Parallax** (nền đứng yên, nội dung trôi qua). |
| **`background-clip`**       | Kiểm soát vùng hiển thị của nền.  | • `border-box`: Tô nền ra tận viền. <br>• `text`: **Cực hay** - Dùng để làm chữ màu Gradient (cắt nền theo hình dáng chữ). |
| **`background-origin`**     | Điểm bắt đầu tính tọa độ của nền. | Ít dùng hơn `clip`. Xác định nền bắt đầu từ viền (`border`) hay từ nội dung (`content`).                                   |

---

## 💡 Mẹo nhỏ (Pro Tips)

### 1. Công thức Banner chuẩn (Hero Section)

Để làm một cái ảnh bìa đầu trang đẹp, luôn căn giữa và phủ kín màn hình bất kể thiết bị:

```css
.hero {
  background-image: url("image.jpg");
  background-size: cover; /* Phủ kín, không méo */
  background-position: center; /* Luôn lấy trung tâm ảnh làm chuẩn */
  background-repeat: no-repeat;
}
/* Tailwind: bg-cover bg-center bg-no-repeat */
```

### 🎨 2. Chữ màu Gradient (Text Gradient)

Muốn chữ có màu cầu vồng hoặc chuyển sắc? Bạn cần kết hợp `background-clip` để cắt nền theo hình dáng chữ và `color: transparent` để hiển thị nền đó.

**CSS Thuần:**

```css
.gradient-text {
  background-image: linear-gradient(
    to right,
    #3b82f6,
    #9333ea
  ); /* 1. Tạo nền chuyển sắc (Xanh -> Tím) */
  background-clip: text; /* 2. Cắt nền theo khuôn chữ */
  -webkit-background-clip: text; /* Hỗ trợ Safari/Chrome */
  color: transparent; /* 3. Chữ phải trong suốt để nhìn thấy nền phía sau */
}
```

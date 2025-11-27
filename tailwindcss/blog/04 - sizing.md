# 📏 CSS Sizing (Kích Thước)

> Nếu `width` và `height` là kích thước mong muốn, thì `min` và `max` là "kỷ luật thép" để đảm bảo giao diện không bao giờ bị biến dạng quá mức cho phép.

---

## 📐 1. Chiều Rộng (Width Properties)

| **Thuộc tính**  | **Chức năng**                             | **Khi nào dùng?**                                                                                                                                                 |
| :-------------- | :---------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`width`**     | Thiết lập độ rộng cố định hoặc tương đối. | Dùng để định hình kích thước cơ bản. Trong Tailwind: `w-full` (100%), `w-screen` (100vw).                                                                         |
| **`min-width`** | Độ rộng **tối thiểu** (Sàn).              | **Quan trọng:** Ngăn phần tử bị bóp méo quá nhỏ khi màn hình thu hẹp. <br> _Ví dụ:_ Một cái nút bấm (Button) không nên nhỏ hơn 100px dù ở trên điện thoại bé xíu. |
| **`max-width`** | Độ rộng **tối đa** (Trần).                | **Cực kỳ quan trọng:** Giúp nội dung dễ đọc trên màn hình to (không bị dài lê thê) hoặc giúp ảnh co lại trên màn hình nhỏ.                                        |

## 📐 2. Chiều Cao (Height Properties)

| **Thuộc tính**   | **Chức năng**         | **Khi nào dùng?**                                                                                                   |
| :--------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------ |
| **`height`**     | Thiết lập độ cao.     | Thường ít dùng độ cao cố định (`px`) cho chứa văn bản để tránh tràn chữ. Nên dùng `h-auto` (tự động theo nội dung). |
| **`min-height`** | Độ cao **tối thiểu**. | Dùng cho các phần Hero Section (banner đầu trang) để đảm bảo nó luôn cao ít nhất bằng màn hình (`min-h-screen`).    |
| **`max-height`** | Độ cao **tối đa**.    | Dùng khi làm các danh sách cuộn (scroll) hoặc accordion để giới hạn vùng hiển thị.                                  |

---

## 💡 Mẹo tư duy (Mindset)

### 1. Quy tắc "Cái Trần & Cái Sàn"

Hãy tưởng tượng kích thước phần tử như một căn phòng:

- **`min-width/height` (Sàn):** Bạn không thể lún xuống dưới mức này. Giúp bảo vệ nội dung không bị đè bẹp.
- **`max-width/height` (Trần):** Bạn không thể cao hơn mức này. Giúp giao diện gọn gàng.

### 2. Responsive Image (Ảnh thích ứng)

Để một bức ảnh không bao giờ vỡ giao diện, công thức kinh điển luôn là:

```css
img {
  max-width: 100%; /* Không bao giờ to hơn khung chứa nó */
  height: auto; /* Chiều cao tự tính theo tỷ lệ */
}
```

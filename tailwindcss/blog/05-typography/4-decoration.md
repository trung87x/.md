Tuyệt vời! Chủ đề **Decoration (Trang trí Văn bản)** là phần cuối cùng trong nhóm tiện ích kiểu chữ, giúp bạn thêm các đường nét như gạch chân, gạch ngang và kiểm soát vị trí của chúng.

Tôi sẽ tổng hợp nội dung từ các tiện ích bạn cung cấp để tạo ra một bài blog ngắn gọn và đầy đủ.

---

# 🎨 Trang Trí Văn Bản: Decoration Trong Tailwind CSS

Bộ tiện ích này giúp bạn kiểm soát các hiệu ứng trang trí trực quan trên văn bản, chủ yếu là các đường kẻ như gạch chân, gạch ngang và cách chúng hiển thị.

## 1\. ➖ Đường Kẻ Trang Trí: `text-decoration-line`

`text-decoration-line` (`underline`, `line-through`,...) xác định **loại đường kẻ** sẽ được áp dụng cho văn bản.

| **Class**          | **CSS Property**                      | **Mô tả**                                                    |
| ------------------ | ------------------------------------- | ------------------------------------------------------------ |
| **`underline`**    | `text-decoration-line: underline;`    | **Gạch chân.** (Thường dùng cho liên kết).                   |
| **`line-through`** | `text-decoration-line: line-through;` | **Gạch ngang** (thường dùng cho văn bản đã lỗi thời/bị xóa). |
| `overline`         | `text-decoration-line: overline;`     | **Gạch trên.**                                               |
| **`no-underline`** | `text-decoration-line: none;`         | **Loại bỏ** tất cả các đường kẻ trang trí.                   |

**Ví dụ:**

HTML

    <p class="line-through text-gray-500">Giá cũ 1.000.000đ</p>

---

## 2\. 〰️ Kiểu Đường Kẻ: `text-decoration-style`

`text-decoration-style` (`decoration-`) kiểm soát **kiểu dáng** của đường kẻ trang trí (chỉ hoạt động trên các trình duyệt hiện đại).

| **Class**               | **CSS Property**                 | **Mô tả**                                              |
| ----------------------- | -------------------------------- | ------------------------------------------------------ |
| **`decoration-solid`**  | `text-decoration-style: solid;`  | Đường kẻ **đặc** (Mặc định).                           |
| **`decoration-double`** | `text-decoration-style: double;` | Đường kẻ **kép** (hai đường).                          |
| `decoration-dotted`     | `text-decoration-style: dotted;` | Đường kẻ **chấm chấm**.                                |
| `decoration-dashed`     | `text-decoration-style: dashed;` | Đường kẻ **gạch ngang**.                               |
| `decoration-wavy`       | `text-decoration-style: wavy;`   | Đường kẻ **lượn sóng** (Thường dùng cho lỗi chính tả). |

**Lưu ý:** Bạn có thể kết hợp thuộc tính này với tiện ích màu sắc (`text-decoration-color`) và độ dày (`text-decoration-thickness`) (sẽ không có trong bài này nhưng là các tiện ích liên quan).

**Ví dụ:**

HTML

    <a class="underline decoration-double text-blue-600 decoration-blue-500" href="#">Liên kết</a>

---

## 3\. 🖱️ Vị Trí Đường Kẻ: `text-underline-offset`

`text-underline-offset` (`underline-offset-`) kiểm soát **khoảng cách dọc** giữa đường gạch chân và văn bản.

| **Class**                   | **CSS Property**               | **Mô tả**                                         |
| --------------------------- | ------------------------------ | ------------------------------------------------- |
| **`underline-offset-auto`** | `text-underline-offset: auto;` | (Mặc định) Trình duyệt tự động đặt vị trí tối ưu. |
| **`underline-offset-4`**    | `text-underline-offset: 4px;`  | Đặt khoảng cách cố định (ví dụ: 4px).             |

**Thường dùng:** Việc tăng offset giúp gạch chân không bị dính sát vào các chữ cái có phần đuôi dài (`g`, `y`, `p`), cải thiện tính thẩm mỹ và dễ đọc.

**Ví dụ:**

HTML

    <span class="underline underline-offset-4">Văn bản gạch chân đẹp hơn</span>

---

**🔥 Tóm tắt Decoration:**

- **Gạch chân/Ngang:** Dùng **`underline`** hoặc **`line-through`**.
- **Xóa Gạch chân:** Dùng **`no-underline`**.
- **Kiểu dáng:** Dùng **`decoration-double`** (hoặc `wavy`).
- **Khoảng cách:** Dùng **`underline-offset-4`** để gạch chân tách biệt khỏi chữ cái.

Vậy là chúng ta đã hoàn thành tất cả các tiện ích chính trong nhóm **Typography (Kiểu chữ)**! Bạn muốn chuyển sang nhóm tiện ích **Backgrounds (Nền)** hay nhóm tiện ích **Borders (Đường viền)**?

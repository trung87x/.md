Tuyệt vời! Chủ đề **Height Properties (Các thuộc tính Chiều cao)** là đối tác hoàn hảo của các tiện ích chiều rộng, giúp bạn kiểm soát kích thước dọc của các phần tử trong bố cục.

Tôi sẽ tổng hợp nội dung từ `height`, `min-height`, và `max-height` để tạo ra một bài blog ngắn gọn, đầy đủ, tập trung vào cách định cỡ chiều cao.

---

# ↕️ Kiểm Soát Chiều Cao: `height`, `min-height` & `max-height` Trong Tailwind CSS

Bộ tiện ích này giúp bạn kiểm soát kích thước dọc của các phần tử, đảm bảo bố cục không bị phá vỡ hoặc mở rộng một cách không kiểm soát.

## 1\. 📏 Đặt Chiều Cao Cố Định/Tương Đối: `height` (`h-`)

Tiện ích `h-` cho phép bạn đặt chiều cao cụ thể cho một phần tử. Tương tự như chiều rộng, Tailwind cung cấp các giá trị đa dạng từ đơn vị cố định đến phần trăm.

| **Class**                               | **CSS Property**                                         | **Mô tả**                                               |
| --------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------- |
| **`h-<n>`**                             | `height: <value>;`                                       | Giá trị cụ thể (ví dụ: `h-10` là 2.5rem/40px).          |
| **`h-1/2`**                             | `height: 50%;`                                           | Chiều cao theo **phần trăm** (50% chiều cao khối chứa). |
| **`h-full`**                            | `height: 100%;`                                          | Chiếm **toàn bộ** chiều cao có sẵn của khối chứa.       |
| **`h-auto`**                            | `height: auto;`                                          | Chiều cao tự động (mặc định, theo nội dung).            |
| **`h-screen`**                          | `height: 100vh;`                                         | Chiếm **toàn bộ** chiều cao của viewport (màn hình).    |
| **`h-fit`** / **`h-max`** / **`h-min`** | `height: fit-content;` / `max-content;` / `min-content;` | Giá trị chiều cao theo nội dung.                        |

**Ví dụ:**

- Tạo một khối có chiều cao cố định 20 đơn vị:

  HTML

      <div class="h-20 bg-gray-300">...</div>

- Tạo một layout chiếm toàn bộ màn hình người dùng:

  HTML

      <div class="min-h-screen">...</div>

## 2\. ⬇️ Chiều Cao Tối Thiểu: `min-height` (`min-h-`)

`min-h-` đặt giới hạn **nhỏ nhất** cho chiều cao của phần tử. Phần tử có thể mở rộng nếu nội dung yêu cầu, nhưng **không thể nhỏ hơn** giá trị này. Đây là tiện ích **cực kỳ quan trọng** cho các layout yêu cầu chiều cao tối thiểu.

| **Class**          | **CSS Property**     | **Mô tả**                                                                                 |
| ------------------ | -------------------- | ----------------------------------------------------------------------------------------- |
| **`min-h-0`**      | `min-height: 0px;`   | (Mặc định) Chiều cao tối thiểu bằng 0.                                                    |
| **`min-h-full`**   | `min-height: 100%;`  | Chiều cao tối thiểu bằng chiều cao của khối chứa (yêu cầu khối chứa có chiều cao cụ thể). |
| **`min-h-screen`** | `min-height: 100vh;` | **Quan trọng nhất.** Đảm bảo phần tử luôn chiếm **ít nhất** toàn bộ chiều cao màn hình.   |

**Ví dụ thường dùng:**

Để đảm bảo phần nội dung chính (main content) luôn lấp đầy màn hình, ngăn chân trang (footer) trôi lên giữa trang nếu nội dung ngắn:

HTML

    <main class="min-h-screen">
        </main>
    <footer>...</footer>

## 3\. ⬆️ Chiều Cao Tối Đa: `max-height` (`max-h-`)

`max-h-` đặt giới hạn **lớn nhất** cho chiều cao của phần tử. Phần tử không thể lớn hơn giá trị này. Thường dùng để giới hạn kích thước của các hộp thoại (modal) hoặc vùng cuộn.

| **Class**          | **CSS Property**      | **Mô tả**                                                       |
| ------------------ | --------------------- | --------------------------------------------------------------- |
| **`max-h-none`**   | `max-height: none;`   | (Mặc định) Không có giới hạn.                                   |
| **`max-h-full`**   | `max-height: 100%;`   | Chiều cao tối đa bằng chiều cao khối chứa.                      |
| **`max-h-screen`** | `max-height: 100vh;`  | Giới hạn chiều cao tối đa bằng chiều cao màn hình.              |
| **`max-h-<size>`** | `max-height: <size>;` | Giới hạn chiều cao bằng một giá trị cụ thể (ví dụ: `max-h-96`). |

**Ví dụ thường dùng:**

Tạo một hộp chứa có thể cuộn (scrollable container) khi nội dung quá dài:

HTML

    <div class="max-h-96 overflow-y-auto border">
        </div>

---

**🔥 Tóm tắt Chiều Cao:**

- **Chiều cao cố định:** Dùng **`h-20`** hoặc **`h-1/2`**.
- **Đảm bảo chiều cao tối thiểu:** Dùng **`min-h-screen`** (rất quan trọng cho layout).
- **Tạo vùng cuộn:** Dùng **`max-h-96`** kết hợp với **`overflow-y-auto`**.
- **Chiều cao 100%:** Dùng **`h-full`** (cần khối cha có chiều cao cố định).

Vậy là chúng ta đã hoàn thành nhóm tiện ích Sizing! Bạn muốn tiếp tục với nhóm tiện ích **Typography (Kiểu chữ)** hay nhóm tiện ích nào khác?

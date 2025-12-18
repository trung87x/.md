Tuyệt vời! Chủ đề **Positioning & Stacking (Định vị & Xếp chồng)** là nền tảng để tạo ra các bố cục nâng cao, đặc biệt là các thành phần chồng lấp như modal, tooltip và dropdown.

Tôi sẽ tổng hợp nội dung từ các đường link bạn cung cấp để tạo ra một bài blog ngắn gọn, đầy đủ, tập trung vào `position`, `t/r/b/l`, `visibility`, và `z-index`.

---

# 📍 Positioning & Z-Index: Kiểm Soát Vị Trí Chính Xác Trong Tailwind CSS

Bộ tiện ích này giúp bạn kiểm soát vị trí chính xác của các phần tử và thứ tự chúng xếp chồng lên nhau theo chiều sâu (trục Z).

## 1\. 🧭 Thiết Lập Vị Trí: `position`

Tiện ích này xác định cách một phần tử được đặt trong bố cục và cách các thuộc tính tọa độ (`top, left,...`) tác động lên nó.

| **Class**      | **CSS Property**      | **Mô tả**                                                                                                       |
| -------------- | --------------------- | --------------------------------------------------------------------------------------------------------------- |
| **`static`**   | `position: static;`   | (Mặc định) Theo luồng tài liệu.                                                                                 |
| **`relative`** | `position: relative;` | Vị trí tương đối, dịch chuyển **so với vị trí ban đầu**. Rất hay dùng làm **khối chứa** cho phần tử `absolute`. |
| **`absolute`** | `position: absolute;` | Vị trí tuyệt đối, định vị **so với khối cha gần nhất có `position` khác `static`** (thường là `relative`).      |
| **`fixed`**    | `position: fixed;`    | Cố định vị trí **so với cửa sổ trình duyệt** (thanh điều hướng).                                                |
| **`sticky`**   | `position: sticky;`   | Cố định vị trí **khi cuộn qua điểm ngưỡng** (thanh bên/sidebar).                                                |

**Quy tắc vàng:** Để đặt một phần tử con ở vị trí tuyệt đối (ví dụ: góc trên bên phải), hãy đặt khối chứa của nó là **`relative`** và phần tử con là **`absolute`**.

## 2\. 📏 Điều Chỉnh Tọa Độ: `top/right/bottom/left` (T/R/B/L)

Sau khi đặt `position` (trừ `static`), bạn dùng các tiện ích này để xác định tọa độ. Tailwind CSS cung cấp các giá trị linh hoạt, bao gồm cả giá trị âm.

| **Class**                | **Style**                               | **Mô tả & Ví dụ**                                                                |
| ------------------------ | --------------------------------------- | -------------------------------------------------------------------------------- |
| **`inset-0`**            | `top: 0; right: 0; bottom: 0; left: 0;` | Bao phủ toàn bộ khối chứa (thường dùng với `absolute`).                          |
| **`top-4` / `bottom-0`** | `top: 1rem;` / `bottom: 0;`             | Đặt tọa độ cụ thể.                                                               |
| **`start-0` / `end-0`**  | `left: 0;` / `right: 0;`                | Tương thích với các chế độ đọc (Left-to-Right / Right-to-Left).                  |
| **`inset-x-auto`**       | `left: auto; right: auto;`              | Dùng để **căn giữa** phần tử `absolute` khi kết hợp với `w-full` hoặc `mx-auto`. |

**Ví dụ Định vị Tuyệt đối:**

HTML

    <div class="relative h-48">
        <button class="absolute top-2 right-2">X</button>
    </div>

## 3\. 👻 Khả Năng Hiển Thị: `visibility`

Tiện ích này kiểm soát việc phần tử có hiển thị hay không, nhưng **vẫn giữ nguyên không gian** mà nó chiếm dụng trong bố cục.

| **Class**       | **CSS Property**       | **Mô tả**                                             |
| --------------- | ---------------------- | ----------------------------------------------------- |
| **`visible`**   | `visibility: visible;` | Hiển thị phần tử.                                     |
| **`invisible`** | `visibility: hidden;`  | **Ẩn phần tử, nhưng vẫn giữ chỗ trống** trong bố cục. |

**So sánh với `hidden` (`display: none`):**

- `hidden` loại bỏ phần tử hoàn toàn khỏi bố cục (không chiếm không gian).
- `invisible` chỉ ẩn hình ảnh phần tử, nhưng phần tử **vẫn giữ không gian** và vẫn có thể tương tác (mặc dù thường đi kèm với `pointer-events-none`).

## 4\. 疊 Thứ Tự Xếp Chồng: `z-index`

`z-index` kiểm soát thứ tự xếp chồng (lớp) của các phần tử đã được định vị (`relative`, `absolute`, `fixed`, `sticky`) khi chúng chồng lên nhau. Số lớn hơn sẽ nằm trên.

| **Class**                | **CSS Property**                 | **Mô tả**                                      |
| ------------------------ | -------------------------------- | ---------------------------------------------- |
| **`z-0`** đến **`z-50`** | `z-index: 0;` đến `z-index: 50;` | Cung cấp các giá trị bước nhảy (thường là 10). |
| **`z-auto`**             | `z-index: auto;`                 | Mặc định.                                      |

**Ví dụ:**

HTML

    <div class="relative">
        <div class="absolute inset-0 z-10 bg-black/50">Mặt nạ (Overlay)</div>
        <div class="relative z-20">Nội dung (Phải nằm trên)</div>
    </div>

---

**🔥 Tóm tắt nhanh và gọn:**

- **Thiết lập:** Dùng **`relative`** cho khối chứa và **`absolute`** cho phần tử con.
- **Định vị:** Dùng **`inset-x-0`** hoặc **`top-4`** để đặt tọa độ.
- **Xếp chồng:** Dùng **`z-index`** (ví dụ: `z-10`, `z-20`) để đặt thứ tự lớp.
- **Ẩn giữ chỗ:** Dùng **`invisible`**.

Bạn có muốn chuyển sang nhóm tiện ích **Sizing (Kích thước)** không?

Tuyệt vời! **Flexbox** là chủ đề không thể thiếu để xây dựng các bố cục hiện đại, linh hoạt và đáp ứng. Tôi sẽ tổng hợp tất cả các tiện ích bạn gửi (`flex-direction`, `flex-wrap`, `flex-basis`, `flex-grow`, `flex-shrink`, `flex`, `order`) thành một bài blog ngắn gọn, đầy đủ về Flexbox.

---

# 📦 Thiết Kế Bố Cục Linh Hoạt: Cơ Bản Về Flexbox Trong Tailwind CSS

Flexbox (Flexible Box Layout) là mô hình layout một chiều, giúp bạn dễ dàng căn chỉnh và phân phối không gian giữa các mục trong một khối chứa. Để sử dụng Flexbox, bạn luôn cần bắt đầu bằng class **`flex`**.

## 1\. 🧭 Thiết Lập Hướng & Dòng Chảy

Sau khi đặt `display: flex;` (`flex`), bạn kiểm soát trục chính (main axis) và cách các mục sắp xếp trên nhiều dòng.

| **Class**       | **CSS Property**          | **Mô tả**                                                |
| --------------- | ------------------------- | -------------------------------------------------------- |
| **`flex-row`**  | `flex-direction: row;`    | (Mặc định) Các mục chạy **ngang**, từ trái sang phải.    |
| **`flex-col`**  | `flex-direction: column;` | Các mục chạy **dọc**, từ trên xuống dưới.                |
| **`flex-wrap`** | `flex-wrap: wrap;`        | Cho phép các mục **xuống dòng** khi không đủ không gian. |
| `flex-nowrap`   | `flex-wrap: nowrap;`      | (Mặc định) Ép các mục giữ nguyên trên **một dòng**.      |

**💡 Lưu ý:** Dùng `flex-row-reverse` và `flex-col-reverse` để đảo ngược hướng chạy.

## 2\. 📈 Kiểm Soát Kích Thước Linh Hoạt (Flex Items)

Các tiện ích này được áp dụng cho **phần tử con** (flex items) để chúng co giãn như thế nào trong khối chứa.

### A. Kích Thước Cơ Sở: `flex-basis`

`flex-basis` đặt kích thước mặc định cho một mục **trước** khi các quy tắc co giãn (`grow`/`shrink`) được áp dụng.

| **Class**        | **Style**           | **Mô tả**                                    |
| ---------------- | ------------------- | -------------------------------------------- |
| **`basis-1/2`**  | `flex-basis: 50%;`  | Thiết lập kích thước cơ sở là 50% khối chứa. |
| **`basis-auto`** | `flex-basis: auto;` | Dùng kích thước nội dung mặc định.           |

### B. Mở Rộng: `flex-grow`

`flex-grow` cho phép một mục **mở rộng** để lấp đầy không gian trống nếu có.

| **Class**    | **Style**       | **Mô tả**                                       |
| ------------ | --------------- | ----------------------------------------------- |
| **`grow`**   | `flex-grow: 1;` | Cho phép mục mở rộng để chiếm không gian trống. |
| **`grow-0`** | `flex-grow: 0;` | Ngăn mục mở rộng (kích thước cố định).          |

### C. Thu Hẹp: `flex-shrink`

`flex-shrink` cho phép một mục **thu hẹp** lại khi không gian quá hẹp.

| **Class**      | **Style**         | **Mô tả**                         |
| -------------- | ----------------- | --------------------------------- |
| **`shrink`**   | `flex-shrink: 1;` | Cho phép mục thu hẹp lại khi cần. |
| **`shrink-0`** | `flex-shrink: 0;` | Ngăn mục thu hẹp (dễ gây tràn).   |

## 3\. 🪄 Tiện Ích Tổng Hợp & Thứ Tự: `flex` & `order`

### A. Tiện Ích Tổng Hợp (`flex`)

`flex` là cách viết tắt của `flex-grow`, `flex-shrink`, và `flex-basis`.

| **Class**       | **grow, shrink, basis** | **Mô tả**                                                                                                                               |
| --------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`flex-1`**    | `1 1 0%`                | Mục linh hoạt hoàn toàn: **Mở rộng**, **thu hẹp**, và bắt đầu từ **0%** kích thước. (Thường dùng cho các mục cần chiếm không gian đều). |
| **`flex-auto`** | `1 1 auto`              | Mục linh hoạt, bắt đầu từ **kích thước nội dung** (`auto`).                                                                             |
| **`flex-none`** | `0 0 auto`              | Mục cố định: **Không mở rộng**, **không thu hẹp**, theo kích thước nội dung (`auto`).                                                   |

### B. Thứ Tự Hiển Thị: `order`

`order` cho phép bạn thay đổi thứ tự trực quan của các mục **mà không cần thay đổi thứ tự trong HTML**.

| **Class**                        | **CSS Property**             | **Mô tả**                                       |
| -------------------------------- | ---------------------------- | ----------------------------------------------- |
| **`order-1`** đến **`order-12`** | `order: 1;` đến `order: 12;` | Đặt thứ tự hiển thị. Số nhỏ hơn hiển thị trước. |
| **`order-first`**                | `order: -9999;`              | Luôn hiển thị đầu tiên.                         |
| **`order-last`**                 | `order: 9999;`               | Luôn hiển thị cuối cùng.                        |
| `order-none`                     | `order: 0;`                  | Về thứ tự mặc định.                             |

**Ví dụ:**

HTML

    <div class="flex">
        <div class="flex-1 order-last">Mục này sẽ xuất hiện cuối cùng</div>
        <div class="flex-1 order-1">Mục này sẽ xuất hiện đầu tiên</div>
    </div>

---

**🔥 Tóm tắt Flexbox:**

1.  **Khối chứa:** Dùng **`flex`** và **`flex-row`** / **`flex-col`** (hướng).
2.  **Mục con (Item):**

    - **`flex-1`**: Item chiếm không gian còn lại một cách đều đặn.
    - **`flex-auto`**: Item co giãn nhưng bắt đầu từ kích thước nội dung.
    - **`shrink-0`**: Ngăn Item bị thu hẹp.

3.  **Điều chỉnh vị trí:** Dùng **`order-*`**.

Bạn có muốn chuyển sang các tiện ích **Căn chỉnh (Justify Content, Align Items,...)** trong Flexbox không?

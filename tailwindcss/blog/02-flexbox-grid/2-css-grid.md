Tuyệt vời! **CSS Grid** là mô hình layout hai chiều cực kỳ mạnh mẽ, lý tưởng để thiết kế các khu vực bố cục lớn, phức tạp.

Tôi sẽ tổng hợp tất cả các tiện ích bạn cung cấp để tạo ra một bài blog ngắn gọn, đầy đủ về CSS Grid trong Tailwind CSS.

---

# 🌐 Thiết Kế Bố Cục Hai Chiều: Nâng Cao Với CSS Grid Trong Tailwind CSS

CSS Grid (Lưới) là một hệ thống layout hai chiều (hàng và cột), cho phép bạn sắp xếp các phần tử vào các ô, hàng và cột cụ thể một cách dễ dàng và mạnh mẽ hơn Flexbox. Để sử dụng Grid, bạn luôn cần bắt đầu bằng class **`grid`**.

## 1\. 📐 Khởi Tạo & Định Nghĩa Lưới

Các tiện ích này được áp dụng cho **khối chứa Grid** (`grid`) để xác định cấu trúc của lưới (số lượng cột và hàng).

### A. Cấu Trúc Cột: `grid-template-columns`

Xác định số lượng và kích thước của các cột trong lưới.

| **Class**                 | **CSS Property**                                      | **Mô tả**                                                       |
| ------------------------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| **`grid-cols-<n>`**       | `grid-template-columns: repeat(<n>, minmax(0, 1fr));` | Tạo lưới có `<n>` cột đều nhau.                                 |
| **`grid-cols-none`**      | `grid-template-columns: none;`                        | Loại bỏ cấu trúc cột.                                           |
| **`grid-cols-[<value>]`** | Tùy chỉnh                                             | Dùng giá trị CSS custom (ví dụ: `grid-cols-[200px_1fr_100px]`). |

### B. Cấu Trúc Hàng: `grid-template-rows`

Xác định số lượng và kích thước của các hàng trong lưới.

| **Class**            | **CSS Property**                                   | **Mô tả**                        |
| -------------------- | -------------------------------------------------- | -------------------------------- |
| **`grid-rows-<n>`**  | `grid-template-rows: repeat(<n>, minmax(0, 1fr));` | Tạo lưới có `<n>` hàng đều nhau. |
| **`grid-rows-none`** | `grid-template-rows: none;`                        | Loại bỏ cấu trúc hàng.           |

**Ví dụ khởi tạo:**

HTML

    <div class="grid grid-cols-4">...</div>

## 2\. 🧱 Đặt Vị Trí Phần Tử: `grid-column` & `grid-row`

Các tiện ích này được áp dụng cho **phần tử con** (grid items) để xác định nó chiếm bao nhiêu cột/hàng và bắt đầu/kết thúc từ đường kẻ nào.

### A. Chiếm Cột: `grid-column`

| **Class**           | **Style**                           | **Mô tả**                       |
| ------------------- | ----------------------------------- | ------------------------------- |
| **`col-span-<n>`**  | `grid-column: span <n> / span <n>;` | Phần tử chiếm `<n>` cột.        |
| **`col-start-<n>`** | `grid-column-start: <n>;`           | Bắt đầu tại đường kẻ số `<n>`.  |
| **`col-end-<n>`**   | `grid-column-end: <n>;`             | Kết thúc tại đường kẻ số `<n>`. |
| **`col-auto`**      | `grid-column: auto;`                | Kích thước tự động (mặc định).  |

### B. Chiếm Hàng: `grid-row`

Tương tự như cột, nhưng áp dụng cho hàng.

| **Class**          | **Style**                        | **Mô tả**                 |
| ------------------ | -------------------------------- | ------------------------- |
| **`row-span-<n>`** | `grid-row: span <n> / span <n>;` | Phần tử chiếm `<n>` hàng. |

**Ví dụ đặt vị trí:**

HTML

    <div class="col-span-2 row-span-3">Header Lớn</div>

## 3\. 🔄 Dòng Chảy Tự Động & Kích Thước Tự Động

Các tiện ích này kiểm soát cách các phần tử tự động điền vào lưới và cách các hàng/cột được tạo ra tự động có kích thước.

### A. Dòng Chảy Tự Động: `grid-auto-flow`

| **Class**             | **CSS Property**          | **Mô tả**                                      |
| --------------------- | ------------------------- | ---------------------------------------------- |
| **`grid-flow-row`**   | `grid-auto-flow: row;`    | (Mặc định) Lấp đầy theo hàng.                  |
| **`grid-flow-col`**   | `grid-auto-flow: column;` | Lấp đầy theo cột.                              |
| **`grid-flow-dense`** | `grid-auto-flow: dense;`  | Cố gắng lấp đầy các ô trống nhỏ hơn (dày đặc). |

### B. Kích Thước Tự Động: `grid-auto-columns` / `grid-auto-rows`

Xác định kích thước của các hàng/cột được tạo ra khi phần tử tràn ra ngoài lưới đã định nghĩa.

| **Class**           | **Style**                      | **Mô tả**                                 |
| ------------------- | ------------------------------ | ----------------------------------------- |
| **`auto-cols-fr`**  | `grid-auto-columns: 1fr;`      | Cột tự động chiếm hết không gian còn lại. |
| **`auto-rows-min`** | `grid-auto-rows: min-content;` | Hàng tự động chỉ cao bằng nội dung.       |

## 4\. 🔗 Khoảng Cách: `gap`

`gap` tạo khoảng cách giữa các ô (grid cell) trong lưới.

| **Class**          | **Style**             | **Mô tả**                           |
| ------------------ | --------------------- | ----------------------------------- |
| **`gap-<size>`**   | `gap: <size>;`        | Khoảng cách đều cho cả hàng và cột. |
| **`gap-x-<size>`** | `column-gap: <size>;` | Khoảng cách giữa các cột.           |
| **`gap-y-<size>`** | `row-gap: <size>;`    | Khoảng cách giữa các hàng.          |

**Ví dụ:**

HTML

    <div class="grid grid-cols-3 gap-4">...</div>

---

**🔥 Tóm tắt Grid:**

1.  **Bắt đầu:** **`grid`** trên khối chứa.
2.  **Định nghĩa:** **`grid-cols-n`** và **`grid-rows-n`**.
3.  **Vị trí Item:** Dùng **`col-span-n`** và **`row-span-n`**.
4.  **Khoảng cách:** Dùng **`gap-n`**.

Grid là công cụ lý tưởng để xây dựng các Layout hai chiều phức tạp như Gallery hoặc Layout trang web tổng thể!

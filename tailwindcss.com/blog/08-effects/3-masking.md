Tuyệt vời! Chủ đề cuối cùng này là **Masking (Mặt nạ)**, một tính năng nâng cao và mạnh mẽ, cho phép bạn sử dụng hình ảnh hoặc gradient làm mặt nạ để che giấu hoặc làm lộ các phần của một phần tử.

Tôi sẽ tổng hợp tất cả các tiện ích `mask-` bạn cung cấp để tạo ra một bài blog ngắn gọn, đầy đủ về cách kiểm soát Masking trong Tailwind CSS.

---

# 🎭 Sáng Tạo Hình Dáng: Bộ Công Cụ Masking Trong Tailwind CSS

**Masking** (Tạo mặt nạ) là một kỹ thuật CSS cho phép bạn áp dụng hình ảnh (hoặc gradient) để xác định độ trong suốt của một phần tử. Các khu vực màu trắng của mặt nạ sẽ hiển thị phần tử, trong khi các khu vực màu đen sẽ ẩn nó.

## 1\. 🖼️ Hình Ảnh Mặt Nạ: `mask-image`

`mask-image` (`mask-`) xác định hình ảnh (hoặc gradient) sẽ được sử dụng làm mặt nạ.

| **Class**                  | **CSS Property**                    | **Mô tả**                                                                |
| -------------------------- | ----------------------------------- | ------------------------------------------------------------------------ |
| **`mask-none`**            | `mask-image: none;`                 | (Mặc định) Không sử dụng mặt nạ.                                         |
| **`mask-[url('...')]`**    | `mask-image: url('...');`           | **Đặt URL hình ảnh tùy chỉnh** làm mặt nạ (thường là file SVG hoặc PNG). |
| **`mask-linear-gradient`** | `mask-image: linear-gradient(...);` | Dùng **gradient** làm mặt nạ để tạo hiệu ứng mờ dần.                     |

**Ví dụ:**

HTML

    <div class="h-64 mask-linear-gradient">...</div>

---

## 2\. 📐 Định Vị & Kích Thước Mặt Nạ

Tương tự như `background`, bạn kiểm soát kích thước và vị trí của hình ảnh mặt nạ.

### A. Kích Thước Mặt Nạ: `mask-size`

| **Class**          | **CSS Property**      | **Mô tả**                                              |
| ------------------ | --------------------- | ------------------------------------------------------ |
| **`mask-auto`**    | `mask-size: auto;`    | (Mặc định) Kích thước gốc.                             |
| **`mask-cover`**   | `mask-size: cover;`   | **Lấp đầy** phần tử chứa (Có thể bị cắt).              |
| **`mask-contain`** | `mask-size: contain;` | **Vừa vặn** với phần tử chứa (Có thể có khoảng trống). |

### B. Vị Trí Mặt Nạ: `mask-position`

| **Class**                          | **CSS Property**                  | **Mô tả**                |
| ---------------------------------- | --------------------------------- | ------------------------ |
| **`mask-center`**                  | `mask-position: center;`          | **Căn giữa** mặt nạ.     |
| **`mask-top`** / **`mask-bottom`** | `mask-position: top;` / `bottom;` | Căn theo cạnh trên/dưới. |

### C. Lặp Lại Mặt Nạ: `mask-repeat`

| **Class**            | **CSS Property**          | **Mô tả**                                        |
| -------------------- | ------------------------- | ------------------------------------------------ |
| **`mask-repeat`**    | `mask-repeat: repeat;`    | **Lặp lại** mặt nạ theo cả hai trục.             |
| **`mask-no-repeat`** | `mask-repeat: no-repeat;` | **Ngăn lặp lại** (Thường dùng với `mask-cover`). |

---

## 3\. ✂️ Phạm Vi Mặt Nạ & Điểm Gốc

### A. Giới Hạn Phạm Vi: `mask-clip`

`mask-clip` kiểm soát phạm vi phần tử mà mặt nạ được áp dụng (tương tự `background-clip`).

| **Class**               | **CSS Property**          | **Mô tả**                                                              |
| ----------------------- | ------------------------- | ---------------------------------------------------------------------- |
| **`mask-clip-padding`** | `mask-clip: padding-box;` | Giới hạn mặt nạ trong khu vực **padding** và nội dung.                 |
| **`mask-clip-content`** | `mask-clip: content-box;` | Giới hạn mặt nạ trong khu vực **nội dung**.                            |
| **`mask-clip-text`**    | `mask-clip: text;`        | Giới hạn mặt nạ chỉ trong khu vực **văn bản** (tạo hiệu ứng đặc biệt). |

### B. Điểm Gốc: `mask-origin`

`mask-origin` xác định điểm tham chiếu mà tại đó `mask-position` bắt đầu tính toán (tương tự `background-origin`).

| **Class**                 | **CSS Property**            | **Mô tả**                                       |
| ------------------------- | --------------------------- | ----------------------------------------------- |
| **`mask-origin-padding`** | `mask-origin: padding-box;` | Điểm gốc là **góc trên bên trái của padding**.  |
| **`mask-origin-content`** | `mask-origin: content-box;` | Điểm gốc là **góc trên bên trái của nội dung**. |

---

## 4\. 🎨 Hòa Trộn Mặt Nạ (Advanced)

### A. Chế Độ Mặt Nạ: `mask-mode`

Xác định cách các giá trị trong mặt nạ được hiểu (thường dùng cho mặt nạ SVG hoặc hình ảnh).

| **Class**                 | **CSS Property**        | **Mô tả**                                               |
| ------------------------- | ----------------------- | ------------------------------------------------------- |
| **`mask-mode-luminance`** | `mask-mode: luminance;` | Dùng **độ sáng** của ảnh làm mặt nạ.                    |
| **`mask-mode-alpha`**     | `mask-mode: alpha;`     | Dùng **kênh alpha (độ trong suốt)** của ảnh làm mặt nạ. |

### B. Kết Hợp Mặt Nạ: `mask-composite`

Khi sử dụng nhiều hình ảnh mặt nạ, tiện ích này kiểm soát cách chúng được kết hợp với nhau.

| **Class**                      | **CSS Property**             | **Mô tả**                                            |
| ------------------------------ | ---------------------------- | ---------------------------------------------------- |
| **`mask-composite-add`**       | `mask-composite: add;`       | **Cộng** hai mặt nạ (phần lộ ra của cả hai).         |
| **`mask-composite-intersect`** | `mask-composite: intersect;` | **Giao nhau** (Chỉ lộ ra phần chung của hai mặt nạ). |

### C. Kiểu Mặt Nạ: `mask-type`

Điều chỉnh cách tính toán mặt nạ, hữu ích cho mặt nạ SVG.

| **Class**                 | **CSS Property**        | **Mô tả**                          |
| ------------------------- | ----------------------- | ---------------------------------- |
| **`mask-type-luminance`** | `mask-type: luminance;` | Tính toán mặt nạ dựa trên độ sáng. |

---

**🔥 Tóm tắt Masking:**

1.  **Thiết lập mặt nạ:** Dùng **`mask-[url('...')]`** hoặc **`mask-linear-gradient`**.
2.  **Kích thước & Lặp lại:** Dùng **`mask-cover`** và **`mask-no-repeat`**.
3.  **Tạo hiệu ứng văn bản:** Dùng **`mask-clip-text`**.
4.  **Kết hợp:** Dùng **`mask-composite-add`** (cho các mặt nạ phức tạp).

Vậy là bạn đã hoàn thành nhóm tiện ích **Masking**! Đây là nhóm cuối cùng trong mục Layout & Effects. Bạn muốn tôi chuyển sang chủ đề tiếp theo nào, ví dụ: **Filters (Bộ lọc)** hay **Transitions & Animation (Chuyển động & Hoạt ảnh)**?

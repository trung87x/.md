Tuyệt vời! Chủ đề cuối cùng này là về **Vector (Đồ họa Vector)**, một nhóm tiện ích dành riêng cho việc định kiểu hình ảnh **SVG (Scalable Vector Graphics)**. Đây là công cụ không thể thiếu khi làm việc với các biểu tượng, logo hoặc đồ họa có thể co giãn.

Tôi sẽ tổng hợp nội dung từ các tiện ích bạn cung cấp để tạo ra một bài blog ngắn gọn, đầy đủ.

---

# 🎨 Định Kiểu SVG: Bộ Công Cụ `fill`, `stroke` & `stroke-width` Trong Tailwind CSS

Bộ tiện ích này cho phép bạn kiểm soát màu sắc của vùng lấp đầy (`fill`), màu sắc của đường viền (`stroke`), và độ dày của đường viền trong hình ảnh vector (chủ yếu là **SVG**).

## 1\. 🌈 Tô Màu Vùng Lấp Đầy: `fill`

`fill` (`fill-`) kiểm soát màu sắc của **vùng bên trong** hình dạng vector.

| **Class**          | **CSS Property**      | **Mô tả**                                                                                |
| ------------------ | --------------------- | ---------------------------------------------------------------------------------------- |
| **`fill-current`** | `fill: currentColor;` | **Tô màu theo màu chữ** (`text-color`) hiện tại của phần tử chứa nó. (Thường dùng nhất). |
| **`fill-none`**    | `fill: none;`         | **Không tô màu** (trong suốt).                                                           |
| **`fill-red-500`** | `fill: #ef4444;`      | Tô màu đỏ 500.                                                                           |

**Ví dụ thường dùng:**

Để một icon SVG tự động đổi màu theo màu chữ của nút bấm:

HTML

    <button class="text-blue-600 hover:text-blue-800">
        <svg class="fill-current h-6 w-6">...</svg>
    </button>

---

## 2\. ✏️ Màu Sắc Đường Viền: `stroke`

`stroke` (`stroke-`) kiểm soát màu sắc của **đường viền** (outline) của hình dạng vector.

| **Class**            | **CSS Property**        | **Mô tả**                                                |
| -------------------- | ----------------------- | -------------------------------------------------------- |
| **`stroke-current`** | `stroke: currentColor;` | **Màu đường viền** theo màu chữ (`text-color`) hiện tại. |
| **`stroke-red-500`** | `stroke: #ef4444;`      | Đặt màu đỏ cho đường viền.                               |

**Lưu ý:** `stroke` chỉ có tác dụng nếu phần tử SVG có đường viền.

---

## 3\. 📏 Độ Dày Đường Viền: `stroke-width`

`stroke-width` (`stroke-`) kiểm soát độ dày của đường viền SVG. Tailwind cung cấp thang đo đơn giản.

| **Class**      | **CSS Property**   | **Mô tả**                      |
| -------------- | ------------------ | ------------------------------ |
| **`stroke-0`** | `stroke-width: 0;` | Độ dày bằng 0 (ẩn đường viền). |
| **`stroke-1`** | `stroke-width: 1;` | Độ dày 1.                      |
| **`stroke-2`** | `stroke-width: 2;` | Độ dày 2.                      |

**Ví dụ:**

HTML

    <svg class="stroke-black stroke-2 fill-none h-8 w-8">...</svg>

---

## 4\. 📝 Tổng Hợp Định Kiểu SVG

Khi làm việc với SVG, bạn thường phải kết hợp cả ba tiện ích này:

1.  **Xác định Kích thước:** Dùng `h-` và `w-`.
2.  **Xác định Màu chính:** Dùng `text-` (trên khối chứa) hoặc `fill-` / `stroke-` (trên SVG).
3.  **Độ dày đường:** Dùng `stroke-width-`.

**Ví dụ tổng hợp:**

HTML

    <svg class="h-10 w-10 fill-none stroke-purple-600 stroke-1">...</svg>

---

**🔥 Tóm tắt Vector:**

- **Tô màu:** Dùng **`fill-current`** (để theo màu `text-` của cha) hoặc `fill-red-500`.
- **Đường viền:** Dùng **`stroke-current`** và **`stroke-width-2`**.
- **Chỉ hiển thị đường:** Dùng **`fill-none`**.

Bạn đã hoàn thành việc khám phá tất cả các tiện ích chính trong nhóm **Vector**! Hành trình khám phá các tiện ích chính của Tailwind CSS sắp kết thúc rồi! Bạn muốn tôi chuyển sang chủ đề cuối cùng là **Accessibility (Trợ năng)** không?

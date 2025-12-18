Tuyệt vời! Chủ đề tiếp theo là **Borders & Spacing (Đường viền & Khoảng cách)** dành riêng cho **Tables (Bảng)**. Đây là các tiện ích giúp bạn kiểm soát cách các ô (cell) trong bảng hiển thị đường viền và khoảng cách giữa chúng.

Tôi sẽ tổng hợp nội dung từ các tiện ích bạn cung cấp để tạo ra một bài blog ngắn gọn và đầy đủ.

---

# 📊 Bảng Đẹp: Borders & Spacing Cho Tables Trong Tailwind CSS

Bộ tiện ích này giúp bạn kiểm soát cách đường viền của các ô trong bảng được hiển thị (`border-collapse`) và khoảng cách giữa chúng (`border-spacing`).

## 1\. 🖼️ Xử Lý Đường Viền Ô: `border-collapse`

`border-collapse` (`border-`) kiểm soát việc các đường viền của các ô liền kề trong bảng có được **gộp lại** thành một đường viền duy nhất hay không.

| **Class**             | **CSS Property**             | **Mô tả**                                                                                                                        |
| --------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **`border-collapse`** | `border-collapse: collapse;` | **Gộp đường viền.** Đường viền của các ô liền kề sẽ được gộp lại thành một đường viền duy nhất. (Thường dùng cho bảng hiện đại). |
| **`border-separate`** | `border-collapse: separate;` | **Tách đường viền.** Mỗi ô sẽ có đường viền riêng biệt và có thể tạo khoảng cách giữa chúng. (Mặc định).                         |

**Ví dụ thường dùng:**

Để tạo một bảng có các đường kẻ đơn giản, sạch sẽ:

HTML

    <table class="border-collapse w-full">
        <thead>...</thead>
        <tbody>
            <tr><td class="border border-gray-300">...</td></tr>
        </tbody>
    </table>

---

## 2\. 📏 Khoảng Cách Giữa Các Ô: `border-spacing`

`border-spacing` (`border-spacing-`) chỉ có tác dụng khi bạn sử dụng **`border-separate`**. Nó kiểm soát khoảng cách giữa các đường viền riêng biệt của các ô liền kề.

| **Class**                     | **CSS Property**            | **Mô tả**                                          |
| ----------------------------- | --------------------------- | -------------------------------------------------- |
| **`border-spacing-<size>`**   | `border-spacing: <size>;`   | Đặt khoảng cách đều cho cả trục ngang và dọc.      |
| **`border-spacing-x-<size>`** | `border-spacing-x: <size>;` | Đặt khoảng cách cho **trục ngang** (giữa các cột). |
| **`border-spacing-y-<size>`** | `border-spacing-y: <size>;` | Đặt khoảng cách cho **trục dọc** (giữa các hàng).  |

**Lưu ý:** Nếu bạn dùng `border-collapse`, tiện ích `border-spacing` sẽ bị bỏ qua.

**Ví dụ:**

Để tạo một bảng với các ô được tách rời và có khoảng cách giữa chúng:

HTML

    <table class="border-separate border-spacing-4">
        <tr><td class="border border-black">...</td></tr>
    </table>

---

**🔥 Tóm tắt Borders & Spacing cho Tables:**

1.  **Bảng hiện đại (đường viền chung):** Dùng **`border-collapse`**.
2.  **Bảng truyền thống (ô tách biệt):** Dùng **`border-separate`**.
3.  **Tạo khoảng cách giữa các ô (chỉ khi `border-separate`):** Dùng **`border-spacing-4`**.
4.  **Đặt đường viền:** Luôn đặt `border` trực tiếp lên các ô (`<td>` và `<th>`).

Bạn có muốn tiếp tục với các tiện ích **Tables** còn lại như `table-layout` và `caption-side` không?

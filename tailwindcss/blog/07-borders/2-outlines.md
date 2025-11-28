Tuyệt vời! Chủ đề tiếp theo là **Outlines (Đường viền ngoài)**, một nhóm tiện ích quan trọng thường được sử dụng để chỉ báo trạng thái tiêu điểm (`focus`) của các phần tử, đảm bảo tính dễ tiếp cận (accessibility).

Tôi sẽ tổng hợp nội dung từ các tiện ích bạn cung cấp để tạo ra một bài blog ngắn gọn, đầy đủ về cách kiểm soát đường viền ngoài.

---

# 🔦 Theo Dõi Tiêu Điểm: Kiểm Soát Outlines Trong Tailwind CSS

**Outline** là một đường viền được vẽ **ngay bên ngoài** đường viền (`border`) của phần tử, không chiếm không gian trong bố cục và không ảnh hưởng đến kích thước của phần tử. Nó chủ yếu được dùng để cung cấp phản hồi hình ảnh khi một phần tử được chọn (focus).

## 1\. 📏 Độ Dày Đường Viền Ngoài: `outline-width`

`outline-width` (`outline-`) xác định độ dày của đường viền ngoài.

| **Class**       | **CSS Property**      | **Mô tả**                                                                         |
| --------------- | --------------------- | --------------------------------------------------------------------------------- |
| **`outline-0`** | `outline-width: 0px;` | **Loại bỏ** đường viền ngoài (cẩn thận khi sử dụng, ảnh hưởng đến accessibility). |
| **`outline-1`** | `outline-width: 1px;` | Đường viền ngoài 1px.                                                             |
| **`outline-2`** | `outline-width: 2px;` | Đường viền ngoài 2px (Mặc định thường thấy trên trình duyệt).                     |
| **`outline-8`** | `outline-width: 8px;` | Đường viền ngoài 8px.                                                             |

**Ví dụ thường dùng:**

HTML

    <button class="focus:outline-2 focus:outline-offset-2">Nút</button>

---

## 2\. 🌈 Màu Sắc Đường Viền Ngoài: `outline-color`

`outline-color` (`outline-`) xác định màu sắc của đường viền ngoài, sử dụng thang màu của Tailwind CSS.

| **Class**                | **CSS Property**          | **Mô tả**                                         |
| ------------------------ | ------------------------- | ------------------------------------------------- |
| **`outline-gray-400`**   | `outline-color: #9ca3af;` | Màu xám nhẹ.                                      |
| **`outline-indigo-500`** | `outline-color: #6366f1;` | Màu xanh chàm (thường dùng để nổi bật tiêu điểm). |

**Ví dụ:**

HTML

    <input type="text" class="focus:outline-indigo-500 focus:outline-2" />

---

## 3\. 〰️ Kiểu Dáng Đường Viền Ngoài: `outline-style`

`outline-style` (`outline-`) xác định kiểu dáng của đường viền ngoài. Nếu không đặt kiểu, đường viền ngoài sẽ không hiển thị ngay cả khi bạn đặt độ dày và màu sắc.

| **Class**           | **CSS Property**         | **Mô tả**                                        |
| ------------------- | ------------------------ | ------------------------------------------------ |
| **`outline-none`**  | `outline-style: none;`   | **Loại bỏ** kiểu dáng (tương đương `outline-0`). |
| **`outline-solid`** | `outline-style: solid;`  | Đường viền ngoài **đặc** (rắn).                  |
| `outline-dashed`    | `outline-style: dashed;` | Đường viền ngoài **nét đứt**.                    |
| `outline-dotted`    | `outline-style: dotted;` | Đường viền ngoài **chấm chấm**.                  |

**💡 Lưu ý về Accessibility:** Các trình duyệt hiện đại tự động thêm đường viền ngoài màu xanh khi người dùng dùng bàn phím để di chuyển (tab) giữa các phần tử. Việc sử dụng `outline-none` cần đi kèm với một phản hồi hình ảnh khác (ví dụ: `focus:ring` hoặc `focus:border`) để đảm bảo người dùng biết họ đang ở đâu.

---

## 4\. 🔲 Khoảng Cách: `outline-offset`

`outline-offset` (`outline-offset-`) kiểm soát khoảng cách giữa đường viền ngoài (`outline`) và đường viền chính (`border`) của phần tử. Giá trị dương sẽ đẩy đường viền ngoài ra xa, giá trị âm sẽ kéo nó vào trong.

| **Class**              | **CSS Property**       | **Mô tả**                         |
| ---------------------- | ---------------------- | --------------------------------- |
| **`outline-offset-0`** | `outline-offset: 0px;` | Đường viền ngoài sát với border.  |
| **`outline-offset-2`** | `outline-offset: 2px;` | Đường viền ngoài cách border 2px. |

**Ví dụ:**

HTML

    <button class="focus:outline-red-500 focus:outline-4 focus:outline-offset-4">Nút</button>

---

**🔥 Tóm tắt Outlines:**

1.  **Dùng khi Focus:** Luôn sử dụng tiền tố **`focus:`** khi định kiểu `outline`.
2.  **Định kiểu:** Dùng **`outline-2`**, **`outline-indigo-500`**, và **`outline-solid`**.
3.  **Tăng tính thẩm mỹ:** Dùng **`outline-offset-2`** để tạo khoảng trắng giữa border và outline.
4.  **Accessibility:** **Không** dùng `outline-none` mà không có phương án thay thế.

Bạn có muốn chuyển sang nhóm tiện ích **Effects (Hiệu ứng)** như shadow (bóng), opacity (độ mờ), và blend mode (chế độ hòa trộn) không?

Tuyệt vời! Chủ đề **Spacing (Khoảng cách)** là một trong những tiện ích được sử dụng nhiều nhất trong Tailwind CSS. Nó giúp bạn kiểm soát **padding (đệm)** và **margin (lề)** của các phần tử.

Tôi sẽ tổng hợp nội dung từ `padding` và `margin` để tạo ra một bài blog ngắn gọn, đầy đủ, tập trung vào cách tạo khoảng cách bên trong và bên ngoài các phần tử.

---

# 📏 Kiểm Soát Khoảng Cách: `padding` & `margin` Trong Tailwind CSS

**Padding (Đệm)** và **Margin (Lề)** là hai khái niệm cơ bản nhất trong mô hình hộp (Box Model) của CSS, giúp kiểm soát khoảng cách **bên trong** và **bên ngoài** một phần tử.

## 1\. 🧼 Khoảng Cách Nội Bộ: `padding`

**Padding** tạo ra không gian đệm **bên trong** đường viền (border) của phần tử, giữa nội dung và border.

Các tiện ích `p-`, `pt-`, `pr-`, `pb-`, `pl-`, và `px-/py-` được sử dụng để điều khiển padding.

| **Class**       | **CSS Property**                               | **Mô tả**                                 |
| --------------- | ---------------------------------------------- | ----------------------------------------- |
| **`p-<size>`**  | `padding: <size>;`                             | Padding **tất cả** các cạnh.              |
| **`pt-<size>`** | `padding-top: <size>;`                         | Padding **cạnh trên**.                    |
| **`pb-<size>`** | `padding-bottom: <size>;`                      | Padding **cạnh dưới**.                    |
| **`px-<size>`** | `padding-left: <size>; padding-right: <size>;` | Padding theo **trục ngang** (Left/Right). |
| **`py-<size>`** | `padding-top: <size>; padding-bottom: <size>;` | Padding theo **trục dọc** (Top/Bottom).   |

**Ví dụ:**

HTML

    <div class="p-4 py-2 bg-blue-500">Nội dung</div>

## 2\. 🛣️ Khoảng Cách Bên Ngoài: `margin`

**Margin** tạo ra không gian lề **bên ngoài** đường viền của phần tử, giữa phần tử đó và các phần tử lân cận.

Các tiện ích `m-`, `mt-`, `mr-`, `mb-`, `ml-`, và `mx-/my-` được sử dụng để điều khiển margin.

| **Class**       | **CSS Property**                             | **Mô tả**                                |
| --------------- | -------------------------------------------- | ---------------------------------------- |
| **`m-<size>`**  | `margin: <size>;`                            | Margin **tất cả** các cạnh.              |
| **`mt-<size>`** | `margin-top: <size>;`                        | Margin **cạnh trên**.                    |
| **`mb-<size>`** | `margin-bottom: <size>;`                     | Margin **cạnh dưới**.                    |
| **`mx-<size>`** | `margin-left: <size>; margin-right: <size>;` | Margin theo **trục ngang** (Left/Right). |
| **`my-<size>`** | `margin-top: <size>; margin-bottom: <size>;` | Margin theo **trục dọc** (Top/Bottom).   |

### Tính năng Đặc biệt của Margin: `auto`

Trong Tailwind CSS, bạn sử dụng `mx-auto` để tự động căn giữa một phần tử **khối (block)** có **chiều rộng cố định** trong khối chứa của nó.

| **Class**     | **Style**                                | **Mô tả**                                          |
| ------------- | ---------------------------------------- | -------------------------------------------------- |
| **`mx-auto`** | `margin-left: auto; margin-right: auto;` | **Căn giữa ngang** cho phần tử có `width` cố định. |

**Ví dụ:**

HTML

    <div class="w-96 mx-auto bg-white shadow">Thẻ căn giữa</div>

### Margin Âm (Negative Margin)

Bạn có thể sử dụng margin âm bằng cách thêm tiền tố `-` trước tiện ích (ví dụ: `-mt-4`). Margin âm giúp bạn kéo các phần tử lại gần nhau hơn hoặc chồng lên nhau.

| **Class**        | **Style**              | **Mô tả**             |
| ---------------- | ---------------------- | --------------------- |
| **`-mt-<size>`** | `margin-top: -<size>;` | Kéo phần tử lên trên. |

## 3\. 🎯 Giá Trị Khoảng Cách

Tailwind CSS sử dụng một thang đo khoảng cách **thống nhất** cho cả `margin` và `padding` (cũng như `width`, `height`):

- Giá trị bước nhỏ (dưới 1rem): `0`, `px`, `0.5`, `1`, `1.5`,...
- Giá trị bước lớn: `4`, `8`, `12`, `16`,...

  - **Mỗi đơn vị thường bằng 0.25rem (4px).** Ví dụ: `p-4` là `1rem` (16px).

---

**🔥 Tóm tắt nhanh và gọn:**

- **Bên trong (Đệm):** Dùng `p-`, `py-`, `px-` (ví dụ: `p-6`).
- **Bên ngoài (Lề):** Dùng `m-`, `my-`, `mx-` (ví dụ: `mt-8`).
- **Căn giữa ngang:** Dùng **`mx-auto`** (cần `w-` cố định).
- **Chồng lấp:** Dùng **margin âm** (ví dụ: `-mt-2`).

Bạn có muốn chuyển sang nhóm tiện ích **Sizing (Kích thước)**, bao gồm `width`, `height`, `min/max-width`,... không?

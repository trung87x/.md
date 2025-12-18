Tuyệt vời! Chủ đề **Basic & Sizing (Cơ bản và Kích thước)** cho nền là một nhóm tiện ích quan trọng giúp tạo ra các phần tử nổi bật và đẹp mắt.

Tôi sẽ tổng hợp nội dung từ các tiện ích bạn cung cấp để tạo ra một bài blog ngắn gọn, đầy đủ về cách kiểm soát nền trong Tailwind CSS.

---

# 🎨 Kiểm Soát Nền: Màu Sắc, Hình Ảnh & Kích Thước Trong Tailwind CSS

Bộ tiện ích này giúp bạn định nghĩa màu sắc, hình ảnh và cách hình ảnh nền được sắp xếp, căn chỉnh bên trong phần tử chứa.

## 1\. 🌈 Đặt Màu Nền: `background-color` (`bg-`)

Đây là tiện ích cơ bản nhất, cho phép bạn đặt màu nền cho bất kỳ phần tử nào, sử dụng thang màu mặc định của Tailwind CSS.

| **Class**            | **CSS Property**                            | **Mô tả**                      |
| -------------------- | ------------------------------------------- | ------------------------------ |
| **`bg-white`**       | `background-color: #fff;`                   | Màu trắng.                     |
| **`bg-blue-500`**    | `background-color: #3b82f6;`                | Màu xanh lam với độ đậm 500.   |
| **`bg-transparent`** | `background-color: transparent;`            | Nền trong suốt.                |
| **`bg-red-500/50`**  | `background-color: rgba(239, 68, 68, 0.5);` | Màu đỏ có độ mờ (opacity) 50%. |

**Ví dụ:**

HTML

    <div class="bg-green-600 text-white">Nội dung</div>

---

## 2\. 🖼️ Hình Ảnh Nền: `background-image` (`bg-`)

Tiện ích này cho phép bạn đặt hình ảnh làm nền bằng cách sử dụng các hàm CSS như `url()`, `linear-gradient()`,...

| **Class**              | **CSS Property**                                    | **Mô tả**                                                    |
| ---------------------- | --------------------------------------------------- | ------------------------------------------------------------ |
| **`bg-none`**          | `background-image: none;`                           | Loại bỏ hình ảnh nền.                                        |
| **`bg-gradient-to-r`** | `background-image: linear-gradient(to right, ...);` | Tạo **gradient tuyến tính** chạy từ trái sang phải.          |
| **`bg-[url('...')]`**  | `background-image: url('...');`                     | **Đặt URL hình ảnh tùy chỉnh** (dùng bracket notation `[]`). |

**Ví dụ:**

HTML

    <div class="bg-gradient-to-r from-red-500 to-yellow-500">...</div>

---

## 3\. 📐 Kích Thước Ảnh Nền: `background-size` (`bg-`)

Đây là phần **Sizing** quan trọng nhất, kiểm soát cách hình ảnh nền được điều chỉnh kích thước để phù hợp với phần tử chứa.

| **Class**        | **CSS Property**            | **Mô tả**                                                                                   |
| ---------------- | --------------------------- | ------------------------------------------------------------------------------------------- |
| **`bg-auto`**    | `background-size: auto;`    | (Mặc định) Kích thước ảnh giữ nguyên theo kích thước gốc.                                   |
| **`bg-cover`**   | `background-size: cover;`   | **Lấp đầy khung.** Scale ảnh để lấp đầy toàn bộ phần tử chứa. (Một phần ảnh có thể bị cắt). |
| **`bg-contain`** | `background-size: contain;` | **Vừa khung.** Scale ảnh để nó luôn hiển thị toàn bộ nội dung. (Có thể tạo khoảng trống).   |

**Ví dụ thường dùng:**

HTML

    <div class="bg-cover bg-[url('/img/hero.jpg')]">...</div>

---

## 4\. 🎯 Vị Trí Ảnh Nền: `background-position` (`bg-`)

Tiện ích này (`bg-`) kiểm soát vị trí của hình ảnh nền bên trong phần tử. Rất quan trọng khi bạn dùng `bg-cover` (vì ảnh có thể bị cắt).

| **Class**                      | **CSS Property**                        | **Mô tả**                                |
| ------------------------------ | --------------------------------------- | ---------------------------------------- |
| **`bg-center`**                | `background-position: center;`          | Căn giữa ảnh (thường dùng nhất).         |
| **`bg-top`** / **`bg-bottom`** | `background-position: top;` / `bottom;` | Ưu tiên hiển thị phần trên/dưới của ảnh. |
| **`bg-left-bottom`**           | `background-position: left bottom;`     | Căn chỉnh vào góc dưới bên trái.         |

**Ví dụ:**

HTML

    <div class="bg-cover bg-top bg-[url('/img/header.jpg')]">...</div>

---

## 5\. 🔄 Lặp Lại Ảnh Nền: `background-repeat` (`bg-`)

Kiểm soát cách hình ảnh nền lặp lại (tile) để lấp đầy không gian.

| **Class**          | **CSS Property**                | **Mô tả**                                                       |
| ------------------ | ------------------------------- | --------------------------------------------------------------- |
| **`bg-repeat`**    | `background-repeat: repeat;`    | Lặp lại theo cả trục X và Y.                                    |
| **`bg-no-repeat`** | `background-repeat: no-repeat;` | **Ngăn lặp lại** (Thường dùng nhất khi ảnh đã dùng `bg-cover`). |
| `bg-repeat-x`      | `background-repeat: repeat-x;`  | Chỉ lặp lại theo trục ngang.                                    |

---

**🔥 Tóm tắt Basic Backgrounds:**

1.  **Màu:** Dùng **`bg-blue-500`**.
2.  **Ảnh:** Dùng **`bg-[url('...')]`**.
3.  **Lấp đầy khung:** Dùng **`bg-cover`** (và **`bg-no-repeat`**).
4.  **Trọng tâm ảnh:** Dùng **`bg-center`** (hoặc `bg-top`).
5.  **Gradient:** Dùng **`bg-gradient-to-r`** kết hợp với `from-` và `to-`.

Bạn có muốn chuyển sang nhóm tiện ích **Borders (Đường viền)** bao gồm độ dày, màu sắc, bo góc, và chia đường viền?

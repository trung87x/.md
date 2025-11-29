Tuyệt vời! Chủ đề **Transitions (Chuyển động)** là cốt lõi để tạo ra các hiệu ứng hoạt ảnh mượt mà, chuyên nghiệp mà không cần viết CSS keyframes phức tạp.

Tôi sẽ tổng hợp nội dung từ tất cả các tiện ích `transition-` bạn cung cấp để tạo ra một bài blog ngắn gọn và đầy đủ.

---

# 🚀 Chuyển Động Mượt Mà: Bộ Công Cụ Transitions Trong Tailwind CSS

**Transitions** cho phép bạn kiểm soát tốc độ và kiểu dáng của một sự thay đổi thuộc tính CSS (ví dụ: thay đổi màu nền, độ mờ, hoặc vị trí) khi một trạng thái thay đổi (ví dụ: từ `hover` sang `focus`).

Để một chuyển động hoạt động, bạn cần ba bước:

1.  **Bật Transition:** Dùng `transition-property`.
2.  **Thiết lập Thời gian:** Dùng `transition-duration`.
3.  **Thiết lập Kiểu:** Dùng `transition-timing-function`.

## 1\. ⚙️ Bật Chuyển Động: `transition-property`

Tiện ích này xác định **thuộc tính CSS nào** sẽ được áp dụng hiệu ứng chuyển động.

| **Class**                  | **CSS Property**                                                   | **Mô tả**                                                                           |
| -------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| **`transition-none`**      | `transition-property: none;`                                       | Tắt mọi chuyển động.                                                                |
| **`transition`**           | `transition: all ...;`                                             | Áp dụng chuyển động cho **tất cả** thuộc tính có thể chuyển đổi. (Thường dùng nhất) |
| **`transition-colors`**    | `transition: background-color, border-color, color, fill, stroke;` | Chỉ áp dụng chuyển động cho **thuộc tính màu sắc**.                                 |
| **`transition-opacity`**   | `transition: opacity;`                                             | Chỉ áp dụng chuyển động cho **độ mờ**.                                              |
| **`transition-transform`** | `transition: transform;`                                           | Chỉ áp dụng chuyển động cho **transform** (scale, translate, rotate).               |

**Ví dụ:**

HTML

    <button class="transition hover:bg-blue-600">Hover Me</button>

---

## 2\. ⏱️ Thời Gian Chuyển Động: `transition-duration`

`transition-duration` (`duration-`) kiểm soát **thời gian** cần thiết để chuyển động hoàn thành.

| **Class**           | **CSS Property**              | **Mô tả**                                                |
| ------------------- | ----------------------------- | -------------------------------------------------------- |
| **`duration-75`**   | `transition-duration: 75ms;`  | Rất nhanh.                                               |
| **`duration-300`**  | `transition-duration: 300ms;` | **Tiêu chuẩn.** Thường dùng cho các chuyển động mượt mà. |
| **`duration-500`**  | `transition-duration: 500ms;` | Chậm hơn, rõ ràng hơn.                                   |
| **`duration-1000`** | `transition-duration: 1s;`    | Rất chậm (1 giây).                                       |

**Ví dụ:**

HTML

    <div class="transition duration-500 hover:bg-green-500">...</div>

---

## 3\. 📉 Tốc Độ Chuyển Động: `transition-timing-function`

`transition-timing-function` (`ease-`) kiểm soát **tốc độ thay đổi** của chuyển động (đường cong).

| **Class**         | **CSS Property** | **Mô tả**                                                                        |
| ----------------- | ---------------- | -------------------------------------------------------------------------------- |
| **`ease-linear`** | `linear`         | Tốc độ **đồng đều** (như robot).                                                 |
| **`ease-in`**     | `ease-in`        | Bắt đầu **chậm**, sau đó **tăng tốc**.                                           |
| **`ease-out`**    | `ease-out`       | Bắt đầu **nhanh**, sau đó **chậm lại**.                                          |
| **`ease-in-out`** | `ease-in-out`    | Bắt đầu **chậm** và kết thúc **chậm** (thường dùng cho các chuyển động qua lại). |

**Ví dụ:**

HTML

    <div class="transition duration-300 ease-out hover:scale-110">...</div>

---

## 4\. ⏸️ Độ Trễ & Hành Vi: `transition-delay` & `transition-behavior`

### A. Độ Trễ: `transition-delay`

`transition-delay` (`delay-`) thêm một khoảng thời gian **chờ** trước khi chuyển động thực sự bắt đầu.

| **Class**       | **CSS Property**           | **Mô tả**                        |
| --------------- | -------------------------- | -------------------------------- |
| **`delay-0`**   | `transition-delay: 0ms;`   | (Mặc định) Bắt đầu ngay lập tức. |
| **`delay-150`** | `transition-delay: 150ms;` | Chờ 150ms rồi mới chuyển động.   |

### B. Hành Vi Chuyển Động: `transition-behavior`

`transition-behavior` (`transition-`) là một tiện ích mới hơn, cho phép chuyển đổi các thuộc tính cá nhân.

| **Class**               | **CSS Property**                       | **Mô tả**                                                                           |
| ----------------------- | -------------------------------------- | ----------------------------------------------------------------------------------- |
| **`transition-normal`** | `transition-behavior: normal;`         | (Mặc định)                                                                          |
| **`transition-allow`**  | `transition-behavior: allow-discrete;` | Cho phép chuyển đổi giữa các trạng thái rời rạc (như `display: none` sang `block`). |

---

**🔥 Tóm tắt Transitions:**

1.  **Bật:** Luôn bắt đầu với **`transition`** (hoặc `transition-colors` nếu chỉ cần màu).
2.  **Thời gian:** Thêm **`duration-300`** (giá trị mặc định tốt).
3.  **Đường cong:** Thêm **`ease-in-out`** (cho chuyển động qua lại) hoặc **`ease-out`** (cho hiệu ứng bật lên).
4.  **Ví dụ tổng hợp:**

    HTML

        <div class="transition-all duration-500 ease-in-out hover:opacity-100 hover:scale-105">...</div>

Bạn có muốn chuyển sang chủ đề tiếp theo là **Animation (Hoạt ảnh)** không?

Tuyệt vời! Chủ đề **Animation (Hoạt ảnh)** là bước tiếp theo sau Transitions, cho phép bạn tạo ra các chuyển động lặp lại, phức tạp hoặc tùy chỉnh hoàn toàn bằng CSS `@keyframes`.

Tôi sẽ tổng hợp nội dung từ tiện ích `animation` để tạo ra một bài blog ngắn gọn, đầy đủ.

* * *

# 💫 Hoạt Ảnh Động: Bộ Công Cụ `animation` Trong Tailwind CSS

**Animation** trong Tailwind CSS được xây dựng dựa trên thuộc tính CSS `animation`. Nó cho phép bạn áp dụng các hoạt ảnh được định nghĩa trước (hoặc tùy chỉnh) lên một phần tử.

## 1\. ⚙️ Áp Dụng Hoạt Ảnh: `animation`

Tailwind cung cấp một tập hợp các hoạt ảnh được xác định trước, dễ dàng áp dụng bằng class `animate-`.

| **Class** | **CSS Property** | **Mô tả** |
| --- | --- | --- |
| **`animate-none`** | `animation: none;` | Loại bỏ mọi hoạt ảnh. |
| **`animate-spin`** | `animation: spin 1s linear infinite;` | **Quay liên tục** (thường dùng cho biểu tượng loading). |
| **`animate-ping`** | `animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;` | **Hiệu ứng "nhấp nháy"** hoặc "sóng lan" từ một điểm (thường dùng cho thông báo). |
| **`animate-pulse`** | `animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;` | **Hiệu ứng "nhịp đập"** hoặc mờ dần/hiện ra chậm rãi (thường dùng cho placeholder). |
| **`animate-bounce`** | `animation: bounce 1s infinite;` | **Hiệu ứng "nhảy"** lên xuống. |

**Ví dụ:**

HTML

    <svg class="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">...</svg>

* * *

## 2\. 🪄 Tùy Biến Hoạt Ảnh

Mặc dù Tailwind cung cấp các hoạt ảnh cơ bản, bạn thường sẽ muốn tạo hoạt ảnh riêng. Bạn có thể làm điều này bằng cách mở rộng theme trong file `tailwind.config.js`.

### A. Định Nghĩa Keyframes

Định nghĩa hoạt ảnh (chuỗi các bước chuyển động) trong phần `keyframes`:

JavaScript

    // tailwind.config.js
    module.exports = {
      theme: {
        extend: {
          keyframes: {
            'wiggle': { // Tên Keyframe: wiggle
              '0%, 100%': { transform: 'rotate(-3deg)' },
              '50%': { transform: 'rotate(3deg)' },
            }
          },
    // ...

### B. Áp Dụng Hoạt Ảnh

Áp dụng keyframes đã định nghĩa trong phần `animation`:

JavaScript

    // ... tiếp tục trong extend:
          animation: {
            'wiggling': 'wiggle 1s ease-in-out infinite', // Tên Class: animate-wiggling
          }
        },
      },
    }

Sau khi cấu hình, bạn có thể sử dụng class **`animate-wiggling`** trong HTML:

HTML

    <div class="animate-wiggling">Lắc lư!</div>

## 3\. 🔗 Ghi Chú Tổng Hợp

Không giống như `transition`, tiện ích `animation` của Tailwind đã bao gồm tất cả các thuộc tính liên quan (`duration`, `timing-function`, `iteration-count`, `direction`) trong class **`animate-`** duy nhất mà bạn định nghĩa trong cấu hình.

* * *

**🔥 Tóm tắt Animation:**

1.  **Hiệu ứng có sẵn:** Dùng **`animate-spin`**, **`animate-pulse`**, **`animate-bounce`**.
    
2.  **Tùy chỉnh:**
    
    -   Định nghĩa chuỗi chuyển động trong **`keyframes`**.
        
    -   Định nghĩa class **`animation`** (bao gồm thời gian và lặp lại).
        
3.  **Mục đích:** Tạo ra các hiệu ứng hình ảnh lặp lại, không cần tương tác của người dùng.
    

Bạn muốn chuyển sang nhóm tiện ích **Interactivity (Tương tác)**, bao gồm `cursor`, `pointer-events`, `resize`, v.v. không?
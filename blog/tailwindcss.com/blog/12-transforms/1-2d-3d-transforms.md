Tuyệt vời! Chủ đề **2D/3D Transforms (Biến đổi 2D/3D)** là nhóm tiện ích mạnh mẽ, cho phép bạn di chuyển, xoay, phóng to/thu nhỏ và nghiêng các phần tử, thường được dùng để tạo hiệu ứng thị giác và hoạt ảnh.

Tôi sẽ tổng hợp tất cả các tiện ích bạn cung cấp để tạo ra một bài blog ngắn gọn, đầy đủ.

---

# 🚀 Biến Hình Phần Tử: 2D/3D Transforms Trong Tailwind CSS

Bộ tiện ích này kiểm soát cách các phần tử được biến đổi trong không gian 2D và 3D thông qua các thuộc tính **`transform`** của CSS.

## 1\. ⚙️ Bật Tính Năng Biến Đổi: `transform`

Để các tiện ích biến đổi khác (translate, rotate, scale, skew) có tác dụng, bạn cần bật thuộc tính `transform` trên phần tử đó.

| **Class**            | **CSS Property**                              | **Mô tả**                                                                                                       |
| -------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **`transform`**      | `transform: scale(1) rotate(0) translate(0);` | (Mặc định) Bật `transform`. Nếu phần tử không có class biến đổi nào khác, nó sẽ được đặt về trạng thái ban đầu. |
| **`transform-none`** | `transform: none;`                            | Loại bỏ mọi biến đổi.                                                                                           |

---

## 2\. 🎯 Tâm Biến Đổi: `transform-origin`

`transform-origin` (`origin-`) xác định **điểm neo** (anchor point) mà từ đó các phép biến đổi (như xoay và phóng to/thu nhỏ) sẽ được thực hiện.

| **Class**             | **CSS Property**              | **Mô tả**                                     |
| --------------------- | ----------------------------- | --------------------------------------------- |
| **`origin-center`**   | `transform-origin: center;`   | (Mặc định) Biến đổi từ **trung tâm** phần tử. |
| **`origin-top-left`** | `transform-origin: top left;` | Biến đổi từ góc **trên bên trái**.            |
| **`origin-bottom`**   | `transform-origin: bottom;`   | Biến đổi từ **cạnh dưới**.                    |

**Ví dụ:**

Để tạo hiệu ứng mở menu từ góc trên bên phải:

HTML

    <div class="origin-top-right transform scale-0 transition duration-300 hover:scale-100">...</div>

---

## 3\. ↔️ Di Chuyển: `translate`

`translate` (`translate-`, `-translate-`) di chuyển phần tử theo trục X (ngang) và Y (dọc).

| **Class**                | **CSS Property**                 | **Mô tả**                                                     |
| ------------------------ | -------------------------------- | ------------------------------------------------------------- |
| **`translate-x-<size>`** | `transform: translateX(<size>);` | Di chuyển theo **trục X** (ngang).                            |
| **`-translate-y-4`**     | `transform: translateY(-1rem);`  | Di chuyển lên trên theo **trục Y** (dọc) 4 đơn vị.            |
| **`translate-y-full`**   | `transform: translateY(100%);`   | Di chuyển xuống dưới bằng **chiều cao của chính nó**.         |
| **`translate-x-1/2`**    | `transform: translateX(50%);`    | Di chuyển sang phải bằng **một nửa chiều rộng của chính nó**. |

**Ví dụ thường dùng (Căn giữa tuyệt đối):**

HTML

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Modal</div>

---

## 4\. 🔄 Xoay: `rotate`

`rotate` (`rotate-`) xoay phần tử theo đơn vị độ (`deg`).

| **Class**              | **CSS Property**                   | **Mô tả**                                      |
| ---------------------- | ---------------------------------- | ---------------------------------------------- |
| **`rotate-<degrees>`** | `transform: rotate(<degrees>deg);` | Xoay theo góc dương (ngược chiều kim đồng hồ). |
| **`-rotate-45`**       | `transform: rotate(-45deg);`       | Xoay 45 độ theo chiều kim đồng hồ.             |

**Ví dụ:**

HTML

    <button class="rotate-180 transition duration-300">
        <svg>Icon Mũi Tên</svg>
    </button>

---

## 5\. 🔍 Phóng To/Thu Nhỏ: `scale`

`scale` (`scale-`) phóng to hoặc thu nhỏ phần tử theo trục X, Y hoặc cả hai.

| **Class**           | **CSS Property**             | **Mô tả**                                                            |
| ------------------- | ---------------------------- | -------------------------------------------------------------------- |
| **`scale-<value>`** | `transform: scale(<value>);` | Phóng to/thu nhỏ đều theo cả hai trục. (Ví dụ: `scale-110` là 110%). |
| **`scale-x-150`**   | `transform: scaleX(1.5);`    | Phóng to **trục X** (ngang) 150%.                                    |
| **`scale-y-75`**    | `transform: scaleY(0.75);`   | Thu nhỏ **trục Y** (dọc) 75%.                                        |

**Ví dụ:**

HTML

    <button class="active:scale-95 transition">Nhấn</button>

---

## 6\. 📐 Nghiêng: `skew`

`skew` (`skew-`) nghiêng phần tử theo trục X hoặc Y.

| **Class**              | **CSS Property**                  | **Mô tả**                                 |
| ---------------------- | --------------------------------- | ----------------------------------------- |
| **`skew-x-<degrees>`** | `transform: skewX(<degrees>deg);` | Nghiêng phần tử theo **trục X**.          |
| **`-skew-y-6`**        | `transform: skewY(-6deg);`        | Nghiêng phần tử lên trên theo **trục Y**. |

---

**🔥 Tóm tắt Transforms:**

1.  **Bật:** Luôn đảm bảo có class **`transform`** (hoặc một trong các class biến đổi) trên phần tử.
2.  **Căn giữa:** Dùng **`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`**.
3.  **Hoạt ảnh:** Kết hợp **`hover:scale-105`** với **`transition duration-300`** để có hiệu ứng mượt mà.
4.  **Điểm neo:** Dùng **`origin-top`** khi muốn xoay/phóng to từ cạnh trên.

Bạn có muốn chuyển sang chủ đề **Interactivity (Tương tác)**, bao gồm `cursor`, `pointer-events`, và `resize` không?

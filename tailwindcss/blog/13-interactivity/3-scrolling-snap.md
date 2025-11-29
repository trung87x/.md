Tuyệt vời! Chủ đề **Scrolling & Snap (Cuộn & Khớp Cuộn)** là một nhóm tiện ích hiện đại, giúp bạn kiểm soát hành vi cuộn của trình duyệt và tạo ra các giao diện người dùng có điểm dừng cố định (như carousel hoặc gallery).

Tôi sẽ tổng hợp nội dung từ tất cả các tiện ích bạn cung cấp để tạo ra một bài blog ngắn gọn và đầy đủ.

* * *

# 🖱️ Cuộn Đẹp Mắt: Bộ Công Cụ Scrolling & Snap Trong Tailwind CSS

Bộ tiện ích này tập trung vào việc quản lý trải nghiệm cuộn của người dùng, bao gồm hiệu ứng chuyển động khi cuộn và tính năng **khớp cuộn (scroll snapping)** mạnh mẽ.

## 1\. ⚙️ Hành Vi Chuyển Động Cuộn: `scroll-behavior`

`scroll-behavior` (`scroll-`) áp dụng cho **khối chứa** (thường là `<body>` hoặc container cuộn) để xác định cách các thao tác cuộn (như click vào liên kết neo `#id`) được xử lý.

| **Class** | **CSS Property** | **Mô tả** |
| --- | --- | --- |
| **`scroll-auto`** | `scroll-behavior: auto;` | (Mặc định) Cuộn **nhảy tức thời** đến đích. |
| **`scroll-smooth`** | `scroll-behavior: smooth;` | Cuộn **mượt mà** đến đích (hiệu ứng chuyển động chậm). |

**Ví dụ thường dùng:**

HTML

    <body class="scroll-smooth">
        <a href="#section-2">Đi tới Phần 2</a>
        <div id="section-2">...</div>
    </body>

* * *

## 2\. 🧲 Khớp Cuộn: `scroll-snap-type`, `scroll-snap-align`, `scroll-snap-stop`

Đây là các tiện ích cốt lõi để tạo các điểm dừng cuộn (snap points), lý tưởng cho các thành phần như carousel, slider, hoặc các trang có bố cục toàn màn hình.

### A. Thiết Lập Lưới Khớp: `scroll-snap-type` (Khối chứa)

Áp dụng cho **khối chứa cuộn** để bật tính năng khớp cuộn và hướng cuộn.

| **Class** | **CSS Property** | **Mô tả** |
| --- | --- | --- |
| **`snap-none`** | `scroll-snap-type: none;` | Tắt khớp cuộn. |
| **`snap-x`** | `scroll-snap-type: x mandatory;` | Khớp cuộn **ngang**, bắt buộc dừng lại tại các điểm đã định. |
| **`snap-y`** | `scroll-snap-type: y mandatory;` | Khớp cuộn **dọc**, bắt buộc dừng lại tại các điểm đã định. |
| **`snap-mandatory`** / **`snap-proximity`** | Thay đổi hành vi dừng | `mandatory` (bắt buộc) hoặc `proximity` (gần đó). |

### B. Định Nghĩa Điểm Dừng: `scroll-snap-align` (Phần tử con)

Áp dụng cho **phần tử con** để định nghĩa vị trí mà khối chứa sẽ khớp vào.

| **Class** | **CSS Property** | **Mô tả** |
| --- | --- | --- |
| **`snap-start`** | `scroll-snap-align: start;` | Khớp cuộn tại **điểm bắt đầu** của phần tử. |
| **`snap-center`** | `scroll-snap-align: center;` | Khớp cuộn tại **trung tâm** của phần tử. |
| **`snap-end`** | `scroll-snap-align: end;` | Khớp cuộn tại **điểm kết thúc** của phần tử. |

### C. Ngăn Cuộn Nhanh: `scroll-snap-stop` (Phần tử con)

Kiểm soát liệu người dùng có thể "trượt" qua nhiều điểm dừng cùng lúc hay không.

| **Class** | **CSS Property** | **Mô tả** |
| --- | --- | --- |
| **`snap-normal`** | `scroll-snap-stop: normal;` | Cho phép cuộn qua nhiều điểm dừng (mặc định). |
| **`snap-always`** | `scroll-snap-stop: always;` | **Bắt buộc** dừng lại tại điểm khớp cuộn đầu tiên. |

**Ví dụ Scroll Snap:**

HTML

    <div class="snap-x snap-mandatory flex overflow-x-scroll">
        <div class="snap-start w-full flex-shrink-0">Mục 1</div>
        <div class="snap-start w-full flex-shrink-0">Mục 2</div>
    </div>

* * *

## 3\. 🛡️ Bù Trừ: `scroll-margin` & `scroll-padding`

Khi sử dụng liên kết neo (`#id`), các phần tử cố định (như thanh điều hướng `fixed`) có thể che mất nội dung đích. Các tiện ích này giúp bù trừ cho vấn đề đó.

### A. Đệm Cuộn: `scroll-padding` (Khối chứa)

`scroll-padding` (`scroll-p-`) đặt một lớp **đệm bên trong** khối chứa cuộn. Khi cuộn đến một điểm neo, điểm neo sẽ dừng lại **cách xa** cạnh của khối chứa một khoảng bằng padding này. (Thường dùng nhất để bù trừ thanh navbar).

| **Class** | **CSS Property** | **Mô tả** |
| --- | --- | --- |
| **`scroll-pt-<size>`** | `scroll-padding-top: <size>;` | Bù trừ từ **trên xuống** (tương đương chiều cao navbar cố định). |
| **`scroll-p-20`** | `scroll-padding: 5rem;` | Bù trừ đều 4 cạnh. |

### B. Lề Cuộn: `scroll-margin` (Phần tử con)

`scroll-margin` (`scroll-m-`) đặt một lớp **lề bên ngoài** quanh phần tử con. Khi cuộn đến phần tử này, trình duyệt sẽ dừng lại cách phần tử một khoảng bằng margin này.

| **Class** | **CSS Property** | **Mô tả** |
| --- | --- | --- |
| **`scroll-mt-<size>`** | `scroll-margin-top: <size>;` | **Thêm khoảng trống phía trên** phần tử đích khi cuộn đến nó. |

**Ví dụ Bù Trừ:**

HTML

    <body class="scroll-smooth scroll-pt-20">
        <header class="fixed h-20">Navbar</header>
        <div id="section-1">...</div>
    </body>

* * *

**🔥 Tóm tắt Scrolling & Snap:**

-   **Cuộn mượt:** Dùng **`scroll-smooth`**.
    
-   **Tạo slider/carousel:** Dùng **`snap-x snap-mandatory`** (trên parent) và **`snap-start`** (trên child).
    
-   **Bù trừ navbar fixed:** Dùng **`scroll-pt-20`** (trên body/khối cuộn).
    

Bạn muốn chuyển sang chủ đề **SVG (Scalable Vector Graphics)** hay chủ đề nào khác?
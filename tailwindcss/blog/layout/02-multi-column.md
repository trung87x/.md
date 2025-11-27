##

## Layout Multi-Column: Chia Cột Báo Chí và Kiểm Soát Ngắt Trang/Cột

##

Các tiện ích trong nhóm **Layout** này giúp kiểm soát cách nội dung được chia thành nhiều cột (giống như báo chí) và cách các phần tử hoạt động khi bị ngắt qua nhiều dòng, cột hoặc trang.

### I. Chia Nội Dung Thành Nhiều Cột (`columns`)

##

Sử dụng tiện ích `columns-<number>` hoặc `columns-<width>` để định nghĩa số lượng hoặc chiều rộng cột.

#### 1\. Đặt theo Số Lượng Cột

##

Dùng `columns-3` để chia nội dung thành 3 cột. Chiều rộng cột sẽ tự động điều chỉnh.

    <div class="columns-3 gap-8 ...">
        <!-- Nội dung (văn bản, hình ảnh) sẽ tự động chia thành 3 cột, cách nhau 8 đơn vị -->
        <img class="aspect-3/2 ..." src="https://images.unsplash.com/photo-1486671736870-2f695ecdf813?q=80&w=1974" />
        <p>Well, let me tell you something, ...</p>
    </div>

#### 2\. Đặt theo Chiều Rộng Cột

##

Dùng `columns-3xs` (16rem/256px) để đặt chiều rộng lý tưởng cho cột. Số lượng cột sẽ tự động điều chỉnh.

    <!-- Cột sẽ có chiều rộng tối thiểu 16rem, số lượng cột tự điều chỉnh theo kích thước màn hình -->
    <div class="columns-3xs ...">
        <!-- ... nội dung ... -->
    </div>

#### 3\. Bố Cục Đa Cột Đáp Ứng

##

Sử dụng biến thể breakpoint để thay đổi số lượng cột theo kích thước màn hình.

    <!-- Mặc định 2 cột (columns-2), chuyển thành 3 cột (sm:columns-3) trên màn hình nhỏ trở lên -->
    <div class="columns-2 sm:columns-3 gap-4 sm:gap-8 ...">
        <!-- ... nội dung ... -->
    </div>

### II. Kiểm Soát Ngắt Cột/Trang (`break-*`)

##

Các tiện ích này kiểm soát cách cột hoặc trang nên ngắt **trước**, **sau** hoặc **bên trong** một phần tử.

| Tiện ích                        | Chức năng Chính                                                                          | Ví dụ Áp dụng                                                |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **`break-after-*`**             | Buộc ngắt cột/trang **sau** phần tử.                                                     | `<p class="break-after-column">...Văn bản này...</p>`        |
| **`break-before-*`**            | Buộc ngắt cột/trang **trước** phần tử.                                                   | `<p class="break-before-column">...Văn bản này...</p>`       |
| **`break-inside-avoid-column`** | Ngăn nội dung bị ngắt qua nhiều cột (ví dụ: đảm bảo một tiêu đề nằm trọn trong một cột). | `<p class="break-inside-avoid-column">...Văn bản này...</p>` |

**Ví dụ Kết hợp:** Sử dụng `break-after-column` để buộc cột ngắt sau đoạn văn bản đó.

    <div class="columns-2">
        <p>... đoạn 1 ...</p>
        <p class="break-after-column">... đoạn 2 (Ngắt cột sau đây) ...</p>
        <p>... đoạn 3 ...</p>
    </div>

### III. Xử Lý Viền và Nền Khi Ngắt (`box-decoration-break`)

##

Tiện ích này kiểm soát cách các thuộc tính như `padding`, `border`, và `background` được áp dụng khi một phần tử bị ngắt qua nhiều dòng hoặc cột.

| Tiện ích                   | Tác dụng                                                                                                           | Chức năng                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| **`box-decoration-slice`** | (Mặc định) Hiển thị các thuộc tính như thể phần tử bị cắt thành **các khối riêng biệt**.                           | `box-decoration-break: slice;` |
| **`box-decoration-clone`** | Hiển thị các thuộc tính (như nền, viền) như thể phần tử là **một khối liên tục** duy nhất, ngay cả khi nó bị ngắt. | `box-decoration-break: clone;` |

**Ví dụ:**

    <!-- Áp dụng nền/viền như một khối liên tục, ngay cả khi nội dung bị ngắt dòng/cột -->
    <span class="bg-gradient-to-r from-blue-500 to-purple-500 box-decoration-clone px-2 text-white">
        Hello <br/> World
    </span>

## 🎣 Action Hooks Phổ Biến và Ứng Dụng Thực Tế

### I. Hooks liên quan đến Khởi tạo và Tải (Loading/Initialization)

#

| **Action Hook**             | **Mô tả ngắn gọn**                                                                                      | **Ứng dụng phổ biến khi đi làm**                                                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`init`**                  | **Rất quan trọng.** Chạy sau khi WordPress đã tải hầu hết các chức năng nhưng **trước** khi gửi header. | \* Đăng ký **Custom Post Types** và **Taxonomies** (Tạo nội dung tùy chỉnh). \* Bắt đầu PHP Sessions. \* Đăng ký các scripts/styles **toàn cục** (sẽ được tải sau). |
| **`wp_enqueue_scripts`**    | Chạy trên **Front-end** (mặt trước website).                                                            | \* **Đăng ký và xếp hàng** (enqueue) các file CSS (`.css`) và JavaScript (`.js`) cho theme hoặc plugin của bạn. Đây là cách **chuẩn** để thêm tài nguyên.           |
| **`admin_enqueue_scripts`** | Tương tự như trên, nhưng chỉ chạy trong khu vực **Admin** (wp-admin).                                   | \* Đăng ký và xếp hàng các file CSS/JS **chỉ dùng cho giao diện quản trị** (ví dụ: tạo giao diện cho trang cài đặt plugin).                                         |
| **`admin_menu`**            | Chạy khi đang xây dựng thanh menu trong khu vực Admin.                                                  | \* **Thêm trang menu mới** hoặc trang submenu mới vào khu vực quản trị WordPress.                                                                                   |

---

### II. Hooks liên quan đến Đầu và Cuối Trang (Header/Footer)

#

| **Action Hook**  | **Mô tả ngắn gọn**                                        | **Ứng dụng phổ biến khi đi làm**                                                                                                                           |
| ---------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`wp_head`**    | Chạy bên trong thẻ `<head>` của trang HTML.               | \* Thêm các **Meta Tags** tùy chỉnh (ví dụ: xác minh website, Open Graph cho Facebook). \* Chèn mã theo dõi **Google Analytics/Pixel** hoặc CSS nội tuyến. |
| **`wp_footer`**  | Chạy ngay trước thẻ đóng `</body>` của trang HTML.        | \* Chèn các đoạn mã JavaScript **chạy sau cùng** (để cải thiện tốc độ tải). \* Thêm các popup, modal, hoặc các thành phần cần đặt ở cuối body.             |
| **`login_head`** | Chạy trong `<head>` của trang đăng nhập (`wp-login.php`). | \* Thêm CSS tùy chỉnh để **thay đổi giao diện** trang đăng nhập.                                                                                           |

---

### III. Hooks liên quan đến Dữ liệu và Hành động của Người dùng

#

| **Action Hook**              | **Mô tả ngắn gọn**                                                                    | **Ứng dụng phổ biến khi đi làm**                                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`save_post`**              | Chạy khi một bài viết, trang, hoặc Custom Post Type **được tạo hoặc cập nhật**.       | \* **Xử lý Metadata** tùy chỉnh sau khi lưu bài. \* Gửi thông báo email khi bài viết mới được xuất bản. \* Xóa cache liên quan đến bài viết đó.               |
| **`transition_post_status`** | Chạy khi trạng thái của bài viết **thay đổi** (ví dụ: từ `'draft'` sang `'publish'`). | \* Gửi thông báo chỉ khi bài viết được **xuất bản lần đầu** (không phải cập nhật). \* Thực hiện hành động dựa trên trạng thái (ví dụ: lên lịch cho bài viết). |
| **`comment_post`**           | Chạy sau khi một bình luận **mới được thêm** vào cơ sở dữ liệu.                       | \* Gửi thông báo đến người quản lý hoặc người dùng khác về bình luận mới.                                                                                     |

---

### IV. Hooks liên quan đến Mẫu (Template)

## 

| **Action Hook** | **Mô tả ngắn gọn** | **Ứng dụng phổ biến khi đi làm** |
| --- | --- | --- |
| **`get_header`** | Chạy ngay trước khi tệp `header.php` được tải. | \* Thực hiện các logic PHP **trước** khi header được hiển thị. |
| **`get_footer`** | Chạy ngay trước khi tệp `footer.php` được tải. | \* Thực hiện các logic PHP **trước** khi footer được hiển thị. |

**Ví dụ thực tế (Code Snippet):**

Để thêm Google Analytics vào trang web của bạn:

PHP

    function add_google_analytics_code() {
        // Thay thế UA-XXXXXX-X bằng mã theo dõi thực tế của bạn
        echo "";
        echo "<script> (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=o.createElement(g), m=o.getElementsByTagName(g)[0];a.async=1;a.src=r;m.parentNode.insertBefore(a,m) })(window,document,'script','//www.google-analytics.com/analytics.js','ga'); ga('create', 'UA-XXXXXX-X', 'auto'); ga('send', 'pageview'); </script>";
    }
    // Hook vào wp_head để mã được đặt trong thẻ <head>
    add_action( 'wp_head', 'add_google_analytics_code' );
    

Bạn có muốn tôi đi sâu vào bất kỳ Action Hook cụ thể nào trong danh sách này không, hoặc cung cấp thêm ví dụ code cho một trường hợp ứng dụng thực tế nào đó?

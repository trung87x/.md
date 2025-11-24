##

Tuyệt vời! **Underscores (\_s)** là một **starter theme** (theme khởi tạo) rất phổ biến và mạnh mẽ dành cho việc phát triển theme **WordPress**.

Dưới đây là những điều cơ bản bạn cần biết về Underscores và cấu trúc file:

## 🚀 Underscores (\_s) là gì?

##

Underscores là một theme cơ bản, tối giản, và không có style được tạo ra bởi **Automattic** (công ty đứng sau WordPress.com và WooCommerce) để cung cấp một **điểm khởi đầu** (boilerplate) tốt nhất cho các nhà phát triển theme WordPress.

### **Mục đích chính:**

##

- **Code sạch và tiêu chuẩn:** Cung cấp code tuân thủ các tiêu chuẩn của WordPress và có các tính năng cần thiết cho một theme hiện đại.
- **Tối giản (Minimal):** Nó loại bỏ mọi thứ không cần thiết, không có giao diện (CSS) phức tạp, giúp bạn dễ dàng xây dựng thiết kế của riêng mình.
- **Tập trung vào PHP và Template Tags:** Nó đã thiết lập sẵn các template file và sử dụng các **template tags** (hàm PHP của WordPress) tốt nhất để hiển thị nội dung, menu, sidebar, v.v.

---

## 📁 Phân tích Cấu trúc Thư mục và File

##

Cấu trúc thư mục và file trong hình ảnh là cấu trúc cốt lõi của một theme Underscores điển hình (hoặc theme phát triển từ nó).

### 1\. Các Thư mục Chính

##

| **Thư mục**        | **Chức năng**                                                                       | **Ghi chú**                                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **css**            | Chứa các file **CSS** và style cho theme.                                           | Đây là nơi bạn đặt file BS5 CSS đã tích hợp.                                                                          |
| **inc**            | Chứa các file **PHP "include"** (bao gồm) nhỏ hơn.                                  | Thường dùng để tổ chức các hàm và tính năng của theme (như thiết lập theme, customizer, hooks, v.v.) một cách mô-đun. |
| **js**             | Chứa các file **JavaScript** (JS).                                                  | Nơi đặt JS của theme và JS của BS5.                                                                                   |
| **languages**      | Chứa các file **ngôn ngữ** (.po, .mo, .pot) cho việc dịch theme (i18n).             | Cần thiết để theme của bạn có thể sử dụng được bằng nhiều ngôn ngữ.                                                   |
| **template-parts** | Chứa các **phần nhỏ của template** (như nội dung bài viết, tiêu đề bài viết, v.v.). | Dùng để tái sử dụng code trong các template file lớn hơn, sử dụng hàm `get_template_part()`.                          |

---

### 2\. Các Template File (PHP)

##

Đây là các file quan trọng mà WordPress sử dụng để quyết định cách hiển thị nội dung.

| **File**          | **Chức năng**                                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **index.php**     | **File template mặc định** (fallback) nếu không tìm thấy template cụ thể hơn.                                                      |
| **header.php**    | Chứa phần **đầu** của trang, bao gồm `<!DOCTYPE>`, `<html>`, `<head>`, và thẻ `<body>` mở.                                         |
| **footer.php**    | Chứa phần **cuối** của trang, bao gồm thẻ `<body>` và `<html>` đóng, và các script được enqueue ở cuối.                            |
| **functions.php** | **Cốt lõi** của theme. Nơi bạn khai báo các tính năng, đăng ký menu, sidebar, enqueue styles/scripts, và định nghĩa các hàm riêng. |
| **single.php**    | Template hiển thị **một bài viết** (post) riêng lẻ.                                                                                |
| **page.php**      | Template hiển thị **một trang** (page) riêng lẻ.                                                                                   |
| **archive.php**   | Template hiển thị các trang **lưu trữ** (ví dụ: bài viết theo danh mục, thẻ, tác giả, ngày).                                       |
| **search.php**    | Template hiển thị **kết quả tìm kiếm**.                                                                                            |
| **404.php**       | Template hiển thị khi **không tìm thấy trang** (lỗi 404).                                                                          |
| **comments.php**  | Template được gọi để hiển thị và xử lý **bình luận**.                                                                              |
| **sidebar.php**   | Template chứa **sidebar** (thanh bên) của theme.                                                                                   |

---

### 3\. Các File Cấu hình và Tài nguyên Khác

##

| **File**                              | **Chức năng**                                                                                                                                      |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **style.css**                         | **File bắt buộc** của theme WordPress. Chứa tiêu đề theme (Tên, Tác giả, Phiên bản, v.v.) và là file CSS chính.                                    |
| **style-rtl.css**                     | CSS dành cho các ngôn ngữ viết từ phải sang trái (**R**ight-**T**o-**L**eft).                                                                      |
| **README.txt** / **LICENSE**          | Thông tin về theme và giấy phép sử dụng.                                                                                                           |
| **screenshot.png**                    | Hình ảnh đại diện cho theme, được hiển thị trong bảng điều khiển WordPress.                                                                        |
| **composer.json** / **package.json**  | File cấu hình cho các công cụ quản lý dependency (PHP: Composer, JS/Dev: npm). Underscores thường sử dụng chúng để quản lý các công cụ phát triển. |
| **.eslintrc** / **.stylelintrc.json** | File cấu hình cho các công cụ **linting** (kiểm tra chất lượng code) cho JS và CSS.                                                                |
| **phpcs.xml.dist**                    | Cấu hình cho **PHP Code Sniffer**, một công cụ đảm bảo code PHP tuân thủ các tiêu chuẩn.                                                           |

## 💡 Thảo luận tiếp theo

##

Bây giờ bạn đã nắm được cấu trúc cơ bản, chúng ta có thể thảo luận sâu hơn.

**Bạn muốn tiếp tục tìm hiểu về điều gì nhất?**

- **A.** Cách Underscores sử dụng `get_template_part()` trong thư mục `template-parts`.
- **B.** Các hàm quan trọng nhất trong `functions.php` của Underscores.
- **C.** Cách bạn nên bắt đầu thêm code BS5 và style riêng vào cấu trúc này.

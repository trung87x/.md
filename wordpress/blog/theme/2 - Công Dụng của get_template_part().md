## 

Rất vui được thảo luận về `get_template_part()`! Đây là một trong những **tính năng cốt lõi** giúp Underscores và các theme WordPress hiện đại trở nên linh hoạt và dễ bảo trì.

## 🧱 Công Dụng của `get_template_part()`

## 

Hàm `get_template_part()` là cách chuẩn trong WordPress để **tách** code HTML/PHP phức tạp thành các **phần nhỏ có thể tái sử dụng** (reusable components).

### **1\. Nguyên Tắc DRY (Don't Repeat Yourself)**

## 

Thay vì lặp lại code HTML để hiển thị tiêu đề bài viết (post header) hoặc nội dung bài viết (post content) trong các file như `index.php`, `archive.php`, và `search.php`, bạn chỉ cần viết code đó một lần trong thư mục `template-parts` và gọi nó bằng hàm này.

### **2\. Cấu Trúc Underscores**

## 

Underscores sử dụng thư mục **`template-parts`** để lưu trữ các thành phần này.

![Hình ảnh về the WordPress Template Hierarchy, showing how template files call template parts](https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRAF6DOiDw390lwlBLq_mA08hQJXL5PQwOiT2u9I9YJ3Leop6Gld59bJNoDxbaFn864wZ1azuSUanSQUYGMdrQ-Nl7KZF1BvdDMk-A4Utn9fC7ahJc)

Getty Images

Thông thường, bên trong `template-parts`, bạn sẽ thấy các thư mục con sau:

-   **`content`**: Chứa các phần tử hiển thị nội dung bài viết.
    
-   **`header`**: Chứa các phần tử liên quan đến tiêu đề trang (như logo, site title).
    
-   **`post`**: Có thể chứa các phần tử liên quan đến bài viết.
    

* * *

## ⚙️ Cách Hoạt Động Cụ Thể

## 

Cú pháp cơ bản của hàm là:

`<?php get_template_part( $slug, $name ); ?>`

-   **`$slug`**: Tên của thư mục/file (không bao gồm phần mở rộng `.php`).
    
-   **`$name`**: Tên tùy chọn được gắn vào.
    

### **Ví dụ trong Underscores (File `index.php`):**

## 

Trong file `index.php` của Underscores, để hiển thị danh sách các bài viết, bạn sẽ thấy code tương tự như sau (bên trong vòng lặp WordPress `while ( have_posts() ) : the_post();`):

PHP

    <?php
        get_template_part( 'template-parts/content', get_post_type() );
    ?>
    

**Giải thích:**

1.  **`'template-parts/content'`** là `$slug`. Điều này bảo WordPress tìm kiếm file trong thư mục `template-parts` và bắt đầu tên file bằng `content-`.
    
2.  **`get_post_type()`** là `$name`. Hàm này trả về loại bài viết hiện tại (ví dụ: `'post'`, `'page'`, `'product'` nếu bạn dùng WooCommerce).
    
3.  Khi đó, WordPress sẽ tìm kiếm các file theo thứ tự ưu tiên sau:
    
    -   **`template-parts/content-post.php`** (Nếu bài viết là loại 'post')
        
    -   **`template-parts/content-page.php`** (Nếu bài viết là loại 'page')
        
    -   **`template-parts/content.php`** (Nếu không tìm thấy file cụ thể, đây là **fallback**)
        

### **Ví dụ về Cấu trúc file:**

## 

| **File Gọi Hàm (Ví dụ: archive.php)** | **Template Parts Được Gọi** | **Mục Đích** |
| --- | --- | --- |
| `get_template_part( 'template-parts/content', get_post_type() );` | **`content-post.php`** (hoặc **`content.php`**) | Hiển thị nội dung, tiêu đề, và metadata của _bài viết_. |
| `get_template_part( 'template-parts/header/site', 'branding' );` | **`site-branding.php`** | Hiển thị logo và tên trang web (thường được gọi trong `header.php`). |

* * *

## 🌟 Lợi Ích Chính

## 

-   **Dễ dàng tùy chỉnh:** Nếu bạn muốn thay đổi cách hiển thị tiêu đề bài viết cho _tất cả_ các loại bài viết, bạn chỉ cần sửa file **`template-parts/content.php`** hoặc **`template-parts/content-post.php`**.
    
-   **Tạo Template Cụ Thể:** Bạn có thể tạo các file như `content-aside.php` hoặc `content-gallery.php` (dựa trên **Post Format**) và WordPress sẽ tự động sử dụng chúng khi bạn gọi `get_template_part( 'template-parts/content', get_post_format() );`.
    

Bạn có muốn tôi đi sâu vào một template part cụ thể trong Underscores, ví dụ như file **`template-parts/content.php`** để xem nó được viết như thế nào không?
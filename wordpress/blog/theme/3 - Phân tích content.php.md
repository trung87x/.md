##

Tuyệt vời! Chúng ta hãy đi sâu vào file **`template-parts/content.php`** vì đây là template part được gọi nhiều nhất và là nơi bạn sẽ bắt đầu tích hợp **Bootstrap 5 (BS5)** để định hình giao diện cho các bài viết của mình.

---

## 🧐 Phân tích `template-parts/content.php`

##

File này là **template part mặc định** (fallback) để hiển thị nội dung của một bài viết (post) trong vòng lặp WordPress. Nó được gọi khi WordPress không tìm thấy template part cụ thể hơn (ví dụ: `content-page.php`, `content-post.php`, hoặc template part dựa trên Post Format).

### 1\. Cấu trúc HTML/PHP Cơ Bản

##

File `content.php` điển hình của Underscores sẽ chứa cấu trúc để hiển thị các thành phần chính của bài viết:

- **Wrapper (Phần bao bọc):** Thẻ HTML ngoài cùng chứa toàn bộ bài viết.
- **Header (Tiêu đề):** Chứa tiêu đề bài viết và metadata (thông tin tác giả, ngày tháng).
- **Content (Nội dung):** Chứa nội dung chính của bài viết.
- **Footer (Chân trang):** Thường chứa các thẻ (tags), danh mục (categories), và nút "Đọc thêm" (Read More).

### 2\. Các Hàm WordPress Quan Trọng

##

Trong `content.php`, bạn sẽ thấy các hàm PHP sau được sử dụng để hiển thị dữ liệu:

| **Hàm**                           | **Mục đích**                                                                                             | **Kết quả hiển thị**                                              |
| --------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `the_ID()`                        | In ra **ID** của bài viết hiện tại.                                                                      | `post-123`                                                        |
| `post_class()`                    | Thêm các **class CSS** tự động dựa trên loại bài viết, trạng thái, v.v.                                  | `class="post-123 post type-post status-publish format-standard"`  |
| `the_title()`                     | In ra **tiêu đề** bài viết (có thể kèm link).                                                            | `<h2 class="entry-title"><a href="...">Tiêu đề bài viết</a></h2>` |
| `underscores_posted_on()`         | Một hàm custom (được định nghĩa trong `functions.php`) để hiển thị **metadata** (ngày tháng, tác giả).   | Ngày 21 tháng 11, 2025 bởi Tên tác giả                            |
| `the_excerpt()` / `the_content()` | Hiển thị **đoạn trích** (trên trang archive) hoặc **toàn bộ nội dung** (trên trang single) của bài viết. | Nội dung HTML của bài viết.                                       |

---

## 🛠️ Tích hợp Bootstrap 5 vào `content.php`

##

Đây là nơi bạn **thay thế** hoặc **bổ sung** các class CSS mặc định của Underscores bằng **các class của BS5** để tạo bố cục và styling.

### 1\. Thay thế Wrapper Class

##

Bạn nên thêm các class BS5 vào thẻ wrapper (thường là `<article>`) để định hình bố cục (ví dụ: cột, thẻ card).

**Code Underscores gốc:**

PHP

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        </article>

**Code sau khi tích hợp BS5 (Ví dụ tạo một Card):**

PHP

    <article id="post-<?php the_ID(); ?>" <?php post_class( 'card mb-4' ); ?>>
        <div class="card-body">
            </div>
    </article>

- **`post_class( 'card mb-4' )`**: Thêm các class BS5 `card` (để tạo khung bài viết) và `mb-4` (margin-bottom 4) vào danh sách các class mặc định của WordPress.

### 2\. Định dạng Tiêu đề (Header) và Metadata

##

Bạn sẽ bọc tiêu đề và metadata bằng các class BS5 như `card-title` và `small text-muted`.

**Trong `content.php`:**

PHP

    <header class="entry-header">
        <?php the_title( '<h2 class="entry-title card-title">', '</h2>' ); ?>

        <?php if ( 'post' === get_post_type() ) : ?>
            <div class="entry-meta small text-muted">
                <?php underscores_posted_on(); ?>
            </div>
        <?php endif; ?>
    </header>

### 3. Hiển thị Nội dung (The Content)

Đây là phần quan trọng nhất. Bạn cần phân biệt giữa trang **Archive** (danh sách bài viết) và trang **Single** (bài viết chi tiết).

| Trang                | Hàm sử dụng     | Cách tích hợp BS5                                                                            |
| :------------------- | :-------------- | :------------------------------------------------------------------------------------------- |
| **Archive/Search**   | `the_excerpt()` | Thêm nút **Đọc thêm** (`<a class="btn btn-primary" ...>`) sau đoạn trích.                    |
| **Single Post/Page** | `the_content()` | Đảm bảo nội dung (ảnh, bảng, v.v.) tuân thủ quy tắc responsive của BS5 (ví dụ: `img-fluid`). |

**Ví dụ:**

PHP

    <div class="entry-content card-text">
        <?php
        if ( is_singular() ) {
            // Trên trang bài viết chi tiết, hiển thị toàn bộ nội dung
            the_content();
        } else {
            // Trên trang archive, hiển thị đoạn trích
            the_excerpt();
            // Nút "Đọc thêm"
            echo '<a href="' . esc_url( get_permalink() ) . '" class="btn btn-primary mt-3">' . esc_html__( 'Đọc thêm', 'your-theme-name' ) . '</a>';
        }
        ?>
    </div>

Việc này giúp bạn tạo ra một giao diện đồng nhất, dễ quản lý, dựa trên các thành phần BS5.

Bạn có muốn xem cách các hàm trong **`functions.php`** của Underscores hoạt động, đặc biệt là cách chúng \*\*en

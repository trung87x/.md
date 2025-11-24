# 🎣 Hooks (Móc) trong WordPress: Phân Loại và Ứng Dụng Chi Tiết

##

Hooks được chia thành **hai loại chính**:

---

## 1\. Action Hooks (Hook Hành động) ⚙️

##

**Action Hooks** là những điểm dừng (hook) được thiết lập sẵn trong mã nguồn WordPress, cho phép lập trình viên **gọi một hàm tùy chỉnh** (chạy code của riêng bạn) tại một thời điểm chính xác trong **vòng đời** của WordPress. Nói cách khác, Action Hooks là cơ chế chính để bạn **thêm các tính năng mới** vào trang web của mình mà không cần sửa đổi trực tiếp các file cốt lõi của WordPress.

- **Chức năng:** Cho phép bạn **THỰC HIỆN** một hành động (chạy một hàm PHP) tại một thời điểm cụ thể.
- **Cách sử dụng:** Dùng hàm `add_action()`.
- **Dữ liệu:** Không nhận đầu vào và **không cần trả về** (`return`) bất kỳ dữ liệu nào.
- **Ví dụ Hook:** `wp_head`, `wp_footer`, `init`, `wp_enqueue_scripts`, `save_post`.

  > _Ví dụ ứng dụng: Chèn Google Analytics vào **`wp_footer`**._

### Chi Tiết Các Action Hooks Phổ Biến

#### 1\. `init` 🚀 (Khởi tạo WordPress)

##

- **Chức năng:** Được gọi sớm, dùng để **đăng ký** các thành phần cốt lõi (như Custom Post Types, Taxonomies).
- **Ví dụ (Đăng ký CPT):**

PHP

    function register_product_post_type() {
        register_post_type( 'product', array( /* arguments */ ) );
    }
    add_action( 'init', 'register_product_post_type' );

#### 2\. `wp_enqueue_scripts` 🎨 (Tải Scripts và Styles)

##

- **Chức năng:** Được gọi trên **frontend** để **đăng ký** và **tải** (enqueue) các file CSS và JavaScript.
- **Ví dụ (Tải CSS & JS):**

PHP

    function custom_load_assets() {
        wp_enqueue_style( 'main-style', get_stylesheet_uri() );
        wp_enqueue_script( 'custom-js', get_template_directory_uri() . '/js/custom.js' );
    }
    add_action( 'wp_enqueue_scripts', 'custom_load_assets' );

#### 3\. `wp_head` 📝 (Phần Đầu Trang)

##

- **Chức năng:** Được gọi ngay trước thẻ đóng `</head>`.
- **Ví dụ (Thêm Meta Tag):**

PHP

    function add_verification_meta() {
        echo '<meta name="google-site-verification" content="YOUR_CODE">';
    }
    add_action( 'wp_head', 'add_verification_meta' );

#### 4\. `wp_footer` 📑 (Phần Chân Trang)

##

- **Chức năng:** Được gọi ngay trước thẻ đóng `</body>`.
- **Ví dụ (Chèn Google Analytics):**

PHP

    function add_google_analytics_code() {
        echo '';
        echo '<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>';
    }
    add_action( 'wp_footer', 'add_google_analytics_code' );

#### 5\. `save_post` 💾 (Lưu Bài Viết)

##

- **Chức năng:** Được gọi ngay sau khi một bài viết/trang được **lưu** hoặc **cập nhật**.
- **Ví dụ (Lưu Custom Field):**

PHP

    function save_custom_meta_fields( $post_id, $post, $update ) {
        // ... Logic kiểm tra bảo mật ...
        if ( isset( $_POST['my_custom_field'] ) ) {
            update_post_meta( $post_id, 'my_custom_field_key', sanitize_text_field( $_POST['my_custom_field'] ) );
        }
    }
    add_action( 'save_post', 'save_custom_meta_fields', 10, 3 );

---

## 2\. Filter Hooks (Hook Lọc) 💬

##

**Filter Hooks** là cơ chế cho phép bạn **sửa đổi** một giá trị (như văn bản, số, mảng) mà WordPress đang chuẩn bị sử dụng. Nó hoạt động như một "bộ lọc" để thay đổi dữ liệu trước khi dữ liệu đó được hiển thị hoặc lưu trữ.

- **Chức năng:** Cho phép bạn **THAY ĐỔI** hoặc **LỌC** một giá trị dữ liệu.
- **Cách sử dụng:** Dùng hàm `add_filter()`.
- **Dữ liệu:** **Phải nhận** giá trị dữ liệu gốc, sửa đổi nó, và **phải TRẢ VỀ** (`return`) giá trị đã sửa đổi.
- **Ví dụ Hook:** `the_content`, `the_title`, `excerpt_length`, `upload_mimes`.

  > _Ví dụ ứng dụng: Thêm một câu "Đọc thêm..." vào **`the_content`** của bài viết._

### Chi Tiết Các Filter Hooks Phổ Biến

#### 1\. `the_content` 📄 (Nội dung Bài viết)

##

- **Chức năng:** Lọc (sửa đổi) **toàn bộ nội dung** bài viết/trang trước khi hiển thị.
- **Ví dụ ứng dụng (Thêm thông báo bản quyền):**

PHP

    function add_copyright_notice( $content ) {
        if ( is_single() && ! is_admin() && ! is_feed() ) {
            $content .= '<p><em>© Bản quyền nội dung thuộc về tác giả.</em></p>';
        }
        return $content;
    }
    add_filter( 'the_content', 'add_copyright_notice' );

#### 2\. `the_title` 🏷️ (Tiêu đề Bài viết)

##

- **Chức năng:** Lọc (sửa đổi) **tiêu đề** của bài viết/trang trước khi hiển thị.
- **Ví dụ ứng dụng (Thêm tiền tố Premium):**

PHP

    function prefix_premium_title( $title, $id = null ) {
        if ( $id == 10 ) {
            $title = '[PREMIUM] ' . $title;
        }
        return $title;
    }
    add_filter( 'the_title', 'prefix_premium_title', 10, 2 );

#### 3\. `excerpt_length` 📏 (Độ dài Đoạn trích)

##

- **Chức năng:** Lọc (sửa đổi) **số lượng từ mặc định** được sử dụng khi tạo đoạn trích tự động.
- **Ví dụ ứng dụng (Đặt độ dài 20 từ):**

PHP

    function custom_excerpt_length( $length ) {
        return 20;
    }
    add_filter( 'excerpt_length', 'custom_excerpt_length' );

#### 4\. `upload_mimes` 📂 (Các định dạng File được phép Upload)

##

- **Chức năng:** Lọc (sửa đổi) **danh sách các loại file (MIME types)** mà WordPress cho phép upload.
- **Ví dụ ứng dụng (Cho phép upload SVG):**

PHP

    function allow_svg_uploads( $mimes ) {
        $mimes['svg'] = 'image/svg+xml';
        return $mimes;
    }
    add_filter( 'upload_mimes', 'allow_svg_uploads' );

---

### 📊 Tóm Tắt Khác Biệt

##

| **Loại Hook** | **Dùng để làm gì?**               | **Hàm sử dụng** | **Có cần trả về (Return) không?**   |
| ------------- | --------------------------------- | --------------- | ----------------------------------- |
| **Action**    | Thực thi một hành động/chức năng. | `add_action()`  | **KHÔNG**                           |
| **Filter**    | Thay đổi một giá trị/dữ liệu.     | `add_filter()`  | **CÓ** (Phải trả về giá trị đã lọc) |

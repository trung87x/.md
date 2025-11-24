## 🛠️ Thử Thách 3: Tích hợp (Nhúng) Bootstrap vào Theme Mới

##

**🎯 Mục tiêu:** Đảm bảo Bootstrap CSS và JS được tải chính xác trên trang web của bạn.

**Giả định:** Theme mới của bạn (`my-custom-theme`) đã được kích hoạt.

### 1\. 📂 Bước 1: Chuẩn bị File Bootstrap

##

1.  **Tải Bootstrap:** Tải file **Compiled CSS and JS** (Ví dụ: 5.3.3) từ trang chủ Bootstrap.
2.  **Cấu trúc thư mục:** Tạo thư mục `assets` trong Theme của bạn và đặt các file Bootstrap vào đó:

    wp-content/themes/my-custom-theme/
    ├── assets/
    │ ├── css/
    │ │ └── bootstrap.min.css
    │ └── js/
    │ └── bootstrap.bundle.min.js
    ├── functions.php
    └── ...

### 2\. 📝 Bước 2: Nhúng (Enqueue) Bootstrap qua `functions.php`

##

Đây là bước kỹ thuật cốt lõi để "tích hợp" (nhúng) Bootstrap. Mở file **`wp-content/themes/my-custom-theme/functions.php`** và cập nhật code sau vào hàm mytwentyfive_scripts:

PHP

    /**
    * Enqueue scripts and styles.
    * Đã tích hợp Bootstrap CSS và JS vào hàm này
    */
    function mytwentyfive_scripts() {
        // 1. Nhúng Bootstrap CSS (Mới)
        // Tên file của bạn: bootstrap.min.css trong assets/css/
        wp_enqueue_style( 'bootstrap-css', get_template_directory_uri() . '/assets/css/bootstrap.min.css', array(), '5.3.3' );

        // 2. Nhúng Style mặc định của Theme (Sau Bootstrap)
        wp_enqueue_style( 'mytwentyfive-style', get_stylesheet_uri(), array('bootstrap-css'), _S_VERSION ); // Dùng array('bootstrap-css') để đảm bảo Bootstrap tải trước
        wp_style_add_data( 'mytwentyfive-style', 'rtl', 'replace' );

        // 3. Nhúng Bootstrap JS (Mới)
        // Tên file của bạn: bootstrap.bundle.min.js trong assets/js/
        // Thêm 'jquery' vào dependencies
        wp_enqueue_script( 'bootstrap-js', get_template_directory_uri() . '/assets/js/bootstrap.bundle.min.js', array( 'jquery' ), '5.3.3', true );

        // 4. Các script gốc của Underscores
        wp_enqueue_script( 'mytwentyfive-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

        if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
            wp_enqueue_script( 'comment-reply' );
        }
    }
    add_action( 'wp_enqueue_scripts', 'mytwentyfive_scripts' );

### 3\. ✅ Kiểm tra (Kiểm tra kỹ thuật)

##

Sau khi lưu file `functions.php`, bạn có thể kiểm tra xem việc nhúng đã thành công hay chưa bằng cách:

1.  Mở trang web của bạn.
2.  Nhấn **F12** để mở Developer Tools (Công cụ dành cho nhà phát triển).
3.  Chuyển đến tab **Network** (Mạng) hoặc tab **Elements** (Phần tử) và tìm kiếm file **`bootstrap.min.css`** và **`bootstrap.bundle.min.js`**.

Nếu hai file này được tải thành công, Thử thách 3 đã hoàn thành.

## 🚀 4 Ví Dụ Thực Tế về Ứng Dụng Action Hook

##

---

### 1\. Đăng ký Scripts và Styles chuẩn

##

Đây là nhiệm vụ **bắt buộc** khi phát triển theme/plugin.

| **Hook**             | **Mục đích**                          |
| -------------------- | ------------------------------------- |
| `wp_enqueue_scripts` | Đăng ký tài nguyên cho **Front-end**. |

**Tình huống:** Bạn cần tải một file CSS (`custom-styles.css`) và một file JavaScript (`custom-script.js`) vào giao diện người dùng.

PHP

    function my_theme_assets() {
        // 1. Đăng ký và xếp hàng CSS
        wp_enqueue_style(
            'my-custom-style', // Tên định danh (handle)
            get_template_directory_uri() . '/css/custom-styles.css', // Đường dẫn file
            array(), // Dependencies (phụ thuộc vào style nào khác)
            '1.0' // Version
        );

        // 2. Đăng ký và xếp hàng JS
        wp_enqueue_script(
            'my-custom-script', // Tên định danh (handle)
            get_template_directory_uri() . '/js/custom-script.js', // Đường dẫn file
            array('jquery'), // Dependencies (phụ thuộc vào jQuery)
            '1.0', // Version
            true // Đặt true để script được tải ở footer (tối ưu tốc độ)
        );
    }
    // Móc hàm vào hook wp_enqueue_scripts
    add_action( 'wp_enqueue_scripts', 'my_theme_assets' );

---

### 2\. Thêm Tùy chọn Tùy chỉnh vào Menu Admin

##

| **Hook**     | **Mục đích**                                    |
| ------------ | ----------------------------------------------- |
| `admin_menu` | Thêm các mục mới vào thanh điều hướng quản trị. |

**Tình huống:** Bạn đang tạo một plugin và cần một trang cài đặt riêng nằm dưới mục "Cài đặt" (Settings) của WordPress.

PHP

    function my_plugin_add_admin_menu() {
        // Thêm mục con (submenu) vào menu 'settings'
        add_options_page(
            'Cài đặt Plugin Của Tôi', // Tiêu đề trang
            'Plugin Của Tôi', // Tên hiển thị trên menu
            'manage_options', // Capability (quyền) cần thiết để xem trang
            'my-plugin-settings', // Slug (định danh) của trang
            'my_plugin_settings_page_callback' // Tên hàm callback để hiển thị nội dung trang
        );
    }

    function my_plugin_settings_page_callback() {
        // Hiển thị nội dung HTML/form của trang cài đặt tại đây
        echo '<div class="wrap"><h1>Cài đặt Plugin Của Tôi</h1><p>Đây là giao diện cài đặt.</p></div>';
    }

    // Móc hàm vào hook admin_menu
    add_action( 'admin_menu', 'my_plugin_add_admin_menu' );

---

### 3\. Xử lý Dữ liệu khi Lưu Bài viết (Post)

##

| **Hook**    | **Mục đích**                                        |
| ----------- | --------------------------------------------------- |
| `save_post` | Thực thi logic ngay sau khi Post được lưu/cập nhật. |

**Tình huống:** Bạn muốn lưu trữ thêm một trường dữ liệu ẩn (metadata) vào bài viết mỗi khi nó được lưu.

PHP

    function custom_save_post_data( $post_id, $post, $update ) {
        // Bắt buộc: Kiểm tra nếu là autosave (lưu tự động)
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return;
        }

        // Bắt buộc: Kiểm tra nếu post type là loại bạn muốn xử lý
        if ( $post->post_type !== 'post' ) {
            return;
        }

        // Lấy dữ liệu từ form (giả sử có trường 'custom_field_value')
        if ( isset( $_POST['custom_field_value'] ) ) {
            $data = sanitize_text_field( $_POST['custom_field_value'] );

            // Lưu metadata vào bài viết
            update_post_meta(
                $post_id,
                '_my_secret_key', // Tên key meta
                $data // Giá trị
            );
        }
    }
    // Hook hàm vào save_post. Lưu ý: hàm callback chấp nhận 3 đối số, nên cần khai báo accepted_args là 3
    add_action( 'save_post', 'custom_save_post_data', 10, 3 );

---

### 4\. Chèn Nội dung Tùy chỉnh vào Footer

##

| **Hook**    | **Mục đích**                                     |
| ----------- | ------------------------------------------------ |
| `wp_footer` | Chèn nội dung ngay trước thẻ `</body>` kết thúc. |

**Tình huống:** Bạn muốn chèn một thông báo bản quyền động hiển thị năm hiện tại hoặc một đoạn mã JS của bên thứ ba.

PHP

    function add_dynamic_copyright() {
        $current_year = date('Y');

        // Sử dụng thẻ HTML ẩn hoặc hiển thị
        echo '<div class="copyright-notice">';
        echo 'Bản quyền &copy; ' . $current_year . ' Tên Công Ty Của Bạn. Mọi quyền được bảo lưu.';
        echo '</div>';

        // Ví dụ chèn JS (Nếu không muốn dùng wp_enqueue_scripts)
        // echo '<script>console.log("Footer script loaded.");</script>';
    }

    // Móc hàm vào hook wp_footer
    add_action( 'wp_footer', 'add_dynamic_copyright' );

Bạn có muốn tôi cung cấp ví dụ về cách sử dụng **Filter Hooks** (loại hook còn lại, dùng để thay đổi dữ liệu) không?

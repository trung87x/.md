##

Hàm functions.php trong theme Underscores đóng vai trò là "bảng điều khiển" để mở khóa các công cụ và giao diện tùy chỉnh cho người dùng trong WP Admin. Mọi hàm cốt lõi trong file này đều là bước chuẩn bị để tạo ra các tùy chọn UI (User Interface) thân thiện, giúp người dùng cuối quản lý theme (như vị trí menu, khu vực widget, và Custom Logo) mà không cần chạm vào code.

Các hàm và đoạn code quan trọng nhất dưới đây đều được gắn vào các Action Hook của WordPress để kích hoạt các tính năng này, đảm bảo theme hoạt động ổn định và cung cấp đầy đủ công cụ cấu hình trong giao diện quản trị.

---

## 🚀 Thiết lập Theme (Setup)

##

Đây là các chức năng cốt lõi được gọi bởi hook `after_setup_theme` để khởi tạo theme.

### 1\. `_s_setup()` (Hoặc tên tương tự)

##

Đây là hàm thiết lập chính, nơi bạn khai báo hỗ trợ cho các tính năng của WordPress.

- **Hỗ trợ Dịch thuật:**

  - `load_theme_textdomain( '_s', get_template_directory() . '/languages' );`
  - Cho phép theme có thể dịch thuật được.

- **Hỗ trợ RSS Feeds:**

  - `add_theme_support( 'automatic-feed-links' );`
  - Thêm liên kết RSS tự động.

- **Hỗ trợ Tiêu đề Động:**

  - `add_theme_support( 'title-tag' );`
  - Cho phép WordPress tự động quản lý `<title>` của trang.

- **Hỗ trợ Post Thumbnails (Ảnh đại diện):**

  - `add_theme_support( 'post-thumbnails' );`
  - Cho phép sử dụng ảnh đại diện cho bài viết/trang.

- **Hỗ trợ Markup HTML5:**

  - `add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'script', 'style', ) );`
  - Khai báo sử dụng markup HTML5 cho các thành phần cụ thể.

- **Đăng ký Menu:**

  - `register_nav_menus( array( 'menu-1' => esc_html__( 'Primary', '_s' ), ) );`
  - Đăng ký các vị trí menu điều hướng.

- **Hỗ trợ Custom Logo:**

  - `add_theme_support( 'custom-logo', array( 'height' => 250, 'width' => 250, 'flex-width' => true, 'flex-height' => true, ) );`
  - Cho phép tùy chỉnh logo qua Customizer.

- **Hỗ trợ Custom Background / Custom Header:**

  - Cung cấp các tùy chọn để người dùng tùy chỉnh nền hoặc tiêu đề trang.

> **Hook liên quan:** `add_action( 'after_setup_theme', '_s_setup' );`

---

## 🎨 Đăng ký Scripts và Styles (Enqueue Assets)

##

Để thêm CSS và JavaScript vào theme một cách đúng chuẩn và an toàn.

### 2\. `_s_scripts()` (Hoặc tên tương tự)

##

Hàm này được gọi bởi hook `wp_enqueue_scripts`.

- **Enqueue Style CSS:**

  - `wp_enqueue_style( '_s-style', get_stylesheet_uri(), array(), _s_VERSION );`
  - Đăng ký và load file `style.css` chính của theme.

- **Enqueue Script Navigation:**

  - `wp_enqueue_script( '_s-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _s_VERSION, true );`
  - Đăng ký và load file JS cho các tính năng như menu thả xuống (dropdown) hoặc menu dành cho thiết bị di động.

- **Enqueue Comment Reply Script:**

  - `if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) { wp_enqueue_script( 'comment-reply' ); }`
  - Load script `comment-reply` chỉ khi cần thiết (trên trang bài viết đơn và tính năng bình luận phân cấp được bật).

> **Hook liên quan:** `add_action( 'wp_enqueue_scripts', '_s_scripts' );`

---

## 🛠️ Đăng ký Widget Areas (Sidebar)

### 3\. `_s_widgets_init()` (Hoặc tên tương tự)

##

Hàm này được gọi bởi hook `widgets_init` để định nghĩa các khu vực widget có thể kéo thả.

- **Đăng ký Sidebar:**

  - `register_sidebar( array( 'name' => esc_html__( 'Sidebar', '_s' ), 'id' => 'sidebar-1', 'description' => esc_html__( 'Add widgets here.', '_s' ), 'before_widget' => '<section id="%1$s" class="widget %2$s">', 'after_widget' => '</section>', 'before_title' => '<h2 class="widget-title">', 'after_title' => '</h2>', ) );`
  - Định nghĩa tên, ID và các tag HTML bao quanh widget (`before_widget`, `after_widget`) và tiêu đề widget.

> **Hook liên quan:** `add_action( 'widgets_init', '_s_widgets_init' );`

---

## 📝 Tùy chỉnh (Template Tags & Utilities)

### 4\. Require các file chức năng khác

##

Underscores thường tổ chức các hàm chức năng vào các file riêng biệt để dễ quản lý và sẽ gọi chúng vào `functions.php` bằng lệnh `require`.

- `require get_template_directory() . '/inc/template-tags.php';`

  - Chứa các hàm nhỏ hữu ích (template tags) như hiển thị ngày, tác giả, v.v.

- `require get_template_directory() . '/inc/customizer.php';`

  - Chứa các thiết lập cho **Theme Customizer**.

- `require get_template_directory() . '/inc/template-functions.php';`

  - Chứa các chức năng được gọi bởi các action/filter hook khác.

---

**Tóm lại**, sự quan trọng của các hàm này nằm ở việc chúng tuân thủ nguyên tắc cốt lõi của WordPress: **sử dụng Hooks (`add_action` và `add_filter`)** để can thiệp vào các quy trình của WordPress, đảm bảo theme hoạt động ổn định và tương thích.

## 🏆 Thử Thách 1: Cài Đặt WordPress Cục Bộ

### 

Để làm được điều này, bạn cần cài đặt một **môi trường máy chủ cục bộ** (Local Server Environment) mô phỏng môi trường máy chủ web thực tế, bao gồm:

1.  **Web Server** (Apache hoặc Nginx)
    
2.  **PHP** (Ngôn ngữ lập trình của WordPress)
    
3.  **Database** (MySQL/MariaDB)
    

### 1\. ⚙️ Công Cụ Cần Thiết

### 

Cách dễ nhất là sử dụng một phần mềm tích hợp sẵn (stack):

| **Công cụ** | **Mô tả** |
| --- | --- |
| **XAMPP** | Phổ biến nhất, dễ dùng cho Windows, Mac, Linux. |
| **WAMP** | Tốt cho người dùng Windows. |
| **MAMP** | Tốt cho người dùng Mac. |
| **Local by Flywheel** | Chuyên biệt cho WordPress, rất đơn giản để tạo site. |

**Gợi ý:** Nếu bạn muốn đơn giản và chuyên nghiệp nhất cho WordPress, hãy dùng **Local by Flywheel**. Nếu muốn làm quen với môi trường máy chủ tổng quát, hãy dùng **XAMPP**.

### 2\. 📝 Hướng Dẫn Từng Bước (Sử dụng XAMPP)

### 

Tôi sẽ hướng dẫn bạn theo cách phổ biến nhất là dùng **XAMPP** (giả định bạn dùng Windows).

#### Bước A: Cài Đặt XAMPP

### 

1.  **Tải XAMPP:** Truy cập trang web chính thức của XAMPP (Apache Friends) và tải phiên bản mới nhất.
    
2.  **Cài đặt:** Chạy file cài đặt, chọn các thành phần mặc định (chắc chắn phải có Apache, MySQL, và PHP).
    
3.  **Khởi động:** Sau khi cài đặt, mở **XAMPP Control Panel**.
    
4.  Nhấn nút **Start** cho **Apache** và **MySQL**. Đèn báo bên cạnh chúng sẽ chuyển sang màu xanh lá cây.
    

#### Bước B: Tải và Thiết Lập WordPress

### 

1.  **Tải WordPress:** Truy cập trang [WordPress.org](https://wordpress.org/) và tải xuống file ZIP WordPress mới nhất (bằng tiếng Anh hoặc tiếng Việt).
    
2.  **Giải nén:** Giải nén file ZIP đó.
    
3.  **Đặt vào thư mục:** Sao chép thư mục WordPress đã giải nén vào thư mục `htdocs` của XAMPP (thường là `C:\xampp\htdocs\`).
    
    -   **Đổi tên:** Đổi tên thư mục `wordpress` thành tên dự án của bạn (ví dụ: `mytheme`).
        
    -   _Đường dẫn lúc này sẽ là:_ `C:\xampp\htdocs\mytheme`
        

#### Bước C: Tạo Cơ Sở Dữ Liệu (Database)

### 

1.  **Truy cập phpMyAdmin:** Mở trình duyệt và gõ địa chỉ: `http://localhost/phpmyadmin`
    
2.  **Tạo DB mới:**
    
    -   Nhấn vào tab **Databases** (Cơ sở dữ liệu).
        
    -   Trong ô **Create database**, gõ tên database (ví dụ: `mytheme_db`).
        
    -   Nhấn **Create**. (Không cần thay đổi Collation).
        

#### Bước D: Cài Đặt WordPress

### 

1.  **Bắt đầu:** Mở trình duyệt và gõ địa chỉ: `http://localhost/mytheme` (thay `mytheme` bằng tên thư mục bạn đặt ở Bước B).
    
2.  **Chọn ngôn ngữ:** Chọn ngôn ngữ bạn muốn (Tiếng Việt hoặc Tiếng Anh).
    
3.  **Nhập thông tin DB:** WordPress sẽ yêu cầu bạn cung cấp thông tin kết nối database:
    
    -   **Tên cơ sở dữ liệu:** `mytheme_db` (Tên bạn đã tạo ở Bước C).
        
    -   **Tên người dùng:** `root` (Mặc định của XAMPP).
        
    -   **Mật khẩu:** Để **trống** (Mặc định của XAMPP).
        
    -   **Máy chủ cơ sở dữ liệu:** `localhost`
        
    -   **Tiền tố bảng:** Giữ nguyên `wp_` hoặc đổi thành cái khác (ví dụ: `mt_`).
        
4.  **Chạy cài đặt:** Nhấn **Gửi** rồi nhấn **Thực hiện cài đặt**.
    
5.  **Thông tin Site:** Điền tên trang web, tên người dùng, mật khẩu quản trị.
    

* * *

Sau khi hoàn thành Bước D, bạn đã có một website WordPress chạy trên máy tính của mình!

-   **Trang web:** `http://localhost/mytheme/`
    
-   **Trang quản trị:** `http://localhost/mytheme/wp-admin`
    

Giờ bạn đã có môi trường để thử nghiệm các đoạn code theme của mình trong file **`functions.php`**!

Bạn có muốn tôi giúp bạn tạo một thư mục theme con (Child Theme) để bạn bắt đầu viết code an toàn không?
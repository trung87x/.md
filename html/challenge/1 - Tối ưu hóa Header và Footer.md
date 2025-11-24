**Tối ưu hóa header và footer**, tập trung vào chất lượng HTML chuẩn SEO và Khả năng truy cập (Accessibility - A11y).

## 🥇 Thử thách 1: Tối ưu hóa Header và Footer

**Mục tiêu:** Xây dựng cấu trúc HTML cơ bản nhất của trang web (&lt;head&gt;, &lt;header&gt;, &lt;footer&gt;) với độ chính xác cao nhất.

### 1\. Phần &lt;head&gt; (Tối ưu hóa SEO)

#### Yêu cầu:

1.  **Khai báo Cơ bản:** Đảm bảo có &lt;!DOCTYPE html&gt;, thẻ &lt;html&gt; có thuộc tính ngôn ngữ (&lt;lang="vi"&gt;) và &lt;meta charset="UTF-8"&gt;.
2.  **Viewport:** Thêm thẻ &lt;meta name="viewport" ...&gt; để đảm bảo thiết kế đáp ứng (Responsive).
3.  **Thẻ Title:** Thêm thẻ &lt;title&gt; (giả sử nội dung là "Trang Chủ | Công Ty ABC").
4.  **Liên kết CSS:** Liên kết đến tệp &lt;style.css&gt; (như trong hình).
5.  **Tải trước Font:** Giả sử bạn đang dùng font Google Fonts "Roboto". Hãy thêm thẻ &lt;link rel="preconnect"&gt; và &lt;link rel="preload"&gt; cho font này để tăng tốc độ tải (quan trọng cho Core Web Vitals).

### 2\. Phần &lt;header&gt; (Thanh Điều Hướng Ngữ Nghĩa)

#### Yêu cầu:

1.  **Thẻ Cấu trúc:** Sử dụng thẻ &lt;header&gt; để bao bọc.
2.  **Logo và Tên:**

    - Thêm logo (thẻ &lt;img&gt;) được bọc bởi liên kết (&lt;a&gt;) về trang chủ.
    - Sử dụng thuộc tính &lt;alt&gt; mô tả cho logo.

3.  **Thanh Điều Hướng:**

    - Sử dụng thẻ &lt;nav&gt; để bao bọc các liên kết.
    - Sử dụng danh sách &lt;ul&gt; và &lt;li&gt; cho các mục menu.
    - Thêm một nút tìm kiếm cơ bản (chỉ cần thẻ &lt;button&gt; với icon giả) bên ngoài &lt;nav&gt; nhưng vẫn trong &lt;header&gt;.

### 3\. Phần &lt;footer&gt; (Cấu trúc Đa Cột)

#### Yêu cầu:

1.  **Thẻ Cấu trúc:** Sử dụng thẻ &lt;footer&gt; để bao bọc toàn bộ nội dung.
2.  **Phân chia khu vực:** Sử dụng 3 thẻ &lt;section&gt; bên trong &lt;footer&gt;:

    - **Section 1:** Thông tin liên hệ (Địa chỉ, Điện thoại).
    - **Section 2:** Liên kết nhanh (Sử dụng &lt;ul&gt; và &lt;li&gt;).
    - **Section 3:** Mạng xã hội (Sử dụng &lt;ul&gt; và &lt;li&gt; cho các liên kết icon giả).

3.  **Thông tin bản quyền:** Thêm một thẻ &lt;div&gt; ở cuối &lt;footer&gt; chứa thông tin bản quyền (ví dụ: "© 2025 Công Ty ABC").

---

**Bạn có muốn tôi cung cấp lời giải gợi ý (Solution Hint) hoặc bạn đã sẵn sàng bắt đầu viết mã HTML cho thử thách này?**

##

Tuyệt vời! Chúng ta sẽ đi sâu vào **Thử thách 1: Tối ưu hóa header và footer**, tập trung vào chất lượng HTML chuẩn SEO và Khả năng truy cập (Accessibility - A11y), những yếu tố mang lại giá trị kinh tế trực tiếp cho dự án.

## 🥇 Thử thách 1: Tối ưu hóa Header và Footer

##

**Mục tiêu:** Xây dựng cấu trúc HTML cơ bản nhất của trang web (${<head>}$, ${<header>}$, ${<footer>}$) với độ chính xác cao nhất.

### 1\. Phần ${<head>}$ (Tối ưu hóa SEO)

#### Yêu cầu:

##

1.  **Khai báo Cơ bản:** Đảm bảo có ${<!DOCTYPE html>}$, thẻ ${<html>}$ có thuộc tính ngôn ngữ (${lang="vi"}$) và ${<meta charset="UTF-8">}$.
2.  **Viewport:** Thêm thẻ ${<meta name="viewport" ...>}$ để đảm bảo thiết kế đáp ứng (Responsive).
3.  **Thẻ Title:** Thêm thẻ ${<title>}$ (giả sử nội dung là "Trang Chủ | Công Ty ABC").
4.  **Liên kết CSS:** Liên kết đến tệp ${style.css}$ (như trong hình).
5.  **Tải trước Font:** Giả sử bạn đang dùng font Google Fonts "Roboto". Hãy thêm thẻ ${<link rel="preconnect">}$ và ${<link rel="preload">}$ cho font này để tăng tốc độ tải (quan trọng cho Core Web Vitals).

### 2\. Phần ${<header>}$ (Thanh Điều Hướng Ngữ Nghĩa)

#### Yêu cầu:

##

1.  **Thẻ Cấu trúc:** Sử dụng thẻ ${<header>}$ để bao bọc.
2.  **Logo và Tên:**

    - Thêm logo (thẻ ${<img>}$) được bọc bởi liên kết (${<a>}$) về trang chủ.
    - Sử dụng thuộc tính ${alt}$ mô tả cho logo.

3.  **Thanh Điều Hướng:**

    - Sử dụng thẻ ${<nav>}$ để bao bọc các liên kết.
    - Sử dụng danh sách ${<ul>}$ và ${<li>}$ cho các mục menu.
    - Thêm một nút tìm kiếm cơ bản (chỉ cần thẻ ${<button>}$ với icon giả) bên ngoài ${<nav>}$ nhưng vẫn trong ${<header>}$.

### 3\. Phần ${<footer>}$ (Cấu trúc Đa Cột)

#### Yêu cầu:

##

1.  **Thẻ Cấu trúc:** Sử dụng thẻ ${<footer>}$ để bao bọc toàn bộ nội dung.
2.  **Phân chia khu vực:** Sử dụng 3 thẻ ${<section>}$ bên trong ${<footer>}$:

    - **Section 1:** Thông tin liên hệ (Địa chỉ, Điện thoại).
    - **Section 2:** Liên kết nhanh (Sử dụng ${<ul>}$ và ${<li>}$).
    - **Section 3:** Mạng xã hội (Sử dụng ${<ul>}$ và ${<li>}$ cho các liên kết icon giả).

3.  **Thông tin bản quyền:** Thêm một thẻ ${<div>}$ ở cuối ${<footer>}$ chứa thông tin bản quyền (ví dụ: "© 2025 Công Ty ABC").

---

**Bạn có muốn tôi cung cấp lời giải gợi ý (Solution Hint) hoặc bạn đã sẵn sàng bắt đầu viết mã HTML cho thử thách này?**

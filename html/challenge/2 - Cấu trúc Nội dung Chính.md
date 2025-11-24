##

Việc sử dụng đúng các thẻ **ngữ nghĩa (Semantic HTML)** như ${<main>}$, ${<article>}$, ${<aside>}$, và ${<section>}$ sẽ tạo ra giá trị kinh tế thực tế.

---

## 🎯 Thử thách 2: Cấu trúc Nội dung Chính Ngữ Nghĩa

##

Thử thách này được chia thành hai phần, mô phỏng các tệp ${single}$ (trang chi tiết) và ${archive}$ (trang danh sách).

### 1\. Phần I: ${single}$ (Bài viết Đơn/Chi tiết)

##

**Mục tiêu:** Xây dựng cấu trúc cho một trang chi tiết bài viết, bao gồm nội dung chính và sidebar.

#### Yêu cầu:

##

1.  **Vùng chứa Chính:** Sử dụng thẻ ${<main>}$ để bao bọc mọi nội dung chính của trang. Thẻ ${<main>}$ phải nằm ngay sau ${<header>}$ và trước ${<footer>}$.
2.  **Cấu trúc Bài viết:**

    - Bên trong ${<main>}$, tạo một cấu trúc 2 cột giả định: một cột chính cho bài viết và một cột phụ cho sidebar.
    - Sử dụng thẻ ${<article>}$ để chứa toàn bộ nội dung của bài viết đang đọc.
    - Bên trong ${<article>}$, sử dụng ${<h1>}$ cho Tiêu đề Bài viết (chỉ 1 ${<h1>}$ trên trang).
    - Sử dụng thẻ ${<time>}$ (có thuộc tính ${datetime}$) để hiển thị ngày đăng.
    - Thêm ít nhất 3 cấp độ tiêu đề nội dung (${<h2>}$, ${<h3>}$) để thể hiện thứ bậc logic.

3.  **Sidebar:**

    - Sử dụng thẻ ${<aside>}$ để đại diện cho nội dung sidebar (giả sử nội dung này đến từ ${sidebar}$).
    - Bên trong ${<aside>}$, tạo một widget "Bài viết liên quan" bằng ${<section>}$.

### 2\. Phần II: ${archive}$ (Danh sách Bài viết)

##

**Mục tiêu:** Xây dựng cấu trúc danh sách bài viết/bài blog chuẩn mực.

#### Yêu cầu:

##

1.  **Vùng chứa Chính:** Cũng bắt đầu bằng thẻ ${<main>}$.
2.  **Khu vực Danh sách:**

    - Sử dụng thẻ ${<section>}$ có tiêu đề ${<h1>}$ (ví dụ: "Tất cả Bài viết") để bao bọc toàn bộ danh sách.

3.  **Cấu trúc Bài viết Rút gọn:**

    - Mỗi mục trong danh sách phải được bao bọc bằng thẻ ${<article>}$ riêng biệt.
    - Bên trong mỗi ${<article>}$, sử dụng thẻ ${<h2>}$ để hiển thị Tiêu đề bài viết (là liên kết ${<a>}$).
    - Thêm ${<p>}$ cho đoạn mô tả ngắn (excerpt).
    - Thêm liên kết "Đọc thêm" (Read More).

---

Bạn đã sẵn sàng để viết mã HTML cho cả hai phần ${single}$ và ${archive}$ chưa? Hãy nhớ chỉ tập trung vào **cấu trúc HTML Ngữ nghĩa** theo yêu cầu!

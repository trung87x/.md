Việc sử dụng đúng các thẻ **ngữ nghĩa (Semantic HTML)** như &lt;main&gt;, &lt;article&gt;, &lt;aside&gt;, và &lt;section&gt; sẽ tạo ra giá trị kinh tế thực tế.

---

## 🎯 Thử thách 2: Cấu trúc Nội dung Chính Ngữ Nghĩa

Thử thách này được chia thành hai phần, mô phỏng các tệp single (trang chi tiết) và archive (trang danh sách).

### 1\. Phần I: single (Bài viết Đơn/Chi tiết)

**Mục tiêu:** Xây dựng cấu trúc cho một trang chi tiết bài viết, bao gồm nội dung chính và sidebar.

#### Yêu cầu:

1.  **Vùng chứa Chính:** Sử dụng thẻ &lt;main&gt; để bao bọc mọi nội dung chính của trang. Thẻ &lt;main&gt; phải nằm ngay sau &lt;header&gt; và trước &lt;footer&gt;.
2.  **Cấu trúc Bài viết:**

    - Bên trong &lt;main&gt;, tạo một cấu trúc 2 cột giả định: một cột chính cho bài viết và một cột phụ cho sidebar.
    - Sử dụng thẻ &lt;article&gt; để chứa toàn bộ nội dung của bài viết đang đọc.
    - Bên trong &lt;article&gt;, sử dụng &lt;h1&gt; cho Tiêu đề Bài viết (chỉ 1 &lt;h1&gt; trên trang).
    - Sử dụng thẻ &lt;time&gt; (có thuộc tính datetime) để hiển thị ngày đăng.
    - Thêm ít nhất 3 cấp độ tiêu đề nội dung (&lt;h2&gt;, &lt;h3&gt;) để thể hiện thứ bậc logic.

3.  **Sidebar:**

    - Sử dụng thẻ &lt;aside&gt; để đại diện cho nội dung sidebar (giả sử nội dung này đến từ sidebar).
    - Bên trong &lt;aside&gt;, tạo một widget "Bài viết liên quan" bằng &lt;section&gt;.

### 2\. Phần II: archive (Danh sách Bài viết)

**Mục tiêu:** Xây dựng cấu trúc danh sách bài viết/bài blog chuẩn mực.

#### Yêu cầu:

1.  **Vùng chứa Chính:** Cũng bắt đầu bằng thẻ &lt;main&gt;.
2.  **Khu vực Danh sách:**

    - Sử dụng thẻ &lt;section&gt; có tiêu đề &lt;h1&gt; (ví dụ: "Tất cả Bài viết") để bao bọc toàn bộ danh sách.

3.  **Cấu trúc Bài viết Rút gọn:**

    - Mỗi mục trong danh sách phải được bao bọc bằng thẻ &lt;article&gt; riêng biệt.
    - Bên trong mỗi &lt;article&gt;, sử dụng thẻ &lt;h2&gt; để hiển thị Tiêu đề bài viết (là liên kết &lt;a&gt;).
    - Thêm &lt;p&gt; cho đoạn mô tả ngắn (excerpt).
    - Thêm liên kết "Đọc thêm" (Read More).

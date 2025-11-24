**Biểu mẫu Tối ưu và Dễ truy cập (Accessible Forms)**. Đây là thử thách có **giá trị kinh tế cao** vì các biểu mẫu dễ truy cập (A11y) và chuẩn SEO sẽ cải thiện trải nghiệm người dùng, tỷ lệ chuyển đổi, và giảm tỷ lệ thoát.

Thử thách này tập trung vào hai thành phần cốt lõi của mọi trang web động: Biểu mẫu Tìm kiếm (search) và Biểu mẫu Bình luận (comments).

---

## 🎯 Thử thách 3: Biểu mẫu Tối ưu và Dễ truy cập

### 1\. Phần I: Biểu mẫu Tìm kiếm (search)

**Mục tiêu:** Xây dựng biểu mẫu tìm kiếm chuẩn mực, tập trung vào khả năng truy cập (A11y) và ngữ nghĩa.

#### Yêu cầu:

1.  **Cấu trúc Form:** Tạo thẻ &lt;form&gt; với thuộc tính role="search" (rất quan trọng cho A11y) và các thuộc tính method ("get") và action (giả định là "/search").
2.  **Trường Tìm kiếm:**

    - Sử dụng thẻ &lt;input&gt; với type="search".
    - Thêm thuộc tính name ("s") và placeholder ("Nhập từ khóa...").

3.  **Label (Quan trọng):**

    - Thêm thẻ &lt;label&gt; được liên kết đúng với &lt;input&gt; (sử dụng for và id).
    - Để ẩn &lt;label&gt; khỏi người dùng thấy nhưng vẫn có thể đọc được bằng trình đọc màn hình, thêm class="screen-reader-text" (hoặc một lớp CSS tương đương mà bạn tự định nghĩa để ẩn trực quan).

4.  **Nút Gửi:** Sử dụng &lt;button type="submit"&gt; và thêm aria-label cho nút này nếu nội dung nút chỉ là một icon (🔍).

### 2\. Phần II: Biểu mẫu Bình luận (comments)

**Mục tiêu:** Xây dựng biểu mẫu bình luận với các trường bắt buộc và các thuộc tính hỗ trợ nhập liệu.

#### Yêu cầu:

1.  **Cấu trúc Form:** Tạo thẻ &lt;form&gt; với thuộc tính id ("commentform") và method ("post").
2.  **Trường Tên & Email (Bắt buộc):**

    - Tạo hai trường &lt;input type="text"&gt; cho Tên và Email.
    - Cả hai đều phải có &lt;label&gt; rõ ràng và được liên kết.
    - Thêm thuộc tính **required** và **placeholder** cho cả hai trường.
    - Thêm thuộc tính autocomplete (ví dụ: autocomplete="name" và autocomplete="email") để giúp trình duyệt tự động điền.

3.  **Vùng Bình luận (Bắt buộc):**

    - Sử dụng thẻ **&lt;textarea&gt;** cho nội dung bình luận.
    - Thêm &lt;label&gt; được liên kết.
    - Thêm thuộc tính **required** và placeholder ("Nội dung bình luận của bạn...").

4.  **Nút Gửi:** Thêm &lt;button type="submit"&gt; với văn bản rõ ràng (ví dụ: "Gửi Bình luận").

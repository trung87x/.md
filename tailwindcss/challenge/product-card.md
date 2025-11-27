##

Nếu bạn đã sẵn sàng cho một thử thách với Tailwind CSS, tôi sẽ đưa ra một bài tập thực tế để giúp bạn củng cố kiến thức về **Layouts, Components (Thành phần), và Responsive Design (Thiết kế đáp ứng)**.

---

## 🚀 Thử thách Tailwind CSS: Xây dựng Thẻ Sản phẩm (Product Card) Đa năng

##

**Mục tiêu:** Xây dựng một thẻ sản phẩm linh hoạt và đẹp mắt, có thể hiển thị tốt trên mọi kích thước màn hình.

### 📋 Yêu cầu Cụ thể:

##

1.  **Cấu trúc Cơ bản:**

    - Thẻ phải có một **Hình ảnh Sản phẩm** ở trên cùng (sử dụng một khối màu hoặc URL ảnh giả).
    - Một khu vực chứa **Nội dung** bên dưới.

2.  **Nội dung (Phần Text):**

    - **Tên Sản phẩm:** Phải lớn và đậm (ví dụ: `text-xl font-semibold`).
    - **Mô tả Ngắn:** Một đoạn văn bản ngắn gọn.
    - **Giá:** Phải nổi bật và có màu sắc khác biệt (ví dụ: `text-2xl text-indigo-600`).

3.  **Thành phần Tương tác:**

    - Một nút **"Thêm vào Giỏ hàng"** (`Add to Cart`) với màu sắc chính (primary color) của bạn.

4.  **Thiết kế Đáp ứng (Responsive Design):**

    - **Trên màn hình nhỏ (mobile):** Thẻ nên hiển thị ở **chế độ dọc (vertical layout)**.
    - **Trên màn hình trung bình trở lên (tablet/desktop):** Thẻ nên chuyển sang **chế độ ngang (horizontal layout)**, với hình ảnh và nội dung đặt cạnh nhau (ví dụ: ảnh chiếm 1/3, nội dung chiếm 2/3).

5.  **Tạo hiệu ứng (Hover Effects):**

    - Khi di chuột (hover) qua toàn bộ thẻ, nên có một hiệu ứng nhẹ (ví dụ: tăng bóng đổ - `shadow-lg` hoặc thay đổi màu viền).

### 💡 Gợi ý về Utility Classes để sử dụng:

##

- **Layout:** `flex`, `grid`, `w-full`, `h-48`, `md:flex`
- **Spacing:** `p-4`, `m-2`, `space-x-4`
- **Styling:** `bg-white`, `rounded-xl`, `shadow-md`, `border`, `hover:shadow-xl`
- **Text:** `text-sm`, `text-lg`, `font-bold`, `text-gray-900`, `text-indigo-600`
- **Button:** `bg-green-500`, `hover:bg-green-600`, `text-white`, `py-2`, `px-4`

---

**Bạn đã sẵn sàng chưa?** Hãy tạo đoạn mã HTML với các class của Tailwind và cho tôi xem kết quả! Sau đó, tôi có thể đưa ra phản hồi hoặc đề xuất một thử thách nâng cao hơn.

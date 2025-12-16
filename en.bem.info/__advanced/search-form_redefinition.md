**FILE: search-form_redefinition.md**

### Kỹ thuật Sửa đổi Block bằng Cấp độ Định nghĩa lại (Redefinition Levels)

Trong phương pháp luận BEM, Cấp độ Định nghĩa lại (**Redefinition level**) là một trong bốn phương pháp chính để sửa đổi một Block mà **không cần sao chép mã nguồn Block gốc**. Cấp độ Định nghĩa lại là các thư mục trong cấu trúc dự án BEM, chứa các tệp triển khai (implementation files) của các thực thể BEM (Block, Element, Modifier).

Kỹ thuật này được sử dụng để **thay đổi đồng thời tất cả các Block có cùng tên** trong toàn bộ dự án.

#### I. Cơ chế Định nghĩa lại

Thay đổi một Block thông qua các cấp độ được thực hiện bằng cách **kết hợp các thuộc tính** của Block từ các cấp độ khác nhau trong quá trình xây dựng (build).

1.  **Mở rộng (Extend):** Thêm các thuộc tính hoặc chức năng mới vào Block.
2.  **Định nghĩa lại/Ghi đè (Redefine/Override):** Thay đổi các thuộc tính đã tồn tại của Block,.

Việc triển khai gốc của Block **không thay đổi** khi nó được mở rộng hoặc định nghĩa lại.

**Nguyên tắc Xây dựng (Build Order):**

Trong quá trình xây dựng, việc triển khai gốc phải được đưa vào trước, sau đó các thay đổi từ các cấp độ tiếp theo sẽ được áp dụng. Các quy tắc từ cấp độ thấp hơn (ví dụ: cấp độ dự án) sẽ **ghi đè** các quy tắc từ cấp độ cao hơn (ví dụ: cấp độ thư viện) khi có thuộc tính trùng lặp.

#### II. Ví dụ cho Block search-form

Giả sử chúng ta đang sử dụng Block `search-form` từ một thư viện bên ngoài (`library.blocks`) và muốn thay đổi màu nền, viền và kích thước của nó ở cấp độ dự án (`project.blocks`).

##### 1\. Cấu trúc Tệp

| Cấp độ       | Vị trí Tệp                                   | Mục đích                                  |
| ------------ | -------------------------------------------- | ----------------------------------------- |
| **Thư viện** | `library.blocks/search-form/search-form.css` | Triển khai CSS gốc của Block.             |
| **Dự án**    | `project.blocks/search-form/search-form.css` | Các quy tắc CSS định nghĩa lại cho Block. |

**Cấu trúc thư mục:**

    project/
      library.blocks/        # Cấp độ thư viện (Gốc)
        search-form/
          search-form.css    # Triển khai gốc (CSS)
      project.blocks/        # Cấp độ dự án (Định nghĩa lại)
        search-form/
          search-form.css    # Định nghĩa lại (CSS)

##### 2\. Triển khai CSS

**A. CSS Gốc (từ `library.blocks/search-form/search-form.css`):**

    /* search-form.css trên cấp độ library.blocks (Cơ sở) */
    .search-form {
      border: 1px solid rgba(0,0,0,.1);
      background-color: #fff; /* Màu nền trắng */
      border-radius: 4px;
      padding: 10px;
    }

**B. CSS Định nghĩa lại (từ `project.blocks/search-form/search-form.css`):**

Để thay đổi giao diện, chúng ta tạo một tệp CSS mới ở cấp độ dự án với các quy tắc ghi đè.

    /* search-form.css trên cấp độ project.blocks (Định nghĩa lại) */
    .search-form {
      background-color: #ffdf3a; /* Thay đổi màu nền thành vàng */
      border: 2px solid #000; /* Thay đổi viền */
      box-shadow: 0 0 5px rgba(0,0,0,0.2); /* Thêm đổ bóng (Mở rộng) */
    }

##### 3\. Kết quả Xây dựng (Build Result)

Trong quá trình xây dựng, công cụ build sẽ kết hợp các quy tắc này lại. Thứ tự sẽ là: quy tắc gốc từ thư viện trước, sau đó là các quy tắc từ cấp độ dự án.

    /* Kết quả Bundle (CSS) */
    @import "library.blocks/search-form/search-form.css";
    @import "project.blocks/search-form/search-form.css";

    /* Các thuộc tính cuối cùng áp dụng cho .search-form: */
    .search-form {
      /* Các thuộc tính được GIỮ lại từ thư viện: */
      border-radius: 4px;
      padding: 10px;

      /* Các thuộc tính bị GHI ĐÈ/ĐỊNH NGHĨA LẠI từ dự án: */
      background-color: #ffdf3a;
      border: 2px solid #000;

      /* Các thuộc tính được MỞ RỘNG (mới) từ dự án: */
      box-shadow: 0 0 5px rgba(0,0,0,0.2);
    }

#### III. Ứng dụng của Cấp độ Định nghĩa lại

Cấp độ Định nghĩa lại cho phép quản lý các biến thể lớn của Block theo các mục đích cụ thể:

| Ứng dụng                     | Mô tả                                                                                                                                                                       | Ví dụ Cấu trúc                                            |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **Phân chia Nền tảng**       | Chia mã Block thành các cấp độ dựa trên thiết bị (desktop, mobile), sử dụng mã chung (common) làm cơ sở và định nghĩa lại các quy tắc CSS hoặc JS cụ thể cho từng nền tảng. | `common.blocks/`, `desktop.blocks/`, `mobile.blocks/`.    |
| **Tạo Chủ đề Thiết kế**      | Tách logic nghiệp vụ khỏi giao diện. Để chuyển đổi giao diện, chỉ cần thêm cấp độ chủ đề (`alpha.blocks/` hoặc `beta.blocks/`) vào quá trình build.                         | `business.blocks/`, `theme-alpha.blocks/`.                |
| **Cập nhật Thư viện**        | Đảm bảo các tùy chỉnh của dự án được bảo toàn ngay cả khi thư viện Block gốc được cập nhật lên phiên bản mới.                                                               | `library.blocks/` (gốc) và `project.blocks/` (tùy chỉnh). |
| **Thực hiện Thử nghiệm A/B** | Chạy các thử nghiệm bằng cách đặt code thử nghiệm vào một cấp độ riêng biệt (`exp-1/`), cho phép dễ dàng xóa toàn bộ thử nghiệm nếu không thành công,.                      | `common.blocks/`, `exps/exp-1/`.                          |

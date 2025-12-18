Tuyệt vời! Chủ đề **Wrapping & Overflow (Ngắt Dòng & Xử lý Tràn Văn bản)** là nhóm tiện ích tinh chỉnh cách trình duyệt xử lý văn bản dài, đặc biệt là khi chúng không vừa với khung chứa.

Tôi sẽ tổng hợp các tiện ích bạn cung cấp để tạo ra một bài blog ngắn gọn, đầy đủ, tập trung vào việc quản lý dòng chảy của văn bản.

---

# ✍️ Ngắt Dòng & Xử Lý Tràn: Wrapping & Overflow Trong Tailwind CSS

Bộ tiện ích này cho phép bạn kiểm soát hành vi của văn bản, bao gồm cách các từ dài bị ngắt, cách văn bản xuống dòng, và cách xử lý nội dung bị tràn ra ngoài khung.

## 1\. ✂️ Cắt Văn Bản Tràn: `text-overflow`

`text-overflow` xác định cách xử lý nội dung văn bản bị tràn ra khỏi khung chứa của nó, **khi** không gian ngang bị giới hạn (thường dùng với `overflow-hidden` và `whitespace-nowrap`).

| **Class**           | **CSS Property**           | **Mô tả**                                                 |
| ------------------- | -------------------------- | --------------------------------------------------------- |
| **`text-ellipsis`** | `text-overflow: ellipsis;` | Hiển thị dấu **ba chấm (...)** để chỉ báo nội dung bị ẩn. |
| `text-clip`         | `text-overflow: clip;`     | (Mặc định) **Cắt** nội dung ngay tại ranh giới.           |

**Quy tắc Vàng cho Dấu Ba Chấm:**

Để `text-ellipsis` hoạt động, phần tử phải được đặt:

1.  Chiều ngang cố định/tối đa.
2.  **`overflow-hidden`** (Ẩn phần tràn).
3.  **`whitespace-nowrap`** (Ngăn văn bản xuống dòng).

HTML

    <div class="truncate w-48">
        Đây là một dòng văn bản rất dài và sẽ bị cắt...
    </div>

## 2\. 🔠 Kiểm Soát Khoảng Trắng & Xuống Dòng: `white-space` & `text-wrap`

Các tiện ích này kiểm soát hành vi xuống dòng và cách trình duyệt xử lý các khoảng trắng (space, tab, new line) liên tiếp.

### A. Xử lý Khoảng Trắng: `white-space`

| **Class**               | **CSS Property**       | **Mô tả**                                                   |
| ----------------------- | ---------------------- | ----------------------------------------------------------- |
| **`whitespace-normal`** | `white-space: normal;` | (Mặc định) Ghép các khoảng trắng lại và xuống dòng khi cần. |
| **`whitespace-nowrap`** | `white-space: nowrap;` | **Ngăn văn bản xuống dòng** (thường dùng với `truncate`).   |
| `whitespace-pre`        | `white-space: pre;`    | Giữ nguyên khoảng trắng và ngắt dòng như trong HTML/Code.   |

### B. Hành Vi Xuống Dòng: `text-wrap`

Kiểm soát các quy tắc xuống dòng tổng quát cho khối văn bản.

| **Class**               | **CSS Property**      | **Mô tả**                                                   |
| ----------------------- | --------------------- | ----------------------------------------------------------- |
| **`text-wrap-balance`** | `text-wrap: balance;` | Cố gắng **cân bằng** độ dài của các dòng (tốt cho tiêu đề). |
| **`text-wrap-pretty`**  | `text-wrap: pretty;`  | Tối ưu hóa chất lượng xuống dòng để tăng tính thẩm mỹ.      |

## 3\. 🔪 Ngắt Từ Dài: `word-break` & `overflow-wrap`

Các tiện ích này giúp xử lý các từ quá dài (ví dụ: chuỗi URL dài, ID không có khoảng trắng) mà có thể gây tràn khung.

### A. Ngắt Từ (Hard Break): `word-break`

| **Class**          | **CSS Property**         | **Mô tả**                                                      |
| ------------------ | ------------------------ | -------------------------------------------------------------- |
| **`break-normal`** | `word-break: normal;`    | (Mặc định) Ngắt dòng theo tiêu chuẩn.                          |
| **`break-words`**  | `word-break: break-all;` | **Ngắt bất kỳ đâu** (kể cả giữa từ) để tránh tràn (hiếm dùng). |
| **`break-all`**    | `word-break: break-all;` | **Ngắt bất kỳ đâu** (kể cả giữa từ) để tránh tràn.             |
| **`break-keep`**   | `word-break: keep-all;`  | Ngăn ngắt dòng cho chữ cái Hàn/Nhật/Hoa.                       |

### B. Ngắt Từ (Soft Break): `overflow-wrap`

| **Class**       | **CSS Property**             | **Mô tả**                                                                       |
| --------------- | ---------------------------- | ------------------------------------------------------------------------------- |
| **`break-all`** | `overflow-wrap: break-word;` | Ngắt từ khi từ đó **không thể nằm vừa** trong dòng. (Tối ưu hơn `break-words`). |

## 4\. 🔗 Giới Hạn Dòng: `line-clamp` & `hyphens`

### A. Giới Hạn Dòng: `line-clamp`

Tiện ích rất hữu ích để giới hạn nội dung chỉ hiển thị trong một số dòng nhất định, sau đó thêm dấu ba chấm.

| **Class**             | **CSS Property**           | **Mô tả**                            |
| --------------------- | -------------------------- | ------------------------------------ |
| **`line-clamp-<n>`**  | `-webkit-line-clamp: <n>;` | Giới hạn nội dung tối đa `<n>` dòng. |
| **`line-clamp-none`** | `line-clamp: none;`        | Bỏ giới hạn dòng.                    |

**Ví dụ:**

HTML

    <p class="line-clamp-3">... nội dung dài hơn 3 dòng ...</p>

### B. Ngắt Chữ: `hyphens`

| **Class**          | **CSS Property** | **Mô tả**                                                                 |
| ------------------ | ---------------- | ------------------------------------------------------------------------- |
| **`hyphens-auto`** | `hyphens: auto;` | Cho phép trình duyệt tự động ngắt từ bằng dấu gạch ngang (-) ở cuối dòng. |

---

**🔥 Tóm tắt Wrapping & Overflow:**

| **Mục tiêu**            | **Tiện ích Cốt lõi**    | **Thường đi kèm**                                  |
| ----------------------- | ----------------------- | -------------------------------------------------- |
| **Cắt + Ba chấm (...)** | **`truncate`**          | (Bao gồm `overflow-hidden` và `whitespace-nowrap`) |
| **Giới hạn 3 dòng**     | **`line-clamp-3`**      |                                                    |
| **Ngăn xuống dòng**     | **`whitespace-nowrap`** |                                                    |
| **Ngắt từ dài**         | **`break-all`**         |                                                    |

Bạn có muốn chuyển sang nhóm tiện ích **Text Decoration (Trang trí Văn bản)** như gạch chân, gạch ngang, v.v. không?

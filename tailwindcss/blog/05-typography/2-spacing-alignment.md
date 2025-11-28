Tuyệt vời! Chủ đề **Spacing & Alignment (Khoảng cách & Căn chỉnh Văn bản)** là phần bổ sung hoàn hảo cho các tiện ích Font & Style trước đó, giúp tinh chỉnh chi tiết bố cục và tính thẩm mỹ của văn bản.

Tôi sẽ tổng hợp nội dung từ các tiện ích bạn cung cấp để tạo ra một bài blog ngắn gọn, đầy đủ, tập trung vào việc kiểm soát không gian và vị trí của chữ.

---

# ✍️ Tinh Chỉnh Văn Bản: Spacing & Alignment Trong Tailwind CSS

Bộ tiện ích này giúp bạn kiểm soát cách văn bản được căn chỉnh theo chiều ngang, khoảng cách giữa các dòng và chữ, và vị trí dọc của văn bản trong luồng.

## 1\. 📏 Căn Chỉnh Ngang: `text-align`

`text-align` (`text-`) kiểm soát cách các dòng văn bản được sắp xếp trong khối chứa của chúng.

| **Class**                     | **CSS Property**                          | **Mô tả**                                                    |
| ----------------------------- | ----------------------------------------- | ------------------------------------------------------------ |
| **`text-left`**               | `text-align: left;`                       | Căn văn bản **trái** (Phổ biến nhất).                        |
| **`text-center`**             | `text-align: center;`                     | Căn văn bản **giữa**.                                        |
| **`text-right`**              | `text-align: right;`                      | Căn văn bản **phải**.                                        |
| **`text-justify`**            | `text-align: justify;`                    | Căn đều **hai bên** (thường dùng cho các khối nội dung lớn). |
| **`text-start` / `text-end`** | `text-align: start;` / `text-align: end;` | Căn theo hướng đọc (trái trong LTR, phải trong RTL).         |

**Ví dụ:**

HTML

    <p class="text-center lg:text-left">Nội dung</p>

---

## 2\. ↕️ Khoảng Cách Dọc & Ngang

### A. Chiều Cao Dòng: `line-height`

`line-height` (`leading-`) kiểm soát khoảng cách **dọc** giữa các dòng văn bản (hay còn gọi là giãn dòng).

| **Class**            | **CSS Property**    | **Mô tả**                                                  |
| -------------------- | ------------------- | ---------------------------------------------------------- |
| **`leading-none`**   | `line-height: 1;`   | Chiều cao dòng tối thiểu (hầu như không có giãn cách).     |
| **`leading-normal`** | `line-height: 1.5;` | Chiều cao dòng **tiêu chuẩn** (khuyến nghị cho nội dung).  |
| **`leading-loose`**  | `line-height: 2;`   | Chiều cao dòng **rộng** (giãn cách lớn).                   |
| **`leading-<size>`** | Giá trị cụ thể      | Các giá trị giãn dòng cố định được định nghĩa trong theme. |

**Lưu ý:** Như đã đề cập ở bài trước, hầu hết các tiện ích `font-size` (`text-`) đã bao gồm một `line-height` mặc định được tối ưu.

### B. Khoảng Cách Chữ: `letter-spacing`

`letter-spacing` (`tracking-`) kiểm soát khoảng cách **ngang** giữa các ký tự (chữ cái).

| **Class**             | **CSS Property**            | **Mô tả**                          |
| --------------------- | --------------------------- | ---------------------------------- |
| **`tracking-tight`**  | `letter-spacing: -0.025em;` | Thu hẹp khoảng cách.               |
| **`tracking-normal`** | `letter-spacing: 0em;`      | Khoảng cách tiêu chuẩn (mặc định). |
| **`tracking-wide`**   | `letter-spacing: 0.025em;`  | Mở rộng khoảng cách.               |

**Thường dùng:** Giãn cách rộng (`tracking-wide`) thường được áp dụng cho **tiêu đề in hoa** để tăng tính thẩm mỹ và dễ đọc.

---

## 3\. 🎯 Vị Trí Dọc & Lề Đầu Dòng

### A. Căn Chỉnh Dọc: `vertical-align`

`vertical-align` (`align-`) kiểm soát cách một phần tử **inline** (ví dụ: hình ảnh nhỏ, icon, `span`) được căn chỉnh theo chiều dọc so với dòng văn bản chứa nó.

| **Class**                            | **CSS Property**                   | **Mô tả**                                             |
| ------------------------------------ | ---------------------------------- | ----------------------------------------------------- |
| **`align-top`** / **`align-bottom`** | `vertical-align: top;` / `bottom;` | Căn chỉnh theo cạnh trên/dưới của dòng.               |
| **`align-middle`**                   | `vertical-align: middle;`          | Căn chỉnh **giữa** (thường dùng để căn icon với chữ). |
| **`align-baseline`**                 | `vertical-align: baseline;`        | (Mặc định) Căn theo đường cơ sở của dòng.             |

**Ví dụ:**

HTML

    <span>Icon</span>
    <svg class="h-4 w-4 align-middle">...</svg>

### B. Thụt Lề Đầu Dòng: `text-indent`

`text-indent` (`indent-`) kiểm soát khoảng cách thụt lề cho dòng đầu tiên của một khối văn bản.

| **Class**           | **CSS Property**       | **Mô tả**                                 |
| ------------------- | ---------------------- | ----------------------------------------- |
| **`indent-<size>`** | `text-indent: <size>;` | Thụt lề đầu dòng bằng một giá trị cụ thể. |

**Ví dụ:**

HTML

    <p class="indent-8">Đây là dòng đầu tiên...</p>

---

**🔥 Tóm tắt Spacing & Alignment:**

- **Căn ngang:** Dùng **`text-center`**, **`text-left`**.
- **Giãn dòng:** Dùng **`leading-normal`** (mặc định tốt) hoặc **`leading-loose`** (rộng).
- **Khoảng cách chữ:** Dùng **`tracking-wide`** cho tiêu đề in hoa.
- **Căn icon/inline với chữ:** Dùng **`align-middle`**.

Bạn có muốn chuyển sang nhóm tiện ích **Text Decoration (Trang trí Văn bản)** như gạch chân, gạch ngang và các thuộc tính liên quan không?

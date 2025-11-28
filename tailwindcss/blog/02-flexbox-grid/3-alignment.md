Tuyệt vời! Chủ đề **Alignment (Căn chỉnh)** là phần kết hợp sức mạnh giữa **Flexbox** và **CSS Grid**, giúp bạn đặt các phần tử vào đúng vị trí một cách hoàn hảo trong cả hai mô hình layout.

Tôi sẽ tổng hợp các tiện ích bạn cung cấp thành một bài blog ngắn gọn, đầy đủ, tập trung vào việc căn chỉnh theo trục chính và trục phụ.

---

# 🎯 Căn Chỉnh Hoàn Hảo: Alignment Cho Flexbox & Grid Trong Tailwind CSS

Các tiện ích căn chỉnh được chia thành ba nhóm chính, áp dụng cho khối chứa (parent) hoặc các mục con (child items).

## 1\. 📏 Căn Chỉnh Nội Dung Của Khối Chứa (Justify/Align Content)

Nhóm tiện ích này được áp dụng cho **khối chứa Flex hoặc Grid** để phân phối khoảng trống **giữa các hàng hoặc cột**.

### A. Phân Phối Trục Chính (Main Axis): `justify-content` (Flexbox & Grid)

Kiểm soát cách các mục được sắp xếp dọc theo **trục chính** của khối chứa (ngang nếu là `flex-row`, dọc nếu là `flex-col`).

| **Class**             | **CSS Property**                  | **Mô tả**                                                       |
| --------------------- | --------------------------------- | --------------------------------------------------------------- |
| **`justify-start`**   | `justify-content: flex-start;`    | Căn các mục về **đầu** trục.                                    |
| **`justify-end`**     | `justify-content: flex-end;`      | Căn các mục về **cuối** trục.                                   |
| **`justify-center`**  | `justify-content: center;`        | Căn các mục vào **giữa** trục.                                  |
| **`justify-between`** | `justify-content: space-between;` | Phân phối khoảng trống **giữa** các mục.                        |
| **`justify-around`**  | `justify-content: space-around;`  | Phân phối khoảng trống **xung quanh** các mục.                  |
| **`justify-evenly`**  | `justify-content: space-evenly;`  | Phân phối khoảng trống **đều nhau** giữa và xung quanh các mục. |

### B. Phân Phối Giữa Các Hàng (Cross Axis, Chỉ dùng cho **Flexbox Wrap**): `align-content`

Kiểm soát cách các **hàng** (khi dùng `flex-wrap`) được phân phối dọc theo **trục phụ** (cross axis).

| **Class**             | **CSS Property**                | **Mô tả**                                 |
| --------------------- | ------------------------------- | ----------------------------------------- |
| **`content-start`**   | `align-content: flex-start;`    | Căn các hàng về đầu trục phụ.             |
| **`content-center`**  | `align-content: center;`        | Căn các hàng vào giữa trục phụ.           |
| **`content-between`** | `align-content: space-between;` | Phân phối khoảng trống **giữa** các hàng. |

## 2\. ↕️ Căn Chỉnh Các Mục (Justify/Align Items)

Nhóm tiện ích này được áp dụng cho **khối chứa Flex hoặc Grid** để căn chỉnh từng mục con bên trong nó.

### A. Căn Mục theo Trục Phụ (Cross Axis): `align-items` (Flexbox & Grid)

Kiểm soát cách các mục được căn chỉnh dọc theo **trục phụ** của khối chứa (dọc nếu là `flex-row`, ngang nếu là `flex-col`).

| **Class**           | **CSS Property**           | **Mô tả**                                                   |
| ------------------- | -------------------------- | ----------------------------------------------------------- |
| **`items-start`**   | `align-items: flex-start;` | Căn các mục về **đầu** trục phụ.                            |
| **`items-end`**     | `align-items: flex-end;`   | Căn các mục về **cuối** trục phụ.                           |
| **`items-center`**  | `align-items: center;`     | Căn các mục vào **giữa** trục phụ (thường dùng để căn dọc). |
| **`items-stretch`** | `align-items: stretch;`    | (Mặc định) Kéo dãn các mục để lấp đầy khối chứa.            |

### B. Căn Mục theo Trục Chính (Main Axis, Chỉ dùng cho **Grid**): `justify-items`

Kiểm soát cách các mục được căn chỉnh dọc theo **trục chính** của ô lưới (grid cell) mà chúng đang chiếm giữ.

| **Class**                  | **CSS Property**         | **Mô tả**                |
| -------------------------- | ------------------------ | ------------------------ |
| **`justify-items-start`**  | `justify-items: start;`  | Căn về **đầu** ô lưới.   |
| **`justify-items-center`** | `justify-items: center;` | Căn vào **giữa** ô lưới. |

## 3\. 🎯 Căn Chỉnh Từng Mục Riêng Lẻ (Self)

Các tiện ích này được áp dụng trực tiếp cho **phần tử con** để ghi đè cài đặt căn chỉnh của khối chứa.

### A. Ghi Đè Trục Phụ: `align-self` (Flexbox & Grid)

| **Class**                         | **CSS Property**                        | **Mô tả**                         |
| --------------------------------- | --------------------------------------- | --------------------------------- |
| **`self-start`** / **`self-end`** | `align-self: flex-start;` / `flex-end;` | Căn mục này về đầu/cuối trục phụ. |
| **`self-center`**                 | `align-self: center;`                   | Căn mục này vào giữa trục phụ.    |

### B. Ghi Đè Trục Chính: `justify-self` (Chỉ dùng cho **Grid**)

| **Class**                 | **CSS Property**        | **Mô tả**                                   |
| ------------------------- | ----------------------- | ------------------------------------------- |
| **`justify-self-center`** | `justify-self: center;` | Căn mục này vào giữa trục chính của ô lưới. |

## 4\. 🔗 Tiện Ích Gộp (Place)

`place-items`, `place-content`, và `place-self` là cách viết tắt (`shorthand`) để đặt cùng lúc hai thuộc tính căn chỉnh cho cả trục chính và trục phụ.

| **Tiện ích**               | **Gộp các Property**                              | **Mô tả**                                                                         |
| -------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------- |
| **`place-items-center`**   | `align-items: center; justify-items: center;`     | Căn giữa tuyệt đối cho các mục (thường dùng trong Grid).                          |
| **`place-content-center`** | `align-content: center; justify-content: center;` | Căn giữa tuyệt đối cho các dòng/hàng nội dung (thường dùng trong Flex Wrap/Grid). |
| **`place-self-center`**    | `align-self: center; justify-self: center;`       | Căn giữa tuyệt đối cho một mục con (thường dùng trong Grid).                      |

---

**🔥 Tóm tắt Căn Chỉnh:**

| **Khối chứa (Parent)**     | **Trục Chính (Main Axis)**           | **Trục Phụ (Cross Axis)**            |
| -------------------------- | ------------------------------------ | ------------------------------------ |
| **Phân phối khoảng trống** | `justify-between` / `justify-center` | `content-center` (chỉ cho Flex Wrap) |
| **Căn chỉnh mục con**      | `justify-items-center` (Grid)        | `items-center` (Flex/Grid)           |
| **Mục con (Child)**        | `justify-self-center` (Grid)         | `self-center` (Flex/Grid)            |

Bộ tiện ích này, kết hợp với `flex` và `grid`, cho phép bạn đặt bất kỳ phần tử nào vào bất kỳ vị trí nào bạn muốn trong bố cục!

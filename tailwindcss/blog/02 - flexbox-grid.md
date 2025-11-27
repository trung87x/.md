# 🤸 CSS Flexbox & Grid Cheatsheet

> **Tuyệt vời!** Đây chính là "vũ khí hạng nặng" của CSS hiện đại. Nếu danh mục Layout là về bộ khung cơ bản, thì danh mục **Flexbox & Grid** này là về cách **sắp xếp nội dung bên trong** bộ khung đó một cách thông minh và linh hoạt.

Dưới đây là phân nhóm các thuộc tính theo công năng để tránh nhầm lẫn (đặc biệt là phần căn chỉnh `justify` vs `align`).

---

## 🤸 I. Flexbox (Linh hoạt 1 chiều)

_Dành cho bố cục dàn hàng ngang hoặc dọc (1 chiều)._

| **Thuộc tính**       | **Áp dụng cho** | **Chức năng chính**                                             | **Ghi chú**                                              |
| :------------------- | :-------------- | :-------------------------------------------------------------- | :------------------------------------------------------- |
| **`flex-direction`** | Cha (Container) | Xác định trục chính: hàng ngang (`row`) hay cột dọc (`column`). | Quyết định hướng chảy của các phần tử con.               |
| **`flex-wrap`**      | Cha             | Cho phép các phần tử con xuống dòng khi hết chỗ hay không.      | Mặc định là `nowrap` (ép nằm trên 1 dòng).               |
| **`flex-basis`**     | Con (Item)      | Kích thước khởi điểm của phần tử con trước khi co giãn.         | Giống như `width` nhưng linh hoạt hơn.                   |
| **`flex-grow`**      | Con             | Quy định mức độ "nở ra" để lấp đầy chỗ trống.                   | `1` là chia đều, `0` là không giãn.                      |
| **`flex-shrink`**    | Con             | Quy định mức độ "co lại" khi không đủ chỗ.                      |                                                          |
| **`flex`**           | Con             | Viết tắt của 3 cái trên (`grow` `shrink` `basis`).              | Thường dùng `flex: 1` để phần tử tự chiếm hết chỗ trống. |
| **`order`**          | Con             | Thay đổi thứ tự hiển thị mà không cần sửa HTML.                 | Số nhỏ hiện trước, số lớn hiện sau.                      |

---

## 🏁 II. CSS Grid (Lưới 2 chiều)

_Dành cho bố cục phức tạp có cả hàng và cột (2 chiều)._

| **Thuộc tính**              | **Áp dụng cho** | **Chức năng chính**                                               | **Ghi chú**                                                              |
| :-------------------------- | :-------------- | :---------------------------------------------------------------- | :----------------------------------------------------------------------- |
| **`grid-template-columns`** | Cha             | Định nghĩa số lượng và kích thước các **cột**.                    | Ví dụ: `repeat(3, 1fr)` tạo 3 cột đều nhau.                              |
| **`grid-template-rows`**    | Cha             | Định nghĩa số lượng và kích thước các **hàng**.                   |                                                                          |
| **`grid-column`**           | Con             | Quy định phần tử con bắt đầu từ cột nào đến cột nào (gộp cột).    | Ví dụ: `span 2` để chiếm 2 cột.                                          |
| **`grid-row`**              | Con             | Quy định phần tử con chiếm bao nhiêu hàng.                        |                                                                          |
| **`grid-auto-flow`**        | Cha             | Cách các phần tử tự động điền vào lưới (theo hàng hay dọc).       |                                                                          |
| **`grid-auto-columns`**     | Cha             | Kích thước mặc định cho các cột được tạo tự động (chưa khai báo). |                                                                          |
| **`grid-auto-rows`**        | Cha             | Kích thước mặc định cho các hàng tự động.                         |                                                                          |
| **`gap`**                   | Cha             | Khoảng cách giữa các hàng và cột.                                 | Dùng sướng hơn `margin` rất nhiều vì không ảnh hưởng phần tử ngoài cùng. |

---

## 🎯 III. Căn chỉnh (Alignment) - "Kẻ hủy diệt não bộ"

_Đây là phần dễ nhầm lẫn nhất. Mẹo nhớ:_

- **Justify** thường theo **trục chính** (Main Axis - thường là ngang).
- **Align** thường theo **trục phụ** (Cross Axis - thường là dọc).

| **Thuộc tính**        | **Chức năng chính**                                                  | **Mẹo nhớ nhanh**                                                        |
| :-------------------- | :------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| **`justify-content`** | Căn chỉnh **toàn bộ bố cục** theo trục chính.                        | Dùng để đẩy nội dung ra giữa (`center`), sang hai bên (`space-between`). |
| **`align-items`**     | Căn chỉnh **các phần tử con** theo trục phụ.                         | Dùng để căn giữa text theo chiều dọc (`center`).                         |
| **`align-content`**   | Căn chỉnh **các dòng** (khi có nhiều dòng - wrap) theo trục phụ.     | Chỉ hoạt động khi có `flex-wrap: wrap` và nội dung > 1 dòng.             |
| **`justify-items`**   | Căn chỉnh nội dung bên trong ô lưới theo chiều ngang (Chủ yếu Grid). | Mặc định là `stretch` (kéo dãn).                                         |
| **`justify-self`**    | Ghi đè `justify-items` cho một phần tử con cụ thể.                   | "Tao muốn đứng một mình một kiểu".                                       |
| **`align-self`**      | Ghi đè `align-items` cho một phần tử con cụ thể.                     |                                                                          |
| **`place-content`**   | Viết tắt của `align-content` + `justify-content`.                    | Căn giữa cả cục to đùng vào giữa màn hình.                               |
| **`place-items`**     | Viết tắt của `align-items` + `justify-items`.                        | Căn giữa nội dung trong từng ô.                                          |
| **`place-self`**      | Viết tắt của `align-self` + `justify-self`.                          |                                                                          |

---

### 💡 Lời khuyên khi dùng Tailwind/CSS

**1. Flex vs Grid:**

- **Dùng Flex** khi bạn có một thanh điều hướng (navbar), danh sách nút bấm, hoặc căn chỉnh icon với text (1 chiều).
- **Dùng Grid** khi bạn dàn trang layout chính, thư viện ảnh (gallery), hoặc bất cứ thứ gì cần canh thẳng cả hàng lẫn cột (2 chiều).

**2. Căn giữa thần thánh:**
Để căn một thứ gì đó ra **chính giữa** màn hình (cả ngang và dọc), combo huyền thoại hiện nay là:

```css
.container {
  display: grid;
  place-items: center;
}
```

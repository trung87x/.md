# Sơ đồ tư duy: JavaScript Modules

## 1\. Trung tâm: JavaScript Modules là gì?

### 1.1. Giải thích khái niệm cốt lõi

#

**JavaScript modules** là cách để chia nhỏ code của bạn thành các tệp riêng biệt.

Hãy tưởng tượng mỗi module là một hộp Lego chuyên dụng (ví dụ: hộp bánh xe, hộp gạch đỏ). Bạn chỉ cần lấy những hộp mình cần để xây dựng dự án của mình mà không cần phải lục tung cả một thùng Lego lớn.

Việc này mang lại hai lợi ích chính:

- **Tổ chức code:** Giúp các dự án lớn trở nên gọn gàng, dễ tìm kiếm và dễ quản lý hơn.
- **Tái sử dụng:** Viết một chức năng một lần và sử dụng nó ở nhiều nơi khác nhau trong dự án của bạn.

### 1.2. Chuyển tiếp

#

Để hiểu cách bạn 'lấy' từng 'hộp Lego' (module) và 'lắp ráp' chúng với nhau, chúng ta cần tìm hiểu hai từ khóa quan trọng: `export` và `import`.

## 2\. Nhánh chính 1: Cơ Chế Hoạt Động

### 2.1. `export` - Gửi đi

#

Đây là từ khóa bạn dùng bên trong một module để "công khai" các hàm, biến, hoặc class, cho phép các module khác truy cập vào chúng.

Bạn có thể `export` các thành phần sau:

- Biến (`const`, `let`, `var`)
- Hàm (`function`)
- Lớp (`class`)

### 2.2. `import` - Nhận về

#

Đây là từ khóa bạn dùng để "lấy" các thành phần đã được `export` từ một module khác và sử dụng chúng trong module hiện tại.

Cú pháp cơ bản trông như thế này:

    import { tenThanhPhan } from './duong/dan/toi/module.js';

- `tenThanhPhan`: Tên của biến hoặc hàm bạn muốn nhập.
- `'./duong/dan/toi/module.js'`: Được gọi là 'module specifier', đây là đường dẫn đến tệp module. **Đường dẫn này phải là tương đối (bắt đầu bằng** `**./**` **hoặc** `**../**`**) hoặc tuyệt đối.**

### 2.3. Kết nối với HTML

#

Để trình duyệt nhận biết một tệp JavaScript là module, bạn phải thêm thuộc tính `type="module"` vào thẻ `<script>`.

Ví dụ:

    <script type="module" src="main.js"></script>

Khi sử dụng `type="module"`, script sẽ có hai đặc điểm quan trọng:

- **Luôn ở chế độ** `**strict mode**`**:** JavaScript sẽ tự động áp dụng các quy tắc code nghiêm ngặt hơn.
- **Tự động** `**defer**`**:** Script module sẽ được tải song song với HTML và chỉ thực thi sau khi toàn bộ trang HTML đã được phân tích xong. **Điều này đảm bảo rằng việc tải script không làm chặn quá trình hiển thị trang web, giúp người dùng thấy nội dung nhanh hơn.**

### 2.4. Chuyển tiếp

#

Có hai cách chính để `export` và `import` các thành phần, hãy cùng tìm hiểu sự khác biệt giữa chúng.

## 3\. Nhánh chính 2: Các Loại Export/Import

### 3.1. So sánh Named Exports và Default Export

#

Bạn có thể sử dụng bảng dưới đây để so sánh trực quan hai loại export này.

| Tiêu chí                 | **Named Export (Export theo tên)**                                                                 | **Default Export (Export mặc định)**                                                                     |
| ------------------------ | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Mục đích**             | Dùng để export nhiều thành phần từ một module.                                                     | Dùng để export một thành phần **chính** hoặc **duy nhất** từ một module.                                 |
| **Số lượng**             | Không giới hạn trong một module.                                                                   | Chỉ có **một** default export trên mỗi module.                                                           |
| **Cú pháp** `**export**` | `export const tenBien;` <br> `export { ham1, ham2 };`                                              | `export default tenHam;`                                                                                 |
| **Cú pháp** `**import**` | Phải dùng đúng tên và đặt trong dấu ngoặc nhọn `{}`. <br> `import { tenBien } from './module.js';` | Không cần ngoặc nhọn `{}` và có thể đặt tên bất kỳ khi import. <br> `import TenTuyY from './module.js';` |

**Lời khuyên từ chuyên gia:** Khi mới bắt đầu, hãy ưu tiên sử dụng **Named Export**. Điều này giúp code của bạn rõ ràng hơn vì bạn phải dùng đúng tên khi import. Chỉ sử dụng **Default Export** khi một module thực sự chỉ có một chức năng chính để cung cấp.

### 3.2. Chuyển tiếp

#

Khi dự án phức tạp hơn, bạn sẽ cần một vài kỹ thuật nâng cao để quản lý module hiệu quả hơn.

## 4\. Nhánh chính 3: Các Kỹ Thuật Nâng Cao (Nhưng Phổ Biến)

### 4.1. Đổi tên để tránh xung đột

#

Điều gì xảy ra khi bạn import hai module khác nhau nhưng cả hai đều export một hàm tên là `draw()`? Điều này sẽ gây ra lỗi `SyntaxError` vì bạn đang khai báo lại một biến đã tồn tại trong cùng một scope.

Giải pháp là sử dụng từ khóa `as` để đổi tên thành phần ngay khi import, giúp chúng trở nên độc nhất.

- **Ví dụ:**

### 4.2. Tạo Module Object

#

Thay vì import từng thành phần một, bạn có thể gom tất cả các named export của một module vào một đối tượng duy nhất. Kỹ thuật này tạo ra một **namespace** cho module, giúp code gọn gàng và hoàn toàn tránh được xung đột tên.

- **Cú pháp:** `import * as <TenObject> from './module.js';`
- **Ví dụ:**

### 4.3. Dynamic Import (Import động)

#

Kỹ thuật này cho phép bạn chỉ tải code khi thực sự cần. Ví dụ, chỉ tải module xử lý video khi người dùng bấm nút "Play". Điều này giúp trang web khởi động nhanh hơn đáng kể. Kỹ thuật này là nền tảng cho một phương pháp tối ưu hóa hiệu năng gọi là **'code-splitting'** (chia nhỏ code).

- **Cách hoạt động:** Sử dụng hàm `import()` sẽ trả về một `Promise`. Khi Promise hoàn thành, nó sẽ cung cấp cho bạn module object.
- **Ví dụ:**

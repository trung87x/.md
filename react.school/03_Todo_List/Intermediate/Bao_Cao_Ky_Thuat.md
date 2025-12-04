# Báo cáo Kỹ thuật: Phân tích Kiến trúc Ứng dụng Quản lý Công việc React

## 1.0 Giới thiệu

#

Báo cáo này cung cấp một phân tích kỹ thuật chuyên sâu về kiến trúc của một ứng dụng quản lý công việc ("Todo List") được xây dựng bằng React. Mục đích của tài liệu là phân tích các quyết định kiến trúc, các mẫu quản lý trạng thái, và các chiến lược tạo kiểu đã được áp dụng trong quá trình phát triển. Thông qua việc mổ xẻ các chức năng cốt lõi như tạo, đọc, cập nhật và xóa (CRUD), báo cáo này hướng đến các nhà phát triển React khác như một tài liệu tham khảo, chia sẻ các phương pháp hay và các giải pháp thiết kế thực tiễn có thể áp dụng vào các dự án tương tự.

Các công nghệ và khái niệm cốt lõi được đề cập trong báo cáo bao gồm:

- React Hooks (`useState`)
- `styled-components` để tạo kiểu
- Kiến trúc dựa trên thành phần (Component-Based Architecture)
- Quản lý trạng thái và luồng dữ liệu một chiều
- Triển khai chức năng CRUD (Tạo, Đọc, Cập nhật, Xóa)

Báo cáo sẽ bắt đầu với một cái nhìn tổng quan về cấu trúc thành phần của ứng dụng, sau đó đi sâu vào các khía cạnh cụ thể về tạo kiểu, quản lý trạng thái và triển khai chức năng.

## 2.0 Tổng quan Kiến trúc

#

Tầm quan trọng chiến lược của việc có một cấu trúc thành phần rõ ràng là nền tảng cho kiến trúc của ứng dụng này. Bằng cách tuân thủ nguyên tắc tách biệt mối quan tâm (separation of concerns), giao diện người dùng được phân chia thành các thành phần độc lập và có thể tái sử dụng, giúp tăng cường khả năng bảo trì và mở rộng.

Cấu trúc thành phần của ứng dụng được tổ chức một cách rõ ràng. Thành phần `App.js` đóng vai trò là trung tâm điều phối, chịu trách nhiệm quản lý trạng thái chính của ứng dụng (danh sách các công việc) và logic nghiệp vụ cốt lõi (thêm, sửa, xóa công việc). Điều này trái ngược với các thành phần trình bày (presentational components) như `Task`, `Button`, và `Card`, vốn chỉ tập trung vào việc hiển thị giao diện và giao tiếp với thành phần cha thông qua các `props`.

Một quyết định thiết kế quan trọng là việc tái cấu trúc (refactor) các thành phần dùng chung, chẳng hạn như `Button.js` và `Card.js`, ra các tệp riêng biệt. Cách tiếp cận này mang lại lợi ích đáng kể trong việc tinh gọn mã nguồn trong `App.js`, cho phép tách biệt rõ ràng giữa kiểu dáng (style) và logic nghiệp vụ (business logic), và thúc đẩy việc tái sử dụng các thành phần này một cách dễ dàng trên toàn bộ ứng dụng.

Cấu trúc thành phần có tổ chức này đặt nền móng cho một chiến lược tạo kiểu và bố cục nhất quán, sẽ được thảo luận chi tiết trong phần tiếp theo.

## 3.0 Chiến lược Tạo kiểu và Bố cục

#

Dự án áp dụng một cách tiếp cận tạo kiểu hiện đại bằng cách sử dụng thư viện `styled-components` phiên bản 6. Phương pháp này được chọn vì khả năng đóng gói hoàn toàn CSS trong JavaScript, tạo ra các thành phần thực sự độc lập và có phạm vi cục bộ, giúp loại bỏ các vấn đề về xung đột tên lớp và tăng cường tính tái sử dụng.

Các kỹ thuật tạo kiểu chính đã được sử dụng trong toàn bộ ứng dụng:

1.  **Tạo Thành phần Kiểu (Styled Components):** Cú pháp cơ bản `styled.element` được sử dụng để tạo các thành phần React mới với các kiểu được đính kèm. Ví dụ, `styled.h1`, `styled.div`, và `styled.input` được dùng để định nghĩa các khối xây dựng giao diện cơ bản của ứng dụng.
2.  **Tạo kiểu Động (Dynamic Styling):** Các `props` được truyền vào các thành phần kiểu để thay đổi CSS một cách linh hoạt dựa trên trạng thái của ứng dụng. Một ví dụ điển hình là `TaskRow`, nó nhận một `prop` tên là `complete`. Khi `complete` là `true`, độ mờ (`opacity`) của toàn bộ hàng công việc sẽ giảm xuống, cung cấp phản hồi trực quan rằng công việc đã được hoàn thành.
3.  **Kế thừa Kiểu (Style Extension):** Kỹ thuật `styled(Component)` được sử dụng để mở rộng các kiểu từ một thành phần cơ sở. Ví dụ, thành phần `IconButton` được tạo ra bằng cách kế thừa từ thành phần `Button` cơ sở. Nó tự động nhận tất cả các kiểu của `Button` và sau đó ghi đè các thuộc tính cần thiết, chẳng hạn như đặt `background` thành `transparent` để tạo ra một nút không có nền.
4.  **Trạng thái Tương tác (Interaction States):** Bộ chọn giả lớp (pseudo-selector) `&:hover` được sử dụng bên trong các khối `styled` để áp dụng các kiểu khi người dùng di chuột qua các phần tử, chẳng hạn như các nút, mang lại khả năng tương tác tốt hơn cho giao diện.

Về bố cục, chiến lược chính cho các hàng công việc là sử dụng CSS Grid. Bằng cách áp dụng `display: grid` và `grid-template-columns: 40px 1fr 100px`, một bố cục ba cột nhất quán đã được thiết lập. Bố cục này phân bổ một không gian cố định `40px` cho hộp kiểm, `100px` cho các nút hành động ở bên phải, và cho phép cột tên công việc ở giữa (`1fr`) tự động co giãn để lấp đầy không gian còn lại.

Cấu trúc trực quan này được hỗ trợ bởi một hệ thống quản lý trạng thái và luồng dữ liệu mạnh mẽ, sẽ được thảo luận chi tiết ngay sau đây.

## 4.0 Quản lý Trạng thái và Luồng Dữ liệu

#

Quản lý trạng thái hiệu quả là yếu tố sống còn đối với bất kỳ ứng dụng React nào. Dự án này áp dụng một mô hình kiến trúc trung tâm và dễ dự đoán: "Nâng trạng thái lên" (Lifting State Up). Theo mô hình này, trạng thái dùng chung được đặt ở thành phần cha chung gần nhất, đảm bảo một nguồn chân lý duy nhất và luồng dữ liệu một chiều.

Hai loại trạng thái được phân biệt rõ ràng trong ứng dụng:

- **Trạng thái Toàn cục (Global State):** Mảng `tasks` là nguồn chân lý (source of truth) duy nhất cho toàn bộ danh sách công việc. Nó được khởi tạo và quản lý trong thành phần cha `App.js` bằng cách sử dụng `useState` hook. Mọi thay đổi đối với danh sách công việc đều phải diễn ra tại đây.
- **Trạng thái Cục bộ (Local State):** Trạng thái giao diện người dùng tạm thời, không cần được chia sẻ, được quản lý cục bộ trong các thành phần con. Ví dụ, các biến `editing` và `name` trong thành phần `Task` được quản lý bằng `useState` riêng của nó. Trạng thái này chỉ tồn tại trong phạm vi của một phiên bản `Task` cụ thể và được sử dụng để điều khiển việc chuyển đổi giữa chế độ xem và chế độ chỉnh sửa.

Luồng dữ liệu một chiều của ứng dụng hoạt động theo một chu trình có thể dự đoán được:

1.  **Data Down:** Thành phần `App.js` truyền dữ liệu (ví dụ: đối tượng `task`) và các hàm xử lý sự kiện (ví dụ: `onSave`, `destroyTask`) xuống các thành phần `Task` con thông qua `props`.
2.  **Events Up:** Khi người dùng tương tác với một thành phần `Task` con (ví dụ: nhấp vào nút lưu, xóa, hoặc hoàn thành), thành phần đó sẽ gọi các hàm callback được truyền qua `props`, gửi thông báo và dữ liệu cần thiết lên `App.js`.
3.  **State Update:** `App.js` nhận thông báo, cập nhật trạng thái trung tâm của nó (mảng `tasks`) bằng cách sử dụng hàm `setTasks`.
4.  **Re-render:** React tự động phát hiện sự thay đổi trạng thái và kết xuất lại các thành phần con bị ảnh hưởng với dữ liệu mới từ `props`, hoàn thành chu trình.

Một quyết định thiết kế đáng chú ý là không sử dụng trạng thái cục bộ cho hộp kiểm hoàn thành công việc. Trạng thái `checked` của hộp kiểm phải trực tiếp kích hoạt một hành động "lưu" trên đối tượng công việc ở cấp `App.js`. Do đó, việc nâng trạng thái này lên ngay lập tức bằng cách gọi `onSave` được coi là một cách tiếp cận "mã sạch" (clean code), vì nó giữ cho nguồn chân lý luôn được đồng bộ và tránh sự phức tạp của việc quản lý trạng thái trùng lặp.

Mô hình trạng thái và luồng dữ liệu này là nền tảng vững chắc cho việc triển khai các chức năng CRUD cốt lõi của ứng dụng.

## 5.0 Triển khai Chức năng CRUD

#

Các hoạt động Tạo, Đọc, Cập nhật và Xóa (CRUD) là cốt lõi của chức năng ứng dụng. Mỗi hoạt động này được triển khai một cách nhất quán dựa trên kiến trúc quản lý trạng thái và luồng dữ liệu một chiều đã được mô tả ở phần trước.

### 5.1 Tạo (Create)

#

Quy trình thêm một công việc mới được quản lý hoàn toàn trong `App.js`. Hàm `addTask` được gọi khi người dùng nhấp vào nút thêm. Hàm này tạo một mảng công việc mới bằng cách sử dụng toán tử spread (`...tasks`) để sao chép tất cả các công việc hiện có, sau đó thêm một đối tượng công việc mới vào cuối. Cách tiếp cận này đảm bảo tính bất biến (immutability) của trạng thái, một nguyên tắc cốt lõi trong React để kích hoạt các lần kết xuất lại một cách đáng tin cậy. Mỗi công việc mới được gán một ID duy nhất để React có thể xác định và kết xuất nó một cách hiệu quả.

Để cải thiện trải nghiệm người dùng, một thuộc tính đặc biệt là `isNew` được thêm vào đối tượng công việc mới. Trong thành phần `Task`, thuộc tính này được sử dụng để tự động chuyển công việc vừa được tạo sang chế độ chỉnh sửa. Ngoài ra, có một cách xử lý đặc biệt khi hủy bỏ: nếu người dùng hủy chỉnh sửa một công việc có thuộc tính `isNew` là `true`, công việc đó sẽ bị xóa hoàn toàn khỏi mảng thay vì chỉ đơn giản là thoát khỏi chế độ chỉnh sửa.

### 5.2 Đọc (Read)

#

Việc hiển thị danh sách công việc được thực hiện một cách đơn giản và hiệu quả. Trong thành phần `App.js`, phương thức `map()` được sử dụng để lặp qua mảng trạng thái `tasks` và kết xuất một thành phần `Task` cho mỗi đối tượng công việc. Điều quan trọng là mỗi thành phần `Task` được kết xuất trong danh sách đều được gán một thuộc tính `key` duy nhất, sử dụng `task.id`, điều này rất cần thiết để React có thể tối ưu hóa các lần kết xuất lại.

### 5.3 Cập nhật (Update)

#

Ứng dụng hỗ trợ hai quy trình cập nhật riêng biệt cho mỗi công việc.

#### **Chỉnh sửa Tên Công việc**

#

Cơ chế chỉnh sửa tên công việc sử dụng trạng thái cục bộ `editing` trong thành phần `Task`. Kết xuất có điều kiện (conditional rendering) được sử dụng để chuyển đổi giao diện giữa việc hiển thị tên công việc (dưới dạng văn bản tĩnh) và một trường `input` (khi `editing` là `true`). Khi người dùng lưu thay đổi, hàm `onSave` (được truyền từ `App.js` dưới dạng prop `editTask`) được gọi, truyền lên một đối tượng công việc mới với tên đã được cập nhật (`{...task, name}`). `App.js` sau đó sử dụng phương thức `.map()` để cập nhật mảng `tasks` một cách bất biến.

#### **Hoàn thành Công việc**

#

Việc cập nhật trạng thái hoàn thành được thiết kế để diễn ra ngay lập tức. Thuộc tính `checked` của hộp kiểm được liên kết trực tiếp với thuộc tính `task.complete` từ `props`. Khi người dùng nhấp vào hộp kiểm, hàm `toggleComplete` được kích hoạt. Hàm này ngay lập tức gọi `onSave`, truyền vào giá trị `e.target.checked` để cập nhật trạng thái hoàn thành của công việc trong mảng `tasks` tại `App.js`.

### 5.4 Xóa (Delete)

#

Quy trình xóa một công việc được xử lý bởi hàm `destroyTask` trong `App.js`. Hàm này nhận ID của công việc cần xóa làm đối số. Nó sử dụng phương thức `Array.filter()` để tạo ra một mảng mới, chỉ bao gồm các công việc có ID không khớp với ID được cung cấp. Việc này tạo ra một bản sao mới của mảng trạng thái, đảm bảo tính bất biến và kích hoạt một lần kết xuất lại đúng đắn.

Các chức năng CRUD này được bổ sung bởi các chi tiết nhỏ giúp cải thiện trải nghiệm người dùng tổng thể của ứng dụng.

## 6.0 Cải tiến Trải nghiệm Người dùng (UX)

#

Ngoài chức năng cốt lõi, ứng dụng còn tích hợp nhiều cải tiến nhỏ nhưng có tác động lớn để tạo ra một trải nghiệm người dùng mượt mà và trực quan hơn. Những chi tiết này cho thấy sự chú trọng vào khả năng sử dụng và giảm thiểu sự phiền toái cho người dùng.

| Tính năng                          | Mục đích và Tác động                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tự động Tập trung (Auto Focus)** | Việc sử dụng thuộc tính `autoFocus` trên các trường `input` đảm bảo rằng con trỏ sẽ tự động được đặt vào trường nhập liệu ngay khi người dùng nhấp vào "Chỉnh sửa" hoặc "Thêm công việc mới". Điều này cho phép người dùng bắt đầu nhập ngay lập tức, giảm thiểu các lần nhấp chuột không cần thiết và làm cho quy trình làm việc nhanh hơn và liền mạch hơn. |
| **Hành động theo Ngữ cảnh**        | Các nút hành động thay đổi một cách linh hoạt dựa trên trạng thái của công việc. Khi ở chế độ xem, các nút "Chỉnh sửa" và "Xóa" được hiển thị. Khi chuyển sang chế độ chỉnh sửa, chúng được thay thế bằng các nút "Lưu" và "Hủy". Điều này giúp giao diện không bị lộn xộn, giảm tải nhận thức cho người dùng và ngăn ngừa các hành động lỗi.                 |
| **Trình giữ chỗ (Placeholders)**   | Khi chỉnh sửa một công việc, trường `input` sử dụng thuộc tính `placeholder` để hiển thị tên công việc ban đầu. Điều này đóng vai trò như một lời nhắc nhở hữu ích, giúp người dùng giữ được ngữ cảnh và giảm khả năng mắc lỗi khi chỉnh sửa.                                                                                                                 |
| **Phản hồi Trực quan**             | Các công việc đã hoàn thành được thay đổi kiểu dáng bằng cách giảm độ mờ (`opacity`). Sự thay đổi này cung cấp phản hồi trực quan, xác nhận ngay lập tức rằng hành động của họ đã thành công và cải thiện cảm giác tương tác của ứng dụng.                                                                                                                    |

Những cải tiến tập trung vào người dùng này, khi kết hợp lại, đã nâng cao đáng kể chất lượng tổng thể của ứng dụng.

## 7.0 Kết luận

#

Báo cáo này đã phân tích kiến trúc của một ứng dụng quản lý công việc React, cho thấy cách các quyết định thiết kế có chủ ý đã tạo ra một nền tảng mạnh mẽ và dễ bảo trì. Bằng cách kết hợp các mẫu React hiện đại với sự tập trung vào trải nghiệm người dùng, ứng dụng đã đạt được sự cân bằng giữa chức năng, hiệu suất và khả năng sử dụng.

Các trụ cột chính trong thiết kế của ứng dụng có thể được tóm tắt như sau:

- **Sử dụng kiến trúc dựa trên thành phần** để thúc đẩy khả năng tái sử dụng và tách biệt rõ ràng các mối quan tâm.
- **Đóng gói kiểu dáng** với `styled-components` để đảm bảo tính nhất quán về mặt hình ảnh và loại bỏ xung đột CSS.
- **Áp dụng** mô hình "Nâng trạng thái lên" để tạo ra một nguồn chân lý trung tâm và luồng dữ liệu một chiều có thể dự đoán được.
- **Tập trung vào trải nghiệm người dùng:** Các cải tiến nhỏ nhưng có chủ ý, chẳng hạn như tự động tập trung và các hành động theo ngữ cảnh, giúp nâng cao đáng kể khả năng sử dụng của ứng dụng.

Sự kết hợp của các phương pháp này đã tạo ra một nền tảng ứng dụng React sạch sẽ, có cấu trúc tốt và dễ mở rộng. Đây là một minh chứng thực tiễn về cách áp dụng các nguyên tắc phát triển frontend hiện đại để xây dựng các ứng dụng chất lượng cao.

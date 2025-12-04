# Khám Phá Material-UI: Bốn Thành Phần Cốt Lõi Cho Người Mới Bắt Đầu

## 1\. Giới thiệu: Material-UI là gì và Tại sao bạn nên quan tâm?

#

Material-UI (thường được gọi là MUI) là "khuôn khổ giao diện người dùng React phổ biến nhất thế giới" (the world's most popular React UI Framework). Đây là một bộ sưu tập các thành phần (component) được xây dựng sẵn, giúp bạn tạo ra các giao diện người dùng đẹp mắt và chuyên nghiệp một cách nhanh chóng trong các dự án React.

Đối với người mới bắt đầu, việc sử dụng MUI mang lại nhiều lợi ích đáng kể:

- **Tăng tốc độ phát triển**: Thay vì phải viết CSS từ đầu cho từng nút bấm, thẻ, hay thanh điều hướng, bạn có thể nhập và sử dụng ngay các thành phần đã được thiết kế sẵn.
- **Phong cách nhất quán**: Tất cả các thành phần đều tuân theo một hệ thống thiết kế chung, đảm bảo giao diện của bạn trông hài hòa và chuyên nghiệp.
- **Không cần CSS toàn cục**: Mỗi thành phần đều tự chứa các kiểu dáng của riêng nó. Điều này có nghĩa là bạn không cần phải lo lắng về việc quản lý một tệp CSS lớn và phức tạp cho toàn bộ ứng dụng.

Trong bài viết này, chúng ta sẽ khám phá bốn thành phần nền tảng giúp bạn bắt đầu xây dựng giao diện với Material-UI.

## 2\. Tìm hiểu các Thành phần Nền tảng

#

Mọi giao diện phức tạp đều được xây dựng từ những khối cơ bản. Trong MUI, `Paper` và `Typography` chính là hai trong số những khối cơ bản quan trọng nhất.

### 2.1. `Paper`: Tấm nền cho Giao diện của bạn

#

Hãy tưởng tượng `Paper` như một tờ giấy kỹ thuật số. Để hiểu rõ bản chất của nó, điều quan trọng cần biết là: `Paper` chỉ đơn giản là một thẻ `<div>` được bọc lại với một vài thuộc tính (props) đặc biệt. Nó có vai trò như một bề mặt hoặc một tấm nền sạch sẽ trên màn hình để bạn đặt các nội dung khác lên trên.

Thuộc tính quan trọng nhất của `Paper` là `elevation` (độ nâng).

- **Mục đích**: Thuộc tính này sử dụng `box-shadow` trong CSS để tạo ra hiệu ứng đổ bóng, làm cho tấm nền có vẻ như đang "nổi" lên trên màn hình.
- **Cách hoạt động**: `elevation` nhận một giá trị số từ 0 đến 24. Giá trị này không tạo ra một bóng ngẫu nhiên, mà nó sẽ lấy một kiểu bóng đã được định nghĩa sẵn trong hệ thống chủ đề (theme) của MUI, cụ thể là từ `theme.shadows[number]`.
  - `elevation={0}`: Tấm nền phẳng, không có bóng.
  - `elevation={24}`: Tấm nền có độ nổi cao nhất với bóng đổ rõ rệt nhất.

Việc sử dụng `elevation` giúp tạo ra cảm giác về chiều sâu và phân cấp trực quan cho giao diện của bạn. Mặc định, `Paper` cũng có `border-radius` là 4px để tạo các góc bo tròn mềm mại.

### 2.2. `Typography`: Định hình Nội dung Văn bản

#

`Typography` là thành phần chuyên dụng để hiển thị văn bản. Thay vì sử dụng các thẻ HTML tiêu chuẩn như `<h1>` hay `<p>`, `Typography` giúp bạn đảm bảo rằng tất cả văn bản trong ứng dụng đều tuân thủ một hệ thống phân cấp và kiểu dáng nhất quán.

Điều này quan trọng vì nó giúp bạn kiểm soát giao diện văn bản thông qua thuộc tính `variant`. Về bản chất, thuộc tính này sẽ quyết định thẻ HTML nào được render ra trình duyệt.

Dưới đây là một số biến thể phổ biến và thẻ HTML tương ứng của chúng:

| Thuộc tính `variant` | Mục đích sử dụng                                             | Thẻ HTML tương ứng |
| -------------------- | ------------------------------------------------------------ | ------------------ |
| `h1`                 | Dành cho tiêu đề chính, lớn nhất trên trang.                 | `<h1>`             |
| `h6`                 | Dành cho các tiêu đề phụ nhỏ hơn hoặc các tiêu đề trong thẻ. | `<h6>`             |
| `body1`              | Dành cho các đoạn văn bản chính (đây là giá trị mặc định).   | `<p>`              |
| `caption`            | Dành cho các chú thích nhỏ, nhãn hoặc văn bản phụ.           | `<span>`           |

Khi đã có nền (`Paper`) và chữ (`Typography`), giờ chúng ta sẽ học cách sắp xếp chúng vào các cấu trúc lớn hơn.

## 3\. Xây dựng Giao diện với các Thành phần Cấu trúc

#

Từ những khối nền tảng, chúng ta có thể xây dựng các thành phần cấu trúc phức tạp hơn như thanh điều hướng và thẻ nội dung.

### 3.1. `AppBar`: Thanh Điều hướng Chính

#

`AppBar` là thành phần thường được sử dụng làm thanh điều hướng (navigation bar) ở đầu trang. Nó là nơi lý tưởng để đặt logo, tiêu đề trang, menu hoặc các nút hành động chính.

Về bản chất, `AppBar` là một thành phần `Paper` đã được tùy chỉnh sẵn. Để hiểu cách nó hoạt động, `AppBar` được trang bị các thuộc tính CSS đặc biệt để giữ nó cố định ở đầu trang: `position: fixed`, `top: 0`, và `width: 100%`.

Để sắp xếp các mục bên trong `AppBar` (như tiêu đề và nút bấm) theo chiều ngang một cách gọn gàng, chúng ta thường sử dụng một thành phần trợ giúp là `<Toolbar>`. `Toolbar` là một công cụ mạnh mẽ vì nó áp dụng `display: 'flex'` và `alignItems: 'center'`, biến nó thành một flexbox container và tự động căn chỉnh các mục con theo chiều dọc.

### 3.2. `Card`: Đóng gói Nội dung Liên quan

#

`Card` được sử dụng để nhóm các thông tin và hành động liên quan đến một chủ đề duy nhất. Ví dụ, bạn có thể dùng `Card` để hiển thị một bài đăng trên blog, thông tin một sản phẩm, hoặc chi tiết liên lạc của một người.

Mối quan hệ quan trọng nhất bạn cần nhớ là: `**Card**` **thực chất giống hệt** `**Paper**`. Nguồn tài liệu đã nêu rõ: "Thành phần `<Card>` từ Material UI giống hệt như thành phần `<Paper>`". Nói cách khác, `Card` chỉ là một cách sử dụng `Paper` theo ngữ cảnh. Nó thậm chí còn cung cấp một thuộc tính tiện lợi là `raised`, đây là một lối tắt để thiết lập `elevation={8}`.

Để xây dựng một thẻ hoàn chỉnh, `Card` thường được kết hợp với các thành phần phụ trợ sau, mỗi thành phần đều có những mục đích rất cụ thể:

- `**CardContent**`: Dùng để bọc nội dung chính của thẻ. Nó tự động thêm `16px` padding xung quanh và `24px` padding ở dưới đáy nếu nó là phần tử cuối cùng, giúp nội dung của bạn "dễ thở" hơn.
- `**CardActions**`: Đây là một `<div>` sử dụng `display: flex` để nhóm các nút hành động. Nó thêm `8px` padding và tự động tạo ra một khoảng cách `8px` _giữa_ mỗi nút, giúp bạn sắp xếp các nút mà không cần CSS thủ công.
- `**CardMedia**`: Dùng để hiển thị hình ảnh hoặc video, đảm bảo chúng lấp đầy không gian được cấp một cách đẹp mắt.

Bây giờ bạn đã biết các khối xây dựng chính, hãy xem cách chúng kết hợp với nhau để tạo thành một trang web hoàn chỉnh.

## 4\. Tổng kết: Kết hợp các Mảnh ghép

#

Với chỉ bốn thành phần này, bạn đã có thể phác thảo bố cục của nhiều trang web hiện đại. Hãy tưởng tượng một trang blog đơn giản:

- Bạn sử dụng `**AppBar**` ở trên cùng để hiển thị tiêu đề của trang blog.
- Bên dưới, bạn có một danh sách các bài viết, mỗi bài viết được hiển thị bên trong một `**Card**`.
- Bản thân mỗi `**Card**` thực chất là một `**Paper**` với một `elevation` nhất định để làm nó nổi bật trên nền trang.
- Bên trong mỗi `Card`, bạn sử dụng `**Typography**` với `variant="h6"` cho tiêu đề bài viết và `variant="body1"` cho đoạn mô tả ngắn.

Bằng cách kết hợp các mảnh ghép này, bạn có thể nhanh chóng xây dựng một giao diện có cấu trúc, rõ ràng và đẹp mắt mà không cần viết nhiều CSS.

## 5\. Lời kết và Bước tiếp theo

#

Bạn vừa tìm hiểu về bốn thành phần cốt lõi của Material-UI: `Paper`, `Typography`, `AppBar`, và `Card`. Đây là những khối xây dựng nền tảng sẽ xuất hiện trong hầu hết mọi dự án sử dụng MUI.

Để tiếp tục hành trình của mình, hãy khám phá tài liệu chính thức của Material-UI. Đây là hai khu vực quan trọng nhất bạn nên ghé thăm:

1.  **Components**: Nơi đây chứa các ví dụ trực quan và có thể tương tác cho từng thành phần. Bạn có thể xem mã nguồn đầy đủ và thậm chí chỉnh sửa trực tiếp trên CodeSandbox.
2.  **Component API**: Đây là chìa khóa để bạn thực sự làm chủ một thành phần. Nó cung cấp danh sách đầy đủ tất cả các thuộc tính (`props`) mà mỗi thành phần có thể nhận. Việc đọc trang API sẽ cho bạn biết mọi khả năng tùy chỉnh, từ thay đổi màu sắc đến điều chỉnh hành vi.

Chúc bạn học tập hiệu quả và xây dựng được những ứng dụng tuyệt vời với Material-UI!

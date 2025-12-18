# Sách trắng Material-UI: Làm chủ Tạo kiểu và các Thành phần Cốt lõi

## 1.0 Giới thiệu về Material-UI

### 1.1. Bối cảnh và Tầm quan trọng

#

Material-UI (MUI) đã khẳng định vị thế của mình như một framework giao diện người dùng React hàng đầu, được công nhận rộng rãi là "framework giao diện người dùng React phổ biến nhất thế giới". Tầm quan trọng của nó trong hệ sinh thái phát triển web hiện đại bắt nguồn từ phương pháp tiếp cận dựa trên thành phần toàn diện. Các nhà phát triển lựa chọn MUI vì các thành phần của nó đều chứa các kiểu dáng riêng, loại bỏ sự phụ thuộc vào một tệp CSS toàn cục cồng kềnh. Điều này không chỉ hợp lý hóa quy trình làm việc mà còn thúc đẩy một quy trình phát triển có tổ chức và dễ bảo trì hơn. Để khai thác toàn bộ tiềm năng của kiến trúc mạnh mẽ này, trước tiên cần phải hiểu triết lý cài đặt và cấu trúc tài liệu của nó.

### 1.2. Triết lý Thiết kế và Cài đặt

#

Việc thiết lập một dự án MUI là một quyết định chiến lược. Cốt lõi của quá trình này là lựa chọn một công cụ tạo kiểu, và Emotion được xác định là lựa chọn cài đặt tiêu chuẩn, được tích hợp liền mạch vào hệ sinh thái của framework.

Lệnh cài đặt được đề xuất để bắt đầu một dự án mới là:

`yarn add @mui/material @emotion/react @emotion/styled @mui/icons-material`

Gói `@mui/icons-material` là tùy chọn nhưng thường được sử dụng trong các ứng dụng thực tế để truy cập vào thư viện biểu tượng phong phú của Material Design. Ngoài các gói cốt lõi này, tài liệu chính thức cũng hướng dẫn các nhà phát triển thực hiện các bước thiết lập bổ sung, chẳng hạn như tích hợp phông chữ Roboto mặc định và các biểu tượng Material Icons, để đảm bảo ứng dụng tuân thủ đầy đủ các nguyên tắc thiết kế. Sau khi môi trường được cấu hình đúng cách, việc hiểu cách điều hướng tài liệu của MUI là rất quan trọng để sử dụng hiệu quả.

### 1.3. Cấu trúc Tài liệu và Cách tiếp cận

#

Việc sử dụng thành thạo tài liệu MUI là một kỹ năng chiến lược, cho phép các nhà phát triển tăng tốc đáng kể chu kỳ phát triển và đạt được sự thông thạo sâu sắc về framework. Tài liệu được cấu trúc một cách thông minh thành hai phần chính, mỗi phần phục vụ một mục đích riêng biệt nhưng bổ sung cho nhau: **Components** và **Component API**.

- **Components:** Phần này là sân chơi khám phá của nhà phát triển. Nó chứa các ví dụ và bản demo hoạt động, lý tưởng cho việc nghiên cứu và tạo mẫu ban đầu. Mỗi ví dụ cung cấp khả năng xem mã nguồn đầy đủ (thông qua biểu tượng `<>`) và thậm chí chỉnh sửa trực tiếp trong một môi trường CodeSandbox, cho phép thử nghiệm và tùy chỉnh ngay lập tức.
- **Component API:** Phần này đóng vai trò là tài liệu tham khảo dứt khoát. Nó cung cấp một danh sách đầy đủ tất cả các `props` có sẵn, các lớp CSS có thể tùy chỉnh và các quy tắc kiểu dáng cho mỗi thành phần. Đây là nguồn thông tin chính xác khi cần tinh chỉnh hành vi hoặc ghi đè các kiểu dáng mặc định.

Sự tách biệt rõ ràng này là một lợi thế kiến trúc. Nó cho phép các nhà phát triển chuyển đổi liền mạch giữa việc "khám phá" các trường hợp sử dụng sáng tạo trong phần Components và "kiểm tra" các tên thuộc tính và quy tắc CSS chính xác trong phần Component API. Hiểu rõ cấu trúc tài liệu này là bước đầu tiên; bước tiếp theo là làm chủ các công cụ tạo kiểu mạnh mẽ mà MUI cung cấp.

## 2.0 Phân tích Chuyên sâu về các Phương pháp Tạo kiểu

#

Quyết định kiến trúc lớn đầu tiên khi làm việc với MUI là lựa chọn một chiến lược tạo kiểu. Framework này cung cấp một bộ công cụ mạnh mẽ, mỗi công cụ được tối ưu hóa cho các trường hợp sử dụng cụ thể, từ các điều chỉnh nhanh chóng đến việc xây dựng các hệ thống thiết kế có thể mở rộng.

### 2.1. `sx` Prop: Lối tắt Tiện ích cho Kiểu dáng Nội tuyến

#

`sx` prop nên được tận dụng như một công cụ chiến lược để áp dụng nhanh chóng các tùy chỉnh kiểu dáng mà không cần rời khỏi cú pháp JSX. Đây không phải là CSS nội tuyến thông thường; nó là một siêu tập hợp của CSS, được tăng cường với khả năng truy cập trực tiếp vào các giá trị của theme ứng dụng. Theo định nghĩa chính thức, `sx` prop là "một lối tắt để định nghĩa các kiểu dáng tùy chỉnh có quyền truy cập vào theme."

Khái niệm này được hiện thực hóa thông qua các "thuộc tính nhận biết theme" do `@mui/system` cung cấp, cho phép các nhà phát triển tham chiếu các giá trị được định sẵn từ theme—chẳng hạn như màu sắc từ `palette` hoặc các đơn vị `spacing`—một cách hiệu quả. Hơn nữa, `sx` prop có thể được sử dụng để ghi đè các kiểu dáng lồng nhau bằng cách nhắm mục tiêu trực tiếp vào các tên lớp CSS. Các tên lớp này tuân theo một mẫu chuẩn: `[hash]-Mui[Component name]-[name of the slot]`. Mẫu này là những gì bạn sẽ xác định bằng cách sử dụng công cụ phát triển của trình duyệt để nhắm mục tiêu vào các phần tử nội bộ cụ thể của một thành phần để ghi đè trong `sx` prop. Mặc dù `sx` rất tuyệt vời cho các điều chỉnh nhanh, MUI cung cấp một giải pháp mạnh mẽ hơn để tạo ra các thành phần có thể tái sử dụng hoàn toàn.

### 2.2. `styled()` Utility: Xây dựng các Thành phần Tái sử dụng

#

`styled()` utility là một giải pháp cấp kiến trúc để tạo ra các thành phần tùy chỉnh, có thể tái sử dụng trên toàn bộ ứng dụng. Vai trò chính của nó là đóng gói các kiểu dáng vào các thành phần riêng biệt, giúp duy trì tính nhất quán của giao diện và khả năng bảo trì của mã nguồn trong dài hạn. Tiện ích này hoạt động như một sự thay thế trực tiếp cho hàm `styled()` từ các thư viện phổ biến như Emotion hoặc styled-components, cung cấp một cú pháp quen thuộc cho nhiều nhà phát triển.

Quy trình sử dụng rất đơn giản: một nhà phát triển có thể bọc một thành phần MUI hiện có (ví dụ: `styled(Button)`) để tạo ra một phiên bản mới với các kiểu dáng tùy chỉnh được áp dụng vĩnh viễn. Thành phần mới này có thể được xuất và sử dụng lại ở bất kỳ đâu. Tài liệu của MUI ngày càng nhấn mạnh cách tiếp cận này như một tiêu chuẩn, đồng thời chỉ ra rằng các phương pháp cũ hơn như `withStyles` và `makeStyles` sẽ không còn được dùng nữa. Việc lựa chọn giữa `sx` và `styled` là một quyết định kiến trúc quan trọng đòi hỏi sự hiểu biết rõ ràng về các trường hợp sử dụng tương ứng của chúng.

### 2.3. So sánh và các Trường hợp Sử dụng Tối ưu

#

Việc lựa chọn công cụ tạo kiểu phù hợp là một quyết định quan trọng nhằm cân bằng giữa tốc độ phát triển nhanh chóng và khả năng bảo trì lâu dài của mã nguồn.

| Tiêu chí                     | `sx` Prop                                                                                       | `styled()` Utility                                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Trường hợp sử dụng chính** | Ghi đè kiểu dáng một lần, tạo mẫu nhanh, áp dụng các kiểu dáng phụ thuộc vào trạng thái cục bộ. | Tạo các thành phần tùy chỉnh, có thể tái sử dụng trên toàn bộ ứng dụng (ví dụ: `PrimaryButton`). |
| **Cú pháp**                  | Được áp dụng như một prop trực tiếp trên một thể hiện thành phần.                               | Được sử dụng để bọc một định nghĩa thành phần, tạo ra một thành phần React mới.                  |
| **Khả năng tái sử dụng**     | Thấp. Kiểu dáng được gắn với một thể hiện duy nhất.                                             | Cao. Tạo ra một thành phần mới có thể được xuất và nhập khẩu ở bất kỳ đâu.                       |
| **Hiệu suất**                | Được tối ưu hóa cho các ghi đè động và thường xuyên.                                            | Lý tưởng cho các kiểu dáng tĩnh, được định nghĩa một lần và tái sử dụng nhiều lần.               |

Tóm lại, khuyến nghị kiến trúc là: sử dụng `sx` prop cho các điều chỉnh cụ thể, cục bộ và một lần. Ngược lại, hãy sử dụng `styled()` utility khi xác định các biến thể thành phần cốt lõi của hệ thống thiết kế của bạn. Các kỹ thuật tạo kiểu này sau đó được áp dụng cho các thành phần nền tảng như các thành phần bố cục và bề mặt để xây dựng cấu trúc của một ứng dụng.

## 3.0 Kiến trúc của các Thành phần Bố cục và Bề mặt

### 3.1. `Grid`: Hệ thống Bố cục Linh hoạt

#

Thành phần `Grid` là nền tảng để tạo ra các bố cục đáp ứng và có cấu trúc trong các ứng dụng MUI. Về mặt kiến trúc, `Grid` chủ yếu là một lớp bao bọc xung quanh mô-đun CSS Flexible Box (Flexbox). Do đó, việc hiểu rõ các khái niệm cốt lõi của Flexbox—chẳng hạn như `flex container` và `flex item`—là điều kiện tiên quyết để sử dụng `Grid` một cách hiệu quả. Về mặt kỹ thuật, MUI sử dụng `flex-basis` và `max-width` để thiết lập độ rộng của các cột.

Giá trị gia tăng mà `Grid` cung cấp so với việc sử dụng Flexbox thuần túy nằm ở các thuộc tính trợ giúp. Các props này trừu tượng hóa bản chất đôi khi dài dòng và phức tạp của Flexbox thuần túy, cung cấp một API khai báo cho hệ thống 12 cột phổ biến, giúp tăng tốc độ phát triển cho các bố cục tiêu chuẩn. Hệ thống này hoạt động dựa trên các điểm ngắt được định nghĩa trước:

- `xs`: 0px
- `sm`: 600px
- `md`: 900px
- `lg`: 1200px
- `xl`: 1536px

Các điểm ngắt này được sử dụng trực tiếp làm props, chẳng hạn như `<Grid item xs={12} md={6}>`. Cú pháp này hướng dẫn một cách khai báo cho thành phần chiếm tất cả 12 cột có sẵn trên các màn hình cực nhỏ (`xs`) trở lên, nhưng chỉ chiếm 6 cột (nửa chiều rộng) trên các màn hình trung bình (`md`) trở lên. Sau khi bố cục được thiết lập, các thành phần `Paper` và `Card` cung cấp các bề mặt để chứa nội dung.

### 3.2. `Paper` và `Card`: Các Bề mặt Nền tảng

#

`Paper` là thành phần nguyên thủy bề mặt (surface primitive) cơ bản nhất trong hệ sinh thái MUI, cung cấp một vùng chứa rõ ràng, giống như giấy để nâng cao các yếu tố giao diện người dùng. Về cấu trúc, nó là một `<div>` đơn giản. Prop quan trọng nhất của nó là `elevation`, nhận một giá trị số từ 0 đến 24, ánh xạ trực tiếp đến các giá trị `box-shadow` được xác định trước trong `theme.shadows`.

Thành phần `Card` về cơ bản là một dẫn xuất của `Paper`, với sự khác biệt duy nhất là sự tồn tại của prop `raised`, một lối tắt tiện lợi để thiết lập `elevation={8}`. Giá trị thực sự của `Card` đến từ hệ sinh thái các thành phần con của nó, chẳng hạn như `CardContent` (thêm padding), `CardActions` (một flex container để sắp xếp các nút), `CardMedia` (để hiển thị hình ảnh nền), `CardHeader` (cho avatar và tiêu đề), và `CardActionArea` (tạo ra một vùng có thể nhấp với hiệu ứng gợn sóng). Các thành phần bề mặt này thường được đặt trong các cấu trúc ứng dụng lớn hơn được định nghĩa bởi `AppBar` và `Toolbar`.

### 3.3. `AppBar` và `Toolbar`: Điều hướng Cấp cao

#

`AppBar` đóng vai trò kiến trúc như một thành phần chính ở đầu trang, chịu trách nhiệm xây dựng nhận diện thương hiệu, điều hướng và các hành động quan trọng. Về cơ bản, nó là một thành phần `Paper` chuyên dụng, áp dụng các thuộc tính CSS quan trọng như `position: fixed`, `top: 0`, `width: 100%`, và một giá trị `z-index` cao.

Trong khi `AppBar` cung cấp bề mặt nâng cao và định vị cố định, nó không có logic bố cục nội tại cho các phần tử con của nó. Sự tách biệt kiến trúc này là rất quan trọng; `AppBar` quản lý độ cao và vị trí, trong khi `Toolbar` quản lý bố cục flexbox bên trong. `Toolbar` chịu trách nhiệm sắp xếp các mục (logo, tiêu đề, nút) theo chiều ngang bằng cách áp dụng `display: 'flex'` và `align-items: 'center'`, đồng thời thiết lập một `minHeight` tiêu chuẩn để đảm bảo sự nhất quán. Một trường hợp sử dụng thứ cấp của `Toolbar` là đóng vai trò như một "cái đệm" (spacer) để đẩy nội dung chính của trang xuống dưới một `AppBar` cố định.

## 4.0 Phân tích các Thành phần Giao diện Người dùng Cơ bản

### 4.1. `Typography`: Hệ thống Chữ viết Nhất quán

#

Thành phần `Typography` là một công cụ quan trọng để thực thi một hệ thống phân cấp văn bản nhất quán và dễ tiếp cận. Cơ chế cốt lõi của nó xoay quanh prop `variant`, xác định cả thẻ HTML ngữ nghĩa sẽ được kết xuất (ví dụ: `h1` thành `<h1>`, `body1` thành `<p>`) và các kiểu dáng CSS tương ứng được lấy từ đối tượng `theme.typography`. Ví dụ, biến thể `h1` từ theme mặc định áp dụng các thuộc tính sau:

- `fontWeight`: 300
- `fontSize`: "6rem"
- `lineHeight`: 1.167
- `letterSpacing`: "-0.01562em"

Để tùy chỉnh màu sắc, prop `color` chấp nhận các giá trị được định nghĩa trong theme (ví dụ: `primary`, `secondary`, `error`). Đối với các màu tùy chỉnh hoặc các ghi đè CSS phức tạp hơn, `sx` prop là phương pháp được khuyến nghị. Trong khi `Typography` xử lý văn bản, các thành phần tương tác như `Button` và `IconButton` xử lý các hành động của người dùng.

### 4.2. Các thành phần Tương tác: `Button` và `IconButton`

#

Các nút là yếu tố tương tác chính trong bất kỳ giao diện người dùng nào, và MUI cung cấp một thành phần `Button` linh hoạt. Các loại nút chính được phân biệt bằng cách sử dụng prop `variant`.

- **Text (mặc định):** Được sử dụng cho các hành động có độ nhấn thấp.
- **Contained:** Dành cho các hành động chính, có độ nhấn cao, thu hút sự chú ý của người dùng.
- **Outlined:** Dành cho các hành động phụ, có độ nhấn trung bình.

`IconButton` là một biến thể chuyên dụng của `Button`, được thiết kế đặc biệt để chứa một biểu tượng duy nhất với hiệu ứng gợn sóng hình tròn. Các thành phần biểu tượng phải được nhập từ gói `@mui/icons-material`. Sau các hành động của người dùng, giao diện thường cần hiển thị dữ liệu nhận dạng, và đây là lúc các thành phần như `Avatar` và `Chip` phát huy tác dụng.

### 4.3. Các thành phần Hiển thị Dữ liệu: `Avatar` và `Chip`

#

Các thành phần hiển thị nhỏ gọn đóng vai trò quan trọng trong việc truyền tải thông tin một cách hiệu quả. Thành phần `Avatar` rất linh hoạt, được thiết kế cho ba trường hợp sử dụng chính: hiển thị hình ảnh (qua `src`), chữ cái (dưới dạng `children`), hoặc một biểu tượng. Nó có một logic dự phòng thông minh: nếu hình ảnh không tải được, nó sẽ hiển thị `children`; nếu không có `children`, nó sẽ hiển thị chữ cái đầu tiên của thuộc tính `alt`. Tiện ích `AvatarGroup` có thể được sử dụng để hiển thị nhiều avatar theo cách xếp chồng lên nhau, có thể tùy chỉnh với prop `max`.

Thành phần `Chip` hoạt động như một nhãn nhỏ gọn để hiển thị các thuộc tính hoặc thẻ. Mặc dù việc tùy chỉnh màu sắc có thể được thực hiện nhanh chóng thông qua prop `style` nội tuyến để thiết lập `backgroundColor`, một cách tiếp cận kiến trúc mạnh mẽ hơn là sử dụng `styled()` utility để nhắm mục tiêu vào thuộc tính CSS `root` của Chip, đảm bảo tính nhất quán và khả năng tái sử dụng.

## 5.0 Kết luận và các Phương pháp Tốt nhất

### 5.1. Tóm tắt các Quyết định Kiến trúc Chính

#

Sách trắng này đã phân tích các phương pháp tạo kiểu và các thành phần cốt lõi của Material-UI. Việc triển khai thành công framework này phụ thuộc vào một vài quyết định kiến trúc cơ bản. Cuộc thảo luận về `sx` và `styled` có thể được tóm tắt thành một khuyến nghị cốt lõi:

- **Sử dụng** `**sx**` **prop:** Cho các ghi đè kiểu dáng nhanh, cục bộ và một lần.
- **Sử dụng** `**styled()**` **utility:** Để tạo ra các thành phần có thể tái sử dụng, nhất quán trên toàn bộ hệ thống.

Ngoài ra, việc nắm vững `Grid` đòi hỏi kiến thức về Flexbox, và việc hiểu `Paper` là chìa khóa để hiểu các thành phần bề mặt khác như `Card` và `AppBar`. Những quyết định kiến trúc này được hỗ trợ bởi các phương pháp triển khai thực tế hàng ngày.

### 5.2. Lời khuyên để Triển khai Hiệu quả

#

Để tối đa hóa năng suất và duy trì chất lượng mã nguồn khi làm việc với MUI, các nhà phát triển nên tuân thủ các phương pháp tốt nhất sau:

1.  **Tận dụng Tối đa Tài liệu:** Sử dụng các ví dụ tương tác trong phần "Components" để tạo mẫu nhanh và tham khảo chéo với phần "Component API" để biết chi tiết chính xác về prop.
2.  **Ưu tiên Theme:** Luôn ưu tiên sử dụng các giá trị từ theme (ví dụ: `theme.palette.primary.main`, `theme.spacing(2)`) thay vì các giá trị được mã hóa cứng để đảm bảo tính nhất quán và dễ dàng thay đổi giao diện sau này.
3.  **Xây dựng từ các Thành phần Cơ bản:** Kiến trúc hóa các giao diện của bạn bằng cách trước tiên thiết lập một nền tảng cấu trúc với các thành phần nguyên thủy như `Paper`, `Grid`, và `Typography`. Việc xây dựng các giao diện phức tạp từ một nền tảng vững chắc sẽ đảm bảo tính ổn định và dễ bảo trì hơn.

Bằng cách kết hợp sự hiểu biết sâu sắc về kiến trúc của Material-UI với các phương pháp triển khai hiệu quả này, các nhà phát triển có thể khai thác toàn bộ sức mạnh của framework để xây dựng các ứng dụng React mạnh mẽ, đẹp mắt và có khả năng bảo trì cao.

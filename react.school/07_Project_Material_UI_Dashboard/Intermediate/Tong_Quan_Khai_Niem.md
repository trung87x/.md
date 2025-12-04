# Kiến Trúc Cơ Bản của Ứng Dụng Trang Tổng Quan React Material-UI

### Giới thiệu

Khi bắt đầu một dự án trang tổng quan với React, một trong những thách thức đầu tiên là tổ chức mã nguồn. Rất dễ dàng để tất cả logic, giao diện và trạng thái bị dồn vào một tệp `App.js` duy nhất, khiến nó nhanh chóng trở nên cồng kềnh và khó bảo trì. Tài liệu này sẽ cung cấp một cái nhìn tổng quan về kiến trúc đã được tái cấu trúc, giải thích cách các thành phần cốt lõi trong một ứng dụng React Material-UI (MUI) hoạt động cùng nhau. Chúng ta sẽ không đi sâu vào từng dòng mã, mà thay vào đó là tập trung vào "bức tranh toàn cảnh" để bạn nắm vững các nguyên tắc nền tảng.

Dự án mẫu mà chúng ta tìm hiểu sẽ dần được xây dựng thành một ứng dụng quản lý dự án có tên là "Missions". Đây là một ví dụ thực tế giúp bạn hình dung rõ hơn về cách các khái niệm được áp dụng.

Hãy cùng bắt đầu bằng cách phân tích tệp trung tâm, nơi quá trình tái cấu trúc bắt đầu: `App.js`.

## 1\. Tệp Trung Tâm: `App.js`

Ban đầu, logic chính của ứng dụng nằm trong một thành phần có tên là `DashboardContent`. Nó chứa gần như mọi thứ: từ các thành phần giao diện như thanh điều hướng và thanh bên, cho đến logic quản lý trạng thái. Việc tập trung quá nhiều trách nhiệm vào một thành phần duy nhất là một "anti-pattern" phổ biến, khiến việc bảo trì và mở rộng trở nên khó khăn.

### Quá trình Tiến hóa (Refactoring)

Để giải quyết vấn đề này, chúng ta đã thực hiện "tái cấu trúc" (refactoring) – một quy trình kỹ thuật nhằm chia nhỏ `DashboardContent` thành các thành phần chuyên biệt, dễ quản lý hơn. Quá trình này mang lại ba lợi ích cốt lõi theo nguyên tắc của kỹ thuật phần mềm:

- **Tăng cường tính tường minh (Clarity):** Khi mỗi tệp chỉ đảm nhiệm một vai trò duy nhất, kiến trúc tổng thể của ứng dụng trở nên trong sáng, giúp các nhà phát triển mới nhanh chóng nắm bắt luồng hoạt động.
- **Nâng cao khả năng bảo trì (Maintainability):** Các thành phần nhỏ, độc lập dễ dàng được cập nhật, gỡ lỗi và kiểm thử hơn nhiều so với một khối mã nguyên khối phức tạp.
- **Thúc đẩy khả năng tái sử dụng (Reusability):** Các thành phần chuyên dụng như `Copyright` có thể được tách ra và tái sử dụng một cách dễ dàng ở bất cứ đâu trong ứng dụng.

Trong quá trình tái cấu trúc, thành phần `DashboardContent` không chỉ được chia nhỏ mà còn được đổi tên thành `App` và đặt trong tệp `App.js` để tuân thủ quy ước đặt tên tệp và thành phần trong React.

### Vai trò Cuối cùng

Sau khi tái cấu trúc và tích hợp bộ định tuyến (React Router), vai trò của `App.js` đã thay đổi hoàn toàn. Nó trở nên tinh gọn, và trách nhiệm chính của nó lúc này là **định nghĩa các tuyến đường (routes)** của ứng dụng, quyết định thành phần nào sẽ hiển thị tương ứng với một URL cụ thể.

Với `App.js` đã được tinh gọn để tập trung vào định tuyến, chúng ta hãy xem xét các thành phần giao diện cốt lõi mà nó từng chứa, và cách chúng tương tác với nhau trong cấu trúc mới.

## 2\. Các Thành Phần Giao Diện Cốt Lõi

Mọi ứng dụng trang tổng quan đều cần có các thành phần điều hướng cơ bản để người dùng có thể tương tác. Trong dự án này, có hai thành phần giao diện cốt lõi.

| Thành phần | Mục đích chính                                                                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `AppBar`   | Đây là thanh điều hướng nằm ở trên cùng của ứng dụng. Nó thường chứa tiêu đề của trang hiện tại và các nút hành động quan trọng, ví dụ như công tắc để chuyển đổi giữa chế độ sáng và tối. |
| `Drawer`   | Đây là thanh bên (sidebar) có thể đóng hoặc mở. Nó chứa các liên kết điều hướng chính của ứng dụng, giúp người dùng di chuyển đến các khu vực khác nhau, chẳng hạn như trang "Missions".   |

### Sự Tương Tác Quan Trọng

Mối quan hệ giữa `AppBar` và `Drawer` là một điểm nhấn kiến trúc quan trọng. Trạng thái "đóng/mở" của `Drawer` (biến `open`) và hàm để thay đổi trạng thái đó (`toggleDrawer`) không nằm trong chính các thành phần này. Thay vào đó, chúng được quản lý bởi một thành phần cha chung (`Layout.js`). Thành phần cha này sau đó truyền trạng thái và hàm xuống cho cả `AppBar` và `Drawer` dưới dạng props.

Lý do của việc "nâng trạng thái lên" (lifting state up) này rất rõ ràng: **nút điều khiển trên** `**AppBar**` **cần có khả năng ra lệnh cho** `**Drawer**` **phải đóng hoặc mở**. Bằng cách đặt trạng thái ở một nơi chung, cả hai thành phần con đều có thể truy cập và tương tác với cùng một nguồn chân lý. Kiến trúc này không chỉ cho phép các thành phần giao tiếp với nhau, mà còn đảm bảo trạng thái giao diện người dùng (như `Drawer` đang mở hay chế độ tối đang bật) được duy trì nhất quán ngay cả khi người dùng điều hướng qua lại giữa các trang.

Tiếp theo, hãy tìm hiểu cách chúng ta đảm bảo các thành phần này có một giao diện nhất quán và chuyên nghiệp.

## 3\. Hệ Thống Chủ Đề (Theming): `ThemeProvider`

`ThemeProvider` là một thành phần đặc biệt từ Material-UI, đóng vai trò như một lớp vỏ bọc toàn bộ ứng dụng để quản lý giao diện một cách tập trung.

### Mục đích

- **Cung cấp một "chủ đề" (theme) nhất quán:** Nó đảm bảo tất cả các thành phần con bên trong nó (nút bấm, thẻ, thanh điều hướng, v.v.) đều tuân theo một bộ quy tắc thiết kế chung.
- **Tùy chỉnh tập trung:** Cho phép bạn tùy chỉnh toàn bộ giao diện của ứng dụng – từ màu sắc, phông chữ đến khoảng cách – chỉ từ một nơi duy nhất.
- **Hỗ trợ chuyển đổi chế độ:** Dễ dàng triển khai các tính năng như chuyển đổi giữa chế độ sáng (light mode) và chế độ tối (dark mode).

### Cách hoạt động

`ThemeProvider` nhận vào một đối tượng `theme` được tạo ra bởi hàm `createTheme` của MUI. Bằng cách thay đổi các giá trị trong đối tượng này, ví dụ như thay đổi `palette.primary` để định nghĩa màu chủ đạo, toàn bộ ứng dụng sẽ tự động cập nhật theo.

### Ví dụ thực tế - Chế độ Tối

Việc triển khai công tắc chuyển đổi chế độ tối/sáng là một ví dụ tuyệt vời. Khi người dùng bấm vào công tắc trên `AppBar`, một hàm (`setPaletteMode`) sẽ được gọi để cập nhật trạng thái của chủ đề. `ThemeProvider` nhận thấy sự thay đổi này và tự động áp dụng lại chủ đề mới (sáng hoặc tối) cho toàn bộ cây thành phần, mang lại trải nghiệm liền mạch cho người dùng.

Từ việc tạo kiểu dáng, chúng ta hãy chuyển sang cách tổ chức bố cục và các trang khác nhau trong ứng dụng.

## 4\. Bố Cục và Định Tuyến (Layout & Routing)

Khi ứng dụng phát triển, nó không chỉ có một trang duy nhất. Chúng ta cần nhiều trang khác nhau như trang tổng quan, trang quản lý nhiệm vụ, trang cài đặt... Để quản lý việc điều hướng giữa các trang này, chúng ta sử dụng một thư viện tiêu chuẩn trong hệ sinh thái React là **React Router**.

### Thành phần `Layout.js`

Thay vì đặt `AppBar` và `Drawer` trực tiếp trong mọi trang, chúng ta đã tạo ra một thành phần mới gọi là `Layout.js`. Vai trò của `Layout.js` là cung cấp một **bố cục chung** (bao gồm thanh trên cùng và thanh bên) cho tất cả các trang cần nó. Điều này giúp tránh lặp lại mã và đảm bảo giao diện nhất quán trên toàn ứng dụng.

### Thành phần `<Outlet/>`

Đây là một khái niệm then chốt từ `react-router-dom`. Hãy hình dung `<Outlet/>` như một "khung giữ chỗ" được đặt bên trong `Layout.js`. Khi người dùng điều hướng đến một URL, ví dụ `/missions`, React Router sẽ tìm thành phần tương ứng với URL đó (ở đây là `Missions`) và render nó vào đúng vị trí của `<Outlet/>`. Trong khi đó, các thành phần `AppBar` và `Drawer` trong `Layout` vẫn được giữ nguyên.

Lợi ích lớn nhất của cơ chế này là `Layout` (chứa `AppBar` và `Drawer`) không cần phải render lại mỗi khi URL thay đổi. Chỉ có nội dung bên trong `<Outlet/>` được cập nhật, giúp ứng dụng hoạt động nhanh hơn và mang lại trải nghiệm người dùng mượt mà hơn.

Cuối cùng, hãy cùng nhau nhìn lại toàn bộ kiến trúc để thấy cách các mảnh ghép này khớp với nhau.

## 5\. Tổng Kết: Bức Tranh Toàn Cảnh

Kiến trúc của ứng dụng được xây dựng theo một luồng logic, gắn kết các thành phần lại với nhau một cách hiệu quả và có khả năng mở rộng:

1.  `**App.js**` đóng vai trò là bộ não định tuyến, định nghĩa các **tuyến đường (routes)** và thành phần tương ứng cho mỗi URL.
2.  Tuyến đường chính render thành phần `**Layout**`, nơi chứa các yếu tố giao diện chung như `AppBar`, `Drawer`, và một `**<Outlet/>**` để hiển thị nội dung của từng trang con.
3.  Toàn bộ ứng dụng được bao bọc bởi `**ThemeProvider**` để đảm bảo giao diện nhất quán, đồng thời cung cấp khả năng chuyển đổi giữa chế độ sáng và tối một cách linh hoạt.
4.  Trạng thái dùng chung, chẳng hạn như trạng thái đóng/mở của `Drawer`, được quản lý ở cấp `Layout` và được truyền xuống cho các thành phần con cần thiết (`AppBar` và `Drawer`) để chúng có thể tương tác với nhau.

Việc hiểu rõ cấu trúc ở mức độ cao này là bước đầu tiên và quan trọng nhất. Nó sẽ mang lại cho bạn sự tự tin để bắt đầu tùy chỉnh, gỡ lỗi và xây dựng các tính năng mới cho ứng dụng của riêng mình một cách bài bản và hiệu quả.

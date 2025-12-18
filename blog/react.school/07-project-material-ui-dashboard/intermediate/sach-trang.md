# Sách Trắng: Các Chiến Lược Nâng Cao để Làm Chủ Việc Tùy Chỉnh Chủ Đề trong Material-UI

### Giới thiệu: Từ Mẫu Mặc Định đến một Ứng Dụng có Thương Hiệu

#

Trong phát triển ứng dụng hiện đại, một hệ thống chủ đề (theming system) nhất quán không chỉ là một yếu tố thẩm mỹ; nó là nền tảng của bản sắc thương hiệu, trải nghiệm người dùng và khả năng bảo trì mã nguồn. Một chủ đề được triển khai tốt sẽ đảm bảo tính đồng nhất về mặt hình ảnh trên toàn bộ ứng dụng, giúp người dùng dễ dàng tương tác và cho phép các nhà phát triển mở rộng quy mô sản phẩm một cách hiệu quả. Tài liệu này đóng vai trò là một hướng dẫn có thẩm quyền, phân tích quá trình chuyển đổi một mẫu Material-UI (MUI) tiêu chuẩn thành một ứng dụng được tùy chỉnh hoàn toàn, có thể mở rộng và có thể bảo trì. Chúng ta sẽ khám phá các chủ đề chính, bao gồm cấu trúc nền tảng của chủ đề MUI, các phương pháp hay nhất về kiến trúc để có thể mở rộng, triển khai chế độ tối động bằng React Hooks và Context, và tích hợp liền mạch với React Router để duy trì trạng thái. Mục tiêu của sách trắng này là trang bị cho các nhà phát triển React kiến thức để triển khai các chiến lược tùy chỉnh chủ đề tinh vi, nâng cao dự án của họ từ các mẫu chung chung thành các sản phẩm chuyên nghiệp, độc đáo.

\--------------------------------------------------------------------------------

## 1\. Nền tảng của Việc Tùy chỉnh Chủ đề trong Material-UI

#

Để thực hiện các tùy chỉnh nâng cao, điều quan trọng là phải hiểu rõ các thành phần cốt lõi của hệ thống chủ đề Material-UI. Việc nắm vững những khái niệm cơ bản này không chỉ là bước đầu tiên mà còn là điều kiện tiên quyết để xây dựng một kiến trúc chủ đề mạnh mẽ và linh hoạt. Chúng tạo thành nền móng mà trên đó tất cả các tùy chỉnh phức tạp hơn sẽ được xây dựng.

### 1.1. `ThemeProvider`: Trái tim của Hệ thống Chủ đề

#

Thành phần `ThemeProvider` là trung tâm của hệ thống chủ đề trong Material-UI. Vai trò của nó là truyền đối tượng chủ đề (theme object) xuống cây thành phần React thông qua context. Như dự án nguồn đã chứng minh, `ThemeProvider` phải là thành phần cấp cao nhất, hoặc ít nhất được đặt đủ cao trong cây thành phần để bao bọc tất cả các thành phần Material-UI khác. Đây là cơ chế mà qua đó đối tượng chủ đề được đưa vào thông qua context, giúp nó có sẵn ở mọi nơi cần thiết.

### 1.2. Khởi tạo Chủ đề với `createTheme`

#

Hàm `createTheme` là công cụ chính để tạo ra một đối tượng chủ đề. Khi được gọi mà không có bất kỳ đối số nào, nó sẽ trả về đối tượng chủ đề mặc định của Material-UI. Đây là một điểm khởi đầu tuyệt vời, cung cấp một bộ giá trị mặc định được thiết kế tốt cho màu sắc, kiểu chữ, khoảng cách và nhiều hơn nữa. Bằng cách kiểm tra đối tượng chủ đề mặc định này, các nhà phát triển có thể hiểu được cấu trúc của nó và xác định các thuộc tính mà họ muốn ghi đè.

### 1.3. Tùy chỉnh Cơ bản: Ghi đè Bảng màu (Palette)

#

Kỹ thuật tùy chỉnh cơ bản và phổ biến nhất là ghi đè bảng màu mặc định. Bảng màu xác định các màu sắc chính của ứng dụng, chẳng hạn như màu `primary` và `secondary`, được sử dụng cho các thành phần như `AppBar`, các nút chính và các điểm nhấn khác. Việc thay đổi màu `primary` của ứng dụng có thể được thực hiện một cách đơn giản.

- **Bước 1:** Truyền một đối tượng cấu hình vào hàm `createTheme`.
- **Bước 2:** Trong đối tượng cấu hình đó, chỉ định khóa `palette`.
- **Bước 3:** Bên trong `palette`, đặt một khóa `primary` để xác định màu chính của thương hiệu.
- **Bước 4:** Gán một đối tượng màu được nhập từ thư viện `@mui/material/colors` (ví dụ: `deepPurple`) làm giá trị cho khóa `primary`.

Việc triển khai rất ngắn gọn, chỉ cần vài dòng trong cấu hình chủ đề:

    import { createTheme } from '@mui/material/styles';
    import { deepPurple } from '@mui/material/colors';

    const theme = createTheme({
      palette: {
        primary: deepPurple,
      },
    });

Mặc dù việc tùy chỉnh bảng màu là rất quan trọng để xây dựng bản sắc thương hiệu, nhưng để ứng dụng có thể phát triển bền vững, việc cấu trúc mã nguồn một cách hợp lý là yếu tố then chốt cho khả năng mở rộng trong tương lai.

\--------------------------------------------------------------------------------

## 2\. Kiến trúc cho sự Mở rộng: Tái cấu trúc (Refactoring) và Cấu trúc

#

Một vấn đề phổ biến trong các dự án mẫu hoặc các ứng dụng ở giai đoạn đầu là tệp `App.js` trở nên quá tải, chứa đựng cả logic quản lý trạng thái, định nghĩa thành phần và cấu trúc giao diện. Việc tái cấu trúc chiến lược bằng cách phân tách các thành phần thành các tệp riêng biệt là một bước đi quan trọng để cải thiện khả năng đọc, bảo trì và khả năng mở rộng của ứng dụng.

### 2.1. Phân tách Logic Giao diện Người dùng thành các Thành phần Độc lập

#

Quá trình tái cấu trúc bắt đầu bằng việc xác định và trừu tượng hóa các phần logic của giao diện người dùng thành các thành phần độc lập, có thể tái sử dụng.

1.  **Xác định các Thành phần Tái sử dụng:** Các phần giao diện người dùng riêng biệt như `Copyright`, `AppBar`, và `Drawer` được xác định và tách ra khỏi `App.js` vào các tệp riêng của chúng (ví dụ: `Copyright.js`, `AppBar.js`). Hành động này giúp giảm sự lộn xộn trong `App.js` và làm cho cấu trúc tổng thể của ứng dụng trở nên rõ ràng hơn.
2.  **Truyền Đệ quy (Props):** Khi các thành phần được tách ra, chúng thường cần truy cập vào trạng thái hoặc các hàm được quản lý bởi thành phần cha. Chiến lược ở đây là truyền các trạng thái và hàm dùng chung, chẳng hạn như `open` (trạng thái hiển thị của drawer) và `toggleDrawer` (hàm để thay đổi trạng thái đó), dưới dạng props cho các thành phần con mới được tạo ra.
3.  **Quản lý Hằng số:** Cần phân biệt giữa trạng thái động và các giá trị tĩnh. Cách tiếp cận này được thực hiện một cách có chủ đích: các giá trị tĩnh, không thay đổi như `drawerWidth` có thể được xuất dưới dạng các hằng số đơn giản, trong khi các giá trị trạng thái động được quản lý bởi React Hooks _phải_ tồn tại trong phạm vi của thành phần, đòi hỏi chúng phải được truyền qua props.

### 2.2. Tập trung hóa Trạng thái Giao diện Người dùng

#

Lý do trạng thái quản lý việc bật/tắt drawer ban đầu được giữ lại trong thành phần `App` cấp cao nhất là một quyết định kiến trúc có chủ đích. Cả hai thành phần `AppBar` (chứa nút bật/tắt) và `Drawer` (thực sự hiển thị hoặc ẩn đi) đều cần truy cập vào cùng một trạng thái `open` và hàm `toggleDrawer`. Do đó, việc áp dụng mẫu "nâng trạng thái lên" (lifting state up) đến một thành phần cha chung là giải pháp cần thiết để đồng bộ hóa hành vi giữa các thành phần anh em này.

Đây là một bước đi cần thiết, nhưng cũng là một giải pháp tạm thời. Nó giải quyết được vấn đề trước mắt nhưng lại cho thấy những hạn chế của việc quản lý trạng thái dựa trên props, từ đó tạo ra một lý do thuyết phục hơn cho giải pháp dựa trên Context sẽ được giới thiệu trong phần tiếp theo.

\--------------------------------------------------------------------------------

## 3\. Nghiên cứu Tình huống Chuyên sâu: Triển khai Chế độ Tối Động

#

Việc triển khai một công tắc chế độ tối không chỉ là một tính năng nâng cao trải nghiệm người dùng mà còn là một bài toán kiến trúc thú vị. Nó đòi hỏi một cách tiếp cận để quản lý trạng thái chủ đề trên toàn cục một cách hiệu quả và có thể mở rộng. Phần này sẽ phân tích một kiến trúc nâng cao sử dụng React Context kết hợp với một Hook tùy chỉnh để tạo ra một hệ thống chủ đề động, mạnh mẽ và tách biệt rõ ràng.

### 3.1. Bộ não của Hoạt động: Hook tùy chỉnh `useTheme`

#

Trọng tâm của kiến trúc này là một Hook tùy chỉnh, được định nghĩa trong `Theme.js`, đóng vai trò là nguồn đáng tin cậy duy nhất (single source of truth) cho trạng thái chủ đề. Hook này có các trách nhiệm chính sau:

- **Quản lý Trạng thái:** Hook này quản lý trạng thái `themeOverrides`, là đối tượng chứa tất cả các tùy chỉnh sẽ được áp dụng cho chủ đề mặc định của Material-UI.
- **Tạo Ghi đè (Overrides):** Nó khởi tạo trạng thái bằng cách trước tiên kiểm tra `localStorage` với một hàm như `getDefaultTheme`. Nếu không có tùy chọn nào được lưu, nó sẽ sử dụng một hàm trợ giúp như `freshDefaultTheme` để tạo ra đối tượng ghi đè cốt lõi. Hàm này sẽ đặt thuộc tính `palette.mode` thành `'light'` hoặc `'dark'`, điều này tự động điều chỉnh phần lớn các thành phần MUI cho phù hợp.
- **Ghi đè Cấp Thành phần:** Ngoài chế độ sáng/tối chung, kiến trúc này cho phép các ghi đè chi tiết hơn. Ví dụ, nó có thể tùy chỉnh `backgroundColor` cho tất cả các thành phần `MuiCard` trên toàn cầu thông qua thuộc tính `styleOverrides`, đảm bảo tính nhất quán của thiết kế trong cả hai chế độ.
- **Hàm Chuyển đổi:** Hook này xuất ra một hàm, `setPaletteMode`, cho phép các thành phần khác kích hoạt việc chuyển đổi giữa chế độ sáng và tối. Hàm này sẽ cập nhật trạng thái `themeOverrides` với chế độ mới.

**Góc nhìn của Kiến trúc sư: Tại sao mẫu Hook/Context này lại vượt trội?**

Mặc dù phức tạp, kiến trúc này là giải pháp chuyên nghiệp để quản lý trạng thái toàn cục vì nhiều lý do chiến lược:

- **Tách biệt (Decoupling):** Nó tách biệt hoàn toàn logic _quản lý_ chủ đề (Hook `useTheme`) khỏi các thành phần giao diện người dùng _tiêu thụ_ nó (`DarkSwitch`). Điều này làm cho cả hai phần có thể được bảo trì và kiểm thử một cách độc lập.
- **API Rõ ràng (Clean API):** Nó cung cấp một API đơn giản và rõ ràng (`setPaletteMode`) cho phần còn lại của ứng dụng, che giấu các chi tiết triển khai nội bộ của việc cập nhật trạng thái và duy trì trong `localStorage`.
- **Ngăn chặn "Prop Drilling":** Kiến trúc này là giải pháp chuyên nghiệp để tránh việc truyền trạng thái chủ đề và các hàm cập nhật xuống nhiều lớp thành phần (prop drilling), một anti-pattern phổ biến trong các ứng dụng lớn, gây khó khăn cho việc bảo trì.

### 3.2. Cung cấp và Duy trì Trạng thái Chủ đề

#

Sau khi logic quản lý trạng thái được đóng gói trong Hook tùy chỉnh, trạng thái đó cần được cung cấp cho toàn bộ ứng dụng và duy trì qua các phiên làm việc của người dùng.

- **Cung cấp Ngữ cảnh (Context Provision):** Thay vì gọi Hook `useTheme` trong mọi thành phần, nó chỉ được gọi một lần duy nhất ở cấp cao nhất của ứng dụng (ví dụ, trong `Layout.js`). Các giá trị trả về của nó (`themeOverrides`, `setPaletteMode`) sau đó được truyền vào một `CustomThemeContext.Provider`, bao bọc phần còn lại của ứng dụng.
- **Tiêu thụ bởi** `**ThemeProvider**` **của MUI:** Bên trong Context Provider tùy chỉnh, thành phần `ThemeProvider` của Material-UI được sử dụng. Nó nhận đối tượng `muiTheme` (được tạo ra bằng cách kết hợp `themeOverrides` với chủ đề mặc định) và truyền nó xuống cây thành phần.
- **Duy trì bằng** `**localStorage**`**:** Để cải thiện trải nghiệm người dùng, Hook `useEffect` được sử dụng bên trong `useTheme`. Mục đích của nó là kiểm tra và lưu tùy chọn chế độ (sáng hoặc tối) của người dùng vào `localStorage`. Khi người dùng truy cập lại ứng dụng, Hook sẽ đọc giá trị này từ `localStorage` và áp dụng chủ đề ưa thích của họ, đảm bảo tính bền bỉ qua các phiên truy cập.

### 3.3. Tương tác Người dùng: Thành phần `DarkSwitch`

#

Kiến trúc này cho phép các thành phần giao diện người dùng tương tác với hệ thống chủ đề một cách đơn giản và tách biệt. Thành phần `DarkSwitch.js` là một ví dụ điển hình:

1.  **Xác định Trạng thái Hiện tại:** Nó sử dụng Hook `useContext` để truy cập vào `CustomThemeContext` và lấy ra `themeOverrides`. Bằng cách đánh giá điều kiện `themeOverrides.palette.mode === "dark"`, nó có thể xác định trạng thái `checked` của công tắc.
2.  **Kích hoạt Thay đổi:** Khi người dùng tương tác với công tắc, sự kiện `onChange` sẽ gọi hàm `setPaletteMode` (cũng được lấy từ context), truyền vào trạng thái mới của công tắc để cập nhật chủ đề trên toàn ứng dụng.

Kiến trúc này tách biệt hoàn toàn logic quản lý trạng thái chủ đề khỏi các thành phần giao diện người dùng tiêu thụ nó. Điều này tạo ra một hệ thống dễ bảo trì và mở rộng, đồng thời đảm bảo rằng trạng thái chủ đề được duy trì một cách nhất quán khi người dùng điều hướng trong ứng dụng.

\--------------------------------------------------------------------------------

## 4\. Tích hợp Chủ đề với Điều hướng Ứng dụng

#

Một trong những thách thức quan trọng khi xây dựng một ứng dụng đơn trang (SPA) là duy trì trạng thái toàn cục, như chế độ sáng/tối, một cách nhất quán khi người dùng điều hướng giữa các trang khác nhau. Nếu không được cấu trúc đúng cách, trạng thái chủ đề có thể bị đặt lại mỗi khi URL thay đổi, làm gián đoạn trải nghiệm người dùng. Việc tích hợp đúng cách với một thư viện định tuyến như React Router là rất quan trọng để giải quyết vấn đề này.

### 4.1. Thành phần `Layout` Bền bỉ

#

Mô hình kiến trúc hiệu quả nhất cho vấn đề này là sử dụng một thành phần `Layout.js` bền bỉ. Thay vì đặt logic thiết lập chủ đề và các thành phần giao diện người dùng chung vào mỗi trang riêng lẻ, chúng được tập trung vào thành phần `Layout`. Thành phần này chứa:

- Logic thiết lập chủ đề (bao gồm cả `CustomThemeContext.Provider` và `ThemeProvider` của MUI).
- Các thành phần giao diện người dùng chính và không thay đổi như `AppBar` và `Drawer`.
- Trạng thái liên quan đến layout, ví dụ như trạng thái mở/đóng của drawer.

Điều quan trọng nhất là, thay vì hiển thị nội dung trang cụ thể, thành phần `Layout` sẽ hiển thị thành phần `<Outlet/>` từ `react-router-dom`. Thành phần này hoạt động như một "chỗ giữ chỗ", nơi React Router sẽ hiển thị thành phần tương ứng với tuyến đường con hiện tại. Mẫu này đảm bảo rằng không chỉ trạng thái chủ đề được bảo toàn, mà bất kỳ trạng thái nào khác được quản lý trong `Layout` (như trạng thái mở/đóng của drawer) cũng được duy trì qua các thay đổi điều hướng, tạo ra một trải nghiệm người dùng thực sự liền mạch và giống như ứng dụng thay vì một loạt các trang bị ngắt kết nối.

### 4.2. Cấu trúc Định tuyến trong `App.js`

#

Với mô hình này, trách nhiệm của tệp `App.js` được thay đổi đáng kể. Thay vì chứa logic giao diện người dùng, nó trở thành trung tâm cấu hình định tuyến của ứng dụng. `App.js` sẽ thiết lập `BrowserRouter` và định nghĩa các cấu trúc `Routes` và `Route`.

Cấu trúc định tuyến sẽ có một tuyến đường cấp cao nhất hiển thị `element={<Layout/>}`. Điều này đảm bảo rằng thành phần `Layout` (và do đó là toàn bộ hệ thống chủ đề) luôn được hiển thị trên trang, bất kể người dùng đang ở tuyến đường nào. Các tuyến đường cụ thể cho từng trang (ví dụ: `/missions`) sẽ được định nghĩa là các tuyến đường con của tuyến đường `Layout` này. Nội dung của chúng sẽ được hiển thị bên trong `<Outlet/>` của `Layout`.

### 4.3. Giữ gìn Kiểu dáng Chủ đề trong các Liên kết Điều hướng

#

Sự tích hợp giữa Material-UI và React Router còn sâu sắc hơn ở cấp độ thành phần. Material-UI cung cấp một thuộc tính `component` linh hoạt, cho phép thay đổi phần tử HTML gốc của một thành phần. Điều này rất hữu ích khi tích hợp với các liên kết điều hướng.

Ví dụ, trong mã `<ListItemButton to="/" component={Link}/>`, chúng ta đang làm hai việc cùng một lúc:

1.  Sử dụng chức năng điều hướng của thành phần `Link` từ React Router thông qua thuộc tính `to`.
2.  Giữ lại hoàn toàn tất cả các kiểu dáng, hiệu ứng hover và trạng thái của thành phần `ListItemButton` từ chủ đề Material-UI hiện tại.

Nếu không có thuộc tính `component` này, việc sử dụng một thẻ `<Link>` tiêu chuẩn của React Router sẽ dẫn đến một phần tử hoạt động đúng chức năng nhưng lại gây khó chịu về mặt hình ảnh, được tạo kiểu như một siêu liên kết màu xanh, có gạch chân mặc định, phá vỡ hoàn toàn hệ thống thiết kế của ứng dụng.

\--------------------------------------------------------------------------------

## 5\. Kết luận: Tổng hợp các Chiến lược để Thành thạo

#

Việc chuyển đổi một ứng dụng Material-UI từ một mẫu tiêu chuẩn thành một sản phẩm chuyên nghiệp, có thương hiệu và có khả năng bảo trì cao đòi hỏi một cách tiếp cận có chiến lược đối với việc tùy chỉnh chủ đề. Sách trắng này đã phân tích một lộ trình rõ ràng, từ những nền tảng cơ bản đến các kiến trúc nâng cao, cho phép các nhà phát triển làm chủ hệ thống chủ đề của MUI.

Các chiến lược cấp cao đã được thảo luận bao gồm:

- **Thiết lập Nền tảng:** Bắt đầu bằng cách hiểu rõ vai trò trung tâm của `ThemeProvider` và thực hiện các tùy chỉnh cơ bản thông qua việc ghi đè `palette` bằng `createTheme`.
- **Kiến trúc để Mở rộng:** Tái cấu trúc một ứng dụng nguyên khối bằng cách phân tách các thành phần giao diện người dùng thành các tệp riêng biệt và tập trung hóa trạng thái cấp ứng dụng bằng cách "nâng trạng thái lên".
- **Triển khai Chủ đề Động:** Tận dụng sức mạnh của React Hooks và Context để xây dựng một hệ thống quản lý trạng thái chủ đề tinh vi, tách biệt và có thể mở rộng, chẳng hạn như triển khai chế độ tối động và duy trì nó bằng `localStorage`.
- **Tích hợp Định tuyến:** Sử dụng một thành phần `Layout` bền bỉ kết hợp với `Outlet` của React Router để đảm bảo tính nhất quán của chủ đề và trạng thái giao diện người dùng trên các tuyến đường khác nhau trong một ứng dụng đơn trang.

Bằng cách áp dụng các kỹ thuật này một cách hệ thống, các nhà phát triển có thể vượt qua những giới hạn của các mẫu mặc định. Cuối cùng, những chiến lược này thể hiện một nguyên tắc cốt lõi của kiến trúc frontend có khả năng mở rộng: sự tách biệt các mối quan tâm một cách chu đáo. Bằng cách cô lập logic trạng thái, trình bày giao diện người dùng và cấu hình định tuyến, các nhà phát triển xây dựng các hệ thống không chỉ nhất quán về mặt hình ảnh mà còn có khả năng phục hồi, dễ bảo trì và sẵn sàng cho sự phức tạp trong tương lai.

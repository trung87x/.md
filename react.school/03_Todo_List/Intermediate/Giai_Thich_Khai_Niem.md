# Hiểu về Styled-Components: Tạo kiểu cho ứng dụng React của bạn

Chào mừng bạn đến với thế giới tạo kiểu trong React! Styled-components là một công cụ mạnh mẽ và sáng tạo, cho phép bạn viết CSS ngay bên trong các tệp JavaScript của mình. Khi các ứng dụng React phát triển lớn hơn, việc quản lý CSS có thể trở nên phức tạp, dẫn đến các vấn đề như xung đột tên class hoặc khó theo dõi kiểu nào đang áp dụng cho component nào. Styled-components ra đời để giải quyết chính những thách thức này. Phương pháp này giúp việc tạo kiểu cho các thành phần (components) React trở nên trực quan và dễ quản lý hơn bằng cách kết hợp logic của một component và phần kiểu dáng của nó ở cùng một nơi, giúp mã nguồn của bạn trở nên gọn gàng và dễ bảo trì.

\--------------------------------------------------------------------------------

### 1\. Bắt đầu với Styled-Components

Để bắt đầu, hãy cùng tìm hiểu cách tích hợp `styled-components` vào một dự án React.

**Cài đặt**

Việc thêm `styled-components` vào dự án của bạn rất đơn giản. Trong môi trường sandbox (như các nền tảng học code trực tuyến), bạn có thể chỉ cần thêm thư viện vào tệp `package.json`. Đối với một dự án được phát triển trên máy tính cá nhân (local), bạn sẽ sử dụng một trình quản lý gói như `yarn` hoặc `npm` để cài đặt.

**Nhập thư viện**

Sau khi cài đặt, bước đầu tiên trong bất kỳ tệp nào bạn muốn sử dụng styled-components là nhập thư viện. Đây là cách bạn truy cập vào chức năng cốt lõi của nó.

    import styled from 'styled-components';

Đây là câu lệnh cơ bản để bắt đầu tạo ra các component được tạo kiểu trong ứng dụng React của bạn. Bây giờ khi đã thiết lập xong, chúng ta hãy cùng nhau tạo ra component được tạo kiểu đầu tiên.

\--------------------------------------------------------------------------------

### 2\. Tạo Component được tạo kiểu đầu tiên của bạn

Cú pháp của styled-components rất trực quan, giúp bạn viết CSS một cách tự nhiên.

**Cú pháp cơ bản:** `**styled.element**`

Cú pháp cốt lõi bao gồm việc gọi hàm `styled` với một thẻ HTML (ví dụ: `h1`, `div`, `button`), theo sau là một template literal (cặp dấu backtick `` ` ``). Bên trong cặp dấu này, bạn có thể viết CSS hoàn toàn bình thường. Hãy xem ví dụ về việc tạo một component `Header` tùy chỉnh từ thẻ `<h1>`:

    const Header = styled.h1`
      font-size: 24px;
    `;

Thao tác này không chỉ tạo ra các kiểu CSS; nó tạo ra một component React mới có tên là `Header`, mà bạn có thể sử dụng trong JSX với các thẻ `<Header>` và `</Header>`.

**Ví dụ thực tế: Nút (Button) và Trạng thái Hover**

Hãy tạo một component thực tế hơn: một `Button` (nút bấm) cơ bản. Chúng ta cũng sẽ thêm kiểu cho trạng thái `hover` bằng cách sử dụng bộ chọn `&:hover` ngay bên trong khối kiểu.

    const Button = styled.button`
      background-color: #007bff;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      border: none;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
    `;

Tiếp theo, hãy tạo một biến thể là `IconButton` (nút biểu tượng) có nền trong suốt, thường được dùng cho các nút chỉ chứa icon.

    const IconButton = styled.button`
      background: transparent;
      border: none;
      cursor: pointer;
    `;

Việc xử lý các trạng thái tĩnh như `hover` là rất hữu ích, nhưng sức mạnh thực sự của styled-components được bộc lộ khi chúng ta làm cho các kiểu đó phản ứng động với dữ liệu từ component của mình.

\--------------------------------------------------------------------------------

### 3\. Sức mạnh của Props: Tạo kiểu động

Đây là một trong những tính năng mạnh mẽ nhất của styled-components. Bạn có thể thay đổi giao diện của một component dựa trên các `props` được truyền vào nó.

**Giới thiệu về Props trong Styled-Components**

Giống như bất kỳ component React nào, bạn có thể truyền props cho các component được tạo kiểu. Các props này sau đó có thể được truy cập bên trong khối CSS để áp dụng kiểu một cách có điều kiện.

**Ví dụ: Kiểu dựa trên trạng thái** `**complete**`

Hãy tưởng tượng bạn có một danh sách công việc và muốn làm mờ các công việc đã hoàn thành. Bạn có thể tạo một component `TaskRow` thay đổi kiểu dáng dựa trên một prop tên là `complete`. Để truy cập props, bạn sử dụng cú pháp `${({ propName }) => ...}` bên trong template literal.

    const TaskRow = styled.div`
      /* các kiểu khác ở đây */
      padding: 8px;
      margin: 4px 0;

      ${({ complete }) =>
        complete &&
        `
        opacity: 0.3;
      `}
    `;

**Phân tích khối mã:**

- Component `TaskRow` nhận một prop là `complete`.
- Bên trong khối `styled`, biểu thức `${...}` cho phép chúng ta viết JavaScript.
- `({ complete }) => ...` là một hàm nhận vào đối tượng props và thực hiện destructuring để lấy ra giá trị của `complete`.
- `complete && ...` là một biểu thức logic: nếu `complete` là `true`, khối CSS bên trong (với `opacity: 0.3`) sẽ được áp dụng. Nếu không, nó sẽ bị bỏ qua.

Đây chính là sức mạnh của React và styled-components kết hợp: giao diện của bạn (UI) tự động phản ứng với dữ liệu (state) mà không cần can thiệp thủ công vào DOM. Khi dự án của bạn phát triển, việc giữ cho mã nguồn có tổ chức là rất quan trọng. Hãy cùng xem một vài phương pháp hay để làm điều đó.

\--------------------------------------------------------------------------------

### 4\. Tổ chức Code và các Mẫu hình nâng cao

Duy trì một cấu trúc mã sạch sẽ giúp bạn dễ dàng mở rộng và bảo trì ứng dụng.

**Tách các Component thành các tệp riêng**

Khi ứng dụng của bạn trở nên phức tạp hơn, việc giữ tất cả các styled-components trong tệp `App.js` sẽ gây ra sự lộn xộn. Một phương pháp hay là di chuyển các component có thể tái sử dụng (ví dụ: `Button.js`, `Card.js`) ra các tệp riêng. Lợi ích của việc này bao gồm:

- **Mã sạch hơn:** Tách biệt rõ ràng giữa logic nghiệp vụ và mã tạo kiểu.
- **Tái sử dụng:** Dễ dàng `import` và sử dụng lại các component được tạo kiểu trên toàn bộ ứng dụng của bạn.

**Mở rộng Kiểu (Extending Styles)**

Đôi khi bạn muốn tạo một component mới dựa trên một component đã có, chỉ thay đổi hoặc thêm một vài thuộc tính. Thay vì sao chép toàn bộ CSS, bạn có thể "mở rộng" component cơ sở. Ví dụ, giả sử component `Button` đã được định nghĩa ở đâu đó, và bạn muốn tạo một `IconButton` có tất cả các kiểu của `Button` nhưng với nền trong suốt.

Cú pháp `styled(BaseComponent)` cho phép bạn tạo một component mới kế thừa tất cả các kiểu từ `BaseComponent` và sau đó thêm hoặc ghi đè các kiểu cần thiết.

    // Giả sử component Button đã được định nghĩa ở một tệp khác và được import vào.
    // IconButton kế thừa tất cả các kiểu từ Button và ghi đè một thuộc tính.
    const IconButton = styled(Button)`
      background: transparent;
    `;

Với những kỹ thuật này, bạn đã sẵn sàng để xây dựng các giao diện phức tạp và có tổ chức. Hãy cùng tóm tắt lại những gì chúng ta đã học.

\--------------------------------------------------------------------------------

### 5\. Kết luận

Styled-components cung cấp một cách tiếp cận mạnh mẽ và trực quan để tạo kiểu cho các ứng dụng React. Bằng cách cho phép bạn viết CSS ngay trong JavaScript, nó giúp kết hợp logic và giao diện của component, thúc đẩy khả năng tái sử dụng và giúp mã nguồn có tổ chức hơn. Bạn đã học cách cài đặt, tạo component cơ bản, sử dụng props để tạo kiểu động, và các kỹ thuật nâng cao như mở rộng kiểu. Đừng ngần ngại thử nghiệm với các ví dụ này và khám phá các tính năng nâng cao hơn của thư viện khi bạn tiếp tục hành trình xây dựng các ứng dụng React đẹp và chức năng.

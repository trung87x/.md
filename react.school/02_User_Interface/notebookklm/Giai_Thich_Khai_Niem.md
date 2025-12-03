# Hiểu về các Thành phần trong React: Hướng dẫn cho Người mới bắt đầu

### Giới thiệu

# 

Chào mừng bạn đến với thế giới xây dựng giao diện người dùng (UI) trong React! Nếu bạn mới bắt đầu, việc hiểu cách các thành phần (components) hoạt động có thể là một thử thách. Tài liệu này được thiết kế để làm sáng tỏ quá trình đó bằng cách tập trung vào ba khái niệm cốt lõi: cách một component phản ứng với hành động của bạn, cách nó "ghi nhớ" thông tin, và cách làm cho nó trông đẹp mắt. Mục tiêu của chúng tôi là giải thích ba trụ cột này: xử lý sự kiện, quản lý trạng thái và tạo kiểu.

\--------------------------------------------------------------------------------

## 1\. Khái niệm 1: Xử lý Tương tác Người dùng với Sự kiện (Events)

# 

Mọi giao diện người dùng đều bắt đầu bằng sự tương tác. Hướng dẫn này sẽ bắt đầu bằng việc giải thích cách các thành phần React phản hồi lại hành động của người dùng, chẳng hạn như một cú nhấp chuột hay việc nhập liệu.

### 1.1. Lắng nghe hành động: `onClick`

# 

Cách cơ bản nhất để làm cho một thành phần có tính tương tác là xử lý sự kiện nhấp chuột. Trong React, chúng ta thực hiện điều này thông qua thuộc tính `onClick`.

Hãy xem xét ví dụ về một nút HTML đơn giản trong React:

    function sayHello() {
      alert('You clicked me!');
    }
    
    <button onClick={sayHello}>Default</button>
    

Ở đây, thuộc tính `onClick` không nhận một đoạn văn bản, mà là một **hàm** (`sayHello`). Mỗi khi người dùng nhấp vào nút này, React sẽ thực thi hàm đó. Đây chính là cách React kết nối một hành động vật lý của người dùng (nhấp chuột) với logic của ứng dụng (hiển thị một cảnh báo).

### 1.2. Không chỉ là nhấp chuột: `onChange`

# 

Bên cạnh `onClick`, có nhiều loại sự kiện khác. Một trong những sự kiện quan trọng nhất là `onChange`, thường được sử dụng cho các thẻ input như ô văn bản (text input) và ô kiểm (checkbox). Đối với một ô kiểm, sự kiện `onChange` sẽ được kích hoạt mỗi khi người dùng tương tác với nó, dù bằng chuột hay bàn phím (điều này rất quan trọng cho khả năng truy cập, đảm bảo người dùng điều hướng bằng bàn phím vẫn có thể sử dụng ứng dụng của bạn).

Cách tiếp cận này là nền tảng trong React vì nó thiết lập một "nguồn chân lý" duy nhất—chính là trạng thái của component. Điều này giúp việc triển khai các tính năng như xác thực theo thời gian thực, đếm ký tự, hoặc vô hiệu hóa nút gửi cho đến khi form hợp lệ trở nên dễ dàng hơn nhiều. Điều này dẫn đến một nguyên tắc cơ bản trong React:

Trong React, chúng ta không để trình duyệt tự quản lý giá trị của input. Thay vào đó, chúng ta sử dụng các sự kiện như `onChange` để cập nhật "trạng thái" của thành phần, một khái niệm mà chúng ta sẽ khám phá ngay sau đây.

Việc xử lý sự kiện cho chúng ta biết _khi nào_ cần làm gì đó, nhưng làm thế nào để component 'ghi nhớ' các thay đổi? Câu trả lời nằm ở khái niệm tiếp theo: trạng thái.

\--------------------------------------------------------------------------------

## 2\. Khái niệm 2: "Bộ não" của Component - Quản lý Trạng thái (State)

# 

**Trạng thái (state)** chính là "bộ nhớ" của một thành phần. Nó cho phép component theo dõi thông tin và thay đổi giao diện theo thời gian để phản hồi lại tương tác của người dùng. Công cụ chính của React để quản lý trạng thái trong các component hàm là **Hook** `**useState**`.

### 2.1. Giới thiệu Hook `useState`

# 

`useState` là một hàm đặc biệt do React cung cấp, cho phép chúng ta "gắn" trạng thái vào các thành phần. Hãy xem cú pháp khởi tạo trạng thái để theo dõi việc một cửa sổ Modal đang mở hay đóng:

    const [open, setOpen] = useState(false);
    

Cú pháp đặc biệt `const [open, setOpen]` này được gọi là "Array Destructuring". Đây là một tính năng của JavaScript cho phép chúng ta "bung" các giá trị từ một mảng ra thành các biến riêng biệt. `useState` luôn trả về một mảng có hai phần tử: giá trị trạng thái hiện tại và một hàm để cập nhật nó.

Hãy cùng phân tích cú pháp này:

-   `open`: Đây là **biến trạng thái**. Nó chứa giá trị hiện tại của trạng thái (trong trường hợp này là `false`, nghĩa là Modal đang đóng).
-   `setOpen`: Đây là **hàm setter**. Chúng ta sử dụng hàm này để cập nhật giá trị của `open`.
-   `useState(false)`: Lệnh này khởi tạo trạng thái. Giá trị được truyền vào (`false`) là giá trị ban đầu của trạng thái.

### 2.2. Trạng thái trong thực tế: Xây dựng Component Nút Chuyển đổi (Toggle)

# 

Hãy xem cách trạng thái và sự kiện kết hợp với nhau qua ví dụ về một nhóm các nút chuyển đổi (giống như các tab). Để xây dựng chức năng này, chúng ta cần "theo dõi trạng thái của nút nào đang được bật".

Logic hoạt động như sau:

-   **Bước 1: Khởi tạo trạng thái:** Đầu tiên, chúng ta khởi tạo một biến trạng thái để lưu giữ định danh của nút đang hoạt động. Giả sử nút đầu tiên được kích hoạt mặc định:
-   **Bước 2: Hiển thị dựa trên trạng thái:** Khi render danh sách các nút, chúng ta kiểm tra xem `type` của mỗi nút có khớp với giá trị `active` trong trạng thái hay không. Nếu khớp, chúng ta sẽ áp dụng một kiểu dáng đặc biệt (ví dụ: không làm mờ nút đó).
-   **Bước 3: Cập nhật trạng thái khi nhấp chuột:** Mỗi nút sẽ có một sự kiện `onClick`. Khi được nhấp, nó sẽ gọi hàm setter (`setActive`) và truyền vào `type` của chính nó.
-   Ở đây, `'Type 2'` là chuỗi định danh duy nhất cho Nút 2. Đây là cách trình xử lý `onClick` "báo" cho React biết nút nào nên được kích hoạt.

Điều kỳ diệu xảy ra khi hàm `setActive` được gọi: **React sẽ tự động render lại thành phần** với giá trị trạng thái mới. Giao diện người dùng sẽ được cập nhật một cách liền mạch để phản ánh sự thay đổi này.

Hãy chú ý đến mẫu thiết kế này: dùng `useState` để theo dõi một mục "đang hoạt động". Nó cực kỳ linh hoạt. Logic tương tự có thể được áp dụng để xây dựng một component hoạt động và trông giống như một bộ các thẻ điều hướng (tabs).

### 2.3. Khái niệm quan trọng: Controlled Components

# 

Khi kết hợp trạng thái với các thẻ input, chúng ta tạo ra một khái niệm gọi là **"controlled component"** (thành phần được kiểm soát). Điều này có nghĩa là giá trị của thẻ input được "kiểm soát" hoàn toàn bởi trạng thái của React, chứ không phải bởi DOM của trình duyệt. Đây là cách tiếp cận tiêu chuẩn trong các ứng dụng React, vì hầu hết thời gian bạn sẽ muốn biến trạng thái này tồn tại trong ứng dụng của mình, ví dụ như để thực hiện xác thực theo thời gian thực.

Bảng dưới đây so sánh sự khác biệt chính:

| Đặc điểm | Controlled Component (React) | Uncontrolled Component (HTML) |
| --- | --- | --- |
| **Nguồn chân lý** | Trạng thái của React (`state`) | DOM của trình duyệt |
| **Cập nhật giá trị** | Thông qua hàm `onChange` và `useState` | Trình duyệt xử lý tự động |
| **Trường hợp sử dụng** | Lý tưởng cho các form yêu cầu xác thực theo thời gian thực hoặc khi giá trị của input cần được sử dụng ở nơi khác trong UI | Các form đơn giản, không cần theo dõi trạng thái liên tục |

Bây giờ component của chúng ta đã có thể phản hồi và ghi nhớ, hãy cùng làm cho nó trông đẹp mắt hơn với việc tạo kiểu.

\--------------------------------------------------------------------------------

## 3\. Khái niệm 3: Tạo "Diện mạo" cho Component - Tạo kiểu (Styling)

# 

Các thẻ HTML mặc định như `<button>` thường có giao diện lỗi thời do các quy tắc CSS mặc định của trình duyệt. React cung cấp nhiều cách để tạo kiểu, và một trong những phương pháp phổ biến là sử dụng thư viện `styled-components`.

### 3.1. Vượt qua giới hạn của CSS mặc định

# 

Các trình duyệt áp dụng một bộ quy tắc CSS mặc định (gọi là _user agent stylesheet_) lên các thẻ HTML. Điều này khiến cho các nút và input trông cũ kỹ và không nhất quán giữa các trình duyệt.

`styled-components` là một thư viện cho phép bạn viết mã CSS thực thụ trực tiếp bên trong các file component React của mình, giúp tạo ra các thành phần có kiểu dáng độc lập và dễ dàng tái sử dụng. Quan trọng hơn, `styled-components` cho phép chúng ta tự động thay đổi giao diện của một component dựa trên trạng thái và props của nó, tạo ra một liên kết mạnh mẽ giữa logic và hình ảnh.

### 3.2. "Tân trang" một chiếc nút

# 

Hãy xem cách chúng ta có thể biến một chiếc nút mặc định thành một phiên bản hiện đại hơn. Với `styled-components`, chúng ta có thể tạo một component `Button` mới với các kiểu dáng tùy chỉnh:

    const Button = styled.button`
      background-color: black;
      color: white;
      font-size: 20px;
      padding: 10px 60px;
      border-radius: 5px;
      cursor: pointer;
    `;
    

Chỉ với 5 thay đổi đơn giản, chúng ta đã có một chiếc nút trông hiện đại hơn rất nhiều:

-   Thay đổi `background-color` (màu nền).
-   Tăng `font-size` (cỡ chữ).
-   Thêm `padding` (khoảng đệm bên trong).
-   Thêm `border-radius` (bo tròn góc).
-   Thay đổi `cursor` (con trỏ chuột) thành dạng con trỏ chỉ, để báo hiệu cho người dùng rằng đây là một phần tử có thể nhấp vào.

### 3.3. Tạo kiểu có điều kiện

# 

Sức mạnh thực sự của `styled-components` là khả năng thay đổi kiểu dáng một cách linh hoạt dựa trên `props` hoặc trạng thái của component. Ví dụ, chúng ta có thể làm cho nút trông khác đi khi nó bị vô hiệu hóa (`disabled`).

    const Button = styled.button`
      /* ... các kiểu dáng cơ bản ở trên ... */
    
      &:disabled {
        color: grey;
        opacity: 0.7;
        cursor: default;
      }
    `;
    

Ký hiệu `&` trong `styled-components` là một tính năng mạnh mẽ, nó tham chiếu ngược lại chính component đó. Vì vậy, `&:disabled` có thể dịch là: "hãy áp dụng các kiểu này cho tôi, component `Button`, nhưng chỉ khi tôi có thuộc tính HTML là `disabled`." Điều này cho thấy cách trạng thái (ví dụ: nút có bị vô hiệu hóa hay không) có thể trực tiếp ảnh hưởng đến giao diện.

Chúng ta đã tìm hiểu riêng lẻ từng khái niệm, giờ là lúc kết hợp tất cả chúng lại để thấy sức mạnh tổng hợp.

\--------------------------------------------------------------------------------

## 4\. Tổng kết: Ba Trụ cột của một Component React

# 

Qua ba khái niệm trên, bạn đã nắm được những nguyên tắc nền tảng để xây dựng các thành phần giao diện người dùng trong React. Hãy cùng tóm tắt lại:

1.  **Xử lý Sự kiện:** Dùng `onClick` và `onChange` để _thổi hồn_ vào các component, cho phép chúng phản hồi lại người dùng.
2.  **Quản lý Trạng thái:** Dùng `useState` để trao cho component một "bộ nhớ", cho phép nó _ghi nhớ các lựa chọn của người dùng_ và thay đổi một cách thông minh.
3.  **Tạo kiểu:** Dùng các công cụ như `styled-components` để tạo ra một giao diện độc đáo, hấp dẫn và có khả năng thay đổi một cách linh hoạt dựa trên trạng thái và props của component.

Ba trụ cột này không tồn tại riêng rẽ mà có mối liên kết sâu sắc với nhau. Sự kiện (`onClick`) kích hoạt việc cập nhật trạng thái (`useState`), và trạng thái mới đó, đến lượt nó, lại có thể thay đổi kiểu dáng (`styled-components`) của component, tạo ra một trải nghiệm người dùng liền mạch và linh động.

Việc nắm vững ba khái niệm này sẽ là nền tảng vững chắc để bạn tự tin xây dựng hầu hết mọi loại thành phần giao diện người dùng, từ những chiếc nút đơn giản đến các ứng dụng web phức tạp trong React.
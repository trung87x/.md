# Giải mã JSX: Cú pháp "lai" giữa HTML và JavaScript trong React

### Lời mở đầu

Chào mừng bạn đến với thế giới của React! Nếu bạn mới bắt đầu, có thể bạn sẽ gặp một khái niệm trông vừa quen vừa lạ: JSX. Nó trông giống như HTML, nhưng lại nằm ngay bên trong các tệp JavaScript. Hướng dẫn này sẽ làm sáng tỏ JSX, một công cụ nền tảng trong React, giúp bạn hiểu rõ tại sao nó tồn tại, cách nó hoạt động và làm thế nào để sử dụng nó một cách hiệu quả. Mục tiêu của chúng tôi là biến một khái niệm có vẻ phức tạp trở nên đơn giản và dễ hiểu, trang bị cho bạn kiến thức cần thiết để bắt đầu hành trình lập trình React của mình.

\--------------------------------------------------------------------------------

### 1\. JSX là gì? Không chỉ là HTML trong JavaScript

Về cốt lõi, **JSX (JavaScript XML)** là một phần mở rộng cú pháp cho JavaScript. Nó cho phép bạn viết mã trông rất giống HTML ngay trong các tệp JavaScript của mình. Đây chính là điều làm cho React trở nên độc đáo: nó kết hợp "markup (đánh dấu) với scripting (kịch bản) một cách liền mạch".

Tuy nhiên, điều quan trọng cần làm rõ là:

-   JSX **không phải** là JavaScript tiêu chuẩn. Trình duyệt không thể đọc trực tiếp JSX. Nó cần được biên dịch (thường bởi một công cụ như Babel) thành các lệnh gọi hàm JavaScript thông thường.
-   JSX **không phải** là HTML thuần túy. Mặc dù trông giống nhau, JSX có những quy tắc riêng biệt và nghiêm ngặt hơn.

Hãy xem một ví dụ về một functional component đơn giản trong React:

    function App() {
      return <h1>The Captain's Crew</h1>;
    }
    

Ở đây, `function App() { ... }` là một Functional Component—về cơ bản là một hàm JavaScript thông thường, nhưng điểm đặc biệt là nó trả về mã trông giống HTML để React có thể hiển thị ra giao diện. Đoạn mã `<h1>The Captain's Crew</h1>` chính là JSX. Nó trông giống hệt HTML, nhưng nó đang được trả về từ một hàm JavaScript. Mặc dù cú pháp này có vẻ quen thuộc, JSX có những quy tắc và sức mạnh riêng mà chúng ta sẽ khám phá ngay sau đây.

### 2\. Các khác biệt cốt lõi giữa JSX và HTML

Hiểu rõ những khác biệt chính giữa JSX và HTML là chìa khóa để tránh các lỗi phổ biến khi bạn mới bắt đầu với React. Dưới đây là những quy tắc quan trọng nhất.

#### 2.1. Quy tắc 1: Mọi thẻ đều phải được đóng

Trong HTML, một số thẻ như `<img>` hoặc `<br>` không bắt buộc phải có thẻ đóng. Tuy nhiên, trong JSX, **mọi thẻ đều phải được đóng**. Đối với các thẻ không có nội dung bên trong (còn gọi là thẻ tự đóng), bạn phải thêm dấu gạch chéo ở cuối.

-   **HTML hợp lệ:** `<img src="cat.jpg">`
-   **JSX bắt buộc:** `<img src="cat.jpg"/>`

Điều này áp dụng cho tất cả các thẻ tương tự, chẳng hạn như `<input/>` hay `<br/>`. Lưu ý rằng các thẻ này được gọi là 'void elements'. Bạn sẽ gặp lỗi nếu cố gắng viết chúng với một thẻ đóng đầy đủ, ví dụ `<img></img>`.

#### 2.2. Quy tắc 2: Thuộc tính (Attributes) và từ khóa dành riêng

Vì JSX về cơ bản là JavaScript, một số thuộc tính trong HTML lại là các từ khóa dành riêng (reserved words) trong JavaScript. Do đó, chúng cần được thay đổi trong JSX.

Ví dụ kinh điển nhất là thuộc tính `class`. Trong JavaScript, `class` được dùng để định nghĩa một lớp (class), vì vậy bạn không thể sử dụng nó trong JSX. Thay vào đó, bạn phải dùng `className`.

    // HTML: <div class="profile-card">
    // JSX:
    <div className="profile-card">
    

#### 2.3. Quy tắc 3: Tên thuộc tính theo kiểu camelCase

Các thuộc tính HTML có nhiều từ, thường được viết bằng chữ thường (ví dụ: `onclick`), phải được chuyển đổi sang quy ước **camelCase** trong JSX. Đây là một quy ước nhất quán, đặc biệt đối với các trình xử lý sự kiện (event handlers).

-   `onclick` trở thành `onClick`
-   `onkeydown` trở thành `onKeyDown`

Sự thay đổi về cách viết hoa chỉ là bề nổi. Điểm khác biệt quan trọng hơn nằm ở giá trị mà thuộc tính này nhận vào: HTML `onclick` nhận một **chuỗi** chứa mã JavaScript, trong khi JSX `onClick` yêu cầu một **tham chiếu hàm (function reference)**. Việc truyền trực tiếp một hàm cho phép trình xử lý sự kiện tương tác với trạng thái (state) và props của component, đây chính là cốt lõi của tính tương tác trong React.

    // HTML: <button onclick="alert('Clicked!')">Click Me</button>
    // JSX: <button onClick={handleClickFunction}>Click Me</button>
    

#### 2.4. Quy tắc 4: Khai báo Style như một đối tượng JavaScript

Đây là một trong những khác biệt lớn nhất. Trong HTML, thuộc tính `style` nhận vào một chuỗi (string) các quy tắc CSS. Ngược lại, trong JSX, thuộc tính `style` phải nhận vào một **đối tượng JavaScript (object)**.

-   Các thuộc tính CSS có dấu gạch ngang (kebab-case) như `background-color` phải được viết theo kiểu camelCase: `backgroundColor`.
-   Giá trị của các thuộc tính style phải được đặt trong dấu nháy, biến chúng thành một chuỗi JavaScript (ví dụ: `color: 'blue'`).
-   **HTML:**
-   **JSX:**

**Lưu ý:** Bạn có thấy dấu ngoặc nhọn kép `{{...}}` không?

-   Cặp ngoặc nhọn **bên ngoài** báo cho JSX biết rằng chúng ta sắp chèn một biểu thức JavaScript.
-   Cặp ngoặc nhọn **bên trong** dùng để định nghĩa đối tượng JavaScript chứa các style.

#### Bảng tổng hợp

Để dễ dàng tham khảo, đây là bảng tóm tắt các khác biệt chính:

| Tính năng | Cú pháp HTML | Cú pháp JSX |
| --- | --- | --- |
| **Thẻ tự đóng** | `<img src="cat.jpg">` | `<img src="cat.jpg"/>` |
| **Thuộc tính** `**class**` | `<div class="container">` | `<div className="container">` |
| **Sự kiện** | `<button onclick="...">` | `<button onClick={myFunction}>` |
| **Inline Style** | `style="color: blue;"` | `style={{ color: 'blue' }}` |

Sau khi nắm vững các quy tắc cú pháp, giờ là lúc khám phá sức mạnh thực sự của JSX.

### 3\. Sức mạnh của JSX: Nhúng JavaScript bằng dấu `{}`

Điểm mạnh lớn nhất của JSX là khả năng nhúng trực tiếp các biểu thức JavaScript vào trong markup. Cặp dấu ngoặc nhọn `{}` chính là "cánh cổng thần kỳ" cho phép bạn đưa sự năng động của JavaScript vào giao diện người dùng.

Bất kỳ **biểu thức** JavaScript hợp lệ nào (tức là đoạn mã trả về một giá trị) đều có thể được đặt bên trong dấu ngoặc nhọn.

Dưới đây là một vài ví dụ về những gì bạn có thể đặt bên trong `{}`:

-   **Biến:** Hiển thị giá trị của một biến hoặc hằng số.
-   **Phép toán:** Thực hiện các phép tính và hiển thị kết quả.
-   **Gọi hàm:** Hiển thị giá trị trả về từ một hàm.

Một điều cực kỳ quan trọng cần phân biệt là **biểu thức (expression)** và **câu lệnh (statement)**.

-   **Biểu thức** là thứ trả về một giá trị (ví dụ: `2 + 2`, `user.name`, `myFunction()`).
-   **Câu lệnh** là thứ thực hiện một hành động nhưng không trả về giá trị (ví dụ: `if...else`, vòng lặp `for`, `while`).

Bạn **không thể** đặt các câu lệnh như `if`, `for` hoặc một đối tượng JavaScript thô (plain JavaScript object) trực tiếp bên trong `{}`. Khả năng nhúng biểu thức này mở ra các kỹ thuật mạnh mẽ như hiển thị có điều kiện và render danh sách một cách linh hoạt.

### 4\. Quy tắc cấu trúc trong JSX: Luôn có một "phụ huynh" duy nhất

Một trong những lỗi phổ biến nhất mà người mới bắt đầu gặp phải là: _"Adjacent JSX elements must be wrapped in an enclosing tag."_ (Các phần tử JSX liền kề phải được bao bọc trong một thẻ chứa).

Điều này có nghĩa là một component React chỉ có thể trả về **một phần tử gốc duy nhất**. Bạn không thể trả về hai hay nhiều phần tử "anh em" ở cấp cao nhất.

**Mã này sẽ gây lỗi:**

    // LỖI: Hai phần tử liền kề không có thẻ cha chung
    function UserProfile() {
      return (
        <h1>User Details</h1>
        <p>Name: Jane Doe</p>
      );
    }
    

Để khắc phục, bạn có hai giải pháp:

1.  **Bao bọc trong một thẻ** `**<div>**` **(hoặc thẻ HTML khác):** Đây là cách đơn giản nhất. Bạn chỉ cần đặt tất cả các phần tử anh em vào bên trong một thẻ chứa chung.
2.  **Sử dụng React Fragments (giải pháp tốt hơn):** Đôi khi, việc thêm một `<div>` thừa vào DOM là không cần thiết và có thể làm lộn xộn cấu trúc HTML cuối cùng. React cung cấp một giải pháp gọn gàng hơn gọi là **Fragments**. Fragments cho phép bạn nhóm một danh sách các phần tử con mà không cần thêm một nút thừa vào DOM. Việc không thêm thẻ `<div>` thừa đặc biệt hữu ích khi làm việc với các layout phức tạp sử dụng Flexbox hoặc Grid, hoặc khi render các phần tử HTML yêu cầu cấu trúc cha-con cụ thể (như `<tr>` bên trong `<table>`). Cú pháp viết tắt của Fragment là một cặp thẻ trống: `<>...</>`.

**Mẹo cho chuyên gia:** Trong trường hợp bạn cần render một danh sách các fragments, bạn sẽ cần cung cấp một prop `key` duy nhất. Khi đó, bạn phải sử dụng cú pháp đầy đủ: `<React.Fragment key={item.id}>...</React.Fragment>`.

### 5\. Tổng kết: Tại sao JSX là một công cụ tuyệt vời?

JSX ban đầu có thể trông hơi lạ, nhưng nó nhanh chóng trở thành một trong những lý do chính khiến các nhà phát triển yêu thích React. Nó là một công cụ mạnh mẽ và trực quan giúp việc xây dựng giao diện người dùng trở nên dễ dàng hơn.

Tóm lại, những lợi ích chính của JSX là:

-   **Trực quan:** Cho phép bạn viết mã giao diện người dùng (UI) theo cách rất quen thuộc, giống như viết HTML, giúp bạn dễ dàng hình dung cấu trúc của component.
-   **Mạnh mẽ:** Tích hợp liền mạch sức mạnh của JavaScript. Bạn có thể sử dụng biến, hàm, và logic để tạo ra các giao diện động và tương tác cao.
-   **Tập trung:** Giữ cho logic và markup của một component ở cùng một nơi. Thay vì phải chuyển đổi giữa các tệp HTML và JavaScript, mọi thứ liên quan đến một thành phần UI đều nằm trong một tệp duy nhất, giúp mã dễ đọc và bảo trì hơn.

Việc nắm vững JSX là một trong những bước đầu tiên và quan trọng nhất trên hành trình chinh phục React. Chúc bạn học tập hiệu quả!
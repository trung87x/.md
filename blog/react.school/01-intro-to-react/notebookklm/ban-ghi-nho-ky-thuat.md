# Bản ghi nhớ Kỹ thuật: Giới thiệu các Khái niệm Cốt lõi của React

### Lời mở đầu

Bản ghi nhớ này được soạn thảo nhằm mục đích cung cấp cho các kỹ sư phần mềm mới một sự hiểu biết nền tảng về các khái niệm cốt lõi của React. Việc nắm vững những nguyên tắc cơ bản này là yêu cầu tiên quyết để viết mã React nhất quán và chất lượng cao trong các dự án của chúng ta. Bản ghi nhớ sẽ trình bày các chủ đề chính bao gồm: JSX, Components, Props, State, Hooks, và các kỹ thuật render động.

\--------------------------------------------------------------------------------

## 1.0 Giới thiệu về React và JSX

### 1.1 React là gì?

React là một thư viện JavaScript dùng để xây dựng giao diện người dùng (UI). Giá trị cốt lõi của nó nằm ở khả năng kết hợp logic HTML, CSS và JavaScript vào trong các đơn vị có thể tái sử dụng được gọi là "React Components". Cách tiếp cận này giúp đơn giản hóa việc phát triển các giao diện phức tạp bằng cách chia nhỏ chúng thành các phần độc lập. Được tạo ra bởi Facebook, React đã trở thành một công cụ nền tảng cho các ứng dụng frontend của nhiều công ty lớn như Twitter và AirBnB. Để hiện thực hóa điều này, React sử dụng một cú pháp đặc biệt gọi là JSX, yếu tố cốt lõi giúp kết hợp mã đánh dấu và logic một cách liền mạch và hiệu quả.

### 1.2 Hiểu về JSX (JavaScript XML)

JSX là một phần mở rộng cú pháp cho JavaScript, đóng vai trò trung tâm trong quá trình phát triển với React. Nó cho phép các nhà phát triển viết mã đánh dấu giống HTML trực tiếp bên trong các tệp JavaScript, kết hợp một cách tự nhiên giữa logic và trình bày. Các phần sau đây sẽ phân tích các tính năng và quy tắc chính của JSX.

#### 1.2.1 Phân tích cú pháp JSX cơ bản

JSX cho phép các nhà phát triển sử dụng bất kỳ phần tử HTML tiêu chuẩn nào (như `<h1>`, `<p>`), nhưng nó thực thi các quy tắc nghiêm ngặt hơn so với HTML truyền thống. Hai quy tắc quan trọng nhất cần ghi nhớ là:

1.  **Tất cả thẻ phải được đóng:** Trong HTML, một số thẻ như `<img>` không yêu cầu thẻ đóng. Tuy nhiên, trong JSX, tất cả các thẻ phải được đóng lại. Các thẻ này, được gọi là "void element tag", không thể có phần tử con và phải tự đóng, ví dụ: `<img src="cat.jpg"/>`.
2.  **Các phần tử liền kề phải được bao bọc:** Bạn không thể trả về nhiều phần tử JSX nằm cạnh nhau mà không có một phần tử cha duy nhất bao bọc chúng. Việc này sẽ gây ra lỗi "Adjacent JSX elements must be wrapped in an enclosing tag", dẫn đến ứng dụng không thể render. Để khắc phục, tất cả các phần tử anh em phải được lồng bên trong một vùng chứa cha, chẳng hạn như `<div>`.

#### 1.2.2 Nhúng Biểu thức JavaScript

JSX cho phép nhúng nội dung động bằng cách đặt bất kỳ biểu thức JavaScript hợp lệ nào vào trong dấu ngoặc nhọn `{}`. Biểu thức này sẽ được đánh giá và kết quả của nó sẽ được render ra giao diện.

    const userName = "Thuyền trưởng";
    const greeting = <p>Xin chào, {userName}!</p>;
    // Kết quả render ra: <p>Xin chào, Thuyền trưởng!</p>

Cần lưu ý rằng chỉ các "biểu thức" (expressions) — những đoạn mã trả về một giá trị — mới hợp lệ. Các "câu lệnh" (statements) như Objects, `if` statements và vòng lặp `for/while` không phải là các biểu thức hợp lệ và không thể được sử dụng trực tiếp bên trong JSX.

#### 1.2.3 Thuộc tính JSX và Trình xử lý Sự kiện (Event Handlers)

JSX xử lý các thuộc tính HTML và các trình xử lý sự kiện với một vài khác biệt chính so với HTML. Bảng dưới đây tóm tắt các điểm khác biệt quan trọng nhất:

| Thuộc tính HTML        | Tương đương trong JSX       | Ghi chú                                                                                                                                                   |
| ---------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `class`                | `className`                 | `class` là một từ khóa dành riêng trong JavaScript, vì vậy JSX sử dụng `className` để gán các lớp CSS.                                                    |
| `onclick`              | `onClick`                   | Tất cả các trình xử lý sự kiện trong JSX đều tuân theo quy tắc `camelCase` (ví dụ: `onKeyDown`, `onDrag`).                                                |
| `style="color: blue;"` | `style={{ color: 'blue' }}` | Thuộc tính `style` trong JSX nhận một đối tượng JavaScript. Các thuộc tính CSS được viết theo kiểu `camelCase` (ví dụ: `boxShadow` thay vì `box-shadow`). |

Đối với các trình xử lý sự kiện như `onClick`, JSX yêu cầu truyền vào một tham chiếu hàm trực tiếp (ví dụ: `{myFunction}`) thay vì một chuỗi mã JavaScript như trong HTML truyền thống.

#### 1.2.4 React Fragments

React Fragments giải quyết vấn đề "bao bọc các phần tử anh em" mà không cần thêm một nút thừa (như `<div>`) vào DOM. Việc tránh các nút DOM không cần thiết này rất quan trọng đối với hiệu suất và giúp việc định kiểu (styling) cũng như gỡ lỗi (debugging) trở nên dễ dự đoán hơn. Cú pháp viết tắt là một cặp thẻ trống `<>...</>`. Trong trường hợp cần truyền một prop `key` (ví dụ, khi render một danh sách các fragments), bạn phải sử dụng cú pháp đầy đủ: `<React.Fragment key="...">`.

Sau khi tìm hiểu cú pháp của JSX, chúng ta sẽ xem cách sử dụng nó để tạo ra các khối xây dựng có thể tái sử dụng được gọi là components.

\--------------------------------------------------------------------------------

## 2.0 Components và Props: Xây dựng Giao diện có thể Tái sử dụng

### 2.1 Giới thiệu về Components và Props

Components và props là nền tảng của kiến trúc React. **Components** là các phần giao diện độc lập, có thể tái sử dụng, hoạt động tương tự như các thẻ HTML tùy chỉnh. Chúng cho phép bạn chia nhỏ giao diện người dùng thành các phần riêng biệt. **Props** (viết tắt của "properties") là cơ chế để truyền dữ liệu từ một component cha xuống một component con, giúp các component trở nên linh hoạt và có thể cấu hình được. Các phần tiếp theo sẽ trình bày chi tiết cách sử dụng và tối ưu hóa props.

### 2.2 Truyền Props

Props được truyền vào một component dưới dạng các thuộc tính JSX, tương tự như các thuộc tính của thẻ HTML. Bên trong hàm của component, tất cả các props này được nhận dưới dạng một đối tượng JavaScript duy nhất. Bạn có thể truyền nhiều loại dữ liệu khác nhau làm props, bao gồm:

- Chuỗi (Strings)
- Biểu thức JavaScript (JavaScript expressions)
- Đối tượng JavaScript (JavaScript objects)
- Các phần tử JSX khác (Other JSX elements)

### 2.3 Destructuring và Giá trị Mặc định cho Props

Để cải thiện khả năng đọc của mã nguồn, chúng ta nên sử dụng kỹ thuật "destructuring" để trích xuất các giá trị từ đối tượng props. Thay vì truy cập `props.name` và `props.role`, bạn có thể lấy trực tiếp các giá trị này trong phần khai báo tham số của hàm. Hơn nữa, bạn có thể cung cấp giá trị mặc định cho một prop để xử lý các trường hợp nó không được truyền từ component cha.

**Trước (Không dùng destructuring):**

    function User(props) {
      const role = props.role || "pirate";
      return <div>{props.name} - {role}</div>;
    }

**Sau (Sử dụng destructuring và giá trị mặc định):**

    function User({ name, role = "pirate" }) {
      return <div>{name} - {role}</div>;
    }

Đây là quy ước chúng ta tuân theo trong toàn bộ codebase để đảm bảo tính dễ đọc và dễ bảo trì.

Sau khi tìm hiểu cách truyền dữ liệu tĩnh thông qua props, chúng ta sẽ chuyển sang cách quản lý dữ liệu động, có thể thay đổi bên trong một component bằng cách sử dụng state.

\--------------------------------------------------------------------------------

## 3.0 State và Hooks: Thêm tính Tương tác

### 3.1 Giới thiệu về State và Hook `useState`

Để tạo ra các giao diện tương tác, chúng ta cần một cách để quản lý dữ liệu có thể thay đổi theo thời gian. Đây là lúc **state** phát huy tác dụng. Trong khi props được truyền _vào_ một component từ bên ngoài (và không thể thay đổi bởi chính component đó), state là dữ liệu được quản lý _bên trong_ component và có thể thay đổi để phản hồi lại các hành động của người dùng. **Hooks** là các hàm đặc biệt, có thể nhận biết qua tiền tố `use`, cho phép các component dạng hàm "kết nối" vào các tính năng của React như state. `useState` là hook phổ biến và cơ bản nhất để quản lý state.

### 3.2 Phân tích Hook `useState`

Hook `useState` hoạt động theo một cơ chế đơn giản nhưng mạnh mẽ:

1.  **Khởi tạo:** Bạn gọi `useState` với một giá trị khởi tạo cho state (ví dụ: `useState(0)`). Đây là giá trị của state trong lần render đầu tiên.
2.  **Giá trị trả về:** `useState` trả về một mảng chứa hai phần tử. Chúng ta sử dụng kỹ thuật destructuring mảng để đặt tên cho các giá trị này, vì giá trị của mảng không có tên biến sẵn: `const [stateValue, setStateFunction]`.
    - `stateValue`: Giá trị state hiện tại.
    - `setStateFunction`: Một hàm dùng để cập nhật giá trị state.
3.  **Cập nhật State:** Khi bạn gọi hàm setter (ví dụ: `setCount(1)`), React sẽ lên lịch render lại component. Việc render lại sẽ chỉ xảy ra nếu giá trị mới khác với giá trị trước đó. Hàm setter có thể nhận một trong hai dạng:
    - **Giá trị mới:** `setCount(count + 1)`.
    - **Một hàm (functional update):** `setCount(prevCount => prevCount + 1)`. Mẫu này nên được sử dụng khi state mới cần được tính toán dựa trên state trước đó, đặc biệt là trong các trường hợp cập nhật state liên tiếp.

### 3.3 Các Mẫu Cập nhật State

Có hai mẫu cập nhật state chính mà bạn sẽ thường xuyên sử dụng:

- **Cập nhật Giá trị Đơn giản:** Đối với các giá trị nguyên thủy như số hoặc chuỗi, bạn chỉ cần gọi hàm setter với giá trị mới.
- **Cập nhật Đối tượng:** Khi cập nhật một đối tượng trong state, điều quan trọng là phải tạo một đối tượng mới thay vì sửa đổi trực tiếp đối tượng hiện có. Sử dụng cú pháp spread (`...`) để sao chép tất cả các thuộc tính của đối tượng cũ trước khi ghi đè thuộc tính cần thay đổi.

Tiếp theo, chúng ta sẽ khám phá cách sử dụng state và props để render các phần tử giao diện một cách linh hoạt.

\--------------------------------------------------------------------------------

## 4.0 Kỹ thuật Render Động

### 4.1 Giới thiệu về Render Động

Một trong những sức mạnh lớn nhất của React là khả năng render nội dung một cách động dựa trên state hoặc props của ứng dụng. Sự tích hợp chặt chẽ với JavaScript giúp việc triển khai logic để quyết định nội dung nào sẽ được hiển thị cho người dùng trở nên đơn giản. Phần này sẽ đề cập đến hai kỹ thuật thiết yếu: render có điều kiện và render danh sách dữ liệu.

### 4.2 Conditional Rendering (Render có Điều kiện)

Một mẫu phổ biến để render có điều kiện trong JSX là sử dụng toán tử logic AND của JavaScript (`&&`). Cơ chế hoạt động của nó như sau: nếu biểu thức ở bên trái của `&&` là `true`, React sẽ tiếp tục đánh giá và render phần tử JSX ở bên phải. Ngược lại, nếu biểu thức bên trái là `false`, toàn bộ biểu thức sẽ trả về `false`, và React sẽ không render gì cả.

    // Thẻ div sẽ chỉ được render nếu biến 'showUsers' là true.
    showUsers && <div>Danh sách người dùng...</div>

### 4.3 Rendering Lists (Render Danh sách)

Kỹ thuật này kết hợp nhiều khái niệm chúng ta đã học: biểu thức JavaScript có thể được render trong JSX, và một mảng sẽ xuất ra từng phần tử của nó ra màn hình. Quy trình tiêu chuẩn để render một danh sách các phần tử giao diện từ một mảng dữ liệu trong React như sau:

1.  **Sử dụng** `**.map()**`**:** Phương thức `.map()` của mảng trong JavaScript được sử dụng để lặp qua một mảng dữ liệu. Đối với mỗi mục trong mảng, hàm callback sẽ trả về một phần tử JSX tương ứng.
2.  **Tầm quan trọng của Prop** `**key**`**:** Khi render một danh sách, mỗi phần tử trong danh sách đó **phải** có một prop `key` duy nhất. `key` giúp React xác định các mục nào đã thay đổi, được thêm vào hoặc bị xóa, từ đó cho phép cập nhật DOM một cách hiệu quả. Lý tưởng nhất, dữ liệu của bạn sẽ đến từ một cơ sở dữ liệu và có một ID duy nhất để dùng làm `key`. Nếu không, bạn có thể dùng chỉ số của mảng làm `key` dự phòng, nhưng điều này **không được khuyến khích** nếu thứ tự của các mục có thể thay đổi, vì nó có thể dẫn đến các lỗi khó lường về hiệu suất và state.

\--------------------------------------------------------------------------------

## 5.0 Tổng kết và Các Bước Tiếp theo

Bản ghi nhớ này đã trình bày các khái niệm cốt lõi của React, bắt đầu từ JSX làm nền tảng cú pháp, sau đó là components và props để xây dựng giao diện có thể tái sử dụng, state và hooks để tạo ra tính tương tác, và cuối cùng là các kỹ thuật render động để hiển thị giao diện một cách linh hoạt. Việc nắm vững những nguyên tắc này là chìa khóa để trở nên thành thạo trong việc phát triển ứng dụng với React.

Chào mừng các bạn đã gia nhập đội ngũ. Hãy coi đây là tài liệu tham khảo chính khi bắt đầu, và đừng ngần ngại đặt câu hỏi cho các thành viên khác trong nhóm.

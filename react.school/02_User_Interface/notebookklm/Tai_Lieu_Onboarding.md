# Hướng Dẫn Onboarding: Xây Dựng Thành Phần UI Cơ Bản với React

### Lời Mở Đầu

Chào mừng các bạn đã gia nhập đội ngũ phát triển của chúng tôi! Tài liệu này được biên soạn với mục tiêu cung cấp một hướng dẫn thực hành, giúp bạn nhanh chóng nắm vững các kỹ năng xây dựng những thành phần UI (Giao diện Người dùng) phổ biến trong React. Chúng tôi sẽ tập trung vào các khái niệm cốt lõi, đi sâu vào các ví dụ thực tế và chia sẻ những phương pháp hay nhất (best practices) để bạn có thể tự tin đóng góp và trở nên năng suất ngay từ những ngày đầu tiên.

\--------------------------------------------------------------------------------

## 1\. Các Khái Niệm Nền Tảng: Trạng Thái và Tương Tác trong React

### 1.1. Giới thiệu

Để xây dựng các ứng dụng React hiệu quả, việc hiểu rõ cách React quản lý trạng thái (state) và xử lý dữ liệu đầu vào của người dùng (user input) là vô cùng quan trọng. Việc nắm vững các khái niệm về "controlled components" (thành phần được kiểm soát) và React Hooks chính là nền tảng cốt lõi để xây dựng các ứng dụng có tính tương tác cao, đáng tin cậy và dễ bảo trì.

### 1.2. Phân tích "Controlled Components"

1.  **Định nghĩa:** Trong React, một "controlled component" là một thành phần đầu vào (input element) mà giá trị của nó được kiểm soát bởi trạng thái của React. Ví dụ, với một thẻ `<input>`, thay vì để DOM tự quản lý giá trị của nó, chúng ta sẽ lưu trữ giá trị đó trong một biến trạng thái của React.
2.  **Cơ chế hoạt động:** Trạng thái của một thành phần (ví dụ: văn bản bên trong một ô nhập liệu) được "kiểm soát" hoàn toàn bởi React thông qua các Hook như `useState`. Mọi thay đổi về giá trị đều được xử lý bởi một hàm trong React và cập nhật lại trạng thái, sau đó giao diện sẽ được render lại với giá trị mới.
3.  **So sánh với "Uncontrolled Components":** Ngược lại, "uncontrolled components" cho phép DOM tự quản lý trạng thái của các thẻ input, tương tự như trong HTML truyền thống. Mặc dù cách tiếp cận này đơn giản hơn cho các form cơ bản, "controlled components" thường được ưu tiên trong các ứng dụng React vì chúng cho phép thực hiện các chức năng nâng cao như xác thực dữ liệu theo thời gian thực (real-time validation) một cách dễ dàng.
4.  **Lợi ích:** Việc kiểm soát trạng thái trong React là một phương pháp mạnh mẽ vì nó cho phép ứng dụng của bạn luôn có quyền truy cập trực tiếp vào giá trị của các trường trong form, giúp việc xử lý dữ liệu trở nên nhất quán và dễ dự đoán hơn.

### 1.3. Quản lý Trạng thái với `useState` và Custom Hooks

1.  **Giới thiệu** `**useState**`**:** React Hook `useState` là công cụ chính để thêm khả năng quản lý trạng thái vào các thành phần hàm (function components). Nó cho phép chúng ta khai báo một biến trạng thái và một hàm để cập nhật biến đó.
2.  **Ví dụ với** `**useInput**`**:** Để quản lý giá trị của một ô nhập liệu, chúng ta sử dụng `useState` để theo dõi giá trị hiện tại của nó.
3.  **Custom Hooks để Tái sử dụng Logic:** Một custom hook về cơ bản là một hàm JavaScript (có tên bắt đầu bằng `use`, ví dụ `useInput`) gói gọn một logic trạng thái cụ thể. Thay vì lặp lại logic `useState` cho mỗi ô nhập liệu, chúng ta có thể tạo ra một custom hook `useInput` để tái sử dụng. Hàm này sẽ chứa hook `useState`, định nghĩa một hàm `onChange` để cập nhật trạng thái, và trả về giá trị trạng thái (`value`) cùng với hàm xử lý sự kiện (`onChange`).
4.  **Lợi ích và Cách sử dụng:** Việc tạo ra các custom hook như `useInput` giúp mã nguồn trở nên sạch sẽ và có khả năng tái sử dụng cao. Thay vì gán từng prop một cách thủ công, chúng ta có thể sử dụng cú pháp `...spread` để truyền các thuộc tính `value` và `onChange` một cách ngắn gọn. Đây là một pattern mạnh mẽ và rất phổ biến trong React.

### 1.4. Tóm tắt và Chuyển tiếp

Như vậy, bạn đã nắm được cách React sử dụng "controlled components" và hooks để quản lý trạng thái một cách hiệu quả. Bây giờ, chúng ta sẽ áp dụng những khái niệm nền tảng này để bắt đầu xây dựng các thành phần UI cụ thể.

\--------------------------------------------------------------------------------

## 2\. Xây Dựng Các Thành Phần Tương Tác Cơ Bản

### 2.1. Giới thiệu

Các thành phần UI cơ bản như nút (button) và ô đánh dấu (checkbox) là những khối xây dựng nền tảng của mọi giao diện người dùng. Việc làm chủ cách xây dựng và tùy chỉnh chúng không chỉ là bước đầu tiên mà còn là một kỹ năng chiến lược để tạo ra các trải nghiệm người dùng hiệu quả và nhất quán.

### 2.2. Phân tích Thành phần Nút (Button)

#### 1\. Nút HTML Mặc định

Bạn hoàn toàn có thể render một thẻ `<button>` HTML tiêu chuẩn trực tiếp trong React. Các thuộc tính quen thuộc như `onClick` được sử dụng để gắn một hàm xử lý sự kiện khi người dùng nhấp vào nút.

    function sayHello() {
      alert('You clicked me!');
    }

    // Cách sử dụng trong component
    <button onClick={sayHello}>Default</button>

Tuy nhiên, nút HTML mặc định thường có kiểu dáng lỗi thời do các quy tắc CSS từ "user agent stylesheet" của trình duyệt.

#### 2\. Tùy chỉnh Kiểu dáng với `styled-components`

Để tạo ra các nút có giao diện hiện đại, chúng ta có thể sử dụng thư viện `styled-components`. Thư viện này cho phép chúng ta tạo ra các thành phần React tùy chỉnh với CSS được viết ngay bên trong tệp JavaScript. Để hiện đại hóa một nút, chúng ta chỉ cần tập trung vào 5 thay đổi CSS cốt lõi sau:

- `background-color`: Thay đổi màu nền.
- `font-size`: Tăng kích thước phông chữ.
- `padding`: Thêm khoảng đệm bên trong để nút trông "thoáng" hơn.
- `border-radius`: Bo tròn các góc để tạo cảm giác mềm mại.
- `cursor: pointer`: Thay đổi con trỏ chuột khi di chuột qua để báo hiệu đây là một phần tử có thể tương tác.

#### 3\. Quản lý các Trạng thái của Nút

##### Trạng thái Vô hiệu hóa (`disabled`)

Một nút thường có trạng thái bị vô hiệu hóa khi một hành động nào đó không khả dụng. Chúng ta có thể sử dụng thuộc tính `disabled` của HTML và bộ chọn `&:disabled` trong `styled-components` để thay đổi giao diện của nút khi nó bị vô hiệu hóa. Các thay đổi chính bao gồm giảm độ mờ (`opacity`), đổi màu chữ (`color`), và trả con trỏ chuột về mặc định (`cursor`).

    import styled from 'styled-components';

    const Button = styled.button`
      background-color: black;
      color: white;
      font-size: 20px;
      padding: 10px 60px;
      border-radius: 5px;
      margin: 10px 0px;
      cursor: pointer;

      &:disabled {
        color: grey;
        opacity: 0.7;
        cursor: default;
      }
    `;

    // Cách sử dụng
    <Button disabled>Disabled Button</Button>

##### Nút Dưới dạng Liên kết

Để biến một nút thành một liên kết điều hướng, bạn chỉ cần bọc thành phần `Button` của mình trong một thẻ `<a>` HTML với thuộc tính `href`.

    <a href="https://react.school" target="_blank">
      <Button>Link Button</Button>
    </a>

#### 4\. Tạo Nhóm Nút (Button Group)

Để sắp xếp nhiều nút thành một nhóm nằm ngang, bạn có thể sử dụng `display: flex` trên một `<div>` bao bọc chúng.

    const ButtonGroup = styled.div`
      display: flex;
    `;

    // Cách sử dụng
    <ButtonGroup>
      <Button>Group 1</Button>
      <Button>Group 2</Button>
    </ButtonGroup>

#### 5\. Tạo Nút Chuyển đổi (Toggle Button)

Một nhóm nút chuyển đổi cho phép người dùng chọn một trong nhiều tùy chọn. Logic của nó rất giống với việc xây dựng một giao diện tab.

- **Quản lý trạng thái:** Chúng ta sử dụng hook `useState` để theo dõi xem nút nào hiện đang được chọn ("active").
- **Tái sử dụng Component:** Để đảm bảo tính nhất quán, thành phần `ButtonToggle` sẽ được mở rộng từ chính thành phần `Button` mà chúng ta đã tạo trước đó, chỉ thêm vào các kiểu dáng để phân biệt trạng thái active/inactive.
- **Quy trình:**
  1.  Tạo một mảng chứa các loại hoặc tên của các nút.
  2.  Khởi tạo trạng thái `active` với giá trị đầu tiên trong mảng.
  3.  Lặp qua mảng và render một thành phần `ButtonToggle` cho mỗi mục.
  4.  Sử dụng `onClick` để gọi hàm cập nhật trạng thái (`setActive`), gán giá trị của nút được nhấp vào làm trạng thái `active` mới.

### 2.3. Triển khai Ô đánh dấu (Checkbox)

#### 1\. Sự khác biệt trong React

Cách React xử lý checkbox có một khác biệt quan trọng so với HTML thuần. Trong HTML, trình duyệt tự động theo dõi trạng thái `checked`. Tuy nhiên, trong React, chúng ta phải kiểm soát trạng thái này một cách tường minh. Đây là điểm mấu chốt:

- Sử dụng thuộc tính `checked` để gán trạng thái (true/false) cho checkbox từ state của React.
- Sử dụng hàm xử lý sự kiện `onChange`. Khi người dùng tương tác, sự kiện này sẽ được kích hoạt. Trạng thái boolean mới của checkbox (đã được chọn hay chưa) có thể được truy cập thông qua `**e.target.checked**`. Chúng ta phải sử dụng giá trị này để cập nhật lại state.

#### 2\. Quản lý Danh sách Checkbox

Khi làm việc với một danh sách các checkbox, cách tiếp cận tốt nhất là sử dụng một custom hook (ví dụ: `useCheckboxes`) để gói gọn logic quản lý trạng thái. Hook này sẽ khởi tạo và quản lý một mảng chứa trạng thái `checked` của tất cả các checkbox.

#### 3\. Luồng Dữ liệu

Chu trình quản lý trạng thái của checkbox trong React diễn ra như sau:

1.  Người dùng nhấp vào một checkbox.
2.  Sự kiện `onChange` được kích hoạt.
3.  Hàm xử lý sự kiện truy cập `e.target.checked` và gọi custom hook để cập nhật trạng thái `checked` của checkbox tương ứng trong mảng trạng thái.
4.  Component được render lại với trạng thái mới, hiển thị đúng trạng thái đã chọn của checkbox.

### 2.4. Tóm tắt và Chuyển tiếp

Sau khi đã nắm vững cách xây dựng các thành phần tương tác cơ bản này, bạn đã có đủ nền tảng để tiếp tục khám phá và xây dựng các thành phần giao diện phức tạp hơn, vốn là sự kết hợp và mở rộng của những khối xây dựng này.

\--------------------------------------------------------------------------------

## 3\. Xây Dựng Các Thành Phần Phức Hợp

### 3.1. Giới thiệu

Các ứng dụng hiện đại thường yêu cầu các thành phần phức tạp hơn như hộp thoại (modal) và giao diện thẻ (tab) để tổ chức nội dung và quản lý luồng tương tác của người dùng một cách hiệu quả. Phần này sẽ khám phá các kỹ thuật nâng cao để xây dựng các thành phần mạnh mẽ này từ đầu.

### 3.2. Triển khai Hộp thoại (Modal) với React Portals

#### 1\. Vấn đề và Giải pháp

Một trong những thách thức lớn nhất khi xây dựng modal là về mặt phân cấp DOM. Một modal cần phải xuất hiện "trên cùng" của tất cả các thành phần khác trên trang, bất kể nó được gọi từ đâu trong cây component. **React Portals** là giải pháp hoàn hảo cho vấn đề này. Nó cho phép chúng ta "dịch chuyển" (teleport) việc render một component con ra một vị trí khác trong cây DOM, bên ngoài cấu trúc cha-con hiện tại của nó.

#### 2\. Thiết lập

Để sử dụng Portals cho modal, bạn cần thêm một `<div>` gốc riêng biệt vào tệp `index.html` của ứng dụng, bên ngoài `div#root` chính.

    <!-- index.html -->
    <div id="root"></div>
    <div id="app-modal"></div>

Việc đặt nó ở đây đảm bảo modal là một phần tử con trực tiếp của `<body>`, giúp tránh các vấn đề phức tạp về `z-index` (ngữ cảnh xếp chồng CSS) có thể phát sinh nếu modal bị lồng sâu bên trong cây component của ứng dụng.

#### 3\. Logic Trạng thái và Hiển thị

- **Quản lý trạng thái:** Chúng ta sử dụng hook `useState` để quản lý trạng thái hiển thị của modal (ví dụ: `[open, setOpen]`), với giá trị mặc định là `false`.
- **Render có điều kiện:** Để đảm bảo modal chỉ được gắn kết (mount) vào DOM khi cần thiết, chúng ta sử dụng kỹ thuật render có điều kiện. Biểu thức `open && <ModalComponent />` sẽ chỉ render `ModalComponent` khi biến `open` là `true`.

#### 4\. Phân tích Cấu trúc và CSS

- **Vùng chứa Modal chính:**
  - Sử dụng `position: fixed` để định vị modal tương đối với viewport của trình duyệt.
  - Dùng `top`, `left`, và `transform` để căn giữa modal.
  - Sử dụng `max-height` để đảm bảo modal không bao giờ cao hơn màn hình, giúp tránh các vấn đề về hiển thị trên các thiết bị có kích thước khác nhau.
- **Lớp phủ (Shadow):**
  - Tạo một phần tử `<div>` riêng biệt có `position: fixed` để làm lớp phủ nền.
  - Thiết lập `background-color` là màu đen với một giá trị `opacity` (ví dụ: `0.7`) để tạo hiệu ứng mờ, làm nổi bật modal.
- **Nội dung có thể cuộn và Chân trang cố định:**
  - Sử dụng `display: flex` với `flex-direction: column` cho vùng chứa modal.
  - Áp dụng `overflow: auto` cho vùng chứa nội dung chính (`ModalContent`) để cho phép cuộn khi nội dung dài hơn chiều cao của modal.
  - Cách làm này giúp phần chân trang (`ModalFooter`) luôn được "ghim" cố định ở phía dưới, ngay cả khi người dùng cuộn nội dung.

### 3.3. Xây Dựng Giao diện Tab

#### 1\. Khái niệm cốt lõi

Về bản chất, một giao diện tab có thể được xem như một "nhóm nút được ngụy trang" (a button group in disguise). Mỗi tab thực chất là một nút, và khi được nhấp vào, nó sẽ hiển thị một vùng nội dung tương ứng. Nhận thức này là chìa khóa: khi hiểu rằng các thành phần phức tạp thường là sự kết hợp của các thành phần đơn giản hơn, bạn có thể tái sử dụng logic và kiểu dáng, từ đó đẩy nhanh tốc độ phát triển.

#### 2\. Logic Chuyển đổi

Logic để quản lý tab đang hoạt động rất giống với ví dụ về nút chuyển đổi (toggle button) đã đề cập trước đó.

- Sử dụng `useState` để theo dõi xem tab nào đang "active".
- Khi một tab được nhấp, sự kiện `onClick` sẽ cập nhật trạng thái `active` thành tên hoặc ID của tab đó.
- Nội dung tương ứng với tab `active` sẽ được hiển thị có điều kiện.

#### 3\. Tùy chỉnh Kiểu dáng

Chúng ta có thể tạo một thành phần `Tab` dựa trên một nút đã được tạo kiểu (`styled.button`).

- Để loại bỏ giao diện nút mặc định, chúng ta thiết lập các thuộc tính CSS cụ thể: `background: white`, `border: 0` và `outline: 0`.
- Sử dụng một `prop` (ví dụ: `active`) để truyền trạng thái đang hoạt động vào thành phần.
- Dựa vào `prop` này, chúng ta có thể áp dụng các kiểu dáng khác nhau, chẳng hạn như thêm một đường `border-bottom` màu sắc để làm nổi bật tab đang được chọn.

### 3.4. Tóm tắt và Chuyển tiếp

Bạn vừa tìm hiểu các kỹ thuật để xây dựng các thành phần phức hợp như modal và tab. Tuy nhiên, việc trở thành một nhà phát triển hiệu quả không chỉ dừng lại ở việc biết cách tự xây dựng mọi thứ. Điều quan trọng tiếp theo là biết khi nào nên tận dụng các giải pháp có sẵn.

\--------------------------------------------------------------------------------

## 4\. Khi Nào Nên Sử Dụng Thư Viện Bên Ngoài

### 4.1. Giới thiệu

Trở thành một nhà phát triển năng suất không chỉ là biết cách xây dựng mọi thứ từ đầu, mà còn là biết khi nào nên tận dụng sức mạnh của cộng đồng mã nguồn mở. Mục tiêu của đội ngũ chúng ta là mang lại giá trị một cách hiệu quả. Điều đó có nghĩa là việc đưa ra quyết định "tự xây dựng hay sử dụng thư viện" (build vs. buy) thông minh cũng quan trọng không kém việc viết mã sạch.

### 4.2. Phân tích Trường hợp: Tooltips

#### 1\. Đánh giá Độ phức tạp

Tooltip (chú giải công cụ) là một ví dụ điển hình cho một thành phần trông có vẻ đơn giản nhưng lại cực kỳ phức tạp để tự xây dựng một cách hoàn hảo. Các yếu tố gây khó khăn bao gồm:

- **Định vị động:** Cần phải tính toán chính xác vị trí của tooltip dựa trên kích thước của phần tử được hover, kích thước của chính tooltip, và vị trí của chúng so với cửa sổ trình duyệt để tránh bị cắt xén.

#### 2\. Đề xuất Thư viện

Vì những lý do trên, việc sử dụng một thư viện tooltip chuyên dụng thường là lựa chọn khôn ngoan. Một số thư viện phổ biến bao gồm `react-tooltip` và thành phần `Tooltip` của Material-UI.

#### 3\. So sánh và Đánh đổi

Mỗi thư viện đều có ưu và nhược điểm riêng, và việc lựa chọn phụ thuộc vào yêu cầu cụ thể của dự án:

- `**react-tooltip**`: Dễ dàng tùy chỉnh các thuộc tính CSS như `box-shadow`. Tuy nhiên, thư viện này có vẻ như không còn được bảo trì tích cực.
- **Material-UI** `**Tooltip**`: Có cộng đồng hỗ trợ lớn hơn nhiều so với `react-tooltip`. Tuy nhiên, việc tùy chỉnh sâu có thể phức tạp hơn. Ví dụ, việc thêm `box-shadow` rất khó khăn vì mũi tên của tooltip được tạo bằng thuộc tính `border`, vốn không thể dễ dàng nằm trên một `box-shadow`.

### 4.3. Các Ví dụ Khác

Bên cạnh tooltip, các thành phần phức tạp khác cũng là ứng cử viên sáng giá cho việc sử dụng thư viện bên ngoài. Một ví dụ điển hình là **Color Picker** (Bộ chọn màu). Thư viện như **"React Color"** cung cấp một giải pháp mạnh mẽ và toàn diện, giúp bạn tiết kiệm hàng giờ, thậm chí hàng ngày, công sức phát triển.

### 4.4. Tóm tắt và Chuyển tiếp

Nguyên tắc cốt lõi là: trước khi quyết định tự xây dựng một thành phần, hãy đánh giá sự phức tạp của nó. Đừng ngần ngại sử dụng các thư viện chất lượng cao, được cộng đồng tin dùng để tăng tốc độ phát triển và tập trung vào việc giải quyết các bài toán kinh doanh cốt lõi của dự án.

\--------------------------------------------------------------------------------

## 5\. Tổng Kết

Qua tài liệu này, bạn đã được trang bị những kiến thức và kỹ năng nền tảng vững chắc để bắt đầu hành trình phát triển với React. Chúng ta đã cùng nhau khám phá các khái niệm chính: từ việc quản lý trạng thái với Hooks, xây dựng các thành phần UI từ cơ bản (nút, checkbox) đến phức tạp (modal, tab), và cuối cùng là cách đưa ra quyết định chiến lược về việc sử dụng các thư viện bên ngoài.

Hãy xem đây là một tài liệu tham khảo hữu ích khi bạn bắt đầu làm việc với các dự án thực tế. Chúc bạn thành công và có những trải nghiệm thú vị khi xây dựng các ứng dụng tuyệt vời với React!

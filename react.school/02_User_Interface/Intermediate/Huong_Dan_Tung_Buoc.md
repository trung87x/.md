# Hướng Dẫn Xây Dựng Các Thành Phần Giao Diện Người Dùng Cơ Bản trong React

### **Giới thiệu**

#

Chào mừng các bạn đến với thế giới phát triển giao diện người dùng cùng React! Nếu bạn mới bắt đầu, việc xây dựng các thành phần từ đầu có thể hơi khó khăn. Đừng lo, hướng dẫn này sẽ giúp bạn.

Mục tiêu của tài liệu này là hướng dẫn bạn từng bước cách xây dựng bốn thành phần giao diện người dùng (UI) phổ biến nhất: nút tương tác (button), trường nhập liệu (input), hộp kiểm (checkbox), và cửa sổ modal.

Trong suốt quá trình này, chúng ta sẽ làm quen và áp dụng một khái niệm cốt lõi trong React là "controlled component" (thành phần được kiểm soát). Đây là một nguyên tắc cơ bản giúp chúng ta quản lý trạng thái của các thành phần một cách hiệu quả, cho phép chúng ta toàn quyền kiểm soát dữ liệu của biểu mẫu và dễ dàng thực hiện các tính năng như xác thực tức thì.

Hãy cùng bắt đầu với thành phần đầu tiên và cũng là thành phần cơ bản nhất: một chiếc nút.

\--------------------------------------------------------------------------------

## 1\. Xây Dựng Nút (Button) Tương Tác

### **1.1. Nút HTML Cơ Bản và Sự kiện** `**onClick**`

#

Để bắt đầu, bạn hoàn toàn có thể hiển thị một thẻ `<button>` HTML tiêu chuẩn ngay trong thành phần React của mình. React cho phép chúng ta gắn các hàm xử lý sự kiện, chẳng hạn như một cú nhấp chuột, một cách dễ dàng.

Dưới đây là một ví dụ về một nút cơ bản sẽ hiển thị một thông báo khi được nhấp vào:

    function sayHello() {
      alert('You clicked me!');
    }

    // Cách sử dụng trong thành phần React của bạn
    <button onClick={sayHello}>Default Button</button>

**Phân tích Mã:**

- **Thuộc tính** `**onClick**`**:** Đây là cách React gắn một hàm (`sayHello`) để thực thi khi người dùng nhấp vào nút. Đây là một quy ước phổ biến trong React cho các sự kiện của người dùng.
- **Nội dung Nút:** Văn bản hiển thị trên nút ("Default Button") được xác định bởi nội dung nằm giữa thẻ mở `<button>` và thẻ đóng `</button>`.

### **1.2. Hiện Đại Hóa Nút với** `**styled-components**`

#

Nút HTML mặc định trông khá lỗi thời. Để tạo ra một giao diện hiện đại, chúng ta cần tùy chỉnh phong cách cho nó. `styled-components` là một thư viện tuyệt vời cho phép chúng ta viết CSS ngay bên trong các thành phần React.

Dưới đây là 5 thay đổi CSS quan trọng nhất để biến một nút mặc định trở nên hiện đại hơn:

- **Màu nền (**`**background-color**`**):** Thay đổi màu nền của nút để phù hợp với thiết kế của bạn.
- **Kích thước phông chữ (**`**font-size**`**):** Tăng kích thước văn bản để dễ đọc hơn.
- **Đệm (**`**padding**`**):** Thêm không gian bên trong nút, giữa văn bản và đường viền.
- **Bo góc (**`**border-radius**`**):** Làm tròn các góc để tạo ra một giao diện mềm mại, thân thiện hơn.
- **Con trỏ (**`**cursor**`**):** Thay đổi con trỏ chuột thành hình bàn tay (`pointer`) khi người dùng di chuột qua nút, báo hiệu rằng đây là một yếu tố có thể tương tác.

Hãy xem cách áp dụng các kiểu này vào một thành phần nút:

    const Button = styled.button`
      background-color: black;
      color: white;
      font-size: 20px;
      padding: 10px 60px;
      border-radius: 5px;
      margin: 10px 0px;
      cursor: pointer;
    `;

### **1.3. Xử lý Trạng thái: Nút Bị Vô Hiệu Hóa (Disabled)**

#

Trong nhiều trường hợp, bạn sẽ muốn vô hiệu hóa một nút, ví dụ như khi một biểu mẫu chưa được điền đầy đủ. HTML cung cấp thuộc tính `disabled` để làm điều này. Chúng ta có thể mở rộng `styled-components` để áp dụng các kiểu riêng biệt khi nút ở trạng thái bị vô hiệu hóa.

Bằng cách sử dụng bộ chọn `&:disabled`, chúng ta có thể làm mờ nút và thay đổi con trỏ chuột về mặc định để người dùng biết rằng họ không thể nhấp vào nó.

Đây là mã hoàn chỉnh cho thành phần nút của chúng ta, bao gồm cả kiểu cho trạng thái `disabled`:

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

### **1.4. Các Trường Hợp Sử Dụng Nâng Cao: Nhóm Nút và Nút Chuyển Đổi (Toggle)**

#

**Nhóm Nút**

Để tạo một nhóm các nút liền kề nhau, bạn có thể bọc chúng trong một thẻ `<div>` và áp dụng thuộc tính `display: flex`. Điều này sẽ sắp xếp các nút thành một hàng ngang.

    const ButtonGroup = styled.div`
      display: flex;
    `;

    // Cách sử dụng
    <ButtonGroup>
      <Button>Group 1</Button>
      <Button>Group 2</Button>
    </ButtonGroup>

**Nút Chuyển Đổi**

Để tạo một nhóm nút mà chỉ có một nút được chọn (active) tại một thời điểm, chúng ta cần theo dõi trạng thái. Đây là lúc hook `useState` của React phát huy tác dụng.

Logic hoạt động như sau: chúng ta lặp qua một mảng các loại nút. Đối với mỗi nút, chúng ta so sánh loại của nó với trạng thái `active` hiện tại để quyết định xem có nên áp dụng kiểu "đang hoạt động" hay không. Khi một nút được nhấp, sự kiện `onClick` sẽ gọi hàm setter của hook (`setActive`) để cập nhật trạng thái, kích hoạt nút mới được chọn.

Dưới đây là một đoạn mã khái niệm để minh họa logic này:

    const types = ['Cash', 'Credit Card', 'Bitcoin'];
    // Khởi tạo trạng thái với lựa chọn đầu tiên
    const [active, setActive] = useState(types[0]);

    // ... bên trong phần render của component
    return (
      <ButtonGroup>
        {types.map(type => (
          <ButtonToggle
            key={type}
            // Truyền prop 'active' để áp dụng kiểu có điều kiện
            active={active === type}
            // Cập nhật trạng thái khi nút được nhấp
            onClick={() => setActive(type)}
          >
            {type}
          </ButtonToggle>
        ))}
      </ButtonGroup>
    );

Bây giờ, khi đã nắm vững cách xử lý các hành động của người dùng với nút, chúng ta hãy chuyển sang cách quản lý dữ liệu do người dùng nhập vào thông qua các trường input.

\--------------------------------------------------------------------------------

## 2\. Quản lý Dữ liệu với Trường Nhập Liệu (Input)

### **2.1. Tìm hiểu về "Controlled Component"**

#

Khi làm việc với các biểu mẫu trong React, bạn sẽ thường xuyên nghe đến thuật ngữ "controlled component" (thành phần được kiểm soát).

Một **controlled component** trong React là một thành phần đầu vào (như `<input>`, `<textarea>`) mà giá trị của nó được kiểm soát bởi trạng thái của React. Thay vì để DOM tự quản lý trạng thái bên trong của nó, chúng ta sử dụng một hook trạng thái để lưu trữ giá trị và cập nhật nó thông qua các hàm xử lý.

Đây là cách tiếp cận phổ biến trong các ứng dụng React vì nó cho phép chúng ta truy cập vào giá trị của trường nhập liệu ngay lập tức, mở ra khả năng thực hiện các tác vụ như xác thực (validation) theo thời gian thực.

### **2.2. Xây dựng một Trường Nhập Liệu Văn Bản Cơ Bản**

#

Để tạo một trường nhập liệu được kiểm soát, chúng ta cần ba yếu tố cốt lõi:

- **Hook** `**useState**`**:** Để tạo và quản lý một biến trạng thái lưu trữ giá trị hiện tại của trường nhập liệu.
- **Thuộc tính** `**value**`**:** Trên thẻ `<input>`, chúng ta liên kết thuộc tính này với biến trạng thái của mình. Điều này đảm bảo rằng những gì hiển thị trong trường nhập liệu luôn là những gì có trong trạng thái của React.
- **Hàm xử lý** `**onChange**`**:** Một hàm được truyền vào thuộc tính `onChange`. Hàm này sẽ được gọi mỗi khi người dùng nhập liệu, cho phép chúng ta cập nhật biến trạng thái với giá trị mới.

Dưới đây là một ví dụ hoàn chỉnh về một trường nhập liệu được kiểm soát:

    import React, { useState } from 'react';

    function MyInput() {
      // 1. Khởi tạo trạng thái để lưu giá trị của input
      const [inputValue, setInputValue] = useState('');

      // 3. Hàm xử lý được gọi mỗi khi input thay đổi
      const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };

      return (
        <input
          // 2. Liên kết giá trị của input với trạng thái
          value={inputValue}
          onChange={handleInputChange}
        />
      );
    }

Trong ví dụ trên, `inputValue` là "nguồn chân lý duy nhất" cho giá trị của trường nhập liệu. Mọi thay đổi của người dùng đều kích hoạt `handleInputChange`, cập nhật trạng thái, và sau đó React sẽ render lại trường nhập liệu với giá trị mới.

### **2.3. Tái sử dụng Logic với một Hook Tùy chỉnh (Custom Hook)**

#

Logic quản lý trạng thái cho các trường nhập liệu (`useState`, hàm `onChange`) là rất phổ biến. Tại sao chúng ta lại làm điều này? Câu trả lời nằm ở một nguyên tắc lập trình quan trọng: **"Don't Repeat Yourself" (DRY)**, hay "Đừng Lặp Lại Chính Mình". Bằng cách trừu tượng hóa logic `useState` và `onChange` vào một hook tùy chỉnh, chúng ta tạo ra một nguồn chân lý duy nhất và có thể tái sử dụng để quản lý trạng thái input. Điều này giúp mã nguồn của chúng ta sạch sẽ hơn, dễ bảo trì hơn và ít xảy ra lỗi hơn.

Hook `useInput` dưới đây sẽ đảm nhận toàn bộ việc quản lý trạng thái. Nó khởi tạo trạng thái bằng `useState`, định nghĩa hàm `onChange`, và trả về một đối tượng chứa các thuộc tính `value` và `onChange` cần thiết.

    import { useState } from 'react';

    // Custom hook
    function useInput(defaultValue = '') {
      const [value, setValue] = useState(defaultValue);

      const onChange = (event) => {
        setValue(event.target.value);
      };

      return {
        value,
        onChange,
      };
    }

    // Cách sử dụng trong thành phần của bạn
    function MyForm() {
      const nameInput = useInput(''); // Gọi custom hook

      return (
        // Sử dụng cú pháp spread (...) để gán các thuộc tính
        <input {...nameInput} placeholder="Your name" />
      );
    }

Tương tự như trường nhập liệu văn bản, hộp kiểm (checkbox) cũng tuân theo nguyên tắc "controlled component", nhưng nó sử dụng một thuộc tính khác để quản lý trạng thái của mình.

\--------------------------------------------------------------------------------

## 3\. Làm Việc với Hộp Kiểm (Checkbox)

### **3.1. Hộp Kiểm trong React:** `**checked**` **và** `**onChange**`

#

Trong HTML thuần, trình duyệt tự động theo dõi trạng thái đã chọn/chưa chọn của một hộp kiểm. Tuy nhiên, trong React, chúng ta phải quản lý trạng thái này một cách tường minh. Đây là điểm khác biệt chính.

Hai thuộc tính quan trọng nhất khi làm việc với hộp kiểm trong React là `checked` và `onChange`.

| Thuộc tính | Mục đích trong React                                                                                              |
| ---------- | ----------------------------------------------------------------------------------------------------------------- |
| `checked`  | Xác định xem hộp kiểm có được chọn hay không (true/false), được liên kết trực tiếp với trạng thái của thành phần. |
| `onChange` | Một hàm được gọi khi trạng thái của hộp kiểm thay đổi, cho phép chúng ta cập nhật trạng thái tương ứng.           |

### **3.2. Quản lý Trạng thái của một Danh sách Hộp Kiểm**

#

Hãy xem xét một kịch bản phổ biến: quản lý trạng thái của một danh sách các hộp kiểm.

Để làm điều này, chúng ta sử dụng hook `useState` để khởi tạo một mảng các đối tượng. Mỗi đối tượng trong mảng đại diện cho một hộp kiểm và chứa thông tin về nó, bao gồm cả trạng thái `checked`.

Đây là cách bạn có thể khởi tạo trạng thái:

    const initialCheckboxes = [
      { id: 1, label: 'Lựa chọn A', checked: false },
      { id: 2, label: 'Lựa chọn B', checked: true },
      { id: 3, label: 'Lựa chọn C', checked: false }
    ];

    const [checkboxes, setCheckboxes] = useState(initialCheckboxes);

Logic cập nhật trạng thái khi một hộp kiểm được nhấp như sau: hàm xử lý `onChange` được kích hoạt. Bên trong hàm này, chúng ta tạo một bản sao của mảng trạng thái, tìm đối tượng tương ứng và đảo ngược giá trị `checked` của nó, sau đó dùng hàm setter của `useState` để cập nhật trạng thái. Đây là một nguyên tắc quan trọng trong React: **không bao giờ thay đổi trực tiếp trạng thái**.

Đây là một ví dụ về hàm xử lý cập nhật:

    const handleCheckboxChange = (changedId) => {
      const newCheckboxes = checkboxes.map(checkbox => {
        if (checkbox.id === changedId) {
          // Tạo một đối tượng mới với giá trị 'checked' được đảo ngược
          return { ...checkbox, checked: !checkbox.checked };
        }
        return checkbox;
      });
      setCheckboxes(newCheckboxes);
    };

Tiếp theo, chúng ta sẽ khám phá thành phần phức tạp nhất trong hướng dẫn này: cửa sổ modal. Nó đòi hỏi một kỹ thuật đặc biệt gọi là "Portals" để đảm bảo nó luôn hiển thị đúng cách trên tất cả các nội dung khác.

\--------------------------------------------------------------------------------

## 4\. Xây Dựng Cửa Sổ Modal với React Portals

### **4.1. React Portals là gì và Tại sao lại dùng cho Modal?**

#

React Portal là một tính năng cho phép bạn hiển thị một thành phần con (ví dụ: modal của bạn) tại một vị trí khác trong cây DOM, bên ngoài hệ thống phân cấp cha-con thông thường của nó trong React.

Bởi vì bạn luôn muốn Modal của mình xuất hiện "phía trên" tất cả các thành phần React khác, một portal là trường hợp sử dụng hoàn hảo để "dịch chuyển" việc hiển thị đến đó.

Sử dụng portal đảm bảo rằng modal của bạn sẽ không bị ảnh hưởng bởi các kiểu CSS của các thành phần cha (như `overflow: hidden` hoặc `z-index`), một vấn đề thường gặp khi xây dựng modal.

### **4.2. Thiết Lập và Hiển Thị Modal**

#

**1\. Thiết lập Điểm đến trong DOM**

Bước đầu tiên và quan trọng nhất là tạo một phần tử DOM mục tiêu trong file `public/index.html` của bạn. Đây sẽ là nơi React sẽ "dịch chuyển" modal của bạn đến.

    <!-- Thêm dòng này vào đâu đó trong thẻ <body> của file index.html -->
    <div id="app-modal"></div>

**2\. Quản lý Trạng thái Hiển thị**

Bên trong thành phần React của bạn, hãy sử dụng hook `useState` để quản lý việc modal có được hiển thị hay không.

    const [open, setOpen] = useState(false);

**3\. Hiển thị có Điều kiện**

Cuối cùng, sử dụng một biểu thức logic AND (`&&`) để chỉ hiển thị thành phần modal khi biến trạng thái `open` là `true`.

    {open && <MyModalComponent />}

Khi `open` là `true`, React sẽ hiển thị `MyModalComponent` của bạn thông qua portal vào trong `div#app-modal`.

### **4.3. Tạo kiểu cho Modal để có Giao diện Chuyên nghiệp**

#

Để tạo ra một modal trông chuyên nghiệp, chúng ta cần tạo kiểu cho một vài phần tử chính. Bảng dưới đây tóm tắt các kỹ thuật CSS quan trọng:

| Phần tử                  | Thuộc tính CSS Chính                                  | Mục đích                                                                                                |
| ------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Vùng chứa Modal**      | `position: fixed`, `top`, `left`, `max-height`        | Đặt modal ở giữa màn hình và đảm bảo nó không bao giờ lớn hơn chiều cao của trình duyệt.                |
| **Bóng mờ Nền**          | `position: fixed`, `background-color` (với `opacity`) | Tạo một lớp phủ mờ phía sau modal để làm nổi bật nó so với phần còn lại của trang.                      |
| **Nội dung Có thể Cuộn** | `overflow: auto` (trên vùng nội dung)                 | Cho phép nội dung bên trong modal có thể cuộn nếu nó dài hơn không gian có sẵn.                         |
| **Chân trang Cố định**   | `display: flex` (trên vùng chứa modal)                | Giữ cho phần chân trang (footer) của modal luôn hiển thị ở phía dưới, ngay cả khi nội dung ở giữa cuộn. |

\--------------------------------------------------------------------------------

### **Kết luận**

#

Chúc mừng bạn đã hoàn thành hướng dẫn này! Chúng ta đã cùng nhau xây dựng bốn thành phần giao diện người dùng thiết yếu: một nút tương tác có thể tùy chỉnh, một trường nhập liệu được kiểm soát, một danh sách các hộp kiểm và một cửa sổ modal chuyên nghiệp sử dụng React Portals.

Qua đó, bạn đã được làm quen với các khái niệm cốt lõi như quản lý trạng thái với React Hooks (`useState`) và tầm quan trọng của các "controlled components" trong việc tạo ra các giao diện người dùng đáng tin cậy và dễ dự đoán.

Con đường trở thành một nhà phát triển React chuyên nghiệp đòi hỏi sự luyện tập. Hãy tiếp tục thử nghiệm, xây dựng các thành phần của riêng bạn và khám phá những khả năng vô tận mà React mang lại. Chúc bạn thành công!

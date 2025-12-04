# Xây dựng các Thành phần Giao diện Người dùng trong React: Hướng dẫn Từng bước

### Giới thiệu

Chào mừng bạn đến với hướng dẫn xây dựng các thành phần giao diện người dùng (UI) trong React! Mục tiêu của hướng dẫn này là cung cấp cho người mới bắt đầu các kỹ năng cần thiết để tạo và tạo kiểu cho các thành phần UI cơ bản và có thể tái sử dụng. Chúng ta sẽ cùng nhau xây dựng các thành phần thiết yếu như nút (button), trường nhập liệu (input) và thanh điều hướng (navbar). Để quá trình tạo kiểu trở nên hiệu quả và dễ quản lý, chúng ta sẽ sử dụng thư viện `styled-components`.

\--------------------------------------------------------------------------------

## 1\. Thiết lập và Các Khái niệm Tạo kiểu Cơ bản

Hướng dẫn này bắt đầu bằng cách thiết lập các yếu tố tạo kiểu nền tảng cho toàn bộ ứng dụng.

### 1.1. Tích hợp Google Fonts

Kiểu chữ (typography) đóng vai trò quan trọng trong việc định hình giao diện và cảm nhận của một ứng dụng. Một lựa chọn kiểu chữ tốt có thể cải thiện đáng kể trải nghiệm người dùng. Chúng ta có thể dễ dàng thêm Google Fonts vào một dự án React bằng cách sử dụng quy tắc `@import` trong tệp CSS.

Mặc dù việc thêm thẻ `<link>` vào tệp `index.html` là một phương pháp phổ biến, quy tắc `@import` trong CSS lại là một giải pháp thay thế linh hoạt, đặc biệt hữu ích trong các môi trường mà việc chỉnh sửa tệp HTML gốc bị hạn chế.

Trong tệp CSS chính của bạn (ví dụ: `styles.css`), hãy thêm dòng `@import` mà bạn nhận được từ trang Google Fonts. Sau đó, áp dụng `font-family` cho thẻ `body`. Điều này sẽ thiết lập một phông chữ mặc định cho toàn bộ ứng dụng, đảm bảo tính nhất quán về mặt hình ảnh.

    /* styles.css */
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

    body {
      font-family: 'Roboto', sans-serif;
    }

### 1.2. Giới thiệu `styled-components`

`styled-components` là một thư viện "CSS-in-JS" cho phép bạn tạo kiểu cho các thành phần React bằng cách viết mã CSS thực tế trực tiếp trong các tệp JavaScript. Lợi ích chính của phương pháp này là nó giúp đóng gói các kiểu đi kèm với thành phần, giúp mã nguồn của bạn trở nên có tổ chức, dễ bảo trì và theo từng thành phần riêng biệt.

Kể từ đây, mỗi thành phần chúng ta xây dựng sẽ là một `styled-component`. Cách tiếp cận này đóng gói các style cùng với logic, tạo ra các khối xây dựng thực sự có thể tái sử dụng và dễ bảo trì cho ứng dụng của chúng ta.

**Câu chuyển tiếp:** Bây giờ khi đã có nền tảng về tạo kiểu, hãy bắt đầu xây dựng thành phần UI đầu tiên của chúng ta: một nút tùy chỉnh.

\--------------------------------------------------------------------------------

## 2\. Xây dựng Thành phần Button

Các nút là một trong những thành phần tương tác cơ bản nhất. Phần này sẽ trình bày cách tạo ra một nút linh hoạt và có thể tái sử dụng.

### 2.1. Tạo một Button Tùy chỉnh

Để tạo một thành phần `Button` cơ bản, chúng ta sử dụng `styled-components`. Một thiết kế hiệu quả là tạo một nút màu đen đậm. Việc này tạo ra độ tương phản cao với phần còn lại của trang, giúp thu hút ánh mắt của người dùng vào hành động chính mà chúng ta muốn họ thực hiện — một "lời kêu gọi hành động" (call to action - CTA) rõ ràng.

    // Button.js
    import styled from 'styled-components';

    const Button = styled.button`
      background-color: black;
      color: white;
      padding: 10px 15px;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    `;

    export default Button;

### 2.2. Thêm các Biến thể (Variants) với Props

Để làm cho thành phần `Button` của chúng ta linh hoạt hơn, chúng ta sẽ triển khai một mẫu hình mạnh mẽ: sử dụng `props` để tạo ra các biến thể. Ví dụ, chúng ta có thể tạo một biến thể `outline` cho các hành động phụ, chẳng hạn như các nút "Edit" hoặc "Delete", để chúng trông tinh tế hơn.

1.  **Cách hoạt động:** Chúng ta tạo một đối tượng `variantStyles` chứa các đoạn mã CSS cho từng biến thể.
2.  **Cách triển khai:** Bên trong định nghĩa của `styled-components`, chúng ta áp dụng các kiểu này một cách có điều kiện bằng cách kiểm tra giá trị của `prop` `variant`.
3.  **Cách sử dụng:** Khi sử dụng thành phần, chỉ cần truyền `prop` `variant` để áp dụng kiểu mong muốn.

    // Button.js (Cập nhật)
    import styled from 'styled-components';

    const variantStyles = {
    outline: `   background-color: transparent;
border: 1px solid black;
color: black;`
    };

    const Button = styled.button`
    /_ Kiểu cơ bản _/
    background-color: black;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    font-size: 1rem;

    /_ Áp dụng kiểu biến thể nếu có _/
    ${(props) => props.variant && variantStyles[props.variant]}
    `;

    // Cách sử dụng trong mã JSX
    <Button variant="outline">Edit</Button>

### 2.3. Tạo một `LinkButton` để Điều hướng

Một yêu cầu phổ biến là tạo ra một nút hoạt động như một liên kết điều hướng. Một cách tiếp cận là tạo một thành phần bao bọc (wrapper component) kết hợp `Link` từ `react-router-dom` và `Button` của chúng ta.

Tuy nhiên, một mẫu hình hiệu quả và phổ biến hơn trong `styled-components` là áp dụng trực tiếp các kiểu của một thành phần lên một thành phần khác. Hãy sử dụng cú pháp `styled(Component)` để tạo một `LinkButton` mới bằng cách áp dụng các kiểu giống như nút của chúng ta lên thành phần `Link` của React Router. Cách này hiệu quả hơn vì nó không tạo ra các thẻ DOM không cần thiết và giữ cho cấu trúc thành phần của chúng ta gọn gàng.

    // LinkButton.js
    import { Link } from 'react-router-dom';
    import styled from 'styled-components';

    const LinkButton = styled(Link)`
      display: inline-block;
      background-color: black;
      color: white;
      padding: 10px 15px;
      border: none;
      cursor: pointer;
      text-decoration: none; /* Ghi đè style mặc định của thẻ <a> */
      text-align: center;
    `;

    // Cách sử dụng
    <LinkButton to="/missions/new">New Mission</LinkButton>

**Câu chuyển tiếp:** Sau khi đã thành thạo các nút, chúng ta sẽ chuyển sang các thành phần thiết yếu khác để thu thập dữ liệu từ người dùng: các trường nhập liệu.

\--------------------------------------------------------------------------------

## 3\. Xây dựng các Thành phần Input

Phần này tập trung vào việc tạo các trường nhập liệu có kiểm soát (controlled components) để xử lý dữ liệu nhập của người dùng một cách hiệu quả.

### 3.1. Tạo một Input và TextArea được Tạo kiểu

Để tạo ra một giao diện người dùng sạch sẽ và hiện đại, chúng ta có thể tạo các thành phần `Input` và `TextArea` tùy chỉnh không có viền bằng `styled-components`. Việc loại bỏ các đường viền mặc định giúp các trường nhập liệu hòa nhập liền mạch vào thiết kế tổng thể.

    // input.js
    import styled from 'styled-components';

    export const Input = styled.input`
      border: 0;
      outline: 0;
      font-size: 1.2rem;
      padding: 8px;
    `;

    export const TextArea = styled.textarea`
      border: 0;
      outline: 0;
      font-size: 1rem;
      padding: 8px;
      width: 100%;
    `;

### 3.2. Quản lý Trạng thái (State) với Hook `useState`

Trong React, "controlled components" là các thành phần mà giá trị của chúng được kiểm soát bởi trạng thái của React. Đây là một mẫu hình mạnh mẽ để quản lý dữ liệu biểu mẫu.

1.  **Sử dụng** `**useState**`**:** Chúng ta sử dụng hook `useState` để tạo một biến trạng thái (ví dụ: `title`) nhằm lưu trữ giá trị hiện tại của trường nhập liệu.
2.  **Kết nối Trạng thái với Giao diện:** Chúng ta tạo các hàm xử lý sự kiện thay đổi (`onChange`). Mỗi khi người dùng nhập liệu, các hàm này sẽ được gọi để cập nhật trạng thái bằng các hàm tương ứng (ví dụ: `setTitle`, `setDescriptions`).

    import React, { useState } from 'react';
    import { Input } from './input';

    function NewMissionForm() {
    const [title, setTitle] = useState('');

    return (
    <Input
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Mission title..."
    />
    );
    }

### 3.3. Cải thiện Trải nghiệm Người dùng với `autoFocus`

Một cách đơn giản nhưng hiệu quả để cải thiện trải nghiệm người dùng là sử dụng thuộc tính `autoFocus`. Khi bạn thêm `autoFocus` vào một thành phần `Input`, con trỏ sẽ tự động được đặt vào trường đó ngay khi thành phần được hiển thị trên màn hình. Điều này cho phép người dùng bắt đầu nhập liệu ngay lập tức mà không cần phải nhấp chuột thêm.

    <Input autoFocus placeholder="Enter mission title..." />

**Câu chuyển tiếp:** Bây giờ khi đã có các thành phần cơ bản, hãy xây dựng một thành phần phức tạp và quan trọng hơn: thanh điều hướng.

\--------------------------------------------------------------------------------

## 4\. Xây dựng Thanh điều hướng (Navbar)

Thanh điều hướng là yếu tố cốt lõi của cấu trúc ứng dụng. Phần này trình bày cách xây dựng một thanh điều hướng linh hoạt và có khả năng nhận biết ngữ cảnh.

### 4.1. Cấu trúc Navbar với Flexbox

Flexbox là một công cụ mạnh mẽ để tạo ra các bố cục linh hoạt. Để cấu trúc thanh điều hướng một cách hiệu quả, chúng ta sẽ triển khai một mẫu hình gồm ba phần:

- `**NavBarInner**`: Đây là container chính, sử dụng `display: flex` để sắp xếp các mục con theo chiều ngang.
- `**LeftNav**`: Thành phần con này chứa các liên kết chính. Chúng ta đặt `flex-grow: 1` cho nó, cho phép nó chiếm toàn bộ không gian còn lại. Điều này sẽ đẩy `RightNav` sang cạnh phải của container.
- `**RightNav**`: Thành phần con này chứa các mục ở phía bên phải.
- **Tạo khoảng cách giữa các mục:** Để thêm khoảng cách giữa các mục trong `LeftNav`, chúng ta sử dụng bộ chọn con (`& > *`) để chỉ áp dụng `margin-right` cho các mục bên trong nó.

  import styled from 'styled-components';

  export const NavBarInner = styled.div`  display: flex;
align-items: center;`;

  export const LeftNav = styled.div`
  flex-grow: 1; /_ Chiếm toàn bộ không gian có sẵn _/
  display: flex;

  /_ Áp dụng margin-right cho mọi phần tử con trực tiếp _/
  & > \* {
  margin-right: 10px;
  }
  `;

  export const RightNav = styled.div`  /* Không cần style đặc biệt, sẽ tự động được đẩy sang phải */`;

### 4.2. Sử dụng `NavLink` để Tạo kiểu cho Liên kết Hiện hoạt

React Router cung cấp thành phần `NavLink`, một phiên bản nâng cao của `Link`.

1.  **So sánh với** `**Link**`**:** `NavLink` hoạt động tương tự như `Link`, nhưng có một tính năng bổ sung quan trọng: nó tự động thêm một lớp CSS có tên là `active` vào phần tử được kết xuất khi URL hiện tại khớp với đường dẫn của liên kết.
2.  **Tạo kiểu cho trạng thái** `**active**`**:** Chúng ta có thể tận dụng lớp `active` này bên trong `styled-components` bằng bộ chọn `&.active` để áp dụng các kiểu tùy chỉnh. Ví dụ, chúng ta có thể thêm một đường gạch chân (`border-bottom`) để cung cấp phản hồi trực quan rõ ràng cho người dùng, cho họ biết họ đang ở trang nào.
3.  **Sử dụng** `**prop**` `**end**`**:** Khi tạo liên kết cho trang chủ (`/`), hãy sử dụng `prop` `end`. Điều này đảm bảo liên kết chỉ được coi là "active" khi URL khớp chính xác, ngăn nó khớp với các đường dẫn con như `/missions`.

    // NavItem.js
    import styled from 'styled-components';
    import { NavLink } from 'react-router-dom';

    export const NavItem = styled(NavLink)`
    color: black;
    text-decoration: none;
    padding: 5px 0;

    &.active {
    border-bottom: 1px solid black;
    }
    `;

    // Cách sử dụng
    <NavItem to="/" end>Home</NavItem>

### 4.3. Triển khai Chủ đề (Theming) Động

Chúng ta có thể làm cho Navbar trở nên năng động hơn bằng cách thay đổi giao diện của nó dựa trên tuyến đường (route) hiện tại.

- **Sử dụng** `**useLocation**`**:** Hook `useLocation` từ React Router cho phép chúng ta truy cập `pathname` hiện tại.
- **Logic có điều kiện:** Dựa trên `pathname`, chúng ta xác định một biến chủ đề (ví dụ: `'light'` cho trang chủ, `'dark'` cho các trang khác).
- **Truyền** `**prop**` `**theme**`**:** Biến chủ đề này sau đó được truyền dưới dạng `prop` vào các thành phần con được tạo kiểu. Bên trong định nghĩa kiểu, chúng ta có thể kiểm tra `prop` này để áp dụng các giá trị CSS khác nhau một cách có điều kiện.

Đây là một ví dụ hoàn chỉnh về cách triển khai mẫu hình này:

    import { useLocation, NavLink } from 'react-router-dom';
    import styled from 'styled-components';

    // 1. Tạo một thành phần được tạo kiểu có thể nhận prop 'theme'
    const StyledNavItem = styled(NavLink)`
      padding: 5px 0;
      text-decoration: none;
      /* 4. Áp dụng style có điều kiện dựa trên theme */
      color: ${(props) => (props.theme === 'light' ? 'black' : 'white')};

      &.active {
        border-bottom: 1px solid ${(props) => (props.theme === 'light' ? 'black' : 'white')};
      }
    `;

    // 2. Bên trong thành phần Navbar của bạn
    function Navbar() {
      const { pathname } = useLocation();
      // 3. Xác định theme dựa trên logic
      const theme = pathname === '/' ? 'light' : 'dark';

      return (
        <nav>
          {/* 4. Truyền prop 'theme' vào các thành phần con */}
          <StyledNavItem to="/" end theme={theme}>
            Home
          </StyledNavItem>
          <StyledNavItem to="/missions" theme={theme}>
            Missions
          </StyledNavItem>
        </nav>
      );
    }

**Câu chuyển tiếp:** Cuối cùng, hãy kết hợp tất cả các thành phần này lại để tạo ra một trang tương tác hoàn chỉnh.

\--------------------------------------------------------------------------------

## 5\. Kết hợp Tất cả: Tạo một Trang Tương tác

Phần này tổng hợp các kiến thức đã học để xây dựng một tính năng thực tế: một trang có chế độ xem và chế độ chỉnh sửa.

### 5.1. Bố cục với Grid và Flexbox

Cả CSS Grid và Flexbox đều là những công cụ bố cục mạnh mẽ, mỗi loại có thế mạnh riêng.

| Kỹ thuật Bố cục | Trường hợp Sử dụng                               | Ví dụ                                                                                                                                                   |
| --------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CSS Grid**    | Sắp xếp các mục thành các cột có độ rộng cụ thể. | Dùng `display: grid` và `grid-template-columns: 1fr 200px;` để căn chỉnh tiêu đề trang và một nhóm các nút hành động.                                   |
| **Flexbox**     | Đẩy một phần tử sang cạnh phải của container.    | Dùng `display: flex` và `flex-grow: 1` trên phần tử đầu tiên để đẩy phần tử thứ hai sang phải, như cách đặt nút "New Mission" ở bên phải tiêu đề trang. |

### 5.2. Hiển thị có Điều kiện (Conditional Rendering) cho Chế độ Chỉnh sửa

Hiển thị có điều kiện cho phép chúng ta chuyển đổi giữa các giao diện khác nhau trong cùng một thành phần dựa trên trạng thái.

1.  **Thiết lập Trạng thái** `**editing**`**:** Chúng ta sử dụng hook `useState` để khởi tạo một biến trạng thái boolean, ví dụ: `const [editing, setEditing] = useState(false);`.
2.  **Triển khai Logic:** Trong câu lệnh `return` của thành phần, chúng ta sử dụng toán tử tam phân (`? :`). Nếu `editing` là `false`, chúng ta hiển thị các nút "Edit" / "Delete". Nếu `editing` là `true`, chúng ta hiển thị các thành phần `Input` và `TextArea` đã tạo trước đó để người dùng chỉnh sửa.
3.  **Xử lý Sự kiện:** Các trình xử lý sự kiện `onClick` trên các nút "Edit" và "Cancel" sẽ gọi hàm `setEditing` (với giá trị `true` hoặc `false` tương ứng) để chuyển đổi trạng thái này, qua đó thay đổi giao diện được hiển thị.

    function MissionDetails() {
    const [editing, setEditing] = useState(false);
    // Giả sử có trạng thái cho title và description
    const [title, setTitle] = useState('Initial Mission Title');
    const [description, setDescription] = useState('Initial description.');

    return editing ? (
    // Giao diện chỉnh sửa
    <div>
    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
    <TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
    <Button onClick={() => setEditing(false)}>Cancel</Button>
    <Button>Update</Button>
    </div>
    ) : (
    // Giao diện xem
    <div>
    <h1>{title}</h1>
    <p>{description}</p>
    <Button variant="outline" onClick={() => setEditing(true)}>Edit</Button>
    </div>
    );
    }

\--------------------------------------------------------------------------------

## 6\. Tổng kết

Xin chúc mừng! Qua hướng dẫn này, bạn đã trang bị cho mình những kỹ năng nền tảng để xây dựng các giao diện người dùng hiện đại và tương tác trong React. Cụ thể, bạn đã học được cách:

- Tạo các thành phần UI tùy chỉnh, có thể tái sử dụng bằng `styled-components`.
- Sử dụng `props` để tạo các biến thể linh hoạt cho thành phần.
- Quản lý trạng thái của các trường nhập liệu bằng hook `useState`.
- Xây dựng các bố cục phức tạp bằng Flexbox và CSS Grid.
- Tích hợp các thành phần với React Router để tạo kiểu động và điều hướng.
- Triển khai hiển thị có điều kiện để tạo ra các giao diện người dùng tương tác.

Với những kỹ năng này, bạn đã sẵn sàng để tiếp tục khám phá sâu hơn và bắt đầu xây dựng các dự án React của riêng mình. Chúc bạn thành công trên hành trình lập trình của mình!

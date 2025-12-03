# Làm Chủ Dữ Liệu trong React: Hướng Dẫn Toàn Diện về Props và State

### Giới thiệu: "Hơi thở" của một Ứng dụng React

Để xây dựng các giao diện người dùng (UI) tương tác hiệu quả trong React, việc nắm vững cách quản lý dữ liệu là yêu cầu cốt lõi. Đây chính là "hơi thở" làm cho một ứng dụng trở nên sống động và tương tác, thay vì chỉ là một trang tĩnh. Trong React, việc quản lý dữ liệu này xoay quanh hai khái niệm nền tảng: `props` và `state`. `Props` là cách chúng ta truyền dữ liệu từ bên ngoài vào một component, trong khi `state` là bộ nhớ nội tại cho phép một component tự quản lý dữ liệu của chính nó.

Hãy cùng nhau khám phá cách truyền dữ liệu vào các component thông qua `props` trước tiên.

## 1\. Props: "Đạo cụ" cho Component của bạn

`Props` (viết tắt của properties) là cơ chế một chiều để truyền dữ liệu từ component cha xuống component con. Hãy tưởng tượng component của bạn là một diễn viên, và `props` chính là những đạo cụ và kịch bản mà đạo diễn (component cha) đưa cho để diễn viên biết phải làm gì và nói gì.

### 1.1. `Props` là gì?

Cách đơn giản nhất để hiểu `props` là coi chúng như các **tham số (arguments)** bạn truyền vào một hàm JavaScript thông thường.

- Về bản chất, `props` là một **đối tượng JavaScript đơn thuần**. Khi bạn viết `<UserCard name="Bill" role="Cướp biển" />` trong JSX, React sẽ tự động thu thập tất cả các thuộc tính này (`name`, `role`) và gói chúng vào một đối tượng JavaScript duy nhất. Đối tượng đó chính là `props`.
- Một quy tắc vàng cần nhớ: `props` là **chỉ đọc (read-only)**. Component con nhận `props` không thể và không nên cố gắng thay đổi chúng. Quy tắc này đảm bảo một luồng dữ liệu một chiều, có thể dự đoán được (từ cha xuống con), giúp việc gỡ lỗi và hiểu ứng dụng trở nên dễ dàng hơn rất nhiều.

### 1.2. Cách Truyền và Sử dụng `Props`

Hãy xem một ví dụ đơn giản để hiểu rõ luồng dữ liệu này. Giả sử chúng ta có một component `App` (cha) muốn hiển thị thông tin người dùng thông qua một component `UserCard` (con).

#### Bước 1: Truyền Props từ Component Cha (`App.js`)

Chúng ta truyền dữ liệu vào `UserCard` dưới dạng các thuộc tính JSX, trông rất giống các thuộc tính HTML.

    // File: App.js
    import UserCard from './UserCard';

    function App() {
      return (
        <div>
          <h1>Thành viên phi hành đoàn</h1>
          <UserCard name="Bill" role="Thuyền trưởng" />
          <UserCard name="Jane" role="Cướp biển" />
          <UserCard name="Dave" /> {/* Sẽ sử dụng vai trò mặc định */}
        </div>
      );
    }

    export default App;

#### Bước 2: Nhận và Sử dụng Props trong Component Con (`UserCard.js`)

Trong component con, chúng ta có hai cách phổ biến để truy cập dữ liệu được truyền vào.

- **Cách 1 (Cơ bản): Truy cập qua đối tượng** `**props**` Component `UserCard` nhận một đối tượng `props` chứa tất cả các dữ liệu đã được truyền.
- **Cách 2 (Tốt hơn): Sử dụng Destructuring** Đây là một kỹ thuật của JavaScript cho phép bạn "giải nén" các giá trị từ đối tượng một cách gọn gàng ngay tại tham số của hàm, đồng thời có thể gán giá trị mặc định.

Việc sử dụng destructuring không chỉ giúp code ngắn gọn hơn. Về mặt cơ chế, nó cho phép bạn kéo các giá trị theo key (`name`, `role`) trực tiếp ra khỏi đối tượng `props` và đưa chúng vào phạm vi (scope) của hàm như những biến độc lập. Kết quả là bạn có thể truy cập thẳng vào `name` và `role` thay vì phải gõ `props.name` và `props.role` mỗi lần, giúp code sạch sẽ và dễ đọc hơn đáng kể.

Vậy điều gì sẽ xảy ra khi một component cần quản lý dữ liệu của riêng nó, dữ liệu có thể thay đổi theo thời gian dựa trên tương tác của người dùng? Đây chính là lúc `state` phát huy tác dụng.

## 2\. State: Bộ nhớ Nội tại của Component

`State` cho phép một component "ghi nhớ" thông tin và thay đổi giao diện của nó để phản hồi lại các sự kiện (ví dụ: người dùng nhấp vào nút). Để thêm state vào các functional component, chúng ta sử dụng một công cụ đặc biệt gọi là Hook.

### 2.1. Giới thiệu Hook `useState`

- **Hook là gì?** Hook là các hàm đặc biệt của React (luôn bắt đầu bằng `use`) cho phép bạn "móc" vào các tính năng của React, như state, từ bên trong các functional component. Cần lưu ý rằng Hook chỉ có thể được gọi ở cấp cao nhất của component, không nằm trong các vòng lặp hay điều kiện, và đây là một quy tắc quan trọng bạn sẽ tìm hiểu sâu hơn sau này.
- `**useState**` **là gì?** Đây là Hook phổ biến và cơ bản nhất, được sử dụng để thêm trạng thái (state) vào component.
- **Cú pháp:** Khi bạn gọi `useState`, bạn cung cấp một giá trị trạng thái ban đầu. Nó trả về một mảng chứa hai phần tử:
- Chúng ta sử dụng kỹ thuật _array destructuring_ của JavaScript ở đây vì hook `useState` luôn trả về một mảng có hai phần tử theo đúng thứ tự này: giá trị hiện tại và hàm cập nhật. Kỹ thuật này cho phép chúng ta đặt tên cho chúng một cách tiện lợi.
  1.  `tenBienState`: Biến chứa giá trị hiện tại của state. Trong lần render đầu tiên, nó sẽ bằng `giaTriBanDau`.
  2.  `setTenBienState`: Một hàm đặc biệt cho phép bạn cập nhật giá trị của state.
  3.  `giaTriBanDau`: Giá trị khởi tạo cho state.

### 2.2. `useState` hoạt động như thế nào?

Quy trình cập nhật state rất đơn giản nhưng cực kỳ mạnh mẽ:

1.  Khi hàm cập nhật trạng thái (ví dụ: `setCount`) được gọi với một giá trị mới...
2.  ...React sẽ **lên lịch render lại (re-render)** component đó.
3.  Trong lần render lại, biến trạng thái (ví dụ: `count`) sẽ có giá trị mới nhất.
4.  React đủ thông minh để chỉ thực hiện render lại nếu giá trị mới khác với giá trị trước đó để tối ưu hóa hiệu suất.

Cách tốt nhất để thực sự hiểu `useState` là thông qua các ví dụ thực tế.

## 3\. `useState` Qua các Ví dụ Thực tế

### 3.1. Ví dụ 1: Bộ đếm đơn giản

Đây là ví dụ kinh điển để minh họa `useState`. Chúng ta sẽ tạo một nút bấm để tăng một số đếm.

    import React, { useState } from 'react';

    function Counter() {
      // 1. Khởi tạo State
      const [count, setCount] = useState(0);

      return (
        <div>
          {/* 2. Hiển thị State */}
          <p>Bạn đã nhấn {count} lần</p>

          {/* 3. Cập nhật State */}
          <button onClick={() => setCount(count + 1)}>
            Nhấn vào tôi
          </button>
        </div>
      );
    }

    export default Counter;

**Phân tích Code:**

1.  **Khởi tạo State:** Dòng `const [count, setCount] = useState(0);` thiết lập một state tên là `count` với giá trị ban đầu là `0`.
2.  **Hiển thị State:** Trong JSX, chúng ta sử dụng `{count}` để hiển thị giá trị hiện tại của biến `count`.
3.  **Cập nhật State:** Thuộc tính `onClick` của button được gán một hàm. Khi người dùng nhấp vào nút, hàm này sẽ được thực thi, gọi `setCount(count + 1)`. Lệnh này yêu cầu React render lại component với giá trị `count` mới.

### 3.2. Ví dụ 2: Quản lý State là một Đối tượng

State không chỉ giới hạn ở các kiểu dữ liệu nguyên thủy như số hay chuỗi. Bạn hoàn toàn có thể lưu trữ một đối tượng. Tuy nhiên, có một lưu ý quan trọng khi cập nhật nó.

    import React, { useState } from 'react';

    function UserProfile() {
      const [user, setUser] = useState({
        name: 'Bill',
        isEmployed: true
      });

      const toggleEmployment = () => {
        // Cập nhật state một cách chính xác
        setUser({ ...user, isEmployed: !user.isEmployed });
      };

      return (
        <div>
          <p>Tên: {user.name}</p>
          <p>Tình trạng việc làm: {user.isEmployed ? 'Đang làm việc' : 'Đã nghỉ việc'}</p>
          <button onClick={toggleEmployment}>
            Thay đổi trạng thái
          </button>
        </div>
      );
    }

    export default UserProfile;

- **Vấn đề:** Khi cập nhật một đối tượng trong state, bạn không thể chỉ thay đổi một thuộc tính, ví dụ: `setUser({ isEmployed: false })`. Làm như vậy sẽ **thay thế toàn bộ đối tượng state cũ** bằng một đối tượng mới chỉ có thuộc tính `isEmployed`, làm mất đi thuộc tính `name`.

Đây là một lỗi phổ biến mà người mới bắt đầu thường gặp. May mắn thay, giải pháp không chỉ đơn giản mà còn tuân theo một quy tắc nền tảng của React về tính bất biến (immutability).

- **Giải pháp:** Chúng ta sử dụng **cú pháp spread (**`**...**`**)** của JavaScript. Dòng `setUser({ ...user, isEmployed: !user.isEmployed })` có thể được hiểu là: "Tạo một đối tượng mới, sao chép tất cả các cặp key-value từ đối tượng `user` cũ vào đó, sau đó ghi đè thuộc tính `isEmployed` bằng giá trị mới." Cách tiếp cận này tuân thủ nguyên tắc bất biến: thay vì thay đổi (mutate) đối tượng state cũ, chúng ta tạo ra một đối tượng hoàn toàn mới. Đây là cách React nhận biết sự thay đổi một cách hiệu quả để lên lịch render lại.

Bây giờ, hãy tóm tắt và so sánh trực tiếp hai khái niệm quan trọng này.

## 4\. Bảng So sánh: Props vs. State

Để củng cố kiến thức, bảng dưới đây sẽ so sánh trực tiếp `props` và `state` dựa trên các tiêu chí chính:

| Tiêu chí              | Props                                                   | State                                               |
| --------------------- | ------------------------------------------------------- | --------------------------------------------------- |
| **Nguồn gốc**         | Được truyền từ component cha.                           | Được quản lý bên trong chính component.             |
| **Khả năng thay đổi** | **Bất biến** (Không thể thay đổi bởi component con).    | **Khả biến** (Có thể thay đổi bằng hàm setter).     |
| **Mục đích chính**    | Cấu hình và truyền dữ liệu xuống cây component.         | Quản lý dữ liệu tương tác, thay đổi theo thời gian. |
| **Cú pháp truy cập**  | `props.tenProp` hoặc `{ tenProp }` (khi destructuring). | `tenBienState` (từ `useState`).                     |

## Kết luận: Bước Đi Đầu Tiên trên Hành Trình React

`Props` và `state` là hai trụ cột chính trong việc quản lý luồng dữ liệu của một ứng dụng React. `Props` cho phép dữ liệu chảy từ trên xuống, giúp các component giao tiếp với nhau. `State` cung cấp bộ nhớ nội tại, cho phép component trở nên năng động và phản ứng với người dùng.

Việc nắm vững cách chúng hoạt động, khi nào nên sử dụng cái nào, là bước cơ bản và quan trọng nhất để bạn có thể tự tin xây dựng các ứng dụng React mạnh mẽ và có tính tương tác cao. Chúc mừng bạn đã hoàn thành bước đi đầu tiên này, hãy tiếp tục khám phá và xây dựng những điều tuyệt vời!

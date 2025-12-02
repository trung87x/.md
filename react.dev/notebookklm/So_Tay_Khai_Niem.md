# Sổ tay về State và Props trong React cho người mới bắt đầu

### Giới thiệu

Chào mừng bạn đến với thế giới của React! Trong React, chúng ta xây dựng giao diện người dùng (UI) bằng cách kết hợp các mảnh ghép có thể tái sử dụng gọi là **component**. Hãy tưởng tượng mỗi component giống như một "công thức nấu ăn" cho một phần của giao diện. Để một công thức trở nên hữu ích, nó cần "nguyên liệu".

Trong React, `props` và `state` là hai loại "nguyên liệu" chính mà các component sử dụng. Mặc dù cả hai đều là các đối tượng JavaScript đơn giản, chúng có nguồn gốc và mục đích rất khác nhau. Việc hiểu rõ sự khác biệt giữa chúng là một trong những bước đầu tiên và quan trọng nhất để trở thành một lập trình viên React thành thạo.

Sổ tay này sẽ giúp bạn phân biệt rõ ràng giữa `props` và `state`, đồng thời hướng dẫn bạn cách sử dụng chúng một cách chính xác để xây dựng các ứng dụng tương tác và mạnh mẽ.

\--------------------------------------------------------------------------------

### 1\. Props: Truyền Dữ liệu từ "Bên ngoài"

Phần này giải thích cách các component nhận dữ liệu từ các component cha của chúng, cho phép tùy chỉnh và tái sử dụng.

#### 1.1. Props là gì?

`Props` (viết tắt của "properties") là cách để truyền dữ liệu từ component cha xuống component con. Chúng giống như các đối số bạn truyền cho một hàm. Điều này cho phép component cha cấu hình và tùy chỉnh hành vi cũng như giao diện của các component con.

Hãy xem xét ví dụ về một `Toolbar` (thanh công cụ) chứa các nút bấm. `Toolbar` là component cha và mỗi nút là một component con `AlertButton`. `Toolbar` có thể tùy chỉnh thông điệp mà mỗi nút hiển thị khi được nhấp vào bằng cách truyền props.

    function AlertButton({ message, children }) {
      return (
        <button onClick={() => alert(message)}>
          {children}
        </button>
      );
    }

    export default function Toolbar() {
      return (
        <div>
          <AlertButton message="Playing!">
            Play Movie
          </AlertButton>
          <AlertButton message="Uploading!">
            Upload Image
          </AlertButton>
        </div>
      );
    }

Trong ví dụ trên:

- Component `Toolbar` truyền hai props cho mỗi `AlertButton`:
  - `message`: một chuỗi JavaScript.
  - `children`: một prop đặc biệt chứa nội dung JSX bên trong thẻ component (ví dụ: "Play Movie").
- Component `AlertButton` nhận các props này và sử dụng chúng để hiển thị nội dung và xác định hành động khi nhấp chuột.

Props có thể là bất kỳ giá trị JavaScript nào: chuỗi, số, đối tượng, mảng, và thậm chí cả các hàm.

#### 1.2. Tính chất quan trọng nhất: Props là bất biến (Read-Only)

Đây là quy tắc cốt lõi: một component **không bao giờ được phép thay đổi props của chính nó**. Chúng là bất biến (immutable), hay chỉ đọc (read-only).

Hãy tưởng tượng một component `Clock` nhận các props `color` và `time`, với `time` thay đổi mỗi giây.

    function Clock({ color, time }) {
      return (
        <h1 style={{ color: color }}>
          {time}
        </h1>
      );
    }

Sự thay đổi của `time` không phải do component `Clock` tự thực hiện. Thay vào đó, component cha của nó sẽ truyền một giá trị `time` _mới_ vào mỗi giây. `Clock` chỉ đơn giản là nhận và hiển thị bất kỳ giá trị `time` nào được đưa cho nó tại một thời điểm nhất định.

Điều này củng cố ý tưởng rằng props phản ánh dữ liệu của component tại một thời điểm (giống như một bức ảnh chụp nhanh) và được kiểm soát hoàn toàn bởi component cha.

Khi một component cần thay đổi dữ liệu để phản ứng với tương tác người dùng, nó sẽ cần đến `state`, không phải `props`.

#### 1.3. Ví dụ thực tế: Dùng props để hiển thị có điều kiện

Props rất hữu ích trong việc điều khiển logic hiển thị, giúp tạo ra các component linh hoạt và có thể tái sử dụng.

Ví dụ, component `Item` dưới đây nhận một prop boolean là `isPacked`. Dựa vào giá trị `true` hay `false` của prop này, nó quyết định có hiển thị dấu tick (✅) hay không.

    function Item({ name, isPacked }) {
      if (isPacked) {
        return <li className="item">{name} ✅</li>;
      }
      return <li className="item">{name}</li>;
    }

    export default function PackingList() {
      return (
        <section>
          <h1>Sally Ride's Packing List</h1>
          <ul>
            <Item
              isPacked={true}
              name="Space suit"
            />
            <Item
              isPacked={false}
              name="Photo of Tam"
            />
          </ul>
        </section>
      );
    }

Component `PackingList` (cha) có thể điều khiển cách mỗi `Item` (con) được hiển thị chỉ bằng cách truyền một prop đơn giản.

_Chuyển tiếp: Sau khi hiểu cách component nhận dữ liệu từ bên ngoài qua props, chúng ta sẽ khám phá cách chúng tự quản lý và ghi nhớ thông tin của riêng mình bằng state._

\--------------------------------------------------------------------------------

### 2\. State: "Bộ nhớ" của Component

Phần này giới thiệu khái niệm state là bộ nhớ nội tại của một component, cho phép nó theo dõi các thay đổi theo thời gian để phản ứng với tương tác.

#### 2.1. Tại sao biến thông thường là không đủ?

Hãy xem xét một component thư viện ảnh. Nó cần "ghi nhớ" chỉ số của hình ảnh hiện tại để người dùng có thể nhấp vào "Next" để xem ảnh tiếp theo. Bạn có thể thử sử dụng một biến JavaScript thông thường:

    // Đây là một nỗ lực thất bại!
    export default function Gallery() {
      let index = 0;

      function handleClick() {
        index = index + 1; // Thay đổi biến cục bộ
      }
      // ...
    }

Cách tiếp cận này thất bại vì hai lý do chính:

1.  **Biến cục bộ không tồn tại giữa các lần render.** Khi React render lại component này, nó sẽ chạy hàm `Gallery` từ đầu. Mọi thay đổi đối với `index` sẽ bị mất và nó sẽ được khởi tạo lại thành `0`.
2.  **Thay đổi biến cục bộ không kích hoạt một lần render mới.** React không biết rằng biến đã thay đổi, vì vậy nó không render lại component để hiển thị giao diện đã cập nhật.

Để cập nhật một component với dữ liệu mới, chúng ta cần hai thứ: **giữ lại** dữ liệu giữa các lần render và **kích hoạt** React để render component với dữ liệu mới.

#### 2.2. Giới thiệu Hook `useState`

`useState` là một Hook của React cung cấp chính xác hai thứ mà biến thông thường thiếu:

1.  Một **biến state** để lưu giữ dữ liệu giữa các lần render.
2.  Một **hàm set state** để cập nhật biến đó và kích hoạt React render lại component.

Để sử dụng `useState`, hãy import nó từ React và thay thế biến cục bộ:

    import { useState } from 'react';

    export default function Gallery() {
      const [index, setIndex] = useState(0);
      // ...
    }

Hãy phân tích cú pháp "destructuring mảng" này:

- `const [index, setIndex] = ...`: `useState` trả về một mảng có đúng hai phần tử.
  - `index`: Là **biến state** của bạn. Giá trị của nó được React "ghi nhớ" giữa các lần render.
  - `setIndex`: Là **hàm setter**. Bạn sử dụng hàm này để yêu cầu một bản cập nhật state và một lần render mới.
- `useState(0)`: Đây là lời gọi Hook `useState`. `0` là **giá trị ban đầu** của biến state `index`.

Bây giờ, khi người dùng nhấp vào nút "Next", chúng ta gọi `setIndex` để cập nhật state. Điều này sẽ kích hoạt một lần render mới và hiển thị hình ảnh tiếp theo.

    import { useState } from 'react';
    import { sculptureList } from './data.js';

    export default function Gallery() {
      const [index, setIndex] = useState(0);

      function handleClick() {
        setIndex(index + 1); // Yêu cầu render lại với index mới
      }

      let sculpture = sculptureList[index];
      return (
        <>
          <button onClick={handleClick}>
            Next
          </button>
          <h2>
            <i>{sculpture.name} </i>
            by {sculpture.artist}
          </h2>
          <h3>
            ({index + 1} of {sculptureList.length})
          </h3>
          <img
            src={sculpture.url}
            alt={sculpture.alt}
          />
          <p>
            {sculpture.description}
          </p>
        </>
      );
    }

#### 2.3. Hiểu cốt lõi: Set State kích hoạt Render và State là một "Snapshot"

Hành động quan trọng nhất của hàm setter (như `setIndex`) là **yêu cầu React xếp hàng một lần render mới**. React sẽ gọi lại hàm component của bạn, và trong lần render mới đó, `useState` sẽ trả về giá trị state tiếp theo.

Một khái niệm quan trọng cần nắm vững là: **giá trị của state được cố định trong một lần render.**

Hãy xem ví dụ về một bộ đếm. Điều gì sẽ xảy ra nếu bạn gọi `setNumber` ba lần trong cùng một trình xử lý sự kiện?

    function Counter() {
      const [number, setNumber] = useState(0);

      return (
        <button onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}>+3</button>
      );
    }

Khi bạn nhấp vào nút, `number` chỉ tăng lên `1`, không phải `3`. Lý do là vì trong lần render mà bạn nhấp vào nút, giá trị của `number` là `0`. Mỗi lệnh gọi `setNumber(number + 1)` thực chất là `setNumber(0 + 1)`. Bạn đang yêu cầu React thay đổi state thành `1` ba lần liên tiếp.

**State hoạt động giống như một bức ảnh chụp nhanh (snapshot).** Việc set state không thay đổi biến state bạn đang có trong lần render hiện tại, mà nó yêu cầu một lần render mới với một giá trị state mới.

_Chuyển tiếp: Bây giờ bạn đã biết về props và state, hãy đặt chúng cạnh nhau để thấy rõ sự khác biệt và cách chúng bổ sung cho nhau._

\--------------------------------------------------------------------------------

### 3\. Props vs. State: So sánh trực quan

Để củng cố sự hiểu biết của bạn, đây là bảng so sánh trực tiếp các đặc điểm chính của `props` và `state`.

| Tiêu chí              | Props                                                                    | State                                                                                         |
| --------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| **Nguồn gốc**         | Được truyền từ component cha.                                            | Được quản lý bên trong chính component đó.                                                    |
| **Khả năng thay đổi** | **Bất biến** (Read-Only). Component con không thể thay đổi props của nó. | **Khả biến** (thay đổi được). Luôn phải được cập nhật bằng hàm setter để kích hoạt re-render. |
| **Mục đích chính**    | Dùng để cấu hình và truyền dữ liệu xuống cây component.                  | Dùng làm "bộ nhớ" để theo dõi các thông tin thay đổi do tương tác.                            |
| **Ví dụ ẩn dụ**       | Giống như các "tham số" được truyền vào một hàm.                         | Giống như các "biến cục bộ" của một hàm nhưng có khả năng tồn tại sau khi hàm kết thúc.       |

_Chuyển tiếp: Trong thực tế, props và state không hoạt động độc lập mà thường kết hợp với nhau để tạo ra luồng dữ liệu cho ứng dụng. Hãy xem cách chúng phối hợp qua một mẫu hình phổ biến._

\--------------------------------------------------------------------------------

### 4\. Luồng dữ liệu: "Lifting State Up"

Đây là mẫu hình phổ biến nhất về cách `props` và `state` làm việc cùng nhau. Ý tưởng là di chuyển state lên một component cha chung để nhiều component con có thể chia sẻ và điều khiển cùng một state.

#### 4.1. Nguồn chân lý duy nhất (Single Source of Truth)

Nguyên tắc này nói rằng state cho một phần dữ liệu cụ thể nên được đặt ở một vị trí duy nhất. Vị trí đó thường là component cha chung gần nhất cần truy cập hoặc điều khiển state đó.

#### 4.2. Ví dụ thực tế: Trò chơi Tic-Tac-Toe

Hãy cùng xem xét trò chơi Tic-Tac-Toe để hiểu rõ quá trình "nâng state lên" từng bước một.

- **Vấn đề: State bị phân tán** Ban đầu, chúng ta có thể nghĩ đến việc mỗi ô vuông (`Square`) tự quản lý trạng thái của chính nó, ví dụ như lưu giá trị 'X' hoặc 'O'.
- Tại sao cách này lại có vấn đề? Component `Board` (bàn cờ) là cha của các `Square`, nhưng nó không thể "đọc" được state của các con. Do đó, `Board` không thể xác định người chiến thắng hay quản lý lượt đi giữa 'X' và 'O'.
- **Giải pháp: "Nâng state lên" (Lifting State Up)** Để giải quyết vấn đề này, chúng ta sẽ di chuyển state từ các component `Square` riêng lẻ lên component `Board` cha.
  1.  **Loại bỏ state khỏi component con:** Đầu tiên, chúng ta xóa state khỏi `Square`. `Square` giờ đây sẽ nhận giá trị và hàm xử lý sự kiện click từ props. Nó trở thành một "component được kiểm soát" (controlled component).
  2.  **Tập trung state ở component cha:** Tiếp theo, chúng ta di chuyển state lên `Board`. `Board` sẽ quản lý một mảng `squares` gồm 9 phần tử, đại diện cho trạng thái của toàn bộ bàn cờ.
  3.  **Truyền dữ liệu và hàm xử lý xuống qua props:** Bây giờ, `Board` sẽ truyền state và các hàm cần thiết xuống cho mỗi `Square` thông qua props:
      - `value`: giá trị của ô vuông (`squares[i]`).
      - `onSquareClick`: một hàm mà `Square` sẽ gọi khi được nhấp vào, để thông báo cho `Board` cập nhật state.

Đây là một mẫu hình cực kỳ phổ biến trong React: state "sống" ở component cấp cao, luồng dữ liệu đi xuống thông qua `props`, trong khi các sự kiện tương tác đi ngược lên thông qua các hàm callback cũng được truyền qua `props`.

_Chuyển tiếp: Chúng ta đã đi qua những khái niệm nền tảng nhất. Hãy cùng tổng kết lại những nguyên tắc cốt lõi bạn cần ghi nhớ khi làm việc với state và props._

\--------------------------------------------------------------------------------

### 5\. Tổng kết: Những Nguyên tắc Vàng

Dưới đây là danh sách các điểm chính bạn đã học, hãy ghi nhớ chúng khi xây dựng các component React của mình.

- **Props** dùng để truyền dữ liệu **từ trên xuống**. Chúng là **read-only**.
- **State** là **bộ nhớ riêng** của một component để xử lý các tương tác.
- Khi bạn muốn thay đổi màn hình, hãy gọi hàm **set state**.
- State hoạt động như một **snapshot**, giá trị của nó được cố định trong mỗi lần render.
- Đối với dữ liệu cần được chia sẻ bởi nhiều component, hãy **nâng state lên (lift state up)** đến component cha chung gần nhất của chúng.
- Luôn đối xử với state (cả object và array) như thể chúng là **bất biến**. Thay vì sửa đổi trực tiếp, hãy tạo một bản sao mới và set state thành bản sao đó. Nguyên tắc này giúp ngăn ngừa các lỗi tinh vi khi component không re-render đúng cách và làm cho việc gỡ lỗi trở nên dễ dàng hơn vì bạn có thể theo dõi rõ ràng sự thay đổi của state giữa các lần render.

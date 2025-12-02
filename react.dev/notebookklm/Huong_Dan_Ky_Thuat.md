# Hướng dẫn Toàn diện về Quản lý Trạng thái trong React

## Giới thiệu: Nền tảng của các Ứng dụng React Tương tác

Trong việc xây dựng các ứng dụng web hiện đại, khả năng tạo ra các giao diện người dùng (UI) động, có khả năng tương tác cao là yếu tố then chốt. Nắm vững quản lý trạng thái (state management) chính là cốt lõi của khả năng này trong React. Việc hiểu rõ các nguyên tắc của nó là điều phân biệt giữa một kỹ sư React cấp cao và một người mới bắt đầu. Mô hình quản lý trạng thái của React được thiết kế để tạo ra các giao diện người dùng **dễ dự đoán, có tính khai báo và khả năng mở rộng**. Nó cho phép các component "ghi nhớ" thông tin, phản hồi lại tương tác của người dùng và hiển thị dữ liệu một cách linh hoạt.

Để hiểu tại sao trạng thái lại quan trọng đến vậy, hãy xem xét sự khác biệt giữa trạng thái và một biến JavaScript thông thường. Trong component `Gallery` bên dưới, biến cục bộ `index` được sử dụng để theo dõi hình ảnh hiện tại. Tuy nhiên, việc nhấp vào nút "Next" không hề thay đổi giao diện:

    // Biến cục bộ không hoạt động như mong đợi!
    export default function Gallery() {
      let index = 0;

      function handleClick() {
        index = index + 1; // Biến này thay đổi...
      }
      // ... nhưng component không được render lại,
      // vì vậy giao diện người dùng không được cập nhật.
    }

Vấn đề ở đây có hai mặt:

1.  **Biến cục bộ không tồn tại giữa các lần render.** Khi React render lại một component, nó sẽ thực thi hàm từ đầu. Mọi thay đổi đối với các biến cục bộ sẽ bị mất.
2.  **Việc thay đổi biến cục bộ không kích hoạt quá trình render.** React không nhận biết được rằng component cần được render lại với dữ liệu mới.

Đây là lúc trạng thái phát huy tác dụng. Bằng cách sử dụng các công cụ quản lý trạng thái của React, chúng ta có thể lưu trữ dữ liệu tồn tại giữa các lần render và kích hoạt các bản cập nhật giao diện người dùng một cách có chủ đích. React được xây dựng dựa trên khái niệm các component là các hàm thuần khiết (pure functions)—với cùng một đầu vào, chúng phải luôn trả về cùng một JSX. Quản lý trạng thái đúng cách là chìa khóa để duy trì tính thuần khiết này, tạo ra các ứng dụng có thể dự đoán, dễ gỡ lỗi và có khả năng mở rộng.

Hướng dẫn này sẽ đi sâu vào các khái niệm cơ bản về trạng thái, khám phá các Hooks mạnh mẽ của React và trình bày các phương pháp hay nhất để cấu trúc và quản lý trạng thái trong các ứng dụng của bạn.

## 1\. Các Khái niệm Nền tảng về Trạng thái

Trước khi đi sâu vào các kỹ thuật cụ thể, việc nắm vững các nguyên tắc cốt lõi về cách React xử lý trạng thái là vô cùng cần thiết. Việc coi trạng thái như một "bộ nhớ" riêng tư của component và hiểu cách nó tương tác với vòng đời render là nền tảng chiến lược để xây dựng các ứng dụng React mạnh mẽ và dễ bảo trì.

### 1.1. Trạng thái là Gì? Bộ nhớ của Component

Trạng thái là bộ nhớ cục bộ, riêng tư của một component. Nó cho phép component "ghi nhớ" thông tin như tương tác của người dùng, dữ liệu được tìm nạp từ API, hoặc các thay đổi giao diện người dùng khác giữa các lần render. Hook `useState` cung cấp hai khả năng cốt lõi làm nền tảng cho việc quản lý trạng thái trong React:

1.  **Duy trì dữ liệu giữa các lần render:** Không giống như các biến thông thường bị đặt lại mỗi khi một hàm được gọi, các biến trạng thái được React lưu giữ.
2.  **Kích hoạt render:** Khi bạn cập nhật một biến trạng thái bằng hàm setter của nó, bạn sẽ yêu cầu React xếp một lần render mới vào hàng đợi. React sẽ gọi lại component của bạn với dữ liệu mới và cập nhật giao diện người dùng.

Bảng dưới đây so sánh trực tiếp sự khác biệt giữa biến cục bộ và biến trạng thái.

| Tính năng            | Biến cục bộ (`let index = 0;`)                               | Biến trạng thái (`const [index, setIndex] = useState(0);`)         |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------ |
| **Khả năng tồn tại** | Bị đặt lại sau mỗi lần render.                               | Được React duy trì giữa các lần render.                            |
| **Kích hoạt render** | Việc thay đổi không kích hoạt render lại.                    | Việc gọi hàm setter (`setIndex`) sẽ kích hoạt một lần render mới.  |
| **Vai trò**          | Chỉ hữu ích cho các tính toán trong một lần render duy nhất. | Cần thiết để lưu trữ dữ liệu tương tác và phản hồi lại người dùng. |

### 1.2. Trạng thái như một "Ảnh chụp nhanh" (Snapshot)

Một trong những khái niệm quan trọng nhất cần nắm vững là trạng thái trong React hoạt động giống như một **ảnh chụp nhanh**. Việc thiết lập trạng thái không thay đổi biến trạng thái hiện tại trong lần render đang diễn ra. Thay vào đó, nó sẽ kích hoạt một lần render mới với giá trị trạng thái mới.

Hãy xem xét một component `Counter` gọi hàm setter của nó ba lần trong một trình xử lý sự kiện duy nhất:

    function Counter() {
      const [number, setNumber] = useState(0);

      return (
        <button onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}>+3</button>
      )
    }

Khi bạn nhấp vào nút, giá trị `number` chỉ tăng lên một lần (từ 0 lên 1), không phải ba. Điều này là do giá trị của `number` được "cố định" là `0` trong suốt trình xử lý sự kiện của lần render đó. Mỗi lệnh gọi `setNumber(number + 1)` thực chất là `setNumber(0 + 1)`.

Khái niệm ảnh chụp nhanh này cũng áp dụng cho các hoạt động không đồng bộ. Hãy xem xét một biểu mẫu có độ trễ `setTimeout`:

    function Form() {
      const [to, setTo] = useState('Alice');
      const [message, setMessage] = useState('Hello');

      function handleSubmit(e) {
        e.preventDefault();
        setTimeout(() => {
          alert(`You said ${message} to ${to}`);
        }, 5000);
      }
      // ...
    }

Nếu bạn gửi biểu mẫu cho "Alice", sau đó ngay lập tức thay đổi người nhận thành "Bob", `alert` vẫn sẽ hiển thị "You said Hello to Alice". Điều này xảy ra vì trình xử lý sự kiện `handleSubmit` đã nắm bắt được một ảnh chụp nhanh của trạng thái (`to` là 'Alice' và `message` là 'Hello') tại thời điểm nó được tạo ra.

Hành vi "ảnh chụp nhanh" này là lý do cơ bản dẫn đến nguyên tắc về tính bất biến (immutability). Vì các trình xử lý sự kiện làm việc với một ảnh chụp nhanh của trạng thái từ lần render của chúng, việc thay đổi trực tiếp (mutating) trạng thái đó sẽ vô nghĩa (nó sẽ không ảnh hưởng đến lần render hiện tại) và nguy hiểm (nó sẽ làm hỏng các ảnh chụp nhanh trạng thái trong quá khứ mà các phần khác của ứng dụng có thể vẫn đang dựa vào).

### 1.3. Nguyên tắc về Tính Thuần khiết của Component

Trong React, mọi component bạn viết phải là một **hàm thuần khiết**. Trong khoa học máy tính, một hàm thuần khiết có hai đặc điểm chính:

1.  **Nó chỉ lo việc của mình.** Nó không thay đổi bất kỳ đối tượng hoặc biến nào đã tồn tại trước khi nó được gọi.
2.  **Cùng đầu vào, cùng đầu ra.** Với cùng một đầu vào (props, state, context), một hàm thuần khiết phải luôn trả về cùng một kết quả.

Hãy xem xét component `Recipe` này. Với cùng một giá trị `drinkers`, nó sẽ luôn trả về cùng một JSX. Nó là một component thuần khiết.

    function Recipe({ drinkers }) {
      return (
        <ol>
          <li>Boil {drinkers} cups of water.</li>
          <li>Add {drinkers} spoons of tea...</li>
        </ol>
      );
    }

Ngược lại, việc thay đổi các biến đã tồn tại trước trong quá trình render được gọi là một **tác dụng phụ (side effect)** và làm cho một component trở nên không thuần khiết. Điều này có thể dẫn đến các lỗi khó lường.

    // Component không thuần khiết
    let guest = 0;

    function Cup() {
      // Xấu: thay đổi một biến đã tồn tại trước!
      guest = guest + 1;
      return <h2>Tea cup for guest #{guest}</h2>;
    }

Để sửa lỗi này, bạn nên truyền `guest` như một prop. Điều này đảm bảo component `Cup` trở nên thuần khiết.

    // Component thuần khiết
    function Cup({ guest }) {
      return <h2>Tea cup for guest #{guest}</h2>;
    }

React đòi hỏi tính thuần khiết vì nó mang lại những lợi ích quan trọng: nó cho phép các tối ưu hóa hiệu suất (bỏ qua render một cách an toàn khi đầu vào không thay đổi), cho phép render phía máy chủ (server-side rendering), và giúp React có thể tạm dừng và khởi động lại quá trình render một cây component sâu nếu có dữ liệu với độ ưu tiên cao hơn thay đổi. Các Hooks cung cấp các công cụ cần thiết để quản lý trạng thái và thực hiện các tác dụng phụ một cách an toàn mà không vi phạm nguyên tắc này.

## 2\. Quản lý Trạng thái với Hooks

Hooks là API chính cho logic của component, cho phép React quản lý vòng đời và các chuyển đổi trạng thái của component một cách có thể dự đoán được. `useState` và `useReducer` là hai hooks chính để quản lý trạng thái của component, mỗi hook phù hợp với các mức độ phức tạp khác nhau.

### 2.1. Bắt đầu với `useState`

`useState` là Hook cơ bản và được sử dụng phổ biến nhất để thêm trạng thái vào một component.

Cấu trúc của nó rất đơn giản. Nó nhận một giá trị ban đầu làm đối số duy nhất và trả về một mảng gồm hai phần tử:

1.  **Biến trạng thái hiện tại:** Giá trị trạng thái cho lần render hiện tại.
2.  **Hàm setter:** Một hàm cho phép bạn cập nhật trạng thái và kích hoạt một lần render mới.

Chúng ta thường sử dụng cú pháp phá hủy mảng để gán tên cho các phần tử này:

    const [index, setIndex] = useState(0);

Một quy tắc quan trọng là **Hooks chỉ có thể được gọi ở cấp cao nhất** của component của bạn. Bạn không thể gọi chúng bên trong các điều kiện, vòng lặp hoặc các hàm lồng nhau. Điều này đảm bảo rằng Hooks luôn được gọi theo cùng một thứ tự trong mỗi lần render, điều mà React dựa vào để liên kết trạng thái với đúng lệnh gọi `useState`.

Hãy xem lại ví dụ `Gallery` đã được sửa đổi để sử dụng `useState`. Khi `handleClick` được gọi, nó sử dụng hàm `setIndex` để cập nhật trạng thái. Lệnh gọi này yêu cầu React render lại `Gallery` và trong lần render tiếp theo, `useState` sẽ trả về giá trị mới cho `index`.

    import { useState } from 'react';
    import { sculptureList } from './data.js';

    export default function Gallery() {
      const [index, setIndex] = useState(0);

      function handleClick() {
        setIndex(index + 1); // Kích hoạt render lại với giá trị index mới
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
        </>
      );
    }

### 2.2. Xử lý các Trạng thái Phức tạp với `useReducer`

Khi một component phát triển và logic trạng thái trở nên phức tạp, việc chuyển từ `useState` sang `useReducer` có thể giúp hợp nhất tất cả logic cập nhật trạng thái vào một nơi duy nhất. Một kỹ sư cao cấp sẽ chọn `useReducer` khi:

1.  Trạng thái tiếp theo phụ thuộc vào trạng thái trước đó theo những cách phức tạp.
2.  Các chuyển đổi trạng thái phức tạp và có thể được thể hiện rõ ràng hơn dưới dạng các "hành động" được đặt tên (ví dụ: `'added'`, `'changed'`).
3.  Bạn muốn tách biệt "điều gì đã xảy ra" (gửi một hành động) khỏi "cách nó được cập nhật" (logic của reducer), giúp cải thiện khả năng kiểm thử và đọc hiểu.

Việc di chuyển sang `useReducer` bao gồm ba bước:

1.  **Di chuyển từ thiết lập trạng thái sang gửi (dispatching) các hành động:** Thay vì gọi các hàm `set` riêng lẻ, bạn sẽ gọi một hàm `dispatch` duy nhất với một "hành động".
2.  **Viết một hàm reducer:** Một hàm thuần khiết nhận trạng thái hiện tại và một đối tượng hành động, và trả về trạng thái tiếp theo.
3.  **Sử dụng reducer từ component của bạn:** Thay thế `useState` bằng hook `useReducer`.

Hàm `tasksReducer` bên dưới chứa tất cả logic cập nhật trạng thái. Theo quy ước, nó thường sử dụng một câu lệnh `switch` trên `action.type`:

    function tasksReducer(tasks, action) {
      switch (action.type) {
        case 'added': {
          return [
            ...tasks,
            {
              id: action.id,
              text: action.text,
              done: false,
            },
          ];
        }
        case 'changed': {
          return tasks.map((t) => {
            if (t.id === action.task.id) {
              return action.task;
            } else {
              return t;
            }
          });
        }
        case 'deleted': {
          return tasks.filter((t) => t.id !== action.id);
        }
        default: {
          throw Error('Unknown action: ' + action.type);
        }
      }
    }

Trong component, bạn sẽ sử dụng `useReducer`. Nó nhận một hàm reducer và trạng thái ban đầu. Nó trả về một mảng với hai phần tử: trạng thái hiện tại và một hàm `dispatch` mà bạn sử dụng để gửi các hành động đến reducer.

    import { useReducer } from 'react';
    // ...

    export default function TaskApp() {
      const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

      function handleAddTask(text) {
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        });
      }
      // ... các trình xử lý khác cũng sử dụng dispatch
    }

## 3\. Các Mẫu Cấu trúc Trạng thái Tối ưu

Cách bạn cấu trúc trạng thái là một hình thức "lập trình phòng thủ" (defensive programming). Một cấu trúc trạng thái được cân nhắc kỹ lưỡng có thể ngăn chặn toàn bộ các lớp lỗi, chẳng hạn như các "trạng thái không thể xảy ra", trước cả khi chúng được viết ra. Việc tuân theo một vài nguyên tắc có thể giúp bạn tránh các cạm bẫy phổ biến.

Dưới đây là năm nguyên tắc chính để cấu trúc trạng thái một cách hiệu quả:

1.  **Nhóm các trạng thái liên quan.**
2.  **Tránh mâu thuẫn trong trạng thái.**
3.  **Tránh trạng thái thừa.**
4.  **Tránh trùng lặp trong trạng thái.**
5.  **Tránh trạng thái lồng nhau sâu.**

### 3.1. Nguyên tắc 1: Nhóm các Trạng thái Liên quan

**Nguyên tắc:** Nếu bạn luôn cập nhật hai hoặc nhiều biến trạng thái cùng một lúc, hãy xem xét việc hợp nhất chúng thành một biến trạng thái duy nhất.

Ví dụ, khi theo dõi vị trí con trỏ, bạn có thể sử dụng hai biến trạng thái riêng biệt:

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

Tuy nhiên, vì `x` và `y` luôn thay đổi cùng nhau, việc nhóm chúng vào một đối tượng duy nhất sẽ hợp lý hơn.

    const [position, setPosition] = useState({ x: 0, y: 0 });

### 3.2. Nguyên tắc 2: Tránh Mâu thuẫn trong Trạng thái

Khi cấu trúc trạng thái, hãy cẩn thận để tránh tạo ra các "trạng thái không thể xảy ra", nơi nhiều phần của trạng thái có thể mâu thuẫn với nhau.

Hãy xem xét một biểu mẫu phản hồi sử dụng hai biến boolean, `isSending` và `isSent`. Có thể xảy ra trường hợp cả hai đều là `true` cùng một lúc, điều này không có ý nghĩa về mặt logic.

    // Cấu trúc dễ gây lỗi
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

Một cách tiếp cận tốt hơn là sử dụng một biến `status` duy nhất có thể có một trong các giá trị được xác định trước, loại bỏ khả năng mâu thuẫn.

    // Cấu trúc được cải thiện
    const [status, setStatus] = useState('typing'); // 'typing', 'sending', hoặc 'sent'

Điều này đảm bảo rằng component chỉ có thể ở trong một trong ba trạng thái hợp lệ tại một thời điểm.

### 3.3. Nguyên tắc 3: Tránh Trạng thái Thừa

Trạng thái thừa là thông tin có thể được tính toán từ các props hoặc các biến trạng thái hiện có trong quá trình render. Việc lưu trữ thông tin có thể suy ra trong trạng thái sẽ tạo ra sự phức tạp không cần thiết.

Ví dụ, một biểu mẫu có `firstName` và `lastName` không cần một biến trạng thái riêng cho `fullName`.

    // Trạng thái thừa
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fullName, setFullName] = useState(''); // 🔴 Thừa!

Thay vào đó, hãy tính toán `fullName` trực tiếp trong quá trình render. Điều này đảm bảo nó luôn được cập nhật.

    // Tính toán trong quá trình render
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const fullName = firstName + ' ' + lastName; // ✅ Tốt

### 3.4. Nguyên tắc 4: Tránh Trùng lặp trong Trạng thái

Khi cùng một dữ liệu bị trùng lặp giữa nhiều biến trạng thái, việc giữ chúng đồng bộ trở nên khó khăn.

Hãy xem xét một component `Menu` nơi một đối tượng mục được chọn được lưu trữ trong cả danh sách `items` và một biến `selectedItem` riêng biệt. Nếu mục được chỉnh sửa trong danh sách `items`, `selectedItem` sẽ trở nên lỗi thời.

    // Trùng lặp
    const [items, setItems] = useState(initialItems);
    const [selectedItem, setSelectedItem] = useState(items[0]); // 🔴 Trùng lặp

Giải pháp tốt hơn là chỉ lưu trữ thông tin tối thiểu cần thiết, chẳng hạn như ID của mục được chọn. Sau đó, mục đầy đủ có thể được tìm thấy từ mảng `items` trong quá trình render.

    // Không trùng lặp
    const [items, setItems] = useState(initialItems);
    const [selectedId, setSelectedId] = useState(0);

    const selectedItem = items.find(item => item.id === selectedId); // ✅ Tốt

### 3.5. Nguyên tắc 5: Tránh Trạng thái Lồng nhau Sâu

Việc cập nhật trạng thái có cấu trúc lồng nhau sâu rất phức tạp vì nó đòi hỏi phải sao chép các đối tượng ở mọi cấp độ.

Ví dụ, một kế hoạch du lịch được cấu trúc như một cây đối tượng lồng nhau:

    const initialTravelPlan = {
      id: 0,
      title: '(Root)',
      childPlaces: [
        {
          id: 1,
          title: 'Earth',
          childPlaces: [ /* ...nhiều cấp độ hơn... */ ]
        }
      ]
    };

Để đơn giản hóa việc cập nhật, hãy xem xét việc "làm phẳng" hoặc "bình thường hóa" (normalized) cấu trúc trạng thái. Điều này tương tự như cách bạn cấu trúc dữ liệu trong cơ sở dữ liệu quan hệ, sử dụng ID để liên kết các phần dữ liệu thay vì lồng chúng vào nhau.

    // Cấu trúc phẳng (bình thường hóa)
    const initialTravelPlan = {
      0: { id: 0, title: '(Root)', childIds: [1, 42, 46] },
      1: { id: 1, title: 'Earth', childIds: [2, 10, 19, 26, 34] },
      // ... các mục khác
    };

Cấu trúc phẳng này giúp việc cập nhật một mục cụ thể dễ dàng hơn nhiều, vì nó thường chỉ yêu cầu cập nhật mục đó và mục cha trực tiếp của nó.

## 4\. Các Phương pháp Hay nhất về Tính Bất biến

Tính bất biến (immutability) là **hợp đồng không thể thương lượng** giữa nhà phát triển và công cụ render của React. Quy tắc cốt lõi là: **coi bất kỳ đối tượng JavaScript nào bạn đưa vào trạng thái đều là chỉ đọc (read-only)**.

Khi bạn muốn cập nhật một đối tượng hoặc mảng trong trạng thái, bạn không nên thay đổi (mutate) nó trực tiếp. Thay vào đó, bạn phải tạo một đối tượng hoặc mảng mới. Việc thay đổi trực tiếp sẽ không kích hoạt render lại, vì React so sánh các tham chiếu đối tượng để phát hiện thay đổi. Nếu tham chiếu vẫn giữ nguyên, React sẽ giả định không có gì thay đổi.

### 4.1. Cập nhật Objects trong Trạng thái

Cách phổ biến nhất để cập nhật một đối tượng một cách bất biến là sử dụng cú pháp spread của đối tượng (`...`). Cú pháp này tạo ra một bản sao nông của đối tượng, cho phép bạn sao chép các thuộc tính hiện có trong khi ghi đè các thuộc tính cụ thể.

Trong ví dụ `Form` dưới đây, trình xử lý sự kiện tạo một đối tượng mới bằng cách sao chép các thuộc tính của đối tượng `person` hiện có và ghi đè một trường duy nhất.

    function handleFirstNameChange(e) {
      setPerson({
        ...person, // Sao chép các trường cũ
        firstName: e.target.value // Ghi đè trường firstName
      });
    }

### 4.2. Cập nhật Arrays trong Trạng thái

Tương tự như đối tượng, bạn nên tránh các phương thức mảng làm thay đổi mảng ban đầu, chẳng hạn như `push()`, `pop()`, hoặc `splice()`. Thay vào đó, hãy sử dụng các phương thức không thay đổi tạo ra một mảng mới.

Bảng dưới đây tóm tắt các thao tác mảng bất biến phổ biến:

| Thao tác              | Phương pháp                                  | Mô tả                                                                                                                                 |
| --------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Thêm**              | Cú pháp spread: `[...arr, newItem]`          | Tạo một mảng mới chứa tất cả các phần tử của mảng cũ, cộng với phần tử mới ở cuối.                                                    |
| **Xóa**               | `arr.filter(item => item.id !== idToRemove)` | Tạo một mảng mới không chứa phần tử đã được lọc ra.                                                                                   |
| **Biến đổi/Thay thế** | `arr.map(item => { ... })`                   | Tạo một mảng mới trong đó mỗi phần tử đã được biến đổi. Có thể trả về một phần tử mới để thay thế hoặc phần tử ban đầu để giữ nguyên. |

### 4.3. Đơn giản hóa Logic Cập nhật với Immer

Đối với các trạng thái lồng nhau phức tạp, việc viết logic cập nhật bất biến có thể trở nên dài dòng. Thư viện **Immer** giải quyết vấn đề này bằng cách cho phép bạn viết mã trông có vẻ như đang thay đổi trực tiếp, trong khi nó xử lý việc tạo ra các bản sao cần thiết một cách bất biến ở phía sau.

Với Immer, bạn có thể viết lại một bản cập nhật đối tượng lồng nhau phức tạp bằng một cú pháp ngắn gọn hơn nhiều:

    // Với Immer, bạn có thể viết mã như thế này:
    updatePerson(draft => {
      draft.artwork.city = 'Lagos';
    });

Immer cung cấp một đối tượng `draft` đặc biệt mà bạn có thể thay đổi một cách an toàn. Khi bạn hoàn tất, Immer sẽ tạo ra trạng thái tiếp theo với các cập nhật bất biến cần thiết.

## 5\. Chia sẻ và Thiết lập lại Trạng thái

Khi các ứng dụng trở nên phức tạp hơn, các kịch bản nâng cao hơn sẽ xuất hiện, chẳng hạn như nhu cầu chia sẻ trạng thái giữa các component hoặc thiết lập lại trạng thái một cách có chủ ý.

### 5.1. Chia sẻ Trạng thái: Nâng Trạng thái lên (Lifting State Up) và Context

Việc chia sẻ trạng thái giữa các component tuân theo một quy trình tiến triển tự nhiên, kết hợp ba khái niệm cốt lõi của React.

1.  **Bắt đầu bằng việc Nâng Trạng thái lên:** Mẫu cơ bản nhất để chia sẻ trạng thái là di chuyển nó đến component cha chung gần nhất của tất cả các component cần truy cập vào trạng thái đó. Sau đó, trạng thái và các hàm cập nhật được truyền xuống cho các component con thông qua props.
2.  **Giới thiệu Context để tránh "Prop Drilling":** Khi trạng thái cần được truyền qua nhiều cấp component không sử dụng nó, điều này dẫn đến một vấn đề gọi là "prop drilling". Đây là lúc **Context** trở nên hữu ích. Context cung cấp một cách để "dịch chuyển" dữ liệu qua cây component mà không cần phải truyền props xuống theo cách thủ công ở mọi cấp độ.
3.  **Kết hợp** `**useReducer**` **với** `**Context**` **để Mở rộng quy mô:** Khi trạng thái được "dịch chuyển" có logic cập nhật phức tạp, việc kết hợp `Context` với `useReducer` sẽ tạo ra một mẫu cực kỳ mạnh mẽ. Bằng cách đặt cả `state` và hàm `dispatch` từ `useReducer` vào trong một Context provider, bạn có thể tạo ra một hệ thống quản lý trạng thái tự chứa, có khả năng mở rộng cho một tính năng hoặc một phần của ứng dụng. Điều này cho phép bất kỳ component nào trong cây con đọc trạng thái hoặc gửi các hành động để cập nhật nó, mà không cần truyền props qua các component trung gian. Ví dụ, trong một ứng dụng `TaskApp`, bạn có thể tạo một `TasksProvider` bao bọc một phần của ứng dụng, cung cấp `tasks` và `dispatch` cho tất cả các component con.

### 5.2. Duy trì và Thiết lập lại Trạng thái với `key`

Theo mặc định, React duy trì trạng thái của một component miễn là nó được render ở cùng một vị trí trong cây giao diện người dùng. Nếu bạn ngừng render một component, trạng thái của nó sẽ bị mất.

Tuy nhiên, đôi khi bạn muốn thiết lập lại trạng thái của một component ngay cả khi nó vẫn ở cùng một vị trí. Một cách mạnh mẽ để làm điều này là sử dụng prop `key`. Khi React thấy một `key` đã thay đổi, nó sẽ coi component đó là một thực thể mới, hủy bỏ component cũ (và trạng thái của nó) và tạo ra một component mới với trạng thái được khởi tạo lại.

Đây là một kỹ thuật cực kỳ hữu ích cho các biểu mẫu hoặc các component đại diện cho một thực thể dữ liệu cụ thể. Ví dụ, trong một ứng dụng trò chuyện, khi bạn chuyển đổi giữa các cuộc trò chuyện khác nhau, bạn muốn trường nhập văn bản được xóa. Bằng cách gán một `key` duy nhất cho component `Chat` dựa trên ID của người nhận, bạn đảm bảo rằng một phiên bản component mới được tạo ra mỗi khi người nhận thay đổi.

    // Mỗi khi to.id thay đổi, component Chat sẽ được tạo lại và trạng thái của nó sẽ được thiết lập lại.
    <Chat key={to.id} />

## 6\. Tổng kết: Các Nguyên tắc Vàng

Việc quản lý trạng thái hiệu quả là một trong những kỹ năng quan trọng nhất để thành thạo khi làm việc với React. Bằng cách áp dụng các nguyên tắc và mẫu đã thảo luận, bạn có thể xây dựng các ứng dụng không chỉ mạnh mẽ và tương tác mà còn dễ bảo trì, gỡ lỗi và mở rộng.

Để tóm tắt, dưới đây là các nguyên tắc vàng cần ghi nhớ khi làm việc với trạng thái trong React:

- **Luôn coi trạng thái là bất biến.** Không bao giờ thay đổi trực tiếp các đối tượng hoặc mảng trong trạng thái. Luôn tạo bản sao mới.
- **Tính toán các giá trị có thể suy ra trong quá trình render.** Tránh lưu trữ trạng thái thừa hoặc trùng lặp. Dữ liệu chỉ nên có một nguồn chân lý duy nhất.
- **Cấu trúc trạng thái để tránh mâu thuẫn, trùng lặp và lồng nhau sâu.** Sử dụng các biến trạng thái đơn lẻ với các giá trị được xác định trước (`status: 'loading'`) thay vì nhiều biến boolean có thể mâu thuẫn.
- **Sử dụng** `**useReducer**` **cho các logic trạng thái phức tạp.** Khi một component có nhiều cập nhật trạng thái hoặc logic cập nhật phức tạp, hãy trích xuất nó vào một reducer để giữ cho component của bạn gọn gàng.
- **Sử dụng** `**key**` **để thiết lập lại trạng thái.** Khi một thực thể về mặt khái niệm thay đổi (ví dụ: một hồ sơ người dùng khác), hãy sử dụng một `key` duy nhất để đảm bảo component và tất cả các trạng thái con của nó được thiết lập lại.
- **Sử dụng Context một cách có chủ đích.** Context là một công cụ mạnh mẽ để tránh "prop drilling", nhưng hãy ưu tiên việc truyền props và chỉ sử dụng context khi thực sự cần thiết cho trạng thái toàn cục hoặc trạng thái cần thiết ở sâu trong cây component.

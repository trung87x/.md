# Hướng dẫn Quản lý Công việc trong React: Thêm, Sửa và Xóa

### Giới thiệu

#

Chào mừng bạn đến với hướng dẫn từng bước để quản lý danh sách công việc trong React! Trong hướng dẫn này, chúng ta sẽ cùng xây dựng các tính năng cho "Captain's Tasks"—một trình quản lý công việc cho một thuyền trưởng—và tìm hiểu cách React xử lý dữ liệu. Mục tiêu của tài liệu này là giải thích rõ ràng các thao tác cơ bản để quản lý dữ liệu—cụ thể là Thêm, Sửa và Xóa—trong một ứng dụng danh sách công việc đơn giản. Việc nắm vững các khái niệm này là nền tảng cốt lõi, bởi vì hầu hết mọi ứng dụng bạn xây dựng sau này đều sẽ có một biến thể nào đó của việc tạo, đọc, cập nhật và xóa dữ liệu.

### 1\. Nền tảng: Trạng thái (State) là Nguồn sự thật duy nhất

#

Trong ứng dụng của chúng ta, toàn bộ danh sách các công việc được quản lý tại một nơi duy nhất: component `App.js`. Đây là một nguyên tắc thiết kế quan trọng trong React, giúp đảm bảo dữ liệu luôn nhất quán và dễ dàng theo dõi.

- **Sự nhất quán:** Vì tất cả dữ liệu đều đến từ một nguồn duy nhất, giao diện người dùng sẽ luôn phản ánh chính xác trạng thái hiện tại của ứng dụng.
- **Dễ quản lý:** Mọi thay đổi đối với danh sách công việc đều được thực hiện thông qua các hàm được định nghĩa rõ ràng trong `App.js`, giúp việc gỡ lỗi và bảo trì trở nên đơn giản hơn.

Để lưu trữ danh sách này, chúng ta sử dụng hook `useState` trong `App.js`. Hook này khởi tạo trạng thái của ứng dụng với một mảng các đối tượng công việc ban đầu. Việc khởi tạo trông như sau:

    const [tasks, setTasks] = useState(initialTasks);

**Kết nối:** _Bây giờ chúng ta đã hiểu dữ liệu được lưu trữ ở đâu, hãy cùng khám phá cách thêm một công việc hoàn toàn mới vào danh sách này._

### 2\. Thêm một Công việc Mới (`addTask`)

#

Quy trình thêm một công việc mới diễn ra theo các bước tuần tự, bắt đầu từ tương tác của người dùng và kết thúc bằng việc cập nhật trạng thái của ứng dụng.

1.  **Bước 1: Kích hoạt hành động** Người dùng bắt đầu bằng cách nhấp vào nút "Add Task". Sự kiện `onClick` của nút này được liên kết với hàm `addTask` trong `App.js`.
2.  **Bước 2: Logic của hàm** `**addTask**` Hàm `addTask` chịu trách nhiệm cập nhật trạng thái để thêm công việc mới.
    - Nó gọi hàm `setTasks` (được cung cấp bởi hook `useState`) để cung cấp một mảng công việc mới.
    - Để đảm bảo **tính bất biến (immutability)**—một nguyên tắc quan trọng trong React—chúng ta không sửa đổi trực tiếp mảng `tasks` hiện có. Thay vào đó, chúng ta tạo một mảng mới bằng cách sử dụng toán tử spread (`...tasks`) để sao chép tất cả các công việc cũ, sau đó thêm đối tượng công việc mới vào cuối mảng.
    - Đối tượng công việc mới này được tạo với một `uniqueID` ngẫu nhiên (cần thiết cho việc render danh sách trong React) và một `name` mặc định là "new task".
3.  **Bước 3: Nâng cao trải nghiệm người dùng** Để quy trình thêm công việc trở nên mượt mà hơn, chúng ta thêm một thuộc tính đặc biệt là `isNew` vào đối tượng công việc mới được tạo.
    - Bên trong component `Task.js`, chúng ta kiểm tra sự tồn tại của thuộc tính `isNew`. Nếu `isNew` là `true`, component sẽ tự động hiển thị công việc đó dưới dạng một ô nhập liệu có thể chỉnh sửa ngay lập tức. Điều này cho phép người dùng bắt đầu gõ tên cho công việc mới ngay sau khi nhấp vào nút "Add Task" mà không cần thêm bất kỳ thao tác nào.
    - Logic này cũng bao gồm một xử lý đặc biệt: nếu người dùng nhấp vào "Cancel" khi đang chỉnh sửa một công việc có thuộc tính `isNew`, công việc đó sẽ bị xóa hoàn toàn. Điều này ngăn chặn việc các công việc trống hoặc không mong muốn bị bỏ lại trong danh sách nếu người dùng đổi ý ngay sau khi thêm.

**Kết nối:** _Thêm công việc mới thật tuyệt, nhưng điều gì sẽ xảy ra nếu chúng ta cần sửa đổi một công việc đã tồn tại? Hãy cùng tìm hiểu quy trình chỉnh sửa trong phần tiếp theo._

### 3\. Chỉnh sửa một Công việc Hiện có (`editTask`)

#

Việc chỉnh sửa một công việc phức tạp hơn một chút vì nó liên quan đến hai loại trạng thái: trạng thái giao diện người dùng tạm thời (local state) trong component `Task` và trạng thái dữ liệu chính (parent component state) trong `App.js`. Quy trình bắt đầu khi người dùng nhấp vào biểu tượng bút chì bên cạnh một công việc.

#### Quản lý Trạng thái Giao diện Người dùng (UI) Cục bộ

#

Bên trong component `Task.js`, chúng ta cần quản lý việc người dùng đang ở chế độ xem hay chế độ chỉnh sửa. Việc này được thực hiện cục bộ vì nó không ảnh hưởng đến dữ liệu của toàn bộ ứng dụng cho đến khi người dùng lưu lại.

1.  Chúng ta sử dụng hook `useState` để tạo ra các biến trạng thái cục bộ là `editing` và `name`. `editing` theo dõi xem ô nhập liệu có nên được hiển thị hay không, và `name` lưu trữ văn bản người dùng đang nhập.
2.  Kỹ thuật **kết xuất có điều kiện (conditional rendering)** được sử dụng để chuyển đổi giao diện. Một toán tử ba ngôi (`editing ? <input> : <TaskName>`) sẽ quyết định hiển thị một trường `<input>` khi `editing` là `true`, hoặc hiển thị tên công việc khi `editing` là `false`.
3.  Khi người dùng nhập vào trường `<input>`, sự kiện `onChange` sẽ cập nhật biến trạng thái cục bộ `name`. Điều này cho phép chúng ta theo dõi giá trị mới của tên công việc trong thời gian thực. Việc quản lý trạng thái này ở cấp độ cục bộ rất hiệu quả: nó ngăn component cha (`App`) phải render lại sau mỗi lần nhấn phím, một mô hình thiết kế và hiệu năng quan trọng trong React.

#### Cập nhật Dữ liệu Chính

#

Khi người dùng hoàn tất việc chỉnh sửa và nhấp vào nút "Save":

1.  Hàm `saveEdit` trong `Task.js` sẽ đóng gói trạng thái `name` cục bộ vào một đối tượng công việc mới và gửi nó lên component cha bằng cách gọi prop `onSave`.
2.  Prop `onSave` này thực chất là hàm `editTask` được truyền xuống từ `App.js`. Hàm `editTask` thực hiện logic cập nhật cuối cùng:
    - Nó nhận vào một đối tượng `editedTask` chứa thông tin đã được cập nhật.
    - Nó sử dụng phương thức `.map()` của mảng để lặp qua tất cả các công việc và tạo ra một mảng hoàn toàn mới.
    - Trong mỗi vòng lặp, nó so sánh `id` của công việc hiện tại với `id` của `editedTask`. Nếu `id` trùng khớp, nó sẽ trả về `editedTask`. Nếu không, nó trả về công việc ban đầu không thay đổi.
    - Cuối cùng, nó gọi `setTasks` với mảng mới đã được cập nhật này, khiến giao diện người dùng được render lại với dữ liệu mới. Để giúp logic cập nhật trở nên gọn gàng hơn, chúng ta truyền toàn bộ đối tượng `task` xuống component con dưới dạng một prop duy nhất. Điều này cho phép `Task.js` dễ dàng gọi `onSave({ ...task, name })`, tạo ra một đối tượng mới bằng cách sao chép các thuộc tính của công việc cũ và ghi đè `name`.

Để làm rõ hơn, đây là bảng so sánh hai loại trạng thái. Khái niệm "lifting state up" (nâng trạng thái lên) được áp dụng để đảm bảo `App.js` luôn là nguồn sự thật duy nhất.

| Loại Trạng thái                  | Mục đích                                              | Vị trí    | Ví dụ                                      |
| -------------------------------- | ----------------------------------------------------- | --------- | ------------------------------------------ |
| **Trạng thái Cục bộ**            | Quản lý các tương tác giao diện người dùng tạm thời.  | `Task.js` | Biến `editing` để hiển thị/ẩn ô nhập liệu. |
| **Trạng thái của Component Cha** | Lưu trữ dữ liệu cốt lõi của ứng dụng (nguồn sự thật). | `App.js`  | Mảng `tasks` chứa tất cả các công việc.    |

**Về nút "Cancel":** Khi người dùng nhấp vào "Cancel", hành động này chỉ đơn giản là đặt lại trạng thái cục bộ về giá trị ban đầu (`setName(task.name)` và `setEditing(false)`). Nó không gọi `onSave`, vì không có dữ liệu nào cần được lưu vào trạng thái của component cha.

**Kết nối:** _Chúng ta đã có thể tạo và cập nhật công việc. Bước cuối cùng trong chu trình quản lý là xóa bỏ những công việc không còn cần thiết nữa._

### 4\. Xóa một Công việc (`destroyTask`)

#

So với việc thêm và sửa, xóa một công việc là thao tác đơn giản nhất. Toàn bộ logic được xử lý trong `App.js`.

1.  **Hành động của Người dùng:** Người dùng nhấp vào biểu tượng thùng rác bên cạnh một công việc.
2.  **Hàm** `**destroyTask**`**:** Hành động này gọi hàm `destroyTask` trong `App.js` và truyền vào `id` của công việc cần xóa.
3.  **Lọc Mảng:** Hàm `destroyTask` sử dụng phương thức `.filter()` của mảng. Phương thức này tạo ra một mảng mới bằng cách giữ lại tất cả các công việc có `id` _không_ khớp với `id` đã được truyền vào. Về cơ bản, nó loại bỏ công việc cần xóa ra khỏi danh sách.
4.  **Cập nhật Trạng thái:** Cuối cùng, hàm `setTasks` được gọi với mảng mới (ngắn hơn) này. React sẽ tự động render lại giao diện người dùng, và công việc đã xóa sẽ biến mất.

### Tổng kết

#

Trong hướng dẫn này, chúng ta đã khám phá ba thao tác quản lý dữ liệu cốt lõi trong React bằng cách sử dụng các phương thức mảng bất biến:

- **Thêm:** Sử dụng toán tử spread (`...`) để tạo một mảng mới với một phần tử được thêm vào.
- **Sửa:** Sử dụng phương thức `.map()` để tạo một mảng mới, trong đó một phần tử đã được thay thế.
- **Xóa:** Sử dụng phương thức `.filter()` để tạo một mảng mới, trong đó một phần tử đã bị loại bỏ.

Các mẫu hình này—quản lý trạng thái ở component cha, truyền các hàm xử lý xuống dưới dạng props, và sử dụng các phương thức mảng bất biến—là những kỹ năng nền tảng và cực kỳ hữu ích. Nắm vững chúng sẽ giúp bạn tự tin xây dựng các ứng dụng React phức tạp và mạnh mẽ hơn.

# Giải mã Redux: Hướng dẫn về các khái niệm cốt lõi cho người mới bắt đầu

## 1.0 Mở đầu: Tại sao chúng ta cần Redux?

#

Nếu bạn đã từng xây dựng một ứng dụng React và cảm thấy mệt mỏi khi phải truyền dữ liệu qua nhiều lớp component, bạn không đơn độc. Hãy tưởng tượng bạn có một mẩu dữ liệu ở thành phần cấp cao nhất và cần sử dụng nó trong một thành phần con nằm sâu bên trong. Cách làm truyền thống là truyền dữ liệu đó qua từng cấp thành phần, một quá trình được gọi là **"prop drilling" (truyền prop)**.

Quá trình này không chỉ "rất tẻ nhạt để quản lý" mà còn không hiệu quả, vì các thành phần ở giữa phải nhận và chuyển tiếp dữ liệu mà chúng không hề cần đến. Nếu một thành phần ở sâu cần truy cập vào trạng thái toàn cục mà không được truyền xuống qua prop, điều đó là không thể.

Đây chính là vấn đề mà Redux ra đời để giải quyết. Redux cung cấp một **trình quản lý trạng thái toàn cục**, cho phép bất kỳ thành phần nào trong ứng dụng của bạn có thể đọc và cập nhật trạng thái một cách an toàn và có thể dự đoán được, mà không cần phải truyền prop qua nhiều cấp.

Vậy làm thế nào Redux sắp xếp tất cả những điều này? Hãy bắt đầu với khái niệm nền tảng: **Store**.

## 2.0 Các thành phần cốt lõi của Redux

#

Để làm chủ Redux, chúng ta cần hiểu rõ "Ba Nguyên tắc Cốt lõi" của nó: một nguồn sự thật duy nhất (Store), trạng thái chỉ đọc (thay đổi qua Actions), và các thay đổi được thực hiện bằng các hàm thuần túy (Reducers). Hãy cùng mổ xẻ từng phần.

### 2.1 The Store (Kho lưu trữ): Nguồn sự thật duy nhất

#

Về cơ bản, **Store** là một **"đối tượng javascript lớn"** chứa toàn bộ trạng thái toàn cục của ứng dụng. Nó là nguồn sự thật duy nhất cho dữ liệu của bạn.

- **Phép loại suy:** Hãy hình dung Store như một cuốn sổ cái chính hoặc một kho lưu trữ trung tâm trong một văn phòng. Mọi thông tin quan trọng và chính thức đều được lưu giữ tại một nơi duy nhất này, đảm bảo mọi người đều có quyền truy cập vào cùng một phiên bản dữ liệu.

Tuy nhiên, có một quy tắc cực kỳ quan trọng: bạn không thể chỉnh sửa trực tiếp store như các đối tượng javascript thông thường. Việc thay đổi trạng thái phải tuân theo một quy trình nghiêm ngặt để đảm bảo tính nhất quán và dễ dàng theo dõi.

Vậy làm thế nào chúng ta có thể cập nhật trạng thái một cách an toàn? Câu trả lời nằm ở **Actions**.

### 2.2 Actions (Hành động): Gửi yêu cầu thay đổi

#

Một **Action** là một thông báo về một sự kiện nên thay đổi dữ liệu. Thay vì thay đổi trực tiếp đối tượng trạng thái, bạn "gửi đi" (dispatch) một action. Đây là một **"cách nhất quán... để thông báo cho store của chúng ta về các sự kiện nên thay đổi dữ liệu"**.

- **Phép loại suy:** Một Action giống như việc bạn điền vào một mẫu yêu cầu chính thức để đề nghị thay đổi một tài liệu trong kho lưu trữ trung tâm. Mẫu yêu cầu này mô tả những gì cần thay đổi, nhưng không tự thực hiện thay đổi đó.

Việc sử dụng Actions mang lại lợi ích to lớn, đặc biệt là trong việc gỡ lỗi (debugging) các ứng dụng lớn:

- **Tạo ra một "dấu vết giấy tờ" (papertrail):** Bằng cách xem danh sách các action đã được gửi đi, bạn có thể dễ dàng theo dõi mọi thay đổi dữ liệu đã xảy ra trong ứng dụng của mình.
- **Ngăn chặn các cập nhật tùy tiện:** Hãy tưởng tượng sự hỗn loạn nếu bất kỳ component nào cũng có thể tự do thay đổi trực tiếp đối tượng trạng thái toàn cục. Việc tìm ra nguyên nhân của một lỗi sẽ giống như mò kim đáy bể. Actions tạo ra một "cổng vào" duy nhất và có quy tắc cho mọi thay đổi, biến sự hỗn loạn tiềm tàng thành một quy trình có trật tự và có thể theo dõi.
- **Cho phép "du hành thời gian" (time travel):** Đây là một trong những điểm bán hàng chính ban đầu của Redux. Vì mỗi thay đổi đều được biểu diễn bằng một Action, các nhà phát triển có thể dễ dàng đảo ngược các hành động để quay lại các trạng thái trước đó, giúp việc gỡ lỗi trở nên hiệu quả hơn rất nhiều.

Khi một Action được gửi đi, nó cần một người xử lý. Đó là lúc **Reducers** xuất hiện.

### 2.3 Reducers: Những người thực thi thay đổi

#

Một **Reducer** là **"một hàm javascript đơn giản nhận một action và trả về trạng thái mới sau khi áp dụng cập nhật dữ liệu"**. Reducer chịu trách nhiệm thực sự thực hiện thay đổi trạng thái dựa trên thông tin từ Action.

- **Phép loại suy:** Nếu Action là mẫu yêu cầu, thì Reducer chính là nhân viên hoặc phòng ban cụ thể nhận mẫu yêu cầu đó. Họ đọc yêu cầu và thực hiện chính xác thay đổi trên cuốn sổ cái chính (Store).

Quy tắc vàng của Redux là: **"tất cả các cập nhật phải thông qua actions, và tất cả các thay đổi dữ liệu phải thông qua reducers"**. Sự nhất quán này cực kỳ hữu ích khi gỡ lỗi, vì bạn biết chính xác nơi để tìm kiếm logic cập nhật trạng thái cho mọi thay đổi trong ứng dụng.

Bây giờ, hãy kết nối tất cả các mảnh ghép lại với nhau.

## 3.0 Tổng kết quy trình: Dòng chảy dữ liệu trong Redux

#

Dòng chảy dữ liệu một chiều của Redux diễn ra theo một chu trình có thể dự đoán được:

1.  **Giao diện người dùng (Component):** Một sự kiện xảy ra, chẳng hạn như người dùng nhấp vào một nút.
2.  **Gửi đi Action (Dispatch an Action):** Thành phần đó "gửi đi" một Action để mô tả những gì đã xảy ra (ví dụ: một đối tượng có `type: 'ADD_TODO'`).
3.  **Reducer xử lý Action:** Store nhận Action và chuyển nó đến Reducer tương ứng.
4.  **Reducer trả về Trạng thái mới:** Reducer xử lý Action và trả về một bản sao _mới_ của trạng thái đã được cập nhật.
5.  **Store được cập nhật:** Store thay thế trạng thái cũ bằng trạng thái mới do Reducer trả về.
6.  **Giao diện người dùng hiển thị lại (Component Rerenders):** Để các component React có thể "nói chuyện" với Redux store, chúng ta sử dụng một thư viện kết nối có tên là `react-redux`. Thư viện này cung cấp các công cụ, như hook `useSelector`, để đọc dữ liệu từ store. Hook `useSelector` không chỉ đọc dữ liệu; nó còn tạo ra một sự đăng ký (subscription) đến store. Khi phần dữ liệu đó thay đổi, Redux sẽ thông báo cho component, và React sẽ tự động hiển thị lại giao diện với thông tin mới nhất.

## 4.0 Vai trò của Redux Toolkit: Làm cho Redux trở nên đơn giản hơn

#

Redux Toolkit (RTK) là cách tiếp cận được đề xuất chính thức để sử dụng Redux. Nó đơn giản hóa nhiều khía cạnh của việc thiết lập và viết mã Redux.

- `**configureStore**`: Đây là hàm giúp thiết lập store chính của bạn với các cài đặt mặc định hợp lý và hữu ích. Bạn sẽ truyền các reducers của mình vào hàm này để tạo ra store.
- `**createSlice**`: Đây là một công cụ cực kỳ hữu ích giúp tạo ra các reducers mà bạn cần. Nó cho phép bạn gộp logic của reducer và việc tạo ra các action cho một "lát" (slice) trạng thái cụ thể lại với nhau. Thay vì viết các tệp riêng biệt cho actions và reducers, `createSlice` sẽ tự động tạo chúng cho bạn, giúp giảm đáng kể lượng mã lặp đi lặp lại.

## 5.0 Kết luận: Nền tảng vững chắc của bạn

#

Bằng cách hiểu ba khái niệm cốt lõi này, bạn đã nắm được bản chất của Redux:

- **Store:** Một kho lưu trữ tập trung, duy nhất cho trạng thái toàn cục.
- **Actions:** Các yêu cầu thay đổi có cấu trúc, mô tả những gì đã xảy ra.
- **Reducers:** Các hàm thuần túy thực thi những thay đổi đó một cách có thể dự đoán.

Mô hình này mang lại khả năng dự đoán, quản lý trạng thái nhất quán và gỡ lỗi dễ dàng hơn, đặc biệt là khi quy mô ứng dụng của bạn ngày càng lớn. Với sự hiểu biết về các khái niệm cốt lõi này, bạn đã sẵn sàng để khám phá các tính năng mạnh mẽ hơn của Redux Toolkit và áp dụng chúng để xây dựng các ứng dụng phức tạp một cách tự tin.

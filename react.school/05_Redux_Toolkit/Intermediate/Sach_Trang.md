# Sách trắng: Hiện đại hóa Quản lý Trạng thái với Redux Toolkit

## 1.0 Giới thiệu: Thách thức của việc Quản lý Trạng thái trong các Ứng dụng Hiện đại

#

Khi các ứng dụng phía client phát triển về quy mô và độ phức tạp, việc quản lý trạng thái (state) một cách hiệu quả trở thành thách thức kiến trúc hàng đầu đối với các nhóm phát triển. Trạng thái, về cơ bản là dữ liệu mà ứng dụng cần theo dõi, có thể trở nên khó kiểm soát khi nhiều thành phần (components) cần chia sẻ và cập nhật thông tin chung. Nếu không có một chiến lược rõ ràng, các nhóm có thể nhanh chóng đối mặt với những trở ngại đáng kể về khả năng bảo trì và gỡ lỗi.

Các nhà phát triển thường phải đối mặt với hai vấn đề cốt lõi trong việc quản lý trạng thái toàn cục:

- **"Prop Drilling":** Đây là quá trình chuyển trạng thái từ một thành phần cấp cao nhất của cây thành phần xuống các thành phần con lồng sâu bên trong thông qua các thuộc tính (props). Mặc dù đơn giản về mặt khái niệm, phương pháp này nhanh chóng trở nên cực kỳ **tẻ nhạt để quản lý** (tedious to manage). Mỗi thành phần ở giữa phải nhận và chuyển tiếp các props ngay cả khi nó không sử dụng chúng, tạo ra một chuỗi phụ thuộc cứng nhắc và khó thay đổi.
- **Cập nhật Trạng thái Không An toàn:** Một cách tiếp cận khác là tạo ra một đối tượng trạng thái toàn cục lớn và cho phép bất kỳ thành phần nào cũng có thể thay đổi nó. Tuy nhiên, phương pháp này ẩn chứa nhiều rủi ro. Nếu không có một cơ chế cập nhật tập trung, bất kỳ thành phần nào cũng có thể gây ra các hiệu ứng phụ, khiến luồng dữ liệu trở nên không thể đoán trước. Khi một lỗi xuất hiện, quá trình gỡ lỗi sẽ biến thành một cuộc **tìm kiếm thủ công, tốn thời gian trên toàn bộ mã nguồn để tìm ra nguồn gốc của sự thay đổi trái phép**, vì không có bất kỳ **"dấu vết giấy tờ"** (papertrail) nào.

Để giải quyết những thách thức này, các kiến trúc có kỷ luật hơn đã ra đời. Redux nổi lên như một giải pháp hàng đầu, mang lại một khuôn khổ có cấu trúc và khả năng dự đoán để quản lý trạng thái ứng dụng.

## 2.0 Nguyên tắc của Redux: Kỷ luật và Khả năng Dự đoán

#

Trước khi đi sâu vào Redux Toolkit, điều quan trọng là phải hiểu triết lý nền tảng của Redux. Thay vì cho phép các thay đổi trạng thái diễn ra một cách tự do, Redux giới thiệu một khuôn khổ có cấu trúc, đảm bảo mọi cập nhật đều nhất quán và có thể dự đoán được. Cách tiếp cận này dựa trên một vài khái niệm cốt lõi.

Bảng dưới đây giải mã các khái niệm cơ bản của Redux:

| Khái niệm               | Mô tả & Mục đích                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Store**               | Đây là một **"đối tượng javascript lớn"** (big javascript object) duy nhất chứa toàn bộ trạng thái toàn cục của ứng dụng. Việc tập trung tất cả trạng thái vào một nơi duy nhất tạo ra một "nguồn chân lý duy nhất" (single source of truth).                                                                                                                                     |
| **Actions**             | Các hành động là các sự kiện thông báo cho store rằng dữ liệu cần thay đổi. Chúng là một **"cách nhất quán"** để quản lý các cập nhật, đảm bảo rằng ý định thay đổi trạng thái luôn được thể hiện một cách rõ ràng.                                                                                                                                                               |
| **Dispatching Actions** | Redux giới thiệu một cách tiếp cận có kỷ luật, một số người có thể cho là **cố tình được thiết kế quá mức cần thiết** (intentionally over-engineered): gửi đi các hành động. Cơ chế này không phải tự nhiên mà có; nó tạo ra một bản ghi rõ ràng và có thể kiểm toán được về mọi thay đổi trạng thái.                                                                             |
| **Reducers**            | Đây là **"các hàm javascript đơn giản"** (simple javascript functions) lắng nghe các hành động. Quan trọng nhất, chúng phải là các **hàm thuần túy** (pure functions) không bao giờ thay đổi trực tiếp trạng thái hiện có, mà thay vào đó trả về một đối tượng trạng thái _mới_. Nguyên tắc bất biến này đảm bảo logic cập nhật trạng thái được tập trung và có thể dự đoán được. |

Lợi ích chính của kiến trúc Redux nằm ở khả năng gỡ lỗi mạnh mẽ. Chính vì trạng thái không bao giờ bị thay đổi trực tiếp, mà được thay thế bằng các bản sao mới thông qua các reducer thuần túy, nên chúng ta có một chuỗi các bản chụp trạng thái có thể dự đoán và tái tạo lại. Điều này trực tiếp cho phép một trong những tính năng nổi bật ban đầu của Redux là **"du hành thời gian"** (time travel), cho phép các nhà phát triển dễ dàng đảo ngược các hành động để quay về các trạng thái trước đó. Điều này sẽ không thể thực hiện được nếu không có một cơ chế trừu tượng để biểu diễn các thay đổi dữ liệu.

Tuy nhiên, việc thiết lập Redux theo cách truyền thống đòi hỏi nhiều mã soạn sẵn (boilerplate). Đây chính là lúc Redux Toolkit, sự phát triển hiện đại của Redux, phát huy tác dụng để giúp việc triển khai các nguyên tắc mạnh mẽ này trở nên dễ dàng hơn đáng kể.

## 3.0 Giới thiệu Redux Toolkit (RTK): Hiệu quả và Tối ưu hóa

#

Redux Toolkit (RTK) là giải pháp chính thức, được đề xuất để triển khai logic Redux. Nó được thiết kế để loại bỏ phần lớn **"boilerplate của Redux cổ điển"** và đơn giản hóa đáng kể quy trình thiết lập ban đầu. Thay vì cấu hình thủ công nhiều phần, RTK cung cấp các API tiện ích giúp tăng tốc quá trình phát triển.

Quy trình thiết lập ban đầu với RTK bao gồm các bước sau:

1.  **Tích hợp với React:** Thư viện `react-redux` đóng vai trò là cầu nối giữa React và Redux. Bằng cách bao bọc toàn bộ ứng dụng trong thành phần `<Provider>` và truyền vào `store`, mọi thành phần trong cây ứng dụng đều có khả năng truy cập vào trạng thái toàn cục.
2.  **Cấu hình Store:** Hàm `configureStore` là điểm khởi đầu để thiết lập store của Redux. Nó không chỉ đơn giản hóa việc kết hợp các reducer mà còn tự động thiết lập các middleware có giá trị (như `redux-thunk` cho logic bất đồng bộ cơ bản) và tích hợp sẵn với Redux DevTools Extension, đây là những công cụ tăng năng suất quan trọng cho bất kỳ nhóm phát triển chuyên nghiệp nào.
3.  **Giới thiệu "Slices":** Một khái niệm cốt lõi trong RTK là "slice". Một slice là một thực thể được đặt tên đại diện cho một phần của trạng thái toàn cục cùng với logic để cập nhật phần trạng thái đó. Ví dụ, trong một ứng dụng, có thể có một slice tên là `missions` để quản lý tất cả trạng thái liên quan đến các nhiệm vụ.

Công cụ trung tâm để tạo ra các slice này là hàm `createSlice`. Hàm này nhận một đối tượng cấu hình với các đối số chính sau:

- `**name**`: Một chuỗi định danh cho slice (ví dụ: `'missions'`).
- `**initialState**`: Trạng thái ban đầu cho phần trạng thái này của store.
- `**reducers**`: Một đối tượng chứa logic để xử lý các cập nhật trạng thái. RTK tự động tạo ra các hành động tương ứng với mỗi hàm reducer được định nghĩa ở đây.

Cấu trúc này tạo ra một kiến trúc trạng thái có tổ chức, dễ bảo trì và có khả năng mở rộng cao, đặt nền móng vững chắc cho việc triển khai các hoạt động dữ liệu phức tạp hơn.

## 4.0 Tăng tốc Phát triển với `createEntityAdapter`

#

Một trong những tính năng mạnh mẽ và hiệu quả nhất của Redux Toolkit là `createEntityAdapter`. Tiện ích này **"thực sự tuyệt vời"** (so awesome) vì nó cho phép các nhà phát triển bỏ qua việc viết rất nhiều mã boilerplate lặp đi lặp lại liên quan đến các hoạt động CRUD (Create, Read, Update, Delete) trên một tập hợp dữ liệu được chuẩn hóa.

Theo tài liệu chính thức, `createEntityAdapter` là một **"hàm tạo ra một bộ các reducer và selector được xây dựng sẵn để thực hiện các hoạt động CRUD"**. Điều này có nghĩa là thay vì phải viết logic để thêm, cập nhật, xóa và truy vấn các thực thể trong trạng thái, nhà phát triển có thể dựa vào các hàm được tạo sẵn.

Các khả năng của `createEntityAdapter` có thể được chia thành hai phần chính:

#### **Tự động tạo Selectors**

#

Adapter tự động tạo ra các hàm selector để đọc dữ liệu từ store. Các selector được tạo sẵn phổ biến nhất bao gồm:

- `selectAll`: Trả về một mảng chứa tất cả các thực thể.
- `selectById`: Trả về một thực thể duy nhất dựa trên ID của nó.

Các hàm này sau đó có thể được xuất và đổi tên để sử dụng trong ứng dụng (ví dụ: `selectAllMissions`, `selectMissionById`), cung cấp một API rõ ràng để truy vấn trạng thái.

#### **Tự động tạo Reducers**

#

Adapter cũng cung cấp các hàm reducer để thực hiện các hoạt động CRUD. Các hàm đáng chú ý bao gồm:

- `**upsertOne**`: Thuật ngữ "upsert" có nghĩa là **"tạo, hoặc cập nhật nếu đã tồn tại"**. Hàm này xử lý cả việc tạo mới và cập nhật một thực thể hiện có chỉ bằng một hành động duy nhất, đơn giản hóa đáng kể logic cập nhật.
- `**removeOne**`: Hàm này xử lý việc xóa một thực thể khỏi trạng thái. Nó chỉ yêu cầu `id` của thực thể được truyền vào dưới dạng `action.payload` để thực hiện việc xóa.

Từ góc độ kiến trúc, lợi ích thực sự của `createEntityAdapter` không chỉ là sự tiện lợi. Nó thực thi một hình dạng trạng thái được chuẩn hóa và bình thường hóa cho các bộ sưu tập thực thể. Việc tiêu chuẩn hóa này là một quyết định kiến trúc quan trọng giúp ngăn ngừa các cấu trúc dữ liệu không nhất quán, đơn giản hóa logic bộ đệm và giảm đáng kể khả năng xảy ra lỗi liên quan đến đồng bộ hóa dữ liệu trên các phần khác nhau của ứng dụng. Nó biến một tính năng tiện ích thành một công cụ chiến lược để xây dựng các hệ thống mạnh mẽ.

## 5.0 Quy trình làm việc Thực tế: Đọc và Ghi Dữ liệu với RTK

#

Bây giờ, hãy tổng hợp tất cả các khái niệm lại với nhau bằng cách xem xét một quy trình làm việc CRUD hoàn chỉnh. Redux Toolkit, kết hợp với `react-redux`, cung cấp một bộ công cụ liền mạch để đọc và ghi dữ liệu vào store từ bên trong các thành phần React.

1.  **Đọc Dữ liệu (Sử dụng Selectors):**
    - Để **"đọc dữ liệu"** từ store, chúng ta sử dụng hook `useSelector` từ `react-redux`. Hook này nhận một hàm selector làm đối số và trả về dữ liệu được chọn từ trạng thái Redux.
    - Trong thành phần `Missions.js`, dòng `useSelector(selectAllMissions)` được sử dụng để lấy danh sách tất cả các nhiệm vụ và hiển thị chúng.
    - Trong thành phần `Mission.js`, selector `selectMissionById` được sử dụng để lấy một thực thể duy nhất dựa trên một tham số ID. Cần lưu ý rằng các selector yêu cầu đối số, như `selectMissionById`, thường liên quan đến việc tạo một phiên bản selector được ghi nhớ (memoized) bên trong thành phần để đảm bảo hiệu suất và ngăn chặn việc render lại không cần thiết. Điều này cho thấy RTK có thể mở rộng từ việc truy xuất dữ liệu đơn giản đến các truy vấn phức tạp hơn, có tham số.
    - Một ưu điểm lớn của cách tiếp cận này là các thành phần sẽ **"tự động hiển thị lại với dữ liệu được cập nhật"** bất cứ khi nào trạng thái liên quan trong store thay đổi.
2.  **Ghi Dữ liệu (Sử dụng Actions và Dispatch):**
    - Để **"ghi dữ liệu"** vào store, chúng ta sử dụng hook `useDispatch` từ `react-redux`. Hook này trả về hàm `dispatch` của store, cho phép chúng ta gửi các hành động.
    - Các hàm hành động (action creators) như `upsertMission` và `destroyMission` được tự động tạo và xuất từ đối tượng `missionsSlice.actions`.
    - Để tạo hoặc cập nhật một thực thể, chúng ta gửi một hành động bằng cú pháp như `dispatch(upsertMission({ id: 1, title: '...' }))`. Để xóa một thực thể, chúng ta chỉ cần gửi ID của nó: `dispatch(destroyMission(id))`.

Quy trình này hoàn thành một chu trình CRUD cơ bản, thể hiện cách RTK tạo ra một luồng dữ liệu hai chiều, có thể dự đoán được trong toàn bộ ứng dụng.

## 6.0 Kết luận: Lựa chọn Chuyên nghiệp cho các Ứng dụng có Thể mở rộng

#

Redux Toolkit đã chứng minh được giá trị của mình không chỉ là một bản cập nhật cho Redux, mà là một cuộc cách mạng về cách các nhà phát triển quản lý trạng thái trong các ứng dụng hiện đại. Bằng cách giải quyết các điểm yếu cốt lõi của Redux truyền thống, RTK đã làm cho việc quản lý trạng thái mạnh mẽ trở nên dễ tiếp cận và hiệu quả hơn bao giờ hết.

Các giá trị cốt lõi mà Redux Toolkit mang lại cho các nhóm phát triển chuyên nghiệp bao gồm:

- **Tăng tốc Chu kỳ Phát triển:** RTK giảm thiểu đáng kể mã boilerplate thông qua các tiện ích mạnh mẽ như `createSlice` và `createEntityAdapter`. Điều này trực tiếp chuyển thành việc cung cấp tính năng nhanh hơn và chi phí phát triển thấp hơn, cho phép các nhóm tập trung vào việc tạo ra giá trị kinh doanh thay vì viết mã cơ sở hạ tầng.
- **Giảm Nợ Kỹ thuật và Rủi ro:** Cấu trúc "slice" và các mẫu được định sẵn như adapter thực thi một cơ sở mã có tổ chức. Điều này ngăn chặn việc quản lý trạng thái tự phát, hỗn loạn, vốn là một trong những nguyên nhân chính gây ra nợ kỹ thuật trong các ứng dụng frontend quy mô lớn. Một kiến trúc trạng thái rõ ràng giúp giảm thiểu rủi ro và đơn giản hóa việc bảo trì lâu dài.
- **Khả năng mở rộng:** Bằng cách cung cấp một khuôn khổ quản lý trạng thái mạnh mẽ và nhất quán, RTK cho phép các ứng dụng phát triển về độ phức tạp mà không bị sa vào tình trạng hỗn loạn về trạng thái. Các mẫu có thể dự đoán được của nó đảm bảo rằng ứng dụng vẫn ổn định khi quy mô nhóm và cơ sở mã tăng lên.

Cuối cùng, Redux Toolkit không chỉ là một thư viện, mà là một phương pháp luận tiêu chuẩn ngành để xây dựng các ứng dụng phía client mạnh mẽ, hiệu suất cao và có thể bảo trì. Đối với bất kỳ dự án nào có tham vọng phát triển vượt ra ngoài quy mô nhỏ, việc áp dụng RTK là một quyết định kiến trúc chiến lược giúp đảm bảo sự thành công lâu dài.

# Hướng dẫn từng bước: Thực hiện CRUD với Redux Toolkit

### Giới thiệu

Chào mừng bạn đến với hướng dẫn này! Mục tiêu của chúng tôi là cung cấp cho bạn một lộ trình rõ ràng, từng bước một để thực hiện các hoạt động CRUD (Tạo, Đọc, Cập nhật, Xóa) một cách hiệu quả bằng Redux Toolkit. Chúng ta sẽ đặc biệt tập trung vào việc sử dụng `createEntityAdapter` để đơn giản hóa và tăng tốc quá trình quản lý trạng thái.

### Tại sao lại là Redux Toolkit?

Trước khi đi sâu vào mã, hãy cùng tìm hiểu "lý do" đằng sau việc sử dụng Redux.

Hãy tưởng tượng trạng thái ứng dụng của bạn như một thư viện trung tâm. Nếu không có nó, mỗi component sẽ phải giữ những cuốn sách của riêng mình và chuyền chúng cho các component con khi cần. Quá trình này được gọi là **"prop drilling"** và nó rất tẻ nhạt để quản lý. Redux giải quyết vấn đề này bằng cách tạo ra một nguồn chân lý duy nhất, toàn cục mà bất kỳ component nào cũng có thể truy cập trực tiếp, loại bỏ nhu cầu truyền props qua nhiều lớp.

Trong "thư viện" Redux, bạn không thể tùy tiện chỉnh sửa sách. Thay vào đó, bạn phải tuân theo một quy trình có cấu trúc:

1.  Để đọc dữ liệu, các component sử dụng một hook như `useSelector` để "mượn sách" từ thư viện.
2.  Để thay đổi dữ liệu, các component phải "gửi yêu cầu thay đổi" thông qua việc **"gửi các action"** (dispatching actions).

Các yêu cầu này được xử lý bởi các **"reducers"**—những thủ thư cần mẫn chỉ tuân theo các quy tắc nghiêm ngặt để cập nhật danh mục. Việc bắt buộc tất cả các thay đổi phải đi qua luồng action và reducer này sẽ tạo ra một bản ghi có thể dự đoán và kiểm tra được của mọi thay đổi. Đây là một lợi ích vô giá để gỡ lỗi các ứng dụng phức tạp và thậm chí còn cho phép "du hành thời gian" trong gỡ lỗi, nơi bạn có thể dễ dàng quay lại các trạng thái trước đó.

**Redux Toolkit** là phiên bản hiện đại của Redux, một bộ công cụ mạnh mẽ giúp đơn giản hóa đáng kể quy trình này, loại bỏ rất nhiều mã lặp và cung cấp các phương pháp hay nhất ngay từ đầu.

Bây giờ, hãy bắt đầu xây dựng thư viện của chúng ta nhé!

\--------------------------------------------------------------------------------

## 1\. Bước 1: Thiết lập nền tảng với `createEntityAdapter`

Phần này sẽ hướng dẫn bạn cách thiết lập cấu trúc ban đầu cần thiết cho việc quản lý dữ liệu của chúng ta.

### 1.1. Giới thiệu `createEntityAdapter`

Theo tài liệu chính thức, `createEntityAdapter` là: _"Một hàm tạo ra một tập hợp các reducers và selectors được xây dựng sẵn để thực hiện các hoạt động CRUD..."_

_Về cơ bản,_ `_createEntityAdapter_` _là một cỗ máy giúp chúng ta tự động tạo ra toàn bộ mã CRUD lặp đi lặp lại mà lẽ ra chúng ta phải tự viết._

Để bắt đầu, bạn chỉ cần khởi tạo nó trong tệp slice của mình:

    const missionsAdapter = createEntityAdapter();

### 1.2. Tích hợp vào `createSlice`

Sau khi tạo adapter, bạn cần tích hợp nó vào "slice" của mình. Một slice đại diện cho một phần của trạng thái Redux. `createEntityAdapter` được sử dụng bên trong hàm `createSlice` để quản lý trạng thái cho một thực thể cụ thể, chẳng hạn như `missions` trong ví dụ của chúng ta.

Đây là một bước tiến lớn! Bây giờ chúng ta đã có một cấu trúc vững chắc để quản lý dữ liệu, hãy tìm hiểu cách đọc dữ liệu đó.

\--------------------------------------------------------------------------------

## 2\. Bước 2: Đọc Dữ liệu (Read) với Selectors

Phần này tập trung vào chữ 'R' (Read) trong CRUD. Chúng ta sẽ khám phá cách truy xuất dữ liệu từ store bằng các selectors được tạo tự động.

### 2.1. Hiểu về Selectors

Một "selector function" được định nghĩa là _"bất kỳ hàm nào chấp nhận trạng thái store Redux... làm đối số và trả về dữ liệu dựa trên trạng thái đó."_

Về cơ bản, selectors là các hàm giúp bạn lấy ra những phần cụ thể của trạng thái. Điều tuyệt vời là `createEntityAdapter` đã tạo sẵn các selectors này cho chúng ta, giúp tiết kiệm đáng kể thời gian và công sức.

### 2.2. Triển khai `selectAll` và `selectById`

`createEntityAdapter` cung cấp cho chúng ta hai selectors chính để đọc dữ liệu. Chúng ta có thể sử dụng chúng trong các component React của mình với hook `useSelector` từ `react-redux`—thư viện kết nối giữa React và Redux.

Trước khi sử dụng, một phương pháp hay là đổi tên các selectors chung chung (`selectAll`) thành tên cụ thể hơn cho slice dữ liệu của chúng ta (`selectAllMissions`). Điều này làm cho mã của bạn dễ đọc hơn nhiều.

| Selector     | Mục đích                                                                                                                          | Ví dụ sử dụng với `useSelector`                                                                                                                                                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selectAll`  | Truy xuất một mảng chứa tất cả các mục trong thực thể đó. Hữu ích khi bạn cần hiển thị một danh sách đầy đủ.                      | Trong component `Missions.js`, bạn có thể lấy tất cả các mission bằng cách gọi: `const missions = useSelector(selectAllMissions);`                                                                                                                                                                                  |
| `selectById` | Truy xuất một mục duy nhất dựa trên ID của nó. Hoàn hảo cho các trang chi tiết hoặc khi bạn cần làm việc với một thực thể cụ thể. | `useSelector(state => selectMissionById(state, id))` <br><br> _Lưu ý rằng_ `_selectById_` _yêu cầu một hàm nhận toàn bộ đối tượng_ `_state_`_. Điều này là do selector cần truy cập vào toàn bộ trạng thái để tìm đúng slice (_`_state.missions_`_) và sau đó sử dụng_ `_id_` _được cung cấp để lấy ra mục cụ thể._ |

Tuyệt vời, bây giờ chúng ta đã có thể 'đọc' dữ liệu từ store một cách thành thạo. Nhưng một ứng dụng sẽ không hoàn chỉnh nếu chúng ta không thể 'ghi' vào đó. Hãy cùng tìm hiểu cách tạo và cập nhật dữ liệu với một hàm cực kỳ mạnh mẽ của Redux Toolkit.

\--------------------------------------------------------------------------------

## 3\. Bước 3: Tạo và Cập nhật Dữ liệu (Create & Update) với `upsertOne`

Phần này kết hợp chữ 'C' (Create) và 'U' (Update) trong CRUD bằng cách sử dụng một hàm "upsert" mạnh mẽ.

### 3.1. Phép màu của "Upsert" là gì?

Thuật ngữ **"upsert"** có nghĩa là: _"tạo, hoặc cập nhật nếu đã được tạo."_

Hãy nghĩ về lợi ích ở đây. Thay vì phải viết logic `if (itemExists)` để quyết định gọi hàm `create` hay `update`, `upsertOne` xử lý tất cả sự phức tạp đó cho bạn chỉ với một lời gọi hàm duy nhất. Cực kỳ hiệu quả!

### 3.2. Triển khai Reducer `upsertOne`

Để triển khai chức năng upsert, hãy làm theo các bước sau trong tệp slice Redux của bạn:

1.  **Thêm Reducer:** Trong đối tượng `reducers` của `createSlice`, thêm một reducer mới.
2.  **Gọi Adapter:** Bên trong reducer này, gọi hàm `upsertOne` từ adapter của bạn. Hàm này nhận `state` hiện tại và `action.payload`. Đối với `upsertOne`, `payload` là **toàn bộ đối tượng mission** bạn muốn tạo hoặc cập nhật (ví dụ: `{ id: 'some-id', title: 'New Title' }`).
3.  **Xuất Action:** `createSlice` sẽ tự động tạo một "action creator" cho reducer của bạn. Bạn có thể xuất nó từ `missionsSlice.actions` để sử dụng trong các component của mình.

    const missionsSlice = createSlice({
    name: 'missions',
    initialState: missionsAdapter.getInitialState(),
    reducers: {
    upsertMission: (state, action) => {
    // action.payload là đối tượng mission đầy đủ
    missionsAdapter.upsertOne(state, action.payload);
    },
    // ... các reducers khác
    }
    });

    export const { upsertMission } = missionsSlice.actions;

### 3.3. Sử dụng Action trong Component

Để kích hoạt reducer này từ một component React, chúng ta sẽ sử dụng hook `useDispatch` từ `react-redux`. Đây là phần "ghi dữ liệu" trong mô hình "Đọc vs. Ghi" của chúng ta (`useSelector` là để đọc).

    import { useDispatch } from 'react-redux';
    import { upsertMission } from './missionsSlice';

    // ... bên trong component của bạn
    const dispatch = useDispatch();

    const handleSave = () => {
      const missionData = { id: 'some-id', title: 'New Title' };
      dispatch(upsertMission(missionData));
    };

Thấy không, không quá phức tạp phải không? Chúng ta đã thành thạo việc tạo và cập nhật dữ liệu. Bước cuối cùng trong hành trình CRUD là học cách xóa dữ liệu.

\--------------------------------------------------------------------------------

## 4\. Bước 4: Xóa Dữ liệu (Delete) với `removeOne`

Phần này hoàn thành bộ CRUD bằng cách giải thích hoạt động xóa (Delete).

### 4.1. Triển khai Reducer `removeOne`

Quá trình này tương tự như việc thiết lập `upsertOne`, nhưng đơn giản hơn.

1.  **Thêm Reducer:** Thêm một reducer mới vào `createSlice` để xử lý việc xóa (ví dụ: `destroyMission`).
2.  **Gọi Adapter:** Reducer này sẽ gọi hàm `removeOne` từ adapter: `missionsAdapter.removeOne`.
3.  **Truyền ID:** Không giống như `upsertOne` cần một đối tượng đầy đủ, `removeOne` chỉ cần `action.payload` là **chỉ** `**id**` của mục bạn muốn xóa. Sự khác biệt này rất quan trọng!

    // ... bên trong createSlice
    reducers: {
    // ...
    destroyMission: (state, action) => {
    // action.payload ở đây chỉ là ID của mission cần xóa
    missionsAdapter.removeOne(state, action.payload);
    }
    }

### 4.2. Gửi Action Xóa

Cũng giống như upsert, việc xóa được kích hoạt bằng cách gửi một action bằng hook `useDispatch`.

    // Ví dụ về cách gọi dispatch để xóa một mission
    dispatch(destroyMission(id));

Sau khi bạn dispatch action này, Redux Toolkit và entity adapter sẽ xử lý phần còn lại, xóa mục khỏi trạng thái một cách hiệu quả.

Chúc mừng bạn! Bạn đã thực hiện thành công tất cả các hoạt động CRUD cơ bản.

\--------------------------------------------------------------------------------

## 5\. Tổng kết và các bước tiếp theo

Trong hướng dẫn này, chúng ta đã đi qua bốn hoạt động CRUD cốt lõi bằng cách tận dụng sức mạnh của Redux Toolkit. Chúng ta đã thấy `createEntityAdapter` tự động hóa việc tạo ra các reducers và selectors, `upsertOne` xử lý cả việc tạo và cập nhật, `removeOne` quản lý việc xóa, và các selectors cho phép chúng ta đọc dữ liệu một cách hiệu quả.

Dưới đây là tóm tắt các điểm chính:

- `**createEntityAdapter**` tự động hóa việc tạo ra logic CRUD, giúp bạn tiết kiệm thời gian và giảm mã lặp đi lặp lại.
- **Selectors (**`**selectAll**`**,** `**selectById**`**)** đọc dữ liệu từ store một cách hiệu quả bằng cách sử dụng hook `useSelector`.
- **Reducers (**`**upsertOne**`**,** `**removeOne**`**)** sửa đổi dữ liệu một cách có thể dự đoán và nhất quán.
- **Actions và** `**useDispatch**` kích hoạt các thay đổi trạng thái từ các component React của bạn.

Bây giờ bạn đã nắm vững các hoạt động CRUD đồng bộ, bước tiếp theo trong hành trình của bạn là tìm hiểu cách xử lý hành vi bất đồng bộ, chẳng hạn như tìm nạp dữ liệu từ máy chủ.

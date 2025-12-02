# Báo cáo Nội bộ: Phân tích Kỹ thuật Tối ưu hóa Hiệu suất trong React

## 1.0 Giới thiệu: Tầm quan trọng của Tối ưu hóa Hiệu suất

Trong quá trình phát triển các ứng dụng React hiện đại, việc đảm bảo hiệu suất không chỉ là một yếu tố "nice-to-have" mà là một yêu cầu kiến trúc cốt lõi. Người dùng mong đợi các giao diện nhanh, mượt mà và phản hồi tức thì. Một ứng dụng chậm chạp có thể dẫn đến trải nghiệm người dùng kém và ảnh hưởng tiêu cực đến mục tiêu kinh doanh. Một trong những nguyên nhân chính gây ra các vấn đề về hiệu suất trong React là việc render không cần thiết—khi các component được render lại mà không có bất kỳ thay đổi nào về mặt giao diện.

Mục tiêu của tài liệu này là cung cấp cho các nhà phát triển một sự hiểu biết sâu sắc về các cơ chế cốt lõi của React—bao gồm cây render, cây phụ thuộc mô-đun, và vai trò của state. Bằng cách nắm vững các khái niệm này, chúng ta có thể xác định các điểm nghẽn về hiệu suất một cách chủ động và áp dụng các chiến lược đã được chứng minh để xây dựng các ứng dụng hiệu quả và phản hồi nhanh hơn.

Để tối ưu hóa hiệu quả, trước tiên chúng ta phải hiểu cách React "nhìn thấy" và render giao diện người dùng.

## 2.0 Các Khái niệm Nền tảng: Cách React Xây dựng và Render Giao diện

Nắm vững các khái niệm cơ bản về cách React cấu trúc và hiển thị giao diện là điều kiện tiên quyết để xác định và giải quyết các điểm nghẽn về hiệu suất. Phần này sẽ phân tích các cấu trúc cây mà React sử dụng và quy trình render cốt lõi của nó.

### 2.1 Cây Render: Cấu trúc Giao diện Người dùng

React mô hình hóa giao diện người dùng (UI) như một cấu trúc cây, được gọi là **Cây Render (Render Tree)**. Cấu trúc này được hình thành dựa trên sự lồng ghép của các component. Mỗi node trong cây là một component React, và toàn bộ cây biểu diễn mối quan hệ cha-con giữa chúng.

Hiểu rõ Cây Render là nền tảng để phân tích luồng render, vì nó giúp chúng ta xác định các component cấp cao (top-level) và component lá (leaf), hai loại có tác động khác nhau đến hiệu suất:

- **Component cấp cao:** Là các component gần gốc của cây. Các cập nhật state ở đây có thể kích hoạt một "thác" re-render xuống toàn bộ cây con bên dưới, khiến việc tối ưu hóa chúng trở thành một nỗ lực có tác động lớn.
- **Component lá:** Là các component ở cuối cây, không có component con. Chúng thường được render lại thường xuyên, nhưng tác động của chúng chỉ mang tính cục bộ.

Sự phân biệt này là rất quan trọng để có chiến lược tối ưu hóa hiệu quả.

### 2.2 Quy trình Render và Commit

React sử dụng một quy trình ba bước có thể dự đoán được để hiển thị các component lên màn hình. Việc hiểu rõ quy trình này là chìa khóa để biết khi nào và tại sao các component được cập nhật.

1.  **Kích hoạt (Triggering):** Một lần render được kích hoạt trong hai trường hợp: lần render đầu tiên của ứng dụng, hoặc khi state của một component (hoặc của một trong các component cha của nó) được cập nhật.
2.  **Render (Rendering):** Đây là quá trình React gọi các component của bạn để xác định những gì sẽ hiển thị trên màn hình.
    - Đối với lần render đầu tiên, React sẽ gọi component gốc (root).
    - Đối với các lần render sau, React sẽ gọi function component mà việc cập nhật state của nó đã kích hoạt lần render.
    - **Nguyên tắc cốt lõi:** Quá trình render phải luôn là một **phép tính thuần túy (pure calculation)**. Với cùng một đầu vào (props, state, context), một component phải luôn trả về cùng một đầu ra JSX.
3.  **Commit:** Sau khi đã render (gọi) các component và thu thập được cây JSX, React sẽ sửa đổi DOM.
    - Đối với lần render đầu tiên, React sẽ sử dụng API DOM `appendChild()` để đưa tất cả các node DOM đã tạo lên màn hình.
    - Đối với các lần render lại, **React chỉ thay đổi các node DOM nếu có sự khác biệt giữa các lần render,** áp dụng các thao tác tối thiểu cần thiết.

### 2.3 Cây Phụ thuộc Mô-đun (Module Dependency Tree)

Ngoài Cây Render, có một cấu trúc cây khác hoạt động ở cấp độ file: **Cây Phụ thuộc Mô-đun (Module Dependency Tree)**. Cây này biểu diễn các câu lệnh `import` giữa các file JavaScript (mô-đun) và được các công cụ build (như Vite, Webpack) sử dụng để đóng gói tất cả các đoạn mã cần thiết để ứng dụng có thể chạy.

Cấu trúc này ảnh hưởng trực tiếp đến hiệu suất tải trang ban đầu vì nó quyết định **kích thước gói tin (bundle size)** của ứng dụng. Một cây phụ thuộc lớn sẽ dẫn đến thời gian tải lâu hơn cho người dùng.

Cần phải phân biệt rõ ràng: **Cây Render** là một khái niệm _runtime_, đại diện cho hệ thống phân cấp component mà React nhìn thấy trên màn hình và quyết định cách các re-render lan truyền. Ngược lại, **Cây Phụ thuộc Mô-đun** là một khái niệm _build-time_, dựa trên các câu lệnh import, chủ yếu ảnh hưởng đến hiệu suất tải trang ban đầu thông qua kích thước gói tin.

## 3.0 Chiến lược Tối ưu hóa Cốt lõi: Giảm thiểu Render Không cần thiết

Chiến lược tối ưu hóa hiệu suất cốt lõi và hiệu quả nhất trong React là loại bỏ triệt để các lần render không cần thiết. Khi một component render, tất cả các component con của nó cũng sẽ render theo mặc định, điều này có thể tạo ra một "thác" render tốn kém. Phần này sẽ phân tích các kỹ thuật chính để ngăn chặn hành vi này.

### 3.1 Nguyên tắc Bất biến (Immutability)

Nguyên tắc cốt lõi trong việc quản lý state của React là state nên được coi là **chỉ đọc (read-only)**. Thay vì thay đổi trực tiếp (mutate) các đối tượng hoặc mảng trong state, chúng ta phải luôn tạo một bản sao mới và thay thế state cũ bằng bản sao đó.

Việc đột biến trực tiếp state là một hành vi xấu vì những lý do sau:

- **Không kích hoạt re-render:** Cơ chế phát hiện thay đổi mặc định của React là so sánh nông (shallow comparison) các tham chiếu. Khi đột biến một đối tượng hoặc mảng, tham chiếu của nó trong bộ nhớ không thay đổi. Do đó, React thấy rằng state cũ và state mới là cùng một đối tượng và bỏ qua việc re-render.
- **Ảnh hưởng đến các "snapshot" render trước đó:** React coi state như một "snapshot" tại một thời điểm. Việc đột biến sẽ thay đổi state trong các snapshot render trước đó, gây ra các lỗi logic khó lường và phá vỡ mô hình mental của React.

**❌ Cách làm sai (Đột biến state):**

    function handleFirstNameChange(e) {
      // Đột biến trực tiếp đối tượng person trong state
      person.firstName = e.target.value;
    }

**✅ Cách làm đúng (Tạo đối tượng mới):**

    function handleFirstNameChange(e) {
      setPerson({
        ...person, // Sao chép tất cả các trường cũ
        firstName: e.target.value // Ghi đè trường firstName
      });
    }

### 3.2 Quản lý State một cách Chiến lược

Cấu trúc và cách quản lý state có tác động trực tiếp đến hiệu suất. Một cấu trúc state được thiết kế tốt sẽ tự nhiên dẫn đến ít lần render hơn và mã nguồn dễ bảo trì hơn.

#### 3.2.1 Các Nguyên tắc Cấu trúc State

Khi thiết kế state cho một component, hãy tuân thủ các nguyên tắc sau để tối ưu hóa hiệu suất và tránh các lỗi phổ biến:

1.  **Nhóm State liên quan:** Nếu hai hoặc nhiều biến state luôn thay đổi cùng nhau, hãy gộp chúng vào một đối tượng state duy nhất. Điều này giúp giảm sự phức tạp và tránh các lần cập nhật state riêng lẻ có thể gây ra nhiều lần render.
2.  **Tránh State mâu thuẫn:** Khi cấu trúc state cho phép tồn tại các trạng thái "không thể xảy ra" (ví dụ: `isSending` và `isSent` cùng là `true`), nó tạo ra nguy cơ lỗi. Thay vào đó, hãy sử dụng một biến `status` duy nhất (`'typing'`, `'sending'`, `'sent'`) để đảm bảo tính hợp lệ của state và làm cho logic render gọn gàng hơn, tránh các lần render không cần thiết do các trạng thái mâu thuẫn.
3.  **Tránh State thừa (Redundant State):** Nếu bạn có thể tính toán một thông tin nào đó từ các props hoặc state hiện có trong quá trình render, đừng lưu trữ nó trong state. Ví dụ, tính `fullName` từ `firstName` và `lastName` mỗi lần render. Bằng cách tính toán giá trị này trong khi render, chúng ta không chỉ loại bỏ một state không cần thiết mà còn tránh được một lần re-render bổ sung chỉ để giữ cho `fullName` được đồng bộ.
4.  **Tránh Trùng lặp State (Duplication in State):** Khi cùng một dữ liệu được lưu ở nhiều nơi, việc giữ chúng đồng bộ trở nên khó khăn. Ví dụ, thay vì lưu toàn bộ đối tượng `selectedItem`, chỉ cần lưu `selectedId`. Điều này loại bỏ sự trùng lặp và đảm bảo rằng khi dữ liệu gốc thay đổi, giao diện sẽ tự động phản ánh sự thay đổi đó mà không cần thêm một lần cập nhật state nào khác.
5.  **Tránh State lồng sâu (Deeply Nested State):** State lồng sâu rất khó cập nhật một cách bất biến. Việc làm phẳng (flattening) hoặc chuẩn hóa (normalizing) cấu trúc state giúp việc cập nhật trở nên đơn giản và hiệu quả hơn, tránh các thao tác sao chép sâu, phức tạp có thể ảnh hưởng đến hiệu suất.

#### 3.2.2 Loại bỏ các Effect không cần thiết

`useEffect` là một công cụ mạnh mẽ nhưng thường bị sử dụng sai mục đích. Chức năng chính của Effect là để đồng bộ hóa component của bạn với một **hệ thống bên ngoài** (ví dụ: API mạng, DOM, thư viện bên thứ ba). Việc sử dụng chúng để cập nhật state dựa trên các thay đổi của props hoặc state khác thường là không hiệu quả và là một dấu hiệu của cấu trúc state chưa tốt.

| Kịch bản                                             | Giải pháp Tốt hơn và Lý do                                                                                                                                                                                       |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cập nhật state dựa trên props hoặc state khác.       | **Tính toán giá trị trực tiếp trong quá trình render.** Điều này tránh được các lần re-render nối tiếp không cần thiết và giữ cho luồng dữ liệu đơn giản hơn.                                                    |
| Lưu vào bộ đệm (caching) các phép tính toán tốn kém. | **Sử dụng Hook** `**useMemo**`**.** `useMemo` sẽ chỉ tính toán lại giá trị khi các phụ thuộc của nó thay đổi, tránh các phép tính không cần thiết trong các lần re-render do các thay đổi state không liên quan. |
| Xử lý các sự kiện của người dùng.                    | **Đặt logic trực tiếp vào trong các trình xử lý sự kiện (event handlers).** Logic sự kiện nên chạy khi có tương tác của người dùng, không phải vì component được hiển thị.                                       |

### 3.3 Kiểm soát Vòng đời Component bằng Keys

Theo mặc định, React duy trì state của một component dựa trên **vị trí của nó trong cây render**.

- **Component giống nhau ở cùng một vị trí:** Sẽ bảo toàn state.
- **Component khác nhau ở cùng một vị trí:** Sẽ reset state của nó và toàn bộ cây con bên dưới.

Thuộc tính `key` là một cơ chế mạnh mẽ để cung cấp một định danh rõ ràng cho một component, độc lập với vị trí của nó, cho phép chúng ta kiểm soát vòng đời của component một cách có chủ đích.

Có hai trường hợp sử dụng chính của `key` để tối ưu hóa:

1.  **Hiển thị danh sách (Rendering Lists):** Khi render một danh sách, việc cung cấp một `key` duy nhất và ổn định cho mỗi mục là rất quan trọng. Không có `key` ổn định, khi một danh sách được sắp xếp lại hoặc một mục được chèn vào, React có thể phải phá hủy và tạo lại các node DOM một cách không cần thiết. Với `key` ổn định, React có thể di chuyển các phần tử DOM hiện có một cách thông minh, một thao tác có hiệu suất cao hơn đáng kể.
2.  **Reset State:** Đôi khi, bạn muốn reset hoàn toàn state của một component và cây con của nó. Ví dụ, khi người dùng chuyển đổi giữa các hồ sơ khác nhau trong một component `Profile`, bạn muốn form được reset. Thay vì viết logic phức tạp để reset từng state, bạn chỉ cần thay đổi `key` của component. Khi `key` thay đổi, React sẽ coi đó là một component hoàn toàn mới, phá hủy instance cũ (cùng với state của nó) và tạo một instance mới với state hoàn toàn mới.

## 4.0 Tổng kết và Các Thực hành Tốt nhất

Báo cáo này đã phân tích gốc rễ của các vấn đề hiệu suất trong React: các lần render không cần thiết. Giải pháp không nằm ở việc tối ưu hóa vi mô, mà ở sự thay đổi mô hình tư duy: hướng tới quản lý state một cách chiến lược, tuân thủ nguyên tắc bất biến, và nắm vững vòng đời render của React. Bằng cách áp dụng các nguyên tắc này, các nhà phát triển có thể xây dựng các ứng dụng nhanh hơn, hiệu quả hơn và dễ bảo trì hơn một cách có hệ thống.

Dưới đây là một danh sách kiểm tra các thực hành tốt nhất để tham khảo nhanh:

- **Tính toán trong khi render:** Luôn ưu tiên tính toán các giá trị từ props và state hiện có thay vì tạo ra state thừa.
- **Giữ state phẳng:** Tránh các cấu trúc state lồng sâu; hãy chuẩn hóa chúng khi cần thiết để việc cập nhật trở nên đơn giản và hiệu quả.
- **Đối xử với state như bất biến:** Luôn tạo các đối tượng và mảng mới khi cập nhật state thay vì đột biến những cái hiện có để đảm bảo React phát hiện thay đổi.
- **Sử dụng** `**key**` **một cách có chủ đích:** Dùng `key` để reset state của component và để render danh sách một cách hiệu quả.
- **Đặt logic sự kiện vào trình xử lý sự kiện:** Tránh các Effect không cần thiết để xử lý các tương tác của người dùng.
- **Sử dụng Effect một cách thận trọng:** Dành riêng Effect cho việc đồng bộ hóa với các hệ thống bên ngoài (APIs, DOM), không phải để tính toán state từ các props hoặc state khác.

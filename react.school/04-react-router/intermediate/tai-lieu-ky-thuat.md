# Tài liệu kỹ thuật: Kiến trúc và các mẫu định tuyến nâng cao với React Router

### Giới thiệu

#

Trong hệ sinh thái React, React Router không chỉ là một thư viện—nó là nền tảng kiến trúc cho việc điều hướng trong các ứng dụng trang đơn (Single-Page Applications - SPAs). Việc làm chủ nó là điều kiện tiên quyết để xây dựng các ứng dụng có khả năng mở rộng, dễ bảo trì và mang lại trải nghiệm người dùng liền mạch. Tài liệu này sẽ phân tích sâu về các thành phần cốt lõi, đánh giá các mẫu kiến trúc định tuyến chiến lược và xác định các phương pháp hay nhất để triển khai một hệ thống định tuyến mạnh mẽ và hiệu quả.

\--------------------------------------------------------------------------------

## 1\. Kiến trúc nền tảng của React Router

#

Để xây dựng các hệ thống định tuyến phức tạp, việc nắm vững các thành phần cấu trúc cơ bản của React Router là một yêu cầu chiến lược. Đây là những khối xây dựng nền tảng, và việc hiểu rõ vai trò của từng thành phần sẽ đảm bảo các quyết định kiến trúc của chúng ta là đúng đắn và có thể dự đoán được.

### 1.1. `<BrowserRouter>`: Nhà cung cấp Bối cảnh (Context Provider)

#

Thành phần `<BrowserRouter>` là gốc rễ của hệ thống định tuyến. Nó phải bao bọc toàn bộ cây thành phần của ứng dụng để thiết lập một bối cảnh định tuyến duy nhất. Về mặt kỹ thuật, `<BrowserRouter>` tận dụng **HTML5 History API** (`pushState`, `replaceState`, và sự kiện `popstate`) của trình duyệt để thao tác URL trên thanh địa chỉ mà không kích hoạt việc tải lại toàn bộ trang. Đây chính là cơ chế cốt lõi cho phép trải nghiệm điều hướng mượt mà của một SPA. Bằng cách cung cấp bối cảnh này, nó đảm bảo rằng mọi thành phần định tuyến con (`<Routes>`, `<Route>`, `<Link>`) đều hoạt động đồng bộ với trạng thái URL hiện tại.

    // Cấu trúc điển hình trong file App.js
    <BrowserRouter>
      <Routes>
        {/* Các Route được định nghĩa ở đây */}
      </Routes>
    </BrowserRouter>

### 1.2. `<Routes>`: Bộ chứa các tuyến đường

#

Thành phần `<Routes>` hoạt động như một bộ điều phối thông minh, chịu trách nhiệm quản lý một tập hợp các thành phần `<Route>` con. Chức năng chính của nó là duyệt qua các tuyến đường đã khai báo và render "nhánh" đầu tiên khớp nhất với vị trí (URL) hiện tại. Một "nhánh" ở đây không chỉ là một `<Route>` đơn lẻ mà là toàn bộ hệ thống phân cấp các tuyến đường khớp, bao gồm cả `<Route>` cha (ví dụ như một layout) và `<Route>` con cụ thể được render bên trong `<Outlet>` của nó. Cơ chế "khớp nhất" này đảm bảo tính xác định và có thể dự đoán của giao diện người dùng.

### 1.3. `<Route>`: Khai báo ánh xạ Giao diện người dùng

#

`<Route>` là đơn vị khai báo cơ bản, tạo ra một ánh xạ trực tiếp giữa một mẫu đường dẫn URL (`path`) và một thành phần giao diện người dùng React (`element`). Nó hoạt động bên trong một `<Routes>` để xác định thành phần nào sẽ được hiển thị cho một URL nhất định. Việc nắm vững cách kết hợp các thành phần cơ bản này là bước đầu tiên để xây dựng các mẫu kiến trúc định tuyến mạnh mẽ.

\--------------------------------------------------------------------------------

## 2\. Các mẫu định tuyến kiến trúc cốt lõi

#

Việc áp dụng các mẫu định tuyến đã được kiểm chứng không chỉ giải quyết các vấn đề kỹ thuật mà còn định hình trực tiếp trải nghiệm người dùng. Một kiến trúc định tuyến được thiết kế tốt không chỉ giúp giảm thiểu việc lặp lại mã mà còn ngăn chặn các hiện tượng giật lag giao diện (UI flashes) khi điều hướng, tạo ra một trải nghiệm ổn định và có thể dự đoán được cho người dùng.

### 2.1. Mẫu Layout Route: Tái sử dụng và nhất quán Giao diện

#

**Vấn đề:** Trong một SPA phức tạp, việc lặp lại các thành phần chung như `NavBar` và `Footer` trên mỗi trang sẽ dẫn đến vi phạm nguyên tắc DRY (Don't Repeat Yourself), gây khó khăn cho việc bảo trì và tạo ra sự không nhất quán.

**Giải pháp:** Mẫu Layout Route là nền tảng cho việc xây dựng giao diện người dùng có thể mở rộng và nhất quán. Việc áp dụng mẫu này nên được coi là một tiêu chuẩn bắt buộc cho bất kỳ ứng dụng React quy mô nào.

1.  **Khái niệm:** Mẫu này sử dụng một `<Route>` cha hoạt động như một layout chung, bao bọc các route con. Mọi thành phần được render bởi route cha này (như `NavBar`) sẽ xuất hiện trên tất cả các trang con.
2.  **Vai trò của** `**<Outlet>**`**:** Bên trong thành phần layout, chúng ta đặt thành phần `<Outlet>`. `<Outlet>` hoạt động như một "placeholder", đánh dấu vị trí nơi React Router sẽ render thành phần của route con khớp với URL hiện tại.
3.  **Lợi ích kiến trúc:** Mẫu này thực thi nguyên tắc DRY, tập trung logic bố cục vào một nơi duy nhất và đảm bảo tính nhất quán tuyệt đối trên toàn bộ ứng dụng.

**Lưu ý của Kiến trúc sư:** Mặc dù về mặt kỹ thuật, có thể bỏ qua thuộc tính `path` trên route cha để tạo layout, thực tiễn kiến trúc ưu việt là luôn khai báo `path="/"`. Điều này giúp mã nguồn trở nên rõ ràng, tường minh và giảm thiểu sự mơ hồ cho các nhà phát triển sau này khi bảo trì hệ thống.

    // Ví dụ về cấu trúc Layout Route
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Các route con sẽ được render bên trong <Outlet> của Layout */}
        <Route index element={<Home />} />
        <Route path="missions" element={<Missions />} />
      </Route>
    </Routes>

### 2.2. Định tuyến lồng nhau và Định tuyến chỉ mục (Index Route)

#

Xây dựng trên nền tảng của Layout Route, định tuyến lồng nhau cho phép chúng ta tạo ra các cấu trúc URL phân cấp và có ý nghĩa.

1.  **Định tuyến lồng nhau (Nested Routes):** Các `<Route>` con được lồng bên trong một `<Route>` cha. Đường dẫn của chúng là tương đối so với đường dẫn của cha. Ví dụ, một route con có `path="missions"` bên trong route cha `path="/"` sẽ khớp với URL `/missions`.
2.  **Định tuyến chỉ mục (Index Route):** Một route con với thuộc tính `index` chỉ định thành phần mặc định sẽ được render bên trong `<Outlet>` của cha khi URL khớp _chính xác_ với đường dẫn của cha. Trong ví dụ trên, khi người dùng truy cập `/`, thành phần `Home` sẽ được render.

### 2.3. Định tuyến động (Dynamic Routes) với `useParams`

#

Đây là kỹ thuật thiết yếu để hiển thị các trang chi tiết, nơi nội dung phụ thuộc vào một tham số trong URL.

1.  **Khai báo Dynamic Segments:** Cú pháp dấu hai chấm (ví dụ: `path="/missions/:id"`) được sử dụng để định nghĩa một "phân đoạn động" (dynamic segment) trong đường dẫn. Bất kỳ giá trị nào ở vị trí này trong URL sẽ được coi là một tham số.
2.  **Truy cập tham số với** `**useParams**`**:** Bên trong thành phần được render, hook `useParams` trích xuất các giá trị từ các phân đoạn động của URL. Ví dụ: `const { id } = useParams()` sẽ lấy giá trị `id` từ URL.
3.  **Thực tiễn hiệu năng:** Khi sử dụng `id` đã trích xuất để tìm kiếm hoặc tính toán dữ liệu, một phương pháp hay là bọc logic đó trong hook `useMemo`. Điều này giúp ghi nhớ (memoize) kết quả và ngăn chặn các phép tính toán không cần thiết trên các lần render lại của thành phần, một sự tối ưu hóa hiệu năng quan trọng trong các thành phần có trạng thái phức tạp.

### 2.4. Xử lý trang không tìm thấy (404 Route)

#

Một trang 404 được xử lý tốt là một phần không thể thiếu của trải nghiệm người dùng chuyên nghiệp.

1.  **Sử dụng Wildcard:** React Router cung cấp một đường dẫn đặc biệt `path="*"` để tạo ra một tuyến đường bắt-tất-cả (catch-all).
2.  **Thứ tự là tối quan trọng:** Tuyến đường này **phải được đặt ở vị trí cuối cùng** bên trong `<Routes>`. Do cơ chế "khớp nhất", nó sẽ chỉ được kích hoạt khi không có tuyến đường nào khác được khai báo trước đó khớp với URL.

Với kiến trúc định tuyến đã được thiết lập, bước tiếp theo là làm chủ các công cụ mà React Router cung cấp để điều hướng giữa các trang này một cách hiệu quả.

\--------------------------------------------------------------------------------

## 3\. API Điều hướng: Các Hook và Thành phần chính

#

React Router cung cấp một bộ API mạnh mẽ để quản lý việc điều hướng, cả thông qua tương tác của người dùng và một cách lập trình. Việc lựa chọn đúng công cụ cho từng kịch bản cụ thể là chìa khóa để tạo ra các luồng người dùng mượt mà và logic.

### 3.1. Thành phần `<NavLink>` để Điều hướng chủ động

#

Trong khi `<Link>` là thành phần cơ bản, `<NavLink>` là một biến thể chuyên dụng cho các menu điều hướng, cung cấp nhận thức về trạng thái "active".

1.  **Tính năng** `**active**` **class:** Tính năng cốt lõi của `<NavLink>` là tự động thêm class CSS `active` vào phần tử được render khi nó khớp với URL hiện tại. Điều này cho phép tạo kiểu một cách dễ dàng cho liên kết đang hoạt động.
2.  **Thuộc tính** `**end**`**:** Thuộc tính `end` là bắt buộc đối với các liên kết điều hướng trỏ đến route gốc hoặc các route cha. Nó đảm bảo rằng `NavLink` chỉ nhận class `active` khi URL khớp _chính xác_ với đường dẫn của nó, chứ không phải khi một trong các route con của nó đang hoạt động. Nếu không có `end` trên link `Home`, nó sẽ luôn được đánh dấu là active khi người dùng ở trang `/missions`.

### 3.2. Hook `useNavigate` để Điều hướng lập trình

#

`useNavigate` là công cụ chính để tách biệt logic nghiệp vụ khỏi hành vi điều hướng. Nó cho phép điều hướng một cách lập trình, rất lý tưởng cho các tình huống không bắt nguồn từ một cú nhấp chuột trực tiếp vào liên kết.

1.  **Khởi tạo:** Gọi hook `const navigate = useNavigate()` để lấy hàm `navigate`.
2.  **Các trường hợp sử dụng kiến trúc:**
    - **Sau khi hoàn tất một tác vụ:** Một ví dụ điển hình là trong hàm `saveMission`, sau khi logic lưu dữ liệu hoàn tất, `navigate('/missions')` được gọi để đưa người dùng trở lại danh sách, cung cấp phản hồi ngay lập tức cho hành động của họ.
    - **Tương tác giao diện phức tạp:** Khi người dùng nhấp vào một hàng trong bảng dữ liệu, hàm `navigateToMission` có thể gọi `navigate(\`/missions/${id}\`)\` để chuyển đến trang chi tiết. Điều này giữ cho các thành phần hiển thị (như hàng của bảng) không cần phải biết về cấu trúc URL.

### 3.3. Hook `useLocation` để nhận biết ngữ cảnh

#

Hook `useLocation` cung cấp quyền truy cập vào đối tượng vị trí hiện tại, cho phép các thành phần tạo ra giao diện người dùng đáp ứng theo ngữ cảnh.

1.  **Cấu trúc dữ liệu trả về:** `useLocation` trả về một đối tượng chứa thông tin như `pathname` (đường dẫn URL).
2.  **Ứng dụng thực tế:** Đây là một mẫu mạnh mẽ để tạo ra các thành phần thích ứng. Ví dụ, thành phần `NavBar` có thể sử dụng `pathname` để thay đổi chủ đề (theme) của nó (`light` trên trang chủ `/`, `dark` trên các trang khác). Điều này cho phép tạo ra các trải nghiệm giao diện người dùng tinh tế và phù hợp với ngữ cảnh mà không cần truyền props phức tạp.

Bằng cách kết hợp các mẫu kiến trúc định tuyến với các API điều hướng này một cách có chủ đích, các nhà phát triển có thể xây dựng các luồng người dùng phức tạp, mạnh mẽ và có hệ thống, tạo ra nền tảng vững chắc cho các ứng dụng React hiện đại.

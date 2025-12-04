# Hiểu về React Router: Hướng dẫn dành cho Người mới bắt đầu

### Giới thiệu

Chào mừng bạn đến với thế giới điều hướng trong React! Nếu bạn từng thắc mắc làm thế nào các ứng dụng web hiện đại có thể chuyển đổi giữa các trang "khác nhau" một cách mượt mà mà không cần tải lại toàn bộ, thì bài viết này chính là dành cho bạn. Chúng ta sẽ cùng nhau khám phá những khái niệm cơ bản về React Router, công cụ giúp bạn xây dựng trải nghiệm người dùng nhanh chóng và liền mạch.

### 1\. Phép ẩn dụ: React Router hoạt động như thế nào?

Hãy tưởng tượng ứng dụng React của bạn là một tòa nhà văn phòng lớn và hiện đại. Khi một người dùng (vị khách) đến, họ muốn tìm đến một phòng ban cụ thể.

- **URL** giống như địa chỉ phòng ban mà vị khách muốn đến (ví dụ: `/phong-kinh-doanh` hoặc `/lien-he`).
- **React Router** chính là người lễ tân thông thái của tòa nhà. Người lễ tân này nhìn vào địa chỉ mà khách cung cấp, tra cứu trong danh bạ và chỉ dẫn họ đến đúng tầng, đúng phòng.
- **Component (Thành phần)** là phòng ban thực tế (ví dụ: trang "Kinh doanh" hoặc trang "Liên hệ") được hiển thị cho khách khi họ đến nơi.

Điều kỳ diệu ở đây là nhờ có "người lễ tân" React Router, vị khách được đưa đến đúng nơi họ muốn mà không cần phải rời khỏi tòa nhà rồi quay trở lại (tức là không cần tải lại toàn bộ trang web). Mọi thứ diễn ra nhanh chóng ngay bên trong tòa nhà.

Để người lễ tân này có thể làm việc hiệu quả, chúng ta cần cung cấp cho họ một bản đồ của tòa nhà. Hãy cùng xem các thành phần chính tạo nên bản đồ đó.

### 2\. Các Thành phần Cốt lõi của React Router

React Router được xây dựng từ một vài khối xây dựng cơ bản, mỗi khối có một vai trò riêng.

#### 2.1. `<BrowserRouter>`: Người Quản lý Tòa nhà

Đây là thành phần đầu tiên và quan trọng nhất. Hãy coi `<BrowserRouter>` như "Người Quản lý Tòa nhà" hoặc "Hệ thống chỉ dẫn trung tâm". Nó phải bao bọc toàn bộ ứng dụng của bạn. Vai trò của nó là cung cấp "bối cảnh vị trí" cho tất cả các thành phần con, để chúng luôn biết được URL hiện tại là gì và có thể phản ứng tương ứng.

#### 2.2. `<Routes>`: Sơ đồ Tầng

Nếu `<BrowserRouter>` là người quản lý, thì `<Routes>` chính là sơ đồ các tầng hoặc cuốn danh bạ mà người lễ tân sử dụng. Đây là một thành phần chứa, bên trong đó bạn sẽ định nghĩa tất cả các tuyến đường (route) có thể có trong ứng dụng. Nhiệm vụ của nó rất đơn giản: xem xét URL hiện tại và chỉ hiển thị _một_ `<Route>` duy nhất phù hợp nhất.

#### 2.3. `<Route>`: Chỉ dẫn đến từng Phòng ban

Đây là chỉ dẫn cụ thể cho một trang. Mỗi thành phần `<Route>` giống như một dòng trong cuốn danh bạ, liên kết một địa chỉ URL với một phòng ban (Component) cụ thể. Nó có hai thuộc tính (props) quan trọng nhất:

| Thuộc tính | Mục đích                                                                 | Ví dụ đơn giản           |
| ---------- | ------------------------------------------------------------------------ | ------------------------ |
| `path`     | Xác định đường dẫn URL. Đây là "địa chỉ" mà Route sẽ lắng nghe.          | `path="/missions"`       |
| `element`  | Chỉ định Component (trang) nào sẽ được hiển thị khi URL khớp với `path`. | `element={<Missions />}` |

Khi kết hợp lại, chúng tạo thành một quy tắc rõ ràng:

    // Khi người dùng truy cập vào URL "/missions", hãy hiển thị component <Missions />
    <Route path="/missions" element={<Missions />} />

Ở đây, thuộc tính `path` khớp với địa chỉ `"/missions"`, và thuộc tính `element` chỉ định rằng component `<Missions />` chính là 'phòng ban' sẽ được hiển thị.

#### 2.4. `<Link>`: Cánh cửa Dịch chuyển

Vậy làm thế nào để người dùng di chuyển giữa các "phòng ban" (trang)? Đó là lúc `<Link>` phát huy tác dụng. Đây là cách của React Router để tạo ra các liên kết điều hướng. Lợi ích chính của nó là thay đổi URL và hiển thị component mới **mà không cần tải lại toàn bộ trang**.

Hãy so sánh nó với thẻ `<a>` truyền thống trong HTML:

- **Thẻ** `**<a>**`**:** Giống như đi ra khỏi tòa nhà và quay trở lại từ cổng chính. Nó gây ra một lần tải lại trang đầy đủ từ máy chủ, làm mất trạng thái hiện tại của ứng dụng.
- **Thành phần** `**<Link>**`**:** Giống như sử dụng một cánh cửa dịch chuyển nội bộ. Nó chỉ thay đổi những gì cần thiết, giúp quá trình chuyển trang diễn ra nhanh chóng, mượt mà và giữ nguyên trạng thái ứng dụng.

Ngoài ra, còn có `**<NavLink>**`, một phiên bản nâng cao của `<Link>`. Nó có thể tự động thêm một lớp CSS có tên là `active` vào chính nó khi URL hiện tại khớp với đường dẫn của nó, rất hữu ích để làm nổi bật liên kết đang hoạt động trong thanh điều hướng.

Bây giờ chúng ta đã biết về các bộ phận riêng lẻ, hãy xem cách lắp ráp chúng lại với nhau để xây dựng một hệ thống điều hướng hoàn chỉnh.

### 3\. Lắp ráp tất cả lại: Một Ví dụ Hoàn chỉnh

Hãy xem cách các thành phần này phối hợp với nhau trong một ứng dụng thực tế.

#### 3.1. Cấu trúc cơ bản

Đây là cách thiết lập một hệ thống định tuyến đơn giản:

    // Bọc toàn bộ ứng dụng của bạn trong BrowserRouter
    <BrowserRouter>
      <Routes>
        {/* Định nghĩa tất cả các tuyến đường có thể có ở đây */}
        <Route path="/" element={<Home />} />
        <Route path="missions" element={<Missions />} />

        {/* Tuyến đường bắt tất cả (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

**Lưu ý quan trọng:** Tuyến đường `path="*"` hoạt động như một "tấm lưới bắt tất cả". Nó phải được đặt cuối cùng trong danh sách. Bởi vì `Routes` khớp các đường dẫn theo thứ tự từ trên xuống dưới, nếu không có tuyến đường nào ở trên khớp với URL hiện tại, tuyến đường `*` cuối cùng này sẽ được chọn, giúp bạn hiển thị một trang "Không tìm thấy" (404) thân thiện.

#### 3.2. Bố cục Chung và các Tuyến đường Lồng nhau

Trong hầu hết các ứng dụng, bạn sẽ có những thành phần chung như thanh điều hướng (NavBar) hoặc chân trang (Footer) xuất hiện trên nhiều trang. Việc lặp lại mã này trong mọi component trang là không hiệu quả. React Router cung cấp một giải pháp thanh lịch bằng các tuyến đường lồng nhau.

1.  **Khái niệm:** Bạn có thể tạo một `<Route>` cha đóng vai trò là "bố cục" (layout) để nhóm các tuyến đường con. Bố cục này sẽ luôn được hiển thị, và nội dung của các trang con sẽ được hiển thị bên trong nó. Mặc dù bạn có thể tạo một tuyến đường bố cục bằng cách bỏ qua thuộc tính `path`, cách tiếp cận rõ ràng và ít gây nhầm lẫn hơn là sử dụng `path="/"`.
2.  **Giới thiệu** `**<Outlet />**`**:** Thành phần `<Outlet />` là một "vị trí giữ chỗ". Bạn đặt nó bên trong component Bố cục của mình, và nó nói với React Router rằng: "Đây là nơi để hiển thị component của tuyến đường con phù hợp."

Hãy xem ví dụ sau:

    // Trong file App.js
    <Routes>
      {/* Layout này áp dụng cho tất cả các tuyến đường con bắt đầu từ "/" */}
      <Route path="/" element={<Layout />}>
        {/* Thuộc tính "index" biến đây thành tuyến đường mặc định cho cha của nó ("/") */}
        <Route index element={<Home />} />
        <Route path="missions" element={<Missions />} />
        {/* Các trang khác có cùng layout sẽ được thêm vào đây */}
      </Route>
    </Routes>

Trong ví dụ này, component `Layout` (chứa `NavBar` và `<Outlet />`) sẽ luôn được hiển thị vì đường dẫn cha của nó là `/`.

- Thuộc tính `index` biến tuyến đường này thành tuyến đường mặc định cho cha của nó. Nó sẽ hiển thị khi URL của người dùng chính xác là `path` của tuyến đường cha (trong trường hợp này là `/`).
- Khi người dùng truy cập `/missions`, component `Missions` sẽ được hiển thị bên trong `<Outlet />`.

Mẫu này rất mạnh mẽ vì nó cho phép chúng ta thêm các trang mới mà không cần sao chép các thành phần dùng chung như `NavBar`, đồng thời đảm bảo một bố cục và phong cách nhất quán trên toàn bộ ứng dụng.

Với những khái niệm này, bạn đã có đủ công cụ để xây dựng luồng điều hướng cơ bản cho hầu hết các ứng dụng React.

### 4\. Tổng kết

React Router là một công cụ mạnh mẽ nhưng cũng rất dễ tiếp cận. Bằng cách hiểu rõ các thành phần cốt lõi, bạn có thể tạo ra các ứng dụng trang đơn (SPA) nhanh và chuyên nghiệp.

Hãy tóm tắt lại 3 ý tưởng chính mà chúng ta đã học:

1.  `**BrowserRouter**`**,** `**Routes**`**, và** `**Route**` làm việc cùng nhau như một hệ thống bản đồ, ánh xạ các địa chỉ URL đến các component React cụ thể của bạn.
2.  `**Link**` cho phép điều hướng tức thì, không cần tải lại trang, mang lại trải nghiệm người dùng mượt mà và liền mạch.
3.  Sử dụng **bố cục lồng nhau với** `**<Outlet />**` là một mẫu thiết kế mạnh mẽ để giữ cho giao diện người dùng của bạn nhất quán và tuân thủ nguyên tắc DRY (Don't Repeat Yourself), tránh lặp lại mã không cần thiết.

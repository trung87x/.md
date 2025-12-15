# Sách trắng: Chuẩn hóa Phát triển Web với Phương pháp BEM

## 1.0 Giới thiệu: Tái định nghĩa Khả năng Bảo trì và Mở rộng trong Phát triển Giao diện Người dùng

Trong lĩnh vực phát triển web hiện đại, việc quản lý các dự án CSS quy mô lớn đặt ra nhiều thách thức về mặt kiến trúc. Các nhóm phát triển thường xuyên phải đối mặt với một kiến trúc CSS dễ vỡ, dẫn đến các cuộc chiến về độ ưu tiên (specificity wars), nơi các bộ chọn (selector) xung đột và ghi đè lẫn nhau một cách không mong muốn. Sự phụ thuộc chặt chẽ giữa các thành phần giao diện khiến việc thay đổi một phần của hệ thống có thể gây ra những hiệu ứng gợn sóng khó lường, làm cho quá trình tái cấu trúc trở nên rủi ro và tốn kém. Những vấn đề này không chỉ làm chậm tiến độ mà còn làm tăng nợ kỹ thuật và làm xói mòn tính toàn vẹn của hệ thống thiết kế theo thời gian.

Để giải quyết những thách thức kiến trúc này, phương pháp luận BEM (Block, Element, Modifier - Khối, Phần tử, Biến thể) đã ra đời như một giải pháp dựa trên thành phần. BEM không chỉ là một quy ước đặt tên; nó là một chiến lược kiến trúc có cấu trúc để phân chia giao diện người dùng thành các khối độc lập, có thể tái sử dụng. Bằng cách áp đặt một cấu trúc và ngữ nghĩa rõ ràng, BEM giúp loại bỏ xung đột, giảm sự phụ thuộc và tạo ra một nền tảng vững chắc cho việc phát triển các sản phẩm kỹ thuật số dài hạn.

Mục đích của sách trắng này là cung cấp một phân tích toàn diện về các khái niệm cốt lõi, lợi ích chiến lược và quá trình phát triển của BEM. Tài liệu này được thiết kế dành cho các nhà phát triển giao diện người dùng, kiến trúc sư phần mềm và các nhà quản lý kỹ thuật đang tìm kiếm một phương pháp đã được kiểm chứng để chuẩn hóa quy trình phát triển, giảm nợ kỹ thuật và xây dựng các sản phẩm kỹ thuật số bền vững.

Trong các phần tiếp theo, chúng ta sẽ đi sâu vào các thành phần cấu tạo nên BEM, khám phá cách chúng kết hợp với nhau để tạo ra một hệ sinh thái phát triển mạnh mẽ và có khả năng mở rộng.

## 2.0 Các Khái niệm Cốt lõi của BEM: Nền tảng của Giao diện Module hóa

Sức mạnh của BEM nằm ở bộ từ vựng có cấu trúc của nó, bao gồm ba thực thể cốt lõi: Khối (Block), Phần tử (Element) và Biến thể (Modifier). Việc hiểu rõ vai trò và mối quan hệ của từng khái niệm này là yếu tố nền tảng để áp dụng thành công phương pháp luận BEM, giúp chuyển đổi các giao diện phức tạp thành một tập hợp các thành phần có tổ chức, dễ quản lý và có thể tái sử dụng.

### 2.1 Khối (Block): Các Thành phần Độc lập và Tái sử dụng

**Khối** là một thành phần trang độc lập về mặt logic và chức năng, có thể tái sử dụng. Một khối đóng gói hành vi (JavaScript), mẫu (template) và kiểu dáng (CSS) của riêng nó.

Các đặc điểm chính của một Khối bao gồm:

- **Tính độc lập:** Một khối không nên ảnh hưởng đến môi trường xung quanh nó. Điều này có nghĩa là không nên đặt các thuộc tính hình học bên ngoài (ví dụ: `margin`) hoặc định vị cho khối để đảm bảo nó có thể được di chuyển và tái sử dụng ở bất kỳ đâu trên trang hoặc trong các dự án khác nhau. Nguyên tắc này là một nền tảng kiến trúc, đảm bảo các thành phần thực sự di động và có thể tái sử dụng trong các bối cảnh khác nhau mà không gây ra tác dụng phụ.
- **Tên gọi theo mục đích:** Tên của khối phải mô tả mục đích của nó ("Nó là gì?") chứ không phải hình thức của nó ("Nó trông như thế nào?"). Ví dụ, sử dụng `menu` hoặc `search-form` thay vì `red-box` hoặc `big-text`.
- **Khả năng lồng ghép:** Các khối có thể được lồng vào bên trong các khối khác mà không có giới hạn về độ sâu, cho phép xây dựng các giao diện phức tạp từ các thành phần đơn giản hơn.

**Ví dụ mã HTML về một Khối:**

    <!-- Khối 'header' chứa các khối lồng nhau là 'logo' và 'search-form' -->
    <header class="header">
      <!-- Khối 'logo' được lồng vào -->
      <div class="logo"></div>
      <!-- Khối 'search-form' được lồng vào -->
      <form class="search-form"></form>
    </header>

### 2.2 Phần tử (Element): Các Thành phần Phụ thuộc Ngữ nghĩa

**Phần tử** là một bộ phận cấu thành của một khối và không thể được sử dụng riêng lẻ bên ngoài khối đó. Nó chỉ có ý nghĩa trong bối cảnh của khối cha chứa nó. Ví dụ, một mục trong menu (`menu__item`) chỉ tồn tại như một phần của khối menu.

Quy ước đặt tên cho phần tử là `block-name__element-name`, sử dụng hai dấu gạch dưới để phân tách tên khối và tên phần tử. Quy ước này tạo ra một không gian tên (namespace) rõ ràng cho các phần tử, đảm bảo chúng phụ thuộc duy nhất vào khối của mình và tránh xung đột với các lớp CSS khác trong dự án.

Một điểm quan trọng cần lưu ý là một phần tử luôn là một phần của khối, ngay cả khi nó được lồng sâu bên trong một phần tử khác trong cây DOM. Cấu trúc tên của phần tử vẫn giữ dạng phẳng (`block__elem`), không phản ánh cấu trúc lồng nhau (`block__elem1__elem2`). Quy tắc tưởng chừng đơn giản này là một quyết định kiến trúc quan trọng. Nó tách rời CSS khỏi cấu trúc DOM, cho phép các nhà phát triển tự do tái cấu trúc hoặc lồng ghép các phần tử HTML mà không gây ra hiệu ứng gãy đổ dây chuyền đặc trưng của CSS truyền thống, từ đó giảm đáng kể chi phí bảo trì.

**Ví dụ mã HTML về các Phần tử:**

    <!-- Khối 'search-form' -->
    <form class="search-form">
      <!-- Phần tử 'input' của khối 'search-form' -->
      <input class="search-form__input">
      <!-- Phần tử 'button' của khối 'search-form' -->
      <button class="search-form__button">Search</button>
    </form>

### 2.3 Biến thể (Modifier): Quản lý Trạng thái, Giao diện và Hành vi

**Biến thể** là một thực thể xác định giao diện (ví dụ: kích thước, chủ đề), trạng thái (ví dụ: `disabled`, `focused`) hoặc hành vi của một khối hoặc phần tử. Nó cho phép chúng ta thay đổi một thành phần mà không cần phải tạo ra một khối hoặc phần tử hoàn toàn mới.

Có hai loại Biến thể chính:

| Loại Biến thể | Mô tả và Ví dụ                                                                                                                                                                                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Boolean**   | Được sử dụng khi chỉ cần biết sự hiện diện hay vắng mặt của biến thể. Giá trị của nó được ngầm định là `true`. Ví dụ: `button_disabled` cho biết nút đang ở trạng thái bị vô hiệu hóa. <br> Quy ước đặt tên: `block_modifier` hoặc `block__elem_modifier`.                 |
| **Key-value** | Được sử dụng khi giá trị của biến thể là quan trọng. Ví dụ: `menu_theme_islands` áp dụng một chủ đề thiết kế cụ thể cho menu, hoặc `button_size_m` xác định kích thước trung bình cho nút. <br> Quy ước đặt tên: `block_modifier_value` hoặc `block__elem_modifier_value`. |

Một quy tắc quan trọng là một biến thể không thể được sử dụng một cách cô lập. Nó phải luôn đi kèm với lớp của khối hoặc phần tử mà nó sửa đổi. Điều này đảm bảo rằng các kiểu cơ bản được áp dụng trước, và biến thể chỉ ghi đè hoặc bổ sung các thuộc tính cần thiết.

**Ví dụ mã HTML về các Biến thể:**

    <!-- Khối 'button' với biến thể boolean 'disabled' -->
    <button class="button button_disabled">...</button>

    <!-- Khối 'popup' với biến thể key-value 'theme' có giá trị 'sun' -->
    <div class="popup popup_theme_sun">...</div>

Khi các khái niệm cốt lõi này được kết hợp, chúng tạo thành một hệ thống mạnh mẽ để xây dựng và quản lý các giao diện người dùng phức tạp một cách có hệ thống.

## 3.0 Vận hành Hệ sinh thái BEM: Từ Lý thuyết đến Thực tiễn

BEM không chỉ dừng lại ở một quy ước đặt tên; nó là một hệ sinh thái hoàn chỉnh bao gồm các kỹ thuật và nguyên tắc kiến trúc được thiết kế để quản lý các dự án phức tạp. Bằng cách tận dụng các khái niệm như Mixes, Cấp độ Tái định nghĩa, và một cấu trúc tệp có tổ chức, các nhóm phát triển có thể xây dựng các hệ thống giao diện linh hoạt, dễ tùy biến và được tối ưu hóa cao.

### 3.1 Mixes: Kết hợp Các Thực thể để Tăng cường Tính linh hoạt

**Mix** là một kỹ thuật cho phép sử dụng các thực thể BEM khác nhau trên cùng một nút DOM. Bằng cách liệt kê nhiều lớp BEM trong thuộc tính `class` của một phần tử HTML, chúng ta có thể kết hợp hành vi và kiểu dáng của chúng mà không cần sao chép mã.

Hai trường hợp sử dụng chính của Mixes bao gồm:

1.  **Kết hợp hành vi và kiểu dáng của nhiều thực thể:** Cho phép một thành phần kế thừa các đặc tính từ nhiều nguồn khác nhau.
2.  **Tạo ra các thành phần giao diện mới về mặt ngữ nghĩa:** Dựa trên các thành phần đã có để tạo ra các biến thể phức tạp hơn, chẳng hạn như tách biệt kiểu dáng nội tại của một khối khỏi hình học bên ngoài của nó.

**Ví dụ về Mix để định vị:** Trong ví dụ dưới đây, khối `search-form` là một thành phần độc lập. Để đặt nó vào bên trong khối `header`, chúng ta kết hợp (mix) nó với một phần tử của khối `header` là `header__search-form`. Phần tử này sẽ chứa các quy tắc CSS để định vị cho biểu mẫu tìm kiếm trong ngữ cảnh của header. Kỹ thuật này là sự thực thi trong thực tế của nguyên tắc 'tính độc lập của khối'. Khối `search-form` vẫn giữ được sự thuần túy và di động, trong khi các thuộc tính hình học theo ngữ cảnh của nó được quản lý hoàn toàn bởi khối cha (`header`), qua đó loại bỏ các tác dụng phụ.

    <!-- Khối 'header' -->
    <div class="header">
      <!-- Khối 'search-form' được mix với phần tử 'header__search-form' -->
      <div class="search-form header__search-form">
        <!-- Nội dung của search-form -->
      </div>
    </div>

### 3.2 Cấp độ Tái định nghĩa (Redefinition Levels): Kiến trúc Phân lớp cho Tùy biến

**Cấp độ Tái định nghĩa** là một khái niệm kiến trúc mạnh mẽ trong BEM, cho phép tổ chức mã nguồn thành các lớp (layers) riêng biệt. Mỗi cấp độ là một tập hợp các thực thể BEM có thể mở rộng hoặc ghi đè các triển khai từ các cấp độ khác.

Các ứng dụng chiến lược của Cấp độ Tái định nghĩa bao gồm:

- **Phân chia dự án theo nền tảng:** Có thể tạo các cấp độ riêng cho các nền tảng khác nhau, chẳng hạn như `common.blocks` (mã chung), `desktop.blocks` (tùy chỉnh cho máy tính để bàn) và `mobile.blocks` (tùy chỉnh cho di động).
- **Cập nhật các thư viện khối một cách an toàn:** Một thư viện của bên thứ ba có thể được đưa vào dự án như một cấp độ riêng. Các tùy chỉnh dành riêng cho dự án có thể được thực hiện trên một cấp độ cao hơn, giúp việc cập nhật thư viện trở nên an toàn.
- **Tạo các chủ đề thiết kế (themes) khác nhau:** Mỗi chủ đề có thể được triển khai như một cấp độ tái định nghĩa riêng biệt.

Về mặt kiến trúc, Cấp độ Tái định nghĩa biến đổi dự án từ một thực thể nguyên khối thành một hệ thống có thể kết hợp (composable). Điều này cho phép tùy biến một cách chiến lược, không phá hủy và tạo ra sự tách biệt rõ ràng về mối quan tâm (separation of concerns) giữa các thư viện cốt lõi, mã dành riêng cho nền tảng và các thử nghiệm tạm thời.

### 3.3 Cấu trúc Tệp và Quy trình Xây dựng (Build Process): Tự động hóa và Tối ưu hóa

Triết lý cấu trúc tệp của BEM rất đơn giản nhưng hiệu quả: các tệp được nhóm theo ý nghĩa (khối) chứ không phải theo loại (công nghệ). Mỗi khối, cùng với các phần tử và biến thể của nó, được đặt trong thư mục riêng, chứa tất cả các tệp công nghệ liên quan.

**Ví dụ cấu trúc thư mục cho khối** `**button**`**:**

    button/
    ├── button.css
    └── button.js

Cấu trúc này có thể được mở rộng với các thư mục con cho các phần tử và biến thể khi độ phức tạp tăng lên.

Hệ sinh thái BEM phụ thuộc rất nhiều vào một **Quy trình Xây dựng** (Build Process) tự động. Nhiệm vụ của quy trình này là thu thập các tệp nguồn từ các cấp độ tái định nghĩa khác nhau và kết hợp chúng thành các tệp gói (bundle) cuối cùng (ví dụ: `project.css`, `project.js`).

Khái niệm **Khai báo** (Declarations) là câu trả lời của BEM cho việc tối ưu hóa hiệu suất. Bằng cách tạo ra một danh sách tường minh các thành phần cần thiết cho một trang cụ thể, quy trình xây dựng có thể lắp ráp một cách thông minh một gói (bundle) CSS và JavaScript tối thiểu, đảm bảo người dùng chỉ tải xuống mã cần thiết cho giao diện họ đang tương tác. Điều này làm giảm đáng kể dung lượng trang và cải thiện thời gian tải trong các ứng dụng phức tạp.

Hệ sinh thái này, khi được vận hành một cách hiệu quả, sẽ mang lại những lợi ích chiến lược cụ thể, giúp các nhóm phát triển xây dựng sản phẩm nhanh hơn và đáng tin cậy hơn.

## 4.0 Lợi ích Chiến lược của việc Áp dụng BEM

Việc áp dụng BEM không chỉ là một bài tập về tổ chức mã nguồn. Nó mang lại những lợi ích hữu hình, tác động trực tiếp đến hiệu quả của nhóm, khả năng bảo trì của dự án và khả năng mở rộng của hệ thống. Bằng cách áp đặt một cấu trúc nhất quán, BEM chuyển đổi một cơ sở mã CSS có khả năng trở nên hỗn loạn thành một hệ thống các thành phần có thể dự đoán và quản lý được.

### 4.1 Đơn giản hóa Việc Tái cấu trúc và Bảo trì Mã nguồn

Quy ước đặt tên nghiêm ngặt của BEM là một trong những lợi ích lớn nhất của nó. Bằng cách tạo ra các không gian tên duy nhất cho từng thành phần, BEM gần như loại bỏ hoàn toàn nguy cơ xung đột lớp CSS và giảm sự phụ thuộc không mong muốn giữa các thành phần. Điều này làm cho việc tái cấu trúc và bảo trì trở nên an toàn hơn rất nhiều.

Hãy xem xét một ví dụ so sánh đơn giản về một menu điều hướng.

**Trước BEM:** Các bộ chọn chung chung và lồng nhau tạo ra sự phụ thuộc chặt chẽ và có nguy cơ xung đột cao. Ở đây, các lớp toàn cục như `.item` và `.active` có thể vô tình định kiểu cho các thành phần khác không liên quan. Hơn nữa, mối quan hệ của chúng chỉ được ngụ ý bằng việc chúng cùng tồn tại trong HTML, dẫn đến sự mơ hồ. _Mã HTML:_

    <ul class="nav">
      <li class="item active"><a class="link">One</a></li>
      <li class="item"><a class="link">Two</a></li>
    </ul>

_Mã CSS:_

    .item {
      color: black;
    }
    .active {
      font-weight: bold;
      background: #ffc7c7;
    }

**Sau BEM:** Các bộ chọn độc lập và có phạm vi rõ ràng. `nav__item_active` chỉ ảnh hưởng đến các mục của khối `nav`, loại bỏ hoàn toàn sự mơ hồ và nguy cơ xung đột. _Mã HTML:_

    <ul class="nav">
      <li class="nav__item nav__item_active"><a class="nav__link">One</a></li>
      <li class="nav__item"><a class="nav__link">Two</a></li>
    </ul>

_Mã CSS:_

    .nav__item {
      color: black;
    }
    .nav__item_active {
      font-weight: bold;
      background: #ffc7c7;
    }

Kết quả là mã nguồn trở nên dễ dự đoán hơn. Các nhà phát triển có thể tự tin thay đổi kiểu dáng của một thành phần mà không lo sợ gây ra lỗi ở những nơi khác.

### 4.2 Thúc đẩy Mã nguồn Tự diễn giải (Self-Documenting Code)

Tên lớp BEM tạo ra một mối quan hệ rõ ràng và minh bạch giữa cấu trúc HTML và các quy tắc CSS. Chỉ cần đọc tên lớp, một nhà phát triển có thể ngay lập tức hiểu được vai trò của một phần tử (`form__field`), trạng thái của nó (`form_search`), và mối quan hệ của nó với các thành phần khác.

Mã nguồn trở thành tài liệu sống, tự giải thích cấu trúc và mục đích của nó. Điều này làm giảm đáng kể thời gian tìm hiểu cho các nhà phát triển mới tham gia dự án. Mặc dù tên lớp BEM có chủ ý dài dòng, sự đánh đổi này được thực hiện một cách có ý thức. Chi phí ban đầu cho các tên lớp dài hơn được đền đáp gấp nhiều lần bằng việc giảm thời gian gỡ lỗi và tăng tốc độ tiếp cận dự án của nhà phát triển, một chỉ số ROI quan trọng trong các hệ thống quy mô lớn.

### 4.3 Tăng cường Khả năng Tái sử dụng và Tính Độc lập của Thành phần

Nguyên tắc cốt lõi của BEM là tạo ra các khối độc lập. Không gian tên do tên khối cung cấp hoạt động như một lớp bảo vệ, ngăn chặn các kiểu dáng từ bên ngoài ảnh hưởng đến thành phần và ngược lại. Các khối được thiết kế để không có kiến thức về môi trường xung quanh, giúp chúng trở nên thực sự "di động".

Một khối `button` hoặc `search-form` được xây dựng theo nguyên tắc BEM có thể được di chuyển từ thanh bên sang phần chân trang, hoặc thậm chí được tái sử dụng trong một dự án hoàn toàn khác mà không cần thay đổi bất kỳ mã CSS nào của nó. Mọi tùy chỉnh về vị trí được xử lý thông qua các kỹ thuật như Mixes, đảm bảo khối gốc vẫn giữ được tính toàn vẹn và độc lập.

Sự ra đời của những lợi ích này không phải là ngẫu nhiên, mà là kết quả của một quá trình phát triển và sàng lọc qua nhiều năm đối mặt với những thách thức kỹ thuật thực tế.

## 5.0 Lịch sử và Sự phát triển của BEM: Từ Yandex đến Nguồn mở Toàn cầu

BEM không phải là một lý thuyết trừu tượng được tạo ra trong môi trường học thuật. Nó là một phương pháp luận được hình thành từ những thách thức thực tế trong việc xây dựng và bảo trì các sản phẩm web quy mô lớn tại Yandex. Lịch sử của BEM là một câu chuyện về sự leo thang của độ phức tạp đòi hỏi một giải pháp kiến trúc mạnh mẽ hơn.

Quá trình phát triển của BEM có thể được tóm tắt qua các mốc thời gian quan trọng sau:

- **2005:** Nguồn gốc của BEM bắt đầu tại Yandex với các dự án bao gồm nhiều trang HTML tĩnh. Các quy ước ban đầu còn sơ khai, chủ yếu dựa vào ID và các lớp chung, nhanh chóng bộc lộ những hạn chế.
- **2006:** Khi các dự án lớn như Yandex.Music trở nên không thể quản lý được, với việc "thay đổi trên một trang ảnh hưởng đến các trang khác", nhóm phát triển đã giới thiệu các khái niệm ban đầu về "khối" (block) và "phần tử" (element) như một cách để đóng gói và cô lập các thành phần giao diện.
- **2009:** Một khám phá quan trọng đã định hình lại triết lý của BEM: "hóa ra mọi thứ đều bị chậm lại bởi các bộ chọn CSS". Phản ứng với vấn đề hiệu suất này, Yandex đã chuyển sang các "khối độc lập tuyệt đối" và các quy tắc bộ chọn chỉ dựa trên lớp nghiêm ngặt. Cùng năm đó, phiên bản Lego 2.0, một framework nội bộ, được phát hành, đánh dấu sự ra đời chính thức của cấu trúc BEM như chúng ta biết ngày nay: **Block**, **Element**, và **Modifier**.
- **2010:** Nhận thấy giá trị của phương pháp luận này, Yandex đã đưa BEM ra cộng đồng nguồn mở, phát hành các công cụ hỗ trợ và giới thiệu các khái niệm kiến trúc nâng cao như **Cấp độ Tái định nghĩa** (Redefinition Levels), đưa BEM từ một quy ước đặt tên trở thành một hệ sinh thái phát triển toàn diện.

Từ những khởi đầu khiêm tốn đó, BEM đã phát triển và được cộng đồng nhà phát triển toàn cầu đón nhận, trở thành một trong những phương pháp luận hàng đầu để xây dựng các hệ thống giao diện người dùng có tổ chức, dễ bảo trì và có khả năng mở rộng.

## 6.0 Kết luận: Xây dựng Giao diện Bền vững với BEM

Phương pháp BEM cung cấp một đề xuất giá trị cốt lõi và rõ ràng: một chiến lược kiến trúc có hệ thống, dựa trên thành phần để phát triển giao diện người dùng, giúp tăng cường đáng kể khả năng bảo trì, khả năng mở rộng và khả năng tái sử dụng. Bằng cách chia nhỏ giao diện thành các khối độc lập, các phần tử phụ thuộc và các biến thể có thể dự đoán, BEM giải quyết được những thách thức cố hữu của CSS quy mô lớn, từ xung đột về độ ưu tiên đến sự phụ thuộc chặt chẽ.

Điều quan trọng cần nhấn mạnh là BEM vượt xa một quy ước đặt tên đơn thuần. Nó là một phương pháp luận toàn diện, được hỗ trợ bởi một hệ sinh thái các khái niệm kiến trúc như Mixes và Cấp độ Tái định nghĩa, cùng với các quy trình xây dựng tự động. Hệ sinh thái này trao quyền cho các nhóm phát triển để làm việc hiệu quả hơn, giảm nợ kỹ thuật và tự tin thực hiện các thay đổi phức tạp mà không sợ phá vỡ hệ thống.

Đối với các nhóm phát triển web hiện đại đang tìm cách xây dựng các hệ thống giao diện mạnh mẽ, linh hoạt và bền vững, BEM vẫn là một công cụ phù hợp và có giá trị to lớn. Việc áp dụng các nguyên tắc của nó không chỉ giúp tạo ra mã nguồn sạch hơn mà còn thúc đẩy một tư duy có cấu trúc về thiết kế giao diện, đặt nền móng cho sự thành công lâu dài của bất kỳ dự án kỹ thuật số nào.

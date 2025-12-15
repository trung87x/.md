# Câu Chuyện về BEM: Từ Hỗn Loạn đến Hài Hòa tại Yandex

### Giới thiệu: Tại sao lịch sử lại quan trọng?

Chào mừng bạn đến với câu chuyện về BEM. Có thể bạn đã nghe nói BEM chỉ là một quy ước đặt tên CSS, một bộ quy tắc nghiêm ngặt về dấu gạch dưới và gạch ngang. Nhưng sự thật còn sâu sắc hơn thế nhiều. BEM không phải là một lý thuyết được phát minh trong phòng thí nghiệm; nó là một phương pháp luận được tôi luyện trong "lò lửa" của những dự án web quy mô lớn nhất tại Yandex. Nó được sinh ra từ nhu cầu giải quyết các vấn đề thực tế: sự hỗn loạn của mã nguồn, những xung đột không lường trước, và sự khó khăn trong việc bảo trì và tái sử dụng code.

Việc hiểu được hành trình phát triển của BEM sẽ giúp bạn nắm bắt được cái "tại sao" đằng sau các quy tắc của nó, chứ không chỉ đơn thuần là "cái gì". Đây là câu chuyện về một hành trình không ngừng nghỉ nhằm biến những quy ước ngầm định thành các quy tắc rõ ràng, có thể thực thi, chuyển đổi từ sự hỗn loạn đến một hệ thống hài hòa và có thể mở rộng.

### 1\. Bối Cảnh Hỗn Loạn (Giai đoạn 2005)

Vào năm 2005, việc phát triển frontend tại Yandex là một cuộc chiến liên miên với sự thiếu hiệu quả và mã nguồn dễ vỡ. Các nhà phát triển phải vật lộn với một hệ thống mà mỗi thay đổi đều tiềm ẩn rủi ro, tạo ra một nỗi sợ hãi vô hình khi chỉnh sửa code. Sự hỗn loạn này bắt nguồn từ những vấn đề cốt lõi sau:

- **Các trang HTML tĩnh và XSL:** Các dự án thường bắt đầu với HTML tĩnh, sau đó được chuyển đổi thủ công thành template XSL. Bất kỳ thay đổi nào cũng phải được đồng bộ hóa bằng tay, một quy trình tốn thời gian và đầy rẫy sai sót. Đây là một ví dụ điển hình của quy ước ngầm: "hãy nhớ cập nhật cả hai nơi".
- **CSS và JavaScript toàn cục:** Mỗi dự án có một tệp `project.css` và `project.js` duy nhất. Mọi quy tắc CSS đều nằm trong phạm vi toàn cục, biến chúng thành một "bãi mìn". Việc sửa đổi một thành phần có thể vô tình phá vỡ một thành phần khác ở một trang hoàn toàn không liên quan, gieo rắc sự sợ hãi và thiếu chắc chắn mỗi khi deploy.
- **Phụ thuộc vào ID và chuỗi selector dài:** Mã CSS lúc bấy giờ đầy rẫy những chuỗi selector dài và dễ gãy (`.result .albums .info`) và lạm dụng ID (`#foot div div`). Cấu trúc này tạo ra các quy tắc có độ ưu tiên (specificity) cao, khiến việc ghi đè trở thành một cuộc chiến, và làm cho mã nguồn phụ thuộc chặt chẽ vào cấu trúc DOM.
- **Cấu trúc mã không rõ ràng:** Sự thiếu vắng một cấu trúc chuẩn hóa được thể hiện qua việc phải dùng comment (`/* Content container (begin) */`) để phân tách các khối logic trong CSS. Đây là một nỗ lực đáng khen ngợi để tạo ra trật tự, nhưng nó hoàn toàn phụ thuộc vào kỷ luật cá nhân thay vì một hệ thống có thể thực thi.

Từ trong mớ hỗn độn này, nỗi đau về một hệ thống mong manh và khó đoán định đã trở nên quá lớn, buộc Yandex phải tìm kiếm một phương pháp tiếp cận có cấu trúc hơn, một con đường dẫn đến sự an toàn và cô lập.

### 2\. Những Tia Sáng Đầu Tiên: Sự ra đời của "Block" và "Element" (Giai đoạn 2006)

Khi các dự án quy mô lớn như Yandex.Music ra đời với hàng chục trang, những yếu điểm của phương pháp cũ đã bộc lộ rõ rệt. Vấn đề cốt lõi đã được xác định một cách đau đớn: **"Bất kỳ thay đổi nào đối với mã của một trang đều ảnh hưởng đến mã của các trang khác."** Đây chính là lúc cần một sự thay đổi mang tính nền tảng.

Giải pháp đầu tiên cho sự hỗn loạn này chính là khái niệm **"Block" (Khối)**. Một Block được định nghĩa là một phần của trang có ý nghĩa riêng, một thành phần độc lập có thể được tái sử dụng. Đây là bước đi có chủ đích đầu tiên hướng tới sự an toàn và cô lập, tạo ra những "hòn đảo" code an toàn giữa đại dương CSS toàn cục.

Để biến ý tưởng này thành một hệ thống, một bộ quy tắc rõ ràng đã được giới thiệu thông qua hệ thống tiền tố. Đây là bước chuyển đổi đầu tiên từ quy ước ngầm sang quy tắc tường minh.

| Tiền tố | Ý nghĩa                                                            |
| ------- | ------------------------------------------------------------------ |
| `b-`    | **Block:** Một khối độc lập có thể được sử dụng ở bất kỳ đâu.      |
| `c-`    | **Control:** Một khối độc lập có đối tượng JavaScript đi kèm.      |
| `g-`    | **Global:** Các định nghĩa toàn cục, được sử dụng ở mức tối thiểu. |

Ngay sau đó, khái niệm **"Element" (Phần tử)** ra đời để giải quyết vấn đề bên trong các Block. Mục đích là để tạo ra các quy tắc style độc lập với thẻ HTML, đồng thời gán vai trò ngữ nghĩa cho các nút con. Một Element là một phần không thể tách rời của Block và không thể tồn tại bên ngoài Block cha của nó. Ví dụ, `logo` trở thành một Element bên trong Block `b-head`, với selector là `.b-head .logo`, đảm bảo quy tắc của nó chỉ áp dụng trong phạm vi của block đó.

### 3\. Thách Thức Mở Rộng và Khung Sườn Thống Nhất (Giai đoạn 2007-2008)

Khi Yandex phát triển lên tới hơn 100 dịch vụ, một vấn đề mới nổi lên: việc sao chép-dán các Block giữa các dự án trở thành một cơn ác mộng về bảo trì. Để giải quyết tình trạng này, Yandex đã xây dựng **"Lego"**, một framework nội bộ đóng vai trò như một thư viện các thành phần (Block) có thể tái sử dụng.

Tuy nhiên, giải pháp này lại dẫn đến một vấn đề khác. Các dự án sử dụng vô số lệnh `@import` trong CSS để lấy các Block từ thư viện Lego. Nút thắt cổ chai về hiệu suất này trở nên nghiêm trọng đến mức nó buộc Yandex phải tạo ra một công cụ build chuyên dụng (tiền thân của `borschik`) để tự động gộp và tối ưu hóa các tệp trước khi triển khai. Đây là một minh chứng nữa cho thấy sự tiến hóa của BEM luôn được thúc đẩy bởi những vấn đề thực tế.

Trong quá trình sử dụng các Block từ thư viện, một nhu cầu thiết yếu xuất hiện: làm thế nào để thể hiện các trạng thái hoặc biến thể khác nhau của cùng một Block (ví dụ: một nút có kích thước nhỏ, vừa, hoặc lớn)? Nếu không có giải pháp, các nhà phát triển sẽ buộc phải quay lại vấn đề "sao chép-dán" bằng cách tạo ra ba block riêng biệt (`b-button-small`, `b-button-large`), điều mà Lego được tạo ra để loại bỏ.

Câu trả lời chính là **"Modification" (Sự biến đổi/Biến thể)**. Thay vì tạo block mới, một class bổ sung được thêm vào để biểu thị một biến thể. Đây là hình thức sơ khai của Modifier, sử dụng một hậu tố (postfix) độc lập với ngữ cảnh. Ví dụ: `class="b-block b-block-postfix"`. Modifier chính là chìa khóa để làm cho một thành phần duy nhất trở nên thực sự linh hoạt và có thể tái sử dụng.

### 4\. Lego 2.0: BEM Chính Thức Ra Đời (Giai đoạn 2009)

Năm 2009 là một bước ngoặt, đánh dấu sự ra đời của phương pháp luận BEM (Block, Element, Modifier) hiện đại với Lego 2.0.

Sự thay đổi quan trọng và mang tính cách mạng nhất là việc chuyển đổi ưu tiên từ công nghệ sang **Block**. Thay vì tổ chức mã nguồn theo công nghệ (`css/`, `js/`), giờ đây mỗi Block có một thư mục riêng chứa tất cả các tệp công nghệ liên quan.

| Cấu trúc cũ (Ưu tiên công nghệ) | Cấu trúc mới (Ưu tiên Block)               |
| ------------------------------- | ------------------------------------------ |
| `css/block/b-head-logo.css`     | `common/block/b-head-logo/b-head-logo.css` |
| `xsl/block/b-head-logo.xsl`     | `common/block/b-head-logo/b-head-logo.xsl` |
| `js/...`                        | `common/block/b-head-logo/b-head-logo.js`  |

Đây không chỉ là một sự thay đổi về tổ chức; đó là một sự thay đổi về triết lý, buộc các nhà phát triển phải tư duy theo từng thành phần độc lập ngay từ cấp độ hệ thống tệp. Chính tại thời điểm này, BEM đã trở thành một phương pháp luận về thành phần thực sự, chứ không chỉ là một quy ước đặt tên CSS.

Cùng lúc đó, khi phát triển phiên bản mới của Yandex.Mail, đội ngũ đã đối mặt với một cuộc khủng hoảng hiệu suất: các selector CSS phức tạp và lồng nhau làm chậm đáng kể quá trình render của trình duyệt. Điều này đã thúc đẩy họ áp dụng triệt để khái niệm "Absolutely Independent Blocks (AIB)" (Các khối độc lập tuyệt đối). Đây chính là lời giải dứt khoát cho vấn đề "chuỗi selector dài, dễ gãy" đã tồn tại từ năm 2005. Quy ước đặt tên hiện đại `block-name__element-name` ra đời, làm cho các selector trở nên phẳng, đơn giản và cực kỳ nhanh chóng, giải quyết trực tiếp cuộc khủng hoảng hiệu suất.

Đến đây, ba trụ cột của BEM đã được định hình hoàn chỉnh:

- **Block:** Một thành phần **độc lập về mặt chức năng**, có thể tái sử dụng. Tên của nó trả lời câu hỏi "Nó là gì?" (ví dụ: `menu`), chứ không phải "Nó trông như thế nào?" (ví dụ: `red-box`).
- **Element:** Một **bộ phận cấu thành** của một Block, không có ý nghĩa khi đứng một mình. Tên của nó trả lời câu hỏi "Đây là bộ phận gì?" (ví dụ: `item`, `title`) và luôn được tiền tố bởi Block cha của nó (`menu__item`).
- **Modifier:** Định nghĩa **diện mạo, trạng thái hoặc hành vi** của một Block hoặc Element. Nó trả lời các câu hỏi "Nó trông như thế nào?" (`theme_islands`), "Trạng thái của nó là gì?" (`disabled`), hoặc "Nó hành xử ra sao?".

### 5\. Vươn Ra Thế Giới Mở và Hoàn Thiện Hệ Sinh Thái (Giai đoạn 2010 trở đi)

Vào năm 2010, BEM chính thức được mở mã nguồn trên GitHub, chia sẻ phương pháp luận đã được tôi luyện qua thực tế này với cộng đồng toàn cầu. Giai đoạn này cũng chứng kiến sự ra đời của các công cụ và khái niệm nâng cao, hoàn thiện hệ sinh thái BEM.

1.  **Redefinition Levels (Các cấp độ ghi đè):** Đây là câu trả lời xuất sắc của BEM cho một vấn đề kinh điển của framework: "Làm thế nào để sử dụng một thư viện dùng chung (`common.blocks`) nhưng tùy chỉnh nó cho một dự án cụ thể (`desktop.blocks`) mà không cần phải fork thư viện hay dùng các quy tắc `!important` bừa bãi?" Các cấp độ ghi đè cho phép các dự án tùy chỉnh Block một cách có hệ thống, tạo điều kiện cho việc xây dựng theme và các biến thể theo nền tảng một cách thanh lịch.
2.  **BEMHTML (Template Engine):** BEMHTML không chỉ là một công cụ tạo mẫu thông thường. Sức mạnh của nó đến từ việc làm việc với `BEMJSON` – một cấu trúc dữ liệu mô tả trang theo thuật ngữ BEM. Điều này cho phép cùng một định nghĩa thành phần có thể được render cả ở phía máy chủ (server-side) và máy khách (client-side), mang lại một lợi thế kiến trúc đáng kể về hiệu suất và tính nhất quán.
3.  **Hệ sinh thái Công cụ:** Để hỗ trợ quy trình làm việc mới, `bem-tools` đã được tạo ra. Đây là một bộ công cụ dòng lệnh giúp tự động hóa các tác vụ lặp đi lặp lại như tạo cấu trúc tệp cho Block mới, xây dựng dự án và quản lý các dependency.

### 6\. Tổng Kết: Những Bài Học Từ Lịch Sử

Câu chuyện về BEM là một lớp học bậc thầy về kỹ thuật phần mềm. Nó cho thấy cách mà sự chú ý không ngừng vào các vấn đề thực tế về quy mô, bảo trì và cộng tác có thể tạo ra một phương pháp luận vẫn còn phù hợp sâu sắc ngay cả trong thế giới hiện đại của các framework dựa trên thành phần.

1.  **Sự tiến hóa từ nhu cầu thực tế:** BEM không phải là một lý thuyết trừu tượng. Mỗi quy tắc, mỗi khái niệm của nó được sinh ra để giải quyết một vấn đề cụ thể mà đội ngũ Yandex phải đối mặt, từ CSS dễ vỡ đến hiệu suất render chậm chạp.
2.  **Tư duy theo thành phần:** Bài học cốt lõi từ BEM là sức mạnh của việc chia nhỏ giao diện người dùng thành các thành phần độc lập, có thể tái sử dụng (Block). Cách tiếp cận này là chìa khóa để quản lý sự phức tạp trong các hệ thống lớn.
3.  **Lời khuyên cho người học:** BEM là một phương pháp luận linh hoạt, không phải là một giáo điều cứng nhắc. Như chính những người tạo ra nó đã nói: _"Chúng tôi khuyên bạn nên sử dụng BEM trong các dự án của mình ở mức độ mang lại lợi ích lớn nhất."_ Bạn có thể bắt đầu chỉ với quy ước đặt tên, sau đó dần dần áp dụng cấu trúc tệp và các công cụ khác khi cần. Hãy bắt đầu từ những điều cơ bản, hiểu rõ cái "tại sao" đằng sau mỗi quy tắc, và áp dụng nó để làm cho mã nguồn của bạn trở nên rõ ràng, dễ bảo trì và dễ mở rộng hơn.

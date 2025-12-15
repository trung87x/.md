# Tìm hiểu BEM: Hướng dẫn đơn giản về Block, Element và Modifier

### 1\. Giới thiệu: BEM là gì và tại sao nó lại quan trọng?

Hãy tưởng tượng bạn đang xây dựng một thứ gì đó bằng các khối LEGO. Mỗi viên gạch LEGO là một **Khối (Block)**: nó độc lập, có một mục đích cụ thể và có thể được lắp ráp cùng với các viên gạch khác để tạo ra một cấu trúc lớn hơn. Bạn có thể tái sử dụng viên gạch đó ở bất kỳ đâu trong công trình của mình.

Đó chính là ý tưởng cốt lõi đằng sau BEM.

**BEM (Block, Element, Modifier)** là một phương pháp tiếp cận dựa trên component để phát triển web. Ý tưởng chính là chia giao diện người dùng (UI) thành các khối độc lập. Cụ thể, BEM giúp chúng ta giải quyết các vấn đề đau đầu như xung đột CSS (CSS conflicts), các quy tắc lồng nhau phức tạp, và việc tái cấu trúc code một cách thiếu an toàn. Phương pháp này giúp cho việc phát triển các giao diện phức tạp trở nên dễ dàng và nhanh chóng hơn, cho phép tái sử dụng code hiệu quả và giải quyết các vấn đề phổ biến thường gặp trong CSS.

### 2\. Khối (Block): Viên gạch nền tảng

**Khối (Block)** là một thành phần trang độc lập về mặt logic và chức năng, có thể tái sử dụng. Hãy nghĩ về các thành phần như `header` (đầu trang), `menu` (thanh điều hướng), hoặc `search` (ô tìm kiếm)—mỗi thành phần này là một Block.

Một Block có 3 đặc điểm quan trọng:

- **Cấu trúc lồng nhau (Nesting):** Các khối có thể được lồng vào bên trong các khối khác. Ví dụ, một khối `header` có thể chứa một khối `logo` và một khối `search-form`.
- **Tái sử dụng (Reusability):** Vì các khối độc lập, bạn có thể dễ dàng di chuyển chúng xung quanh một trang hoặc thậm chí sử dụng chúng trong các dự án khác nhau.
- **Tính độc lập (Independence):** Một khối không nên có các thuộc tính hình học bên ngoài (như `margin`) hoặc định vị. Điều này đảm bảo bạn có thể đặt một khối ở bất kỳ đâu trên trang mà không lo nó sẽ đẩy các thành phần khác đi một cách không mong muốn, giúp việc tái sử dụng trở nên an toàn và dễ đoán.

#### Cách đặt tên cho Block

Tên của Block phải mô tả mục đích của nó ("Nó là gì?") chứ không phải hình thức của nó ("Nó trông như thế nào?").

| Nên 👍                                         | Không nên 👎                                   |
| ---------------------------------------------- | ---------------------------------------------- |
| Tên mô tả mục đích: `error`, `menu`, `button`. | Tên mô tả hình thức: `red-text`, `big-button`. |

**Ví dụ về HTML:** Một Block được đại diện trong HTML bằng một thuộc tính `class`.

    <!-- Một Block đơn giản có tên là "card" -->
    <div class="card">
      ...
    </div>

Bây giờ chúng ta đã có viên gạch nền tảng, hãy xem xét các bộ phận tạo nên nó.

### 3\. Phần tử (Element): Các bộ phận bên trong Khối

**Phần tử (Element)** là một phần cấu thành của Block và không thể được sử dụng riêng biệt bên ngoài Block đó. Nếu một `menu` là Block, thì một `menu__item` (mục trong menu) chính là Element. Tương tự, nếu một chiếc máy tính là Block, thì các nút bấm và màn hình của nó là các Element.

#### Quy ước đặt tên

Cấu trúc tên đầy đủ của một Element là `block-name__element-name`. Tên của Element được ngăn cách với tên của Block bằng dấu gạch dưới kép (`__`).

    /* Quy tắc CSS cho một Element */
    .menu__item {
      color: blue;
    }

Một insight quan trọng về Element là cấu trúc tên của nó luôn **phẳng**. Bạn không bao giờ được tạo ra các Element của Element, ví dụ như `block__elem1__elem2`.

Tại sao lại như vậy? Bằng cách giữ cho danh sách các Element của một Block luôn phẳng, bạn có thể thay đổi cấu trúc lồng nhau của chúng trong HTML mà không cần phải viết lại các file CSS. Nhờ đó, bạn có thể tự do sắp xếp lại các phần tử bên trong khối trong file HTML của mình mà không cần phải viết lại một dòng CSS nào.

**Ví dụ về HTML:** Hãy mở rộng ví dụ về `card` bằng cách thêm các Element.

    <div class="card">
      <!-- Phần tử "title" bên trong Khối "card" -->
      <div class="card__title">
        Tiêu đề thẻ
      </div>
      <!-- Phần tử "image" bên trong Khối "card" -->
      <img class="card__image" src="image.png" />
    </div>

Tiếp theo, hãy tìm hiểu cách tạo ra các biến thể của các Block và Element này.

### 4\. Công cụ sửa đổi (Modifier): Các biến thể và trạng thái

**Công cụ sửa đổi (Modifier)** là một thực thể BEM xác định giao diện, trạng thái hoặc hành vi của một Block hoặc Element. Hãy nghĩ về chúng như những viên LEGO có cùng hình dạng nhưng khác màu sắc, hoặc một nút bấm có trạng thái "bị vô hiệu hóa".

Có hai loại Modifier chính:

| Loại Modifier | Mục đích                                                                        | Ví dụ (Tên đầy đủ)                         |
| ------------- | ------------------------------------------------------------------------------- | ------------------------------------------ |
| **Boolean**   | Chỉ quan tâm đến sự hiện diện hoặc vắng mặt. Giá trị của nó được coi là `true`. | `button_disabled`<br>`search-form_focused` |
| **Key-Value** | Quan trọng khi giá trị của modifier là một chuỗi cụ thể.                        | `menu_theme_islands`<br>`button_size_m`    |

#### Quy tắc quan trọng nhất khi sử dụng Modifier

Class của Modifier **phải luôn đi kèm** với class của Block hoặc Element mà nó sửa đổi. Modifier không thể thay thế class gốc, nó chỉ _bổ sung_ cho class đó.

- ✅ **Đúng:** `<div class="card card_featured">...</div>`
- ❌ **Sai:** `<div class="card_featured">...</div>`

**Ví dụ về HTML:** Hãy áp dụng các Modifier khác nhau cho `card` của chúng ta.

    <!-- Khối "card" với modifier "theme" có giá trị "dark" và modifier boolean "featured" -->
    <div class="card card_theme_dark card_featured">
      <div class="card__title">...</div>
      <img class="card__image" src="..." />
    </div>

Bây giờ, hãy kết hợp tất cả lại với nhau.

### 5\. Tổng hợp lại: Xây dựng một Component `search-form`

Hãy cùng nhau xây dựng một component `search-form` hoàn chỉnh để xem cách Block, Element và Modifier hoạt động cùng nhau.

#### Mã HTML

Trong ví dụ này:

- **Block:** `search-form`
- **Elements:** `search-form__input`, `search-form__button`
- **Modifiers:** `search-form_theme_islands` (Key-Value), `search-form__button_disabled` (Boolean)

  <!-- Khối `search-form` với một modifier -->
  <form class="search-form search-form_theme_islands">
      <!-- Phần tử `input` bên trong `search-form` -->
      <input class="search-form__input">
      <!-- Phần tử `button` bên trong `search-form`, với một modifier -->
      <button class="search-form__button search-form__button_disabled">
          Search
      </button>
  </form>

#### Mã CSS tương ứng

Đây là một ví dụ về cách bạn có thể viết CSS cho component này. Hãy chú ý cách mỗi quy tắc nhắm mục tiêu chính xác vào một thực thể BEM, tạo ra code độc lập và dễ đọc:

    /* Quy tắc chung cho Khối */
    .search-form {
        display: flex;
        border: 1px solid #ccc;
    }

    /* Quy tắc cho Modifier của Khối */
    .search-form_theme_islands {
        background-color: lightblue;
        border-radius: 4px;
    }

    /* Quy tắc cho Phần tử input */
    .search-form__input {
        flex-grow: 1;
        border: none;
        padding: 8px;
    }

    /* Quy tắc cho Phần tử button */
    .search-form__button {
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }

    /* Quy tắc cho Modifier của Phần tử button */
    .search-form__button_disabled {
        background-color: #999;
        cursor: not-allowed;
    }

Bạn có thể thấy rõ ràng sức mạnh của BEM ở đây: không có selector lồng nhau (`.search-form .search-form__input`), giúp giảm độ đặc hiệu (specificity) và tránh các cuộc chiến CSS. Mỗi class đều có mục đích riêng, làm cho việc gỡ lỗi và bảo trì trở nên đơn giản hơn rất nhiều.

### 6\. Kết luận: Sức mạnh thực sự của BEM

BEM là một quy ước đặt tên đơn giản nhưng mạnh mẽ, giúp bạn tổ chức code của mình thành các component độc lập và có thể tái sử dụng thông qua ba khái niệm cốt lõi: **Block**, **Element**, và **Modifier**.

Việc áp dụng BEM mang lại những lợi ích quan trọng sau:

- **Đơn giản hóa việc bảo trì và tái cấu trúc code:** Tên class duy nhất và rõ ràng giúp tránh xung đột style. Bạn có thể thay đổi hoặc di chuyển các khối mà không sợ làm hỏng các phần khác của trang web.
- **Tăng khả năng tái sử dụng code:** Các khối được thiết kế để hoàn toàn độc lập, có nghĩa là bạn có thể lấy một khối từ dự án này và sử dụng nó trong một dự án khác một cách dễ dàng.
- **Tạo ra code tự giải thích (Self-documenting):** Chỉ cần đọc tên class trong HTML (`card__title` hoặc `button_disabled`), bạn có thể ngay lập tức hiểu được cấu trúc và mục đích của các thành phần giao diện mà không cần phải tra cứu CSS.

Hãy thử áp dụng BEM vào dự án nhỏ tiếp theo của bạn. Bạn sẽ nhanh chóng nhận thấy cách nó mang lại sự rõ ràng, cấu trúc và khả năng mở rộng cho code front-end của bạn.

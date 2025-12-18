Theo phương pháp luận BEM, cách chuẩn để tạo các "kiểu" khác nhau cho cùng một Block (`search-form`) mà không cần sao chép mã hoặc tạo các Block mới là sử dụng **Bộ điều chỉnh (Modifier)**. Bạn có thể thêm không giới hạn số lượng Bộ điều chỉnh vào Block cùng một lúc.

Dưới đây là ví dụ về 3 kiểu khác nhau cho Block `search-form` (Block tìm kiếm), sử dụng các Bộ điều chỉnh khác nhau để định nghĩa diện mạo, trạng thái hoặc hành vi của chúng.

---

### 1\. Cấu trúc cơ sở (Base Structure)

Trước hết, chúng ta cần cấu trúc HTML cơ bản và CSS cơ bản cho Block `search-form` và các Element của nó (ví dụ: `__input` và `__button`).

#### HTML Cơ sở

    <form class="search-form">
        <input type="text" class="search-form__input" placeholder="Tìm kiếm...">
        <button type="submit" class="search-form__button">Tìm kiếm</button>
    </form>

#### CSS Cơ sở (search-form.css)

    /* Block: search-form */
    .search-form {
        display: flex;
        padding: 8px;
        border: 1px solid #ccc; /* Đường viền cơ bản */
        border-radius: 4px;
        /* KHÔNG đặt margin hoặc positioning ở đây để đảm bảo tính độc lập và tái sử dụng */
    }

    /* Element: search-form__input */
    .search-form__input {
        flex-grow: 1;
        border: none;
        padding: 4px 8px;
        font-size: 16px;
        outline: none;
    }

    /* Element: search-form__button */
    .search-form__button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 4px 12px;
        cursor: pointer;
        font-size: 14px;
        border-radius: 3px;
        margin-left: 8px;
    }

---

### 2\. Ba Kiểu Sử dụng Bộ điều chỉnh (Modifiers)

Chúng ta sẽ tạo ba kiểu khác nhau bằng cách thêm các Bộ điều chỉnh vào Block `search-form`.

#### Kiểu 1: Giao diện "Islands" (Key-Value Modifier: `_theme_islands`)

Kiểu này thay đổi màu sắc và hình dạng tổng thể (diện mạo) của Block, tương tự như việc áp dụng Bộ điều chỉnh `theme` với giá trị.

##### HTML (Kiểu 1)

    <!-- Cả class cơ bản VÀ class modifier đều được sử dụng -->
    <form class="search-form search-form_theme_islands">
        <input type="text" class="search-form__input" placeholder="Tìm kiếm theo chủ đề Islands...">
        <button type="submit" class="search-form__button">Tìm kiếm</button>
    </form>

##### CSS (search-form_theme_islands.css)

    /* Modifier: search-form_theme_islands */
    .search-form_theme_islands {
        background-color: #f0f0f0; /* Nền sáng */
        border: 1px solid #888;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Thêm bóng */
    }

    /* Redefine/Extend elements specific to this modifier if necessary */
    .search-form_theme_islands .search-form__button {
        background-color: #4CAF50; /* Màu nút khác */
        border-radius: 8px;
        font-weight: bold;
    }

#### Kiểu 2: Trạng thái "Thu nhỏ" (Key-Value Modifier: `_size_s`)

Kiểu này thay đổi kích thước (diện mạo) của Block thành kích thước nhỏ (`s`).

##### HTML (Kiểu 2)

    <form class="search-form search-form_size_s">
        <input type="text" class="search-form__input" placeholder="Tìm kiếm nhỏ...">
        <button type="submit" class="search-form__button">Tìm</button>
    </form>

##### CSS (search-form_size_s.css)

    /* Modifier: search-form_size_s */
    .search-form_size_s {
        padding: 4px; /* Giảm padding tổng thể */
        width: 200px; /* Giảm chiều rộng */
        font-size: 12px;
    }

    /* Redefine/Extend elements specific to this modifier */
    .search-form_size_s .search-form__input {
        padding: 2px 4px;
        font-size: 12px;
    }

    .search-form_size_s .search-form__button {
        padding: 2px 8px;
        font-size: 10px;
    }

#### Kiểu 3: Trạng thái "Vô hiệu hóa" (Boolean Modifier: `_disabled`)

Kiểu này thay đổi trạng thái của Block (hành vi và diện mạo) thành trạng thái không thể sử dụng,. Đối với Bộ điều chỉnh Boolean, giá trị không được bao gồm trong tên.

##### HTML (Kiểu 3)

    <!-- Boolean modifier chỉ cần tên modifier -->
    <form class="search-form search-form_disabled">
        <input type="text" class="search-form__input" placeholder="Đang vô hiệu hóa" disabled>
        <button type="submit" class="search-form__button" disabled>Tìm kiếm</button>
    </form>

##### CSS (search-form_disabled.css)

    /* Modifier: search-form_disabled */
    .search-form_disabled {
        opacity: 0.6; /* Làm mờ để thể hiện trạng thái vô hiệu hóa */
        pointer-events: none; /* Vô hiệu hóa tương tác chuột */
        border-color: #f44336;
    }

    /* Redefine/Extend elements specific to this modifier */
    .search-form_disabled .search-form__input {
        cursor: not-allowed;
        background-color: #eee;
    }

    .search-form_disabled .search-form__button {
        background-color: #9e9e9e;
        cursor: not-allowed;
    }

### Tổng kết

Bằng cách sử dụng các Bộ điều chỉnh (`_theme_islands`, `_size_s`, `_disabled`), chúng ta đã tạo ra ba kiểu `search-form` khác nhau mà không cần thay đổi code Block cơ sở, đảm bảo tính độc lập và khả năng tái sử dụng của Block. Mỗi Bộ điều chỉnh chỉ thay đổi phiên bản Block cụ thể mà nó được áp dụng.

| Kiểu       | Class Name                              | Loại Modifier              | Chức năng                    |
| ---------- | --------------------------------------- | -------------------------- | ---------------------------- |
| **Cơ sở**  | `search-form`                           | (Không có)                 | Giao diện mặc định.          |
| **Kiểu 1** | `search-form search-form_theme_islands` | Key-Value (`_theme_value`) | Thay đổi màu sắc/chủ đề.     |
| **Kiểu 2** | `search-form search-form_size_s`        | Key-Value (`_size_value`)  | Thay đổi kích thước.         |
| **Kiểu 3** | `search-form search-form_disabled`      | Boolean (`_modifier-name`) | Thay đổi trạng thái/hành vi. |

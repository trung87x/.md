Việc tổ chức code theo BEM trong React đạt được bằng cách chia nhỏ logic và kiểu dáng của Block, Element, và Modifier thành các tệp độc lập, sau đó nhóm chúng lại theo ý nghĩa của thực thể BEM, không phải theo loại công nghệ (Technology).

Dưới đây là ví dụ chi tiết cho Block `search-form` và ba kiểu (Modifiers) được yêu cầu, sử dụng cách tiếp cận cấu trúc tệp **Nested (Lồng nhau)** được khuyến nghị trong BEM.

### I. Cấu trúc Thư mục và Tên Tệp

Mỗi Block (`search-form`) tương ứng với một thư mục. Các Modifier và Element có thư mục con riêng, được đặt tên theo quy tắc BEM (dùng `_` cho Modifier, `__` cho Element).

    components/
    └── search-form/                                    # Block: search-form
        ├── search-form.jsx                             # Code React/JSX chính cho Block
        ├── search-form.css                             # CSS cơ sở cho .search-form

        ├── __input/                                    # Element: search-form__input
        │   └── search-form__input.css                  # CSS cho .search-form__input

        ├── __button/                                   # Element: search-form__button
        │   └── search-form__button.css                 # CSS cho .search-form__button

        ├── _theme/                                     # Thư mục cho Modifier Key-Value: theme
        │   └── search-form_theme_islands.css           # Kiểu 1: CSS cho .search-form_theme_islands

        ├── _size/                                      # Thư mục cho Modifier Key-Value: size
        │   └── search-form_size_s.css                  # Kiểu 2: CSS cho .search-form_size_s

        └── _disabled/                                  # Thư mục cho Modifier Boolean: disabled
            └── search-form_disabled.css                # Kiểu 3: CSS cho .search-form_disabled
            └── search-form_disabled.js                 # JS/Logic cho trạng thái disabled (Nếu cần)

### II. Code Triển khai CSS (Kiểu dáng)

Mỗi tệp CSS chỉ định kiểu dáng cho thực thể BEM tương ứng, sử dụng Class Selector đơn giản.

#### 1\. CSS Cơ sở

**File: `search-form.css`** (Block Cơ sở: `.search-form`)

    .search-form {
        display: flex;
        border: 2px solid #333; /* Đường viền cơ bản */
        border-radius: 4px;
        padding: 6px;
        background-color: #f7f7f7;
    }

**File: `__input/search-form__input.css`** (Element: `.search-form__input`)

    .search-form__input {
        flex-grow: 1;
        border: none;
        padding: 6px 10px;
        font-size: 16px;
        outline: none;
        background: transparent;
    }

**File: `__button/search-form__button.css`** (Element: `.search-form__button`)

    .search-form__button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 6px 15px;
        cursor: pointer;
        font-size: 14px;
        border-radius: 3px;
        margin-left: 8px;
        transition: background-color 0.2s;
    }

#### 2\. CSS Modifier (Các Kiểu)

**File: `_theme/search-form_theme_islands.css`** (Kiểu 1: Key-Value Modifier)

Modifier này thay đổi diện mạo (appearance) của Block.

    /* Modifier: search-form_theme_islands (Thay đổi nền và viền cho Block) */
    .search-form_theme_islands {
        border: 3px solid #00a89d; /* Viền màu ngọc lam */
        background-color: #f4fcfc;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    /* Thay đổi Element bên trong, sử dụng Nested Selector (Áp dụng cho trạng thái/chủ đề) */
    .search-form_theme_islands .search-form__button {
        background-color: #00a89d;
    }

    .search-form_theme_islands .search-form__input {
        color: #00a89d;
        font-weight: 500;
    }

**File: `_size/search-form_size_s.css`** (Kiểu 2: Key-Value Modifier)

Modifier này thay đổi kích thước (appearance) của Block.

    /* Modifier: search-form_size_s (Thay đổi kích thước Block) */
    .search-form_size_s {
        padding: 3px; /* Giảm padding tổng thể */
        width: 250px;
    }

    /* Thay đổi kích thước Element bên trong */
    .search-form_size_s .search-form__input {
        padding: 3px 6px;
        font-size: 12px;
    }

    .search-form_size_s .search-form__button {
        padding: 3px 10px;
        font-size: 10px;
    }

**File: `_disabled/search-form_disabled.css`** (Kiểu 3: Boolean Modifier)

Modifier này thay đổi trạng thái (state) của Block.

    /* Modifier: search-form_disabled (Thay đổi trạng thái) */
    .search-form_disabled {
        opacity: 0.7;
        cursor: not-allowed;
        pointer-events: none; /* Vô hiệu hóa tương tác chuột */
        border-color: #ccc;
        background-color: #eee;
    }

### III. Triển khai React/JSX (Hành vi)

Trong component React, chúng ta sử dụng `props` để xác định các Modifier nào sẽ được thêm vào `className`. Điều quan trọng là lớp cơ sở (`search-form`) luôn phải hiện diện.

**File: `search-form.jsx`**

    import React from 'react';

    // Giả định rằng bạn đã import tất cả các file CSS vào dự án (thông qua Webpack/Build tool)

    function SearchForm({ theme, size, disabled, placeholder }) {

        // 1. Khởi tạo Block Class Name với tên Block cơ sở
        let blockClasses = 'search-form';

        // 2. Thêm Modifier Key-Value cho Kiểu 1: theme
        if (theme === 'islands') {
            blockClasses += ' search-form_theme_islands';
        }

        // 3. Thêm Modifier Key-Value cho Kiểu 2: size
        if (size === 's') {
            blockClasses += ' search-form_size_s';
        }

        // 4. Thêm Modifier Boolean cho Kiểu 3: disabled
        if (disabled) {
            blockClasses += ' search-form_disabled';
        }

        // Sử dụng biến blockClasses để chứa tất cả các lớp (bao gồm Block cơ sở và Modifiers)
        return (
            <form className={blockClasses}>

                {/* Element Input: sử dụng tên lớp Element đầy đủ */}
                <input
                    type="text"
                    className="search-form__input"
                    placeholder={placeholder || "Tìm kiếm..."}
                    disabled={disabled} // Disabled prop cũng áp dụng cho HTML element
                />

                {/* Element Button: sử dụng tên lớp Element đầy đủ */}
                <button
                    type="submit"
                    className="search-form__button"
                    disabled={disabled}
                >
                    Tìm
                </button>
            </form>
        );
    }

    export default SearchForm;

### IV. Ví dụ Sử dụng (App.jsx)

Bạn có thể tạo ra ba kiểu khác nhau chỉ bằng cách truyền các `props` tương ứng, và Component sẽ tự động xây dựng chuỗi `className` BEM chính xác.

    import SearchForm from './components/search-form/search-form.jsx';

    function App() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>

                {/* Kiểu Cơ sở: Chỉ có Block Class */}
                <SearchForm
                    placeholder="Tìm kiếm mặc định"
                />

                {/* Kiểu 1: Key-Value Modifier (Theme) */}
                <SearchForm
                    placeholder="Tìm kiếm theo chủ đề Islands"
                    theme="islands"
                />

                {/* Kiểu 2: Key-Value Modifier (Size) */}
                <SearchForm
                    placeholder="Tìm kiếm nhỏ"
                    size="s"
                />

                {/* Kiểu 3: Boolean Modifier (Disabled) */}
                <SearchForm
                    placeholder="Đang vô hiệu hóa..."
                    disabled={true}
                />
            </div>
        );
    }

Bằng cách tách Block thành các tệp công nghệ độc lập theo cấu trúc BEM (`search-form.css`, `search-form_theme_islands.css`, v.v.), bạn đảm bảo rằng mọi thay đổi đối với một kiểu cụ thể (Modifier) không ảnh hưởng đến code cơ sở hoặc các kiểu khác, duy trì tính độc lập và khả năng tái sử dụng của component.

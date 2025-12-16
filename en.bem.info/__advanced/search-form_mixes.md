**FILE: search-form_mixes.md**

# Kỹ thuật Phối trộn (Mixes) trong BEM + React

Mixes là kỹ thuật BEM cho phép lưu trữ nhiều thực thể BEM (Blocks, Elements, Modifiers) trên cùng một nút DOM duy nhất. Mục đích chính của kỹ thuật này là để **kết hợp hành vi và kiểu dáng** của các thực thể khác nhau mà không dẫn đến việc sao chép mã,.

Trong React (sử dụng JSX), việc này được thực hiện bằng cách thêm nhiều tên class BEM vào thuộc tính `className`,.

## I. Cấu trúc Dự án (Pro-Level)

Theo nguyên tắc BEM, logic và kiểu dáng được chia nhỏ thành các tệp độc lập theo cấp độ và thư mục (Nested approach),. Mixes thường được dùng để định vị một Block độc lập (`search-form`) bên trong một Block cha (`header`) thông qua một Element của Block cha (`header__search-form`).

**Cấu trúc Tệp:**

    project/
    └── blocks/
        ├── header/
        │   ├── __search-form/
        │   │   └── header__search-form.css  // [CSS MIX] Định vị/Hình học bên ngoài
        │   └── header.css                 // CSS Block header cốt lõi
        └── search-form/                   // Block độc lập
            ├── __input/
            │   └── search-form__input.css // Element Input
            ├── __button/
            │   └── search-form__button.css// Element Button
            └── search-form.css          // [CSS CƠ SỞ] Diện mạo/Hành vi cốt lõi

## II. Triển khai CSS (Tách biệt Trách nhiệm)

Mixes được sử dụng vì Block cha phải chịu trách nhiệm thiết lập hình học bên ngoài và định vị cho Block con được lồng vào, đảm bảo Block con giữ được tính độc lập,,,.

### 1\. CSS Block Cốt lõi (search-form)

Block `search-form` giữ trách nhiệm về diện mạo nội bộ và không định vị chính nó.

    /* File: blocks/search-form/search-form.css */
    /* Trách nhiệm: Diện mạo nội bộ, không có margin hay position */
    .search-form {
        display: flex;
        border: 1px solid #ccc;
        padding: 4px;
        /* KHÔNG CÓ margin, top, left, position */
    }

### 2\. CSS Mix (header\_\_search-form)

Element `header__search-form` thuộc về Block `header` và chỉ tồn tại để định vị Block `search-form` bên trong ngữ cảnh `header`.

    /* File: blocks/header/__search-form/header__search-form.css */
    /* Trách nhiệm: Định vị và Hình học bên ngoài cho Block được mix */
    .header__search-form {
        /* Đặt Block search-form ở góc trên bên phải của header */
        margin: 0 20px;
        position: absolute;
        top: 10px;
        right: 10px;
    }

## III. Triển khai React/JSX (Áp dụng Mix)

Component `SearchForm` (Block con) nhận một prop chứa tên class của Element định vị (`header__search-form`) và áp dụng nó cùng với tên class cơ sở của chính nó.

### 1\. Component SearchForm (Block)

Component Block độc lập nhận prop `mix` (hoặc `className` bổ sung) và thêm nó vào class cơ sở (`search-form`).

    // File: blocks/search-form/SearchForm.jsx
    import React from 'react';
    // Import CSS files đã compile/bundling (search-form.css, etc.)

    const SearchForm = ({ mix = '' }) => {
      // Lớp CSS cuối cùng kết hợp Block cơ sở và Mix (các class cách nhau bằng space)
      const baseClass = 'search-form';
      const className = `${baseClass} ${mix}`.trim();

      return (
        <form className={className}>
          {/* Các Element vẫn sử dụng tên class BEM phẳng: block__element */}
          <input className="search-form__input" type="text" placeholder="Search..." />
          <button className="search-form__button">Go</button>
        </form>
      );
    };

    export default SearchForm;

### 2\. Component Header (Áp dụng Mix)

Component Block cha cung cấp class Mix để định vị Block con.

    // File: blocks/header/Header.jsx
    import React from 'react';
    import SearchForm from '../search-form/SearchForm';

    const Header = () => {
      return (
        <header className="header">
          {/*
            Mix: Đặt Block search-form vào vị trí do Element header__search-form định nghĩa.
            DOM Node result: <form class="search-form header__search-form">...
          */}
          <SearchForm
            mix="header__search-form"
          />
          {/* ... các Block/Element khác của header */}
        </header>
      );
    };

    export default Header;

## IV. Ví dụ Bổ sung: Định kiểu Nhóm (Styling Groups)

Mixes cũng được dùng để áp dụng cùng một kiểu dáng cho một nhóm các Block khác nhau, tránh sử dụng bộ chọn nhóm hoặc sao chép mã,,.

Ví dụ, nếu `text` là một Block chỉ định font và màu chữ, ta mix nó với các Block khác như `article` hoặc `copyright`:

    // HTML/JSX Output (Sau khi Mix)
    // Block 'article' và Block 'copyright' đều nhận kiểu dáng từ Block 'text'

    <article className="article text">
      Nội dung bài viết.
    </article>

    <footer className="footer">
      <div className="copyright text">
        Bản quyền (Mix với text).
      </div>
    </footer>

Trong ví dụ này, `article` và `copyright` cùng chia sẻ style CSS từ `.text {}` mà không cần viết lại quy tắc CSS đó cho từng Block.

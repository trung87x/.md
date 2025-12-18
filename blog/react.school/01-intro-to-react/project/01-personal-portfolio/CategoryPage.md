Tuyệt vời, chúng ta sẽ xây dựng trang `CategoryPage.jsx` (Trang hiển thị danh sách bài viết theo Danh mục).

Trang này về cơ bản tương tự như `HomePage.jsx` vì nó chủ yếu hiển thị danh sách bài viết, nhưng nó sử dụng một Block khác để hiển thị tiêu đề và tập trung vào các Block **tái sử dụng** theo nguyên tắc BEM.

### I. Phân tích Các Block Cần Thiết cho `CategoryPage.jsx`

Dựa trên cấu trúc dự án và mô tả BEMJSON cho trang danh mục, trang này là một **Block Declaration** (Khai báo) tập hợp các Block sau:

| Block (Thực thể BEM) | Vị trí trong Cấu trúc | Tái sử dụng/Mới | Mục đích theo BEM |
| --- | --- | --- | --- |
| **`Header`**, **`Footer`**, **`MainLayout`** | `components/layout/` | Tái sử dụng | Cung cấp khung sườn trang. |
| **`Logo`**, **`Menu`** | `components/ui/` & `components/shared/` | Tái sử dụng | Các Block cơ sở được lồng vào `Header`. |
| **`PageTitle` (Block mới)** | `components/features/` | Mới (Giả định) | Hiển thị tiêu đề Danh mục. |
| **`PostsList`** | `components/shared/` | Tái sử dụng | Hiển thị danh sách các Block `PostCard`. |
| **`PostCard`** | `components/shared/` | Tái sử dụng | Hiển thị tóm tắt bài viết. |

### II. Xây dựng Block Mới (Sử dụng Tailwind CSS)

Chúng ta cần định nghĩa Block `PageTitle` để hiển thị tiêu đề danh mục.

    // src/components/features/PageTitle.jsx
    import React from 'react';
    
    // Block Page-title (Không nên sử dụng margin/position bên trong,
    // vì Block cha (Layout) sẽ định vị nó)
    const PageTitle = ({ title }) => {
      return (
        <section className="py-6 border-b border-gray-200 mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            {title}
          </h1>
        </section>
      );
    };
    export default PageTitle;
    

### III. Cập nhật Block `PostsList` (Tái sử dụng với Modifiers)

Trên `HomePage.jsx`, chúng ta đã sử dụng `PostsList` với Modifier `type="featured"` (để hiển thị lưới 3 cột lớn). Trang `CategoryPage.jsx` thường hiển thị danh sách card tiêu chuẩn, không có Modifier đặc biệt, thể hiện việc **tái sử dụng Block cơ sở** mà không cần sao chép code,.

Chúng ta sẽ điều chỉnh lại `PostsList` (nếu chưa làm) để nó mặc định là lưới 2 cột hoặc danh sách tiêu chuẩn, và chỉ dùng 3 cột khi có Modifier `featured`.

    // src/components/shared/PostsList.jsx (Cập nhật cho Category Page)
    import React from 'react';
    import PostCard from './PostCard';
    
    // Giả định dữ liệu bài viết
    const mockPosts = [
        { id: 101, title: "Bài viết Danh mục 1" },
        { id: 102, title: "Bài viết Danh mục 2" },
        { id: 103, title: "Bài viết Danh mục 3" },
        { id: 104, title: "Bài viết Danh mục 4" },
        { id: 105, title: "Bài viết Danh mục 5" },
        { id: 106, title: "Bài viết Danh mục 6" },
    ];
    
    const PostsList = ({ type }) => {
      // Nếu có type='featured', dùng 3 cột lớn (dành cho trang chủ).
      // Nếu không có, mặc định dùng 2 cột tiêu chuẩn (dành cho trang danh mục).
      const isFeatured = type === 'featured';
    
      // Bố cục Grid dựa trên sự hiện diện của Modifier 'type'
      const layoutClass = isFeatured ? 'md:grid-cols-3' : 'md:grid-cols-2';
      const cardSize = isFeatured ? 'large' : 'medium';
    
      return (
        <section className="mb-12">
          {/* Không hiển thị tiêu đề phụ nếu là trang danh mục, trừ khi có type='featured' */}
          {isFeatured && <h2 className="text-3xl font-bold mb-6 border-b pb-2">Bài viết Nổi bật</h2>}
    
          {/* Container áp dụng các lớp tiện ích Tailwind cho lưới */}
          <div className={`grid gap-8 ${layoutClass}`}>
            {mockPosts.map(post => (
                <PostCard
                    key={post.id}
                    size={cardSize}
                    content={<p className="text-gray-600 text-sm">Tóm tắt ngắn</p>}
                />
            ))}
            {/* Pagination Block (Chưa có code, nhưng được định vị ở đây) */}
            {/* <Pagination /> */}
          </div>
        </section>
      );
    };
    export default PostsList;
    

### IV. Triển khai Trang `CategoryPage.jsx`

Trang này là nơi khai báo (Declaration) các Block cần thiết, và lắp ráp chúng lại.

    // src/pages/CategoryPage.jsx
    
    import React from 'react';
    
    // 1. Nhập các Block Layout (Tái sử dụng)
    import MainLayout from '../components/layout/MainLayout';
    import Header from '../components/layout/Header';
    import Footer from '../components/layout/Footer';
    import Logo from '../components/ui/Logo';
    import Menu from '../components/shared/Menu';
    
    // 2. Nhập các Block Feature và Shared
    import PageTitle from '../components/features/PageTitle'; // Tiêu đề mới
    import PostsList from '../components/shared/PostsList'; // Danh sách bài viết (Tái sử dụng)
    
    const CategoryPage = () => {
      // Giả định danh mục hiện tại là 'Công nghệ' (từ BEMJSON)
      const categoryName = 'Công nghệ';
    
      return (
        <MainLayout>
    
          {/* Tái sử dụng Header (Chứa Logo và Menu) */}
          <Header>
            <Logo />
            {/* Menu sử dụng Bộ điều chỉnh Key-Value: type='main' */}
            <Menu type="main" />
          </Header>
    
          {/* Container nội dung chính: Element 'layout__main' */}
          <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
            {/* Block Page Title: Hiển thị tiêu đề Danh mục */}
            <PageTitle title={`Danh mục: ${categoryName}`} />
    
            {/* Block Posts List: Hiển thị danh sách bài viết (không có Modifier đặc biệt) */}
            <PostsList type="standard" />
    
            {/* Giả định có Pagination Block ở đây */}
            {/* <Pagination /> */}
    
          </div>
    
          {/* Tái sử dụng Footer */}
          <Footer />
    
        </MainLayout>
      );
    };
    
    export default CategoryPage;
    

Bằng cách này, chúng ta đã hoàn thành trang `CategoryPage.jsx` bằng cách **tái sử dụng tối đa** các Block đã có (như `Header`, `Footer`, `Menu`, `PostsList`) và chỉ thêm một Block nhỏ (như `PageTitle`) để xử lý logic riêng biệt của trang, tuân thủ nguyên tắc BEM về tính độc lập của Block.
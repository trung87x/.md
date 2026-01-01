# Ứng dụng 2: React Router (Điều hướng trang)

```jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// 1. Định nghĩa các Component trang
const Home = () => <h1 className="text-2xl font-bold">Đây là Trang Chủ</h1>;
const Products = () => (
  <h1 className="text-2xl font-bold">Danh sách Sản Phẩm</h1>
);
const NotFound = () => (
  <h1 className="text-2xl text-red-500">404 - Không tìm thấy trang</h1>
);

export default function App() {
  return (
    <BrowserRouter>
      {/* 2. Thanh điều hướng sử dụng thẻ Link (Không tải lại trang) */}
      <nav className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/" className="hover:text-blue-400">
          Trang chủ
        </Link>
        <Link to="/products" className="hover:text-blue-400">
          Sản phẩm
        </Link>
      </nav>

      {/* 3. Khu vực hiển thị nội dung thay đổi theo URL */}
      <div className="p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
```

---

**Bạn có muốn tôi cung cấp mã nguồn cho "Ứng dụng 3: Truyền dữ liệu qua Props & Quản lý Component" không?**

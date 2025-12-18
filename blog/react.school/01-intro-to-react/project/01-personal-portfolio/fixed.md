// Trong PostCard.jsx của bạn

<h3 className="text-xl font-semibold mb-2">
  <Link to="/post/1" className="hover:text-indigo-600"> 
    Bài viết tiêu đề 
  </Link>
</h3>

// Router
npm install react-router-dom

// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import các trang (Block Declaration) mà bạn đã viết
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import CategoryPage from './pages/CategoryPage';

<div className="app">
    <Routes>
        {/* Khi ở trang chủ (/) thì hiện HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* Khi địa chỉ là /category/... thì hiện CategoryPage */}
        <Route path="/category/:slug" element={<CategoryPage />} />

        {/* Khi địa chỉ là /post/... thì hiện PostDetailPage */}
        {/* :id là tham số động để biết bài viết nào đang được xem */}
        <Route path="/post/:id" element={<PostDetailPage />} />
    </Routes>

</div>

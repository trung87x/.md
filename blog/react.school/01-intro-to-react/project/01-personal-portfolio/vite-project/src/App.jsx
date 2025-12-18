// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Import từ thư mục pages
import PostDetailPage from "./pages/PostDetailPage";
// import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    // <div className="app">
    //   {/* Hiển thị HomePage tại đây */}
    //   <HomePage />
    // </div>

    <div className="app">
      <Routes>
        {/* Khi ở trang chủ (/) thì hiện HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* Khi địa chỉ là /category/... thì hiện CategoryPage */}
        {/* <Route path="/category/:slug" element={<CategoryPage />} /> */}

        {/* Khi địa chỉ là /post/... thì hiện PostDetailPage */}
        {/* :id là tham số động để biết bài viết nào đang được xem */}
        <Route path="/post/:id" element={<PostDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;

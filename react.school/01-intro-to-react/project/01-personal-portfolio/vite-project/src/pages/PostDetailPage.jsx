import React from "react";

// Giả định dữ liệu post (trong dự án thực tế sẽ lấy từ API/Store)
const mockPostData = {
  id: 1,
  title: "Tối ưu hóa Bố cục React bằng Phương pháp luận BEM và Tailwind",
  author: "Tác giả Project",
  date: "2024-05-20",
  // Thêm nội dung chi tiết nếu cần
};

// 1. Nhập các Block Layout (Tái sử dụng)
import MainLayout from "../components/layout/MainLayout";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// 2. Nhập các Block Chức năng mới
import PostDetail from "../components/features/PostDetail";
import AuthorBio from "../components/features/widgets/AuthorBio";
import CommentsSection from "../components/features/comments/CommentsSection";

const PostDetailPage = () => {
  return (
    <MainLayout>
      {/* Tái sử dụng Header và Footer */}
      <Header />

      {/* Container nội dung chính: Sử dụng lớp tiện ích Tailwind cho padding và giới hạn chiều rộng */}
      {/* Element 'layout__main' được sử dụng để định vị Block PostDetail và các Block liên quan bên trong [14], [15]. */}
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Block PostDetail hiển thị nội dung chính */}
        <PostDetail post={mockPostData} />

        {/* Block tiện ích: Author Bio */}
        <AuthorBio />

        {/* Block tính năng: Comments */}
        <CommentsSection />
      </div>

      <Footer />
    </MainLayout>
  );
};

export default PostDetailPage;

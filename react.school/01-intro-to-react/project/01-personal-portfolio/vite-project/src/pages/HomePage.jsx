import React from "react";

// 1. Nhập các Block Layout
import MainLayout from "../components/layout/MainLayout";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// 2. Nhập các Block Feature chính
import HeroSection from "../components/features/HeroSection";
import PostsList from "../components/shared/PostsList";

const HomePage = () => {
  return (
    <MainLayout>
      <Header />

      {/* Container nội dung chính: Tương đương Block Element 'layout__main'
          Sử dụng lớp tiện ích Tailwind cho padding và giới hạn chiều rộng */}
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />

        {/* PostsList với Modifier tương đương type="featured" */}
        <PostsList type="featured" />

        {/* Thêm phần nội dung khác */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mb-6">Giới thiệu về tôi</h2>
          <p className="text-gray-700">
            Đây là nơi tôi sẽ hiển thị thông tin về mình và các kỹ năng cá nhân.
          </p>
        </section>
      </div>

      <Footer />
    </MainLayout>
  );
};

export default HomePage;

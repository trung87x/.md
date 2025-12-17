export const profileData = Object.freeze({
  name: "Đinh Quang Trung",
  role: "Frontend Developer",
  avatar: "https://i.pravatar.cc/300",
  bio: "Lập trình viên đam mê JavaScript và xây dựng giao diện người dùng hiện đại, tối ưu trải nghiệm người dùng.",
  about:
    "Với hơn 2 năm học tập và làm việc với React, tôi tập trung vào việc tạo ra các sản phẩm web có hiệu suất cao, code sạch (Clean Code) và dễ bảo trì theo phương pháp luận BEM.",

  social: {
    github: "https://github.com/quangtrung-dev",
    linkedin: "https://linkedin.com/in/quangtrung",
    email: "trung.dinh@example.com",
    website: "https://quangtrung.dev",
  },

  skills: [
    { name: "React", level: "Advanced" },
    { name: "Tailwind CSS", level: "Expert" },
    { name: "JavaScript", level: "Intermediate" },
    { name: "Git & GitHub", level: "Intermediate" },
  ],

  projects: [
    {
      id: "mini-shopping-cart", // Dùng string id làm slug cho URL sẽ đẹp hơn
      title: "Mini Shopping Cart",
      category: "E-commerce",
      thumbnail:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=500",
      desc: "Ứng dụng giỏ hàng đơn giản sử dụng Vanilla JS và LocalStorage.",
      fullContent:
        "Dự án này giúp tôi hiểu sâu về DOM Manipulation và cách quản lý trạng thái (state) mà không cần framework. Các tính năng bao gồm: Thêm/Xóa sản phẩm, cập nhật số lượng, tính tổng tiền.",
      techStack: ["HTML5", "CSS3", "JavaScript"],
      liveDemo: "https://example.com/demo1",
      githubRepo: "https://github.com/example/cart",
      isFinished: true,
      featured: true, // Dùng để lọc bài viết nổi bật ở HomePage
    },
    {
      id: "portfolio-v2",
      title: "Personal Portfolio 2.0",
      category: "Web Design",
      thumbnail:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
      desc: "Trang cá nhân tích hợp Dark Mode và tối ưu SEO.",
      fullContent:
        "Sử dụng React và Tailwind CSS theo chuẩn BEM. Dự án tập trung vào khả năng phản hồi (Responsive) trên mọi thiết bị và tốc độ tải trang cực nhanh.",
      techStack: ["React", "Tailwind", "Framer Motion"],
      liveDemo: "https://example.com/demo2",
      githubRepo: "https://github.com/example/portfolio",
      isFinished: false,
      featured: true,
    },
  ],
});

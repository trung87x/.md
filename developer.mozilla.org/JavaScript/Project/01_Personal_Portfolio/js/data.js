export const profileData = Object.freeze({
  name: "Đinh Quang Trung",
  role: "Frontend Developer",
  bio: "Lập trình viên đam mê JavaScript và xây dựng giao diện người dùng hiện đại.",
  social: {
    github: "https://github.com/example",
    linkedin: "https://linkedin.com/in/example",
    website: null,
  },
  skills: ["JavaScript (ES6+)", "React", "HTML5/CSS3", "Git"],
  projects: [
    {
      id: 1,
      title: "Mini Shopping Cart",
      desc: "Ứng dụng giỏ hàng đơn giản sử dụng Vanilla JS.",
      isFinished: true,
    },
    {
      id: 2,
      title: "Portfolio 2.0",
      desc: "Trang cá nhân tích hợp Dark Mode.",
      isFinished: false,
    },
  ],
});

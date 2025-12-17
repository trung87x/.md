import MainLayout from "../components/layout/MainLayout";
import Heading from "../components/ui/Heading";
import PostCard from "../components/shared/PostCard";
import CategoriesWidget from "../components/features/widgets/CategoriesWidget";

const HomePage = () => {
  // Dữ liệu mẫu
  const posts = [
    {
      id: 1,
      category: "Công nghệ",
      title: "Tại sao React.js lại phổ biến?",
      excerpt:
        "React giúp xây dựng giao diện người dùng linh hoạt và hiệu quả...",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      date: "17/12/2025",
    },
    {
      id: 2,
      category: "Lập trình",
      title: "Học Tailwind CSS trong 10 phút",
      excerpt:
        "Tailwind CSS thay đổi cách chúng ta viết giao diện web hiện đại...",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
      date: "16/12/2025",
    },
  ];

  return (
    <MainLayout columns="two">
      {/* Cấu trúc Grid cho nội dung trang chủ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Vùng Content chính: 8 cột */}
        <section className="lg:col-span-8">
          <div className="mb-8">
            <Heading level="h1">Chào mừng bạn đến với Blog</Heading>
            <p className="text-slate-500 -mt-4">
              Khám phá những bài viết mới nhất về công nghệ.
            </p>
          </div>

          <Heading level="h2">Mới nhất</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Vùng Sidebar: 4 cột */}
        <aside className="lg:col-span-4 space-y-6">
          <CategoriesWidget />
          {/* Bạn có thể thêm AuthorBioWidget vào đây sau */}
          <div className="bg-indigo-600 p-6 rounded-2xl text-white">
            <h3 className="font-bold text-lg mb-2">Đăng ký bản tin</h3>
            <p className="text-indigo-100 text-sm mb-4">
              Nhận thông báo bài viết mới nhất qua email của bạn.
            </p>
            <input
              type="email"
              placeholder="Email của bạn"
              className="w-full p-2 rounded text-slate-900 mb-2"
            />
            <button className="w-full bg-white text-indigo-600 font-bold py-2 rounded shadow-md active:scale-95 transition-transform">
              Đăng ký ngay
            </button>
          </div>
        </aside>
      </div>
    </MainLayout>
  );
};

export default HomePage;

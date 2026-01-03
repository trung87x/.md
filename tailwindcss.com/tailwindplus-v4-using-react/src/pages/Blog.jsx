import { useState } from "react";

// Dữ liệu mẫu để test giao diện
const posts = [
  {
    id: 1,
    title: "Tối ưu hóa Tailwind CSS v4 trong dự án React",
    excerpt:
      "Khám phá những thay đổi quan trọng và cách tận dụng JIT engine mới nhất để giảm dung lượng file CSS.",
    date: "01/01/2026",
    category: "Development",
  },
  {
    id: 2,
    title: "Tại sao nên dùng BEMJSON thay vì HTML thuần?",
    excerpt:
      "Cách tư duy theo khối (Block) giúp quản lý cấu trúc dự án lớn trở nên đơn giản và dễ bảo trì hơn.",
    date: "30/12/2025",
    category: "Architecture",
  },
  {
    id: 3,
    title: "Xử lý Portal và iFrame trong Headless UI",
    excerpt:
      "Những thách thức khi nhốt Dialog vào khung Preview và các giải pháp thực tế để khắc phục lỗi FocusTrap.",
    date: "28/12/2025",
    category: "UI/UX",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-white">
      {/* Header của Blog */}
      <div className="mb-12 border-b border-gray-100 pb-8">
        <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
          Blog Lab
        </h2>
        <p className="mt-4 text-sm text-gray-500">
          Chia sẻ kinh nghiệm về Web Development và UI Kit Architecture.
        </p>
      </div>

      {/* Danh sách bài viết */}
      <div className="grid gap-12 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col items-start justify-between"
          >
            <div className="flex items-center gap-x-4 text-xs">
              <time dateTime={post.date} className="text-gray-500">
                {post.date}
              </time>
              <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                {post.category}
              </span>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg leading-6 font-bold text-gray-900 transition-colors group-hover:text-indigo-600">
                <a href="#">
                  <span className="absolute inset-0" />
                  {post.title}
                </a>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {post.excerpt}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-x-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white uppercase">
                Dev
              </div>
              <div className="text-sm leading-6">
                <p className="font-bold text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">Technical Writer</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Nút bấm giả lập để test FocusTrap nếu bạn nhúng trang này vào PreviewWrapper */}
      <div className="mt-16 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
        <p className="mb-4 font-mono text-xs text-slate-400">
          Mẫu dùng để test Button Focus
        </p>
        <button className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-500 active:scale-95">
          Read More Articles
        </button>
      </div>
    </div>
  );
}

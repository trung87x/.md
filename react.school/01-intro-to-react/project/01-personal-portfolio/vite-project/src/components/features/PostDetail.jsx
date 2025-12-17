import React from "react";
import Heading from "../ui/Heading"; // Giả sử có Block Heading

const PostDetail = ({ post, className }) => {
  // PostDetail là Block chính, không định vị bên ngoài
  return (
    <article className={`max-w-4xl mx-auto ${className}`}>
      {/* Giả định sử dụng Heading với Mods: level='h1' */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        {post.title}
      </h1>
      <p className="text-gray-500 mb-6">
        Tác giả: {post.author} | Ngày đăng: {post.date}
      </p>

      {/* Nội dung chi tiết bài viết */}
      <div className="prose lg:prose-xl max-w-none mb-10 text-gray-700">
        <p>
          Đây là đoạn mở đầu của bài viết chi tiết. Nội dung này cần được trình
          bày rõ ràng, không bị ảnh hưởng bởi CSS của các Block khác.
        </p>
        <p>
          Nguyên tắc BEM đảm bảo rằng các Block khác (như Comments) không gây
          xung đột phong cách cho nội dung bài viết này [10].
        </p>
      </div>
    </article>
  );
};
export default PostDetail;

import { Link } from "react-router-dom";

// Sử dụng props để thay đổi kích thước (tương đương Modifier 'size')
const PostCard = ({ size, content }) => {
  const sizeClass =
    size === "large" ? "col-span-1 md:col-span-1" : "col-span-1";

  // Định kiểu bằng Tailwind
  return (
    <article
      className={`bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-[1.01] transition duration-300 ${sizeClass}`}
    >
      <div className="h-48 bg-gray-300 flex items-center justify-center text-gray-500">
        Hình ảnh
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">
          <Link to="/post/1" className="hover:text-indigo-600">
            Bài viết tiêu đề
          </Link>
        </h3>
        {content}
      </div>
    </article>
  );
};
export default PostCard;

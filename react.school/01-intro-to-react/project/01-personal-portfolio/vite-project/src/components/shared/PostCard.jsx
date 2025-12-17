import { Link } from "react-router-dom";

const PostCard = ({ post }) => (
  <article className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
    <div className="aspect-video overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-5">
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h3>
      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
      <div className="flex items-center text-xs text-gray-400">
        <span>17 Tháng 12, 2025</span>
      </div>
    </div>
  </article>
);

export default PostCard;

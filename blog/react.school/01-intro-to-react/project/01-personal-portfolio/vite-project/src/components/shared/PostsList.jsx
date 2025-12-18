import PostCard from "./PostCard";

const PostsList = ({ type }) => {
  // Giả sử type='featured' sẽ thay đổi bố cục (grid)
  const isFeatured = type === "featured";

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 border-b pb-2">
        Bài viết Nổi bật
      </h2>

      {/* Bố cục Grid dựa trên Modifier 'featured' */}
      <div
        className={`grid gap-8 ${
          isFeatured ? "md:grid-cols-3" : "md:grid-cols-2"
        }`}
      >
        <PostCard
          size={isFeatured ? "large" : "medium"}
          content={<p className="text-gray-600 text-sm">Tóm tắt ngắn 1</p>}
        />
        <PostCard
          size={isFeatured ? "large" : "medium"}
          content={<p className="text-gray-600 text-sm">Tóm tắt ngắn 2</p>}
        />
        <PostCard
          size={isFeatured ? "large" : "medium"}
          content={<p className="text-gray-600 text-sm">Tóm tắt ngắn 3</p>}
        />
      </div>
    </section>
  );
};
export default PostsList;

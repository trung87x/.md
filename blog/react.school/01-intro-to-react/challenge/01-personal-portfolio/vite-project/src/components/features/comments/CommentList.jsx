import React from "react";

// Component này cần xử lý Modifier 'display: nested' mà bạn đã định nghĩa
const CommentList = ({ display }) => {
  // Áp dụng BEM Modifier: display='nested'
  const displayClass =
    display === "nested"
      ? "space-y-4 comment-list_display_nested"
      : "space-y-2";

  return (
    <div className={`mt-6 ${displayClass}`}>
      <h4 className="text-xl font-semibold mb-4">3 Bình luận</h4>
      {/* Comment 1 */}
      <div className="border-l-4 border-gray-300 pl-4 py-2 bg-white shadow-sm rounded">
        <p className="font-medium">Người dùng 1:</p>
        <p className="text-gray-700 text-sm">Bài viết rất hữu ích!</p>
      </div>
    </div>
  );
};
export default CommentList;

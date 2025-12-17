import React from "react";

const CommentForm = () => {
  // Block Comment-form
  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-6">
      <h4 className="text-xl font-semibold mb-4">Để lại bình luận</h4>
      <textarea
        className="w-full p-3 border rounded-lg focus:ring-indigo-500"
        rows="4"
        placeholder="Viết bình luận của bạn..."
      ></textarea>
      <button className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
        Gửi Bình luận
      </button>
    </div>
  );
};
export default CommentForm;

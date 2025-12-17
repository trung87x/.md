import React from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const CommentsSection = () => {
  // Block Comments-section (Block cha) bao bọc logic bình luận
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold mb-6">Bình luận</h2>

      <CommentForm />

      {/* Sử dụng Modifier: display='nested' theo ý định của bạn */}
      <CommentList display="nested" />
    </section>
  );
};
export default CommentsSection;

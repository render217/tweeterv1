/* eslint-disable react/prop-types */
import CommentCard from "./CommentCard";

export default function CommentList({ comments }) {
  return (
    <>
      <div className="space-y-4">
        {[...comments].map((comment, i) => (
          <CommentCard key={i} comment={comment} />
        ))}
      </div>
    </>
  );
}

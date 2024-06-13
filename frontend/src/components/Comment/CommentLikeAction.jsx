/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLikeDislikeComment } from "../../libs/query/queries";
import { toast } from "react-toastify";

export default function CommentLikeAction({ isLiked, postId, commentId }) {
  const { mutateAsync: likeDislikeComment, isPending } =
    useLikeDislikeComment();

  const handleCommentLikeFn = async () => {
    if (isPending) {
      return;
    }
    try {
      const { data } = await likeDislikeComment({ postId, commentId });
      //   toast.success(data.message);
      console.log(data);
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div
      onClick={handleCommentLikeFn}
      className={`${
        isLiked ? "text-clrValentineRed" : "text-clrGunSmoke"
      } flex w-12 cursor-pointer items-center gap-2 text-xs `}>
      <FontAwesomeIcon icon={faHeart} />
      <p>{isLiked ? "Liked" : "Like"}</p>
    </div>
  );
}

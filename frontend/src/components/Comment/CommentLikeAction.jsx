/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLikeDislikeComment } from "../../libs/query/queries";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

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
      // console.log(data);
    } catch (error) {
      // console.log("error");
    }
  };
  return (
    <div
      onClick={handleCommentLikeFn}
      className={`${
        isLiked ? "text-clrValentineRed" : "text-clrGunSmoke"
      } flex w-14 cursor-pointer items-center gap-2  text-xs `}>
      {isPending ? (
        <div className="grid w-8 place-content-center">
          <ClipLoader size={10} className="" />
        </div>
      ) : (
        <div className="grid w-8 place-content-center">
          <FontAwesomeIcon icon={faHeart} />
        </div>
      )}
      <p className="w-9">{isLiked ? "Liked" : "Like"}</p>
    </div>
  );
}

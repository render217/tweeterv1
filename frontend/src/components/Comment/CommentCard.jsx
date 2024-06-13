/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import Avator from "../Avator";
import relativeTime from "dayjs/plugin/relativeTime";

import CommentLikeAction from "./CommentLikeAction";
import { formatDateFromNow } from "../../utils";
import { useDeleteComment } from "../../libs/query/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function CommentCard({ comment }) {
  const {
    _id: commentId,
    post: postId,
    author: { _id: authorId, username, profileImage },
    content,
    likes,
    isLiked,
    isAuthor,
    createdAt,
  } = comment;

  const { mutateAsync: deleteComment, isPending } = useDeleteComment();

  const handleDeleteComment = async () => {
    if (isPending) return;
    try {
      const { data } = await deleteComment({ postId, commentId });
      toast.success(data.message || "soccessfully deleted....");
    } catch (e) {
      console.log(e);
    }
  };
  const formatedDate = formatDateFromNow(createdAt);
  return (
    <>
      <div className="flex gap-4">
        <div>
          {/* <Avator img={"/images/me_profile.jpg"} /> */}
          <Avator img={profileImage} />
        </div>
        <div className="">
          <div className=" flex items-center gap-2">
            {/* <p className="text-xs font-medium">{username || "Don Mani"}</p> */}
            <p className=" text-xs font-medium hover:underline">
              <Link to={`/profile/${authorId}`}>
                {username || "Beamlak Samson"}
              </Link>
            </p>
            <p className="text-xs text-clrDavyGrey">
              {formatedDate || "24 August at 20:43"}
            </p>
          </div>
          <div className="my-2">
            <p className=" text-[11px]">{content}</p>
          </div>
          <div className="flex gap-3">
            <CommentLikeAction
              isLiked={isLiked}
              postId={postId}
              commentId={commentId}
            />
            <p className="text-xs  text-clrGunSmoke">{likes.length} Likes</p>
          </div>
        </div>
        {isAuthor && (
          <div className="ml-auto flex flex-col justify-center px-5">
            <FontAwesomeIcon
              onClick={() => handleDeleteComment()}
              icon={faTrashAlt}
              className={`${
                isPending
                  ? "cursor-not-allowed text-clrGunSmoke"
                  : "cursor-pointer text-clrValentineRed hover:text-clrDarkGrey"
              }   `}
            />
          </div>
        )}
      </div>
    </>
  );
}

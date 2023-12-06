/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import Avator from "../Avator";
import relativeTime from "dayjs/plugin/relativeTime";

import CommentLikeAction from "./CommentLikeAction";
import { formatDateFromNow } from "../../utils";

export default function CommentCard({ comment }) {
  const {
    _id: commentId,
    post: postId,
    author: { _id: authorId, username, profileImage },
    content,
    likes,
    isLiked,
    createdAt,
  } = comment;

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
            <p className="text-xs font-medium">{username || "Don Mani"}</p>
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
      </div>
    </>
  );
}

//  I’ve seen awe-inspiring things that I thought I’d never be able to explain to another person

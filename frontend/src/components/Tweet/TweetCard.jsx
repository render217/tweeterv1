/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRef } from "react";
import {
  BookmarkAction,
  CommentAction,
  LikeAction,
  RetweetAction,
} from "../Actions";
import Comments from "../Comment";
import AddComment from "../Comment/AddComment";
import { formatDateFromNow } from "../../utils";
import { Link } from "react-router-dom";

export default function TweetCard({ tweet }) {
  const {
    _id: postId,
    content,
    imageUrl,
    imagePublicId,
    tags,
    audience,
    author: { _id: authorId, username, profileImage },
    isLiked,
    isRetweeted,
    isBookmarked,
    comments,
    likes,
    bookmark,
    retweet,
    createdAt,
    updatedAt,
  } = tweet;

  const formattedDate = formatDateFromNow(createdAt);

  const addCommentRef = useRef();

  return (
    <>
      <div className="py-2 text-xs text-clrGunSmoke">meta info</div>
      <div className="bg-white p-4">
        <div className="flex gap-2">
          {/* Author Info start*/}

          <div className="h-10 w-10 overflow-hidden rounded-2xl">
            <img
              className="h-full w-full object-fill"
              // src="/images/profile_img.jpg"
              src={profileImage}
              alt=""
            />
          </div>
          <div>
            <p className="mb-1 text-sm font-medium hover:underline">
              <Link to={`/profile/${authorId}`}>
                {username || "Beamlak Samson"}
              </Link>
            </p>
            <p className="text-xs text-clrGunSmoke">
              {formattedDate || "24 August at 20:43"}
            </p>
          </div>
        </div>

        {/* Author Info end */}

        {/*Post Content */}

        <div className="py-3">
          <p className="text-xs text-clrDavyGrey ">{content}</p>
        </div>

        {/* Post Image */}

        {imageUrl && (
          <div className=" max-h-[400px] overflow-hidden">
            <img
              className="h-full w-full object-fill"
              // src="/images/background-2.jpg"
              src={imageUrl}
              alt=""
            />
          </div>
        )}

        {/* post info */}

        <div className="flex justify-end py-1">
          <TweetInfo
            comments={comments}
            retweets={retweet}
            likes={likes}
            saved={bookmark}
          />
        </div>
        <hr className="my-1 border" />

        {/* post actions */}

        <div className="flex justify-between">
          <CommentAction onClick={() => addCommentRef.current.click()} />
          <RetweetAction postId={postId} isRetweeted={isRetweeted} />
          <LikeAction postId={postId} isLiked={isLiked} />
          <BookmarkAction postId={postId} isBookmarked={isBookmarked} />
        </div>
        <hr className="my-1 border" />

        {/* comment text area */}

        <div className="">
          <AddComment addCommentRef={addCommentRef} postId={postId} />
        </div>

        {/* comments list */}

        <hr className="my-1 border" />
        <div>
          <Comments postId={postId} comments={comments} />
        </div>
      </div>
    </>
  );
}

function TweetInfo({ comments, retweets, likes, saved }) {
  // console.log(Info);
  let Info = [
    { property: "Comments", total: comments.length },
    { property: "Retweets", total: retweets.length },
    { property: "Likes", total: likes.length },
    { property: "Saved", total: saved.length },
  ];

  return (
    <>
      <div className="flex items-center gap-2">
        {Info.map((info) => (
          <div
            key={info.property}
            className="flex items-center gap-1 text-[10px] text-clrGunSmoke">
            <p className="">{info.total}</p>
            <p className="">{info.property}</p>
          </div>
        ))}
      </div>
    </>
  );
}

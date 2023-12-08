/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Avator from "../Avator";
import useTextAreaResize from "../../hooks/useTextAreaResize";
import { useAddComment } from "../../libs/query/queries";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
export default function AddComment({ addCommentRef, postId, canComment }) {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");
  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const commentRef = useTextAreaResize(commentText);

  const { mutateAsync: addComment, isPending } = useAddComment();

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText) {
      return;
    }
    if (isPending || !commentText) {
      return;
    }

    try {
      const { data } = await addComment({ postId, content: commentText });
      toast.success(data.message);
      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {canComment ? (
        <div className="flex gap-2">
          <div>
            <Avator img={user.profileImage} />
          </div>
          <form className="w-full" onSubmit={handleAddComment}>
            <div
              ref={addCommentRef}
              onClick={() => commentRef.current.focus()}
              className="flex h-fit w-full items-start gap-2 rounded-md border px-2 py-2">
              <textarea
                ref={commentRef}
                className="h-fit flex-1 resize-none overflow-hidden text-xs outline-none "
                name="tweet"
                value={commentText}
                onChange={handleChange}
                placeholder="Tweet your reply"
                rows="1"></textarea>
              {/* image upload in comment not implemented */}
              {/* <FontAwesomeIcon
                icon={faImage}
                className="cursor-pointer text-clrFrenchGrey"
              /> */}
              <button>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <DisabledComment commentRef={commentRef} user={user} />
      )}
    </>
  );
}

function DisabledComment({ user, commentRef }) {
  return (
    <div className="flex cursor-not-allowed gap-2">
      <div>
        <Avator img={user.profileImage} />
      </div>
      <form className="w-full" onSubmit={() => {}}>
        <div className="flex h-fit w-full cursor-not-allowed items-start gap-2 rounded-md border px-2 py-2">
          <textarea
            disabled={true}
            ref={commentRef}
            className={`h-fit flex-1 cursor-not-allowed resize-none overflow-hidden text-xs outline-none`}
            placeholder="Tweet your reply"
            rows="1"></textarea>
          <button className="cursor-not-allowed text-clrFrenchGrey">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </form>
    </div>
  );
}

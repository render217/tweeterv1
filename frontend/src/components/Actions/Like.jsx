/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ActionWrapper from "./ActionWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useLikeDislikePost } from "../../libs/query/queries";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../Loading";

import { CircleLoader, ClipLoader } from "react-spinners";
import ActionLoader from "./ActionLoader";
export default function Like({ postId, isLiked }) {
  const { mutateAsync: likeUnlikePost, isPending } = useLikeDislikePost();

  const handleLikeUnlikeFn = async () => {
    if (isPending) {
      return;
    }
    try {
      const { data } = await likeUnlikePost(postId);
      toast.success(data.message);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <ActionWrapper onClick={handleLikeUnlikeFn}>
      {isPending ? (
        <ActionLoader />
      ) : (
        <>
          <FontAwesomeIcon
            icon={faHeart}
            className={`${isLiked ? "text-clrValentineRed" : ""} `}
          />
          <p
            className={`${
              isLiked ? "text-clrValentineRed" : ""
            } hidden xs:block`}>
            {isLiked ? "Liked" : "Like"}
          </p>
        </>
      )}
    </ActionWrapper>
  );
}

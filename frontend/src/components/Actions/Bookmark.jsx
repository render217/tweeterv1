/* eslint-disable react/prop-types */
import ActionWrapper from "./ActionWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useBookmarkUnBookmarkPost } from "../../libs/query/queries";
import { toast } from "react-toastify";
export default function Bookmark({ postId, isBookmarked }) {
  const { mutateAsync: bookmarkUnbookmarkPost, isPending } =
    useBookmarkUnBookmarkPost();

  const handleBookmarkUnBookmarkFn = async () => {
    if (isPending) {
      return;
    }
    try {
      const { data } = await bookmarkUnbookmarkPost(postId);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ActionWrapper onClick={handleBookmarkUnBookmarkFn}>
      <FontAwesomeIcon
        icon={faBookmark}
        className={`${isBookmarked ? "text-clrClearBlue" : ""}`}
      />
      <p
        className={`${
          isBookmarked ? "text-clrClearBlue" : ""
        } hidden xs:block`}>
        {isBookmarked ? "Saved" : "Save"}
      </p>
    </ActionWrapper>
  );
}

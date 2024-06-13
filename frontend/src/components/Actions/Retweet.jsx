/* eslint-disable react/prop-types */
import ActionWrapper from "./ActionWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { useRetweetDetweetPost } from "../../libs/query/queries";
import { toast } from "react-toastify";
export default function Retweet({ postId, isRetweeted }) {
  const { mutateAsync: retweetDetweetPost, isPending } =
    useRetweetDetweetPost();

  const handleRetweetDetweet = async () => {
    if (isPending) {
      return;
    }
    try {
      const { data } = await retweetDetweetPost(postId);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ActionWrapper onClick={handleRetweetDetweet}>
      <FontAwesomeIcon
        icon={faRotate}
        className={`${isRetweeted ? "text-clrJadeGreen" : ""} `}
      />
      <p
        className={`${isRetweeted ? "text-clrJadeGreen" : ""} hidden xs:block`}>
        {isRetweeted ? "Retweeted" : "Retweet"}
      </p>
    </ActionWrapper>
  );
}

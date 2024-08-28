/* eslint-disable react/prop-types */
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFollowUnFollowUser } from "../../libs/query/queries";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function Follow({ isFollowed, userId }) {
  const { mutateAsync: followUnfollow, isPending } = useFollowUnFollowUser();
  const handleFollowFun = async () => {
    if (isPending) {
      return;
    }
    try {
      const { data } = await followUnfollow(userId);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={handleFollowFun}
      className={`${
        isFollowed
          ? "border border-transparent bg-clrClearBlue text-white"
          : "border border-clrClearBlue text-clrClearBlue hover:bg-clrClearBlue hover:text-white"
      } flex w-24 cursor-pointer items-center  justify-center gap-2 rounded-md    py-1.5 text-xs max-sm:mx-auto `}>
      {isPending ? (
        <ClipLoader
          size={15}
          color={isFollowed ? "white" : "text-clrClearBlue"}
        />
      ) : (
        <>
          <FontAwesomeIcon icon={faUserPlus} />
          <p>{isFollowed ? "UnFollow " : "Follow"}</p>
        </>
      )}
    </div>
  );
}

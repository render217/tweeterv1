/* eslint-disable react/prop-types */
// import UserCard from "./UserCard";

import { useGetFollowingList } from "../../libs/query/queries";
import Spinner from "../Spinner";
import UserCard from "./UserCard";

export default function Following({ userId }) {
  const {
    data: axiosResponseData,
    isPending,
    isError,
  } = useGetFollowingList(userId);

  if (isPending && !isError) {
    return (
      <div className="h-[300px]">
        <Spinner size="40px" color="black" />
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <p className="text-center text-xs">Something went wrong</p>
      </div>
    );
  }

  const following = axiosResponseData.data.payload.following;
  console.log({ following });
  return (
    <div className="space-y-5">
      {following.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          showBanner={false}
          showBio={false}
        />
      ))}
    </div>
  );
}

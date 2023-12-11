/* eslint-disable react/prop-types */
// import UserCard from "./UserCard";

import { useGetFollowersList } from "../../libs/query/queries";
import Spinner from "../Spinner";
import UserCard from "./UserCard";

export default function Followers({ userId }) {
  const {
    data: axiosResponseData,
    isPending,
    isError,
  } = useGetFollowersList(userId);

  if (isPending && !isError) {
    return (
      <div>
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

  const followers = axiosResponseData.data.payload.followers;
  console.log({ followers });
  return (
    <div className="space-y-5">
      {followers.map((user) => (
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

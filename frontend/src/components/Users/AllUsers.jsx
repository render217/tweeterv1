/* eslint-disable react/prop-types */
import { useGetAllUser } from "../../libs/query/queries";
import UserCard from "./UserCard";

export default function AllUsers() {
  const {
    data: axiosResponse,
    isPending,
    isError,
    refetch,
    isRefetching,
  } = useGetAllUser();
  if (isPending && !isError) {
    return (
      <div>
        <h1 className="text-center">Loading...</h1>
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <h1 className="text-center">Something went wrong</h1>
        <button
          disabled={isRefetching}
          onClick={() => refetch()}
          className="mx-auto my-2 block rounded-sm bg-clrDarkGrey px-2 py-1 text-xs text-white hover:rounded-md">
          refresh
        </button>
      </div>
    );
  }
  return (
    <>
      <UsersList users={axiosResponse.data.payload.users} />
    </>
  );
}

function UsersList({ users }) {
  return (
    <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
      {users.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          showBanner={true}
          showBio={false}
        />
      ))}
    </div>
  );
}

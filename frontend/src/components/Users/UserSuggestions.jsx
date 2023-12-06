import { useGetAllUser } from "../../libs/query/queries";
import UserCard from "./UserCard";

export default function UserSuggestions() {
  const { data: axiosResponse, isPending, isError } = useGetAllUser();
  if (isPending && !isError) {
    return (
      <div className=" rounded-md bg-white">
        <div className="p-4">
          <p className="text-lg font-medium">Who to follow</p>
          <hr className="mb-3 mt-2 border " />
          <div className="grid gap-4 max-lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
            <h1>Loading....</h1>
          </div>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className=" rounded-md bg-white">
        <div className="p-4">
          <p className="text-lg font-medium">Who to follow</p>
          <hr className="mb-3 mt-2 border " />
          <div className="grid gap-4 max-lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
            <p>Error</p>
          </div>
        </div>
      </div>
    );
  }
  const users = axiosResponse.data.payload.users;
  return (
    <div className=" rounded-md bg-white">
      <div className="p-4">
        <p className="text-lg font-medium">Who to follow</p>
        <hr className="mb-3 mt-2 border " />
        <div className="grid gap-4 max-lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

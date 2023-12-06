/* eslint-disable react/prop-types */
import { useGetAllPost } from "../../libs/query/queries";
import TweetCard from "./TweetCard";

export default function TweetFeed() {
  const { data: axiosResponse, isPending, isError } = useGetAllPost();
  if (isPending && !isError) {
    return (
      <>
        <div className="min-h-[500px]">
          <h1 className="text-center">Loading...</h1>
        </div>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <div className="min-h-[500px]">
          <h1 className="text-center">Error</h1>
        </div>
      </>
    );
  }
  return (
    <div className="min-h-[500px]">
      {axiosResponse.data.payload.posts.length === 0 && <h1>NO Tweet Yet.</h1>}
      <TweetList tweets={axiosResponse.data.payload.posts} />
    </div>
  );
}

function TweetList({ tweets }) {
  return (
    <>
      {tweets.map((tweet) => (
        <TweetCard key={tweet._id} tweet={tweet} />
      ))}
    </>
  );
}

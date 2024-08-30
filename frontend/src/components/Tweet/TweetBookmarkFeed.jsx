/* eslint-disable react/prop-types */
import { useBookmarkExplore } from "../../libs/query/queries";
import { LoadingProgress } from "../Loading";
import TweetCard from "./TweetCard";

export default function TweetBookmarkFeed({ type, userId }) {
  // console.log({ type, userId });

  const {
    data: axiosResponse,
    isPending,
    isError,
  } = useBookmarkExplore({ type, userId });
  if (isPending && !isError) {
    return (
      <>
        <div className="min-h-[500px]">
          <div className={`my-0 ${isPending ? "visible" : "invisible"}`}>
            <LoadingProgress />
          </div>
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
  // console.log("axiosReponse", axiosResponse);
  return (
    <div className="my-2 min-h-[500px]">
      {axiosResponse.data.payload.posts.length === 0 && (
        <h1 className="text-center text-xl">No Content</h1>
      )}
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

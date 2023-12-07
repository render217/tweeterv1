/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useExplore } from "../../libs/query/queries";
import { LoadingProgress } from "../Loading";
import TweetCard from "./TweetCard";

export default function TweetExploreFeed({ type, search }) {
  const {
    data: axiosResponse,
    isPending,
    isError,
    refetch,
  } = useExplore({ type, search });

  useEffect(() => {
    refetch();
  }, [refetch, search]);

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
  return (
    <div className="my-2 min-h-[500px]">
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

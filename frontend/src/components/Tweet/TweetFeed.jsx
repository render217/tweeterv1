/* eslint-disable react/prop-types */
import { useCallback, useRef } from "react";
import { useGetAllPost } from "../../libs/query/queries";
import TweetCard from "./TweetCard";
// import { LoadingSpinner } from "../Loading";
import Spinner from "../Spinner";

export default function TweetFeed() {
  const {
    data,
    isPending,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetAllPost();
  console.log({
    data,
    isPending,
    isError,
    isFetchingNextPage,
    hasNextPage,
  });

  const observer = useRef(null);

  const lastTweet = useCallback(
    (node) => {
      if (!node) return;
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            setTimeout(() => {
              fetchNextPage();
            }, 500);
          }
        },
        { threshold: 0 }
      );

      observer.current.observe(node);
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

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
    <div className=" min-h-[500px] pb-10">
      {data.pages.map((page) => {
        return page.data.payload.posts.map((post, idx) => {
          const lastTweetIndex = page.data.payload.posts.length - 1;
          return (
            <div key={post._id} ref={idx === lastTweetIndex ? lastTweet : null}>
              <TweetCard key={post._id} tweet={post} />
            </div>
          );
        });
      })}
      {hasNextPage && <Spinner color="black" size="40px" />}
      {!hasNextPage && (
        <p className="mt-10 text-center text-xs">no more content</p>
      )}
      {/* {axiosResponse.data.payload.posts.length === 0 && <h1>NO Tweet Yet.</h1>}
      <TweetList tweets={axiosResponse.data.payload.posts} /> */}
    </div>
  );
}

// function TweetList({ tweets }) {
//   return (
//     <>
//       {tweets.map((tweet) => (
//         <TweetCard key={tweet._id} tweet={tweet} />
//       ))}
//     </>
//   );
// }

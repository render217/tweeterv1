/* eslint-disable react/prop-types */
import { useCallback, useRef } from "react";
import { useGetAllPost } from "../../libs/query/queries";
import TweetCard from "./TweetCard";

import { LoaderCircle } from "lucide-react";

export default function TweetFeed() {
  const {
    data,
    isPending,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetAllPost();

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
          <div className="grid place-content-center py-2">
            <LoaderCircle className="animate-spin text-clrClearBlue" />
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div className="min-h-[500px]">
          <h1 className="text-center">Something went wrong {":("}</h1>
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
      {hasNextPage && (
        <div className="mt-3 py-2">
          <LoaderCircle className="mx-auto animate-spin text-clrClearBlue" />
        </div>
      )}
      {!hasNextPage && (
        <p className="mt-5 text-center text-[10px] text-gray-400">
          no more content
        </p>
      )}
    </div>
  );
}

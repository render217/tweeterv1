/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { LoaderCircle } from "lucide-react";
import { useGetComments } from "../../libs/query/queries";
import Spinner from "../Spinner";
import CommentCard from "./CommentCard";

export default function Comments({ postId }) {
  const {
    data,
    isPending,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetComments(postId || "");

  if (isPending && !isError) {
    return (
      <div className="my-3">
        <LoaderCircle className="size-3 mx-auto animate-spin text-clrGunSmoke" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="my-5">
        <p className="text-center text-xs">Error loading Comments :(</p>
      </div>
    );
  }

  return (
    <div className="my-4 max-h-[400px] overflow-y-auto">
      {/* <CommentList comments={axiosReponseData.data.payload.comments} /> */}
      {data.pages.map((page, index) => {
        return (
          <div key={index} className="space-y-4">
            {page.data.payload.comments.map((comment, idx) => {
              return <CommentCard key={idx} comment={comment} />;
            })}
          </div>
        );
      })}
      {hasNextPage && (
        <div
          onClick={() => fetchNextPage()}
          className="cursor-pointer text-center text-xs hover:underline">
          {isFetchingNextPage ? (
            <div className="relative mx-auto h-10 w-[95%]">
              <LoaderCircle className="size-1 absolute left-0 right-0 top-1 mx-auto animate-spin text-clrGunSmoke" />
            </div>
          ) : (
            <div className="grid h-10 place-content-center">
              <p className="text-xs">load More</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

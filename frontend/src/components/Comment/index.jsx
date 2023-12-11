/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
      <div className="my-5">
        <p className="text-center">loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="my-5">
        <p>error</p>
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
        <p
          onClick={() => fetchNextPage()}
          className="cursor-pointer text-center text-xs hover:underline">
          {isFetchingNextPage ? (
            <Spinner color="black" size="10px" />
          ) : (
            "Load More"
          )}
        </p>
      )}
    </div>
  );
}

// function CommentList({ comments }) {
//   return (
//     <>
//       <div className="space-y-4">
//         {[...comments].map((comment, i) => (
//           <CommentCard key={i} comment={comment} />
//         ))}
//       </div>
//     </>
//   );
// }

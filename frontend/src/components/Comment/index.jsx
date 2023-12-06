/* eslint-disable react/prop-types */
import { useGetComments } from "../../libs/query/queries";
import CommentList from "./CommentList";

export default function Comments({ postId }) {
  const {
    data: axiosReponseData,
    isPending,
    isError,
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
    <div className="my-4 ">
      <CommentList comments={axiosReponseData.data.payload.comments} />
    </div>
  );
}

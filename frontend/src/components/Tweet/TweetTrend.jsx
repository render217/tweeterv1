import { Link } from "react-router-dom";
import { useGetAllTags } from "../../libs/query/queries";

/* eslint-disable react/prop-types */
export default function TweetTrend() {
  const { data: axiosResponse, isError, isPending } = useGetAllTags();
  if (isPending && !isError) {
    return <p>loading..</p>;
  }
  if (isError) {
    return <p>Error</p>;
  }

  return (
    <div className="rounded-md bg-white">
      <div className="p-4">
        <p className="text-lg font-medium">Trends for you</p>
        <hr className="mb-3 mt-2 border" />
        {axiosResponse.data.payload.tags?.length > 0 ? (
          <>
            {axiosResponse.data.payload.tags.map((tag) => (
              <TrendCard key={tag.tag} title={tag.tag} no={tag.count} />
            ))}
            <Link to={"/explore"} state={{ selected: 3 }}>
              <p className=" mt-2 cursor-pointer text-center text-xs underline hover:scale-105">
                see more
              </p>
            </Link>
          </>
        ) : (
          <p>Empty</p>
        )}
      </div>
    </div>
  );
}

function TrendCard({ title, no }) {
  return (
    <div className="mb-3">
      <p className=" mb-1 cursor-pointer text-sm  font-semibold transition-all duration-300 hover:underline">
        #{title}
      </p>
      <p className="text-xs text-clrGunSmoke ">
        {no} {no > 1 ? "Tweets" : "Tweet"}
      </p>
    </div>
  );
}

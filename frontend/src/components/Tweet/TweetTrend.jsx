/* eslint-disable react/prop-types */
export default function TweetTrend() {
  return (
    <div className="rounded-md bg-white">
      <div className="p-4">
        <p className="text-lg font-medium">Trends for you</p>
        <hr className="mb-3 mt-2 border" />
        <TrendCard title="#Welcome" no={1} />
        <TrendCard title="#Greet" no={10} />
        <TrendCard title="#Frontend" no={120} />
      </div>
    </div>
  );
}

function TrendCard({ title, no }) {
  return (
    <div className="mb-3">
      <p className=" mb-1 cursor-pointer text-sm  font-semibold transition-all duration-300 hover:underline">
        {title}
      </p>
      <p className="text-clrGunSmoke text-xs ">
        {no} {no > 1 ? "Tweets" : "Tweet"}
      </p>
    </div>
  );
}

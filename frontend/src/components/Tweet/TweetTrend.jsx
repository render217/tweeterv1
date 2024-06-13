import { useGetAllTags } from "../../libs/query/queries";
import { useState } from "react";
import Modal from "../Modal";
import useOutsideClick from "../../hooks/useOutsideClick";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
/* eslint-disable react/prop-types */
export default function TweetTrend() {
  const { data: axiosResponse, isError, isPending } = useGetAllTags();
  const [showMore, setShowMore] = useState(false);
  const closeShowMore = () => {
    setShowMore(false);
  };
  const outsideModalRef = useOutsideClick(closeShowMore);
  if (isPending && !isError) {
    return <p>loading..</p>;
  }
  if (isError) {
    return <p>Error</p>;
  }

  return (
    <>
      <div className="rounded-md bg-white">
        <div className="p-4">
          <p className="text-lg font-medium">Trends for you</p>
          <hr className="mb-3 mt-2 border" />
          {axiosResponse.data.payload.tags?.length > 0 ? (
            <>
              {axiosResponse.data.payload.tags.slice(0, 5).map((tag) => (
                <TrendCard key={tag.tag} title={tag.tag} no={tag.count} />
              ))}
              <p
                onClick={() => setShowMore(true)}
                className=" mt-2 cursor-pointer text-center text-xs underline hover:scale-105">
                see more
              </p>
            </>
          ) : (
            <p className="text-center text-sm">No Trends Yet</p>
          )}
        </div>
      </div>
      {showMore && (
        <Modal>
          <div className="h-full max-sm:px-[3%]">
            <div
              ref={outsideModalRef}
              className="mx-auto mt-36  max-h-[70%] min-h-[400px]  overflow-y-auto rounded-md bg-white p-4 max-sm:w-[90%] sm:w-[80%] md:max-w-2xl">
              <div className="flex items-center justify-between">
                <h1 className="text-sm md:text-lg">More trends</h1>
                <FontAwesomeIcon
                  onClick={() => closeShowMore()}
                  className="cursor-pointer text-xl"
                  icon={faClose}
                />
              </div>
              <hr className="my-2 border" />
              <div>
                {axiosResponse.data.payload.tags.map((tag) => (
                  <TrendCard key={tag.tag} title={tag.tag} no={tag.count} />
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function TrendCard({ title, no }) {
  const navigate = useNavigate();
  const onTrendItemClicked = () => {
    navigate("/explore", { state: { selected: 2, searchTerm: `#${title}` } });
  };
  return (
    <div className="mb-3">
      <p
        onClick={onTrendItemClicked}
        className=" mb-1 cursor-pointer text-sm  font-semibold transition-all duration-300 hover:underline">
        #{title}
      </p>
      <p className="text-xs text-clrGunSmoke ">
        {no} {no > 1 ? "Tweets" : "Tweet"}
      </p>
    </div>
  );
}

/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Follow } from "../Actions";
import CONSTANTS from "../../constants";

export default function UserCard({
  showBio = false,
  showBanner = false,
  user,
}) {
  const {
    _id: userId,
    username,
    bio,
    coverImage,
    profileImage,
    followers,
    isFollowed,
  } = user;
  return (
    <div className="rounded-lg border bg-white p-3">
      <div className="flex flex-wrap items-center justify-start gap-2   ">
        <div className="h-11 w-11 overflow-hidden rounded-2xl">
          <img
            className="object-fit h-full w-full"
            src={
              `${CONSTANTS.publicURL}${profileImage}` ||
              "/images/profile_img.jpg"
            }
            alt=""
          />
        </div>
        <div className="">
          <p className="mb-1 text-sm font-semibold hover:underline">
            <Link to={`/profile/${userId}`}>
              {username || "Beamlak Samson"}
            </Link>
          </p>
          <p className="text-xs text-clrGunSmoke">{`${followers.length} followers`}</p>
        </div>
        <div className="flex-1"></div>
        <div className=" ">
          <Follow isFollowed={isFollowed} userId={userId} />
        </div>
      </div>

      <div className="hidden py-2 md:block">
        {showBio && (
          <p className="py-2 text-xs text-clrGreyChateau">
            {bio ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias culpaad"}
          </p>
        )}
        {showBanner && (
          <div className="h-24 overflow-hidden rounded-xl">
            <img
              className="w-full object-fill"
              src={
                CONSTANTS.publicURL + coverImage || "/images/background-1.jpg"
              }
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faCircleUser,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { NavLink } from "react-router-dom";
import { INITIAL_USER, useAuth } from "../../../context/AuthContext";
import { CookieStorage } from "../../../utils";
import CONSTANTS from "../../../constants";
export function Setting() {
  const [showOption, setShowOption] = useState(false);
  const closeOption = () => setShowOption(false);
  const openOption = () => setShowOption(true);
  const ref = useOutsideClick(closeOption);

  const { user, setUser, setIsAuthenticated } = useAuth();
  const handleLogout = () => {
    setUser(INITIAL_USER);
    setIsAuthenticated(false);
    CookieStorage.clearCookie("token");
  };

  return (
    <>
      <div className="relative flex items-center gap-2 py-2 text-xs">
        <div
          className="h-10 w-10 cursor-pointer overflow-hidden rounded-full"
          onClick={openOption}>
          {/* <img className="object-fill" src="/images/profile_img.jpg" alt="" /> */}
          <img
            className="object-fill"
            src={CONSTANTS.publicURL + user?.profileImage}
            alt=""
          />
        </div>
        <div
          onClick={openOption}
          className="flex cursor-pointer items-center max-xs:hidden">
          <p className="max-w-[160px] truncate  text-xs">
            {user.username.substring(0, 1).toUpperCase() +
              user.username.substring(1)}
          </p>
          <FontAwesomeIcon
            icon={faAngleDown}
            className="text-md mx-0.5 h-4 w-4 cursor-pointer rounded-full p-2 font-semibold   hover:bg-clrFrenchGrey/40"
          />
        </div>
        {showOption && (
          <div
            ref={ref}
            className="absolute right-0 top-8 w-40 select-none rounded-md border bg-white p-2 shadow-md">
            <NavLink
              to={`/profile/${user._id}`}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-clrFrenchGrey/20"
                    : " hover:bg-clrFrenchGrey/20"
                } flex  cursor-pointer gap-2 rounded-sm  px-2 py-2 font-semibold`
              }>
              <FontAwesomeIcon className="text-lg " icon={faCircleUser} />
              <p>My Profile</p>
            </NavLink>
            <NavLink
              to={`/setting`}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "bg-clrFrenchGrey/20"
                    : " hover:bg-clrFrenchGrey/20"
                } flex  cursor-pointer gap-2 rounded-sm  px-2 py-2 font-semibold`
              }>
              <FontAwesomeIcon className="text-lg " icon={faGear} />
              <p>Settings</p>
            </NavLink>

            <hr className="my-1 border" />
            <div
              onClick={handleLogout}
              className="flex cursor-pointer gap-2 rounded-sm px-2 py-2   font-semibold text-clrValentineRed hover:bg-clrFrenchGrey/20">
              <FontAwesomeIcon
                className="text-lg  "
                icon={faRightFromBracket}
              />
              <p>Logout</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

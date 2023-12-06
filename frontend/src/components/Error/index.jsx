/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function ErrorMessage({
  title,
  detail,
  navigateToLink,
  navigateToDesc,
}) {
  return (
    <div className="mt-[3.5rem] font-Poppins lg:mt-14">
      <div className="mx-auto grid max-w-7xl place-content-center gap-2 px-[2%] py-5 text-center ">
        <h1 className="text-lg max-sm:text-base">{title}</h1>
        <div className="text-sm max-sm:text-xs">
          <p>{detail}</p>
          <Link
            to={navigateToLink}
            className="mt-2 block font-semibold underline">
            {navigateToDesc}
          </Link>
        </div>
      </div>
    </div>
  );
}

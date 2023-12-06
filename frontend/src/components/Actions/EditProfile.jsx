/* eslint-disable react/prop-types */
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EditProfile({ onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="bg-clrClearBlue flex w-fit cursor-pointer items-center justify-center gap-2 rounded-md  px-2 py-1.5 text-xs text-white max-sm:mx-auto ">
        <FontAwesomeIcon icon={faEdit} />
        <p>Edit Profile</p>
      </div>
    </>
  );
}

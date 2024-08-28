/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import useTextAreaResize from "../../hooks/useTextAreaResize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { checkImageValidity } from "../../utils";
import { toast } from "react-toastify";

export default function ProfileForm({
  userData,
  onSubmit,
  isUpdating,
  onChangeScrollDown,
}) {
  const [bio, setBio] = useState(userData.bio || "");
  // const [name, setName] = useState(userData.name || "");
  const [username, setUsername] = useState(userData.username || "");

  const [profileImage, setProfileImage] = useState(
    userData.profileImage || "/images/profile_img.jpg"
  );
  const [bannerImage, setBannerImage] = useState(
    userData.coverImage || "/images/background-1.jpg"
  );

  const [showBannerPreview, setShowBannerPreview] = useState(false);
  const [showProfilePreview, setShowProfilePreview] = useState(false);
  //
  const [bannerImagePreview, setBannerImagePreview] = useState();
  const [profileImagePreview, setProfileImagePreview] = useState();
  //
  const bioRef = useTextAreaResize(bio);
  const bannerImageRef = useRef(null);
  const profileImageRef = useRef(null);
  //

  //
  const [onBannerHover, setOnBannerHover] = useState(false);
  const [profileHover, setProfileHover] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // console.log("profile payload", {
    //   bio,
    //   username,
    //   profileImage,
    //   bannerImage,
    // });
    onSubmit({
      bio,
      username,
      profileImage: profileImagePreview ? profileImage : null,
      coverImage: bannerImagePreview ? bannerImage : null,
    });
  };

  return (
    <>
      <div className="">
        <div className="relative mb-4 h-40">
          <div
            onClick={() => {
              bannerImageRef.current.click();
            }}
            onMouseMove={() => setOnBannerHover(true)}
            onMouseLeave={() => setOnBannerHover(false)}
            className={`group absolute inset-0 grid cursor-pointer place-content-center overflow-hidden rounded-xl bg-gradient-to-l from-blue-950 to-pink-800  `}>
            {!showBannerPreview && (
              <img
                className="absolute inset-0 h-full w-full object-cover group-hover:brightness-50"
                src={bannerImage}
                alt=""
              />
            )}
            {showBannerPreview && (
              <img
                className="absolute inset-0 h-full w-full object-cover group-hover:brightness-50"
                src={bannerImagePreview}
                alt=""
              />
            )}
            <input
              onChange={(e) => {
                // console.log(e.target.files[0]);
                const isValid = checkImageValidity(e.target.files[0].type);
                if (!isValid) {
                  toast.error("Only Image is allowed");
                  return;
                }
                setBannerImage(e.target.files[0]);
                // logic to show banner preview
                setShowBannerPreview(true);
                setBannerImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
              ref={bannerImageRef}
              max={1}
              type="file"
              className=" hidden"
            />
            {onBannerHover && (
              <FontAwesomeIcon
                icon={faImage}
                onMouseMove={() => setOnBannerHover(true)}
                onMouseLeave={() => setOnBannerHover(false)}
                className="z-20 text-2xl text-clrVistaWhite/90 "
              />
            )}
          </div>

          <div
            onClick={() => {
              profileImageRef.current.click();
            }}
            onMouseMove={() => setProfileHover(true)}
            onMouseLeave={() => setProfileHover(false)}
            className="group absolute left-5 top-16 z-30 grid h-28 w-28 cursor-pointer place-content-center overflow-hidden rounded-lg  border-4   border-white bg-gradient-to-tr from-sky-200 to-blue-800">
            {!showProfilePreview && (
              <img
                className="absolute inset-0 h-full w-full object-cover group-hover:brightness-50"
                src={profileImage}
                alt=""
              />
            )}
            {showProfilePreview && (
              <img
                className="absolute inset-0 h-full w-full object-cover group-hover:brightness-50"
                src={profileImagePreview}
                alt=""
              />
            )}
            <input
              onChange={(e) => {
                // console.log(e.target.files[0]);
                const isValid = checkImageValidity(e.target.files[0].type);
                if (!isValid) {
                  alert("Only upload Image");
                  return;
                }
                setProfileImage(e.target.files[0]);
                // logic to show profile preview
                setShowProfilePreview(true);
                setProfileImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
              ref={profileImageRef}
              type="file"
              className="hidden"
              max={1}
            />
            {profileHover && (
              <FontAwesomeIcon
                icon={faImage}
                className="z-40 text-2xl text-clrVistaWhite/90"
              />
            )}
          </div>
        </div>
      </div>
      <form onSubmit={handleOnSubmit}>
        {/* <input
          className="my-2 h-10  w-full  rounded-md  border-2 px-2  py-1 text-sm text-clrDarkGrey focus:outline-clrGunSmoke"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}

        <input
          className="my-2 h-10  w-full rounded-md  border-2 px-2 py-1 text-sm text-clrDarkGrey focus:outline-clrGunSmoke "
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <textarea
          placeholder="Bio"
          ref={bioRef}
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
            onChangeScrollDown();
          }}
          className="my-2 w-full resize-none overflow-hidden  rounded-md  border-2 px-2 py-2 text-sm  text-clrDarkGrey  focus:outline-clrGunSmoke"
        />

        <button
          disabled={isUpdating}
          type="submit"
          className="flex w-20 cursor-pointer items-center
        justify-center gap-2 rounded-md bg-clrClearBlue px-2 py-1.5 text-xs
        text-white max-sm:mx-auto"
          style={{
            opacity: isUpdating ? 0.5 : 1,
            cursor: isUpdating ? "not-allowed" : "",
          }}>
          Save
        </button>
      </form>
    </>
  );
}

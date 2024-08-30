/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useReducer, useRef, useState } from "react";
import { EditProfile, Follow } from "../../components/Actions";
import TweetFeed from "../../components/Tweet/TweetFeed";
import Nav from "../../components/Navs/Nav";
import Modal from "../../components/Modal";
import useOutsideClick from "../../hooks/useOutsideClick";
import ProfileForm from "../../components/forms/ProfileForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Followers from "../../components/Users/Followers";
import {
  INITAL_STATE,
  modal_reducer,
  closeModal,
  openEditProfile,
  closeEditProfile,
  openShowFollowers,
  openShowFollowing,
  openShowProfilePic,
  closeShowProfilePic,
} from "./reducer";
import Following from "../../components/Users/Following";
import { useAuth } from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import {
  useGetProfileByUserId,
  useUpdateProfile,
} from "../../libs/query/queries";
import { LoadingProgress } from "../../components/Loading";
import PageWrapper from "../../components/PageWrapper";
import ErrorMessage from "../../components/Error";
import { toast } from "react-toastify";
import TweetBookmarkFeed from "../../components/Tweet/TweetBookmarkFeed";
import CONSTANTS from "../../constants";
export default function Profile() {
  //============================================================
  //============================================================
  const options = [
    { id: 1, link: "Tweets" },
    { id: 2, link: "TweetAndReplies" },
    { id: 3, link: "Media" },
    { id: 4, link: "Likes" },
  ];
  const [selected, setSelected] = useState(1);
  const onSelect = (selectedId) => setSelected(selectedId);

  const [
    { showEditProfile, showFollowers, showFollowing, showProfilePic },
    dispatch,
  ] = useReducer(modal_reducer, INITAL_STATE);

  const handleModalClose = () => closeModal(dispatch);
  const outsideModalRef = useOutsideClick(handleModalClose);
  const [scrollDown, setScrollDown] = useState(false);
  //============================================================
  //============================================================
  const onChangeScrollDown = () => {
    setScrollDown(!scrollDown);
  };
  useEffect(() => {
    let scrollElement = outsideModalRef.current;
    if (scrollElement) {
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [showEditProfile, scrollDown]);

  const { user, setUser } = useAuth();
  const { id } = useParams();

  const {
    data: axiosResponse,
    isPending,
    isError,
    error,
    refetch,
  } = useGetProfileByUserId(id || "");

  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateProfile();

  useEffect(() => {
    handleModalClose();
  }, [id]);

  if (isPending && !isError) {
    return (
      <>
        <div className=" mt-[3.5rem] lg:mt-14">
          <LoadingProgress />
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <ErrorMessage
          title="Sorry, this page isn't available"
          detail=" The link you followed may be broken, or the page may have been
            removed."
          navigateToLink="/home"
          navigateToDesc=" Go back to Tweeter"
        />
      </>
    );
  }

  const {
    _id: userId,
    bio,
    coverImage,
    profileImage,
    followers,
    following,
    username,
    isFollowed,
  } = axiosResponse.data.payload.user;
  // console.log(`profile of ${username}`, axiosResponse.data.payload);
  const handleEditProfileSubmit = async (payload) => {
    const { bio, username, profileImage, coverImage } = payload;
    // console.log({ bio, username, profileImage, coverImage });
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("username", username);
    if (profileImage !== null) {
      formData.append("profileImage", profileImage);
    }
    if (coverImage !== null) {
      formData.append("coverImage", coverImage);
    }

    try {
      const { data } = await updateProfile(formData);
      // console.log(data.payload);
      setUser((user) => ({
        ...user,
        username: data.payload.user.username,
        profileImage: data.payload.user.profileImage,
        coverImage: data.payload.user.coverImage,
        bio: data.payload.user.bio,
      }));
      toast.success(data.message);
      refetch();
      closeEditProfile(dispatch);
    } catch (error) {
      // console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong while updating your profile"
      );
    }
  };

  return (
    <>
      <CustomPageWrapper>
        <div className="relative mt-10 h-72 w-full bg-gradient-to-r from-blue-900 to-pink-800 ">
          <div className="absolute h-full w-full">
            <img
              className="h-full w-full object-cover"
              src={coverImage || "/images/background-1.jpg"}
              alt=""
            />
          </div>
          <div className="absolute top-64 w-full">
            <Wrapper>
              <div className=" w-full rounded-md bg-white">
                <div className="flex  gap-5  px-4 py-5 max-sm:flex-col max-sm:gap-2">
                  <div className="h-20 sm:h-20 sm:w-32">
                    <div className="relative -top-14 max-sm:left-1/2 max-sm:right-1/2 max-sm:-translate-x-1/2">
                      <div className="h-32 w-32 overflow-hidden rounded-2xl  border-4 border-white max-sm:mx-auto">
                        <img
                          onClick={() => openShowProfilePic(dispatch)}
                          className="h-full w-full cursor-pointer object-cover"
                          src={profileImage || "/images/profile_img.jpg"}
                          alt="profile image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center max-sm:flex-col max-sm:gap-2">
                      <div className=" flex items-center max-md:flex-col max-md:items-start max-sm:gap-2 ">
                        <h3 className="w-full text-xl font-semibold max-sm:text-center  max-sm:text-lg  md:mr-5 ">
                          {user.username.substring(0, 1).toUpperCase() +
                            user.username.substring(1)}
                        </h3>

                        <div className="flex flex-1 items-center gap-3   max-sm:justify-center">
                          <p className="space-x-1 text-xs">
                            <span className="font-medium">
                              {followers.length}
                            </span>
                            <span
                              onClick={() => openShowFollowers(dispatch)}
                              className="cursor-pointer text-clrGunSmoke hover:underline">
                              Followers
                            </span>
                          </p>
                          <p className="space-x-1 text-xs">
                            <span className="font-medium">
                              {following.length}
                            </span>
                            <span
                              onClick={() => openShowFollowing(dispatch)}
                              className="cursor-pointer text-clrGunSmoke hover:underline">
                              Following
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="hidden sm:ml-auto sm:block">
                        {user._id === userId ? (
                          <EditProfile
                            onClick={() => openEditProfile(dispatch)}
                          />
                        ) : (
                          <Follow isFollowed={isFollowed} userId={userId} />
                        )}
                      </div>
                    </div>
                    <div className="mb-2 mt-4 max-w-lg">
                      <p className=" text-sm">
                        {bio || "---"}
                        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Tenetur similique dolorum iure est rerum facilis nulla
                        perspiciatis quae ab consequatur. */}
                      </p>
                    </div>

                    <div className="hidden max-sm:block">
                      {user._id === userId ? (
                        <EditProfile
                          onClick={() => openEditProfile(dispatch)}
                        />
                      ) : (
                        <Follow isFollowed={isFollowed} userId={userId} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" my-4 flex gap-8  max-lg:flex-col max-lg:gap-6">
                <div className="h-60 w-full bg-white lg:w-80">
                  <Nav
                    onSelect={onSelect}
                    selected={selected}
                    options={options}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex-1">
                    {selected === 1 && (
                      <TweetBookmarkFeed
                        userId={userId}
                        type={options[0].link}
                      />
                    )}
                    {selected === 2 && (
                      <TweetBookmarkFeed
                        userId={userId}
                        type={options[1].link}
                      />
                    )}
                    {selected === 3 && (
                      <TweetBookmarkFeed
                        userId={userId}
                        type={options[2].link}
                      />
                    )}
                    {selected === 4 && (
                      <TweetBookmarkFeed
                        userId={userId}
                        type={options[3].link}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Wrapper>
          </div>
        </div>
      </CustomPageWrapper>

      {(showFollowers || showFollowing) && (
        <Modal>
          <div className="h-full max-sm:px-[3%]">
            <div
              ref={outsideModalRef}
              className="mx-auto mt-36  max-h-[70%] min-h-[400px]  overflow-y-auto rounded-md bg-white p-4 max-sm:w-[90%] sm:w-[80%] md:max-w-2xl">
              <div className="flex items-center justify-between">
                <h1 className="text-sm md:text-lg">
                  {showFollowing &&
                    (userId === user._id
                      ? "You are following"
                      : `${username} is following`)}
                  {showFollowers &&
                    (userId === user._id
                      ? "You are followed by"
                      : `${username} is followed by `)}
                </h1>
                <FontAwesomeIcon
                  onClick={() => closeModal(dispatch)}
                  className="cursor-pointer text-xl"
                  icon={faClose}
                />
              </div>
              <hr className="my-2 border" />
              <div>
                {showFollowing && (
                  <Following
                    isCurrentUser={userId === user._id}
                    userId={userId}
                  />
                )}
                {showFollowers && (
                  <Followers
                    isCurrentUser={userId === user._id}
                    userId={userId}
                  />
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {showEditProfile && (
        <Modal>
          <div className="h-full max-sm:px-[3%]  ">
            <div
              ref={outsideModalRef}
              className="mx-auto mt-36 h-full max-h-[60%] w-[90%] max-w-2xl overflow-y-auto rounded-md bg-white p-4">
              <div className="flex items-center justify-between">
                <h1 className="sm:text-lg">Profile</h1>
                <FontAwesomeIcon
                  onClick={() => closeModal(dispatch)}
                  className="cursor-pointer text-xl"
                  icon={faClose}
                />
              </div>
              <hr className="my-2 border" />
              <div>
                <ProfileForm
                  userData={axiosResponse.data.payload.user}
                  onSubmit={handleEditProfileSubmit}
                  isUpdating={isUpdating}
                  onChangeScrollDown={onChangeScrollDown}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

      {showProfilePic && (
        <Modal>
          <div className="h-full max-sm:px-[3%]">
            <div className=" mx-auto mt-36 h-full max-h-[60%] w-[90%] max-w-2xl overflow-y-auto rounded-xl  bg-white/20 p-4">
              <div className="grid h-full place-content-center">
                <div
                  className="h-56 w-56 overflow-hidden rounded-2xl  max-sm:mx-auto"
                  ref={outsideModalRef}>
                  <img
                    className="h-full w-full cursor-pointer object-cover"
                    src={profileImage}
                    alt="profile image"
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function CustomPageWrapper({ children }) {
  return (
    <>
      <div className="custom-scroll mb-16 ">
        <div className="font-Poppins">{children}</div>
      </div>
    </>
  );
}

function Wrapper({ children }) {
  return (
    <>
      <div className="mx-auto max-w-6xl max-lg:max-w-4xl">
        <div className="px-[1%] max-lg:px-[3%]">{children}</div>
      </div>
    </>
  );
}

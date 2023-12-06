import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faImage,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import useTextAreaResize from "../../hooks/useTextAreaResize";
import { checkImageValidity, filterForTagFromContent } from "../../utils";
import { useCreatePost } from "../../libs/query/queries";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
const AUDIENCE = { everyone: "everyone", following: "following" };
export default function CreateTweet() {
  const { user } = useAuth();
  const [showOption, setShowOption] = useState(false);

  // our form
  const [audience, setAudience] = useState(AUDIENCE.everyone);
  const [tweet, setTweet] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  //

  const closeOption = () => setShowOption(false);
  const openOption = () => setShowOption(true);

  const chooseOption = (type) => () => {
    setAudience(type);
    closeOption();
  };
  const optionRef = useOutsideClick(closeOption);
  const tweetRef = useTextAreaResize(tweet);
  const imageRef = useRef();

  const [showImagePreview, setShowImagePreview] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const { mutateAsync: uploadPost, isPending } = useCreatePost();

  const handleSubmitTweet = async (e) => {
    e.preventDefault();

    const tags = filterForTagFromContent(tweet);
    // console.log("tweet payload", {
    //   content: tweet,
    //   image: tweetImage,
    //   audience: audience,
    //   tags: tags,
    // });
    const formData = new FormData();
    formData.append("content", tweet);
    formData.append("audience", audience);
    formData.append("image", tweetImage);
    formData.append("tags", tags);
    try {
      const { data } = await uploadPost(formData);
      console.log("createTweet Response", data);
      toast.success(data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }

    setTweet("");
    setTweetImage("");
    setShowImagePreview(false);
  };

  return (
    <>
      <form onSubmit={handleSubmitTweet}>
        <div className="rounded-xl bg-white p-4">
          <p className="text-lg font-medium">Tweet Something</p>
          <hr className="mb-3 mt-2 border" />

          <div className="mb-3 flex gap-2">
            <div className="h-12 w-12 overflow-hidden rounded-2xl">
              <img
                className="object-fit h-full w-full"
                // src="./images/profile_img.jpg"
                src={user.profileImage}
                alt=""
              />
            </div>
            <textarea
              ref={tweetRef}
              className="block w-full resize-none overflow-hidden border p-2 outline-none "
              name="tweet"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              placeholder="Tweet Something"
              rows="2"></textarea>
          </div>
          {showImagePreview && (
            <div className="h-60 w-full overflow-hidden">
              <img
                className="h-full w-full object-contain"
                src={imagePreview}
                alt=""
              />
            </div>
          )}
          <div className=" flex">
            <div className="relative flex w-72 items-center gap-4">
              {/* image file uploader */}
              <div
                onClick={() => {
                  imageRef.current.click();
                }}
                className="cursor-pointer text-lg text-clrClearBlue">
                <FontAwesomeIcon icon={faImage} />
                <input
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    const isValid = checkImageValidity(e.target.files[0].type);
                    if (!isValid) {
                      alert("Image is only allowed");
                      return;
                    }
                    setTweetImage(e.target.files[0]);
                    setShowImagePreview(true);
                    setImagePreview(URL.createObjectURL(e.target.files[0]));
                  }}
                  ref={imageRef}
                  type="file"
                  max={1}
                  className="hidden"
                />
              </div>

              {/* audience option  */}
              {audience === AUDIENCE.everyone && (
                <div
                  onClick={openOption}
                  className="flex cursor-pointer items-center gap-2 text-lg text-clrClearBlue">
                  <FontAwesomeIcon icon={faGlobe} />
                  <p className="text-sm max-sm:text-xs">Everyone can replay</p>
                </div>
              )}

              {audience === AUDIENCE.following && (
                <div
                  onClick={openOption}
                  className="flex cursor-pointer items-center gap-2 text-lg text-clrClearBlue">
                  <FontAwesomeIcon icon={faUserGroup} />
                  <p className="text-sm  max-sm:text-xs">
                    People you follow can replay
                  </p>
                </div>
              )}

              {showOption && (
                <div
                  ref={optionRef}
                  className="absolute -right-24 top-8  w-64 rounded-lg border bg-white p-3 shadow-md ">
                  <div className="mb-1">
                    <p className="text-sm font-semibold">Who can reply?</p>
                    <p className="text-sm font-light text-clrGunSmoke">
                      Choose who can replay to this Tweet.
                    </p>
                  </div>
                  <div
                    onClick={chooseOption(AUDIENCE.everyone)}
                    className="mb-1 flex  cursor-pointer items-center gap-2 rounded-md p-3 text-sm transition-all duration-300 hover:bg-clrFrenchGrey/30 ">
                    <FontAwesomeIcon icon={faGlobe} />
                    <p>Everyone</p>
                  </div>
                  <div
                    onClick={chooseOption(AUDIENCE.following)}
                    className="mb-1 flex  cursor-pointer items-center gap-2 rounded-md p-3 text-sm transition-all duration-300 hover:bg-clrFrenchGrey/30 ">
                    <FontAwesomeIcon icon={faUserGroup} />
                    <p>People you follow</p>
                  </div>
                </div>
              )}
            </div>

            <div className="ml-auto space-x-2">
              {(tweet || tweetImage) && (
                <button
                  type="reset"
                  onClick={() => {
                    setTweet("");
                    setTweetImage("");
                    setAudience(AUDIENCE.everyone);
                  }}
                  className="w-20 cursor-pointer rounded-md bg-clrGunSmoke py-2 text-center text-xs text-white">
                  Cancel
                </button>
              )}
              <button
                disabled={isPending}
                type="submit"
                className={`${
                  isPending ? "cursor-not-allowed opacity-40" : ""
                } w-20  rounded-md bg-clrClearBlue py-2 text-center text-xs text-white `}>
                Tweet
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

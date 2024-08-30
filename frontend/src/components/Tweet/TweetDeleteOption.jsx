/* eslint-disable react/prop-types */
import { CircleX, EllipsisVertical, LoaderCircle } from "lucide-react";
import { useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import Modal from "../Modal";
import { useDeletePost } from "../../libs/query/queries";
import { toast } from "react-toastify";

export default function TweetDeleteOption({ tweetId }) {
  const [showOption, setShowOption] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost();

  const closeModal = () => {
    if (isDeleting) return;
    setShowModal(false);
  };

  const openModal = () => setShowModal(true);

  const closeOption = () => setShowOption(false);
  const openOption = () => setShowOption(true);

  const outsideModalRef = useOutsideClick(closeModal);
  const outsideOptionRef = useOutsideClick(closeOption);

  const handleDeleteTweet = () => {
    closeOption();
    openModal();
  };

  const proceedDeleteTweet = async () => {
    try {
      const { data } = await deletePost(tweetId);
      toast.success(data?.message);
      closeModal();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="relative h-full">
      <div
        onClick={openOption}
        className="grid h-full place-content-center px-1 hover:cursor-pointer">
        <EllipsisVertical />
      </div>
      {showOption && (
        <div
          ref={outsideOptionRef}
          className="absolute right-0 top-8 w-28 select-none rounded-md border bg-white p-1 shadow-md">
          <div
            onClick={handleDeleteTweet}
            className="flex cursor-pointer gap-2 rounded-sm px-2 py-2   font-semibold text-clrValentineRed hover:bg-clrFrenchGrey/20">
            <p className="text-xs">Delete Tweet</p>
          </div>
        </div>
      )}
      {showModal && (
        <Modal>
          <div className="grid h-full place-content-center  max-sm:px-[3%]">
            <div
              ref={outsideModalRef}
              className="h-fit rounded-md  bg-white p-5 ">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Delete Tweet</h1>
                <div onClick={closeModal} className="hover:cursor-pointer ">
                  <CircleX className="hover:text-gray-700" />
                </div>
              </div>
              <div className="py-4">
                <p className=" text-clrDavyGrey">
                  Are you sure you want to delete this tweet?
                </p>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  disabled={isDeleting}
                  onClick={closeModal}
                  className="text-clrWhite bg-clrSkyBlue hover:bg-clrSkyBlue/80  h-10 rounded-md border border-gray-300 
                  px-4 py-2 text-sm font-semibold
                  hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-60
                  ">
                  Cancel
                </button>
                <button
                  disabled={isDeleting}
                  onClick={proceedDeleteTweet}
                  className="text-clrWhite grid h-10 w-[80px] place-content-center rounded-md bg-clrValentineRed px-4 py-2 text-sm font-semibold text-white hover:bg-clrValentineRed/80 disabled:cursor-not-allowed disabled:bg-clrValentineRed/80 disabled:opacity-60 ">
                  {isDeleting ? (
                    <LoaderCircle className="size-2 mx-auto animate-spin" />
                  ) : (
                    <p className="text-center text-sm">Delete</p>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

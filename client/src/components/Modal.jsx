import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../features/chat.slice";
import SearchUsers from "./SearchUsers";
import { ArrowBigRight } from "lucide-react";

const Modal = () => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const {
    data: { modalOpen },
  } = useSelector((state) => state.chat);

  const handleClickOutside = (e) => {
    if (
      modalRef.current &&
      modalRef.current.contains(e.target) &&
      ref.current &&
      !ref.current.contains(e.target)
    ) {
      dispatch(setModal(false));
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      ref={modalRef}
      className={`${
        modalOpen ? "flex" : "hidden"
      } absolute top-0 left-0 w-full h-full bg-black/50 z-100 items-center justify-center p-4`}
    >
      <div
        ref={ref}
        className="bg-white dark:bg-gray-900 rounded-md w-full md:w-[500px] h-[600px]"
      >
        <div className="flex justify-between items-center mb-4">
          <div
            className={`${
              !open
                ? "bg-white dark:bg-gray-900 text-black dark:text-white"
                : "bg-gray-200 dark:bg-gray-950/50 text-gray-600 dark:text-gray-400"
            } flex-1 flex items-center justify-center py-4 px-2 cursor-pointer`}
          >
            <h4 className="text-3xl" onClick={() => setOpen(false)}>
              Chats
            </h4>
          </div>
          <div
            className={`${
              open
                ? "bg-white dark:bg-gray-900 text-black dark:text-white"
                : "bg-gray-200 dark:bg-gray-950/50 text-gray-600 dark:text-gray-400"
            } flex-1 flex items-center justify-center py-4 px-2 cursor-pointer`}
          >
            <h4 className="text-3xl " onClick={() => setOpen(true)}>
              Create Group
            </h4>
          </div>
        </div>
        {!open ? <SearchUsers /> : <></>}
      </div>
    </div>
  );
};

export default Modal;

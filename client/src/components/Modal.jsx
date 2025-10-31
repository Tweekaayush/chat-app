import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../features/chat.slice";

const Modal = () => {
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
      ></div>
    </div>
  );
};

export default Modal;

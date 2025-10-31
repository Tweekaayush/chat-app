import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppWrapper from "../components/AppWrapper";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "../components/ChatList";
import { getChats } from "../features/chat.slice";

const ChatLayout = () => {
  const {
    data: {
      singleChat: { _id: chatId },
    },
  } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChats());
  }, []);
  
  return (
    <AppWrapper>
      <div
        className={`${
          chatId ? "hidden lg:block" : "block"
        } h-screen col-span-12 lg:col-span-3 bg-gray-100 dark:bg-white/3 border-r border-gray-300 dark:border-gray-700`}
      >
        <ChatList />
      </div>
      <div
        className={`${
          !chatId ? "hidden lg:block" : "block"
        } h-screen col-span-12 lg:col-span-9`}
      ></div>
    </AppWrapper>
  );
};

export default ChatLayout;

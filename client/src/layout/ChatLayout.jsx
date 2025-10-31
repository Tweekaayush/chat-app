import React from "react";
import { Outlet } from "react-router-dom";
import AppWrapper from "../components/AppWrapper";
import { useSelector } from "react-redux";

const ChatLayout = () => {
  const {
    data: {
      singleChat: { _id: chatId },
    },
  } = useSelector((state) => state.chat);
  return (
    <AppWrapper>
      <div className={`${chatId?'hidden lg:block':'block'}`}></div>
      <div className={`${!chatId?'hidden lg:block':'block'}`}></div>
    </AppWrapper>
  );
};

export default ChatLayout;

import React from "react";
import { ArrowLeft } from "lucide-react";
import { getChatDetails } from "../utils/chat.utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearSingleChat } from "../features/chat.slice";

const ChatHeader = ({ singleChat, user, onlineUsers }) => {
  const { name, avatar, isGroup, isOnline } = getChatDetails(
    singleChat,
    user,
    onlineUsers
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="border-b border-gray-300 dark:border-gray-700 p-4 flex items-center">
      <ArrowLeft
        className="text-gray-700 dark:text-gray-300 mr-4 block lg:hidden cursor-pointer"
        onClick={() => navigate("/chat")}
      />
      <div className="relative w-9 mr-4 border border-gray-600 dark:border-gray-400 rounded-full">
        <img
          src={avatar}
          alt={name}
          className="w-full aspect-square rounded-full"
        />
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="text-sm text-black dark:text-white ellipses">
          {name}
        </h3>
        {isGroup ? (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {singleChat?.participants?.length} Members
          </p>
        ) : isOnline ? (
          <p className="text-xs text-green-500 dark:text-green-400">
            Online
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;

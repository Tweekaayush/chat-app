import React from "react";
import { getChatDetails, getLastMessageText } from "../utils/chat.utils";
import { useNavigate } from "react-router-dom";

const ChatListItem = ({ chat, user }) => {
  const navigate = useNavigate();
  const { name, avatar, isGroup } = getChatDetails(chat, user);
  const { lastMessage } = getLastMessageText(chat, user);
  return (
    <div
      className="flex items-center px-2 py-4 cursor-pointer hover:bg-primary/10"
      onClick={() => navigate(`/chat/${chat._id}`)}
    >
      <div className="relative w-9 mr-4">
        <img
          src={avatar}
          alt={name}
          className="w-full aspect-square rounded-full"
        />
      </div>
      <div>
        <h3 className="text-base text-black dark:text-white">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {lastMessage}
        </p>
      </div>
    </div>
  );
};

export default ChatListItem;

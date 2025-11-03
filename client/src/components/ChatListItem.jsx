import React from "react";
import { getChatDetails, getLastMessageText } from "../utils/chat.utils";
import { useNavigate } from "react-router-dom";

const ChatListItem = ({ chat, user, onlineUsers }) => {
  const navigate = useNavigate();
  const { isOnline, name, avatar, isGroup } = getChatDetails(chat, user, onlineUsers);
  const { lastMessage } = getLastMessageText(chat, user);
  return (
    <div
      className="flex items-center px-2 py-4 cursor-pointer hover:bg-primary/10"
      onClick={() => navigate(`/chat/${chat._id}`)}
    >
      <div className="user-icon mr-4">
        <img src={avatar} alt={name} />
        {!chat?.isGroup && isOnline && <span></span>}
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="text-base text-black dark:text-white ellipses">
          {name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 ellipses">
          {lastMessage}
        </p>
      </div>
    </div>
  );
};

export default ChatListItem;

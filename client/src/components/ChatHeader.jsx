import React from "react";
import { ArrowLeft } from "lucide-react";
import { getChatDetails } from "../utils/chat.utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearSingleChat } from "../features/chat.slice";

const ChatHeader = ({ singleChat, user }) => {
  const { name, avatar, isGroup } = getChatDetails(singleChat, user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="border-b border-gray-300 dark:border-gray-700 p-4 flex items-center">
      <ArrowLeft
        className="text-gray-700 dark:text-gray-300 mr-4 block lg:hidden cursor-pointer"
        onClick={() => [navigate("/chat"), dispatch(clearSingleChat())]}
      />
      <div className="relative w-9 mr-4">
        <img
          src={avatar}
          alt={name}
          className="w-full aspect-square rounded-full"
        />
      </div>
      <div>
        <h3 className="text-base text-black dark:text-white">{name}</h3>
        {isGroup && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {singleChat?.participants?.length} Members
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;

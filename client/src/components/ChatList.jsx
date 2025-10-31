import React, { useState } from "react";
import { Search, SquarePen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import ChatListItem from "./ChatListItem";
import { setModal } from "../features/chat.slice";

const ChatList = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const {
    data: { chats },
  } = useSelector((state) => state.chat);

  const {
    data: { user },
  } = useSelector((state) => state.auth);
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col px-2 py-4 border-b border-gray-300 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-black dark:text-white">
            Chat
          </h2>
          <SquarePen
            onClick={()=>dispatch(setModal(true))}
            className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            className="py-2 pl-10 pr-2 rounded-sm w-full outline-none focus:border-primary border border-gray-400 dark:border-gray-600 placeholder:text-gray-400 text-black dark:text-white dark:placeholder:text-gray-500"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute top-2.5 left-2 w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
      <div className="h-full overflow-y-auto">
        {chats?.length !== 0 ? (
          chats?.map((chat, i) => {
            return <ChatListItem key={chat?._id} chat={chat} user={user} />;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ChatList;

import React from "react";
import { MessageCircleCode } from "lucide-react";
const ChatPage = () => {
  return (
    <div className="w-full h-full flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <MessageCircleCode className="w-10 h-10 text-gray-600 dark:text-gray-400 mb-3" />
        <p className="text-xl text-gray-600 dark:text-gray-400">
          select a chat to start a conversation.
        </p>
      </div>
    </div>
  );
};

export default ChatPage;

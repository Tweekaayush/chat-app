import { Paperclip, Send, X } from "lucide-react";
import React from "react";
import ReplyMessage from "./ReplyMessage";

const ChatInput = ({
  send,
  replyMessage,
  isGroup,
  setNewMessageInfo,
  content,
  handleType
}) => {
  return (
    <>
      {replyMessage?._id && (
        <div className="border-t border-gray-300 dark:border-gray-700 p-4">
          <ReplyMessage
            replyMessage={replyMessage}
            setNewMessageInfo={setNewMessageInfo}
            update={true}
            isGroup={isGroup}
          />
        </div>
      )}
      <div className="p-4 border-t border-gray-300 dark:border-gray-700">
        <form onSubmit={send} className="flex gap-4">
          <button className="px-4 py-2  rounded-full border border-gray-300 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-primary">
            <Paperclip className="w-4 h-4 text-black dark:text-white" />
          </button>
          <input
            type="text"
            name="content"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-sm text-black: dark:text-white p-3 focus:border-blue-600 outline-none"
            placeholder="Type a new message"
            value={content}
            onChange={handleType}
          />
          <button
            type="submit"
            className="bg-primary/90 p-4 rounded-sm cursor-pointer hover:bg-primary"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatInput;

import { Paperclip, Send, X } from "lucide-react";
import React from "react";
import ReplyMessage from "./ReplyMessage";

const ChatInput = ({
  send,
  replyMessage,
  isGroup,
  setNewMessageInfo,
  content,
  handleType,
  loading,
  media,
}) => {
  const handleMedia = (e) => {
    const file = Array.from(e.target.files)[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setNewMessageInfo((prev) => {
          return { ...prev, media: reader.result };
        });
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      {media && (
        <div className="border-t border-gray-300 dark:border-gray-700 p-4">
          <div className="relative h-40 w-fit border border-gray-300 dark:border-gray-700">
            <img
              src={media}
              alt="media"
              className="h-full object-fit object-[50%_50%]"
            />
            <span
              onClick={() =>
                setNewMessageInfo((prev) => {
                  return {
                    ...prev,
                    media: "",
                  };
                })
              }
              className="absolute -top-3 -right-3 bg-gray-900 p-2 rounded-full border border-gray-400 dark:border-gray-600"
            >
              <X className="text-black dark:text-white w-5 h-5" />
            </span>
          </div>
        </div>
      )}
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
          <label
            htmlFor="media"
            className="px-4 py-2 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-primary"
          >
            <Paperclip className="w-4 h-4 text-black dark:text-white" />
            <input
              onChange={handleMedia}
              type="file"
              name="media"
              id="media"
              className="hidden"
            />
          </label>
          <input
            type="text"
            name="content"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-sm text-black: dark:text-white p-3 focus:border-primary outline-none"
            placeholder="Type a new message"
            value={content}
            onChange={handleType}
          />
          <button
            type="submit"
            className="bg-primary/90 p-4 rounded-sm cursor-pointer hover:bg-primary"
            disabled={loading}
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatInput;

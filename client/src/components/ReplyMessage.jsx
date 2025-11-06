import { X } from "lucide-react";
import React from "react";

const ReplyMessage = ({
  replyMessage,
  setNewMessageInfo,
  update = false,
  isGroup,
  message = null,
  user = null,
}) => {
  const incomingMsg = message?.sender?._id === user;
  return (
    <div
      className={`${
        update
          ? "border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-white/3"
          : incomingMsg
          ? "bg-white/10 border-purple-800"
          : "bg-gray-100 dark:bg-white/3 border-gray-300 dark:border-gray-700"
      } flex border-l-5 border rounded-lg p-4`}
    >
      <div className="flex-1">
        {isGroup && (
          <h4
            className={`${
              update
                ? `text-black dark:text-white`
                : incomingMsg
                ? "text-white"
                : "text-black dark:text-white"
            } text-base font-medium text-left`}
          >
            {replyMessage?.sender?.name}
          </h4>
        )}
        {replyMessage?.media && (
          <div className="h-30 w-fit rounded-sm border border-gray-400 dark:border-gray-600 overflow-hidden">
            <img src={replyMessage?.media} alt={replyMessage._id} className="h-full w-full object-fit object-[50%_50%]" />
          </div>
        )}
        <p
          className={`${
            update
              ? "text-gray-800 dark:text-gray-200 ellipses"
              : incomingMsg
              ? "text-white text-right"
              : "text-gray-800 dark:text-gray-200 text-left"
          } text-base`}
        >
          {replyMessage?.content}
        </p>
      </div>
      {update && (
        <X
          className="text-gray-700 dark:text-gray-300 w-4 h-4 cursor-pointer"
          onClick={() =>
            setNewMessageInfo((prev) => {
              return {
                ...prev,
                replyToMessage: null,
              };
            })
          }
        />
      )}
    </div>
  );
};

export default ReplyMessage;

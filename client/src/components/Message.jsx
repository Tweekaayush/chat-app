import { Reply } from "lucide-react";
import React from "react";
import ReplyMessage from "./ReplyMessage";

const Message = ({ message, user, singleChat, setNewMessageInfo }) => {
  const time = new Date(message.createdAt);
  const hour = time.getHours();
  let min = time.getMinutes();
  min = min < 10 ? "0" + min : min;
  const incomingMsg = message?.sender?._id !== user;
  return (
    <div
      className={`${
        incomingMsg ? "self-start" : "self-end"
      } w-fit grid-cols-12 last:mt-auto mb-4 cursor-pointer group flex`}
    >
      <div
        className={`${
          !incomingMsg ? "bg-primary" : "bg-gray-200/70 dark:bg-white/10"
        } px-4 py-2 rounded-md`}
      >
        {incomingMsg && singleChat?.isGroup && (
          <h4 className="text-base font-semibold text-black dark:text-white text-left">
            {message?.sender?.name}
          </h4>
        )}
        {message?.replyTo?._id && (
          <ReplyMessage
            replyMessage={message?.replyTo}
            isGroup={singleChat?.isGroup}
            message={message}
            user={user}
          />
        )}
        <p
          className={`${
            !incomingMsg
              ? "text-white text-right"
              : "text-black dark:text-white"
          } text-base mt-2`}
        >
          {message?.content}
        </p>
        <span
          className={`${
            !incomingMsg ? "text-gray-300" : "text-gray-700 dark:text-gray-300"
          } text-[10px] text-right block`}
        >
          {hour}:{min}
        </span>
      </div>
      {incomingMsg && (
        <div
          className="hidden group-hover:flex items-center justify-center"
          onClick={() =>
            setNewMessageInfo((prev) => {
              return {
                ...prev,
                replyToMessage: message,
              };
            })
          }
        >
          <div className="rounded-full bg-gray-100 dark:bg-white/10 p-2 ml-4">
            <Reply className="w-4 h-4 text-gray-600 dark:text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;

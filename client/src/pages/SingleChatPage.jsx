import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addNewMessage,
  clearSingleChat,
  getChatById,
  sendMessage,
} from "../features/chat.slice";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import Message from "../components/Message";
import { useRef } from "react";

const SingleChatPage = () => {
  let timeout = useRef();
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const [newMessageInfo, setNewMessageInfo] = useState({
    content: "",
    media: "",
    replyToMessage: null,
  });
  const [isTyping, setIsTyping] = useState(false);

  const {
    loading,
    data: { singleChat, messages },
  } = useSelector((state) => state.chat);

  const {
    data: { user, socket, onlineUsers },
  } = useSelector((state) => state.auth);

  const send = (e) => {
    e.preventDefault();
    const { content, media, replyToMessage } = newMessageInfo;
    if (content || media || replyToMessage) {
      socket.emit("chat:stop-typing", chatId);
      dispatch(
        sendMessage({ chatId, content, media, replyToId: replyToMessage?._id })
      );
      setNewMessageInfo({
        content: "",
        media: "",
        replyToMessage: null,
      });
    }
  };

  const handleType = (e) => {
    setNewMessageInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });

    if (!socket) return;
    if (!isTyping) {
      socket.emit("chat:typing", chatId);
    }
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      socket.emit("chat:stop-typing", chatId);
    }, 2000);
  };

  useEffect(() => {
    if (chatId) {
      dispatch(getChatById(chatId));
    }
    return () => dispatch(clearSingleChat());
  }, [chatId]);

  useEffect(() => {
    if (!chatId || !socket) return;
    socket.emit("chat:join", chatId);
    return () => {
      socket.emit("chat:leave", chatId);
    };
  }, [chatId, socket]);

  useEffect(() => {
    if (!chatId) return;
    if (!socket) return;

    const handleNewMessage = (msg) => {
      dispatch(addNewMessage({ chatId, msg }));
    };

    socket.on("message:new", handleNewMessage);
    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, [socket, chatId, addNewMessage]);

  useEffect(() => {
    if (!socket) return;
    socket?.on("chat:typing", () => setIsTyping(true));
    socket?.on("chat:stop-typing", () => setIsTyping(false));
    return () => {
      socket?.off("chat:typing", () => setIsTyping(true));
      socket?.off("chat:stop-typing", () => setIsTyping(false));
    };
  }, [socket]);

  return (
    <div className="h-full flex flex-col">
      <ChatHeader
        singleChat={singleChat}
        user={user}
        onlineUsers={onlineUsers}
        loading={loading}
      />
      <div className="h-full flex flex-col-reverse overflow-y-auto p-4">
        {messages?.length ? (
          <>
            {isTyping && (
              <div
                className={`${
                  isTyping ? "" : ""
                } w-fit flex bg-gray-200/70 dark:bg-white/10 px-2 py-4 rounded-md gap-2`}
              >
                <div
                  className="bg-black dark:bg-white p-0.5 rounded-full animate-typing"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="bg-black dark:bg-white p-0.5 rounded-full animate-typing"
                  style={{ animationDelay: "0.4s" }}
                ></div>
                <div
                  className="bg-black dark:bg-white p-0.5 rounded-full animate-typing delay-1000"
                  style={{ animationDelay: "0.6s" }}
                ></div>
              </div>
            )}
            {messages?.map((message) => {
              return (
                <Message
                  key={message?._id}
                  singleChat={singleChat}
                  message={message}
                  user={user._id}
                  setNewMessageInfo={setNewMessageInfo}
                />
              );
            })}
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-base text-gray-600 dark:text-gray-400">
              Type a message to start the conversation
            </p>
          </div>
        )}
      </div>
      <ChatInput
        send={send}
        replyMessage={newMessageInfo.replyToMessage}
        isGroup={singleChat.isGroup}
        content={newMessageInfo.content}
        setNewMessageInfo={setNewMessageInfo}
        handleType={handleType}
        loading={loading}
        media={newMessageInfo.media}
      />
    </div>
  );
};

export default SingleChatPage;

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
// import Message from "../components/Message";

const SingleChatPage = () => {
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const [newMessageInfo, setNewMessageInfo] = useState({
    content: "",
    media: "",
    replyToMessage: null,
  });
  const [content, setContent] = useState("");
  const [media, setMedia] = useState("");

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
  return (
    <div className="h-full flex flex-col">
      <ChatHeader singleChat={singleChat} user={user} onlineUsers={onlineUsers}/>
      <div className="h-full flex flex-col-reverse overflow-y-auto p-4">
        {messages?.length ? (
          messages?.map((message) => {
            return (
              <Message
                key={message?._id}
                singleChat={singleChat}
                message={message}
                user={user._id}
                setNewMessageInfo={setNewMessageInfo}
              />
            );
          })
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
      />
    </div>
  );
};

export default SingleChatPage;

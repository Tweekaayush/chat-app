import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getChatById, sendMessage } from "../features/chat.slice";
// import ChatHeader from "../components/ChatHeader";
// import ChatInput from "../components/ChatInput";
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
    data: {
      user: { _id },
    },
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
  }, [chatId]);
  return <div>SingleChatPage</div>;
};

export default SingleChatPage;

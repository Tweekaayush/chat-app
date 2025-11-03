const asyncHandler = require("../middleware/async.middleware");
const cloudinary = require("cloudinary");
const Chat = require("../models/chat.model");
const Message = require("../models/message.model");
const { emitNewMessageToChatRoom } = require("../config/socket");

exports.sendMessage = asyncHandler(async (req, res) => {
  const { chatId, content, media, replyToId } = req.body;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    res.status(404);
    throw new Error("Chat not found");
  }

  if (replyToId) {
    const replyMessage = await Message.findOne({
      _id: replyToId,
      chatId,
    });
    if (!replyMessage) {
      res.status(404);
      throw new Error("Reply Message not found");
    }
  }

  let cloudinaryResponse;

  //   if (media) {
  //     cloudinaryResponse = await cloudinary.uploader.upload(media, {
  //       folder: "chat",
  //     });
  //     if (cloudinaryResponse?.secure_url) {
  //       res.status(400);
  //       throw new Error("Failed to upload");
  //     }
  //   }

  const newMessage = await Message.create({
    chatId,
    sender: req.user._id,
    content,
    media: cloudinaryResponse?.secure_url || null,
    replyTo: replyToId || null,
  });

  await newMessage.populate([
    {
      path: "sender",
      select: "name avatar",
    },
    {
      path: "replyTo",
      select: "content media sender",
      populate: {
        path: "sender",
        select: "name avatar",
      },
    },
  ]);

  chat.lastMessage = newMessage._id;

  await chat.save();

  emitNewMessageToChatRoom(req.user._id, chatId, newMessage);
  
  const allParticipantIds = chat.participants.map((id) => id.toString());
  emitLastMessageToParticipants(allParticipantIds, chatId, newMessage);

  res.status(200).json({
    userMessage: newMessage,
    chat,
  });
});

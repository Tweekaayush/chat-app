const asyncHandler = require("../middleware/async.middleware");
const Chat = require("../models/chat.model");
const User = require("../models/user.model");
const Message = require("../models/message.model");

exports.createChat = asyncHandler(async (req, res) => {
  const { participantId, isGroup, participants, groupName } = req.body;
  let chat;
  let allParticipants = [];

  if (isGroup && participants?.length && groupName) {
    allParticipants = [req.user._id, ...participants];
    chat = await Chat.create({
      participants: allParticipants,
      isGroup: true,
      groupName,
      createdBy: req.user._id,
    });
  } else if (participantId) {
    const otherUser = await User.findById(participantId);
    if (!otherUser) {
      res.status(400);
      throw new Error("User not found");
    }

    allParticipants = [req.user._id, participantId];
    const existingChat = await Chat.findOne({
      participants: {
        $all: allParticipants,
        $size: 2,
      },
    }).populate("participants", "name avatar");

    if (existingChat) {
      return res.status(200).json({
        success: true,
        chat: existingChat,
      });
    } else {
      chat = await Chat.create({
        participants: allParticipants,
        isGroup: false,
        createdBy: req.user._id,
      });
    }
  }

  const populatedChat = await chat.populate("participants", "name avatar");
  const particpantIdStrings = populatedChat?.participants?.map((p) => {
    return p._id?.toString();
  });

  emitNewChatToParticpants(particpantIdStrings, populatedChat);

  res.status(200).json({
    success: true,
    chat: populatedChat,
  });
});

exports.getUserChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({
    participants: {
      $in: [req.user._id],
    },
  })
    .populate("participants", "name avatar")
    .populate({
      path: "lastMessage",
      populate: {
        path: "sender",
        select: "name avatar",
      },
    })
    .sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    chats,
  });
});

exports.getSingleChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  const chat = await Chat.findById(chatId).populate(
    "participants",
    "name avatar"
  );

  if (!chat) {
    res.status(404);
    throw new Error("Chat not found");
  }

  const messages = await Message.find({ chatId })
    .populate("sender", "name avatar")
    .populate({
      path: "replyTo",
      select: "content media sender",
      populate: {
        path: "sender",
        select: "name avatar",
      },
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    chat,
    messages,
  });
});

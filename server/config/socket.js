const { Server } = require("socket.io");

let io;
const onlineUsers = new Map();

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      orign: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) onlineUsers[userId] = socket.id;

    io.emit("online:users", Array.from(onlineUsers.keys()));

    socket.on("chat:join", (chatId) => {
      socket.join(`chat:${chatId}`);
      console.log(`User ${userId} left room chat: ${chatId}`);
    });

    socket.on("chat:leave", (chatId) => {
      socket.leave(`chat:${chatId}`);
      console.log(`User ${userId} left room chat:${chatId}`);
    });

    socket.on("disconnect", () => {
      onlineUsers.delete(userId);
      io.emit("online:users", Array.from(onlineUsers.keys()));
      console.log("User Disconnected", socket.id);
    });
  });
};

function getIO() {
  if (!io) throw new Error("Socket.IO not initialized");
  return io;
}

exports.emitNewChatToParticpants = (participantIds, chat) => {
  const io = getIO();
  for (const participantId of participantIds) {
    io.to(`user:${participantId}`).emit("chat:new", chat);
  }
};

exports.emitNewMessageToChatRoom = (senderId, chatId, message) => {
  const io = getIO();
  const senderSocketId = onlineUsers.get(senderId?.toString());

  console.log(senderId, "senderId");
  console.log(senderSocketId, "sender socketid exist");
  console.log("All online users:", Object.fromEntries(onlineUsers));

  if (senderSocketId) {
    io.to(`chat:${chatId}`).except(senderSocketId).emit("message:new", message);
  } else {
    io.to(`chat:${chatId}`).emit("message:new", message);
  }
};

exports.emitLastMessageToParticipants = (
  participantIds,
  chatId,
  lastMessage
) => {
  const io = getIO();
  const payload = { chatId, lastMessage };

  for (const participantId of participantIds) {
    io.to(`user:${participantId}`).emit("chat:update", payload);
  }
};

module.exports = { initializeSocket };

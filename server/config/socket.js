const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

let io = null;
const onlineUsers = new Map();

exports.initializeSocket = (server) => {
  io = new Server(server, {
    pingTimeout: 120000,
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    const rawCookie = socket.handshake.headers.cookie;
    if (!rawCookie) return next(new Error("Unauthorized"));

    const token = rawCookie?.split("=")?.[1]?.trim();

    if (!token) return next(new Error("Unauthorized"));

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) return next(new Error("Unauthorized"));

    socket.userId = decodedToken._id;
    next();
  });

  io.on("connection", (socket) => {
    console.log(`User Connected`, socket.id);

    const userId = socket.userId;
    if (userId) onlineUsers[userId] = socket.id;

    io.emit("online:users", Array.from(Object.keys(onlineUsers)));

    socket.join(`user:${userId}`);
    
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

exports.emitNewChatToParticpants = (participants, chat) => {
  const io = getIO();
  for (const participant of participants) {
    io.to(`user:${participant}`).emit("chat:new", chat);
  }
};

exports.emitNewMessageToChatRoom = (senderId, chatId, message) => {
  const io = getIO();
  const senderSocketId = onlineUsers.get(senderId?.toString());

  if (senderSocketId) {
    io.to(`chat:${chatId}`).except(senderSocketId).emit("message:new", message);
  } else {
    io.to(`chat:${chatId}`).emit("message:new", message);
  }
};

exports.emitLastMessageToParticipants = (participants, chatId, lastMessage) => {
  const io = getIO();
  const payload = { chatId, lastMessage };

  console.log(participants);

  for (const participant of participants) {
    io.to(`user:${participant}`).emit("chat:update", payload);
  }
};

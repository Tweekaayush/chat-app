export const getChatDetails = (chat, user) => {
  let name = "";
  let avatar = "";

  if (!chat.isGroup) {
    chat?.participants?.forEach((p, i) => {
      if (p?._id.toString() !== user) {
        name = p?.name;
        avatar = p?.avatar;
      }
    });
  } else {
    name = chat?.groupName;
    avatar =
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000";
  }
  return { name, avatar, isGroup: chat.isGroup };
};

export const getLastMessageText = (chat, user) => {
  const { lastMessage, isGroup } = chat;

  if (!lastMessage) {
    return {
      lastMessage: isGroup
        ? chat?.createdBy?.toString() === user?.toString()
          ? "Group created"
          : "You were added"
        : "Send a message",
    };
  }
  if (lastMessage?.image) return { lastMessage: "📷 Photo" };

  if (isGroup && lastMessage.sender) {
    return {
      lastMessage: `${
        lastMessage?.sender?._id?.toString() === user?.toString()
          ? "You"
          : lastMessage?.sender?.name
      }: ${lastMessage?.content}`,
    };
  }

  return { lastMessage: lastMessage?.content };
};

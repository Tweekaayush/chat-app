const express = require("express");
const { protected } = require("../middleware/auth.middleware");
const {
  createChat,
  getUserChats,
  getSingleChat,
} = require("../controllers/chat.controller");
const { sendMessage } = require("../controllers/message.controller");

const router = express.Router();

router.get("/all", protected, getUserChats);
router.post("/create", protected, createChat);
router.post("/message/send", protected, sendMessage);
router.get("/:chatId", protected, getSingleChat);

module.exports = router;

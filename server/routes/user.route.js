const express = require("express");
const { protected } = require("../middleware/auth.middleware");
const { getUsers, profile, updateUserById } = require("../controllers/user.controller");

const router = express.Router();

router.get("/me", protected, profile);
router.get("/all", protected, getUsers);
router.put('/:id', protected, updateUserById)

module.exports = router;

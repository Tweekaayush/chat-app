const { generateToken } = require("../../../ecommerce/server/utils/authUtil");
const asyncHandler = require("../middleware/async.middleware");
const User = require("../models/user.model");

exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password, avatar } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already exists with given email.");
  }

  let cloudinaryResponse = null;

  if (avatar) {
    cloudinaryResponse = await cloudinary.uploader.upload(avatar, {
      folder: "chat",
    });
  }

  const newUser = await User.create({
    name,
    email,
    password,
    avatar: cloudinaryResponse?.secure_url || null,
  });

  if (newUser) {
    generateToken(newUser, 201, res);
  } else {
    res.status(401);
    throw new Error("Invalid user credentials.");
  }
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    generateToken(user, 200, res);
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

exports.logout = asyncHandler(async (req, res) => {
  res
    .cookie("token", null, {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now()),
    })
    .status(200)
    .json({
      success: true,
    });
});

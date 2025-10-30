const asyncHandler = require("../middleware/async.middleware");
const User = require("../models/user.model");

exports.profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({
    success: true,
    user,
  });
});

exports.getUsers = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const users = await User.find({ _id: { $ne: _id } }).select("-password");

  res.status(200).json({
    success: true,
    users,
  });
});

exports.updateUserById = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const { email, password, name, avatar, about } = req.body;

  const user = await User.findById(_id);

  user.email = email || user.email;
  user.name = name || user.name;
  user.about = about || user.about;

  if (password) {
    user.password = password;
  }

  if (avatar) {
    const cloudinaryResponse = await cloudinary.uploader.upload(avatar, {
      folder: "chat",
    });
    user.avatar = cloudinaryResponse?.secure_url;
  }

  const updatedUser = await user.save();

  res.json({
    success: true,
    user: updatedUser,
  });
});

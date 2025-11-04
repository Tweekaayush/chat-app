const asyncHandler = require("../middleware/async.middleware");
const User = require("../models/user.model");
const cloudinary = require("cloudinary");

exports.profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({
    success: true,
    user,
  });
});

exports.getUsers = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const keyword = search
    ? {
        _id: {
          $ne: req.user._id,
        },
        $or: [
          {
            name: { $regex: search, $options: "i" },
          },
        ],
      }
    : { _id: { $ne: req.user._id } };

  const users = await User.find(keyword).select("-password").limit(6);

  res.status(200).json({
    success: true,
    users,
  });
});

exports.updateUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { email, password, name, avatar, about } = req.body;

  const user = await User.findById(id);

  user.email = email || user.email;
  user.name = name || user.name;
  user.about = about || user.about;

  if (password) {
    user.password = password;
  }

  if (avatar && avatar !== user?.avatar) {
    const cloudinaryResponse = await cloudinary.uploader.upload(avatar);
    user.avatar = cloudinaryResponse?.secure_url;
  }

  const updatedUser = await user.save();

  res.json({
    success: true,
    user: updatedUser,
  });
});

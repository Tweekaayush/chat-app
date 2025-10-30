const jwt = require("jsonwebtoken");
const asyncHandler = require("./async.middleware");
// const User = require("../models/user.model");

exports.protected = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new Error("Please login to access this resource"));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = await User.findById(decodedData._id).select("-password");

  next();
});

const jwt = require("jsonwebtoken");

exports.generateToken = (user, statusCode, res) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const options = {
    httpOnly: true,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  res
    .cookie("token", token, options)
    .status(statusCode)
    .json({
      success: true,
      user: { ...user._doc, password: null },
    });
};

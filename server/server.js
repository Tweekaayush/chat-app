const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cloudinary = require('cloudinary')
const fileupload = require('express-fileupload')
const { errorHandler, notFound } = require("./middleware/error.middlware");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const chatRoute = require("./routes/chat.route");

const app = express();

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(express.json({limit: '10mb'}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, (req, res) => {
  console.log("Server running on port:", process.env.PORT);
});

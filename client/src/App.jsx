import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { io } from "socket.io-client";
import AuthLayout from "./layout/AuthLayout";
import ChatLayout from "./layout/ChatLayout";
import PrivateRoute from "./routes/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/auth.slice";
import ChatPage from "./pages/ChatPage";
import SingleChatPage from "./pages/SingleChatPage";
import AccountPage from "./pages/AccountPage";
import BaseLayout from "./layout/BaseLayout";
import { setOnlineUsers, setSocket } from "./features/auth.slice";

const App = () => {
  const dispatch = useDispatch();
  const {
    data: { user, socket },
  } = useSelector((state) => state.auth);

  useEffect(() => {}, []);

  useEffect(() => {
    dispatch(loadUser());
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, []);

  useEffect(() => {
    if(socket?.connected) return;

    const newSocket = io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });

    dispatch(setSocket(newSocket));

    newSocket.on("connect", () => {
      console.log("Connected");
    });

    newSocket.on("online:users", (userIds) => {
      dispatch(setOnlineUsers(userIds));
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route element={<BaseLayout />}>
          <Route path="/settings/account" element={<AccountPage />} />
        </Route>
        <Route element={<ChatLayout />}>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:chatId" element={<SingleChatPage />} />
        </Route>
      </Route>
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

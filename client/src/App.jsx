import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { io } from "socket.io-client";
import {
  clearAuthSuccessAndError,
  setOnlineUsers,
  setSocket,
} from "./features/auth.slice";
import BASE_URL from "./constants/constants";
import { ToastContainer, Bounce, toast } from "react-toastify";
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

const App = () => {
  const dispatch = useDispatch();
  const {
    data: { user, socket },
    success,
    error,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthSuccessAndError());
    }
    if (success) {
      toast.success(success);
      dispatch(clearAuthSuccessAndError());
    }
  }, [error, success]);

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
    if (socket?.connected) return;

    const newSocket = io(BASE_URL, {
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
  }, [user]);
  return (
    <>
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default App;

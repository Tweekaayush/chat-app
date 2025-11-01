import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import ChatLayout from "./layout/ChatLayout";
import PrivateRoute from "./routes/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useDispatch } from "react-redux";
import { loadUser } from "./features/auth.slice";
import ChatPage from "./pages/ChatPage";
import SingleChatPage from "./pages/SingleChatPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, []);
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route element={<ChatLayout />}>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:chatId" element={<SingleChatPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;

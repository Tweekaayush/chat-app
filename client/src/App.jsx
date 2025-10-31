import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import ChatLayout from "./layout/ChatLayout";
import PrivateRoute from "./routes/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage/>} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route element={<ChatLayout />}>
          <Route path="/chat" element={<></>} />
          <Route path="/chat/:id" element={<></>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<></>} />
        <Route path="/signup" element={<></>} />
      </Route>
      <Route path="/" element={<></>} />
      <Route path="/chat/:id" element={<></>} />
    </Routes>
  );
};

export default App;

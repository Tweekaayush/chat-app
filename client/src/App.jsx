import React from "react";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<></>} />
      <Route path="/signup" element={<></>} />
      <Route path="/" element={<></>} />
      <Route path="/chat/:id" element={<></>} />
    </Routes>
  );
};

export default App;

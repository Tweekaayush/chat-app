import React from "react";
import Sidebar from "./Sidebar";
import Modal from "./Modal";

const AppWrapper = ({ children }) => {
  return (
    <div className="h-full w-full flex overflow-hidden">
      <Modal/>
      <Sidebar/>
      <main className="h-full w-full grid grid-cols-12">{children}</main>
    </div>
  );
};

export default AppWrapper;

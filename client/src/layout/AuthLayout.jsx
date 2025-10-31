import React from "react";
import { MessageCircleCode } from "lucide-react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center lg:flex-row p-4 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-start mb-4 lg:justify-center lg:flex-1 lg:p-8 lg:mb-0">
        <div className="">
          <MessageCircleCode className="text-gray-800 dark:text-white w-11 h-11 lg:w-75 lg:h-75"/>
        </div>
      </div>
      <div className="flex items-center justify-center lg:flex-1 lg:p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

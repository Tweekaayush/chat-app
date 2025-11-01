import { ArrowLeftIcon, LogOut, User } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth.slice";

const SettingsList = ({ setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRedirect = (e) => {
    setOpen(true);
    navigate(`/settings/${e}`);
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center px-2 py-4 border-b border-gray-300 dark:border-gray-700">
        <ArrowLeftIcon
          className="text-gray-700 dark:text-gray-300 mr-4 block cursor-pointer"
          onClick={() => navigate("/")}
        />
        <h2 className="text-xl font-medium text-black dark:text-white">
          Settings
        </h2>
      </div>
      <ul className="flex flex-col flex-1">
        <li
          className="flex justify-center items-center gap-4 px-2 py-4 cursor-pointer bg-gray-300 dark:bg-gray-700 hover:bg-gray-300/70 dark:hover:bg-gray-700/70 m-2 rounded-sm"
          onClick={() => handleRedirect("account")}
        >
          <User className="w-5 h-5 text-black dark:text-white" />
          <h5 className="text-black dark:text-white">Account</h5>
        </li>
        <li
          className="flex justify-center items-center gap-4 px-2 py-4 cursor-pointer bg-gray-300 dark:bg-gray-700 hover:bg-gray-300/70 dark:hover:bg-gray-700/70 m-2 rounded-sm"
          onClick={() => dispatch(logout())}
        >
          <LogOut className="w-5 h-5 text-black dark:text-white" />
          <h5 className="text-black dark:text-white">Logout</h5>
        </li>
      </ul>
    </div>
  );
};

export default SettingsList;

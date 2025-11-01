import React, { useEffect, useState } from "react";
import {
  LogOut,
  LogOutIcon,
  MessageCircleCode,
  Moon,
  Settings,
  Sun,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth.slice";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: {
      user: { avatar },
    },
  } = useSelector((state) => state.auth);
  const handleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  };
  return (
    <aside className="h-screen w-12 z-99 bg-primary">
      <div className="w-full h-full flex flex-col items-center justify-between px-2 py-4">
        <Link to="/" className="w-8">
          <MessageCircleCode className="text-white w-full h-full" />
        </Link>
        <div className="flex flex-col items-center gap-4">
          <button
            className="nav-icon bg-gray-100 hover:bg-gray-200"
            title="toggle dark theme"
            onClick={handleTheme}
          >
            <Moon className="block dark:hidden" />
            <Sun className="hidden dark:block" />
          </button>
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => {
              setOpen(true);
            }}
            onMouseLeave={() => {
              setOpen(false);
            }}
          >
            <div className="user-icon">
              <img src={avatar} />
              <span></span>
            </div>
            <div className={`${open?'visible opacity-100':'invisible opacity-0'} gap-4 absolute top-0 left-0 ml-8 pl-4 flex transition-all duration-300 ease-in-out`}>
              <button
                className="nav-icon bg-primary/90 hover:bg-primary/80 text-white"
                onClick={() => navigate("/settings/account")}
              >
                <Settings />
              </button>
              <button className="nav-icon bg-primary/90 hover:bg-primary/80 text-white" onClick={() => dispatch(logout())}>
                <LogOutIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

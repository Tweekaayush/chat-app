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

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, []);
  return (
    <aside className="h-screen w-12 z-99 bg-primary">
      <div className="w-full h-full flex flex-col items-center justify-between px-2 py-4">
        <Link to="/" className="w-8">
          <MessageCircleCode className="text-white w-full h-full" />
        </Link>
        <div className="flex flex-col items-center gap-4">
          <button
            className="nav-icon"
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
            <div className={`${open?'flex':'hidden'} gap-2 absolute top-0 left-0 ml-8 pl-4`}>
              <button
                className="nav-icon"
                onClick={() => navigate("/settings")}
              >
                <Settings />
              </button>
              <button className="nav-icon" onClick={() => dispatch(logout())}>
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

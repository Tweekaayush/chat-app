import React, { useState } from "react";
import AppWrapper from "../components/AppWrapper";
import { Outlet } from "react-router-dom";
import SettingsList from "../components/SettingsList";

const BaseLayout = () => {
  const [open, setOpen] = useState(false);
  return (
    <AppWrapper>
      <div
        className={`${
          open ? "hidden lg:block" : "block"
        } h-screen col-span-12 lg:col-span-3 bg-gray-100 dark:bg-white/3 border-r border-gray-300 dark:border-gray-700`}
      >
        <SettingsList setOpen={setOpen} />
      </div>
      <div
        className={`${
          !open ? "hidden lg:block" : "block"
        } h-screen col-span-12 lg:col-span-9`}
      >
        <Outlet />
      </div>
    </AppWrapper>
  );
};

export default BaseLayout;

import SideMenuUser from "@/User/DashBoard/SideMenuUser";
import React from "react";
import { Outlet } from "react-router-dom";

const DashBoardUser = () => {
  return (
    <div className="justify-between items-center gap-5">
      <div className=" w-[100%] bg-slate-400">
        <SideMenuUser></SideMenuUser>
      </div>
      <div className="p-4 w-full min-h-screen bg-slate-600">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoardUser;

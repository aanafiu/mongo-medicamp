import SideMenu from "@/Admin/SideMenu";
import React from "react";
import { Outlet } from "react-router-dom";

const DashBoardAdmin = () => {
  return (
    <div className="flex flex-col md:flex-row h-svh justify-between items-center gap-5">
      <div className="p-4 w-fit md:w-[25%]  min-h-screen bg-slate-400 flex flex-col justify-start relative">
        <SideMenu></SideMenu>
      </div>
      <div className="p-4 w-[80%] min-h-screen bg-slate-600 overflow-x-scroll">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoardAdmin;

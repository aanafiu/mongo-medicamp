import SideMenu from "@/Admin/SideMenu";
import React from "react";
import { Outlet } from "react-router-dom";

const DashBoardAdmin = () => {
  return (
    <div className="flex justify-between items-center gap-5 overflow-scroll">
      <div className="p-4 w-[25%] h-[100vh] bg-slate-400 flex flex-col justify-start">
        <SideMenu></SideMenu>
      </div>
      <div className="p-4 w-[80%] h-[100vh] bg-slate-600">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoardAdmin;

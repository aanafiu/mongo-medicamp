import SideMenu from "@/Admin/SideMenu";
import React from "react";
import { Outlet } from "react-router-dom";

const DashBoardAdmin = () => {
  return (
    <div className="flex justify-between items-center gap-5">
      <div className="p-4 w-[25%] min-h-screen bg-slate-400">
        <SideMenu></SideMenu>
      </div>
      <div className="p-4 w-[80%] min-h-screen bg-slate-600">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoardAdmin;

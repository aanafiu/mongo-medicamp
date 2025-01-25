import SideMenu from "@/Admin/SideMenu";
import React from "react";
import { Outlet } from "react-router-dom";

const DashBoardAdmin = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-5 overflow-hidden">
      <div className="p-4  w-fit md:w-[25%] h-[100vh] glass flex flex-col justify-start relative">
        <SideMenu></SideMenu>
      </div>
      <div className="p-4 w-[80%] h-[100vh] flex justify-center items-start glass overflow-y-scroll">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoardAdmin;

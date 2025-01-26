import SideMenuUser from "@/User/DashBoard/SideMenuUser";
import React from "react";
import { Outlet } from "react-router-dom";

const DashBoardUser = () => {
  return (
    <div className="justify-between items-center gap-5 glass my-10 p-5">
      <div className=" w-[100%] ">
        <SideMenuUser></SideMenuUser>
      </div>
      <div className="p-4 w-full min-h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoardUser;
